QUnit.module("igDatePicker(Bugs) unit tests", {
	divTag: '<div></div>',
	spanTag: '<span></span>',
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
	container: function() {
		return this.editor.igDatePicker("editorContainer");
	},
	calendar: function() {
		return this.editor.igDatePicker("getCalendar");
	},
	dropDownButton: function() {
		return this.editor.igDatePicker("dropDownButton");
	},
	getDDmmYYYYHHSS: function(date) {
		var result = "", day, month, minutes, hours;
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
		hours = date.getHours();
		if (hours < 10) {
			hours = "0" + hours;
		} else {
			hours = hours.toString();
		}
		minutes = date.getMinutes();
		if (minutes < 10) {
			minutes = "0" + minutes;
		} else {
			minutes = minutes.toString();
		}
		result += day;
		result += "/";
		result += month;
		result += "/";
		result += date.getFullYear();
		result += " ";
		result += hours;
		result += ":";
		result += minutes;

		return result;
	},
	getDDmmYYYY: function (date, separator) {
		var result = "", day, month,
			separator = separator || "/";
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
		result += separator;
		result += month;
		result += separator;
		result += date.getFullYear();
		return result;
	},
	getMMDDYYYY: function (date) {
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
		result += month;
		result += "/";
		result += day;
		result += "/";
		result += date.getFullYear();
		return result;
	},
	beforeEach: function () { $.fx.off = true; },
	afterEach: function () { $.fx.off = false; }
});

