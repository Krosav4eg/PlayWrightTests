import { sendSlackMessage } from "./tests/slack.js";

export default async function globalTeardown() {
    await sendSlackMessage("Playwright: тесты завершены 🟢");
}
