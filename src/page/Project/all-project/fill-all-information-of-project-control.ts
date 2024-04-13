import {
  client_company_text_locator,
  client_representative_select_locator,
  edit_button_locator,
  linked_tender_text_locator,
  option_locator,
  project_coordinator_text_locator,
  project_manager_text_locator,
  project_name_text_locator,
  project_no_text_locator,
  project_status_text_locator,
  save_button_locator,
  address_text_locator,
  city_text_locator,
  abn_text_locator,
  original_contract_value_text_locator,
  contract_executed_text_locator,
  hard_copy_text_locator,
  normal_rate_text_locator,
  double_rate_text_locator,
  payment_term_text_locator,
} from "../../../locator/project-locator/fill-all-locator";
export class FillAllProject {
  readonly page: any;
  readonly edit_button_locator: any;
  readonly project_no_text_locator: any;
  readonly project_name_text_locator: any;
  readonly project_manager_text_locator: any;
  readonly project_coordinator_text_locator: any;
  readonly project_status_text_locator: any;
  readonly linked_tender_text_locator: any;
  readonly option_locator: any;

  readonly client_representative_select_locator: any;
  readonly client_company_text_locator: any;
  readonly address_text_locator: any;
  readonly city_text_locator: any;
  readonly abn_text_locator: any;

  readonly original_contract_value_text_locator: any;
  readonly contract_executed_text_locator: any;
  readonly hard_copy_text_locator: any;
  readonly normal_rate_text_locator: any;
  readonly double_rate_text_locator: any;
  readonly payment_term_text_locator: any;

  readonly save_button_locator: any;

  constructor(page: any) {
    this.page = page;
    this.edit_button_locator = page.locator(edit_button_locator);
    this.project_no_text_locator = page.locator(project_no_text_locator);
    this.project_name_text_locator = page.locator(project_name_text_locator);
    this.project_manager_text_locator = page.locator(
      project_manager_text_locator
    );
    this.project_coordinator_text_locator = page.locator(
      project_coordinator_text_locator
    );
    this.project_status_text_locator = page.locator(
      project_status_text_locator
    );
    this.linked_tender_text_locator = page.locator(linked_tender_text_locator);
    this.option_locator = page.locator(option_locator);
    //Client
    this.client_representative_select_locator = page.locator(
      client_representative_select_locator
    );
    this.client_company_text_locator = page.locator(
      client_company_text_locator
    );
    this.address_text_locator = page.locator(address_text_locator);
    this.city_text_locator = page.locator(city_text_locator);
    this.address_text_locator = page.locator(address_text_locator);
    this.address_text_locator = page.locator(address_text_locator);
    this.abn_text_locator = page.locator(abn_text_locator);

    //CONTRACT
    this.original_contract_value_text_locator = page.locator(
      original_contract_value_text_locator
    );
    this.contract_executed_text_locator = page.locator(
      contract_executed_text_locator
    );

    this.hard_copy_text_locator = page.locator(hard_copy_text_locator);
    this.normal_rate_text_locator = page.locator(normal_rate_text_locator);
    this.double_rate_text_locator = page.locator(double_rate_text_locator);
    this.payment_term_text_locator = page.locator(payment_term_text_locator);
    this.save_button_locator = page.locator(save_button_locator);
  }
  async fillAll(
    projectNo: any,
    projectName: any,
    projectManager: any,
    projectCoordinator: any,
    originalContractValue: any,
    hardCopy: any,
    normalRate: any,
    doubleRate: any,
    paymentTerms: any
  ) {
    await this.edit_button_locator.click();
    await this.project_no_text_locator.fill(projectNo);
    await this.project_name_text_locator.fill(projectName);
    await this.project_manager_text_locator.fill(projectManager);
    await this.project_coordinator_text_locator.fill(projectCoordinator);
    const random = await this.randomSTT(this.project_status_text_locator);
    await this.project_status_text_locator.selectOption({
      value: random,
    });
    await this.linked_tender_text_locator.click();
    await this.page.waitForTimeout(2000);
    const options = await this.page.$$(option_locator);
    const randomIndex = await this.randomElement(options);
    await options[randomIndex].click();
    const randomIndexClient = await this.randomValueCreateOfClient(
      this.client_representative_select_locator
    );
    await this.client_representative_select_locator.selectOption({
      value: randomIndexClient,
    });
    await this.original_contract_value_text_locator.fill(originalContractValue);
    await this.contract_executed_text_locator.click();
    const dateInput = await this.contract_executed_text_locator;
    const dateValue = "2022-01-01";

    await dateInput.evaluate((input: { value: any }, value: any) => {
      input.value = value;
    }, dateValue);
    await dateInput.dispatchEvent("input");
    await dateInput.dispatchEvent("change");
    await this.hard_copy_text_locator.fill(hardCopy);
    await this.normal_rate_text_locator.fill(normalRate);
    await this.double_rate_text_locator.fill(doubleRate);
    await this.payment_term_text_locator.fill(paymentTerms);
    await this.save_button_locator.click();
  }
  async randomSTT(element: any) {
    const optionsText = await element.innerText();
    const optionsArray = optionsText
      .split("\n")
      .filter((option: string) => option.trim() !== "");
    const randomIndex = Math.floor(Math.random() * optionsArray.length);
    return optionsArray[randomIndex];
  }
  async randomElement(element: any) {
    return Math.floor(Math.random() * element.length);
  }
  async randomValueCreateOfClient(element: any) {
    const options = await element.evaluate(
      (element: { querySelectorAll: (arg0: string) => any }) => {
        const optionElements = element.querySelectorAll("option");
        const optionValues: any[] = [];
        optionElements.forEach(
          (option: { getAttribute: (arg0: string) => any }) => {
            const value = option.getAttribute("value");
            if (value && value.trim() !== "") {
              optionValues.push(value.trim());
            }
          }
        );
        return optionValues;
      }
    );
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  }
}
// const tenderNull = await this.page.locator(
//   "//div[contains(text(),'No results for')]"
// );
