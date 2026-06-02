import { useState } from "react"; // CHANGE: Added useState
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavGroup from "./NavGroup";

export const Sidebar = () => {
  const { business } = useAuth();
  const location = useLocation();

  // CHANGE: Added state to track if sidebar is collapsed
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      /* CHANGE: Dynamic width (w-64 to w-20) and transition classes */
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-slate-900 text-slate-300 flex flex-col min-h-screen transition-all duration-300 ease-in-out relative`}
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3 overflow-hidden">
        {/* Logo Icon (Always visible) */}
        <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-500/20 shrink-0">
          S
        </div>

        {/* CHANGE: Wrapped text in a div that hides/shows based on state */}
        {!isCollapsed && (
          <span className="text-white font-bold tracking-widest text-sm uppercase truncate animate-in fade-in duration-500">
            {business?.name || "Nodal POS"}
          </span>
        )}
      </div>

      {/* CHANGE: The Toggle Button (Absolute positioned to stay neat) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-7 bg-cyan-600 text-white rounded-full p-1 border-2 border-slate-900 hover:bg-cyan-500 transition-colors z-50"
      >
        {isCollapsed ? "▶" : "◀"}
      </button>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto overflow-x-hidden">
        {/* Dashboard Link */}
        <Link
          to="/business/dashboard"
          className={`w-full flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            location.pathname === "/dashboard"
              ? "bg-cyan-600 text-white"
              : "hover:bg-slate-800"
          }`}
        >
          <span className="w-5 text-lg">📊</span>
          {/* CHANGE: Hide text when collapsed */}
          {!isCollapsed && <span className="truncate">Dashboard</span>}
        </Link>

        {/* 
            CHANGE: Passing isCollapsed to NavGroup might be necessary 
            if NavGroup handles its own labels. I've wrapped labels here 
            assuming NavGroup accepts children.
        */}

        <NavGroup
          icon="📦"
          label={!isCollapsed ? "Products" : ""}
          active={location.pathname.startsWith("/business/product")}
        >
          {!isCollapsed && (
            <div className="ml-4 border-l border-slate-800 pl-4">
              <Link
                to="/business/product/list"
                className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
              >
                All Products
              </Link>
              <Link
                to="/business/product/create"
                className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
              >
                Add Product
              </Link>
            </div>
          )}
        </NavGroup>

        <NavGroup
          icon="📂"
          label={!isCollapsed ? "Categories" : ""}
          active={location.pathname.startsWith("/business/category")}
        >
          {!isCollapsed && (
            <div className="ml-4 border-l border-slate-800 pl-4">
              <Link
                to="/business/category/list"
                className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
              >
                View All
              </Link>
              <Link
                to="/business/category/create"
                className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
              >
                New Category
              </Link>
            </div>
          )}
        </NavGroup>

        <NavGroup
          icon="💳"
          label={!isCollapsed ? "Payment" : ""}
          active={location.pathname.startsWith("/business/payment")}
        >
          {!isCollapsed && (
            <div className="ml-4 border-l border-slate-800 pl-4">
              <Link
                to="/business/payment/transactions"
                className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
              >
                Transactions
              </Link>
              <Link
                to="/business/payment/payouts"
                className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
              >
                Payouts
              </Link>
            </div>
          )}
        </NavGroup>

        <NavGroup
          icon="👥"
          label={!isCollapsed ? "Employee" : ""}
          active={location.pathname.startsWith("/business/employee")}
        >
          {!isCollapsed && (
            <div className="ml-4 border-l border-slate-800 pl-4">
              <Link
                to="/business/employee/create"
                className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
              >
                Create Employee
              </Link>
              <Link
                to="/business/employee/list"
                className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
              >
                Manage Employee
              </Link>
            </div>
          )}
        </NavGroup>

        <NavGroup
          icon="📂"
          label={!isCollapsed ? "Settings" : ""}
          active={location.pathname.startsWith("/business/settings")}
        >
          {!isCollapsed && (
            <div className="ml-4 border-l border-slate-800 pl-4">
              <Link
                to="/business/settings/kiosk/request"
                className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
              >
                Request Kiosk
              </Link>
              <Link
                to="/business/settings/create"
                className="block py-1.5 text-xs text-slate-400 hover:text-cyan-400"
              >
                New Settings
              </Link>
            </div>
          )}
        </NavGroup>

        <Link
          to="/business/orders"
          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-800 rounded-md text-sm font-medium transition-colors"
        >
          <span className="w-5 text-lg">🖥️</span>
          {!isCollapsed && <span className="truncate">Orders</span>}
        </Link>

        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-800 rounded-md text-sm font-medium transition-colors text-left">
          <span className="w-5 text-lg">📟</span>
          {!isCollapsed && <span className="truncate">Terminals</span>}
        </button>
      </nav>

      {/* Logout Footer */}
      <div className="p-4 border-t border-slate-800">
        <button className="w-full px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-red-400 transition-colors truncate">
          {/* CHANGE: Minimal logout button view when collapsed */}
          {isCollapsed ? "BYE" : "Logout"}
        </button>
      </div>
    </aside>
  );
};
