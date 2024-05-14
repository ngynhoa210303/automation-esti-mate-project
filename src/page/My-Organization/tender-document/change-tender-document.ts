import { add_button_locator, title_text_locator, edit_button_locator, content_text_locator, remove_button_locator, save_button_all_locator } from "../../../locator/my-organization-locator/tender-document/change-tender-doc";

export class ChangeTenderDocument {
  readonly page: any;
  readonly add_button_locator: any;
  readonly edit_button_locator: any;
  readonly title_text_locator: any;
  readonly content_text_locator: any;
  readonly save_button_locator: any;
  readonly remove_button_locator: any;
  readonly save_button_all_locator: any;
  constructor(page: any) {
    this.page = page;
    this.add_button_locator = page.locator(
      add_button_locator
    );
    this.edit_button_locator = page.locator(
      edit_button_locator
    );
    this.title_text_locator = page.locator(
      title_text_locator
    );
    this.content_text_locator = page.locator(
      content_text_locator
    );
    this.save_button_locator = page
      .getByRole("button", { name: "Save" })
      .nth(1);
    this.remove_button_locator = page.locator(
      remove_button_locator
    );
    this.save_button_all_locator = page.locator(
      save_button_all_locator
    );
  }
  async editTenderDocument() {
    await this.edit_button_locator.click();
    await this.title_text_locator.first().fill("DOC-001");
    await this.content_text_locator.first().fill("DOC-001");
    await this.save_button_locator.click();
    await this.save_button_all_locator.click();
    await this.page.waitForTimeout(2000);
  }
  async createTenderDocument() {
    await this.add_button_locator.click();
  }

}