QUnit.test('Bug 221368', function (assert) {
	assert.expect(5);
	
	var done = assert.async(), self = this;

	this.editor = editor1 = this.appendToFixture(this.inputTag).igDatePicker({
		readOnly: true,
		dropDownOnReadOnly: true
	});
	this.dropDownButton().click();
	assert.ok(editor1.igDatePicker("dropDownVisible"), "The readOnly calendar is opened.");
	this.dropDownButton().click();
	$.ig.TestUtil.wait(400).then(function () {
		assert.notOk(editor1.igDatePicker("dropDownVisible"), "The readOnly calendar is closed.");
		editor2 = $(self.inputTag).appendTo($('#qunit-fixture')).igDatePicker();
		editor2.igDatePicker("dropDownButton").click();
		return $.ig.TestUtil.wait(400);
	}).then(function() {
		self.dropDownButton().click();
		assert.ok(editor1.igDatePicker("dropDownVisible"), "The calendar of the readOnly editor should be visible");
		self.dropDownButton().click();
		return $.ig.TestUtil.wait(400);
	}).then(function () {
		assert.notOk(editor1.igDatePicker("dropDownVisible"), "The calendar of the readOnly editor should be visible");
		assert.notOk(editor2.igDatePicker("dropDownVisible"), "The readOnly calendar is closed.");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Bug 213900', function (assert) {
	assert.expect(4);

	this.editor = this.appendToFixture(this.divTag).attr({ id: "igDatePicker1"}).igDatePicker();
	assert.equal(this.input().attr("id"), "igDatePicker1EditingInput", "The id of the input should be igDatePicker1editingInput");
	assert.equal(this.container().attr("id"), "igDatePicker1", "The id of the span should be igDatePicker1");

	this.editor = this.appendToFixture(this.spanTag).attr({ id: "igDatePicker2"}).igDatePicker();
	assert.equal(this.input().attr("id"), "igDatePicker2EditingInput", "The id of the input should be igDatePicker2editingInput");
	assert.equal(this.input().parent().attr("id"), "igDatePicker2", "The id of the span should be igDatePicker2");
});

QUnit.test('Bug 206040', function (assert) {
	assert.expect(2);

	this.editor = this.appendToFixture(this.divTag).igDatePicker({ dateInputFormat: "dd/MM/yyyy" });
	this.dropDownButton().click();
	$(this.calendar()).find(".ui-datepicker-today").find("a").click();
	assert.equal(this.input().val(), this.getDDmmYYYY(new Date()), "The value is changed to " + this.getDDmmYYYY(new Date()));
	this.input().blur();
	assert.equal(this.input().val(), this.getDDmmYYYY(new Date()), "The value is changed to " + this.getDDmmYYYY(new Date()));
});

QUnit.test('Bug 211360', function (assert) {
	assert.expect(4);
	var calendar, flag = false, i = 1, self = this;

	this.editor = editor = this.appendToFixture(this.divTag).igDatePicker({
		width: 280,
		dateInputFormat: "dd/MM/yyyy"
	});
	editor.one("igdatepickertextchanged", function (evt, ui) {
		flag = true;
		assert.equal(ui.text, "__/__/____", "The text should be __/__/____");
	});
	this.dropDownButton().click();
	editor.one("igdatepickertextchanged", function (evt, ui) {
		assert.equal(ui.text, self.getDDmmYYYY(new Date()), "The text should be " + self.getDDmmYYYY(new Date()) + " Real Value: " + ui.text);
	});
	$(this.calendar()).find(".ui-datepicker-today").find("a").click();

	assert.equal(this.input().val(), this.getDDmmYYYY(new Date()), "The text is changed to " + this.getDDmmYYYY(new Date()));
	assert.ok(flag, "Textchaged event should be fired");
});

QUnit.test('Bug 215046', function (assert) {
	assert.expect(1);

	this.editor = editor = this.appendToFixture(this.divTag).igDatePicker({
		width: 280,
		dateInputFormat: "dateTime",
		regional: "en-US",
		placeHolder: "Pick Date",
		datepickerOptions: {
			showWeek: true
		},
		value: new Date(2016, 1, 1),
		dataMode: "editModeText"
	});
	editor.igDatePicker("setFocus");
	this.input().val("02/01/2016 02:12 AM");
	this.input().blur();

	// Value is expected as string, cause the dataMode is "editModeText".
	assert.equal(editor.igDatePicker("value"), "02/01/2016 02:12 AM", "The value is not properly set");

});

QUnit.test('Bug 215046', function (assert) {
	assert.expect(2);
	var done = assert.async();

	editor1 = this.appendToFixture(this.inputTag).igDatePicker();
	editor2 =  this.appendToFixture(this.inputTag).igDatePicker();
	editor1.igDatePicker("dropDownButton").click();
	editor2.igDatePicker("dropDownButton").click();
	$.ig.TestUtil.wait(20).then(function () {
		assert.ok(editor2.data("igDatePicker")._focused, "The second editor should be focused");
		assert.ok(editor2.data("igDatePicker")._dropDownList.is(":visible"), "The calendar of the second editor should be visible");
		done();
	});
});

QUnit.test('Bug 220775', function (assert) {
	assert.expect(1);

	this.editor = this.appendToFixture(this.inputTag).igDatePicker();
	this.input().click().focus();
	this.dropDownButton().click();
	assert.equal(this.input().val(), "__/__/____", "Opening dropdown caused the entered text to be __/__/____");
});

QUnit.test('Bug 221414', function (assert) {
	assert.expect(1);
	var done = assert.async();

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({ datepickerOptions: { minDate: new Date(2016, 06, 05) } });
	this.dropDownButton().click();
	$(this.calendar()).find("a:last").click();
	$.ig.TestUtil.wait(20).then(function () {
		assert.notOk(editor.igDatePicker("dropDownVisible"), "The dropdown container is visible, but it shouldn't be.");
		done();
	});
});

QUnit.test('Issue 84', function (assert) {
	assert.expect(1);

	var calendarVisibility;
	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({ datepickerOptions: { minDate: new Date(2016, 06, 01) } });
	this.dropDownButton().click().click();
	$(".ui-datepicker-calendar").find("a:first").click();
	assert.notOk(editor.igDatePicker("dropDownVisible"), "The dropdown container is visible, but it shouldn't be.");
});

QUnit.test( 'Issue 89', function (assert) {
	assert.expect(4);

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		datepickerOptions: {
			minDate : new Date(2016, 06, 12),
			maxDate: new Date(2016, 06, 31)
		}
	});
	this.dropDownButton().click();
	$("a:contains('26')").hover().click();
	assert.notOk(editor.igDatePicker("dropDownVisible"), "The dropdown container is visible, but it shouldn't be.");
	this.input().blur();
	this.dropDownButton().click();
	assert.equal(this.input().val(), "07/26/2016", "The day should contain preceeding 0");
	$("a:contains('25')").hover().click();
	assert.notOk(editor.igDatePicker("dropDownVisible"), "The dropdown container is visible, but it shouldn't be.");
	assert.equal(typeof this.container().data("igNotifier"), "undefined", "The notifier is visible, but it shouldn't be.");
});


