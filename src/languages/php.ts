import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote } from "../utils";

export const php: LanguageRunner = {
  name: "PHP",
  detect(root) {
    // Laravel
    if (exists(rootFile(root, "artisan"))) return "php artisan serve";

    // Composer project
    if (exists(rootFile(root, "composer.json"))) return "php -S localhost:8000";

    // Common entry points
    for (const name of ["index.php", "app.php", "main.php", "server.php", "public/index.php"]) {
      if (exists(rootFile(root, name))) {
        if (name === "public/index.php") return "php -S localhost:8000 -t public";
        return `php ${name}`;
      }
    }

    const file = findFile(root, ".php");
    if (file) return `php ${shellQuote(file)}`;

    return null;
  },
};
