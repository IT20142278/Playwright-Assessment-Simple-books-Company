import { test, expect } from "@playwright/test";
import { LoginPage } from "../page-objects/LoginPage";
import { IncomePage } from "../page-objects/IncomePage";

const getStarted_Btn = "//button[normalize-space()='Get Started']";

test("Mandatory Field Validation Failure: User leaves required fields blank while entering primary income", async ({
  page,
}) => {
  // Initialize page objects
  const loginPage = new LoginPage(page);
  const incomePage = new IncomePage(page);

  // 1. Navigate to login page and login
  await loginPage.goto();

  // 2. Retry login until we land on the income page or onboard page
  const loginSuccessUrl = "https://tax.simplebooks.com/main/income";
  const onboardUrl = "https://tax.simplebooks.com/main/onboard";
  let isLoggedIn = false;

  // Loop until login is successful
  while (!isLoggedIn) {
    await loginPage.login("kasunijayasekara4@gmail.com", "Kasuni@5200"); 
    console.log("Attempted login");

    // Wait for page to load and check if we're on the correct page
    await page.waitForNavigation();
    if (page.url() === loginSuccessUrl) {
      isLoggedIn = true;
      console.log("Login successful, redirected to income page");
    } else if (page.url() === onboardUrl) {
      console.log("Login successful, redirected to onboard page");
      await incomePage.gotoIncomePage();  // Trigger navigation to income page
      isLoggedIn = true;  // Successfully navigated to income page
      console.log("Navigated to income page from onboarding");
    } else {
      console.log("Login failed, retrying...");
    }
  }

  // 3. Check if already on income page, else navigate
  if (!(await incomePage.isOnIncomePage())) {
    await incomePage.navigateToIncomePage();
    console.log("Navigated to income page");
  } else {
    console.log("Already on income page");
  }

  // 4. Click Add button
  await incomePage.clickAddButton();
  console.log("Clicked Add button");

  // 5. Click Add Detail button to trigger validation
  await incomePage.clickAddDetailButton();
  console.log("Clicked Add Detail button");

  // 6. Verify validation errors are displayed and print the errors
  const errorsVisible = await incomePage.areValidationErrorsVisible();
  expect(errorsVisible).toBeTruthy();
  const errorMessages = await incomePage.getValidationErrorMessages();
  console.log("Validation errors for amount and description fields are visible:");
  console.log(errorMessages);
});
