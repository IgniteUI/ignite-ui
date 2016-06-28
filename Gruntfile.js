var config = {
	scripts: "src/js/**/*.js",
	scriptsDir: "src/js",
	modulesDir: "src/js/modules",
	extensions: "src/extensions/**/*.js",
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
				//reporter: "build/ReporterJSHint.js",
				//reporterOutput: "jshint/report.html",
				ignores: grunt.file.readJSON('build/config/all/jshintIgnore.json').config
			}
		},
		jscs: {
			src: grunt.file.readJSON('build/config/all/jshint.json').config,
			options: {
				config: ".jscsrc.json",
				reporter: "build/ReporterJSCS.js",
				reporterOutput: "jscs/report.html",
				force: true,
				maxErrors: null,
				excludeFiles: grunt.file.readJSON('build/config/all/jshintIgnore.json').config
			}
		},
		qunit: {
			all: ["<%= config.devTests%>"],
			options: {
				force: false,
				timeout: 180000,
				"--web-security": "no",
				coverage: {
					src: grunt.file.readJSON('build/config/all/instrument.json').config,
					instrumentedFiles: "src/instrumentedFiles",
					htmlReport: "coverage/reportHTML",
					jsonSummaryReport: "coverage/reportJSON",
					lcovReport: "coverage/reportLCOV",
					disposeCollector: true,
					reportOnFail: true,
					linesThresholdPct: 85,
					statementsThresholdPct: 85,
					functionsThresholdPct: 85,
					branchesThresholdPct: 85
				},
				page: {
					viewportSize: { width: 1600, height: 800 }
				}
			}
		},
		clean: {
			jshint: ["jshint"],
			jscs: ["jscs"],
			coverage: ["coverage"]
		}
    });

	grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks("grunt-qunit-istanbul");

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

	grunt.task.registerTask("cs", "A sample task to run JSCS", function (control) {
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
	
	grunt.task.registerTask("test", "A sample task to run dev tests and coverage for a single control or for all of them.", function(control) {
		grunt.task.run("clean:coverage");
		grunt.config("qunit.all", ["<%= config.devTestsDir %>/editors/**/*test*.htm*"]);
		grunt.task.run("qunit:all");
	});

	grunt.task.registerTask("verify", "A sample task to run jshint, instrument files, dev tests and coverage.", function(control) {
	    if (!!control) {
	        grunt.task.run("hint:" + control, "cs:" + control, "test:" + control);
	    } else {
	    	grunt.task.run("hint", "jscs", "test");
		}
	});
};