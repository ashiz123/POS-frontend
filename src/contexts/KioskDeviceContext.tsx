import { createContext } from "react";

interface DeviceContextType {
  terminal: {
    id: string;
    name: string;
    status: string;
  };
  setTerminal: (terminal: { id: string; name: string; status: string }) => void;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
}

export const KioskDeviceContext = createContext<DeviceContextType | null>(null);
