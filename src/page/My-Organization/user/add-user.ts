import {
  add_user_button,
  user_email_text_locator,
} from "../../../locator/my-organization-locator/user-locator/user-locator";

export class AddUser {
  readonly page: any;
  readonly add_user_button: any;
  readonly user_email_text_locator: any;
  constructor(page: any) {
    this.page = page;
    this.add_user_button = page.locator(add_user_button);
    this.user_email_text_locator = page.locator(user_email_text_locator);
  }
  async addUser(email: any) {
    await this.add_user_button.click();
    await this.user_email_text_locator.fill(email);
  }
}
