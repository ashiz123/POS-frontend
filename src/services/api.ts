import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
  headers: { Accept: "application/json" },
  withCredentials: true,
});

// interceptors are 2. request is not in use, so not created for now.

apiInstance.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url === "/auth/refresh") {
      console.log("Refresh token is dead. Stopping the loop.");
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; //this was not exist, so make it exist
      try {
        console.log("Attempting refresh");
        await apiInstance.post("/auth/refresh");
        console.log("Refresh successfully");
        return apiInstance(originalRequest);
      } catch (refreshError) {
        console.log("Refresh failed");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default apiInstance;
