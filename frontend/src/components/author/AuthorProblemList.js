import { useEffect, useState } from 'react';
import { STATUS_OK, useBackend } from '../../hooks/backend';
import { useUser } from '../../hooks/user';
import AuthorProblemListItem from './AuthorProblemListItem';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Paginate from '../infrastructure/Paginate';

export const AuthorProblemList = () => {
    const { call } = useBackend();
    const { user } = useUser();

    const [problems, setProblems] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const loadProblems = async () => {
            const response = await call('/problem', 'GET', {}, user, { page });

            if (response.status === STATUS_OK) {
                setTotalPages(
                    Math.ceil(response.data.total / response.data.per_page)
                );
                setProblems(response.data.data);
            }
        };

        loadProblems();
    }, [call, user, page]);

    const handleDeleteProblem = async (problemId) => {
        const response = await call(
            '/problem/' + problemId,
            'DELETE',
            {},
            user
        );
        if (response.status === STATUS_OK) {
            setProblems((prev) => {
                return prev.filter((problem) => problem.id !== problemId);
            });
        }
    };

    return (
        <div>
            <Link to="/author/problem/add">
                <Button>Add Problem</Button>
            </Link>
            {problems.map((problem) => (
                <AuthorProblemListItem
                    key={problem.id}
                    problem={problem}
                    handleDelete={handleDeleteProblem}
                />
            ))}
            <Paginate
                currentPage={page}
                totalPages={totalPages}
                onPageChange={(page) => setPage(page)}
            />
        </div>
    );
};
