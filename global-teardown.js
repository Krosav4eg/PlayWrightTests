// global-teardown.js
import { sendSlackMessage } from './slack.js';

export default async function globalTeardown() {
    try {
        // Формируем прямую ссылку на HTML-отчёт CircleCI
        const reportUrl = process.env.CIRCLE_WORKFLOW_JOB_ID
            ? `https://output.circle-artifacts.com/output/${process.env.CIRCLE_WORKFLOW_JOB_ID}/artifacts/0/playwright-report/index.html`
            : 'HTML report not available';

        // Сообщение для Slack
        const message = `✅ Tests finished! 🎉\nHTML report: ${reportUrl}`;

        // Отправляем в Slack
        await sendSlackMessage(message);

        console.log('Slack notification sent successfully.');
    } catch (error) {
        console.error('Error sending Slack notification:', error);
    }
}
