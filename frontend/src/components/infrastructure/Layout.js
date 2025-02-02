import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Sidebar } from './Sidebar';
import { useBackend } from '../../hooks/backend';
import { ToastContainer, toast } from 'react-toastify';
import { useUser } from '../../hooks/user';

export const Layout = ({ children }) => {
    const location = useLocation();
    const notify = (message) => toast(message);
    const { error } = useBackend();
    const { hasRole } = useUser();

    useEffect(() => {
        if (error != null) {
            console.log('Error: ', error);
            notify(error);
        }
    }, [error]);

    // Define routes where Sidebar should be shown
    const showSidebar =
        !['/login', '/register'].includes(location.pathname) &&
        (hasRole('admin') || hasRole('author'));

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
            <ToastContainer />
        </Container>
    );
};
