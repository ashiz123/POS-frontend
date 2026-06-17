import axios from "axios";

const apiKioskInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 5000,
  headers: { Accept: "application/json" },
  withCredentials: true,
});

apiKioskInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 1. GUARD: Prevent infinite loops if the refresh endpoints themselves return a 401
    const refreshUrls = ["/refresh-device", "/refresh-session"];

    console.log(error.response?.status);

    if (refreshUrls.includes(originalRequest.url)) {
      console.log("Stops repeatation failure loop");
      return Promise.reject(error);
    }

    // 2. MULTI-REFRESH LOGIC
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const errorCode = error.response?.data?.code;

      try {
        if (errorCode === "SESSION_EXPIRED") {
          // Case A: The cashier's shift session expired
          await apiKioskInstance.post("/terminal/refresh-session");
          return apiKioskInstance(originalRequest);
        } else if (errorCode === "DEVICE_EXPIRED") {
          // Case B: The physical hardware terminal authorization expired
          await apiKioskInstance.post("/terminal/refresh-device");
          console.log("Device access token is recreated");
          return apiKioskInstance(originalRequest);
        } else {
          // Fallback: If backend doesn't send a code, default to trying session first
          await apiKioskInstance.post("/terminal/refresh-session");
          return apiKioskInstance(originalRequest);
        }
      } catch (error) {
        console.log("catch error", error);
        // // // If a refresh attempt fails, determine where to redirect the user
        // if (errorCode === "SESSION_EXPIRED") {
        //   // Send back to Staff Passcode/Login Screen
        //   window.location.href = "/customer/kiosk/login";
        // } else {
        //   // Terminal link is dead. Send back to Device Activation Screen
        //   window.location.href = "/customer/kiosk/activate";
        // }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default apiKioskInstance;
