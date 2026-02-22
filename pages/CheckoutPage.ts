import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly removeBtn: Locator;    
    readonly continueShoppingBtn: Locator;
    readonly continueBtn: Locator;
    readonly cancelBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.removeBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
        this.continueBtn = page.locator('[data-test="continue"]');
        this.cancelBtn = page.locator('[data-test="cancel"]');
    }

    async clickContinueShoppingBtn() {
        await this.continueShoppingBtn.click();
    }
    
    async clickRemoveBtn() {
        await this.removeBtn.click();
    }

    async clickContinueBtn() {
        await this.continueBtn.click();
    }

    async clickCancelBtn() {
        await this.cancelBtn.click();
    }

    async verifyUrlAddress(url: string) {
        await expect(this.page).toHaveURL(new RegExp(url));
    }

}

