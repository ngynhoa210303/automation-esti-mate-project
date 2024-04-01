import { Page } from "@playwright/test";
import {
  confirm_delete_locator,
  paging_locator,
  row_locator,
  select_locator,
  table_locator,
} from "../../../locator/tender-locator/table-tender-list-locator";

export class DeleteTender {
  readonly page: any;
  readonly table_locator: any;
  readonly row: any;
  readonly action_select: any;
  readonly first_element_table: any;
  readonly paging_locator: any;

  constructor(page: Page) {
    this.page = page;
    this.table_locator = page.locator(table_locator);
    this.row = this.table_locator.locator(row_locator);
    this.action_select = this.row.locator(select_locator);
    this.paging_locator = page.$$("//nav[@class='pagination is-centered']//li");
  }
  async deleteRandomElement() {
    const rows = await this.page.$$(row_locator);

    const randomIndex = Math.floor(Math.random() * rows.length);
    const chosenRow = rows[randomIndex];
    const actionButton = await chosenRow.$(select_locator);
    await actionButton.click();
    const deleteButtonLocator = await this.page
      .locator("//div[@role='list']/a[2]")
      .nth(randomIndex);
    await deleteButtonLocator.click();
    await this.page.locator(confirm_delete_locator).click();
  }

  async deleteElementOfPagination(pageNo: any) {
    try {
      let currentPageNo;
      do {
        currentPageNo = await this.getCurrentPageNumber(); // Get the current page number
        if (currentPageNo == pageNo) {
          console.log("Reached desired page:", pageNo);
          break;
        }
        await this.clickNextPage(); // Click on the next page link
      } while (currentPageNo != pageNo);

      await this.deleteRandomElement(); // Delete element on the desired page
    } catch (error) {
      console.error("Error navigating to page:", error);
    }
  }

  async getCurrentPageNumber() {
    const currentLink = await this.page.locator(".pagination-link.is-current");
    return await currentLink.textContent();
  }

  async clickNextPage() {
    const nextPageButton = await this.page.locator(
      ".pagination-link.pagination-next"
    );
    await nextPageButton.click();
  }
}
