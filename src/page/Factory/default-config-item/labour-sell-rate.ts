import {
  labour_sell_rate_locator,
  labour_sell_rate_text_locator,
  lost_time_text_locator,
  markup_on_light_fittings_text_locator,
  markup_on_subcontractors_text_locator,
  material_markup_text_locator,
  save_default_markup_locator,
  sundries_text_locator,
  temp_light_and_power_text_locator,
  view_summary_button_locator,
} from "../../../locator/factory-locator/set-default";
export class LabourSellRate {
  readonly page: any;
  readonly material_markup_text_locator: any;
  readonly markup_on_light_fittings_text_locator: any;
  readonly markup_on_subcontractors_text_locator: any;
  readonly temp_light_and_power_text_locator: any;
  readonly sundries_text_locator: any;
  readonly lost_time_text_locator: any;
  readonly save_default_markup_locator: any;
  readonly view_summary_button_locator: any;
  readonly labour_sell_rate_locator: any;
  readonly labour_sell_rate_text_locator: any;
  constructor(page: any) {
    this.page = page;
    this.material_markup_text_locator = page.locator(
      material_markup_text_locator
    );
    this.markup_on_light_fittings_text_locator = page.locator(
      markup_on_light_fittings_text_locator
    );
    this.markup_on_subcontractors_text_locator = page.locator(
      markup_on_subcontractors_text_locator
    );
    this.temp_light_and_power_text_locator = page.locator(
      temp_light_and_power_text_locator
    );
    this.sundries_text_locator = page.locator(sundries_text_locator);
    this.lost_time_text_locator = page.locator(lost_time_text_locator);
    this.save_default_markup_locator = page.locator(
      save_default_markup_locator
    );
    this.view_summary_button_locator = page.locator(
      view_summary_button_locator
    );
    this.labour_sell_rate_locator = page.locator(labour_sell_rate_locator);
    this.labour_sell_rate_text_locator = page.locator(
      labour_sell_rate_text_locator
    );
  }
  async clickViewSummary() {
    await this.view_summary_button_locator.click();
  }
}
