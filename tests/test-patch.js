/** Global fixture empty */
QUnit.testDone( ( { module, name, total, passed, failed, skipped, todo, runtime } ) => {
	// QUnit and adapter use `innerHTML`/`removeChild` on start
	// Ensure proper destroy on controls after test:
	$("#qunit-fixture").empty();

	if ($.ig.util.widgetStack.length) {
		QUnit.pushFailure({
			result: false,
			message: `WARNING: ${$.ig.util.widgetStack.length} widgets left after running ${module} - ${name}`
		});
		$.ig.util.widgetStack = [];
	}
});

$.mockjaxSettings.logging = 0;  // only critical error messages

/**
 * Debug adjustments
 */

if (location.pathname === "/debug.html") {
	QUnit.begin(function( details ) {
		//console.log( "Test amount:", details.totalTests );
		$("#qunit").css({float:"right", width: "50%", overflow:"auto"});
	});


	/** Mini Karma plugin, just override start to register QUnit handler after the karma adapter */
	function createStartFn(karma, defaultConfig) {
		var originalStart = karma.start;

		return function () {
			originalStart();
			// This should run after karma-qunit `testStart` that recreates the fixture:
			QUnit.testStart(function( details ) {
				$("#qunit-fixture").css({
					position: "static",
					float:"left",
					width: "50%",
					overflow:"auto",
					padding:"20px",
					height:"100%",
					boxSizing: "border-box"
				});
			});
		}
	}
	window.__karma__.start = createStartFn(window.__karma__);
}