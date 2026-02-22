import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";
import { HomePage } from "../../pages/HomePage";

let cartPage : CartPage;
let checkoutPage : CheckoutPage;
let homePage : HomePage;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    homePage = new HomePage(page);

    await page.goto('https://www.saucedemo.com/');
    await loginPage.login("standard_user", "secret_sauce");
});

test.describe('Checkout Process Validation', () => {

    test("TC-CKO-001-verify checkout button funcanlity (clickable + redirection) in cart page ", async ({ page }) => {
        
        await cartPage.addProductToCart('sauce-labs-backpack');
        await homePage.clickCartIcon();

        await cartPage.verifyUrlAddress('/cart');
        await cartPage.verifyProductInCart('Sauce Labs Backpack');
        await cartPage.clickCheckoutBtn();
        await checkoutPage.verifyUrlAddress('/checkout-step-one');
        await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');

    });
});
