import axios from "axios";
import { API_URL } from "../../config/api.config";

const apiAdminInstance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: { Accept: "application/json" },
  withCredentials: true,
});

//INTERCEPTOR - interceptors are 2. request is not in use, so not created for now.
apiAdminInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url === "/auth/refreshSession") {
      console.log("Refresh token is dead. Stopping the loop.");
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; //this was not exist, so make it exist
      try {
        console.log("Attempting refresh");
        await apiAdminInstance.post("/auth/refreshSession");
        return apiAdminInstance(originalRequest);
      } catch (refreshError) {
        console.log("Refresh failed");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiAdminInstance;
