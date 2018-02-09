QUnit.module("igDatePicker unit tests", {
	divTag: '<div></div>',
	inputTag: '<input></input>',
	util: $.ig.TestUtil,
	editor: null,
	appendToFixture: function (element, options) {
		var $qunitFixture = $('#qunit-fixture');
		if (this.editor) {
			this.editor.remove();
		}
		return $(element, options).appendTo($qunitFixture);
	},
	input: function() {
		return this.editor.igDatePicker("field");
	},
	hiddenInput: function() {
		return this.container().find("input:hidden")
	},
	container: function() {
		return this.editor.igDatePicker("editorContainer");
	},
	calendar: function() {
		return this.editor.igDatePicker("getCalendar");
	},
	calendarOptions: function() {
		return this.editor.igDatePicker("option", "datepickerOptions")
	},
	dropDownButton: function() {
		return this.editor.igDatePicker("dropDownButton");
	},
	clearButton: function() {
		return this.editor.igDatePicker("clearButton");
	},
	spinUpButton: function() {
		return this.editor.igDatePicker("spinUpButton");
	},
	spinDownButton: function() {
		return this.editor.igDatePicker("spinDownButton");
	},
	beforeEach: function () { $.fx.off = true; },
	afterEach: function () { $.fx.off = false; }
});

QUnit.test('Date Picker initialization.', function (assert) {
	assert.expect(5);

	var editor, date;
	editor = this.appendToFixture(this.inputTag).igDatePicker({
		value: "12/10/2010",
		buttonType: "clear"
	});
	assert.ok(typeof (editor.igDatePicker) === 'function', "Editors Script is not loaded");
	assert.ok(editor.data("igDatePicker") !== undefined, 'Error creating igDatePicker in an input');
	date = editor.igDatePicker("value");
	assert.equal(date.getFullYear(), 2010, 'The initial year is not as expexted');
	assert.equal(date.getMonth(), 12 - 1, 'The initial year is not as expexted');
	assert.equal(date.getDate(), 10, 'The initial year is not as expexted');
});

QUnit.test('Date Picker methods.', function (assert) {
assert.expect(7);
	var editor, date, testDate = new Date(2006, 10, 22);

	editor = this.appendToFixture(this.inputTag).igDatePicker({
		value: "12/10/2010",
		buttonType: "clear"
	});
	editor.igDatePicker("selectDate", testDate);
	date = editor.igDatePicker("getSelectedDate");
	assert.equal(date.getTime(), testDate.getTime(), "date is not correct");

	editor.igDatePicker("spinUp");
	editor.igDatePicker("spinUp");

	date = editor.igDatePicker("getSelectedDate");
	testDate.setDate(testDate.getDate() + 2);
	assert.equal(date.getTime(), testDate.getTime(), "date is not correct");

	editor.igDatePicker("spinDown");
	editor.igDatePicker("spinDown");
	editor.igDatePicker("spinDown");

	date = editor.igDatePicker("getSelectedDate");
	testDate.setDate(testDate.getDate() - 3);
	assert.equal(date.getTime(), testDate.getTime(), "date is not correct");
	
	//not supported:
	editor = this.appendToFixture(this.inputTag).igDatePicker();

	assert.throws(function(){
		editor.igDatePicker("dropDownContainer");
	},
	$.ig.Editor.locale.datePickerNoSuchMethodDropDownContainer);
	assert.throws(function(){
		editor.igDatePicker("findListItemIndex");
	},
	$.ig.Editor.locale.datePickerEditorNoSuchMethod);
	assert.throws(function(){
		editor.igDatePicker("getSelectedListItem");
	},
	$.ig.Editor.locale.datePickerEditorNoSuchMethod);
	assert.throws(function(){
		editor.igDatePicker("selectedListIndex");
	},
	$.ig.Editor.locale.datePickerEditorNoSuchMethod);
});

QUnit.test('Date Picker set options.', function (assert) {
	assert.expect(3);
	var editor, self = this, done = assert.async(); 
	
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker();
	
	assert.throws(function(){
		editor.igDatePicker("option", "listItems", []);
	},
	$.ig.Editor.locale.setOptionError + "listItems");

	editor.igDatePicker("option", "dropDownOrientation", "top");
	this.dropDownButton().click();
	assert.equal(this.input().datepicker("option", "showOptions").direction, "up", "Picker direction not set on open");
	editor.igDatePicker("hideDropDown");
	
	this.calendar().promise().done(function () {
		assert.notOk(self.calendar().is(":visible"), "Calendar not hidden");
		done();
	});
});

