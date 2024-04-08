import { test } from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import { LoginPage } from "../../src/page/Login/login";
test("Login form", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(data.email, data.password);
});
