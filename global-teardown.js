import fs from 'fs';
import path from 'path';
import { sendSlackMessage } from './slack.js';

export default async function globalTeardown() {
    try {
        const reportPath = path.join('playwright-report', 'results.json');

        let failed = false;

        if (fs.existsSync(reportPath)) {
            const results = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));

            // проверяем, есть ли хотя бы один упавший тест
            const hasFailed = results.suites?.some(suite =>
                suite.specs?.some(spec =>
                    spec.tests?.some(test =>
                        test.results?.some(r => r.status === 'failed')
                    )
                )
            );

            if (hasFailed) {
                failed = true;
            }
        } else {
            // если отчёта нет — считаем что упало
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
            ? `❌ *Tests FAILED!*\n${fullUrl}`
            : `✅ *All tests PASSED!* 🎉\n${fullUrl}`;

        await sendSlackMessage(message);

    } catch (error) {
        console.error("Slack error:", error);
    }
}
