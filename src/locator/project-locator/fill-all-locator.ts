export const edit_button_locator =
  "(//button[contains(@class,'button mr-4')])[1]";
export const project_no_text_locator =
  "//label[text() = 'Project No.']//following::div[1]//input";
export const project_name_text_locator =
  "//label[text() = 'Project name']//following::div[1]//input";
export const project_manager_text_locator =
  "//label[text() = 'Project manager']//following::div[1]//input";
export const project_coordinator_text_locator =
  "//label[text() = 'Project coordinator']//following::div[1]//input";
export const project_status_text_locator =
  "//label[text() = 'Project status']//following::div[1]//select";
export const linked_tender_text_locator =
  "//label[text() = 'Linked tender']//following::div[1]//input";
export const option_locator = "//div[@class='autocomplete control']//a";

// Client
export const client_representative_select_locator =
  "//label[text() = 'Client representative']//following::div[1]//select";
export const client_company_text_locator =
  "//label[text() = 'Client company']//following::div[1]//input";
export const address_text_locator =
  "//label[text() = 'Address']//following::div[1]//input";
export const city_text_locator =
  "//label[text() = 'Town / City']//following::div[1]//input";
export const abn_text_locator =
  "//label[text() = 'ABN']//following::div[1]//input";

// CONTRACT
export const original_contract_value_text_locator =
  "//label[text() = 'Original contract value ($)']//following::div[1]//input";
export const contract_executed_text_locator = "//input[@type='date']";
export const hard_copy_text_locator =
  "//label[text() = 'Hard copy contract location']//following::input[1]";
export const normal_rate_text_locator =
  "//label[text() = 'Agreed VQ - Normal rate ($)']//following::input[1]";
export const double_rate_text_locator =
  "//label[text() = 'Agreed VQ - Double rate ($)']//following::input[1]";
export const payment_term_text_locator =
  "//label[text() = 'Payment terms']//following::input[1]";
export const save_button_locator =
  "//button[@class='button mr-4 is-primary is-outlined']//span[contains(text(),'Save')]";
