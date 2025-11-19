// slack.js
export async function sendSlackMessage(message) {
    const url = process.env.SLACK_WEBHOOK_URL;

    if (!url) {
        console.error("❌ SLACK_WEBHOOK_URL is not set");
        return;
    }

    await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: message })
    });
}
