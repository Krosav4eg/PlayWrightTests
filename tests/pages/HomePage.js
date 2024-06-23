const {expect} = require('@playwright/test');

exports.HomePage = class HomePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.profileMenuIcon = page.locator('#profile-alerts');
    }

    async navigateToTheProfileMenu() {
        await this.profileMenuIcon.waitFor({state: 'visible'});
        await this.profileMenuIcon.click();
    }
}