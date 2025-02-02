import { Navigate } from 'react-router-dom';
import { useUser } from '../../hooks/user';

export const ProtectedRoute = ({ children, role }) => {
    const { user, hasRole, isAuthenticated } = useUser();

    console.log(user);

    if (!isAuthenticated() || (role && !hasRole(role))) {
        return <Navigate to="/login" />;
    }

    return children;
};
