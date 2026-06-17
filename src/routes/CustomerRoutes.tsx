import { Outlet, Route, Routes } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import KioskLogin from "../features/kiosk/auth/KioskLogin";
import { ProtectedKioskUser } from "../features/kiosk/guards/ProtectedKioskUser";
import { ProtectedKioskDevice } from "../features/kiosk/guards/ProtectedKioskDevice";
import { KioskDeviceProvider } from "../providers/KioskDeviceProvider";
import { StaffSessionProvider } from "../providers/StaffSessionProvider";
import MainPage from "../features/kiosk/mainPage";
import PaymentPage from "../features/kiosk/PaymentPage";
import { CartProvider } from "../providers/CartProvider";
import PrintReceipt from "../features/kiosk/PrintReceipt";

const CustomerRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <KioskDeviceProvider>
            <ProtectedKioskDevice />
          </KioskDeviceProvider>
        }
      >
        <Route path="/kiosk/login" element={<KioskLogin />} />

        <Route
          element={
            <StaffSessionProvider>
              <ProtectedKioskUser />
            </StaffSessionProvider>
          }
        >
          <Route
            element={
              <CartProvider>
                <Outlet />{" "}
              </CartProvider>
            }
          >
            <Route path="/kiosk/main" element={<MainPage />} />
            <Route path="/kiosk/payment" element={<PaymentPage />} />
            <Route path="/kiosk/print-receipt" element={<PrintReceipt />} />
          </Route>
        </Route>
      </Route>

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

export default CustomerRoutes;
