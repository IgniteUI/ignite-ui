QUnit.module("igTextEditor unit tests", {
	divTag: '<div></div>',
	spanTag: '<span></span>',
	inputTag: '<input />',
	textareaTag: '<textarea></textarea>',
	util: $.ig.TestUtil,
	editor: null,
	appendToFixture: function (element, options) {
		var $qunitFixture = $('#qunit-fixture');
		if (this.editor) {
			this.editor.remove();
		}
		return $(element, options).appendTo($qunitFixture);
	},
	input: function () {
		return this.editor.igTextEditor("field");
	},
	hiddenInput: function () {
		return this.container().find("input:hidden")
	},
	container: function () {
		return this.editor.igTextEditor("editorContainer");
	},
	dropDownContainer: function () {
		return this.editor.igTextEditor("dropDownContainer");
	},
	dropDownButton: function () {
		return this.editor.igTextEditor("dropDownButton");
	},
	clearButton: function () {
		return this.editor.igTextEditor("clearButton");
	},
	firstItem: function () {
		return this.editor.data("igTextEditor")._getListItemByIndex(0);
	},
	lastItem: function () {
		return this.editor.data("igTextEditor")._getListItemByIndex(2);
	},
	spinUpButton: function () {
		return this.editor.igTextEditor("spinUpButton");
	},
	spinDownButton: function () {
		return this.editor.igTextEditor("spinDownButton");
	},
	flag: false,
	assert: null,
	pressOk: function (char) {
		this.util.keyPressChar(char.charCodeAt(0), this.input());
		this.assert.ok(this.flag, char + " char SHOULD be typed, because it is included key");
		this.flag = false;
	},
	pressNotOk: function (char) {
		this.util.keyPressChar(char.charCodeAt(0), this.input());
		this.assert.notOk(this.flag, char + " char SHOULD NOT be typed, because it is excluded key");
		this.flag = false;
	},
	testSelection: function (input, start, end) {
		this.assert.equal(input[0].selectionStart, start, "The selection doesn't start from index" + start);
		this.assert.equal(input[0].selectionEnd, end, "The selection doesn't end at index " + end);
	},
	beforeEach: function () { $.fx.off = true; },
	afterEach: function () { $.fx.off = false; }
});

QUnit.test("IncludeKeys/excludeKeys Tests.", function (assert) {
	this.assert = assert;
	assert.expect(54);

	var self = this, keypressHanlder = function () { self.flag = true; }, editor;

	this.editor = this.appendToFixture(this.inputTag).igTextEditor({
		includeKeys: "abc",
		maxLength: 10,
		selectionOnFocus: "atStart",
		preventSubmitOnEnter: true,
		keypress: keypressHanlder
	});
	this.pressOk("a");
	this.pressOk("b");
	this.pressOk("c");
	this.pressNotOk("d");
	this.pressNotOk("e");
	this.pressNotOk("f");

	this.editor = this.appendToFixture(this.inputTag).igTextEditor({
		includeKeys: "~!@#$%^&*(){}[]\\'*\"",
		selectionOnFocus: "browserDefault",
		keypress: keypressHanlder
	});
	//Special characters 
	this.pressNotOk("d");
	this.pressNotOk("e");
	this.pressNotOk("f");
	this.pressOk("~");
	this.pressOk("!");
	this.pressOk("@");
	this.pressOk("#");
	this.pressOk("$");
	this.pressOk("%");
	this.pressOk("^");
	this.pressOk("&");
	this.pressOk("*");
	this.pressOk("(");
	this.pressOk(")");
	this.pressOk("'");
	this.pressOk("\"");
	this.pressOk("[");
	this.pressOk("]");
	this.pressOk("{");
	this.pressOk("}");
	this.pressOk("\\");

	//excludeKey
	this.editor = this.appendToFixture(this.inputTag).igTextEditor({
		excludeKeys: "abc",
		keypress: keypressHanlder
	});
	this.pressNotOk("a");
	this.pressNotOk("b");
	this.pressNotOk("c");
	this.pressOk("d");
	this.pressOk("e");
	this.pressOk("f");


	this.editor = this.appendToFixture(this.inputTag).igTextEditor({
		excludeKeys: "~!@#$%^&*(){}[]\\'*\"",
		keypress: keypressHanlder
	});
	this.pressOk("d");
	this.pressOk("e");
	this.pressOk("f");
	//Special characters
	this.pressNotOk("~");
	this.pressNotOk("!");
	this.pressNotOk("@");
	this.pressNotOk("#");
	this.pressNotOk("$");
	this.pressNotOk("%");
	this.pressNotOk("^");
	this.pressNotOk("&");
	this.pressNotOk("*");
	this.pressNotOk("(");
	this.pressNotOk(")");
	this.pressNotOk("'");
	this.pressNotOk("\"");
	this.pressNotOk("[");
	this.pressNotOk("]");
	this.pressNotOk("{");
	this.pressNotOk("}");
	this.pressNotOk("\\");
});

