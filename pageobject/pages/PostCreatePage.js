const {expect} = require('@playwright/test');

exports.PostCreatePage = class PostCreatePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.fileInputButton = page.locator('input[qq-button-id]');
        this.backgroundImage = page.locator('img[alt="blog post background image"]');
        this.postTitleInputTextArea = page.locator('h1[role="textbox"]');
        this.postSummaryInputTextArea = page.locator('p[role="textbox"]');
        this.editorTool = page.locator('#cke_1_top');
        this.postBlogPostContentTextArea = page.locator('#blogPostBodyContent');
        this.continueButton = page.locator('li>a.is-primary');
    }

    async fillInBlogPostForm(file) {

        const EXPECTED_URLS_DATA = [
            '/Content/default/images/blog-placeholder-compressed.png',
            'blob:https://jamesroberts-trial.interactgo.com',
        ];

        const BLOG_POST_TEST_DATA = [
            'Test post title',
            'Test post summary',
            'Test blog content',
        ];

        await this.fileInputButton.setInputFiles(file);
        const attributeValue = await this.backgroundImage.getAttribute('src');
        expect(attributeValue).not.toContain(EXPECTED_URLS_DATA[0]);
        expect(attributeValue).toContain(EXPECTED_URLS_DATA[1]);

        await this.postTitleInputTextArea.click();
        await this.postTitleInputTextArea.fill(BLOG_POST_TEST_DATA[0]);
        await expect(this.postTitleInputTextArea).toHaveText(BLOG_POST_TEST_DATA[0]);

        await this.postSummaryInputTextArea.click();
        await this.postSummaryInputTextArea.fill(BLOG_POST_TEST_DATA[1])
        await expect(this.postSummaryInputTextArea).toHaveText(BLOG_POST_TEST_DATA[1]);

        await this.postBlogPostContentTextArea.click()
        await this.editorTool.waitFor({state: 'visible'});

        await this.postBlogPostContentTextArea.selectText();
        await this.page.keyboard.press('Backspace');
        await this.postBlogPostContentTextArea.fill(BLOG_POST_TEST_DATA[2]);
        await expect(this.postBlogPostContentTextArea).toHaveText(BLOG_POST_TEST_DATA[2]);

        await this.continueButton.waitFor({state: 'visible'});
        await this.continueButton.click();
    }
}