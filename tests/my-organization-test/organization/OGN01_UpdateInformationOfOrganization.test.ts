import { test } from "@playwright/test";
import * as dataUpdateInfor from "../../../utils/data/my-organization/organization/organization.json";
import { LoginPage } from "../../../src/page/Login/login";
import { OrganizationInformation } from "../../../src/page/My-Organization/organization/update-information";
import dotenv from "dotenv";
dotenv.config();
test.describe("TC026: Update information of organization", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await page.waitForTimeout(3000);
  });
  test("Update information of organization", async ({ page }) => {
    const organizationInformation = new OrganizationInformation(page);
    await organizationInformation.uploadInformation(
      dataUpdateInfor.name,
      dataUpdateInfor.email,
      dataUpdateInfor.phone,
      dataUpdateInfor.address_line_1,
      dataUpdateInfor.address_line_2,
      dataUpdateInfor.city,
      dataUpdateInfor.zip_code,
      dataUpdateInfor.abn
    );
  });
});
