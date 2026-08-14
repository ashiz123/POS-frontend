import { useEffect, useState } from "react";
import { lowStockProducts } from "../../../services/admin/dashboard";

const LowStockItems = () => {
  const [stockItems, setStockItems] = useState([]);

  useEffect(() => {
    const lowStockProductItems = async () => {
      try {
        const products = await lowStockProducts();
        setStockItems(products.data);
      } catch (error) {
        console.error(error);
      }
    };

    lowStockProductItems();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
        Low Stock Items
      </p>
      <p className="text-2xl font-black text-slate-900">{stockItems.length}</p>
      <p className="text-[10px] font-bold mt-2 text-emerald-600">+12%</p>
    </div>
  );
};

export default LowStockItems;
