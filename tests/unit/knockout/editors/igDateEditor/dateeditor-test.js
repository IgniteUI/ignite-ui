QUnit.module("Knockout unit tests for igDateEditor", {
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

		this.setDefaultDate = function() {
			self.dateValue(new Date("11/11/2011"));
		};
		this.setDefaultDate1 = function() {
			var d = new Date("Wed Dec 12 2012 00:00:00");
			self.dateValue(d);
		};
		this.setDefaultDate2 = function() {
			var dd = new Date("10/10/2014");
			dd = Date.parse(dd);
			self.dateValue(new Date(dd));
		};
		this.setDefaultDate3 = function() {
			//Update set it using the other way -> setDate(getYear(), getDay()....
			var d = new Date("05/15/2008")
			var date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 13, 45, 29, 10);

			self.dateValue(date);
		};
		this.setDefaultDate4 = function() {
			self.dateValue(new Date());
		};
		this.setDefaultDate5 = function () {
			self.dateValue("/Date(1224043200000)/");
		};
		this.isDisabled =  ko.observable(false);
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

		this.assert.equal($('#inputEditor1').igDateEditor("value").toString(), dateObject.toString(), message + " (inputEditor) date");
		this.assert.equal($('#divEditor1').igDateEditor("value").toString(), dateObject.toString(), message + " (divEditor1) date");
		this.assert.equal($('#spanEditor1').igDateEditor("value").toString(), dateObject.toString(), message + " (tdEditor1) date");
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
	}
});

QUnit.test("Initializing igDateEditor", function (assert) {
	assert.expect(62); //Passing
	this.assert = assert;
	//var done = assert.async(), self = this;

	$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", "igDateEditor: { value: dateValue, width: '160px' }").appendTo(this.qunitFixture);
	$(this.divTag).attr("id", "divEditor1").attr("data-bind", "igDateEditor: { value: dateValue, width: '160px' }").appendTo(this.qunitFixture);
	$(this.spanTag).attr("id", "spanEditor1").attr("data-bind", "igDateEditor: { value: dateValue, width: '160px' }").appendTo(this.qunitFixture);

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

	// Initializing igDateEditor
	assert.ok(typeof(ko.bindingHandlers.igDateEditor) !== 'undefined', 'igDateEditor knockoutJS extention script is not loaded');
	assert.ok(typeof(ko.bindingHandlers.igDateEditor) === 'object', 'igDateEditor knockoutJS extention is of a wrong type');
	assert.ok($('#inputEditor1').data("igDateEditor") !== undefined, 'Creating igDateEditor in an input');
	assert.ok($('#divEditor1').data("igDateEditor") !== undefined, 'Creating igDateEditor in a div');
	assert.ok($('#spanEditor1').data("igDateEditor") !== undefined, 'Creating igDateEditor in a td');
	assert.equal($('#inputEditor1').igDateEditor("value").toString(), this.model.dateValue().toString(), 'The initial value is as expexted');
	assert.equal($('#divEditor1').igDateEditor("value").toString(), this.model.dateValue().toString(), 'The initial value is as expexted');
	assert.equal($('#spanEditor1').igDateEditor("value").toString(), this.model.dateValue().toString(), 'The initial value is as expexted');

	// Update model -> editor (input)"
	$('#inputEditor1').igDateEditor("setFocus");
	$('#inputEditor1').igDateEditor("field").val("11/11/2012").blur();
	this.checkEditorsValues("11/11/2012", "Value are as expected");
	this.checkFieldsValues(new Date("11/11/2012").toString(), "Values are as expected");

	// Update model -> editor (div)
	$('#divEditor1').igDateEditor("setFocus");
	$('#divEditor1').igDateEditor("field").val("09/25/2012").blur();
	this.checkEditorsValues("9/25/2012", "Values are as expected");
	this.checkFieldsValues(new Date("9/25/2012").toString(), "Values are as expected");

	// Update model -> editor (td)
	$('#spanEditor1').igDateEditor("field").val("04/21/2012").blur();
	this.checkEditorsValues("4/21/2012", "Values are as expected");
	this.checkFieldsValues(new Date("4/21/2012").toString(), "Values are as expected");

	// Update Model, check editors
	$("#resetButton3").click();
	//Split the logic for editors and the divs/spans and inputs
	date = new Date(2008, 4, 15, 13, 45, 29, 10);
	this.checkEditorsValues("5/15/2008", "Values are as expected", date);
	this.checkFieldsValues(date.toString(), "Values are as expected");
	$("#resetButton2").click();
	this.checkEditorsValues("10/10/2014", "Values are as expected");
	date = new Date("10/10/2014");
	this.checkFieldsValues(date.toString(), "Values are as expected");
	//Set invalid Date - all the editors should fallback to the previous state
	$("#resetButton1").click();
	date = new Date("Wed Dec 12 2012");
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

	$('#inputEditor1').remove();
	ko.cleanNode(this.qunitFixture[0]);
	$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", "igDateEditor: { value: dateValue, width: '160px', updateMode: 'onchange' }").appendTo(this.qunitFixture);
	this.applyBindings();

	$('#inputEditor1').igDateEditor('value', '10/10/2010');
	$('#inputEditor1').igDateEditor('setFocus');
	editorInput = $("#inputEditor1").igDateEditor("field").val("10/10/2009").blur();
	this.checkEditorsValues("10/10/2009", "The value is updated on change");
	this.checkFieldsValues(new Date(2009,9,10).toString(), "The value is updated on change");
});


