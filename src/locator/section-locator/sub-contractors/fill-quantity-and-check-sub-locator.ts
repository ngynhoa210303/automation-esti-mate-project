export const sub_contractors_tab_locator =
  "//span[contains(text(),'Sub-contractors')]";
export const add_item_locator =
  "//div[@id='sub-contractors']//span[contains(text(),'Add new item')]";
export const table_sub_locator =
  "//div[@id='sub-contractors']//table[@class='table']";
export const quantity_sub_text_locator =
  "(//div[@id='sub-contractors']//td[@data-label='UOM']/preceding-sibling::td[1]//span//input)";
export const total_sub_table_locator =
  "(//div[@id='sub-contractors']//td[@data-label='Total hours']/following-sibling::td[1]//span)";
export const checkCompareTotalSumSwitch =
  "//span[contains(text(),'Sub-contractors')]//following-sibling::span//span";
export const select_item_sub_locator =
  "//div[@id='sub-contractors']//input[@placeholder='Select item to add']";
