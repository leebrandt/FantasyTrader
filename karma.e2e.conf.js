// Karma configuration
// Generated on Wed Mar 11 2015 12:24:31 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['ng-scenario'],

    // list of files / patterns to load in the browser
    files: [
      'src/lib/jquery/dist/jquery.min.js',
      //'src/lib/angular/angular.min.js',
      'src/lib/angular-mocks/angular-mocks.js',
      'src/lib/ui-router/release/angular-ui-router.min.js',
      'src/lib/angular-bootstrap/ui-bootstrap.min.js',
      'src/lib/lodash/lodash.min.js',
      'src/lib/angular-recaptcha/release/angular-recaptcha.min.js',
      'src/lib/snapjs/snap.min.js',
      'src/lib/angular-snap/angular-snap.min.js',
      'src/lib/moment/moment.js',
      'src/lib/twix/bin/twix.min.js',
      'src/app.js',
      'src/fakeData.js',
      'src/modules/**/*.module.js',
      'src/modules/**/*.js',
      'tests/**/*.js'
    ],

    // Proxy the root path to the location of app server
    proxies: {
      '/': 'http://localhost:3000/'
    },

    plugins: [
        'karma-jasmine',
        'karma-phantomjs-launcher',
        'karma-chrome-launcher',
        'karma-ng-scenario',
    ],

    urlRoot: '/_karma_/',

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
