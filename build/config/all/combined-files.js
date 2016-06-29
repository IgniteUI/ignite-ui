module.exports = {
    "options": {
        "preserveComments": /(?:^!|@(?:license|preserve|cc_on))/,
        "compress": false,
        "mangle": false
    },
    "combine": {
        "files": {
            "./dist/js/infragistics.core-lite.js": [
                "./dist/js/i18n/infragistics-en.js",
                "./src/js/modules/infragistics.util.js",
                "./src/js/modules/infragistics.dataSource.js",
                "./src/js/modules/infragistics.templating.js",
                "./src/js/modules/infragistics.ui.shared.js",
                "./src/js/modules/infragistics.ui.scroll.js"
            ],
            "./dist/js/infragistics.lob-lite.js": [
                "./src/js/modules/infragistics.ui.combo.js",
                "./src/js/modules/infragistics.ui.dialog.js",
                "./src/js/modules/infragistics.ui.popover.js",
                "./src/js/modules/infragistics.ui.notifier.js",
                "./src/js/modules/infragistics.ui.editors.js",
                "./src/js/modules/infragistics.ui.tree.js",
                "./src/js/modules/infragistics.ui.layoutmanager.js",
                "./src/js/modules/infragistics.ui.splitter.js",
                "./src/js/modules/infragistics.ui.splitbutton.js",
                "./src/js/modules/infragistics.ui.rating.js",
                "./src/js/modules/infragistics.ui.toolbarbutton.js",
                "./src/js/modules/infragistics.ui.colorpicker.js",
                "./src/js/modules/infragistics.ui.colorpickersplitbutton.js",
                "./src/js/modules/infragistics.ui.toolbar.js",
                "./src/js/modules/infragistics.ui.tilemanager.js",
                "./src/js/modules/infragistics.ui.upload.js",
                "./src/js/modules/infragistics.ui.validator.js",
                "./src/js/modules/infragistics.ui.htmleditor.js",
                "./src/js/modules/infragistics.ui.videoplayer.js",
                "./src/js/modules/infragistics.ui.zoombar.js"
            ]
        }
    }
};
/**
 * Prepare bundles for each localization
 */
var locales = ["bg", "de", "en", "es", "fr", "ja", "ru"], newFiles = {}, i;
for (var i = 0; i < locales.length; i++) {
    newFiles["./dist/js/i18n/infragistics-" + locales[i] + ".js"] = "./src/js/modules/i18n/*-en.js"; 
}
// keep order
for (var key in module.exports.combine.files) {
     newFiles[key] = module.exports.combine.files[key];
}
module.exports.combine.files = newFiles;