import { useEffect, useState } from 'react';
import { Card, Form, Button, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { STATUS_OK, useBackend } from '../../hooks/backend';
import { useUser } from '../../hooks/user';

const AuthorProblemDetails = () => {
    const { id: problemId } = useParams();
    const { call } = useBackend();
    const { user } = useUser();

    const [problem, setProblem] = useState(null);

    const [editedProblem, setEditedProblem] = useState({
        title: problem?.title ?? '',
        description: problem?.description ?? '',
        mem_limit_mb: problem?.mem_limit_mb ?? '',
        time_limit_ms: problem?.time_limit_ms ?? '',
    });

    useEffect(() => {
        if (problem != null) {
            setProblem({
                title: problem?.title ?? '',
                description: problem?.description ?? '',
                mem_limit_mb: problem?.mem_limit_mb ?? '',
                time_limit_ms: problem?.time_limit_ms ?? '',
            });
        }
    }, [problem, setEditedProblem]);

    useEffect(() => {
        const loadProblem = async () => {
            const response = await call(
                `/problem/${problemId}`,
                'GET',
                {},
                user
            );

            console.log(response);

            if (response.status === STATUS_OK) {
                setProblem(response.data);
            }
        };

        loadProblem();
    }, [call, user, problemId]);

    // Handle input change
    const handleChange = (e) => {
        setEditedProblem({
            ...editedProblem,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('SAVING CHANGES');
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

                        {/* Save Button */}
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default AuthorProblemDetails;
