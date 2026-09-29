import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  resolve: {
    // Mirrors the `paths` aliases in tsconfig.json.
    alias: {
      "@/components": fromRoot("./components"),
      "@/pages": fromRoot("./pages"),
      "@/store": fromRoot("./store"),
      "@/types": fromRoot("./types"),
      "@/styles": fromRoot("./styles"),
      "@/lib": fromRoot("./lib"),
    },
  },
  test: {
    include: ["**/*.test.ts"],
    exclude: ["node_modules", ".next"],
  },
});
