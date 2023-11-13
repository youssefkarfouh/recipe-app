import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function RequireAuth({ allowedRoles }) {

    const { auth } = useAuth();
    const location = useLocation();

    console.log("auth inside requiredComponent" , auth);
    console.log("location in requiredComponent", location)

    return (

        auth.roles?.find(role => allowedRoles.includes(role))
            ? <Outlet />
            : auth.user
                ? <Navigate to="/unauthorized" state={{from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth