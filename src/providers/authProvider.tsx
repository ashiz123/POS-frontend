import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getAuthUser, logoutUser } from "../services/user";
import { useNavigate } from "react-router-dom";

export type UserType = {
  id: string;
  email: string;
  is_verified: boolean;
};

export type businessType = {
  _id: string;
  name: string;
  address: string;
  businessType: string;
  email: string;
  status?: string;
  website?: string;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [business, setBusiness] = useState<null | businessType>(null);
  const [user, setUser] = useState<null | UserType>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
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

  const logout = async () => {
    try {
      const data = await logoutUser();

      if (data.success) {
        setUser(null);
        setBusiness(null);
        navigate("/");
      }
    } catch (err) {
      console.error("Logout error:", err);
      setUser(null);
      navigate("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        error,
        logout,
        setLoading,
        setError,
        business,
        setBusiness,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
