import apiAdminInstance from "./apiAdmin";

export const lowStockProducts = async () => {
  try {
    const response = await apiAdminInstance.get("/dashboard/lowStock");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const totalNetSales = async () => {
  try {
    const response = await apiAdminInstance.get("/dashboard/totalNetSales");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const bestSellingItems = async () => {
  try {
    const response = await apiAdminInstance.get("/dashboard/bestSellingItem");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const voidOrders = async () => {
  try {
    const response = await apiAdminInstance.get("/dashboard/voidOrder");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const transactionToday = async () => {
  try {
    const response = await apiAdminInstance.get("/dashboard/transactionToday");
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
