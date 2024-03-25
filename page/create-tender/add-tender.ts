export class CreateNewTender {
  readonly page: any;
  readonly tender_in_menu: any;
  readonly tender_button: any;
  readonly save_button: any;
  constructor(page: any) {
    this.page = page;

    this.tender_in_menu = page.getByRole("link", {
      name: "Tenders",
      exact: true,
    });
    this.tender_button = page.locator(
      '//section//div//div[@id="newTender"]//button'
    );
    this.save_button = page.locator("//div[4]/button");
  }
  async clickTender() {
    await this.tender_in_menu.click();
  }
  async clickCreate() {
    await this.tender_button.click();
  }
  async save() {
    await this.save_button.click();
  }
}
