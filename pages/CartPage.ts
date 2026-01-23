import { Page, Locator, expect } from "@playwright/test";

export class CartPage{
    readonly page : Page;

    constructor(page: Page) {
        this.page = page;
    }

    async continueShoppingBtn(){
        await this.page.locator(`[data-test="continue-shopping"]`).click();
    }

    async verifyUrlAddress(url: string){
        await expect(this.page).toHaveURL(new RegExp(url))
    }
}