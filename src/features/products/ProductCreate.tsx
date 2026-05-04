import { Link } from "react-router-dom";
import Master from "../../components/Master";
import { useGetCategories } from "../../hooks/useGetCategories";

const ProductCreate = () => {
  const { categories, loading } = useGetCategories();

  if (loading) return <div>Loading...</div>;

  return (
    <Master>
      <div className="min-h-screen bg-slate-50 flex justify-center p-6">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-black tracking-tight text-primary-600">
              Add New Product
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Fill in the details to update your inventory
            </p>
          </div>

          {/* Card Container - Matching rounded-3xl and shadows */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
            <form className="space-y-5">
              {/* Product Name */}
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1"
                >
                  Product Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Product name"
                  className="input-field" // Using your global class
                  // onChange={handleChange}
                  // value={formData.name}
                />
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1"
                >
                  Product Name
                </label>
                <textarea
                  id="name"
                  rows={3}
                  name="description"
                  placeholder="Product Description"
                  className="input-field" // Using your global class
                  // onChange={handleChange}
                  // value={formData.name}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Category - With Custom Chevron for Consistency */}
                <div className="space-y-1">
                  <label
                    htmlFor="category"
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1"
                  >
                    Category
                  </label>
                  <div className="relative group">
                    <select
                      id="category"
                      name="category"
                      className="input-field appearance-none cursor-pointer pr-10"
                      // onChange={handleChange}
                      // value={formData.category}
                    >
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 group-focus-within:text-cyan-700">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* SKU */}
                <div className="space-y-1">
                  <label
                    htmlFor="sku"
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1"
                  >
                    SKU / Barcode
                  </label>
                  <input
                    id="sku"
                    name="sku"
                    type="text"
                    placeholder="Scan or type code"
                    className="input-field"
                    //   onChange={handleChange}
                    //   value={formData.sku}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Price */}
                <div className="space-y-1">
                  <label
                    htmlFor="price"
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1"
                  >
                    Price (GBP)
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="number"
                    placeholder="0.00"
                    className="input-field font-mono"
                    //   onChange={handleChange}
                    //   value={formData.price}
                  />
                </div>

                {/* Stock */}
                <div className="space-y-1">
                  <label
                    htmlFor="stock"
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1"
                  >
                    Initial Stock
                  </label>
                  <input
                    id="stock"
                    name="stock"
                    type="number"
                    placeholder="0"
                    className="input-field font-mono"
                    //   onChange={handleChange}
                    //   value={formData.stock}
                  />
                </div>
              </div>

              {/* Submit Button - Matching btn-primary and shadow-cyan */}
              <div className="pt-4 flex gap-3">
                <Link
                  to="/products"
                  className="w-1/3 py-4 text-center text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn-primary w-2/3 py-4 shadow-lg shadow-cyan-100"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>

          {/* Footer - Consistent location hint */}
          <p className="mt-8 text-center text-[11px] text-slate-400 uppercase tracking-widest leading-loose">
            Inventory Syncing for{" "}
            <span className="text-slate-600 font-bold">Folkestone</span> Branch
          </p>
        </div>
      </div>
    </Master>
  );
};

export default ProductCreate;
