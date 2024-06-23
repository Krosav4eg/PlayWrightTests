const {expect} = require('@playwright/test');

exports.ProfileMenuFragment = class ProfileMenuFragment {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.addBlogPostOption = page.locator('a[href="/blog/post/create/347"]');
    }

    async selectAddBlogPostOption() {
        const EXPECTED_DATA = [
            '/blog/post/create/347'
        ];
        await this.addBlogPostOption.waitFor({state: 'visible'});
        await this.addBlogPostOption.click();
        await this.page.waitForLoadState('load');
        const homeUrl = this.page.url();
        expect(homeUrl).toContain(EXPECTED_DATA[0]);   }
}