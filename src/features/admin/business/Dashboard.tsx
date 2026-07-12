import { useEffect } from "react";
import Master from "../../../components/Master";
import BestSellerCard from "../dashboard/BestSellingItem";
import LowStockItems from "../dashboard/LowStockItems";
import TotalSalesToday from "../dashboard/TotalSalesToday";
import VoidOrderedCard from "../dashboard/VoidOrdered";
import TodaysTransactions from "../dashboard/TodaysTransaction";

export type MaximumSold = {
  productId: string;
  productName: string;
  totalSold: number;
  totalRevenue: number;
};

const Dashboard = () => {
  useEffect(() => {});

  return (
    <Master>
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TotalSalesToday />

          <VoidOrderedCard />

          <LowStockItems />

          <BestSellerCard />
        </div>

        {/* Recent Transactions Table */}
        <TodaysTransactions />
      </div>
    </Master>
  );
};

export default Dashboard;
