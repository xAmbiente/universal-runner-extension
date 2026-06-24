import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote } from "../utils";

export const vlang: LanguageRunner = {
  name: "V",
  detect(root) {
    if (exists(rootFile(root, "v.mod"))) return "v run .";

    for (const name of ["main.v", "app.v"]) {
      if (exists(rootFile(root, name))) return `v run ${name}`;
    }

    const file = findFile(root, ".v");
    if (file) return `v run ${shellQuote(file)}`;

    return null;
  },
};
