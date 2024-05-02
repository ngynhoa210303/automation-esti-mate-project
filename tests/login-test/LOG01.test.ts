import { expect, test } from "@playwright/test";
import { LoginPage } from "../../src/page/Login/login";
import dotenv from "dotenv";
import {
  error_email_and_password_valid,
  error_email_empty,
  error_email_wrong_format,
  error_password_empty,
  home_in_header,
} from "../../src/locator/account-locator/login-locator";
// import path from "path";
// const envPath = path.resolve(__dirname, "tests/../../../utils/.env");
// dotenv.config({ path: envPath });
dotenv.config();
test("Login form", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await test.step("Login with empty email", async () => {
    await loginPage.login("", String(process.env.PASSWORD));
    await expect(page.locator(error_email_empty)).toBeVisible();
  });
  await test.step("Login with empty password", async () => {
    await loginPage.login(String(process.env.EMAIL), "");
    await expect(page.locator(error_password_empty)).toBeVisible();
  });
  await test.step("Login with invalid email", async () => {
    await loginPage.login("invalidEmail@manage", String(process.env.PASSWORD));
    await expect(page.locator(error_email_and_password_valid)).toBeVisible();
  });
  await test.step("Login with invalid password", async () => {
    await loginPage.login(String(process.env.EMAIL), "invalidPassword@manage");
    await expect(page.locator(error_email_and_password_valid)).toBeVisible();
  });
  await test.step("Login with wrong fomat email", async () => {
    await loginPage.login("Wrong", String(process.env.PASSWORD));
    await expect(page.locator(error_email_wrong_format)).toBeVisible();
  });
  await loginPage.login(
    String(process.env.EMAIL),
    String(process.env.PASSWORD)
  );
  // await expect(page.locator(home_in_header)).toBeVisible();
  await page.waitForTimeout(3000);
});
