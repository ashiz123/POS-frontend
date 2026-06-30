import React from "react";
import useForm from "../../../../hooks/useForm";
import {
  inventoryBatchSchema,
  type InventoryBatchData,
} from "../../../../validations/addStockValidation";
import { createNewProductBatch } from "../../../../services/admin/batch";

const emptyForm = {
  price: "",
  quantity: "",
  expiryDate: "",
};

interface StockAddProps {
  productId: string;
  onAddBatch: (data: any) => void;
  onClose: () => void;
}

export const StockAdd: React.FC<StockAddProps> = ({
  productId,
  onAddBatch,
  onClose,
}) => {
  const { handleChange, handleSubmit, setFormData, formData, setErrors } =
    useForm<InventoryBatchData>(emptyForm, inventoryBatchSchema);

  const submitBatch = async (newBatch) => {
    const mappedToSendToApi = {
      quantity: Number(newBatch.data.quantity),
      price: Number(newBatch.data.price),
      expiryDate: new Date(newBatch.data.expiryDate),
    };
    const createBatch = await createNewProductBatch(
      productId,
      mappedToSendToApi,
    );

    onAddBatch(createBatch.data);
    onClose();
  };

  return (
    <div className="pt-5 border-t border-slate-100">
      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4">
        New Stock Batch
      </p>
      <form
        onSubmit={(e) => handleSubmit(e, submitBatch)}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              Price
            </label>
            <input
              name="price"
              type="number"
              placeholder="0"
              className="input-field"
              value={formData.price}
              onChange={handleChange}
            />
            {/* {errors.batchId && (
                      <p className="text-xs text-red-500 ml-1">
                        {errors.batchId}
                      </p>
                    )} */}
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              Quantity
            </label>
            <input
              name="quantity"
              type="number"
              placeholder="0"
              className="input-field"
              value={formData.quantity}
              onChange={handleChange}
            />
            {/* {errors.quantity && (
                      <p className="text-xs text-red-500 ml-1">
                        {errors.quantity}
                      </p>
                    )} */}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
              Expiry Date
            </label>
            <input
              title="Expiry Date"
              name="expiryDate"
              type="date"
              className="input-field"
              value={formData.expiryDate}
              onChange={handleChange}
            />
            {/* {errors.expiryDate && (
                      <p className="text-xs text-red-500 ml-1">
                        {errors.expiryDate}
                      </p>
                    )} */}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              onClose();
              setFormData(emptyForm);
              setErrors({});
            }}
            className="w-1/3 py-4 text-center text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary w-2/3 py-4 shadow-lg shadow-cyan-100"
          >
            Save Batch
          </button>
        </div>
      </form>
    </div>
  );
};

//FORM YOU MAY NEED FOR THIS ADD BATCH
//   function handleSubmit(e) {
//     e.preventDefault();
//     const validationErrors = validateForm(formData);
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

// Replace this with your API call: POST /api/stock { productId, ...formData }
//     const newBatch = {
//       _id: Date.now().toString(),
//       ...formData,
//       quantity: Number(formData.quantity),
//     };
//     setBatches((prev) => [...prev, newBatch]);
//     setFormData(emptyForm);
//     setShowForm(false);
//   }

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   }
