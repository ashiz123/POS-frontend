const ProductCard = ({ product, onAddToCart }) => {
  const productDataForCart = {
    productId: product._id,
    name: product.name,
    sku: product.sku,
    quantity: 1,
    price: product.sellPrice,
    totalStock: product.totalStock,
  };

  const handleAddToCart = () => {
    onAddToCart(productDataForCart);
  };

  return (
    <div
      key={product._id}
      className="group bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-cyan-200 transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        <div className="aspect-square bg-slate-100 rounded-xl mb-4 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="text-slate-900 font-bold mb-2 line-clamp-2">
          {product.name}
        </h3>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-cyan-700 font-black text-lg">
          ${product.sellPrice}
        </span>
        <button
          type="button"
          title="Add to Basket"
          onClick={handleAddToCart}
          className="bg-slate-100 p-2.5 rounded-xl text-slate-700 group-hover:bg-cyan-700 group-hover:text-white transition-colors"
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
              strokeWidth="2.5"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
