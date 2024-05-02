import { factory_header_locator } from "../../locator/factory-locator/search-item-locator";
import {
  down_load_button_locator,
  update_material_rate_locator,
} from "../../locator/factory-locator/upload-material-rate";

export class DownLoadAllItem {
  readonly page: any;
  readonly factory_header_locator: any;
  readonly update_material_rate_locator: any;
  readonly down_load_button_locator: any;
  constructor(page: any) {
    this.page = page;
    this.factory_header_locator = page.locator(factory_header_locator);
    this.update_material_rate_locator = page.locator(
      update_material_rate_locator
    );
    this.down_load_button_locator = page.locator(down_load_button_locator);
  }
  async checkDownLoad() {
    await this.factory_header_locator.click();
    await this.update_material_rate_locator.click();
    await this.down_load_button_locator.click();
  }
}
