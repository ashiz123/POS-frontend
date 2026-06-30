import apiKioskInstance from "./apiKiosk";

export const createOrder = async (data) => {
  try {
    const newOrder = await apiKioskInstance.post(`/order/kiosk/create`, data);
    console.log(newOrder.data);
    return newOrder.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const completeOrder = async (
  orderId: string,
  stripePaymentId: string,
) => {
  try {
    const completeOrder = await apiKioskInstance.post(
      "/order/kiosk/complete_order",
      {
        orderId,
        stripePaymentId,
      },
    );
    console.log(completeOrder);
    return completeOrder.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
