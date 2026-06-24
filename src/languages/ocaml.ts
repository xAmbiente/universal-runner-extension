import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote } from "../utils";

export const ocaml: LanguageRunner = {
  name: "OCaml",
  detect(root) {
    if (exists(rootFile(root, "dune-project"))) return "dune exec ./bin/main.exe";

    for (const name of ["main.ml", "app.ml"]) {
      if (exists(rootFile(root, name))) return `ocaml ${name}`;
    }

    const file = findFile(root, ".ml");
    if (file) return `ocaml ${shellQuote(file)}`;

    return null;
  },
};