QUnit.test('Date Picker min/max values.', function (assert) {
	assert.expect(16);
	
	var editor, self = this, done = assert.async();

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		dateInputFormat: "dateTime"
	});
	editor.igDatePicker("option", "minValue", new Date(2017, 0, 10).toLocaleString());
	assert.equal(editor.igDatePicker("option", "minValue").getTime(), new Date(2017, 0, 10).getTime(), "minValue not set correctly");
	assert.equal(editor.datepicker("option", "minDate").getTime(), new Date(2017, 0, 10).getTime(), "minValue not set to picker");

	editor.igDatePicker("option", "maxValue", new Date(2017, 0, 31).toLocaleString());
	assert.equal(editor.igDatePicker("option", "maxValue").getTime(), new Date(2017, 0, 31).getTime(), "maxValue not set correctly");
	assert.equal(editor.datepicker("option", "maxDate").getTime(), new Date(2017, 0, 31).getTime(), "maxValue not set to picker");

	// set through datepickerOptions (support for #84)
	editor.igDatePicker("value", new Date(2017, 0, 10));
	editor.igDatePicker({ datepickerOptions: { minDate : new Date(2017, 0, 11) } });
	assert.equal(editor.igDatePicker("option", "minValue").getTime(), new Date(2017, 0, 11).getTime(), "minValue not set correctly through datepickerOptions");
	assert.equal(editor.datepicker("option", "minDate").getTime(), new Date(2017, 0, 11).getTime(), "minDate not set through datepickerOptions");
	assert.equal(editor.igDatePicker("value").getTime(), new Date(2017, 0, 11).getTime(), "Value not updated when below min set through datepickerOptions");

	editor.igDatePicker({ datepickerOptions: { maxDate : new Date(2017, 1, 1) } });
	assert.equal(editor.igDatePicker("option", "maxValue").getTime(), new Date(2017, 1, 1).getTime(), "maxValue not set correctly through datepickerOptions");
	assert.equal(editor.datepicker("option", "maxDate").getTime(), new Date(2017, 1, 1).getTime(), "maxDate not set through datepickerOptions");
	

	editor.igDatePicker("value", new Date(2017, 0, 11));
	editor.igDatePicker("option", "minValue", new Date(2017, 0, 12));
	assert.equal(editor.igDatePicker("value").getTime(), new Date(2017, 0, 12).getTime(), "Value not updated when setting minValue after that time.");
	assert.equal(this.input().val(), "1/12/2017 12:00 AM", "Text not updated when setting minValue after that time.");

	this.dropDownButton().click();
	this.calendar().promise().done(function () {
		assert.equal(self.calendar().find("td.ui-datepicker-current-day").text(), "12", "Picker selection not correct");
		
		editor.igDatePicker("option", "minValue", new Date(2017, 0, 13));
		assert.equal(self.input().val(), "01/12/2017 12:00 AM", "Text should not update.");
		assert.equal(self.calendar().find("td.ui-datepicker-current-day").text(), "13", "Picker selection not correct");
		assert.ok(self.calendar().find("td:contains(12)").hasClass("ui-state-disabled"), "MinValue did not update currently visible calendar");
		
		editor.igDatePicker("option", "maxValue", new Date(2017, 0, 30).toLocaleString());
		assert.ok(self.calendar().find("td:contains(31)").hasClass("ui-state-disabled"), "MaxValue did not update currently visible calendar");
		done();
	});
});

QUnit.test('Date Picker onSelect event.', function (assert) {
	assert.expect(2);

	var editor, self = this, done = assert.async(), selectedDate, value, newDate;

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		value: new Date(2015, 11, 12)
	});

	this.dropDownButton().click();
	this.util.wait(100).then(function () {
		selectedDate = $(".ui-datepicker-calendar a.ui-state-default:eq(14)")[0];
		self.util.mouseEvent(selectedDate, "click");
		return self.util.wait(100);
	}).then(function () {
		value = editor.igDatePicker("value"),
		date = new Date(2015, 11, 15);
		assert.equal(value.toString(), date.toString(), "The selected date is not the same.");
		editor.igDatePicker("value","");
		self.dropDownButton().click();
		return self.util.wait(100);
	}).then(function () {
		selectedDate = $("a.ui-state-default:eq(14)")[0];
		self.util.mouseEvent(selectedDate, "click");
		return self.util.wait(100);
	}).then(function () {
		newDate = editor.igDatePicker("value");
		assert.ok(newDate.toString().contains("00:00:00"), "The time is not correct.")
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Apply datepicker options', function (assert) {
	assert.expect(9);
	
	var minDisplayDate, maxDisplayDate, disabledClass, currentDay,
		minDate = new Date(2016, 1, 17), maxDate = new Date(2016, 1, 30),
		newOptions = {minDate : new Date(2016, 1, 17), maxDate : new Date(2016, 1, 30) };

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		datepickerOptions:{
			minDate:new Date(2015, 9, 17),
			maxDate : new Date(2015, 9, 30)
		}
	});

	assert.ok(this.calendarOptions(), "The datepicker options are not set.");

	editor.igDatePicker("option", "datepickerOptions", newOptions);

	minDisplayDate = this.calendarOptions()["minDate"], maxDisplayDate = this.calendarOptions()["maxDate"];
	assert.ok(minDisplayDate.toString() === minDate.toString(), "The minDate option is not set right.");
	assert.ok(maxDisplayDate.toString() === maxDate.toString(), "The maxDate option is not set right.");

	// test mix/max with offset
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		displayTimeOffset: 360,
		dateDisplayFormat: "dateTime",
		dateInputFormat: "dateTime",
		value : new Date("2009-09-07T20:00:00.000Z"),
		datepickerOptions: {
			minDate : new Date("2009-09-07T20:00:00.000Z"),
			maxDate : new Date("2009-09-08T20:00:00.000Z")
		}
	});
	disabledClass = "ui-datepicker-unselectable ui-state-disabled";
	assert.equal(editor.datepicker("option", "minDate").getDate(), 8, "Picker min date should be shifted with the offset");
	assert.equal(editor.datepicker("option", "maxDate").getDate(), 9, "Picker max date should be shifted with the offset");
	this.dropDownButton().click();
	currentDay = $(".ui-datepicker-current-day", this.calendar());
	assert.equal(currentDay.text(), "8", "Current day not corrent");
	assert.ok(currentDay.prev().hasClass(disabledClass), "Previous day not disabled");
	assert.notOk(currentDay.next().hasClass(disabledClass), "Nexy day (9) should be selectable");
	assert.ok(currentDay.next().next().hasClass(disabledClass), "The day of 10th should be disabled");
});

