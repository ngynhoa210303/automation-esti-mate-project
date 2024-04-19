import { Page } from "@playwright/test";
import {
  make_copy_locator,
  paging_locator,
  row_locator,
  select_locator,
  table_locator,
  total_tender_locator,
} from "../../../locator/tender-locator/table-tender-list-locator";
import { ClickTender } from "../create-tender/add-tender";

export class MakeCopyTender {
  readonly page: any;
  readonly table_locator: any;
  readonly row: any;
  readonly action_select: any;
  readonly first_element_table: any;
  readonly paging_locator: any;
  constructor(page: Page) {
    this.page = page;
    this.table_locator = page.locator(table_locator);
    this.row = this.table_locator.locator(row_locator);
    this.first_element_table = this.row.first();
    this.table_locator = this.first_element_table.locator(select_locator);
    this.paging_locator = page.$$(paging_locator);
  }
  async makeACopyElementOfPagination(pageNo: any) {
    if (!(await this.page.locator(total_tender_locator).isVisible())) {
      console.log("Chưa có dữ liệu thêm 1 tender");
      const newTender = new ClickTender(this.page);
      await newTender.clickCreate();
      await this.page.waitForTimeout(3000);
      await newTender.clickTender();
      await this.page.waitForTimeout(3000);
      await this.makeACopyDetail(pageNo);
      return;
    }
    await this.makeACopyDetail(pageNo);
  }
  async makeACopyDetail(pageNo: any) {
    await this.table_locator.click();
    for (const dt of await this.paging_locator) {
      if ((await dt.textContent()) == pageNo) {
        await dt.click();
        break;
      }
    }
    await this.page.locator(make_copy_locator).first().click();
  }
}
