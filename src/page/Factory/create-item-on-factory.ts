import {
  button_create_locator,
  create_locator,
  factory_locator,
  hour_locator,
  material_rate_locator,
  min_locator,
  name_locator,
  partNo_locator,
  section_locator,
  select_options,
  type_locator,
  type_options,
  uom_locator,
} from "../../locator/factory-locator/create-item";
export class CreateItemOnFactoryTab {
  readonly page: any;
  readonly factory_locator: any;
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
  readonly button_create_locator: any;
  readonly section_locator: any;
  readonly type_cabletrays: any[] = ["1", "2", "3"];
  readonly type_conduits: any[] = ["1", "2", "3", "4", "5", "6", "7"];

  constructor(page: any) {
    this.page = page;
    this.material_rate_locator = page.locator(material_rate_locator);
    this.factory_locator = page.locator(factory_locator);
    this.section_locator = page.locator(section_locator);
    this.name_locator = page.locator(name_locator);
    this.button_create_locator = page.locator(button_create_locator);
    this.hour_locator = page.locator(hour_locator);
    this.mins_locator = page.locator(min_locator);
    this.partNo_locator = page.locator(partNo_locator);
    this.uom_locator = page.locator(uom_locator);
    this.type_locator = page.locator(type_locator);
    this.select_options = page.locator(select_options);
    this.type_options = page.locator(type_options);
    this.create_locator = page.locator(create_locator);
  }
  async fillToInformation(
    name: string,
    materialRate: any,
    partNo: any,
    hour: any,
    minute: any
  ) {
    await this.factory_locator.click();
    await this.button_create_locator.click();
    await this.name_locator.fill(name);
    await this.material_rate_locator.fill(materialRate);
    const randomOption = await this.randomOption(this.select_options);
    await this.uom_locator.selectOption({ value: randomOption });
    await this.partNo_locator.fill(partNo);
    const randomOptionSection = await this.randomType(this.section_locator);
    await this.section_locator.selectOption({ value: randomOptionSection });
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
      console.error("ERROR:", error);
      return null;
    }
  }

  async randomType2(element: any[]) {
    const randomCBB = Math.floor(Math.random() * element.length);
    return element[randomCBB];
  }
  async randomOption(element: any) {
    const optionsText = await element.innerText();
    const optionsArray = optionsText
      .split("\n")
      .filter((option: string) => option.trim() !== "");
    const randomIndex = Math.floor(Math.random() * optionsArray.length);
    return optionsArray[randomIndex];
  }
}
