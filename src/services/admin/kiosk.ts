import apiAdminInstance from "./apiAdmin";

export const addKiosk = async (data) => {
  try {
    const newKiosk = await apiAdminInstance.post("/terminal/create", data);
    console.log(newKiosk.data);
    return newKiosk.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
