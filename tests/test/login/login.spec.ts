import { test } from "@playwright/test";
import { LoginPage } from "../../../page/login";
test("test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.url;
  // await loginPage.login("0342838284", "Hoa1234xg");
  await loginPage.login("anhdh.bhsoft+1@gmail.com");
});
