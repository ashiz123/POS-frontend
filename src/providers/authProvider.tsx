import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getAuthUser } from "../services/user";

type UserType = {
  id: string;
  email: string;
  is_verified: boolean;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<null | UserType>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("checkAuth");
        const user = await getAuthUser();
        setUser(user);
      } catch (err) {
        console.error("Auth provider", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        error,
        setLoading,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
