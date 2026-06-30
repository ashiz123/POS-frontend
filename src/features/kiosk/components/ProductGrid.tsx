import ProductCard from "./ProductCard";

const ProductGrid = ({ products, categories, activeCategory, onAddToCart }) => {
  return (
    <main className="flex-1 bg-slate-50 p-6 overflow-y-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          {categories.find((c) => c._id === activeCategory)?.title ||
            "Products"}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </main>
  );
};

export default ProductGrid;
