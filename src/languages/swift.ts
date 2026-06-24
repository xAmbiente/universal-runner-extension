import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote } from "../utils";

export const swift: LanguageRunner = {
  name: "Swift",
  detect(root) {
    if (exists(rootFile(root, "Package.swift"))) return "swift run";

    const file = findFile(root, ".swift");
    if (file) return `swift ${shellQuote(file)}`;

    return null;
  },
};
