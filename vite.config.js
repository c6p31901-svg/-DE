import { defineConfig } from "vite";
import { resolve, relative, extname } from "node:path";
import { readdirSync } from "node:fs";

const root = import.meta.dirname;

function findHtmlFiles(dir) {
  const files = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = resolve(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...findHtmlFiles(fullPath));
    } else if (entry.isFile() && extname(entry.name).toLowerCase() === ".html") {
      files.push(fullPath);
    }
  }

  return files;
}

const htmlFiles = [
  resolve(root, "index.html"),
  ...findHtmlFiles(resolve(root, "app")),
  ...findHtmlFiles(resolve(root, "camera")),
];

const input = Object.fromEntries(
  htmlFiles.map((file) => [
    relative(root, file).replace(/\\/g, "/").replace(/\.html$/i, ""),
    file,
  ])
);

export default defineConfig({
  publicDir: "public",
  build: {
    rollupOptions: {
      input,
    },
  },
});