import { expect, test } from "@playwright/test";
import { LoginPage } from "../../src/page/Login/login";
import { LocatorToTenderDocument } from "../../src/page/My-Organization/tender-document/locator-tender-document";
import { ChangeTenderDocument } from "../../src/page/My-Organization/tender-document/change-tender-document";
import dotenv from "dotenv";
import { RemoveTenderDocument } from "../../src/page/My-Organization/tender-document/remove-tender-document";
import { content_text_locator } from "../../src/locator/my-organization-locator/tender-document/change-tender-doc";
dotenv.config();
test.skip("TD01: Change tender document", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await page.waitForTimeout(3000);
  });
  test("Change tender document", async ({ page }) => {
    const changeUser = new ChangeTenderDocument(page);
    let count = 0;
    const countTenderDoc = page.locator("(//h1[contains(text(),'Page 2')]//parent::div[1]//parent::div[1]//parent::div[1])[1]//div[@class='mb-5']");
    await test.step("Create tender document", async () => {
      const locatorChange = new LocatorToTenderDocument(page);
      await locatorChange.locatorTenderDocument();
      if (countTenderDoc.first()) {
        count = await countTenderDoc.count();
      }
      await changeUser.createTenderDocument();
      const countAfterCreate = await countTenderDoc.count();
      expect(countAfterCreate - count).toEqual(1)
    })
    await test.step("Edit tender document", async () => {
      await changeUser.editTenderDocument();
      const areaCheck = await getValueInput(page, content_text_locator);
      expect(areaCheck).toBe("DOC-001");
      expect(page.locator("//h3[normalize-space()='DOC-001']")).toBeVisible();
    })
    await test.step("Delete tender document", async () => {
      if (countTenderDoc.first()) {
        count = await countTenderDoc.count();
      }
      const removeElement = new RemoveTenderDocument(page);
      await removeElement.removeElement();
      const countAfterCreate = await countTenderDoc.count();
      expect(count - countAfterCreate).toEqual(1)
    })

  });
});
export async function getValueInput(page: any, locator: any) {
  const inputElement = await page.$(locator);
  if (inputElement) {
    const inputValue = await inputElement.evaluate(
      (input: { value: any }) => input.value
    );
    return inputValue;
  }
}