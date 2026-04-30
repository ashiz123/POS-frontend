export const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center text-white font-bold">
          S
        </div>
        <span className="text-white font-bold tracking-widest text-sm">
          SWIFT ADMIN
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-2 bg-cyan-600 text-white rounded-md text-sm font-medium">
          <span className="w-5">📊</span> Dashboard
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-800 rounded-md text-sm font-medium transition-colors">
          <span className="w-5">📦</span> Products
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-800 rounded-md text-sm font-medium transition-colors">
          <span className="w-5">📂</span> Categories
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-800 rounded-md text-sm font-medium transition-colors">
          <span className="w-5">💳</span> Payments
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-slate-800 rounded-md text-sm font-medium transition-colors">
          <span className="w-5">🖥️</span> Terminals
        </button>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="w-full px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-red-400">
          Logout
        </button>
      </div>
    </aside>
  );
};
