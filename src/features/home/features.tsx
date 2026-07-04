import {
  Package,
  Users,
  Monitor,
  BarChart3,
  BellRing,
  Building2,
} from "lucide-react";

const Features = () => {
  return (
    <section
      id="features"
      className="py-20 bg-slate-50 border-t border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
            Powerful Features,{" "}
            <span className="text-cyan-600">Zero Clutter</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Everything you need to manage your retail operations from a single
            dashboard, without the confusing enterprise bloatware.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all group">
            <Package className="w-10 h-10 text-cyan-500 mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3 text-slate-900">
              Managing Stock
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Real-time inventory tracking. Add products, update pricing, and
              sync stock counts instantly across all your connected branches.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all group">
            <Users className="w-10 h-10 text-cyan-500 mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3 text-slate-900">
              Managing Employees
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Role-based access controls. Invite staff via email to set secure
              passwords, restricting them strictly to kiosk operations.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all group">
            <Monitor className="w-10 h-10 text-cyan-500 mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3 text-slate-900">
              Creating Kiosks
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Generate unique, secure PIN codes for physical registers. Lock
              devices to your business to ensure safe, rapid shift check-ins.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all group">
            <BarChart3 className="w-10 h-10 text-cyan-500 mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3 text-slate-900">
              Sales Analysis
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Visualize your success. Track daily revenue, identify your
              best-selling items, and analyze peak business hours at a glance.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all group">
            <BellRing className="w-10 h-10 text-cyan-500 mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3 text-slate-900">
              Low Stock Warning
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Never miss a sale. Set custom threshold limits and receive
              automated warnings when crucial items are running low.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 hover:border-cyan-400 hover:shadow-lg transition-all group">
            <Building2 className="w-10 h-10 text-cyan-500 mb-5 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-3 text-slate-900">
              Multi-Branch Support
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Expand effortlessly. Manage multiple store locations, centralize
              your reporting, and control terminal access from one admin
              account.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
