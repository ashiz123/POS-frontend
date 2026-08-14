const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export const retrieveImageFromServer = (url) => {
  // 1. If it's falsy (null, undefined, empty string), return null immediately
  if (!url) return null;

  // 2. If someone accidentally passes a browser File object, handle it or return null safely
  if (typeof url !== "string") {
    // If it's a File object, you can generate a local blob preview safely instead of crashing
    if (url instanceof File) {
      return URL.createObjectURL(url);
    }
    return null;
  }

  // 3. Safe string processing for existing server URLs or S3 links
  if (url.startsWith("http")) return url;
  return `${SERVER_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};
