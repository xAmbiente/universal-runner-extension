import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote } from "../utils";

export const dart: LanguageRunner = {
  name: "Dart",
  detect(root) {
    if (exists(rootFile(root, "pubspec.yaml"))) {
      // Flutter project
      if (exists(rootFile(root, "lib", "main.dart"))) return "flutter run";
      // Plain Dart project
      if (exists(rootFile(root, "bin"))) return "dart run";
      return "dart run";
    }

    const file = findFile(root, ".dart");
    if (file) return `dart ${shellQuote(file)}`;

    return null;
  },
};
