import { expect } from "@playwright/test";
import {
  lost_time_text_locator,
  markup_on_light_fittings_text_locator,
  markup_on_subcontractors_text_locator,
  material_markup_text_locator,
  save_default_markup_locator,
  sundries_text_locator,
  temp_light_and_power_text_locator,
} from "../../../locator/factory-locator/set-default";

export class MakupRate {
  readonly page: any;
  readonly material_markup_text_locator: any;
  readonly markup_on_light_fittings_text_locator: any;
  readonly markup_on_subcontractors_text_locator: any;
  readonly temp_light_and_power_text_locator: any;
  readonly sundries_text_locator: any;
  readonly lost_time_text_locator: any;
  readonly save_default_markup_locator: any;
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
  }
  async fillTextMakupRate(
    materialMarkup: any,
    markupOnLight: any,
    markupOnSubcontractors: any,
    tempLightAndPower: any,
    sundries: any,
    lostTime: any
  ) {
    await this.material_markup_text_locator.fill(materialMarkup);
    await this.markup_on_light_fittings_text_locator.fill(markupOnLight);
    await this.markup_on_subcontractors_text_locator.fill(
      markupOnSubcontractors
    );
    await this.temp_light_and_power_text_locator.fill(tempLightAndPower);
    await this.sundries_text_locator.fill(sundries);
    await this.lost_time_text_locator.fill(lostTime);
    await this.save_default_markup_locator.click();
  }
}
