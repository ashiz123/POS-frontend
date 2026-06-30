import { useState } from "react";
import { KioskDeviceContext } from "../contexts/KioskDeviceContext";

export const KioskDeviceProvider = ({ children }) => {
  const [terminal, setTerminal] = useState({
    id: "",
    name: "",
    status: "",
  });
  const [isActive, setIsActive] = useState(false);
  const [paymentTerminal, setPaymentTerminal] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
    <KioskDeviceContext.Provider
      value={{
        terminal,
        setTerminal,
        paymentTerminal,
        setPaymentTerminal,
        isActive,
        setIsActive,
        error,
        setError,
        loading,
        setLoading,
        successMessage,
        setSuccessMessage,
      }}
    >
      {children}
    </KioskDeviceContext.Provider>
  );
};
