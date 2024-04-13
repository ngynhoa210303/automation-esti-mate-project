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
      "(//i[contains(@class,'ph ph-plus')])[1]"
    );
    this.edit_button_locator = page.locator(
      "(//i[contains(@class,'ph ph-pencil')])[1]"
    );
    this.title_text_locator = page.locator(
      "(//input[@placeholder='Enter label'])[1]"
    );
    this.content_text_locator = page.locator(
      "(//textarea[@class='textarea'])[1]"
    );
    this.save_button_locator = page
      .getByRole("button", { name: "Save" })
      .nth(1);
    this.remove_button_locator = page.locator(
      "(//i[contains(@class,'ph ph-minus')])[1]"
    );
    this.save_button_all_locator = page.locator(
      "//button[@class='button is-primary']//span[contains(text(),'Save')]"
    );
  }
  async changeElement() {
    await this.add_button_locator.click();
    await this.edit_button_locator.click();
    await this.title_text_locator.first().fill("Dep");
    await this.content_text_locator.first().fill("Dep");
    await this.save_button_locator.click();
    await this.save_button_all_locator.click();
    await this.page.waitForTimeout(2000);
  }
}
