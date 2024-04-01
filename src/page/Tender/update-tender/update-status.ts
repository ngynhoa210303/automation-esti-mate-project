import { Page } from "@playwright/test";
import { table_tender_locator } from "../../../locator/tender-locator/sort-locator";
import {
  row_locator,
  select_locator,
} from "../../../locator/tender-locator/table-tender-list-locator";

export class StatusLocator {
  readonly page: any;
  readonly tableLocator: any;
  readonly row: any;
  readonly table_locator: any;
  readonly paging_locator: any;
  readonly sttOptions: any[] = ["Draft", "Pending", "Won", "Lost"]; // Replace with your actual options

  constructor(page: Page) {
    this.page = page;
    this.tableLocator = page.locator(table_tender_locator);
    this.row = this.tableLocator.locator(row_locator);
    this.table_locator = this.row.locator(select_locator);
    this.paging_locator = page.$$("//nav[@class='pagination is-centered']//li");
  }

  async selectFirstProduct() {
    const rows = await this.page.$$(row_locator);
    const randomIndex = Math.floor(Math.random() * rows.length);
    const chosenRow = rows[randomIndex];
    const selectBoxLocator = await chosenRow.$(
      "//td[@class='vgt-left-align']//span/select"
    );
    const randomCBB = Math.floor(Math.random() * this.sttOptions.length);
    const randomOption = this.sttOptions[randomCBB];
    await selectBoxLocator.click();
    await selectBoxLocator.selectOption({ value: randomOption });
    await selectBoxLocator.click();
  }
}
