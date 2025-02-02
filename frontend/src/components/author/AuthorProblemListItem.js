import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AuthorProblemListItem = ({ problem, handleDelete }) => {
    const navigate = useNavigate();

    const onDelete = () => {
        if (window.confirm('Are you sure you want to delete this problem?')) {
            handleDelete(problem.id);
        }
    };

    return (
        <Card className="m-2">
            <Card.Body className="d-flex justify-content-between align-items-center">
                <div>{problem.title}</div>

                <div className="d-flex gap-2">
                    <Button
                        variant="outline-warning"
                        size="sm"
                        onClick={() =>
                            navigate(`/author/problem/edit/${problem.id}`)
                        }
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={onDelete}
                    >
                        Delete
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default AuthorProblemListItem;
