import React from 'react';
import { Badge, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProblemListItem = ({ problem }) => {
    return (
        <Card className="m-2">
            <Card.Body>
                <Link to={`/problem/${problem.id}`}>{problem.title}</Link>
                {problem.is_solved && <Badge bg="success ms-2">Solved</Badge>}
            </Card.Body>
        </Card>
    );
};

export default ProblemListItem;
