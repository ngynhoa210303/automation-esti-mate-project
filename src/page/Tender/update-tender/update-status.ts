import { Page } from "@playwright/test";
import { table_tender_locator } from "../../../locator/tender-locator/sort-locator";
import {
  row_locator,
  select_locator,
  total_tender_locator,
} from "../../../locator/tender-locator/table-tender-list-locator";
import {
  paging_locator,
  select_box_locator,
} from "../../../locator/tender-locator/update-tender-locator";
import { ClickTender } from "../create-tender/add-tender";

export class StatusLocator {
  readonly page: any;
  readonly tableLocator: any;
  readonly row: any;
  readonly table_locator: any;
  readonly paging_locator: any;
  readonly sttOptions: any[] = ["Draft", "Pending", "Won", "Lost"];

  constructor(page: Page) {
    this.page = page;
    this.tableLocator = page.locator(table_tender_locator);
    this.row = this.tableLocator.locator(row_locator);
    this.table_locator = this.row.locator(select_locator);
    this.paging_locator = page.$$(paging_locator);
  }

  async selectFirstProduct() {
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
    const selectBoxLocator = await chosenRow.$(select_box_locator);
    const randomCBB = Math.floor(Math.random() * this.sttOptions.length);
    const randomOption = this.sttOptions[randomCBB];
    await selectBoxLocator.click();
    await selectBoxLocator.selectOption({ value: randomOption });
    await selectBoxLocator.click();
  }
}
