import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { STATUS_ERROR, useBackend } from '../../hooks/backend';
import { useUser } from '../../hooks/user';

export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { call } = useBackend();
    const { setUser } = useUser();
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            return;
        }

        const response = await call('/login', 'POST', {
            username,
            password,
        });

        if (response.status === STATUS_ERROR) {
            return;
        }

        setUser({ token: response.data.token, roles: response.data.roles });

        navigate('/problem');
    };

    return (
        <Form onSubmit={onSubmit}>
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

            <Button type="submit">Submit</Button>
        </Form>
    );
};
