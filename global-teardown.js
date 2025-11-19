// global-teardown.js
import { sendSlackMessage } from './slack.js';

export default async function globalTeardown() {
    try {
        // Ссылка на текущий билд
        const buildUrl = process.env.CIRCLE_BUILD_NUM
            ? `https://app.circleci.com/pipelines/github/${process.env.CIRCLE_PROJECT_USERNAME}/${process.env.CIRCLE_PROJECT_REPONAME}/${process.env.CIRCLE_BUILD_NUM}`
            : 'Build URL not available';

        const message = `✅ Tests finished! 🎉\nCircleCI Job: ${buildUrl}`;

        await sendSlackMessage(message);
        console.log('Slack notification sent successfully.');
    } catch (error) {
        console.error('Error sending Slack notification:', error);
    }
}
