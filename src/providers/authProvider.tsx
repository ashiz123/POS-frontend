import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getAuthUser, logoutUser } from "../services/user";
import { useLocation, useNavigate } from "react-router-dom";
import type { EmployeeRole } from "../validations/employeeValidation";

export type UserType = {
  id: string;
  email: string;
  accountType: string;
  is_verified: boolean;
  name?: string;
  phone?: string;
};

export type businessType = {
  _id: string;
  name: string;
  address: string;
  businessType: string;
  email: string;
  status?: string;
  website?: string;
  role?: EmployeeRole;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [business, setBusiness] = useState<null | businessType>(null);
  const [user, setUser] = useState<null | UserType>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  const publicPaths = ["/", "/auth/register", "/auth/login"];
  const navigate = useNavigate();
  const location = useLocation();

  const isPublicPage = publicPaths.includes(location.pathname);

  useEffect(() => {
    if (isPublicPage) {
      console.log("public page");
      return;
    }

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
  }, [location.pathname, isPublicPage]);

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
