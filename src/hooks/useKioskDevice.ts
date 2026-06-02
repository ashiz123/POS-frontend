import { useContext } from "react";
import { KioskDeviceContext } from "../contexts/KioskDeviceContext";

export const useKioskDevice = () => {
  const context = useContext(KioskDeviceContext);
  if (!context) {
    throw new Error("useKioskDevice must be used within a KioskDeviceProvider");
  }
  return context; // TypeScript automatically strips away the '| null' type here
};
