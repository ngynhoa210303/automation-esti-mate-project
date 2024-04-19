import { test } from "@playwright/test";
import * as dataUpdateInfor from "../../../utils/data/my-organization/organization/organization.json";
import { LoginPage } from "../../../src/page/Login/login";
import { OrganizationInformation } from "../../../src/page/My-Organization/organization/update-information";
import dotenv from "dotenv";
dotenv.config();
test.describe("TC026: Update information of organization", () => {
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
