const {defineConfig, devices} = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    outputDir: 'test-results/',
    fullyParallel: true,
    timeout: 40000,
    workers: process.env.CI ? 3 : undefined,
    use: {
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
        ignoreHTTPSErrors: true,
    },
    locale: 'en-GB',
    permissions: ['geolocation'],
    timezoneId: 'Europe/London',
    projects: [
        {
            name: 'chromium',
            headless: false,
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: {...devices['Desktop Firefox']},
        },
    ],
    reporter: [
        ['list'],
        ['html'],
        ['junit', {outputFile: 'test-results/results.xml'}],
    ],
});