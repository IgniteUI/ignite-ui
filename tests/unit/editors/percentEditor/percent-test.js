QUnit.module("igPercentEditor unit tests", {
	divTag: '<div></div>',
	inputTag: '<input></input>'
});

QUnit.test('[ID1] Percent Editor initialization', function (assert) {
	assert.expect(5);

	var editor1 = $.ig.TestUtil.appendToFixture(this.divTag, { id: "pEditor1" });
	editor1.igPercentEditor({
		dataMode: 'float',
		displayFactor: 1,
		value: 10,
		percentSymbol: "%%"
	});

	var editor2 = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "pEditor2" });
	editor2.igPercentEditor({
		displayFactor: 1,
		value: 30,
		positivePattern: "%(n)"
	});

	assert.ok(typeof (editor1.igPercentEditor) === 'function', "Editor's script is not loaded.");
	assert.ok(editor1.data("igPercentEditor") !== undefined, 'Error creating igPercentEditor in an input element.');
	assert.ok(editor2.data("igPercentEditor") !== undefined, 'Error creating igPercentEditor in a div element.');
	assert.equal(editor1.igPercentEditor("value"), 10, 'The initial value is not as expexted.');
	assert.equal(editor2.igPercentEditor("value"), 30, 'The initial value is not as expexted.');
});

QUnit.test('[ID2] Percent Editor API', function (assert) {
	assert.expect(6);

	var editor1 = $.ig.TestUtil.appendToFixture(this.divTag, { id: "pEditor1" });
	editor1.igPercentEditor({
		dataMode: 'float',
		displayFactor: 1,
		value: 10,
		percentSymbol: "%%"
	});

	var expectdDisplayValue = "10.00%%";
	editorDisplayValue = editor1.igPercentEditor("displayValue");
	assert.equal(editorDisplayValue, expectdDisplayValue, "Initial editor display Value");

	editor1.igPercentEditor("percentSymbol", "%");
	expectdDisplayValue = "10.00%";
	editorDisplayValue = editor1.igPercentEditor("displayValue");
	assert.equal(editorDisplayValue, expectdDisplayValue, "Editor value after changing the percent option.");
	assert.equal(editor1.igPercentEditor("percentSymbol"), "%");

	editor1.igPercentEditor("option", "positivePattern", "+n%");
	expectdDisplayValue = "+10.00%";
	editorDisplayValue = editor1.igPercentEditor("displayValue");
	assert.equal(editorDisplayValue, expectdDisplayValue, "Editor value after changing the positivePattern option.");

	var editor4 = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "pEditor4" });
	editor4.igPercentEditor({
		displayFactor: 100,
		dataMode: 'float',
		value: 0.05
	});

	var editor6 = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "pEditor6" });
	editor6.igPercentEditor({
		displayFactor: 1
	});

	//Internal value parse
	editor6.igPercentEditor("option", "decimalSeparator", "x");
	assert.strictEqual(editor6.data("igPercentEditor")._valueFromText("1264x89"), 1264.89, "The parsed editor value is not correct");
	assert.strictEqual(editor4.data("igPercentEditor")._valueFromText("22%"), 0.22, "The parsed editor value is not correct");
});

QUnit.test('[ID3] Runtime Min/Max value', function (assert) {
	assert.expect(6);

	var expectedEditorValue = 0.5;
	var editor = $.ig.TestUtil.appendToFixture(this.inputTag);
	editor.igPercentEditor({
		value: expectedEditorValue
	});

	editor.igPercentEditor("option", "minValue", -1.5);
	var actualEditorValue = editor.igPercentEditor("value");
	assert.strictEqual(actualEditorValue, expectedEditorValue, "Editor value should remain the same");
	editor.igPercentEditor("option", "maxValue", 0.5);
	actualEditorValue = editor.igPercentEditor("value");
	assert.strictEqual(actualEditorValue, expectedEditorValue, "Editor value should remain the same");
	editor.igPercentEditor("option", "maxValue", 0.4);
	actualEditorValue = editor.igPercentEditor("value");
	assert.strictEqual(actualEditorValue, 0.4, "Editor value should be set to max value.");
	assert.equal(editor.igPercentEditor("field").val(), "40.00%", "Text not updated with max value");
	editor.igPercentEditor("value", 0);
	editor.igPercentEditor("option", "minValue", 0.1);
	actualEditorValue = editor.igPercentEditor("value");
	assert.strictEqual(actualEditorValue, 0.1, "Editor value should be set to min value.");
	assert.equal(editor.igPercentEditor("field").val(), "10.00%", "Text not updated with min value");
});

