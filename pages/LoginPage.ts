import { Page, Locator, expect } from "@playwright/test";
import { measureMemory } from "vm";

export class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly warningMessage: Locator;
    readonly warningSuccess: Locator;


    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.getByRole('textbox', { name: 'Username' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button');
        this.warningMessage = page.getByText('Epic sadface: Username is required');
        this.warningSuccess = page.getByText('Products');
    }

    async open(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username: string, password: string){
        if (username){
            await this.usernameField.fill(username);
        }
        
        if (password){
            await this.passwordField.fill(password);
        }
        await this.loginButton.click();
    }

    async assertionWarningMessage(message: string){
        await expect(this.warningMessage).toHaveText(message);
    }

    async assertionSuccess(){
        await expect(this.warningSuccess).toBeVisible();
    }
}