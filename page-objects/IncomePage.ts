import { Page } from '@playwright/test';

const getStarted_Btn = "//button[normalize-space()='Get Started']";
const Manually_Enter_Data_Btn = "//button[normalize-space()='Manually Enter Data']";

export class IncomePage {
  readonly page: Page;
  readonly addButton = "//div[@class='card bg-light px-0 ps-md-5 border-0']//div[@class='border rounded-full p-3']//div[@class='d-flex flex-column flex-md-row justify-content-between align-items-start']//a[@class='btn-sm fw-bolder bg-theme-dark text-white w-auto mt-2 mt-md-0 align-self-end align-self-md-center'][contains(text(),'Add')]";
  readonly addDetailButton = "//button[contains(text(),'Add Detail')]";
  readonly amountRequiredError = "//div[contains(text(),'amount is a required field')]";
  readonly descriptionRequiredError = "//div[contains(text(),'description is a required field')]";

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToIncomePage() {
    await this.page.goto('https://tax.simplebooks.com/main/income');
  }

  async isOnIncomePage() {
    return this.page.url().includes('/main/income');
  }

  async clickAddButton() {
    await this.page.click(this.addButton);
  }

  async clickAddDetailButton() {
    await this.page.click(this.addDetailButton);
  }

  async gotoIncomePage() {
    // Click the "Get Started" button once logged in
    await this.page.click(getStarted_Btn);
    await this.page.click(Manually_Enter_Data_Btn);
  }

  async areValidationErrorsVisible() {
    const amountErrorVisible = await this.page.isVisible(this.amountRequiredError);
    const descriptionErrorVisible = await this.page.isVisible(this.descriptionRequiredError);
    return amountErrorVisible && descriptionErrorVisible;
  }

  // Method to retrieve validation error messages
  async getValidationErrorMessages(): Promise<string[]> {
    const errorMessages: string[] = [];
    
    const amountError = await this.page.locator(this.amountRequiredError);
    const descriptionError = await this.page.locator(this.descriptionRequiredError);

    // Collect error messages for amount and description fields
    if (await amountError.isVisible()) {
      errorMessages.push(await amountError.innerText());
    }
    if (await descriptionError.isVisible()) {
      errorMessages.push(await descriptionError.innerText());
    }

    return errorMessages;
  }
}
