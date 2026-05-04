import { useState } from "react";
import Master from "../../components/Master";
import useForm from "../../hooks/useForm";
import {
  categoryValidation,
  type CategoryData,
} from "../../validations/categoryValidation";

import { createCategory } from "../../services/category";
import { SuccessMessage, ValidationError } from "../../components/Message";
import { useGetCategories } from "../../hooks/useGetCategories";

const CreateCategory = () => {
  const [isMainCategory, setIsMainCategory] = useState(true);

  const {
    formData,
    setFormData,
    errors,
    setErrors,
    setSuccess,
    success,
    handleChange,
    handleSubmit,
  } = useForm<CategoryData>(
    {
      title: "",
      slug: "",
      description: "",
      isActive: true,
      parentCategoryId: "",
    },
    categoryValidation,
  );

  const { categories, loading } = useGetCategories();

  if (loading) {
    return <div>Loading...</div>;
  }

  const formSubmit = async (request) => {
    console.log("parent id", formData.parentCategoryId);

    if (isMainCategory === false && formData.parentCategoryId === "") {
      setErrors((prev) => ({
        ...prev,
        parentCategoryId: "Sub category require main category",
      }));
      return; // Stop the execution here!
    }

    const result = await createCategory(request.data);
    if (result) {
      console.log("Category added successful!", result);
      setFormData({
        title: "",
        slug: "",
        description: "",
        isActive: true,
        parentCategoryId: "",
      });
      setSuccess(true);
    } else {
      console.log("Category creation failed.");
    }
  };

  return (
    <Master>
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        {/* <div className="mb-6">
          <button
            type="button"
            title="Go back"
            className="text-slate-500 hover:text-slate-800 text-sm font-bold flex items-center gap-2 transition"
          >
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
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Categories
          </button>
        </div> */}

        <div className="text-center mb-10">
          <h1 className="text-2xl font-black tracking-tight text-primary-600">
            Add New Category
          </h1>
          <p className="text-slate-500 text-sm mt-2">
            Add product classification
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8">
            <form
              className="space-y-8"
              onSubmit={(e) => handleSubmit(e, formSubmit)}
            >
              {success && (
                <SuccessMessage onClose={() => setSuccess(false)}>
                  Category added successfully!
                </SuccessMessage>
              )}
              <div className="space-y-6">
                {/* 1. Category Name */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-widest">
                    Category Name
                  </label>
                  <input
                    name="title"
                    type="text"
                    placeholder="e.g. Hot Beverages"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition"
                    onChange={handleChange}
                    value={formData.title}
                  />
                </div>
                {errors.title && (
                  <ValidationError> {errors.title}</ValidationError>
                )}

                {/* 2. Category slug */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-widest">
                    Category Slug
                  </label>
                  <input
                    name="slug"
                    type="text"
                    placeholder="e.g. Hot Beverages"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition"
                    onChange={handleChange}
                    value={formData.slug}
                  />
                  {errors.slug && (
                    <ValidationError> {errors.slug}</ValidationError>
                  )}
                </div>

                {/* 2. Main Category Toggle */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-700">
                      Is this a Main Category?
                    </p>
                    <p className="text-xs text-slate-400">
                      Turn off to make this a sub-category.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      title="Is main category"
                      className="sr-only peer"
                      checked={isMainCategory}
                      onChange={() => setIsMainCategory(!isMainCategory)}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                {/* 3. Conditional Dropdown (Only shows if NOT main category) */}
                {!isMainCategory && (
                  <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl animate-in fade-in slide-in-from-top-2">
                    <label className="block text-xs font-bold uppercase text-primary-600 mb-2 tracking-widest">
                      Select Parent Category
                    </label>
                    <select
                      name="parentCategoryId"
                      title="Select Parent Category"
                      className="w-full bg-white border border-blue-200 rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-primary-500 outline-none transition appearance-none"
                      onChange={handleChange}
                      value={formData.parentCategoryId}
                    >
                      <option value="">Choose a category...</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                    {errors.parentCategoryId && (
                      <ValidationError>
                        {errors.parentCategoryId}
                      </ValidationError>
                    )}
                  </div>
                )}

                {/* 4. Description */}
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-widest">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    placeholder="Brief description for internal use..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition"
                    onChange={handleChange}
                    value={formData.description}
                  ></textarea>
                </div>
              </div>

              {/* Display on Menu Toggle */}
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
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-8 flex gap-4">
                <button
                  type="submit"
                  title="Create Category"
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition active:scale-[0.98]"
                >
                  Create Category
                </button>
                <button
                  type="button"
                  title="Discard"
                  className="px-8 py-4 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition"
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Master>
  );
};

export default CreateCategory;
