import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
    
})


test.describe('HP_SCN_001 - Memvalidasi integritas data produk pada halaman Inventory untuk memastikan seluruh informasi seperti nama, deskripsi, harga, dan gambar ditampilkan secara akurat dan konsisten sesuai dengan database', () => {
    test('TC_VPROD_001 - Verifikasi tiap produk memiliki nama yang sesuai dengan produk', async ({ page }) => {
        await homePage.verifyTitleProduct('Sauce Labs Bike Light');
        await homePage.verifyAltImg('Sauce Labs Bike Light');
    })

    test('TC_VPROD_002 - Verifikasi tiap produk memilik format harga yang sesuai', async ({ page }) => {
        await homePage.verifyProductPrice('$9.99');
    })

    test('TC_VPROD_003 - Verifikasi tiap produk memiliki detail yang sesuai dengan produk', async ({ page }) => {
        homePage.verifyTitleProduct('Sauce Labs Bike Light');
        homePage.verifyProductDetail('A red light');
    })

    
})
