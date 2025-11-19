import {test} from '@playwright/test';

import {LoginPage} from '../pageobject/pages/LoginPage';
import {HomePage} from '../pageobject/pages/HomePage';
import {PostCreatePage} from '../pageobject/pages/PostCreatePage';
import {BlogPanelFragment} from '../pageobject/fragments/BlogPanelFragment';
import {ProfileMenuFragment} from '../pageobject/fragments/ProfileMenuFragment';

import path from 'path';
import { fileURLToPath } from 'url';

// получаем путь к текущему файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// теперь можно использовать __dirname
const postingBlogTestCases = [
    { title: 'Check png image uploading', filePath: path.resolve(__dirname, 'test_pictures/test_image.png') },
    { title: 'Check jpg image uploading', filePath: path.resolve(__dirname, 'test_pictures/test_image.jpg') },
    { title: 'Check gif image uploading', filePath: path.resolve(__dirname, 'test_pictures/test_image.gif') },
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
            const blogPanelFragment = new BlogPanelFragment(page);

            await homePage.navigateToTheProfileMenu();
            await profileMenuFragment.selectAddBlogPostOption();
            await postCreatePage.fillInBlogPostForm(filePath);
            await blogPanelFragment.setPublishAndMakeFeaturePost();
        });
    });
});