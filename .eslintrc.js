module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
    'plugin:playwright/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'playwright'],
  rules: {
    // TypeScript specific rules
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/prefer-const': 'error',
    '@typescript-eslint/no-var-requires': 'error',
    
    // General code quality rules
    'no-console': 'error', // Don't use console.log in tests
    'prefer-const': 'error',
    'no-var': 'error',
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'all'],
    
    // Playwright specific rules
    'playwright/missing-playwright-await': 'error',
    'playwright/no-page-pause': 'error',
    'playwright/no-element-handle': 'error',
    'playwright/no-eval': 'error',
    'playwright/no-focused-test': 'error',
    'playwright/no-skipped-test': 'warn',
    'playwright/no-wait-for-timeout': 'error', // Avoid time-based waiting
    
    // Code style rules
    'indent': ['error', 2],
    'quotes': ['error', 'single', { avoidEscape: true }],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    
    // Import rules
    'sort-imports': ['error', {
      ignoreCase: false,
      ignoreDeclarationSort: false,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
    }],
  },
  overrides: [
    {
      files: ['tests/**/*.spec.ts', 'tests/**/*.test.ts'],
      rules: {
        // Test-specific rules
        'playwright/expect-expect': 'error',
        'max-len': 'off', // Test descriptions can be longer
      },
    },
    {
      files: ['pom/**/*.ts'],
      rules: {
        // Page Object Model specific rules
        '@typescript-eslint/explicit-member-accessibility': ['error', {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
          },
        }],
      },
    },
    {
      files: ['api/**/*.ts'],
      rules: {
        // API specification files rules
        '@typescript-eslint/explicit-function-return-type': 'error',
      },
    },
  ],
  ignorePatterns: [
    'node_modules/',
    'playwright-report/',
    'test-results/',
    '*.js',
  ],
};
