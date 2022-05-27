import path from 'path'
import { defineConfig } from 'vitest/config'

module.exports = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "ts-tfidf",
      fileName: (format) => `ts-tfidf.${format}.ts`,
    },
  },
});