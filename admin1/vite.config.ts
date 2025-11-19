import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { vitePlugin as remix, cloudflareDevProxyVitePlugin } from "@remix-run/dev";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [cloudflareDevProxyVitePlugin(), remix(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()]
    }
  }
});
