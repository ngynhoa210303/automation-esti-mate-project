import {
  quantity_IAC_text_locator,
  select_item_IAC_locator,
  table_IAC_locator,
  total_IAC_table_locator,
} from "../../../../../locator/section-locator/inspections-and-compliance/fill-quantity-and-check-locator";
export class SelectItemInspectionsAndCompliance {
  readonly page: any;
  readonly select_item_locator: any;
  readonly choose_locator: any;
  readonly table_locator: any;
  readonly row_locator: any;
  readonly quantity_text_locator: any;
  constructor(page: any) {
    this.page = page;
    this.select_item_locator = page.locator(select_item_IAC_locator);
    this.table_locator = page.locator(table_IAC_locator);
    this.row_locator = this.table_locator.locator("tbody >tr ");
  }

  async chooseItem(i: any, totalSum: any) {
    await this.select_item_locator.click();
    const options = await this.page.$$("ul li");
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[randomIndex];
    await selectedOption.click();
    const quantityLocator = this.page.locator(
      quantity_IAC_text_locator + "[" + i + "]"
    );
    await quantityLocator.fill("2");
    const totalInTable = await this.page
      .locator(total_IAC_table_locator + "[" + i + "]")
      .innerText();
    const totalInTable1 = parseFloat(
      totalInTable.replace("$", "").replace(",", "")
    );
    totalSum += totalInTable1;
    return totalSum;
  }
  async getValue(locator: any) {
    const inputValue = await this.page.$eval(
      locator,
      (input: { value: any }) => {
        input.value;
        const value = parseFloat(input.value).toFixed(2);
        return `${value}`;
      }
    );
    return inputValue;
  }
}