QUnit.test('Apply datepicker options', function (assert) {
	assert.expect(3);

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		value: new Date(2015, 11, 12)
	});
	assert.throws(function () {
		editor.igDatePicker("option", "buttonType", "clear");
	}, "Uncaught Error: The buttonType error is not thrown.");
	assert.throws(function () {
		editor.igDatePicker("option", "buttonType", "spin");
	}, "Uncaught Error: The buttonType error is not thrown.");
	editor.igDatePicker("option", "buttonType", "dropdown");
	assert.equal(editor.igDatePicker("option", "buttonType"), "dropdown", "Previous day not disabled");
});

QUnit.test('Trigger key down, key up', function (assert) {
	assert.expect(3);

	var calendarVisibility;

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker();

	this.dropDownButton().click();
	this.util.keyInteraction(38, this.input());
	assert.ok(editor.igDatePicker("dropDownVisible"), "The dropdown container is not visible.");
	// Use document.activeElement to test focus: https://github.com/ariya/phantomjs/issues/10427
	assert.ok(this.input()[0] === document.activeElement, "Input field not focused on dropDownListOpening");
	this.dropDownButton().click();
	this.util.keyInteraction(40, this.input());
	assert.notOk(editor.igDatePicker("dropDownVisible"),"The dropdown container is visible, but it shouldn't be.");
});

QUnit.test('Trigger onSelect and onClose', function (assert) {
	assert.expect(6);

	var opened, closed, onclose, onselect, selectedDate, itemselected;

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		datepickerOptions: {
			onClose: function (dateText, inst) {
				onclose = true;
			},
			onSelect: function (dateText, inst) {

				onselect = true;
			}
		}
	});
	editor.on("igdatepickerdropdownlistclosed", function () {
		closed = true;
	});
	editor.on("igdatepickeritemselected", function (ev, ui) {
		assert.ok((ui.owner !== undefined &&
			ui.dateFromPicker !== undefined &&
			ui.item instanceof jQuery &&
			ui.calendar instanceof jQuery),
			"itemSelected event is not fired with.");

		itemselected = true;
	});
	editor.on("igdatepickerdropdownlistopened", function () {
		opened = true;
	});

	this.dropDownButton().click();
	selectedDate = $("a.ui-state-default:eq(6)")[0];
	this.util.mouseEvent(selectedDate, "click");
	assert.ok(onselect, "Custom onSelect is not fired.");
	assert.ok(onclose, "Custom onClose is not fired.");
	assert.ok(closed, "dropDownListClosed event is not fired.");
	assert.ok(opened, "dropDownListOpened event is not fired.");
	assert.ok(itemselected, "itemSelected event is not fired.");
});

QUnit.test('Disable igDatePicker', function (assert) {
	assert.expect(10);
	
	var today;

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker();
	editor.igDatePicker("option", "readOnly", true);
	assert.ok(this.dropDownButton().hasClass("ui-state-disabled"), "The igDatePicker is disabled.");

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
	    readOnly: true,
	    dropDownOnReadOnly : true,
		buttonType:"spin, clear"
	});
	assert.notOk(this.dropDownButton().hasClass("ui-state-disabled"), "The igDatePicker is disabled.The DropDownButton is enabled.");
	assert.ok(this.spinUpButton().hasClass("ui-state-disabled"), "The igDatePicker's spinUp button is disabled.");
	assert.ok(this.spinDownButton().hasClass("ui-state-disabled"), "The igDatePicker's spinDown button is disabled.");
	assert.ok(this.clearButton().hasClass("ui-state-disabled"), "The igDatePicker's clear button is disabled.");

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({ 
		readOnly: true,
		dropDownOnReadOnly: false
	});
	assert.ok(editor.igDatePicker("dropDownButton").hasClass("ui-state-disabled"), "Picker should not be enabled in readOnly without dropDownOnReadOnly");

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({ disabled: true });
	assert.ok(this.container().hasClass("ui-state-disabled"), "Editor not disabled");
	assert.ok(this.dropDownButton().hasClass("ui-state-disabled"), "Picker not disabled");

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({ 
		readOnly: true,
		dropDownOnReadOnly: true
	});
	this.dropDownButton().click();
	today = new Date();
	this.calendar().find(".ui-datepicker-today").click();
	assert.equal((today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear(),
		editor.igDatePicker( "displayValue" ),
		"Editor text did not update from readonly selection.");
	today.setHours(0);
	today.setMinutes(0);
	today.setSeconds(0);
	today.setMilliseconds(0);
	assert.equal(editor.igDatePicker("value").getTime(), today.getTime(), "Editor text did not update from readonly selection.");
});

QUnit.test('UTC igDatePicker', function (assert) {
assert.expect(6);

	var editor, today, expectedDate, newDate;

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		buttonType: "spin",
		displayTimeOffset: 0,
		dateDisplayFormat: "time",
		dateInputFormat: "time",
		dataMode: "date"
	});

	editor.igDatePicker("setFocus");
	today = new Date();
	this.input().val("12:12 AM");
	editor.blur();

	expectedDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), 0, 12, today.getSeconds()));
	assert.equal(editor.igDatePicker("value").getDate(), expectedDate.getDate(), "The date is not set");
	assert.equal(editor.igDatePicker("value").getHours(), expectedDate.getHours(), "The hours is not set");
	assert.equal(editor.igDatePicker("value").getMinutes(), expectedDate.getMinutes(), "The minutes is not set");

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		placeHolder: "Select Date...",
		readOnly: false,
		dateInputFormat: "dateTime",
		displayTimeOffset: 0,
		focusOnDropDownOpen: true,
		dataMode: "editModeText",
		value: null,
		tabIndex: 20
	});
	// Bug #212365 - Set value correctly in UTC mode.
	editor.igDatePicker("value", new Date(Date.UTC(2000, 6, 1)));
	newDate = new Date(editor.igDatePicker("value"));
	assert.equal(newDate.getFullYear(), 2000, "Year is not set correctly");
	assert.equal(newDate.getMonth(), 6, "Year is not set correctly");
	assert.equal(newDate.getDate(), 1, "Year is not set correctly");
});

