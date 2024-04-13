import { test } from "@playwright/test";
import * as data from "../../../utils/data/login/logindata.cred.json";
import * as dataAddUser from "../../../utils/data/my-organization/users/add-user.json";
import { LoginPage } from "../../../src/page/Login/login";
import { LocatorUser } from "../../../src/page/My-Organization/user/locator-to-user-tab";
import { AddUser } from "../../../src/page/My-Organization/user/add-user";
import { LocatorToTenderDocument } from "../../../src/page/My-Organization/tender-document/locator-tender-document";
import { ChangeTenderDocument } from "../../../src/page/My-Organization/tender-document/change-tender-document";
import { RemoveTenderDocument } from "../../../src/page/My-Organization/tender-document/remove-tender-document";

test.describe("TC028: Remove tender document", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
  });
  test("Remove tender document", async ({ page }) => {
    const locatorChange = new LocatorToTenderDocument(page);
    await locatorChange.locatorTenderDocument();
    const removeElement = new RemoveTenderDocument(page);
    await removeElement.removeElement();
  });
});
