import { Route, Routes } from "react-router-dom";
import KioskMain from "../features/kiosk/KioskMain";
import ErrorPage from "../components/ErrorPage";
import KioskLogin from "../features/kiosk/KioskLogin";
import { ProtectedKioskUser } from "../features/kiosk/guards/ProtectedKioskUser";
import { ProtectedKioskDevice } from "../features/kiosk/guards/ProtectedKioskDevice";
import { KioskDeviceProvider } from "../providers/KioskDeviceProvider";
import { StaffSessionProvider } from "../providers/StaffSessionProvider";

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
          <Route path="/kiosk/main" element={<KioskMain />} />
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
