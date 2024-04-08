export class CreateClient {
  readonly page: any;
  readonly add_button: any;
  readonly name_text_locator: any;
  readonly company_text_locator: any;
  readonly address_text_locator: any;
  readonly city_text_locator: any;
  readonly abn_text_locator: any;
  readonly create_button_locator: any;
  constructor(page: any) {
    this.page = page;
    this.add_button = page.locator("//span[normalize-space()='Add Client']");
    this.name_text_locator = page.locator(
      "((//label[text()='Name'])[2]/following::input)[1]"
    );
    this.company_text_locator = page.locator(
      "(//label[text()='Company']/following::input)[1]"
    );
    this.address_text_locator = page.locator(
      "(//label[text()='Address']/following::input)[1]"
    );
    this.city_text_locator = page.locator(
      "((//label[text()='City'])[2]/following::input)[1]"
    );
    this.abn_text_locator = page.locator(
      "//div[@class='field is-expanded']//input[@type='text']"
    );
    this.create_button_locator = page.locator(
      "//span[normalize-space()='Create']"
    );
  }
  async createClient() {
    await this.add_button.click();
    await this.name_text_locator.fill("Mr JOHN");
    await this.company_text_locator.fill("Bac Ha Software");
    await this.address_text_locator.fill("Ha Noi");
    await this.city_text_locator.fill("Ha Noi");
    await this.abn_text_locator.fill("TEST");
    await this.create_button_locator.click();
  }
}
