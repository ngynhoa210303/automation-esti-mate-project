// Consumer mains and Submains
export const conduits_tab_locator =
  "//span[text()[normalize-space()='Conduits']]";
export const add_item_conduits_locator =
  "//div[@id='conduits']//span[contains(text(),'Add new item')]";
export const select_item_conduits_locator =
  "//div[@id='conduits']//input[@placeholder='Select item to add']";
export const table_conduits_locator =
  "//div[@id='conduits']//table[@class='table']";
export const quantity_conduits_text_locator =
  "(//td[@data-label='Description']/following::td[1]//span//input)";
export const description_conduits_text_locator =
  "(//input[@placeholder='Description...'])";
export const total_conduits_table_locator =
  "(//td[@data-label='Total hours']/following-sibling::td[1]//span)";
export const checkCompareTotalSumConduits = "(//span";
