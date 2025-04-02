
/* global window, setTimeout, $, QUnit */

QUnit.module("igCurrencyEditor unit tests", {
	divTag: '<div></div>',
	inputTag: '<input></input>',
	util: $.ig.TestUtil,

	beforeEach: function () { },

	afterEach: function () { },
});

QUnit.test("Currency Symbol", function (assert) {
	assert.expect(4);

	var $currencyEditor = this.util.appendToFixture(this.divTag, { id: "currencyEditor" }),
		$currencyEditorDefault = this.util.appendToFixture(this.divTag, { id: "currencyEditorDefault" });

	$currencyEditor.igCurrencyEditor({ currencySymbol: "#" });
	$currencyEditorDefault.igCurrencyEditor();

	$currencyEditor.igCurrencyEditor("value", 99);
	$currencyEditor.blur();
	assert.equal($currencyEditor.igCurrencyEditor('displayValue'), "#99.00", "The value is not correct");

	$currencyEditor.igCurrencyEditor("option", "currencySymbol", "@");
	$currencyEditor.igCurrencyEditor("value", 17.32);
	$currencyEditor.blur();
	assert.equal($currencyEditor.igCurrencyEditor('displayValue'), "@17.32", "The value is not correct");

	// intertnal parse :
	assert.strictEqual($currencyEditor.data("igCurrencyEditor")._valueFromText("@1264.89"), 1264.89, "The parsed value is not correct");
	assert.strictEqual($currencyEditorDefault.data("igCurrencyEditor")._valueFromText("$50.34"), 50.34, "The parsed value is not correct");
});

QUnit.test("Positive Pattern", function (assert) {
	assert.expect(2);

	var $currencyEditor = this.util.appendToFixture(this.divTag);
	$currencyEditor.igCurrencyEditor({
		positivePattern: ")n("
	});

	$currencyEditor.igCurrencyEditor("value", 004);
	$currencyEditor.blur();
	assert.equal($currencyEditor.igCurrencyEditor('displayValue'), ")4.00(", "The display value is not correct");

	$currencyEditor.igCurrencyEditor("option", "positivePattern", "_n_");
	$currencyEditor.igCurrencyEditor("value", 9750.8);
	$currencyEditor.blur();
	assert.equal($currencyEditor.igCurrencyEditor('displayValue'), "_9,750.80_", "The display value is not correct");
});

QUnit.test("Method Currency Symbol", function (assert) {
	assert.expect(3);
	var $currencyEditor = this.util.appendToFixture(this.divTag);
	$currencyEditor.igCurrencyEditor({
		positivePattern: "$=n=",
		currencySymbol: "*",
		value: "23"
	});

	assert.equal($currencyEditor.igCurrencyEditor('displayValue'), "*=23.00=", "The display value is not correct");
	assert.equal($currencyEditor.igCurrencyEditor('currencySymbol'), "*", "The currency symbol is not correct");

	$currencyEditor.igCurrencyEditor("currencySymbol", "^");
	$currencyEditor.igCurrencyEditor("value", 44);
	$currencyEditor.blur();
	assert.equal($currencyEditor.igCurrencyEditor('displayValue'), "^=44.00=", "The display value is not correct");
});

QUnit.test("Invalid dataMode converted to default - double", function (assert) {
	assert.expect(1);

	var $currencyEditor = this.util.appendToFixture(this.divTag);
	$currencyEditor.igCurrencyEditor({
		dataMode: "invalidMode",
		maxDecimals: 15
	});

	$currencyEditor.igCurrencyEditor("value", 10.1234567890123456789);
	$currencyEditor.blur();
	assert.equal($currencyEditor.igCurrencyEditor('displayValue'), "$10.123456789012346", "The display value is not correct");
});

