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

test.describe('HP_SCN_003 - Memvalidasi fungsionalitas penambahan produk ke keranjang belanja (Add to Cart) dan memastikan sinkronisasi jumlah item pada ikon keranjang.', () => {
    test('TC_CART_001 - Verifikasi jumlah barang pada ikon keranjang bertambah secara akurat sesuai dengan banyaknya produk yang dipilih oleh pengguna (satu produk)', async ({ page }) => {
        await homePage.clickFirstProduct('sauce-labs-backpack');    
        await homePage.verifyCartBadge('1');
    })

    test('TC_CART_002 - Verifikasi jumlah barang pada ikon keranjang bertambah secara akurat sesuai dengan banyaknya produk yang dipilih oleh pengguna (lebih dari satu produk)', async ({ page }) => {
        await homePage.clickFirstProduct('sauce-labs-backpack');    
        await homePage.clickFirstProduct('sauce-labs-bike-light');  
        await homePage.clickFirstProduct('sauce-labs-bolt-t-shirt');  
        await homePage.verifyCartBadge('3');
    })
    
    test('TC_CART_003 - Verifikasi Klik pada tombol "Remove" harus mengubah label tombol kembali menjadi "Add to Cart" dan mengurangi jumlah pada Shopping Cart', async ({ page }) => {
        await homePage.clickFirstProduct('sauce-labs-backpack');    
        await homePage.clickFirstProduct('sauce-labs-bike-light'); 
        await homePage.verifyCartBadge('2'); 
        await homePage.clickRemoveBtn('sauce-labs-bike-light');
        await homePage.verifyCartBadge('1');
    })

    test("TC_CART_004 - Validasi bahwa tombol 'Remove' secara akurat mengembalikan status tombol menjadi 'Add to Cart', memperbarui jumlah pada ikon keranjang belanja, dan memastikan perubahan tersebut tetap bertahan meskipun halaman dimuat ulang", async ({ page }) => {
        await homePage.clickFirstProduct('sauce-labs-backpack');    
        await homePage.clickFirstProduct('sauce-labs-bike-light'); 
        await homePage.verifyCartBadge('2'); 
        await homePage.clickRemoveBtn('sauce-labs-bike-light');
        await homePage.verifyBtnIsAddToChart('sauce-labs-bike-light');
        await homePage.verifyCartBadge('1');
        await page.reload();
        await homePage.verifyBtnIsAddToChart('sauce-labs-bike-light');
        await homePage.verifyCartBadge('1');
    })

    test('TC_CART_005 - Validasi sistem berhasil mengarahkan pengguna ke halaman Product Detail (PDP) yang relevan setelah nama atau gambar produk diklik', async ({ page }) => {
        await homePage.clickTitleProduct('Sauce Labs Bike Light');
        await homePage.verifyProductDescription('A red light');
        await homePage.verifyAddressDetailPage('https://www.saucedemo.com/inventory-item.html?id=0');
    })
    
    
})
