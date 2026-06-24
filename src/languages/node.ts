import * as fs from "fs";
import * as path from "path";
import { LanguageRunner } from "../types";
import { exists, rootFile } from "../utils";

export const node: LanguageRunner = {
  name: "Node.js",
  detect(root) {
    const pkgPath = rootFile(root, "package.json");
    if (!exists(pkgPath)) return null;

    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));

      // Prefer explicit scripts
      if (pkg.scripts?.dev) return "npm run dev";
      if (pkg.scripts?.start) return "npm start";

      // Detect common frameworks
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (deps["next"]) return "npm run dev";
      if (deps["vite"]) return "npm run dev";
      if (deps["@angular/core"]) return "npm start";
      if (deps["nuxt"]) return "npm run dev";

      // Fallback: run the main entry point directly
      if (pkg.main) {
        const main = path.join(root, pkg.main);
        if (exists(main)) return `node "${pkg.main}"`;
      }

      return "npm start";
    } catch {
      return "npm start";
    }
  },
};
