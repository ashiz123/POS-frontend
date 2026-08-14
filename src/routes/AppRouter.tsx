import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "../providers/authProvider";
import KioskActivation from "../features/kiosk/auth/KioskActivation";
import BusinessRoutes from "./BusinessRoutes";
import CustomerRoutes from "./CustomerRoutes";
import ErrorPage from "../components/ErrorPage";
import TerminalSetup from "../ZTerminalImplement/terminalSetup";
import Home from "../features/home";
import Docs from "../features/Docs";
import PaymentPage from "../features/kiosk/PaymentPage";
import { ResetPasswordPage } from "../features/admin/auth/ResetPasswordPage";
import ForgotPasswordPage from "../features/admin/auth/ForgetPasswordPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/docs" element={<Docs />} />
      <Route path="/forget-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/customer/kiosk/activate" element={<KioskActivation />} />
      <Route path="/kiosk/payment" element={<PaymentPage />} />

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
      <Route path="/terminal" element={<TerminalSetup />} />

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
