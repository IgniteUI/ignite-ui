QUnit.module("Knockout unit tests for igDatePicker", {
	inputTag: '<input></input>',
	divTag: '<div></div>',
	spanTag: '<span></span>',
	util: $.ig.TestUtil,
	editor: null,
	model: null,
	input: function() {
		return this.editor.igCheckboxEditor("field");
	},
	container: function() {
		return this.editor.igCheckboxEditor("editorContainer");
	},
	viewModel: function() {
		var self = this;
		this.nonObservable = "11/17/2007";
		this.nullable = ko.observable(null);
		this.dateValue = ko.observable(new Date("12/12/2012"));
		
		setDefaultDate = function() {
			self.dateValue(new Date("11/11/2011"));
		};
		setDefaultDate1 = function() {
			var d = new Date("Wed Dec 12 2012 00:00:00");
			self.dateValue(d);
		};
		setDefaultDate2 = function() {
			var dd = new Date("10/10/2014");
			dd = Date.parse(dd);
			self.dateValue(new Date(dd));
		};
		setDefaultDate3 = function() {
			//Update set it using the other way -> setDate(getYear(), getDay()....
			var d = new Date("10/15/2008");
			var date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
			
			self.dateValue(date);
		};
		setDefaultDate4 = function() {
			self.dateValue(new Date());
		};
		setDefaultDate5 = function () {
			self.dateValue("/Date(1224043200000)/");  
		};

		this.isDisabled =  ko.observable(false);

		this.invalidDate = ko.observable("");
	},
	applyBindings: function() {
		ko.applyBindings(this.model, this.qunitFixture[0]);
	},
	before: function () {
		QUnit.config.reorder = false;
		this.qunitFixture = $('#qunit-fixture');
		this.model = new this.viewModel();
	},
	after: function () {
		QUnit.config.reorder = true;
	},
	beforeEach: function () {
		$.fx.off = true;
	},
	afterEach: function () {
		$.fx.off = false;
		ko.cleanNode(this.qunitFixture[0]);
	},
	checkEditorsValues: function (val, message, fullDate) {
		var dateObject;
		if (fullDate !== undefined) {
			dateObject = fullDate;
		} else {
			dateObject = new Date(val);
		}

		this.assert.equal($('#inputEditor1').igDatePicker("value").toString(), dateObject.toString(), message + " (inputEditor) date");
		this.assert.equal($('#divEditor1').igDatePicker("value").toString(), dateObject.toString(), message + " (divEditor1) date");
		this.assert.equal($('#spanEditor1').igDatePicker("value").toString(), dateObject.toString(), message + " (tdEditor1) date");
	},
	checkFieldsValues: function (val, message) {
		this.assert.equal($("#inputValue").val(), val, message + " (inputValue)");
		this.assert.equal($("#divValue").html(), val, message + " (divValue)");
		this.assert.equal($("#spanValue").html(), val, message + " (spanValue)");
	},
	getShortDateAsString: function (date) {
		//TODO check if the date val is date or not
		var result = "";
		result += date.getMonth() + 1;
		result += "/";
		result += date.getDate();
		result += "/";
		result += date.getFullYear();
		return result;
	},
	selectDateFromDropdown: function (editor, date) {
		editor.igDatePicker("showDropDown");
		editor.igDatePicker("field").val(date).blur();
		editor.datepicker("hide");
		editor.blur();
	}
});

