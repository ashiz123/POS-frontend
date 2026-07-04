export const getDateOnly = (timestamp: string) => {
  const dateOnly = timestamp.split("T")[0];
  return dateOnly;
};

export const getTimeOnly = (timestamp: string) => {
  const timeOnly = timestamp.split("T")[1].split(".")[0];
  return timeOnly;
};
