import { test } from "@playwright/test";
import { LoginPage } from "../../../page/login";
test("test", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.url;
  await loginPage.login("namnn.bhsoft@gmail.com", "BHTest123");
});
