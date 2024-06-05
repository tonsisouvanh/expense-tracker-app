// ProtectedRoute.js
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
