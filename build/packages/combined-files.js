/**
 * Prepare bundles for each localization
 */
function buildLocaleBundles () {
    var locales = ["bg", "de", "en", "es", "fr", "ja", "ru"],
    newFiles = {}, i;

    for (i = 0; i < locales.length; i++) {
        newFiles["./dist/js/i18n/infragistics-" + locales[i] + ".js"] = "./dist/js/modules/i18n/*-" + locales[i] + ".js"; 
    }
    return newFiles;
}
/**
 * Get all locale files per locale and return merge pairs like:
 * { "modules/*.js": ["i18n/*-en.js", "modules/*.js"] }
 */
function buildLocaleMergePairs (locale) {
    var pairs = {}, i,
        modulePath = "./dist/js/modules/",
        i18nPath = modulePath + "i18n/",
        srcPath = "./src/js/modules/i18n/",
        fileName = "",
        grunt = require('grunt'),
        localeFiles = grunt.file.expand(srcPath + "*-" + locale + ".js");

    for (i = 0; i < localeFiles.length; i++) {
        fileName = localeFiles[i].split("/").pop();
        if (fileName === "infragistics.shared-" + locale + ".js") {
             // shared resource file doesn't have "ui" in it.
            pairs[modulePath + "infragistics.ui.shared.js"] = [
                i18nPath + fileName,
                modulePath + "infragistics.ui.shared.js"
            ];
        } else {
            pairs[modulePath + fileName.replace("-" + locale, "")] = [
                i18nPath + fileName,
                modulePath + fileName.replace("-" + locale, "")
            ];
        }
    }
    return pairs;
}

