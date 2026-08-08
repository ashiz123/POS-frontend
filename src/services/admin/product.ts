import type { ProductData } from "../../validations/productValidation";
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
    const response = await apiAdminInstance.post("/product/create", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (id: string, productData: any) => {
  try {
    const response = await apiAdminInstance.put(
      `/product/update/${id}`,
      productData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