QUnit.test("MinValue greater than MaxValue", function (assert) {
	assert.expect(2);

	var $currencyEditor = this.util.appendToFixture(this.divTag);
	$currencyEditor.igCurrencyEditor({
		minDecimals: 10,
		maxDecimals: 6
	});

	$currencyEditor.igCurrencyEditor("value", 10.123456789012);
	$currencyEditor.blur();
	assert.equal($currencyEditor.igCurrencyEditor('displayValue'), "$10.1234567890", "The display value is not correct");

	$currencyEditor.igCurrencyEditor("value", 10.1);
	$currencyEditor.blur();
	assert.equal($currencyEditor.igCurrencyEditor('displayValue'), "$10.1000000000", "The display value is not correct");
});

QUnit.test("Group and decimal Separators", function (assert) {
	assert.expect(1);

	var $currencyEditor = this.util.appendToFixture(this.divTag);
	$currencyEditor.igCurrencyEditor();

	// For 207132 Can't set groupSeparator to empty string, and decimalSeparator to comma
	$currencyEditor.igCurrencyEditor("option", "groupSeparator", "");
	$currencyEditor.igCurrencyEditor("option", "decimalSeparator", ",");
	$currencyEditor.igCurrencyEditor("option", "value", 1264.89);
	assert.equal($currencyEditor.igCurrencyEditor("displayValue"), "$1264,89", "The decimal value is not correct");
});

QUnit.test('Insert in/outside edit mode', function (assert) {
	assert.expect(4);
	var $currencyEditor = this.util.appendToFixture(this.divTag),
		editorInput;

	$currencyEditor.igCurrencyEditor();
	editorInput = $currencyEditor.igCurrencyEditor("field");

	// #287: Percent/Currency insert method not working with existing value outside edit mode
	$currencyEditor.igCurrencyEditor("insert", "55");
	assert.equal($currencyEditor.igCurrencyEditor("value"), 55, "Value not correct after intial insert");
	assert.equal(editorInput.val(), "$55.00", "Insert value not converted to display text");

	$currencyEditor.igCurrencyEditor("insert", "1.05");
	assert.equal($currencyEditor.igCurrencyEditor("value"), 1.05, "Value not correct after second insert");
	assert.equal(editorInput.val(), "$1.05", "Insert value not converted to display text");
});

QUnit.test("Test nullValue on initialization", function (assert) {
	assert.expect(4);

	var $currencyEditor = this.util.appendToFixture(this.inputTag);
	$currencyEditor.igCurrencyEditor(
		{
			allowNullValue: false
		});

	//Get null Value
	assert.equal($currencyEditor.igCurrencyEditor("value"), "", "The value is not an empty string");

	//Set null Value
	$currencyEditor.igCurrencyEditor("value", null);
	assert.equal($currencyEditor.igCurrencyEditor("value"), "", "The value is not an empty string");

	//Change allowNullValue option
	$currencyEditor.igCurrencyEditor("option", "allowNullValue", true);

	// Get Null value
	assert.equal($currencyEditor.igCurrencyEditor("value"), "", "The value is not an empty string");

	//Set Null value
	$currencyEditor.igCurrencyEditor("value", null);

	//Get null value
	assert.equal($currencyEditor.igCurrencyEditor("value"), null, "The value is not an null");
	$currencyEditor.remove();
});

QUnit.test('Clear button state', function (assert) {
	assert.expect(2);

	var $currencyEditor = this.util.appendToFixture(this.inputTag);
	$currencyEditor.igCurrencyEditor(
		{
			buttonType: "clear"
		});

	assert.notOk($currencyEditor.igCurrencyEditor("clearButton").is(":visible"), "Clear button is not hidden");
	$currencyEditor.igCurrencyEditor("value", 45);
	assert.ok($currencyEditor.igCurrencyEditor("clearButton").is(":visible"), "Clear button is not visible");
});

