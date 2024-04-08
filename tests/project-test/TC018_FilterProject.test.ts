import { test } from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import * as dataSearch from "../../utils/data/tender/data-test-action.cred.json";
import { LoginPage } from "../../src/page/Login/login";
import { FilterProject } from "../../src/page/Project/all-project/filter-project";
test.describe("TC018: Filter project", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
  });
  test("Filter project", async ({ page }) => {
    const login = new LoginPage(page);
    await login.login(data.email, data.password);
    await delay(2000);
    const filter = new FilterProject(page);
    await filter.search(dataSearch.search);
    await delay(3000);
  });
});
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
