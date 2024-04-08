export class SearchClient {
  readonly page: any;
  readonly factory_header_locator: any;
  readonly search_text_box_locator: any;
  constructor(page: any) {
    this.page = page;
    this.search_text_box_locator = page.locator(
      "//div[@class='th-wrap']//input[@type='text']"
    );
  }
  async search(dataSearch: string) {
    await this.search_text_box_locator.fill(dataSearch);
  }
}
