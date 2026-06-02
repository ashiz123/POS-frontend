import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { getBusinessDetail } from "../../services/business";
import ErrorPage from "../../components/ErrorPage";

const BusinessProtectedRoute = () => {
  const { business, error, setBusiness } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBusiness = async () => {
      try {
        const businessDetail = await getBusinessDetail();
        setBusiness(businessDetail.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getBusiness();
  }, []);

  if (business?.role === "cashier") {
    return (
      <ErrorPage
        title="Unauthorized"
        code="401"
        message="You are not authorized to access this page."
      />
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error)
    return (
      <div className="flex items-center gap-2 p-3 my-4 text-sm font-medium text-red-800 border border-red-100 rounded-md bg-red-50/50">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
        {error}
      </div>
    );

  if (!business) return <Navigate to="/business/select" />;

  return <Outlet />;
};

export default BusinessProtectedRoute;
