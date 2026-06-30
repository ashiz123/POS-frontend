import { createOrder } from "../../../services/kiosk/order";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ cartItems }) => {
  const subTotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const tax = subTotal * 0.13;

  const total = subTotal + tax;

  const navigate = useNavigate();

  const checkout = async () => {
    try {
      const formattedCart = cartItems.map((item) => ({
        productId: item.productId,
        sku: item.sku,
        quantity: item.quantity,
        price: item.price,
        totalStock: item.totalStock,
      }));
      const payload = {
        items: formattedCart,
      };
      const newOrder = await createOrder(payload);
      console.log("newOrder", newOrder);

      if (newOrder.success === true) {
        navigate("/customer/kiosk/payment", {
          state: {
            orderId: newOrder.data.metadata.orderId,
            businessId: newOrder.data.metadata.businessId,
            clientSecret: newOrder.data.client_secret,
            amount: newOrder.data.amount,
            currency: newOrder.data.currency,
          },
        });
      }
    } catch (error) {
      console.error("Error in checkout", error);
    }
  };

  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  return (
    <aside className="w-80 lg:w-96 bg-white border-l border-slate-200 flex flex-col shadow-2xl z-10">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Your Basket</h2>
        <p className="text-xs text-primary-500 font-medium">
          {totalItems} Items selected
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {cartItems.map((item, index) => {
          return (
            <div key={index} className="flex gap-4 items-center">
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold leading-tight text-slate-800 truncate">
                  {item.name}
                </p>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  Qty: {item.quantity}
                </p>
              </div>
              <span className="text-sm font-bold text-slate-800 flex-shrink-0">
                ${item.price.toFixed(2)}
              </span>

              {item.quantity >= item.totalStock && (
                <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded uppercase tracking-wider">
                  Max Stock
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Checkout Footer */}
      <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-slate-500 font-medium">Subtotal</span>
          <span className="font-bold text-slate-800">
            ${subTotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-slate-500 font-medium">Tax (Vat)</span>
          <span className="font-bold text-slate-800">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xl border-t border-slate-200 pt-4">
          <span className="font-black text-slate-900">Total</span>
          <span className="font-black text-cyan-700">${total.toFixed(2)}</span>
        </div>

        <button
          onClick={checkout}
          className="block text-center w-full py-4 text-base font-bold bg-cyan-700 hover:bg-cyan-800 text-white rounded-xl transition-all shadow-md shadow-cyan-700/10 tracking-wide"
        >
          Checkout
        </button>
      </div>
    </aside>
  );
};

export default CartSidebar;
