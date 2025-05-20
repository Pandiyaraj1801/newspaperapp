import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // base path for assets, root in most cases
  build: {
    outDir: "dist", // default output folder
  },
});
