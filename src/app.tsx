import React from "react";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-6 font-sans text-slate-800">
      {/* Logo Section */}
      <div className="mb-12 flex flex-col items-center">
        <div className="flex items-center gap-3">
          {/* Stylized 'S' Logo Placeholder */}
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-600 to-slate-700 rounded-lg flex items-center justify-center shadow-md">
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

      {/* Main Container */}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Left Card: Business & Staff Access */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-200 shadow-xl flex flex-col">
          <h2 className="text-center font-bold text-slate-700 uppercase tracking-wide mb-6">
            Business & Staff Access
          </h2>

          <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Username/Email
              </label>
              <input
                type="text"
                placeholder="Username/Email"
                className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none bg-white transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none bg-white transition-all"
              />
              <button className="text-xs text-cyan-700 hover:underline mt-2 float-right">
                Forgot Password?
              </button>
            </div>

            <button className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 rounded-md transition-colors shadow-lg mt-4">
              Login
            </button>
          </div>

          <button className="mt-6 w-full py-3 rounded-md border-2 border-slate-300 text-slate-600 font-bold hover:bg-slate-100 transition-all uppercase text-sm tracking-tighter">
            Create New Business Account
          </button>
        </div>

        {/* Right Card: Customer Area Access */}
        <div className="bg-cyan-50/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-100 shadow-xl flex flex-col">
          <h2 className="text-center font-bold text-cyan-900 uppercase tracking-wide mb-6">
            Customer Area Access
          </h2>

          <div className="space-y-4 flex-grow flex flex-col justify-center">
            {/* Kiosk Button */}
            <button className="group w-full bg-white border border-cyan-200 rounded-xl p-4 flex flex-col items-center hover:border-cyan-500 transition-all shadow-sm hover:shadow-md">
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
              <span className="bg-cyan-700 text-white w-full py-2 rounded font-bold text-sm group-hover:bg-cyan-800 transition-colors uppercase">
                Launch Customer Kiosk
              </span>
            </button>

            {/* Account/Rewards Button */}
            <button className="group w-full bg-white border border-cyan-200 rounded-xl p-4 flex flex-col items-center hover:border-cyan-500 transition-all shadow-sm hover:shadow-md">
              <div className="text-slate-400 mb-1">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <span className="text-[10px] block font-bold text-center">
                  Guest
                </span>
              </div>
              <span className="bg-cyan-700 text-white w-full py-2 rounded font-bold text-sm group-hover:bg-cyan-800 transition-colors uppercase">
                Customer Account / Rewards
              </span>
              <span className="text-[10px] text-slate-500 mt-2 font-medium">
                Check status and history
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-[10px] font-medium text-slate-400 uppercase tracking-widest">
        Version 1.0.1 (c) 2026 Swift POS
      </footer>
    </div>
  );
};

export default App;
