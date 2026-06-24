import * as vscode from "vscode";
import { RunResult } from "./types";

const TERMINAL_NAME = "Universal Runner";

function getOrCreateTerminal(): vscode.Terminal {
  const existing = vscode.window.terminals.find(t => t.name === TERMINAL_NAME);
  return existing ?? vscode.window.createTerminal(TERMINAL_NAME);
}

export function runInTerminal(result: RunResult, cwd: string): void {
  const terminal = getOrCreateTerminal();
  terminal.show(true);

  const isWindows = process.platform === "win32";

  const cdCmd = isWindows
    ? `cd /d "${cwd}"`
    : `cd "${cwd}"`;

  terminal.sendText(cdCmd);
  terminal.sendText(result.command);
}