import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { HomePage } from '../../pages/HomePage';
import { getSourceMapsSupport } from 'module';

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
        await homePage.verifyTitleProduct('Sauce Labs Bike Light');
        await homePage.verifyProductDetail('A red light');
    })
})

test.describe('HP_SCN_002 - Memvalidasi bahwa pengguna dapat mengurutkan katalog produk di halaman Inventory berdasarkan abjad secara benar, guna memudahkan pencarian produk dari huruf awal terkecil maupun terbesar.', () => {
    test('TC_SRTING_001 - Verifikasi fitur shoring list berfungsi dan pastikan daftar produk terurut secara ascending berdasarkan nama (A - Z)', async ({ page }) => {
        await homePage.sortBy('az');
        await homePage.verifyProductNameSorted('az');
    })
    test('TC_SRTING_002 - Verifikasi fitur shoring list berfungsi dan pastikan daftar produk terurut secara descending berdasarkan nama (Z-A)', async ({ page }) => {
        await homePage.sortBy('za');
        await homePage.verifyProductNameSorted('za');
    })

    test("TC_SRTING_003 - Verifikasi bahwa daftar produk terurut secara otomatis dari harga paling murah ke paling mahal saat opsi 'Price (low to high)' dipilih", async ({ page }) => {
        await homePage.sortBy('lohi');
        await homePage.verifyProductPriceSorted('lohi');
    })
    
    test("TC_SRTING_004 - Verifikasi bahwa daftar produk terurut secara otomatis dari harga paling mahal ke paling murah saat opsi 'Price (low to high)' dipilih", async ({ page }) => {
        await homePage.sortBy('hilo');
        await homePage.verifyProductPriceSorted('hilo');
    })

    test("TC_SRTING_005 - Verifikasi pengurutan 'Name (Z - A)' tidak kembali ke default (reset) saat halaman dimuat ulang", async ({ page }) => {
        await homePage.sortBy('za');
        await homePage.verifyProductNameSorted('za');
        await page.reload();
        await homePage.verifyProductNameSorted('za');
        
    })
    
})
