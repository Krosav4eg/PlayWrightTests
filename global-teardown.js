// global-teardown.js
import fs from 'fs';
import path from 'path';
import { sendSlackMessage } from './slack.js';

export default async function globalTeardown() {
    try {
        const reportPath = path.join('playwright-report', 'results.json');

        let failed = false;

        if (fs.existsSync(reportPath)) {
            const results = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

            // Если общий статус failed
            if (results.status === 'failed') {
                failed = true;
            }

            // Если какой-то тест failed
            if (Array.isArray(results.tests)) {
                if (results.tests.some(t => t.status === 'failed')) {
                    failed = true;
                }
            }
        } else {
            // Если Playwright не создал отчёт — считаем что падение
            failed = true;
        }

        // CircleCI env
        const username = process.env.CIRCLE_PROJECT_USERNAME;
        const repo = process.env.CIRCLE_PROJECT_REPONAME;
        const pipeline = process.env.CIRCLE_PIPELINE_NUMBER;
        const workflow = process.env.CIRCLE_WORKFLOW_ID;
        const job = process.env.CIRCLE_BUILD_NUM;

        const fullUrl =
            `https://app.circleci.com/pipelines/github/${username}/${repo}/${pipeline}/workflows/${workflow}/jobs/${job}`;

        const message = failed
            ? `❌ *Tests failed!*\n${fullUrl}`
            : `✅ Tests finished successfully! 🎉\n${fullUrl}`;

        await sendSlackMessage(message);

    } catch (error) {
        console.error("Slack error:", error);
    }
}
