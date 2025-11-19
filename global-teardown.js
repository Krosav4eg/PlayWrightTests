// global-teardown.js
import { sendSlackMessage } from './slack.js';

export default async function globalTeardown() {
    try {
        // Используем прямую ссылку на HTML-отчёт из CircleCI
        const reportUrl = process.env.HTML_REPORT_URL || 'HTML report not available';

        // Формируем сообщение для Slack
        const message = `✅ Tests finished! 🎉\nHTML report: ${reportUrl}`;

        // Отправляем в Slack
        await sendSlackMessage(message);

        console.log('Slack notification sent successfully.');
    } catch (error) {
        console.error('Error sending Slack notification:', error);
    }
}
