// global-teardown.js
import { sendSlackMessage } from './slack.js';

export default async function globalTeardown() {
    try {
        const username = process.env.CIRCLE_PROJECT_USERNAME || 'unknown-user';
        const repo = process.env.CIRCLE_PROJECT_REPONAME || 'unknown-repo';
        const pipelineNumber = process.env.CIRCLE_PIPELINE_NUMBER; // build number

        // Корректная ссылка на pipeline (именно build number)
        const buildUrl = pipelineNumber
            ? `https://app.circleci.com/pipelines/github/${username}/${repo}/${pipelineNumber}`
            : 'Build URL not available';

        const didFail = process.env.TEST_STATUS === 'failed';

        const message = didFail
            ? `❌ *Tests FAILED!* \nPipeline: ${buildUrl}`
            : `✅ *Tests finished successfully!* 🎉\nPipeline: ${buildUrl}`;

        await sendSlackMessage(message);
        console.log('Slack notification sent.');
    } catch (error) {
        console.error('Error sending Slack notification:', error);
    }
}
