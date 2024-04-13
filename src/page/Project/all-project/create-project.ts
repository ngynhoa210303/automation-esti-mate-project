import { Page, test } from "@playwright/test";
export class CreateProject {
  readonly page: any;
  readonly new_project_locator: any;

  constructor(page: Page) {
    this.page = page;
    this.new_project_locator = page.locator(
      "//button[@class='button is-primary']//span[normalize-space()='New project']"
    );
  }
  async createProject() {
    await this.new_project_locator.click();
  }
}
