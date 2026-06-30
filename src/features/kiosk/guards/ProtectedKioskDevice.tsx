import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getKioskData } from "../../../services/kiosk/kiosk";
import { useKioskDevice } from "../../../hooks/useKioskDevice";
import { connectReader } from "../../../ZTerminalImplement/stripe/connectReader";

export const ProtectedKioskDevice = () => {
  const {
    terminal,
    setTerminal,
    setPaymentTerminal,
    isActive,
    setIsActive,
    setError,
    error,
    setSuccessMessage,
  } = useKioskDevice();
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

  useEffect(() => {
    const connectToReader = async () => {
      const terminal = await connectReader();
      if (!terminal) {
        console.error("Failed to connect to reader");
        setError("Failed to connect to reader");
        return;
      }

      setPaymentTerminal(terminal);
      setSuccessMessage("Reader connected successfully ✅");
    };

    connectToReader();
  }, [setPaymentTerminal]);

  // 4. STEP ONE: While checking the API, show a loading spinner or blank screen
  if (isLoading) {
    return <div>Loading kiosk configuration...</div>; // Or your custom Spinner
  }

  // 5. STEP TWO: Now that loading is done, evaluate if they should be kicked out
  if (!terminal?.id || isActive === false) {
    return <Navigate to="/customer/kiosk/activate" replace />;
  }

  if (error) {
    return <div> {error} </div>;
  }

  // 6. STEP THREE: Authorized completely
  return <Outlet />;
};
