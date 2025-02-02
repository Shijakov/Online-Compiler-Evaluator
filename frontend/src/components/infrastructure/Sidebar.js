import { Col, ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../hooks/user';

export const Sidebar = () => {
    const { hasRole } = useUser();
    return (
        <Col md={3} className="bg-light vh-100 p-3">
            <h4 className="mb-4">Menu</h4>
            <ListGroup>
                <ListGroup.Item as={NavLink} to="/problem">
                    Home
                </ListGroup.Item>
                {hasRole('author') && (
                    <ListGroup.Item as={NavLink} to="/author/problem">
                        Author
                    </ListGroup.Item>
                )}
                {hasRole('admin') && (
                    <ListGroup.Item as={NavLink} to="/admin">
                        Admin
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Col>
    );
};
