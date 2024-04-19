import { test } from "@playwright/test";
import { LoginPage } from "../../src/page/Login/login";
import { DeleteProject } from "../../src/page/Project/all-project/delete-project";
import { LocatorToProject } from "../../src/page/Project/all-project/locator-to-project";
import dotenv from "dotenv";
dotenv.config();
test.describe("TC019: Delete project", () => {
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
  test("Delete project", async ({ page }) => {
    const locatorProject = new LocatorToProject(page);
    await locatorProject.locatorToProject();
    const deleteElement = new DeleteProject(page);
    await deleteElement.deleteRandomElement();
  });
});
