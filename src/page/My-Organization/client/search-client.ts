import { search_text_box_locator } from "../../../locator/my-organization-locator/client-locator/remove-and-search-client-locator";

export class SearchClient {
  readonly page: any;
  readonly factory_header_locator: any;
  readonly search_text_box_locator: any;
  constructor(page: any) {
    this.page = page;
    this.search_text_box_locator = page.locator(search_text_box_locator);
  }
  async search(dataSearch: string) {
    await this.search_text_box_locator.fill(dataSearch);
  }
}
