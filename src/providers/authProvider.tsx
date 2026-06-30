import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { getAuthUser, logoutUser } from "../services/admin/user";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  // if (isPublicPage) {
  //   console.log("public page");
  //   return;
  // }

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const currentUser = await getAuthUser();
        setUser(currentUser);
      } catch (err) {
        console.error("Auth provider", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  //  [location.pathname, isPublicPage]

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
