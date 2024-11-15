import { AliasOptions, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tsConfigPaths from "vite-tsconfig-paths";

const root = path.resolve(__dirname, "src");
const shared = path.resolve(__dirname, "shared");
const publicPath = path.resolve(__dirname, "public");

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": root,
      "@shared": shared,
      "@public": publicPath,
    } as AliasOptions,
  },
  plugins: [react(), tsConfigPaths()],
});
