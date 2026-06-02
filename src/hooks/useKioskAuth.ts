import { useContext } from "react";
import { StaffSessionContext } from "../contexts/StaffSessionContext";

export const useKioskUser = () => {
  const context = useContext(StaffSessionContext);

  if (!context) {
    throw new Error(
      "useKioskUser must be used within an UserKioskSessionProvider",
    );
  }

  return context;
};
