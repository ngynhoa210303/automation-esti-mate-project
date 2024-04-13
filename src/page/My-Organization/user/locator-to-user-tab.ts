import {
  home_in_menu,
  my_organization_locator,
  user_tab_locator,
} from "../../../locator/my-organization-locator/client-locator/locator-of-client";

export class LocatorUser {
  readonly page: any;
  readonly home_in_menu: any;
  readonly my_organization_locator: any;
  readonly user_tab_locator: any;
  constructor(page: any) {
    this.page = page;
    this.home_in_menu = page.locator(home_in_menu);
    this.user_tab_locator = page.locator(user_tab_locator);
  }
  async locatorUser() {
    await this.home_in_menu.click();
    await this.user_tab_locator.click();
  }
}
