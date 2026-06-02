import apiInstance from "./api";

export const getOrderList = async () => {
  try {
    const response = await apiInstance.get("/order/byBusiness");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
