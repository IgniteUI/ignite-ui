QUnit.module("Knockout unit tests for igDatePicker", {
	inputTag: '<input></input>',
	divTag: '<div></div>',
	spanTag: '<span></span>',
	util: $.ig.TestUtil,
	editor: null,
	model: null,
	input: function () {
		return this.editor.igTimePicker("field");
	},
	container: function () {
		return this.editor.igTimePicker("editorContainer");
	},
	getTime: function (h, m, s) {
		var time = new Date(1, 1, 1);
		h = h || 20;
		m = m || 32;
		s = s || 16
		time.setHours(h);
		time.setMinutes(m);
		time.setSeconds(s);
		return time;
	},
	viewModel: function () {
		var self = this;
		this.nonObservable = new Date(2010, 0, 1, 13, 45);
		this.nullable = ko.observable(null);
		var time = new Date(1, 1, 1);
		time.setHours(20);
		time.setMinutes(32);
		time.setSeconds(16);
		this.timeValue = ko.observable(time);

		setTime = function () {
			//	set timeValue to 10 Nov 2010 10:10:10 AM
			self.timeValue(new Date(2010, 10, 10, 10, 10, 10, 0));
		};

		this.isDisabled = ko.observable(false);
		this.invalidTime = ko.observable("");
	},
	applyBindings: function () {
		ko.cleanNode(this.qunitFixture[0]);
		ko.applyBindings(this.model, this.qunitFixture[0]);
	},
	before: function () {
		this.qunitFixture = $('#qunit-fixture');
		this.model = new this.viewModel();
	},
	beforeEach: function () {
		$.fx.off = true;
		this.qunitFixture = $('#qunit-fixture');
	},
	afterEach: function () {
		$.fx.off = false;
		//ko.cleanNode(this.qunitFixture[0]);
	},
	checkEditorsValues: function (val, message) {
		var dateObject = new Date(val);

		this.assert.equal($('#inputEditor1').igTimePicker("value").toString(), dateObject.toString(), message + " (inputEditor) date");
		this.assert.equal($('#divEditor1').igTimePicker("value").toString(), dateObject.toString(), message + " (divEditor1) date");
		this.assert.equal($('#spanEditor1').igTimePicker("value").toString(), dateObject.toString(), message + " (tdEditor1) date");
	},
	checkFieldsValues: function (val, message) {
		this.assert.equal($("#inputValue").val(), val, message + " (inputValue)");
		this.assert.equal($("#divValue").html(), val, message + " (divValue)");
		this.assert.equal($("#spanValue").html(), val, message + " (spanValue)");
	}
});

