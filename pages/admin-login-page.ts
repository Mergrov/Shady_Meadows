import { Page, expect, Locator } from "@playwright/test";

export class AdminLoginPage {

  url: string;
  usernameField: Locator;
  passwordField: Locator;  
  loginButton: Locator;
  logoutButton: Locator;
  invalidCredentialAlert: Locator;
  
  constructor(protected page: Page) {
 
    this.url = "https://automationintesting.online/admin";
    this.usernameField = this.page.locator("#username");
    this.passwordField = this.page.locator("#password");
    this.loginButton = this.page.locator("#doLogin");
    this.logoutButton = this.page.getByRole("button", {name:"Logout"})
    this.invalidCredentialAlert = this.page.getByRole("alert")
      .and(this.page.getByText("Invalid credentials"))

  
  }
 
  async openAdminLoginPage(): Promise<void> {
    await this.page.goto("https://automationintesting.online/admin");
    await expect(this.page).toHaveURL(`https://automationintesting.online/admin`);
  }

  async loginAsAdmin(username:string, password:string): Promise<void> {
    await expect(this.usernameField).toBeVisible();
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
 
}