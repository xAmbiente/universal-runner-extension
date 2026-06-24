import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

let statusBar: vscode.StatusBarItem;

export function activate(context: vscode.ExtensionContext) {

    // ================================
    // STATUS BAR BUTTON (IMPORTANT)
    // ================================
    statusBar = vscode.window.createStatusBarItem(
        vscode.StatusBarAlignment.Left,
        100
    );

    statusBar.text = "▶ Run Project";
    statusBar.tooltip = "Compile & Run Project";
    statusBar.command = "universal-runner.runProject";
    statusBar.show();

    context.subscriptions.push(statusBar);

    // ================================
    // COMMAND
    // ================================
    const disposable = vscode.commands.registerCommand(
        "universal-runner.runProject",
        async () => {

            const folder = vscode.workspace.workspaceFolders?.[0];

            if (!folder) {
                vscode.window.showErrorMessage("No workspace opened.");
                return;
            }

            const root = folder.uri.fsPath;

            const terminal = vscode.window.createTerminal("Universal Compiler");
            terminal.show();

            const project = detectProject(root);

            const command = buildCommand(project, root);

            terminal.sendText(command);
        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}

type ProjectType =
    | "dotnet"
    | "go"
    | "rust"
    | "node"
    | "python"
    | "cpp"
    | "c"
    | "java"
    | "unknown";

function detectProject(root: string): ProjectType {

    const files = fs.readdirSync(root);

    if (fs.existsSync(path.join(root, "Cargo.toml")))
        return "rust";

    if (fs.existsSync(path.join(root, "go.mod")))
        return "go";

    if (fs.existsSync(path.join(root, "package.json")))
        return "node";

    if (files.some(f => f.endsWith(".csproj")))
        return "dotnet";

    if (files.some(f => f.endsWith(".java")))
        return "java";

    if (files.some(f => f.endsWith(".cpp")))
        return "cpp";

    if (files.some(f => f.endsWith(".c")))
        return "c";

    if (files.some(f => f.endsWith(".py")))
        return "python";

    return "unknown";
}

function buildCommand(type: ProjectType, root: string): string {

    switch (type) {

        case "rust":
            return "cargo run";

        case "go":
            return "go run .";

        case "node":
            return "npm install && npm start";

        case "dotnet":
            return "dotnet run";

        case "python": {
            const file = findFirstFile(root, ".py");
            return file ? `python "${file}"` : "python .";
        }

        case "cpp": {
            const file = findFirstFile(root, ".cpp");
            return file
                ? `g++ "${file}" -o app && ./app`
                : "echo No C++ file found";
        }

        case "c": {
            const file = findFirstFile(root, ".c");
            return file
                ? `gcc "${file}" -o app && ./app`
                : "echo No C file found";
        }

        case "java": {
            const file = findFirstFile(root, ".java");

            if (!file)
                return "echo No Java file found";

            const className = path.basename(file, ".java");

            return `
javac "${file}" && java "${className}"
            `.trim();
        }

        default:
            return "echo Unknown project type";
    }
}

function findFirstFile(dir: string, ext: string): string | null {

    const files = fs.readdirSync(dir);

    for (const file of files) {

        const full = path.join(dir, file);

        if (fs.statSync(full).isDirectory()) {
            const found = findFirstFile(full, ext);
            if (found) return found;
        }

        if (file.endsWith(ext)) {
            return full;
        }
    }

    return null;
}