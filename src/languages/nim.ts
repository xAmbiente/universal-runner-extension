import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote } from "../utils";

export const nim: LanguageRunner = {
  name: "Nim",
  detect(root) {
    const nimble = findFile(root, ".nimble");
    if (nimble) return "nimble run";

    for (const name of ["main.nim", "app.nim", "src/main.nim"]) {
      if (exists(rootFile(root, name))) return `nim c -r ${name}`;
    }

    const file = findFile(root, ".nim");
    if (file) return `nim c -r ${shellQuote(file)}`;

    return null;
  },
};
