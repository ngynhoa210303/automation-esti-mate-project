import { Page } from "@playwright/test";
import {
  desserts_locator,
  desserts_row,
  table_tender_locator,
} from "../../../locator/tender-locator/sort-locator";
import { total_tender_locator } from "../../../locator/tender-locator/table-tender-list-locator";
import { ClickTender } from "../create-tender/add-tender";

export class SortTender {
  readonly page: any;
  readonly table_locator: any;
  readonly desserts_locator: any;
  readonly desserts_attribute: any;
  readonly desserts_row: any;
  constructor(page: Page) {
    this.page = page;
    this.table_locator = page.locator(table_tender_locator);
    this.desserts_locator = this.table_locator.locator(desserts_locator);
    this.desserts_row = page.locator(desserts_row);
  }
  async sort() {
    if (!(await this.page.locator(total_tender_locator).isVisible())) {
      console.log("Chưa có dữ liệu thêm 1 tender");
      const newTender = new ClickTender(this.page);
      await newTender.clickCreate();
      await this.page.waitForTimeout(3000);
      await newTender.clickTender();
      await this.page.waitForTimeout(3000);
    }
    await this.sortAttribute();
  }
  async sortAttribute() {
    let count = 0;
    const allText = await this.desserts_row.allTextContents();
    while (count < 3) {
      await this.desserts_locator.click();
      const sort = await this.desserts_locator.getAttribute("aria-sort");
      if (sort === "descending") {
        allText.sort((a: any, b: any) => b.localeCompare(a));
      }
      if (sort === "ascending") {
        allText.sort();
      } else {
        console.log(
          "Exp none -- " + (await this.desserts_row.allTextContents())
        );
      }
      count++;
    }
  }
}
