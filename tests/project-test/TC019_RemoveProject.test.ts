import { test } from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import { LoginPage } from "../../src/page/Login/login";
import { DeleteProject } from "../../src/page/Project/all-project/delete-project";
import { LocatorToProject } from "../../src/page/Project/all-project/locator-to-project";

test.describe("TC019: Delete project", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
  });
  test("Delete tender", async ({ page }) => {
    const locatorProject = new LocatorToProject(page);
    await locatorProject.locatorToProject();
    const deleteElement = new DeleteProject(page);
    await deleteElement.deleteRandomElement();
  });
});
