import { PlayCircle } from "lucide-react";

const Demo = () => {
  return (
    <section id="demo" className="py-20 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3 text-slate-900">
            <PlayCircle className="text-cyan-500 w-8 h-8" />
            See it in Action
          </h2>
          <p className="text-slate-600 mb-8 leading-relaxed text-lg">
            Watch how easy it is to set up your business and start processing
            sales. Streamline POS is designed for zero-friction onboarding and
            high-speed checkouts.
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 font-bold border border-cyan-100">
                1
              </div>
              <div>
                <h4 className="text-slate-900 font-semibold mb-1">
                  Secure Setup
                </h4>
                <p className="text-sm text-slate-600">
                  Register with OTP authentication and await admin approval for
                  isolated data security.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 font-bold border border-cyan-100">
                2
              </div>
              <div>
                <h4 className="text-slate-900 font-semibold mb-1">
                  Terminal Configuration
                </h4>
                <p className="text-sm text-slate-600">
                  Admins generate unique PIN codes for store kiosks for rapid
                  shift access.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0 font-bold border border-cyan-100">
                3
              </div>
              <div>
                <h4 className="text-slate-900 font-semibold mb-1">
                  Start Selling
                </h4>
                <p className="text-sm text-slate-600">
                  Process sales instantly. Stock levels are automatically
                  updated in real-time globally.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative aspect-video w-full bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200">
          <iframe
            className="w-full h-full absolute inset-0"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="POS Demo Video"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Demo;
