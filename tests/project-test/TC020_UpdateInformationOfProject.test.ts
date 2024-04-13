import test from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import { LoginPage } from "../../src/page/Login/login";
import * as dataUpdate from "../../utils/data/project/update-project-data.json";
import { UpdateProject } from "../../src/page/Project/all-project/update-information-of-project";
import { LocatorToProject } from "../../src/page/Project/all-project/locator-to-project";
import { FillAllProject } from "../../src/page/Project/all-project/fill-all-information-of-project-control";

test.describe("TC008: Update tender", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
    await page.waitForTimeout(2000);
  });
  test("Update project", async ({ page }) => {
    const locatorPrj = new LocatorToProject(page);
    await locatorPrj.locatorToProject();
    await page.waitForTimeout(3000);
    const detail = new UpdateProject(page);
    await detail.findProject();
    await page.waitForTimeout(3000);
    const fill = new FillAllProject(page);
    await fill.fillAll(
      dataUpdate.project_no,
      dataUpdate.project_name,
      dataUpdate.project_manager,
      dataUpdate.project_coordinator,
      dataUpdate.original_contract_value,
      dataUpdate.hard_copy,
      dataUpdate.normal_rate,
      dataUpdate.double_rate,
      dataUpdate.payment_terms
    );
    await page.reload();
    await page.waitForTimeout(3000);
  });
});
