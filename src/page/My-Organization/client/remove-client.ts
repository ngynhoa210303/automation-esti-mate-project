import { Page } from "@playwright/test";
import {
  confirm_remove,
  remove_button_locator,
  table_locator,
} from "../../../locator/my-organization-locator/client-locator/remove-and-search-client-locator";
export class DeleteClient {
  readonly page: any;
  readonly table_locator: any;
  readonly row: any;
  readonly action_select: any;
  readonly confirm_remove: any;
  readonly remove_button_locator: any;

  constructor(page: Page) {
    this.page = page;
    this.table_locator = page.locator(table_locator);
    this.row = this.table_locator.locator("tbody > tr");
    this.confirm_remove = page.locator(confirm_remove);
    this.remove_button_locator = page.locator(remove_button_locator);
  }
  async deleteRandomElement() {
    await this.deleteDetail();
    await this.page.waitForTimeout(2000);
  }
  async deleteDetail() {
    const rows = await this.page.$$("tbody > tr");
    const randomIndex = Math.floor(Math.random() * rows.length);
    const delete_button_locator = await this.remove_button_locator.nth(
      randomIndex
    );
    await delete_button_locator.click();
    await this.confirm_remove.click();
  }
}
