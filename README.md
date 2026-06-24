# Universal Runner

A powerful VS Code extension that **automatically detects and runs any project** across 26+ programming languages without manual configuration.

![Universal Runner](https://img.shields.io/badge/VS%20Code-Extension-blue?logo=visual-studio-code)
![License: MIT](https://img.shields.io/badge/License-MIT-green)
![Version](https://img.shields.io/badge/Version-0.1.0-orange)

## 🚀 Features

- **One-Click Execution**: Press `Ctrl+Shift+R` (or `Cmd+Shift+R` on Mac) to automatically detect and run your project
- **26+ Languages Supported**: C#, Go, Rust, Node.js, Python, Java, PHP, Ruby, Swift, Kotlin, Dart, Lua, Zig, Julia, Nim, Haskell, Elixir, Scala, OCaml, V, C, C++, TypeScript, and more
- **Zero Configuration**: Automatically detects project structure and runs the appropriate build/compile commands
- **Status Bar Integration**: Quick access button in the VS Code status bar
- **Integrated Terminal**: Output displayed in a dedicated terminal for easy viewing
- **Smart Project Detection**: Intelligently identifies project type based on configuration files and source code

## 📦 Supported Languages & Frameworks

| Language | Detection Method |
|----------|-----------------|
| **C#** | `.csproj`, `.sln` |
| **Go** | `go.mod`, `go.sum` |
| **Rust** | `Cargo.toml` |
| **Node.js/TypeScript** | `package.json` |
| **Python** | `requirements.txt`, `setup.py`, `pyproject.toml` |
| **Java** | `pom.xml`, `build.gradle` |
| **C/C++** | `CMakeLists.txt`, `Makefile`, `.cpp/.c` files |
| **PHP** | `composer.json`, `.php` files |
| **Ruby** | `Gemfile`, `Rakefile` |
| **Swift** | `Package.swift` |
| **Kotlin** | `build.gradle.kts` |
| **Dart** | `pubspec.yaml` |
| **Lua** | `.lua` files |
| **Zig** | `build.zig` |
| **Julia** | `.jl` files |
| **Nim** | `.nim` files |
| **Haskell** | `cabal` files |
| **Elixir** | `mix.exs` |
| **Scala** | `build.sbt` |
| **OCaml** | `dune` files |
| **V** | `.v` files |

## 📥 Installation

1. Open **VS Code**
2. Go to the **Extensions** marketplace (`Ctrl+Shift+X`)
3. Search for **"Universal Runner"**
4. Click **Install**

Or install directly from the command line:
```bash
code --install-extension xAmbiente.universal-runner-extension
```

## ⚡ Usage

### Quick Run
Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac) to run your project.

### Via Command Palette
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "Universal Runner: Run Project"
3. Press Enter

### Via Status Bar
Click the **▶ Run Project** button in the VS Code status bar (bottom left).

## 🔧 How It Works

1. **Project Detection**: The extension scans your workspace for configuration files
2. **Language Identification**: Determines the project's primary language
3. **Command Building**: Constructs the appropriate build/run command
4. **Execution**: Runs the command in an integrated terminal
5. **Output**: Displays results in the "Universal Compiler" terminal

## 🎯 Examples

### Running a Python Project
```
workspace/
├── main.py
├── requirements.txt
└── venv/
```
→ Runs: `python main.py`

### Running a Node.js Project
```
workspace/
├── package.json
├── src/
│   └── index.ts
└── node_modules/
```
→ Runs: `npm run start` or `npm start`

### Running a Rust Project
```
workspace/
├── Cargo.toml
└── src/
    └── main.rs
```
→ Runs: `cargo run`

## ⚙️ Configuration

The extension works out-of-the-box with minimal configuration. It automatically detects:
- Build system type
- Project structure
- Required dependencies
- Appropriate execution method

## 🐛 Troubleshooting

**Extension doesn't detect my project**
- Ensure your project has the appropriate configuration file (e.g., `package.json`, `Cargo.toml`, `pom.xml`)
- Check that the workspace folder is the project root
- Reload VS Code (`Ctrl+Shift+P` → "Reload Window")

**Command fails to execute**
- Verify that the required build tools are installed
- Check terminal output for error messages
- Ensure all dependencies are installed (e.g., `npm install`, `cargo build`)

**Terminal shows permission errors**
- On Linux/Mac, you may need to make scripts executable: `chmod +x ./script.sh`

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/xAmbiente/universal-runner-extension.git
cd universal-runner-extension
```

2. Install dependencies:
```bash
npm install
```

3. Watch for changes:
```bash
npm run watch
```

4. Open the extension in debug mode:
   - Press `F5` to launch the extension development host

### Building

```bash
npm run compile
```

### Testing

```bash
npm test
```

## 📝 License

MIT License - See [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

Built for developers who want to focus on coding, not configuration.

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/xAmbiente/universal-runner-extension/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/xAmbiente/universal-runner-extension/discussions)

---

**Happy Running! 🚀**

*Press `Ctrl+Shift+R` and let the magic happen.*