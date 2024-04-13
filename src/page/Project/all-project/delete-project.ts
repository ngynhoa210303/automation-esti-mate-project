import { Page } from "@playwright/test";
import {
  confirm_delete_locator,
  delete_locator,
  row_locator,
  table_locator,
  action_locator,
} from "../../../locator/project-locator/remove-project-locator";

export class DeleteProject {
  readonly page: any;
  readonly table_locator: any;
  readonly row: any;
  readonly action_select: any;
  readonly first_element_table: any;

  constructor(page: Page) {
    this.page = page;
    this.table_locator = page.locator(table_locator);
    this.row = this.table_locator.locator(row_locator);
    this.action_select = this.row.locator(action_locator);
  }
  async deleteRandomElement() {
    await this.page.waitForTimeout(3000);
    const rows = await this.page.$$(row_locator);
    const randomIndex = Math.floor(Math.random() * rows.length);
    const chosenRow = rows[randomIndex];
    const actionButton = await chosenRow.$(action_locator);
    await actionButton.click();
    const delete_button_locator = await this.page
      .locator(delete_locator)
      .nth(randomIndex);
    await delete_button_locator.click();
    await this.page.locator(confirm_delete_locator).click();
  }
}
