import { useState } from "react";

const NavGroup = ({ icon, label, children, active = false }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium transition-colors 
          ${active ? "bg-cyan-600 text-white" : "hover:bg-slate-800 text-slate-300 hover:text-white"}`}
      >
        <div className="flex items-center gap-3">
          <span className="w-5">{icon}</span>
          {label}
        </div>
        {/* Chevron Icon */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Submenu Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
      >
        <div className="ml-9 space-y-1 border-l border-slate-700 pl-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default NavGroup;

//
