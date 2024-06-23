const {expect} = require('@playwright/test');
const config = require('../secure_data');

exports.LoginPage = class LoginPage {

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

        const EXPECTED_URL_DATA = [
            'https://jamesroberts-trial.interactgo.com/'
        ];
        await this.page.goto('/');
        await this.usernameInputField.fill(config.credentials.username);
        await this.passwordInputField.fill(config.credentials.password);
        await this.loginButton.waitFor({state: 'visible'});
        await this.loginButton.click();
        const homeUrl = this.page.url();
        expect(homeUrl).toBe(EXPECTED_URL_DATA[0]);
    }
}