QUnit.test("Options/Method tests", function (assert) {
	assert.expect(37);

	var done = assert.async(), self = this, editor;

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		inputName: "firstName",
		tabIndex: 2,
		buttonType: "dropdown",
		placeHolder: "enter a value",
		dropDownAnimationType: "nonValid",
		listItems: ["item1", "item2"],
		dropDownAnimationDuration: -1,
		dropDownOrientation: "top"
	});
	assert.equal(editor.igTextEditor("option", "inputName"), "firstName", "The initial value of the inputName is not firstName");
	assert.equal(editor.igTextEditor("option", "tabIndex"), 2, "The initial value of the tabIndex is not 2");
	assert.equal(this.input().attr("placeHolder"), "enter a value", "The placeHolder attribute is not set corretly");
	assert.equal(editor.igTextEditor("inputName"), "firstName", "name is not properly set");
	editor.igTextEditor("showDropDown");
	assert.ok(editor.igTextEditor("dropDownVisible"), "drop down is visible");
	editor.igTextEditor("hideDropDown");
	assert.notOk(editor.igTextEditor("dropDownVisible"), "drop down is not visible");

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		value: "MaxLength",
		maxLength: 3
	});
	assert.equal(this.input().attr("placeHolder"), undefined, "The placeHolder attribute should not be set");
	assert.equal(editor.igTextEditor("option", "maxLength"), 3, "The maxLength attribure is not set correctly.");
	assert.equal(editor.igTextEditor("option", "value"), "Max", "The value is not set properly after the maxLength.");
	editor.igTextEditor("inputName", "fName");
	assert.equal(editor.igTextEditor("inputName"), "fName", "name is not properly set");

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		selectionOnFocus: "atStart",
		value: "abc"
	});
	assert.equal(editor.igTextEditor("value"), "abc", "value is not properly set");
	editor.igTextEditor("value", "ABC");
	assert.equal(editor.igTextEditor("value"), "ABC", "value is not properly set");
	editor.igTextEditor("value", null);
	assert.equal(editor.igTextEditor("value"), "", "value is not properly set");

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		listItems: ["item1", "item2", "item3"],
		readOnly: true,
		disabled: true,
		dropDownOnReadOnly: true
	});
	assert.ok(editor.hasClass("ui-state-disabled"), "Disabled class is not set when readonly and disabled are set to true.");
	editor.igTextEditor("showDropDown");
	assert.equal(editor.data("igTextEditor")._calculateDropDownListOrientation(), "bottom", "Bottom orientation of the drop down is not calculated correctly.");

	this.editor = editor = this.appendToFixture(this.divTag).igTextEditor({
		dropDownAttachedToBody: true,
		listItems: ["item1", "item2", "item3"]
	});
	editor.css({ position: "fixed", bottom: "30px", left: "30px", width: "400px" }); // Position editor on the bottom of the page in order to show drop down at the top of the editor container.
	editor.igTextEditor("showDropDown");
	assert.equal(editor.data("igTextEditor")._calculateDropDownListOrientation(), "top", "Top orientation of the drop down is not calculated correctly.");

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		selectionOnFocus: "browserDefault",
		value: "abc"
	});
	editor.igTextEditor("setFocus");
	assert.ok(editor.igTextEditor("hasFocus"), "element is focused");
	editor.igTextEditor("hide");
	assert.notOk(editor.is(":visible"), "element is not hidden");
	editor.igTextEditor("show");
	assert.ok(editor.is(":visible"), "element is visible");
	editor.igTextEditor("validate");
	assert.ok(editor.igTextEditor("isValid"), "The value should be valid");

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		includeKeys: "abc",
		maxLength: 10,
		selectionOnFocus: "atStart",
		preventSubmitOnEnter: true
	});
	editor.igTextEditor("setFocus");
	editor.igTextEditor("value", "abcdefg");
	assert.equal(editor.igTextEditor("getSelectedText"), "", "selected text is wrong");
	assert.equal(editor.igTextEditor("getSelectionStart"), 7, "start is wrong");
	assert.equal(editor.igTextEditor("getSelectionEnd"), 7, "end is wrong");

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		includeKeys: "abc",
		maxLength: 10,
		selectionOnFocus: "atStart",
		preventSubmitOnEnter: true
	});
	editor.igTextEditor("setFocus");
	editor.igTextEditor("value", "abcdefg");
	editor.igTextEditor("select", 0, 2);
	assert.equal(editor.igTextEditor("getSelectionStart"), 0, "start is wrong");
	assert.equal(editor.igTextEditor("getSelectionEnd"), 2, "end is wrong");
	this.input().blur();
	editor.igTextEditor("value", "");
	editor.igTextEditor("insert", "ab");
	assert.equal(editor.igTextEditor("value"), "ab", "The value should be ab");
	assert.equal(editor.igTextEditor("field").val(), "ab", "The text should be ab");
	editor.igTextEditor("field").blur();
	editor.igTextEditor("setFocus");
	this.util.wait(100).then(function () {
		editor.igTextEditor("insert", "ba").blur();
		assert.equal(editor.igTextEditor("value"), "baab", "The value should be valid");
		editor.igTextEditor("insert", undefined);
		assert.equal(editor.igTextEditor("value"), "baab", "The value should be valid");

		self.editor = editor = self.appendToFixture(self.inputTag).igTextEditor({
			buttonType: "dropdown,spin,clear,nonvalid",
			width: 200,
			listWidth: 200,
			height: 20,
			listItems: ["item1", "item2", "item3"],
			dropDownAnimationDuration: -1,
			spinWrapAround: true,
			isLimitedToListValues: true
		});
		assert.equal(editor.igTextEditor("findListItemIndex", "2"), 1, "Index is found");
		assert.equal(editor.igTextEditor("findListItemIndex", "2", "endsWith"), 1, "Index is found");
		assert.equal(editor.igTextEditor("findListItemIndex", "2", "startsWith"), -1, "Index should not be found");
		assert.equal(editor.igTextEditor("findListItemIndex", "item3", "exact"), 2, "Index is found");
		assert.equal(editor.igTextEditor("findListItemIndex", "iTem3", "exact"), -1, "Index should not be found");

		self.editor = editor = self.appendToFixture(self.inputTag).igTextEditor({
			buttonType: "dropdown,spin,clear,nonvalid",
			width: 200,
			listWidth: 200,
			height: 20,
			listItems: ["item1", "item2", "item3"],
			dropDownAnimationDuration: -1,
			spinWrapAround: true,
			isLimitedToListValues: true
		});
		assert.equal(editor.igTextEditor("selectedListIndex"), -1, "Correct item is selected");
		editor.igTextEditor("selectedListIndex", 2);
		assert.equal(editor.igTextEditor("selectedListIndex"), 2, "Correct item is selected");
		editor.igTextEditor("selectedListIndex", 1);
		assert.equal(editor.igTextEditor("selectedListIndex"), 1, "Correct item is selected");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("Events testing", function (assert) {
	assert.expect(11);

	var done = assert.async(), self = this, keydownHandler = function () { self.flag = true; }, editor,
		text = "", textChanged = 0;

	this.editor = this.appendToFixture(this.inputTag).igTextEditor({
		value: "The value of the editor is going to be long.",
		keydown: keydownHandler
	});
	this.util.keyDownChar(8, this.input());
	assert.ok(this.flag, "The backspace key should be pressed.");
	this.flag = false;

	this.editor = this.appendToFixture(this.textareaTag).igTextEditor({
		textMode: "multiline",
		keydown: keydownHandler
	});
	this.util.keyDownChar(13, this.input());
	this.util.keyDownChar(8, this.input());
	assert.ok(this.flag, "Enter was not pressed.");
	this.flag = false;

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		listItems: ["item1", "item2", "item3"],
		buttonType: "spin",
		spinWrapAround: true
	});
	editor.igTextEditor("showDropDown");
	editor.igTextEditor("selectedListIndex", 0);
	editor.igTextEditor("spinUp");
	this.util.keyDownChar(13, this.input());
	assert.equal(editor.igTextEditor("option", "value"), "item3", "The clicking on SpinUp button is not working");

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		visibleItemsCount: 2,
		listItems: ["item1", "item2", "item3"],
		dropDownAttachedToBody: true,
		value: "item1",
		selectionOnFocus: "atEnd",
		textChanged: function (evt, args) {
			assert.equal(args.text, text, "Text changed event is not fired with correct new value");
			textChanged++;
		}
	});
	editor.igTextEditor("setFocus");
	this.util.wait(100).then(function () {
		text = self.input().val();
		text += "t"
		self.util.keyInteraction(text.charCodeAt(text.length - 1), self.input());
		assert.equal(textChanged, 1, "textChanged event not fired");
		text += "e"
		self.util.keyInteraction(text.charCodeAt(text.length - 1), self.input());
		assert.equal(textChanged, 2, "textChanged event not fired");
		text += "s"
		self.util.keyInteraction(text.charCodeAt(text.length - 1), self.input());
		assert.equal(textChanged, 3, "textChanged event not fired");
		text += "t"
		self.util.keyInteraction(text.charCodeAt(text.length - 1), self.input());
		assert.equal(textChanged, 4, "textChanged event not fired");
		editor.off("igtexteditortextchanged");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("Lists testing", function (assert) {
	assert.expect(25);

	var done = assert.async(), self = this, editor, item,
		opening, opened, closing, closed, itemselecting, itemselected, textchanged, valuechanging, valuechanged;

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		buttonType: "dropdown,spin,clear,nonvalid",
		width: 200,
		listWidth: 200,
		height: 20,
		listItems: ["item1", "item2", "item3"],
		dropDownAnimationDuration: -1,
		revertIfNotValid: false,
		isLimitedToListValues: true,
		dropDownListOpening: function () { opening = true; },
		dropDownListOpened: function () { opened = true; },
		dropDownListClosing: function () { closing = true; },
		dropDownListClosed: function () { closed = true; },
		itemSelecting: function () { itemselecting = true; },
		itemSelected: function () { itemselected = true; }
	});
	editor.on("igtexteditorvaluechanging.test", function (e, args) {
		assert.equal(args.newValue, "item1", "Value changing event is not fired with correct new value");
		valuechanging = true;
	});
	editor.on("igtexteditorvaluechanged.test", function (e, args) {
		assert.equal(args.newValue, "item1", "Value changed event is not fired with correct new value");
		valuechanged = true;
	});
	editor.on("igtexteditortextchanged.test", function (e, args) {
		assert.equal(args.text, "item1", "Text changed event is not fired with correct new value");
		textchanged = true;
	});
	assert.equal(this.container().outerWidth(), 200, "The width of the container is not set to 200px");
	assert.equal(this.container().outerHeight(), 20, "The heigth of the container is not set to 20px");
	this.dropDownButton().click();
	assert.ok(opening, "dropDownListOpening event not fired");
	// Use document.activeElement to test focus: https://github.com/ariya/phantomjs/issues/10427
	assert.ok(this.input()[0] === document.activeElement, "Input field not focused on dropDownListOpening");
	assert.ok(editor.igTextEditor("dropDownVisible"), "The dropDown is not opened");
	item = this.dropDownContainer().children(".ui-igedit-listitem")[0];
	this.util.mouseEvent(item, "mouseover");
	this.util.mouseEvent(item, "mousedown");
	this.util.mouseEvent(item, "mouseout");
	this.util.mouseEvent(item, "mouseover");
	this.util.mouseEvent(item, "click");
	assert.ok($(item).hasClass("ui-igedit-listitemselected"), "The selected item is missing ui-igedit-listitemselected class applied");
	assert.ok(closing, "dropDownListClosing event not fired");
	assert.ok(closed, "dropDownListClosed event not fired");
	assert.ok(valuechanging, "ValueChanging event not fired");
	assert.ok(valuechanged, "valueChanged event not fired");
	assert.ok(textchanged, "textChanged event not fired");
	this.util.mouseEvent(this.dropDownButton(), "mouseover");
	assert.ok(this.dropDownButton().hasClass("ui-igedit-buttonhover"), "The hovered item is missing ui-igedit-buttonhover class applied");
	this.util.mouseEvent(this.dropDownButton(), "mouseout");
	assert.notOk(this.dropDownButton().hasClass("ui-igedit-buttonhover"), "The unhovered item contains ui-igedit-buttonhover class applied");
	this.util.mouseEvent(this.dropDownButton(), "mousedown");
	assert.ok(this.dropDownButton().hasClass("ui-igedit-buttonpressed"), "The pressed item is missing ui-igedit-buttonpressed class applied");
	this.util.mouseEvent(this.dropDownButton(), "mouseup");
	assert.notOk(this.dropDownButton().hasClass("ui-igedit-buttonpressed"), "The released button item contains ui-igedit-buttonpressed class applied");
	editor.igTextEditor("showDropDown");
	assert.ok(editor.igTextEditor("dropDownVisible"), "The dropDown is not opened");
	this.input().trigger("blur");
	assert.ok(closing, "dropDownListClosing event not fired");
	assert.ok(closed, "dropDownListClosed event not fired");
	editor.off(".test");
	editor.igTextEditor("setFocus");
	this.util.wait(100).then(function () {
		self.util.paste(self.input()[0], "newVal");
		return self.util.wait(100);
	}).then(function () {
		self.input().blur();
		assert.equal(editor.igTextEditor("value"), "item1", "The value after paste is not newVal");
		editor.igTextEditor("value", "newVal1");
		assert.equal(editor.igTextEditor("value"), "", "The value after paste is empty");
		editor.igTextEditor("option", "isLimitedToListValues", false);
		editor.igTextEditor("option", "maxLength", 10);
		editor.igTextEditor("value", "newValnewVal");
		assert.equal(editor.igTextEditor("value"), "newValnewV", "The value after paste is not trimmed/accepted");
		editor.igTextEditor("value", "newVal1");
		assert.equal(editor.igTextEditor("value"), "newVal1", "The value after paste is not newVal");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("Lists testing P2, selection-value match", function (assert) {
	assert.expect(54);

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		listItems: [undefined, "item1", "item2", null, "", "item3"],
		buttonType: "dropdown",
		// remove animation to avoid waiting, show() with effect ignores 0
		dropDownAnimationDuration: -1
	});

	var expectedItems = ["item1", "item2", "item3"], items = editor.igTextEditor("option", "listItems");
	assert.ok(expectedItems.length === items.length &&
		expectedItems.every(function (v, i) { return v === items[i] }), "List items did not match expected result after init.")

	//selectedListIndex
	editor.igTextEditor("selectedListIndex", 2);
	assert.equal(editor.igTextEditor("value"), "item3", "selectedListIndex did not update value");
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), "item3", "Selected item does not reflect value");
	editor.igTextEditor("selectedListIndex", -1);
	assert.equal(editor.igTextEditor("value"), "item3", "selectedListIndex should not update with wrong index");
	editor.igTextEditor("selectedListIndex", 4);
	assert.equal(editor.igTextEditor("value"), "item3", "selectedListIndex should not update with wrong index");

	editor.igTextEditor("value", "ITEM1"); //casing
	this.dropDownButton().click();
	assert.ok(editor.igTextEditor("getSelectedListItem").hasClass($.ui.igTextEditor.prototype.css.listItemSelected), "Selected item (API) does't have proper styles applied");
	assert.equal(editor.igTextEditor("selectedListIndex"), 0, "Selected index does not reflect value");
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), "item1", "Selected item does not reflect value");

	// select item2:
	editor.igTextEditor("dropDownContainer").find("span.ui-igedit-listitem").eq(1).click();
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), "item2", "Selected item (API) did not update after selection");

	// change value in edit mode:
	this.dropDownButton().click();
	this.util.keyDownChar(51, this.input()); //3
	this.input().val("iTem3"); //casing
	this.util.keyPressChar(51, this.input());
	this.util.keyUpChar(51, this.input());
	this.util.keyInteraction(13, this.input());
	assert.equal(editor.igTextEditor("value"), "item3", "Value should match the list item");
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), "item3", "Selected item (API) did not update after value update.");

	// isLimitedToListValues (casing)
	editor.igTextEditor("option", "isLimitedToListValues", true);
	editor.igTextEditor("value", "ITEM1"); //casing
	assert.equal(editor.igTextEditor("value"), "item1", "Set value should match the list item casing.");

	this.util.keyDownChar(50, this.input()); //3
	this.input().val("iTeM2"); //casing
	this.util.keyPressChar(50, this.input());
	this.util.keyUpChar(50, this.input());
	this.util.keyInteraction(13, this.input());
	assert.equal(editor.igTextEditor("field").val(), "item2", "Text should be updated to match the list item when set (enter)");
	assert.equal(editor.igTextEditor("value"), "item2", "Value should match the list item");
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), "item2", "Selected item (API) did not update after value update.");

	//initial value, clear:
	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		listItems: ["item1", "abcd", "item2", "item3", "more text", "last"],
		buttonType: "dropdown, clear",
		value: "item2",
		// remove animation to avoid waiting, show() with effect ignores 0
		dropDownAnimationDuration: -1
	});
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), "item2", "Selected item (API) not correct on initialization");
	assert.equal(editor.igTextEditor("selectedListIndex"), 2, "Selected index (API) not correct on initialization");

	editor.igTextEditor("value", "notAnItem");
	assert.equal(editor.igTextEditor("getSelectedListItem").length, 0, "There should be no selected item (API) without matching value.");

	editor.igTextEditor("value", "item3");
	this.dropDownButton().click();
	this.util.keyInteraction(38, this.input());
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), "item3", "Selected item does not reflect value.");
	assert.equal(editor.igTextEditor("dropDownContainer").find(".ui-igedit-listitemactive").last().text(), "item2", "Active item did not move from original selection.");
	this.util.keyDownChar(84, this.input()); //t
	this.input().val("more text");
	this.util.keyPressChar(84, this.input());
	this.util.keyUpChar(84, this.input());
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), "more text", "Selected item not updated when typing.");
	this.util.keyInteraction(40, this.input());
	assert.equal(editor.igTextEditor("dropDownContainer").find(".ui-igedit-listitemactive").last().text(), "last", "Active item did not move from new selection.");
	this.util.keyDownChar(65, this.input()); //a
	this.input().val("item1a");
	this.util.keyPressChar(65, this.input());
	this.util.keyUpChar(65, this.input());
	assert.equal(editor.igTextEditor("getSelectedListItem").length, 0, "Selected item not cleared when typing.");
	assert.equal(editor.igTextEditor("dropDownContainer").find(".ui-igedit-listitemactive").length, 0, "Active item not cleared when typing.");
	this.util.keyInteraction(13, this.input());
	assert.equal(editor.igTextEditor("value"), "item1a", "Value not set correctly on enter without list selection.");
	assert.ok(!editor.igTextEditor("dropDownContainer").is(":visible"), "Dropdown list did not close on enter.");
	assert.equal(editor.igTextEditor("getSelectedListItem").length, 0, "There should be no selection when value doesn't match any item.");

	this.dropDownButton().click();
	this.input().val("item2");
	this.util.keyInteraction(13, this.input());
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), "item2", "Selected item does not reflect value.");

	editor.igTextEditor("clearButton").click();
	assert.equal(editor.igTextEditor("getSelectedListItem").length, 0, "Selection not removed on clear in edit mode");
	assert.equal(editor.igTextEditor("dropDownContainer").find(".ui-igedit-listitemactive").length, 0, "Active item not removed on clear in edit mode.");
	this.input().blur();
	editor.igTextEditor("value", "last");
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), "last", "Selected item does not reflect value.");
	editor.igTextEditor("clearButton").click();
	assert.equal(editor.igTextEditor("getSelectedListItem").length, 0, "Selection not removed on clear outside edit mode.");

	// spin
	var listItems = ["item1", "abcd", "item2", "item3", "more text", "last"];
	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		listItems: listItems,
		buttonType: "dropdown, spin, clear",
		value: "item2",
		// remove animation to avoid waiting, show() with effect ignores 0
		dropDownAnimationDuration: -1
	});
	this.util.mouseEvent(this.spinUpButton(), "mousedown");
	this.util.mouseEvent(this.spinUpButton(), "mouseup");
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), "abcd", "Selection not changed on spin button");
	assert.equal(editor.igTextEditor("value"), "abcd", "Value not changed on spin button");
	for (var i = 0; i < 3; i++) {
		this.util.mouseEvent(this.spinUpButton(), "mousedown");
		this.util.mouseEvent(this.spinUpButton(), "mouseup");
	}
	assert.equal(editor.igTextEditor("value"), "item1", "Value not changed on spin button");
	assert.ok(this.spinUpButton().hasClass("ui-state-disabled"), "Spin up button not disabled");

	editor.focus();
	this.util.mouseEvent(this.spinUpButton(), "mousedown");
	this.util.mouseEvent(this.spinUpButton(), "mouseup");
	this.util.mouseEvent(this.spinDownButton(), "mousedown");
	this.util.mouseEvent(this.spinDownButton(), "mouseup");
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), "abcd", "Selection not changed on spin button in edit mode.");
	assert.ok(!this.spinUpButton().hasClass("ui-state-disabled"), "Spin up button not enabled");

	this.dropDownButton().click();
	for (var i = 2; i < listItems.length; i++) {
		this.util.mouseEvent(this.spinDownButton(), "mousedown");
		this.util.mouseEvent(this.spinDownButton(), "mouseup");
		assert.equal(editor.igTextEditor("getSelectedListItem").text(), listItems[i], "Selection not changed on spin button with open dropdown.");
	}
	assert.ok(this.spinDownButton().hasClass("ui-state-disabled"), "Spin down button not disabled");

	// spin + spinWrapAround
	editor.igTextEditor("option", "spinWrapAround", true);
	editor.igTextEditor("selectedListIndex", 1, true);
	this.util.mouseEvent(this.spinUpButton(), "mousedown");
	this.util.mouseEvent(this.spinUpButton(), "mouseup");
	this.util.mouseEvent(this.spinUpButton(), "mousedown");
	this.util.mouseEvent(this.spinUpButton(), "mouseup");
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), listItems[listItems.length - 1], "Selection not changed on spin button with open dropdown.");
	this.util.mouseEvent(this.spinDownButton(), "mousedown");
	this.util.mouseEvent(this.spinDownButton(), "mouseup");
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), listItems[0], "Selection not changed on spin button with open dropdown.");
	editor.igTextEditor("option", "spinWrapAround", false);
	assert.ok(this.spinUpButton().hasClass("ui-state-disabled"), "Spin up button not disabled when setting spinWrapAround");
	this.dropDownButton().click();
	editor.igTextEditor("option", "spinWrapAround", true);
	this.util.mouseEvent(this.spinUpButton(), "mousedown");
	this.util.mouseEvent(this.spinUpButton(), "mouseup");
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), listItems[listItems.length - 1], "Selection not changed on spin with spinWrapAround.");

	// clearing value in edit mode and selecting the same item
	editor.blur(); //set last value
	this.dropDownButton().click();
	editor.igTextEditor("clearButton").click();
	editor.igTextEditor("dropDownContainer").children(".ui-igedit-listitem").last().click();
	assert.equal(this.input().val(), listItems[listItems.length - 1], "Selection not reflected in edit field after clear");
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), listItems[listItems.length - 1], "Selection not changed after re-selecting cleared item.");

	// readOnly spin
	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		listItems: listItems,
		dropDownOnReadOnly: true,
		buttonType: "dropdown, spin, clear",
		// remove animation to avoid waiting, show() with effect ignores 0
		dropDownAnimationDuration: -1
	});
	editor.igTextEditor("option", "readOnly", true);
	this.dropDownButton().click();
	this.util.keyInteraction(40, this.input()); //down
	assert.equal(editor.igTextEditor("dropDownContainer").find(".ui-igedit-listitemactive").text(), listItems[0], "Arrow down with dropDownOnReadOnly did not select first item.");
	this.util.keyInteraction(40, this.input());
	assert.equal(editor.igTextEditor("dropDownContainer").find(".ui-igedit-listitemactive").text(), listItems[1], "Arrow down with dropDownOnReadOnly did not select second item.");
	this.util.keyInteraction(38, this.input()); //up
	assert.equal(editor.igTextEditor("dropDownContainer").find(".ui-igedit-listitemactive").text(), listItems[0], "Arrow up with dropDownOnReadOnly did not select first item.");
	this.util.keyInteraction(13, this.input());
	assert.equal(editor.igTextEditor("value"), listItems[0], "Select up with dropDownOnReadOnly did not update value.");
	this.dropDownButton().click();
	this.util.keyInteraction(40, this.input());
	assert.equal(editor.igTextEditor("getSelectedListItem").text(), listItems[0], "Spin up with dropDownOnReadOnly did not update selection.");
});

