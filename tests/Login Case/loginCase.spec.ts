import { test, expect, mergeExpects } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.open();
})

test.describe('Login Scenario', () => {
    test('LOG_SCN_001_TC_LOG_001 - Validasi bahwa Username tidak boleh kosong.', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('', 'secret_sauce');
        await loginPage.assertionWarningMessage('Epic sadface: Username is required');
    })

    test('LOG_SCN_001_TC_LOG_002 - Validasi bahwa Password tidak boleh kosong.', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('standard_user', '')
        await loginPage.assertionWarningMessage('Epic sadface: Password is required');
    })

    test('LOG_SCN_001_TC_LOG_003 - Validasi bahwa Username dan Password tidak boleh kosong.', async ({ page }) => { 
        const loginPage = new LoginPage(page);

        await loginPage.assertionWarningMessage('Epic sadface: Username is required');
        
    }) 

    test('LOG_SCN_001_TC_LOG_004 - Validasi bahwa login berhasil menggunakan valid username dan password.', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('standard_user', 'secret_sauce')
        await loginPage.assertionSuccess();
    })

    test('LOG_SCN_001_TC_LOG_005 - Validasi bahwa login gagal menggunakan username "locked_out_user"', async ({ page }) => {
        const loginPage = new LoginPage(page);

        loginPage.login('locked_out_user', 'secret_sauce')
        loginPage.assertionWarningMessage('Epic sadface: Sorry, this user has been locked out.')
    })

    test('LOG_SCN_001_TC_LOG_006 - Validasi bahwa login brehasil menggunakan username "problem_user"', async ({ page }) => {
        const loginPage = new LoginPage(page)

        loginPage.login('problem_user', 'secret_sauce')
        await loginPage.assertionSuccess();
    })

    test('LOG_SCN_001_TC_LOG_007 - Validasi bahwa login brehasil menggunakan username "performance_glitch_user"', async ({ page }) => {
        const loginPage = new LoginPage(page);

        loginPage.login('performance_glitch_user', 'secret_sauce')
        await loginPage.assertionSuccess();

    })

    test('LOG_SCN_001_TC_LOG_008 - Validasi bahwa login gagal menggunakan username "error_user"', async ({ page }) => {
        const loginPage = new LoginPage(page)

        loginPage.login('error_user', 'secret_sauce')
    })

    test('LOG_SCN_001_TC_LOG_009 - Validasi bahwa login brehasil menggunakan username "visual_user"', async ({ page }) => {
        const loginPage = new LoginPage(page);

        loginPage.login('visual_user', 'secret_sauce')
        await loginPage.assertionSuccess();

    })

    test('LOG_SCN_001_TC_LOG_010 - Validasi bahwa login gagal menggunakan invalid username dan invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page)

        loginPage.login('invalid_user', 'invalid_password')
        loginPage.assertionWarningMessage('Epic sadface: Username and password do not match any user in this service');
    })

    test('LOG_SCN_001_TC_LOG_011 - Validasi bahwa login gagal menggunakan valid username dan invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        loginPage.login('standard_user', 'invalid_password');
        loginPage.assertionWarningMessage('Epic sadface: Username and password do not match any user in this service');
    })

    test('LOG_SCN_001_TC_LOG_012 - Validasi bahwa login gagal menggunakan invalid username dan valid password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('invalid_user', 'secret_sauce')
        loginPage.assertionWarningMessage('Epic sadface: Username and password do not match any user in this service');    
    })

    test('LOG_SCN_001_TC_LOG_013 - Validasi bahwa login gagal menggunakan valid username dengan huruf kapital diawal', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('Standard_user', 'secret_sauce')
        loginPage.assertionWarningMessage('Epic sadface: Username and password do not match any user in this service');
    })

    test('LOG_SCN_001_TC_LOG_014 - Validasi bahwa login gagal menggunakan valid password dengan huruf kapital diawal', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('standard_user', 'Secret_sauce')
        loginPage.assertionWarningMessage('Epic sadface: Username and password do not match any user in this service');
    })

    test('LOG_SCN_001_TC_LOG_015 - Validasi bahwa login gagal menggunakan valid username dengan spasi diawal', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(' standard_user', 'secret_sauce')
        loginPage.assertionWarningMessage('Epic sadface: Username and password do not match any user in this service');
    })

    test('LOG_SCN_001_TC_LOG_016 - Validasi bahwa login gagal menggunakan valid username dengan spasi diakhir', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('standard_user ', 'secret_sauce')
        loginPage.assertionWarningMessage('Epic sadface: Username and password do not match any user in this service');
    })

    test('LOG_SCN_001_TC_LOG_017 - Validasi bahwa login gagal menggunakan valid password dengan spasi diawal', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('standard_user', ' secret_sauce')
        loginPage.assertionWarningMessage('Epic sadface: Username and password do not match any user in this service');
    })

    test('LOG_SCN_001_TC_LOG_018 - Validasi bahwa login gagal menggunakan valid password dengan spasi diakhir', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('standard_user', 'secret_sauce ')
        loginPage.assertionWarningMessage('Epic sadface: Username and password do not match any user in this service');
    })
})
