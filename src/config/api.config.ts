const API_URL = import.meta.env.VITE_API_URL;
const MODE = import.meta.env.MODE;

if (MODE === "develoopment") {
  console.log("api url", API_URL);
}

if (!API_URL) {
  throw new Error(
    "VITE_API_URL is not defined in your .env file. Please check your environment configuration.",
  );
}

export { API_URL };
