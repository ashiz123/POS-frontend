import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="inline-block transition-transform hover:scale-105 active:scale-95"
    >
      <div className="flex items-center justify-center w-12 h-12 bg-cyan-700 rounded-xl mb-4 shadow-lg shadow-cyan-200">
        <span className="text-white text-2xl font-black italic">N</span>
      </div>
    </Link>
  );
};

export default Logo;
