import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getKioskData } from "../../../services/kiosk";
import { useKioskDevice } from "../../../hooks/useKioskDevice";

export const ProtectedKioskDevice = () => {
  const { terminal, setTerminal, isActive, setIsActive } = useKioskDevice();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getDetail = async () => {
      try {
        const detail = await getKioskData();
        if (detail?.data) {
          setTerminal(detail.data);
          setIsActive(true);
        }
      } catch (error: any) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getDetail();
  }, [setTerminal, setIsActive]);

  // 4. STEP ONE: While checking the API, show a loading spinner or blank screen
  if (isLoading) {
    return <div>Loading kiosk configuration...</div>; // Or your custom Spinner
  }

  // 5. STEP TWO: Now that loading is done, evaluate if they should be kicked out
  if (!terminal?.id || isActive === false) {
    return <Navigate to="/customer/kiosk/activate" replace />;
  }

  // 6. STEP THREE: Authorized completely
  return <Outlet />;
};
