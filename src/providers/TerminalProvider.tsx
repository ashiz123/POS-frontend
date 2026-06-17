import { useState } from "react";
import { TerminalContext } from "../contexts/TerminalContext";
import { type TerminalInstance } from "../contexts/TerminalContext";

export interface ActiveOrder {
  client_secret: string;
  metaData: { orderId: string; businessId: string };
  amount: number;
  currency: string;
}

export const TerminalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [terminal, setTerminal] = useState<TerminalInstance | null>(null);
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null);

  return (
    <TerminalContext.Provider
      value={{
        terminal,
        setTerminal,
        activeOrder,
        setActiveOrder,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
};
