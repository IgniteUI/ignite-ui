QUnit.module("Knockout unit tests for igPercentEditor", {
	inputTag: '<input></input>',
	divTag: '<div></div>',
	spanTag: '<span></span>',
	util: $.ig.TestUtil,
	editor: null,
	model: null,
	input: function() {
		return this.editor.igPercentEditor("field");
	},
	container: function() {
		return this.editor.igPercentEditor("editorContainer");
	},
	dropDownButton: function() {
		return this.editor.igPercentEditor("dropDownButton");
	},
	viewModel: function() {
		var self = this;
		this.nonObservable = 44;
		this.nonObservable2 = 245;
		this.percentNumber = ko.observable(32);
		this.setDefaultPercentNumber = function () {
			self.percentNumber(32);
		};
		this.customerTax = ko.observable(100);
		this.testFunction = function (evt, ui) {
			self.eventTriggered = true;
		};
		this.isDisabled =  ko.observable(false);
		this.nullValue = ko.observable(null);
	},
	applyBindings: function() {
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
		ko.cleanNode(this.qunitFixture[0]);
	},
	checkEditorsValues: function (val, message) {
		this.assert.equal($('#inputEditor1').igPercentEditor("value"), val, message + " (inputEditor)");
		this.assert.equal($('#divEditor1').igPercentEditor("value"), val, message + " (divEditor1)");
		this.assert.equal($('#spanEditor1').igPercentEditor("value"), val, message + " (tdEditor1)");
	},
	checkFieldsValues: function (val, message) {
		this.assert.equal($("#inputValue").val(), val, message + " (inputValue)");
		this.assert.equal($("#divValue").html(), val, message + " (divValue)");
		this.assert.equal($("#spanValue").html(), val, message + " (spanValue)");
	},
	checkAllValues: function (val, message) {
		this.checkEditorsValues(val, message);
		this.checkFieldsValues(val, message);
	}
});

