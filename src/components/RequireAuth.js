import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function RequireAuth ({children}) {
    const userInfo = sessionStorage.getItem('userInfo');
    const location = useLocation();
    
    return userInfo ? (
        children
    ) : (<Navigate to="/login" replace state= {{prevPath: location.pathname}} />)
}
