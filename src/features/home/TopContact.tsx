import { Mail, MessageCircle } from "lucide-react";
import { whatsappLink } from "../../utils/whatsappLink";

export default function TopContact() {
  return (
    <div
      className="bg-slate-50 border-b border-slate-200 text-slate-600 py-2 px-6 md:px-12 text-xs md:text-sm relative z-50"
      id="menu"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-2 sm:gap-0">
        <div className="flex items-center gap-4">
          <a
            href="mailto:hamalashiz@gmail.com"
            className="flex items-center gap-1.5 hover:text-cyan-600 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" /> hamalashiz@gmail.com
          </a>
        </div>
        <div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#25D366] hover:text-[#1da851] transition-colors font-medium"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  );
}
