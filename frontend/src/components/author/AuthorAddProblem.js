import { useNavigate } from 'react-router-dom';
import { useBackend } from '../../hooks/backend';
import { useUser } from '../../hooks/user';
import EditableProblem from './EditableProblem';

export const AuthorAddProblem = () => {
    const { call } = useBackend();
    const { user } = useUser();
    const navigate = useNavigate();

    const handleSubmit = async (problem) => {
        await call('/problem', 'POST', problem, user);

        navigate('/author/problem');
    };

    return <EditableProblem onSubmit={handleSubmit} />;
};

export default AuthorAddProblem;
