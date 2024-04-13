import { Page } from "@playwright/test";
export class UpdateProject {
  readonly page: any;
  readonly tableLocator: any;
  readonly detailLocator: any;
  readonly row: any;
  constructor(page: Page) {
    this.page = page;
    this.tableLocator = page.locator("//table[@id='vgt-table']");
    this.row = this.tableLocator.locator("tbody >tr");
  }
  async findProject() {
    const rows = await this.page.$$("tbody >tr");
    const randomIndex = Math.floor(Math.random() * rows.length);
    const chosenRow = rows[randomIndex];
    const titleTender = await chosenRow.$("//td//span//a");
    await titleTender.click();
  }
}