QUnit.test("Initializing igPercentEditor", function (assert) {
	assert.expect(112);
	this.assert = assert;
	var done = assert.async(), self = this;

	$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", "igPercentEditor: { value: percentNumber, dataMode: 'double', width: '160px', displayFactor: 1, minDecimals: 3 }").appendTo(this.qunitFixture);
	$(this.divTag).attr("id", "divEditor1").attr("data-bind", "igPercentEditor: { value: percentNumber, dataMode: 'double',width: '160px' }").appendTo(this.qunitFixture);
	$(this.spanTag).attr("id", "spanEditor1").attr("data-bind", "igPercentEditor: { value: percentNumber, dataMode: 'double', width: '160px', displayFactor: 1,  minDecimals: 3}").appendTo(this.qunitFixture);
	$(this.inputTag).attr("id", "inputValue").attr("data-bind", "value: percentNumber").appendTo(this.qunitFixture);
	$(this.divTag).attr("id", "divValue").attr("data-bind", "text: percentNumber").appendTo(this.qunitFixture);
	$(this.spanTag).attr("id", "spanValue").attr("data-bind", "text: percentNumber").appendTo(this.qunitFixture);
	$(this.inputTag).attr("id", "resetButton").attr("type", "button").attr("data-bind", "click: setDefaultPercentNumber").appendTo(this.qunitFixture);
	this.applyBindings();

	// Initializing igPercentEditor
	assert.ok(typeof(ko.bindingHandlers.igPercentEditor) !== 'undefined', 'igPercentEditor knockoutJS extention script is not loaded');
	assert.ok(typeof(ko.bindingHandlers.igPercentEditor) === 'object', 'igPercentEditor knockoutJS extention is of a wrong type');
	assert.ok($('#inputEditor1').data("igPercentEditor") !== undefined, 'Creating igPercentEditor in an input');
	assert.ok($('#divEditor1').data("igPercentEditor") !== undefined, 'Creating igPercentEditor in a div');
	assert.ok($('#spanEditor1').data("igPercentEditor") !== undefined, 'Creating igPercentEditor in a td');
	assert.equal($('#inputEditor1').igPercentEditor("value").toString(), this.model.percentNumber(), 'The initial value is as expexted');
	assert.equal($('#divEditor1').igPercentEditor("value").toString(), this.model.percentNumber(), 'The initial value is as expexted');
	assert.equal($('#spanEditor1').igPercentEditor("value").toString(), this.model.percentNumber(), 'The initial value is as expexted');

	// Update model -> editor (input)"
	$('#inputEditor1').igPercentEditor("setFocus");
	$('#inputEditor1').igPercentEditor("field").val(52).blur();
	this.checkAllValues(52, "Value are as expected");

	// Update model -> editor (div)
	$('#divEditor1').igPercentEditor("setFocus");
	$('#divEditor1').igPercentEditor("field").val(15.3).blur();
	this.checkAllValues(0.153, "Values are as expected");

	// Update model -> editor (td)
	$('#spanEditor1').igPercentEditor("field").val(369).blur();
	this.checkAllValues(369, "Values are as expected");

	// Update Model, check editors
	$("#resetButton").click();
	this.checkAllValues(32, "Values are as expected");

	$('#inputEditor1').remove();
	ko.cleanNode(this.qunitFixture[0]);
	$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", "igPercentEditor: { value: percentNumber, displayFactor: 1, width: '160px', updateMode: 'onchange' }").appendTo(this.qunitFixture);
	this.applyBindings();

	editorInput = $('#inputEditor1').igPercentEditor("field");
	$('#inputEditor1').igPercentEditor('setFocus');
	editorInput.val(485).blur();
	this.checkAllValues(485, "The value is updated on change");

	$("#inputValue").trigger("focus").val(236).change();
	this.checkAllValues(236, "Values are as expected");

	$("#inputValue").trigger("focus").val(23.6).change();
	this.checkAllValues(23.6, "Values are as expected");

	$("#inputValue").trigger("focus").val(-26).change();
	this.checkAllValues(-26, "Values are as expected");

	ko.cleanNode(this.qunitFixture[0]);
	var editor1 = this.editor = $(this.inputTag).attr("data-bind", "igPercentEditor: { value: percentNumber, displayFactor: 1, width: 160, updateMode:\"immediate\" , listItems : [\"25\", \"15\", \"263\", \"0.5\"],button: \"dropdown\"}").appendTo(this.qunitFixture);
	var editor100 = $(this.inputTag).attr("data-bind", "igPercentEditor: { value: percentNumber, displayFactor: 100, width: 160, updateMode:\"immediate\" , listItems : [\"25\", \"15\", \"263\", \"0.5\"],button: \"dropdown\"}").appendTo(this.qunitFixture);
	this.applyBindings();

	editor100.igPercentEditor("dropDownButton").click();
	item1 = editor100.data("igPercentEditor")._listItems()[3];
	this.util.mouseEvent(item1, "click");
	this.checkAllValues(0.5, "The value is updated on list selection changed");
	editor100.igPercentEditor("dropDownButton").click();
	item1 = editor100.data("igPercentEditor")._listItems()[0];
	this.util.mouseEvent(item1, "click");
	this.checkAllValues(25, "The value is updated on on list selection changed");
	$("#resetButton").click();
	//Check if this editor defaults the value
	assert.equal(editor100.igPercentEditor("value"), 32, "The default text is correct");
	this.model.nonObservable = 263;

	this.dropDownButton().click();
	item1 = editor1.data("igPercentEditor")._listItems()[2];
	this.util.mouseEvent(item1, "click");

	this.checkAllValues(263, "The value is updated on list selection changed");
	//editor.data("igPercentEditor")._listSelect(0, 1);
	this.dropDownButton().click();
	item1 = editor1.data("igPercentEditor")._listItems()[0];
	this.util.mouseEvent(item1, "click");
	this.checkAllValues(25, "The value is updated on on list selection changed");
	$("#resetButton").click();
	//Check if this editor defaults the value
	assert.equal(editor1.igPercentEditor("value"), 32, "The default text is correct");

	this.editor = editor100;
	// Check with displayFactor:
	this.dropDownButton().click();
	item1 = editor100.data("igPercentEditor")._listItems()[3];
	this.util.mouseEvent(item1, "click");
	this.checkAllValues(0.5, "The value is not correct on list selection changed");
	
	$('#inputEditor1').remove();
	ko.cleanNode(this.qunitFixture[0]);
	$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", "igPercentEditor: { value: percentNumber, width: '160px', updateMode: 'immediate' }").appendTo(this.qunitFixture);
	this.applyBindings();

	$('#inputEditor1').igPercentEditor("setFocus");
	$('#inputEditor1').igPercentEditor("value", "");
	//$('#inputEditor1').data("igPercentEditor")._exitEditMode();
	editorInput = $('#inputEditor1').igPercentEditor("field");
	this.util.wait(100).then(function () {
		self.util.keyInteraction(54, editorInput);
		self.checkAllValues(0.06, "The value is updated on keyUp");
		self.util.keyInteraction(56, editorInput);
		self.checkAllValues(0.68, "The value is updated on keyUp");
		self.util.keyInteraction(52, editorInput);
		self.checkAllValues(6.84, "The value is updated on keyUp");
		editorInput.blur();
		self.checkAllValues(6.84, "The value is changed on blur");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('Test valueChanged event', function (assert) {
	assert.expect(3);
	this.assert = assert;
	var done = assert.async(), self = this;

	var editor = $(this.inputTag).attr("id", "edChangeEvt").attr("data-bind", "igPercentEditor: { updateMode: 'immediate', value: customerTax, tabIndex: 1, buttonType: 'clear', valueChanged: testFunction }").appendTo(this.qunitFixture);
	var editorOff = $(this.inputTag).attr("id", "edChangeEvtImmOff").attr("data-bind", "igPercentEditor: { value: customerTax, tabIndex: 1, buttonType: 'clear', valueChanged: testFunction }").appendTo(this.qunitFixture);
	this.applyBindings();

	editor.igPercentEditor("setFocus");
	this.util.type("120", editor.igPercentEditor("field"));
	editor.trigger("blur");
	this.util.wait(100).then(function () {
		assert.ok(self.model.eventTriggered, "valueChanged is thrown");
		self.model.eventTriggered = false;
		editorOff.igPercentEditor("setFocus");
		self.util.type("100", editorOff.igPercentEditor("field"));
		editorOff.trigger("blur");
		return self.util.wait(100);
	}).then(function () {
		assert.ok(self.model.eventTriggered, "valueChanged is thrown");
		self.model.eventTriggered = false;
		editorOff.igPercentEditor("setFocus");
		editorOff.igPercentEditor("clearButton").click();
		editorOff.trigger("blur");
		assert.ok(self.model.eventTriggered, "valueChanged is thrown");
		self.model.eventTriggered = false;
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("Test regional with reversed decimal(,) and group(.) separators like 'de' .Update from outside input.", function (assert) {
	assert.expect(6);

	var editor = $(this.inputTag).attr("data-bind", "igPercentEditor: { value: percentNumber, width: 160, regional:'de', minDecimals: 2 }").appendTo(this.qunitFixture);
	var input = $(this.inputTag).attr("data-bind", "value: percentNumber").appendTo(this.qunitFixture);
	var reset = $(this.inputTag).attr("type", "button").attr("data-bind", "click: setDefaultPercentNumber").appendTo(this.qunitFixture);
	this.applyBindings();
	
	input.val(0.123).change();
	assert.equal(editor.igPercentEditor("value"), 0.123, "Value is as expected");
	assert.equal(editor.igPercentEditor("displayValue"), "12,30%", "displayValue is correct");
	reset.click();
	assert.equal(editor.igPercentEditor("value"), 32, "Value is as expected");
	assert.equal(editor.igPercentEditor("displayValue"), "3.200,00%", "displayValue is correct");
	input.val("").change();
	assert.equal(editor.igPercentEditor("value"), "", "Value is as expected");
	assert.equal(editor.igPercentEditor("displayValue"), "", "displayValue is correct");
});

QUnit.test('Test disabled binding', function (assert) {
	assert.expect(12);

	editor = $(this.inputTag).attr("data-bind", "igPercentEditor: { width: '200' }, igEditorDisable: isDisabled").appendTo(this.qunitFixture);
	chk = $(this.inputTag).attr("type", "checkbox").attr("data-bind", "checked: isDisabled").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.notOk(editor.igPercentEditor("option", "disabled"), "Editor should be enabled");
	assert.notOk(editor.igPercentEditor("field").prop("disabled"), "Editor should be enabled");
	assert.equal(editor.igPercentEditor("field").attr("disabled"), undefined, "Editor should be enabled");
	assert.notOk(editor.igPercentEditor("editorContainer").hasClass($.ui.igPercentEditor.prototype.css.disabled), "Editor should be enabled");
	chk.click();
	assert.ok(editor.igPercentEditor("option", "disabled"), "Editor should be disabled");
	assert.ok(editor.igPercentEditor("field").prop("disabled"), "Editor should be disabled");
	assert.equal(editor.igPercentEditor("field").attr("disabled"), "disabled", "Editor should be disabled");
	assert.ok(editor.igPercentEditor("editorContainer").hasClass($.ui.igPercentEditor.prototype.css.disabled), "Editor should be disabled");
	chk.click();
	chk.click();
	chk.click();
	assert.notOk(editor.igPercentEditor("option", "disabled"), "Editor should be enabled");
	assert.notOk(editor.igPercentEditor("field").prop("disabled"), "Editor should be enabled");
	assert.equal(editor.igPercentEditor("field").attr("disabled"), undefined, "Editor should be enabled");
	assert.notOk(editor.igPercentEditor("editorContainer").hasClass($.ui.igPercentEditor.prototype.css.disabled), "Editor should be enabled");
});

QUnit.test('Test null binding', function (assert) {
	assert.expect(3);
	var editor =  $(this.inputTag).attr("data-bind", "igPercentEditor: { value: nullValue, allowNullValue: true }").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.equal(editor.igPercentEditor("value"), null, "Editor should have null as a value");
	this.model.nullValue(23);
	assert.equal(editor.igPercentEditor("value"), 23, "Editor should have 23 as a value");
	this.model.nullValue(null);
	assert.equal(editor.igPercentEditor("value"), null, "Editor should have null as a value");
});
 
QUnit.test("Value set to nonObservable value", function (assert) {
	assert.expect(6);
		
	var editor = this.editor = $(this.inputTag).attr("data-bind", "igPercentEditor: { value: nonObservable, width: 160 }").appendTo(this.qunitFixture);
	this.applyBindings();
	assert.equal(editor.igPercentEditor("value"), this.model.nonObservable, "NonObservable value is assigned correctly");

	editor.igPercentEditor("select");
	this.util.keyInteraction(49, this.input());
	this.input(),blur();
	assert.equal(editor.igPercentEditor("value"), this.model.nonObservable, "The value should be updated");
	this.model.nonObservable = 42;
	// The value of the checkbox editor shouldn't be updated
	assert.notEqual(editor.igPercentEditor("value"), this.model.nonObservable, "The value should not be updated");
	
	editor.remove();
	ko.cleanNode(this.qunitFixture[0]);
	var editor = this.editor = $(this.inputTag).attr("data-bind", "igPercentEditor: { value: nonObservable, width: 160, updateMode:\"immediate\" }").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.equal(editor.igPercentEditor("value"), this.model.nonObservable, "NonObservable value is assigned correctly");
	editor.igPercentEditor("select");
	this.util.keyInteraction(49, this.input());
	assert.equal(editor.igPercentEditor("value"), this.model.nonObservable, "The value should be updated");
	
	this.model.nonObservable = 42;
	assert.notEqual(editor.igPercentEditor("value"), this.model.nonObservable, "The value should not be updated");
});

QUnit.test("Value set when bound to a ViewModel's non-observable field", function (assert) {
	assert.expect(4);
	var done = assert.async(), self = this;

	var editor =  $(this.inputTag).attr("data-bind", "igPercentEditor: { value: nonObservable2, displayFactor: 1, width: 160 }").appendTo(this.qunitFixture);
	this.applyBindings();
	this.model.nonObservable2 = 245;
	assert.equal(this.model.nonObservable2, 245); // check the inital value
	editor.trigger("focus"); // focus editor
	editor.val(255); // change the editor's value
	editor.blur(); // lose editor's focus to allow KO to update the binding
	assert.equal(this.model.nonObservable2, 255); // check for the new value
	editor.remove();
	ko.cleanNode(this.qunitFixture[0]);

	var editor =  $(this.inputTag).attr("data-bind", "igPercentEditor: { value: nonObservable2, displayFactor: 1, width: 160, updateMode:\"immediate\" }").appendTo(this.qunitFixture);
	this.applyBindings();
	this.model.nonObservable2 = 245;
	assert.equal(this.model.nonObservable2, 245); // check the inital value
	editor.igPercentEditor("setFocus"); // focus editor
	this.util.wait(100).then(function () {
		self.util.type("256", editor.igPercentEditor("field"));
		editor.trigger("blur"); // lose editor's focus to allow KO to update the binding
		assert.equal(self.model.nonObservable2, 256); // check for the new value
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
		$(self.inputTag).attr("data-bind", "igPercentEditor: { value: percentNumber, width: \"160px\", updateMode: \"none\" }").appendTo(self.qunitFixture);
		self.applyBindings();
	}, function (err) { return err.message.indexOf($.ig.Editor.locale.updateModeUnsupportedValue) > -1; }, 'An error was correctly thrown when updateMode option is not correctly changed');
});