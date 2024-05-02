import { expect } from "@playwright/test";
import {
  average_feed_length_in_M__P_locator,
  average_loop_length_in_M_P_locator,
  avg_feed_power_locator,
  avg_loop_power_locator,
  power_locator,
  save_power_settings_locator,
} from "../../../locator/factory-locator/set-default";

export class PowerSettings {
  readonly page: any;
  readonly average_feed_length_in_M__P_locator: any;
  readonly average_loop_length_in_M_P_locator: any;
  readonly save_power_settings_locator: any;
  readonly power_locator: any;
  readonly avg_feed_power_locator: any;
  readonly avg_loop_power_locator: any;
  constructor(page: any) {
    this.page = page;
    this.average_feed_length_in_M__P_locator = page.locator(
      average_feed_length_in_M__P_locator
    );
    this.average_loop_length_in_M_P_locator = page.locator(
      average_loop_length_in_M_P_locator
    );
    this.save_power_settings_locator = page.locator(
      save_power_settings_locator
    );
    this.power_locator = page.locator(power_locator);
    this.avg_feed_power_locator = page.locator(avg_feed_power_locator);
    this.avg_loop_power_locator = page.locator(avg_loop_power_locator);
  }
  async fillTextPower(feed: any, loop: any) {
    await this.average_feed_length_in_M__P_locator.fill(feed);
    await this.average_loop_length_in_M_P_locator.fill(loop);
    await this.save_power_settings_locator.click();
  }
  async checkExsist(feed: any, loop: any) {
    await this.power_locator.click();
    const inputFeedValue = await this.page.$eval(
      avg_feed_power_locator,
      (input: { value: any }) => input.value
    );
    expect(feed).toBe(inputFeedValue);
    const inputLoopValue = await this.page.$eval(
      avg_loop_power_locator,
      (input: { value: any }) => input.value
    );
    expect(loop).toBe(inputLoopValue);
  }
}