QUnit.test('Check destroy', function (assert) {
assert.expect(4);

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		value: "12/10/2010",
		buttonType: "clear"
	});
	editor.igDatePicker("destroy");
	assert.equal(editor.data("igDatePicker"), undefined, 'Error destroying igDatePicker in an input');
	$._data(editor[0], "events");
	assert.ok(editor.attr("class") === undefined, "Some classes are still not removed");

	this.editor = editor = this.appendToFixture(this.divTag).igDatePicker({
		value: new Date(2015, 11, 12)
	});
	editor.igDatePicker("destroy");
	assert.equal(editor.data("igDatePicker"), undefined, 'Error destroying igDatePicker in an input');
	$._data(editor[0], "events");
	assert.ok(editor.attr("class") === undefined, "Some classes are still not removed");
});

QUnit.test("Test nullValue on initialization", function (assert) {
	assert.expect(4);
	
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({ allowNullValue: false});
	//Get null Value
	assert.equal(editor.igDatePicker("value"), "", "The value is not an empty string");
	//Set null Value
	editor.igDatePicker("value", null);
	assert.equal(editor.igDatePicker("value"), "", "The value is not an empty string");
	//CHange allowNullValue option
	editor.igDatePicker("option", "allowNullValue", true);
	// Get Null value
	assert.equal(editor.igDatePicker("value"), "", "The value is not an empty string");
	//Set Null value
	editor.igDatePicker("value", null);
	//Get null value
	assert.equal(editor.igDatePicker("value"), null, "The value is not an empty string");
});

QUnit.test( 'Clear button state', function (assert) {
assert.expect(2);
	var editor;

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({ buttonType: "clear" });
	assert.notOk(this.clearButton().is(":visible"), "Clear button is not hidden");
	editor.igDatePicker("value", new Date());
	assert.ok(this.clearButton().is(":visible"), "Clear button is not visible");
});

QUnit.test('Testing different dataMode formats', function (assert) {
assert.expect(28);
	var editor;

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		dataMode: "date",
		dateInputFormat: "MM/dd/yyyy", // date
		value: new Date("2016-10-29T22:59:56.0000000Z"),
		displayTimeOffset: 360,
		enableUTCDates: true
	});
	assert.equal(editor.igDatePicker("displayValue"), "10/30/2016", "The display value is not correct");
	assert.equal(this.hiddenInput().val(), "2016-10-29T22:59:56.000Z", "The hidden value sent to server is not correct");
	
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		dataMode: "displayModeText",
		dateInputFormat: "MM/dd/yyyy", // date
		value: new Date("2016-10-29T22:59:56.0000000Z"),
		displayTimeOffset: 360,
		enableUTCDates: true
	});
	assert.equal(editor.igDatePicker("displayValue"), "10/30/2016", "The display value is not correct");
	assert.equal(this.hiddenInput().val(), "10/30/2016", "The hidden value sent to server is not correct");
	
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		dataMode: "date",
		dateInputFormat: "time", // time
		value: new Date("2016-10-29T22:59:56.0000000Z"),
		displayTimeOffset: 360,
		enableUTCDates: true
	});
	assert.equal(editor.igDatePicker("displayValue"), "4:59 AM", "The display value is not correct");
	assert.equal(this.hiddenInput().val(), "2016-10-29T22:59:56.000Z", "The hidden value sent to server is not correct");
	
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		dataMode: "displayModeText",
		dateInputFormat: "time", // time
		value: new Date("2016-10-29T22:59:56.0000000Z"),
		displayTimeOffset: 360,
		enableUTCDates: true
	});
	assert.equal(editor.igDatePicker("displayValue"), "4:59 AM", "The display value is not correct");
	assert.equal(this.hiddenInput().val(), "4:59 AM", "The hidden value sent to server is not correct");
	
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		dataMode: "date",
		dateInputFormat: "timeLong", // timeLong
		value: new Date("2016-10-29T22:59:56.0000000Z"),
		displayTimeOffset: 360,
		enableUTCDates: true
	});
	assert.equal(editor.igDatePicker("displayValue"), "4:59:56 AM", "The display value is not correct");
	assert.equal(this.hiddenInput().val(), "2016-10-29T22:59:56.000Z", "The hidden value sent to server is not correct");
	
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		dataMode: "displayModeText",
		dateInputFormat: "timeLong", // timeLong
		value: new Date("2016-10-29T22:59:56.0000000Z"),
		displayTimeOffset: 360,
		enableUTCDates: true
	});
	assert.equal(editor.igDatePicker("displayValue"), "4:59:56 AM", "The display value is not correct");
	assert.equal(this.hiddenInput().val(), "4:59:56 AM", "The hidden value sent to server is not correct");
	
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		dataMode: "date",
		dateDisplayFormat: "MM/dd/yyyy h:m", // dateTime
		value: new Date("2016-10-29T22:59:56.0000000Z"),
		displayTimeOffset: 360,
		enableUTCDates: true
	});
	assert.equal(editor.igDatePicker("displayValue"), "10/30/2016 4:59", "The display value is not correct");
	assert.equal(this.hiddenInput().val(), "2016-10-29T22:59:56.000Z", "The hidden value sent to server is not correct");

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		dataMode: "displayModeText",
		dateDisplayFormat: "MM/dd/yyyy h:m", // dateTime
		value: new Date("2016-10-29T22:59:56.0000000Z"),
		displayTimeOffset: 360,
		enableUTCDates: true
	});
	assert.equal(editor.igDatePicker("displayValue"), "10/30/2016 4:59", "The display value is not correct");
	assert.equal(this.hiddenInput().val(), "10/30/2016 4:59", "The hidden value sent to server is not correct");
	
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		dataMode: "date",
		dateInputFormat: "MM/dd",
		value: new Date("2016-10-29T22:59:56.0000000Z"),
		displayTimeOffset: 360,
		enableUTCDates: true
	});
	assert.equal(editor.igDatePicker("displayValue"), "10/30", "The display value is not correct");
	assert.equal(this.hiddenInput().val(), "2016-10-29T22:59:56.000Z", "The hidden value sent to server is not correct");
	
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		dataMode: "displayModeText",
		dateInputFormat: "MM/dd",
		value: new Date("2016-10-29T22:59:56.0000000Z"),
		displayTimeOffset: 360,
		enableUTCDates: true
	});
	assert.equal(editor.igDatePicker("displayValue"), "10/30", "The display value is not correct");
	assert.equal(this.hiddenInput().val(), "10/30", "The hidden value sent to server is not correct");
	
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		dataMode: "date",
		dateInputFormat: "H",
		value: new Date("2016-10-29T22:59:56.0000000Z"),
		displayTimeOffset: 360,
		enableUTCDates: true
	});
	assert.equal(editor.igDatePicker("displayValue"), "4", "The display value is not correct");
	assert.equal(this.hiddenInput().val(), "2016-10-29T22:59:56.000Z", "The hidden value sent to server is not correct");
	
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		dataMode: "displayModeText",
		dateInputFormat: "H",
		value: new Date("2016-10-29T22:59:56.0000000Z"),
		displayTimeOffset: 360,
		enableUTCDates: true
	});
	assert.equal(editor.igDatePicker("displayValue"), "4", "The display value is not correct");
	assert.equal(this.hiddenInput().val(), "4", "The hidden value sent to server is not correct");
	
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		dataMode: "date",
		dateInputFormat: "yyyy/MM/dd HH:mm:ss:fff",
		value: new Date("2016-10-29T22:59:56.599Z"),
		displayTimeOffset: 360,
		enableUTCDates: true
	});
	assert.equal(editor.igDatePicker("displayValue"), "2016/10/30 04:59:56:599", "The display value is not correct");
	assert.equal(this.hiddenInput().val(), "2016-10-29T22:59:56.599Z", "The hidden value sent to server is not correct");
	
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		dataMode: "displayModeText",
		dateInputFormat: "yyyy/MM/dd HH:mm:ss:fff",
		value: new Date("2016-10-29T22:59:56.599Z"),
		displayTimeOffset: 360,
		enableUTCDates: true
	});
	assert.equal(editor.igDatePicker("displayValue"), "2016/10/30 04:59:56:599", "The display value is not correct");
	assert.equal(this.hiddenInput().val(), "2016/10/30 04:59:56:599", "The hidden value sent to server is not correct");
});

