import Master from "../../components/Master";
import { stats } from "../../datas/dashboardStats";

const Dashboard = () => {
  return (
    <Master>
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm"
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
              <p className={`text-[10px] font-bold mt-2 ${stat.color}`}>
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Transactions Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-700">
              Recent Transactions
            </h3>
            <button className="text-xs text-cyan-600 font-bold hover:underline">
              View All
            </button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-500">
                <th className="px-6 py-3 font-bold">Order ID</th>
                <th className="px-6 py-3 font-bold">Status</th>
                <th className="px-6 py-3 font-bold">Method</th>
                <th className="px-6 py-3 font-bold">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm text-slate-600 divide-y divide-slate-100">
              <tr>
                <td className="px-6 py-4 font-medium">#SW-1029</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold uppercase">
                    Success
                  </span>
                </td>
                <td className="px-6 py-4">Card</td>
                <td className="px-6 py-4 font-bold">$45.00</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">#SW-1030</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded text-[10px] font-bold uppercase">
                    Pending
                  </span>
                </td>
                <td className="px-6 py-4">Cash</td>
                <td className="px-6 py-4 font-bold">$12.50</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Master>
  );
};

export default Dashboard;
