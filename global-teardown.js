// global-teardown.js
import { sendSlackMessage } from './slack.js';

export default async function globalTeardown() {
    await sendSlackMessage('Tests finished! 🎉');
}
