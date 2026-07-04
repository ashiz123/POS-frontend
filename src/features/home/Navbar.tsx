import { scrollToSection } from "../../utils/scrollToSection";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md z-40 flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto border-b border-slate-100">
        {/* Clickable Logo */}
        <a
          href="/"
          className="flex items-center gap-3 transition-transform hover:scale-105 active:scale-95 group"
        >
          <div className="flex items-center justify-center w-10 h-10 bg-cyan-600 rounded-xl shadow-lg shadow-cyan-600/30 group-hover:shadow-cyan-600/50 transition-shadow">
            <span className="text-white text-xl font-black italic">N</span>
          </div>
          <span className="text-2xl font-bold tracking-tighter text-cyan-600">
            Nodal.
          </span>
        </a>

        <div className="flex items-center gap-6">
          <button
            onClick={() => scrollToSection("features")}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("demo")}
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition hidden md:block"
          >
            Demo
          </button>
          <Link
            to="/business/login"
            className="px-5 py-2 rounded-full border border-slate-200 hover:bg-slate-50 transition font-medium text-sm text-slate-700"
          >
            Business Login
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
