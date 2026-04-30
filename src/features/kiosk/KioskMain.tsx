import { Link } from "react-router-dom";

const KioskMain = () => {
  // Mock data for your testing - eventually this comes from your Node.js backend
  const categories = [
    "All",
    "Apparel",
    "Footwear",
    "Accessories",
    "Electronics",
  ];
  const products = [
    {
      id: 1,
      name: "Classic White Tee",
      price: 25.0,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Denim Jacket",
      price: 85.0,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Running Shoes",
      price: 120.0,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "Leather Wallet",
      price: 45.0,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      name: "Canvas Backpack",
      price: 65.0,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      name: "Snapback Cap",
      price: 30.0,
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="h-screen flex flex-col bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {/* 1. Header Area */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-cyan-700 rounded flex items-center justify-center">
            <span className="text-white font-bold italic">S</span>
          </div>
          <h1 className="text-xl tracking-tighter">SWIFT KIOSK</h1>
        </div>
        <Link
          to="/"
          className="text-xs font-bold text-slate-400 uppercase hover:text-red-500 transition-colors"
        >
          Exit Terminal
        </Link>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 2. Left Side: Product Browsing */}
        <main className="flex-1 flex flex-col p-6 overflow-y-auto">
          {/* Category Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-5">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-6  bg-white border border-slate-200 rounded-full text-sm font-bold hover:border-cyan-600 hover:text-cyan-600 transition-all shadow-sm whitespace-nowrap"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-cyan-200 transition-all cursor-pointer"
              >
                <div className="aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-slate-900 font-bold mb-1">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-700 font-black">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    title="sfsd"
                    className="bg-slate-100 p-2 rounded-lg group-hover:bg-cyan-700 group-hover:text-white transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        {/* 3. Right Side: The Side Cart (25%) */}
        <aside className="w-80 lg:w-96 bg-white border-l border-slate-200 flex flex-col shadow-2xl">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg">Your Basket</h2>
            <p className="text-xs text-slate-400">3 Items selected</p>
          </div>

          {/* Scrollable Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-md"></div>
              <div className="flex-1">
                <p className="text-sm font-bold leading-tight">
                  Classic White Tee
                </p>
                <p className="text-xs text-slate-400">Qty: 1</p>
              </div>
              <span className="text-sm font-bold">$25.00</span>
            </div>
            {/* Add more mock items here... */}
          </div>

          {/* Checkout Footer */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-bold">$130.00</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Tax (Vat)</span>
              <span className="font-bold">$13.00</span>
            </div>
            <div className="flex justify-between text-xl border-t border-slate-200 pt-4">
              <span className="font-black">Total</span>
              <span className="font-black text-cyan-700">$143.00</span>
            </div>
            <Link
              to="/kiosk/payment"
              className="btn-primary w-full py-4 text-lg"
            >
              Complete Payment
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default KioskMain;
