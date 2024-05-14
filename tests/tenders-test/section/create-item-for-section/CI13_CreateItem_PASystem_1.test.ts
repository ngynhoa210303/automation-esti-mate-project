import test, { expect } from "@playwright/test";
import * as dataSection from "../../../../utils/data/section/create-item-data.cred.json";
import { LoginPage } from "../../../../src/page/Login/login";
import { CreateItem } from "../../../../src/page/Tender/section/add-item-section/create-item";
import { ClickTender } from "../../../../src/page/Tender/create-tender/add-tender";
import dotenv from "dotenv";
import { SearchItemOfFactory } from "../../../../src/page/Factory/search-item";
import { DeleteItemOfFactory } from "../../../../src/page/Factory/delete-item";
import * as dataGenenral from '../../../../utils/data/tender/general-information-data.cred.json';
import { randomValueInOption } from "../../../../src/base/get-value";
import { FillToInputText } from "../../../../src/page/Tender/create-tender/fill-general-information";
import { FilterTender } from "../../../../src/page/Tender/action/filter";
import { nodata_text_locator } from "../../../../src/locator/factory-locator/search-item-locator";
import { DeleteTender } from "../../../../src/page/Tender/action/delete-tender";

dotenv.config();
test.skip("CI13: Create Item PASystem 1", () => {
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(
            String(process.env.EMAIL),
            String(process.env.PASSWORD)
        );
        await page.waitForTimeout(3000);
    });
    test("Create Item", async ({ page }) => {
        const createNewTender = new ClickTender(page);
        const newInput = new FillToInputText(page);
        await createNewTender.clickTender();
        await createNewTender.clickCreate();
        await page.waitForTimeout(2000);

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear()
        const currentMonth = (currentDate.getMonth() + 1)
        const year = { value: (currentYear.toString()) };
        const month = { value: (currentMonth.toString()) };
        const day = currentDate.getDate().toString();
        const createItem = new CreateItem(page, dataSection[12].name, 12);

        const randomOption = await randomValueInOption(
            newInput.builder_status_locator,
        );
        const statusOption = await randomValueInOption(
            newInput.your_status_locator,
        );

        await test.step('Create tender', async () => {
            await newInput.fillInput(
                dataGenenral[0].title,
                dataGenenral[0].city,
                dataGenenral[0].take_off,
                dataGenenral[0].quote_by,
                dataGenenral[0].contact_name,
                randomOption,
                statusOption,
                dataGenenral[0].description,
                dataGenenral[0].notes,
                dataGenenral[0].reference_no,
                dataGenenral[0].tags,
                year,
                month,
                day
            );
            const save = new ClickTender(page);
            await save.save();
        })
        await test.step('Create item', async () => {
            await createItem.fillToInformation(
                dataSection[12].name,
                dataSection[12].material_rate,
                dataSection[12].part_no,
                dataSection[12].labour_unit_rate_hour,
                dataSection[12].labour_unit_rate_mins,
            );
        })
        await test.step('Check select element after create', async () => {
            await createItem.selectClick(dataSection[12].name);
            await createItem.hideClick();
        })
        await test.step('Clear data', async () => {
            const search = new SearchItemOfFactory(page);
            await search.search(dataSection[12].name);
            const deleteItem = new DeleteItemOfFactory(page);
            await deleteItem.delete();

            const createNewTender = new ClickTender(page);
            await createNewTender.clickTender();
            const filter = new FilterTender(page);
            await filter.searchOnly(dataGenenral[0].title);
            const inputLoopValue = page.locator(nodata_text_locator);
            expect(!inputLoopValue.isVisible());
            const deleteItem1 = new DeleteTender(page);
            await deleteItem1.deleteRandomElement();
        })
    })
})