QUnit.test('[ID4] Editors initialization with display factor different from 1 and 100', function (assert) {
	assert.expect(3);

	var editorInput3 = $(this.inputTag, { id: "pEditor3" });
	var editorInput4 = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "pEditor4ID4" });
	var editorInput5 = $(this.inputTag, { id: "pEditor5" });
	editorInput4.igPercentEditor({
		displayFactor: 100,
		dataMode: 'float',
		value: 0.05
	});

	assert.throws(function () {
		editorInput3.igPercentEditor({
			displayFactor: 50
		});
	}, "There is no exception when the display factor is not 1 or 100");
	editorInput3.remove();
	assert.throws(function () {
		editorInput5.igPercentEditor({
			displayFactor: "50"
		});
	}, "DisplayFactor option is of type number");
	editorInput5.remove();
	assert.throws(function () {
		editorInput4.igPercentEditor("option", "displayFactor", "14");
	}, "DisplayFactor option is of type number");
});

QUnit.test('[ID5] Testing display factor with default value of 100', function (assert) {
	assert.expect(18);

	var editorInput4 = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "pEditor4" });
	editorInput4.igPercentEditor({
		displayFactor: 100,
		dataMode: 'float',
		value: 0.05
	});

	assert.equal(editorInput4.igPercentEditor("value"), 0.05, 'The initial value is not as expexted');
	editorInput4.igPercentEditor("value", -2.14);
	assert.equal(editorInput4.igPercentEditor("value"), -2.14, "New value is not correct");
	assert.equal(editorInput4.igPercentEditor("displayValue"), "-214.00%", "Display value by displayFactor = 100 is wrong");
	assert.throws(function () {
		editorInput4.igPercentEditor("option", "displayFactor", 14);
	}, "There is no exception when the display factor is not 1 or 100");

	var editorInput7 = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "pEditor7" });
	editorInput7.igPercentEditor({
		buttonType: "spin",
		maxDecimals: 5,
		minValue: 0.2,
		maxValue: 0.6
	});

	editorInput7.igPercentEditor("value", 700);
	assert.equal(editorInput7.igPercentEditor("value"), 0.6, "New value is not correct");
	editorInput7.igPercentEditor("value", 0.3);
	assert.equal(editorInput7.igPercentEditor("value"), 0.3, "New value is not correct");
	assert.equal(editorInput7.igPercentEditor("displayValue"), "30.00%", "New dispaly value is not correct");
	editorInput7.igPercentEditor("value", 700);
	assert.equal(editorInput7.igPercentEditor("value"), 0.6, "New value is not correct");

	editorInput7.igPercentEditor("setFocus");
	editorInput7.igPercentEditor("field").val(30);
	editorInput7.igPercentEditor("field").trigger("paste");
	// Need to blur to update value..
	editorInput7.igPercentEditor("field").trigger("blur");
	assert.equal(editorInput7.igPercentEditor("value"), 0.3, "New value is not correct");

	editorInput7.igPercentEditor("field").val(90);
	editorInput7.igPercentEditor("field").trigger("paste");
	editorInput7.igPercentEditor("field").trigger("blur");
	assert.equal(editorInput7.igPercentEditor("value"), 0.6, "Max value not set");

	editorInput7.igPercentEditor("field").val(20);
	editorInput7.igPercentEditor("field").trigger("paste");
	editorInput7.igPercentEditor("field").trigger("blur");
	assert.equal(editorInput7.igPercentEditor("value"), 0.2, "New value is not correct");

	editorInput7.igPercentEditor("field").val(10);
	editorInput7.igPercentEditor("field").trigger("paste");
	editorInput7.igPercentEditor("field").trigger("blur");
	assert.equal(editorInput7.igPercentEditor("value"), 0.2, "New value is not correct");

	// 207134: Entered value of 12.12 is chaged to 12.11 in the Percent Editor
	var field = editorInput4.igPercentEditor("field");
	field.focus();
	field.val("12.12");
	field.blur();
	assert.equal(editorInput4.igPercentEditor("displayValue"), "12.12%", "Decimal percent display value changed");
	assert.equal(editorInput4.igPercentEditor("value"), 0.1212, "Decimal percent value changed");

	// 20719:  Entered value is not correct after blurring the editor
	field.focus();
	field.val("33.33");
	field.blur();
	assert.equal(editorInput4.igPercentEditor("displayValue"), "33.33%", "Decimal percent display value changed");
	assert.equal(editorInput4.igPercentEditor("value"), 0.3333, "Decimal percent value changed");
	field.focus();
	field.val("15.50");
	field.blur();
	assert.equal(editorInput4.igPercentEditor("displayValue"), "15.50%", "Decimal percent display value changed");
	assert.equal(editorInput4.igPercentEditor("value"), 0.155, "Decimal percent value changed");
});

