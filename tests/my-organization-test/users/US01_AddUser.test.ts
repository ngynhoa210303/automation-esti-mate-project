import { test } from "@playwright/test";
import * as data from "../../../utils/data/login/logindata.cred.json";
import * as dataAddUser from "../../../utils/data/my-organization/users/add-user.json";
import { LoginPage } from "../../../src/page/Login/login";
import { LocatorUser } from "../../../src/page/My-Organization/user/locator-to-user-tab";
import { AddUser } from "../../../src/page/My-Organization/user/add-user";
import dotenv from "dotenv";
dotenv.config();
test.describe("TC025: Add user", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await page.waitForTimeout(3000);
  });
  test("Add user", async ({ page }) => {
    const locatorUser = new LocatorUser(page);
    await locatorUser.locatorUser();
    await page.waitForTimeout(2000);
    const addUser = new AddUser(page);
    await addUser.addUser(dataAddUser.email);
  });
});
