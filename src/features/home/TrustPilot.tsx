import { Star } from "lucide-react";

const TrustPilot = () => {
  return (
    <>
      <div className="w-full bg-primary-100 border-y border-[#00b67a]/20 py-8 my-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-[#00b67a] p-1.5 rounded-sm shadow-sm">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="text-2xl font-bold text-slate-900 tracking-tight">
              Excellent
            </span>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300"></div>
            <span className="text-slate-600 text-lg">
              Based on <strong className="text-slate-900">500+ reviews</strong>{" "}
              on
            </span>
            <span className="inline-flex items-center gap-1.5 font-bold text-slate-900 text-xl ml-1">
              <Star className="w-6 h-6 text-[#00b67a] fill-[#00b67a]" />
              Trustpilot
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrustPilot;
