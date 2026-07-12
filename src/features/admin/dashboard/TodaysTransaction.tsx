import { useEffect, useState } from "react";
// import { TrendingUp, AlertTriangle } from "lucide-react";
import { transactionToday } from "../../../services/admin/dashboard";

type OrderType = {
  orderId: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  total: number;
  terminalId: { _id: string; name: string };
};

const TodaysTransactions = () => {
  const [transactions, setTransactions] = useState<OrderType[]>([]);

  useEffect(() => {
    const todaysTransactions = async () => {
      try {
        const transactionData = await transactionToday();
        setTransactions(transactionData.data);
      } catch (error) {
        console.error(error);
      }
    };

    todaysTransactions();
  }, []);

  console.log("transations", transactions);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h3 className="text-sm font-bold text-slate-700">
          Todays Transactions
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
            <th className="px-6 py-3 font-bold">Terminal</th>
            <th className="px-6 py-3 font-bold">Amount</th>
          </tr>
        </thead>
        <tbody className="text-sm text-slate-600 divide-y divide-slate-100">
          {transactions.map((transaction, id) => {
            return (
              <tr key={id}>
                <td className="px-6 py-4 font-medium">
                  #{transaction.orderId}
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold uppercase">
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4">Card</td>
                <td className="px-6 py-4">{transaction.terminalId.name}</td>
                <td className="px-6 py-4 font-bold">
                  ${transaction.total.toFixed(2)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TodaysTransactions;
