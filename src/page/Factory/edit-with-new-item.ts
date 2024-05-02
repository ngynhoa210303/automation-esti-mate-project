import {
  edit_button,
  factory_tab_locator,
  hours_locator,
  material_text_locator,
  mins_locator,
  part_no_locator,
  save_button_locator,
  table_locator,
  uom_text_locator,
} from "../../locator/factory-locator/edit-item";

export class EditWithNewItemOfFactory {
  readonly page: any;
  readonly factory_tab_locator: any;
  readonly table_locator: any;
  readonly row: any;
  readonly uom_text_locator: any;
  readonly material_text_locator: any;
  readonly part_no_locator: any;
  readonly hours_locator: any;
  readonly mins_locator: any;
  readonly save_button_locator: any;
  constructor(page: any) {
    this.page = page;
    this.factory_tab_locator = page.locator(factory_tab_locator);
    this.table_locator = page.locator(table_locator);
    this.uom_text_locator = page.locator(uom_text_locator);
    this.material_text_locator = page.locator(material_text_locator);
    this.part_no_locator = page.locator(part_no_locator);
    this.hours_locator = page.locator(hours_locator);
    this.mins_locator = page.locator(mins_locator);
    this.save_button_locator = page.locator(save_button_locator);
  }
  async edit(uom: any, materialRate: any, partNo: any, hours: any, mins: any) {
    await this.factory_tab_locator.click();
    await this.page.waitForTimeout(3000);
    const rows = await this.page.$$("tbody >tr");
    const randomIndex = Math.floor(Math.random() * rows.length);
    const chosenRow = rows[randomIndex];
    const edit_button_locator = await chosenRow.$(edit_button);
    await edit_button_locator.click();
    await this.uom_text_locator.fill(uom);
    await this.material_text_locator.fill(materialRate);
    await this.part_no_locator.fill(partNo);
    await this.hours_locator.fill(hours);
    await this.mins_locator.fill(mins);
    await this.save_button_locator.click();
    await this.page.waitForTimeout(2000);
  }
  async check() {
    const rows = await this.page.$$("tbody >tr");
    const randomIndex = Math.floor(Math.random() * rows.length);
    const chosenRow = rows[randomIndex];
    const edit_button_locator = await chosenRow.$(edit_button);
    await edit_button_locator.click();
  }
  async saveData() {
    await this.save_button_locator.click();
    await this.page.waitForTimeout(2000);
  }
}
