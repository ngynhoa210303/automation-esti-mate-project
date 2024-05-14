import {
  abn_locator,
  address_line1_text_locator,
  address_line2_text_locator,
  city_text_locator,
  company_title_text_locator,
  home_locator,
  person_tab_locator,
  phone_text_locator,
  save_button_locator,
  your_name_text_locator,
  zip_code_locator,
} from '../../locator/account-locator/person-locator';

export class Persontab {
  readonly page: any;
  readonly home_locator: any;
  readonly person_tab_locator: any;
  readonly your_name_text_locator: any;
  readonly phone_text_locator: any;
  readonly company_title_text_locator: any;
  readonly address_line1_text_locator: any;
  readonly address_line2_text_locator: any;
  readonly city_text_locator: any;
  readonly zip_code_locator: any;
  readonly abn_locator: any;
  readonly save_button_locator: any;

  constructor(page: any) {
    this.page = page;
    this.home_locator = page.locator(home_locator);
    this.person_tab_locator = page.locator(person_tab_locator);
    this.your_name_text_locator = page.locator(your_name_text_locator);
    this.phone_text_locator = page.locator(phone_text_locator);
    this.address_line1_text_locator = page.locator(address_line1_text_locator);
    this.address_line2_text_locator = page.locator(address_line2_text_locator);
    this.city_text_locator = page.locator(city_text_locator);
    this.company_title_text_locator = page.locator(company_title_text_locator);
    this.zip_code_locator = page.locator(zip_code_locator);
    this.abn_locator = page.locator(abn_locator);
    this.save_button_locator = page.locator(save_button_locator);
  }
  async addInformation(
    yourName: any,
    phone: any,
    addressLine1: any,
    addressLine2: any,
    city: any,
    company: any,
    zipCode: any,
  ) {
    await this.home_locator.click();
    await this.person_tab_locator.click();
    await this.your_name_text_locator.fill(yourName);
    await this.phone_text_locator.fill(phone);
    await this.address_line1_text_locator.fill(addressLine1);
    await this.address_line2_text_locator.fill(addressLine2);
    await this.city_text_locator.fill(city);
    await this.company_title_text_locator.fill(company);
    await this.zip_code_locator.fill(zipCode);
    await this.save_button_locator.click();
  }
}
