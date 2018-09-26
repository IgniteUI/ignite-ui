QUnit.module("igEditors Bugs Unit Tests ", {
	divTag: "<div></div>",
	inputTag: "<input/>",
	buttonTag: "<button>",
	textAreaTag: "<textarea>",
	util: $.ig.TestUtil,

	beforeEach: function () { },

	afterEach: function () { },

	getDDmmYYYY: function (date) {
		var result = "", day, month;
		if (typeof date.getTime !== "function") {
			return;
		}
		day = date.getDate();
		if (day < 10) {
			day = "0" + day.toString();
		} else {
			day = day.toString();
		}
		month = date.getMonth() + 1;
		if (month < 10) {
			month = "0" + month.toString();
		} else {
			month = month.toString();
		}
		result += day;
		result += "/";
		result += month;
		result += "/";
		result += date.getFullYear();

		return result;
	},

	getDDmmYYYYHHSS: function (date) {
		var result = "";
		if (typeof date.getTime !== "function") {
			return;
		}

		var result = "", day, month;
		if (typeof date.getTime !== "function") {
			return;
		}
		day = date.getDate();
		if (day < 10) {
			day = "0" + day.toString();
		} else {
			day = day.toString();
		}
		month = date.getMonth() + 1;
		if (month < 10) {
			month = "0" + month.toString();
		} else {
			month = month.toString();
		}
		result += day;
		result += "/";
		result += month;
		result += "/";
		result += date.getFullYear();
		result += " ";
		result += "00";
		result += ":";
		result += "00";

		return result;
	}
});

