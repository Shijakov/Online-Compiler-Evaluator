import { useEffect, useState } from 'react';
import { STATUS_OK, useBackend } from '../../hooks/backend';
import { useUser } from '../../hooks/user';
import AuthorProblemListItem from './AuthorProblemListItem';

export const AuthorProblemList = () => {
    const { call } = useBackend();
    const { user } = useUser();

    const [problems, setProblems] = useState([]);

    useEffect(() => {
        const loadProblems = async () => {
            const response = await call('/problem', 'GET', {}, user);

            if (response.status === STATUS_OK) {
                setProblems(response.data);
            }
        };

        loadProblems();
    }, [call, user]);

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
            {problems.map((problem) => (
                <AuthorProblemListItem
                    key={problem.id}
                    problem={problem}
                    handleDelete={handleDeleteProblem}
                />
            ))}
        </div>
    );
};
