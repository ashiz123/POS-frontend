//its unused

import { type StripeTerminal } from "@stripe/terminal-js";
import { createContext } from "react";
import type { ActiveOrder } from "../providers/TerminalProvider";

export type TerminalInstance = ReturnType<StripeTerminal["create"]>;

interface TerminalContextType {
  terminal: TerminalInstance | null;
  setTerminal: (terminal: TerminalInstance | null) => void;
  activeOrder: ActiveOrder | null;
  setActiveOrder: (activeOrder: ActiveOrder) => void;
}

export const TerminalContext = createContext<TerminalContextType | null>(null);
