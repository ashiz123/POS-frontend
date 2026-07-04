import { useEffect, useState } from "react";
import Master from "../../../components/Master";
import { getOrderList } from "../../../services/admin/order";
import { getDateOnly, getTimeOnly } from "../../../utils/date";

type OrderType = {
  _id: string;
  terminalId: {
    _id: string;
    name: string;
  };
  terminalSessionId: {
    assignId: { _id: string; email: string };
  };
  orderId: string;
  businessId: string;
  status: string;
  total: number;
  createdAt: string;
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
          <div
            className="w-full overflow-x-auto border border-slate-200 rounded-lg shadow-sm 
                scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100"
          >
            <table className="w-full text-left border-collapse">
              {/* 2. Added 'sticky top-0' to keep the header visible during vertical scroll */}
              <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    SN
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    Date
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    Time
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    Order number
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    Order total
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    Terminal name
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    Employee email
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {orderItems.map((order, index) => (
                  <tr
                    key={order._id}
                    className="hover:bg-slate-50 transition text-center"
                  >
                    {/* 3. Added 'whitespace-nowrap' to prevent cells from wrapping, ensuring horizontal scroll works */}
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {getDateOnly(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {getTimeOnly(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {order.total}
                    </td>
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {order.terminalId.name}
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {order.terminalSessionId?.assignId?.email || "-"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      {order.status}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
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
