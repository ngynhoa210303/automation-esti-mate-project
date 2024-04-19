import {
  add_item_IAC_locator,
  inspections_and_compliance_tab_locator,
} from "../../../../../locator/section-locator/inspections-and-compliance/fill-quantity-and-check-locator";

export class LocatorPre {
  readonly page: any;
  readonly tender_in_menu: any;
  readonly inspections_and_compliance_tab_locator: any;
  readonly add_item_locator: any;
  constructor(page: any) {
    this.page = page;
    this.inspections_and_compliance_tab_locator = page.locator(
      inspections_and_compliance_tab_locator
    );
    this.add_item_locator = page.locator(add_item_IAC_locator);
  }
  async locatorPreTab() {
    await this.inspections_and_compliance_tab_locator.click();
    await this.add_item_locator.click();
  }
}
