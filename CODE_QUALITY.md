# Code Quality Tools

This project uses ESLint and Prettier to maintain high code quality standards.

## Tools Overview

### ESLint
- **TypeScript support**: Full TypeScript linting with `@typescript-eslint`
- **Playwright rules**: Specific rules for Playwright test quality
- **MCP compliance**: Rules aligned with MCP testing best practices

### Prettier
- **Consistent formatting**: Automatic code formatting
- **Team consistency**: Ensures all code follows the same style
- **Integration**: Works seamlessly with ESLint

## Scripts

### Linting
```bash
npm run lint          # Check for linting issues
npm run lint:fix      # Auto-fix linting issues
```

### Formatting
```bash
npm run format        # Format all files
npm run format:check  # Check if files are formatted
```

### Combined Quality Checks
```bash
npm run quality       # Run lint and format check
npm run quality:fix   # Fix lint issues and format code
```

## Key Rules Enforced

### MCP Compliance
- ✅ **No console.log** in tests (MCP rule #2)
- ✅ **No waitForTimeout** (MCP rule - avoid time-based waiting)
- ✅ **Explicit function return types** (MCP rule #6 - TypeScript types)
- ✅ **Missing await detection** for Playwright methods

### Code Quality
- ✅ **TypeScript strict mode**: No `any`, explicit types
- ✅ **Consistent imports**: Sorted and organized
- ✅ **Code style**: Single quotes, semicolons, trailing commas
- ✅ **Accessibility**: Proper member visibility in POM classes

### Test-Specific Rules
- ✅ **Playwright best practices**: No element handles, no eval
- ✅ **Test focus detection**: Warns about `.only()` tests
- ✅ **Expect assertions**: Ensures tests have expectations

## IDE Integration

### VSCode
Add these settings to `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["typescript"]
}
```

### Pre-commit Hook
Consider adding a pre-commit hook to run quality checks:
```bash
npm run quality
```

## File Structure
```
├── .eslintrc.js      # ESLint configuration
├── .prettierrc       # Prettier configuration
├── .prettierignore   # Files to ignore in formatting
└── CODE_QUALITY.md   # This documentation
```

## Continuous Integration
Add quality checks to your CI pipeline:
```yaml
- name: Check Code Quality
  run: npm run quality
