import {
  abn_text_locator,
  address_text_locator,
  city_text_locator,
  company_text_locator,
  edit_button_locator,
  name_text_locator,
  save_button_locator,
  table_locator,
} from "../../../locator/my-organization-locator/client-locator/edit-client-locator";

export class EditClient {
  readonly page: any;
  readonly table_locator: any;
  readonly row: any;
  readonly name_text_locator: any;
  readonly company_text_locator: any;
  readonly address_text_locator: any;
  readonly city_text_locator: any;
  readonly abn_text_locator: any;
  readonly edit_button_locator: any;
  readonly save_button_locator: any;
  constructor(page: any) {
    this.page = page;
    this.table_locator = page.locator(table_locator);
    this.name_text_locator = page.locator(name_text_locator);
    this.company_text_locator = page.locator(company_text_locator);
    this.address_text_locator = page.locator(address_text_locator);
    this.city_text_locator = page.locator(city_text_locator);
    this.abn_text_locator = page.locator(abn_text_locator);
    this.edit_button_locator = page.locator(edit_button_locator);
    this.save_button_locator = page.locator(save_button_locator);
  }
  async editClient(name: any, company: any, address: any, city: any, abn: any) {
    const rows = await this.page.$$("tbody >tr");
    const randomIndex = Math.floor(Math.random() * rows.length);
    const edit_button_locator = await this.edit_button_locator.nth(randomIndex);
    await edit_button_locator.click();
    await this.name_text_locator.fill(name);
    await this.company_text_locator.fill(company);
    await this.address_text_locator.fill(address);
    await this.city_text_locator.fill(city);
    await this.abn_text_locator.fill(abn);
    await this.save_button_locator.click();
    await this.page.waitForTimeout(2000);
  }
}