QUnit.test('Issue 174', function (assert) {
	assert.expect(9);

	var editor1, editor2, calendar, nextMonth, yearSelect;

	editor1 = this.appendToFixture(this.inputTag).igDatePicker({
		dateDisplayFormat: "dd/MM/yyyy",
		dateInputFormat: "dateTime",
		validatorOptions: {
			onblur: true,
			onchange: false,
			required: true,
			notificationOptions: {
				direction: "right",
				showIcon: "true",
				mode: "popover"
			}
		}
	});
	editor2 = this.appendToFixture(this.inputTag).igDatePicker({
		datepickerOptions: {
			changeYear: true,
			beforeShow: function (input, inst) {
				$(input).data("beforeShow", "triggered");
			}
		},
		validatorOptions: {
			onchange: false,
			required: true,
			notificationOptions: {
				mode: "popover"
			}
		}
	});		
	calendar = editor1.igDatePicker("getCalendar"),
	editor1.igDatePicker("dropDownButton").click();

	assert.ok(calendar.is(":visible"), "The calendar did not open");
	assert.notOk(editor1.igDatePicker("validator").isMessageDisplayed(), "There should be no initial error message.");
	
	nextMonth = calendar.find( "[data-handler='next']");
	assert.ok(nextMonth.length > 0, "There should be next month link.");

	nextMonth.click();
	assert.notOk(editor1.igDatePicker("validator").isMessageDisplayed(), "There should be no error message after month change.");
	
	editor2.igDatePicker("dropDownButton").click();

	// verify message is shown now that the first editor lost focus:
	assert.equal(editor1.igDatePicker("validator").getErrorMessages()[0], $.ig.Validator.locale.requiredMessage, "There should be error message after blur.");
	
	assert.ok(calendar.is(":visible"), "The calendar should be visible again");
	assert.equal(editor2.data("beforeShow"), "triggered",  "external beforeShow option got called");
	assert.notOk(editor2.igDatePicker("validator").isMessageDisplayed(), "There should be no initial error message.");

	yearSelect = calendar.find( "[data-handler='selectYear']");
	yearSelect.val("2015");
	yearSelect.trigger(yearSelect.attr( "data-handler" ));

	editor1.igDatePicker("dropDownButton").click();
	assert.equal(editor2.igDatePicker("validator").getErrorMessages()[0], $.ig.Validator.locale.requiredMessage, "There should be error message after blur.");
	// Breaks other tests as the $.datepicker._datepickerShowing remains true even after focusing another field.. call hide to help it work...
	editor1.datepicker("hide");
	editor2.datepicker("hide");
});

QUnit.test('Issue 432 - Popup is displayed when Enter key is pressed if the editor has no values.', function (assert) {
	assert.expect(4);

	var valueChangedCounter = 0;

	this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
		//max in the past
		maxValue : new Date(2016, 9, 10),
		width : '120px',
		dataMode : 'editModeText'
	});
	editor.on("igdatepickervaluechanging", function () {
		valueChangedCounter++;
	});
	editor.igDatePicker("setFocus");				
	this.util.type(String.fromCharCode(13), this.input()); // Enter
	assert.equal(this.container().data("igNotifier"), undefined, "There should be no initial notifier.");
	assert.equal(this.input().val(), "__/__/____", "Text should remain the mask");
	assert.equal(editor.igDatePicker("value"), "", "Value should set empty string instead.");
	assert.equal(valueChangedCounter, 1, "Value changing should be called just once!");
});

