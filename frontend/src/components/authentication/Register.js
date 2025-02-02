import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { STATUS_ERROR, useBackend } from '../../hooks/backend';
import { useUser } from '../../hooks/user';

export const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { call } = useBackend();
    const navigate = useNavigate();
    const { setUser } = useUser();

    const onSubmit = async (event) => {
        event.preventDefault();
        if (!username || !email || !password) {
            return;
        }

        const response = await call('/api/register', 'POST', {
            username,
            email,
            password,
        });

        if (response.status === STATUS_ERROR) {
            return;
        }

        setUser({ token: response.data.token, roles: response.data.roles });

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

            <div>
                <Link to="/login">Have an account? Login</Link>
            </div>

            <Button type="submit" onClick={onSubmit}>
                Submit
            </Button>
        </Form>
    );
};
