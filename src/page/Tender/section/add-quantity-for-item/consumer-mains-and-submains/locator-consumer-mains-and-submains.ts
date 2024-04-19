import {
  add_item_cmas_locator,
  consumer_mains_and_submains_tab_locator,
} from "../../../../../locator/section-locator/consumer-mains-and-submains/fill-quantity-and-check-locator";
export class LocatorCommunicationTab {
  readonly page: any;
  readonly tender_in_menu: any;
  readonly consumer_mains_and_submains_tab_locator: any;
  readonly add_item_cmas_locator: any;
  constructor(page: any) {
    this.page = page;
    this.consumer_mains_and_submains_tab_locator = page.locator(
      consumer_mains_and_submains_tab_locator
    );
    this.add_item_cmas_locator = page.locator(add_item_cmas_locator);
  }
  async locatorCommunicationTab() {
    await this.consumer_mains_and_submains_tab_locator.click();
    await this.add_item_cmas_locator.click();
  }
}
