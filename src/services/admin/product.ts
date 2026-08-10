import type { UpdateProductData } from "../../validations/productValidation";
import apiAdminInstance from "./apiAdmin";

export const productList = async () => {
  try {
    const response = await apiAdminInstance.get("/product");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (data) => {
  try {
    const response = await apiAdminInstance.post("/product/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id: string, data: UpdateProductData) => {
  try {
    const response = await apiAdminInstance.put(`/product/update/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await apiAdminInstance.get(`/product/show/${id}`);
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
