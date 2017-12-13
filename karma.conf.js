// Karma configuration
// Generated on Fri Dec 08 2017 16:49:49 GMT+0200 (FLE Standard Time)

// https://github.com/karma-runner/karma-qunit/issues/92

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['qunit'],


    // list of files / patterns to load in the browser
    files: [
      // http://karma-runner.github.io/1.0/config/files.html
      // serve resources
      { pattern: "src/js/**/*", included: false, served: true },
      { pattern: "src/css/**/*", included: false, served: true },
      // { pattern: "bower_components/qunit/**/*", included: false, served: true },
      { pattern: "bower_components/jquery/**/*", included: false, served: true },
      { pattern: "bower_components/jquery-tmpl/*", included: false, served: true },
      { pattern: "bower_components/jquery-ui/**/*", included: false, served: true },

      // load HTML beds?
      //'tests/unit/**/*test*.htm*'
      "tests/unit/colorpicker/tests.html"
    ],
    proxies: {
      "bower_components/qunit/**/*.js": "/node_modules/qunitjs/qunit/qunit.js",
      "bower_components/qunit/**/*.css": "/node_modules/qunitjs/qunit/qunit.css"
    },

    client: {
      clearContext: false,
      qunit: {
        // https://api.qunitjs.com/config/QUnit.config
        autostart: false,
        //reorder: false,
        showUI: true,
        testTimeout: 5000,
        fixture: "#qunit-fixture" // does this trigger .html file handling?
      }
    },

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "src/js/**/*.js": "coverage"
    },

    // https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md
    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/',
      subdir: '.', // default outputs per-browser folders
      includeAllSources: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


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
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
