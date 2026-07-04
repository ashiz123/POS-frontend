import { BookOpen } from "lucide-react";
import { docsData } from "../../datas/docsData";
import { Link } from "react-router-dom";

const SystemManual = () => {
  return (
    <section id="manual" className="py-20 border-t border-slate-200">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10 flex items-center justify-center gap-3 text-slate-900">
          <BookOpen className="text-cyan-500" /> System Manual
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-left">
          {docsData.map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
            >
              <h3 className="font-bold text-cyan-600 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-sm">{item.content}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Link
            to="/docs"
            className="inline-flex items-center gap-2 text-cyan-600 font-semibold hover:text-cyan-700 hover:underline transition"
          >
            Read Full System Manual &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SystemManual;
