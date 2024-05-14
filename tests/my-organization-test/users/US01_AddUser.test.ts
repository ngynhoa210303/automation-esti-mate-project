import { expect, test } from '@playwright/test';
import { LoginPage } from '../../../src/page/Login/login';
import { LocatorUser } from '../../../src/page/My-Organization/user/locator-to-user-tab';
import { AddUser } from '../../../src/page/My-Organization/user/add-user';
import dotenv from 'dotenv';
import { invite_button_locator } from '../../../src/locator/my-organization-locator/user-locator/user-locator';
dotenv.config();
test.skip('TC025: Add user', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(
      String(process.env.EMAIL),
      String(process.env.PASSWORD),
    );
    await page.waitForTimeout(3000);
  });
  test('Add user', async ({ page }) => {
    await test.step('Enter email', async () => {
      const locatorUser = new LocatorUser(page);
      await locatorUser.locatorUser();
      await page.waitForTimeout(2000);
    });
    await test.step('Add user valid', async () => {
      const addUser = new AddUser(page);
      await addUser.addUser(process.env.EMAIL_ADD_USER);
      await page.locator(invite_button_locator).click();
      expect(
        page.locator("//div[contains(text(),'Email invite sent to user')]"),
      ).toBeVisible();
    });
    // await test.step('Add user wrong format email', async () => {
    //   const addUser = new AddUser(page);
    //   await addUser.addUser("Wrong");
    //   expect(
    //     page.locator("//p[@class='help is-danger']")
    //   ).toBeVisible();
    //   expect(
    //     !page.locator("//div[contains(text(),'Email invite sent to user')]")
    //   )
    //   await page.locator(invite_button_locator).click();
    // });
  });
});
