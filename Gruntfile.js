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
				reporter: "build/ReporterJSHint.js",
				reporterOutput: "jshint/report.html",
				ignores: grunt.file.readJSON('build/config/all/jshintIgnore.json').config
			},
			changed: {}
		}
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");

	grunt.task.registerTask("hint", "A sample task to run JSHINT", function(control) {
		if (!!control) {
			grunt.config("jshint.all", grunt.file.readJSON('build/config/' + control + '/jshint.json').config);
			grunt.task.run("jshint:all");
		} else {
			grunt.config("jshint.all", grunt.file.readJSON('build/config/all/jshint.json').config);
			grunt.task.run("jshint:all");
		}
	});
	
	grunt.task.registerTask("verify", "A sample task to run jshint, instrument files, dev tests and coverage.", function(control) {
	    if (!!control) {
	        grunt.task.run("hint:" + control);
	    } else {
	    	grunt.task.run("hint");
		}
	});
};