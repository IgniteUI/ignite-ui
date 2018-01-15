
QUnit.module("igCheckboxEditor unit tests", {
	labelTag: '<label></label>',
	divTag: '<div></div>',
	spanTag: '<span></span>',
	inputTag: '<input></input>',

	beforeEach: function () {},

	afterEach: function () {},

	addElementById: function (html, id) {
		var $qunitFixture = $('#qunit-fixture');
		return $(html, {id: id}).appendTo($qunitFixture);
	},

	isChecked: function ($input, expectedValue, expectedState) {
		return $input.igCheckboxEditor("value") === expectedValue &&
			$input.data("igCheckboxEditor").options.checked === (expectedState !== undefined ? expectedState :
				expectedValue);
	},

	isValueChanged: function ($input, expectedValue) {
		return $input.igCheckboxEditor("option", "value") === expectedValue &&
			$input.data("igCheckboxEditor").options.value === expectedValue;
	},

	isDisabled: function ($input, expectedValue) {
		return $input.igCheckboxEditor("option", "disabled") === expectedValue &&
			$input.data("igCheckboxEditor").options.disabled === expectedValue &&
			$input.data("igCheckboxEditor")._editorInput.prop("disabled") === expectedValue;
	},

	click: function (el) {
		$.ig.TestUtil.mouseEvent(el, "click");
	}
});

QUnit.test('[ID1] Checkbox Editor initialization.', function (assert) {
	assert.expect(9);

	var checkBoxInInputSelector = 'checkBoxInInput',
		$chkLabel = this.addElementById(this.labelTag, 'labelForCheckBoxInDiv'),
		$chkInInput = this.addElementById(this.inputTag, checkBoxInInputSelector),
		$chkInDiv = this.addElementById(this.divTag, 'checkBoxInDivSpcial'),
		$chkInSpan = this.addElementById(this.spanTag, 'checkBoxInSpan');

	$chkLabel.attr('for', checkBoxInInputSelector).text("Label 1");
	$chkInInput.igCheckboxEditor();
	$chkInDiv.igCheckboxEditor({
		checked: true,
		value: "Agree",
		inputName: "agree",
		tabIndex: 1
	});
	$chkInSpan.igCheckboxEditor();

	assert.equal(typeof ($chkInInput.igCheckboxEditor), 'function', "Editors Scripts not loaded");
	assert.notStrictEqual($chkInDiv.data("igCheckboxEditor"), undefined, 'Error creating igCheckboxEditor in a DIV');
	assert.notStrictEqual($chkInInput.data("igCheckboxEditor"), undefined,
		'Error creating igCheckboxEditor in an INPUT');
	assert.notStrictEqual($chkInSpan.data("igCheckboxEditor"), undefined, 'Error creating igCheckboxEditor in a SPAN');
	assert.equal($chkInInput.attr("type"), "checkbox", 'Type of igCheckboxEditor is not checkbox');
	assert.throws(function () {
			$chkLabel.igCheckboxEditor();
		},
		Error($.ig.Editor.locale.instantiateCheckBoxErrMsg),
		"igCheckboxEditor requires a different element. Use INPUT, SPAN or DIV element."
	);
	assert.equal($chkInInput.data("igCheckboxEditor")._valueInput.attr("type"), "checkbox",
		'Type of igCheckboxEditor is not checkbox');
	assert.equal($chkInDiv.data("igCheckboxEditor")._valueInput.attr("type"), "checkbox",
		'Type of igCheckboxEditor is not checkbox');
	assert.equal($chkInDiv.igCheckboxEditor("inputName"), "agree", 'Input name shoud be set');
});

