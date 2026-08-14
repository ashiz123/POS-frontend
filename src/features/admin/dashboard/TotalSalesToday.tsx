import { useEffect, useState } from "react";
import { totalNetSales } from "../../../services/admin/dashboard";

const TotalSalesToday = () => {
  const [sales, setSales] = useState<number>(0);

  useEffect(() => {
    const totalSales = async () => {
      try {
        const salesValue = await totalNetSales();
        setSales(salesValue.data);
      } catch (error) {
        console.error(error);
      }
    };

    totalSales();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
        Total Sales Today
      </p>
      <p className="text-2xl font-black text-slate-900">${sales}</p>
      <p className="text-[10px] font-bold mt-2 text-emerald-600">+12%</p>
    </div>
  );
};

export default TotalSalesToday;
