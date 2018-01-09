// Karma configuration
// Generated on Fri Dec 08 2017 16:49:49 GMT+0200 (FLE Standard Time)

// https://github.com/karma-runner/karma-qunit/issues/92

const reporters = ['progress'];

module.exports = function(config) {

  if (config.singleRun) {
    // when running with `--singleRun=true` instrument:
    reporters.push("coverage");
  }

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
      { pattern: "node_modules/jquery/dist/jquery.js", included: true, watched: false },
      // TODO: because.. jquery-ui package has no bundle
      { pattern: `http://code.jquery.com/ui/1.12.1/jquery-ui${ config.singleRun ? ".min" : "" }.js`, included: true, watched: false },

      // TODO: Explicit expand and load in order from config?
      { pattern: "src/js/**/*", included: false, served: true },
      { pattern: "src/css/**/*", included: false, served: true },

      "tests/test-patch.js",
      "tests/unit/common/test-util.js",

      // These get included in the test run file, alternatively https://stackoverflow.com/a/16414357 ?
      //'tests/unit/**/*test*.htm*'
      "tests/unit/colorpicker/tests.html",
      "tests/unit/editors/checkboxEditor/tests.html",
      "tests/unit/colorpickersplitbutton/tests.html",
      "tests/unit/zoombar/tests.html"
      //"tests/*-test.js"
    ],
    proxies: {
      //"bower_components/qunit/**/*.js": "/node_modules/qunitjs/qunit/qunit.js"
    },

    client: {
      clearContext: false,
      qunit: {
        // https://api.qunitjs.com/config/QUnit.config
        autostart: false,
        //reorder: false,
        showUI: true,
        testTimeout: 5000,
        fixture: "#qunit-fixture" //https://github.com/karma-runner/karma-qunit/issues/18
      }
    },

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "src/**/*.js": "coverage"
    },

    // https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md
    coverageReporter: {
      dir : 'coverage/',
      reporters: [
        {  
          type : 'lcov',
          subdir: '.' // default outputs per-browser folders 
        },
        { type: 'text-summary' }
      ],
      includeAllSources: true
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: reporters,


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
  });
};
