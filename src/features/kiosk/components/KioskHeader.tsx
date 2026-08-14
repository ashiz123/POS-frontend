import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getKioskUserSession,
  logoutTerminal,
} from "../../../services/kiosk/kiosk";
import { useKioskUser } from "../../../hooks/useKioskAuth";
import { ConfirmationDialog } from "../../../components/ConfirmationDialog";

const KioskHeader = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const { setUser } = useKioskUser();
  const navigate = useNavigate();
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const logOffTerminal = async () => {
    try {
      const request = await logoutTerminal();
      if (request.success === true) {
        setUser({
          userId: "",
          name: "",
          email: "",
          role: "",
        });
        navigate("/customer/kiosk/login");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Error: Terminal cannot be properly shut");
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-cyan-700 rounded flex items-center justify-center">
          <span className="text-white font-bold italic">S</span>
        </div>
        <h1 className="text-xl font-medium tracking-tighter">Nodal KIOSK</h1>
      </div>
      {/* <button
        type="button"
        onClick={logOffTerminal}
        className="text-xs font-bold text-slate-400 uppercase hover:text-red-500 transition-colors"
      >
        Logout Terminal
      </button> */}
      <button
        onClick={() => setIsDialogOpen(true)}
        className="px-6 py-3 bg-primary-700 text-white rounded-xl font-bold"
      >
        Logout
      </button>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        title="Logout Kiosk"
        message="Do you want to logout your session?"
        onCancel={() => setIsDialogOpen(false)}
        type="primary"
        onConfirm={() => {
          logOffTerminal();
          setIsDialogOpen(false);
        }}
      />
    </header>
  );
};

export default KioskHeader;
