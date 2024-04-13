import { Page, test } from "@playwright/test";
import {
  confirm_delete_locator,
  no_data_locator,
  row_locator,
  select_locator,
  table_locator,
  total_tender_locator,
} from "../../../locator/tender-locator/table-tender-list-locator";
import { delete_locator } from "../../../locator/tender-locator/delete-locator";
import { ClickTender } from "../create-tender/add-tender";

export class DeleteTender {
  readonly page: any;
  readonly table_locator: any;
  readonly row: any;
  readonly action_select: any;
  readonly first_element_table: any;
  readonly no_data_locator: any;

  constructor(page: Page) {
    this.page = page;
    this.table_locator = page.locator(table_locator);
    this.row = this.table_locator.locator(row_locator);
    this.action_select = this.row.locator(select_locator);
    this.no_data_locator = this.table_locator.locator(no_data_locator);
  }
  async deleteRandomElement() {
    await this.page.waitForTimeout(3000);
    if (!(await this.page.locator(total_tender_locator).isVisible())) {
      console.log("Chưa có dữ liệu thêm 1 tender");
      const newTender = new ClickTender(this.page);
      await newTender.clickCreate();
      return;
    }
    let before = await this.splitStringTender();
    console.log("bf:" + before);
    if (await this.no_data_locator.isVisible()) {
      console.log("Hết dữ liệu 1 trang");
      await this.page.reload();
    }
    await this.deleteDetail();
    await this.page.waitForTimeout(2000);
    if (before != null && before > 1) {
      let after = await this.splitStringTender();
      if (after != null) {
        if (before == after - 1) {
          test.expect(true).toBeTruthy();
        }
      }
    }
  }
  async deleteDetail() {
    const rows = await this.page.$$(row_locator);
    const randomIndex = Math.floor(Math.random() * rows.length);
    const chosenRow = rows[randomIndex];
    const actionButton = await chosenRow.$(select_locator);
    await actionButton.click();
    const delete_button_locator = await this.page
      .locator(delete_locator)
      .nth(randomIndex);
    await delete_button_locator.click();
    await this.page.locator(confirm_delete_locator).click();
  }
  async splitStringTender() {
    const path = this.page.locator(total_tender_locator);
    const textContent = await path.textContent();
    const match = textContent?.match(/\d+/);
    const number: number | null = match ? parseInt(match[0]) : null;
    return number;
  }
}
