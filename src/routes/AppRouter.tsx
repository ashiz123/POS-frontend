import { Route, Routes } from "react-router-dom";
import RegisterUser from "../features/auth/RegisterUser";
import LandingPage from "../features/LandingPage";
import ProtectedRoute from "../features/auth/ProtectedRoute";
import KioskMain from "../features/kiosk/KioskMain";
import PaymentPage from "../features/kiosk/PaymentPage";
import BusinessLogin from "../features/business/BusinessLogin";
import ProfilePage from "../features/business/Profile";
import Dashboard from "../features/business/dashboard";

const AppRouter = () => {
  return (
    <Routes>
      {/* public route */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/register" element={<RegisterUser />} />

      <Route element={<ProtectedRoute />}>
        {/* Kiosk Section */}
        <Route path="/kiosk/main" element={<KioskMain />} />
        <Route path="/kiosk/payment" element={<PaymentPage />} />

        {/* Business  */}
        <Route path="/business/dashboard" element={<Dashboard />} />
        <Route path="/business/login" element={<BusinessLogin />} />
        <Route path="/business/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
