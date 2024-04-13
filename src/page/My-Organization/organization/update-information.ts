import {
  header_background,
  home_in_menu,
  my_organization_locator,
} from "../../../locator/my-organization-locator/client-locator/locator-of-client";
import {
  abn_locator,
  address_line1_text_locator,
  address_line2_text_locator,
  city_text_locator,
  country_select_locator,
  email_text_locator,
  name_organization_locator,
  phone_text_locator,
  save_button_locator,
  zip_code_locator,
} from "../../../locator/my-organization-locator/organization/information-organization";
/**Logo upload?? */
export class OrganizationInformation {
  readonly page: any;
  readonly home_in_menu: any;
  readonly my_organization_locator: any;
  readonly name_organization_locator: any;
  readonly email_text_locator: any;
  readonly address_line1_text_locator: any;
  readonly address_line2_text_locator: any;
  readonly phone_text_locator: any;
  readonly city_text_locator: any;
  readonly country_select_locator: any;
  readonly countryRandom: any[] = ["Australia", "New Zealand"];
  readonly zip_code_locator: any;
  readonly abn_locator: any;
  readonly use_checkbox_locator: any;
  readonly header_background_locator: any;
  readonly header_text_color_locator: any;
  readonly save_button_locator: any;
  constructor(page: any) {
    this.page = page;
    this.home_in_menu = page.locator(home_in_menu);
    this.my_organization_locator = page.locator(my_organization_locator);
    this.name_organization_locator = page.locator(name_organization_locator);
    this.email_text_locator = page.locator(email_text_locator);
    this.phone_text_locator = page.locator(phone_text_locator);
    this.address_line1_text_locator = page.locator(address_line1_text_locator);
    this.address_line2_text_locator = page.locator(address_line2_text_locator);
    this.city_text_locator = page.locator(city_text_locator);
    this.country_select_locator = page.locator(country_select_locator);
    this.zip_code_locator = page.locator(zip_code_locator);
    this.abn_locator = page.locator(abn_locator);
    this.header_background_locator = page.locator(header_background);
    this.save_button_locator = page.locator(save_button_locator);
  }
  async uploadInformation(
    name: any,
    email: any,
    phone: any,
    addressLine1: any,
    addressLine2: any,
    city: any,
    zipCode: any,
    abn: any
  ) {
    await this.home_in_menu.click();
    await this.my_organization_locator.click();
    await this.name_organization_locator.fill(name);
    await this.email_text_locator.fill(email);
    await this.phone_text_locator.fill(phone);
    await this.address_line1_text_locator.fill(addressLine1);
    await this.address_line2_text_locator.fill(addressLine2);
    await this.city_text_locator.fill(city);
    const countryRandom = await this.randomIndexCountry(this.countryRandom);
    await this.country_select_locator.selectOption({ value: countryRandom });
    await this.zip_code_locator.fill(zipCode);
    await this.abn_locator.fill(abn);
    await this.header_background_locator.click();
    await this.save_button_locator.click();
    // await this.header_background_locator.click();
    // await this.header_background_locator.type(fixedColor);

    await this.save_button_locator.click();
  }
  async randomIndexCountry(element: any[]) {
    const randomCBB = Math.floor(Math.random() * element.length);
    return element[randomCBB];
  }
}
