import { useEffect, useState } from "react";
import Master from "../../../components/Master";
import { getOrderList } from "../../../services/admin/order";

type OrderType = {
  _id: string;
  businessId: string;
};

const OrderList = () => {
  const [orderItems, setOrderItems] = useState<OrderType[]>([]);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const orders = await getOrderList();
        console.log("orders", orders);

        setOrderItems(orders.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllOrders();
  }, []);

  console.log(orderItems);

  return (
    <Master>
      <div className="min-h-screen bg-slate-50 p-8 font-sans antialiased text-slate-900">
        <div className="max-w-6xl mx-auto">
          {/* <!-- Header Section --> */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-primary-600">
                Order Lists
              </h1>
              <p className="text-slate-500 text-sm">
                All your business orders.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search orders..."
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64 text-sm"
                />
                <svg
                  className="w-4 h-4 absolute left-3 top-3 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* <!-- Table Card --> */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    SN
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Order number
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Slug
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Stock Type
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {orderItems.map((order, index) => (
                  <tr key={order._id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">testing</td>
                    <td className="px-6 py-4 font-medium">testing</td>
                    <td className="px-6 py-4 text-slate-500">testing</td>
                    <td className="px-6 py-4">testing</td>
                    <td className="px-6 py-4">Completed</td>

                    <td className="px-6 py-4 text-right">
                      <button className="text-primary-600 hover:text-primary-800 font-medium mr-3">
                        Edit
                      </button>
                      <button className="text-red-500 hover:text-red-700 font-medium">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Master>
  );
};

export default OrderList;
