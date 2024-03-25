import { Locator } from "@playwright/test";

export class FillToInputText {
  readonly page: any;
  constructor(page: any) {
    this.page = page;
  }
  async fillFieldByText(
    page: any,
    searchText: string,
    textToFill: string
  ): Promise<void> {
    const fieldLocator: Locator = page
      .locator("div")
      .filter({ hasText: new RegExp(`^${searchText}$`) })
      .getByRole("textbox");
    await fieldLocator.fill(textToFill);
  }
}
