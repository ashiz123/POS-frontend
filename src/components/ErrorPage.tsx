import React from "react";
import { Link, useNavigate } from "react-router-dom";
import type { ErrorPageProps } from "../types/ErrorPage";

const ErrorPage: React.FC<ErrorPageProps> = ({ title, code, message }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Logo/Header Consistency */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-700 rounded-xl mb-4 shadow-lg shadow-cyan-200">
            <span className="text-white text-2xl font-black italic">S</span>
          </div>
        </div>

        {/* 404 Card */}
        <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-xl shadow-slate-200/50 text-center">
          <div className="mb-6">
            <h1 className="text-6xl font-black text-slate-200 tracking-tighter">
              {code}
            </h1>
            <h2 className="text-2xl font-blasck text-slate-900 mt-2">
              {title}
            </h2>
            <p className="text-slate-500 text-sm mt-3 leading-relaxed">
              {/* The page you are looking for might have been removed, had its name
              changed, or is temporarily unavailable. */}
              {message}
            </p>
          </div>

          <div className="space-y-3">
            {/* Primary Action */}
            <Link
              to="/dashboard"
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 shadow-lg shadow-cyan-100"
            >
              <span>🏠</span> Back to Dashboard
            </Link>

            {/* Secondary Action */}
            <button
              onClick={() => navigate(-1)}
              className="w-full py-4 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
            >
              ← Go Back
            </button>
          </div>
        </div>

        {/* Footer Support Info */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-loose">
            Need help? Contact{" "}
            <span className="text-slate-600 font-bold">Nodal Support</span>
          </p>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">
            Folkestone Branch System
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
