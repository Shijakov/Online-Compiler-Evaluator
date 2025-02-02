import { Col, ListGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
    return (
        <Col md={3} className="bg-light vh-100 p-3">
            <h4 className="mb-4">Menu</h4>
            <ListGroup>
                <ListGroup.Item as={NavLink} to="/" exact>
                    Home
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to="/author/problem">
                    Author
                </ListGroup.Item>
            </ListGroup>
        </Col>
    );
};
