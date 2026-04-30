import { createContext } from "react";

interface AuthContextType {
  user: any;
  setUser: (user: any) => void;
  loading: boolean;
  error: string | null;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
