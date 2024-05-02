export const factory_header_locator = "//a[contains(text(),'Factory')]";
export const set_default_locator = "//span[text()='Defaults']";
export const light_locator =
  "//span[contains(text(),'Installation of Lighting')]";
export const power_locator = "//span[contains(text(),'Installation of Power')]";

// Base labour rate
export const average_qualified_electricians_rate_text_locator =
  "//label[text() = 'Average Qualified Electricians rate ($/hr)']//following::div[1]//input";
export const average_apprentice_rate_text_locator =
  "//label[text() = 'Average Apprentice rate ($/hr)']//following::div[1]//input";
export const save_button_base_rate_locator =
  "(//label[text() = 'Average Apprentice rate ($/hr)']//following::button)[1]";

// Labour sell rate
export const labour_site_rate_text_locator =
  "//label[text() = 'Labour site rate ($/hr)']//following::div[1]//input";
export const overhead_recovery_text_locator =
  "//label[text() = 'Overhead recovery (%)']//following::div[1]//input";
//disable
export const labour_sell_rate_locator =
  "//label[text() = 'Labour sell rate ($/hr)']//following::div[1]//input";

// Power Settings
export const average_feed_length_in_M__P_locator =
  "(//label[text() = 'Average feed length in M']//following::div[1]//input)[1]";
export const average_loop_length_in_M_P_locator =
  "(//label[text() = 'Average loop length in M']//following::div[1]//input)[1]";
export const save_power_settings_locator =
  "(//label[text() = 'Average loop length in M']//following::button)[1]";

// Light Settings
export const average_feed_length_in_M__L_locator =
  "(//label[text() = 'Average feed length in M']//following::div[1]//input)[2]";
export const average_loop_length_in_M_L_locator =
  "(//label[text() = 'Average loop length in M']//following::div[1]//input)[2]";
export const save_light_settings_locator =
  "(//label[text() = 'Average loop length in M']//following::button)[2]";

// Default markup rates
export const material_markup_text_locator =
  "//label[text() = 'Material mark-up (%)']//following::div[1]//input[1]";
export const markup_on_light_fittings_text_locator =
  "//label[text() = 'Markup on light fittings (%)']//following::div[1]//input[1]";
export const markup_on_subcontractors_text_locator =
  "//label[text() = 'Markup on subcontractors (%)']//following::div[1]//input[1]";
export const temp_light_and_power_text_locator =
  "//label[text() = 'Temp light and power (%)']//following::div[1]//input[1]";
export const sundries_text_locator =
  "//label[text() = 'Sundries (%)']//following::div[1]//input[1]";
export const lost_time_text_locator =
  "//label[text() = 'Lost Time (%)']//following::div[1]//input[1]";
export const save_default_markup_locator =
  "(//label[text() = 'Lost Time (%)']//following::button)[1]";

//Compare || SetDefault -->Tender summary
export const tender_in_header_locator = "//a[contains(text(),'Tenders')]";
export const new_tender_button_locator =
  "//span[contains(text(),'New tender')]";
export const view_summary_button_locator =
  "//span[contains(text(),'View summary')]";

//Overall settings
// Labour sell rate
export const labour_sell_rate_text_locator =
  "//label[text() = 'Labour sell rate ($)']//following::div[1]//input";
export const total_quatified_text_locator =
  "//label[text() = 'Total Qualified Electricians']//following::div[1]//input";
export const qualified_electricians_cost_locator =
  "//label[text() = 'Qualified Electricians Cost ($/hr)']//following::div[1]//input";
export const total_apprentices_locator =
  "//label[text() = 'Total Apprentices']//following::div[1]//input";
export const apprirentice_cost_locator =
  "//label[text() = 'Apprentice cost ($/hr)']//following::div[1]//input";

// Default markup rates
export const material_markup_locator =
  "//label[text() = 'Material mark-up (%)']//following::div[1]//input[1]";
export const markup_on_light_fittings_locator =
  "//label[text() = 'Markup on light fittings (%)']//following::div[1]//input[1]";
export const markup_on_subcontractors_locator =
  "//label[text() = 'Markup on subcontractors (%)']//following::div[1]//input[1]";
export const temp_light_and_power_locator =
  "//label[text() = 'Temp light and power (%)']//following::div[1]//input[1]";
export const sundries_locator =
  "//label[text() = 'Sundries (screws, etc) (%)']//following::div[1]//input[1]";
export const lost_time_locator =
  "//label[text() = 'Lost Time (%)']//following::div[1]//input[1]";

//Power
export const avg_feed_power_locator =
  "//label[text() = 'Avg General Wiring Feed Length in M']//following::div[1]//input";
export const avg_loop_power_locator =
  "//label[text() = 'Avg General Wiring Loop Length in M']//following::div[1]//input";
//Light
export const avg_feed_light_locator =
  "//label[text() = 'Average feed length in M']//following::div[1]//input";
export const avg_loop_light_locator =
  "//label[text() = 'Average loop length in M']//following::div[1]//input";
