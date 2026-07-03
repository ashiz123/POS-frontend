import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

// this allow to create the business
const ProtectedRoute = () => {
  const { user, loading, error } = useAuth();

  if (loading) return <div>Loading session...</div>;
  if (error)
    return (
      <div className="flex items-center gap-2 p-3 my-4 text-sm font-medium text-red-800 border border-red-100 rounded-md bg-red-50/50">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
        {error}
      </div>
    );
  if (!user) return <Navigate to="/" />;

  return <Outlet />;
};

export default ProtectedRoute;
