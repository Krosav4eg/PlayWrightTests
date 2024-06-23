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
        await this.addBlogPostOption.click();
        await this.page.waitForLoadState('load');
        // await expect( this.page.title()).toBe('Interact Blog - Interact');
        await expect(this.page).toHaveURL('/blog/post/create/347');
   }
}