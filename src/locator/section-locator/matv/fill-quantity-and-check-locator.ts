export const matv_tab_locator = "//span[contains(text(),'CCTV')]";
export const add_item_MATV_locator =
  "//div[@id='matv']//div[@class='text-center']//span[contains(text(),'Add new item')]";
export const select_item_MATV_locator =
  "(//div[@id='matv']//input[@placeholder='Select item to add'])[2]";
export const table_MATV_locator =
  "(//div[@id='matv']//table[@class='table'])[3]";
export const quantity_MATV_text_locator =
  "((//div[@id='matv']//table[@class='table'])[3]//td[@data-label='UOM']/preceding-sibling::td[1]//span//input)";
export const total_MATV_table_locator =
  "((//div[@id='matv']//table)[3]//td[@data-label='Total hours']/following-sibling::td[1]//span)";
export const checkCompareTotalSumMATV =
  "//span[contains(text(),'MATV')]//following-sibling::span//span";
