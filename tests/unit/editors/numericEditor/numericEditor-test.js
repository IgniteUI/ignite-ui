$(document).ready(function () {
	QUnit.module("igNumericEditor ", {
		divTag: '<div></div>',
		inputTag: '<input />',
		util: $.ig.TestUtil,

		beforeEach: function () { },

		afterEach: function () { },
	});

	QUnit.test('Numeric Editor initialization.', function (assert) {
		assert.expect(11);

		var $editorInInput = this.util.appendToFixture(this.inputTag).attr("type", "text"),
			$editorInDiv = this.util.appendToFixture(this.divTag),
			$editorInDivWithException = this.util.appendToFixture(this.divTag),
			$editorInInputScn = this.util.appendToFixture(this.inputTag).attr("type", "text"),
			$editorInDivScn = this.util.appendToFixture(this.divTag);

		$editorInInput.igNumericEditor({
			value: 10,
			numericMaxDecimals: 5,
			numericMinDecimals: 4,
			maxLength: 10
		});

		$editorInDiv.igNumericEditor({
			value: 30,
			numericMaxDecimals: 6,
			numericMinDecimals: 3
		});

		try {
			$editorInDivWithException.igNumericEditor({
				buttonType: "dropdown,spin,clear,nonvalid",
				listItems: [1, 2, 3],
				revertIfNotValid: false,
				isLimitedToListValues: true,
				spinDelta: -69 // this is not valid and EXCEPTION is thrown. Needed for coverage.
			});
		} catch (e) { }

		$editorInInputScn.igNumericEditor({
			scientificFormat: "e",
			value: 4
		});

		$editorInDivScn.igNumericEditor({
			scientificFormat: "E",
			spinDelta: 2,
			value: -10
		});

		assert.ok(typeof ($editorInInput.igNumericEditor) === 'function', "Editors Script is not loaded");
		assert.ok($editorInInput.data("igNumericEditor") !== undefined, 'Error creating igNumericEditor in an input');
		assert.ok($editorInDiv.data("igNumericEditor") !== undefined, 'Error creating igNumericEditor in a div');
		assert.ok($editorInDivWithException.data("igNumericEditor") !== undefined, 'Error creating igNumericEditor in a div')
		assert.equal($editorInInput.igNumericEditor("value"), 10, 'The initial value is not as expexted');
		assert.equal($editorInDiv.igNumericEditor("value"), 30, 'The initial value is not as expexted');

		//internal value parse
		assert.strictEqual($editorInInput.data("igNumericEditor")._valueFromText("-3.33333"), -3.33333, "The parsed value is not correct");
		assert.equal($editorInDivScn.data("igNumericEditor")._valueFromText("-2e+1"), -2E+1, "The parsed value is not correct");
		assert.strictEqual($editorInDivScn.data("igNumericEditor")._valueFromText("-5000000000000000000000"), -5e+21, "The parsed value is not correct");
		assert.strictEqual($editorInInputScn.data("igNumericEditor")._valueFromText("2.2e+1"), 22, "The parsed value is not correct");

		assert.strictEqual($editorInInput.igNumericEditor("option", "maxLength"), null, "maxLength is not supported on the numeric editor");
	});

	QUnit.test('Min/max initialization.', function (assert) {
		assert.expect(3);
		$editorInInput = this.util.appendToFixture(this.inputTag).attr("type", "text");

		// min
		$editorInInput.igNumericEditor({
			value: 5,
			minValue: 9
		});
		assert.strictEqual($editorInInput.igNumericEditor("value"), 9, 'The initial value is not set to min');

		//max
		$editorInInput.igNumericEditor({
			value: 100,
			minValue: 3,
			maxValue: 88
		});
		assert.strictEqual($editorInInput.igNumericEditor("value"), 88, 'The initial value is not set to max');

		//attr value
		$editorInInput.igNumericEditor({
			maxValue: 15
		});
		assert.strictEqual($editorInInput.igNumericEditor("value"), 15, 'The initial value is not set to max');
	});

	QUnit.test("Events testing", function (assert) {
		assert.expect(8);

		var $editor = this.util.appendToFixture(this.inputTag).attr("type", "text"),
			editorInput,
			text,
			textChanged = 0,
			done = assert.async(),
			util = this.util;

		$editor.igNumericEditor({
			buttonType: "dropdown,spin,clear,nonvalid",
			width: 200,
			listWidth: 200,
			height: 20,
			listItems: [1, 2, 3],
			dropDownAnimationDuration: 0,
			revertIfNotValid: false,
			isLimitedToListValues: true,
			// value: 1
		});

		editorInput = $editor.igNumericEditor("field");
		text = editorInput.val();

		editorInput.focus();
		$editor.on("ignumericeditortextchanged", function (evt, args) {
			assert.equal(args.text, text, "Text changed event is not fired with correct new value");
			textChanged++;
		});
		setTimeout(function () {
			text += "1";
			util.keyInteraction(text.charCodeAt(text.length - 1), editorInput);
			assert.equal(textChanged, 1, "textChanged event not fired");
			text += "2";
			util.keyInteraction(text.charCodeAt(text.length - 1), editorInput);
			assert.equal(textChanged, 2, "textChanged event not fired");
			text += "3";
			util.keyInteraction(text.charCodeAt(text.length - 1), editorInput);
			assert.equal(textChanged, 3, "textChanged event not fired");
			text += "4";
			util.keyInteraction(text.charCodeAt(text.length - 1), editorInput);
			assert.equal(textChanged, 4, "textChanged event not fired");
			$editor.off("ignumericeditortextchanged");
			done();
		}, 100);
	});

	QUnit.test("Spin buttons disabling when the min/max value is exceeded", function (assert) {
		assert.expect(22);

		var $editorInDiv = this.util.appendToFixture(this.divTag),
			container,
			containerInput,
			spinUpButton,
			spinDownButton;

		$editorInDiv.igNumericEditor({
			minValue: 10,
			maxValue: 99,
			value: 10,
			buttonType: "spin",
			spinWrapAround: false
		});

		container = $editorInDiv.igNumericEditor("editorContainer");
		containerInput = $editorInDiv.igNumericEditor("field");
		spinUpButton = $editorInDiv.igNumericEditor("spinUpButton");
		spinDownButton = $editorInDiv.igNumericEditor("spinDownButton");

		//spin down to disable spin Down button
		this.util.click(spinDownButton[0]);
		$editorInDiv.igNumericEditor("option", "suppressNotifications", true);
		//assert.equal(container.find("span:contains('Min value exceeded')").length, 1, "Notifier text 'Min value exceeded' is missing");
		assert.equal($editorInDiv.igNumericEditor("value"), "10", "The minValue is not respected");
		assert.equal(spinDownButton.hasClass("ui-state-disabled"), true, "Button spinDown is not disabled");
		assert.equal(spinDownButton.attr("disabled"), "disabled", "Button spinDown desn't have disabled attribute");
		assert.notOk($editorInDiv.hasClass($.ui.igNotifier.prototype.css.warningState), "The minMaxDisableSpins has warning class with suppressed notifications");

		// spin up to remove disabled state
		this.util.click(spinUpButton[0]);
		//assert.equal(container.find("span:contains('Min value exceeded')").length, 0, "Notifier text 'Min value exceeded' is not hidden");
		assert.equal($editorInDiv.igNumericEditor("value"), "11", "The minValue is not respected");
		assert.equal(spinDownButton.hasClass("ui-state-disabled"), false, "Button spinDown is not disabled");
		assert.equal(spinDownButton.attr("disabled"), undefined, "Button spinDown desn't have disabled attribute");

		$editorInDiv.igNumericEditor("value", 99);
		container.blur();

		this.util.click(spinUpButton[0]);
		//assert.equal(container.find("span:contains('Max value exceeded')").length, 1, "Notifier text 'Max value exceeded' is missing");
		assert.equal($editorInDiv.igNumericEditor("value"), "99", "The maxValue is not respected");
		assert.equal(spinUpButton.hasClass("ui-state-disabled"), true, "Button spinUp is not disabled");
		assert.equal(spinUpButton.attr("disabled"), "disabled", "Button spinDown desn't have disabled attribute");

		// spin down to remove disabled state
		this.util.click(spinDownButton[0]);
		//assert.equal(container.find("span:contains('Max value exceeded')").length, 0, "Notifier text 'Max value exceeded' is not hidden");
		assert.equal($editorInDiv.igNumericEditor("value"), "98", "The minValue is not respected");
		assert.equal(spinDownButton.hasClass("ui-state-disabled"), false, "Button spinDown is not disabled");
		assert.equal(spinDownButton.attr("disabled"), undefined, "Button spinDown desn't have disabled attribute");

		$editorInDiv.igNumericEditor("option", "suppressNotifications", false);
		this.util.click(spinUpButton[0]);
		assert.ok($editorInDiv.hasClass($.ui.igNotifier.prototype.css.warningState), "The minMaxDisableSpins missing warning class without suppressed notifications");

		// with decimalSeparator in edit mode
		$editorInDiv.remove();
		$editorInDiv = this.util.appendToFixture(this.inputTag).igNumericEditor({
			buttonType: "spin",
			maxValue: 15,
			minValue: 5,
			value: 14.7,
			decimalSeparator: ",",
			groupSeparator: ".",
		});
		spinUpButton = $editorInDiv.igNumericEditor("spinUpButton");
		spinDownButton = $editorInDiv.igNumericEditor("spinDownButton");

		$editorInDiv.focus();
		this.util.click(spinUpButton[0]);
		assert.ok($editorInDiv.igNumericEditor("editorContainer").data("igNotifier") && $editorInDiv.igNumericEditor("editorContainer").igNotifier("isVisible"),
			"No warning message shown for exceeding max value on spin");
		assert.ok(spinUpButton.hasClass("ui-state-disabled"), "Button spinUp is not disabled");
		assert.equal($editorInDiv.igNumericEditor("editorContainer").data("igNotifier") && $editorInDiv.igNumericEditor("editorContainer").igNotifier("container").text(),
			$.ig.Editor.locale.maxValErrMsg.replace("{0}", 15));
		assert.equal($editorInDiv.igNumericEditor("field").val(), "15", "Text not set to the maximum on spin up");
		$editorInDiv.igNumericEditor("value", 5.5);
		this.util.click(spinDownButton[0]);
		assert.ok($editorInDiv.igNumericEditor("editorContainer").data("igNotifier") && $editorInDiv.igNumericEditor("editorContainer").igNotifier("isVisible"),
			"No warning message shown for exceeding min value on spin");
		assert.ok(spinDownButton.hasClass("ui-state-disabled"), "Button spinDown is not disabled");
		assert.equal($editorInDiv.igNumericEditor("editorContainer").data("igNotifier") && $editorInDiv.igNumericEditor("editorContainer").igNotifier("container").text(),
			$.ig.Editor.locale.minValErrMsg.replace("{0}", 5));
		assert.equal($editorInDiv.igNumericEditor("field").val(), "5", "Text not set to the minimum on spin down");
	});

	QUnit.test('Clear value', function (assert) {
		assert.expect(7);
		var $numericEditor = this.util.appendToFixture(this.divTag),
			editorInput,
			clearButton,
			done = assert.async();

		$numericEditor.igNumericEditor({
			value: 1,
			nullValue: 7777,
			buttonType: "clear",
			listItems: ["111", "222", "333"],
			dropDownAttachedToBody: true,
			allowNullValue: true
		});
		editorInput = $numericEditor.igNumericEditor("field"),
			clearButton = $numericEditor.igNumericEditor("clearButton"),

			assert.equal($numericEditor.igNumericEditor("value"), "1", "Initial value is not correct");

		$numericEditor.igNumericEditor("option", "value", "-214");
		assert.equal($numericEditor.igNumericEditor("value"), "-214", "New value is not correct");
		assert.ok($(editorInput).hasClass("ui-igedit-negative"), "The selected item is missing ui-igedit-negative class applied");

		$numericEditor.igNumericEditor("setFocus");
		setTimeout(function () {
			assert.notOk(editorInput.hasClass("ui-igedit-negative"), "The selected item has ui-igedit-negative class applied");
			clearButton.click();
			assert.equal(editorInput.val(), "7777", "Text after cleaning is not correct");
			editorInput.blur();
			assert.equal($numericEditor.igNumericEditor("value"), "7777", "Value after cleaning is not correct");
			$numericEditor.igNumericEditor("option", "width", 230);
			assert.equal($numericEditor.igNumericEditor("option", "width"), 230, "Value after cleaning is not correct");
			done();
		}, 100);
	});

	QUnit.test("Clear Button", function (assert) {
		assert.expect(3);

		var $editor = this.util.appendToFixture(this.divTag),
			clearButton;

		$editor.igNumericEditor({
			value: "001",
			buttonType: "clear",
			allowNullValue: true,
		});

		clearButton = $editor.igNumericEditor("clearButton");
		assert.equal($editor.igNumericEditor("value"), "001", "Initial value is not correct");

		clearButton.click();
		assert.equal($editor.igNumericEditor("value"), null, "Value after cleaning is not correct");

		$editor.igNumericEditor("value", 2);
		$editor.igNumericEditor("option", "allowNullValue", false);
		$editor.igNumericEditor("option", "allowNullValue", false); // Set twice so we ensure that the same value is not set and coverage is fullfilled.
		$editor.igNumericEditor("value", "abc");
		clearButton.click();
		assert.equal($editor.igNumericEditor("value"), "", "Value after cleaning is not correct");
	});

	QUnit.test('Convert Scientific to Numeric', function (assert) {
		assert.expect(1);

		var $editor = this.util.appendToFixture(this.divTag);

		$editor.igNumericEditor({
			scientificFormat: "e",
			value: 4
		});

		assert.equal($editor.igNumericEditor("value"), 4, 'The initial value is not as expexted');
	});

	QUnit.test("Spin Delta", function (assert) {
		assert.expect(11);

		var $editor = this.util.appendToFixture(this.divTag),
			// editorInput = container.igNumericEditor("field"),
			buttonUp;

		$editor.igNumericEditor({
			buttonType: "spin",
			spinDelta: 3,
			value: 0
		});

		buttonUp = $editor.igNumericEditor("spinUpButton");

		this.util.click(buttonUp[0]);
		assert.equal($editor.igNumericEditor("value"), 3, "Value is not correct");

		$editor.igNumericEditor("option", "spinDelta", 2)
		this.util.click(buttonUp[0]);
		assert.equal($editor.igNumericEditor("value"), 5, "Value is not correct");
		assert.throws(
			function () {
				$editor.igNumericEditor("option", "spinDelta", -2);
			}, "Error should be thrown");

		this.util.click(buttonUp[0]);
		assert.equal($editor.igNumericEditor("value"), 7, "Value is not correct");

		assert.throws(
			function () {
				$editor.igNumericEditor("option", "spinDelta", "alex");
			}, "Error should be thrown");

		this.util.click(buttonUp[0]);
		assert.equal($editor.igNumericEditor("value"), 9, "Value is not correct");

		$editor.igNumericEditor("option", "maxDecimals", 2);
		$editor.igNumericEditor("option", "spinDelta", 2.123456789);
		this.util.click(buttonUp[0]);
		assert.equal($editor.igNumericEditor("value"), 11.12, "Value is not correct");

		assert.throws(
			function () {
				$editor.igNumericEditor("option", "maxDecimals", "");
				$editor.igNumericEditor("option", "spinDelta", 2.1294);
			}, "Error should be thrown");

		this.util.click(buttonUp[0]);
		assert.equal($editor.igNumericEditor("value"), 13.24, "Value is not correct");

		$editor.remove();
		$editor = this.util.appendToFixture(this.divTag);
		$editor.igNumericEditor({
			dataMode: "int",
			buttonType: "spin",
			value: 1
		});

		buttonUp = $editor.igNumericEditor("spinUpButton");

		assert.throws(
			function () {
				$editor.igNumericEditor("option", "spinDelta", 2.127);
			}, "Error should be thrown");

		this.util.click(buttonUp[0]);
		assert.equal($editor.igNumericEditor("value"), 2, "Value is not correct");
	});

	QUnit.test("Spin via keyboard", function (assert) {
		assert.expect(4);

		var $editor = this.util.appendToFixture(this.divTag),
			editorInput,
			flag;

		$editor.igNumericEditor({
			buttonType: "spin",
			spinDelta: 3,
			value: 0
		});

		editorInput = $editor.igNumericEditor("field");

		$editor.on("ignumericeditorkeypress", function () {
			flag = true;
		});

		$editor.igNumericEditor("option", "value", 0);
		$editor.igNumericEditor("option", "spinDelta", 2);
		$editor.click();
		this.util.keyInteraction(38, editorInput);
		assert.notOk(flag, "up is not send");

		$editor.blur();
		assert.equal($editor.igNumericEditor("value"), 2, "The value is not correct");
		flag = false;

		$editor.click();
		this.util.keyInteraction(40, editorInput);
		assert.notOk(flag, "down is not send");

		$editor.blur();
		assert.equal($editor.igNumericEditor("value"), 0, "The value is not correct");
	});

	QUnit.test("Keys tests", function (assert) {
		assert.expect(3);

		var $editorInInput = this.util.appendToFixture(this.inputTag).attr("type", "text"),
			$editorFloat = this.util.appendToFixture(this.divTag),
			$editorDouble = this.util.appendToFixture(this.divTag),
			editorInput,
			i = 0;

		$editorInInput.igNumericEditor({
			value: 10,
			numericMaxDecimals: 5,
			numericMinDecimals: 4
		});

		$editorFloat.igNumericEditor({
			value: "123.6548",
			numericMaxDecimals: 7,
			dataMode: "float",
		});

		$editorDouble.igNumericEditor({
			value: "123.6548",
			numericMaxDecimals: 15,
			numericMinDecimals: 3,
			width: 300,
			dataMode: "double",
			numericGroups: [3, 2, 1]
		});

		$editorDouble.one("ignumericeditorkeypress", function (evt, ui) {
			if (i == 0) {
				assert.equal(evt.keyCode, 51, "The keyCode is not equal to 51");
				i++;
			} else {
				assert.equal(evt.keyCode, 54, "The keyCode is not equal to 54");
				i = 0;
			}
		});

		editorInput = $editorInInput.igNumericEditor("field");
		$editorInInput.one("ignumericeditorfocus", function () {
			editorInput.val(12);
			editorInput.trigger("blur");
		});

		$editorInInput.one("ignumericeditorvaluechanged", function () {
			assert.equal(editorInput = $editorInInput.igNumericEditor("value"), "12", "The value is not as expected");
		});
		editorInput.trigger("focus");

		editorInput = $editorFloat.igNumericEditor("field");
		$editorFloat.one("ignumericeditorfocus", function () {
			editorInput.val("12.321654987");
			editorInput.trigger("blur");
		});

		$editorFloat.one("ignumericeditorvaluechanged", function () {
			assert.equal(editorInput = $editorFloat.igNumericEditor("value"), "12.321655", "The value is not as expected");
		});

		editorInput.trigger("focus");

		editorInput = $editorDouble.igNumericEditor("field");
		$editorDouble.one("ignumericeditorfocus", function () {
			keyPressChar(51, editorInput);
			keyPressChar(54, editorInput);
			editorInput.trigger("blur");
		});

		editorInput.trigger("focus");
	});

	QUnit.test("Default Data mode", function (assert) {
		assert.expect(1);

		var $editor = this.util.appendToFixture(this.divTag);
		$editor.igNumericEditor({
			dataMode: "nba",
		});

		assert.equal($editor.igNumericEditor("option", "dataMode"), "double", "The default data mode is not set");
	});

	QUnit.test("Default selectionOnFocus", function (assert) {
		assert.expect(2);

		var $editor = this.util.appendToFixture(this.divTag),
			input;

		$editor.igNumericEditor({
			selectionOnFocus: "browserDefault"
		});

		input = $editor.igNumericEditor("field");

		assert.equal($editor.igNumericEditor("option", "selectionOnFocus"), "browserDefault", "The selectionOnFocus is not correct");
		$editor.igNumericEditor("option", "value", "905");
		input.focus();
		input.blur();
		assert.equal($editor.igNumericEditor("value"), "905", "The value is not correct");
	});

	QUnit.test("Min/Max value", function (assert) {
		assert.expect(15);

		var $editor = this.util.appendToFixture(this.inputTag).attr("type", "text"),
			input;

		$editor.igNumericEditor({
			minValue: 10,
			maxValue: 99,
			excludeKeys: "ABC",
			decimalSeparator: ".",
			selectionOnFocus: "atEnd",
			revertIfNotValid: true
		});

		input = $editor.igNumericEditor("field");

		$editor.igNumericEditor("value", 9);
		assert.equal($editor.igNumericEditor("value"), 10, "The minValue is not respected");

		$editor.igNumericEditor("value", 100);
		assert.equal($editor.igNumericEditor("value"), 99, "The maxValue is not respected");

		$editor.igNumericEditor("value", "fail");
		assert.equal($editor.igNumericEditor("value"), 99, "The maxValue is not respected");

		$editor.igNumericEditor("value", null);
		assert.equal($editor.igNumericEditor("value"), 99, "The maxValue is not respected");

		// runtime changes:
		$editor.remove();
		$editor = this.util
			.appendToFixture(this.inputTag)
			.attr("type", "text")
			.igNumericEditor({
				value: 5
			});

		$editor.igNumericEditor("option", "minValue", -150);
		assert.strictEqual($editor.igNumericEditor("value"), 5, "Value should remain the same");

		$editor.igNumericEditor("option", "maxValue", 5);
		assert.strictEqual($editor.igNumericEditor("value"), 5, "Value should remain the same");

		$editor.igNumericEditor("option", "maxValue", 4);
		assert.strictEqual($editor.igNumericEditor("value"), 4, "Value should be set to max");

		input = $editor.igNumericEditor("field");
		assert.equal(input.val(), "4", "Text not updated with max value");

		$editor.igNumericEditor("value", 0);
		$editor.igNumericEditor("option", "minValue", 1);
		assert.strictEqual($editor.igNumericEditor("value"), 1, "Value should be set to min");
		assert.equal(input.val(), "1", "Text not updated with min value");

		$editor.focus();
		input.val("3");
		$editor.igNumericEditor("option", "minValue", 2);
		assert.strictEqual($editor.igNumericEditor("value"), 2, "Value not set to min while editing");
		assert.equal(input.val(), "3", "Editing text should remain unchanged");

		input.blur();
		assert.strictEqual($editor.igNumericEditor("value"), 3, "Value not updated after changing min");

		// ensure base dataMode min/max, double:
		$editor.igNumericEditor("option", "minValue", null);
		$editor.igNumericEditor("option", "maxValue", null);
		assert.equal($editor.igNumericEditor("option", "minValue"), -(Number.MAX_VALUE), "minValue not set to null");
		assert.equal($editor.igNumericEditor("option", "maxValue"), Number.MAX_VALUE, "maxValue not set to null");
	});

	QUnit.test("Scientific spin buttons", function (assert) {
		assert.expect(2);

		var $editorSCI = this.util.appendToFixture(this.divTag),
			$editorSCIEPlus = this.util.appendToFixture(this.divTag),
			spinUpButton;

		$editorSCI.igNumericEditor({
			scientificFormat: "e",
			buttonType: "spin"
		});

		$editorSCIEPlus.igNumericEditor({
			scientificFormat: "e+",
			buttonType: "spin"
		});

		spinUpButton = $editorSCI.igNumericEditor("spinUpButton");

		var container = $('#scientificFormat'),
			containerInput = container.igNumericEditor("field"),
			listUp = container.igNumericEditor("spinUpButton"),
			containerEPlus = $('#scientificFormatEPlus'),
			listUpEPlus = containerEPlus.igNumericEditor("spinUpButton");

		$editorSCI.igNumericEditor("value", 0);
		this.util.click(spinUpButton[0]);
		assert.equal($editorSCI.igNumericEditor("value"), "1e+0", "Value is not correct");

		$editorSCIEPlus.igNumericEditor("value", 0);
		spinUpButton = $editorSCIEPlus.igNumericEditor("spinUpButton");
		this.util.click(spinUpButton[0]);
		assert.equal($editorSCIEPlus.igNumericEditor("value"), "1e+0", "Value is not correct");
	});

	QUnit.test("Scientific format", function (assert) {
		assert.expect(6);

		var $editor = this.util.appendToFixture(this.divTag),
			$editorFocus = this.util.appendToFixture(this.divTag),
			input;

		$editor.igNumericEditor({
			scientificFormat: "e",
			buttonType: "spin"
		});

		$editorFocus.igNumericEditor();

		input = $editor.igNumericEditor("field");

		input.click();
		$editor.igNumericEditor("option", "value", "94");
		$editorFocus.click();
		assert.equal(input.val(), "9.4e1", "Text is not correct");

		//Change scientificFormat to "E"
		$editor.igNumericEditor("option", "scientificFormat", "E");
		$editor.igNumericEditor("option", "value", "6441");
		assert.equal(input.val(), "6.441E3", "Text is not correct");

		//Change scientificFormat to "E+"
		$editor.igNumericEditor("option", "scientificFormat", "E+");
		input.click();
		$editor.igNumericEditor("option", "value", "22");
		$editorFocus.click();
		assert.equal(input.val(), "2.2E+1", "Text is not correct");
		assert.strictEqual($editor.igNumericEditor("option", "value"), 22, "Text is not correct");

		//Change scientificFormat to invalid value
		assert.throws(function () {
			$editor.igNumericEditor("option", "scientificFormat", "s");
		},
			Error($.ig.Editor.locale.scientificFormatErrMsg),
			"Accepted value with wrong scientificFormat.");

		$editorFocus.click();
		assert.equal(input.val(), "2.2E+1", "Value is not correct");
	});

	QUnit.test("Convert between Scientific and fixed-point formats (dateMode, scientificFormat, min/maxDecimals)", function (assert) {
		assert.expect(76);

		var $editor,
			$editorInput,
			done = assert.async(),
			util = this.util,
			setup = [{
				//1: #761: Wrong value when setting the value to a number with too many digits
				options: { dateMode: "double", value: 1e-21 },
				value: 0,
				displayed: "0",
				editText: "0"
			}, {
				//2: Auto-convert from parsing (parse with diff separator)
				options: { dateMode: "double", value: "1,11e+15", decimalSeparator: ",", groupSeparator: "" },
				value: 1.11e+15,
				displayed: "1110000000000000",
				editText: "1110000000000000"
			}, {
				//3: Auto-convert from parsing
				options: { dateMode: "double", value: "1e-2" },
				value: 0.01,
				displayed: "0.01",
				editText: "0.01"
			}, {
				//4: Forced fixed-point conversion:
				options: { dateMode: "double", value: 1e-7, maxDecimals: 7 },
				value: 1e-7,
				displayed: "0.0000001",
				editText: "0.0000001"
			}, {
				//5: Can't convert very big numbers to fixed:
				options: { dateMode: "double", value: 1e21 },
				value: 1e+21,
				displayed: "1e+21",
				editText: "1e21"
			}, {
				//6: Force convert to int
				options: { dateMode: "int", value: 1e-21 },
				value: 0,
				displayed: "0",
				editText: "0"
			}, {
				//7: Round decimals
				options: { scientificFormat: "e", value: 1.332e-7, maxDecimals: 2 },
				value: 1.33e-7,
				displayed: "1.33e-7",
				editText: "1.33e-7"
			}, {
				//8: Round decimals, decimalSeparator
				options: { scientificFormat: "e+", decimalSeparator: ",", groupSeparator: " ", value: 1.338e-7 },
				value: 1.34e-7,
				displayed: "1,34e-7",
				editText: "1,34e-7"
			}, {
				//9: 
				options: { scientificFormat: "e+", value: 1, dataMode: "int" },
				value: 1,
				displayed: "1e+0",
				editText: "1e0"
			}, {
				//10: positive exponents ignore max decimals:
				options: { scientificFormat: "E", value: 1234, dataMode: "int", maxDecimals: 2 },
				value: 1234,
				displayed: "1.234E3",
				editText: "1.234E3"
			}, {
				//11: positive exponents ignore max decimals:
				options: { scientificFormat: "e", value: 1234, dataMode: "double", maxDecimals: 2 },
				value: 1234,
				displayed: "1.234e3",
				editText: "1.234e3"
			}, {
				//12: format + decimalSeparator
				options: { scientificFormat: "E+", value: 123, dataMode: "int", decimalSeparator: ",", groupSeparator: " ", },
				value: 123,
				displayed: "1,23E+2",
				editText: "1,23E2"
			}, {
				//13: positive format set on negative expo value
				options: { dataMode: 'double', value: 1e-7, maxDecimals: 15, scientificFormat: "E+" },
				value: 1e-7,
				displayed: "1E-7",
				editText: "1E-7"
			}, {
				//14: Very large scientific in int mode (caps at maxValue)
				options: { value: 1e+45, dataMode: "int" },
				value: 2147483647, //intMaxValue
				displayed: "2,147,483,647",
				editText: "2147483647"
			}, {
				//15: Very large scientific in double (no decimal cut)
				options: { value: 1.56547e+55, dataMode: "double", scientificFormat: "E+" },
				value: 1.56547e+55,
				displayed: "1.56547E+55",
				editText: "1.56547E55"
			}, {
				//16: Very small scientific in double (decimal round)
				options: { value: 1.56547e-55, dataMode: "double", scientificFormat: "E+" },
				value: 1.57e-55,
				displayed: "1.57E-55",
				editText: "1.57E-55"
			}, {
				//17: Very small scientific in float (decimal cut)
				options: { value: "1.5699e-51", dataMode: "float", roundDecimals: false, scientificFormat: "e" },
				value: 1.56e-51,
				displayed: "1.56e-51",
				editText: "1.56e-51"
			}, {
				//18: Value expand from sting entry
				options: { value: "156.547e-53", dataMode: "float", roundDecimals: false, scientificFormat: "e" },
				value: 1.56e-51,
				displayed: "1.56e-51",
				editText: "1.56e-51"
			}];

		for (var i = 0; i < setup.length; i++) {
			$editor = this.util.appendToFixture(this.inputTag).igNumericEditor(setup[i].options);
			$editorInput = $editor.igNumericEditor("field");

			assert.strictEqual($editor.igNumericEditor("value"), setup[i].value, "Value did not match expected for setup:" + (i + 1));
			assert.equal($editorInput.val(), setup[i].displayed, "Display text did not match expected for setup:" + (i + 1));

			$editor.trigger("focus");
			assert.equal($editorInput.val(), setup[i].editText, "Edit Text did not match expected for setup:" + (i + 1));

			$editor.trigger("blur");
			//re-validate value after edit mode:
			assert.strictEqual($editor.igNumericEditor("value"), setup[i].value, "Value did not match expected for setup:" + (i + 1));
			$editor.remove();
		}

		// paste formatting:
		$editor = this.util.appendToFixture(this.inputTag).igNumericEditor({
			value: 2,
			dataMode: "double",
			scientificFormat: "E+"
		});

		$editor.trigger("focus")[0].select();
		this.util.paste($editor[0], "100");
		this.util.wait(20).then(function () {
			assert.equal($editor.val(), "1E2", "Edit Text not as expected on scientific format value paste.");
			$editor[0].select();
			util.paste($editor[0], "1e-22");
			return util.wait(20);
		}).then(function () {
			assert.equal($editor.val(), "1E-22", "Edit Text not as expected on scientific format value paste.");
			$editor.igNumericEditor("option", "scientificFormat", "e+");
			$editor[0].select();
			util.paste($editor[0], "23e+1");
			return util.wait(20);
		}).then(function () {
			assert.equal($editor.val(), "2.3e2", "Edit Text not as expected on scientific format value paste.");
			$editor.trigger("blur");
			assert.equal($editor.val(), "2.3e+2", "Display Text not as expected on scientific format value paste.");
			$editor.remove();
			done();
		}).catch(function (er) {
			assert.pushResult({ result: false, message: er.message });
			done();
			throw er;
		});
	});

	QUnit.test("Group and decimal Separators", function (assert) {
		assert.expect(5);

		var $editor = this.util.appendToFixture(this.inputTag),
			input,
			val = 1264.89;

		$editor.igNumericEditor({
			value: 10,
			numericMaxDecimals: 5,
			numericMinDecimals: 4
		});
		input = $editor.igNumericEditor("field");

		$editor.igNumericEditor("option", "groupSeparator", " ");
		$editor.igNumericEditor("option", "decimalSeparator", ",");
		$editor.igNumericEditor("option", "value", val);
		assert.equal(input.val(), "1 264,8900", "The decimal value is not correct"); // 1,264.8900

		// For 207132 Can't set groupSeparator to empty string, and decimalSeparator to comma
		$editor.igNumericEditor("option", "groupSeparator", "");
		$editor.igNumericEditor("option", "value", 1264.89);
		assert.equal($editor.igNumericEditor("displayValue"), "1264,8900", "The decimal value is not correct");

		// For when 208296 gets fixed
		$editor.igNumericEditor("option", "groupSeparator", ".");
		$editor.igNumericEditor("option", "value", "1264,89");
		assert.equal(input.val(), "1.264,8900", "The group separator was not applied is not correct");
		assert.equal($editor.igNumericEditor("value"), 1264.89, "Decimal value not parsed correctly with decimal ','");

		// For 207448: exception is thrown when trying to spin the value (with modified decimalSeparator)
		input.focus();
		keyInteraction(38, input); //arrow up
		input.blur();
		assert.equal($editor.igNumericEditor("value"), val + $editor.igNumericEditor("option", "spinDelta"), "Decimal value is not correct after spin");
	});

	QUnit.test("Multiple decimalSeparators", function (assert) {
		assert.expect(5);

		var $editor = this.util.appendToFixture(this.inputTag),
			$editorInDiv = this.util.appendToFixture(this.divTag),
			input,
			flag = false;

		$editor.igNumericEditor({
			minValue: 10,
			maxValue: 99,
			excludeKeys: "ABC",
			decimalSeparator: ".",
			selectionOnFocus: "atEnd",
			revertIfNotValid: true
		});

		$editorInDiv.igNumericEditor({
			value: "123.6548",
			numericMaxDecimals: 15,
			dataMode: "long",
		});

		input = $editor.igNumericEditor("field");

		$editor.on("ignumericeditorkeypress", function () {
			flag = true;
		});

		input.val("15.11");
		input.blur();
		assert.equal($editor.igNumericEditor("value"), "15.11", "The value is not correct");
		
		input.click();
		this.util.keyInteraction(190, input);
		assert.notOk(flag, "'.' char is typed");
		
		$editor.blur();
		assert.equal($editor.igNumericEditor("value"), "15.11", "The value is not correct");

		$editorInDiv.on("ignumericeditorkeypress", function () {
			flag = true;
		});

		input.click();
		this.util.keyInteraction(190, input);
		assert.ok(!flag, "'.' char is typed");
		
		$editor.blur();
		assert.equal($editorInDiv.igNumericEditor("value"), "123", "The value is not correct");
	});

	QUnit.test("Typing negative signs (multiple prevention, leading, scientific)", function (assert) {
		assert.expect(21);
		var $editor = $("<input />").appendTo("#testBedContainer").igNumericEditor({
			value: 3.33
		});
		// 46: ".", 45: "-", 65: "a", 94: "^"

		$editor.trigger("focus");
		$editor[0].setSelectionRange(0, 0);
		util.keyInteraction(45, $editor);
		assert.equal($editor.val(), "-3.33", "Negative sign was not allowed before a number");
		//move back in front:
		$editor[0].setSelectionRange(0, 0);
		util.keyInteraction(45, $editor);
		assert.equal($editor.val(), "-3.33", "Second negative sign should not be allowed");
		//try after:
		$editor[0].setSelectionRange(1, 1);
		util.keyInteraction(45, $editor);
		assert.equal($editor.val(), "-3.33", "Second negative sign should not be allowed");
		//try typing other stuff in front:
		$editor.val("-3");
		$editor[0].setSelectionRange(0, 0);
		util.keyInteraction(46, $editor);
		assert.equal($editor.val(), "-3", "Decimal should not be allowed before negative sign");
		$editor.val("-3");
		$editor[0].setSelectionRange(0, 0);
		util.keyInteraction(65, $editor);
		assert.equal($editor.val(), "-3", "Letter char should not be allowed before negative sign");
		$editor.remove();

		// unsigned
		$editor = $("<input />").appendTo("#testBedContainer").igNumericEditor({
			value: 5,
			dataMode: "ushort"
		});
		$editor.trigger("focus");
		$editor[0].setSelectionRange(0, 0);
		util.keyInteraction(45, $editor);
		assert.equal($editor.val(), "5", "Negative sign not allowed in unsigned modes");
		util.keyInteraction(55, $editor);
		assert.equal($editor.val(), "75", "Numeric key not accepted.");
		$editor[0].setSelectionRange(1, 1);
		util.keyInteraction(45, $editor);
		assert.equal($editor.val(), "75", "Negative sign not allowed in unsigned modes");
		$editor.remove();

		//scientific
		$editor = $("<input />").appendTo("#testBedContainer").igNumericEditor({
			value: 0,
			scientificFormat: "E"
		});
		$editor.trigger("focus");
		$editor[0].select();
		util.keyInteraction(45, $editor);
		assert.equal($editor.val(), "-", "Negative sign was not allowed to repalce entire value");
		util.keyInteraction(49, $editor);
		assert.equal($editor.val(), "-1", "1 was not allowed after negative sign");
		util.keyInteraction(101, $editor, "shiftKey");
		assert.equal($editor.val(), "-1E", "Negative sign was not allowed before a number");
		util.keyInteraction(45, $editor);
		assert.equal($editor.val(), "-1E-", "Negative sign was not allowed after exponent");
		util.keyInteraction(45, $editor);
		assert.equal($editor.val(), "-1E-", "Second negative sign should not be allowed after exponent");
		$editor[0].setSelectionRange(3, 3);
		util.keyInteraction(45, $editor);
		assert.equal($editor.val(), "-1E-", "Second exponent negative sign should not be allowed.");
		$editor[0].setSelectionRange(4, 4);
		util.keyInteraction(55, $editor);
		assert.equal($editor.val(), "-1E-7", "Number should be allowed after negative sign in exponent");
		util.keyInteraction(45, $editor);
		assert.equal($editor.val(), "-1E-7", "Second exponent negative sign should not be allowed.");
		$editor.val("-1E1");
		$editor[0].setSelectionRange(3, 3);
		util.keyInteraction(45, $editor);
		assert.equal($editor.val(), "-1E-1", "Negative sign was not allowed after exponent");
		$editor.remove();

		//change default sign:
		$editor = $("<input />").appendTo("#testBedContainer").igNumericEditor({
			value: 55,
			negativeSign: "^"
		});
		$editor[0].setSelectionRange(0, 0);
		util.keyInteraction(94, $editor);
		assert.equal($editor.val(), "^55", "Negative sign was not allowed if first position");
		$editor[0].setSelectionRange(0, 0);
		util.keyInteraction(94, $editor);
		assert.equal($editor.val(), "^55", "Second negative should not be allowed");
		$editor.igNumericEditor("option", "scientificFormat", "e");
		$editor[0].setSelectionRange(3, 3);
		util.keyInteraction(101, $editor);
		assert.equal($editor.val(), "^55e", "Exponent not accepted");
		util.keyInteraction(94, $editor);
		assert.equal($editor.val(), "^55e^", "Second exponent negative sign should not be allowed.");
		$editor.remove();
	});

	QUnit.test("Typing multiple exponent chars (scientific E-notation)", function (assert) {
		assert.expect(8);
		var $editor;
		// 46: ".", 45: "-", 65: "a", 94: "^"

		$editor = $("<input />").appendTo("#testBedContainer").igNumericEditor({
			dataMode: 'double',
			value: 1e-7,
			scientificFormat: "E+"
		});
		$editor.trigger("focus");
		$editor[0].select();
		util.keyInteraction(101, $editor, "shiftKey");
		assert.equal($editor.val(), "1E-7", "E character should not be allowed to repalce entire value");
		$editor[0].setSelectionRange(0, 0);
		util.keyInteraction(101, $editor, "shiftKey");
		assert.equal($editor.val(), "1E-7", "Second E character should not be allowed");
		$editor.val("1");
		$editor[0].setSelectionRange(1, 1);
		util.keyInteraction(101, $editor, "shiftKey");
		assert.equal($editor.val(), "1E", "E character was not allowed");
		util.keyInteraction(101, $editor, "shiftKey");
		assert.equal($editor.val(), "1E", "Second E character should not be allowed");
		$editor.remove();

		//change format:
		$editor = $("<input />").appendTo("#testBedContainer").igNumericEditor({
			dataMode: 'double',
			value: 1e-27,
			scientificFormat: "e"
		});
		$editor.trigger("focus");
		$editor[0].select();
		util.keyInteraction(101, $editor);
		assert.equal($editor.val(), "1e-27", "e character should not be allowed to repalce entire value");
		$editor[0].setSelectionRange(4, 4);
		util.keyInteraction(101, $editor);
		assert.equal($editor.val(), "1e-27", "Second e character should not be allowed");
		$editor.val("255");
		$editor[0].setSelectionRange(2, 2);
		util.keyInteraction(101, $editor);
		assert.equal($editor.val(), "25e5", "e character was not be allowed");
		util.keyInteraction(101, $editor);
		assert.equal($editor.val(), "25e5", "Second e character should not be allowed");
		$editor.remove();
	});

	QUnit.test("Lists testing", function (assert) {
		assert.expect(25);
		var container = $('#listEditor'), list = $('#listEditor').igNumericEditor("dropDownContainer"), opening = false, opened = false, closing = false, closed = false,
			itemselecting = false, itemselected = false, valueChanging = false, valueChanged = false, textChanged = false,
			ddButton = container.igNumericEditor("dropDownButton"), item1, editorInput = $('#listEditor input');

		assert.equal(container.outerWidth(), 200, "The width of the container is not set to 200px");
		assert.equal(container.outerHeight(), 20, "The heigth of the container is not set to 20px");

		$('#listEditor').on("ignumericeditordropdownlistopening", function () {
			opening = true;
		});
		$('#listEditor').on("ignumericeditordropdownlistopened", function () {
			opened = true;
		});
		$('#listEditor').on("ignumericeditordropdownlistclosing", function () {
			closing = true;
		});
		$('#listEditor').on("ignumericeditordropdownlistclosed", function () {
			closed = true;
		});
		$('#listEditor').on("ignumericeditordropdownitemselecting", function () {
			itemselecting = true;
		});
		$('#listEditor').on("ignumericeditordropdownitemselected", function () {
			itemselected = true;
		});
		$('#listEditor').on("ignumericeditortextchanged", function (evt, args) {
			assert.equal(args.text, "1", "Text changed event is not fired with correct new value");
			textChanged = true;
		});
		$('#listEditor').on("ignumericeditorvaluechanging", function (evt, args) {
			assert.equal(args.newValue, "1", "Value changing event is not fired with correct new value");
			valueChanging = true;
		});
		$('#listEditor').on("ignumericeditorvaluechanged", function (evt, args) {
			assert.equal(args.newValue, "1", "Value changing event is not fired with correct new value");
			valueChanged = true;
		});

		ddButton.click();
		assert.ok(opening, "dropDownListOpening event not fired");
		//check if ddlist opened

		assert.ok(list.is(":visible"), "The dropDown is not opened");

		item1 = list.children(".ui-igedit-listitem")[0];

		//Check the classes
		$(item1).click();
		//mouseclick($(item1)[0]);
		assert.ok($(item1).hasClass("ui-igedit-listitemselected"), "The selected item is missing ui-igedit-listitemselected class applied");
		assert.ok(closing, "dropDownListClosing event not fired");
		assert.ok(valueChanging, "ValueChanging event not fired");
		stop()
		setTimeout(function () {
			start()
			assert.ok(closed, "dropDownListClosed event not fired");
			assert.ok(valueChanged, "valueChanged event not fired");
			assert.ok(textChanged, "textChanged event not fired");
			$('#listEditor').off("ignumericeditorvaluechanging");
			$('#listEditor').off("ignumericeditorvaluechanged");
			$('#listEditor').off("ignumericeditortextchanged");
			closing = false;
			closed = false;
			ddButton.click();
			ddButton.click();
			assert.ok(closing, "dropDownListClosing event not fired");

			//assert.equal(list.is(":visible"), false,  "The dropDown is not closed");
			//mouseover(ddButton[0]);
			ddButton.mouseover();

			assert.ok(ddButton.hasClass("ui-igedit-buttonhover"), "The hovered item is missing ui-igedit-buttonhover class applied");

			//mouseout(ddButton[0]);
			ddButton.mouseleave();
			//notOk assert doesn't seem to work in current version of the QUinit we are using. 
			assert.equal(ddButton.hasClass("ui-igedit-buttonhover"), false, "The unhovered item contains ui-igedit-buttonhover class applied");
			//mousedown(ddButton[0]);
			mousedown(ddButton[0]);
			assert.ok(ddButton.hasClass("ui-igedit-buttonpressed"), "The pressed item is missing ui-igedit-buttonpressed class applied");
			//mouseup(ddButton[0]);
			mouseup(ddButton[0]);
			assert.equal(ddButton.hasClass("ui-igedit-buttonpressed"), false, "The released button item contains ui-igedit-buttonpressed class applied");
			ddButton.click();
			assert.ok(list.is(":visible"), "THe dropDown is not opened");
			closing = false;
			closed = false;
			editorInput.trigger("blur");
			assert.ok(closing, "dropDownListClosing event not fired");
			stop();
			setTimeout(function () {
				start();
				assert.ok(closed, "dropDownListClosed event not fired");
				editorInput.trigger("focus");
				$.ig.TestUtil.paste(editorInput[0], "1");
				assert.equal($('#listEditor').igNumericEditor("value"), "1", "The value after paste is not newVal");

				//test values outside of the set list of values + isLimitedToListValues: true. 
				//it is expected to have the value method apply values outside of the list
				$editor = $('#listEditor');
				$editor.igNumericEditor("option", "isLimitedToListValues", true);
				$editor.igNumericEditor("value", "7");
				assert.equal($editor.igNumericEditor("value"), 7, "public value method does not set value outside of list of values");
			}, 100);
		}, 100);

		assert.ok($("#listEditor").igNumericEditor("findListItemIndex"), -1, "Must be -1 if no search param is passed");
		assert.ok($("#listEditor").igNumericEditor("findListItemIndex", 2), 1, "Expected item index is 1");

	});

	QUnit.test("Lists testing P2, selection-value match", function (assert) {
		assert.expect(60);
		var $editor, $field, $ddButton, $spinUpButton, $spinDownButton,
			editorSetup = function (options) {
				$editor = $("<input />").appendTo("#testBedContainer")
					.igNumericEditor(options);
				$field = $editor.igNumericEditor("field");
				$ddButton = $editor.igNumericEditor("dropDownButton");
				$spinUpButton = $editor.igNumericEditor("spinUpButton");
				$spinDownButton = $editor.igNumericEditor("spinDownButton");
			};

		editorSetup({
			listItems: [1, 0, 3],
			buttonType: "dropdown",
			// remove animation to avoid waiting, show() with effect ignores 0
			dropDownAnimationDuration: -1
		});

		//selectedListIndex
		$editor.igNumericEditor("selectedListIndex", 2);
		assert.strictEqual($editor.igNumericEditor("value"), 3, "selectedListIndex did not update value");
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), "3", "Selected item does not reflect value");
		$editor.igNumericEditor("selectedListIndex", -1);
		assert.strictEqual($editor.igNumericEditor("value"), 3, "selectedListIndex should not update with wrong index");
		$editor.igNumericEditor("selectedListIndex", 4);
		assert.strictEqual($editor.igNumericEditor("value"), 3, "selectedListIndex should not update with wrong index");

		$editor.igNumericEditor("value", 1);
		$ddButton.click();
		assert.ok($editor.igNumericEditor("getSelectedListItem").hasClass($.ui.igNumericEditor.prototype.css.listItemSelected), "Selected item (API) does't have proper styles applied");
		assert.equal($editor.igNumericEditor("selectedListIndex"), 0, "Selected index does not reflect value");
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), "1", "Selected item does not reflect value");

		// select item2:
		$editor.igNumericEditor("dropDownContainer").find("span.ui-igedit-listitem").eq(1).click();
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), "0", "Selected item (API) did not update after selection");

		// change value in edit mode:
		$ddButton.click();
		keyDownChar(51 /*3*/, $field);
		$field.val("3");
		keyPressChar(51, $field);
		keyUpChar(51, $field);
		keyInteraction(13, $field);
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), "3", "Selected item (API) did not update after value update.");
		$editor.remove();

		//initial value, clear:
		editorSetup({
			listItems: [1, 123, 2, 3, 156, 99],
			buttonType: "dropdown, clear",
			value: 2,
			// remove animation to avoid waiting, show() with effect ignores 0
			dropDownAnimationDuration: -1
		});
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), 2, "Selected item (API) not correct on initialization");
		assert.equal($editor.igNumericEditor("selectedListIndex"), 2, "Selected index (API) not correct on initialization");

		$editor.igNumericEditor("value", 999);
		assert.equal($editor.igNumericEditor("getSelectedListItem").length, 0, "There should be no selected item (API) without matching value.");

		$editor.igNumericEditor("value", "3");
		$ddButton.click();
		keyInteraction(38, $field);
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), "3", "Selected item does not reflect value.");
		assert.equal($editor.igNumericEditor("dropDownContainer").find(".ui-igedit-listitemactive").last().text(), "2", "Active item did not move from original selection.");
		keyDownChar(54 /*6*/, $field);
		$field.val("156");
		keyPressChar(54, $field);
		keyUpChar(54, $field);
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), "156", "Selected item not updated when typing.");
		keyInteraction(40, $field);
		assert.equal($editor.igNumericEditor("dropDownContainer").find(".ui-igedit-listitemactive").last().text(), "99", "Active item did not move from new selection.");
		keyDownChar(56 /*8*/, $field);
		$field.val("8");
		keyPressChar(56, $field);
		keyUpChar(56, $field);
		assert.equal($editor.igNumericEditor("getSelectedListItem").length, 0, "Selected item not cleared when typing.");
		assert.equal($editor.igNumericEditor("dropDownContainer").find(".ui-igedit-listitemactive").length, 0, "Active item not cleared when typing.");
		keyInteraction(13, $field);
		assert.equal($editor.igNumericEditor("value"), 8, "Value not set correctly on enter without list selection.");
		assert.ok(!$editor.igNumericEditor("dropDownContainer").is(":visible"), "Dropdown list did not close on enter.");
		assert.equal($editor.igNumericEditor("getSelectedListItem").length, 0, "There should be no selection when value doesn't match any item.");

		$ddButton.click();
		$field.val("2");
		keyInteraction(13, $field);
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), 2, "Selected item does not reflect value.");

		$editor.igNumericEditor("clearButton").click();
		assert.equal($editor.igNumericEditor("getSelectedListItem").length, 0, "Selection not removed on clear in edit mode");
		assert.equal($editor.igNumericEditor("dropDownContainer").find(".ui-igedit-listitemactive").length, 0, "Active item not removed on clear in edit mode.");
		$field.blur();
		$editor.igNumericEditor("value", 99);
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), "99", "Selected item does not reflect value.");
		$editor.igNumericEditor("clearButton").click();
		assert.equal($editor.igNumericEditor("getSelectedListItem").length, 0, "Selection not removed on clear outside edit mode.");
		$editor.remove();

		// spin + isLimitedToListValues
		var listItems = [5, 44.5, 44, 575, 55.4, 243, 10];
		editorSetup({
			spinDelta: 1,
			isLimitedToListValues: true,
			listItems: listItems,
			buttonType: "dropdown, spin, clear",
			value: 44,
			// remove animation to avoid waiting, show() with effect ignores 0
			dropDownAnimationDuration: -1
		});
		mousedown($spinUpButton[0]);
		mouseup($spinUpButton[0]);
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), "44.5", "Selection not changed on spin button");
		assert.strictEqual($editor.igNumericEditor("value"), 44.5, "Value not changed on spin button");
		for (var i = 0; i < 3; i++) {
			mousedown($spinUpButton[0]);
			mouseup($spinUpButton[0]);
		}
		assert.strictEqual($editor.igNumericEditor("value"), 5, "Value not changed on spin button");
		assert.ok($spinUpButton.hasClass("ui-state-disabled"), "Spin up button not disabled");
		$editor.igNumericEditor("spinDown");
		assert.strictEqual($editor.igNumericEditor("value"), 44.5, "Value not changed on spin method");
		$editor.igNumericEditor("spinUp");
		assert.strictEqual($editor.igNumericEditor("value"), 5, "Value not changed on spin method");

		$editor.focus();
		mousedown($spinUpButton[0]);
		mouseup($spinUpButton[0]);
		mousedown($spinDownButton[0]);
		mouseup($spinDownButton[0]);
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), "44.5", "Selection not changed on spin button in edit mode.");
		assert.ok(!$spinUpButton.hasClass("ui-state-disabled"), "Spin up button not enabled");

		$ddButton.click();
		for (var i = 2; i < listItems.length; i++) {
			mousedown($spinDownButton[0]);
			mouseup($spinDownButton[0]);
			assert.equal($editor.igNumericEditor("getSelectedListItem").text(), listItems[i], "Selection not changed on spin button with open dropdown.");
		}
		assert.ok($spinDownButton.hasClass("ui-state-disabled"), "Spin down button not disabled");
		$editor.igNumericEditor("spinUp");
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), "243", "Value not changed on spin method in edit mode");

		// spin + spinWrapAround
		$editor.igNumericEditor("option", "spinWrapAround", true);
		$editor.igNumericEditor("selectedListIndex", 1);
		mousedown($spinUpButton[0]);
		mouseup($spinUpButton[0]);
		mousedown($spinUpButton[0]);
		mouseup($spinUpButton[0]);
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), listItems[listItems.length - 1], "Selection not changed on spin button with open dropdown.");
		mousedown($spinDownButton[0]);
		mouseup($spinDownButton[0]);
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), listItems[0], "Selection not changed on spin button with open dropdown.");
		$editor.igNumericEditor("option", "spinWrapAround", false);
		assert.ok($spinUpButton.hasClass("ui-state-disabled"), "Spin up button not disabled when setting spinWrapAround");
		$ddButton.click();
		$editor.igNumericEditor("option", "spinWrapAround", true);
		mousedown($spinUpButton[0]);
		mouseup($spinUpButton[0]);
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), listItems[listItems.length - 1], "Selection not changed on spin with spinWrapAround.");

		// clearing value in edit mode and selecting the same item
		$editor.blur(); //set last value
		$ddButton.click();
		$editor.igNumericEditor("clearButton").click();
		$editor.igNumericEditor("dropDownContainer")
			.children(".ui-igedit-listitem").last().click();
		assert.equal($field.val(), listItems[listItems.length - 1], "Selection not reflected in edit field after clear");
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), listItems[listItems.length - 1], "Selection not changed after re-selecting cleared item.");
		$editor.remove();

		// spin editor without listItems
		editorSetup({
			spinDelta: 10,
			isLimitedToListValues: true, // attempt list values spin
			spinWrapAround: true,
			buttonType: "spin, clear"
		});
		mousedown($spinUpButton[0]);
		mouseup($spinUpButton[0]);
		assert.strictEqual($editor.igNumericEditor("value"), 10, "Value not changed on spin button");
		$editor.remove();

		// readOnly spin
		editorSetup({
			listItems: listItems,
			dropDownOnReadOnly: true,
			isLimitedToListValues: true,
			buttonType: "dropdown, spin, clear",
			// remove animation to avoid waiting, show() with effect ignores 0
			dropDownAnimationDuration: -1
		});
		$editor.igNumericEditor("option", "readOnly", true);
		$ddButton.click();
		keyInteraction(40, $field); //down
		assert.equal($editor.igNumericEditor("dropDownContainer").find(".ui-igedit-listitemactive").text(), listItems[0], "Arrow down with dropDownOnReadOnly did not select first item.");
		keyInteraction(40, $field);
		assert.equal($editor.igNumericEditor("dropDownContainer").find(".ui-igedit-listitemactive").text(), listItems[1], "Arrow down with dropDownOnReadOnly did not select second item.");
		keyInteraction(38, $field); //up
		assert.equal($editor.igNumericEditor("dropDownContainer").find(".ui-igedit-listitemactive").text(), listItems[0], "Arrow up with dropDownOnReadOnly did not select first item.");
		keyInteraction(13, $field);
		assert.equal($editor.igNumericEditor("value"), listItems[0], "Select up with dropDownOnReadOnly did not update value.");
		$ddButton.click();
		keyInteraction(40, $field);
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), listItems[0], "Spin up with dropDownOnReadOnly did not update selection.");
		$editor.remove();

		// list items with decimalSeparator
		editorSetup({
			listItems: [10, 0.15, 55.47, 12045, 2413.5],
			buttonType: "spin, clear",
			value: 55.47,
			isLimitedToListValues: true, // attempt list values spin
			decimalSeparator: ",",
			groupSeparator: "."
		});
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), "55,47", "decimalSeparator selected item not correct.");
		$editor.igNumericEditor("value", 12045);
		$editor.focus();
		$editor.blur();
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), "12045", "decimalSeparator selected item did not remain correct.");

		$ddButton.click();
		$editor.igNumericEditor("dropDownContainer").find("span.ui-igedit-listitem").eq(1).click();
		assert.equal($editor.igNumericEditor("field").val(), "0,15", "Selected item did not update text with correct decimalSeparator.");
		$editor.blur();
		assert.equal($editor.igNumericEditor("value"), 0.15, "Selected item did not update text with correct decimalSeparator.");
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), "0,15", "Selected item (API) did not update after selection");

		$editor.igNumericEditor("value", 12045);
		$editor.igNumericEditor("spinDown");
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), "2413,5", "Selected item not correct after spin call");
		$editor.focus();
		$editor.igNumericEditor("spinDown");
		assert.equal($editor.igNumericEditor("getSelectedListItem").text(), "2413,5", "Selected item not correct after spin call in edit mode");

		$editor.remove();
	});

	QUnit.test("SetOption", function (assert) {
		assert.expect(23);
		var readEditorInput = $("#readonlyEditor").igNumericEditor("field"),
			readEditorContainer = $("#readonlyEditor").igNumericEditor("editorContainer"),
			readEditorValueInput = readEditorContainer.find("input:hidden"),
			disabledEditorInput = $("#disabledEditor").igNumericEditor("field"),
			disabledEditorInputEditorContainer = $("#disabledEditor").igNumericEditor("editorContainer"),
			disabledEditorInputEditorValueInput = disabledEditorInputEditorContainer.find("input:hidden"),
			editor1 = $("#inputEditor1");
		assert.ok(readEditorInput.prop("readonly"), "readonly attribute is missing");
		assert.ok(readEditorValueInput.prop("readonly"), "readonly attribute is missing");
		assert.ok(disabledEditorInput.prop("disabled"), "disabled attribute is missing");
		assert.ok(disabledEditorInputEditorValueInput.prop("disabled"), "disabled attribute is missing");

		$("#readonlyEditor").igNumericEditor("option", "disabled", true);
		assert.ok(readEditorInput.prop("disabled"), "disabled attribute is missing");
		assert.ok(readEditorValueInput.prop("disabled"), "disabled attribute is missing");
		$("#readonlyEditor").igNumericEditor("option", "disabled", false);
		$("#readonlyEditor").igNumericEditor("option", "readOnly", false);
		assert.equal(readEditorInput.prop("disabled"), false, "The disabled attribute exists");
		assert.equal(readEditorValueInput.prop("disabled"), false, "The disabled attribute exists");
		assert.equal(readEditorInput.prop("readonly"), false, "The readonly attribute exists");
		assert.equal(readEditorValueInput.prop("readonly"), false, "The readonly attribute exists");

		//setting this option to nonExisting element should default to editable
		assert.equal(readEditorInput.prop("disabled"), false, "The disabled attribute exists");
		assert.equal(readEditorValueInput.prop("disabled"), false, "The disabled attribute exists");
		assert.equal(readEditorInput.prop("readonly"), false, "The readonly attribute exists");
		assert.equal(readEditorValueInput.prop("readonly"), false, "The readonly attribute exists");
		$("#readonlyEditor").igNumericEditor("option", "value", 19);
		assert.equal($("#readonlyEditor").igNumericEditor("option", "value"), 19, "Value not changed");
		$("#readonlyEditor").igNumericEditor("option", "value", "abcde");
		assert.equal($("#readonlyEditor").igNumericEditor("option", "value"), 19, "Value should be reverted to the previous value");

		throws(function () {
			$("#readonlyEditor").igNumericEditor("option", "visibleItemsCount", 3);
		},
			function (err) {
				return err.message === $.ig.Editor.locale.setOptionError + "visibleItemsCount";
			},
			"Should not set dynamically visibleItemsCount"
		);

		throws(function () {
			$("#readonlyEditor").igNumericEditor("option", "buttonType", "clear");
		},
			function (err) {
				return err.message === $.ig.Editor.locale.setOptionError + "buttonType";
			},
			"Should not set dynamically buttonType"
		);

		throws(function () {
			$("#readonlyEditor").igNumericEditor("option", "dropDownAttachedToBody", true);
		},
			function (err) {
				return err.message === $.ig.Editor.locale.setOptionError + "dropDownAttachedToBody";
			},
			"Should not set dynamically dropDownAttachedToBody"
		);

		// Enable a editor that is not readonly
		$("#disabledEditor").igNumericEditor("option", "disabled", false);
		assert.equal(disabledEditorInput.prop("disabled"), false, "The disabled attribute exists");
		assert.equal(disabledEditorInputEditorValueInput.prop("disabled"), false, "The disabled attribute exists");
		editor1.igNumericEditor("option", "disabled", true);
		assert.equal(editor1.igNumericEditor("field").prop("disabled"), true, "The disabled attribute exists");
		editor1.igNumericEditor("option", "disabled", false);
		assert.equal(editor1.igNumericEditor("field").prop("disabled"), false, "The disabled attribute exists");
	});

	QUnit.test('Check width/height', function (assert) {
		assert.expect(6);
		var $editor1 = $('#clearEditor'), $editor2 = $("#disabledEditor");

		// Default stlye from CSS
		assert.equal($editor1.igNumericEditor("editorContainer").css("width"), "200px", "Width is not correct");
		assert.equal($editor1.igNumericEditor("editorContainer").css("height"), "32px", "Height is not correct");

		$editor1.igNumericEditor("option", "width", 100);
		$editor1.igNumericEditor("option", "height", 100);
		assert.equal($editor1.igNumericEditor("editorContainer").css("width"), "100px", "Width is not correct");
		assert.equal($editor1.igNumericEditor("editorContainer").css("height"), "100px", "Height is not correct");

		// Style set from the options
		assert.equal($editor2.igNumericEditor("editorContainer").css("width"), "300px", "Width is not correct");
		assert.equal($editor2.igNumericEditor("editorContainer").css("height"), "70px", "Height is not correct");
	});

	QUnit.test('Check excludeKeys', function (assert) {
		assert.expect(1);
		var container = $('#excludeKeysEditor'), containerInput = $('#excludeKeysEditor').igNumericEditor("field");

		container.igNumericEditor("value", 123);
		assert.equal($('#excludeKeysEditor').igNumericEditor("value"), 123, "ExcludeKeys are respected!");
	});

	QUnit.test('Check spinDelta scientificFormat', function (assert) {
		assert.expect(1);
		var container = $('#spinScientific'), spinUpButton = $('#spinScientific').igNumericEditor("spinUpButton");


		$('#spinScientific').igNumericEditor("option", "spinDelta", 1E1);
		mousedown(spinUpButton[0]);
		mouseup(spinUpButton[0]);
		assert.equal($('#spinScientific').igNumericEditor("value"), 10, "The value is not correct");
	});

	QUnit.test('Check excludeKeys/includeKeys at runtime', function (assert) {
		assert.expect(2);
		var container = $('#spinScientific');

		throws(function () {
			$('#spinScientific').igNumericEditor("option", "excludeKeys", "2");
		}, " Error should be thrown");
		throws(function () {
			$('#spinScientific').igNumericEditor("option", "includeKeys", "1, 3, 5, 7, 9");
		}, " Error should be thrown");
	});

	QUnit.test('Check decimalSeparator', function (assert) {
		assert.expect(1);
		var container = $('#decimalSeparatorEditor'), containerInput = $('#decimalSeparatorEditor').igNumericEditor("field");

		container.igNumericEditor("value", 123.4);
		assert.equal($('#decimalSeparatorEditor').igNumericEditor("value"), 123.4, "Dot sign not allowed!");
	});

	QUnit.test('Check maxDecimals with spinDelta', function (assert) {
		assert.expect(2);
		throws(function () {
			$("#spinDelta1").igNumericEditor({ dataMode: "float", maxDecimals: 2, value: "2.124", spinDelta: 2.516 });
		}, " Error should be thrown");
		assert.equal($('#spinDelta1').igNumericEditor("value"), 2.12, "maxDecimals not respected!");
	});

	QUnit.test('Check negative value when using scientificFormat', function (assert) {
		assert.expect(2);
		var container = $('#negativeEditor1 input:first');

		assert.equal($('#negativeEditor1').igNumericEditor("value"), -1E+1, "Value is not correct!");
		assert.equal(container.hasClass("ui-igedit-negative"), true, "Negative class is not applied!");
	});

	QUnit.test('Check many digits', function (assert) {
		assert.expect(1);
		var container = $('#excludeKeysEditor'), containerInput = $('#excludeKeysEditor').igNumericEditor("field");

		container.igNumericEditor("value", "42.25.51");
		assert.equal($('#excludeKeysEditor').igNumericEditor("value"), 42.25, "The value is not correct!");
	});

	QUnit.test('Check destroy', function (assert) {
		assert.expect(4);
		var $editor1 = $('#clearEditor'), $editor2 = $("#disabledEditor");
		setTimeout(function () {
			start();
			$editor1.igNumericEditor("destroy");
			$editor2.igNumericEditor("destroy");
			assert.equal($editor1.data("igNumericEditor"), undefined, 'Error destroying igNumericEditor in a div');
			assert.equal($editor2.data("igNumericEditor"), undefined, 'Error destroying igNumericEditor in an input');
			$._data($editor1[0], "events");
			$._data($editor2[0], "events");
			assert.ok($editor1.attr("class") === undefined, "Some classes are still not removed");
			assert.ok($editor2.attr("class") === undefined, "Some classes are still not removed");
		}, 100);
	});

	QUnit.test('SpinUp method', function (assert) {
		assert.expect(4);
		$("#spinUp").igNumericEditor("spinUp", 3);
		assert.equal($("#spinUp").igNumericEditor("value"), 5, 'Spin up method do not take into account the delta parameter.');

		$("#spinUp").igNumericEditor("spinUp", 3);
		assert.equal($("#spinUp").igNumericEditor("value"), 0, 'spinWrapAround does not work.');

		$("#spinUp").igNumericEditor("spinUp", 5);
		$("#spinUp").igNumericEditor("spinDown", 3);
		assert.equal($("#spinUp").igNumericEditor("value"), 2, 'Spin down method do not take into account the delta parameter.');
		$("#spinUp").igNumericEditor("spinDown", 3);
		assert.equal($("#spinUp").igNumericEditor("value"), 6, 'spinWrapAround does not work.');
	});

	QUnit.test('Option cannot be set for numeric editor', function (assert) {
		assert.expect(1);
		throws(function () {
			$('#numericEditorRuntime').igNumericEditor("option", "excludeKeys", "asds");
		}, function (err) {
			return err.message.indexOf($.ig.Editor.locale.numericEditorNoSuchOption) > -1;
		}, Error($.ig.Editor.locale.numericEditorNoSuchOption));
	});

	testId = 'spinDown button not disabled'
	QUnit.test(testId, function (assert) {
		assert.expect(3);
		var $editor = $("#numericEditor420minValue"),
			editorInput = $editor.igNumericEditor("field"), btnSpinDown = $editor.igNumericEditor("spinDownButton"),
			btnSpinUp = $editor.igNumericEditor("spinUpButton");

		assert.ok(btnSpinDown.hasClass("ui-state-disabled"), "The spinDown button is not disabled.");
		$("#numericEditor420minValue").igNumericEditor("spinUp", 3);
		assert.equal($("#numericEditor420minValue").igNumericEditor("value"), 4, 'Spin up method do not take into account the delta parameter.');
		$editor.igNumericEditor("option", "maxValue", 4);
		assert.ok(btnSpinUp.hasClass("ui-state-disabled"), "The spinUp button is not disabled.");
	});

	testId = 'spinUp button not disabled'
	QUnit.test(testId, function (assert) {
		assert.expect(3);
		var $editor = $("#numericEditor420maxValue"),
			editorInput = $editor.igNumericEditor("field"), btnSpinDown = $editor.igNumericEditor("spinDownButton"),
			btnSpinUp = $editor.igNumericEditor("spinUpButton");

		assert.ok(btnSpinUp.hasClass("ui-state-disabled"), "The spinUp button is not disabled.");
		$("#numericEditor420maxValue").igNumericEditor("spinDown", 3);
		assert.equal($("#numericEditor420maxValue").igNumericEditor("value"), 4, 'Spin down method do not take into account the delta parameter.');
		$editor.igNumericEditor("option", "minValue", 4);
		assert.ok(btnSpinDown.hasClass("ui-state-disabled"), "The spinDown button is not disabled.");
	});

	testId = 'Issue 226939'
	QUnit.test(testId, function (assert) {
		assert.expect(6);
		var $editor = $("#issue226939"),
			editorInput = $editor.igNumericEditor("field"), btnSpinDown = $editor.igNumericEditor("spinDownButton"),
			btnSpinUp = $editor.igNumericEditor("spinUpButton");

		$editor.igNumericEditor("option", "minValue", 5);
		assert.ok(btnSpinDown.hasClass("ui-state-disabled"), "The spinDown button is not disabled.");
		$editor.igNumericEditor("spinUp");
		assert.equal($editor.igNumericEditor("value"), 6, 'Spin up method not working.');
		assert.ok(!btnSpinDown.hasClass("ui-state-disabled"), "The spinDown button is not enabled.");
		$editor.igNumericEditor("option", "minValue", 1);
		assert.ok(!(btnSpinDown.hasClass("ui-state-disabled")), "The spinDown button is enabled.");
		$editor.igNumericEditor("option", "maxValue", 6);
		assert.ok(btnSpinUp.hasClass("ui-state-disabled"), "The spinUp button is not disabled.");
		$editor.igNumericEditor("option", "minValue", 5);
		$editor.igNumericEditor("value", 5);
		assert.ok(btnSpinDown.hasClass("ui-state-disabled"), "The spinDown button is not disabled.");
	});

	QUnit.test("Clear button dynamic show/hide", function () {
		assert.expect(5);

		var field = $("#clearButton_439").igNumericEditor("field"),
			clearButton = $("#clearButton_439").igNumericEditor("clearButton");
		assert.ok(!clearButton.is(":visible"), "The clear button should not be visible initilly");
		field.focus();
		assert.ok(!clearButton.is(":visible"), "The clear button should not be visible on focus");
		field.val("10");

		$("#clearButton_439").data("igNumericEditor")._processTextChanged();
		assert.ok(clearButton.is(":visible"), "The clear button should be visible");
		field.blur();
		assert.equal(field.val(), "10", "The value should be SomeVal");
		assert.ok(clearButton.is(":visible"), "The clear button should be visible on blur");
	});

	QUnit.test('Paste and insert', function (assert) {
		assert.expect(8);
		var $editor = $("#pasteEditor"),
			editorInput = $editor.igNumericEditor("field");

		editorInput.trigger("focus");
		$.ig.TestUtil.paste(editorInput[0], "33");
		stop();
		setTimeout(function () {
			start();
			assert.equal(editorInput[0].selectionStart, 2, "Cusrsor position not correct after paste");
			assert.equal(editorInput.val(), "33", "The text after paste is not correct");

			// paste "+0024" in front, ultimately only adding 24:
			editorInput[0].setSelectionRange(0, 0);
			var parseInt = window.parseInt;
			window.parseInt = function (val, radix) { return parseInt(val, 10); }; // we don't parseInt like it's ES3 anymore...
			$.ig.TestUtil.paste(editorInput[0], "+0024");
			stop();
			setTimeout(function () {
				start();
				window.parseInt = parseInt;
				assert.equal(editorInput[0].selectionStart, 2, "Cusrsor position not correct after paste. Should be like [24|33]");
				assert.equal(editorInput.val(), "2433", "The text after positioned paste is not correct");

				editorInput[0].setSelectionRange(2, 2);
				$.ig.TestUtil.paste(editorInput[0], "5");
				stop();
				setTimeout(function () {
					start();
					assert.equal(editorInput[0].selectionStart, 3, "Cusrsor position not correct after paste. Should be like [2412345678|]");
					assert.equal(editorInput.val(), "24533", "The text after positioned paste is not correct");
					$.ig.TestUtil.paste(editorInput[0], "6789");
					stop();
					setTimeout(function () {
						start();
						assert.equal(editorInput.val(), "80000", "The text after positioned paste is not correct");
						editorInput.trigger("blur");
						assert.strictEqual($editor.igNumericEditor("value"), 80000, "The value did not revert from paste");
					}, 20);
				}, 20);
			}, 20);
		}, 20);
	});

	QUnit.test('_processInternalValueChanging', function (assert) {
		assert.expect(6);
		var $editor = $('<input id="privateFuncEditor" />')
			.appendTo("#testBedContainer")
			.igNumericEditor({
				allowNullValue: true,
				revertIfNotValid: false,
				minValue: 1
			})

		var $editor1 = $('<input id="privateFuncEditor1" />')
			.appendTo("#testBedContainer")
			.igNumericEditor({
				allowNullValue: false,
				revertIfNotValid: false,
				minValue: -5,
				maxValue: -2
			})

		var $editor = $("#privateFuncEditor");
		var $editor1 = $("#privateFuncEditor1");
		var container = $editor.igNumericEditor("editorContainer");

		//allowNullValue : true, revertIfNotValid: false --> value is null
		$editor.data("igNumericEditor")._processInternalValueChanging("InvalidValue");
		assert.ok($editor.igNumericEditor("value") === null, 'not null');

		//allowNullValue : false, revertIfNotValid: false --> value is minValue
		$editor.igNumericEditor("option", "allowNullValue", false);
		$editor.data("igNumericEditor")._processInternalValueChanging("InvalidValue");
		assert.ok($editor.igNumericEditor("value") === 1, 'not set to minValue when infalid input is used even though revertIfNotValid: false');

		//allowNullValue : false, revertIfNotValid: true minValue: 1 --> value is minValue
		$editor.igNumericEditor("option", "revertIfNotValid", true);
		$editor.data("igNumericEditor")._processInternalValueChanging("InvalidValue");
		assert.ok($editor.igNumericEditor("value") === 1, 'not set to minValue');

		//allowNullValue : true, revertIfNotValid: true minValue: 1 --> value is this.options.nullValue;
		$editor.igNumericEditor("option", "allowNullValue", true);
		$editor.data("igNumericEditor")._processInternalValueChanging("InvalidValue");
		assert.ok($editor.igNumericEditor("value") === null, 'not null');

		//allowNullValue : false, revertIfNotValid: false minValue: -5 maxValue: -2 --> value is maxValue
		$editor1.igNumericEditor("option", "allowNullValue", false);
		$editor1.igNumericEditor("option", "revertIfNotValid", false);
		$editor1.data("igNumericEditor")._processInternalValueChanging("InvalidValue");
		assert.ok($editor1.igNumericEditor("value") === -2, 'not set to maxValue');

		//allowNullValue : false, revertIfNotValid: false minValue: -5 maxValue: 2 --> value is 0
		$editor1.igNumericEditor("option", "allowNullValue", false);
		$editor1.igNumericEditor("option", "revertIfNotValid", false);
		$editor1.igNumericEditor("option", "minValue", -5);
		$editor1.igNumericEditor("option", "maxValue", 2);
		$editor1.data("igNumericEditor")._processInternalValueChanging("InvalidValue");
		assert.ok($editor1.igNumericEditor("value") === 0, 'not set to 0');

		$editor.remove();
		$editor1.remove();
	});

	QUnit.test('selectListIndexDown/Up', function (assert) {
		assert.expect(4);
		var $editor = $('<div id="listEditor2"></div>')
			.appendTo("#testBedContainer")
			.igNumericEditor({
				buttonType: "dropdown,spin,clear,nonvalid",
				width: 200,
				listWidth: 200,
				height: 20,
				listItems: [1, 2, 3, 4, 5],
				dropDownAnimationDuration: -1,
				revertIfNotValid: false,
				spinDelta: 1
			});

		var list = $editor.igNumericEditor("dropDownContainer"),
			ddButton = $editor.igNumericEditor("dropDownButton"),
			editorInput = $('#listEditor2 input');
		ddButton.click();

		item1 = list.children(".ui-igedit-listitem")[0];
		$(item1).click();
		assert.equal($editor.outerWidth(), 200, "The width of the container is not set to 200px");
		assert.equal($editor.outerHeight(), 20, "The heigth of the container is not set to 20px");
		$editor.igNumericEditor("selectListIndexUp");
		editorInput.trigger("blur");
		assert.equal($('#listEditor2 input')[1].value, "2", "Expected index not 2");

		$editor.igNumericEditor("selectListIndexDown");
		editorInput.trigger("blur");
		assert.equal($('#listEditor2 input')[1].value, "1", "Expected index not 1");

		$editor.remove();
	});

	QUnit.test("cover _handleSpinUpEvent/_handleSpinDownEvent", function (assert) {
		assert.expect(11);
		var $editor2 = $('<input id="inputEditor2" />')
			.appendTo("#testBedContainer")
			.igNumericEditor({
				value: 10,
				numericMaxDecimals: 4,
				numericMinDecimals: 2,
				selectionOnFocus: 0,
				decimalSeparator: ",",
				groupSeparator: " ",
				spinDelta: 1
			});

		var $editor3 = $('<input id="listEditor3" />')
			.appendTo("#testBedContainer")
			.igNumericEditor({
				value: .1,
				numericMaxDecimals: 8,
				numericMinDecimals: 8,
				selectionOnFocus: "atStart",
				decimalSeparator: ".",
				groupSeparator: ",",
				spinDelta: 0.1,
				dataMode: "double",
				buttonType: "spin"
			});

		var $editor4 = $('<input id="listEditor4" />')
			.appendTo("#testBedContainer")
			.igNumericEditor({
				value: 10,
				numericMaxDecimals: 4,
				numericMinDecimals: 2,
				selectionOnFocus: 0,
				decimalSeparator: ",",
				groupSeparator: " ",
				spinDelta: 1
			});

		var $editor5 = $('<input id="listEditor5" />')
			.appendTo("#testBedContainer")
			.igNumericEditor({
				value: .1,
				numericMaxDecimals: 8,
				numericMinDecimals: 8,
				selectionOnFocus: "atStart",
				decimalSeparator: ".",
				groupSeparator: ",",
				spinDelta: 0.1,
				dataMode: "double",
				buttonType: "spin"
			});

		var containerInput = $editor2.igNumericEditor("field"),
			val = $editor2.igNumericEditor("value"),
			spinDelta = $editor2.igNumericEditor("option", "spinDelta");


		//Cover switch cases for _handleSpinUpEvent/_handleSpinDownEvent 
		//_handleSpinUpEvent test All case
		$editor2.igNumericEditor("option", "selectionOnFocus", 0);
		containerInput.focus();
		keyInteraction(38, containerInput); //arrow up
		containerInput.blur();
		assert.equal($editor2.igNumericEditor("value"), val + spinDelta, "value is not correct after spin");
		assert.equal($editor2.igNumericEditor("displayValue"), "11,00", "displayValue is not correct after spin");

		$editor2.igNumericEditor("option", "dataMode", "int");
		$editor2.igNumericEditor("option", "value", 10);
		containerInput.focus();
		keyInteraction(38, containerInput); //arrow up
		containerInput.blur();
		assert.equal($editor2.igNumericEditor("value"), val + spinDelta, "value is not correct after spin");
		assert.equal($editor2.igNumericEditor("displayValue"), "11", "displayValue is not correct after spin");

		//test integer case
		var containerInput = $editor3.igNumericEditor("field"),
			decimalSeparator = $editor3.igNumericEditor("option", "decimalSeparator"),
			value = containerInput.val(),
			val = $editor3.igNumericEditor("value");

		containerInput.focus();
		$editor3.igNumericEditor("select", 1, 2);
		keyInteraction(38, containerInput); //arrow up
		assert.ok((1 <= value.indexOf(decimalSeparator)), "cursor position is not left of decimal separator");

		//_handleSpinDownEvent ---------------------------------------------------------------------------->>
		var containerInput = $editor4.igNumericEditor("field"),
			val = $editor4.igNumericEditor("value");
		spinDelta = $editor4.igNumericEditor("option", "spinDelta");

		$editor4.igNumericEditor("option", "selectionOnFocus", 0);
		containerInput.focus();
		keyInteraction(40, containerInput); //arrow down
		containerInput.blur();
		assert.equal($editor4.igNumericEditor("value"), val - spinDelta, "value is not correct after spin");
		assert.equal($editor4.igNumericEditor("displayValue"), "9,00", "displayValue is not correct after spin");

		$editor4.igNumericEditor("option", "dataMode", "int");
		$editor4.igNumericEditor("option", "value", 10);
		containerInput.focus();
		keyInteraction(40, containerInput); //arrow down
		containerInput.blur();
		assert.equal($editor4.igNumericEditor("value"), val - spinDelta, "value is not correct after spin");
		assert.equal($editor4.igNumericEditor("displayValue"), "9", "displayValue is not correct after spin");

		//test integer case
		var containerInput = $editor5.igNumericEditor("field"),
			decimalSeparator = $editor5.igNumericEditor("option", "decimalSeparator"),
			value = containerInput.val(),
			val = $editor5.igNumericEditor("value");

		containerInput.focus();
		$editor5.igNumericEditor("select", 1, 2);
		keyInteraction(40, containerInput); //arrow down
		assert.ok((1 <= value.indexOf(decimalSeparator)), "cursor position is not left of decimal separator");

		//test fractional case
		$editor5.igNumericEditor("option", "value", 0.123);
		containerInput.focus();
		$editor5.igNumericEditor("select", 3, 4);
		keyInteraction(40, containerInput); //arrow down
		assert.ok((1 <= value.indexOf(decimalSeparator)), "cursor position is not left of decimal separator");

		$editor2.remove();
		$editor3.remove();
		$editor4.remove();
		$editor5.remove();
	});

	QUnit.test("cover _clearValue", function (assert) {
		assert.expect(3);
		var $editor = $('<input id="inputEditor_clearValue" />')
			.appendTo("#testBedContainer")
			.igNumericEditor({
				value: 66,
				minValue: 55,
				maxValue: 100,
				buttonType: "clear"
			});

		var clearButton = $editor.igNumericEditor("clearButton");
		assert.equal($editor.igNumericEditor("value"), "66", "Initial value is not correct");
		clearButton.click();
		assert.equal($editor.igNumericEditor("value"), 55, "Value after cleaning is not correct");

		$editor.igNumericEditor("option", "minValue", -100);
		$editor.igNumericEditor("option", "maxValue", -55);
		clearButton.click();
		assert.equal($editor.igNumericEditor("value"), -55, "Value after cleaning is not correct");

		$editor.remove();
	});

	QUnit.test('Clear button state', function (assert) {
		assert.expect(2);
		var $editor;

		$editor = $('<input/>').appendTo("#testBedContainer").igNumericEditor({ buttonType: "clear" });
		assert.ok(!$editor.igNumericEditor("clearButton").is(":visible"), "Clear button is not hidden");
		$editor.igNumericEditor("value", 45);
		assert.ok($editor.igNumericEditor("clearButton").is(":visible"), "Clear button is not visible");
		$editor.remove();
	});

	QUnit.test("Test nullValue on initialization", function () {
		assert.expect(4);

		var $editor = $("<input id='editor'/>").
			appendTo("#testBedContainer").igNumericEditor({ allowNullValue: false });
		//Get null Value
		assert.equal($editor.igNumericEditor("value"), "", "The value is not an empty string");
		//Set null Value
		$editor.igNumericEditor("value", null);
		assert.equal($editor.igNumericEditor("value"), "", "The value is not an empty string");
		//CHange allowNullValue option
		$editor.igNumericEditor("option", "allowNullValue", true);
		// Get Null value
		assert.equal($editor.igNumericEditor("value"), "", "The value is not an empty string");
		//Set Null value
		$editor.igNumericEditor("value", null);
		//Get null value
		assert.equal($editor.igNumericEditor("value"), null, "The value is not an empty string");
		$editor.remove();
	});

	QUnit.test("Test roundDecimals options", function () {
		assert.expect(146);

		var $editorRound, $editorTrunc, testData;

		testData = [
			// maxDecimals
			[
				{ input: 5.5, round: 6, trunc: 5 },
				{ input: 5.5784546, round: 6, trunc: 5 },
				{ input: 0.0001, round: 0, trunc: 0 },
				{ input: 0.9999999999, round: 1, trunc: 0 }
			],
			[
				{ input: 5.55, round: 5.6, trunc: 5.5 },
				{ input: 5.555, round: 5.6, trunc: 5.5 },
				{ input: 5.899, round: 5.9, trunc: 5.8 },
				{ input: 5.999, round: 6, trunc: 5.9 }
			],
			[
				{ input: 1.999, round: 2, trunc: 1.99 },
				{ input: 1.019, round: 1.02, trunc: 1.01 },
				{ input: 9.999, round: 10, trunc: 9.99 },
				{ input: "aaaa", round: 10, trunc: 9.99 }
			],
			[
				{ input: 123.4567, round: 123.457, trunc: 123.456 },
				{ input: 123.4561, round: 123.456, trunc: 123.456 },
				{ input: 123.4597, round: 123.46, trunc: 123.459 },
				{ input: 123.4509, round: 123.451, trunc: 123.45 }
			],
			[
				{ input: 1.999, round: 1.999, trunc: 1.999 },
				{ input: 99.9999999, round: 100, trunc: 99.9999 },
				{ input: 34.555555, round: 34.5556, trunc: 34.5555 },
				{ input: 99.0000000001, round: 99, trunc: 99 }
			],
			[
				{ input: 0.9090999, round: 0.9091, trunc: 0.90909 },
				{ input: 23.555555, round: 23.55556, trunc: 23.55555 },
				{ input: 23.5555555, round: 23.55556, trunc: 23.55555 },
				{ input: 0.000009, round: 0.00001, trunc: 0 }
			],
			[
				{ input: 99.0000009, round: 99.000001, trunc: 99 },
				{ input: 5.5555555, round: 5.555556, trunc: 5.555555 },
				{ input: 99.0000001, round: 99, trunc: 99 },
				{ input: 1.000000000001, round: 1, trunc: 1 }
			],
			[
				{ input: 99.00000001, round: 99, trunc: 99 },
				{ input: 1.000000000001, round: 1, trunc: 1 },
				{ input: 5.55555555, round: 5.5555556, trunc: 5.5555555 },
				{ input: 1.23456789, round: 1.2345679, trunc: 1.2345678 }
			]];
		$editorRound = $('<input/>').appendTo("#testBedContainer").igNumericEditor();
		$editorTrunc = $('<input/>').appendTo("#testBedContainer").igNumericEditor({ roundDecimals: false });

		for (maxDecimalIndex = 0; maxDecimalIndex < testData.length; maxDecimalIndex++) {
			$editorRound.igNumericEditor("option", "maxDecimals", maxDecimalIndex);
			$editorTrunc.igNumericEditor("option", "maxDecimals", maxDecimalIndex);
			currTestData = testData[maxDecimalIndex];

			for (index = 0; index < currTestData.length; index++) {
				data = currTestData[index];
				$editorRound.igNumericEditor("setFocus");
				$editorRound.igNumericEditor("field").val("");
				typeInMaskedInput(data.input.toString(), $editorRound.igNumericEditor("field"));
				$editorRound.trigger("blur");
				assert.equal($editorRound.igNumericEditor("displayValue"), data.round.toString(), "The display value is not correct");
				assert.equal($editorRound.igNumericEditor("value"), data.round, "The hidden value sent to server is not correct");
				$editorTrunc.igNumericEditor("setFocus");
				$editorTrunc.igNumericEditor("field").val("");
				typeInMaskedInput(data.input.toString(), $editorTrunc.igNumericEditor("field"));
				$editorTrunc.trigger("blur");
				assert.equal($editorTrunc.igNumericEditor("displayValue"), data.trunc.toString(), "The display value is not correct");
				assert.equal($editorTrunc.igNumericEditor("value"), data.trunc, "The hidden value sent to server is not correct");
			}
		}
		$editorRound.remove();
		$editorTrunc.remove();

		// Change maxDecimals/minDecimals runtime
		$editorRound = $('<input/>').appendTo("#testBedContainer").igNumericEditor({ value: 12.5555555555, minDecimals: 2, maxDecimals: 5 });
		assert.equal($editorRound.igNumericEditor("displayValue"), "12.55556", "The display value is not correct");
		assert.equal($editorRound.igNumericEditor("value"), 12.55556, "The hidden value sent to server is not correct");
		$editorRound.igNumericEditor("option", "maxDecimals", 3);
		assert.equal($editorRound.igNumericEditor("displayValue"), "12.556", "The display value is not correct");
		assert.equal($editorRound.igNumericEditor("value"), 12.556, "The hidden value sent to server is not correct");
		$editorRound.igNumericEditor("option", "minDecimals", 7);
		assert.equal($editorRound.igNumericEditor("displayValue"), "12.5560000", "The display value is not correct");
		assert.equal($editorRound.igNumericEditor("value"), 12.556, "The hidden value sent to server is not correct");
		assert.equal($editorRound.igNumericEditor("option", "maxDecimals"), 7, "maxDecimals should be equal to minDecimals");
		$editorRound.remove();

		// Change maxDecimals/minDecimals runtime - edit mode
		$editorRound = $('<input/>').appendTo("#testBedContainer").igNumericEditor({ value: 12.5555555555, minDecimals: 2, maxDecimals: 5 });
		assert.equal($editorRound.igNumericEditor("field").val(), "12.55556", "The display value is not correct");
		assert.equal($editorRound.igNumericEditor("value"), 12.55556, "The hidden value sent to server is not correct");
		$editorRound.igNumericEditor("setFocus");
		$editorRound.igNumericEditor("option", "maxDecimals", 3);
		assert.equal($editorRound.igNumericEditor("field").val(), "12.55556", "The display value is not correct");
		assert.equal($editorRound.igNumericEditor("value"), 12.556, "The hidden value sent to server is not correct");
		$editorRound.trigger("blur");
		assert.equal($editorRound.igNumericEditor("field").val(), "12.556", "The display value is not correct");
		assert.equal($editorRound.igNumericEditor("value"), 12.556, "The hidden value sent to server is not correct");
		$editorRound.igNumericEditor("setFocus");
		$editorRound.igNumericEditor("option", "minDecimals", 7);
		assert.equal($editorRound.igNumericEditor("field").val(), "12.556", "The display value is not correct");
		assert.equal($editorRound.igNumericEditor("value"), 12.556, "The hidden value sent to server is not correct");
		$editorRound.trigger("blur");
		assert.equal($editorRound.igNumericEditor("field").val(), "12.5560000", "The display value is not correct");
		assert.equal($editorRound.igNumericEditor("value"), 12.556, "The hidden value sent to server is not correct");
		assert.equal($editorRound.igNumericEditor("option", "maxDecimals"), 7, "maxDecimals should be equal to minDecimals");
		$editorRound.remove();
	});

	QUnit.test("Test minDecimals/maxDecimals options", function () {
		assert.expect(78);
		var $editorRound, $editorTrunc, testData, errorMessage, mode, boundary;

		testData = [null, undefined];
		for (index = 0; index < testData.length; index++) {
			$editor = $('<input/>').appendTo("#testBedContainer").igNumericEditor({
				minDecimals: testData[index],
				maxDecimals: testData[index]
			});
			assert.equal($editor.igNumericEditor("option", "minDecimals"), 0, "minDecimals should be taken from regional");
			assert.equal($editor.igNumericEditor("option", "maxDecimals"), 2, "maxDecimals should be taken from regional");
			$editor.remove();
		}

		settingsData = [{ mode: "double", max: 15 }, { mode: "float", max: 7 }];
		testData = [NaN, "abc", -5, "-7", "", 16, "105"];

		for (settingsIndex = 0; settingsIndex < settingsData.length; settingsIndex++) {
			mode = settingsData[settingsIndex].mode;
			boundary = settingsData[settingsIndex].max;
			errorMessage = $.ig.util.stringFormat($.ig.Editor.locale.decimalNumber, mode, "{optionName}", boundary);
			for (index = 0; index < testData.length; index++) {
				throws(function () {
					$editor = $('<input/>').appendTo("#testBedContainer").igNumericEditor({
						dataMode: mode,
						minDecimals: testData[index]
					});
					$editor.remove();
				}, Error(errorMessage.replace("{optionName}", "minDecimals")), "Exception should be thrown");

				throws(function () {
					$editor = $('<input/>').appendTo("#testBedContainer").igNumericEditor({
						dataMode: mode,
						maxDecimals: testData[index]
					});
					$editor.remove();
				}, Error(errorMessage.replace("{optionName}", "maxDecimals")), "Exception should be thrown");
			}
		}

		for (settingsIndex = 0; settingsIndex < settingsData.length; settingsIndex++) {
			mode = settingsData[settingsIndex].mode;
			boundary = settingsData[settingsIndex].max;
			errorMessage = $.ig.util.stringFormat($.ig.Editor.locale.decimalNumber, mode, "{optionName}", boundary);

			$editor = $('<input/>').appendTo("#testBedContainer").igNumericEditor({
				dataMode: mode,
				minDecimals: 2,
				maxDecimals: 5
			});
			for (index = 0; index < testData.length; index++) {
				throws(function () {
					$editor.igNumericEditor("option", "minDecimals", testData[index]);
				}, Error(errorMessage.replace("{optionName}", "minDecimals")), "Exception should be thrown");

				throws(function () {
					$editor.igNumericEditor("option", "maxDecimals", testData[index]);
				}, Error(errorMessage.replace("{optionName}", "maxDecimals")), "Exception should be thrown");
			}
			$editor.remove();
		}

		$editor = $('<input/>').appendTo("#testBedContainer").igNumericEditor({
			dataMode: "double",
			minDecimals: 2,
			maxDecimals: 5
		});
		$editor.igNumericEditor("option", "minDecimals", 10);
		assert.equal($editor.igNumericEditor("option", "minDecimals"), 10, "minDecimal should be set");
		assert.equal($editor.igNumericEditor("option", "maxDecimals"), 10, "minDecimal should be the same as minDecimals");
		$editor.remove();

		// Test Invalid min/max decimals:

		function testDecimalBoundary(mode, option, value, boundary) {
			throws(function () {
				var options = { dataMode: mode };
				options[option] = value;
				var $editor = $("<input id='editor'/>").
					appendTo("#testBedContainer").igNumericEditor(options);
			},
				Error($.ig.Editor.locale.decimalNumber.replace("{0}", mode).replace("{1}", option).replace("{2}", boundary)),
				$.ig.Editor.locale.decimalNumber + "not shown"
			);
			assert.strictEqual($editor.data("igNumericEditor"), undefined, "Widget should not be created with wrong maxDecimals.")
			$editor.remove();
		}
		var decimalOptions = [
			["double", "maxDecimals", 16, 15],
			["double", "minDecimals", -1, 15],
			["double", "maxDecimals", -16, 15],
			["double", "minDecimals", 150, 15],
			["float", "maxDecimals", 14, 7],
			["float", "minDecimals", 55, 7],
			["float", "maxDecimals", -13, 7],
			["float", "minDecimals", 77, 7]
		];
		for (var i = 0; i < decimalOptions.length; i++) {
			testDecimalBoundary.apply(this, decimalOptions[i]);
		}
	});

	QUnit.test("Test decimalSeparator on initialization #769", function () {
		assert.expect(2);
		throws(function () {
			var $editor = $("<input id='editor'/>").
				appendTo("#testBedContainer").igNumericEditor({ decimalSeparator: true, value: 1.01 });
		}, function (err) {
			return err.message.indexOf($.ig.Editor.locale.decimalSeparatorErrorMsg) > -1;
		}, $.ig.Editor.locale.decimalSeparatorErrorMsg + "not shown");
		$editor.remove();

		throws(function () {
			var $editor = $("<input id='editor'/>").
				appendTo("#testBedContainer").igNumericEditor({ decimalSeparator: ".,", value: 1.01 });
		}, function (err) {
			return err.message.indexOf($.ig.Editor.locale.decimalSeparatorErrorMsg) > -1;
		}, $.ig.Editor.locale.decimalSeparatorErrorMsg + "not shown");
		$editor.remove();
	});

	QUnit.test("Test decimalSeparator at runtime #769", function () {
		assert.expect(4);

		var $editor = $("<input id='editor'/>").
			appendTo("#testBedContainer").igNumericEditor({ decimalSeparator: "/", value: 1.01 });
		throws(function () {
			$("#editor").igNumericEditor("option", "decimalSeparator", "true")
		}, function (err) {
			return err.message.indexOf($.ig.Editor.locale.decimalSeparatorErrorMsg) > -1;
		}, $.ig.Editor.locale.decimalSeparatorErrorMsg + "not shown");
		assert.equal($editor.igNumericEditor("option", "decimalSeparator"), "/", "decimalSeparator is changed.");
		$editor.remove();

		var $editor = $("<input id='editor'/>").
			appendTo("#testBedContainer").igNumericEditor({ decimalSeparator: "/", value: 1.01 });
		throws(function () {
			$("#editor").igNumericEditor("option", "decimalSeparator", ".,")
		}, function (err) {
			return err.message.indexOf($.ig.Editor.locale.decimalSeparatorErrorMsg) > -1;
		}, $.ig.Editor.locale.decimalSeparatorErrorMsg + "not shown");
		assert.equal($editor.igNumericEditor("option", "decimalSeparator"), "/", "decimalSeparator is changed.");
		$editor.remove();
	});

	QUnit.test("Test groups contain 0 #771", function () {
		assert.expect(3);

		var $editor = $("<input id='editor'/>").
			appendTo("#testBedContainer").igNumericEditor({ groups: [0, 2, 10], value: 111222333444 });

		var displayValue = $editor.igNumericEditor("displayValue");
		assert.equal(displayValue, "1112223334,44", "The displayValue is not correct.")
		$editor.remove();

		var $editor = $("<input id='editor'/>").
			appendTo("#testBedContainer").igNumericEditor({ groups: [0, 2, 0, 1, 9], value: 111222333444 });

		var displayValue = $editor.igNumericEditor("displayValue");
		assert.equal(displayValue, "111222333,4,44", "The displayValue is not correct.")
		$editor.remove();

		var $editor = $("<input id='editor'/>").
			appendTo("#testBedContainer").igNumericEditor({ groups: [2, 1, 9], value: 111222333444 });

		var displayValue = $editor.igNumericEditor("displayValue");
		assert.equal(displayValue, "111222333,4,44", "The displayValue is not correct.")
		$editor.remove();
	});

	QUnit.test("Test allowNullValue and NullValue at initialization #779", function () {
		assert.expect(9);

		var $editor = $("<input id='editor'/>").
			appendTo("#testBedContainer").igNumericEditor({ allowNullValue: true, nullValue: 0 });

		var currentValue = $editor.igNumericEditor("value");
		assert.equal(currentValue, 0, "The value is not 0, although the nullValue is set to 0.")
		$editor.remove();

		// test invalid nullValue
		$editor = $("<input id='editor'/>").appendTo("#testBedContainer")
			.igNumericEditor({
				buttonType: "clear",
				nullValue: "abc",
				allowNullValue: true
			});

		assert.equal($editor.val(), "", "Display did not initialize correctly");
		assert.strictEqual($editor.igNumericEditor("value"), "", "Null value should be ignored on init");
		//check clear also ignores the wrong nullValue:
		$editor.igNumericEditor("value", 5);
		$editor.igNumericEditor("clearButton").trigger("click");
		assert.strictEqual($editor.igNumericEditor("value"), "", "Null value should be ignored on clear");
		$editor.igNumericEditor("value", 5);
		$editor.igNumericEditor("value", null);
		assert.strictEqual($editor.igNumericEditor("value"), "", "Null value should be ignored on set");
		//verify empty string is still accepted
		$editor.igNumericEditor("value", "");
		assert.strictEqual($editor.igNumericEditor("value"), "", "Empty value should be accepted");
		$editor.remove();

		//nullValue outside min/max:
		$editor = $("<input id='editor'/>").appendTo("#testBedContainer")
			.igNumericEditor({
				buttonType: "clear",
				nullValue: 5,
				maxValue: -3,
				allowNullValue: true
			});
		assert.equal($editor.igNumericEditor("value"), -3, "Null value should be ignored on init and default to max.");
		$editor.igNumericEditor("value", -5);
		$editor.igNumericEditor("clearButton").trigger("click");
		assert.equal($editor.igNumericEditor("value"), -3, "Null value should be ignored on clear and default to max.");
		//verify empty string is still accepted
		$editor.igNumericEditor("value", "");
		assert.strictEqual($editor.igNumericEditor("value"), "", "Empty value should be accepted");
		$editor.remove();
	});

	QUnit.test("Test Setting scientificFormat runtime #745", function () {
		assert.expect(3);
		var $editor = $("<input id='editor'/>").
			appendTo("#testBedContainer").igNumericEditor();

		var includedKeys = $editor.igNumericEditor("option", "includeKeys");
		assert.equal(includedKeys, "0123456789.-", "The included keys are not the defaut one.")

		$editor.igNumericEditor("option", "scientificFormat", "e");
		includedKeys = $editor.igNumericEditor("option", "includeKeys");
		assert.equal(includedKeys, "0123456789.-e", "The included keys do not include the scientificFormat 'e'.");

		$editor.igNumericEditor("option", "scientificFormat", "E");
		includedKeys = $editor.igNumericEditor("option", "includeKeys");
		assert.equal(includedKeys, "0123456789.-E", "The included keys do not include the scientificFormat 'E'.")

		$editor.remove();
	});

	QUnit.test("spinWrapAround spin to minValue if there is no maxValue set", function (assert) {
		assert.expect(3);
		var $editor;
		$editor = $('<input/>').appendTo("#testBedContainer").igNumericEditor({ dataMode: 'double', minValue: 5, spinWrapAround: true, buttonType: 'spin' });
		assert.ok($editor.igNumericEditor("spinUpButton").is(":visible"), "Spin up button is hidden");
		$editor.igNumericEditor("value", 5);
		$editor.igNumericEditor("spinDownButton");
		!assert.equal($editor.val(), 5, "Spin down was not performed!")
		$editor.igNumericEditor("spinUpButton");
		assert.equal($editor.val(), 5, "SpinWrap around was not performed!")

		$editor.remove();
	});

	QUnit.test("Set groupSeparator to null at runtime", function () {
		assert.expect(2);
		var $editor = $("<input id='editorGS'/>").
			appendTo("#testBedContainer").igNumericEditor({ value: 12209 });

		assert.equal($editor.igNumericEditor("displayValue"), "12,209", "The displayed value is not correct.")
		$("#editorGS").igNumericEditor("option", "groupSeparator", null)
		$editor.click();
		$editor.blur();
		assert.equal($editor.igNumericEditor("displayValue"), "12,209", "The displayed value is not correct.")

		$editor.remove();
	});

	QUnit.test("decimalSeparator and groupSeparator use the same symbol - init", function () {
		assert.expect(1);

		throws(function () {
			$editor = $('<input/>').appendTo("#testBedContainer").igNumericEditor({
				decimalSeparator: ",",
				groupSeparator: ",",
				value: 1.1
			});
			$editor.remove();
		}, Error($.ig.Editor.locale.decimalSeparatorEqualsGroupSeparatorErrorMsg), "Exception is not thrown when groupSeparator and decimalSeparator have the same value.");
	});

	QUnit.test("nullValue dynamic setting", function () {
		assert.expect(11);

		var $editor = $("<input/>").appendTo("#testBedContainer").igNumericEditor({
			"allowNullValue": true,
			"nullValue": null,
			"revertIfNotValid": false
		});
		$editor.igNumericEditor("setFocus");
		$editor.igNumericEditor("value", 1);
		$editor.igNumericEditor("field").blur();
		$editor.igNumericEditor("value", null);
		assert.equal($editor.igNumericEditor("displayValue"), "", "The displayed value is not correct.");
		assert.equal($editor.igNumericEditor("field").val(), "", "The displayed value is not correct.");
		$editor.remove();

		$editor = $("<input/>").appendTo("#testBedContainer").igNumericEditor({
			"allowNullValue": true,
			"nullValue": null,
			"revertIfNotValid": true
		});
		$editor.igNumericEditor("setFocus");
		$editor.igNumericEditor("value", 1);
		$editor.igNumericEditor("field").blur();
		$editor.igNumericEditor("value", null);
		assert.equal($editor.igNumericEditor("displayValue"), "", "The displayed value is not correct.");
		assert.equal($editor.igNumericEditor("field").val(), "", "The displayed value is not correct.");
		$editor.remove();

		$editor = $("<input/>").appendTo("#testBedContainer").igNumericEditor({
			"allowNullValue": false,
			"revertIfNotValid": true
		});
		$editor.igNumericEditor("setFocus");
		$editor.igNumericEditor("value", 1);
		$editor.igNumericEditor("field").blur();
		$editor.igNumericEditor("value", null);
		assert.equal($editor.igNumericEditor("displayValue"), "1", "The displayed value is not correct.");
		assert.equal($editor.igNumericEditor("field").val(), "1", "The displayed value is not correct.");
		$editor.remove();

		$editor = $("<input/>").appendTo("#testBedContainer").igNumericEditor({
			"allowNullValue": false,
			"revertIfNotValid": false
		});
		$editor.igNumericEditor("setFocus");
		$editor.igNumericEditor("value", 1);
		$editor.igNumericEditor("field").blur();
		$editor.igNumericEditor("value", null);
		assert.equal($editor.igNumericEditor("displayValue"), "0", "The displayed value is not correct.");
		assert.equal($editor.igNumericEditor("field").val(), "0", "The displayed value is not correct.");
		$editor.remove();

		$editor = $("<input/>").appendTo("#testBedContainer").igNumericEditor({
			"allowNullValue": true,
			"nullValue": 10,
			"revertIfNotValid": false
		});
		$editor.igNumericEditor("setFocus");
		$editor.igNumericEditor("value", 1);
		$editor.igNumericEditor("field").blur();
		$editor.igNumericEditor("value", null);
		assert.equal($editor.igNumericEditor("value"), 10, "The value is not correct.");
		assert.equal($editor.igNumericEditor("displayValue"), "10", "The displayed value is not correct.");
		assert.equal($editor.igNumericEditor("field").val(), "10", "The displayed value is not correct.");
		$editor.remove();
	});

	QUnit.test("decimalSeparator uses the same symbol as the groupSeparator - runtime", function () {
		assert.expect(1);

		var $editor = $("<input id='editorDecimalGroupSeparators'/>").
			appendTo("#testBedContainer").igNumericEditor({ decimalSeparator: ",", groupSeparator: "/", value: 1.01 });
		throws(function () {
			$("#editorDecimalGroupSeparators").igNumericEditor("option", "decimalSeparator", "/");
			$editor.remove();
		}, Error($.ig.Editor.locale.decimalSeparatorEqualsGroupSeparatorErrorMsg), $.ig.Editor.locale.decimalSeparatorEqualsGroupSeparatorErrorMsg + "not shown");


		//var $editor = $("<input id='editor'/>").
		//	appendTo("#testBedContainer").igNumericEditor({ decimalSeparator: "/", groupSeparator: ",", value:1.01});
		//throws(function () {
		//	$("#editor").igNumericEditor("option", "groupSeparator", "/")
		//}, function (err) {
		//		return err.message.indexOf($.ig.Editor.locale.decimalSeparatorEqualsGroupSeparatorErrorMsg) > -1;
		//	}, $.ig.Editor.locale.decimalSeparatorEqualsGroupSeparatorErrorMsg + "not shown");
		//$editor.remove();
	});

	QUnit.test("groupSeparator uses the same symbol as the decimalSeparator - runtime", function () {
		assert.expect(1);

		var $editor = $("<input id='editorGroupSeparators'/>").
			appendTo("#testBedContainer").igNumericEditor({ decimalSeparator: "/", groupSeparator: ",", value: 1.01 });
		throws(function () {
			$("#editorGroupSeparators").igNumericEditor("option", "groupSeparator", "/");
			$editor.remove();
		}, Error($.ig.Editor.locale.decimalSeparatorEqualsGroupSeparatorErrorMsg), $.ig.Editor.locale.decimalSeparatorEqualsGroupSeparatorErrorMsg + "not shown");
	});

	QUnit.test('Runtime changes for local and regional options', function (assert) {
		assert.expect(6);
		var $editor = $("<input/>").appendTo("#testBedContainer").igNumericEditor({ buttonType: "spin", value: 1234567.123 });

		assert.equal($editor.igNumericEditor("displayValue"), "1,234,567.12", "Format should be in English");
		assert.equal($editor.igNumericEditor("spinUpButton").attr("title"), $.ig.locale.en.Editor.spinUpperTitle, "Title of the button should be in English");
		$editor.igNumericEditor("option", "language", "de");
		assert.equal($editor.igNumericEditor("spinUpButton").attr("title"), $.ig.locale.de.Editor.spinUpperTitle, "Title of the button should be in German");
		$editor.igNumericEditor("option", "regional", "de");
		assert.equal($editor.igNumericEditor("displayValue"), "1.234.567,12", "Format should be in German");
		$editor.igNumericEditor("setFocus");
		assert.equal($editor.igNumericEditor("field").val(), "1234567,12", "Input Format should be in German");
		$editor.igNumericEditor("option", "regional", "en");
		assert.equal($editor.igNumericEditor("field").val(), "1234567.12", "Input Format should be in German");
		$editor.trigger("blur").remove();
	});

	QUnit.test('Null value set as nullValue and empty string set as value', function (assert) {
		assert.expect(3);
		var $editor = $("<input/>").appendTo("#testBedContainer").igNumericEditor({ allowNullValue: true, nullValue: null, value: 0 });

		$editor.igNumericEditor("setFocus");
		$editor.igNumericEditor("field").val("");
		$editor.trigger("blur");
		assert.equal($editor.igNumericEditor("value"), null, "Value should be null");
		$editor.igNumericEditor("setFocus");
		$editor.igNumericEditor("field").val("34");
		$editor.trigger("blur");
		assert.equal($editor.igNumericEditor("value"), 34, "Value should be 34");
		$editor.igNumericEditor("setFocus");
		$editor.igNumericEditor("field").val("");
		$editor.trigger("blur");
		assert.equal($editor.igNumericEditor("value"), null, "Value should be null");
		$editor.remove();
	});
});
function testSelection(input, start, end) {
	assert.equal(input[0].selectionStart, start, "The selection doesn't start from index " + start);
	assert.equal(input[0].selectionEnd, end, "The selection doesn't end from index " + end);
}

