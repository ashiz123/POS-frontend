import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const PublicRoute = () => {
  const { user, loading } = useAuth();

  // 2. Wait for the AuthProvider to finish checking cookies
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Checking session...
      </div>
    );
  }

  // 3. THE KICK-OUT: If they are logged in, send them to the dashboard!
  // 'replace' ensures they can't click the "Back" button to return to the login page
  if (user) {
    return <Navigate to="/business/dashboard" replace />;
  }

  // 4. If they are NOT logged in, let them see the login page
  return <Outlet />;
};
