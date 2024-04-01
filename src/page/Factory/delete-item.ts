import {
  confirm_remove_locator,
  remove_button,
  table_locator,
} from "../../locator/factory-locator/delete-item-locator";

export class DeleteItemOfFactory {
  readonly page: any;
  readonly table_locator: any;
  readonly row: any;
  readonly remove_locator: any;
  readonly confirm_remove_locator: any;
  constructor(page: any) {
    this.page = page;
    this.table_locator = page.locator(table_locator);
    this.confirm_remove_locator = this.page.locator(confirm_remove_locator);
  }
  async delete() {
    const rows = await this.page.$$("tbody >tr");
    const randomIndex = Math.floor(Math.random() * rows.length);
    const chosenRow = rows[randomIndex];
    const removeButton = await chosenRow.$(remove_button);
    await removeButton.click();
    await this.confirm_remove_locator.click();
  }
}
