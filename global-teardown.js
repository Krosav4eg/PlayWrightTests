// global-teardown.js
import { sendSlackMessage } from './slack.js';
import fs from 'fs';

export default async function globalTeardown() {
    try {
        // --------------------------------------------------
        // Определяем был ли fail через JUnit XML
        // --------------------------------------------------
        const resultsPath = 'test-results/results.xml';
        let failed = false;

        if (fs.existsSync(resultsPath)) {
            const xml = fs.readFileSync(resultsPath, 'utf8');
            failed = xml.includes('<failure') || xml.includes('<error');
        }

        // --------------------------------------------------
        // Формируем ссылку на BUILD (нужная ссылка!)
        // --------------------------------------------------
        const buildUrl = `https://app.circleci.com/pipelines/github/${process.env.CIRCLE_PROJECT_USERNAME}/${process.env.CIRCLE_PROJECT_REPONAME}/${process.env.CIRCLE_BUILD_NUM}`;

        const icon = failed ? '❌' : '✅';
        const text = failed ? 'Tests FAILED!' : 'Tests finished successfully! 🎉';

        const message = `${icon} ${text}\nBuild: ${buildUrl}`;

        await sendSlackMessage(message);

    } catch (error) {
        console.error("❌ Error in global teardown:", error);
    }
}
