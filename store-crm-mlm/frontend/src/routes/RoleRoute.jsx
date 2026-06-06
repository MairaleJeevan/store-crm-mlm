import { Navigate }
from 'react-router-dom';

import { useAuth }
from '../context/AuthContext';

const RoleRoute = ({
    children,
    roles
}) => {

    const { user } =
        useAuth();

    if (!user) {

        return (
            <Navigate
                to="/login"
            />
        );
    }

    if (
        !roles.includes(
            user.role
        )
    ) {

        return (
            <Navigate
                to="/dashboard"
            />
        );
    }

    return children;
};

export default RoleRoute;