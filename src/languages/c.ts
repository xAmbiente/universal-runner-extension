import * as path from "path";
import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote, stem } from "../utils";

export const c: LanguageRunner = {
  name: "C",
  detect(root) {
    // CMake project
    if (exists(rootFile(root, "CMakeLists.txt"))) {
      return "cmake -B build && cmake --build build && ./build/app";
    }

    // Makefile
    if (exists(rootFile(root, "Makefile")) || exists(rootFile(root, "makefile"))) {
      return "make && ./app";
    }

    const file = findFile(root, ".c");
    if (!file) return null;

    const outName = stem(file);
    const outDir = path.dirname(file);
    const out = path.join(outDir, outName);
    const run = process.platform === "win32" ? `${out}.exe` : out;
    return `gcc ${shellQuote(file)} -o ${shellQuote(out)} && ${shellQuote(run)}`;
  },
};
