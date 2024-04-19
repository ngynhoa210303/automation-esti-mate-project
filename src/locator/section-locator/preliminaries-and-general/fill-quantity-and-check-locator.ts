//preliminaries
export const preliminaries_tab_locator =
  "//span[contains(text(),'Preliminaries and General')]";
export const add_item_locator =
  "//div[@id='preliminaries-and-general']//span[contains(text(),'Add new item')]";
export const select_item_locator =
  "//div[@id='preliminaries-and-general']//input[@placeholder='Select item to add']";
export const table_locator =
  "//div[@id='preliminaries-and-general']//table[@class='table']";
export const quantity_text_locator = "(//input[@step='1'])";
export const material_text_locator = "//td[@data-label='Material rate']//input";
export const hour_locator =
  "//td[@data-label='Labour unit rate']//p[text() = ' Hours ']//ancestor::div[1]//input";
export const min_locator =
  "//td[@data-label='Labour unit rate']//p[text() = ' Mins ']//ancestor::div[1]//input";
export const total_table_locator =
  "(//td[@data-label='Total hours']/following-sibling::td[1]//span)";
export const checkCompareTotalSum =
  "//div[@id='preliminariSection']//span[@class='text-primary text-sm']//span//span";