QUnit.test("Keyboard/Mouse testing", function (assert) {
	assert.expect(22);

	var done = assert.async(), self = this, editor, item;

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		buttonType: "dropdown,spin,clear,nonvalid",
		width: 200,
		listWidth: 200,
		height: 20,
		listItems: ["item1", "item2", "item3"],
		dropDownAnimationDuration: -1,
		spinWrapAround: true,
		isLimitedToListValues: true
	});

	this.util.keyInteraction(38, this.input());
	this.util.keyInteraction(40, this.input());
	this.util.keyInteraction(40, this.input());
	this.util.keyInteraction(40, this.input());
	this.util.keyInteraction(40, this.input());
	this.util.keyInteraction(40, this.input());
	this.util.keyInteraction(40, this.input());
	this.util.keyInteraction(38, this.input());
	this.util.keyInteraction(38, this.input());
	this.util.keyInteraction(38, this.input());
	this.util.keyInteraction(38, this.input());
	this.util.keyInteraction(38, this.input());
	this.util.keyInteraction(38, this.input());

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		listItems: ["item1", "item2", "item3"],
		buttonType: "dropdown"
	});
	this.util.mouseEvent(this.dropDownButton(), "mousedown");
	assert.ok(this.dropDownButton().hasClass("ui-igedit-buttonpressed"), "Mousedown event is not triggered right.");
	this.util.mouseEvent(this.dropDownButton(), "mousemove");
	this.util.mouseEvent(this.dropDownButton(), "mouseout");
	assert.notOk(this.dropDownButton().hasClass("ui-igedit-buttonpressed"), "Mouseleave event is not triggered right.");
	this.util.mouseEvent(this.dropDownButton(), "mouseup");

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		includeKeys: "abc",
		maxLength: 10,
		selectionOnFocus: "atStart",
		preventSubmitOnEnter: true
	});

	this.input().val("newValue");
	this.util.keyPressChar(13, this.input());
	this.util.keyInteraction(13, this.input());
	assert.equal(editor.igTextEditor("value"), "newValue", "Value should be changed");
	this.input().val("1234567890987654");
	this.util.keyInteraction(13, this.input());
	assert.equal(editor.igTextEditor("value"), "1234567890", "Value should be limited to 10 symbols");
	this.input().val("newNewValue");
	this.util.keyInteraction(13, this.input());
	assert.equal(editor.igTextEditor("value"), "newNewValu", "Value should stay with the previouse value");
	editor.igTextEditor("value", "newValueto");
	this.util.keyInteraction(56, this.input());
	assert.ok(this.container().hasClass($.ui.igNotifier.prototype.css.warningState) &&
		this.container().igNotifier("isVisible"), "MaxLength reached message not shown.");
	assert.equal(this.container().igNotifier("container").text(),
		$.ig.Editor.locale.maxLengthWarningMsg.replace("{0}", 10), "MaxLength reached message not correct.");

	// maxLength with dropDown key handling:
	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		maxLength: 5,
		buttonType: "dropdown",
		listItems: ["1", "2", "3"]
	});
	editor.igTextEditor("value", "12345");
	this.input().focus();
	this.util.keyInteraction(65, this.input());
	assert.ok(this.container().hasClass($.ui.igNotifier.prototype.css.warningState) &&
		this.container().igNotifier("isVisible"), "MaxLength reached message not shown.");
	assert.equal(this.container().igNotifier("container").text(),
		$.ig.Editor.locale.maxLengthWarningMsg.replace("{0}", 5), "MaxLength reached message not correct.");

	this.util.mouseEvent(this.input(), "mouseover");
	this.util.mouseEvent(this.input(), "mousedown");
	this.util.mouseEvent(this.input(), "mousemove");
	this.util.mouseEvent(this.input(), "mousedown");
	this.util.mouseEvent(this.input(), "mouseout");

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		buttonType: "dropdown,spin,clear,nonvalid",
		width: 200,
		listWidth: 200,
		height: 20,
		listItems: ["item1", "item2", "item3"],
		dropDownAnimationDuration: -1,
		revertIfNotValid: false,
		isLimitedToListValues: true
	});

	editor.igTextEditor("option", "preventSubmitOnEnter", true);

	this.dropDownButton().click();
	this.util.keyInteraction(40, this.input());
	this.util.keyInteraction(13, this.input());
	assert.equal(editor.igTextEditor("value"), $(this.firstItem()).html(), "the item 1 should be selected");

	this.dropDownButton().click();
	this.clearButton().click();

	assert.equal(this.input().val(), "", "the item 1 should be cleared");
	this.input().blur();
	assert.equal(editor.igTextEditor("value"), "", "the item 1 value should be cleared");
	this.dropDownButton().click(); // close dropdown
	this.input().val("item2");
	this.util.keyInteraction(13, this.input());
	assert.equal(editor.igTextEditor("value"), "item2", "the item 2 should not be selected");

	editor.igTextEditor("option", "isLimitedToListValues", true);
	this.input().val("item22");
	this.util.keyInteraction(13, this.input());
	this.input().blur();
	assert.equal(editor.igTextEditor("value"), "", "the item 2 should stay selected");

	this.dropDownButton().click();
	this.util.keyInteraction(38, this.input());

	this.util.wait(100).then(function () {
		assert.notOk(editor.igTextEditor("dropDownVisible"), "The dropDown is not closed");
		editor.igTextEditor("value", "item3");
		self.dropDownButton().click();
		self.util.keyInteraction(38, self.input()); // at item2
		assert.ok(editor.igTextEditor("dropDownVisible"), "The dropDown is not opened");
		self.util.keyInteraction(38, self.input()); // at item1
		self.util.keyInteraction(38, self.input());
		return self.util.wait(100);
	}).then(function () {
		assert.notOk(editor.igTextEditor("dropDownVisible"), "The dropDown is not closed");
		self.util.keyInteraction(38, self.input());
		return self.util.wait(100);
	}).then(function () {
		assert.notOk(editor.igTextEditor("dropDownVisible"), "The dropDown is not closed");
		self.dropDownButton().click();
		self.util.mouseEvent(self.firstItem(), "mouseover");
		self.util.keyInteraction(38, self.input(), "altKey");
		return self.util.wait(100);
	}).then(function () {
		assert.notOk(editor.igTextEditor("dropDownVisible"), "The dropDown is not closed");
		self.util.keyInteraction(40, self.input());
		assert.ok(editor.igTextEditor("dropDownVisible"), "The dropDown is not opened");
		self.util.keyInteraction(40, self.input());
		self.util.keyInteraction(40, self.input());
		self.util.keyInteraction(40, self.input());
		self.util.keyInteraction(27, self.input()); // Close drop down with Esc
		return self.util.wait(100);
	}).then(function () {
		assert.notOk(editor.igTextEditor("dropDownVisible"), "The dropDown is not closed");
		self.util.keyInteraction(40, self.input(), "altKey");
		assert.ok(editor.igTextEditor("dropDownVisible"), "The dropDown is not opened");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("Spin buttons", function (assert) {
	assert.expect(5);

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		buttonType: "dropdown,spin,clear,nonvalid",
		width: 200,
		listWidth: 200,
		height: 20,
		listItems: ["item1", "item2", "item3"],
		dropDownAnimationDuration: -1,
		revertIfNotValid: false,
		isLimitedToListValues: true
	});

	editor.igTextEditor("option", "disabled", true);
	editor.igTextEditor("option", "disabled", false);
	assert.notOk(this.dropDownContainer().hasClass("ui-state-disabled"), "Disabled class is not removed from the drop down");
	assert.notOk(this.dropDownButton().hasClass("ui-state-disabled"), "Disabled class is not removed from the drop down button");

	this.dropDownButton().click();
	this.input().focus();

	// SpinUp using buttons
	this.util.mouseEvent(this.spinUpButton(), "mouseover");
	this.util.mouseEvent(this.spinUpButton(), "mousedown");
	this.util.mouseEvent(this.spinUpButton(), "mousepress");
	this.util.mouseEvent(this.spinUpButton(), "mouseup");
	this.util.mouseEvent(this.spinUpButton(), "mouseout");
	assert.ok($(this.firstItem()).attr("data-active"), "active class should be applied on the first item");

	// SpinUp using API
	editor.igTextEditor("spinUp");

	// SpinDown using keyboard navigation
	this.util.keyInteraction(40, this.input());
	assert.ok($(this.dropDownContainer().children(".ui-igedit-listitem")[1]).attr("data-active"), "active class should be applied on the second item");

	// SpinDown using API
	editor.igTextEditor("spinDown");
	editor.igTextEditor("spinDown");
	assert.ok($(this.lastItem()).attr("data-active"), "active class should be applied on the last item");
});