QUnit.test("Apply different displayTimeOffset on picker display/values", function (assert) {
	assert.expect(16);

	var editor, self = this, done = assert.async(),
		today = new Date(),
		todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())),
		pickerTestOpts = [{
			picker: {
				displayTimeOffset: 240,
				value : new Date("2009-09-07T21:00:00.000Z"),
			},
			date: "9/8/2009",
			day: "8",
			nextDate: "9/9/2009",
			nextValue: "2009-09-08T21:00:00.000Z"
		}, {
			picker: {
				displayTimeOffset: -300,
				value : new Date("2017-01-08T15:00:00.000Z"),
			},
			date: "1/8/2017",
			day: "8",
			nextDate: "1/9/2017",
			nextValue: "2017-01-09T15:00:00.000Z"
		}, {
			picker: {
				displayTimeOffset: -180
			},
			date: "",
			day: "",
			nextDate: (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear(),
			nextValue: todayUTC.toISOString().split("T")[0] + "T03:00:00.000Z"
		}, {
			//#1002: igDatePicker drop down cannot be opened 
			picker: {
				displayTimeOffset: 120,
				dateInputFormat: "dateTime",
				value: new Date("2015-09-10T23:05:10.000Z"),
				dataMode: "editModeText"
			},
			date: "9/11/2015 1:05 AM",
			day: "11",
			nextDate: "9/12/2015 1:05 AM",
			nextValue: "09/12/2015 01:05 AM"
		}],
		testWithOptions = function(opts) {
			var currentDay
			if (!opts) {
				done();
				return;
			}

			self.editor = editor = self.appendToFixture(self.inputTag).igDatePicker(opts.picker);

			assert.equal(editor.igDatePicker("displayValue"), opts.date, "Displayed date should be the " + opts.date + " witn offset");
			self.dropDownButton().click();

			self.util.wait(100).then(function () {
				currentDay = $(".ui-datepicker-current-day", self.calendar());
					
				assert.equal(currentDay.text(), opts.day, "Displayed calendar day not corrent with offset");
				
				if(!currentDay.length) {
					currentDay = $(".ui-datepicker-today", self.calendar());
					currentDay.click();
				} else {
					currentDay.next().click();
				}
				return self.util.wait(100);
			}).then(function () {
				assert.equal(editor.igDatePicker("displayValue"), opts.nextDate, "Displayed day should be the " + opts.nextDate);
				if(opts.picker.dataMode && opts.picker.dataMode !== "date") {
					assert.equal(editor.igDatePicker("value"), opts.nextValue, "Value should match " + opts.nextValue + " in UTC");			
				} else {
					assert.equal(editor.igDatePicker("value").toISOString(), opts.nextValue, "Value should match " + opts.nextValue + " in UTC");				
				}
				testWithOptions(pickerTestOpts.pop());
			}).catch(function (er) {
				assert.pushResult({ result: false, message: er.message });
				done();
				throw er;
			});
		};
		
	testWithOptions(pickerTestOpts.pop());
});

