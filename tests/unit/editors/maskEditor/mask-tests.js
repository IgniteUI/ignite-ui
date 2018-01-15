QUnit.module("igMaskEditor unit tests", {
	divTag: '<div></div>',
	inputTag: '<input></input>'
});


QUnit.test('[ID1] Mask editor cannot set on runtime', function (assert) {
	assert.expect(2);

	var editor = $.ig.TestUtil.appendToFixture(this.divTag);
	editor.igMaskEditor({
			inputMask: "CCC"
		});

	assert.throws(function () {
		editor.igMaskEditor("option", "excludeKeys", "asds")
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.setOptionError) > -1;
	}, $.ig.Editor.locale.setOptionError + "excludeKeys");
	
	assert.throws(function () {
		editor.igMaskEditor("option", "unfilledCharsPrompt", "*")
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.setOptionError) > -1;
	}, $.ig.Editor.locale.setOptionError + "unfilledCharsPrompt");
});