import apiInstance from "./api";

export const registerUser = async (userData) => {
  try {
    const response = await apiInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await apiInstance.post("/auth/login", userData);
    return response.data;
  } catch (error: any) {
    console.error("error", error.response);
    const message =
      error.response?.data?.error || "An unexpected error occurred";
    console.log("axios error", message);
    throw new Error(message);
  }
};

export const loginWithOtp = async (otp: string) => {
  try {
    const response = await apiInstance.post("/auth/verifyOTP", { otp });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAuthUser = async () => {
  try {
    const response = await apiInstance.get("/auth/authUser");
    return response.data.loggedInUser;
  } catch (error) {
    console.log(error);
    throw new Error("An unexpected error occurred");
  }
};

export const logoutUser = async () => {
  try {
    const response = await apiInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUserWithBusiness = async (businessId: string) => {
  try {
    const response = await apiInstance.post("/auth/loginWithBusiness", {
      businessId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
