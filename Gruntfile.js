var buildVersion = require("./package.json").version,
	year = new Date().getFullYear(),
	config = {
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
				ignores: grunt.file.readJSON('build/config/all/jshintIgnore.json').config
			}
		},
		jscs: {
			src: grunt.file.readJSON('build/config/all/jshint.json').config,
			options: {
				config: ".jscsrc",
				force: false,
				maxErrors: null,
				excludeFiles: grunt.file.readJSON('build/config/all/jshintIgnore.json').config
			}
		},
		clean: {
			jshint: ["jshint"],
			jscs: ["jscs"],
			build: ["dist/**/*", "!dist/.git/**/*"]
		},
		copy: {
			js: {
				expand: true,
				cwd: './src/',
				src: 'js/**/*.js',
				dest: './dist/',
				options: {
					process: function (content, srcpath) {
						if (srcpath.indexOf("infragistics.loader.js") >= 0){
							// Set loader default locale:
							content = content.replace(/_defaultLocale:\s*""/, "_defaultLocale: \"en\"");
						}
						return content.replace(/<build_number>/g, buildVersion).replace("<year>", year);
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
				files: [{
					src: ['bower.json', "LICENSE"],
					dest: './dist/'
				}, {
					expand: true,
					cwd: './build/packages/',
					src:  ["package.json", "README.md"],
					dest: './dist/'
				}],
				options: {
					process: function (content, srcpath) {
						if (srcpath.indexOf("bower.json") >= 0) {
							var config = JSON.parse(content);
							config.version = buildVersion;
							content = JSON.stringify(config, null, '  ') + '\n';
						}
						return content;
					}
				}
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
		uglify: require('./build/packages/combined-files.js').uglify,
		concat: require('./build/packages/combined-files.js').concat
	});

	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-jscs");
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.task.registerTask("hint", "A sample task to run JSHINT", function(control) {
		var config, reporter, output, report = grunt.option('report');
		
		if (!!control) {
			config = grunt.file.readJSON('build/config/' + control + '/jshint.json').config;
			
		} else {
			config = grunt.file.readJSON('build/config/all/jshint.json').config;
		}

		if (report !== undefined) {
			reporter = "build/ReporterJSHint.js";
			output = "jshint/report.html";
		} else {
			reporter = undefined;
			output = "";
		}

		grunt.task.run("clean:jshint");
		grunt.config("jshint.all", config);
		grunt.config("jshint.options.reporter", reporter);
		grunt.config("jshint.options.reporterOutput", output);
		grunt.task.run("jshint:all");
	});

	grunt.task.registerTask("cs", "Task to run JSCS", function (control) {
		var config, reporter, output, report = grunt.option('report');

		if (!!control) {
			config = grunt.file.readJSON('build/config/' + control + '/jshint.json').config;
		} else {
			config = grunt.file.readJSON('build/config/all/jshint.json').config;
		}

		if (report !== undefined) {
			reporter = "build/ReporterJSCS.js";
			output = "jscs/report.html";
		} else {
			reporter = output = undefined;
		}

		grunt.task.run("clean:jscs");
		grunt.config("jscs.src", config);
		grunt.config("jscs.options.reporter", reporter);
		grunt.config("jscs.options.reporterOutput", output);
		grunt.task.run("jscs");
	});

	grunt.task.registerTask("verify", "A sample task to run jshint, jscs, instrument files, run dev tests and produce coverage report.", function(control) {
		if (!!control) {
			grunt.task.run("hint:" + control, "cs:" + control);
		} else {
			grunt.task.run("hint", "jscs");
		}
	});

	grunt.task.registerTask("build", "Combine output files and prepare output", function() {
		grunt.task.run("clean:build");
		grunt.task.run("copy");
		grunt.task.run("concat");
		grunt.task.run("uglify");
		grunt.task.run("cssmin");
	});
};