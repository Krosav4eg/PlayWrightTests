// global-teardown.js
import { sendSlackMessage } from './slack.js';

export default async function globalTeardown() {
    try {
        const buildUrl = process.env.CIRCLE_PIPELINE_NUMBER
            ? `https://app.circleci.com/pipelines/github/${process.env.CIRCLE_PROJECT_USERNAME}/${process.env.CIRCLE_PROJECT_REPONAME}/${process.env.CIRCLE_PIPELINE_NUMBER}`
            : 'Build URL not available';

        const message = `✅ Tests finished! 🎉\nCircleCI Job: ${buildUrl}`;

        await sendSlackMessage(message);
        console.log('Slack notification sent successfully.');
    } catch (error) {
        console.error('Error sending Slack notification:', error);
    }
}
