import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote } from "../utils";

export const julia: LanguageRunner = {
  name: "Julia",
  detect(root) {
    if (exists(rootFile(root, "Project.toml"))) return "julia --project=. src/main.jl";

    for (const name of ["main.jl", "app.jl", "run.jl", "src/main.jl"]) {
      if (exists(rootFile(root, name))) return `julia ${name}`;
    }

    const file = findFile(root, ".jl");
    if (file) return `julia ${shellQuote(file)}`;

    return null;
  },
};
