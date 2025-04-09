import { Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput = "//div[@class='mb-3']//input[@id='validationCustom01']";
  readonly passwordInput = "//div[@class='mb-3 position-relative']//input[@id='validationCustom01']";
  readonly loginButton = "//button[@type='submit']";

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://tax.simplebooks.com/login');
  }

  async login(email: string, password: string) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}