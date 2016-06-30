var buildVersion = require("./package.json").version,
    year = new Date().getFullYear(),
	config = {
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
			tests: ["qunit", "coverage", "instrumentedFiles"],
			build: ["dist/js/**/*", "dist/css/**/*", "dist/bower.json"]
		},
		coveralls: {
			// LCOV coverage file (can be string, glob or array)
			src: './coverage/reportLCOV/*.info'
		},
		copy: {
			js: {
				expand: true,
				cwd: './src/',
				src: 'js/**/*.js',
				dest: './dist/',
				options: {
					process: function (content, srcpath) {
						return content.replace("<build_number>", buildVersion).replace("<year>", year);
					}
				},
			},
			css: {
				expand: true,
				cwd: './src/',
				src: 'css/**',
				dest: './dist/',
			},
			resources: {
				src: ['bower.json', "README.md"],
				dest: './dist/'
			}
		},
		cssmin: {
			all: {
				files: [{
					expand: true,
					cwd: 'dist/css/',
					src: ['**/*.css', '!**/*.min.css'],
					dest: 'dist/css'
				}]
			},
			structure: {
				options: {
					rebase: true
				},
				files: [{
					'dist/css/structure/infragistics.css': ['dist/css/structure/modules/*.css']
				}]
			}
		},
		uglify: require('./build/config/all/combined-files.js')
    });

	grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks("grunt-qunit-istanbul");
	grunt.loadNpmTasks("grunt-coveralls");
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.option("force", true );

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
			config = grunt.file.readJSON('build/config/editors/tests.json').config;
			// config = grunt.file.readJSON('build/config/all/tests.json').config;
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
	grunt.event.on("qunit.error", function (message, stackTrace) {
		require('./build/ReporterQUnit.js').onError(message, stackTrace);
	});
	grunt.event.on("qunit.error.onError", function (message, stackTrace) {
		require('./build/ReporterQUnit.js').onError(message, stackTrace);
	});
	grunt.event.on("qunit.fail ", function (message, stackTrace) {
		require('./build/ReporterQUnit.js').onError(message, stackTrace);
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

	grunt.task.registerTask("build", "Combine output files and prepare output", function() {
		grunt.task.run("clean:build");
		grunt.task.run("copy");
	    grunt.task.run("uglify");
	    grunt.task.run("cssmin");			
	});
};