import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { STATUS_ERROR, useBackend } from '../../hooks/backend';
import { useUser } from '../../hooks/user';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfrimPassword] = useState('');

    const { call } = useBackend();
    const navigate = useNavigate();
    const { setUser } = useUser();

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!username || !email || !password || password !== confirmPassword) {
            return;
        }

        const response = await call('/register', 'POST', {
            username,
            email,
            password,
            password_confirmation: confirmPassword,
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
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
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

            <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfrimPassword(event.target.value)}
                />
            </Form.Group>

            <div>
                <Link to="/login">Have an account? Login</Link>
            </div>

            <Button type="submit">Submit</Button>
        </Form>
    );
};
