import {test} from '@playwright/test';

const {LoginPage} = require('../pageobject/pages/LoginPage');
const {HomePage} = require('../pageobject/pages/HomePage');
import {PostCreatePage} from "../pageobject/pages/PostCreatePage";
import {BlogPannelFragment} from "../pageobject/fragments/BlogPanelFragment";

const {ProfileMenuFragment} = require('../pageobject/fragments/ProfileMenuFragment');

import path from "path";

const postingBlogTestCases = [
    {title: 'Check png image uploading', filePath: path.resolve(__dirname, 'test_pictures/test_image.png')},
    {title: 'Check jpg image uploading', filePath: path.resolve(__dirname, 'test_pictures/test_image.jpg')},
    {title: 'Check gif image uploading', filePath: path.resolve(__dirname, 'test_pictures/test_image.gif')},
];

test.describe('Blog post feature', () => {
    test.beforeEach('User make a login', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.makeLogin();
    });

    postingBlogTestCases.forEach(({title, filePath}) => {
        test(`Add blog post test - ${title}`, async ({page}) => {
            const homePage = new HomePage(page);
            const postCreatePage = new PostCreatePage(page);
            const profileMenuFragment = new ProfileMenuFragment(page);
            const blogPanelFragment = new BlogPannelFragment(page);

            await homePage.navigateToTheProfileMenu();
            await profileMenuFragment.selectAddBlogPostOption();
            await postCreatePage.fillInBlogPostForm(filePath);
            await blogPanelFragment.setPublishAndMakeFeaturePost();
        });
    });
});