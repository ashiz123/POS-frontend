import { useEffect, useState } from "react";
// import { TrendingUp, AlertTriangle, Divide } from "lucide-react";
import { voidOrders } from "../../../services/admin/dashboard";

const VoidOrderedCard = () => {
  const [voidOrdered, setVoidOrdered] = useState([]);

  useEffect(() => {
    const voidOrdered = async () => {
      try {
        const order = await voidOrders();
        setVoidOrdered(order.data);
      } catch (error) {
        console.error(error);
      }
    };

    voidOrdered();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
        Void Orders
      </p>
      <p className="text-2xl font-black text-slate-900">{voidOrdered.length}</p>
      <p className="text-[10px] font-bold mt-2 text-cyan-600">Running</p>
    </div>
  );
};

export default VoidOrderedCard;
