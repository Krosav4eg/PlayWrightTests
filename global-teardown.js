// global-teardown.js
import { sendSlackMessage } from './slack.js';

export default async function globalTeardown() {
    try {
        const username = process.env.CIRCLE_PROJECT_USERNAME || 'unknown-user';
        const repo = process.env.CIRCLE_PROJECT_REPONAME || 'unknown-repo';

        // Формируем URL пайплайна или job (fallback)
        const buildUrl = process.env.CIRCLE_PIPELINE_NUMBER
            ? `https://app.circleci.com/pipelines/github/${username}/${repo}/${process.env.CIRCLE_PIPELINE_NUMBER}`
            : process.env.CIRCLE_BUILD_NUM
                ? `https://app.circleci.com/pipelines/github/${username}/${repo}/jobs/${process.env.CIRCLE_BUILD_NUM}`
                : 'Build URL not available';

        // Проверяем, упали ли тесты
        const isFailed =
            process.env.PLAYWRIGHT_FAILED === 'true' ||
            process.env.PW_TEST_FAILED === '1';

        const message = isFailed
            ? `❌ *Tests FAILED!* 🔥\nPipeline/Job: ${buildUrl}`
            : `✅ Tests finished successfully! 🎉\nPipeline/Job: ${buildUrl}`;

        await sendSlackMessage(message);
        console.log('Slack notification sent successfully.');
    } catch (error) {
        console.error('Error sending Slack notification:', error);
    }
}