QUnit.test("Initializing igDatePicker", function (assert) {
	assert.expect(86); //Passing
	this.assert = assert;
	//var done = assert.async(), self = this;

	$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", "igDatePicker: { value: dateValue, width: '160px' }").appendTo(this.qunitFixture);
	$(this.divTag).attr("id", "divEditor1").attr("data-bind", "igDatePicker: { value: dateValue, width: '160px' }").appendTo(this.qunitFixture);
	$(this.spanTag).attr("id", "spanEditor1").attr("data-bind", "igDatePicker: { value: dateValue, width: '160px' }").appendTo(this.qunitFixture);

	$(this.inputTag).attr("id", "inputValue").attr("data-bind", "value: dateValue").appendTo(this.qunitFixture);
	$(this.divTag).attr("id", "divValue").attr("data-bind", "text: dateValue").appendTo(this.qunitFixture);
	$(this.spanTag).attr("id", "spanValue").attr("data-bind", "text: dateValue").appendTo(this.qunitFixture);

	$(this.inputTag).attr("id", "resetButton").attr("type", "button").attr("data-bind", "click: setDefaultDate").appendTo(this.qunitFixture);
	$(this.inputTag).attr("id", "resetButton1").attr("type", "button").attr("data-bind", "click: setDefaultDate1").appendTo(this.qunitFixture);
	$(this.inputTag).attr("id", "resetButton2").attr("type", "button").attr("data-bind", "click: setDefaultDate2").appendTo(this.qunitFixture);
	$(this.inputTag).attr("id", "resetButton3").attr("type", "button").attr("data-bind", "click: setDefaultDate3").appendTo(this.qunitFixture);
	$(this.inputTag).attr("id", "resetButton4").attr("type", "button").attr("data-bind", "click: setDefaultDate4").appendTo(this.qunitFixture);
	$(this.inputTag).attr("id", "resetButton5").attr("type", "button").attr("data-bind", "click: setDefaultDate5").appendTo(this.qunitFixture);
	this.applyBindings();

	// Initializing igDatePicker
	assert.ok(typeof(ko.bindingHandlers.igDatePicker) !== 'undefined', 'igDatePicker knockoutJS extention script is not loaded');
	assert.ok(typeof(ko.bindingHandlers.igDatePicker) === 'object', 'igDatePicker knockoutJS extention is of a wrong type');
	assert.ok($('#inputEditor1').data("igDatePicker") !== undefined, 'Creating igDatePicker in an input');
	assert.ok($('#divEditor1').data("igDatePicker") !== undefined, 'Creating igDatePicker in a div');
	assert.ok($('#spanEditor1').data("igDatePicker") !== undefined, 'Creating igDatePicker in a td');
	assert.equal($('#inputEditor1').igDatePicker("value").toString(), this.model.dateValue().toString(), 'The initial value is as expexted');
	assert.equal($('#divEditor1').igDatePicker("value").toString(), this.model.dateValue().toString(), 'The initial value is as expexted');
	assert.equal($('#spanEditor1').igDatePicker("value").toString(), this.model.dateValue().toString(), 'The initial value is as expexted');

	// Update model -> editor (input)"
	$('#inputEditor1').igDatePicker("setFocus");
	$('#inputEditor1').igDatePicker("field").val("11/11/2012").blur();
	this.checkEditorsValues("11/11/2012", "Value are as expected");
	this.checkFieldsValues(new Date("11/11/2012").toString(), "Values are as expected");

	// Update model -> editor (div)
	$('#divEditor1').igDatePicker("setFocus");
	$('#divEditor1').igDatePicker("field").val("09/25/2012").blur();
	this.checkEditorsValues("9/25/2012", "Values are as expected");
	this.checkFieldsValues(new Date("9/25/2012").toString(), "Values are as expected");

	// Update model -> editor (td)
	$('#spanEditor1').igDatePicker("field").val("04/21/2012").blur();
	this.checkEditorsValues("4/21/2012", "Values are as expected");
	this.checkFieldsValues(new Date("4/21/2012").toString(), "Values are as expected");

	// Update Model, check editors
	$("#resetButton3").click();
	//Split the logic for editors and the divs/spans and inputs
	date = new Date(2008, 9, 15, 0, 0, 0, 0);
	this.checkEditorsValues("10/15/2008", "Values are as expected", date);
	this.checkFieldsValues(date.toString(), "Values are as expected");
	$("#resetButton2").click();
	this.checkEditorsValues("10/10/2014", "Values are as expected");
	date = new Date("10/10/2014");
	this.checkFieldsValues(date.toString(), "Values are as expected");
	//Set invalid Date - all the editors should fallback to the previous state
	$("#resetButton1").click();
	date = new Date("Wed Dec 12 2012 00:00:00");
	this.checkEditorsValues("12/12/2012", "Values are as expected");
	this.checkFieldsValues(date.toString(), "Values are as expected");
	$("#resetButton").click();
	this.checkEditorsValues("11/11/2011", "Values are as expected");
	date = new Date("11/11/2011");
	this.checkFieldsValues(date.toString(), "Values are as expected");
	$("#resetButton4").click();
	date = new Date();
	this.checkEditorsValues(this.getShortDateAsString(date), "Values are as expected", date);
	this.checkFieldsValues(date.toString(), "Values are as expected");

	//"update from outside input"
	date = new Date();
	$('#inputValue').val(date.toString()).change();
	this.checkEditorsValues(this.getShortDateAsString(date), "Values are as expected", date);			
	this.checkFieldsValues(date.toString(), "Values are as expected");		
	var d = new Date("05/15/2008")
	date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 13, 45, 29, 10);
	$('#inputValue').val(date.toString()).change();
	date = new Date(2008, 4, 15, 13, 45, 29, 10);
	this.checkEditorsValues("5/15/2008", "Values are as expected", date);
	this.checkFieldsValues(date.toString(), "Values are as expected");
	//Split the logic for editors and the divs/spans and inputs
	var dd = new Date("10/10/2014");
	dd = Date.parse(dd);
	date = new Date(dd);
	$('#inputValue').val(date.toString()).change();
	this.checkEditorsValues("10/10/2014", "Values are as expected");
	date = new Date("10/10/2014");
	this.checkFieldsValues(date.toString(), "Values are as expected");
	date = new Date("11/11/2011");
	$('#inputValue').val(date.toString()).change();
	this.checkEditorsValues("11/11/2011", "Values are as expected");
	this.checkFieldsValues(date.toString(), "Values are as expected");

	$('#inputEditor1').remove();
	ko.cleanNode(this.qunitFixture[0]);
	$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", "igDatePicker: { value: dateValue, width: '160px', updateMode: 'onchange' }").appendTo(this.qunitFixture);
	this.applyBindings();

	$('#inputEditor1').igDatePicker('value', '10/10/2010');
	$('#inputEditor1').igDatePicker('setFocus');
	editorInput = $("#inputEditor1").igDatePicker("field").val("10/10/2009").blur();
	this.checkEditorsValues("10/10/2009", "The value is updated on change");
	this.checkFieldsValues(new Date(2009,9,10).toString(), "The value is updated on change");
});

