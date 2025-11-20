// reporter.js

class StatusReporter {
    onTestEnd(test, result) {
        if (result.status === 'failed') {
            process.env.TEST_STATUS = 'failed';
        }
    }
}

export default StatusReporter;