QUnit.test("SelectionOnFocus", function (assert) {
	this.assert = assert;
	assert.expect(6);

	var done = assert.async(), self = this, editor, item;

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		selectionOnFocus: "selectAll",
		value: "abc"
	});
	editor.igTextEditor("setFocus");
	this.util.wait(100).then(function () {
		self.testSelection(self.input(), 0, 3);

		self.editor = editor = self.appendToFixture(self.inputTag).igTextEditor({
			selectionOnFocus: "atStart",
			value: "abc"
		});
		editor.igTextEditor("setFocus");
		return self.util.wait(100);
	}).then(function () {
		self.testSelection(self.input(), 0, 0);

		self.editor = editor = self.appendToFixture(self.inputTag).igTextEditor({
			selectionOnFocus: "atEnd",
			value: "abc"
		});
		editor.igTextEditor("setFocus");
		return self.util.wait(100);
	}).then(function () {
		self.testSelection(self.input(), 3, 3);
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

// Bug #2076 igTextEditor selects all the text when the browser window gets focused again
QUnit.test("browserDefault selectionOnFocus should preserve caret position when blurred", function (assert) {
	this.assert = assert;
	assert.expect(4);

	var done = assert.async(), self = this, editor, item;

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		selectionOnFocus: "browserDefault",
		value: "abc"
	});
	editor.igTextEditor("select", 0, 0);
	this.input().blur();
	editor.igTextEditor("setFocus");
	this.util.wait(100).then(function () {
		self.testSelection(self.input(), 0, 0);

		editor.igTextEditor("select", 0, 1);
		this.input().blur();
		editor.igTextEditor("setFocus");

		return self.util.wait(100);
	}).then(function () {
		self.testSelection(self.input(), 0, 1);
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("SetOption", function (assert) {
	assert.expect(23);

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		value: "readOnly",
		readOnly: true
	});

	assert.ok(this.input().prop("readonly"), "readonly attribute is missing");
	assert.ok(this.hiddenInput().prop("readonly"), "readonly attribute is missing");

	editor.igTextEditor("option", "disabled", true);
	assert.ok(this.input().prop("disabled"), "readonly attribute is missing");
	assert.ok(this.hiddenInput().prop("disabled"), "readonly attribute is missing");
	editor.igTextEditor("option", "disabled", false);
	editor.igTextEditor("option", "readOnly", false);

	assert.equal(this.input().prop("disabled"), false, "The disabled attribute exists");
	assert.equal(this.hiddenInput().prop("disabled"), false, "The disabled attribute exists");
	assert.equal(this.input().prop("readonly"), false, "The readonly attribute exists");
	assert.equal(this.hiddenInput().prop("readonly"), false, "The readonly attribute exists");

	//setting this option to nonExisting element should default to editable
	assert.equal(this.input().prop("disabled"), false, "The disabled attribute exists");
	assert.equal(this.hiddenInput().prop("disabled"), false, "The disabled attribute exists");
	assert.equal(this.input().prop("readonly"), false, "The readonly attribute exists");
	assert.equal(this.hiddenInput().prop("readonly"), false, "The readonly attribute exists");
	editor.igTextEditor("option", "value", "read it only!");
	assert.equal(editor.igTextEditor("option", "value"), "read it only!", "Value not changed");
	editor.igTextEditor("option", "value", "");
	assert.equal(editor.igTextEditor("option", "value"), "", "Value should be empty string");

	assert.throws(function () {
		editor.igTextEditor("option", "visibleItemsCount", 3);
	},
		function (err) {
			return err.message === $.ig.Editor.locale.setOptionError + "visibleItemsCount";
		},
		"Should not set dynamically visibleItemsCount"
	);

	assert.throws(function () {
		editor.igTextEditor("option", "buttonType", "spin");
	},
		function (err) {
			return err.message === $.ig.Editor.locale.setOptionError + "buttonType";
		},
		"Should not set dynamically buttonType"
	);

	assert.throws(function () {
		editor.igTextEditor("option", "dropDownAttachedToBody", true);
	},
		function (err) {
			return err.message === $.ig.Editor.locale.setOptionError + "dropDownAttachedToBody"
		},
		"Should not set dynamically dropDownAttachedToBody"
	);

	this.editor = editor = this.appendToFixture(this.inputTag)
		.attr("tabindex", 1).attr("disabled", "disabled").attr("readonly", "readonly").val("disabled")
		.igTextEditor({
			buttonType: "clear",
			width: 300,
			height: 70
		});
	assert.ok(this.input().prop("disabled"), "readonly attribute is missing");
	assert.ok(this.hiddenInput().prop("disabled"), "readonly attribute is missing");
	// Enable a editor that is not readonly
	editor.igTextEditor("option", "disabled", false);
	assert.equal(this.input().prop("disabled"), false, "The disabled attribute exists");
	assert.equal(this.hiddenInput().prop("disabled"), false, "The disabled attribute exists");

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		inputName: 'firstName',
		tabIndex: 2,
		buttonType: "dropdown",
		placeHolder: "enter a value",
		dropDownAnimationType: "nonValid",
		listItems: ["item1", "item2"],
		dropDownAnimationDuration: -1,
		dropDownOrientation: "top"
	});
	editor.igTextEditor("option", "disabled", true);
	assert.equal(editor.igTextEditor("field").prop("disabled"), true, "The disabled attribute exists");
	editor.igTextEditor("option", "disabled", false);
	assert.equal(editor.igTextEditor("field").prop("disabled"), false, "The disabled attribute exists");
	editor.igTextEditor("option", "disabled", true);
});

