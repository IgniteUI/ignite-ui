var locales = ["bg", "de", "en", "es", "fr", "ja", "ru"], newFiles = {}, i;

module.exports = {
    "options": {

        // use the general "keep some" regexp  
        "preserveComments": /(?:^!|@(?:license|preserve|cc_on))/,
        "compress": false,
        "mangle": false
    },
    "combine": {
        "files": {
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
    },
    "all": {
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**/*.js', '**/*-lite.js'],
          dest: 'dist/'
        }
      ]
    }
};

/**
 * Prepare bundles for each localization
 */
for (var i = 0; i < locales.length; i++) {
    newFiles["./dist/js/i18n/infragistics-" + locales[i] + ".js"] = "./dist/js/modules/i18n/*-en.js"; 
}
// keep order
for (var key in module.exports.combine.files) {
     newFiles[key] = module.exports.combine.files[key];
}
module.exports.combine.files = newFiles;