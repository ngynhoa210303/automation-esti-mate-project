import {
  average_apprentice_rate_text_locator,
  average_qualified_electricians_rate_text_locator,
  save_button_base_rate_locator,
  view_summary_button_locator,
} from "../../../locator/factory-locator/set-default";

export class BaseLabourRate {
  readonly page: any;
  readonly average_qualified_electricians_rate_text_locator: any;
  readonly average_apprentice_rate_text_locator: any;
  readonly save_button_base_rate_locator: any;
  readonly view_summary_button_locator: any;
  constructor(page: any) {
    this.page = page;
    this.average_qualified_electricians_rate_text_locator = page.locator(
      average_qualified_electricians_rate_text_locator
    );
    this.average_apprentice_rate_text_locator = page.locator(
      average_apprentice_rate_text_locator
    );
    this.save_button_base_rate_locator = page.locator(
      save_button_base_rate_locator
    );
    this.view_summary_button_locator = page.locator(
      view_summary_button_locator
    );
  }
  async fillTextBase(
    averageQualifiedElectricians: any,
    averageApprenticeRate: any
  ) {
    await this.average_qualified_electricians_rate_text_locator.fill(
      averageQualifiedElectricians
    );
    await this.average_apprentice_rate_text_locator.fill(averageApprenticeRate);
    await this.save_button_base_rate_locator.click();
  }
}