QUnit.test("Lists testing, selection-value match", function (assert) {
	assert.expect(44);

	var $currencyEditor,
		$field,
		$ddButton,
		$spinUpButton,
		$spinDownButton,
		setUpEditor,
		util = this.util,
		inputTag = this.inputTag;

	setUpEditor = function (options) {
		if ($currencyEditor)
			$currencyEditor.remove();
		$currencyEditor = util.appendToFixture(inputTag);
		$currencyEditor.igCurrencyEditor(options);
		$field = $currencyEditor.igCurrencyEditor("field");
		$ddButton = $currencyEditor.igCurrencyEditor("dropDownButton");
		$spinUpButton = $currencyEditor.igCurrencyEditor("spinUpButton");
		$spinDownButton = $currencyEditor.igCurrencyEditor("spinDownButton");
	}

	setUpEditor({
		listItems: [1, 2, 3],
		buttonType: "dropdown",
		// remove animation to avoid waiting, show() with effect ignores 0
		dropDownAnimationDuration: -1
	});

	$currencyEditor.igCurrencyEditor("value", 1);
	$ddButton.click();
	assert.ok($currencyEditor.igCurrencyEditor("getSelectedListItem").hasClass($.ui.igCurrencyEditor.prototype.css.listItemSelected), "Selected item (API) does't have proper styles applied");
	assert.equal($currencyEditor.igCurrencyEditor("selectedListIndex"), 0, "Selected index does not reflect value");
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").text(), "1", "Selected item does not reflect value");

	// select item2:
	$currencyEditor.igCurrencyEditor("dropDownContainer").find("span.ui-igedit-listitem").eq(1).click();
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").text(), "2", "Selected item (API) did not update after selection");

	// change value in edit mode:
	$ddButton.click();
	this.util.keyDownChar(51, $field);
	$field.val("3");
	this.util.keyPressChar(51, $field);
	this.util.keyUpChar(51, $field);
	this.util.keyInteraction(13, $field);
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").text(), "3", "Selected item (API) did not update after value update.");

	//initial value, clear:
	$currencyEditor.remove();
	$currencyEditor = this.util.appendToFixture(this.inputTag);
	$currencyEditor.igCurrencyEditor({
		listItems: [1, 123, 2, 3, 156, 99],
		buttonType: "dropdown, clear",
		value: 2,
		// remove animation to avoid waiting, show() with effect ignores 0
		dropDownAnimationDuration: -1
	});
	$field = $currencyEditor.igCurrencyEditor("field");
	$ddButton = $currencyEditor.igCurrencyEditor("dropDownButton");
	$spinUpButton = $currencyEditor.igCurrencyEditor("spinUpButton");
	$spinDownButton = $currencyEditor.igCurrencyEditor("spinDownButton");

	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").text(), 2, "Selected item (API) not correct on initialization");
	assert.equal($currencyEditor.igCurrencyEditor("selectedListIndex"), 2, "Selected index (API) not correct on initialization");

	$currencyEditor.igCurrencyEditor("value", 999);
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").length, 0, "There should be no selected item (API) without matching value.");
	$currencyEditor.igCurrencyEditor("value", 3);
	$ddButton.click();
	this.util.keyInteraction(38, $field);
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").text(), "3", "Selected item does not reflect value.");
	assert.equal($currencyEditor.igCurrencyEditor("dropDownContainer").find(".ui-igedit-listitemactive").last().text(), "2", "Active item did not move from original selection.");

	this.util.keyDownChar(54, $field);

	$field.val("156");
	this.util.keyPressChar(54, $field);
	this.util.keyUpChar(54, $field);
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").text(), "156", "Selected item not updated when typing.");

	this.util.keyInteraction(40, $field);
	assert.equal($currencyEditor.igCurrencyEditor("dropDownContainer").find(".ui-igedit-listitemactive").last().text(), "99", "Active item did not move from new selection.");

	this.util.keyDownChar(56 /*8*/, $field);
	$field.val("8");
	this.util.keyPressChar(56, $field);
	this.util.keyUpChar(56, $field);
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").length, 0, "Selected item not cleared when typing.");
	assert.equal($currencyEditor.igCurrencyEditor("dropDownContainer").find(".ui-igedit-listitemactive").length, 0, "Active item not cleared when typing.");

	this.util.keyInteraction(13, $field);
	assert.equal($currencyEditor.igCurrencyEditor("value"), 8, "Value not set correctly on enter without list selection.");
	assert.ok(!$currencyEditor.igCurrencyEditor("dropDownContainer").is(":visible"), "Dropdown list did not close on enter.");
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").length, 0, "There should be no selection when value doesn't match any item.");

	$ddButton.click();
	$field.val("2");
	this.util.keyInteraction(13, $field);
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").text(), "2", "Selected item does not reflect value.");

	$currencyEditor.igCurrencyEditor("clearButton").click();
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").length, 0, "Selection not removed on clear in edit mode");
	assert.equal($currencyEditor.igCurrencyEditor("dropDownContainer").find(".ui-igedit-listitemactive").length, 0, "Active item not removed on clear in edit mode.");

	$field.blur();
	$currencyEditor.igCurrencyEditor("value", 99);
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").text(), "99", "Selected item does not reflect value.");

	$currencyEditor.igCurrencyEditor("clearButton").click();
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").length, 0, "Selection not removed on clear outside edit mode.");

	// spin + isLimitedToListValues
	var listItems = [5, 44.5, 44, 575, 55.4, 243, 10];
	setUpEditor({
		spinDelta: 1,
		isLimitedToListValues: true,
		listItems: listItems,
		buttonType: "dropdown, spin, clear",
		value: 44,
		// remove animation to avoid waiting, show() with effect ignores 0
		dropDownAnimationDuration: -1
	});

	this.util.click($spinUpButton);
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").text(), "44.5", "Selection not changed on spin button");
	assert.strictEqual($currencyEditor.igCurrencyEditor("value"), 44.5, "Value not changed on spin button");

	for (var i = 0; i < 3; i++) {
		this.util.click($spinUpButton);
	}

	assert.strictEqual($currencyEditor.igCurrencyEditor("value"), 5, "Value not changed on spin button");
	assert.ok($spinUpButton.hasClass("ui-state-disabled"), "Spin up button not disabled");

	$currencyEditor.igCurrencyEditor("spinDown");
	assert.strictEqual($currencyEditor.igCurrencyEditor("value"), 44.5, "Value not changed on spin method");

	$currencyEditor.igCurrencyEditor("spinUp");
	assert.strictEqual($currencyEditor.igCurrencyEditor("value"), 5, "Value not changed on spin method");

	$currencyEditor.trigger("focus");
	this.util.click($spinUpButton);
	this.util.click($spinDownButton);
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").text(), "44.5", "Selection not changed on spin button in edit mode.");
	assert.notOk($spinUpButton.hasClass("ui-state-disabled"), "Spin up button not enabled"); //30

	$ddButton.click();
	for (var i = 2; i < listItems.length; i++) {
		this.util.click($spinDownButton);
		assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").index(), i, "Selection not changed on spin button with open dropdown.");
	}

	assert.ok($spinDownButton.hasClass("ui-state-disabled"), "Spin down button not disabled");

	$currencyEditor.igCurrencyEditor("spinUp");
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").text(), "243", "Value not changed on spin method in edit mode");

	// list items with decimalSeparator
	setUpEditor({
		listItems: [10, 0.15, 55.47, 12045, 2413.5],
		buttonType: "spin, clear",
		value: 55.47,
		isLimitedToListValues: true, // attempt list values spin
		decimalSeparator: ",",
		groupSeparator: "."
	});

	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").text(), "55,47", "decimalSeparator selected item not correct.");

	$currencyEditor.igCurrencyEditor("value", 12045);
	$currencyEditor.trigger("focus");
	$currencyEditor.blur();
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").text(), "12045", "decimalSeparator selected item did not remain correct.");

	$ddButton.click();
	$currencyEditor.igCurrencyEditor("dropDownContainer").find("span.ui-igedit-listitem").eq(1).click();
	assert.equal($currencyEditor.igCurrencyEditor("field").val(), "0,15", "Selected item did not update text with correct decimalSeparator."); //????

	$currencyEditor.blur();
	assert.equal($currencyEditor.igCurrencyEditor("value"), 0.15, "Selected item did not update text with correct decimalSeparator.");
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").text(), "0,15", "Selected item (API) did not update after selection");

	$currencyEditor.igCurrencyEditor("value", 12045);
	$currencyEditor.igCurrencyEditor("spinDown");
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").text(), "2413,5", "Selected item not correct after spin call");

	$currencyEditor.trigger("focus");
	$currencyEditor.igCurrencyEditor("spinDown");
	assert.equal($currencyEditor.igCurrencyEditor("getSelectedListItem").text(), "2413,5", "Selected item not correct after spin call in edit mode");
});

