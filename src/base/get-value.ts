export async function getValueInput(page: any, locator: any) {
    const inputElement = await page.$(locator);
    if (inputElement) {
        const inputValue = await inputElement.evaluate(
            (input: { value: any }) => input.value,
        );
        return inputValue;
    }
}
export async function randomValueInOption(element: any) {
    const optionsText = await element.innerText();
    const optionsArray = optionsText
        .split("\n")
        .filter((option: string) => option.trim() !== "");
    const randomIndex = Math.floor(Math.random() * optionsArray.length);
    return optionsArray[randomIndex];
}
export async function getValueTag(page: any, locator: any) {
    try {
        const inputElements = await page.$$(locator);
        const inputValues = [];
        for (const inputElement of inputElements) {
            const inputValue = await inputElement.textContent();
            inputValues.push(inputValue.trim());
        }
        return inputValues;
    } catch (error) {
        console.error("Không tìm thấy phần tử:", error);
        return [];
    }
}
export async function checkDisableInput(page: any, locator: any) {
    const inputElement = await page.$(locator);
    if (inputElement) {
        const inputDisableLabourValue = await inputElement.evaluate(
            (input: { value: any }) => input.value
        );
        return inputDisableLabourValue;
    } else {
        console.error("Input element not found.");
    }
}
