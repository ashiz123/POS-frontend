import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Header = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Left Side: Page Title (Matches Sidebar style) */}
      <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hidden md:block">
        Management Console
      </h2>

      {/* Right Side: Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <Link
          to=""
          className="p-2 text-slate-400 hover:text-cyan-700 transition-colors relative"
        >
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v1m6 0H9"
            />
          </svg>
        </Link>

        {/* PROFILE DROPDOWN CONTAINER */}
        <div className="relative">
          {/* Header Icon / Trigger */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`
                    flex items-center gap-3 p-1.5 pr-4 rounded-2xl transition-all duration-200 outline-none
                    ${isDropdownOpen ? "bg-slate-100 ring-1 ring-slate-200" : "hover:bg-slate-50"}
                `}
          >
            {/* 1. Avatar Box: Mirrors your 'S' Logo style */}
            <div className="w-10 h-10 bg-cyan-700 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-200/40 border border-white/10">
              <span className="text-white text-lg font-black italic">
                {user?.name?.charAt(0) || "A"}
              </span>
            </div>

            {/* 2. Text Content: Clean alignment */}
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-black text-slate-900 leading-none tracking-tight">
                {user?.name || "Ashiz"}
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                {/* Status indicator */}
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span className="text-[9px] font-bold uppercase tracking-[0.1em] text-slate-400">
                  Administrator
                </span>
              </div>
            </div>

            {/* 3. Interaction Cue: Custom Chevron */}
            <svg
              className={`w-3.5 h-3.5 ml-1 text-slate-400 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* THE POPUP MENU */}
          {isDropdownOpen && (
            <>
              {/* Invisible Backdrop to close when clicking outside */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              ></div>

              <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-200/50 z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-slate-50 mb-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Logged in as
                  </p>
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {user?.email || "user@swiftpos.com"}
                  </p>
                </div>

                {/* Links */}
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-cyan-700 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Your Profile
                </Link>

                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-cyan-700 transition-colors"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Settings
                </Link>

                <div className="h-[1px] bg-slate-50 my-1"></div>

                {/* Logout Button */}
                <button
                  onClick={() => {
                    logout();
                    setIsDropdownOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-bold"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
