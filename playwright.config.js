import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    outputDir: 'test-results/',
    fullyParallel: true,
    timeout: 10000,
    workers: process.env.CI ? 1 : undefined,
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
            use: { ...devices['Desktop Firefox'] },
        },
    ],
    reporter: [
        ['list'],
        ['html'],
        ['junit', { outputFile: 'test-results/results.xml' }],
    ],

    // ✅ путь к файлу, а не импорт функции
    globalTeardown: './global-teardown.js',
});
