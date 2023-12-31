import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function RequireAuth({ allowedRoles }) {

    const { auth } = useAuth();
    const location = useLocation();

    console.log("auth inside requiredAuth" , auth);
    console.log("location in requiredAuth", location)

    return (

        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            // : auth?.user
            : auth?.accessToken //changed from user to accessToken to persist login after refresh
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    )

    
}

export default RequireAuth