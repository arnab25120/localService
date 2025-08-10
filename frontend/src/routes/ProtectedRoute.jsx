import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const ProtectedRoute = ({ children, allowedRoles = [], isAdminOnly = false }) => {
  const { user } = useAuthStore();

  // Not logged in → redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // Admin-only access
  if (isAdminOnly && !user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Role-based access
  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  // Access granted
  return children;
};

export default ProtectedRoute;
