import apiAdminInstance from "./apiAdmin";

export const createCategory = async (categoryData) => {
  try {
    const response = await apiAdminInstance.post(
      "/categories/create",
      categoryData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const allCategoryList = async () => {
  try {
    const response = await apiAdminInstance.get(
      "/categories/of/business/?all=true",
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const activeCategoryList = async () => {
  try {
    const response = await apiAdminInstance.get("/categories/of/business");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryApi = async (id) => {
  try {
    const response = await apiAdminInstance.delete(`/categories/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await apiAdminInstance.put(
      `/categories/update/${id}`,
      categoryData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const response = await apiAdminInstance.get(
      `/categories/show/${categoryId}`,
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
