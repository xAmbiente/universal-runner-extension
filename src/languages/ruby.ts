import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote } from "../utils";

export const ruby: LanguageRunner = {
  name: "Ruby",
  detect(root) {
    // Rails
    if (exists(rootFile(root, "config", "application.rb"))) return "rails server";

    // Bundler project
    if (exists(rootFile(root, "Gemfile"))) {
      for (const name of ["main.rb", "app.rb", "run.rb", "server.rb"]) {
        if (exists(rootFile(root, name))) return `bundle exec ruby ${name}`;
      }
      return "bundle exec ruby main.rb";
    }

    for (const name of ["main.rb", "app.rb", "run.rb", "server.rb"]) {
      if (exists(rootFile(root, name))) return `ruby ${name}`;
    }

    const file = findFile(root, ".rb");
    if (file) return `ruby ${shellQuote(file)}`;

    return null;
  },
};
