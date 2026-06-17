import apiKioskInstance from "./apiKiosk";

//kiosk/terminal detail
export const getKioskData = async () => {
  try {
    const kiosk = await apiKioskInstance.get("/terminal/get-terminal-detail");
    return kiosk.data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

// kiosk/terminal session user detail
export const getKioskUserSession = async () => {
  try {
    const kioskSessionUser = await apiKioskInstance.get(
      "/terminal/get-terminal-user-session",
    );
    return kioskSessionUser.data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};

export const activateKiosk = async (data) => {
  try {
    const activate = await apiKioskInstance.post("/terminal/activate", data);
    console.log(activate.data);
    return activate.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginKiosk = async (data) => {
  try {
    const loginUser = await apiKioskInstance.post("/terminal/login", data);
    console.log(loginUser.data);
    return loginUser.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