QUnit.test('MaxValue SpinUpButton', function (assert) {
	assert.expect(2);

	var $currencyEditor = this.util.appendToFixture(this.inputTag);

	$currencyEditor.igCurrencyEditor(
		{
			displayFactor: 1, maxValue: 8, spinDelta: 1, buttonType: "spin"
		});

	assert.ok($currencyEditor.igCurrencyEditor("spinUpButton").is(":visible"), "Spin up button is hidden");
	$currencyEditor.igCurrencyEditor("value", 8);
	$currencyEditor.blur();
	assert.ok($currencyEditor.igCurrencyEditor("spinUpButton").hasClass("ui-state-disabled"), "Spin up button is not disabled.");
});

QUnit.test('MinValue SpinDownButton', function (assert) {
	assert.expect(2);

	var $currencyEditor = this.util.appendToFixture(this.inputTag);
	$currencyEditor.igCurrencyEditor(
		{
			displayFactor: 1, minValue: 2, spinDelta: 1, buttonType: "spin"
		});

	assert.ok($currencyEditor.igCurrencyEditor("spinDownButton").is(":visible"), "Spin down button is hidden");
	$currencyEditor.igCurrencyEditor("value", 2);
	$currencyEditor.blur();
	assert.ok($currencyEditor.igCurrencyEditor("spinDownButton").hasClass("ui-state-disabled"), "Spin down button is not disabled.");
});

