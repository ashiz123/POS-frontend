import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Master from "../../../components/Master";
import { getExpiryStatus } from "../../../utils/stockUtils";
import { StockAdd } from "./partial/StockAdd";
import { useLocation } from "react-router-dom";
import {
  deleteBatch,
  getAllBatchesOfProduct,
} from "../../../services/admin/batch";
import { retrieveImageFromServer } from "../../../utils/retrieveImageFromServer";

interface BatchItem {
  id: string;
  price: string;
  quantity: string;
  expiryDate: string;
  batchNumber: string;
}

export default function Stocks() {
  const { productId } = useParams();
  const location = useLocation();
  const product = location.state?.product;

  const [batches, setBatches] = useState<BatchItem[]>([]);
  const [showForm, setShowForm] = useState(false);

  const imageSrc = retrieveImageFromServer(product.imageUrl);

  useEffect(() => {
    const getAllBatches = async () => {
      try {
        const batches = await getAllBatchesOfProduct(productId);
        const formattedBatches = batches.data.map((batch) => ({
          ...batch,
          expiryDate: batch.expiryDate.split("T")[0],
        }));

        setBatches(formattedBatches);
      } catch (error) {
        console.log(error);
      }
    };

    getAllBatches();
  }, []);

  if (!productId) {
    return <div>Loading...</div>;
  }

  const totalStock = batches.reduce((sum, b) => sum + Number(b.quantity), 0);

  // const expiringSoon = batches.filter(() => {
  //   return false;
  // }).length;

  const expiringSoonCount = batches.filter((b) => {
    const expiryDate: any = new Date(b.expiryDate);
    const today: any = new Date();
    const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 60;
  }).length;

  const handleAddBatch = async (newBatchData) => {
    setBatches((prev) => [
      ...prev,
      {
        ...newBatchData,
        _id: Date.now().toString(),
      },
    ]);
    setShowForm(false);
  };

  const removeExpiredBatch = async (batchId) => {
    const hasConfirmed = window.confirm(
      "Are you sure you want to delete this expired batch? This action cannot be undone.",
    );

    if (!hasConfirmed) return;

    try {
      await deleteBatch(batchId);
      setBatches((prev) => prev.filter((b) => b.id !== batchId));
    } catch (error) {
      console.log(error);
      alert("Failed to delete batch. Please try again.");
    }
  };

  return (
    <Master>
      <div className="min-h-screen bg-slate-50 flex justify-center p-6">
        <div className="max-w-4xl w-full">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-2xl font-black tracking-tight text-primary-600">
              Stock Details
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Batch inventory for selected product
            </p>
          </div>

          {/* Back Link */}
          <Link
            to="/business/product/list"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors mb-6"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Products
          </Link>

          {/* Main Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-200/50">
            {/* Product Header */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-50 flex items-center justify-center">
                  <img
                    src={
                      imageSrc || "https://placehold.co/100x100?text=No+Image"
                    }
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-md border border-slate-200"
                  />
                </div>
                <div>
                  <p className="text-base font-black text-slate-800 tracking-tight">
                    {product.name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {product.name} &nbsp;·&nbsp; {product.categoryId?.title}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-cyan-50 text-cyan-700 capitalize">
                {product.stockType}
              </span>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-slate-50 rounded-2xl p-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Total Stock
                </p>
                <p className="text-2xl font-black text-emerald-500 mt-1">
                  {totalStock}
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Batches
                </p>
                <p className="text-2xl font-black text-slate-800 mt-1">
                  {batches.length}
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Expiring Soon
                </p>
                <p
                  className={`text-2xl font-black mt-1 ${expiringSoonCount > 0 ? "text-red-500" : "text-slate-800"}`}
                >
                  {expiringSoonCount}
                </p>
              </div>
            </div>

            {/* Batch List Header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Stock Batches
              </p>
              <button
                onClick={() => setShowForm((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 bg-cyan-50 hover:bg-cyan-100 transition-colors rounded-xl px-3 py-2"
              >
                {showForm ? (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Cancel
                  </>
                ) : (
                  <>
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Stock
                  </>
                )}
              </button>
            </div>

            {/* Batch Rows */}
            <div className="space-y-2 mb-6">
              {batches.map((batch, index) => {
                const expiry = getExpiryStatus(batch.expiryDate);
                return (
                  <div
                    key={batch.id}
                    className="flex items-center gap-3 bg-slate-50 hover:bg-white hover:border-slate-200 border border-transparent rounded-2xl px-4 py-3 transition-all"
                  >
                    <span className="text-[11px] font-bold text-slate-300 w-5">
                      {index + 1}
                    </span>

                    <div className="flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Batch
                      </p>
                      <p className="text-sm font-black text-slate-800">
                        {batch.batchNumber}
                      </p>
                    </div>

                    {/* Quantity */}
                    <div className="flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Qty
                      </p>
                      <p className="text-sm font-black text-slate-800">
                        {batch.quantity}{" "}
                        <span className="text-xs font-normal text-slate-400">
                          units
                        </span>
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        Price
                      </p>
                      <p className="text-sm font-black text-slate-800">
                        £{batch.price}
                      </p>
                    </div>

                    {/* Expiry */}
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${expiry.style}`}
                    >
                      {expiry.label}
                    </span>

                    <button
                      onClick={() => removeExpiredBatch(batch.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors ml-1"
                      title="Delete batch"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>

            {batches.length === 0 && (
              <div className="text-center py-10 text-slate-400 text-sm">
                No stock batches yet. Add your first batch above.
              </div>
            )}

            {/* Add Stock Form */}
            {showForm && (
              <StockAdd
                onAddBatch={handleAddBatch}
                productId={productId}
                onClose={() => setShowForm(false)}
              />
            )}
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-[11px] text-slate-400 uppercase tracking-widest leading-loose">
            Inventory Syncing for{" "}
            <span className="text-slate-600 font-bold">Folkestone</span> Branch
          </p>
        </div>
      </div>
    </Master>
  );
}
