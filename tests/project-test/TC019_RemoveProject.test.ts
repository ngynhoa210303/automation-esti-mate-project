import { Page, test } from "@playwright/test";
import * as data from "../../utils/data/login/logindata.cred.json";
import { LoginPage } from "../../src/page/Login/login";
import { DeleteProject } from "../../src/page/Project/all-project/delete-project";

test.describe("TC019: Delete project", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(data.email, data.password);
  });
  test("Delete tender", async ({ page }) => {
    // const createNewTender = new ClickTender(page);
    // await createNewTender.clickTender();
    // await delay(2000);
    // for (let i = 0; i <= 9; i++) {
    //   const checkExist = page.locator(
    //     "//p[contains(text(),'Start by creating your first tender')]"
    //   );
    //   const count = await checkExist.count();
    //   if (count > 0) {
    // await page.reload();
    // return;
    //   } else {
    // let before = await splitStringTender(page);
    const deleteElement = new DeleteProject(page);
    await deleteElement.deleteRandomElement();
    // await delay(2000);
    // if (before != null && before > 1) {
    //   let after = await splitStringTender(page);
    //   if (after != null) {
    //     if (before === after - 1) {
    //       test.expect(true).toBeTruthy();
    //     }
    //   }
    // }
  });
  // }
});
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// export async function splitStringTender(page: Page) {
//   const path = page.locator(total_tender_locator);
//   const textContent = await path.textContent();
//   if (textContent !== null) {
//     const match = textContent.match(/\d+/);
//     const number: number | null = match ? parseInt(match[0]) : null;
//     return number;
//   }
//   if (textContent == null) {
//     return 0;
//   }
// }
