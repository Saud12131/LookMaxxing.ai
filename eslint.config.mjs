import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Base config
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/build/**",
      "**/generated/**",
    ],
  },
  js.configs.recommended,
  ...compat.extends("next/core-web-vitals"),
  
  // TypeScript specific rules
  ...compat.config({
    extends: ["plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
      // Disable rules that cause issues with generated files
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off",
      // Enable other useful rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": ["warn", {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }],
    },
  }),
  
  // Override for JavaScript files (like in src/generated)
  {
    files: ["**/*.js"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
