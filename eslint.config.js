import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // ESLint's recommended rules
  js.configs.recommended,

  // Next.js configurations (converted using FlatCompat)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // TypeScript ESLint plugin
  {
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
    rules: {
      "@typescript-eslint/no-require-imports": "error", // Example rule
    },
  },
];
