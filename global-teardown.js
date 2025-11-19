import { sendSlackMessage } from './slack.js';

export default async function globalTeardown() {
    const reportUrl = process.env.CIRCLE_BUILD_NUM
        ? `https://app.circleci.com/pipelines/${process.env.CIRCLE_PROJECT_USERNAME}/${process.env.CIRCLE_PROJECT_REPONAME}/${process.env.CIRCLE_BUILD_NUM}/artifacts/0/playwright-report/index.html`
        : 'HTML report not available';

    await sendSlackMessage(`Tests finished! 🎉\nHTML report: ${reportUrl}`);
}
