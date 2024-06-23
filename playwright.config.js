// @ts-check
const {defineConfig, devices} = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    testDir: './tests',
    outputDir: 'test-results/',
    /* Run tests in files in parallel */
    fullyParallel: true,
    timeout: 40000,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 3 : undefined,
    // /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    // reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'https://jamesroberts-trial.interactgo.com/',
        video: 'on-first-retry',
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry',
    },
    // Emulates the user locale.
    locale: 'en-GB',

    // Grants specified permissions to the browser context.
    permissions: ['geolocation'],

    // Emulates the user timezone.
    timezoneId: 'Europe/London',
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {
                browserName: 'chromium',
                channel: 'chrome', // This ensures the tests run in Google Chrome
                // headless: false, // Uncomment if you need to run in headless mode
            }
        },

        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },
        //
        // {
        //     name: 'webkit',
        //     use: {...devices['Desktop Safari']},
        // },
    ],
    reporter: [
        ['list'], // Display results in the console
        ['html'],
        ['junit', { outputFile: 'test-results/results.xml' }], // Generate JUnit XML report
    ],
});

