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
