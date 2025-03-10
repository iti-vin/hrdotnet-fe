import { AliasOptions, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@public": path.resolve(__dirname, "public"),
    } as AliasOptions,
  },
  server: { host: "0.0.0.0", port: 5173 },
});
