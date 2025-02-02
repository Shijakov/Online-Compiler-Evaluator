import sys, os, pika, redis, psycopg, json

def check_solution(ch, method, properties, body, r, pg_conn):
    print(" [x] Received")

    result = json.loads(body.decode())

    pg = pg_conn.cursor()

    query = """
    INSERT INTO solutions(code, status, output, problem_id, user_id, created_at)
    VALUES (%s, %s, %s, %s, %s, NOW())
    RETURNING id
    """

    pg.execute(query, (result['code'], result['status'], result['output'], result['problem_id'], result['user_id']))
    solution_id = pg.fetchone()[0]

    if result['status'] == 'error':
        pg_conn.commit()
        print(" [x] Done")
        ch.basic_ack(delivery_tag = method.delivery_tag)
        return

    for i, test_case in enumerate(result['test_cases']):
        query = """
        INSERT INTO solution_test_cases(solution_id, input, output, expected_output, is_correct)
        VALUES (%s, %s, %s, %s, %s)
        """
        pg.execute(query, (solution_id, test_case['input'], test_case['output'], test_case['expected_output'], test_case['is_correct']))

    pg_conn.commit()
    r.set(result['id'], json.dumps(result), ex=10)
    print(" [x] Done")
    ch.basic_ack(delivery_tag = method.delivery_tag)


def main():
    pg_conn = psycopg.connect("host=localhost port=5432 dbname=mendo-clone user=postgres password=postgres")
    connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
    r = redis.Redis(host='localhost', port=6379, decode_responses=True)
    channel = connection.channel()

    channel.exchange_declare(exchange='code', exchange_type='direct')

    result = channel.queue_declare(queue='', exclusive=True)
    queue_name = result.method.queue

    channel.queue_bind(
        exchange='code', queue=queue_name, routing_key='create_submission')

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=queue_name, on_message_callback=lambda ch, method, properties, body: check_solution(ch, method, properties, body, r, pg_conn))

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