import { Link } from "react-router-dom";

const KioskHeader = () => {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm z-10">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-cyan-700 rounded flex items-center justify-center">
          <span className="text-white font-bold italic">S</span>
        </div>
        <h1 className="text-xl font-medium tracking-tighter">Nodal KIOSK</h1>
      </div>
      <Link
        to="/"
        className="text-xs font-bold text-slate-400 uppercase hover:text-red-500 transition-colors"
      >
        Exit Terminal
      </Link>
    </header>
  );
};

export default KioskHeader;
