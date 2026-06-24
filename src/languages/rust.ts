import { LanguageRunner } from "../types";
import { exists, rootFile } from "../utils";

export const rust: LanguageRunner = {
  name: "Rust",
  detect(root) {
    if (exists(rootFile(root, "Cargo.toml"))) return "cargo run";
    return null;
  },
};
