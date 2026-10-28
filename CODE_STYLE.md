# Code Style

Formatting is handled by [Prettier](https://prettier.io) with two plugins, configured in `prettier.config.mjs`:

- [`@ianvs/prettier-plugin-sort-imports`](https://github.com/IanVS/prettier-plugin-sort-imports) sorts imports.
- [`prettier-plugin-tailwindcss`](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) sorts Tailwind classes.

```bash
npm run format        # format everything except src/components/ui (shadcn)
npm run format:check  # check without writing
```

## VS Code

`.vscode/settings.json` makes VS Code format with the same setup as the CLI:

```json
{
  "prettier.prettierPath": "./node_modules/prettier",
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

- `editor.defaultFormatter` uses the [Prettier extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (`esbenp.prettier-vscode`) for every file type. Install it, or formatting does nothing.
- `prettier.prettierPath` points the extension at the project's own Prettier instead of the copy bundled with the extension, so the import and Tailwind sorting plugins load and the output matches `npm run format`. Run `npm install` first so `node_modules/prettier` exists.
- Format on save isn't turned on here. Enable `"editor.formatOnSave": true` in your user settings if you want it.

## Import Order

Imports are grouped from "furthest away" to "closest", with a blank line between groups:

1. **Built-ins**, e.g. `node:fs`, `node:path` (mostly relevant in NestJS)
2. **External packages**, e.g. `next`, `react`, `@nestjs/common`
3. **Internal aliases**, e.g. `@/components/...`, `@app/...`
4. **Relative imports**, parent `../` before sibling `./`
5. **Side-effect and style imports**, e.g. `./globals.css`

Within each group, imports are sorted alphabetically by path.

### Example

```tsx
import { readFile } from "node:fs/promises";
import { Mouse } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { formatDate } from "../lib/date";
import Contacts from "./Contacts";

import "./globals.css";
```

### How The Config Maps To This

```js
importOrder: [
  "<BUILTIN_MODULES>",
  "<THIRD_PARTY_MODULES>",
  "",
  "^@/(.*)$",
  "",
  "^[./]",
],
```

- `<BUILTIN_MODULES>` and `<THIRD_PARTY_MODULES>` share a group, so built-ins sit at the top of the external block with no blank line in between.
- `""` inserts a blank line between groups.
- `^@/(.*)$` matches this project's `@/*` alias. Add a pattern (e.g. `^@app/(.*)$`) when a project uses other aliases.
- `^[./]` matches every relative import. `../` sorts before `./` alphabetically, so parent imports come first.
- Side-effect imports such as `import "./globals.css"` are never moved, because their order can change behaviour. Keep them after the other imports by hand.
