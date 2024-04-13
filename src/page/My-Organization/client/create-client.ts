import {
  abn_text_locator,
  add_button,
  address_text_locator,
  city_text_locator,
  company_text_locator,
  create_button_locator,
  name_text_locator,
} from "../../../locator/my-organization-locator/client-locator/create-client-locator";
export class CreateClient {
  readonly page: any;
  readonly add_button: any;
  readonly name_text_locator: any;
  readonly company_text_locator: any;
  readonly address_text_locator: any;
  readonly city_text_locator: any;
  readonly abn_text_locator: any;
  readonly create_button_locator: any;
  constructor(page: any) {
    this.page = page;
    this.add_button = page.locator(add_button);
    this.name_text_locator = page.locator(name_text_locator);
    this.company_text_locator = page.locator(company_text_locator);
    this.address_text_locator = page.locator(address_text_locator);
    this.city_text_locator = page.locator(city_text_locator);
    this.abn_text_locator = page.locator(abn_text_locator);
    this.create_button_locator = page.locator(create_button_locator);
  }
  async createClient(
    name: any,
    company: any,
    address: any,
    city: any,
    abn: any
  ) {
    await this.add_button.click();
    await this.name_text_locator.fill(name);
    await this.company_text_locator.fill(company);
    await this.address_text_locator.fill(address);
    await this.city_text_locator.fill(city);
    await this.abn_text_locator.fill(abn);
    await this.create_button_locator.click();
  }
}
