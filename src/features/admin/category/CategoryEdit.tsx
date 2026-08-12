import { useEffect, useState } from "react";

import { useGetCategories } from "../../../hooks/useGetCategories";
import useForm from "../../../hooks/useForm";
import {
  categoryValidation,
  type CategoryData,
} from "../../../validations/categoryValidation";
import {
  getCategoryById,
  updateCategory,
} from "../../../services/admin/category";
import Master from "../../../components/Master";
import { SuccessMessage, ValidationError } from "../../../components/Message";
import UploadImage from "../products/partial/UploadImage";
import { useParams } from "react-router-dom";

const initialCategoryForm = {
  title: "",
  slug: "",
  description: "",
  isActive: true,
  parentCategoryId: "",
  image: undefined,
  position: "",
};

const CategoryEdit = () => {
  const [isMainCategory, setIsMainCategory] = useState(true);
  const { categoryId } = useParams();

  const {
    formData,
    setFormData,
    handleImageSelect,
    errors,
    setErrors,
    setSuccess,
    success,
    handleChange,
    handleSubmit,
  } = useForm<CategoryData>(initialCategoryForm, categoryValidation);

  const { categories, loading } = useGetCategories();

  useEffect(() => {
    if (!categoryId) {
      console.log("Category not found");
      return;
    }

    const getCatgoryDetails = async () => {
      try {
        const category = await getCategoryById(categoryId);

        if (category) {
          setFormData({
            title: category.title || "",
            description: category.description || "",
            parentCategoryId: category.parentCategoryId || "",
            slug: category.slug || "",
            isActive: category.isActive ?? true,
            position: String(category.position || ""),
            imageUrl: category.imageUrl || undefined,
          });

          if (category.parentCategoryId) {
            setIsMainCategory(false);
          }
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    getCatgoryDetails();
  }, [categoryId, setFormData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("is main category", isMainCategory);

  const formSubmit = async () => {
    if (isMainCategory === false && formData.parentCategoryId === "") {
      setErrors((prev) => ({
        ...prev,
        parentCategoryId: "Sub category require main category",
      }));
      return;
    }

    try {
      const payload = new FormData();
      payload.append("title", formData.title || "");
      payload.append("description", formData.description ?? "");
      payload.append("position", String(formData.position ?? ""));
      payload.append("slug", formData.slug || "");
      payload.append("isActive", String(formData.isActive ?? true));
      if (formData.image) {
        payload.append("image", formData.image);
      }

      if (formData.parentCategoryId) {
        payload.append(
          "parentCategoryId",
          String(formData.parentCategoryId) || "",
        );
      }

      console.log("payload", typeof formData.isActive);

      const response = await updateCategory(categoryId, payload);

      if (response) {
        setFormData(initialCategoryForm);
        setSuccess(true);
      } else {
        throw "Error to update category";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Master>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-black tracking-tight text-primary-600">
            Edit Category
          </h1>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8">
            <form
              className="space-y-8"
              onSubmit={(e) => handleSubmit(e, formSubmit)}
            >
              {success && (
                <SuccessMessage onClose={() => setSuccess(false)}>
                  Category updated successfully!
                </SuccessMessage>
              )}

              <UploadImage
                onFileSelect={handleImageSelect}
                formDataImage={formData.imageUrl}
              />

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
                <div className="grid grid-cols-3 gap-4">
                  {/* Category Slug - Takes up 2/3 of the width */}
                  <div className="col-span-2">
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

                  {/* Category Position - Takes up 1/3 of the width */}
                  <div className="col-span-1">
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2 tracking-widest">
                      Category Position
                    </label>
                    <input
                      name="position" // 💡 Fixed: changed from "order" to "position" to match your state key
                      type="text"
                      placeholder="e.g. 1"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 focus:ring-2 focus:ring-primary-500 focus:bg-white outline-none transition"
                      onChange={handleChange}
                      value={formData.position}
                    />
                    {errors.position && (
                      <ValidationError> {errors.position}</ValidationError>
                    )}
                  </div>
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
                      value={
                        typeof formData.parentCategoryId === "object" &&
                        formData.parentCategoryId !== null
                          ? formData.parentCategoryId._id
                          : (formData.parentCategoryId ?? "")
                      }
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
                    checked={formData.isActive}
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
                  Update Category
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

export default CategoryEdit;
