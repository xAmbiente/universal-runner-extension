# Contributing to Universal Runner

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and constructive
- Assume good intentions
- Report issues respectfully

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git
- Visual Studio Code (for testing)

### Development Setup

1. Fork the repository
```bash
# On GitHub: Click "Fork"
```

2. Clone your fork
```bash
git clone https://github.com/YOUR-USERNAME/universal-runner-extension.git
cd universal-runner-extension
```

3. Install dependencies
```bash
npm install
```

4. Create a feature branch
```bash
git checkout -b feature/your-feature-name
```

## Development

### Watch Mode

To continuously compile TypeScript and rebuild:
```bash
npm run watch
```

### Manual Compilation

```bash
npm run compile
```

### Running Tests

```bash
npm test
```

### Code Quality

Before submitting a PR, ensure code passes:

```bash
npm run lint              # Check code style
npm run check-types       # Check TypeScript types
npm run compile           # Compile code
```

### Debugging

1. Press `F5` in VS Code to launch the extension in debug mode
2. This opens a new VS Code window with your extension loaded
3. Set breakpoints and debug normally

## Making Changes

### Code Style

- 2 spaces for indentation
- Use TypeScript
- Follow ESLint rules (automatically enforced)
- Format code with Prettier

### Commit Messages

Use conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (no logic change)
- `refactor:` - Code refactor
- `test:` - Add/update tests
- `chore:` - Build, deps, etc.

Examples:
```bash
git commit -m "feat: add support for Rust projects"
git commit -m "fix: resolve terminal output buffering issue"
git commit -m "docs: update README with examples"
```

### Adding Language Support

To add support for a new language:

1. Create a new file in `src/languages/` named after the language (e.g., `mylang.ts`)
2. Implement the language interface
3. Add detection logic in `src/detector.ts`
4. Add build commands in `src/compiler.ts`
5. Update `src/types.ts` if needed
6. Update README.md with the new language
7. Test thoroughly

Example language file structure:
```typescript
import * as path from 'path';
import * as fs from 'fs';

export const detect = (root: string): boolean => {
  // Check if project is MyLang type
  return fs.existsSync(path.join(root, 'myproject.toml'));
};

export const buildCommand = (root: string): string => {
  // Return the build command
  return 'mylang build && mylang run';
};
```

## Submitting Changes

### Pull Request Process

1. Update your branch with latest `main`
```bash
git fetch origin
git rebase origin/main
```

2. Push your branch
```bash
git push origin feature/your-feature-name
```

3. Create a Pull Request on GitHub
   - Provide a clear title describing the change
   - Include a description of what changed and why
   - Reference any related issues (e.g., "Fixes #123")
   - Add screenshots if UI changes

4. Respond to code review feedback

5. Once approved, your PR will be merged

## Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Include tests for new functionality
- Update documentation accordingly
- Ensure all CI checks pass
- Keep commits clean and well-documented

## Reporting Issues

When reporting bugs, include:

- VS Code version
- Extension version
- Operating system
- Steps to reproduce
- Expected behavior
- Actual behavior
- Terminal output/error logs

### Feature Requests

Describe:
- Use case and motivation
- Expected behavior
- Possible implementation approach
- Any alternatives considered

## Testing

### Manual Testing Checklist

Before submitting a PR:
- [ ] Extension activates correctly
- [ ] Command runs on test projects
- [ ] Status bar button works
- [ ] Error messages are helpful
- [ ] Terminal output is clear
- [ ] Keyboard shortcut works

### Adding Tests

Place tests in `src/test/` and name them `*.test.ts`

```typescript
import * as assert from 'assert';

suite('Extension Tests', () => {
  test('should detect project', () => {
    // Test code
    assert.strictEqual(result, expected);
  });
});
```

## Documentation

- Update README.md for user-facing changes
- Add code comments for complex logic
- Update CHANGELOG.md with user-visible changes

## Release Process (Maintainers)

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Commit: `chore: release v0.x.x`
4. Tag: `git tag v0.x.x`
5. Push: `git push && git push --tags`
6. Package: `npm run package`
7. Publish to VS Code Marketplace

## Questions?

- Check existing [issues](https://github.com/xAmbiente/universal-runner-extension/issues)
- Open a new issue for discussion
- Join our community discussions

---

Happy contributing! 🚀
