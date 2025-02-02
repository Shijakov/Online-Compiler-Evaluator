import { Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/user';

export const ProtectedRoute = ({ children, role }) => {
    const { hasRole, isAuthenticated } = useUser();

    if (!isAuthenticated() || (role && !hasRole(role))) {
        return <Navigate to="/login" />;
    }

    return children;
};
