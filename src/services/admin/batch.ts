import apiKioskInstance from "../kiosk/apiKiosk";

export const createNewProductBatch = async (productId, batchData) => {
  try {
    const newBatch = await apiKioskInstance.post(
      `/inventoryBatch/product/${productId}/create`,
      batchData,
    );
    console.log(newBatch.data);
    return newBatch.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllBatchesOfProduct = async (productId) => {
  try {
    const batches = await apiKioskInstance.get(
      `/inventoryBatch/product/${productId}`,
    );
    console.log(batches.data);
    return batches.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteBatch = async (id) => {
  try {
    await apiKioskInstance.delete(`/inventoryBatch/delete/${id}`);
    return;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
