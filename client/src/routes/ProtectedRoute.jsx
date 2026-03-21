import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {

  const { user, token } = useSelector((state) => state.auth);

  // If token not available -> go to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If role not allowed -> go to home
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;