QUnit.test('[ID2] Check for stlye', function (assert) {
	assert.expect(12);

	var $chkInInput = this.addElementById(this.inputTag, 'checkBoxInInput'),
		$chkInDiv = this.addElementById(this.divTag, 'checkBoxInDivSpcial'),
		css;

	$chkInInput.igCheckboxEditor();
	$chkInDiv.igCheckboxEditor({
		checked: true,
		value: "Agree",
		inputName: "agree",
		tabIndex: 1
	});
	css = $chkInDiv.data("igCheckboxEditor").css

	assert.ok($chkInDiv.hasClass(css.containerChecked), "Checked container style not applied");
	assert.ok($chkInDiv.hasClass(css.container.split(" ")[0]), "Container classes not applied");
	assert.ok($chkInDiv.hasClass(css.container.split(" ")[1]), "Container classes not applied");
	assert.ok($chkInDiv.hasClass(css.container.split(" ")[2]), "Container classes not applied");
	$chkInDiv.mouseover();
	assert.ok($chkInDiv.hasClass(css.hover), "Hover class not applied");
	$chkInDiv.mousedown();
	assert.ok($chkInDiv.hasClass(css.active), "Active class not applied");
	assert.ok($chkInDiv.igCheckboxEditor("editorContainer").hasClass(css.focus), "Focus class not applied");
	assert.ok($chkInDiv.hasClass(css.containerChecked), "Checked class not applied on the container");
	$chkInDiv.mouseup();
	$chkInDiv.mouseout();

	$chkInDiv.igCheckboxEditor("toggle");
	assert.notOk($chkInDiv.hasClass(css.containerChecked), "Checked class not removed form the container");
	$chkInDiv.igCheckboxEditor("toggle");

	$chkInInput.mouseover();
	assert.ok($chkInInput.data("igCheckboxEditor")._editorContainer.hasClass(css.hover), "Hover class not applied");
	$chkInInput.mousedown();
	assert.ok($chkInInput.data("igCheckboxEditor")._editorContainer.hasClass(css.active), "Active class not applied");
	assert.ok($chkInInput.data("igCheckboxEditor")._editorContainer.hasClass(css.focus), "Focus class not applied");
	$chkInInput.mouseup();
	$chkInInput.mouseout();
});

QUnit.test('[ID3] Check for checked', function (assert) {
	assert.expect(15);

	var $chkInInput = this.addElementById(this.inputTag, 'checkBoxInInput'),
		$chkInDiv = this.addElementById(this.divTag, 'checkBoxInDivSpcial'),
		$chkInSpan = this.addElementById(this.spanTag, 'checkBoxInSpan');

	$chkInInput.igCheckboxEditor();
	$chkInDiv.igCheckboxEditor({
		checked: true,
		value: "Agree",
		inputName: "agree",
		tabIndex: 1
	});
	$chkInSpan.igCheckboxEditor();

	assert.ok(this.isChecked($chkInInput, false), 'The initial value is not as expexted');
	assert.ok(this.isChecked($chkInDiv, "Agree", true), 'The initial value is not as expexted');
	assert.ok(this.isValueChanged($chkInDiv, "Agree"), 'The value attribute is not as expected');
	$chkInDiv.igCheckboxEditor("option", "value", "Don't agree");
	assert.ok(this.isValueChanged($chkInDiv, "Don't agree"), 'The value attribute is not as expected');
	$chkInInput.click();
	assert.ok(this.isChecked($chkInInput, true), 'The value is not updated properly');
	$chkInInput.click().click().click().click().click().blur().click().click();
	assert.ok(this.isChecked($chkInInput, false), 'The value is not updated properly');
	$chkInInput.igCheckboxEditor("toggle");
	assert.ok(this.isChecked($chkInInput, true), 'The value after toggle is not updated correctly');
	$chkInInput.igCheckboxEditor("toggle");
	assert.ok(this.isChecked($chkInInput, false), 'The value after toggle is not updated correctly');
	$chkInDiv.igCheckboxEditor("value", false);
	assert.ok(this.isValueChanged($chkInDiv, false), 'The value after toggle is not updated correctly');
	// Set the value as string
	$chkInDiv.igCheckboxEditor("value", "true");
	assert.ok(this.isValueChanged($chkInDiv, "true"), 'The value after toggle is not updated correctly');
	$chkInDiv.igCheckboxEditor("value", "false");
	$chkInInput.igCheckboxEditor("value", true);
	assert.ok(this.isChecked($chkInInput, true), 'The value is not updated properly');
	assert.throws(function () {
			$chkInInput.igCheckboxEditor("value", "fail");
		},
		Error($.ig.Editor.locale.cannotParseNonBoolValue),
		"igCheckboxEditor acepted wrong value."
	);
	assert.ok(this.isChecked($chkInInput, true), 'The value is not updated properly');
	$.ig.TestUtil.keyInteraction(32, $chkInInput);
	assert.ok(this.isChecked($chkInInput, false), 'The value is not updated properly');
	assert.equal($chkInSpan.igCheckboxEditor("field").attr("id"), $chkInSpan.attr("id"),
		"editorInput is equal to the input");
});

