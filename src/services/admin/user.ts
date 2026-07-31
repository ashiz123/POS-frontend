import apiAdminInstance from "./apiAdmin";

export const registerUser = async (userData) => {
  try {
    const response = await apiAdminInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await apiAdminInstance.post("/auth/login", userData);
    return response.data;
  } catch (error: any) {
    console.error("error", error.response);
    const message =
      error.response?.data?.error || "An unexpected error occurred";
    console.log("axios error", message);
    throw new Error(message);
  }
};

export const verifyOtp = async (otp: string) => {
  try {
    const response = await apiAdminInstance.post("/auth/verify-otp", { otp });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAuthUser = async () => {
  try {
    const response = await apiAdminInstance.get("/auth/auth-user");
    return response.data.loggedInUser;
  } catch (error) {
    console.log(error);
    throw new Error("An unexpected error occurred");
  }
};

export const logoutUser = async () => {
  try {
    const response = await apiAdminInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUserWithBusiness = async (businessId: string) => {
  try {
    const response = await apiAdminInstance.post("/auth/loginWithBusiness", {
      businessId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const forgetPassword = async (email) => {
  try {
    const response = await apiAdminInstance.post("/auth/forget-password", {
      email,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const resetPassword = async (token, newPassword, confirmPassword) => {
  try {
    const response = await apiAdminInstance.post("/auth/reset-password", {
      token,
      newPassword,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
