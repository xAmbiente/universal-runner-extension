import { LanguageRunner } from "../types";
import { exists, rootFile } from "../utils";

export const go: LanguageRunner = {
  name: "Go",
  detect(root) {
    if (exists(rootFile(root, "go.mod"))) return "go run .";
    return null;
  },
};
