exports.config = {
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            args: ['--disable-web-security']
        }
    },
    baseUrl: 'http://localhost:8100',
    specs: [
        'e2e-tests/**/*.tests.js'
    ],
    jasmineNodeOpts: {
        isVerbose: true
    },
    onPrepare: function() {
        require('protractor-http-mock').config = {
            protractorConfig: 'e2e-tests.conf.js'
        };
    }
};
