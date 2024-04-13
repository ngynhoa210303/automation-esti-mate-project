import { test } from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import * as dataCreate from "../../utils/data/project/create-project-data.json";
import { LoginPage } from "../../src/page/Login/login";
import { CreateProject } from "../../src/page/Project/all-project/create-project";
import { FillAllProject } from "../../src/page/Project/all-project/fill-all-information-of-project-control";
import { DeleteProject } from "../../src/page/Project/all-project/delete-project";
import { LocatorToProject } from "../../src/page/Project/all-project/locator-to-project";
import { FilterProject } from "../../src/page/Project/all-project/filter-project";
test.describe("TC017: Create project", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
  });
  test("Create project", async ({ page }) => {
    const locatorPrj = new LocatorToProject(page);
    await locatorPrj.locatorToProject();
    const create = new CreateProject(page);
    await create.createProject();
    await page.waitForTimeout(3000);
    const fill = new FillAllProject(page);
    await fill.fillAll(
      dataCreate.project_no,
      dataCreate.project_name,
      dataCreate.project_manager,
      dataCreate.project_coordinator,
      dataCreate.original_contract_value,
      dataCreate.hard_copy,
      dataCreate.normal_rate,
      dataCreate.double_rate,
      dataCreate.payment_terms
    );
    const locatorProject = new LocatorToProject(page);
    await locatorProject.locatorToProject();
    const searchElement = new FilterProject(page);
    await searchElement.onlySearch(dataCreate.project_name);
    const deleteElement = new DeleteProject(page);
    await deleteElement.deleteRandomElement();
  });
});