QUnit.test('[ID4] Check width/height', function (assert) {
	assert.expect(7);

	var $chkInInput = this.addElementById(this.inputTag, 'checkBoxInInput'),
		$chkInDiv = this.addElementById(this.divTag, 'checkBoxInDivSpcial'),
		css;

	$chkInInput.igCheckboxEditor({
		width: 64,
		height: 48,
	});
	$chkInDiv.igCheckboxEditor({
		checked: true,
		value: "Agree",
		inputName: "agree",
		tabIndex: 1
	});
	css = $chkInDiv.data("igCheckboxEditor").css

	// Default stlye from CSS
	assert.equal($chkInDiv.igCheckboxEditor("editorContainer").css("width"), "16px", "Width is not correct");
	assert.equal($chkInDiv.igCheckboxEditor("editorContainer").css("height"), "16px", "Height is not correct");

	$chkInDiv.igCheckboxEditor("option", "width", 32);
	$chkInDiv.igCheckboxEditor("option", "height", 32);
	assert.equal($chkInDiv.igCheckboxEditor("editorContainer").css("width"), "32px", "Width is not correct");
	assert.equal($chkInDiv.igCheckboxEditor("editorContainer").css("height"), "32px", "Height is not correct");
	assert.ok($chkInDiv.igCheckboxEditor("field").hasClass(css.iconCentered), "Style is not applied");

	// Style set from the options
	assert.equal($chkInInput.igCheckboxEditor("editorContainer").css("width"), "64px", "Width is not correct");
	assert.equal($chkInInput.igCheckboxEditor("editorContainer").css("height"), "48px", "Height is not correct");
});

QUnit.test('[ID5] Disabled/readonly and other options and methods', function (assert) {
	assert.expect(7);

	var $chkInDiv = this.addElementById(this.divTag, 'checkBoxInDivSpcial'),
		$chkInSpan = this.addElementById(this.spanTag, 'checkBoxInSpan'),
		$chkInSpanWithAttr = this.addElementById(this.spanTag, 'checkBoxInSpanWithAttr');

	$chkInDiv.igCheckboxEditor({
		checked: true,
		value: "Agree",
		inputName: "agree",
		tabIndex: 1
	});
	$chkInSpan.igCheckboxEditor();
	$chkInSpanWithAttr.igCheckboxEditor({
		checked: "checked",
		readonly: "readonly",
		disabled: "disabled",
		"aria-labelledby": "aria-labelledby"
	});

	$chkInDiv.igCheckboxEditor("option", "readOnly", true);
	$chkInDiv.click();
	assert.ok(this.isChecked($chkInDiv, "Agree", true), 'Read only should not allow the value to changed');
	$chkInDiv.igCheckboxEditor("option", "readOnly", false);

	$chkInDiv.igCheckboxEditor("option", "disabled", true);
	assert.ok(this.isDisabled($chkInDiv, true), 'The checkbox is not disabled');
	$chkInDiv.igCheckboxEditor("option", "disabled", false);
	$chkInDiv.igCheckboxEditor("option", "disabled", false); // Set the same value in order to have coverage
	assert.ok(this.isDisabled($chkInDiv, false), 'The checkbox is not enabled');
	$chkInDiv.igCheckboxEditor("option", "fake", false); // Set fake value in order to have coverage
	$chkInDiv.igCheckboxEditor("inputName", "notagree");
	assert.equal($chkInDiv.igCheckboxEditor("inputName"), "notagree", 'Input name is not changed');

	$chkInSpan.igCheckboxEditor("option", "checked", false);
	$chkInSpan.igCheckboxEditor("option", "size", "large");
	$chkInSpan.igCheckboxEditor("option", "checked", true);
	assert.equal($chkInSpan.igCheckboxEditor("value"), true, "Not checked");
	assert.ok($chkInSpan.data("igCheckboxEditor")._editorInput.hasClass("ui-igcheckbox-large-on"),
		"Large style not applied");
	$chkInSpanWithAttr.igCheckboxEditor("option", "disabled", false);
	$chkInSpanWithAttr.click();
	assert.ok($chkInSpanWithAttr.igCheckboxEditor("option", "checked", true), "Should stay as checked");
});