QUnit.test('Test disabled binding', function (assert) {
	assert.expect(12);

	editor = $(this.inputTag).attr("data-bind", "igDatePicker: { width: '200' }, igEditorDisable: isDisabled").appendTo(this.qunitFixture);
	chk = $(this.inputTag).attr("type", "checkbox").attr("data-bind", "checked: isDisabled").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.notOk(editor.igDatePicker("option", "disabled"), "Editor should be enabled");
	assert.notOk(editor.igDatePicker("field").prop("disabled"), "Editor should be enabled");
	assert.equal(editor.igDatePicker("field").attr("disabled"), undefined, "Editor should be enabled");
	assert.notOk(editor.igDatePicker("editorContainer").hasClass($.ui.igDatePicker.prototype.css.disabled), "Editor should be enabled");
	chk.click();
	assert.ok(editor.igDatePicker("option", "disabled"), "Editor should be disabled");
	assert.ok(editor.igDatePicker("field").prop("disabled"), "Editor should be disabled");
	assert.equal(editor.igDatePicker("field").attr("disabled"), "disabled", "Editor should be disabled");
	assert.ok(editor.igDatePicker("editorContainer").hasClass($.ui.igDatePicker.prototype.css.disabled), "Editor should be disabled");
	chk.click();
	chk.click();
	chk.click();
	assert.notOk(editor.igDatePicker("option", "disabled"), "Editor should be enabled");
	assert.notOk(editor.igDatePicker("field").prop("disabled"), "Editor should be enabled");
	assert.equal(editor.igDatePicker("field").attr("disabled"), undefined, "Editor should be enabled");
	assert.notOk(editor.igDatePicker("editorContainer").hasClass($.ui.igDatePicker.prototype.css.disabled), "Editor should be enabled");
});

QUnit.test('Test invalid dates binding', function (assert) {
	assert.expect(2);
	var editor = $(this.inputTag).attr("data-bind", "igDatePicker: { value: invalidDate, width: '160px' }").appendTo(this.qunitFixture);
	this.applyBindings();

	this.model.invalidDate("/Date(-1)");
	assert.equal(editor.igDatePicker("value"), "", "Editor value shouldn't have any value");
	this.model.invalidDate(NaN);
	assert.equal(editor.igDatePicker("value"), "", "Editor value shouldn't have any value");
});

QUnit.test("datePicker bound to non-observable value", function (assert) {
	assert.expect(2);
	var date = new Date("12/15/2017"), done = assert.async(), self = this;
	var editor = $(this.inputTag).attr("data-bind", "igDatePicker: { value: nonObservable, width: '160px'}").appendTo(this.qunitFixture);
	this.applyBindings();

	this.selectDateFromDropdown(editor, "12/15/2017");
	this.util.wait(100).then(function () {
		assert.ok(date.toString() === self.model.nonObservable.toString(), "Changes in the date picker should be reflected in the view model");
		self.model.nonObservable = new Date("12/31/2017");
		assert.ok(editor.igDatePicker("value").toString() !== self.model.nonObservable.toString(), "Changes in the view model shouldn't be reflected in the editor");
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
		$(self.inputTag).attr("data-bind", "igDatePicker: { value: dateValue, width: \"160px\", updateMode: \"none\" }").appendTo(self.qunitFixture);
		self.applyBindings();
	}, function (err) { return err.message.indexOf($.ig.Editor.locale.updateModeUnsupportedValue) > -1; }, 'An error was correctly thrown when updateMode option is not correctly changed');
});

QUnit.test("updateMode set to immediate", function (assert) {
	assert.expect(1);
	var self = this;

	assert.throws(function () {
		$(self.inputTag).attr("data-bind", "igDatePicker: { value: dateValue, width: \"160px\", updateMode: \"immediate\" }").appendTo(self.qunitFixture);
		self.applyBindings();
	}, function (err) { return err.message.indexOf($.ig.Editor.locale.updateModeNotSupported) > -1; }, 'An error was correctly thrown when updateMode option is not correctly changed');
});
