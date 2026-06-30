import { createContext } from "react";
import type { businessType, UserType } from "../providers/authProvider";

interface AuthContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  business: businessType | null;
  setBusiness: (business: businessType | null) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);
