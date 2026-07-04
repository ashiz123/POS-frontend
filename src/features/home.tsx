import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { scrollToSection } from "../utils/scrollToSection";
import Demo from "./home/Demo";
import Features from "./home/features";
import SystemManual from "./home/SystemManual";
import Navbar from "./home/Navbar";
import TrustPilot from "./home/TrustPilot";
import Footer from "./home/Footer";
import Chatbot from "./home/Chatbot";
import TopContact from "./home/TopContact";

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-cyan-500 selection:text-white">
      {/* Top Contact Header */}
      <TopContact />
      {/* Main Navigation */}
      <Navbar />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-16 pb-12 text-center md:text-left grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-cyan-600 uppercase bg-cyan-50 rounded-full border border-cyan-100">
            Next Gen POS
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
            Transaction power,
            <br />
            <span className="text-cyan-600">simplified.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg mx-auto md:mx-0">
            The enterprise-grade POS system built for high-volume retail.
            Integrated with intelligent tracking to give you real-time business
            insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link
              to="/business/user/register"
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold transition shadow-lg shadow-cyan-500/25"
            >
              Get Started Free
            </Link>
            <button
              onClick={() => scrollToSection("demo")}
              className="px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl font-bold transition"
            >
              Watch Demo
            </button>
          </div>
        </div>

        <div className="relative aspect-square md:aspect-auto md:h-[500px] bg-slate-100 rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200 overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            alt="Nodal POS Interface"
            className="w-full h-full object-cover object-center opacity-90 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>

          <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md border border-slate-200 p-4 rounded-xl shadow-xl transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-cyan-50 flex items-center justify-center shrink-0">
                <Star className="w-5 h-5 text-cyan-500" />
              </div>
              <div>
                <p className="text-slate-900 font-semibold text-sm">
                  Nodal POS v1.0
                </p>
                <p className="text-slate-500 text-xs">
                  Lightning fast checkouts
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* SPECIAL FULL-WIDTH TRUSTPILOT BANNER */}
      <TrustPilot />

      {/* DEMO Section */}
      <Demo />

      {/* Features Section */}
      <Features />

      {/* Documentation Section */}
      <SystemManual />

      {/* Basic Footer */}
      <Footer />

      {/* Floating Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <Chatbot />
      </div>
    </div>
  );
};

export default Home;