QUnit.test('[ID6] Check styled properties', function (assert) {
	assert.expect(2);

	var $chkInInputStyled = this.addElementById(this.spanTag, 'checkBoxInInputStyled');
	$($chkInInputStyled).igCheckboxEditor({
		iconClass: "ui-icon-close",
		checked: true
	});

	assert.ok($chkInInputStyled.data("igCheckboxEditor")._editorInput.hasClass("ui-icon-close"),
		"Close icon not applied");
	$chkInInputStyled.igCheckboxEditor("option", "iconClass", "ui-icon-plus");
	assert.ok($chkInInputStyled.data("igCheckboxEditor")._editorInput.hasClass("ui-icon-plus"),
		"Plus icon not applied");
});

QUnit.test('[ID7] Check events', function (assert) {
	assert.expect(1);

	var $chkInSpan = this.addElementById(this.spanTag, 'checkBoxInSpan');

	$chkInSpan.igCheckboxEditor({
		valueChanging: function (evts, args) {
			return false;
		}
	});

	$chkInSpan.click();
	assert.ok(this.isChecked($chkInSpan, false),
		'The value should not be checked, cause the valueChanging event is canceled');
});

QUnit.test('[ID8] Check destroy', function (assert) {
	assert.expect(11);

	var $chkInInput = this.addElementById(this.divTag, 'checkBoxInInput'),
		$chkInSpan = this.addElementById(this.spanTag, 'checkBoxInSpan'),
		$chkInSpanWithAttr = this.addElementById(this.spanTag, 'checkBoxInSpanWithAttr');

	$chkInInput.igCheckboxEditor();
	$chkInSpan.igCheckboxEditor();
	$chkInSpanWithAttr.attr({
		name: "name1",
		value: "value1",
		checked: "checked",
		readonly: "readonly",
		disabled: "disabled",
		"aria-labelledby": "aria-labelledby"
	});
	$chkInSpanWithAttr.igCheckboxEditor();

	// Put some wrong value to the true/false values and expect an exception
	assert.throws(function () {
			$chkInInput.igCheckboxEditor("value", "fail");
		},
		Error($.ig.Editor.locale.cannotParseNonBoolValue),
		"igCheckboxEditor acepted wrong value."
	);

	$chkInSpan.igCheckboxEditor("destroy");
	$chkInInput.igCheckboxEditor("destroy");
	assert.equal($chkInSpan.data("igCheckboxEditor"), undefined, 'Error destroying igCheckboxEditor in an input');
	assert.equal($chkInInput.data("igCheckboxEditor"), undefined, 'Error destroying igCheckboxEditor in a div');
	$._data($chkInSpan[0], "events");
	$._data($chkInInput[0], "events");
	assert.ok($chkInSpan.attr("class") === undefined, "Some classes are still not removed");
	assert.ok($chkInInput.attr("class") === undefined, "Some classes are still not removed");

	// Are the attributes recovered
	$chkInSpanWithAttr.igCheckboxEditor("destroy");
	assert.equal($chkInSpanWithAttr.attr("name"), "name1", "Attr is not recovered after destroying");
	assert.equal($chkInSpanWithAttr.attr("value"), "value1", "Attr is not recovered after destroying");
	assert.equal($chkInSpanWithAttr.attr("checked"), "checked", "Attr is not recovered after destroying");
	assert.equal($chkInSpanWithAttr.attr("readonly"), "readonly", "Attr is not recovered after destroying");
	assert.equal($chkInSpanWithAttr.attr("disabled"), "disabled", "Attr is not recovered after destroying");
	assert.equal($chkInSpanWithAttr.attr("aria-labelledby"), "aria-labelledby",
		"Attr is not recovered after destroying");
});

