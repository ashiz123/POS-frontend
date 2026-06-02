import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useKioskUser } from "../../../hooks/useKioskAuth";
import { getKioskUserSession } from "../../../services/kiosk";
import { useEffect, useState } from "react";

export const ProtectedKioskUser = () => {
  const { user, setUser, setTerminalSessionId, setBusinessId } = useKioskUser();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getSessionUser = async () => {
      try {
        const sessionUser = await getKioskUserSession();
        console.log("sessionUser", sessionUser);

        if (sessionUser.success) {
          setUser(sessionUser.data.userData);
          setTerminalSessionId(sessionUser.data.terminalSessionId);
          setBusinessId(sessionUser.data.businessId);
        } else {
          navigate("/customer/kiosk/login", { replace: true });
        }
      } catch (error) {
        console.error("error", error);

        navigate("/customer/kiosk/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    if (!user?.userId) {
      getSessionUser();
    }
  }, [user?.userId, navigate, setUser, setTerminalSessionId]);

  if (loading) {
    return <div>Loading kiosk configuration...</div>;
  }

  console.log("user", user);

  if (!user.userId) return <Navigate to="/customer/kiosk/login" />;

  return <Outlet />;
};
