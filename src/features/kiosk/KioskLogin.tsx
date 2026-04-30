import { Link } from "react-router-dom";

const KioskLogin = () => {
  return (
    <div className="bg-cyan-50/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-100 shadow-xl flex flex-col">
      <h2 className="text-center font-bold text-cyan-900 uppercase tracking-wide mb-6">
        Customer Area Access
      </h2>
      <div className="space-y-4 grow flex flex-col justify-center">
        <Link
          to="/kiosk/main"
          className="group w-full bg-white border border-cyan-200 rounded-xl p-4 flex flex-col items-center hover:border-cyan-500 transition-all shadow-sm hover:shadow-md"
        >
          <div className="text-cyan-700 mb-2">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="bg-cyan-700 text-white w-full py-2 rounded font-bold text-sm group-hover:bg-cyan-800 transition-colors uppercase text-center">
            Launch Customer Kiosk
          </span>
        </Link>
        {/* ... other buttons ... */}
      </div>
    </div>
  );
};

export default KioskLogin;
