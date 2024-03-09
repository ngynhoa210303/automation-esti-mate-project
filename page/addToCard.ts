import { Page } from "@playwright/test";

export class AddToCard {
  page: Page;
  button_shopping: any;
  button_roles: any;
  button_type: any;
  button_ok: any;
  button_add: any;
  constructor(page: Page) {
    this.page = page;
    this.button_shopping = page.getByRole("button", { name: "SHOPPING" });
    this.button_roles = page
      .getByRole("row", {
        name: "View Installation Guide POMERLKIT001 PICK UP_GENERIQUE Order parts only Order",
      })
      .getByRole("button")
      .nth(1);
    this.button_type = page
      .getByRole("row", { name: 'POMERL0003 80" X 64" Per unit' })
      .getByRole("button");
    this.button_ok = page.getByRole("button", { name: "Ok" });
    this.button_add = page.getByRole("button", { name: "Add to basket" });
  }
  async addToCards() {
    await this.button_shopping.click();
    await this.button_roles.click();
    await this.button_type.click();
    // await this.button_ok.click();
    await this.button_add.click();
  }
}
