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
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
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
