import {
  home_in_menu,
  my_organization_locator,
  tender_document_tab_locator,
} from "../../../locator/my-organization-locator/client-locator/locator-of-client";

export class LocatorToTenderDocument {
  readonly page: any;
  readonly home_in_menu: any;
  readonly my_organization_locator: any;
  readonly tender_document_tab_locator: any;
  constructor(page: any) {
    this.page = page;
    this.home_in_menu = page.locator(home_in_menu);
    this.my_organization_locator = page.locator(my_organization_locator);
    this.tender_document_tab_locator = page.locator(
      tender_document_tab_locator
    );
  }
  async locatorTenderDocument() {
    await this.home_in_menu.click();
    await this.my_organization_locator.click();
    await this.tender_document_tab_locator.click();
  }
}
