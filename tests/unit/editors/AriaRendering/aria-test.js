
QUnit.module("igEditors ARIA rendering", {
	divTag: '<div></div>',
	util: $.ig.TestUtil,

	beforeEach: function () { },

	afterEach: function () { },
});

QUnit.test('Aria Rendering', function (assert) {
	assert.expect(28);

	var igTextEditorId = "#igTextEditor",
		$igTextEditor = this.util.appendToFixture(this.divTag, { id: igTextEditorId }),
		igCurrencyEditorId = "#igCurrencyEditor",
		$igCurrencyEditor = this.util.appendToFixture(this.divTag, { id: igCurrencyEditorId }),
		$igDateEditor = this.util.appendToFixture(this.divTag, { id: "igDateEditorId" }),
		$igDatePicker = this.util.appendToFixture(this.divTag, { id: "igDatePickerId" }),
		$igMaskEditor = this.util.appendToFixture(this.divTag, { id: "igMaskEditorId" }),
		$igNumericEditor = this.util.appendToFixture(this.divTag, { id: "igNumericEditorId" }),
		$igPercentEditor = this.util.appendToFixture(this.divTag, { id: "igPercentEditorId" }),
		$dropDownButton,
		$clearButton,
		$spinUpButton,
		$spinDownButton,
		$ddlist,
		$listitem;

	$igTextEditor.igTextEditor({
		buttonType: "dropdown, spin, clear",
		listItems: ["item1", "item2", "item3", "item4", "item5", "item6", "item7"]
	});

	$igCurrencyEditor.igCurrencyEditor({
		buttonType: "dropdown,spin,clear",
		tabIndex: -1,
		listItems: ["item1", "item2"]
	});

	$igDateEditor.igDateEditor({
		buttonType: "spin,clear",
	});

	$igDatePicker.igDatePicker({
		buttonType: "dropdown,spin,clear",
	});

	$igMaskEditor.igMaskEditor({
		buttonType: "clear",
	});

	$igNumericEditor.igNumericEditor({
		buttonType: "dropdown,spin,clear",
		listItems: [1, 2, 3]
	});

	$igPercentEditor.igPercentEditor({
		buttonType: "dropdown,spin,clear",
		listItems: [1, 2, 3, 4, 5, 6, 7, 8, 43, 43, 23, 2, 32, 3, 2]
	});

	$dropDownButton = $igTextEditor.data("igTextEditor")._dropDownButton;
	assert.equal($dropDownButton.attr("role"), "button", "role='button' attribute is not rendered");
	assert.equal($dropDownButton.attr("title"), $.ig.Editor.locale.buttonTitle, "Button title attribute be is not correct");
	assert.equal($dropDownButton.attr("id"), igTextEditorId + "_dropDownButton", "The id of the dropDownButton should be " + igTextEditorId + "_dropDownButton");

	// Bug 214846:igGrid Paging dropdown in the header has negative tabindex
	// Make sure tabIndex is only applied when set
	assert.equal($igTextEditor.igTextEditor("field").attr("tabIndex"), undefined, "Input not rendered with default tab index");
	assert.equal($igCurrencyEditor.igCurrencyEditor("field").attr("tabIndex"), "-1", "Input not rendered with set tab index");

	$clearButton = $igTextEditor.data("igTextEditor")._clearButton;
	assert.equal($clearButton.attr("role"), "button", "role='button' attribute is not rendered");
	assert.equal($clearButton.attr("title"), $.ig.Editor.locale.clearTitle, "Clear title attribute is not correct");
	assert.equal($clearButton.attr("id"), igTextEditorId + "_clearButton", "The id of the clearButton should be " + igCurrencyEditorId + "_clearButton");

	$spinUpButton = $igTextEditor.data("igTextEditor")._spinUpButton;
	assert.equal($spinUpButton.attr("role"), "button", "role='button' attribute is not rendered");
	assert.equal($spinUpButton.attr("title"), $.ig.Editor.locale.spinUpperTitle, "Spin upper title attribute is not correct");
	assert.equal($spinUpButton.attr("id"), igTextEditorId + "_spinUpButton", "The id of the spinUpButton should be " + igTextEditorId + "_spinUpButton");

	$spinDownButton = $igTextEditor.data("igTextEditor")._spinDownButton;
	assert.equal($spinDownButton.attr("role"), "button", "role='button' attribute is not rendered");
	assert.equal($spinDownButton.attr("title"), $.ig.Editor.locale.spinLowerTitle, "Spin lower title attribute is not correct");
	assert.equal($spinDownButton.attr("id"), igTextEditorId + "_spinDownButton", "The id of the spinDownButton should be " + igTextEditorId + "spinDownButton");

	$ddlist = $igTextEditor.data("igTextEditor")._dropDownList;
	assert.equal($ddlist.attr("role"), "listbox", "The dropdown role should be listbox");
	assert.equal($ddlist.attr("aria-activedescendant"), igTextEditorId + "EditingInput", "The aria-activedescendant should be equal to the editor ID= " + igTextEditorId + "EditingInput");
	assert.equal($ddlist.attr("id"), igTextEditorId + "_list", "The list id should be " + igTextEditorId + "list");

	$listitem = $($ddlist.children(".ui-igedit-listitem")[3]);
	assert.equal($listitem.attr("role"), "option", "The item should have role option");
	assert.equal($listitem.attr("aria-selected"), "false", "The aria-selected attribute should be false");
	assert.equal($listitem.attr("aria-posinset"), "4", "The aria-posinset attribute should be 4");
	assert.equal($listitem.attr("title"), "item4", "The title of the item should be item4");

	//AriaLabelText for all editors. 
	assert.equal($igTextEditor.igTextEditor("field").attr("aria-label"), $.ig.Editor.locale.ariaTextEditorFieldLabel,
		"igTextEditor's aria-label is not correct");
	assert.equal($igCurrencyEditor.igCurrencyEditor("field").attr("aria-label"), $.ig.Editor.locale.ariaCurrencyEditorFieldLabel, "igCurrencyEditor's aria-label should is not correct");
	assert.equal($igDateEditor.igDateEditor("field").attr("aria-label"), $.ig.Editor.locale.ariaDateEditorFieldLabel, "idDateEditor's aria-label is not correct");
	assert.equal($igDatePicker.igDatePicker("field").attr("aria-label"), $.ig.Editor.locale.ariaDatePickerFieldLabel, "igDatePicker's aria-label is not correct");
	assert.equal($igMaskEditor.igMaskEditor("field").attr("aria-label"), $.ig.Editor.locale.ariaMaskEditorFieldLabel, "$.ig.Editor.locale.'s aria-label is not correct");
	assert.equal($igNumericEditor.igNumericEditor("field").attr("aria-label"), $.ig.Editor.locale.ariaNumericEditorFieldLabel, "igNumericEditor's aria-label is not correct");
	assert.equal($igPercentEditor.igPercentEditor("field").attr("aria-label"), $.ig.Editor.locale.ariaPercentEditorFieldLabel, "igPercentEditor's aria-label is not correct");
});

