import { log } from "console";
import {
  add_item_locator,
  hour_locator,
  material_text_locator,
  min_locator,
  preliminaries_tab_locator,
  quantity_text_locator,
  select_item_locator,
  table_locator,
} from "../../../../../locator/section-locator/preliminaries-and-general/fill-quantity-and-check-locator";

export class SelectItem {
  readonly page: any;
  readonly tender_in_menu: any;
  readonly preliminaries_tab_locator: any;
  readonly add_item_locator: any;
  readonly select_item_locator: any;
  readonly choose_locator: any;
  readonly table_locator: any;
  readonly row_locator: any;
  readonly quantity_text_locator: any;
  readonly material_text_locator: any;
  readonly hour_locator: any;
  readonly min_locator: any;
  constructor(page: any) {
    this.page = page;
    this.preliminaries_tab_locator = page.locator(preliminaries_tab_locator);
    this.add_item_locator = page.locator(add_item_locator);
    this.select_item_locator = page.locator(select_item_locator);
    this.table_locator = page.locator(table_locator);
    this.row_locator = this.table_locator.locator("tbody >tr ");
    this.quantity_text_locator = this.row_locator.locator(
      quantity_text_locator
    );
    this.material_text_locator = this.row_locator.locator(
      material_text_locator
    );
    this.hour_locator = this.row_locator.locator(hour_locator);
    this.min_locator = this.row_locator.locator(min_locator);
  }
  async chooseItem() {
    await this.preliminaries_tab_locator.click();
    await this.add_item_locator.click();
    await this.select_item_locator.click();
    const options = await this.page.$$("ul li");
    const mainput = quantity_text_locator;
    const quantityValue = parseFloat("2");
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[randomIndex];
    await selectedOption.click();
    await this.quantity_text_locator.fill(quantityValue.toString());
    //Kiem tra Total material
    const inputValue = await this.getValue(mainput);
    const totalMaterial = inputValue * quantityValue;
    const resultTotalMaterial = await this.row_locator
      .locator(
        "//td[@data-label='Total material']//span[contains(text(),'" +
          totalMaterial +
          "')]"
      )
      .isVisible();
    console.log("---Result total material:" + resultTotalMaterial);
    const hourValue = await this.getValue(hour_locator);
    const minsValue = await this.getValue(min_locator);
    const mins = minsValue / 60;
    const totalHours = (hourValue + mins) * quantityValue;
    const totalLine = totalMaterial + totalHours;
    const resultTotalHour = await this.page
      .locator("(//span[contains(text(),'$" + totalHours + "')])[1]")
      .isVisible();
    console.log("---Result total hour:" + resultTotalHour);
    console.log("hour:" + hourValue);

    await this.page
      .locator(
        "//td[@data-label='Line total']//span[contains(text(),'$" +
          totalLine +
          "')]"
      )
      .isVisible();

    //td[@data-label='Line total']//span[contains(text(),'$970.00')]
    // await this.select_item_locator.click();
    // const options1 = await this.page.$$("ul li");
    // const randomIndex1 = Math.floor(Math.random() * options1.length);
    // const selectedOption1 = options1[randomIndex1];
    // await selectedOption1.click();
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
