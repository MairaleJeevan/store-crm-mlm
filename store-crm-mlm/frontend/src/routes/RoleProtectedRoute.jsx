import { Navigate } from 'react-router-dom';

import { useAuth }
from '../context/AuthContext';

import { permissions }
from '../utils/permissions';

const RoleProtectedRoute = ({
    children,
    path
}) => {

    const { user } = useAuth();

    const allowedRoutes =
        permissions[user?.role] || [];

        console.log('ROLE:', user?.role);
console.log('PATH:', path);
console.log('ALLOWED:', allowedRoutes);

    if (
        !allowedRoutes.includes(path)
    ) {

        return (
            <Navigate
                to="/dashboard"
            />
        );
    }

    return children;
};

export default RoleProtectedRoute;