const CategorySidebar = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col overflow-y-auto p-4 space-y-2">
      <div className="px-3 mb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Categories
        </p>
      </div>
      {categories.map((cat) => {
        const isActive = activeCategory === cat._id;
        return (
          <button
            key={cat._id || cat.title}
            type="button"
            onClick={() => onSelectCategory(cat._id)}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              isActive
                ? "bg-cyan-700 text-white shadow-md shadow-cyan-700/10"
                : "text-slate-600 hover:bg-slate-50 hover:text-cyan-700 border border-transparent hover:border-slate-100"
            }`}
          >
            {cat.title}
          </button>
        );
      })}
    </aside>
  );
};

export default CategorySidebar;
