import {
  client_tab_locator,
  home_in_menu,
  my_organization_locator,
} from "../../../locator/my-organization-locator/client-locator/locator-of-client";

export class LocatorToClient {
  readonly page: any;
  readonly home_in_menu: any;
  readonly my_organization_locator: any;
  readonly client_tab_locator: any;
  constructor(page: any) {
    this.page = page;
    this.home_in_menu = page.locator(home_in_menu);
    this.my_organization_locator = page.locator(my_organization_locator);
    this.client_tab_locator = page.locator(client_tab_locator);
  }
  async locatorToClient() {
    await this.home_in_menu.click();
    await this.my_organization_locator.click();
    await this.client_tab_locator.click();
  }
}
