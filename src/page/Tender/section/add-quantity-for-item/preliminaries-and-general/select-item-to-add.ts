import { log } from "console";

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
  constructor(page: any) {
    this.page = page;
    this.preliminaries_tab_locator = page.locator(
      "//span[contains(text(),'Preliminaries and General')]"
    );
    this.add_item_locator = page.locator(
      "//div[@id='preliminaries-and-general']//span[contains(text(),'Add new item')]"
    );
    this.select_item_locator = page.locator(
      "//div[@id='preliminaries-and-general']//input[@placeholder='Select item to add']"
    );
    this.table_locator = page.locator(
      "//div[@id='preliminaries-and-general']//table[@class='table']"
    );
    this.row_locator = this.table_locator.locator("tbody >tr ");
    this.quantity_text_locator = this.row_locator.locator(
      "(//input[@type='number'])[1]"
    );
    this.material_text_locator = this.row_locator.locator(
      "(//input[@type='number'])[2]"
    );
  }
  async chooseItem() {
    await this.preliminaries_tab_locator.click();
    await this.add_item_locator.click();
    await this.select_item_locator.click();
    const options = await this.page.$$("ul li");
    // for (let i = 0; i < options.length; i++) {
    //   const text = await options[i].textContent();
    //   console.log(text);
    // }
    const mainput = "(//input[@type='number'])[2]";
    const quantityValue = parseInt("2");
    const randomIndex = Math.floor(Math.random() * options.length);
    const selectedOption = options[randomIndex];
    await selectedOption.click();
    await this.quantity_text_locator.fill(quantityValue.toString());
    //Kiem tra Total material
    const inputValue = await this.getValue(mainput);
    const totalMaterial = inputValue * quantityValue;
    await this.page
      .locator("(//span[contains(text(),'$" + totalMaterial + "')])[3]")
      .isVisible();
    //Kiem tra Total hours
    // Đợi cho các ô input trở nên khả dụng
    await this.page.waitForSelector("(//input[@type='number'])[3]");
    await this.page.waitForSelector("(//input[@type='number'])[4]");

    // Lấy giá trị của các ô input đã được điền dữ liệu
    const hourValue = await this.page.$eval(
      "(//input[@type='number'])[3]",
      (input: { value: any }) => input.value
    );
    const minsValue = await this.page.$eval(
      "(//input[@type='number'])[4]",
      (input: { value: any }) => input.value
    );

    console.log("Hour Value:", hourValue);
    console.log("Minutes Value:", minsValue);

    const totalHours = (hourValue + minsValue / 60) * quantityValue;
    const totalLine = totalMaterial + totalHours;
    await this.page
      .locator("(//span[contains(text(),'$" + totalHours + "')])[1]")
      .isVisible();
    await this.page
      .locator(
        "//td[@data-label='Line total']//span[contains(text(),'$" +
          totalLine +
          "')]"
      )
      .isVisible();
    console.log(
      "(" +
        hourValue +
        "+" +
        minsValue +
        "/60)*" +
        quantityValue +
        "  =" +
        totalHours
    );
    console.log(inputValue + "*" + quantityValue + "=" + totalMaterial);
    console.log(totalLine);

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
  async getHour(locator: any) {
    const inputValue = await this.page.$eval(
      locator,
      (input: { value: any }) => {
        return input.value;
      }
    );
    return inputValue;
  }
}