QUnit.test("Clear Button", function (assert) {
	assert.expect(4);

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		value: "has value",
		buttonType: "clear, spin",
		visibleItemsCount: 2,
		listItems: ["item1", "item2", "item3"],
		dropDownAttachedToBody: true,
		allowNullValue: true,
		tabIndex: 2
	});

	assert.equal(editor.igTextEditor("value"), "has value", "Initial value is not correct");
	this.clearButton().click();
	assert.equal(editor.igTextEditor("value"), null, "Initial value is not correct");
	editor.igTextEditor("value", null);
	editor.igTextEditor("value", undefined);
	assert.equal(editor.igTextEditor("value"), null, "Initial value is not correct");

	editor.igTextEditor("option", "allowNullValue", false);
	editor.igTextEditor("option", "allowNullValue", false); // Set twice so we ensure that the same value is not set and coverage is fullfilled.
	this.clearButton().click();
	assert.equal(editor.igTextEditor("value"), "", "Initial value is not correct");
});

QUnit.test("Check width/height", function (assert) {
	assert.expect(6);

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		value: "has value",
		buttonType: "clear, spin",
		visibleItemsCount: 2,
		listItems: ["item1", "item2", "item3"],
		dropDownAttachedToBody: true,
		allowNullValue: true,
		tabIndex: 2
	});

	// Default stlye from CSS
	assert.equal(this.container().css("width"), "200px", "Width is not correct");
	assert.equal(this.container().css("height"), "32px", "Height is not correct");

	editor.igTextEditor("option", "width", 100);
	editor.igTextEditor("option", "height", 100);
	assert.equal(this.container().css("width"), "100px", "Width is not correct");
	assert.equal(this.container().css("height"), "100px", "Height is not correct");

	this.editor = editor = this.appendToFixture(this.inputTag)
		.attr("tabindex", 1).attr("disabled", "disabled").attr("readonly", "readonly").val("disabled")
		.igTextEditor({
			buttonType: "clear",
			width: 300,
			height: 70
		});
	// Style set from the options
	assert.equal(this.container().css("width"), "300px", "Width is not correct");
	assert.equal(this.container().css("height"), "70px", "Height is not correct");
});

