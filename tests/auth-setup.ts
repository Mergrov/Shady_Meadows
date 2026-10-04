import { test as setup, expect } from '@playwright/test';
import path from 'path';
import 'dotenv/config';
const authFile = path.join(__dirname, '.././auth/user.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://automationintesting.online/admin');
  await page.getByTestId("username").fill(process.env.USER_NAME as string);
  await page.getByTestId("password").fill(process.env.PASSWORD as string);
  await page.getByText("Admin").click();

  
  await page.context().storageState({ path: authFile });

})