import { Page } from "@playwright/test";

export class AllDatePicker {
  readonly page: Page;
  readonly createdatePicker_locator: any;
  readonly createYear_locator: any;
  readonly createMonth_locator: any;
  readonly createDay_locator: any;
  readonly createYear: any;
  readonly createMonth: any;
  readonly dueDatePicker_locator: any;
  readonly dueYear_locator: any;
  readonly dueMonth_locator: any;
  readonly dueDay_locator: any;
  readonly dueYear: any;
  readonly dueMonth: any;
  constructor(
    page: Page,
    createYear: any,
    createMonth: any,
    dueYear: any,
    dueMonth: any
  ) {
    this.page = page;
    this.createYear = createYear;
    this.createMonth = createMonth;

    this.createdatePicker_locator = page.locator(
      "//section[1]/div/div/div[2]/div[2]/div/div/div[1]/div/input"
    );

    this.createYear_locator = page
      .getByRole("dialog")
      .locator("span")
      .filter({ hasText: "2034 2033 2032 2031 2030 2029" })
      .getByRole("combobox");
    this.createMonth_locator = page.locator(
      "//div[2]/div/div/div[3]/div/div/div/header/div/div/div/div/div/div[1]/span/select"
    );
    this.dueYear = dueYear;
    this.dueMonth = dueMonth;
    this.dueDatePicker_locator = page.locator(
      "//section[1]/div/div/div[2]/div[3]/div/div/div[1]/div/input"
    );
    this.dueYear_locator = page.locator(
      "//section[1]/div/div/div[2]/div[3]/div/div/div[3]/div/div/div/header/div/div/div/div/div/div[2]/span/select"
    );
    this.dueMonth_locator = page
      .getByRole("dialog")
      .locator("span")
      .filter({ hasText: "January February March April" })
      .getByRole("combobox");

    this.dueDay_locator = this.page.$$(
      "//a[@class='datepicker-cell is-selectable']"
    );
  }

  async chooseDate(createDay: any) {
    await this.createdatePicker_locator.click();
    await this.createYear_locator.selectOption(this.createYear);
    await this.createMonth_locator.selectOption(this.createMonth);
    const dates = await this.page.$$(
      "//a[@class='datepicker-cell is-selectable']"
    );
    for (const dt of dates) {
      if ((await dt.textContent()) == createDay) {
        await dt.click();
        break;
      }
    }
  }
  async chooseDateDue(dueDay: any) {
    await this.dueDatePicker_locator.click();
    await this.dueYear_locator.selectOption(this.dueYear);
    await this.dueMonth_locator.selectOption(this.dueMonth);
    await this.page.getByRole("button", { name: dueDay }).click();
  }
}
