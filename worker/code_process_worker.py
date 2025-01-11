import pika, sys, os, json, docker, redis

def execute_code_against_test_cases(code, test_cases, mem_limit, time_limit_in_ms, source_file_name, compile_command, run_command, image):
    client = docker.from_env()

    with open(source_file_name, "w") as code_file:
        code_file.write(code)

    try:
        container = client.containers.run(
            image=image,
            command="/bin/sh",  # Start a bash shell so we can execute commands later
            stdin_open=True,  # Keep the stdin open
            tty=True,  # Allocate a pseudo-TTY
            volumes={os.getcwd(): {'bind': '/usr/src/app', 'mode': 'rw'}},  # Bind the current directory
            working_dir='/usr/src/app',  # Set the working directory
            detach=True,  # Run container in the background
            mem_limit=mem_limit,  # Memory limit
            pids_limit=200,
        )

        if compile_command:
            exit_code, compile_logs = container.exec_run(f"bash -c '{compile_command}'")
            if exit_code != 0:
                return {
                    'status': 'error', 
                    'output': compile_logs.decode(), 
                }

        results = []
        all_test_cases_passed = True
        time_limit_in_s = time_limit_in_ms / 1000
        for i, test_case in enumerate(test_cases):
            # Use `exec_run` to run the compiled code for each test case
            print('HEREEE')
            input_data = test_case['input']

            # Run the program with the test case input, applying a timeout
            exec_result = container.exec_run(f"timeout {time_limit_in_s} bash -c 'echo \"{input_data}\" | {run_command}'", stdin=True, tty=True)

            if exec_result[0] == 124:
                results.append({
                    'input': input_data,
                    'output': 'exceeded time limit', 
                    'expected_output': expected, 
                    'is_correct': is_test_case_correct
                })
                all_test_cases_passed = False
            else:
                output = exec_result[1].decode().strip()
                expected = test_case['expected_output'].strip()
                is_test_case_correct = output == expected
                all_test_cases_passed = all_test_cases_passed and is_test_case_correct
                results.append({
                    'input': input_data,
                    'output': output, 
                    'expected_output': expected, 
                    'is_correct': is_test_case_correct
                })

        result = {
                'status': 'success',
                'output': 'Passed all test cases',
                'test_cases': results
            } if all_test_cases_passed else {
                'status': 'fail',
                'output': 'Did not pass some test cases',
                'test_cases': results
            }

        print(result)
        
        container.stop()

        return result


    except docker.errors.ContainerError as e:
        return {"error": str(e)}
    finally:
        # Clean up: stop and remove the container after evaluation
        container.stop()
        container.remove()
        os.remove(source_file_name)

def execute_cpp_code_against_test_cases(code, test_cases, mem_limit, time_limit):
    source_file_name = "user_code.cpp"
    return execute_code_against_test_cases(
        code=code, 
        test_cases=test_cases, 
        mem_limit=mem_limit, 
        time_limit_in_ms=time_limit, 
        source_file_name=source_file_name, 
        compile_command=f"g++ {source_file_name} -o user_program", 
        run_command="./user_program", 
        image="gcc"
        )

def execute_python_code_against_test_cases(code, test_cases, mem_limit, time_limit):
    source_file_name = "user_code.py"
    return execute_code_against_test_cases(
        code=code, 
        test_cases=test_cases, 
        mem_limit=mem_limit, 
        time_limit_in_ms=time_limit, 
        source_file_name=source_file_name, 
        compile_command="", 
        run_command=f"python3 {source_file_name}", 
        image="python:3.10.16" 
        )

def execute_java_code_against_test_cases(code, test_cases, mem_limit, time_limit):
    source_file_name = "Main.java"
    return execute_code_against_test_cases(
        code=code, 
        test_cases=test_cases, 
        mem_limit=mem_limit, 
        time_limit_in_ms=time_limit, 
        source_file_name=source_file_name, 
        compile_command=f"javac {source_file_name}", 
        run_command="java Main", 
        image="openjdk"
        )

def execute_code(ch, method, properties, body, r):
    print(" [x] Received")

    result = json.loads(body.decode())
    code = result['code']

    execution_status = {
        'status': 'processing'
    }

    r.set(result['id'], json.dumps(execution_status))

    execution_status = {
        'status': 'error',
        'output': 'Language not recognized'
    }
    if result['language'] == 'python': 
        execution_status = execute_python_code_against_test_cases(code, result['test_cases'], "512m", 1000)
    elif result['language'] == 'cpp':
        execution_status = execute_cpp_code_against_test_cases(code, result['test_cases'], "512m", 1000)
    elif result['language'] == 'java':
        execution_status = execute_java_code_against_test_cases(code, result['test_cases'], "512m", 1000)

    execution_status['code'] = code
    execution_status['problem_id'] = result['problem_id']
    execution_status['user_id'] = result['user_id']
    execution_status['id'] = result['id']

    json_execution_status = json.dumps(execution_status)

    r.set(result['id'], json_execution_status)
    ch.basic_publish(exchange='code', routing_key='create_submission', body=json_execution_status)

    print(execution_status)
    print(" [x] Done")
    ch.basic_ack(delivery_tag = method.delivery_tag)

def main():
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    r = redis.Redis(host='localhost', port=6379, decode_responses=True)
    channel = connection.channel()

    channel.exchange_declare(exchange='code', exchange_type='direct')

    result = channel.queue_declare(queue='', exclusive=True)
    queue_name = result.method.queue

    channel.queue_bind(
        exchange='code', queue=queue_name, routing_key='process_code')

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=queue_name, on_message_callback=lambda ch, method, properties, body: execute_code(ch, method, properties, body, r))

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)