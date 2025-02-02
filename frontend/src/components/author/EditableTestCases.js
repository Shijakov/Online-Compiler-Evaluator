import { Button, Form, Table } from 'react-bootstrap';

export const EditableTestCases = ({ testCases, changeTestCases }) => {
    const handleTestCaseChange = (index, field, value) => {
        const updatedTestCases = [...testCases];
        updatedTestCases[index][field] = value;
        changeTestCases(updatedTestCases);
    };

    const addTestCase = () => {
        changeTestCases([...testCases, { input: '', expected_output: '' }]);
    };

    const removeTestCase = (index) => {
        changeTestCases(testCases.filter((_, i) => i !== index));
    };

    return (
        <Form.Group>
            <Form.Label>
                <strong>Test Cases:</strong>
            </Form.Label>
            <Table bordered>
                <thead>
                    <tr>
                        <th>Input</th>
                        <th>Expected Output</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {testCases.map((testCase, index) => (
                        <tr key={index}>
                            <td>
                                <Form.Control
                                    type="text"
                                    value={testCase.input}
                                    onChange={(e) =>
                                        handleTestCaseChange(
                                            index,
                                            'input',
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    value={testCase.expected_output}
                                    onChange={(e) =>
                                        handleTestCaseChange(
                                            index,
                                            'expected_output',
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                            </td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => removeTestCase(index)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Button variant="success" onClick={addTestCase}>
                Add Test Case
            </Button>
        </Form.Group>
    );
};

export default EditableTestCases;
