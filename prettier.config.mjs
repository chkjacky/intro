import * as sortImports from "@ianvs/prettier-plugin-sort-imports";
import * as tailwindcss from "prettier-plugin-tailwindcss";

const sortImportsWithName = Object.create(sortImports, {
  name: { value: "@ianvs/prettier-plugin-sort-imports" },
});

/** @type {import("prettier").Config} */
const config = {
  singleQuote: false,
  semi: true,

  plugins: [sortImportsWithName, tailwindcss],

  importOrder: [
    "<BUILTIN_MODULES>",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/(.*)$",
    "",
    "^[./]",
  ],
  importOrderTypeScriptVersion: "5.0.0",
};

export default config;
