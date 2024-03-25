import { Page } from "@playwright/test";

export class StatusLocator {
  readonly page: any;
  readonly tableLocator: any;
  readonly firstElementTable: any;
  readonly selectStatus: any;
  readonly row: any;
  constructor(page: Page) {
    this.page = page;
    this.tableLocator = page.locator("//table[@id='vgt-table']");
    this.row = this.tableLocator.locator("tbody tr");
    this.firstElementTable = this.row.first();
    this.tableLocator = this.firstElementTable.locator(
      "//span/div/div/span/select"
    );
  }
  async selectFirstProduct(status: any) {
    await this.tableLocator.click();
    await this.tableLocator.selectOption({ value: status });
  }
}
