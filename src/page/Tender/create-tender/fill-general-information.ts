import {
  buider_option,
  builder_status_locator,
  city_locator,
  contact_name_locator,
  createMonth_locator,
  createYear_locator,
  create_day_locator,
  createdatePicker_locator,
  description_locator,
  dueDatePicker_locator,
  dueMonth_locator,
  dueYear_locator,
  due_day_locator,
  note_locator,
  quote_by_locator,
  reference_no_locator,
  tag_locator,
  take_off_locator,
  title_locator,
  your_status_locator,
} from "../../../locator/tender-locator/create-tender-locator";

export class FillToInputText {
  readonly page: any;
  readonly title_locator: any;
  readonly city_locator: any;
  readonly take_off_locator: any;
  readonly quote_by_locator: any;
  readonly contact_name_locator: any;
  readonly builder_status_locator: any;
  readonly your_status_locator: any;
  readonly reference_no_locator: any;
  readonly creation_date_locator: any;
  readonly due_date_locator: any;
  readonly description_locator: any;
  readonly tag_locator: any;
  readonly note_locator: any;
  readonly createdatePicker_locator: any;
  readonly createYear_locator: any;
  readonly createMonth_locator: any;
  readonly createYear: any;
  readonly createMonth: any;
  readonly dueDatePicker_locator: any;
  readonly dueYear_locator: any;
  readonly dueMonth_locator: any;
  readonly dueYear: any;
  readonly dueMonth: any;
  readonly buider_option: any;
  constructor(page: any) {
    this.page = page;
    this.title_locator = page.locator(title_locator);
    this.city_locator = page.locator(city_locator);
    this.take_off_locator = page.locator(take_off_locator);
    this.quote_by_locator = page.locator(quote_by_locator);
    this.contact_name_locator = page.locator(contact_name_locator);
    this.builder_status_locator = page.locator(builder_status_locator);
    this.your_status_locator = page.locator(your_status_locator);
    this.reference_no_locator = page.locator(reference_no_locator);
    this.description_locator = page.locator(description_locator);
    this.note_locator = page.locator(note_locator);
    this.tag_locator = page.locator(tag_locator);
    this.createdatePicker_locator = page.locator(createdatePicker_locator);
    this.createYear_locator = page.locator(createYear_locator);
    this.createMonth_locator = page.locator(createMonth_locator);
    this.dueDatePicker_locator = page.locator(dueDatePicker_locator);
    this.dueYear_locator = page.locator(dueYear_locator);
    this.dueMonth_locator = page.locator(dueMonth_locator);
    this.buider_option = page.locator(buider_option);
  }

  async fillInput(
    title: any,
    city: any,
    takeOff: any,
    quoteBy: any,
    contactName: any,
    randomOption: any,
    builderOption: any,
    description: any,
    notes: any,
    referenceNo: any,
    tags: any,
    year: any,
    month: any,
    day: any
  ) {
    await this.title_locator.fill(title);
    await this.city_locator.fill(city);
    await this.take_off_locator.fill(takeOff);
    await this.quote_by_locator.fill(quoteBy);
    await this.contact_name_locator.fill(contactName);
    await this.your_status_locator.selectOption({ value: builderOption });
    await this.builder_status_locator.selectOption({
      value: randomOption,
    });
    await this.reference_no_locator.fill(referenceNo);
    await this.createdatePicker_locator.click();
    await this.createYear_locator.selectOption(year);
    await this.createMonth_locator.selectOption(month);
    for (const dt of await this.page.$$(create_day_locator)) {
      if ((await dt.textContent()) == day) {
        await dt.click();
        break;
      }
    }
    await this.dueDatePicker_locator.click();
    await this.dueYear_locator.selectOption(year);
    await this.dueMonth_locator.selectOption(month);
    for (const date of await this.page.$$(due_day_locator)) {
      if ((await date.textContent()) == day) {
        await date.click();
        break;
      }
    }
    await this.description_locator.fill(description);
    for (const tag of tags) {
      await this.tag_locator.fill(tag);
      await this.page.keyboard.press("Enter");
    }
    await this.note_locator.fill(notes);
  }
}


