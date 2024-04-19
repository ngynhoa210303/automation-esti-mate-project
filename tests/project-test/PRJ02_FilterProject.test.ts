import { test } from "@playwright/test";
import * as dataSearch from "../../utils/data/tender/data-test-action.cred.json";
import { LoginPage } from "../../src/page/Login/login";
import { FilterProject } from "../../src/page/Project/all-project/filter-project";
import { LocatorToProject } from "../../src/page/Project/all-project/locator-to-project";
import dotenv from "dotenv";
dotenv.config();
test.describe("TC018: Filter project", () => {
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
  });
  test("Filter project", async ({ page }) => {
    const locatorProject = new LocatorToProject(page);
    await locatorProject.locatorToProject();
    const filter = new FilterProject(page);
    await filter.search(dataSearch.search);
    await page.waitForTimeout(3000);
  });
});
