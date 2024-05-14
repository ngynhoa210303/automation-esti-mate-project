import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/page/Login/login';
import dotenv from 'dotenv';
import { Sercuritytab } from '../../src/page/Account/change-password';
import { success_noti_locator } from '../../src/locator/account-locator/security-locator';
import { SignOut } from '../../src/page/Account/sign-out';
dotenv.config();
test.skip('ACC02: Sercurity test', () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(
            String(process.env.EMAIL),
            String(process.env.PASSWORD),
        );
    });
    test('Change password', async ({ page }) => {
        const changePassword = new Sercuritytab(page);
        await test.step('Change password with new password different new password again', async () => {
            await changePassword.changePassword(
                String(process.env.PASSWORD),
                String(process.env.CHANGE_PASSWORD),
                String(process.env.PASSWORD),
            );
            await expect(page.getByRole('button', { name: 'Update password' })).toBeDisabled()
        });
        await test.step('Change password with wrong password', async () => {
            await changePassword.changePassword(
                String("WRONGPass"),
                String(process.env.CHANGE_PASSWORD),
                String(process.env.CHANGE_PASSWORD),
            );
            await page.getByRole('button', { name: 'Update password' }).click();
            await expect(page.locator("//div[@class='media-content']")).toBeVisible()
        });
        await test.step('Change password successfully', async () => {
            await changePassword.changePassword(
                String(process.env.PASSWORD),
                String(process.env.CHANGE_PASSWORD),
                String(process.env.CHANGE_PASSWORD),
            );
            await page.getByRole('button', { name: 'Update password' }).click();
            await expect(page.locator(success_noti_locator)).toBeVisible();
        });
        await test.step('Sign out and login again', async () => {
            const signOut = new SignOut(page);
            await signOut.signOut()
            const loginPage = new LoginPage(page);
            await loginPage.login(
                String(process.env.EMAIL),
                String(process.env.CHANGE_PASSWORD),
            );
        });
        await test.step('Change password back to original', async () => {
            await changePassword.changePassword(
                String(process.env.CHANGE_PASSWORD),
                String(process.env.PASSWORD),
                String(process.env.PASSWORD),
            );
            await page.getByRole('button', { name: 'Update password' }).click();
            await expect(page.locator(success_noti_locator)).toBeVisible();
        });
    });
});
