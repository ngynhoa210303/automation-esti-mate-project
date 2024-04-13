import { test } from "@playwright/test";
import * as data from "../../../utils/data/login/logindata.cred.json";
import * as dataUpdateInfor from "../../../utils/data/my-organization/organization/organization.json";
import { LoginPage } from "../../../src/page/Login/login";
import { OrganizationInformation } from "../../../src/page/My-Organization/organization/update-information";

test.describe("TC026: Update information of organization", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
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
