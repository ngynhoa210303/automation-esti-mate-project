import { expect, test } from "@playwright/test";
import { LoginPage } from "../../src/page/Login/login";
import dotenv from "dotenv";
import { factory_header_locator } from "../../src/locator/factory-locator/search-item-locator";
import {
  drop_button_locator,
  update_button_locator,
  update_material_rate_locator,
} from "../../src/locator/factory-locator/upload-material-rate";
import path from "path";

dotenv.config();
test.skip("FAC05: Upload file", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await page.waitForTimeout(2000);
  });

  test("Upload files", async ({ page }) => {
    await page.locator(factory_header_locator).click();
    await page.locator(update_material_rate_locator).click();
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.locator(drop_button_locator).click();
    const fileChooser = await fileChooserPromise;
    const filePath = path.join(
      __dirname,
      "tests/../../../utils/material-update-file/ItemMaterialRates.csv"
    );
    await fileChooser.setFiles(filePath);
    const relativeFilePath = path.join(
      process.cwd(),
      "tests/../../../utils/material-update-file/ItemMaterialRates.csv"
    );
    await page.setInputFiles('input[type="file"]', relativeFilePath);
    await fileChooserPromise;
    expect(
      page.locator("//span[contains(text(),'ItemMaterialRates.csv')]")
    ).toBeVisible();
    await page.locator(update_button_locator).click();
    // expect(
    //   page.getByText('Items material rate updated')
    // ).toBeVisible();
  });
});
