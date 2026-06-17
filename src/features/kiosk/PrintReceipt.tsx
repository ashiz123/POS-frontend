import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../hooks/useCartContext";

export default function PrintReceiptPage({ orderId = "105" }) {
  const navigate = useNavigate();
  const { cart, clearCart } = useCartContext();

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  useEffect(() => {
    // 1. Automatically open the print dialog the second this page loads
    // We wrap it in a tiny timeout to ensure the DOM has fully painted first
    const printTimeout = setTimeout(() => {
      window.print();
    }, 500);

    // 2. The Magic Event Listener: Detect when the print dialog closes
    const handleAfterPrint = () => {
      clearCart(); // Safely wipe the cart now that printing is done
      navigate("/kiosk/main"); // Instantly send the next customer to the start screen
    };

    // The 'afterprint' event fires whether they click "Print" OR "Cancel"!
    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      clearTimeout(printTimeout);
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [navigate, clearCart]);

  return (
    // We make the background white and use font-mono to simulate a real receipt
    <div className="bg-white min-h-screen text-black font-mono p-8 max-w-[80mm] mx-auto">
      {/* This alert is ONLY visible on the screen, not on the paper!
        'print:hidden' is a Tailwind lifesaver here. 
      */}
      <div className="print:hidden bg-blue-50 text-blue-800 p-4 rounded-xl mb-8 text-center font-sans">
        <p className="font-bold text-lg">Opening Print Dialog...</p>
        <p className="text-sm mt-2">
          If it doesn't open automatically, click the button below.
        </p>

        <button
          onClick={() => window.print()}
          className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold w-full"
        >
          Print Now
        </button>

        <button
          onClick={() => {
            clearCart();
            navigate("/kiosk/main");
          }}
          className="mt-2 text-slate-500 underline py-2 text-sm w-full"
        >
          Cancel and return to menu
        </button>
      </div>

      {/* --- THE ACTUAL RECEIPT TO BE PRINTED --- */}
      <div>
        <div className="text-center mb-6 text-xl font-bold uppercase">
          Your Restaurant
        </div>

        <div className="border-b-2 border-black border-dashed pb-2 mb-2">
          <p>Order: #{orderId}</p>
          <p>{new Date().toLocaleString()}</p>
        </div>

        <div className="mb-4">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between mb-1 text-sm">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t-2 border-black border-dashed pt-2 mb-6 flex justify-between font-bold text-lg">
          <span>TOTAL</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div>

        <div className="text-center text-xs">
          <p>Thank you!</p>
        </div>
      </div>
    </div>
  );
}