QUnit.test('[ID9] Check label click support', function (assert) {
	assert.expect(8);

	var checkBoxInInput1 = 'checkBoxInInput1',
		$chkLabel1 = this.addElementById(this.labelTag, "label1"),
		$chkInInput1 = this.addElementById(this.inputTag, checkBoxInInput1),
		checkBoxInInput2 = 'checkBoxInInput2',
		$chkLabel2 = this.addElementById(this.labelTag, "label2"),
		$chkInInput2 = this.addElementById(this.inputTag, checkBoxInInput2);

	$chkLabel1.attr('for', checkBoxInInput1).text("Label 1");
	$chkInInput1.igCheckboxEditor();
	$chkLabel2.attr('for', checkBoxInInput2).text("Label 2");
	$chkInInput2.igCheckboxEditor({
		value: "accpetedRules"
	});

	// state == value, state != internal
	this.click($chkLabel1); // only native click works for labels
	assert.ok(this.isChecked($chkInInput1, true, true), 'Clicking the label did not toggle the ckeckbox');
	assert.strictEqual($chkInInput1.data("igCheckboxEditor")._valueInput[0].checked, true,
		"Internal input checked was modified incorrectly without explicit value!");

	this.click($chkLabel1);
	assert.ok(this.isChecked($chkInInput1, false, false), 'Clicking the label did not toggle the ckeckbox');
	assert.strictEqual($chkInInput1.data("igCheckboxEditor")._valueInput[0].checked, true,
		"Internal input checked was modified incorrectly without explicit value!");

	// state != value, state == internal
	this.click($chkLabel2); // only native click works for labels
	assert.ok(this.isChecked($chkInInput2, "accpetedRules", true), 'Clicking the label did not toggle the ckeckbox');
	assert.strictEqual($chkInInput2.data("igCheckboxEditor")._valueInput[0].checked, true,
		"Internal input checked was modified incorrectly without explicit value!");

	this.click($chkLabel2);
	assert.ok(this.isChecked($chkInInput2, "accpetedRules", false), 'Clicking the label did not toggle the ckeckbox');
	assert.strictEqual($chkInInput2.data("igCheckboxEditor")._valueInput[0].checked, false,
		"Internal input checked was modified incorrectly without explicit value!");
});

QUnit.test('[ID10] Check focus using the focus API', function (assert) {
	assert.expect(5);

	var done = assert.async(),
		$chkInInput = this.addElementById(this.inputTag, 'checkBoxInInput'),
		$chkInInputStyled = this.addElementById(this.spanTag, 'checkBoxInInputStyled'),
		css;

	$chkInInput.igCheckboxEditor();
	$chkInInputStyled.igCheckboxEditor({
		iconClass: "ui-icon-close",
		checked: true
	});
	css = $chkInInputStyled.data('igCheckboxEditor').css;

	$chkInInputStyled.igCheckboxEditor("setFocus");
	assert.ok($chkInInputStyled.igCheckboxEditor("editorContainer").hasClass(css.focus), "Focus class not applied");
	assert.ok($(document.activeElement).html() === $chkInInputStyled.igCheckboxEditor("editorContainer").html(),"Focus class not applied");
	$chkInInput.igCheckboxEditor("setFocus");
	assert.ok($chkInInput.igCheckboxEditor("editorContainer").hasClass(css.focus), "Focus class not removed");

	$chkInInput.igCheckboxEditor("editorContainer").blur();
	$chkInInput.igCheckboxEditor("setFocus", 500);
	assert.notOk($chkInInput.igCheckboxEditor("editorContainer").hasClass(css.focus),"Focus class should not be still applied");
	setTimeout(function () {
		assert.ok($chkInInput.igCheckboxEditor("editorContainer").hasClass(css.focus), "Focus class should be applied");
		$chkInInput.remove();
		done();
	}, 500);
});

QUnit.test('[ID11] Check exception when setting null', function (assert) {
	assert.expect(1);

	var $chkInSpan = this.addElementById(this.spanTag, 'checkBoxInSpan');
	$chkInSpan.igCheckboxEditor();

	assert.throws(
		function () {
			$chkInSpan.igCheckboxEditor("value", null);
		},
		Error($.ig.Editor.locale.cannotSetNonBoolValue),
		$.ig.Editor.locale.cannotSetNonBoolValue);
});

QUnit.test('[ID12]Testing key code event arguments', function (assert) {
	assert.expect(3);

	var done = assert.async(),
		$chkInInput = this.addElementById(this.inputTag, 'checkBoxInInput'),
		keyD,
		keyP,
		keyU;

	$chkInInput.igCheckboxEditor({
		keydown: function (e, args) {
			keyD = args.key;
		},
		keypress: function (e, args) {
			keyP = args.key;
		},
		keyup: function (e, args) {
			keyU = args.key;
		}
	});

	$.ig.TestUtil.keyInteraction(32, $chkInInput);

	setTimeout(function () {
		assert.ok(keyD === 32, "Key code is not correct in keyDown event");
		assert.ok(keyP === 32, "Key code is not correct in keyPress event");
		assert.ok(keyU === 32, "Key code is not correct in keyUp event");
		$chkInInput.remove();
		done();
	}, 300);
});