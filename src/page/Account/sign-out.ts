import { account_header, sign_out_header } from "../../locator/account-locator/login-locator";

export class SignOut {
    readonly page: any;
    readonly account_header: any;
    readonly sign_out_header: any;
    readonly btn_sign_out_header: any;

    constructor(page: any) {
        this.page = page;
        this.account_header = page.locator(account_header);
        this.sign_out_header = page.locator(sign_out_header);
        this.btn_sign_out_header = page.getByRole('button', { name: 'Sign out' })
    }
    async signOut() {
        await this.account_header.hover();
        await this.account_header.dblclick()
        await this.sign_out_header.click();
        await this.btn_sign_out_header.click();
    }
}
