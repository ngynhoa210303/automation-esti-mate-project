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
  async search(search: string) {
    const randomOption = await this.random(this.filter_locator);
    await this.search_box_locator.fill(search);
    await this.filter_locator.selectOption({
      value: randomOption,
    });
  }

  async random(element: { evaluate: (arg0: () => string[]) => any }) {
    const options = await element.evaluate(() => {
      const options = Array.from(document.querySelectorAll("option"));
      return options.map((option) => option.value);
    });
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }
}
