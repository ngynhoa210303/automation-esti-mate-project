import { Page } from "@playwright/test";
import { total_tender_locator } from "../../../locator/tender-locator/table-tender-list-locator";
import { LocatorToProject } from "./locator-to-project";
import { CreateProject } from "./create-project";
import { project_locator } from "../../../locator/project-locator/filter-locator";
export class UpdateProject {
  readonly page: any;
  readonly tableLocator: any;
  readonly detailLocator: any;
  readonly row: any;
  readonly project_locator: any;
  constructor(page: Page) {
    this.page = page;
    this.tableLocator = page.locator("//table[@id='vgt-table']");
    this.project_locator = page.locator(project_locator);
    this.row = this.tableLocator.locator("tbody >tr");
  }
  async findProject() {
    if (!(await this.page.locator(total_tender_locator).isVisible())) {
      const locatorPrj = new LocatorToProject(this.page);
      await locatorPrj.locatorToProject();
      const create = new CreateProject(this.page);
      await create.createProject();
      await this.page.waitForTimeout(3000);
      await this.project_locator.click();
      await this.page.waitForTimeout(3000);
    }
    const rows = await this.page.$$("tbody >tr");
    const randomIndex = Math.floor(Math.random() * rows.length);
    const chosenRow = rows[randomIndex];
    const titleTender = await chosenRow.$("//td//span//a");
    await titleTender.click();
  }
}
