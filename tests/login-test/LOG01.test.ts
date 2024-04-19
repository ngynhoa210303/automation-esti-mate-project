import { test } from "@playwright/test";
import { LoginPage } from "../../src/page/Login/login";
import dotenv from "dotenv";
// import path from "path";
// const envPath = path.resolve(__dirname, "tests/../../../utils/.env");
// dotenv.config({ path: envPath });
dotenv.config();
test("Login form", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const EMAIL = process.env.EMAIL;
  const PASSWORD = process.env.PASSWORD;
  if (!EMAIL || !PASSWORD) {
    throw new Error(
      "Email and/or Password environment variables are not defined."
    );
  }
  await loginPage.login(EMAIL, PASSWORD);
  await page.waitForTimeout(3000);
});
