import { Page } from "@playwright/test";

export class Verification {
  code: any;
  page: Page;
  verification_button: any;
  constructor(page: Page) {
    this.page = page;
    this.verification_button = page.click('button:has-text("Verify code")');
    this.code = page.getByLabel("Email address *");
  }

  async fillVerificationCode(codes: (number | undefined)[]) {
    for (let i = 0; i < codes.length; i++) {
      if (codes[i] !== undefined) {
        await this.page
          .locator(`//form/div[${i + 1}]/label`)
          .fill((codes[i] as number).toString());
      }
    }
    await this.verification_button;
  }
}
