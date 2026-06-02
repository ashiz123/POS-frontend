import { Route, Routes } from "react-router-dom";
import RegisterUser from "../features/auth/RegisterUser";
import LandingPage from "../features/LandingPage";
import { AuthProvider } from "../providers/authProvider";
import KioskActivation from "../features/kiosk/KioskActivation";
import BusinessRoutes from "./BusinessRoutes";
import CustomerRoutes from "./CustomerRoutes";
import ErrorPage from "../components/ErrorPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="" element={<LandingPage />} />
      <Route path="/business/user/register" element={<RegisterUser />} />
      <Route path="/customer/kiosk/activate" element={<KioskActivation />} />

      {/* <Route path="/customer/kiosk/main" element={<KioskMain />} /> */}

      <Route
        path="/business/*"
        element={
          <AuthProvider>
            <BusinessRoutes />
          </AuthProvider>
        }
      />
      <Route path="/customer/*" element={<CustomerRoutes />} />

      <Route
        path="/*"
        element={
          <ErrorPage
            title="Page not found"
            code="404"
            message="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
          />
        }
      />
    </Routes>
  );
};

export default AppRouter;
