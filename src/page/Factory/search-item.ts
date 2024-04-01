import {
  factory_header_locator,
  search_text_box_locator,
} from "../../locator/factory-locator/search-item-locator";

export class SearchItemOfFactory {
  readonly page: any;
  readonly factory_header_locator: any;
  readonly search_text_box_locator: any;
  constructor(page: any) {
    this.page = page;
    this.factory_header_locator = page.locator(factory_header_locator);
    this.search_text_box_locator = page.locator(search_text_box_locator);
  }
  async search(dataSearch: string) {
    await this.factory_header_locator.click();
    await this.search_text_box_locator.fill(dataSearch);
  }
}
