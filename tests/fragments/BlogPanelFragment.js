const {expect, chromium} = require('@playwright/test');

exports.BlogPannelFragment = class BlogPanelFragment {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.saveButton = page.locator('//a[text()="Save"]');
        this.publishSwitcher = page.locator('(//label[@class="switch"])[2]');//намного лучше юзать при интернационализации
        this.makeFeaturedPostSwitcher = page.locator('(//label[@class="switch"])[3]');
    }

    async setPublishAndMakeFeaturePost() {
        await this.publishSwitcher.waitFor({ state: 'visible' });
        await this.publishSwitcher.click();
        const isPublishSwitcherChecked = await this.publishSwitcher.isChecked();
        expect(isPublishSwitcherChecked).toBe(true);
        await this.saveButton.waitFor({ state: 'visible' });
        await this.saveButton.hover();
        await this.makeFeaturedPostSwitcher.waitFor({ state: 'visible' });
        await this.makeFeaturedPostSwitcher.click();
        const isMakeFeaturedPostSwitcher = await this.makeFeaturedPostSwitcher.isChecked();
        expect(isMakeFeaturedPostSwitcher).toBe(true);
        await this.saveButton.click();
        // const postUrl = this.page.url();
        // expect(postUrl).toContain('https://jamesroberts-trial.interactgo.com/blog/');
    }
}