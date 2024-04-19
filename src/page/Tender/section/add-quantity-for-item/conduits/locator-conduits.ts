import {
  add_item_conduits_locator,
  conduits_tab_locator,
} from "../../../../../locator/section-locator/conduits/fill-quantity-and-check-locator";

export class LocatorConduitsTab {
  readonly page: any;
  readonly tender_in_menu: any;
  readonly conduits_tab_locator: any;
  readonly add_item_cmas_locator: any;
  constructor(page: any) {
    this.page = page;
    this.conduits_tab_locator = page.locator(conduits_tab_locator);
    this.add_item_cmas_locator = page.locator(add_item_conduits_locator);
  }
  async locatorConduitsTab() {
    await this.conduits_tab_locator.click();
    await this.add_item_cmas_locator.click();
  }
}
