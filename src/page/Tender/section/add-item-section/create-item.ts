import * as locator from "../../../../../utils/data/section/select-item.json";
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
  readonly section_tab_locator: any;
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
  readonly hide_locator: any;
  readonly select_item_locator: any;
  readonly choose_locator: any;
  readonly table_locator: any;
  readonly row_locator: any;
  constructor(page: any, nameItem: any, i: any) {
    this.page = page;
    this.section_tab_locator = page.locator(locator[i].locator_section);
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
    this.select_item_locator = page.locator(
      locator[i].select_add_to_item_locator
    );
    this.table_locator = page.locator(locator[i].table_locator);
    this.row_locator = this.table_locator.locator("tbody >tr ");
    this.hide_locator = page.locator(locator[i].hide_locator);
    this.choose_locator = this.page.locator(
      "//li[normalize-space()='" + nameItem + "'][1]"
    );
  }
  async fillToInformation(
    name: string,
    materialRate: any,
    partNo: any,
    hour: any,
    minute: any
  ) {
    await this.section_tab_locator.click();
    if (!(await this.add_item_locator.isVisible())) {
      await this.create_item_button_locator.click();
    } else {
      await this.add_item_locator.click();
      await this.create_item_button_locator.click();
    }
    await this.name_locator.fill(name);
    await this.material_rate_locator.fill(materialRate);
    const randomOption = await this.randomValueInOption(this.select_options);
    await this.uom_locator.selectOption({ value: randomOption });
    await this.partNo_locator.fill(partNo);
    if (
      (await this.material_rate_locator) &&
      !(await this.type_locator.isVisible())
    ) {
      await this.hour_locator.fill(hour);
    } else {
      const randomOption = await this.randomType(this.type_options);
      this.type_locator.selectOption({ value: randomOption });
      await this.hour_locator.fill(hour);
    }
    await this.mins_locator.fill(minute);
    await this.create_locator.click();
    await this.select_item_locator.click();

    await this.select_item_locator.fill(name);
    await this.choose_locator.click();
    await this.select_item_locator.click();
    await this.hide_locator.click();
  }
  async randomType(element: any) {
    try {
      const options = await element.evaluate(
        (element: { querySelectorAll: (arg0: string) => any }) => {
          const optionElements = element.querySelectorAll("option");
          const optionValues: any[] = [];
          optionElements.forEach(
            (option: { getAttribute: (arg0: string) => any }) => {
              const value = option.getAttribute("value");
              if (value && value.trim() !== "") {
                optionValues.push(value.trim());
              }
            }
          );
          return optionValues;
        }
      );
      const randomIndex = Math.floor(Math.random() * options.length);
      const randomOption = options[randomIndex];
      return randomOption;
    } catch (error) {
      console.error("Đã xảy ra lỗi khi lấy tùy chọn ngẫu nhiên:", error);
      return null;
    }
  }

  async randomValueInOption(element: any) {
    const optionsText = await element.innerText();
    const optionsArray = optionsText
      .split("\n")
      .filter((option: string) => option.trim() !== "");
    const randomIndex = Math.floor(Math.random() * optionsArray.length);
    return optionsArray[randomIndex];
  }
}
