import { useState, type ReactNode } from "react";
import { StaffSessionContext } from "../contexts/StaffSessionContext";

export const StaffSessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({
    userId: "",
    name: "",
    role: "",
    email: "",
  });
  const [terminalSessionId, setTerminalSessionId] = useState("");
  const [businessId, setBusinessId] = useState("");

  return (
    <StaffSessionContext.Provider
      value={{
        user,
        setUser,
        terminalSessionId,
        setTerminalSessionId,
        businessId,
        setBusinessId,
      }}
    >
      {children}
    </StaffSessionContext.Provider>
  );
};
