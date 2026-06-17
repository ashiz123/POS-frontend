import { Link } from "react-router-dom";
import Master from "../../../components/Master";
import { deleteCategoryApi } from "../../../services/admin/category";
import { useGetCategories } from "../../../hooks/useGetCategories";

const CategoryList = () => {
  const { categories, setCategories, loading } = useGetCategories(true);

  if (loading) return <div>Loading... </div>;

  const deleteCategory = async (categoryId, title) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the category: "${title}"?`,
    );

    if (isConfirmed) {
      try {
        const result = await deleteCategoryApi(categoryId);
        if (result) {
          setCategories(
            categories.filter((category) => category._id !== categoryId),
          );
          console.log("Category deleted successfully!");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Category deletion failed.");
    }
  };

  return (
    <Master>
      <div className="min-h-screen bg-slate-50 p-8 font-sans antialiased text-slate-900">
        <div className="max-w-6xl mx-auto">
          {/* <!-- Header Section --> */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-primary-600">
                Categories
              </h1>
              <p className="text-slate-500 text-sm">
                Manage your inventory and pricing.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search category..."
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
                to="/business/category/create"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition shadow-sm"
              >
                + Add Category
              </Link>
            </div>
          </div>

          {/* <!-- Table Card --> */}
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Active
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Parent Category
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm">
                {/* <!-- Row 1 --> */}
                {categories.map((category) => (
                  <tr
                    key={category._id}
                    className="hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-4 font-medium">{category.title}</td>
                    <td className="px-6 py-4 text-slate-500">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4">{category.description}</td>
                    <td className="px-6 py-4">
                      {category.isActive ? "Active" : "Inactive"}
                    </td>
                    <td className="px-6 py-4">{category.position}</td>
                    <td className="px-6 py-4">
                      {category.parentCategoryId &&
                      typeof category.parentCategoryId === "object" ? (
                        <span className="font-medium text-primary-600">
                          {category.parentCategoryId.title}
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary-600 hover:text-primary-800 font-medium mr-3">
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 font-medium"
                        onClick={() =>
                          deleteCategory(category._id, category.title)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Master>
  );
};

export default CategoryList;