QUnit.test('Multiline/textarea', function (assert) {
	assert.expect(2);

	this.editor = editor = this.appendToFixture(this.spanTag).igTextEditor({
		textMode: "multiline"
	});
	assert.ok(this.input().is("textarea"), "It should be textare");
	assert.ok(editor.data("igTextEditor")._valueInput.is("textarea"), "It should be textare");
});

QUnit.test('Password', function (assert) {
	assert.expect(2);

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		textMode: "password"
	});
	assert.equal(this.input().attr("type"), "password", "Type should be password");

	this.editor = editor = this.appendToFixture(this.divTag).igTextEditor({
		textMode: "password"
	});
	assert.equal(this.input().attr("type"), "password", "Type should be password");
});

QUnit.test("ToUpper and ToLower", function (assert) {
	assert.expect(8);

	var done = assert.async(), self = this, editor;

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		toUpper: true,
		keypress: function (evt, args) {
			keyCode = args.key;
		}
	});

	this.util.keyPressChar(100, this.input());
	assert.equal(String.fromCharCode(keyCode), "D", "toUpper is not working");
	assert.equal(editor.val(), "D", "character is not set to upper");
	editor.igTextEditor("setFocus");
	$.ig.TestUtil.paste(this.input()[0], "newVal1");
	this.util.wait(100).then(function () {
		assert.equal(editor.val(), "NEWVAL1", "(Bug #209012)(Bug #209067) Value is not made upper");
		self.util.keyInteraction(13, self.input());
		assert.equal(editor.igTextEditor("value"), "NEWVAL1", "Value is not made upper");

		self.editor = editor = self.appendToFixture(self.inputTag).igTextEditor({
			toLower: true,
			keypress: function (evt, args) {
				keyCode = args.key;
			}
		});
		self.util.keyPressChar(1071, self.input());
		assert.equal(String.fromCharCode(keyCode), "я", "toLower is not working");
		assert.equal(editor.val(), "я", "character is not set to lower");
		editor.igTextEditor("setFocus");
		$.ig.TestUtil.paste(self.input()[0], "NewVaL1");
		return self.util.wait(100);
	}).then(function () {
		assert.equal(editor.val(), "newval1", "(Bug #209012)(Bug #209067) Value is not made lower");
		self.util.keyInteraction(13, self.input());
		assert.equal(editor.igTextEditor("value"), "newval1", "Value is not made lower");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("Paste", function (assert) {
	assert.expect(2);

	var done = assert.async(), self = this, editor;

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		value: "ade"
	});

	editor.igTextEditor("setFocus");
	this.util.wait(100).then(function () {
		self.input()[0].setSelectionRange(1, 1);
		self.util.paste(self.input()[0], "bc"); // There is timeout
		return self.util.wait(100);
	}).then(function () {
		assert.equal(self.input().val(), "abcde", "value is wrong");
		assert.equal(editor.igTextEditor("getSelectionStart"), 3, "cursor position wrong");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("Clear button dynamic show/hide", function (assert) {
	assert.expect(4);

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		buttonType: "clear"
	});
	assert.notOk(this.clearButton().is(":visible"), "The clear button should not be visible initilly");
	this.input().focus();
	assert.notOk(this.clearButton().is(":visible"), "The clear button should not be visible on focus");
	this.input().val("someVal");
	editor.data("igTextEditor")._processTextChanged();
	assert.ok(this.clearButton().is(":visible"), "The clear button should be visible");
	this.input().blur();
	assert.ok(this.clearButton().is(":visible"), "The clear button should be visible on blur");
});

QUnit.test('Check destroy', function (assert) {
	assert.expect(8);

	var $editor1 = $('#clearEditor'), $editor2 = $("#disabledEditor");
	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		value: "has value",
		buttonType: "clear, spin",
		visibleItemsCount: 2,
		listItems: ["item1", "item2", "item3"],
		dropDownAttachedToBody: true,
		allowNullValue: true,
		tabIndex: 2
	});
	editor.igTextEditor("destroy");
	assert.equal(editor.data("igTextEditor"), undefined, 'Error destroying igCheckboxEditor in an input');
	assert.equal(editor.html(), "", 'Content should be empty');
	assert.equal(editor.parent().attr("id"), "qunit-fixture", 'Parent should be Qunit Fixture');
	//assert.equal(this.spinUpButton()[0], undefined, 'Spin Up button is not removed');
	//assert.equal(this.spinDownButton()[0], undefined, 'Spin Down button is not removed');
	$._data(editor[0], "events");
	assert.ok(editor.attr("class") === undefined, "Some classes are still not removed");

	this.editor = editor = this.appendToFixture(this.inputTag)
		.attr("tabindex", 1).attr("disabled", "disabled").attr("readonly", "readonly").val("disabled")
		.igTextEditor({
			buttonType: "clear",
			width: 300,
			height: 70
		});
	editor.igTextEditor("destroy");
	assert.equal(editor.data("igTextEditor"), undefined, 'Error destroying igCheckboxEditor in an input');
	assert.equal(editor.html(), "", 'Content should be empty');
	assert.equal(editor.parent().attr("id"), "qunit-fixture", 'Parent should be Qunit Fixture');
	$._data(editor[0], "events");
	assert.ok(editor.attr("class") === undefined, "Some classes are still not removed");
});

