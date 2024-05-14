import { current_password_locator, home_tab_locator, new_password_again_locator, new_password_locator, sercurity_tab_locator } from "../../locator/account-locator/security-locator";

export class Sercuritytab {
    readonly page: any;
    readonly home_tab_locator: any;
    readonly sercurity_tab_locator: any;
    readonly current_password_locator: any;
    readonly new_password_locator: any;
    readonly new_password_again_locator: any;
    readonly update_button_locator: any;

    constructor(page: any) {
        this.page = page;
        this.home_tab_locator = page.locator(home_tab_locator);
        this.sercurity_tab_locator = page.locator(sercurity_tab_locator);
        this.current_password_locator = page.locator(current_password_locator);
        this.new_password_locator = page.locator(new_password_locator);
        this.new_password_again_locator = page.locator(new_password_again_locator);
        this.update_button_locator = page.getByRole('button', { name: 'Update password' })
    }
    async changePassword(
        currentPassword: any,
        newPassword: any,
        newPasswordAgain: any
    ) {
        await this.home_tab_locator.click();
        await this.sercurity_tab_locator.click();
        await this.current_password_locator.fill(currentPassword);
        await this.new_password_locator.fill(newPassword);
        await this.new_password_again_locator.fill(newPasswordAgain);
    }
}
