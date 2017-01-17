const webpackConfig = require('./webpack.config');

module.exports = (config) => {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'source-map-support'],
        files: [
            'node_modules/es6-promise/dist/es6-promise.auto.js',
            'src/test.ts'
        ],
        preprocessors: {
            'src/test.ts': ['webpack']
        },
        webpack: {
            resolve: webpackConfig.resolve,
            module: webpackConfig.module
        },
        webpackServer: { noInfo: true },
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true
    });
};
