import { Page } from "@playwright/test";
import { table_locator } from "../../../locator/tender-locator/table-tender-list-locator";
import { row_locator } from "../../../locator/tender-locator/table-tender-list-locator";
import { save_button } from "../../../locator/tender-locator/create-tender-locator";

export class DetailTender {
  readonly page: any;
  readonly tableLocator: any;
  readonly row: any;
  readonly detailLocator: any;
  readonly save_button: any;
  constructor(page: Page) {
    this.page = page;
    this.tableLocator = page.locator(table_locator);
    this.row = this.tableLocator.locator(row_locator);
    this.save_button = page.locator(save_button);
  }
  async findTitle() {
    const rows = await this.page.$$(row_locator);
    const randomIndex = Math.floor(Math.random() * rows.length);
    const chosenRow = rows[randomIndex];
    const titleTender = await chosenRow.$("//td//span//a");
    await titleTender.click();
  }
}
