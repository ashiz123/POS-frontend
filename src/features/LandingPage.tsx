import KioskLogin from "./kiosk/KioskLogin";
import LoginUser from "./auth/loginUser";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 font-sans text-slate-800">
      {/* Logo Section */}
      <div className="mb-12 flex flex-col items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-linear-to-br from-cyan-600 to-slate-700 rounded-lg flex items-center justify-center shadow-md">
            <span className="text-white text-3xl font-bold italic">S</span>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold tracking-widest text-slate-900 leading-none">
              SWIFT POS
            </h1>
            <p className="text-sm tracking-[0.3em] font-light text-slate-500 uppercase mt-1">
              Solutions
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Business area */}
        <LoginUser />

        {/* Customer area */}
        <KioskLogin />
      </div>

      <footer className="mt-12 text-[10px] font-medium text-slate-400 uppercase tracking-widest">
        Version 1.0.1 (c) 2026 Swift POS
      </footer>
    </div>
  );
};

export default LandingPage;
