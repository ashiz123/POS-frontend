function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    month: "short",
    year: "numeric",
  });
}

export function getExpiryStatus(expiryDate) {
  const today: any = new Date();
  const expiry: any = new Date(expiryDate);
  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0)
    return { label: "Expired", style: "bg-red-100 text-red-700" };
  if (diffDays <= 60)
    return {
      label: formatDate(expiryDate),
      style: "bg-amber-100 text-amber-700",
    };
  return {
    label: formatDate(expiryDate),
    style: "bg-emerald-100 text-emerald-700",
  };
}

export function validateForm(formData) {
  const newErrors = {
    batchId: "",
    quantity: "",
    receivedDate: "",
    expiryDate: "",
  };
  if (!formData.batchId.trim()) newErrors.batchId = "Batch ID is required";
  if (!formData.quantity || Number(formData.quantity) <= 0)
    newErrors.quantity = "Enter a valid quantity";
  if (!formData.receivedDate)
    newErrors.receivedDate = "Received date is required";
  if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
  return newErrors;
}
