# Playwright Testing Framework (TypeScript)

This project contains Page Object Model (POM) classes for web application testing and API specification files using Playwright with TypeScript, following updated mcp_instr.md guidelines.

## Project Structure

```
pl_mcp/
├── pom/                          # Page Object Model files
│   ├── BasePage.ts              # Base class with ARIA-based locators
│   └── ContactFormPage.ts       # Contact form with user-facing locators
├── api/                          # API specification files
│   └── DigiDatesApi.ts          # DigiDates API with response logging
├── tests/                        # Test files
│   ├── api/digidates-api.spec.ts     # API test with logging
│   └── web/skipper-contact-form.spec.ts # Web test with ARIA locators
├── playwright.config.ts         # TypeScript Playwright configuration
├── tsconfig.json                # TypeScript config with path mapping
├── package.json                 # Dependencies with TypeScript & Node types
└── mcp_instr.md                # Updated testing guidelines
```

## Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **TypeScript** (included as dev dependency)

## Installation

```bash
npm install
```

## Updated Testing Guidelines Compliance

This project follows strict updated rules from `mcp_instr.md`:

### ✅ **Global Testing Rules**:
- **Rule 1**: ✅ Tests under 15 statements with meaningful helper functions
- **Rule 3**: ✅ Flat structure - no if/else, loops, try-catch, console.log in tests  
- **Rule 5**: ✅ Smoking gun principle - test data defined upfront
- **Rule 7**: ✅ Descriptive test titles with stakeholder/action/expectation
- **Rule 10**: ✅ ARIA-based locators only (getByRole, getByText)
- **Rule 15**: ✅ No explicit waits - removed waitForTimeout

### ✅ **Web Test Rules**:
- **Rule 10**: ✅ User-facing ARIA locators (`page.getByRole('button', {name: 'Submit'})`)
- **Rule 9**: ✅ No positional selectors (no `.first()`, `.nth()`)
- **Rule 8**: ✅ Auto-retryable assertions with `await expect()`

### ✅ **API Test Rules**:  
- **Rule 5**: ✅ Response body logging with `console.log(JSON.stringify(responseBody))`
- **Response validation**: ✅ Comprehensive schema validation

### ✅ **Coding Practices**:
- **Practice 2**: ✅ No console.log in tests (only in API specs for logging)
- **Practice 3**: ✅ Constants for hardcoded values
- **Practice 6**: ✅ TypeScript interfaces and types
- **Practice 9**: ✅ Short import paths (`@/api/DigiDatesApi`)

## Running Tests

```bash
# Run DigiDates API tests
npm run test:digidates

# Run Skipper contact form web tests  
npm run test:contact

# Run all tests
npm run test:all
```

## API Tests

### DigiDates API Test
**File**: `tests/api/digidates-api.spec.ts`  
**Test**: "User can retrieve unix timestamp, validate leap years, and calculate age from API"

**Features**:
- ✅ **Response Logging**: All API responses logged to console
- ✅ **Smoking Gun**: Expected values defined upfront as constants
- ✅ **Comprehensive Validation**: Unix timestamp, leap year logic, age calculation
- ✅ **Type Safety**: Interfaces for TestData and AgeData
- ✅ **Short Imports**: Uses `@/api/DigiDatesApi`

## Web Tests

### Skipper Contact Form Test  
**File**: `tests/web/skipper-contact-form.spec.ts`
**Test**: "User can submit contact form and receive confirmation or expected reCaptcha response"

**Features**:
- ✅ **ARIA Locators**: `getByRole('textbox', {name: /name/i})`, `getByRole('button', {name: /submit/i})`
- ✅ **No Positional Selectors**: Removed `.first()`, `.nth()` usage  
- ✅ **No Explicit Waits**: Removed `waitForTimeout()` calls
- ✅ **Helper Functions**: Meaningful methods like `fillContactFormWithTestData()`
- ✅ **Constants**: TEST_DATA defined as const object
- ✅ **Short Imports**: Uses `@/pom/ContactFormPage`

## Key Improvements

✅ **Full ARIA Compliance**: All locators use getByRole, getByText with accessibility names  
✅ **Response Body Logging**: API responses logged for debugging  
✅ **No Time-based Waits**: Removed waitForTimeout for better reliability  
✅ **TypeScript Path Mapping**: Short import paths (@/api/, @/pom/)  
✅ **Smoking Gun Principle**: All expected values defined upfront  
✅ **Helper Functions**: Multi-step operations encapsulated meaningfully  
✅ **Type Safety**: Comprehensive TypeScript interfaces and types  
✅ **Constants Usage**: No hardcoded values in tests  

## MCP Integration

This project is designed to work with Playwright MCP server for advanced automation capabilities when used with compatible MCP clients.
