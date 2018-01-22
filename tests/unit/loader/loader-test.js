QUnit.module("igLoader Common", {
	errors: [],
	jsPath: "base/src/js/",
	cssPath: "base/src/css/",

	beforeEach: function(){
		this.cleanScripts();
	},

	resourcesLoaded: function(expectedResources, assert) {
		//check if expected resources are loaded
		var scripts = $(document).find("head > script"), actualPaths = [];
		scripts.each(function () {
			//console.log("script.src: " + this.src)
			if (this.src.indexOf("ignite-ui/src/js/") || this.src.indexOf("igniteui/src/js/") > 0) {
				var array = this.src.split("/");
				actualPaths.push(array[array.length - 1]);
			}
		});

		links = $(document).find("head > link");
		links.each(function () {
			//console.log("link.href: " + this.href)
			if (this.href.indexOf("ignite-ui/src/css/") || this.src.indexOf("igniteui/src/js/") > 0) {
				var array = this.href.split("/");
				actualPaths.push(array[array.length - 1]);
			}
		});

		for (var i = 0; i < expectedResources.length; i++) {
			assert.ok(actualPaths.contains(expectedResources[i]), "The loaded resources should contain: " + expectedResources[i]);
		}
	},
	cleanScripts: function() {
		$(document).find("head > script").each(function () {
			if (this.src.indexOf("ignite-ui/src/js/") > 0 && this.src.indexOf("src/js/infragistics.loader.js") === -1) {
				$(this).remove();
			}
		});
	}
});

QUnit.test("test 1: Test load resources on demand with nested initialization ", function (assert) {
	assert.expect(19);
	var done = assert.async();

	var expectedRes = [
		"infragistics.util-en.js",
		"infragistics.util.js",
		"infragistics.util.jquery.js",
		"infragistics.ui.scroll.js",
		"infragistics.ui.popover-en.js",
		"infragistics.ui.popover.js",
		"infragistics.ui.notifier-en.js",
		"infragistics.ui.notifier.js",
		"infragistics.ui.validator-en.js",
		"infragistics.ui.validator.js",
		"infragistics.ui.editors-en.js",
		"infragistics.ui.editors.js",
		"infragistics.ui.editors.knockout-extensions.js",
		"infragistics.theme.css",
		"infragistics.ui.popover.css",
		"infragistics.ui.notifier.css",
		"infragistics.ui.shared.css",
		"infragistics.ui.validator.css",
		"infragistics.ui.editors.css"
	];

	$.ig.loader({
		scriptPath: this.jsPath,
		cssPath: this.cssPath,
		resources: "igEditors",
		ready: () => {
			$.ig.loader({
				scriptPath: this.jsPath,
				cssPath: this.cssPath,
				resources: "extensions/infragistics.ui.editors.knockout-extensions.js",
				ready: () => {
					this.resourcesLoaded(expectedRes, assert);
					done();
				}
			});
		}
	});
});

QUnit.test("test 2: Test load resources with locale", function (assert) {
	assert.expect(23);
	var done = assert.async();

	var scripts, actualPaths = [],
		expectedScripts = [
			"infragistics.util-fr.js",
			"infragistics.templating-fr.js",
			"infragistics.shared-fr.js",
			"infragistics.ui.rating-fr.js",
			"infragistics.datasource-fr.js",
			"infragistics.templating.js",
			"infragistics.ui.shared.js",
			"infragistics.ui.rating.js",
			"infragistics.datasource.js",
			"infragistics.ui.layoutmanager.js",
			"infragistics.ui.zoombar-fr.js",
			"infragistics.ui.splitter-fr.js",
			"infragistics.ui.zoombar.js",
			"infragistics.ui.splitter.js",
			"infragistics.ui.tilemanager-fr.js",
			"infragistics.ui.tilemanager.js",
			"infragistics.theme.css",
			"infragistics.ui.shared.css",
			"infragistics.ui.rating.css",
			"infragistics.ui.layout.css",
			"infragistics.ui.splitter.css",
			"infragistics.ui.tilemanager.css",
			"infragistics.ui.zoombar.css"];

	$.ig.loader({
		scriptPath: this.jsPath,
		cssPath: this.cssPath,
		resources: "igTemplating, igShared, igRating, igTileManager, igZoombar",
		locale: 'fr',
		ready: () => {
			this.resourcesLoaded(expectedScripts, assert);
			done();
		}
	});
});

QUnit.test("test 3: Test load resources with multiple locales", function(assert) {
	assert.expect(38);
	var done = assert.async();

	var scripts,
		actualPaths = [],
		expectedScripts = [
			"infragistics.util-ja.js",
			"infragistics.templating-ja.js",
			"infragistics.shared-ja.js",
			"infragistics.ui.rating-ja.js",
			"infragistics.datasource-ja.js",
			"infragistics.util-en.js",
			"infragistics.templating-en.js",
			"infragistics.shared-en.js",
			"infragistics.ui.rating-en.js",
			"infragistics.datasource-en.js",
			"infragistics.util-de.js",
			"infragistics.templating-de.js",
			"infragistics.shared-de.js",
			"infragistics.ui.rating-de.js",
			"infragistics.datasource-de.js",
			"infragistics.util-fr.js",
			"infragistics.templating-fr.js",
			"infragistics.shared-fr.js",
			"infragistics.ui.rating-fr.js",
			"infragistics.datasource-fr.js",
			"infragistics.templating.js",
			"infragistics.ui.shared.js",
			"infragistics.ui.rating.js",
			"infragistics.datasource.js",
			"infragistics.ui.layoutmanager.js",
			"infragistics.ui.zoombar-fr.js",
			"infragistics.ui.splitter-fr.js",
			"infragistics.ui.zoombar.js",
			"infragistics.ui.splitter.js",
			"infragistics.ui.tilemanager-fr.js",
			"infragistics.ui.tilemanager.js",
			"infragistics.theme.css",
			"infragistics.ui.shared.css",
			"infragistics.ui.rating.css",
			"infragistics.ui.layout.css",
			"infragistics.ui.splitter.css",
			"infragistics.ui.tilemanager.css",
			"infragistics.ui.zoombar.css"];

	$.ig.loader({
		scriptPath: this.jsPath,
		cssPath: this.cssPath,
		resources: "igTemplating, igShared, igRating, igTileManager, igZoombar",
		locale: 'en, fr, ja, de',
		ready: () => {
			this.resourcesLoaded(expectedScripts, assert);
			done();
		}
	});
});

QUnit.test("test 4: Test load resources with multiple regionals", function (assert) {
	assert.expect(4);
	var done = assert.async();
	var scripts, actualPaths = [],
	expectedScripts = [
			"infragistics.ui.regional-en.js",
			"infragistics.ui.regional-fr.js",
			"infragistics.ui.regional-ja.js",
			"infragistics.ui.regional-de.js"
	];

	$.ig.loader({
		scriptPath: this.jsPath,
		cssPath: this.cssPath,
		resources: "igEditors",
		regional: 'en, fr, ja, de',
		ready: () => {
			this.resourcesLoaded(expectedScripts, assert);
			done();
		}
	});
});