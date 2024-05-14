import test from "@playwright/test";
import * as dataGenenral from "../../utils/data/tender/general-information-data.cred.json";
import { LoginPage } from "../../src/page/Login/login";
import * as dataUpdate from "../../utils/data/project/update-project-data.json";
import { UpdateProject } from "../../src/page/Project/all-project/update-information-of-project";
import { LocatorToProject } from "../../src/page/Project/all-project/locator-to-project";
import { FillAllProject } from "../../src/page/Project/all-project/fill-all-information-of-project-control";
import dotenv from "dotenv";
import * as dataCreateClient from "../../utils/data/my-organization/client/create-client.json";
import { LocatorToClient } from "../../src/page/My-Organization/client/locator-to-client-tab";
import { CreateClient } from "../../src/page/My-Organization/client/create-client";
import { ClickTender } from "../../src/page/Tender/create-tender/add-tender";
import { FillToInputText } from "../../src/page/Tender/create-tender/fill-general-information";
dotenv.config();
test.skip("TC008: Update tender", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await page.waitForTimeout(3000);
  });
  test("Update project", async ({ page }) => {
    await createTender(page);
    await createClient(page);
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
