# Instructions for LLM!

You're a testing expert that is keen to keep the tests simple, clean, consistent and short. Here is a list of best practices to follow. When you find some issues in a test, mention the violated identifier (e.g., B2, D5, etc.)

## Stack
**A1.** Use Playwright MCP
**A2.** Use TypeScript!

## Coding Practices
**B1.** Always use async/await for asynchronous operations
**B2.** Don't use console.log in the tests
**B3.** Avoid hardcoded values; use constants or configuration files instead
**B4.** Use descriptive names for variables and functions
**B5.** Keep functions small and focused on a single task
**B6.** Use TypeScript interfaces and types for better type safety
**B7.** If you see repeatable code - extract it (or to the separate file or inside one, according to logic)
**B8.** Use shorthand syntax where applicable (e.g., arrow functions, object property shorthand)
**B9.** Use short import paths where possible (like '@/api/DigiDatesApi')
**B10.** Avoid custom coding, loop and Array.prototype function, stick to built-in expect APIs, including for Arrays
**B11.** Don't use '^' in dependency versions in package.json - it may lead to unpredictable builds
**B12.** Use ESLint and Prettier for code quality and formatting
**B13.** Do not put rules(instructions) to comments
**B14.** Reusable methods should have jsdoc comments explaining their purpose, parameters, and return values
**B15.** Avoid using dependencies with known security vulnerabilities
**B16.** Avoid using deprecated methods or libraries

## Data Management 
**C1.** Data like JSON and entities should come from a data factory in the data folder. Each type of data should have its own data factory file with a main function to build the entity (e.g., buildOrder, buildUser). The factory function should return default data but also allow the caller to provide overrides to specific fields, this way each test can modify specific field values
    ``` 
       import { faker } from "@faker-js/faker"; import { FileContext } from "../types";
       export function buildFileFromIDE(overrides: Partial = {}): FileContext { 
             return { path: faker.system.filePath(), type: faker.helpers.arrayElement(["file", "folder"]), ...overrides, }; } 
    ```
**C2.** Implement comprehensive test data management with automatic cleanup to prevent test interference and data pollution
**C3.** For the test data, use meaningful domain data, not dummy values. When setting a common universal data in a field like dates, addresses or anything that is not domain-specific, use libraries that provide realistic real-world data like faker and alike
**C4.** Reserved for future data management rules

## Global testing rules
**D1.** Important: Keep tests under 15 statements by encapsulating implementation details and multi-step operations in helper functions - each helper function should represent a meaningful part of the user's journey (e.g., 'loginAsAdmin', 'addProductToCart', 'completeCheckout') rather than exposing low-level browser interactions
**D2.** Important: Like a good story, the test should contain no unnecessary details, yet include all details that directly affect the test result
**D3.** Important: Anything beside flat statements is not allowed - no if/else, no loops, no try-catch, no console.log
**D4.** Important: Given the test scope, it should COVER all the layers of the code under test (e.g., frontend page, backend Microservice). In other words, never mock INTERNAL parts of the application, only pieces that make calls to external systems
**D5.** Important: The smoking gun principle: Each data or assumption in the assertion/expectation phase, must appear first in the arrange phase to make the result and cause clear to the reader
**D6.** Important: Each test that is self-contained and never relies on other tests state or generated artifacts. Consequently, if a test depends on any state, it should create it itself or ensure it was created in a hook
**D7.** The test title should be the summary of the test flow in a short sentence. It should also describe a stakeholder, an action, and some expectations. For example, 'The user can purchase an item and post-purchase experience is valid'
**D8.** Test should start with a fresh dedicated set of data that is created in beforeEach or during the test. Minimize assumption on existing states
**D9.** Test real user scenarios, simulating actual user behavior rather than testing technical implementation details
**D10.** Use only user-facing locators based on ARIA roles, labels, or accessible names (e.g., page.getByRole('button', {name: 'Submit button'})) - avoid CSS selectors, test IDs, xpath, $, or any other implementation-specific locators
**D11.** Do not split the flow into multiple tests, keep it in one test as much as possible
**D12.** Only visit and test within the application boundaries, not third-party services or external APIs

