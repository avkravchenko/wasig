const expo = require("eslint-config-expo/flat");
const reactCompiler = require("eslint-plugin-react-compiler");

module.exports = [
  ...expo,
  {
    plugins: {
      "react-compiler": reactCompiler,
    },
    rules: {
      "react-compiler/react-compiler": "error",
    },
  },
  {
    files: ["src/shared/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@/app/*", "@/screens/*", "@/features/*", "@/entities/*"],
        },
      ],
    },
  },
  {
    files: ["src/entities/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@/app/*", "@/screens/*", "@/features/*"],
        },
      ],
    },
  },
  {
    files: ["src/features/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@/app/*", "@/screens/*"],
        },
      ],
    },
  },
  {
    files: ["src/screens/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: ["@/app/*"],
        },
      ],
    },
  },
  {
    ignores: ["dist/*", ".expo/*", "node_modules/*"],
  },
];
