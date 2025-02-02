import { useEffect, useState } from 'react';
import { STATUS_OK, useBackend } from '../../hooks/backend';
import { useUser } from '../../hooks/user';
import ProblemListItem from './ProblemListItem';

export const ProblemList = () => {
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

    return (
        <div>
            {problems.map((problem) => (
                <ProblemListItem key={problem.id} problem={problem} />
            ))}
        </div>
    );
};
