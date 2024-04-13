import { Page } from "@playwright/test";
import { project_locator } from "../../../locator/project-locator/filter-locator";

export class LocatorToProject {
  readonly page: any;
  readonly project_locator: any;

  constructor(page: Page) {
    this.page = page;
    this.page = page;
    this.project_locator = page.locator(project_locator);
  }
  async locatorToProject() {
    await this.project_locator.click();
  }
}
