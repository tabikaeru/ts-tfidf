import path from 'path'
import { defineConfig } from 'vitest/config'

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ts-tfidf",
      fileName: (format) => `ts-tfidf.${format}.js`,
    },
    outDir: path.resolve(__dirname, "lib"),
  },
});