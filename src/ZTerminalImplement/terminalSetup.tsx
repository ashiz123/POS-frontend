// frontend/src/App.tsx
import { useEffect } from "react";
import { TerminalComponent } from "./stripe/TerminalComponent";
import { PaymentCollect } from "./stripe/PaymentCollect";
import { TerminalProvider } from "./context/TerminalProvider";
import { CreateOrderComponent } from "./order/CreateOrderComponent";
import LoginTerminalComponent from "./components/LoginTerminal";

function TerminalSetup() {
  useEffect(() => {});

  return (
    <TerminalProvider>
      <TerminalComponent></TerminalComponent>
      <LoginTerminalComponent></LoginTerminalComponent>
      <CreateOrderComponent></CreateOrderComponent>
      <PaymentCollect></PaymentCollect>
    </TerminalProvider>
  );
}

export default TerminalSetup;