function replaceAMDWraps(src) {
    src = src.replace(/\(function\s*\(factory\)\s*\{[\s\S]*?\(function\s*\((\$?)\)\s*\{/g, '(function ($1) {');
    src = src.replace(/\}\)\)\;\s*\/\/\s*REMOVE_FROM_COMBINED_FILE.*/g, '})($);');
    src = src.replace(/.*\/\/\s*REMOVE_FROM_COMBINED_FILE.*/g, '');
    return src;
}

/**
 * Returns source files for the core bundle
 * @param {string} rootPath The root source path, like "./dist"
 * @param {string} [locale] Locale name to combine in file
 */
function coreBundle (rootPath, locale) {
    var files = [
        `${rootPath}/js/modules/infragistics.util.js`,
        `${rootPath}/js/modules/infragistics.util.jquery.js`,
        `${rootPath}/js/modules/infragistics.datasource.js`,
        `${rootPath}/js/modules/infragistics.templating.js`,
        `${rootPath}/js/modules/infragistics.ui.widget.js`,
        `${rootPath}/js/modules/infragistics.ui.shared.js`,
        `${rootPath}/js/modules/infragistics.ui.scroll.js`
    ];
    if (locale) {
        files = [`${rootPath}/js/i18n/infragistics-${locale}.js`, ...files];
    }

    return files;
}

/**
 * Returns source files for the LoB bundle
 * @param {string} rootPath The root source path, like "./dist"
 */
function lobBundle (rootPath) {
    var files = [
        `${rootPath}/js/modules/infragistics.ui.combo.js`,
        `${rootPath}/js/modules/infragistics.ui.dialog.js`,
        `${rootPath}/js/modules/infragistics.ui.popover.js`,
        `${rootPath}/js/modules/infragistics.ui.notifier.js`,
        `${rootPath}/js/modules/infragistics.ui.editors.js`,
        `${rootPath}/js/modules/infragistics.ui.tree.js`,
        `${rootPath}/js/modules/infragistics.ui.layoutmanager.js`,
        `${rootPath}/js/modules/infragistics.ui.splitter.js`,
        `${rootPath}/js/modules/infragistics.ui.splitbutton.js`,
        `${rootPath}/js/modules/infragistics.ui.rating.js`,
        `${rootPath}/js/modules/infragistics.ui.toolbarbutton.js`,
        `${rootPath}/js/modules/infragistics.ui.colorpicker.js`,
        `${rootPath}/js/modules/infragistics.ui.colorpickersplitbutton.js`,
        `${rootPath}/js/modules/infragistics.ui.toolbar.js`,
        `${rootPath}/js/modules/infragistics.ui.tilemanager.js`,
        `${rootPath}/js/modules/infragistics.ui.upload.js`,
        `${rootPath}/js/modules/infragistics.ui.validator.js`,
        `${rootPath}/js/modules/infragistics.ui.htmleditor.js`,
        `${rootPath}/js/modules/infragistics.ui.videoplayer.js`,
        `${rootPath}/js/modules/infragistics.ui.zoombar.js`
    ];

    return files;
}

module.exports = {
    coreBundle: coreBundle,
    lobBundle: lobBundle,
    uglify: {
        source: {
            cwd: 'dist/',
            expand: true,
            src: ['js/**/*.js', '!js/modules/i18n/**/*.js'],
            dest: 'dist/',
            options: {
                preserveComments: /(?:^!|@(?:license|preserve|cc_on))/,
                compress: false,
                mangle: false,
                ASCIIOnly: true
            }
        },
        locale: {
            cwd: 'dist/js/modules/',
            expand: true,
            src: ['i18n/**/*.js'],
            dest: 'dist/js/modules/',
            options: {
                preserveComments: /(?:^!|@(?:license|preserve|cc_on))/,
                compress: false,
                mangle: false
            }
        }
    },
    concat: {
        locale: {
            files: buildLocaleBundles("en")
        },
        controls: {
            files: buildLocaleMergePairs("en")
        },
        core: { 
            options: {
                // Replace all AMD define statements with a single one at the top
                banner: '(function(factory){' + '\n' +
						'	if(typeof define==="function"&&define.amd){\n' +
						'		define([\n' +
						'			"jquery",\n' +
						'			"jquery-ui",\n' +
						'			"jquery-ui/ui/core",\n' +
						'			"jquery-ui/ui/data",\n' +
						'			"jquery-ui/ui/focusable",\n' +
						'			"jquery-ui/ui/keycode",\n' +
						'			"jquery-ui/ui/tabbable",\n' +
						'			"jquery-ui/ui/version",\n' +
						'			"jquery-ui/ui/widget",\n' +
						'			"jquery-ui/ui/widgets/mouse"\n' +
						'		], factory)\n' +
						'	}else{\n' +
						'		factory(jQuery)\n' +
						'	}\n' +
						'})(function($){\n',
                process: replaceAMDWraps,
                footer: '});'
            },
            dest: "./dist/js/infragistics.core-lite.js",
            src: coreBundle("./dist", "en")
        }, 
        lob: { 
            options: {
                // Replace all AMD define statements with a single one at the top
                banner: '(function(factory){\n' +
						'	if(typeof define==="function"&&define.amd){\n' +
						'		define([\n' +
						'			"jquery",\n' +
						'			"jquery-ui",\n' +
						'			"jquery-ui/ui/core",\n' +
						'			"jquery-ui/ui/data",\n' +
						'			"jquery-ui/ui/focusable",\n' +
						'			"jquery-ui/ui/keycode",\n' +
						'			"jquery-ui/ui/tabbable",\n' +
						'			"jquery-ui/ui/version",\n' +
						'			"jquery-ui/ui/widget",\n' +
						'			"jquery-ui/ui/widgets/mouse",\n' +
						'			"jquery-ui/ui/widgets/datepicker",\n' +
						'			"jquery-ui/ui/widgets/draggable",\n' +
						'			"jquery-ui/ui/widgets/droppable",\n' +
						'			"jquery-ui/ui/widgets/mouse",\n' +
						'			"jquery-ui/ui/widgets/resizable",\n' +
						'			"./infragistics.core-lite"\n' +
						'		],factory)\n' +
						'	}else{\n' +
						'		factory(jQuery)\n' +
						'	}\n' +
						'})(function($){\n',
                process: replaceAMDWraps,
                footer: '});'
            },
            dest: "./dist/js/infragistics.lob-lite.js",
            src: lobBundle("./dist")
        }
    }
};

