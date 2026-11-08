import js from "@eslint/js";

export default [
  {
    files: ["js/**/*.js"],
    languageOptions: {
      sourceType: "script",
    },
    rules: js.configs.recommended.rules,
  },
  {
    files: ["js/code.js"],
    languageOptions: {
      globals: {
        document: "readonly",
        window: "readonly",
        XMLHttpRequest: "readonly",
      },
    },
    rules: {
      eqeqeq: "error",
      "no-var": "error",
    },
  },
  {
    files: ["js/md5.js"],
    languageOptions: {
      globals: {
        module: "readonly",
      },
    },
  },
];
