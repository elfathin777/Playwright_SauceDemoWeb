import { test, expect, mergeExpects } from '@playwright/test';
import { describe } from 'node:test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
})

test.describe('Login Scenario', () => {
    test('LOG_SCN_001_TC_LOG_001 - Validasi bahwa Username tidak boleh kosong.', async ({ page }) => {
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByRole('button', {name: 'Login'}).click(); 

        await expect(page.getByText("Epic sadface: Username is required")).toBeVisible();
    })

    test('LOG_SCN_001_TC_LOG_002 - Validasi bahwa Password tidak boleh kosong.', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByRole('button', {name: 'Login'}).click(); 

        await expect(page.getByText("Epic sadface: Password is required")).toBeVisible();
    })

    test('LOG_SCN_001_TC_LOG_003 - Validasi bahwa Username dan Password tidak boleh kosong.', async ({ page }) => {
        await page.getByRole('button', {name: 'Login'}).click(); 

        await expect(page.getByText("Epic sadface: Username is required")).toBeVisible();
    }) 

    test('LOG_SCN_001_TC_LOG_004 - Validasi bahwa login berhasil menggunakan valid username dan password.', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByRole('button', {name: 'Login'}).click(); 

        await expect(page.getByText("Swag Labs")).toBeVisible();
    })
    test('LOG_SCN_001_TC_LOG_005 - Validasi bahwa login gagal menggunakan username "locked_out_user"', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('locked_out_user')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByRole('button', {name: 'Login'}).click(); 

        await expect(page.getByText("Epic sadface: Sorry, this user has been locked out.")).toBeVisible();
    })

    test('LOG_SCN_001_TC_LOG_006 - Validasi bahwa login brehasil menggunakan username "problem_user"', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('problem_user')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByRole('button', {name: 'Login'}).click(); 

        await expect(page.locator("img[alt='Sauce Labs Backpack']")).toBeVisible();
    })

    test('LOG_SCN_001_TC_LOG_007 - Validasi bahwa login brehasil menggunakan username "performance_glitch_user"', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('performance_glitch_user')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByRole('button', {name: 'Login'}).click(); 

    })

    test('LOG_SCN_001_TC_LOG_008 - Validasi bahwa login brehasil menggunakan username "error_user"', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('error_user')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByRole('button', {name: 'Login'}).click(); 

    })

    test('LOG_SCN_001_TC_LOG_009 - Validasi bahwa login brehasil menggunakan username "visual_user"', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('visual_user')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByRole('button', {name: 'Login'}).click(); 

        await expect(page.locator("img[alt='Sauce Labs Backpack']")).toBeVisible();

    })

    test('LOG_SCN_001_TC_LOG_010 - Validasi bahwa login gagal menggunakan invalid username dan invalid password', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('invalid_user')
        await page.getByPlaceholder('Password').fill('invalid_password')
        await page.getByRole('button', {name: 'Login'}).click(); 

        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
    })

    test('LOG_SCN_001_TC_LOG_011 - Validasi bahwa login gagal menggunakan valid username dan invalid password', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByPlaceholder('Password').fill('invalid_password')
        await page.getByRole('button', {name: 'Login'}).click(); 

        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
    })

    test('LOG_SCN_001_TC_LOG_012 - Validasi bahwa login gagal menggunakan invalid username dan valid password', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('invalid_user')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByRole('button', {name: 'Login'}).click(); 

        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
    })

    test('LOG_SCN_001_TC_LOG_013 - Validasi bahwa login gagal menggunakan valid username dengan huruf kapital diawal', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('Standard_user')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByRole('button', {name: 'Login'}).click(); 

        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
    })

    test('LOG_SCN_001_TC_LOG_014 - Validasi bahwa login gagal menggunakan valid password dengan huruf kapital diawal', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByPlaceholder('Password').fill('Secret_sauce')
        await page.getByRole('button', {name: 'Login'}).click(); 

        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
    })

    test('LOG_SCN_001_TC_LOG_015 - Validasi bahwa login gagal menggunakan valid username dengan spasi diawal', async ({ page }) => {
        await page.getByPlaceholder('Username').fill(' standard_user')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByRole('button', {name: 'Login'}).click(); 

        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
    })

    test('LOG_SCN_001_TC_LOG_016 - Validasi bahwa login gagal menggunakan valid username dengan spasi diakhir', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user ')
        await page.getByPlaceholder('Password').fill('secret_sauce')
        await page.getByRole('button', {name: 'Login'}).click(); 

        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
    })
    test('LOG_SCN_001_TC_LOG_017 - Validasi bahwa login gagal menggunakan valid password dengan spasi diawal', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByPlaceholder('Password').fill(' secret_sauce')
        await page.getByRole('button', {name: 'Login'}).click(); 

        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
    })
    test('LOG_SCN_001_TC_LOG_018 - Validasi bahwa login gagal menggunakan valid username dengan spasi diakhir', async ({ page }) => {
        await page.getByPlaceholder('Username').fill('standard_user')
        await page.getByPlaceholder('Password').fill('secret_sauce ')
        await page.getByRole('button', {name: 'Login'}).click(); 

        await expect(page.getByText("Epic sadface: Username and password do not match any user in this service")).toBeVisible();
    })
})