QUnit.test('[ID6] Group and decimal separators', function (assert) {
	assert.expect(1);

	var editorInput = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "pEditor6" });
	editorInput.igPercentEditor({
		displayFactor: 1
	});

	// For 207132 Can't set groupSeparator to empty string, and decimalSeparator to comma
	editorInput.igPercentEditor("option", "groupSeparator", "");
	editorInput.igPercentEditor("option", "decimalSeparator", ",");
	editorInput.igPercentEditor("option", "value", 1264.89);
	assert.equal(editorInput.igPercentEditor("displayValue"), "1264,89%", "The decimal value is not correct.");
});

QUnit.test('[ID7] Spin functionality', function (assert) {
	assert.expect(4);

	// For 207435 Spinning up and down is not possible when the editor is empty
	var editorInput3 = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "pEditor3" });
	editorInput3.igPercentEditor();
	editorInput3.igPercentEditor("value", null);
	var emptyEditorInput = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "emptyEditor" });
	emptyEditorInput.igPercentEditor();
	emptyEditorInput.igPercentEditor("spinUp");
	assert.equal(emptyEditorInput.igPercentEditor("value"), emptyEditorInput.igPercentEditor("option", "spinDelta"), "Spin failed with no intial value.");

	// Spin in edit mode:
	var editorInput7 = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "pEditor7" });
	editorInput7.igPercentEditor({
		buttonType: "spin",
		maxDecimals: 5,
		minValue: 0.2,
		maxValue: 0.6
	});
	editorInput7.igPercentEditor("value", 0.57);
	editorInput7.igPercentEditor("field").focus();
	editorInput7.igPercentEditor("spinDown");
	assert.equal(editorInput7.igPercentEditor("field").val(), "56", "Edit value after spin down is not correct");
	editorInput7.igPercentEditor("field").blur();

	// Spin without edit mode
	editorInput7.igPercentEditor("value", 0.57);
	editorInput7.igPercentEditor("spinDown");
	assert.equal(editorInput7.igPercentEditor("value"), 0.56, "New value after spin down is not correct");
	assert.equal(editorInput7.igPercentEditor("displayValue"), "56.00%", "Display value after spin down is not correct");
});

