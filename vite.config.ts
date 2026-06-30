// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   server: {
//     allowedHosts: ["dc40-88-97-218-39.ngrok-free.app"],
//   },
// });

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // This helps you verify the value in the Netlify Build Log
  console.log("DEBUG: VITE_API_URL is set to:", env.VITE_API_URL);

  return {
    plugins: [react(), tailwindcss()],
  };
});
