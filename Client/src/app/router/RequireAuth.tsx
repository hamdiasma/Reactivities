import { Navigate, Outlet, useLocation } from "react-router";
import { useAccount } from "../../lib/hooks/useAccount";
import { Typography } from "@mui/material";

export default function RequireAuth() {
    const { currentUser, loadingUserInfo } = useAccount()
    const location = useLocation()
    if (loadingUserInfo) return <Typography>Loding...</Typography>
    if (!currentUser) return <Navigate to={'/login'} state={{ from: location.pathname }}/>
    if(location.pathname==='/login' || location.pathname==='/register'){
        return <Navigate to={'/activities'} />
    }
    if(location.pathname==='/admin' && !currentUser?.roles?.includes('Admin') && !currentUser?.roles?.includes('SuperAdmin')){
        return <Navigate to="/not-found" state={{ from: location.pathname }} />;
    }
    return (
        <Outlet />
    )
}