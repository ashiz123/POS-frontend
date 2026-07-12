import { useEffect, useState } from "react";
// import { TrendingUp, AlertTriangle } from "lucide-react";
import { bestSellingItems } from "../../../services/admin/dashboard";
import type { MaximumSold } from "../business/Dashboard";

const BestSellerCard = () => {
  const [bestItems, setBestItems] = useState<MaximumSold | null>(null);

  useEffect(() => {
    const bestSoldProducts = async () => {
      try {
        const bestSelling = await bestSellingItems();
        setBestItems(bestSelling.data);
      } catch (error) {
        console.error(error);
      }
    };

    bestSoldProducts();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
      {/* <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          <TrendingUp size={20} />
        </div>
        {bestItems && (
          <div className="flex items-center gap-1 bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            <AlertTriangle size={10} />
            Action Required
          </div>
        )}
      </div> */}

      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
        Best Selling Item
      </p>

      <h3 className="text-lg font-bold text-slate-900 truncate mb-1">
        {bestItems?.productName || "No sales yet"}
      </h3>

      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-black text-slate-900">
          {bestItems?.totalSold}{" "}
          <span className="text-sm font-medium text-green-500">units</span>
        </p>
      </div>
    </div>
  );
};

export default BestSellerCard;