function typeInMaskedInput(characters, element) {
	var keyDown = jQuery.Event("keydown"),
		keyPress = jQuery.Event("keypress"),
		keyUp = jQuery.Event("keyup"),
		value = element.val(), selectionStart = 0;

	characters.split('').forEach(function (ch) {
		keyDown.keyCode = keyUp.keyCode = keyPress.keyCode = ch.charCodeAt(0);
		keyDown.charCode = keyUp.charCode = keyPress.charCode = ch.charCodeAt(0);
		element.trigger(keyDown);
		element.trigger(keyPress);
		// refresh selection EACH time, mask editor moves over literals:
		selectionStart = element[0].selectionStart;
		value = value.replaceAt(selectionStart++, ch);
		element.val(value);
		element[0].selectionStart = selectionStart;
		element.trigger(keyUp);
	});
}

String.prototype.replaceAt = function (index, character) {
	return this.substr(0, index) + character + this.substr(index + character.length);
}

function keyInteraction(key, target, special) {
	keyDownChar(key, target, special);
	keyPressChar(key, target, special);
	keyUpChar(key, target, special);
}

function keyDownChar(key, target, special) {
	var evt = $.Event("keydown");
	evt.keyCode = key;
	evt.charCode = key;
	if (special) {
		evt[special] = true;
	}
	target.trigger(evt);
}

