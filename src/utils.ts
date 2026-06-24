import * as fs from "fs";
import * as path from "path";

/**
 * Returns the first file found (recursively) with the given extension,
 * skipping common noise directories.
 */
export function findFile(
  dir: string,
  extension: string,
  skipDirs = new Set(["node_modules", ".git", "dist", "build", "target", "out", "bin", "obj", "__pycache__", ".venv", "venv", ".gradle"])
): string | null {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return null;
  }

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (skipDirs.has(entry.name)) continue;
      const result = findFile(full, extension, skipDirs);
      if (result) return result;
    } else if (entry.isFile() && entry.name.endsWith(extension)) {
      return full;
    }
  }

  return null;
}

/** Returns true if the given path exists. */
export function exists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

/** Joins root with a relative path and checks existence. */
export function rootFile(root: string, ...parts: string[]): string {
  return path.join(root, ...parts);
}

/** Escapes a file path for use in a shell command. */
export function shellQuote(filePath: string): string {
  return `"${filePath.replace(/"/g, '\\"')}"`;
}

/** Returns the file stem (filename without extension). */
export function stem(filePath: string): string {
  return path.basename(filePath, path.extname(filePath));
}
