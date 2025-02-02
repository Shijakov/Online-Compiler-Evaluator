import { useEffect, useState } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';
import { EditableTestCases } from './EditableTestCases';

const deepCopyTestCases = (testCases) => {
    return testCases.map((item) => ({
        input: item.input,
        expected_output: item.expected_output,
    }));
};

export const EditableProblem = ({ problem = null, onSubmit }) => {
    const [editedProblem, setEditedProblem] = useState({
        title: problem?.title ?? '',
        description: problem?.description ?? '',
        mem_limit_mb: problem?.mem_limit_mb ?? '',
        time_limit_ms: problem?.time_limit_ms ?? '',
        test_cases:
            problem != null ? deepCopyTestCases(problem.test_cases) : [],
    });

    useEffect(() => {
        if (problem != null) {
            setEditedProblem({
                title: problem.title,
                description: problem.description,
                mem_limit_mb: problem.mem_limit_mb,
                time_limit_ms: problem.time_limit_ms,
                test_cases: deepCopyTestCases(problem.test_cases),
            });
        }
    }, [problem, setEditedProblem]);

    const handleChange = (e) => {
        setEditedProblem({
            ...editedProblem,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(editedProblem);
    };

    const handleChangeTestCases = (testCases) => {
        setEditedProblem({
            ...editedProblem,
            test_cases: testCases,
        });
    };

    return (
        <Col md={6}>
            <Card className="mb-3">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        {/* Title */}
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Title:</strong>
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={editedProblem.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        {/* Description */}
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Description:</strong>
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="description"
                                value={editedProblem.description}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        {/* Memory Limit */}
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Memory Limit (MB):</strong>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="mem_limit_mb"
                                value={editedProblem.mem_limit_mb}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        {/* Time Limit */}
                        <Form.Group className="mb-3">
                            <Form.Label>
                                <strong>Time Limit (MS):</strong>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                name="time_limit_ms"
                                value={editedProblem.time_limit_ms}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <EditableTestCases
                            testCases={editedProblem.test_cases}
                            changeTestCases={handleChangeTestCases}
                        />

                        {/* Save Button */}
                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-5"
                        >
                            Save
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default EditableProblem;
