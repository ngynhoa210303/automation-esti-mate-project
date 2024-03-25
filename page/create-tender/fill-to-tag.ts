import { Page } from "@playwright/test";

export class FillTag {
  readonly page: Page;
  readonly tag_locator: any;
  constructor(page: Page) {
    this.page = page;
    this.tag_locator = page.locator(
      "//section[1]/div/div/div[2]/div[5]/div/div/div/div[1]/input"
    );
  }
  async checkFillTag(tags: any) {
    for (const tag of tags) {
      await this.tag_locator.fill(tag);
      await this.page.keyboard.press("Enter");
    }
  }
}
