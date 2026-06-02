import type { ProductData } from "../validations/productValidation";
import apiInstance from "./api";

export const productList = async () => {
  try {
    const response = await apiInstance.get("/product");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (data: ProductData) => {
  try {
    const response = await apiInstance.post("/product/create", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (id: string, productData: any) => {
  try {
    const response = await apiInstance.put(
      `/product/update/${id}`,
      productData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
