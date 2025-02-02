import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {
    const location = useLocation();

    // Define routes where Sidebar should be shown
    const showSidebar = !['/login', '/register'].includes(location.pathname);

    return (
        <Container fluid>
            <Row>
                {/* Sidebar */}
                {showSidebar && <Sidebar />}

                {/* Main Content */}
                <Col md={9} className="p-4">
                    {children}
                </Col>
            </Row>
        </Container>
    );
};
