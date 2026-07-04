import React from "react";
import { MessageCircle, MapPin, Mail, ChevronRight, Store } from "lucide-react";
import { whatsappLink } from "../../utils/whatsappLink";

const Footer = () => {
  // Replace this with your actual WhatsApp number in international format (e.g., 447123456789)

  return (
    <footer className="bg-primary-950 border-t border-slate-900 pt-20 pb-10 text-sm relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16 items-start">
          {/* Brand Column */}
          <div>
            <div className="text-2xl font-bold tracking-tighter text-primary-300 mb-4 flex items-center gap-2">
              <Store className="w-6 h-6" />
              Nodal POS
            </div>
            <p className="text-slate-400 leading-relaxed mb-6 pr-4">
              The cloud-native retail management platform built for speed,
              security, and multi-tenant scalability. Elevate your business
              operations today.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="space-y-3">
              {["Menu", "Features", "Demo", "Manual"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="w-3 h-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Details Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Business Details</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
                <span>
                  Nodal POS Retail Tech Ltd.
                  <br />
                  Folkestone, Kent
                  <br />
                  United Kingdom
                </span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="w-5 h-5 text-slate-500 shrink-0" />
                <a
                  href="mailto:support@streamlinepos.com"
                  className="hover:text-blue-400 transition-colors"
                >
                  hamalashiz@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* WhatsApp Direct Contact Column */}
          <div>
            <h4 className="text-white font-semibold mb-4">Direct Support</h4>
            <p className="text-slate-400 mb-4">
              Have questions about setup or pricing? Message us directly for
              instant support.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366] hover:text-white px-5 py-3 rounded-xl font-medium transition-all group shadow-[0_0_20px_-5px_rgba(37,211,102,0.3)] hover:shadow-[0_0_25px_-5px_rgba(37,211,102,0.5)]"
            >
              <MessageCircle className="w-5 h-5 group-hover:animate-bounce" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
          <p>
            © {new Date().getFullYear()} Streamline POS. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
