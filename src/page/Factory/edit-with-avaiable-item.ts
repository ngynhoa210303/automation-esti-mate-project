import {
  edit_button,
  factory_tab_locator,
  hours_locator,
  material_text_locator,
  mins_locator,
  name_text_locator,
  part_no_locator,
  save_button_locator,
  section_locator,
  table_locator,
  uom_text_locator,
} from '../../locator/factory-locator/edit-item';

export class EditItemOfFactory {
  readonly page: any;
  readonly factory_tab_locator: any;
  readonly table_locator: any;
  readonly row: any;
  readonly uom_text_locator: any;
  readonly name_text_locator: any;
  readonly material_text_locator: any;
  readonly part_no_locator: any;
  readonly section_locator: any;
  readonly hours_locator: any;
  readonly mins_locator: any;
  readonly save_button_locator: any;
  constructor(page: any) {
    this.page = page;
    this.factory_tab_locator = page.locator(factory_tab_locator);
    this.section_locator = page.locator(section_locator);
    this.table_locator = page.locator(table_locator);
    this.uom_text_locator = page.locator(uom_text_locator);
    this.name_text_locator = page.locator(name_text_locator);
    this.material_text_locator = page.locator(material_text_locator);
    this.part_no_locator = page.locator(part_no_locator);
    this.hours_locator = page.locator(hours_locator);
    this.mins_locator = page.locator(mins_locator);
    this.save_button_locator = page.locator(save_button_locator);
  }
  async edit(
    randomOption: any,
    uom: any,
    name: any,
    materialRate: any,
    partNo: any,
    hours: any,
    mins: any,
  ) {
    await this.uom_text_locator.fill(uom);
    await this.name_text_locator.fill(name);
    await this.material_text_locator.fill(materialRate);
    await this.part_no_locator.fill(partNo);
    // const randomOption = await randomIndexSection(this.section_locator);
    await this.section_locator.selectOption({ value: randomOption });
    await this.hours_locator.fill(hours);
    await this.mins_locator.fill(mins);
  }
  async locatorFactory() {
    await this.factory_tab_locator.click();
    await this.page.waitForTimeout(3000);
    await this.editClick()
  }
  async editClick() {
    const rows = await this.page.$$('tbody >tr');
    const randomIndex = Math.floor(Math.random() * rows.length);
    const chosenRow = rows[randomIndex];
    const edit_button_locator = await chosenRow.$(edit_button);
    await edit_button_locator.click();
  }
}

export async function getValueInput(page: any, locator: any) {
  const inputElement = await page.$(locator);
  if (inputElement) {
    const inputValue = await inputElement.evaluate(
      (input: { value: any }) => input.value,
    );
    return inputValue;
  }
}
export async function checkSelectedOption(
  page: any,
  selectLocator: any,
  expectedValue: string,
) {
  // Lấy danh sách tất cả các tùy chọn trong ô select
  const selectElement = await page.$(selectLocator);
  const options = await selectElement.$$eval('option', (options: any[]) =>
    options.map((option) => ({
      value: option.value,
      selected: option.selected,
    })),
  );
  // Duyệt qua từng tùy chọn và kiểm tra
  let selectedOptionValue = null;
  for (const option of options) {
    if (option.selected) {
      selectedOptionValue = option.value;
      break;
    }
  }
  // So sánh giá trị của tùy chọn đã chọn với giá trị mong đợi
  if (selectedOptionValue === expectedValue) {
    return true;
  } else {
    return false;
  }
}
