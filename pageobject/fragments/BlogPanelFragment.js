const {expect, chromium} = require('@playwright/test');

exports.BlogPannelFragment = class BlogPanelFragment {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.saveButton = page.locator('//a[contains(@class,"button is-medium-button")]');
        this.switcher = page.locator('label.switch');
    }

    async setPublishAndMakeFeaturePost() {
        // Select publishSwitcher
        await this.switcher.nth(1).waitFor({state: 'visible'});
        await this.switcher.nth(1).click();
        const isPublishSwitcherChecked = await this.switcher.nth(1).isChecked();
        expect(isPublishSwitcherChecked).toBe(true);

        await this.saveButton.waitFor({state: 'visible'});
        await this.saveButton.hover();

        // Select makeFeaturedPostSwitcher
        await this.switcher.nth(2).waitFor({state: 'visible'});
        await this.switcher.nth(2).click();
        const isMakeFeaturedPostSwitcher = await this.switcher.nth(2).isChecked();
        expect(isMakeFeaturedPostSwitcher).toBe(true);

        await this.saveButton.click();
    }
}