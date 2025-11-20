// slack.js
import fetch from 'node-fetch';

export async function sendSlackMessage(message) {
    const url = process.env.SLACK_WEBHOOK_URL;

    if (!url) {
        console.error("❌ SLACK_WEBHOOK_URL is not set");
        return;
    }

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: message }),
        });

        if (!res.ok) {
            console.error(`❌ Failed to send Slack message: ${res.status} ${res.statusText}`);
        } else {
            console.log("✅ Slack message sent successfully.");
        }
    } catch (error) {
        console.error("❌ Error sending Slack message:", error);
    }
}