QUnit.test('[ID8] List items.', function (assert) {
	assert.expect(2);
	var done = assert.async();

	// For 207200: Values > 100 cannot be entered or selected when 'isLimitedToListValues: true'
	var percentEditorListInput = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "percentEditorList" });
	percentEditorListInput.igPercentEditor({
		listItems: [0.12, 0.53, 1.00, 1.50],
		isLimitedToListValues: true
	});
	var field = percentEditorListInput.igPercentEditor("field");

	field.focus();
	field.val("100");
	field.blur();
	$.ig.TestUtil.wait(50).then(function () {
		assert.equal(percentEditorListInput.igPercentEditor("displayValue"), "100.00%", "Entered value is not accepted");
		return $.ig.TestUtil.wait(50);
	}).then(function () {
		percentEditorListInput.igPercentEditor("dropDownButton").click();
		percentEditorListInput.igPercentEditor("dropDownContainer").find(".ui-igedit-listitem").filter(function () {
			return $(this).text() === "150";
		}).click();
		assert.equal(percentEditorListInput.igPercentEditor("value"), 1.5, "Selected value is not accepted");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID9] Lists testing P2, selection-value match', function (assert) {
	assert.expect(44);
	var done = assert.async();
	
	var editorInput, field, ddButton, spinUpButton, spinDownButton;
	var util = $.ig.TestUtil;
	var inputElement = this.inputTag;

	var editorSetup = function (options) {
		editorInput = util.appendToFixture(inputElement);
		editorInput.igPercentEditor(options);
		field = editorInput.igPercentEditor("field");
		ddButton = editorInput.igPercentEditor("dropDownButton");
		spinUpButton = editorInput.igPercentEditor("spinUpButton");
		spinDownButton = editorInput.igPercentEditor("spinDownButton");
	};

	editorSetup({
		listItems: [0.1, 0.2, 0.3],
		buttonType: "dropdown",
		// remove animation to avoid waiting, show() with effect ignores 0
		dropDownAnimationDuration: -1
	});

	editorInput.igPercentEditor("value", 0.1);
	ddButton.click();
	assert.ok(editorInput.igPercentEditor("getSelectedListItem").hasClass($.ui.igPercentEditor.prototype.css.listItemSelected), "Selected item (API) does't have proper styles applied");
	assert.equal(editorInput.igPercentEditor("selectedListIndex"), 0, "Selected index does not reflect value");
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").text(), "10", "Selected item does not reflect value");

	// Select item2:
	editorInput.igPercentEditor("dropDownContainer").find("span.ui-igedit-listitem").eq(1).click();
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").text(), "20", "Selected item (API) did not update after selection");

	// Change value in edit mode:
	ddButton.click();
	util.keyDownChar(51 /*3*/, field);
	field.val("30");
	util.keyPressChar(51, field);
	util.keyUpChar(51, field);
	util.keyInteraction(13, field);
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").text(), "30", "Selected item (API) did not update after value update.");

	//initial value, clear:
	editorSetup({
		listItems: [0.01, 1.23, 0.02, 0.03, 1.56, 0.99],
		buttonType: "dropdown, clear",
		value: 0.02,
		// remove animation to avoid waiting, show() with effect ignores 0
		dropDownAnimationDuration: -1
	});
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").text(), 2, "Selected item (API) not correct on initialization");
	assert.equal(editorInput.igPercentEditor("selectedListIndex"), 2, "Selected index (API) not correct on initialization");

	editorInput.igPercentEditor("value", 999);
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").length, 0, "There should be no selected item (API) without matching value.");

	editorInput.igPercentEditor("value", 0.03);
	ddButton.click();
	util.keyInteraction(38, field);
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").text(), "3", "Selected item does not reflect value.");
	assert.equal(editorInput.igPercentEditor("dropDownContainer").find(".ui-igedit-listitemactive").last().text(), "2", "Active item did not move from original selection.");
	util.keyDownChar(54 /*6*/, field);
	field.val("156");
	util.keyPressChar(54, field);
	util.keyUpChar(54, field);
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").text(), "156", "Selected item not updated when typing.");
	util.keyInteraction(40, field);
	assert.equal(editorInput.igPercentEditor("dropDownContainer").find(".ui-igedit-listitemactive").last().text(), "99", "Active item did not move from new selection.");
	util.keyDownChar(56 /*8*/, field);
	field.val("8");
	util.keyPressChar(56, field);
	util.keyUpChar(56, field);
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").length, 0, "Selected item not cleared when typing.");
	assert.equal(editorInput.igPercentEditor("dropDownContainer").find(".ui-igedit-listitemactive").length, 0, "Active item not cleared when typing.");
	util.keyInteraction(13, field);
	assert.equal(editorInput.igPercentEditor("value"), 0.08, "Value not set correctly on enter without list selection.");
	
	util.wait(20).then(function () {
	assert.notOk(editorInput.igPercentEditor("dropDownVisible"), "Dropdown list did not close on enter.");
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").length, 0, "There should be no selection when value doesn't match any item.");

	ddButton.click();
	field.val("2");
	util.keyInteraction(13, field);
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").text(), "2", "Selected item does not reflect value.");

	editorInput.igPercentEditor("clearButton").click();
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").length, 0, "Selection not removed on clear in edit mode");
	assert.equal(editorInput.igPercentEditor("dropDownContainer").find(".ui-igedit-listitemactive").length, 0, "Active item not removed on clear in edit mode.");
	field.blur();
	editorInput.igPercentEditor("value", 0.99);
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").text(), "99", "Selected item does not reflect value.");
	editorInput.igPercentEditor("clearButton").click();
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").length, 0, "Selection not removed on clear outside edit mode.");

	// Spin + isLimitedToListValues
	var listItems = [0.05, 0.445, 0.44, 5.75, 0.554, 2.43, 0.1];
	editorSetup({
		spinDelta: 1,
		isLimitedToListValues: true,
		listItems: listItems,
		buttonType: "dropdown, spin, clear",
		value: 0.44,
		// remove animation to avoid waiting, show() with effect ignores 0
		dropDownAnimationDuration: -1
	});

	util.click(spinUpButton);
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").text(), "44.5", "Selection not changed on spin button");
	assert.strictEqual(editorInput.igPercentEditor("value"), 0.445, "Value not changed on spin button");
	for (var i = 0; i < 3; i++) {
		util.click(spinUpButton);
	}
	assert.strictEqual(editorInput.igPercentEditor("value"), 0.05, "Value not changed on spin button");
	assert.ok(spinUpButton.hasClass("ui-state-disabled"), "Spin up button not disabled");
	editorInput.igPercentEditor("spinDown");
	assert.strictEqual(editorInput.igPercentEditor("value"), 0.445, "Value not changed on spin method");
	editorInput.igPercentEditor("spinUp");
	assert.strictEqual(editorInput.igPercentEditor("value"), 0.05, "Value not changed on spin method");

	editorInput.focus();
	util.click(spinUpButton);
	util.click(spinDownButton);
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").text(), "44.5", "Selection not changed on spin button in edit mode.");
	assert.ok(!spinUpButton.hasClass("ui-state-disabled"), "Spin up button not enabled");

	ddButton.click();
	for (var i = 2; i < listItems.length; i++) {
		util.click(spinDownButton);
		assert.equal(editorInput.igPercentEditor("getSelectedListItem").index(), i, "Selection not changed on spin button with open dropdown.");
	}
	assert.ok(spinDownButton.hasClass("ui-state-disabled"), "Spin down button not disabled");
	editorInput.igPercentEditor("spinUp");
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").text(), "243", "Value not changed on spin method in edit mode");

	// List items with decimalSeparator
	editorSetup({
		listItems: [0.1, 0.0015, 0.5547, 120.45, 24.135],
		buttonType: "spin, clear",
		value: 0.5547,
		isLimitedToListValues: true, // attempt list values spin
		decimalSeparator: ",",
		groupSeparator: "."
	});
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").text(), "55,47", "decimalSeparator selected item not correct.");
	editorInput.igPercentEditor("value", 120.45);
	editorInput.focus();
	editorInput.blur();
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").text(), "12045", "decimalSeparator selected item did not remain correct.");

	ddButton.click();
	editorInput.igPercentEditor("dropDownContainer").find("span.ui-igedit-listitem").eq(1).click();
	assert.equal(editorInput.igPercentEditor("field").val(), "0,15", "Selected item did not update text with correct decimalSeparator.");
	editorInput.blur();
	assert.equal(editorInput.igPercentEditor("value"), 0.0015, "Selected item did not update text with correct decimalSeparator.");
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").text(), "0,15", "Selected item (API) did not update after selection");

	editorInput.igPercentEditor("value", 120.45);
	editorInput.igPercentEditor("spinDown");
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").text(), "2413,5", "Selected item not correct after spin call");
	editorInput.focus();
	editorInput.igPercentEditor("spinDown");
	assert.equal(editorInput.igPercentEditor("getSelectedListItem").text(), "2413,5", "Selected item not correct after spin call in edit mode");

	done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID10] Percent Editor Scientific format', function (assert) {
	assert.expect(2);
	var done = assert.async();

	var editorInput = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "pEditor8" });
	editorInput.igPercentEditor({
		scientificFormat: "e"
	});
	var field = editorInput.igPercentEditor("field");

	field.focus();
	field.val("10");
	field.blur();
	$.ig.TestUtil.wait(20).then(function () {
		assert.equal(editorInput.igPercentEditor("displayValue"), "1e1%", "Displayed value is not correct!");
		return $.ig.TestUtil.wait(50);
	}).then(function () {
		editorInput.igPercentEditor("option", "scientificFormat", "e+")
		editorInput.igPercentEditor("value", 0.57);
		assert.equal(editorInput.igPercentEditor("displayValue"), "5.7e+1%", "Displayed value is not correct for e+!");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID11] Percent editor set options', function (assert) {
	assert.expect(2);

	var editorInput = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "pEditor9" });
	editorInput.igPercentEditor();

	editorInput.igPercentEditor("option", "displayFactor", 1);
	assert.throws(function () {
		editorInput.igPercentEditor("option", "displayFactor", "1");
	}, "displayFactor requires a different value. Its value should be set to 1 or 100 as a number.");

	assert.throws(function () {
		editorInput.igPercentEditor("option", "displayFactor", 10);
	}, "displayFactor requires a different value. Its value should be set to 1 or 100 as a number.");
});

