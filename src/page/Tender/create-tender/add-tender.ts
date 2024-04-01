import {
  new_tender_button,
  save_button,
  tender_in_menu,
} from "../../../locator/tender-locator/create-tender-locator";

export class ClickTender {
  readonly page: any;
  readonly tender_in_menu: any;
  readonly tender_button: any;
  readonly save_button: any;
  constructor(page: any) {
    this.page = page;
    this.tender_in_menu = page.locator(tender_in_menu);
    this.tender_button = page.locator(new_tender_button);
    this.save_button = page.locator(save_button);
  }
  async clickTender() {
    await this.tender_in_menu.click();
  }
  async clickCreate() {
    await this.tender_button.click();
  }
  async save() {
    await this.save_button.click();
  }
}
