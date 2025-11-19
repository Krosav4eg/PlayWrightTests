// global-teardown.js
import { sendSlackMessage } from './slack.js';

export default async function globalTeardown() {
    try {
        const username = process.env.CIRCLE_PROJECT_USERNAME || 'unknown-user';
        const repo = process.env.CIRCLE_PROJECT_REPONAME || 'unknown-repo';

        // Используем pipeline number, если доступен, иначе fallback на job number
        const buildUrl = process.env.CIRCLE_PIPELINE_NUMBER
            ? `https://app.circleci.com/pipelines/github/${username}/${repo}/${process.env.CIRCLE_PIPELINE_NUMBER}`
            : process.env.CIRCLE_BUILD_NUM
                ? `https://app.circleci.com/pipelines/github/${username}/${repo}/jobs/${process.env.CIRCLE_BUILD_NUM}`
                : 'Build URL not available';

        const message = `✅ Tests finished! 🎉\nCircleCI Job: ${buildUrl}`;

        await sendSlackMessage(message);
        console.log('Slack notification sent successfully.');
    } catch (error) {
        console.error('Error sending Slack notification:', error);
    }
}
