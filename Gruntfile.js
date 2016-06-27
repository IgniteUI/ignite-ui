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
				globals: {},
				//reporter: "build/ReporterJSHint.js",
				//reporterOutput: "jshint/report.html",
				ignores: grunt.file.readJSON('build/config/all/jshintIgnore.json').config
			},
			changed: {}
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
		clean: {
			jshint: ["jshint"],
			jscs: ["jscs"]
		}
    });

	grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-jscs");

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
	
	grunt.task.registerTask("verify", "A sample task to run jshint, instrument files, dev tests and coverage.", function(control) {
	    if (!!control) {
	        grunt.task.run("hint:" + control, "cs:" + control);
	    } else {
	    	grunt.task.run("hint", "jscs");
		}
	});
};