QUnit.test('[ID12] Percent Spin up', function (assert) {
	assert.expect(8);

	var editorInput = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "pEditor10" });
	editorInput.igPercentEditor({
		buttonType: "spin",
		spinWrapAround: true,
		maxValue: 3,
		minValue: 0,
		displayFactor: 1
	});

	editorInput.focus();
	editorInput.igPercentEditor("spinUp");
	editorInput.blur();
	assert.equal(editorInput.igPercentEditor("displayValue"), "0.01%", "Display value after spin up is not correct");

	editorInput.igPercentEditor("spinDown");
	assert.equal(editorInput.igPercentEditor("displayValue"), "0.00%", "Display value after spin up is not correct");

	editorInput.igPercentEditor("value", 3);
	editorInput.igPercentEditor("spinUp", 3);
	assert.equal(editorInput.igPercentEditor("displayValue"), "0.00%", "spinWrapAround does not return minValue");

	editorInput.igPercentEditor("spinUp", 3);
	assert.equal(editorInput.igPercentEditor("displayValue"), "3.00%", "SpinUp method does not take into account delta parameter.");

	editorInput.igPercentEditor("spinDown", 3);
	assert.equal(editorInput.igPercentEditor("displayValue"), "0.00%", "SpinDown method does not take into account delta parameter.");

	editorInput.igPercentEditor("spinDown", 3);
	assert.equal(editorInput.igPercentEditor("displayValue"), "3.00%", "spinWrapAround does not return maxValue");

	var dblPercentEditorInput = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "percentDouble" });
	dblPercentEditorInput.igPercentEditor({
		displayFactor: 1,
		value: 2.5,
		spinDelta: 2,
		dataMode: "double"
	});

	dblPercentEditorInput.igPercentEditor("setFocus");
	dblPercentEditorInput.igPercentEditor("spinUp");
	dblPercentEditorInput.igPercentEditor("field").blur();
	assert.equal(dblPercentEditorInput.igPercentEditor("value"), "4.5", "Value after spin up is not correct");
	assert.equal(dblPercentEditorInput.igPercentEditor("displayValue"), "4.50%", "Display value after spin up is not correct");
});

