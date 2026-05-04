import apiInstance from "./api";

export const createCategory = async (categoryData) => {
  try {
    const response = await apiInstance.post("/categories/create", categoryData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const categoryList = async () => {
  try {
    const response = await apiInstance.get("/categories/of/business");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryApi = async (id) => {
  try {
    const response = await apiInstance.delete(`/categories/delete/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await apiInstance.put(
      `/categories/update/${id}`,
      categoryData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