QUnit.test("Test set options runtime", function (assert) {
	assert.expect(8);

	var editor, item;

	editor = this.appendToFixture(this.inputTag).igTextEditor({
		dropDownAttachedToBody: true,
		listItems: ["item1", "item2", "item3"]
	});
	editor.igTextEditor("option", "placeHolder", "Test set options");
	editor.igTextEditor("option", "listWidth", "400px");
	editor.igTextEditor("option", "includeKeys", "abc");
	editor.igTextEditor("option", "textAlign", "center");
	assert.equal(editor.igTextEditor("option", "placeHolder"), "Test set options", "The placeHolder option is not set correctly runtime.");
	assert.equal(editor.igTextEditor("option", "listWidth"), "400px", "The listWidth option is not set correctly runtime.");
	assert.equal(editor.igTextEditor("option", "includeKeys"), "abc", "The includeKeys is not set correctly runtime.");
	assert.equal(editor.igTextEditor("option", "textAlign"), "center", "The textAlign is not set correctly runtime.");

	editor = this.appendToFixture(this.inputTag).igTextEditor();
	editor.igTextEditor("option", "excludeKeys", "ABC");
	assert.equal(editor.igTextEditor("option", "excludeKeys"), "ABC", "The excludeKeys in not set correctly runtime.");

	editor = this.appendToFixture(this.inputTag).igTextEditor();
	editor.igTextEditor("option", "includeKeys", "");
	assert.equal(editor.igTextEditor("option", "includeKeys"), [], "The includeKeys is not set correctly to empty string in runtime.");

	editor = this.appendToFixture(this.inputTag).igTextEditor();
	editor.igTextEditor("option", "excludeKeys", "");
	assert.equal(editor.igTextEditor("option", "excludeKeys"), [], "The excludeKeys is not set correctly to empty string in runtime.");

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		dropDownAttachedToBody: true,
		listItems: ["item1", "item2", "item3"],
		readOnly: true,
		dropDownOnReadOnly: true
	});
	this.dropDownButton().click();
	this.util.mouseEvent(this.firstItem(), "click");
	assert.equal(editor.igTextEditor("option", "value"), "item1", "The value is not set when dropDownOnReadOnly is set to true.");
});

QUnit.test("Test insert method.", function (assert) {
	assert.expect(1);

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		blur: function (evt, ui) {
			ui.owner.insert("test");
		},
		excludeKeys: "t"
	});

	this.input().blur();
	assert.equal(editor.igTextEditor("option", "value"), "es", "The _replaceCharAt is not working correctly.");
});

QUnit.test("Class selector.", function (assert) {
	assert.expect(1);

	editor = this.appendToFixture(this.inputTag).igTextEditor({
		textMode: "text"
	});

	assert.notEqual(editor.data("igTextEditor").id, undefined, "The id is not set.");
});

QUnit.test("NullValue set on init.", function (assert) {
	assert.expect(5);

	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		allowNullValue: true,
		nullValue: 0
	});

	assert.equal(editor.igTextEditor("value"), 0, "The value is not set to the nullValue");
	editor.igTextEditor("value", "hey");
	editor.igTextEditor("value", null);
	assert.equal(editor.igTextEditor("value"), "0", "The value is not set to the nullValue");

	//invalid null value:
	this.editor = editor = this.appendToFixture(this.inputTag).igTextEditor({
		nullValue: "312",
		allowNullValue: true,
		isLimitedToListValues: true,
		listItems: ["a", "b", "c"],
		buttonType: "clear"
	});

	assert.strictEqual(editor.igTextEditor("value"), "", "Initial value should ignore wrong nullValue");
	editor.igTextEditor("value", "a");
	editor.igTextEditor("value", null);
	assert.strictEqual(editor.igTextEditor("value"), "", "Value set should ignore wrong nullValue");
	editor.igTextEditor("value", "a");
	this.clearButton().trigger("click");
	assert.strictEqual(editor.igTextEditor("value"), "", "Clear should ignore wrong nullValue");
});


QUnit.test("Test creating on wrong field or wrong options combinations.", function (assert) {
	assert.expect(7);

	assert.throws(function () {
		this.appendToFixture(this.inputTag).igTextEditor({
			buttonType: "dropdownbutton"
		});
	},
		Error($.ig.Editor.locale.btnValueNotSupported),
		"Unsupported/Wrong button value is set.");

	assert.throws(function () {
		this.appendToFixture("<img />").igTextEditor();
	},
		Error($.ig.Editor.locale.targetNotSupported),
		"The editor should not be created on img.");

	assert.throws(function () {
		this.appendToFixture("<textarea />").igTextEditor();
	},
		Error($.ig.Editor.locale.multilineErrMsg),
		"Error not throw when igTextEditor is initialized in textArea and textMode is not multiline.");

	assert.throws(function () {
		this.appendToFixture(this.inputTag).igTextEditor({
			buttonType: "spin"
		})
	},
		function (err) {
			return err.message === $.ig.Editor.locale.noListItemsNoButton;
		},
		"The spinUp/spinDown buttons are not supposed to be rendered without listItems.");

	assert.throws(function () {
		this.appendToFixture(this.inputTag).igTextEditor({
			buttonType: "dropdown"
		});
	},
		function (err) {
			return err.message === $.ig.Editor.locale.noListItemsNoButton;
		},
		"The dropdown button is not supposed to be rendered without listItems.");

	assert.throws(function () {
		this.appendToFixture(this.inputTag).igTextEditor({
			listItems: [],
			buttonType: "spin"
		});
	},
		function (err) {
			return err.message === $.ig.Editor.locale.noListItemsNoButton;
		},
		"The spinUp/spinDown buttons are not supposed to be rendered with listItems with length 0.")

	assert.throws(function () {
		this.appendToFixture(this.inputTag).igTextEditor({
			listItems: [],
			buttonType: "dropdown"
		});
	},
		function (err) {
			return err.message === $.ig.Editor.locale.noListItemsNoButton;
		},
		"The dropdown button is not supposed to be rendered with listItems with length 0.");
});

QUnit.test("Test the undefined.", function (assert) {
	assert.expect(1);

	var editor = this.appendToFixture(this.inputTag).igTextEditor();
	assert.notOk(editor.data("igTextEditor")._validateValue(undefined), "The validation rule for undefined in not working.");
});

QUnit.test("Test nullValue on initialization", function (assert) {
	assert.expect(4);

	var editor = this.appendToFixture(this.inputTag).igTextEditor({ allowNullValue: false });
	//Get null Value
	assert.equal(editor.igTextEditor("value"), "", "The value is not an empty string");
	//Set null Value
	editor.igTextEditor("value", null);
	assert.equal(editor.igTextEditor("value"), "", "The value is not an empty string");
	//CHange allowNullValue option
	editor.igTextEditor("option", "allowNullValue", true);
	// Get Null value
	assert.equal(editor.igTextEditor("value"), "", "The value is not an empty string");
	//Set Null value
	editor.igTextEditor("value", null);
	//Get null value
	assert.equal(editor.igTextEditor("value"), null, "The value is not an empty string");
});

QUnit.test('Clear button state', function (assert) {
	assert.expect(2);

	var editor = this.editor = this.appendToFixture(this.inputTag).igTextEditor({ buttonType: "clear" });
	assert.notOk(this.clearButton().is(":visible"), "Clear button is not hidden");
	editor.igTextEditor("value", "someVal");
	assert.ok(this.clearButton().is(":visible"), "Clear button is not visible");
});