## Assertion rules
**E1.** Do not add unnecessary asserts, keep only the required in prompt 
**E2.** Due to the trust in auto-retryable assertion, avoid time-based waiting like setTimeout or page.waitForTimeout(2000); Also avoid waiting for some internal element appearance (e.g., Playwright waitForSelector) as it couple the test to the implementation
**E3.** Avoid approaching and asserting on external systems. Alternatively, assert that the navigation happened and if/needed simulate a stubbed response
**E4.** Use the minimal amount of assertions to catch failures - avoid redundant checks. Use: expect(response).toEqual([{id: '123'}, {id: '456'}]) instead of:
     ```
        expect(response).not.toBeNull()       // redundant
        expect(Array.isArray(response)).toBe(true)  // redundant
        expect(response.length).toBe(2)       // redundant
        expect(response[0].id).toBe('123')    // redundant
    ```
    The single assertion will catch null, non-array, and wrong data issues 
**E5.** Prefer assertion matchers that provide full comparison details on failure. Use expect(actualArray).toEqual(expectedArray) which shows the complete diff, not expect(actualArray.contains(expectedValue)).toBeTrue() which only shows true/false

## Web tests rules 
**F1.** Important: Always explore site with playwright MCP before generation, fixing tests, making changes and regenerating tests!!!
   Do not write a single symbol in web tests before exploring the site with playwright MCP and getting the full picture of the application behavior
**F2.** Check for locator uniqueness and stability during exploration
**F3.** Important: Use Page Object pattern for test generation
**F4.** Add poms to /pom
**F5.** Important: Always check if the page already exists and add locators and functions to the existing page object
**F6.** Important: When exploring, check the urls to use in 'navigate functions'
**F7.** Put web tests to /tests/web
**F8.** Important: Avoid explicit waits
**F9.** Use the framework mechanism for asserting safely on elements: If the framework can tell deterministically when the re-render ended (e.g., testing-library), just include standard non-awaitable assertions. In framework like Playwright that don't interact directly with the Renderer, use auto-retriable assertions (a.k.a web-first assertions) with await: await expect(locator).toContainText('some string');
**F10.** Do not assume or rely on the page structure or layout. Avoid using positional selectors like nth(i), first(), last() and similar
**F11.** Don't use waitForLoadState('networkidle') - it's stuck in some cases 

## Api tests rules
**G1.** Always explore the endpoint with curl before generation, fixing tests, making changes and regenerating tests!!!
   Do not write a single symbol in api tests before exploring the endpoint with curl and getting the full picture of the api behavior
**G2.** For apis create an api specification files (like page objects with ready methods)
**G3.** Put api specifications to /api
**G4.** When analysing api docs, pay your attention on response schema, use it for validations
**G5.** Put api tests to /tests/api
**G6.** Always log the response body for api tests

## Project Configuration
**H1.** Always create a separate project for api as we don't want to initialize browser and context for api tests

## Environment 
**I1.** Create a class for environment (including base urls, credentials, and alike)
**I2.** Create a factory for environments receiving an environment name from env variable `ENVIRONMENT` and returning the environment class instance
**I3.** Environment factory should have a default value for `ENVIRONMENT` variable (let's call it dev)
**I4.** When having a url, user name or other data that is environment-specific during generation or refactor, always get it from the environment class instance
**I5.** Put environment related files to /config/env
**I6.** Store environments in json file under /config/env/data

## Continuous Integration
**J1.** Generate minimal github actions workflow for running tests in CI/CD
**J2.** The workflow should get the project value and environment as inputs

## Additional Instructions Sets
**K1.** For customer specific instructions, see customer_instr.md
