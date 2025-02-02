import { Form } from 'react-bootstrap';
import { useBackend } from '../../hooks/backend';
import { useUser } from '../../hooks/user';
import { useEffect, useState } from 'react';
import { LabeledSpinner } from '../infrastructure/LabeledSpinner';
import { ExecutionResult } from './ExecutionResult';

export const ProblemSolutionResult = ({ executionId }) => {
    const { call } = useBackend();
    const { user } = useUser();

    const [execution, setExecution] = useState(null);

    useEffect(() => {
        if (!executionId) return;

        const interval = setInterval(async () => {
            const response = await call(
                '/code/' + executionId,
                'GET',
                {},
                user
            );

            setExecution(response.data);

            if (
                response.data['status'] !== 'processing' &&
                response.data['status'] !== 'waiting'
            ) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [executionId, call, user]);

    if (execution?.status === 'error') {
        return (
            <Form.Group>
                <Form.Control
                    as="textarea"
                    rows={10}
                    value={execution.output}
                    readOnly
                    style={{
                        resize: 'none',
                        overflowY: 'auto',
                        backgroundColor: '#f8f9fa',
                    }}
                />
            </Form.Group>
        );
    }

    if (execution?.status === 'success') {
        return <ExecutionResult executionResult={execution} />;
    }

    if (execution?.status === 'fail') {
        return <ExecutionResult executionResult={execution} />;
    }

    if (execution?.status === 'processing') {
        return <LabeledSpinner label="Processing code" />;
    }

    if (execution?.status === 'waiting') {
        return <LabeledSpinner label="Waiting in queue" />;
    }

    return <LabeledSpinner />;
};
