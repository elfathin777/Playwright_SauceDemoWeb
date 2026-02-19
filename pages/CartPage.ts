import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly continueShoppingBtn: Locator;
  readonly checkoutBtn: Locator;
  readonly cartItems: Locator;
  readonly verifyProduct: Locator;

  constructor(page: Page) {
    this.page = page;
    this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
    this.cartItems = page.locator(`[data-test="shopping-cart-badge"]`);
    this.verifyProduct = page.locator(`[data-test="inventory-item-name"]`);
  }

  async clickContinueShoppingBtn() {
    await this.continueShoppingBtn.click();
  }

  async addProductToCart(backpack: string){ 
    await this.page.locator(`[data-test="add-to-cart-${backpack}"]`).click(); 
}

  async verifyProductInCart(productName: string) {
    await expect(this.verifyProduct).toContainText(productName);
  }

  async verifyEmptyCart() {
    await expect(this.cartItems).toHaveCount(0);
  }

  async verifyUrlAddress(url: string) {
    await expect(this.page).toHaveURL(new RegExp(url));
  }
}