QUnit.test("Value set to nonObservable value", function (assert) {
	assert.expect(3);

	editor = $(this.inputTag).attr("data-bind", "igDateEditor: { value: nonObservable, width: '160px' }").appendTo(this.qunitFixture);
	editorObs = $(this.inputTag).attr("data-bind", "igDateEditor: { value: dateValue, width: '160px' }").appendTo(this.qunitFixture);
	button = $(this.inputTag).attr("type", "button").attr("data-bind", "click: setDefaultDate").appendTo(this.qunitFixture);
	output = $(this.inputTag).appendTo(this.qunitFixture);
	this.applyBindings();

	date = new Date(this.model.nonObservable);
	assert.equal(editor.igDateEditor("value").toString(), date.toString(), "NonObservable value is assigned correctly");
	editor.igDateEditor("value", "10/10/2010");
	evt = $.Event("keypress");
	evt.keyCode = 88;
	output.trigger(evt);
	assert.notEqual(editor.igDateEditor("value").toString(), editorObs.igDateEditor("value").toString(), "The value should not be updated");
	//Set Defaul value from the model
	button.click();
	//The value of the nonObservable should not be updated
	assert.notEqual(editor.igDateEditor("value").toString(), editorObs.igDateEditor("value").toString(), "The value should not be updated");
});


QUnit.test('Test disabled binding', function (assert) {
	assert.expect(12);

	editor = $(this.inputTag).attr("data-bind", "igDateEditor: { width: '200' }, igEditorDisable: isDisabled").appendTo(this.qunitFixture);
	chk = $(this.inputTag).attr("type", "checkbox").attr("data-bind", "checked: isDisabled").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.notOk(editor.igDateEditor("option", "disabled"), "Editor should be enabled");
	assert.notOk(editor.igDateEditor("field").prop("disabled"), "Editor should be enabled");
	assert.equal(editor.igDateEditor("field").attr("disabled"), undefined, "Editor should be enabled");
	assert.notOk(editor.igDateEditor("editorContainer").hasClass($.ui.igDateEditor.prototype.css.disabled), "Editor should be enabled");
	chk.click();
	assert.ok(editor.igDateEditor("option", "disabled"), "Editor should be disabled");
	assert.ok(editor.igDateEditor("field").prop("disabled"), "Editor should be disabled");
	assert.equal(editor.igDateEditor("field").attr("disabled"), "disabled", "Editor should be disabled");
	assert.ok(editor.igDateEditor("editorContainer").hasClass($.ui.igDateEditor.prototype.css.disabled), "Editor should be disabled");
	chk.click();
	chk.click();
	chk.click();
	assert.notOk(editor.igDateEditor("option", "disabled"), "Editor should be enabled");
	assert.notOk(editor.igDateEditor("field").prop("disabled"), "Editor should be enabled");
	assert.equal(editor.igDateEditor("field").attr("disabled"), undefined, "Editor should be enabled");
	assert.notOk(editor.igDateEditor("editorContainer").hasClass($.ui.igDateEditor.prototype.css.disabled), "Editor should be enabled");
});

