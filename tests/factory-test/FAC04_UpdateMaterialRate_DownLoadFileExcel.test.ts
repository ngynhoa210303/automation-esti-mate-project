import { test } from "@playwright/test";
import { LoginPage } from "../../src/page/Login/login";
import dotenv from "dotenv";
import { DownLoadAllItem } from "../../src/page/Factory/download-file";

dotenv.config();
test.describe("FAC04: DownLoad File Excel", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD)
    );
    await page.waitForTimeout(2000);
  });
  test("DownLoad File Excel", async ({ page }) => {
    const downloadPromise = page.waitForEvent("download");
    const downLoadAllItem = new DownLoadAllItem(page);
    downLoadAllItem.checkDownLoad();
    const download = await downloadPromise;
    await download.saveAs(
      "./utils/material-update-file/download-file-test/" +
        download.suggestedFilename()
    );
  });
});
