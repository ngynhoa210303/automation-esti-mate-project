import { LoginPage } from "../../page/login";
import { test } from "@playwright/test";
import * as data from "../../utils/data/logindata.cred.json";
test("Login form", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(data.email, data.password);
});
