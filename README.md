# Playwright Test Automation (TypeScript)

This repository contains automated end-to-end test scenarios using [Playwright](https://playwright.dev/) with TypeScript. It is designed to validate web application functionality through UI workflows, API validations, and data consistency checks. 

## Test Scenario: Primary Income Form mandatory field Validation

This test case verifies that the mandatory field validations on the Primary Income form are functioning correctly. The form should display clear and appropriate error messages when required fields are left empty.

## 🚀 Features

- Written in TypeScript
- Cross-browser compatibility
- End-to-end testing with Playwright
- Integrated API and UI validations
- Simple setup with Playwright Test Runner


Project Structure
=======================
Simplebooks Assignment - Kasuni /
-├── page-objects/
-│   ├── LoginPage.ts
-│   └── IncomePage.ts
-└── tests/
    -└── income-validation.spec.ts

Test Scenario Function
=======================
Explanation: This script tests the Primary Income form functionality on the tax.simplebooks.com platform. It focuses on validating two critical scenarios related to the income form:
1. Successful Login and Redirection to the Income Page:
	 The script tests the login functionality by logging into the application with valid credentials. After a successful login, the script checks if the user is initially on the onboard page (which requires additional steps for setup), it simulates clicking the “Get Started” button, ensuring the user is then redirected to the income page.

2. Validation of Mandatory Fields (Primary Income Form):
	 The second scenario checks if the primary income form correctly validates mandatory fields and generating the appropriate error messages if the user leaves required fields blank while submitting the primary income form.
	 These fields include:
	   o Amount field: Ensures the user cannot submit the form without entering an amount.
	   o Description field: Ensures the user cannot submit the form without providing a description.

Assumptions:
• The application has a login page at tax.simplebooks.com
• Elements have appropriate selectors (IDs, classes, or text content)
• The "Primary Income" form contains mandatory fields for Amount and Description.
• The application properly displays validation error messages for missing mandatory fields.
• After login, the user is redirected to the onboard page. (Then the script will trigger the redirection using the "Get Started" button.)