QUnit.test("Initializing igTimePicker", function (assert) {
	assert.expect(38); //Passing
	this.assert = assert;

	var setupObject = "igTimePicker: { value: timeValue, isLimitedToListValues: false, width: '160px' }";
	$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", setupObject).appendTo(this.qunitFixture);
	$(this.divTag).attr("id", "divEditor1").attr("data-bind", setupObject).appendTo(this.qunitFixture);
	$(this.spanTag).attr("id", "spanEditor1").attr("data-bind", setupObject).appendTo(this.qunitFixture);

	$(this.inputTag).attr("id", "inputValue").attr("data-bind", "value: timeValue").appendTo(this.qunitFixture);
	$(this.divTag).attr("id", "divValue").attr("data-bind", "text: timeValue").appendTo(this.qunitFixture);
	$(this.spanTag).attr("id", "spanValue").attr("data-bind", "text: timeValue").appendTo(this.qunitFixture);

	$(this.inputTag).attr("id", "resetButton").attr("type", "button").attr("data-bind", "click: setTime").appendTo(this.qunitFixture);
	this.applyBindings();

	// Initializing igTimePicker
	assert.ok(typeof (ko.bindingHandlers.igTimePicker) !== 'undefined', 'igTimePicker knockoutJS extension script is not loaded'); //01
	assert.ok(typeof (ko.bindingHandlers.igTimePicker) === 'object', 'igTimePicker knockoutJS extension is of a wrong type'); //02
	assert.ok($('#inputEditor1').data("igTimePicker") !== undefined, 'Creating igTimePicker in an input'); //03
	assert.ok($('#divEditor1').data("igTimePicker") !== undefined, 'Creating igTimePicker in a div'); //04
	assert.ok($('#spanEditor1').data("igTimePicker") !== undefined, 'Creating igTimePicker in a td'); //05
	assert.equal($('#inputEditor1').igTimePicker("value").toString(), this.model.timeValue().toString(), 'The initial value is as expexted'); //06
	assert.equal($('#divEditor1').igTimePicker("value").toString(), this.model.timeValue().toString(), 'The initial value is as expexted'); //07
	assert.equal($('#spanEditor1').igTimePicker("value").toString(), this.model.timeValue().toString(), 'The initial value is as expexted'); //08

	// Update model -> editor (input)"
	$('#inputEditor1').igTimePicker("setFocus");
	var inputEditorTime = $('#inputEditor1').igTimePicker("value");
	inputEditorTime.setHours(16);
	inputEditorTime.setMinutes(15);
	$('#inputEditor1').igTimePicker("field").val("4:15 PM").blur();
	this.checkEditorsValues(inputEditorTime, "Value are as expected"); //09 - 11
	this.checkFieldsValues(inputEditorTime, "Values are as expected"); //12 - 14

	// Update model -> editor (div)
	$('#divEditor1').igTimePicker("setFocus");
	var divEditorTime = $('#divEditor1').igTimePicker("value");
	divEditorTime.setHours(3);
	divEditorTime.setMinutes(22);
	$('#divEditor1').igTimePicker("field").val("3:22 AM").blur();
	this.checkEditorsValues(divEditorTime, "Values are as expected"); //15 - 17
	this.checkFieldsValues(divEditorTime, "Values are as expected"); //18 - 20

	// Update model -> editor (td)
	$('#spanEditor1').igTimePicker("field").val("04/21/2012").blur();
	var spanEditorTime = $('#spanEditor1').igTimePicker("value");
	spanEditorTime.setHours(18);
	spanEditorTime.setMinutes(36);
	$('#spanEditor1').igTimePicker("field").val("6:36 PM").blur();
	this.checkEditorsValues(spanEditorTime, "Values are as expected"); //21 - 23
	this.checkFieldsValues(spanEditorTime, "Values are as expected"); // 24 - 26

	// Update Model, check editors
	$("#resetButton").click();
	var resetTime = new Date(2010, 10, 10, 10, 10, 10, 0)
	this.checkEditorsValues(resetTime, "Values are as expected"); //27 - 29
	this.checkFieldsValues(resetTime, "Values are as expected"); // 30 - 32

	//"update from outside input"
	date = new Date();
	$('#inputValue').val(date.toString()).change();
	this.checkEditorsValues(date, "Values are as expected"); // 33 - 35
	this.checkFieldsValues(date, "Values are as expected"); // 36 - 38
});