QUnit.test('Test value set to non-observable value remains non-observable after changing it in UI.', function (assert) {
	assert.expect(3);

	editor = $(this.inputTag).attr("data-bind", "igDateEditor: { value: nonObservable, width: 160 }").appendTo(this.qunitFixture);
	this.applyBindings();

	date = new Date(this.model.nonObservable);
	assert.equal(editor.igDateEditor("value").toString(), date.toString(), "NonObservable value is assigned correctly");

	// Change igEditor's value in UI so the igdateeditorvaluechanged gets fired
	// and verify the change is reflected, but the value remains nonObservable.
	stringDate = "01/01/2009";
	editorInput = editor.igDateEditor("field");
	editorInput.focus().val(stringDate);
	editorInput.blur();
	assert.equal(editor.igDateEditor("value").toString(), new Date(stringDate).toString(), "Value should be changed when interact through UI");
	assert.notOk(ko.isObservable(editor.igDateEditor("value")), "Value should be non-observable");
});

QUnit.test('Test isNaN for Date object', function (assert) {
	assert.expect(2);

	editor = $(this.inputTag).attr("data-bind", "igDateEditor: { value: dateValue, width: 160 }").appendTo(this.qunitFixture);
	this.applyBindings();
	
	// Set model.DateValue to NaN value and verify the editor's value remains the previous one, because the new value is NaN.
	var date = "invaliddate";
	var parsedDate = Date.parse(date);
	this.model.dateValue(date);
	assert.ok(isNaN(parsedDate), "Parsed Date should be NaN.");
	assert.notEqual($("#tempEditor").igDateEditor("value").toString(), parsedDate.toString(), "Editor's value should not be NaN.");
});

QUnit.test('Test IvalidValue for Date object', function (assert) {
	assert.expect(3);

	editor = $(this.inputTag).attr("data-bind", "igDateEditor: { value: dateValue }").appendTo(this.qunitFixture);
	this.applyBindings();
	
	// Set model.dateValue to "/Date(1224043200000)/" and verify the editor's value is correct.
	var val = "/Date(1224043200000)/";
	var valDate = new Date(1224043200000);			
	this.model.dateValue(val);
	assert.equal(editor.igDateEditor("value").toString(), valDate.toString(), "Value of the editor should be valid.")

	// Set model.dateValue to "/Date("abc")/" and verify the editor's value remains the previouse one, because the new value is invalid.
	val = "/Date(\"abc\")/";
	valDate = new Date("abc");
	this.model.dateValue(val);
	assert.equal(valDate.toString(), "Invalid Date", "Value should be 'Invalid Date'");
	assert.notEqual(editor.igDateEditor("value").toString(), valDate.toString(), "Editor's value should not be invalid.");
});


QUnit.test("updateMode set to not allowed value", function (assert) {
	assert.expect(1);
	var self = this;

	assert.throws(function () {
		$(self.inputTag).attr("data-bind", "igDateEditor: { value: dateValue, width: \"160px\", updateMode: \"none\" }").appendTo(self.qunitFixture);
		self.applyBindings();
	}, function (err) { return err.message.indexOf($.ig.Editor.locale.updateModeUnsupportedValue) > -1; }, 'An error was correctly thrown when updateMode option is not correctly changed');
});

QUnit.test("updateMode set to immediate", function (assert) {
	assert.expect(1);
	var self = this;

	assert.throws(function () {
		$(self.inputTag).attr("data-bind", "igDateEditor: { value: dateValue, width: \"160px\", updateMode: \"immediate\" }").appendTo(self.qunitFixture);
		self.applyBindings();
	}, function (err) { return err.message.indexOf($.ig.Editor.locale.updateModeNotSupported) > -1; }, 'An error was correctly thrown when updateMode option is not correctly changed');
});
