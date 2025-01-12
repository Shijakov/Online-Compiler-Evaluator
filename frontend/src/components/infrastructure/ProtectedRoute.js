import { Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/user';

export const ProtectedRoute = ({ children }) => {
    const [user, _] = useUser();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
};
