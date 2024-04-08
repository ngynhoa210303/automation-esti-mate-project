export class LocatorToClient {
  readonly page: any;
  readonly home_in_menu: any;
  readonly my_organization_locator: any;
  readonly acount_locator: any;
  readonly client_tab_locator: any;
  constructor(page: any) {
    this.page = page;
    this.home_in_menu = page.locator("//a[normalize-space()='Home']");
    this.my_organization_locator = page.locator(
      "//span[normalize-space()='Organization']"
    );
    this.client_tab_locator = page.locator(
      "//span[normalize-space()='Clients']"
    );
  }
  async locatorToClient() {
    await this.home_in_menu.click();
    await this.my_organization_locator.click();
    await this.client_tab_locator.click();
  }
}
