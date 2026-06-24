import { LanguageRunner, RunResult } from "./types";

// Language runners in priority order.
// Place marker-file detectors (Cargo.toml, go.mod, etc.) before file-extension detectors.
import { cs } from "./languages/cs";
import { go } from "./languages/go";
import { rust } from "./languages/rust";
import { node } from "./languages/node";
import { dart } from "./languages/dart";
import { swift } from "./languages/swift";
import { kotlin } from "./languages/kotlin";
import { scala } from "./languages/scala";
import { java } from "./languages/java";
import { elixir } from "./languages/elixir";
import { haskell } from "./languages/haskell";
import { julia } from "./languages/julia";
import { nim } from "./languages/nim";
import { zig } from "./languages/zig";
import { vlang } from "./languages/vlang";
import { ocaml } from "./languages/ocaml";
import { python } from "./languages/python";
import { ruby } from "./languages/ruby";
import { php } from "./languages/php";
import { cpp } from "./languages/cpp";
import { c } from "./languages/c";
import { lua } from "./languages/lua";
import { ts } from "./languages/ts";

const RUNNERS: LanguageRunner[] = [
  cs, go, rust, node,
  dart, swift, kotlin, scala, java,
  elixir, haskell, julia, nim, zig, vlang, ocaml,
  python, ruby, php,
  cpp, c,
  lua, ts,
];

/**
 * Detects the project language in `root` and returns the run command.
 * Returns null if no language could be detected.
 */
export function detectProject(root: string): RunResult | null {
  for (const runner of RUNNERS) {
    const command = runner.detect(root);
    if (command) {
      return { command, language: runner.name };
    }
  }
  return null;
}
