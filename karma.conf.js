// Karma configuration
// Generated on Fri Dec 08 2017 16:49:49 GMT+0200 (FLE Standard Time)

const filesConfig = require("./build/packages/combined-files");
const glob = require("glob");


// https://github.com/karma-runner/karma-qunit/issues/92

const reporters = ["spec"];
let testPath = "**";

// proxy entries need to be full file paths (no glob support)
let proxies = glob.sync("src/js/**/*.js")
  .map((x) => "/base/mock/" + x)
  .reduce((obj, val) => {
    obj[val] = "/base/tests/unit/loader/empty.js";
    return obj;
  }, {});

const cssProxies = glob.sync("src/css/**/*.css")
  .map((x) => "/base/mock/" + x)
  .reduce((obj, val) => {
    obj[val] = "/base/tests/unit/loader/empty.css";
    return obj;
  }, {});

proxies = Object.assign(proxies, cssProxies);


module.exports = function (config) {

  if (config.singleRun) {
    // when running with `--singleRun=true` instrument:
    reporters.push("coverage");
  }


  // When passed as `--testPath integration` https://github.com/karma-runner/karma/issues/672#issuecomment-204620473
  if (config.testPath) {
    testPath = config.testPath;
  }
  console.log(`RUNNING tests under: "tests/${testPath}/*-test.js"`);

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: ".",


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["qunit"],


    // list of files / patterns to load in the browser
    files: [
      // http://karma-runner.github.io/1.0/config/files.html
      // serve resources
      { pattern: "node_modules/jquery/dist/jquery.js", included: true, watched: false },
      // TODO: because.. jquery-ui package has no bundle
      { pattern: `http://code.jquery.com/ui/1.13.0/jquery-ui${config.singleRun ? ".min" : ""}.js`, included: true, watched: false },
      { pattern: "node_modules/jquery-mockjax/dist/jquery.mockjax.min.js", included: true, watched: false },
      { pattern: "node_modules/knockout/build/output/knockout-latest.debug.js", included: true, watched: false },

      "src/css/themes/infragistics/infragistics.theme.css",
      "src/css/structure/modules/*.css",
      { pattern: "src/css/**/*", included: false, served: true },

      // Load locale files:
      "src/js/modules/i18n/*-en.js",
      "src/js/modules/i18n/*-ja.js",
      "src/js/modules/i18n/*-bg.js",
      "src/js/modules/i18n/*-de.js",
      "src/js/modules/i18n/*-es.js",
      "src/js/modules/i18n/*-fr.js",

      "src/js/infragistics.loader.js",
      // core and LoB files:
      ...filesConfig.coreBundle("src"),
      ...filesConfig.lobBundle("src"),
      "src/js/extensions/infragistics.ui.*.knockout-extensions.js",

      //"src/js/modules/i18n/regional/infragistics.ui.regional-i18n.js",
      "src/js/modules/i18n/regional/infragistics.ui.regional-ja.js",
      "src/js/modules/i18n/regional/infragistics.ui.regional-de.js",
      "src/js/modules/i18n/regional/infragistics.ui.regional-fr.js",
      "src/js/modules/i18n/regional/infragistics.ui.regional-bg.js",
      "src/js/modules/i18n/regional/infragistics.ui.regional-es.js",
      "src/js/modules/i18n/regional/infragistics.ui.regional-en.js", // Must be last so EN can stay default

      // DV files for zoombar tests:
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/css/structure/modules/infragistics.ui.chart.css", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/i18n/infragistics.dvcommonwidget-en.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.ext_core.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.ext_collections.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.ext_ui.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.dv_core.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.dv_geometry.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.datachart_core.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.datachart_categorycore.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.dv_jquerydom.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.dvcommonwidget.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.ui.chart.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.ui.chartlegend.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.datachart_category.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.datachart_rangecategory.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.datachart_verticalcategory.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.datachart_financial.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.datachart_extendedfinancial.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.datachart_extendedaxes.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.datachart_polar.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.datachart_radial.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.datachart_scatter.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.datachart_stacked.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.datachart_annotation.js", included: true, watched: false },
      { pattern: "http://cdn-na.infragistics.com/igniteui/latest/js/modules/infragistics.datachart_interactivity.js", included: true, watched: false },
      "http://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.js",
      "tests/unit/common/test-util.js",
      "tests/unit/videoplayer/mockVideo.js",
      "tests/unit/common/simInteractions.js",
      "tests/test-patch.js",
      "tests/unit/splitter/jquery.simulate.js",
      "tests/unit/upload/mockServerUpload.js",

      { pattern: "tests/unit/loader/empty.*", included: false, served: true, watched: false },
      { pattern: "tests/unit/tree/data/*", included: false, served: true, watched: false },
      { pattern: "tests/unit/tree/images/*", included: false, served: true, watched: false },
      { pattern: "tests/unit/tilemanager/tilemanager/assets/*", included: false, served: true, watched: false },

      // Data files
      "tests/unit/templating/DB3.js",
      "tests/unit/combo/sample-data/local-data.js",
      "tests/unit/combo/sample-data/remote-data.js",

      // Test files:
      //"tests/unit/**/*test*.htm*"
      `tests/${testPath}/*-test?(s).js`
    ],
    // https://github.com/karma-runner/karma/issues/421#issuecomment-336284122
    crossOriginAttribute: false,
    proxies: proxies,
    browserDisconnectTolerance: 3,
    browserDisconnectTimeout: 10000,
    browserNoActivityTimeout: 20000,

    client: {
      clearContext: false,
      qunit: {
        // https://api.qunitjs.com/config/QUnit.config
        autostart: false,
        //reorder: false,
        showUI: true,
        testTimeout: 10000,
        //fixture: "#qunit-fixture" //https://github.com/karma-runner/karma-qunit/issues/18
      }
    },

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "src/js/infragistics.loader.js": "coverage",
      "src/js/modules/*.js": "coverage",
      "src/js/extensions/*.js": "coverage"
    },

    // https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md
    coverageReporter: {
      dir: "coverage/",
      reporters: [
        {
          type: "lcov",
          subdir: "." // default outputs per-browser folders
        },
        { type: "text-summary" }
      ],
      includeAllSources: true
    },

    // test results reporter to use
    // possible values: "dots", "progress"
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: reporters,
    specReporter: {
      maxLogLines: 15,              // limit number of lines logged per test
      suppressErrorSummary: false,  // do not print error summary
      suppressSkipped: false,       // do not print information about skipped tests
      showSpecTiming: true,        // print the time elapsed for each spec
      failFast: false               // test would finish on first fail
    },

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
    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  });
};
