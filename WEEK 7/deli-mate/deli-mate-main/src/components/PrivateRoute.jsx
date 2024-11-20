import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser, logout } = useAuth();
  if (!currentUser?.emailVerified) {
    // not logged in so redirect to login page with the return url
    try {
      logout();
    } catch (e) {
      console.log(e);
    }
    return <Navigate to="/" replace={true} />;
  }

  // authorized so return child components
  return children;
}
