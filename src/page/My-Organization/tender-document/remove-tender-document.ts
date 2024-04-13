export class RemoveTenderDocument {
  readonly page: any;
  readonly remove_button_locator: any;
  readonly confirm_button_locator: any;
  readonly save_button_all_locator: any;
  constructor(page: any) {
    this.page = page;
    this.remove_button_locator = page.locator(
      "(//i[contains(@class,'ph ph-minus')])[1]"
    );
    this.save_button_all_locator = page.locator(
      "//button[@class='button is-primary']//span[contains(text(),'Save')]"
    );
    this.confirm_button_locator = page.locator("//button[text()='Remove']");
  }
  async removeElement() {
    await this.remove_button_locator.click();
    await this.confirm_button_locator.click();
    await this.save_button_all_locator.click();
    await this.page.waitForTimeout(2000);
  }
}
