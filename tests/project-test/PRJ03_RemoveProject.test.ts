import { test } from "@playwright/test";
import { LoginPage } from "../../src/page/Login/login";
import { DeleteProject } from "../../src/page/Project/all-project/delete-project";
import { LocatorToProject } from "../../src/page/Project/all-project/locator-to-project";
import dotenv from "dotenv";
dotenv.config();
test.skip("TC019: Delete project", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await page.waitForTimeout(3000);
  });
  test("Delete project", async ({ page }) => {
    const locatorProject = new LocatorToProject(page);
    await locatorProject.locatorToProject();
    const deleteElement = new DeleteProject(page);
    await deleteElement.deleteRandomElement();
  });
});
