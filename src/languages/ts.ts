import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote } from "../utils";

export const ts: LanguageRunner = {
  name: "TypeScript",
  detect(root) {
    // Only if there's no package.json (node runner handles those)
    if (exists(rootFile(root, "package.json"))) return null;

    // Deno project
    if (exists(rootFile(root, "deno.json")) || exists(rootFile(root, "deno.jsonc"))) {
      for (const name of ["main.ts", "mod.ts", "index.ts", "app.ts"]) {
        if (exists(rootFile(root, name))) return `deno run ${name}`;
      }
      return "deno run main.ts";
    }

    // ts-node fallback for standalone .ts files
    for (const name of ["main.ts", "index.ts", "app.ts", "server.ts"]) {
      if (exists(rootFile(root, name))) return `npx ts-node ${name}`;
    }

    const file = findFile(root, ".ts");
    if (file) return `npx ts-node ${shellQuote(file)}`;

    return null;
  },
};
