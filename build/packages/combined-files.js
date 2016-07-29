var locales = ["bg", "de", "en", "es", "fr", "ja", "ru"], newFiles = {}, i;

/**
 * Get all locale files per locale and return merge pairs like:
 * { "modules/*.js": "i18n/*-en.js", "modules/*.js" }
 */
function buildLocaleMergePairs (locale) {
    var pairs = {},
        modulePath = "./dist/js/modules/",
        i18nPath = modulePath + "i18n/",
        fileName = "",
        grunt = require('grunt'),
        localeFiles = grunt.file.expand(i18nPath + "*-" + locale + ".js");

    for (i = 0; i < localeFiles.length; i++) {
        fileName = localeFiles[i].split("/").pop();
        if (fileName === "infragistics.shared-" + locale + ".js") {
             // shared resource file doesn't have "ui" in it.
            pairs[modulePath + "infragistics.ui.shared.js"] = [
                localeFiles[i],
                modulePath + "infragistics.ui.shared.js"
            ]
        } else {
            pairs[modulePath + fileName.replace("-" + locale, "")] = [
                localeFiles[i],
                modulePath + fileName.replace("-" + locale, "")
            ]
        }
    }
    return pairs;
}

module.exports = {
    "uglify": {
        options: {
            expand: true,
            cwd: 'dist/'
        },
        uglifyfiles: {
            src: ['**/src/js/**/*.js', '!js/modules/i18n/**/*.js', '!**/*-lite.js'],
            dest: 'dist/',
            expand: true,
            options: {
                // use the general "keep some" regexp  
                "preserveComments": /(?:^!|@(?:license|preserve|cc_on))/,
                "compress": false,
                "mangle": false,
                "ASCIIOnly": true
            }
        },
        uglifylocale: {
            options: {
                src: ['js/modules/i18n/**/*.js'],
                dest: 'dist/js/modules/i18n/',

                // use the general "keep some" regexp  
                preserveComments: /(?:^!|@(?:license|preserve|cc_on))/,
                compress: false,
                mangle: false
            },
            //files: buildLocaleMergePairs("en")
        }
    },
    concat: {
        dist: {
            src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
            dest: 'dist/built.js',
            files: {
                "./dist/js/infragistics.core-lite.js": [
                    "./dist/js/i18n/infragistics-en.js",
                    "./dist/js/modules/infragistics.util.js",
                    "./dist/js/modules/infragistics.dataSource.js",
                    "./dist/js/modules/infragistics.templating.js",
                    "./dist/js/modules/infragistics.ui.shared.js",
                    "./dist/js/modules/infragistics.ui.scroll.js"
                ],
                "./dist/js/infragistics.lob-lite.js": [
                    "./dist/js/modules/infragistics.ui.combo.js",
                    "./dist/js/modules/infragistics.ui.dialog.js",
                    "./dist/js/modules/infragistics.ui.popover.js",
                    "./dist/js/modules/infragistics.ui.notifier.js",
                    "./dist/js/modules/infragistics.ui.editors.js",
                    "./dist/js/modules/infragistics.ui.tree.js",
                    "./dist/js/modules/infragistics.ui.layoutmanager.js",
                    "./dist/js/modules/infragistics.ui.splitter.js",
                    "./dist/js/modules/infragistics.ui.splitbutton.js",
                    "./dist/js/modules/infragistics.ui.rating.js",
                    "./dist/js/modules/infragistics.ui.toolbarbutton.js",
                    "./dist/js/modules/infragistics.ui.colorpicker.js",
                    "./dist/js/modules/infragistics.ui.colorpickersplitbutton.js",
                    "./dist/js/modules/infragistics.ui.toolbar.js",
                    "./dist/js/modules/infragistics.ui.tilemanager.js",
                    "./dist/js/modules/infragistics.ui.upload.js",
                    "./dist/js/modules/infragistics.ui.validator.js",
                    "./dist/js/modules/infragistics.ui.htmleditor.js",
                    "./dist/js/modules/infragistics.ui.videoplayer.js",
                    "./dist/js/modules/infragistics.ui.zoombar.js"
                ]
            }
        }
    }
};

/**
 * Prepare bundles for each localization
 */
/*for (var i = 0; i < locales.length; i++) {
    newFiles["./dist/js/i18n/infragistics-" + locales[i] + ".js"] = "./dist/js/modules/i18n/*-" + locales[i] + ".js"; 
}
// keep order
for (var key in module.exports.combine.files) {
     newFiles[key] = module.exports.combine.files[key];
}
module.exports.combine.files = newFiles; */
