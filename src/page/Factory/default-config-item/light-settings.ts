import { expect } from "@playwright/test";
import {
  average_feed_length_in_M__L_locator,
  average_loop_length_in_M_L_locator,
  avg_feed_light_locator,
  avg_loop_light_locator,
  light_locator,
  save_light_settings_locator,
} from "../../../locator/factory-locator/set-default";

export class LightSettings {
  readonly page: any;
  readonly average_feed_length_in_M__L_locator: any;
  readonly average_loop_length_in_M_L_locator: any;
  readonly save_light_settings_locator: any;
  readonly light_locator: any;
  readonly avg_feed_light_locator: any;
  readonly avg_loop_light_locator: any;
  constructor(page: any) {
    this.page = page;
    this.average_feed_length_in_M__L_locator = page.locator(
      average_feed_length_in_M__L_locator
    );
    this.average_loop_length_in_M_L_locator = page.locator(
      average_loop_length_in_M_L_locator
    );
    this.save_light_settings_locator = page.locator(
      save_light_settings_locator
    );
    this.light_locator = page.locator(light_locator);
    this.avg_feed_light_locator = page.locator(avg_feed_light_locator);
    this.avg_loop_light_locator = page.locator(avg_loop_light_locator);
  }
  async fillTextLight(feed: any, loop: any) {
    await this.average_feed_length_in_M__L_locator.fill(feed);
    await this.average_loop_length_in_M_L_locator.fill(loop);
    await this.save_light_settings_locator.click();
  }
  async checkExsist(feed: any, loop: any) {
    await this.light_locator.click();
    const inputFeedValue = await this.page.$eval(
      avg_feed_light_locator,
      (input: { value: any }) => input.value
    );
    expect(feed).toBe(inputFeedValue);
    const inputLoopValue = await this.page.$eval(
      avg_loop_light_locator,
      (input: { value: any }) => input.value
    );
    expect(loop).toBe(inputLoopValue);
  }
}
