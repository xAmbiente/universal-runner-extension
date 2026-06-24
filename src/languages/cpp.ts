import * as path from "path";
import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote, stem } from "../utils";

export const cpp: LanguageRunner = {
  name: "C++",
  detect(root) {
    // CMake project
    if (exists(rootFile(root, "CMakeLists.txt"))) {
      return "cmake -B build && cmake --build build && ./build/app";
    }

    // Meson project
    if (exists(rootFile(root, "meson.build"))) {
      return "meson setup build && meson compile -C build";
    }

    const file = findFile(root, ".cpp") || findFile(root, ".cc") || findFile(root, ".cxx");
    if (!file) return null;

    const out = process.platform === "win32" ? "app.exe" : "./app";
    const run = process.platform === "win32" ? "app.exe" : "./app";
    return `g++ -std=c++17 -O2 ${shellQuote(file)} -o ${path.join(path.dirname(file), stem(file))} && ${run}`;
  },
};
