import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly product: Locator;
    readonly price: Locator;
    readonly detail: Locator;
    readonly sort: Locator;

    constructor(page: Page) {
        this.page = page;
        this.product = page.locator('.inventory_item_name');
        this.price = page.locator('.inventory_item_price'); 
        this.detail = page.locator('.inventory_item_desc');
        this.sort = page.locator('[data-test="product-sort-container"]');
    }

    async verifyTitleProduct(name: string){
        await expect(this.product.filter({hasText: name})).toBeVisible();
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

    async sortBy(option: 'az' | 'za' | 'hilo' | 'lohi'){
        await this.sort.selectOption(option);
    }

    async verifyProductNameSorted(order: 'az' | 'za'){
        const name = await this.product.allTextContents();
        const sort = [...name].sort((a, b) =>
            order === 'az' ? a.localeCompare(b) : b.localeCompare(a)
        );

        expect(name).toEqual(sort);
    }

    async verifyProductPriceSorted(order: 'lohi' | 'hilo'){
        const price = await this.price.allTextContents();
        const number = price.map(p => Number(p.replace('$', '')));

        const sort = [...number].sort((a, b) =>
            order === 'lohi' ? a - b : b - a
        );
        expect(number).toEqual(sort);
    }
}