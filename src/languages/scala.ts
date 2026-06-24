import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote } from "../utils";

export const scala: LanguageRunner = {
  name: "Scala",
  detect(root) {
    if (exists(rootFile(root, "build.sbt"))) return "sbt run";

    const file = findFile(root, ".scala");
    if (file) return `scala ${shellQuote(file)}`;

    return null;
  },
};
