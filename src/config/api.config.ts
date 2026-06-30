const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error(
    "VITE_API_URL is not defined in your .env file. Please check your environment configuration.",
  );
}

export { API_URL };
