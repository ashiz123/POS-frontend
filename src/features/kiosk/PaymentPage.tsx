import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useKioskDevice } from "../../hooks/useKioskDevice";
import { completeOrder } from "../../services/kiosk/order";
import { SuccessMessage } from "../../components/Message";
import { useCartContext } from "../../hooks/useCartContext";

// { total, onCancel, onSuccess }
const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [success, setSuccess] = useState(false);
  const { clearCart } = useCartContext();

  const location = useLocation();

  const { paymentTerminal } = useKioskDevice();

  const navigate = useNavigate();

  const handleResetKiosk = () => {
    navigate("/customer/kiosk/main");
  };

  useEffect(() => {
    let timeoutId;

    if (success) {
      timeoutId = setTimeout(() => {
        handleResetKiosk();
      }, 10000);
    }

    return () => clearTimeout(timeoutId);
  }, [success]);

  if (!paymentTerminal) {
    console.log("Payment terminal not found");
    return <Navigate to="/customer/kiosk/main" />;
  }

  const { orderId, clientSecret, amount, currency } = location.state || {};

  if (!orderId) {
    return <Navigate to="/customer/kiosk/main" />;
  }

  //This function act like presenting payment terminal
  const completePayment = async () => {
    try {
      if (!clientSecret) {
        console.error("PaymentIntent or client_secret missing");
        return;
      }

      const collectResult =
        await paymentTerminal.collectPaymentMethod(clientSecret);

      if ("error" in collectResult) {
        console.error("Failed to collect payment method", collectResult.error);
        return;
      }

      const pIntent = collectResult.paymentIntent;

      const processResult = await paymentTerminal.processPayment(pIntent);
      if ("error" in processResult) {
        console.error("Failed to process payment", processResult.error);
        return;
      }

      console.log("payment successful", processResult.paymentIntent.status);

      const completeResult = await completeOrder(
        orderId,
        processResult.paymentIntent.id,
      );

      if (completeResult.success === true) {
        setSuccess(true);
        clearCart();
        // navigate("/customer/kiosk/print-receipt");
      }
    } catch (error) {
      console.log("Critical error found during complete order", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-black text-slate-800">Checkout</h2>
          <button
            // onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 text-2xl"
          >
            &times;
          </button>
        </div>

        {success && (
          <>
            <SuccessMessage onClose={() => setSuccess(false)}>
              {" "}
              Payment is Successful. Order completed
            </SuccessMessage>
          </>
        )}

        <div className="p-8">
          {/* Total Display */}
          <div className="text-center mb-8">
            <p className="text-m font-bold text-slate-400 uppercase tracking-widest mb-2">
              {currency.toUpperCase()} &nbsp; {(amount / 100).toFixed(2)}
            </p>
            <p className="text-5xl font-black text-cyan-700">
              {/* ${total.toFixed(2)} */}
            </p>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3 mb-8">
            <label className="text-xs font-bold text-slate-500 uppercase">
              Select Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod("card")}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === "card"
                    ? "border-cyan-600 bg-cyan-50 text-cyan-700"
                    : "border-slate-100 text-slate-400"
                }`}
              >
                <span className="text-2xl">💳</span>
                <span className="font-bold text-xs">Credit Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod("cash")}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === "cash"
                    ? "border-cyan-600 bg-cyan-50 text-cyan-700"
                    : "border-slate-100 text-slate-400"
                }`}
              >
                <span className="text-2xl">💵</span>
                <span className="font-bold text-xs">Cash</span>
              </button>
            </div>
          </div>

          {/* Payment Action */}
          <div className="space-y-4">
            {paymentMethod === "card" ? (
              <div className="bg-slate-50 p-4 rounded-lg border border-dashed border-slate-300 text-center">
                <p className="text-sm text-slate-600 font-medium animate-pulse">
                  Please tap or insert card on the terminal...
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Amount Tendered"
                  className="input-field text-center text-xl font-bold"
                />
                <p className="text-center text-xs text-slate-400">
                  Calculate change automatically
                </p>
              </div>
            )}

            <button
              //   onClick={() => onSuccess(paymentMethod)}
              className="btn-primary w-full py-4 text-lg shadow-cyan-200"
              onClick={completePayment}
            >
              Confirm & Print Receipt
            </button>

            {success && (
              <>
                <button className="btn-primary w-full py-4 text-lg shadow-cyan-200">
                  Start New Order
                </button>
                <p className="text-slate-400 p-3 font-medium text-center">
                  Resetting in 10 seconds...
                </p>
              </>
            )}

            <Link
              to="/kiosk/main"
              //   onClick={onCancel}
              className="w-full text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Cancel & Back to Cart
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-slate-50 px-8 py-4 text-center">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
            Transaction Secured by Nodal Pay • Terminal ID: #01-FOLKESTONE
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
