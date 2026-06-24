import { LanguageRunner } from "../types";
import { findFile, exists, rootFile, shellQuote } from "../utils";

const PYTHON = process.platform === "win32" ? "python" : "python3";

export const python: LanguageRunner = {
  name: "Python",
  detect(root) {
    // Poetry / uv / pipenv project files
    if (exists(rootFile(root, "pyproject.toml"))) return `${PYTHON} -m pytest 2>/dev/null || ${PYTHON} main.py 2>/dev/null || ${PYTHON} app.py 2>/dev/null || ${PYTHON} run.py`;

    // Common entry-point names first
    for (const name of ["main.py", "app.py", "run.py", "server.py", "manage.py", "__main__.py"]) {
      if (exists(rootFile(root, name))) {
        if (name === "manage.py") return `${PYTHON} manage.py runserver`;
        return `${PYTHON} ${name}`;
      }
    }

    // Fallback: any .py file
    const py = findFile(root, ".py");
    if (py) return `${PYTHON} ${shellQuote(py)}`;

    return null;
  },
};
