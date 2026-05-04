import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Helper Component for Toggleable Menus
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

export const Sidebar = () => {
  const { business } = useAuth();
  const location = useLocation();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col min-h-screen">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20">
          S
        </div>
        <span className="text-white font-bold tracking-widest text-sm uppercase">
          {business?.name || "Nodal POS"}
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <Link
          to="/dashboard"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            location.pathname === "/dashboard"
              ? "bg-cyan-600 text-white"
              : "hover:bg-slate-800"
          }`}
        >
          <span className="w-5">📊</span> Dashboard
        </Link>

        {/* Products Group */}
        <NavGroup
          icon="📦"
          label="Products"
          active={location.pathname.startsWith("/product")}
        >
          <Link
            to="/product/list"
            className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
          >
            All Products
          </Link>
          <Link
            to="/product/create"
            className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
          >
            Add Product
          </Link>
        </NavGroup>

        {/* Categories Group */}
        <NavGroup
          icon="📂"
          label="Categories"
          active={location.pathname.startsWith("/category")}
        >
          <Link
            to="/category/list"
            className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
          >
            View All
          </Link>
          <Link
            to="/category/create"
            className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
          >
            New Category
          </Link>
        </NavGroup>

        {/* Payments Group */}
        <NavGroup icon="💳" label="Orders">
          <Link
            to="/transactions"
            className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
          >
            Transactions
          </Link>
          <Link
            to="/payouts"
            className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
          >
            Payouts
          </Link>
        </NavGroup>

        {/* Payments Group */}
        <NavGroup icon="💳" label="Payments">
          <Link
            to="/transactions"
            className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
          >
            Transactions
          </Link>
          <Link
            to="/payouts"
            className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
          >
            Payouts
          </Link>
        </NavGroup>

        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-800 rounded-md text-sm font-medium transition-colors">
          <span className="w-5">🖥️</span> Terminals
        </button>
      </nav>

      {/* Logout Footer */}
      <div className="p-4 border-t border-slate-800">
        <button className="w-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-red-400 transition-colors">
          Logout
        </button>
      </div>
    </aside>
  );
};
