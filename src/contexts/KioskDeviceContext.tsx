import type { StripeTerminal } from "@stripe/terminal-js";
import { createContext } from "react";

export type TerminalInstance = ReturnType<StripeTerminal["create"]>;

interface DeviceContextType {
  terminal: {
    id: string;
    name: string;
    status: string;
  };
  setTerminal: (terminal: { id: string; name: string; status: string }) => void;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  paymentTerminal: TerminalInstance | null;
  setPaymentTerminal: (terminal: TerminalInstance | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  successMessage: string | null;
  setSuccessMessage: (error: string | null) => void;
}

export const KioskDeviceContext = createContext<DeviceContextType | null>(null);