QUnit.test('Test suppressKeyboard option', function (assert) {
assert.expect(17);
	var editor, ddButton;
	
	// Test that the input DOESN'T have focus after the drop down is opened and day is selected
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({ suppressKeyboard: true });
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.dropDownButton().click();
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.calendar().find(".ui-datepicker-today").click();
	assert.notOk(this.input().is(":focus"), "The input should not be focused");

	// Test that the input DOESN'T have focus after the drop down is opened and next month button is pressed
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({ suppressKeyboard: true });
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.dropDownButton().click();
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.calendar().find(".ui-datepicker-next").click();
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.dropDownButton().click();

	// Test that the input DOESN'T have focus after the drop down is opened and next month button is pressed and defined onChangeMonthYear is fired
	var definedOnChangeMonthYearFired = false;
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({ suppressKeyboard: true, datepickerOptions: { onChangeMonthYear: function () { definedOnChangeMonthYearFired = true; }} });
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.dropDownButton().click();
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.calendar().find(".ui-datepicker-next").click();
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	assert.ok(definedOnChangeMonthYearFired, "The defined onChangeMonthYear event should be fired.");
	this.dropDownButton().click();
	delete definedOnChangeMonthYearFired;

	// Test that the input DOESN'T have focus after the drop down is opened (before that the input is focused)
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({ suppressKeyboard: true });
	editor.igDatePicker("setFocus");
	this.dropDownButton().click();
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.input().blur();
	assert.notOk(this.input().is(":focus"), "The input should not be focused");

	// Test that the input DOES have focus after the drop down is opened
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({ suppressKeyboard: false });
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
	this.dropDownButton().click();
	assert.ok(this.input().is(":focus"), "The input should be focused");
	this.calendar().find(".ui-datepicker-today").click();
	assert.ok(this.input().is(":focus"), "The input should be focused");
	this.dropDownButton().click();
	assert.ok(this.input().is(":focus"), "The input should be focused");
	this.input().blur();
	assert.notOk(this.input().is(":focus"), "The input should not be focused");
});

QUnit.test('Spin delta as an object', function (assert) {
assert.expect(22);
	// Test when spinDelta is an object and has invalid values.
	var errorType = $.ig.Editor.locale.spinDeltaIsOfTypeNumberForPeriod,
		errorRange = $.ig.Editor.locale.spinDeltaShouldBeInRange;
	spinData = [ [ { year: -5 }, errorRange, "year", 10 ], [ { month: "two" }, errorType, "month", 12 ],
				[ { day: 31 }, errorRange, "day", 28 ], [ { hours: "five o'clock" }, errorType, "hours", 12 ],
				[ { minutes: 61 }, errorRange, "minutes", 60 ], [ { seconds: null }, errorType, "seconds", 60 ],
				[ { milliseconds: -100 }, errorRange, "milliseconds", 1000 ]];
	for (index = 0; index < spinData.length; index++) {
		assert.throws( function () {
			this.appendToFixture(this.inputTag).igDatePicker({
				spinDelta: spinData[index][0],
				buttonType : "spin"
			});
		}, $.ig.util.stringFormat(spinData[index][1], spinData[index][2], 0, spinData[index][3]));
	}

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		spinDelta: {
			year: 4,
			month: 3,
			day: 10,
			hours: 12,
			minutes: 15,
			seconds: 10,
			milliseconds: 100
		},
		value: new Date("2017-01-11T01:01:01.001Z"),
		displayTimeOffset: 120,
		buttonType : "spin",
		dateInputFormat: "MM/dd/yyyy HH:mm:ss:fff"
	});

	// Spin display mode
	var oldDate = editor.igDatePicker("value").getDate();
	this.util.click(this.spinUpButton());;
	var newDate = editor.igDatePicker("value").getDate();
	assert.equal(oldDate + 10, newDate, "Day is updated with 10");
	this.util.click(this.spinDownButton());
	newDate = editor.igDatePicker("value").getDate();
	assert.equal(oldDate, newDate, "Day is updated with 10");
	this.util.click(this.spinDownButton());
	var newDate = editor.igDatePicker("value").getDate();
	assert.equal(oldDate - 10, newDate, "Day is updated with 10");
	this.util.click(this.spinUpButton());
	var newDate = editor.igDatePicker("value").getDate();
	assert.equal(oldDate, newDate, "Day is updated with 10");

	// Spin up edit mode
	editor.igDatePicker("setFocus");
	editor.data("igDatePicker")._setCursorPosition(0);
	this.util.click(this.spinUpButton());
	editor.data("igDatePicker")._setCursorPosition(3);
	this.util.click(this.spinUpButton());
	editor.data("igDatePicker")._setCursorPosition(6);
	this.util.click(this.spinUpButton());
	editor.data("igDatePicker")._setCursorPosition(12);
	this.util.click(this.spinUpButton());
	editor.data("igDatePicker")._setCursorPosition(15);
	this.util.click(this.spinUpButton());
	editor.data("igDatePicker")._setCursorPosition(18);
	this.util.click(this.spinUpButton());
	editor.data("igDatePicker")._setCursorPosition(21);
	this.util.click(this.spinUpButton());
	editor.trigger("blur");

	expDate = new Date("2021-04-21T13:16:11.101Z"); //Expected date after spin // Date before spin of every period is new Date("2017-01-11T01:01:01.001Z");
	actDate = editor.igDatePicker("value"); //Actual date after spin
	assert.ok(actDate.getTime() === expDate.getTime(), "Date is properly updated after spinining each period");

	// Spin down edit mode
	editor.igDatePicker("setFocus");
	editor.data("igDatePicker")._setCursorPosition(0);
	this.util.click(this.spinDownButton());
	editor.data("igDatePicker")._setCursorPosition(3);
	this.util.click(this.spinDownButton());
	editor.data("igDatePicker")._setCursorPosition(6);
	this.util.click(this.spinDownButton());
	editor.data("igDatePicker")._setCursorPosition(12);
	this.util.click(this.spinDownButton());
	editor.data("igDatePicker")._setCursorPosition(15);
	this.util.click(this.spinDownButton());
	editor.data("igDatePicker")._setCursorPosition(18);
	this.util.click(this.spinDownButton());
	editor.data("igDatePicker")._setCursorPosition(21);
	this.util.click(this.spinDownButton());
	editor.trigger("blur");

	expDate = new Date("2017-01-11T01:01:01.001Z"); //Expected date after spin // Date before spin of every period is new Date("2017-01-11T01:01:01.001Z");
	actDate = editor.igDatePicker("value"); //Actual date after spin
	assert.ok(actDate.getTime() === expDate.getTime(), "Date is properly updated after spinining each period");

	// Setting runtime spinDelta as object
	assert.throws( function () {
		editor.igDatePicker("option", "spinDelta", { day: -3 });
	}, 'Wrong spinDelta value is not thrown');
	assert.equal(editor.igDatePicker("option", "spinDelta").day, 10, "Spin delta should be reverted.");
	assert.equal(editor.igDatePicker("option", "spinDelta").month, 3, "Spin delta should be reverted.");
	
	editor.igDatePicker("option", "spinDelta", { day: 3 });
	// Spin display mode
	var oldDate = editor.igDatePicker("value").getDate();
	this.util.click(this.spinUpButton());
	var newDate = editor.igDatePicker("value").getDate();
	assert.equal(oldDate + 3, newDate, "Day is updated with 3");
	this.util.click(this.spinDownButton());
	newDate = editor.igDatePicker("value").getDate();
	assert.equal(oldDate, newDate, "Day is updated with 3");
	this.util.click(this.spinDownButton());
	var newDate = editor.igDatePicker("value").getDate();
	assert.equal(oldDate - 3, newDate, "Day is updated with 3");
	this.util.click(this.spinUpButton());
	var newDate = editor.igDatePicker("value").getDate();
	assert.equal(oldDate, newDate, "Day is updated with 3");

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		value: new Date(2017, 11, 8),
		dataMode: "date",
		dateInputFormat: "dateTime",
		spinDelta: {
			year: 4,
			month: 3,
			day: 10,
			hours: 12,
			minutes: 15,
			seconds: 10,
			milliseconds: 100
		},
		buttonType: "spin"
	});
	
	// Spin up edit mode
	editor.igDatePicker("setFocus");
	editor.data("igDatePicker")._setCursorPosition(12);
	this.util.click(this.spinUpButton());
	assert.equal(editor.igDatePicker("field").val(), "12/08/2017 12:00 PM", "Display is properly updated after spinining");
	this.util.click(this.spinDownButton());
	assert.equal(editor.igDatePicker("field").val(), "12/08/2017 12:00 AM", "Display is properly updated after spinining");
	editor.trigger("blur").remove();
});

