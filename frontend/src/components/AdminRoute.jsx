import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute() {
  const { isAuthenticated, user } = useAuth();

  // Login nahi hai
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Login hai lekin admin nahi
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin hai
  return <Outlet />;
}

export default AdminRoute;