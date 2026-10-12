
import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        app: resolve(import.meta.dirname, "app/index.html"),
        camera: resolve(import.meta.dirname, "camera/camera.html"),
      },
    },
  },
});