QUnit.test("Issue 1453 - Entered date is converted to today's date when pressing the Enter key.", function (assert) {
	assert.expect(10);

	var done = assert.async(),
		today = target = new Date(),
		targetString, targetKeys, tomorrow = true,
		todayString = this.getDDmmYYYY(today, "-"), editor, self = this;

		this.editor = editor = this.appendToFixture(this.inputTag).igDatePicker({
			dateInputFormat: "dd-MMM-yyyy"
		});

	function nextInMonth(date, skipDays) {
		var target = new Date(date.getTime());
		target.setDate(date.getDate() + skipDays);

		if (target.getMonth() === date.getMonth()) {
			return target;
		}
		//in a diff month
		return null;
	}

	//tomorrow if in same month, or yesterday
	target = nextInMonth(today, 1) || new Date(target.setDate(target.getDate() - 1));
	targetString = this.getDDmmYYYY(target, "-");
	targetKeys = targetString.replace(/-/g, "");

	this.input().focus();
	editor.igDatePicker("showDropDown");

	$.ig.TestUtil.wait(400).then(function () {
		// picker opens with today as default
		assert.strictEqual(self.calendar().find(".ui-datepicker-current-day").length, 0, "Calendar should have no initial selection");
		//type in the date +/- a day, control check what's typed:
		$.ig.TestUtil.type(targetKeys.substring(0, targetKeys.length -1), self.input());
		assert.strictEqual(self.calendar().find(".ui-datepicker-current-day").length, 0, "Calendar selection should not update until date if completed");
		
		$.ig.TestUtil.type(targetKeys.substring(targetKeys.length -1), self.input());
		assert.equal(self.input().val(), targetString, "Typed text should match");
		assert.equal(self.calendar().find(".ui-datepicker-current-day").text(), target.getDate(), "Calendar selection should be updated with typed in date");

		$.ig.TestUtil.keyInteraction(13, self.input());
		assert.equal(self.input().val(), targetString, "Typed text should remain after enter");
		assert.equal(editor.igDatePicker("value").toLocaleDateString(), target.toLocaleDateString(), "Value should match typed selection");

		// force-reopen the calendar
		editor.igDatePicker("showDropDown");
		return $.ig.TestUtil.wait(400);
	}).then(function() {
		var newTarget;
		if (!(newTarget = nextInMonth(today, 2))) {
			tomorrow = false;
			newTarget = target;
			newTarget.setDate(newTarget.getDate() - 2);
		}
		targetString = self.getDDmmYYYY(newTarget, "-");

		// use keyboard nav to another date:
		if (tomorrow) {
			$.ig.TestUtil.keyInteraction(39, self.input(), "ctrlKey");
		} else {
			$.ig.TestUtil.keyInteraction(37, self.input(), "ctrlKey");
			$.ig.TestUtil.keyInteraction(37, self.input(), "ctrlKey");
		}

		assert.equal(self.calendar().find(".ui-datepicker-days-cell-over").text(), newTarget.getDate(), "Calendar selection should have moved");
		$.ig.TestUtil.keyInteraction(13, self.input());

		assert.equal(self.input().val(), targetString, "Typed text should remain after enter");
		assert.equal(editor.igDatePicker("value").toLocaleDateString(), newTarget.toLocaleDateString(), "Value should match typed selection");

		// force-reopen the calendar
		editor.igDatePicker("showDropDown");
		return $.ig.TestUtil.wait(400);
	}).then(function () {
		// simply press enter on the already selected date
		$.ig.TestUtil.keyInteraction(13, self.input());
		assert.equal(self.input().val(), targetString, "Selecting the same date again should not change the input");
		editor.remove();
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("Issue 1453 pt2 - Enter date w/ format and displayModeText dataMode", function (assert) {
	assert.expect(5);
	var done = assert.async(),
		today = target = new Date(),
		targetString, targetKeys, tomorrow = true,
		todayString = this.getDDmmYYYY(today, "-"),
		$editor = this.appendToFixture(this.inputTag).igDatePicker({
			dateInputFormat: "dd-MM-yyyy",
			dataMode: "displayModeText"
		}),
		$calendar = $editor.igDatePicker("getCalendar");

	targetKeys = todayString.replace(/-/g, "");

	$editor.igDatePicker("field").focus();
	$editor.igDatePicker("showDropDown");

	$.ig.TestUtil.wait(400).then(function () {
		// picker opens with today as default
		assert.strictEqual($calendar.find(".ui-datepicker-current-day").length, 0, "Calendar should have no initial selection");
		//type in the date +/- a day, control check what's typed:
		$.ig.TestUtil.type(targetKeys, $editor.igDatePicker("field"));
		assert.equal($editor.igDatePicker("field").val(), todayString, "Typed text should match");
		assert.equal($calendar.find(".ui-datepicker-current-day").text(), target.getDate(), "Calendar selection should be updated with typed in date");

		$.ig.TestUtil.keyInteraction(13, $editor.igDatePicker("field"));
		assert.equal($editor.igDatePicker("field").val(), todayString, "Typed text should remain after enter");
		assert.equal($editor.igDatePicker("value"), todayString, "Value should match typed selection");

		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});


QUnit.test("Issue 1733 - igDatePicker throws error, when selecting with displayModeText dataMode", function (assert) {
	assert.expect(4);
	var done = assert.async(),
		self = this,
		value = new Date(),
		todayString, targetString,
		$editor = this.appendToFixture(this.inputTag).igDatePicker({
			dateInputFormat: "yyyy-MM-dd",
			dataMode: "displayModeText"
		}),
		$calendar = $editor.igDatePicker("getCalendar");

	value = new Date(value.getFullYear(), value.getMonth(), value.getDate());
	todayString = this.getDDmmYYYY(value, "-").split("-").reverse().join("-");
	

	$editor.igDatePicker("field").focus();
	$editor.igDatePicker("showDropDown");

	$.ig.TestUtil.wait(400).then(function () {
		// select today
		$calendar.find(".ui-datepicker-today").find("a").click();
		assert.equal($editor.val(), todayString, "Editor display text not updated with picked value");
		assert.equal($editor.igDatePicker("value"), todayString, "Editor value not updated with picked one");

		$editor.igDatePicker("showDropDown");
		return $.ig.TestUtil.wait(400);
		done();
	})
	.then(function () {
		// select 15th or 16th depending on date
		value.setDate(value.getDate() === 15 ? 16 : 15);
		targetString = self.getDDmmYYYY(value, "-").split("-").reverse().join("-");

		$calendar.find(".ui-datepicker-today").find("a").click();
		assert.equal($editor.val(), todayString, "Editor display text not updated with picked value");
		assert.equal($editor.igDatePicker("value"), todayString, "Editor value not updated with picked one");
		done();
	})	
	.catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("Issue 1921 - Mouse over highlighting of dates does not work after the control is recreated", function (assert) {
	const hover = "ui-state-hover",
	selector = ".ui-datepicker-calendar",
	self = this,
	done = assert.async(),
	tableRow = `${selector}>tbody>tr`;

	// create and open the datepicker
	this.editor = this.appendToFixture(this.divTag).igDatePicker();
	this.editor.igDatePicker("showDropDown");
	$.ig.TestUtil.wait(400).then(function () {
		// destroy the datepicker
		self.editor.igDatePicker("destroy");
		// the jquery datepicker should not be destroyed
		const datePickerDiv = $(selector);
		assert.ok(datePickerDiv !== undefined && datePickerDiv !== null);
		return $.ig.TestUtil.wait(400);
	}).then(function() {
		// recreate and reopen the datepicker
		self.editor = self.appendToFixture(self.divTag).igDatePicker();
		self.editor.igDatePicker("showDropDown");
		return $.ig.TestUtil.wait(400);
	}).then(function() {
		// trigger "mouseover" on the second element of the second row
		$($(tableRow)[1].childNodes[1].childNodes[0]).trigger("mouseover");
		return $.ig.TestUtil.wait(400);
	}).then(function() {
		// the second element of the second row should have the ui-state-hover class
		assert.ok($(tableRow)[1].childNodes[1].childNodes[0].classList.toString().includes(hover));
		self.editor.igDatePicker("destroy");
		done();
	});
});