QUnit.test('Reaching MinValue with clear button disables SpinDownButton', function (assert) {
	assert.expect(2);

	var $currencyEditor = this.util.appendToFixture(this.inputTag);

	$currencyEditor.igCurrencyEditor(
		{
				displayFactor: 1, maxValue: 8, minValue: 5, spinDelta: 1, buttonType: "spin, clear" 
		});

	assert.ok($currencyEditor.igCurrencyEditor("spinDownButton").is(":visible"), "Spin down button is hidden");
	$currencyEditor.igCurrencyEditor("value", 6);
	$currencyEditor.blur();
	$currencyEditor.igCurrencyEditor("clearButton").click();
	assert.ok($currencyEditor.igCurrencyEditor("spinDownButton").hasClass("ui-state-disabled"), "Spin down button is not disabled.");
});

QUnit.test('Runtime changes for local and regional options', function (assert) {
	assert.expect(6);

	var $currencyEditor = this.util.appendToFixture(this.inputTag);

	$currencyEditor.igCurrencyEditor({ buttonType: "spin", value: 1234567.123 });

	assert.equal($currencyEditor.igCurrencyEditor("displayValue"), "$1,234,567.12", "Format should be in English");
	assert.equal($currencyEditor.igCurrencyEditor("spinUpButton").attr("title"), $.ig.locale.en.Editor.spinUpperTitle, "Title of the button should be in English");
	
	$currencyEditor.igCurrencyEditor("option", "language", "de");
	assert.equal($currencyEditor.igCurrencyEditor("spinUpButton").attr("title"), $.ig.locale.de.Editor.spinUpperTitle, "Title of the button should be in German");
	
	$currencyEditor.igCurrencyEditor("option", "regional", "de");
	assert.equal($currencyEditor.igCurrencyEditor("displayValue"), "1.234.567,12 €", "Format should be in German");
	
	$currencyEditor.igCurrencyEditor("setFocus");
	assert.equal($currencyEditor.igCurrencyEditor("field").val(), "1234567,12", "Input Format should be in German");
	
	$currencyEditor.igCurrencyEditor("option", "regional", "en-US");
	assert.equal($currencyEditor.igCurrencyEditor("field").val(), "1234567.12", "Input Format should be in English");
});