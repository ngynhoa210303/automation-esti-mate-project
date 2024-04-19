import {
  add_item_locator,
  sub_contractors_tab_locator,
} from "../../../../../locator/section-locator/sub-contractors/fill-quantity-and-check-sub-locator";
export class LocatorSubContractor {
  readonly page: any;
  readonly tender_in_menu: any;
  readonly sub_contractor_tab_locator: any;
  readonly add_item_locator: any;
  constructor(page: any) {
    this.page = page;
    this.sub_contractor_tab_locator = page.locator(sub_contractors_tab_locator);
    this.add_item_locator = page.locator(add_item_locator);
  }
  async locatorSubContractorTab() {
    await this.sub_contractor_tab_locator.click();
    await this.add_item_locator.click();
  }
}
