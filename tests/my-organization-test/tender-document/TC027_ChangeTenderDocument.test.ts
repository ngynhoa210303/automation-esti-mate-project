import { test } from "@playwright/test";
import * as data from "../../../utils/data/login/logindata.cred.json";
import * as dataAddUser from "../../../utils/data/my-organization/users/add-user.json";
import { LoginPage } from "../../../src/page/Login/login";
import { LocatorUser } from "../../../src/page/My-Organization/user/locator-to-user-tab";
import { AddUser } from "../../../src/page/My-Organization/user/add-user";
import { LocatorToTenderDocument } from "../../../src/page/My-Organization/tender-document/locator-tender-document";
import { ChangeTenderDocument } from "../../../src/page/My-Organization/tender-document/change-tender-document";

test.describe("TC027: Change tender document", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
  });
  test("Change tender document", async ({ page }) => {
    const locatorChange = new LocatorToTenderDocument(page);
    await locatorChange.locatorTenderDocument();
    const changeUser = new ChangeTenderDocument(page);
    await changeUser.changeElement();
  });
});
