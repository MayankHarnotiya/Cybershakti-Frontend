import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);

    // Check if token is expired
    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("authToken"); // Remove expired token
      return <Navigate to="/login" replace />;
    }

    // Ensure role checking works for both array and string role formats
    const userRoles = decodedToken.roles || [decodedToken.role]; // Normalize to array

    if (!allowedRoles.some((role) => userRoles.includes(role))) {
      return <Navigate to="/" replace />; // Unauthorized users go to home
    }

    return <Outlet />;
  } catch (error) {
    console.error("Invalid Token Detected:", error);
    localStorage.removeItem("authToken"); // Remove corrupted token
    return <Navigate to="/login" replace />;
  }
};