QUnit.test('Spin delta as an object in edit mode with different masks', function (assert) {
assert.expect(28);
	var editor, testDate, ind, today;

	today = new Date();
	testData = [{
		config: {
			dateInputFormat: "fff",
			spinDelta: { milliseconds: 100 }
		},
		expRes: [{
			display: "101", value: 101
		}, {
			display: "001", value: 1
		}],
		method: "getMilliseconds"
	}, {
		config: {
			dateInputFormat: "ss",
			spinDelta: { seconds: 30 }
		},
		expRes: [{
			display: "31", value: 31
		}, {
			display: "01", value: 1
		}],
		method: "getSeconds"
	}, {
		config: {
			dateInputFormat: "mm",
			spinDelta: { minutes: 15 }
		},
		expRes: [{
			display: "16", value: 16
		}, {
			display: "01", value: 1
		}],
		method: "getMinutes"
	}, {
		config: {
			dateInputFormat: "dd",
			spinDelta: { day: 7 }
		},
		expRes: [{
			display: "18", value: 18
		}, {
			display: "11", value: 11
		}],
		method: "getDate"
	}, {
		config: {
			dateInputFormat: "MM",
			spinDelta: { month: 3 }
		},
		expRes: [{
			display: "04", value: 3
		}, {
			display: "01", value: 0
		}],
		method: "getMonth"
	}, {
		config: {
			dateInputFormat: "yy",
			spinDelta: { year: 4 }
		},
		expRes: [{
			display: "21", value: 2021
		}, {
			display: "17", value: 2017
		}],
		method: "getFullYear"
	}, {
		config: {
			dateInputFormat: "yyyy",
			spinDelta: { year: 4 }
		},
		expRes: [{
			display: "2021", value: 2021
		}, {
			display: "2017", value: 2017
		}],
		method: "getFullYear"
	}];

	for (ind = 0; ind < testData.length; ind++) {
		currConfig = { buttonType: "spin", value: new Date("2017-01-11T01:01:01.001Z") };
		currData = testData[ind];
		$.extend(currConfig, currData.config);
		this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker(currConfig);

		// Edit Mode
		editor.igDatePicker("setFocus");
		editor.data("igDatePicker")._setCursorPosition(0);
		this.util.click(this.spinUpButton());
		assert.equal(editor.igDatePicker("field").val(), currData.expRes[0].display, 'The display is not as expected');
		editor.data("igDatePicker")._setCursorPosition(0);
		this.util.click(this.spinDownButton());
		assert.equal(editor.igDatePicker("field").val(), currData.expRes[1].display, 'The display is not as expected');
		editor.trigger("blur")

		// Display Mode
		this.util.click(this.spinUpButton());
		assert.equal(editor.igDatePicker("value")[currData.method](), parseInt(currData.expRes[0].value), 'The value is not as expected');
		this.util.click(this.spinDownButton());
		assert.equal(editor.igDatePicker("value")[currData.method](), parseInt(currData.expRes[1].value), 'The value is not as expected');
	}
});

