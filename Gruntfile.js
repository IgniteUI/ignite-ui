var config = {
	scripts: "src/js/**/*.js",
	scriptsDir: "src/js",
	modulesDir: "src/js/modules",
	extensions: "src/js/extensions/**/*.js",
	extensionsDir: "src/js/extensions",
	devTests: "tests/unit/**/*test*.htm*",
	devTestsDir: "tests/unit",
	currentBuildNumberPrefix: "16.2.20162.",
	currentBuildNumberPrefixCI: "2016.2"
};

module.exports = function (grunt) {
	grunt.initConfig({
		config: config,
		pkg: grunt.file.readJSON("package.json"),
		jshint: {
			all: grunt.file.readJSON('build/config/all/jshint.json').config,
			options: {
				jshintrc: true,
				// reporter: "build/ReporterJSHint.js",
				// reporterOutput: "jshint/report.html",
				ignores: grunt.file.readJSON('build/config/all/jshintIgnore.json').config
			}
		},
		jscs: {
			src: grunt.file.readJSON('build/config/all/jshint.json').config,
			options: {
				config: ".jscsrc.json",
				reporter: "build/ReporterJSCS.js",
				reporterOutput: "jscs/report.html",
				force: false,
				maxErrors: null,
				excludeFiles: grunt.file.readJSON('build/config/all/jshintIgnore.json').config
			}
		},
		qunit: {
			all: ["<%= config.devTests%>"],
			options: {
				force: false,
				"--web-security": "no",
				coverage: {
					src: grunt.file.readJSON('build/config/all/instrument.json').config,
					instrumentedFiles: "src/instrumentedFiles",
					htmlReport: "coverage/reportHTML",
					lcovReport: "coverage/reportLCOV",
					disposeCollector: true,
					reportOnFail: true,
					linesThresholdPct: 0,
					statementsThresholdPct: 0,
					functionsThresholdPct: 0,
					branchesThresholdPct: 0
				},
				page: {
					viewportSize: { width: 1600, height: 800 }
				}
			}
		},
		clean: {
			jshint: ["jshint"],
			jscs: ["jscs"],
			tests: ["qunit", "coverage", "instrumentedFiles"]
		},
		coveralls: {
			// LCOV coverage file (can be string, glob or array)
			src: './coverage/reportLCOV/*.info',
			// Options relevant to all targets
			options: {
				// When true, grunt-coveralls will only print a warning rather than
				// an error, to prevent CI builds from failing unnecessarily (e.g. if
				// coveralls.io is down). Optional, defaults to false.
				force: false
			}
		}
    });

	grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks("grunt-qunit-istanbul");
	grunt.loadNpmTasks("grunt-coveralls");

	grunt.task.registerTask("hint", "A sample task to run JSHINT", function(control) {
		var config;

		if (!!control) {
			config = grunt.file.readJSON('build/config/' + control + '/jshint.json').config;
		} else {
			config = grunt.file.readJSON('build/config/all/jshint.json').config;
		}
		grunt.task.run("clean:jshint");
		grunt.config("jshint.all", config);
		grunt.task.run("jshint:all");
	});

	grunt.task.registerTask("cs", "Task to run JSCS", function (control) {
		var config;

		if (!!control) {
			config = grunt.file.readJSON('build/config/' + control + '/jshint.json').config;
		} else {
			config = grunt.file.readJSON('build/config/all/jshint.json').config;
		}
		grunt.task.run("clean:jscs");
		grunt.config("jscs.src", config);
		grunt.task.run("jscs");
	});
	
	grunt.task.registerTask("test", "Task to run dev tests and generate coverage for a single control or for all of them.", function(control) {
		var config;

		if (!!control) {
			config = grunt.file.readJSON('build/config/' + control + '/tests.json').config;
		} else {
			config = grunt.file.readJSON('build/config/all/tests.json').config;
		}
		grunt.task.run("clean:tests");
		grunt.config("qunit.all", config);
		grunt.task.run("qunitReport:init");
		grunt.task.run("qunit:all");
		grunt.task.run("qunitReport:finalize");
	});

	grunt.task.registerTask("qunitReport", "Task to write QUnit report in HTML format", function(phase) {
		var done;
		if(phase === "finalize") {
			done = this.async();
		}
		require('./build/ReporterQUnit.js').writeReport(phase, done);
	});
	grunt.event.on("qunit.moduleStart", function (name) {
		require('./build/ReporterQUnit.js').initModule(name);
	});
	grunt.event.on("qunit.moduleDone", function(name, failed, passed, total) {
		require('./build/ReporterQUnit.js').endModule(name, failed, passed, total);
	});
	grunt.event.on("qunit.done", function(failed, passed, total, runtime) {
		require('./build/ReporterQUnit.js').endTest(failed, passed, total, runtime);
	});
	grunt.event.on('qunit.log', function (result, actual, expected, message, source) {
		if (!result) {
			require('./build/ReporterQUnit.js').onError(message, source, result, actual, expected);
		}
	});
	grunt.event.on("qunit.error.onError", function (message, stackTrace) {
		require('./build/ReporterQUnit.js').onError(message, stackTrace);
	});
	grunt.event.on("qunit.fail.load ", function (url) {
		require('./build/ReporterQUnit.js').onError(url);
	});
	grunt.event.on("qunit.fail.timeout", function () {
		require('./build/ReporterQUnit.js').onError("Timeout due to wrong references: Qunit and all other external references should reference files in Bower folder. The IgniteUI files should reference Source folder; ");
	});
	
	grunt.task.registerTask("verify", "A sample task to run jshint, jscs, instrument files, run dev tests and produce coverage report.", function(control) {
	    if (!!control) {
	        grunt.task.run("hint:" + control, "cs:" + control, "test:" + control);
	    } else {
	    	grunt.task.run("hint", "jscs", "test");
		}
	});
};