import { useState } from "react";
import { KioskDeviceContext } from "../contexts/KioskDeviceContext";

export const KioskDeviceProvider = ({ children }) => {
  const [terminal, setTerminal] = useState({
    id: "",
    name: "",
    status: "",
  });
  const [isActive, setIsActive] = useState(false);

  return (
    <KioskDeviceContext.Provider
      value={{
        terminal,
        setTerminal,
        isActive,
        setIsActive,
      }}
    >
      {children}
    </KioskDeviceContext.Provider>
  );
};
