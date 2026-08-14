import { Layers } from "lucide-react";
import { retrieveImageFromServer } from "../../../utils/retrieveImageFromServer";

const CategorySidebar = ({ categories, activeCategory, onSelectCategory }) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col overflow-y-auto p-4 space-y-2">
      <div className="px-3 mb-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Categories
        </p>
      </div>

      <div className="space-y-1.5">
        {categories.map((cat) => {
          const isActive = activeCategory === cat._id;
          const imageSrc = retrieveImageFromServer(cat.imageUrl);

          return (
            <button
              key={cat._id || cat.title}
              type="button"
              onClick={() => onSelectCategory(cat._id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                isActive
                  ? "bg-cyan-700 text-white shadow-md shadow-cyan-700/20"
                  : "text-slate-600 hover:bg-slate-50 hover:text-cyan-700 border border-transparent hover:border-slate-100"
              }`}
            >
              {/* Category Thumbnail Container */}
              <div
                className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden transition-colors ${
                  isActive
                    ? "bg-cyan-800/60 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={cat.title || cat.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : null}

                <div
                  className={`w-full h-full flex items-center justify-center ${
                    imageSrc ? "hidden" : ""
                  }`}
                >
                  <Layers className="w-4 h-4" />
                </div>
              </div>

              {/* Category Name */}
              <span className="truncate">{cat.title || cat.name}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default CategorySidebar;