QUnit.test('maxLength is respected', function (assert) {
	assert.expect(1);

	var editor = this.editor = this.appendToFixture(this.inputTag).igTextEditor({ maxLength: 3 });
	this.util.type("abc s", this.input());
	assert.ok(editor.parents().hasClass("ui-ignotify-warn"), "The notifier is not shown");
});

QUnit.test("Setting listItems on run time", function (assert) {
	assert.expect(3);

	var editor = this.appendToFixture(this.inputTag).igTextEditor();
	assert.ok(editor.igTextEditor("option", "listItems") === null, "ListItems should not be set on initialization");
	editor.igTextEditor("option", "listItems", ["item 1", "item 2", "item 3"]);
	assert.equal(editor.igTextEditor("option", "listItems").length, 3, "ListItems were not set on run time.");
	assert.equal(editor.igTextEditor("option", "listItems")[0], "item 1", "ListItems were not set on run time.");
});

QUnit.test("Set text dynamically with maxLength defined", function (assert) {
	assert.expect(1);

	var editor = this.appendToFixture(this.inputTag).igTextEditor({ maxLength: 5, value: "ade" });
	editor.igTextEditor("value", "abcdefg");
	assert.equal(editor.igTextEditor("value"), "abcde", "Value is not trimmed properly");
});

QUnit.test('Testing key code event arguments', function (assert) {
	assert.expect(3);

	var done = assert.async(), editor, keyD, keyP, keyU;

	editor = this.editor = this.appendToFixture(this.inputTag).igTextEditor({
		keydown: function (e, args) { keyD = args.key; },
		keypress: function (e, args) { keyP = args.key; },
		keyup: function (e, args) { keyU = args.key; }
	});

	this.util.type("s", this.input());
	this.util.wait(100).then(function () {
		assert.ok(keyD === "s".charCodeAt(0), "Key code is not correct in keyDown event");
		assert.ok(keyP === "s".charCodeAt(0), "Key code is not correct in keyPress event");
		assert.ok(keyU === "s".charCodeAt(0), "Key code is not correct in keyUp event");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Test suppressKeyboard option', function (assert) {
	assert.expect(10);

	var editor;

	// Test that the input DOESN'T have focus after the drop down is opened
	editor = this.editor = this.appendToFixture(this.inputTag).igTextEditor({ listItems: ["a", "b", "c"], suppressKeyboard: true });
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.dropDownButton().click();
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.firstItem().click();
	assert.notOk(this.input().is(":focus"), "The input should not be focused");

	// Test that the input DOESN'T have focus after the drop down is opened (before that the input is focused)
	editor = this.editor = this.appendToFixture(this.inputTag).igTextEditor({ listItems: ["a", "b", "c"], suppressKeyboard: true });
	editor.igTextEditor("setFocus");
	this.dropDownButton().click();
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.input();
	assert.notOk(this.input().is(":focus"), "The input should not be focused");

	// Test that the input DOES have focus after the drop down is opened
	editor = this.editor = this.appendToFixture(this.inputTag).igTextEditor({ listItems: ["a", "b", "c"], suppressKeyboard: false });
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.dropDownButton().click();
	assert.ok(this.input().is(":focus"), "The input should be focused");
	this.firstItem().click();
	assert.ok(this.input().is(":focus"), "The input should be focused");
	this.dropDownButton().click();
	assert.ok(this.input().is(":focus"), "The input should be focused");
	this.input().blur();
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
});

QUnit.test("Scrollbar is not visible when not needed", function (assert) {
	assert.expect(16);

	var editor, lastItem, style, scrollContainer;

	editor = this.editor = this.appendToFixture(this.inputTag).igTextEditor({ listItems: ["one"], width: 98, height: 58, button: "dropdown" });
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.dropDownButton().click();
	assert.ok(this.dropDownContainer()[0].clientHeight >= this.dropDownContainer()[0].scrollHeight, "Scrollbar is visible!");

	editor = this.editor = this.appendToFixture(this.inputTag).igTextEditor({ listItems: ["one", "two", "three"], width: 98, height: 58, button: "dropdown" });
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.dropDownButton().click();
	assert.ok(this.dropDownContainer()[0].clientHeight >= this.dropDownContainer()[0].scrollHeight, "Scrollbar is visible!");

	editor = this.editor = this.appendToFixture(this.inputTag).igTextEditor({ listItems: ["one", "two", "three", "four", "five", "six", "seven"], width: 98, height: 58, button: "dropdown", visibleItemsCount: 7 });
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.dropDownButton().click();
	assert.ok(this.dropDownContainer()[0].clientHeight >= this.dropDownContainer()[0].scrollHeight, "Scrollbar is not visible!");

	editor = this.editor = this.appendToFixture(this.inputTag).igTextEditor({ listItems: ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"], width: 98, height: 58, button: "dropdown", visibleItemsCount: 7 });
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.dropDownButton().click();
	assert.ok(this.dropDownContainer()[0].clientHeight < this.dropDownContainer()[0].scrollHeight, "Scrollbar is not visible!");

	editor = this.editor = this.appendToFixture(this.inputTag).igTextEditor({ listItems: ["one", "two", "three", "four", "five", "six"], width: 98, height: 58, button: "dropdown", visibleItemsCount: 7 });
	lastItem = editor.igTextEditor("dropDownContainer").last();
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.dropDownButton().click();
	assert.ok(((this.dropDownContainer().igOffset().top + this.dropDownContainer().outerHeight(true)) - (lastItem.igOffset().top + lastItem.outerHeight(true))) <= 3, "Too much empty space below the last list item!");

	//Test with custom dropdown container border-width
	style = $('<style> #scrollTest .ui-igedit-dropdown {border-width: 30px 30px 30px 30px;} </style>').appendTo("head");
	scrollContainer = $('<div id="scrollTest"></div>').appendTo('#qunit-fixture');
	editor = this.editor = $(this.inputTag).appendTo(scrollContainer).igTextEditor({ listItems: ["one", "two", "three"], width: 98, height: 58, button: "dropdown", visibleItemsCount: 7 });
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.dropDownButton().click();
	assert.ok(this.dropDownContainer()[0].clientHeight >= this.dropDownContainer()[0].scrollHeight, "Scrollbar is visible!");
	scrollContainer.remove();
	style.remove();

	//Test with custom dropdown item border-width
	style = $('<style> #scrollTest .ui-igedit-listitem {border-width: 20px 20px 5px 10px;} </style>').appendTo("head");
	scrollContainer = $('<div id="scrollTest"></div>').appendTo('#qunit-fixture');
	editor = this.editor = $(this.inputTag).appendTo(scrollContainer).igTextEditor({ listItems: ["one", "two", "three"], width: 98, height: 58, button: "dropdown" });
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.dropDownButton().click();
	assert.ok(this.dropDownContainer()[0].clientHeight >= this.dropDownContainer()[0].scrollHeight, "Scrollbar is visible!");
	scrollContainer.remove();
	style.remove();

	style = $('<style> #scrollTest .ui-igedit-listitem {border-width: 20px 20px 5px 10px;} </style>').appendTo("head");
	scrollContainer = $('<div id="scrollTest"></div>').appendTo('#qunit-fixture');
	editor = this.editor = $(this.inputTag).appendTo(scrollContainer).igTextEditor({ listItems: ["one", "two", "three", "four", "five"], width: 98, height: 58, button: "dropdown", visibleItemsCount: 3 });
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.dropDownButton().click();
	assert.ok(this.dropDownContainer()[0].clientHeight < this.dropDownContainer()[0].scrollHeight, "Scrollbar is not visible!");
	scrollContainer.remove();
	style.remove();
});

QUnit.test("Keydown event bubbling when maxLength is set", function (assert) {
	assert.expect(1);

	var editor = this.appendToFixture(this.inputTag, { id: 'keydownBubblingTest' }).igTextEditor({ maxLength: 1 });
	var text = "test", eventRaisedCounter = 0;
	var keydownEventHandler = function (event) {
		var targetId = event.target.id;
		if (targetId === 'keydownBubblingTest') {
			eventRaisedCounter++;
		}
		//$(this).off("keydown", keydownEventHandler);
	};

	$("body").on("keydown", editor, keydownEventHandler);
	$.ig.TestUtil.type(text, editor);
	assert.equal(eventRaisedCounter, text.length, "Keydown event should bubble up when the input text exceeds the maxLength");
	$("body").off("keydown", keydownEventHandler);
});