QUnit.test('Aria List Rendering', function (assert) {
	assert.expect(0);
});

QUnit.test("Change locale", function (assert) {
	assert.expect(3);

	var igDatePickerId = "igDatePickerId",
		$igDatePicker = this.util.appendToFixture(this.divTag, { id: igDatePickerId }),
		$buttonChangeUSLocale = this.util.appendToFixture("<button></button>");

	$igDatePicker.igDatePicker({
		buttonType: "dropdown,spin,clear",
		placeHolder: "Select Date",
		width: 400
	});

	$buttonChangeUSLocale.click(function () {
		$igDatePicker.igDatePicker("option", "locale", {
			datePickerButtonTitle: "New DD Title",
			spinUpperTitle: "New SU Title",
			spinLowerTitle: "New SL Title"
		});
	});

	$buttonChangeUSLocale.click();

	assert.equal($igDatePicker.find("#" + igDatePickerId + "_calendarButton").attr("title"), "New DD Title", "The Drop Down title locale didn't change");
	assert.equal($igDatePicker.find("#" + igDatePickerId + "_spinUpButton").attr("title"), "New SU Title", "The Spin Up title locale didn't change");
	assert.equal($igDatePicker.find("#" + igDatePickerId + "_spinDownButton").attr("title"), "New SL Title", "The Spin Down title locale didn't change");
});