import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote } from "../utils";

export const elixir: LanguageRunner = {
  name: "Elixir",
  detect(root) {
    // Mix project (Phoenix or plain Elixir)
    if (exists(rootFile(root, "mix.exs"))) return "mix run --no-halt";

    const file = findFile(root, ".exs");
    if (file) return `elixir ${shellQuote(file)}`;

    const ex = findFile(root, ".ex");
    if (ex) return `elixirc ${shellQuote(ex)}`;

    return null;
  },
};
