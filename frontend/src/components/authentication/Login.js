import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useBackend } from '../../hooks/backend';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [call, loading, error] = useBackend();
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            return;
        }

        const response = await call('/api/login', 'POST', {
            username,
            password,
        });

        console.log(response);
        navigate('/');
    };

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </Form.Group>

            <div>
                <Link to="/register">Don't have an account? Register</Link>
            </div>

            <Button type="submit" onClick={onSubmit}>
                Submit
            </Button>
        </Form>
    );
};