QUnit.test('Runtime changes for local and regional options', function (assert) {
	assert.expect(18);

	var editor, calendar, calendarTitle, self = this;
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({ dateInputFormat: "dateTime", value: new Date(2017, 7, 18, 18, 6) }),
	checkCalendarTitle = function(title, regional) {
		editor.igDatePicker("showDropDown");

		calendarTitle = self.calendar().find(".ui-datepicker-title").text().replace(String.fromCharCode(160) , " "); //no breaking space
		assert.equal(calendarTitle, title, "Title of the datepicker should be in " + regional);
		editor.igDatePicker("hideDropDown");
	};

	assert.equal(editor.igDatePicker("displayValue"), "8/18/2017 6:06 PM", "Format should be in English");
	assert.equal(this.dropDownButton().attr("title"), $.ig.locale.en.Editor.datePickerButtonTitle, "Title of the button should be in English");
	checkCalendarTitle("August 2017", "English");

	editor.igDatePicker("option", "language", "ja");
	assert.equal(this.dropDownButton().attr("title"), $.ig.locale.ja.Editor.datePickerButtonTitle, "Title of the button should be in Japanese");
	editor.igDatePicker("option", "regional", "ja");
	assert.equal(editor.igDatePicker("displayValue"), "2017/08/18 18:06", "Display Format should be in Japanese");
	editor.igDatePicker("setFocus");
	assert.equal(this.input().val(), "2017/08/18 18:06", "Input Format should be in Japanese");
	checkCalendarTitle("2017年 8月", "Japanese");

	editor.igDatePicker("value", new Date(2017, 9, 18, 18, 6));
	editor.igDatePicker("option", "regional", "de");
	assert.equal(editor.igDatePicker("displayValue"), "18.10.2017 18:06", "Format should be in German");
	editor.igDatePicker("setFocus");
	assert.equal(this.input().val(), "18.10.2017 18:06", "Input Format should be in German");
	checkCalendarTitle("Oktober 2017", "German");

	//custom datepickerOptions with prio:
	editor.igDatePicker("option", "datepickerOptions", { 
		monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'S', 'Oct(custom)', 'Nov', 'Dec'],
	 });
	editor.igDatePicker("option", "regional", "en-US");
	assert.equal(this.input().val(), "10/18/2017 06:06 PM", "Format should be in English");
	checkCalendarTitle("Oct(custom) 2017", "English(custom)");

	// Init datepicker without dateInputFormat or dateDisplayFormat defined
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({ value: new Date(2017, 7, 18, 18, 6) });
	assert.equal(editor.igDatePicker("displayValue"), "8/18/2017", "Format should be in English");
	assert.equal(this.dropDownButton().attr("title"), $.ig.locale.en.Editor.datePickerButtonTitle, "Title of the button should be in English");
	editor.igDatePicker("option", "language", "ja");
	assert.equal(this.dropDownButton().attr("title"), $.ig.locale.ja.Editor.datePickerButtonTitle, "Title of the button should be in Japanese");
	editor.igDatePicker("option", "regional", "ja");
	assert.equal(editor.igDatePicker("displayValue"), "2017/08/18", "Display Format should be in Japanese");
	editor.igDatePicker("setFocus");
	assert.equal(this.input().val(), "2017/08/18", "Input Format should be in Japanese");
	editor.igDatePicker("option", "regional", "en-US");
	assert.equal(this.input().val(), "08/18/2017", "Format should be in English");
});

QUnit.test('displayTimeOffset enabled and setting date from drop down calendar', function (assert) {
assert.expect(6);
	var editor, $ddButton, $input;

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		value: new Date("2017-12-08T00:00:00.000Z"),
		dataMode: "date",
		dateDisplayFormat: "dateTime",
		enableUTCDates: true,
		displayTimeOffset: 0,
		dropDownAnimationDuration: -1
	});

	assert.equal(editor.igDatePicker("displayValue"), "12/8/2017 12:00 AM", "Display value is not correct");
	this.input().blur();
	assert.equal(editor.igDatePicker("displayValue"), "12/8/2017 12:00 AM", "Display value is not correct");
	this.dropDownButton().click();
	$(".ui-datepicker-current-day").next().click();
	this.input().blur();
	assert.equal(editor.igDatePicker("displayValue"), "12/9/2017 12:00 AM", "Display value is not correct");
	editor.remove();

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		value: new Date("2017-12-08T00:00:00.000Z"),
		dataMode: "date",
		dateDisplayFormat: "dateTime",
		enableUTCDates: true,
		displayTimeOffset: 240,
		dropDownAnimationDuration: -1
	});

	assert.equal(editor.igDatePicker("displayValue"), "12/8/2017 4:00 AM", "Display value is not correct");
	this.dropDownButton().click();
	this.dropDownButton().click();
	this.input().blur();
	assert.equal(editor.igDatePicker("displayValue"), "12/8/2017 4:00 AM", "Display value is not correct");
	this.dropDownButton().click();
	$(".ui-datepicker-current-day").next().click();
	this.input().blur();
	assert.equal(editor.igDatePicker("displayValue"), "12/9/2017 4:00 AM", "Display value is not correct");
});
