import { Page } from "@playwright/test";

export class SelectBox {
  readonly page: Page;
  readonly builder_status_locator: any;
  readonly your_status_locator: any;
  constructor(page: Page) {
    this.page = page;
    this.builder_status_locator = page.locator(
      "//section[1]/div/div/div[1]/div[7]/div/span/select"
    );
    this.your_status_locator = page.locator(
      "//section[1]/div/div/div[1]/div[8]/div/span/select"
    );
  }
  async checkSelectOptions(builderStt: string, yourStt: string) {
    await this.builder_status_locator.click();
    await this.builder_status_locator.selectOption({ value: builderStt });
    await this.your_status_locator.click();
    await this.your_status_locator.selectOption({ value: yourStt });
  }
}
