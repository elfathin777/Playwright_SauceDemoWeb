import { test, expect } from '@playwright/test';
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
    
})

test.describe('Uji fungsionalitas manajemen keranjang belanja dan validasi alur navigasi Checkout/Continue Shopping untuk memastikan pengalaman belanja pengguna yang konsisten', () => {
    test("TC_CART_001 - Verifikasi fungsionalitas tombol 'Continue Shopping' untuk mengarahkan kembali pengguna dari halaman keranjang ke halaman daftar produk (Inventory).", async ({ page }) => {
        await homePage.clickCartIcon();
        await cartPage.verifyUrlAddress('/cart');
        await cartPage.continueShoppingBtn();
        await cartPage.verifyUrlAddress('/inventory');
    })
    
    
})
