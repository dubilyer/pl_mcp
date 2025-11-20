# Plhaywright Testing Framework

This project contains Page Object Model (POM) classes for web application testing and simple API tests using Playwright.

## Project Structure

```
pl_mcp/
├── pom/                       # Page Object Model files
│   ├── BasePage.js           # Base class with common functionality
│   ├── SkipperHomePage.js    # Skipper website home page
│   ├── CoreServicesPage.js   # Skipper services page
│   ├── AboutSkipperPage.js   # Skipper about page
│   └── ContactUsPage.js      # Skipper contact page
├── tests/                     # Test files
│   └── digidates-api.spec.js # DigiDates API tests
├── playwright.config.js       # Playwright configuration
├── package.json               # Node.js dependencies
├── mcp_instr.md              # Code generation instructions
├── .gitignore                 # Git ignore file
└── README.md                  # This file
```

## Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager

## Installation

```bash
npm install
```

## Page Object Model Architecture

This project follows the Page Object Model pattern as specified in `mcp_instr.md`. All page interactions are encapsulated in Page Object classes.

### Available Page Objects

#### BasePage.js
Base class providing common functionality:
- Navigation methods
- Header verification
- Utility methods (scrolling, screenshots, responsiveness)
- Common element interactions

#### Skipper Website Pages
- **SkipperHomePage.js** - Homepage with statistics and main content
- **CoreServicesPage.js** - Services page with 6 service offerings
- **AboutSkipperPage.js** - Company information and expertise
- **ContactUsPage.js** - Contact forms and call-to-action

### Creating a New Page Object

1. Create a new file in `/pom` directory: `pom/MyPageName.js`
2. Extend BasePage for common functionality:

```javascript
import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class MyPageName extends BasePage {
  constructor(page) {
    super(page);
    
    // Define page-specific locators
    this.myButton = page.getByRole('button', { name: 'Click Me' });
    this.myHeading = page.getByRole('heading', { name: 'Welcome' });
  }

  async navigate() {
    await this.page.goto('https://example.com');
  }

  async clickButton() {
    await this.myButton.click();
  }

  async verifyHeading() {
    await expect(this.myHeading).toBeVisible();
  }

  async verifyFullPage() {
    await this.verifyPageTitle();
    await this.verifyCommonHeader();
    await this.verifyHeading();
  }
}
```

### Usage Example

```javascript
import { test } from '@playwright/test';
import { SkipperHomePage } from '../pom/SkipperHomePage.js';

test('example test', async ({ page }) => {
  const homePage = new SkipperHomePage(page);
  
  await homePage.navigate();
  await homePage.waitForPageLoad();
  await homePage.verifyFullPage();
  await homePage.navigateToServices();
});
```

## DigiDates API Tests

This project includes 3 API tests for the DigiDates time and date functions API with comprehensive data validation.

### Running Tests

```bash
# Run DigiDates API tests
npm run test:digidates

# Run Skipper contact form web tests
npm run test:contact

# Run all tests
npm run test:all
```

### Available API Tests

The `tests/digidates-api.spec.js` file contains 3 API tests using the API specification pattern:

1. **Unix Timestamp Test** - Tests the `/api/v1/unixtime` endpoint
   - Gets current unix timestamp
   - Validates response is a number greater than 0
   - Checks timestamp is close to current time (within 60 seconds)

2. **Leap Year Test** - Tests the `/api/v1/leapyear` endpoint  
   - Tests with known leap year (2024) and non-leap year (2023) 
   - Validates response is boolean type
   - Confirms correct leap year calculation

3. **Age Calculation Test** - Tests the `/api/v1/age/{date}` endpoint
   - Calculates age from birthdate (1990-01-01)
   - Validates response structure with age and ageextended fields
   - Checks age values are reasonable and within expected ranges

### API Specification Features

✅ **Page Object Pattern for APIs** - All API calls encapsulated in DigiDatesApi class  
✅ **Data Validation** - Comprehensive validation of response data types and structure  
✅ **Error Handling** - Graceful handling of different response codes (200, 400, 500)  
✅ **Test Data Generation** - Dynamic test data generation for consistent testing  
✅ **Response Verification** - Dedicated verification methods for each endpoint type

## Skipper Soft Contact Form Web Tests

This project includes comprehensive web tests for the Skipper Soft contact form with full form validation and submission testing.

### Available Web Tests

The `tests/skipper-contact-form.spec.js` file contains 1 comprehensive web test using the Page Object Model pattern:

**Complete Contact Form Test** - End-to-end validation of the contact form functionality:
1. Navigates to skipper-soft.com homepage
2. Verifies page loaded successfully with proper title and header
3. Scrolls down to contact form section
4. Validates all form fields are present and visible
5. Verifies contact information is displayed (phone, email, location)
6. Generates unique test data dynamically
7. Fills all form fields with valid test data
8. Verifies form data is correctly entered
9. Submits the form
10. Validates form submission response (passes for both success and expected reCaptcha errors)

### Web Test Features

✅ **Page Object Model** - ContactFormPage class encapsulates all form interactions  
✅ **Dynamic Test Data** - Unique test data generated for each test run  
✅ **Form Validation** - Comprehensive testing of required fields and email format  
✅ **reCaptcha Handling** - Expected behavior for automated test reCaptcha blocking  
✅ **Multi-scenario Testing** - Tests both complete and minimal form submissions  
✅ **Contact Info Verification** - Validates displayed contact information accuracy

## Key Features

✅ **Page Object Model Pattern** - All interactions encapsulated in page classes  
✅ **Inheritance Structure** - Base classes provide common functionality  
✅ **Code Reusability** - Common elements and methods extracted  
✅ **Navigation Handling** - Proper hamburger menu and navigation flows  
✅ **Simple API Testing** - Basic API tests with data validation  
✅ **Verification Methods** - Comprehensive validation for both UI and API  
✅ **Responsive Support** - Multi-viewport testing capabilities  
✅ **ECMAScript Modules** - Modern JavaScript syntax throughout

## MCP Integration

This project is designed to work with Playwright MCP server for advanced automation capabilities when used with compatible MCP clients.
