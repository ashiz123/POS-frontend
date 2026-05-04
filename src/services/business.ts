import apiInstance from "./api";

export const registerBusiness = async (businessData) => {
  try {
    const response = await apiInstance.post("/business/create", businessData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBusinessOfAuthUser = async () => {
  try {
    const response = await apiInstance.get("/business/lists/byAuth");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBusinessDetail = async () => {
  try {
    const response = await apiInstance.get("/business/detail");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
