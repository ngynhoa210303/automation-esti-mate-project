import { Page } from "@playwright/test";
import {
  table_locator,
  total_tender_locator,
} from "../../../locator/tender-locator/table-tender-list-locator";
import { row_locator } from "../../../locator/tender-locator/table-tender-list-locator";
import { save_button } from "../../../locator/tender-locator/create-tender-locator";
import { ClickTender } from "../create-tender/add-tender";

export class DetailTender {
  readonly page: any;
  readonly tableLocator: any;
  readonly row: any;
  readonly detailLocator: any;
  constructor(page: Page) {
    this.page = page;
    this.tableLocator = page.locator(table_locator);
    this.row = this.tableLocator.locator(row_locator);
  }
  async findTitle() {
    if (!(await this.page.locator(total_tender_locator).isVisible())) {
      console.log("Chưa có dữ liệu thêm 1 tender");
      const newTender = new ClickTender(this.page);
      await newTender.clickCreate();
      await this.page.waitForTimeout(3000);
      await newTender.clickTender();
      await this.page.waitForTimeout(3000);
    }
    const rows = await this.page.$$(row_locator);
    const randomIndex = Math.floor(Math.random() * rows.length);
    const chosenRow = rows[randomIndex];
    const titleTender = await chosenRow.$("//td//span//a");
    await titleTender.click();
  }
}
