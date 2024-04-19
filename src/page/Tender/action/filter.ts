import { Page } from "@playwright/test";
import {
  filter_locator,
  search_box_locator,
  total_tender_locator,
} from "../../../locator/tender-locator/table-tender-list-locator";
import { ClickTender } from "../create-tender/add-tender";
import * as dataFillAll from "../../../../utils/data/tender/general-information-data.cred.json";
import { FillToInputText } from "../create-tender/fill-general-information";

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
  async search(search: string, page: Page) {
    if (!(await this.page.locator(total_tender_locator).isVisible())) {
      console.log("Chưa có dữ liệu thêm 1 tender");
      const newTender = new ClickTender(this.page);
      await newTender.clickCreate();
      const newInput = new FillToInputText(page);
      await newInput.fillInput(
        dataFillAll[0].title,
        dataFillAll[0].city,
        dataFillAll[0].take_off,
        dataFillAll[0].quote_by,
        dataFillAll[0].contact_name,
        dataFillAll[0].description,
        dataFillAll[0].notes,
        dataFillAll[0].reference_no,
        dataFillAll[0].tags
      );
      await this.page.waitForTimeout(3000);
      await newTender.clickTender();
      await this.page.waitForTimeout(3000);
      await this.filterAndSearch();
      return;
    }
    await this.filterAndSearchIncludeAtLeastAElement(search);
  }
  async searchOnly(search: string) {
    await this.search_box_locator.fill(search);
  }
  async filterAndSearch() {
    await this.search_box_locator.fill("TEST");
    await this.page.waitForTimeout(2000);
    await this.filter_locator.selectOption({
      value: "Draft",
    });
    await this.search_box_locator.fill(dataFillAll[0].title);
    await this.page.waitForTimeout(2000);
    await this.filter_locator.selectOption({
      value: "All",
    });
  }
  async filterAndSearchIncludeAtLeastAElement(search: string) {
    const randomOption = await this.randomValueOfFilter(this.filter_locator);
    await this.search_box_locator.fill(search);
    await this.page.waitForTimeout(2000);
    await this.filter_locator.selectOption({
      value: randomOption,
    });
  }
  async randomValueOfFilter(element: {
    evaluate: (arg0: () => string[]) => any;
  }) {
    const options = await element.evaluate(() => {
      const options = Array.from(document.querySelectorAll("option"));
      return options.map((option) => option.value);
    });
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }
}
