import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';

let homePage: HomePage;
let cartPage: CartPage;

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  cartPage = new CartPage(page);

  await loginPage.open();
  await loginPage.login('standard_user', 'secret_sauce');
  await loginPage.assertionSuccess();
});

test.describe('Cart Management Flow', () => {

  test("TC_CART_001 - Continue Shopping redirect", async () => {
    await homePage.clickCartIcon();
    await cartPage.verifyUrlAddress('/cart');

    await cartPage.clickContinueShoppingBtn();
    await cartPage.verifyUrlAddress('/inventory');
  });

  test("TC_CART_002 - Empty Cart Validation", async () => {
    await homePage.clickCartIcon();
    await cartPage.verifyUrlAddress('/cart');

    await cartPage.verifyEmptyCart();
  });

  test("TC_CART_003 - Product Integrity in Cart", async () => {
    await cartPage.addProductToCart('sauce-labs-backpack');
    await homePage.clickCartIcon();

    await cartPage.verifyUrlAddress('/cart');
    await cartPage.verifyProductInCart('Sauce Labs Backpack');
  });

});