QUnit.test('[ID13] Paste and insert', function (assert) {
	assert.expect(8);

	var pasteEditorInput = $.ig.TestUtil.appendToFixture(this.divTag, { id: "pasteEditor" });
	pasteEditorInput.igPercentEditor();
	var pasteEditorField = pasteEditorInput.igPercentEditor("field");

	var editorInput11 = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "pEditor11" });
	editorInput11.igPercentEditor({
		buttonType: "spin",
		value: 3,
		maxValue: 3,
		spinWrapAround: true
	});

	editorInput11.igPercentEditor("field").focus();
	editorInput11.igPercentEditor("insert", "301");
	var done = assert.async();
	
	$.ig.TestUtil.wait(200).then(function () {
		assert.equal(editorInput11.parent().parent().hasClass("ui-ignotify-warn"), true, "The notifier didn't show a warning.");
		//#287: Percent/Currency insert method not working with existing value outside edit mode
		editorInput11.igPercentEditor("field").blur();
		editorInput11.igPercentEditor("insert", "2");
		assert.equal(editorInput11.igPercentEditor("field").val(), "2.00%", "The text after insert (out of edit) is not correct");
		assert.strictEqual(editorInput11.igPercentEditor("value"), 0.02, "The text after insert (out of edit) is not correct");

		pasteEditorField.trigger("focus");
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		$.ig.TestUtil.paste(pasteEditorField[0], "33");
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		assert.equal(pasteEditorField[0].selectionStart, 2, "Cusrsor position not correct after paste");
		assert.equal(pasteEditorField.val(), "33", "The text after paste is not correct");

		// paste "+0024" in front, ultimately only adding 24:
		pasteEditorField[0].setSelectionRange(0, 0);
		$.ig.TestUtil.paste(pasteEditorField[0], "+0024");
		return $.ig.TestUtil.wait(20);
	}).then(function () {

		assert.equal(pasteEditorField[0].selectionStart, 2, "Cusrsor position not correct after paste. Should be like [24|33]");
		assert.equal(pasteEditorField.val(), "2433", "The text after positioned paste is not correct");

		pasteEditorField.trigger("blur");
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		assert.strictEqual(pasteEditorInput.igPercentEditor("value"), 24.33, "The value after paste is not correct");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID14] Drag and Drop', function (assert) {
	assert.expect(13);
	var done = assert.async();

	var editorInput = $.ig.TestUtil.appendToFixture(this.divTag, { id: "pasteEditor" });
	editorInput.igPercentEditor();
	var editorField = editorInput.igPercentEditor("field");

	editorInput.blur().igPercentEditor("value", 0);
	
	// Drag enter/leave events:
	editorField.trigger("dragenter");
	assert.equal(editorField.val(), "0", "Editor didn't enter edit mode on dragenter");
	editorField.trigger("dragleave");
	assert.equal(editorField.val(), "0.00%", "Editor exited edit mode on inner dragleave");
	editorField.trigger("dragenter");
	assert.equal(editorField.val(), "0", "Editor didn't enter edit mode on dragenter");
	editorField[0].selectionStart = 0;
	$.ig.TestUtil.drop(editorField[0], "33");

	$.ig.TestUtil.wait(20).then(function () {
		assert.equal(editorField[0].selectionStart, 0, "Cusrsor position not correct after drop");
		assert.equal(editorField[0].selectionEnd, 2, "Cusrsor position not correct after drop");
		assert.equal(editorField.val(), "330", "The text after drop is not correct");
		editorField[0].selectionStart = 1;
		$.ig.TestUtil.drop(editorField[0], "5");
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		assert.equal(editorField[0].selectionStart, 1, "Cusrsor position not correct after drop. Should be like [|24|330]");
		assert.equal(editorField[0].selectionEnd, 2, "Cusrsor position not correct after drop. Should be like [|24|330]");
		assert.equal(editorField.val(), "3530", "The text after positioned drop is not correct");

		// Drop "+0024" in front, ultimately only adding 24:
		editorField[0].selectionStart = 0;
		$.ig.TestUtil.drop(editorField[0], "+0024");
		
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		assert.equal(editorField[0].selectionStart, 2, "Cusrsor position not correct after drop. Should be like [|24|3530]");
		assert.equal(editorField[0].selectionEnd, 2, "Cusrsor position not correct after drop. Should be like [|24|3530]");
		assert.equal(editorField.val(), "243530", "The text after positioned drop is not correct");

		editorField.trigger("blur");
		assert.strictEqual(editorInput.igPercentEditor("value"), 2435.3, "The value after drop is not correct");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID15] Test nullValue on initialization', function (assert) {
	assert.expect(4);

	var editorInput = $.ig.TestUtil.appendToFixture(this.inputTag);
	editorInput.igPercentEditor({ allowNullValue: false });
	//Get null Value
	assert.equal(editorInput.igPercentEditor("value"), "", "The value is not an empty string");
	//Set null Value
	editorInput.igPercentEditor("value", null);
	assert.equal(editorInput.igPercentEditor("value"), "", "The value is not an empty string");
	//Change allowNullValue option
	editorInput.igPercentEditor("option", "allowNullValue", true);
	// Get Null value
	assert.equal(editorInput.igPercentEditor("value"), "", "The value is not an empty string");
	//Set Null value
	editorInput.igPercentEditor("value", null);
	//Get null value
	assert.equal(editorInput.igPercentEditor("value"), null, "The value is not an empty string");
});

