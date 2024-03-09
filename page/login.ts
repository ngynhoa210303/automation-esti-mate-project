export class LoginPage {
  //   username_textbox: any;
  page: any;
  email_textbox: any;
  //   password_textbox: any;
  login_button: any;
  url: any;
  constructor(page: any) {
    this.page = page;
    this.url = page.goto("https://stage2.turbo-online.com/sign-in");
    // this.username_textbox = page.getByPlaceholder("Tên đăng nhập");
    // this.password_textbox = page.getByPlaceholder("Mật khẩu");
    // this.login_button = page.getByRole("button", { name: "Quản lý" });
    this.login_button = page.getByRole("button", { name: "Login" });
    this.email_textbox = page.getByLabel("Email address *");
  }
  //   async login(username: string, password: string) {
  //     // await this.username_textbox.fill(username);
  //     // await this.password_textbox.fill(password);
  //     // await this.password_textbox.fill(password);
  //     await this.login_button.click();
  //   }
  async login(email: string) {
    await this.email_textbox.fill(email);
    await this.login_button.click();
  }
}
