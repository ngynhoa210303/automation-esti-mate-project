import {
  factory_header_locator,
  set_default_locator,
} from "../../../locator/factory-locator/set-default";

export class SetDefaultConfigItem {
  readonly page: any;
  readonly factory_header_locator: any;
  readonly set_default_locator: any;
  constructor(page: any) {
    this.page = page;
    this.factory_header_locator = page.locator(factory_header_locator);
    this.set_default_locator = page.locator(set_default_locator);
  }
  async setDefault() {
    await this.factory_header_locator.click();
    await this.set_default_locator.click();
  }
}
