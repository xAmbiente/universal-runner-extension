import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote } from "../utils";

export const haskell: LanguageRunner = {
  name: "Haskell",
  detect(root) {
    if (exists(rootFile(root, "stack.yaml"))) return "stack run";
    if (exists(rootFile(root, "cabal.project")) || findFile(root, ".cabal")) return "cabal run";

    const file = findFile(root, ".hs");
    if (file) return `runghc ${shellQuote(file)}`;

    return null;
  },
};
