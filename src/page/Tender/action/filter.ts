import { Page } from "@playwright/test";
import {
  filter_locator,
  search_box_locator,
} from "../../../locator/tender-locator/table-tender-list-locator";
export class FilterTender {
  readonly page: any;
  readonly search_box_locator: any;
  readonly filter_locator: any;
  readonly sttOptions: any;

  constructor(page: Page) {
    this.page = page;
    this.search_box_locator = page.locator(search_box_locator);
    this.filter_locator = page.locator(filter_locator);
  }
  async searchOnly(search: string) {
    await this.search_box_locator.fill(search);
  }
  async filterAndSearch(filter: any, text_search: any) {
    await this.search_box_locator.fill(text_search);
    await this.page.waitForTimeout(2000);
    await this.filter_locator.selectOption({
      value: filter,
    });
  }
}
