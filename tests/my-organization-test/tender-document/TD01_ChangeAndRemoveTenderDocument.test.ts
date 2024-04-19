import { test } from "@playwright/test";
import { LoginPage } from "../../../src/page/Login/login";
import { LocatorToTenderDocument } from "../../../src/page/My-Organization/tender-document/locator-tender-document";
import { ChangeTenderDocument } from "../../../src/page/My-Organization/tender-document/change-tender-document";
import dotenv from "dotenv";
import { RemoveTenderDocument } from "../../../src/page/My-Organization/tender-document/remove-tender-document";
dotenv.config();
test.describe("TD01: Change tender document", () => {
  test.beforeEach(async ({ page }) => {
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
  test("Change tender document", async ({ page }) => {
    const locatorChange = new LocatorToTenderDocument(page);
    await locatorChange.locatorTenderDocument();
    const changeUser = new ChangeTenderDocument(page);
    await changeUser.changeElement();
    const removeElement = new RemoveTenderDocument(page);
    await removeElement.removeElement();
  });
});