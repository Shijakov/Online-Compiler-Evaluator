import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { STATUS_OK, useBackend } from '../../hooks/backend';
import { useUser } from '../../hooks/user';
import {
    Spinner,
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
} from 'react-bootstrap';
import ReactCodeMirror from '@uiw/react-codemirror';
import { ProblemSolutionResult } from './ProblemSolutionResult';

const ProblemDetails = () => {
    const { call, loading } = useBackend();
    const { user } = useUser();
    const { id: problemId } = useParams();

    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('java');
    const [executionId, setExecutionId] = useState(null);

    useEffect(() => {
        const loadProblem = async () => {
            const response = await call(
                `/problem/${problemId}`,
                'GET',
                {},
                user
            );

            if (response.status === STATUS_OK) {
                setProblem(response.data);
            }
        };

        loadProblem();
    }, [call, user, problemId]);

    const handleSubmit = async () => {
        const response = await call(
            '/code',
            'POST',
            {
                problemId: problem.id,
                code,
                language,
            },
            user
        );

        if (response.status === STATUS_OK) {
            setExecutionId(response.data['executionId']);
        }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <Container fluid>
            <Row className="mt-3">
                {/* Left Side - Problem Details */}
                <Col md={6}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Card.Title>{problem.title}</Card.Title>
                            <Card.Text>
                                <strong>Description:</strong>
                                <br />
                                {problem.description}
                            </Card.Text>
                            <Card.Text>
                                <strong>Memory Limit:</strong>{' '}
                                {problem.mem_limit_mb}
                            </Card.Text>
                            <Card.Text>
                                <strong>Time Limit:</strong>{' '}
                                {problem.time_limit_ms}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    {executionId && (
                        <ProblemSolutionResult executionId={executionId} />
                    )}
                </Col>

                {/* Right Side - Space for Code Editor */}
                <Col md={6}>
                    <ReactCodeMirror
                        value={code}
                        height="800px"
                        onChange={(val) => setCode(val)}
                    />
                    <Row className="mt-3">
                        <Col md={8}>
                            <Form.Select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                aria-label="Select language"
                            >
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                            </Form.Select>
                        </Col>
                        <Col md={4} className="d-flex justify-content-end">
                            <Button onClick={handleSubmit} variant="primary">
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default ProblemDetails;
