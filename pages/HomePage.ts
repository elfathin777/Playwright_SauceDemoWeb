import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly title: Locator;
    readonly price: Locator;
    readonly detail: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('.inventory_item_name');
        this.price = page.locator('.inventory_item_price'); 
        this.detail = page.locator('.inventory_item_desc');
    }

    async verifyTitleProduct(name: string){
        await expect(this.title.filter({hasText: name})).toBeVisible();
    }

    async verifyAltImg(image: string){
        await expect(this.page.getByAltText(image)).toBeVisible();
    }

    async verifyProductPrice(price: string){
        await expect(this.price.filter({hasText: price})).toBeVisible();
    }

    async verifyProductDetail(detail: string){
        await expect(this.detail.filter({hasText: detail})).toBeVisible();
    }
}