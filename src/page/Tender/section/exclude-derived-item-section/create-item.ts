import * as locator from "../../../../../utils/data/section/exclude-derived-item-section.json";
import {
  create_locator,
  hour_locator,
  material_rate_locator,
  min_locator,
  name_locator,
  partNo_locator,
  select_options,
  type_locator,
  type_options,
  uom_locator,
} from "../../../../locator/section-locator/section-locator";
export class CreateItem {
  readonly page: any;
  readonly tender_in_menu: any;
  readonly preliminaries_tab_locator: any;
  readonly add_item_locator: any;
  readonly create_item_button_locator: any;
  readonly name_locator: any;
  readonly material_rate_locator: any;
  readonly hour_locator: any;
  readonly mins_locator: any;
  readonly partNo_locator: any;
  readonly type_locator: any;
  readonly select_options: any;
  readonly type_options: any;
  readonly uom_locator: any;
  readonly create_locator: any;
  constructor(page: any, i: any) {
    this.page = page;
    this.preliminaries_tab_locator = page.locator(locator[i].locator_section);
    this.add_item_locator = page.locator(locator[i].add_item_locator);
    this.create_item_button_locator = page.locator(
      locator[i].create_item_button_locator
    );
    this.name_locator = page.locator(name_locator);
    this.material_rate_locator = page.locator(material_rate_locator);
    this.hour_locator = page.locator(hour_locator);
    this.mins_locator = page.locator(min_locator);
    this.partNo_locator = page.locator(partNo_locator);
    this.uom_locator = page.locator(uom_locator);
    this.create_locator = page.locator(create_locator);
    this.type_locator = page.locator(type_locator);
    this.select_options = page.locator(select_options);
    this.type_options = page.locator(type_options);
  }
  async fillToInformation(
    name: string,
    materialRate: any,
    partNo: any,
    hour: any,
    minute: any
  ) {
    await this.preliminaries_tab_locator.click();
    if (!(await this.add_item_locator.isVisible())) {
      await this.create_item_button_locator.click();
    } else {
      await this.add_item_locator.click();
      await this.create_item_button_locator.click();
    }
    await this.name_locator.fill(name);
    await this.material_rate_locator.fill(materialRate);
    const randomOption = await this.random(this.select_options);
    await this.uom_locator.selectOption({ value: randomOption });
    await this.partNo_locator.fill(partNo);
    if (!(await this.type_locator.isVisible()) && this.material_rate_locator) {
      await this.hour_locator.fill(hour);
    } else {
      const randomOption = await this.randomType(this.type_options);
      this.type_locator.selectOption({ value: randomOption });
      await this.hour_locator.fill(hour);
    }
    await this.mins_locator.fill(minute);
    await this.create_locator.click();
  }
  async randomType(element: any) {
    const options = await element.evaluate(() => {
      const options = Array.from(document.querySelectorAll("option"));
      return options.map((option) => option.value);
    });
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }
  async random(element: any) {
    const optionsText = await element.innerText();
    const optionsArray = optionsText
      .split("\n")
      .filter((option: string) => option.trim() !== "");
    const randomIndex = Math.floor(Math.random() * optionsArray.length);
    return optionsArray[randomIndex];
  }
}
