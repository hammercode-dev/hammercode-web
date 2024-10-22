import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

const testExclusions = [
  "build",
  "node_modules",
  "config",
  "test",
  "__mocks__",
  ".eslintrc.js",
  "**/*.styles.ts",
  "**/*.types.ts",
  "**/types.ts",
  "**/*.d.ts",
  "src/app/**",
];

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./tests/vitest-setup.ts",
    exclude: [...configDefaults.exclude, ...testExclusions],
    coverage: {
      exclude: [...(configDefaults.coverage.exclude ?? []), ...testExclusions],
    },
  },
});
