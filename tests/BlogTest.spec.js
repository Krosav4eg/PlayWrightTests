import {test, expect} from '@playwright/test';
const path = require('path');
const {LoginPage} = require('./LoginPage');


test.beforeEach('User make a login',async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.makeLogin();
});

test('Add blog post test', async ({page}) => {

    const profileMenuIcon = await page.locator('#profile-alerts');
    await profileMenuIcon.click();
    const addBlogPostOption = await page.locator('a[href="/blog/post/create/347"]');
    await addBlogPostOption.click();
    const createNewBlogPostUrl = page.url();
    expect(createNewBlogPostUrl).toBe('https://jamesroberts-trial.interactgo.com/blog/post/create/347');

    // Path to the image file
    const filePath = path.resolve(__dirname, 'test_image.png'); // Adjust the path to your image
    // Locate the file input element
    const fileInputButton = await page.locator('input[qq-button-id]');
    // Set the file input with the image file
    await fileInputButton.setInputFiles(filePath);
    const postTitleInputTextArea = await page.locator('h1[role="textbox"]');
    await postTitleInputTextArea.click()
    await postTitleInputTextArea.fill('Test post title')
    const postSummaryInputTextArea = await page.locator('p[role="textbox"]');
    await postSummaryInputTextArea.click()
    await postSummaryInputTextArea.fill('Test post summary')
    const postBlogPostContentTextArea = await page.locator('#blogPostBodyContent');
    await postBlogPostContentTextArea.click()

    await postBlogPostContentTextArea.selectText();
    await page.keyboard.press('Backspace');
    await postBlogPostContentTextArea.fill('!!!!!!!!!!!!!!!!Test blog content!!!!!!!!!!!!!!');

    await expect(postBlogPostContentTextArea).toHaveText('!!!!!!!!!!!!!!!!Test blog content!!!!!!!!!!!!!!');

    const continueButton = await page.locator('a[aria-label="Continue"]');
    await continueButton.click();
    const saveButton = await page.locator('//a[text()="Save"]');
    const publishSwitcher = await page.locator('(//label[@class="switch"])[2]');
    await publishSwitcher.click();
    // Check if the switcher is selected
    const isChecked1 = await publishSwitcher.isChecked();
    // Assert that the switcher is not selected initially
    expect(isChecked1).toBe(true);
    await saveButton.hover();
    const makeFeaturedPostSwitch = await page.locator('(//label[@class="switch"])[3]');
    await makeFeaturedPostSwitch.click();
    const isChecked2 = await makeFeaturedPostSwitch.isChecked();
    // Assert that the switcher is not selected initially
    expect(isChecked2).toBe(true);
    await saveButton.click();
    const backgroundImage = await page.locator('img[alt="blog post background image"]');
    // Check if the element has the attribute
    const attributeValue = await backgroundImage.getAttribute('src');
    // Assert that the attribute exists and has a specific value
    expect(attributeValue).not.toContain('/Content/default/images/blog-placeholder-compressed.png');
    expect(attributeValue).toContain('blob:https://jamesroberts-trial.interactgo.com');
});