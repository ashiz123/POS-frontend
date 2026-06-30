import { createContext } from "react";

interface KioskUserContextType {
  user: {
    userId: string;
    name: string;
    role: string;
    email: string;
  };
  setUser: (user: {
    userId: string;
    name: string;
    role: string;
    email: string;
  }) => void;
  terminalSessionId: string;
  setTerminalSessionId: (terminalSessionId: string) => void;
  businessId: string;
  setBusinessId: (businessId: string) => void;
}

export const StaffSessionContext = createContext<KioskUserContextType | null>(
  null,
);
