import { test } from "@playwright/test";
import * as dataCreate from "../../utils/data/project/create-project-data.json";
import { LoginPage } from "../../src/page/Login/login";
import { CreateProject } from "../../src/page/Project/all-project/create-project";
import { FillAllProject } from "../../src/page/Project/all-project/fill-all-information-of-project-control";
import { DeleteProject } from "../../src/page/Project/all-project/delete-project";
import { LocatorToProject } from "../../src/page/Project/all-project/locator-to-project";
import { FilterProject } from "../../src/page/Project/all-project/filter-project";
import dotenv from "dotenv";
import { LocatorToClient } from "../../src/page/My-Organization/client/locator-to-client-tab";
import { CreateClient } from "../../src/page/My-Organization/client/create-client";
import * as dataCreateClient from "../../utils/data/my-organization/client/create-client.json";
import { ClickTender } from "../../src/page/Tender/create-tender/add-tender";
import { FillToInputText } from "../../src/page/Tender/create-tender/fill-general-information";
import * as dataGenenral from "../../utils/data/tender/general-information-data.cred.json";

dotenv.config();
test.skip("TC017: Create project", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
  });
  test("Create project", async ({ page }) => {
    await createTender(page);
    await createClient(page);
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
  async function createTender(page: any) {
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await createNewTender.clickCreate();
    const newInput = new FillToInputText(page);
    await newInput.fillInput(
      dataGenenral[1].title,
      dataGenenral[1].city,
      dataGenenral[1].take_off,
      dataGenenral[1].quote_by,
      dataGenenral[1].contact_name,
      dataGenenral[1].description,
      dataGenenral[1].notes,
      dataGenenral[1].reference_no,
      dataGenenral[1].tags
    );
  }
  async function createClient(page: any) {
    const locator = new LocatorToClient(page);
    await locator.locatorToClient();
    const createClient = new CreateClient(page);
    await createClient.createClient(
      dataCreateClient[3].name,
      dataCreateClient[3].company,
      dataCreateClient[3].address,
      dataCreateClient[3].city,
      dataCreateClient[3].abn
    );
  }
});