QUnit.test('Bug 208808', function (assert) {
	assert.expect(2);

	var $editor = this.util.appendToFixture(this.inputTag, { value: "2015/05/01" })
		.igDateEditor({
			dateInputFormat: "yyyy/MM/dd"
		}),
		dd = new Date("2000/05/01"),
		util = this.util,
		done = assert.async();

	$editor.igDateEditor("setFocus");

	this.util.wait(100).then(function () {
		util.type("00000000", $editor.igDateEditor("field"));
		$editor.trigger("blur");
		assert.equal($editor.igDateEditor("field").val(), "2000/05/01", "The display value is changed to '2000/05/01'");
		assert.equal($editor.igDateEditor("value").getTime(), dd.getTime(), "The value is changed to '2000/05/01'");

		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Bug 208036', function (assert) {
	assert.expect(2);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igDatePicker({
			dataMode: 'date',
			dateInputFormat: "dd/MM/yyyy"
		}),
		calendar = $editor.igDatePicker("getCalendar"),
		getDDmmYYYY = this.getDDmmYYYY;

	$editor.one("igdatepickervaluechanged", function (evt, ui) {
		assert.equal(getDDmmYYYY(ui.newValue), getDDmmYYYY(new Date()), "Date should be " + getDDmmYYYY(new Date()));
	});

	$editor.igDatePicker("dropDownButton").click();
	$(calendar).find(".ui-datepicker-today").find("a").click();
	assert.equal($editor.igDatePicker("field").val(), this.getDDmmYYYY(new Date()), "The value is changed to" + this.getDDmmYYYY(new Date()));
});

QUnit.test('Bug 209067', function (assert) {
	assert.expect(4);

	var $textEditorUpper = this.util.appendToFixture(this.inputTag)
		.igTextEditor({
			toUpper: true
		}),
		$textEditorLower = this.util.appendToFixture(this.inputTag)
			.igTextEditor({
				toLower: true
			}),
		$button = this.util.appendToFixture(this.buttonTag).text("click me").click(function () {
			$textEditorUpper.igTextEditor("value", "nwsfsd");
			$textEditorLower.igTextEditor("value", "NWSFSD");
		});

	$button.click();
	assert.equal($textEditorUpper.igTextEditor("field").val(), "NWSFSD", "The display value is changed to NWSFSD");
	assert.equal($textEditorUpper.igTextEditor("value"), "NWSFSD", "The value is changed to NWSFSD");
	assert.equal($textEditorLower.igTextEditor("field").val(), "nwsfsd", "The display value is changed to NWSFSD");
	assert.equal($textEditorLower.igTextEditor("value"), "nwsfsd", "The value is changed to NWSFSD");
});

QUnit.test('Bug 209174', function (assert) {
	assert.expect(4);
	var $textEditor = this.util.appendToFixture(this.inputTag)
		.igTextEditor({
			value: 'Stamen'
		}),
		$textEditorNullable = this.util.appendToFixture(this.inputTag)
			.igTextEditor({
				value: 'Stamen',
				allowNullValue: true
			}),
		$button = this.util.appendToFixture(this.buttonTag).text("click me").click(function () {
			$textEditor.igTextEditor("value", null);
			$textEditorNullable.igTextEditor("value", null);
		});

	$button.click();


	assert.equal($textEditor.igTextEditor("field").val(), "", "The display value is changed to \"\"");
	assert.equal($textEditor.igTextEditor("value"), "", "The value is changed to \"\"");
	assert.equal($textEditorNullable.igTextEditor("field").val(), "", "The display value is changed to \"\"");
	assert.equal($textEditorNullable.igTextEditor("value"), null, "The value is changed to null");
});

QUnit.test('Bug 209912', function (assert) {
	assert.expect(1);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igNumericEditor({
			scientificFormat: "E",
			spinDelta: 10,
			buttonType: "spin"
		}),
		spinDownButton = $editor.igNumericEditor("spinDownButton");

	this.util.click(spinDownButton);
	assert.equal($editor.igNumericEditor("value"), "-1e+1", "The value is not in correct scientific format!");
});

QUnit.test('Bug 209641', function (assert) {
	assert.expect(8);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igNumericEditor({
			negativeSign: "$",
			value: -34
		}),
		$button = this.util.appendToFixture(this.buttonTag).text("Click me").click(function () {
			$editor.igNumericEditor("value", -30);
		});

	assert.equal($editor.igNumericEditor("field").val(), "$34", "The display value is changed to \"\"");
	assert.equal($editor.igNumericEditor("value"), -34, "The value is changed to \"\"");

	$button.click();
	assert.equal($editor.igNumericEditor("field").val(), "$30", "The display value is changed to \"\"");
	assert.equal($editor.igNumericEditor("value"), -30, "The value is changed to null");

	$editor.data("igNumericEditor")._enterEditMode();
	assert.equal($editor.igNumericEditor("field").val(), "$30", "The value is changed to null");

	$editor.igNumericEditor("field").val("$50").blur();
	assert.equal($editor.igNumericEditor("field").val(), "$50", "The display value is changed to \"\"");
	assert.equal($editor.igNumericEditor("value"), -50, "The value is changed to \"\"");
	assert.ok($editor.igNumericEditor("field").hasClass($editor.data("igNumericEditor").css.negative), "the negative class is not correctly applied")
});

QUnit.test('Bug 209696', function (assert) {
	assert.expect(4);

	var $editor1 = this.util.appendToFixture(this.divTag)
		.igDateEditor({
			dateInputFormat: "dd,MM,yyyy hh:m tt",
		}),
		$editor2 = this.util.appendToFixture(this.divTag)
			.igDateEditor({
				dateInputFormat: "dd,MM,yyyy hh:m tt",
			}),
		date1 = new Date(2015, 10, 13, 00, 34),
		date2 = new Date(2015, 10, 13, 12, 34);

	$editor1.igDateEditor("field").focus().val("13,11,2015 12:34 AM").blur();
	assert.equal($editor1.igDateEditor("field").val(), "13,11,2015 12:34 AM", "The display value is changed to 13,11,2015 12:34 AM");
	assert.equal($editor1.igDateEditor("value").getTime(), date1.getTime(), "The value is changed to" + date1);

	$editor2.igDateEditor("field").focus().val("13,11,2015 12:34 PM").blur();
	assert.equal($editor2.igDateEditor("field").val(), "13,11,2015 12:34 PM", "The display value is changed to 13,11,2015 12:34 PM");
	assert.equal($editor2.igDateEditor("value").getTime(), date2.getTime(), "The value is changed to " + date2);
});

QUnit.test('Bug 208809', function (assert) {
	assert.expect(2);

	var $editor = this.util.appendToFixture(this.inputTag).igPercentEditor(),
		field = $editor.igPercentEditor("field");

	field.focus().val("123456789").blur();
	assert.equal(field.val(), "123,456,789.00%", "The value is changed to 123,456,789.00%");

	field.focus();
	assert.equal(field.val(), "123456789", "The value is changed to 123456789");
});

QUnit.test('Bug 208887, 216017', function (assert) {
	assert.expect(7);

	var $editor1 = this.util.appendToFixture(this.inputTag)
		.igDateEditor({
			dateInputFormat: "dd,MM,yyyy hh:m:ss ff tt",
			//dateDispalyFormat: "dd,MM,yyyy hh:m:ss fff tt"
			width: 400
		}),
		$editor2 = this.util.appendToFixture(this.inputTag)
			.igDateEditor({
				dateInputFormat: "dd,MM,yyyy hh:m:ss fff tt",
				//dateDispalyFormat: "dd,MM,yyyy hh:m:ss fff tt"
				width: 400
			}),
		field = $editor1.igDateEditor("field");

	field.focus().val("30,10,2016 10:25:56 12 AM");
	assert.equal(field.val(), "30,10,2016 10:25:56 12 AM", "The value is changed to 30,10,2016 10:25:56 12 AM");

	field.blur();
	assert.equal(field.val(), "30,10,2016 10:25:56 12 AM", "The value is changed to 30,10,2016 10:25:56 12 AM");

	field.focus();
	assert.equal(field.val(), "30,10,2016 10:25:56 12 AM", "The value is changed to 30,10,2016 10:25:56 12 AM");

	field = $editor2.igDateEditor("field")
	field.focus().val("30,10,2016 10:25:56 12_ AM");
	assert.equal(field.val(), "30,10,2016 10:25:56 12_ AM", "The value is changed to 30,10,2016 10:25:56 12 AM");

	field.blur();
	assert.equal(field.val(), "30,10,2016 10:25:56 120 AM", "The value is changed to 30,10,2016 10:25:56 12 AM");

	field.focus();
	assert.equal(field.val(), "30,10,2016 10:25:56 120 AM", "The value is changed to 30,10,2016 10:25:56 12 AM");

	// Bug #216017
	field = $editor1.igDateEditor("field");
	field.focus().val("00,00,0000 00:00:00 00 AM");
	field.blur();
	assert.equal(field.val(), "30,10,2000 12:0:00 00 AM", "The value is changed to 30,10,2016 10:25:56 12 AM");
});

QUnit.test('Bug 209012', function (assert) {
	assert.expect(4);

	var $textEditorUpper = this.util.appendToFixture(this.inputTag)
		.igTextEditor({
			toUpper: true
		}),
		$textEditorLower = this.util.appendToFixture(this.inputTag)
			.igTextEditor({
				toLower: true
			}),
		field = $textEditorUpper.igTextEditor("field");

	field.focus();
	$textEditorUpper.data("igTextEditor")._insert("NewVal1", "");
	assert.equal(field.val(), "NEWVAL1", "The value is changed to NEWVAL1");

	field.blur();
	assert.equal(field.val(), "NEWVAL1", "The value is changed to NEWVAL1");

	field = $textEditorLower.igTextEditor("field")
	field.focus();
	$textEditorLower.data("igTextEditor")._insert("NewVal1", "");
	assert.equal(field.val(), "newval1", "The value is changed to newval1");

	field.blur();
	assert.equal(field.val(), "newval1", "The value is changed to newval1");
});

QUnit.test('Bug 208350', function (assert) {
	assert.expect(7);

	var $dateEditor = this.util.appendToFixture(this.inputTag)
		.igDateEditor({
			dateInputFormat: "dd/MM/yyyy HH:mm:ss",
			enableUTCDates: true
		}),
		$datePickerEditor = this.util.appendToFixture(this.inputTag)
			.igDatePicker({
				enableUTCDates: true,
				dateInputFormat: "dd/MM/yyyy HH:mm:ss"
			}),
		field;

	field = $dateEditor.igDateEditor("field");
	field.focus().val("15/10/2016 10:25:56");
	assert.equal(field.val(), "15/10/2016 10:25:56", "The text is changed to 15/10/2016 10:25:56");

	field.blur();
	assert.equal(field.val(), "15/10/2016 10:25:56", "The value is changed to 15/10/2016 10:25:56");

	field.focus();
	assert.equal($dateEditor.igDateEditor("value").getTime(), new Date(2016, 9, 15, 10, 25, 56).getTime(), "The value is changed to 15/10/2016 10:25:56");
	assert.equal(field.val(), "15/10/2016 10:25:56", "The value is changed to 15/10/2016 10:25:56");

	field = $datePickerEditor.igDatePicker("field");
	field.focus().val("15/10/2016 10:25:56");
	assert.equal(field.val(), "15/10/2016 10:25:56", "The value is changed to 15/10/2016 10:25:56");

	field.blur();
	assert.equal(field.val(), "15/10/2016 10:25:56", "The value is changed to 15/10/2016 10:25:56");

	field.focus();
	assert.equal($datePickerEditor.igDatePicker("value").getTime(), new Date(2016, 9, 15, 10, 25, 56).getTime(), "The value is changed to 1476527156000");
});

QUnit.test('Bug 208356', function (assert) {
	assert.expect(1);

	assert.throws(function () {
		this.util.appendToFixture(this.inputTag).igTextEditor({ buttonType: "dropdown" })
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.noListItemsNoButton) > -1;
	}, $.ig.Editor.locale.noListItemsNoButton + "not shown");
});

QUnit.test('Bug 208448', function (assert) {
	assert.expect(3);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igDatePicker({
			dateInputFormat: "dd/MM/yyyy",
			value: new Date("05/25/2012")
		}),
		field = $editor.igDatePicker("field");

	field.focus();
	assert.equal(field.val(), "25/05/2012", "The text is changed to 25/05/2012");

	$editor.igDatePicker("dropDownButton").click();
	assert.equal(field.val(), "25/05/2012", "The value is changed to 25/05/2012");

	$editor.igDatePicker("dropDownButton").click();
	assert.equal(field.val(), "25/05/2012", "The value is changed to 25/05/2012");
});

QUnit.test('Bug 208264', function (assert) {
	assert.expect(3);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igDateEditor({
			dateInputFormat: "H:m:s",
			dateDisplayFormat: "H:m:ss"
		}),
		field = $editor.igDateEditor("field");

	field.focus();
	$editor.data("igDateEditor")._insert("10:10:_9");
	assert.equal(field.val(), "10:10:_9", "The text is changed to 10:10:9");

	field.blur()
	assert.equal(field.val(), "10:10:09", "The value is changed to 10:10:9");

	field.focus();
	assert.equal(field.val(), "10:10:09", "The value is changed to 25/05/2012");
});

QUnit.test('Bug 210971', function (assert) {
	assert.expect(5);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igTextEditor({
			listItems: ["1", "2", "3", "4", "5", "6"],
			width: 200
		}),
		ddList = $editor.igTextEditor("dropDownContainer"),
		field = $editor.igTextEditor("field"),
		item;

	$editor.igTextEditor("dropDownButton").click();
	assert.equal(field.val(), "", "The text is changed to empty string");

	assert.ok(ddList.is(":visible"), "The dropdown should be visible");

	items = ddList.find(".ui-igedit-listitem");
	assert.ok(items.length == 6, "exist 6");

	$(items[3]).click();
	assert.equal(field.val(), "4", "The text is changed to 4");
	assert.equal($editor.igTextEditor("value"), "4", "The text is changed to 4");
});

QUnit.test('Bug 220479', function (assert) {
	assert.expect(7);

	var $percentEditorvar = this.util.appendToFixture(this.inputTag).igPercentEditor(),
		$currencyEditor1 = this.util.appendToFixture(this.inputTag).igCurrencyEditor(),
		$currencyEditor2 = this.util.appendToFixture(this.inputTag).igCurrencyEditor(),
		field = $currencyEditor1.igCurrencyEditor("field");

	$percentEditorvar.igPercentEditor("insert", "20");
	assert.equal($percentEditorvar.igPercentEditor("field").val(), "20.00%", "The value in the field should be 20.00%");
	assert.equal($percentEditorvar.igPercentEditor("value"), "0.2", "The value in the field should be 0.2");

	field.focus();
	$currencyEditor1.igCurrencyEditor("insert", "20");
	assert.equal(field.val(), "20", "The value in the field should be 20");

	field.blur();
	assert.equal(field.val(), "$20.00", "The value in the field should be $20.00");
	assert.equal($currencyEditor1.igCurrencyEditor("value"), "20", "The value in the field should be 20");

	$currencyEditor2.igCurrencyEditor("insert", "20");
	assert.equal($currencyEditor2.igCurrencyEditor("field").val(), "$20.00", "The value in the field should be $20.00");
	assert.equal($currencyEditor2.igCurrencyEditor("value"), "20", "The value in the field should be 20");
});

QUnit.test('Bug 220479 - 1', function (assert) {
	//#287: Percent/Currency insert method not working with existing value outside edit mode
	// set initial value:
	assert.expect(5);

	var $percentEditorvar = this.util.appendToFixture(this.inputTag).igPercentEditor(),
		field = $percentEditorvar.igPercentEditor("field"),
		util = this.util,
		done = assert.async();

	$percentEditorvar.igPercentEditor("value", "1");
	$percentEditorvar.igPercentEditor("insert", "23");
	assert.equal(field.val(), "23.00%", "The text after insert should be 23.00%");
	assert.strictEqual($percentEditorvar.igPercentEditor("value"), 0.23, "The value after insert should be 0.23");

	field.click().focus();
	this.util.wait(100).then(function () {
		$percentEditorvar.igPercentEditor("insert", "20");
		assert.equal(field.val(), "20", "The value in the field should be 20. Actual - " + field.val());

		field.blur();
		assert.equal(field.val(), "20.00%", "The value in the field should be 20.00%. Actual - " + field.val());
		assert.equal($percentEditorvar.igPercentEditor("value"), "0.2", "The value in the field should be 0.2. Actual: " + $percentEditorvar.igPercentEditor("value"));
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Bug 211010', function (assert) {
	assert.expect(12);

	var $textEditor1 = this.util.appendToFixture(this.inputTag)
		.igTextEditor({
			placeHolder: "Company name",
			readOnly: true
		}),
		$textEditor2 = this.util.appendToFixture(this.inputTag)
			.igTextEditor({
				placeHolder: "Company name",
				readOnly: true,
				dropDownOnReadOnly: true,
				listItems: [1, 2, 3]
			}),
		$numericEditor = this.util.appendToFixture(this.inputTag)
			.igNumericEditor({
				placeHolder: "Company name",
				readOnly: true,
				buttonType: 'clear,spin'
			});

	assert.notOk($textEditor1.igTextEditor("editorContainer").hasClass("ui-state-disabled"), "The ui-state-disabled class should not be applied");
	assert.ok($textEditor1.igTextEditor("field").attr("readonly") !== undefined, "The readonly attribute should  be applied");
	assert.notOk($textEditor2.igTextEditor("editorContainer").hasClass("ui-state-disabled"), "The ui-state-disabled class should not be applied")
	assert.ok($textEditor2.igTextEditor("field").attr("readonly") !== undefined, "The readonly attribute should  be applied")
	assert.notOk($numericEditor.igNumericEditor("editorContainer").hasClass("ui-state-disabled"), "The ui-state-disabled class should not be applied")
	assert.ok($numericEditor.igNumericEditor("field").attr("readonly") !== undefined, "The readonly attribute should not be applied")

	$textEditor1.igTextEditor("option", "disabled", true);
	$textEditor2.igTextEditor("option", "disabled", true);
	$numericEditor.igNumericEditor("option", "disabled", true);

	assert.ok($textEditor1.igTextEditor("editorContainer").hasClass("ui-state-disabled"), "The ui-state-disabled class should not be applied");
	assert.ok($textEditor1.igTextEditor("field").attr("disabled") !== undefined, "The disabled attribute should  be applied");
	assert.notOk($textEditor2.igTextEditor("editorContainer").hasClass("ui-state-disabled"), "The ui-state-disabled class should not be applied")
	assert.ok($textEditor2.igTextEditor("field").attr("disabled") !== undefined, "The disabled attribute should  be applied")
	assert.ok($numericEditor.igNumericEditor("editorContainer").hasClass("ui-state-disabled"), "The ui-state-disabled class should not be applied")
	assert.ok($numericEditor.igNumericEditor("field").attr("disabled") !== undefined, "The disabled attribute should not be applied")
});

QUnit.test('Bug 211062', function (assert) {
	assert.expect(2);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igDatePicker({
			width: "200px",
			dataMode: "date",
			dateInputFormat: "dd/MM/yyyy HH:mm",
			minValue: new Date(2015, 6, 1)
		}),
		calendar,
		targetDate,
		getDDmmYYYYHHSS = this.getDDmmYYYYHHSS;

	$editor.one("igdatepickervaluechanged", function (evt, ui) {
		assert.equal(getDDmmYYYYHHSS(ui.newValue), getDDmmYYYYHHSS(targetDate), "Date should be " + getDDmmYYYYHHSS(targetDate));
	});

	$editor.igDatePicker("dropDownButton").click();
	calendar = $editor.igDatePicker("getCalendar");
	targetDate = new Date(); // keep date as close to the click time
	$(calendar).find(".ui-datepicker-today").find("a").click();
	assert.equal($editor.igDatePicker("field").val(), this.getDDmmYYYYHHSS(targetDate), "The text should've changed to " + this.getDDmmYYYYHHSS(targetDate));
});

QUnit.test('Bug 876', function (assert) {
	// D.P. Updated for  #876:Warning popup is displayed when maxValue date is selected on the dropdown calendar.
	assert.expect(2);

	var todayDate = new Date(),
		$editor,
		done = assert.async();

	todayDate.setHours(0);
	todayDate.setMinutes(0);
	todayDate.setSeconds(0);
	todayDate.setMilliseconds(0);

	$editor = this.util.appendToFixture(this.inputTag)
		.igDatePicker({
			maxValue: todayDate,
			dateDisplayFormat: "yy/MM/dd dddd"
		});

	$editor.igDatePicker("dropDownButton").click();

	this.util.wait(400).then(function () { //This timeout is need because the test requires calendar which needs focus
		$editor.igDatePicker("getCalendar").find(".ui-datepicker-today").find("a").click();
		assert.equal($editor.igDatePicker("value").getTime(), todayDate.getTime(), "Max value not selected");
		assert.notOk($editor.igDatePicker("editorContainer").hasClass($.ui.igNotifier.prototype.css.warningState), "Warning message should not be shown");
		$editor.remove();
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Bug 210990', function (assert) {
	assert.expect(3);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igMaskEditor({
			inputMask: '000-000-0000',
			width: 300
		});

	$editor.igMaskEditor("value", "");
	assert.equal($editor.igMaskEditor("field").val(), "", "The text is changed to an empty string");

	$editor.igMaskEditor("field").focus();
	assert.equal($editor.igMaskEditor("field").val(), $editor.data("igMaskEditor")._maskWithPrompts, "The text is changed to 4");
	assert.equal($editor.igMaskEditor("value"), "", "The text is changed to to an empty string");
});

QUnit.test('Bug 210106', function (assert) {
	assert.expect(1);

	assert.throws(function () {
		this.util.appendToFixture(this.inputTag)
			.igPercentEditor({
				displayFactor: 100,
				dataMode: "int"
			});
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.spinDeltaIncorrectFloatingPoint) > -1;
	}, $.ig.Editor.locale.spinDeltaIncorrectFloatingPoint + "not shown");
});

QUnit.test('Bug 208274', function (assert) {
	assert.expect(2);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igDateEditor({
			buttonType: "spin",
			dateInputFormat: "HH:mm:ss",
		}),
		field = $editor.igDateEditor("field");

	field.focus();
	$editor.data("igDateEditor")._insert("20:01:05");
	field.blur();
	assert.equal(field.val(), "20:01:05", "The text is changed to 20:01:05");

	field.focus();
	assert.equal(field.val(), "20:01:05", "The value is changed to 20:01:05");
});

QUnit.test('Bug 207546', function (assert) {
	assert.expect(2);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igDatePicker().on("igdatepickervaluechanged", function (evt, ui) {
			flag = false;
		}),
		$button = this.util.appendToFixture(this.buttonTag).text("Click Me"),
		flag = true,
		done = assert.async(),
		util = this.util,
		waidDuration = 20 + ($editor.igDatePicker("option", "dropDownAnimationDuration") || 600 /*normal*/);

	$editor.igDatePicker("dropDownButton").click();
	this.util.wait(waidDuration + 100).then(function () {
		// datepicker handles mousedown for external click detection:
		$button.mousedown().mouseup().click();

		return util.wait(waidDuration);
	}).then(function () {

		// wait for animation (show + hide...) :
		assert.notOk($editor.igDatePicker("getCalendar").is(":visible"), "Calendar should be hidden");
		assert.ok(flag, "Value changed should not be fired.");

		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Bug 207321', function (assert) {
	assert.expect(1);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igMaskEditor(
		{
			value: "value1"
		});

	$editor.igMaskEditor("field").focus();
	$editor.data("igMaskEditor")._handleDeleteKey();
	assert.equal($editor.data("igMaskEditor")._getCursorPosition(), 10, "the cursor should be on position 10");
});

QUnit.test('Bug 211575', function (assert) {
	assert.expect(1);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igDateEditor({
			dataMode: 'editModeText',
			dateDisplayFormat: 'yyyy/MM/dd',
			dateInputFormat: 'yyyy/MM/dd'
		});

	$editor.igDateEditor("field").focus();
	$editor.data("igDateEditor")._insert("2015/10/10");
	$editor.igDateEditor("field").blur()
	assert.equal($editor.data("igDateEditor")._valueInput.val(), "2015/10/10", "The value is changed to 2015/10/10");
});

QUnit.test('Bug 212596', function (assert) {
	assert.expect(3);

	var $numericEditor = this.util.appendToFixture(this.inputTag).igNumericEditor(),
		$maskEditor = this.util.appendToFixture(this.inputTag)
			.igMaskEditor({
				inputMask: "CC//CC"
			}),
		$dateEditor = this.util.appendToFixture(this.inputTag)
			.igDateEditor({
				value: new Date()
			}),
		field;

	field = $numericEditor.igNumericEditor("field");
	field.focus();
	$numericEditor.data("igNumericEditor")._enterEditMode();
	$numericEditor.igNumericEditor("value", "1234");
	assert.equal(field.val(), "1234", "The value in edit mode should be 1234. It's: " + field.val());

	$maskEditor.data("igMaskEditor")._enterEditMode();
	$maskEditor.igMaskEditor("value", "abcd");
	assert.equal($maskEditor.igMaskEditor("field").val(), "ab//cd", "The value in edit mode should be ab//cd");

	$dateEditor.data("igDateEditor")._enterEditMode();
	$dateEditor.igDateEditor("value", "2002/10/10");
	assert.equal($dateEditor.igDateEditor("field").val(), "10/10/2002", "The value in edit mode should be \"10/10/2002\". It is: " + $dateEditor.igDateEditor("field").val());
});

QUnit.test('Bug 212374', function (assert) {
	assert.expect(3);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igTextEditor({
			buttonType: "dropdown",
			listItems: [
				"item 1",
				"item 2",
				"item 3"
			]
		}),
		list;

	$editor.igTextEditor("selectedListIndex", 0);
	$editor.igTextEditor("option", "listItems", ["item 4", "item 5", "item 6"]);
	list = $editor.data("igTextEditor")._dropDownList;
	assert.equal($(list.find("span")[0]).text(), "item 4", "The first item should be item 4");
	assert.ok($editor.data("igTextEditor")._dropDownButton.is(":visible"), "The button is rerendered");
	assert.equal($editor.data("igTextEditor")._editorInput.val(), "", "The value should be cleared");
});

QUnit.test('Bug 212642', function (assert) {
	assert.expect(2);
	var $editor = this.util.appendToFixture(this.inputTag, { value: "2015/05/01" })
		.igDateEditor({
			dateInputFormat: "yyyy/MM/dd"
		}),
		field = $editor.igDateEditor("field");

	$editor.data("igDateEditor")._enterEditMode();
	field.val("_111/10/10");
	field.blur();
	assert.equal(field.val(), "111/10/10", "The value should be \"111/10/10\"");
	$editor.data("igDateEditor")._enterEditMode();
	assert.equal(field.val(), "0111/10/10", "The value should be \"111/10/10\"");
});

QUnit.test('Bug 217214', function (assert) {
	assert.expect(1);

	var $editor = this.util.appendToFixture(this.inputTag).igNumericEditor();
	$editor.data("igNumericEditor")._insert("69", "");

	//assert.ok(.hasClass("ui-igedit-dropdown-orientation-bottom"), "The dropDownContainer should be with ui-igedit-dropdown-orientation-bottom class applied");
	assert.equal($editor.igNumericEditor("field").val(), "69", "The value in the field should be 69");

});

QUnit.test('Bug 216789', function (assert) {
	assert.expect(3);

	var $editor1 = this.util.appendToFixture(this.inputTag)
		.igTextEditor({
			includeKeys: '12345'
		}),
		$editor2 = this.util.appendToFixture(this.inputTag)
			.igTextEditor({
				excludeKeys: '12345'
			}),
		$editor3 = this.util.appendToFixture(this.inputTag)
			.igTextEditor({
				includeKeys: '12345',
				excludeKeys: '23'
			});

	$editor1.igTextEditor("field").focus();
	$editor1.data("igTextEditor")._insert("1a2b3c4d5e6f7g8h9i0", "");
	$editor2.igTextEditor("field").focus();
	$editor2.data("igTextEditor")._insert("1a2b3c4d5e6f7g8h9i0", "");
	$editor3.igTextEditor("field").focus();
	$editor3.data("igTextEditor")._insert("1a2b3c4d5e6f7g8h9i0", "");

	//assert.ok(.hasClass("ui-igedit-dropdown-orientation-bottom"), "The dropDownContainer should be with ui-igedit-dropdown-orientation-bottom class applied");
	assert.equal($editor1.igTextEditor("field").val(), "12345", "The value in the field should be 12345");
	assert.equal($editor2.igTextEditor("field").val(), "abcde6f7g8h9i0", "The value in the field should be abcde6f7g8h9i0");
	assert.equal($editor3.igTextEditor("field").val(), "145", "The value in the field should be 145");

});

QUnit.test('Bug 218836', function (assert) {
	assert.expect(3);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igMaskEditor({
			inputMask: '(000) 000-0000',
			dataMode: 'rawTextWithRequiredPromptsAndLiterals',
			keypress: function (evt, ui) {
				if (ui.originalEvent.keyCode == 13) {
					$('#work_nbr').igMaskEditor("value", "1111111111");
				}
				return false;
			}
		}),
		field;

	field = $editor.igMaskEditor("field");
	field.focus();
	$editor.igMaskEditor("value", "1111111111");
	assert.equal(field.val(), "(111) 111-1111", "The value in the field should be (111) 111-1111");

	field.blur();
	assert.equal(field.val(), "(111) 111-1111", "The value in the field should be (111) 111-1111");
	assert.equal($editor.igMaskEditor("value"), "(111) 111-1111", "The value in the field should be (111) 111-1111");
});

QUnit.test('Bug 218752', function (assert) {
	assert.expect(4);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igDateEditor({
			width: 120,
			dateInputFormat: 'yyyy/MM/dd',
			value: "2016/01/30",
		}),
		valueDate,
		field = $editor.igDateEditor("field");

	field.focus();
	field.val("2016/02/10");
	field.blur();
	assert.equal(field.val(), "2016/02/10", "The value in the field should be 2016/02/10");
	valueDate = $editor.igDateEditor("value");

	assert.equal(valueDate.getFullYear(), 2016, "The year in the field should be 2016");
	assert.equal(valueDate.getMonth(), 1, "The month in the field should be 1");
	assert.equal(valueDate.getDate(), 10, "The value in the field should be 10");
});

QUnit.test('Bug 220712 - typed text is reverted to previous value in case the drop down is opened', function (assert) {
	assert.expect(1);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igTextEditor({
			listItems: [1, 2, 3, 4]
		}),
		field = $editor.igTextEditor("field");

	// focus editor and set value
	field.click().focus();
	field.val("text");

	//open dropdown
	$editor.igTextEditor("dropDownButton").click();
	assert.equal(field.val(), "text", "Opening dropdown caused the entered text to be reverted");
});

QUnit.test('Bug 221118', function (assert) {
	assert.expect(2);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igNumericEditor({
			listItems: [1, 2, 3, 4],
			value: 2
		}),
		field = $editor.igNumericEditor("field"),
		ddBtn = $editor.igNumericEditor("dropDownButton"),
		item = $editor.data("igNumericEditor")._getListItemByIndex(0);

	ddBtn.click();
	this.util.keyInteraction(40, field); //down
	assert.equal($editor.igNumericEditor("value"), 2, "The value should stay unchanged");

	this.util.keyInteraction(13, field);
	assert.equal($editor.igNumericEditor("value"), 3, "The value 1 should be selected");
});

QUnit.test('Bug 221494', function (assert) {
	assert.expect(1);

	var editorId = "EditorId",
		$editor = this.util.appendToFixture(this.textAreaTag, { id: editorId })
			.igTextEditor({
				textMode: "multiline"
			});

	assert.equal($editor.igTextEditor("field").attr("id"), editorId, "The input id should be the defined one");
});

QUnit.test('Bug 221300', function (assert) {
	assert.expect(4);

	var $editor = this.util.appendToFixture(this.textAreaTag)
		.igTextEditor({
			width: "145px",
			height: "54px",
			value: "John Smith, with long test",
			textMode: "multiline"
		}),
		field = $editor.igTextEditor("field"),
		value;

	field.click().focus();
	field[0].setSelectionRange(6, 6);
	this.util.keyInteraction(13, field);
	field.blur();
	value = $editor.igTextEditor("value");
	assert.equal(value, "John S\nmith, with long test", "Word is not carried over the new line");
	assert.equal($editor.igTextEditor("getSelectionStart"), 7, "Cursor position is wrong");

	field.click().focus();

	field[0].setSelectionRange(10, 10);
	this.util.keyInteraction(13, field);
	field.blur();
	value = $editor.igTextEditor("value");
	assert.equal(value, "John S\nmit\nh, with long test", "Word is not carried over the new line");
	assert.equal($editor.igTextEditor("getSelectionStart"), 11, "Cursor position is wrong");
});

QUnit.test('Bug 98', function (assert) {
	assert.expect(2);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igNumericEditor({
			maxValue: 5,
			minValue: 3
		}),
		field = $editor.igNumericEditor("field"),
		text,
		util = this.util,
		done = assert.async();

	$editor.igNumericEditor("setFocus");

	this.util.wait(100).then(function () {
		util.type("26", field);
		util.keyInteraction(13, field);
		text = field.val();
		assert.equal(text, 5, "Text in editor is not set to the maxValue");

		$editor.select();
		util.type("1", field);
		util.keyInteraction(13, field);
		text = field.val();
		assert.equal(text, 3, "Text in editor is not set to the minValue");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Bug 223245', function (assert) {
	assert.expect(6);

	var $numericEditor1 = this.util.appendToFixture(this.inputTag)
		.igNumericEditor({
			dataMode: "int",
			value: 60,
			allowNullValue: true,
			nullValue: ""
		}),
		$numericEditor2 = this.util.appendToFixture(this.inputTag)
			.igNumericEditor({
				dataMode: "int",
				value: 10,
				allowNullValue: false, //expected to set to minValue
				minValue: 5
			}),
		$numericEditor3 = this.util.appendToFixture(this.inputTag)
			.igNumericEditor({
				dataMode: "int",
				value: 70,
				allowNullValue: true, //expected to set to minValue if input between 1-4
				minValue: 5
			}),
		$percentEditor1 = this.util.appendToFixture(this.inputTag)
			.igPercentEditor({
				value: 0.60,
				allowNullValue: true,
				nullValue: ""
			}),
		$percentEditor2 = this.util.appendToFixture(this.inputTag)
			.igPercentEditor({
				value: 0.10,
				allowNullValue: false, //expected to set to 
				nullValue: ""
			}),
		$percentEditor3 = this.util.appendToFixture(this.inputTag)
			.igPercentEditor({
				value: 0.70,
				allowNullValue: true, //expected to set to minValue if input if less than 30
				nullValue: "",
				minValue: 0.3
			}),
		value,
		util = this.util,
		done = assert.async();

	$percentEditor1.igPercentEditor("setFocus");

	this.util.wait(100).then(function () {
		$percentEditor1.data("igPercentEditor")._insert("");
		util.keyInteraction(13, $percentEditor1);
		value = $percentEditor1.igPercentEditor("value");
		assert.equal(value, "", "igPercentEditor is not set to empty string value when allwNullValue : true");

		$percentEditor2.igPercentEditor("setFocus");

		return util.wait(100);
	}).then(function () {
		$percentEditor2.data("igPercentEditor")._insert("");
		util.keyInteraction(13, $percentEditor2);
		value = $percentEditor2.igPercentEditor("value");
		assert.equal(value, 0, "igPercentEditor is not set to 0 value when allwNullValue : false");

		$percentEditor3.igPercentEditor("setFocus");

		return util.wait(100);
	}).then(function () {
		util.type("20", $percentEditor3.igPercentEditor("field"));
		util.keyInteraction(13, $percentEditor3);
		value = $percentEditor3.igPercentEditor("value");
		assert.equal(value, 0.3, "igPercentEditor is not set to minValue");

		$numericEditor1.igNumericEditor("setFocus");

		return util.wait(100);
	}).then(function () {
		$numericEditor1.igNumericEditor("value", "");
		util.keyInteraction(13, $numericEditor1);
		value = $numericEditor1.igNumericEditor("value");
		assert.equal(value, "", "igNumericEditor is not set to empty string value when allwNullValue : true");

		$numericEditor2.igNumericEditor("setFocus");

		return util.wait(100);
	}).then(function () {
		$numericEditor2.data("igNumericEditor")._insert("");
		util.keyInteraction(13, $numericEditor2);
		value = $numericEditor2.igNumericEditor("value");
		assert.equal(value, 5, "igNumericEditor is not set to minValue when allwNullValue : false");

		$numericEditor3.igNumericEditor("setFocus");

		return util.wait(100);
	}).then(function () {
		$numericEditor3.data("igNumericEditor")._insert(3);
		util.keyInteraction(13, $numericEditor3);
		value = $numericEditor3.igNumericEditor("value");
		assert.equal(value, 5, "igNumericEditor is not set to minValue");

		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Bug 264', function (assert) {
	assert.expect(2);

	var $editor1 = this.util.appendToFixture(this.inputTag)
		.igMaskEditor({
			inputMask: "00-0L/>aa(test)"
		}),
		$editor2 = this.util.appendToFixture(this.inputTag)
			.igMaskEditor({
				inputMask: 'Aaa\\>L/>aa'
			}),
		util = this.util,
		done = assert.async(),
		text;

	$editor1.trigger("focus");

	this.util.wait(100).then(function () {
		util.type("555a", $editor1.igMaskEditor("field"));
		$editor1.blur();
		text = $editor1.igMaskEditor("field").val();
		assert.equal(text, "55-5a/(test)", "MaskEditor did not accept value with required positions filled");

		$editor2.trigger("focus");

		return util.wait(100);
	}).then(function () {
		util.type("123d", $editor2.igMaskEditor("field"));
		$editor2.blur();
		text = $editor2.igMaskEditor("field").val();
		assert.equal(text, "123>d/", "MaskEditor did not accept value with required positions filled");

		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Bug 226', function (assert) {
	assert.expect(2);
	var $editor = this.util.appendToFixture(this.inputTag)
		.igTextEditor(),
		field = $editor.igTextEditor("field"),
		util = this.util,
		done = assert.async();

	$editor.trigger("focus");

	this.util.wait(100).then(function () {
		field.val("some text")
		$editor.trigger("focus");

		return util.wait(100);
	}).then(function () {
		$editor.trigger("focus");
		// verify focus won't reset the text or update value without a blur
		assert.equal(field.val(), "some text", "Text field did not retain text with consecutive focus events");
		assert.equal($editor.igTextEditor("value"), "", "Text editor updated its value without exiting edit mode!");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Bug 487.', function (assert) {
	assert.expect(2);

	var editorId = "EditorId",
		initialValue = "myInputValue",
		$editor = this.util.appendToFixture(this.inputTag, {
			value: initialValue,
			id: editorId
		}).igTextEditor({
			value: "newInputValue"
		});

	$editor.igTextEditor("destroy");

	//check the value prop and see if it is restored
	assert.equal(document.getElementById(editorId).value, initialValue, 'Input value is not the same as before Editor init');

	//check the value attribute and see if it is restored
	assert.equal(document.getElementById(editorId).getAttribute("value"), initialValue, 'Input value attr is not the same as before Editor init');
});

QUnit.test('Bug 446 - TextEditor doesnt trigger valueChange after clearing', function (assert) {
	assert.expect(6);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igTextEditor({
			buttonType: "clear",
			value: "has value"
		}),
		field = $editor.igTextEditor("field"),
		clearButton = $editor.igTextEditor("clearButton"),
		textChanged = 0,
		valueChanged = 0,
		done = assert.async();

	$editor.on("igtexteditortextchanged", function () {
		textChanged++;
	}).on("igtexteditorvaluechanged", function () {
		valueChanged++;
	});

	$editor.igTextEditor("setFocus");

	this.util.wait(100).then(function () {
		clearButton.click();
		assert.equal($editor.igTextEditor("value"), "has value", "Value changed in edit mode clear");
		assert.equal(textChanged, 1, "textChanged not triggered");
		assert.equal(valueChanged, 0, "valueChanged triggered in edit mode");
		field.blur();

		assert.equal(valueChanged, 1, "valueChanged not triggered on when exiting edit mode");

		// test clear without focusing
		$editor.igTextEditor("value", "text");
		clearButton.click();
		assert.equal(textChanged, 2, "textChanged not triggered on clear");
		assert.equal(valueChanged, 2, "valueChanged not triggered on clear");

		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Bug 539 - If min/max value is set to 0 and the entered value is invalid, the editors value is not reverted', function (assert) {
	assert.expect(4);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igNumericEditor({
			minValue: 0,
			maxValue: 10
		}),
		field = $editor.igNumericEditor("field"),
		value,
		util = this.util,
		done = assert.async();


	//test input interaction
	$editor.igNumericEditor("setFocus");

	this.util.wait(100).then(function () {
		util.type("-1", field);
		util.keyInteraction(13, field);
		field.blur();
		value = $editor.igNumericEditor("value");
		assert.equal(value, 0, "minValue 0 should be set");

		$editor.igNumericEditor("option", "minValue", -5);
		$editor.igNumericEditor("option", "maxValue", 0);
		util.type("1", field);
		util.keyInteraction(13, field);
		field.blur();
		value = $editor.igNumericEditor("value");
		assert.equal(value, 0, "maxValue 0 should be set");

		//test public value method	
		$editor.igNumericEditor("option", "value", 1);
		assert.equal($editor.igNumericEditor("value"), 0, "maxValue 0 should be set(value method)");

		$editor.igNumericEditor("option", "minValue", 0);
		$editor.igNumericEditor("option", "maxValue", 10);
		$editor.igNumericEditor("option", "value", -1);
		assert.equal($editor.igNumericEditor("value"), 0, "minValue 0 should be set(value method)");

		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Bug 646 - Set null value using setOption', function (assert) {
	assert.expect(2);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igNumericEditor({
			allowNullValue: false,
			value: 20
		});

	assert.equal($editor.igNumericEditor("value"), 20, "value should be 20");

	$editor.igNumericEditor("option", 'value', null);
	assert.equal($editor.igNumericEditor("value"), 20, "value should be 20");
	$("#646Editor").remove();
});

QUnit.test('Bug 655 - [igMaskEditor] Clearing the displayed value using the clear button is not possible after setting the value to null', function (assert) {
	assert.expect(6);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igMaskEditor({
			buttonType: "clear",
			allowNullValue: true
		}),
		field = $editor.igMaskEditor("field"),
		clearButton = $editor.igMaskEditor("clearButton"),
		util = this.util,
		done = assert.async();

	//test input interaction
	$editor.igMaskEditor("setFocus");

	this.util.wait(100).then(function () {
		util.type("test", field);
		field.blur();
		assert.equal($editor.igMaskEditor("value"), "test", "Value did not update");

		$editor.igMaskEditor("value", null);
		assert.strictEqual($editor.igMaskEditor("value"), null, "Value did not set to null");
		assert.equal(field.val(), "", "Displayed text is not empty after setting null value");

		$editor.igMaskEditor("value", "text2");
		assert.equal(field.val(), "text2", "Displayed text is not set");

		clearButton.click();
		assert.strictEqual($editor.igMaskEditor("value"), null, "Value did not set to null");
		assert.equal(field.val(), "", "Displayed text is not empty after clearing value");

		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Bug 695 - Check ', function (assert) {
	assert.expect(2);
	var $editor = this.util.appendToFixture(this.inputTag)
		.igPercentEditor({
			allowNullValue: true,
			nullValue: "",
			regional: 'de',
			value: 0.029
		});

	assert.equal($editor.igPercentEditor("field").focus().blur().val(), "2,90%", "value should be to 2,90%"); //fails prior fix with 2.900,00%
	assert.equal($editor.igPercentEditor("value"), 0.029, "value should be 0.029"); //fails prior fix and returns 29 instead
});

QUnit.test('Bug 809 - Wrong value is set when we have isLimitedToListValues: true and revertIfNotValid: false', function (assert) {
	assert.expect(5);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igNumericEditor({
			buttonType: "dropdown",
			listItems: [3, 4, 5],
			isLimitedToListValues: true,
			revertIfNotValid: false,
			allowNullValue: false
		}),
		input = $editor.igNumericEditor("field");

	$editor.focus();
	this.util.keyInteraction(38, input); //Arrow Up
	input.val("");
	$editor.blur();
	assert.equal($editor.igNumericEditor("value"), "", "Value should be empty string");

	$editor.igNumericEditor("option", "allowNullValue", "true");
	$editor.focus();
	this.util.keyInteraction(38, input); //Arrow Up
	this.util.keyInteraction(13, input);

	//input.val(null);
	$editor.igNumericEditor("value", null), $editor.blur();
	assert.equal($editor.igNumericEditor("value"), null, "Value should be null when allowNullValue=true");

	$editor.igNumericEditor("option", "allowNullValue", "false");
	$editor.igNumericEditor("option", "revertIfNotValid", "true");
	$editor.focus();
	this.util.keyInteraction(38, input); //Arrow Up
	$editor.blur();
	assert.equal($editor.igNumericEditor("value"), 3, "Value should revert to 3 ");

	$editor.focus().val(55);
	$editor.blur();
	assert.equal($editor.igNumericEditor("value"), 3, "Value should revert to 3 ");
	assert.ok($editor.igNumericEditor("editorContainer").hasClass($.ui.igNotifier.prototype.css.warningState), "There should be warning notification");
});

QUnit.test('Bug 942 - When clearing with the "clear" button, the value is set to 0 even if 0 is not in the list of items ', function (assert) {
	assert.expect(4);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igNumericEditor({
			buttonType: "clear",
			listItems: [3, 4, 5],
			isLimitedToListValues: true,
			revertIfNotValid: false,
			value: 3
		}),
		field = $editor.igNumericEditor("field"),
		clearButton = $editor.igNumericEditor("clearButton"),
		done = assert.async();

	$editor.igNumericEditor("setFocus");


	this.util.wait(100).then(function () {
		assert.equal(field.val(), 3, 'input value should init with value of 3');

		clearButton.click();
		assert.equal(field.val(), "", 'input value is not set to ""');//Prior the fix- the value was set to 0 even if zero is not in the list of items.

		// test clear without focusing
		$editor.igNumericEditor("value", 4);
		clearButton.click();
		assert.equal(field.val(), "", 'input value is not set to ""');

		// test clear with invalid list item value
		$editor.igNumericEditor("value", 666);
		clearButton.click();
		assert.equal(field.val(), "", 'input value is not set to ""');

		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Bug 1027 Exception is thrown when typing due to incorrect value/nullValue on init', function (assert) {
	assert.expect(7);
	var $editor = this.util.appendToFixture(this.inputTag)
		.igMaskEditor({
			inputMask: "9900",
			value: "abc" //should be numerics
		});

	// value not matching mask (fails validation)
	$editor.trigger("focus").select();
	try {
		this.util.keyInteraction(49, $editor);
		this.util.keyInteraction(50, $editor);
		this.util.keyInteraction(51, $editor);
		assert.ok(true);
	} catch (error) {
		assert.ok(false, "(wrong value) Typing caused an exception: " + error.message);
	}

	assert.equal($editor.val(), "123_", "(wrong value) Typing did not update Edit text.");
	$editor.remove();

	// nullValue not matching mask (fails validation)
	$editor = this.util.appendToFixture(this.inputTag)
		.igMaskEditor({
			inputMask: "AA??",
			allowNullValue: true,
			nullValue: "#5a" //wrong first char
		});
	$editor.trigger("focus").select();
	try {
		this.util.keyInteraction(97, $editor);
		this.util.keyInteraction(98, $editor);
		this.util.keyInteraction(99, $editor);
		assert.ok(true);
	} catch (error) {
		assert.ok(false, "(wrong nullValue) Typing caused an exception: " + error.message);
	}
	assert.equal($editor.val(), "abc_", "(wrong nullValue) Typing did not update Edit text.");
	$editor.remove();

	// nullValue not a string
	$editor = this.util.appendToFixture(this.inputTag)
		.igMaskEditor({
			allowNullValue: true,
			nullValue: 0
		});
	assert.equal($editor.val(), "0", "Null value not applied on Display text.")
	$editor.trigger("focus").select();
	try {
		this.util.keyInteraction(49, $editor);
		this.util.keyInteraction(50, $editor);
		this.util.keyInteraction(51, $editor);
		assert.ok(true);
	} catch (error) {
		assert.ok(false, "(numeric nullValue) Typing caused an exception: " + error.message);
	}
	assert.equal($editor.val(), "123_______", "(numeric nullValue) Typing did not update Edit text.");
});

QUnit.test('Bug 1090', function (assert) {
	assert.expect(3);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igTextEditor({
			textMode: "multiline",
			height: "100px"
		}),
		field = $editor.igTextEditor("field"),
		text = "add some text",
		done = assert.async();

	this.util.type(text, field);
	this.util.keyInteraction(13, field);

	this.util.wait(100).then(function () {
		var inputSelection = $editor.igTextEditor("getSelectedText"),
			selectionStart = $editor.igTextEditor("getSelectionStart"),
			selectionEnd = $editor.igTextEditor("getSelectionEnd");

		assert.equal(field.val(), text, 'the text is not set');
		assert.equal(selectionStart, selectionEnd, 'there is selection but should not be');
		assert.equal("", inputSelection, 'there is selected text but should not be');

		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Bug 1043 - maxLength not respected on Android', function (assert) {
	assert.expect(6);

	var $editor = this.util.appendToFixture(this.inputTag)
		.igTextEditor({
			maxLength: 5
		}),
		$field = $editor.igTextEditor("field"),
		$container = $editor.igTextEditor("editorContainer"),
		composition,
		compositionend,
		util = this.util,
		done = assert.async();

	$field.focus();
	composition = jQuery.Event("compositionstart");
	$field.trigger(composition);
	$field.val("12345678");
	compositionend = jQuery.Event("compositionend");
	$field.trigger(compositionend);

	this.util.wait(0).then(function () {
		assert.equal($field.val(), "12345", "Text was not trimmed");
		assert.ok($container.hasClass($.ui.igNotifier.prototype.css.warningState), "Warning message not shown");
		assert.equal($container.igNotifier("container").text(),
			$.ig.Editor.locale.maxLengthErrMsg.replace("{0}", 5), "MaxLength message not correct.");

		$field.blur();
		// test case without start (Chrome Android)
		$field.focus();
		$field.select();
		var compositionupdate = jQuery.Event("compositionupdate");
		compositionupdate.originalEvent = { data: "2" };
		$field.val("12");
		$field[0].setSelectionRange(1, 1);
		$field.trigger(compositionupdate);
		$field.val("12345678");
		var compositionend = jQuery.Event("compositionend");
		$field.trigger(compositionend);

		return util.wait(0);
	}).then(function () {
		assert.equal($field.val(), "12345", "Text was not trimmed with update only");
		assert.ok($container.hasClass($.ui.igNotifier.prototype.css.warningState), "Warning message not shown");
		assert.equal($container.igNotifier("container").text(),
			$.ig.Editor.locale.maxLengthErrMsg.replace("{0}", 5), "MaxLength message not correct.");

		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Bug 1205 Decimal numbers are rounded when the editor is blurred', function (assert) {
	assert.expect(1);

	// value not matching mask (fails validation)
	var $editor = this.util.appendToFixture(this.inputTag)
			.igNumericEditor({
				minDecimals: 10,
				maxDecimals: 10
			});

	$editor.trigger("focus").val("0.0000005880").blur();
	assert.equal($editor.val(), "0.0000005880", "(wrong value) Numeric editor display value is not: 0.0000005880.");

	/* 
	// nullValue not matching mask (fails validation)
	$editor = $('<input/>').appendTo("#testBedContainer")
		.igMaskEditor({ 
				inputMask : "AA??",
				allowNullValue: true,
				nullValue: "#5a" //wrong first char
			});
	$editor.trigger("focus").select();
	try {
		$.ig.TestUtil.keyInteraction(97, $editor);
		$.ig.TestUtil.keyInteraction(98, $editor);
		$.ig.TestUtil.keyInteraction(99, $editor);
		assert.ok(true);
	} catch (error) {
		assert.ok(false, "(wrong nullValue) Typing caused an exception: " + error.message );
	}
	assert.equal($editor.val(), "abc_", "(wrong nullValue) Typing did not update Edit text.");
	$editor.remove();

	// nullValue not a string
	$editor = $('<input/>').appendTo("#testBedContainer")
		.igMaskEditor({
				allowNullValue: true,
				nullValue: 0
			});
	assert.equal($editor.val(), "0", "Null value not applied on Display text.")
	$editor.trigger("focus").select();
	try {
		$.ig.TestUtil.keyInteraction(49, $editor);
		$.ig.TestUtil.keyInteraction(50, $editor);
		$.ig.TestUtil.keyInteraction(51, $editor);
		assert.ok(true);
	} catch (error) {
		assert.ok(false, "(numeric nullValue) Typing caused an exception: " + error.message );
	}
	assert.equal($editor.val(), "123_______", "(numeric nullValue) Typing did not update Edit text."); */
});

QUnit.test('Bug 1666 - textChanged not triggered on clear w/ allowNullValue', function (assert) {
	assert.expect(8);
	var $editor = this.util.appendToFixture(this.inputTag).igTextEditor({
			value: "some text",
			buttonType: "clear",
			allowNullValue: true
		}),
		$clearButton =  $editor.igTextEditor("clearButton"),
		textChangedFired = false, valueChangedFired = false;

	$editor.one("igtexteditortextchanged.test", function (evt, ui) {
		textChangedFired = true;
	});
	$editor.one("igtexteditorvaluechanged.test", function (evt, ui) {
		valueChangedFired = true;
	});

	$clearButton.click();
	assert.ok(textChangedFired, "igTextEditor textChanged event not fired");
	assert.ok(valueChangedFired, "igTextEditor valueChanged event not fired");
	assert.strictEqual($editor.igTextEditor("value"), null, "igTextEditor value did not clear");
	assert.strictEqual($editor.igTextEditor("field").val(), "", "igTextEditor text did not clear");

	$editor.off(".test");
	$editor.remove();

	// numeric editor
	$editor = this.util.appendToFixture(this.inputTag).igNumericEditor({
			value: 357,
			buttonType: "clear",
			allowNullValue: true
		});
	$clearButton =  $editor.igNumericEditor("clearButton"),
	textChangedFired = false;
	valueChangedFired = false;

	$editor.one("ignumericeditortextchanged", function (evt, ui) {
		textChangedFired = true;
	});
	$editor.one("ignumericeditorvaluechanged", function (evt, ui) {
		valueChangedFired = true;
	});

	$clearButton.click();
	assert.ok(textChangedFired, "igNumericEditor textChanged event not fired");
	assert.ok(valueChangedFired, "igNumericEditor valueChanged event not fired");
	assert.strictEqual($editor.igNumericEditor("value"), null, "igNumericEditor value did not clear");
	assert.strictEqual($editor.igNumericEditor("field").val(), "", "igNumericEditor text did not clear");
	
	$editor.remove();
});

QUnit.test('Bug 256852: textChanged not fired on Safari on MacOS (Grid filtering)', function (assert) {
	assert.expect(2);
	var done = assert.async(),
		$editor =  this.util.appendToFixture(this.inputTag).igTextEditor(),
		$field = $editor.igTextEditor("field"),
		textChangedArgs = [];

	$editor.on("igtexteditortextchanged", function (evt, args) {
		textChangedArgs.push(args);
	});

	/* Safari fires composition in the following order:
		1. compositionstart
		2. compositionupdate
		3. input (value assigned to input)
		4. keydown
		5. keyup */
	$field.focus();
	$field.trigger(jQuery.Event("compositionstart"));
	$field.trigger(jQuery.Event("compositionupdate"));
	$field.val("d");
	$field.trigger(jQuery.Event("input"));
	$field.trigger(jQuery.Event("keydown"));
	$field.trigger(jQuery.Event("keyup"));

	assert.equal(textChangedArgs.length, 1, "textChanged should be triggered");
	assert.equal(textChangedArgs.pop().text, "d", "textChanged arg should be correct");

	$.ig.TestUtil.wait(0) //compositionupdate handler
	.then(function () {
		$editor.off("igtexteditortextchanged");
		$editor.remove();
		done();
	});
});