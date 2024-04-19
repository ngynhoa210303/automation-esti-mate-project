// Consumer mains and Submains
export const inspections_and_compliance_tab_locator =
  "//span[contains(text(),'Inspections and Compliance')]";
export const add_item_IAC_locator =
  "//div[@id='inspections-and-compliance']//span[contains(text(),'Add new item')]";
export const select_item_IAC_locator =
  "//div[@id='inspections-and-compliance']//input[@placeholder='Select item to add']";
export const table_IAC_locator =
  "//div[@id='inspections-and-compliance']//table[@class='table']";
export const quantity_IAC_text_locator =
  "(//div[@id='inspections-and-compliance']//td[@data-label='UOM']/preceding-sibling::td[1]//span//input)";
export const total_IAC_table_locator =
  "(//div[@id='inspections-and-compliance']//td[@data-label='Total hours']/following-sibling::td[1]//span)";
export const checkCompareTotalSumIAC =
  "//span[contains(text(),'Inspections and Compliance')]//following-sibling::span//span";
