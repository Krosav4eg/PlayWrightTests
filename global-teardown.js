// global-teardown.js
import { sendSlackMessage } from './slack.js';

export default async function globalTeardown() {
    try {
        const username = process.env.CIRCLE_PROJECT_USERNAME;
        const repo = process.env.CIRCLE_PROJECT_REPONAME;

        const pipelineNumber = process.env.CIRCLE_PIPELINE_NUMBER;
        const workflowId = process.env.CIRCLE_WORKFLOW_ID;
        const jobNumber = process.env.CIRCLE_BUILD_NUM;

        const didFail = process.env.TEST_STATUS === 'failed';

        // Полная ссылка
        const buildUrl = `https://app.circleci.com/pipelines/github/${username}/${repo}/${pipelineNumber}/workflows/${workflowId}/jobs/${jobNumber}`;

        const message = didFail
            ? `❌ *Tests FAILED!* \n${buildUrl}`
            : `✅ *Tests finished successfully!* 🎉\n${buildUrl}`;

        await sendSlackMessage(message);
        console.log("Slack message sent:", message);
    } catch (error) {
        console.error("Error in globalTeardown:", error);
    }
}