import {
  email_textbox,
  password_textbox,
  sign_in_button,
  url_estimate,
} from "../../locator/login-locator/login-locator";

export class LoginPage {
  readonly page: any;
  readonly email_textbox: any;
  readonly password_textbox: any;
  readonly login_button: any;
  readonly url: any;
  constructor(page: any) {
    this.page = page;
    this.url = page.goto(url_estimate);
    this.login_button = page.locator(sign_in_button);
    this.email_textbox = page.locator(email_textbox);
    this.password_textbox = page.locator(password_textbox);
  }
  async login(email: string, password: string) {
    await this.email_textbox.fill(email);
    await this.password_textbox.fill(password);
    await this.login_button.click();
  }
}
