import Table from 'react-bootstrap/Table';

export const ExecutionResult = ({ executionResult }) => {
    if (!executionResult || !executionResult['test_cases'])
        return <p>No test cases available.</p>;

    const tableBorderClass =
        executionResult.status === 'success'
            ? 'border-success'
            : 'border-danger';

    return (
        <Table striped bordered hover className={tableBorderClass}>
            <thead>
                <tr>
                    <th>Input</th>
                    <th>Expected Output</th>
                    <th>Output</th>
                </tr>
            </thead>
            <tbody>
                {executionResult['test_cases'].map((testCase, index) => (
                    <tr
                        key={index}
                        className={
                            testCase['is_correct']
                                ? 'table-success'
                                : 'table-danger'
                        }
                    >
                        <td>{testCase.input}</td>
                        <td>{testCase['expected_output']}</td>
                        <td>{testCase.output}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};
