const {expect} = require('@playwright/test');
const config = require('./secure_data.spec');

exports.LoginPage = class LoginPage{

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.usernameInputField = page.locator('#Username');
        this.passwordInputField = page.locator('#Password');
        this.loginButton = page.locator('#loginbtn');
    }

    async makeLogin() {
        await this.page.goto('/');
        await this.usernameInputField.fill(config.credentials.username);
        await this.passwordInputField.fill(config.credentials.password);
        await this.loginButton.click();
        const homeUrl = this.page.url();
        expect(homeUrl).toBe('https://jamesroberts-trial.interactgo.com/');
    }
}