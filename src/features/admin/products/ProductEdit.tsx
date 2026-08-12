import { Link, useParams } from "react-router-dom";
import Master from "../../../components/Master";
import { useGetCategories } from "../../../hooks/useGetCategories";
import useForm from "../../../hooks/useForm";

import { ValidationError, SuccessMessage } from "../../../components/Message";
import UploadImage from "./partial/UploadImage";
import { updateProduct, getProductById } from "../../../services/admin/product";
import {
  UpdateProductValidation,
  type UpdateProductData,
} from "../../../validations/productValidation";
import { useEffect } from "react";

const ProductEdit = () => {
  const { productId } = useParams();
  const { formData, setFormData, errors, handleChange, setSuccess, success } =
    useForm<UpdateProductData>(
      {
        name: "",
        description: "",
        categoryId: "",
        slug: "",
        stockType: "stocked",
        isActive: true,
        sellPrice: 0,
        lowStock: 0,
        image: undefined,
      },
      UpdateProductValidation,
    );
  const { categories, loading } = useGetCategories(true);

  useEffect(() => {
    if (!productId) {
      console.log("Product not found");
      return;
    }

    const getProductDetails = async () => {
      try {
        const product = await getProductById(productId);

        if (product) {
          setFormData({
            name: product.name || "",
            description: product.description || "",
            categoryId: product.categoryId?._id || product.categoryId || "",
            slug: product.slug || "",
            stockType: product.stockType || "stocked",
            isActive: product.isActive ?? true,
            sellPrice: product.sellPrice || 0,
            lowStock: product.lowStock || 0,
            image: product.imageUrl || undefined,
          });
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    getProductDetails();
  }, [productId, setFormData]);

  const submitForm = async (e) => {
    try {
      e.preventDefault();

      const payload = new FormData();
      payload.append("name", formData.name || "");
      payload.append("description", formData.description ?? "");
      payload.append("categoryId", formData.categoryId || "");
      payload.append("slug", formData.slug || "");
      payload.append("stockType", formData.stockType || "");
      payload.append("sellPrice", String(formData.sellPrice ?? 0));
      payload.append("isActive", String(formData.isActive ?? true));
      if (formData.lowStock !== undefined && formData.lowStock !== null) {
        payload.append("lowStock", String(formData.lowStock));
      }
      if (formData.image) {
        payload.append("image", formData.image);
      }

      if (!productId) {
        console.log("Product not found to update");
        return;
      }

      const response = await updateProduct(productId, formData);
      console.log(response);
      if (response) {
        setFormData({
          name: "",
          description: "",
          categoryId: "",
          slug: "",
          stockType: "stocked",
          isActive: true,
          sellPrice: 0,
          lowStock: 0,
          image: undefined,
        });
        setSuccess(true);
      }
    } catch (err) {
      console.log(err);
      //set Error
    }
  };

  const handleImageSelect = (file) => {
    setFormData((prev) => ({ ...prev, image: file }));
  };

  console.log("current form value", formData);

  if (loading) return <div>Loading...</div>;

  return (
    <Master>
      <div className="min-h-screen bg-slate-50 flex justify-center p-6">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-10">
            <h1 className="text-2xl font-black tracking-tight text-primary-600">
              Edit Product
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Fill in the details to update your inventory
            </p>
          </div>

          {/* Card Container - Matching rounded-3xl and shadows */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
            <form className="space-y-5" onSubmit={(e) => submitForm(e)}>
              {success && (
                <SuccessMessage onClose={() => setSuccess(false)}>
                  Product Updated successfully!
                </SuccessMessage>
              )}

              <UploadImage
                onFileSelect={handleImageSelect}
                formDataImage={formData.image}
              />

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
                  onChange={handleChange}
                  value={formData.name || ""}
                />
                {errors.name && (
                  <ValidationError> {errors.name}</ValidationError>
                )}
              </div>
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  name="description"
                  placeholder="Product Description"
                  className="input-field" // Using your global class
                  onChange={handleChange}
                  value={formData.description}
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
                      name="categoryId"
                      className="input-field appearance-none cursor-pointer pr-10"
                      onChange={handleChange}
                      value={formData.categoryId}
                    >
                      <option value="" disabled defaultValue={"others"}>
                        Select Category
                      </option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.title}
                        </option>
                      ))}
                      {errors.categoryId && (
                        <ValidationError> {errors.categoryId}</ValidationError>
                      )}
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
                    htmlFor="slug"
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1"
                  >
                    Slug
                  </label>
                  <input
                    id="slug"
                    name="slug"
                    type="text"
                    placeholder="Enter slug for product"
                    className="input-field"
                    onChange={handleChange}
                    value={formData.slug}
                  />
                  {errors.slug && (
                    <ValidationError> {errors.slug}</ValidationError>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label
                    htmlFor="stockType"
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1"
                  >
                    Stock Type
                  </label>
                  <div className="relative">
                    <select
                      id="stockType"
                      name="stockType"
                      className="input-field appearance-none cursor-pointer pr-10"
                      onChange={handleChange}
                      value={formData.stockType}
                    >
                      <option value="stocked">Stocked (Standard)</option>
                      <option value="composite">
                        Composite (Bundle/Recipe)
                      </option>
                    </select>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="lowStock"
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1"
                  >
                    Sell Price
                  </label>
                  <input
                    id="sellPrice"
                    name="sellPrice"
                    type="number"
                    placeholder="Set minimum stock level for notification"
                    className="input-field"
                    min="0"
                    onChange={handleChange}
                    value={formData.sellPrice}
                  />
                  {errors.sellPrice && (
                    <ValidationError> {errors.sellPrice}</ValidationError>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label
                    htmlFor="sellPrice"
                    className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1"
                  >
                    Minimum stock level
                  </label>
                  <input
                    id="lowStock"
                    name="lowStock"
                    type="number"
                    placeholder="Selling price"
                    className="input-field"
                    min="0"
                    onChange={handleChange}
                    value={formData.lowStock}
                  />
                </div>
                <div className="space-y-1">
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-slate-700">
                        Display on Menu
                      </p>
                      <p className="text-xs text-slate-400">
                        Show on the active selling screen.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        title="Display on menu"
                        className="sr-only peer"
                        name="isActive"
                        onChange={handleChange}
                        checked={formData.isActive}
                      />

                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                </div>
              </div>

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
                  Update Product
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

export default ProductEdit;
