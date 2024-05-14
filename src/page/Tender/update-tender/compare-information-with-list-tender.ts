import { Page } from "@playwright/test";
import {
    table_locator,
    total_tender_locator,
} from "../../../locator/tender-locator/table-tender-list-locator";
import { row_locator } from "../../../locator/tender-locator/table-tender-list-locator";
export class InformationInListTender {
    readonly page: any;
    readonly tableLocator: any;
    readonly row: any;
    readonly detailLocator: any;
    constructor(page: Page) {
        this.page = page;
        this.tableLocator = page.locator(table_locator);
        this.row = this.tableLocator.locator(row_locator);
    }
    async findElement() {
        const rows = await this.page.$$(row_locator);
        const randomIndex = Math.floor(Math.random() * rows.length);
        const chosenRow = rows[randomIndex];
        return chosenRow;
    }
    async findTitle(jobTitle: string) {
        const choosenRow = await this.findElement()
        const titleTender = await choosenRow.$(`//td//span//a[contains(text(),"${jobTitle}")]`);
        if (titleTender) {
            const titleText = await titleTender.innerText();
            return titleText
        } else {
            console.log("Không tìm thấy phần tử <a> phù hợp.");
        }
    }
    async findTakeOff(takeOff: string) {
        const chosenRow = await this.findElement()
        const titleTender = await chosenRow.$(`//td[4]//span[contains(text(),"${takeOff}")]`);
        if (titleTender) {
            const text = await titleTender.innerText();
            return text
        } else {
            console.log("Không tìm thấy phần tử phù hợp.");
        }
    }
    async findContact(contact: string) {
        const chosenRow = await this.findElement()
        const contactInner = await chosenRow.$(`//td[6]//span[contains(text(),"${contact}")]`);
        if (contactInner) {
            const text = await contactInner.innerText();
            return text
        } else {
            console.log("Không tìm thấy phần tử phù hợp.");
        }
    }
    async findBuiderStatus() {
        const chosenRow = await this.findElement()
        const buiderSTT = await chosenRow.$(`(//td[8]//span)[1]`);
        if (buiderSTT) {
            const text = await buiderSTT.innerText();
            return text
        } else {
            console.log("Không tìm thấy phần tử phù hợp.");
        }
    }
    async findComment(comment: string) {
        const chosenRow = await this.findElement()
        const commentTender = await chosenRow.$(`//td[10]//span[contains(text(),"${comment}")]`);
        if (commentTender) {
            const text = await commentTender.innerText();
            return text
        } else {
            console.log("Không tìm thấy phần tử phù hợp.");
        }
    }
}
