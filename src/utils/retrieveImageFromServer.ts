const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export const retrieveImageFromServer = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${SERVER_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};
