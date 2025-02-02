import { Badge, Card, Col } from 'react-bootstrap';

export const UserListItem = ({ user, assignRole, removeRole }) => {
    const AVAILABLE_ROLES = ['user', 'author', 'admin'];

    const handleAssignRole = (role) => {
        if (
            window.confirm(
                `Are you sure you want to assign ${role} role to ${user.username}`
            )
        ) {
            assignRole(user.id, role);
        }
    };

    const handleRemoveRole = (role) => {
        if (
            window.confirm(
                `Are you sure you want to remove ${role} role from ${user.username}`
            )
        ) {
            removeRole(user.id, role);
        }
    };

    const handleRoleClick = (role) => {
        user.roles.includes(role)
            ? handleRemoveRole(role)
            : handleAssignRole(role);
    };

    return (
        <Col md={4} key={user.id} className="mb-3">
            <Card className="p-3">
                <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                    <Card.Subtitle>{user.email}</Card.Subtitle>
                    <div className="mt-3">
                        {AVAILABLE_ROLES.map((role) => (
                            <Badge
                                key={role}
                                pill
                                className="me-2"
                                bg={
                                    user.roles.includes(role)
                                        ? 'primary'
                                        : 'secondary'
                                }
                                onClick={() => handleRoleClick(role)}
                                style={{
                                    cursor: 'pointer',
                                }}
                            >
                                {role.toUpperCase()}
                            </Badge>
                        ))}
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};
