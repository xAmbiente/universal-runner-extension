import { LanguageRunner } from "../types";
import { findFile, exists, rootFile } from "../utils";

export const zig: LanguageRunner = {
  name: "Zig",
  detect(root) {
    if (exists(rootFile(root, "build.zig"))) return "zig build run";

    const file = findFile(root, ".zig");
    if (file) return `zig run "${file}"`;

    return null;
  },
};