QUnit.test('Test disabled binding', function (assert) {
	assert.expect(12);

	editor = $(this.inputTag).attr("data-bind", "igTimePicker: { width: '200' }, igEditorDisable: isDisabled").appendTo(this.qunitFixture);
	chk = $(this.inputTag).attr("type", "checkbox").attr("data-bind", "checked: isDisabled").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.notOk(editor.igTimePicker("option", "disabled"), "Editor should be enabled"); // 01
	assert.notOk(editor.igTimePicker("field").prop("disabled"), "Editor should be enabled"); // 02
	assert.equal(editor.igTimePicker("field").attr("disabled"), undefined, "Editor should be enabled"); // 03
	assert.notOk(editor.igTimePicker("editorContainer").hasClass($.ui.igTimePicker.prototype.css.disabled), "Editor should be enabled"); // 04
	chk.click();
	assert.ok(editor.igTimePicker("option", "disabled"), "Editor should be disabled"); // 05
	assert.ok(editor.igTimePicker("field").prop("disabled"), "Editor should be disabled"); // 06
	assert.equal(editor.igTimePicker("field").attr("disabled"), "disabled", "Editor should be disabled"); // 07
	assert.ok(editor.igTimePicker("editorContainer").hasClass($.ui.igTimePicker.prototype.css.disabled), "Editor should be disabled"); // 08
	chk.click();
	chk.click();
	chk.click();
	assert.notOk(editor.igTimePicker("option", "disabled"), "Editor should be enabled"); // 09
	assert.notOk(editor.igTimePicker("field").prop("disabled"), "Editor should be enabled"); // 10
	assert.equal(editor.igTimePicker("field").attr("disabled"), undefined, "Editor should be enabled"); // 11
	assert.notOk(editor.igTimePicker("editorContainer").hasClass($.ui.igTimePicker.prototype.css.disabled), "Editor should be enabled"); // 12
});

QUnit.test('Test invalid dates binding', function (assert) {
	assert.expect(4);
	var editor = $(this.inputTag).attr("data-bind", "igTimePicker: { value: invalidTime, width: '160px' }").appendTo(this.qunitFixture);
	this.applyBindings();

	this.model.invalidTime("Invalid value");
	assert.equal(editor.igTimePicker("value"), "", "Editor value shouldn't have any value"); // 01

	this.model.invalidTime(NaN);
	assert.equal(editor.igTimePicker("value"), "", "Editor value shouldn't have any value"); // 02

	this.model.invalidTime(undefined);
	assert.equal(editor.igTimePicker("value"), "", "Editor value shouldn't have any value"); // 03

	this.model.invalidTime(null);
	assert.equal(editor.igTimePicker("value"), "", "Editor value shouldn't have any value"); // 04
});

QUnit.test("timePicker bound to non-observable value", function (assert) {
	assert.expect(2);

	var time = new Date(1950, 10, 20, 8, 12),
		done = assert.async(),
		self = this;

	var setupObject = "igTimePicker: { value: nonObservable, isLimitedToListValues: false, width: '160px' }";
	var editor = $(this.inputTag).attr("data-bind", setupObject).appendTo(this.qunitFixture);
	this.applyBindings();

	editor.igTimePicker("field").val("8:12 AM").blur();
	this.util.wait(300).then(function () {
		assert.equal(time.toTimeString(), self.model.nonObservable.toTimeString(), "Changes in the time picker should be reflected in the view model"); // 01
		self.model.nonObservable = new Date(2120, 0, 12, 20, 33);
		assert.notEqual(editor.igTimePicker("value").toString(), self.model.nonObservable.toString(), "Changes in the view model shouldn't be reflected in the editor"); // 02
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("updateMode set to not allowed value", function (assert) {
	assert.expect(1);
	var self = this;

	assert.throws(function () {
		$(self.inputTag).attr("data-bind", "igTimePicker: { value: timeValue, width: \"160px\", updateMode: \"none\" }").appendTo(self.qunitFixture);
		self.applyBindings();
	}, function (err) { return err.message.indexOf($.ig.Editor.locale.updateModeUnsupportedValue) > -1; }, 'An error was correctly thrown when updateMode option is not correctly changed');
});

QUnit.test("updateMode set to immediate", function (assert) {
	assert.expect(1);
	var self = this;

	$(this.inputTag).attr("data-bind", "igTimePicker: { value: timeValue, width: \"160px\", updateMode: \"immediate\" }").appendTo(this.qunitFixture);
	assert.throws(function () { self.applyBindings(); },
		function (err) { return err.message.indexOf($.ig.Editor.locale.updateModeNotSupported) > -1; },
		'An error was correctly thrown when updateMode option is not correctly changed');
});