QUnit.test('[ID16] Revert functionality', function (assert) {
	assert.expect(3);

	var nonRevertableEditorInput = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "nonRevert" });
	nonRevertableEditorInput.igPercentEditor({
		revertIfNotValid: false,
		blur: function (evt, ui) {
			ui.owner.insert("null");
		}
	});

	nonRevertableEditorInput.blur();
	assert.equal(nonRevertableEditorInput.igPercentEditor("value"),
		"",
		"When there is no valid value in the editor and enter incorrect value, the editor's value is supposed to be empty string.");

	var revertMinMaxInput = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "revertMinMax" });
	revertMinMaxInput.igPercentEditor({
		revertIfNotValid: true,
		displayFactor: 1,
		listItems: [10, 20, 30],
		value: 10,
		isLimitedToListValues: true,
		blur: function (evt, ui) {
			ui.owner.insert(15);
		}
	});
	revertMinMaxInput.blur();
	assert.equal(revertMinMaxInput.igPercentEditor("value"),
		"10",
		"The value should be reverted when the new value is not in the listItems.");

	var revertableEditorInput = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "revertEditor" });
	revertableEditorInput.igPercentEditor({
		value: 12,
		blur: function (evt, ui) {
			ui.owner.insert("abc");
		},
		revertIfNotValid: true
	});
	revertableEditorInput.blur();
	assert.equal(revertableEditorInput.igPercentEditor("value"),
		"0.12",
		"The value is not reverted when wrong value was entered.");
});

QUnit.test('[ID17] Spin events with spinWrapAround set to false', function (assert) {
	assert.expect(2);

	var editorInput = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "falseWrapAround" });
	editorInput.igPercentEditor({
		buttonType: "spin",
		spinWrapAround: false,
		spinDelta: 1,
		displayFactor: 1,
		minValue: 0,
		maxValue: 10,
		value: 10
	});

	editorInput.igPercentEditor("spinUp");
	assert.equal(editorInput.igPercentEditor("value"), "10", "The editor value should be reverted to the maxValue.");

	editorInput.igPercentEditor("value", "0");
	editorInput.igPercentEditor("spinDown");
	assert.equal(editorInput.igPercentEditor("value"), "0", "The editor value should be reverted to the minValue.");
});

QUnit.test('[ID18] Spin events with set scientificFormat', function (assert) {
	assert.expect(3);

	var editorInput = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "focusedSpinUp" });
	editorInput.igPercentEditor({
		buttonType: "spin",
		minValue: 0,
		scientificFormat: "E"
	});

	editorInput.focus();
	assert.equal(editorInput.igPercentEditor("field").val(), "0E0", "The wrong value is set in the editor in edit mode.");
	editorInput.igPercentEditor("spinUp");
	assert.equal(editorInput.igPercentEditor("field").val(), "1E0", "The wrong value is set in the editor in edit mode.");
	editorInput.blur();
	assert.equal(editorInput.igPercentEditor("value"), "1e-2", "The scientificFormat is not set properly when the spinUp button is clicked.");
});

