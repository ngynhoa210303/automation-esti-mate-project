// Consumer mains and Submains
export const cctv_tab_locator = "//span[contains(text(),'CCTV')]";
export const add_item_CCTV_locator =
  "//div[@id='cctv']//div[@class='text-center']//span[contains(text(),'Add new item')]";
export const select_item_CCTV_locator =
  "//div[@id='cctv']//input[@placeholder='Select item to add']";
export const table_CCTV_locator =
  "(//div[@id='cctv']//table[@class='table'])[3]";
export const quantity_CCTV_text_locator =
  "((//div[@id='cctv']//table[@class='table'])[3]//td[@data-label='UOM']/preceding-sibling::td[1]//span//input)";
export const total_CCTV_table_locator =
  "((//div[@id='cctv']//table)[3]//td[@data-label='Total hours']/following-sibling::td[1]//span)";
export const checkCompareTotalSumCCTV =
  "//span[contains(text(),'CCTV')]//following-sibling::span//span";
