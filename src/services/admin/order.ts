import apiAdminInstance from "./apiAdmin";

export const getOrderList = async () => {
  try {
    const response = await apiAdminInstance.get("/order/admin/list");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
