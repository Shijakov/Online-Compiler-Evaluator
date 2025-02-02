import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { STATUS_OK, useBackend } from '../../hooks/backend';
import { useUser } from '../../hooks/user';
import EditableProblem from './EditableProblem';

export const AuthorEditProblem = () => {
    const { id: problemId } = useParams();
    const { call } = useBackend();
    const { user } = useUser();
    const navigate = useNavigate();

    const [problem, setProblem] = useState(null);

    useEffect(() => {
        const loadProblem = async () => {
            const response = await call(
                `/problem/${problemId}`,
                'GET',
                {},
                user
            );

            if (response.status === STATUS_OK) {
                setProblem(response.data);
            }
        };

        loadProblem();
    }, [call, user, problemId]);

    const handleSubmit = async (editedProblem) => {
        await call('/problem/' + problemId, 'PUT', editedProblem, user);

        navigate('/author/problem');
    };

    return <EditableProblem problem={problem} onSubmit={handleSubmit} />;
};

export default AuthorEditProblem;
