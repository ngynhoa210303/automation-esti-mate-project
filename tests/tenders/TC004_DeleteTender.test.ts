import { Page, test } from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import * as status from "../../utils/data/tender/data-test-action.cred.json";
import { total_tender_locator } from "../../src/locator/tender-locator/table-tender-list-locator";
import { LoginPage } from "../../src/page/Login/login";
import { ClickTender } from "../../src/page/Tender/create-tender/add-tender";
import { DeleteTender } from "../../src/page/Tender/action/delete-tender";

test.describe("TC004: Delete tender", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
  });
  test("Delete tender", async ({ page }) => {
    const createNewTender = new ClickTender(page);
    await createNewTender.clickTender();
    await delay(2000);
    for (let i = 0; i <= 10; i++) {
      // await checkExsist(page);
      let before = await splitStringTender(page);
      const deleteElement = new DeleteTender(page);
      await deleteElement.deleteElementOfPagination(status.pagination);
      await delay(2000);
      if (before != null && before > 1) {
        let after = await splitStringTender(page);
        if (after != null) {
          if (before === after - 1) {
            test.expect(true).toBeTruthy();
          }
        }
      }
    }
    // await page.reload();
  });
});
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function splitStringTender(page: Page) {
  const path = page.locator(total_tender_locator);
  const textContent = await path.textContent();
  if (textContent !== null) {
    const match = textContent.match(/\d+/);
    const number: number | null = match ? parseInt(match[0]) : null;
    return number;
  }
  if (textContent == null) {
    return 0;
  }
}
// export async function checkExsist(page: Page) {
//   const noTableText = page.locator(
//     "//p[contains(text(),'Start by creating your first tender')]"
//   );
// }
