import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote } from "../utils";

export const lua: LanguageRunner = {
  name: "Lua",
  detect(root) {
    for (const name of ["main.lua", "init.lua", "app.lua", "run.lua"]) {
      if (exists(rootFile(root, name))) return `lua ${name}`;
    }

    const file = findFile(root, ".lua");
    if (file) return `lua ${shellQuote(file)}`;

    return null;
  },
};