QUnit.test('[ID19] Test inserting invalid value when the min value is set', function (assert) {
	assert.expect(2);

	var editorInput1 = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "minVal" });
	editorInput1.igPercentEditor({
		minValue: 10,
		dispalayFactor: 1
	});

	editorInput1.igPercentEditor("insert", "9");
	assert.equal(editorInput1.igPercentEditor("option", "value"), editorInput1.igPercentEditor("option", "minValue"), "The min value of the editor is not set correctly.");

	var editorInput2 = $.ig.TestUtil.appendToFixture(this.inputTag, { id: "setRunTimePrevValue" });
	editorInput2.igPercentEditor({
		minValue: 0
	});

	editorInput2.igPercentEditor("option", "revertIfNotValid", true);
	editorInput2.igPercentEditor("value", -1);
	assert.equal(editorInput2.igPercentEditor("field").val(), "0.00%", "The editor's value is supposed to be the same as the previous one.");
});

QUnit.test('[ID20] Clear button state', function (assert) {
	assert.expect(2);

	var editorInput = $.ig.TestUtil.appendToFixture(this.inputTag);
	editorInput.igPercentEditor({ buttonType: "clear" });
	var clearBtnIsVisisble = editorInput.igPercentEditor("clearButton").is(":visible");
	assert.notOk(clearBtnIsVisisble, "Clear button is not hidden");
	editorInput.igPercentEditor("value", 45);
	clearBtnIsVisisble = editorInput.igPercentEditor("clearButton").is(":visible");
	assert.ok(clearBtnIsVisisble, "Clear button is not visible");
});

QUnit.test('[ID21] MaxValue SpinUpButton', function (assert) {
	assert.expect(2);

	var editorInput = $.ig.TestUtil.appendToFixture(this.inputTag);
	editorInput.igPercentEditor({
		displayFactor: 1,
		maxValue: 8,
		spinDelta: 1,
		buttonType: "spin"
	});
	var spinUpBtnIsVisisble = editorInput.igPercentEditor("spinUpButton").is(":visible");
	assert.ok(spinUpBtnIsVisisble, "Spin up button is hidden");
	editorInput.igPercentEditor("value", 8);
	editorInput.blur();
	var spinUpBtnIsDisabled = editorInput.igPercentEditor("spinUpButton").hasClass("ui-state-disabled");
	assert.ok(spinUpBtnIsDisabled, "Spin up button is not disabled.");
});


QUnit.test('[ID22] MinValue SpinDownButton', function (assert) {
	assert.expect(2);

	var editorInput = $.ig.TestUtil.appendToFixture(this.inputTag);
	editorInput.igPercentEditor({
		displayFactor: 1,
		minValue: 2,
		spinDelta: 1,
		buttonType: "spin"
	});

	var spinDownBtnIsVisisble = editorInput.igPercentEditor("spinDownButton").is(":visible");
	assert.ok(spinDownBtnIsVisisble, "Spin down button is hidden");
	editorInput.igPercentEditor("value", 2);
	editorInput.blur();
	var spinDownBtnIsDisabled = editorInput.igPercentEditor("spinDownButton").hasClass("ui-state-disabled");
	assert.ok(spinDownBtnIsDisabled, "Spin down button is not disabled.");
});

QUnit.test('[ID23] Runtime changes for local and regional options', function (assert) {
	assert.expect(6);

	var editorInput = $.ig.TestUtil.appendToFixture(this.inputTag);
	editorInput.igPercentEditor({
		buttonType: "spin",
		value: 1234567.123,
		displayFactor: 1
	});

	var done = assert.async();

	assert.equal(editorInput.igPercentEditor("displayValue"), "1,234,567.12%", "Format should be in English");
	assert.equal(editorInput.igPercentEditor("spinUpButton").attr("title"), $.ig.locale.en.Editor.spinUpperTitle, "Title of the button should be in English");
	editorInput.igPercentEditor("option", "language", "de");
	assert.equal(editorInput.igPercentEditor("spinUpButton").attr("title"), $.ig.locale.de.Editor.spinUpperTitle, "Title of the button should be in German");
	editorInput.igPercentEditor("option", "regional", "de");
	assert.equal(editorInput.igPercentEditor("displayValue"), "1.234.567,12%", "Format should be in German");
	editorInput.igPercentEditor("setFocus");

	$.ig.TestUtil.wait(100).then(function () {
		assert.equal(editorInput.igPercentEditor("field").val(), "1234567,12", "Input format should be in German");
		editorInput.igPercentEditor("option", "regional", "en-US");
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		assert.equal(editorInput.igPercentEditor("field").val(), "1234567.12", "Input format should be in English");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});