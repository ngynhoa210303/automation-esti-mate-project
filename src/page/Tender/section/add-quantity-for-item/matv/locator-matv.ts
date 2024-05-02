import {
  add_item_MATV_locator,
  matv_tab_locator,
} from "../../../../../locator/section-locator/matv/fill-quantity-and-check-locator";

export class LocatorMaTV {
  readonly page: any;
  readonly tender_in_menu: any;
  readonly matv_tab_locator: any;
  readonly add_item_locator: any;
  constructor(page: any) {
    this.page = page;
    this.matv_tab_locator = page.locator(matv_tab_locator);
    this.add_item_locator = page.locator(add_item_MATV_locator);
  }
  async locatorPreTab() {
    await this.matv_tab_locator.click();
    await this.add_item_locator.click();
  }
}
