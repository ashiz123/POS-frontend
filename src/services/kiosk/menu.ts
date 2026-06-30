import apiKioskInstance from "./apiKiosk";

export const getAllCategories = async () => {
  try {
    const newKiosk = await apiKioskInstance.get("/kiosk/categories");
    return newKiosk.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllProductsOfCategory = async (categoryId) => {
  try {
    const products = await apiKioskInstance.get(
      `/kiosk/productByCategory/${categoryId}`,
    );
    console.log(products.data);
    return products.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
