/**
 * Locator Table Tender List
 */

export const table_locator = "//table[@id='vgt-table']";
export const row_locator = "tbody >tr";
export const select_locator = "//span/div/div/div[1]/div";
export const select_status_locator = "//span/div/div/span/select";
export const paging_locator = "//a[@class='pagination-link is-current']";

export const make_copy_locator =
  ".dropdown-menu-animation > .dropdown-menu > .dropdown-content > a";
export const confirm_delete_locator = "//button[contains(text(),'Delete')]";
export const search_box_locator =
  "//input[@placeholder='Search by name, status, tags']";
export const filter_locator =
  "//div[@class='field w-52 is-floating-label']//select";
export const total_tender_locator = "//p[@class='text-xl font-bold']";
export const job_name_locator = "//tr//td[1]//span";
export const no_data_locator = "//div[normalize-space()='No data for table']";