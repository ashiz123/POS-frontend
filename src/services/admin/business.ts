import apiAdminInstance from "./apiAdmin";

export const registerBusiness = async (businessData) => {
  try {
    const response = await apiAdminInstance.post(
      "/business/create",
      businessData,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBusinessOfAuthUser = async () => {
  try {
    const response = await apiAdminInstance.get("/business/lists/byAuth");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBusinessDetail = async () => {
  try {
    const response = await apiAdminInstance.get("/business/detail");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