function keyPressChar(key, target, special) {
	var evt = $.Event("keypress");
	evt.keyCode = key;
	evt.charCode = key;
	if (special) {
		evt[special] = true;
	}
	target.trigger(evt);
}

function keyUpChar(key, target, special) {
	var evt = $.Event("keyup");
	evt.keyCode = key;
	evt.charCode = key;
	if (special) {
		evt[special] = true;
	}
	target.trigger(evt);
}

function mouseup(element) {
	// create a mouse click event
	var event = document.createEvent('MouseEvents');
	event.initMouseEvent('mouseup', true, true, window, 1, 0, 0, null, null, false, false, false, false, 0, null);

	// send click to element
	element.dispatchEvent(event);
}

function mousedown(element) {
	// create a mouse click event
	var event = document.createEvent('MouseEvents');
	event.initMouseEvent('mousedown', true, true, window, 1, 0, 0, null, null, false, false, false, false, 0, null);

	// send click to element
	element.dispatchEvent(event);
}

function mouseover(element) {
	// create a mouse click event
	var event = document.createEvent('MouseEvents');
	event.initMouseEvent('mouseover', true, true, window, 1, 0, 0);

	// send click to element
	element.dispatchEvent(event);
}

function mouseout(element) {
	// create a mouse click event
	var event = document.createEvent('MouseEvents');
	event.initMouseEvent('mouseout', true, true, window, 1, 0, 0);

	// send click to element
	element.dispatchEvent(event);
}
function mouseclick(element) {
	// create a mouse click event
	var event = document.createEvent('MouseEvents');
	event.initMouseEvent('click', true, true, window, 1, 0, 0);

	// send click to element
	element.dispatchEvent(event);
}