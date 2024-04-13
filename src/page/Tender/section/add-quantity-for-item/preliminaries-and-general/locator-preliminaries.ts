import {
  add_item_locator,
  preliminaries_tab_locator,
} from "../../../../../locator/section-locator/preliminaries-and-general/fill-quantity-and-check-locator";
export class LocatorPreliminaries {
  readonly page: any;
  readonly tender_in_menu: any;
  readonly preliminaries_tab_locator: any;
  readonly add_item_locator: any;
  constructor(page: any) {
    this.page = page;
    this.preliminaries_tab_locator = page.locator(preliminaries_tab_locator);
    this.add_item_locator = page.locator(add_item_locator);
  }
  async locatorPreliminariesTab() {
    await this.preliminaries_tab_locator.click();
    await this.add_item_locator.click();
  }
}
