import { Link } from "react-router-dom";
import Master from "../../../components/Master";
import { useEffect, useState } from "react";
import { productList } from "../../../services/admin/product";
import type { ProductDisplayData } from "../../../validations/productListValidation";
import { retrieveImageFromServer } from "../../../utils/retrieveImageFromServer";

const ProductList = () => {
  const [products, setProducts] = useState<
    (ProductDisplayData & { _id: string; imageUrl: string })[]
  >([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const allProducts = await productList();
        console.log(allProducts.data);
        setProducts(allProducts.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProducts();
  }, []);

  return (
    <Master>
      <div className="min-h-screen bg-slate-50 p-8 font-sans antialiased text-slate-900">
        <div className="max-w-6xl mx-auto">
          {/* <!-- Header Section --> */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-primary-600">
                Products
              </h1>
              <p className="text-slate-500 text-sm">
                Manage your inventory and pricing.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
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
              <Link
                to="/business/product/create"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition shadow-sm"
              >
                + Add Product
              </Link>
            </div>
          </div>

          {/* <!-- Table Card --> */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Product Name
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
                {products.map((product) => {
                  const imageSrc = retrieveImageFromServer(product.imageUrl);
                  return (
                    <tr
                      key={product._id}
                      className="hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={
                            imageSrc ||
                            "https://placehold.co/100x100?text=No+Image"
                          }
                          alt={product.name}
                          className="w-10 h-10 object-cover rounded-md border border-slate-200"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium">{product.name}</td>
                      <td className="px-6 py-4 font-medium">{product.slug}</td>
                      <td className="px-6 py-4 text-slate-500">
                        {product.categoryId?.title}
                      </td>
                      <td className="px-6 py-4">{product.stockType}</td>
                      <td className="px-6 py-4">
                        {product.isActive ? (
                          <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-bold">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-emerald-100 text-red-700-700 rounded-md text-xs font-bold">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/business/product/${product._id}/stock`}
                          state={{ product }}
                          className="text-primary-600 hover:text-primary-800 font-medium mr-3"
                        >
                          View
                        </Link>
                        <Link
                          to={`/business/product/${product._id}/edit`}
                          className="text-blue-600 hover:text-primary-800 font-medium mr-3"
                        >
                          Edit
                        </Link>
                        <button className="text-red-500 hover:text-red-700 font-medium">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Master>
  );
};

export default ProductList;
