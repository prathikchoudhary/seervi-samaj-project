import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    rules: {
      'indent': ['error', 2, {
        'SwitchCase': 1,
        'ignoredNodes': ['TemplateLiteral > *'],
      }],
    },
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node }
  },
  tseslint.configs.recommended,
]);
