export interface LanguageRunner {
  /** Human-readable name, e.g. "Rust" */
  name: string;
  /** Returns the shell command to run, or null if this language doesn't own the project */
  detect(root: string): string | null;
}

export interface RunResult {
  command: string;
  language: string;
}
