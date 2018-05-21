QUnit.module("Knockout unit tests for igNumericEditor", {
	inputTag: '<input></input>',
	divTag: '<div></div>',
	spanTag: '<span></span>',
	util: $.ig.TestUtil,
	editor: null,
	model: null,
	input: function() {
		return this.editor.igNumericEditor("field");
	},
	container: function() {
		return this.editor.igNumericEditor("editorContainer");
	},
	viewModel: function() {
		var self = this;
		nonObservable = 244;
		this.nonObservable2 = 245;
		this.numberValue = ko.observable(25);
		this.textValue = ko.observable("Some Val");
		setDefaultNumber = function() {
			self.numberValue(27);   
		};
		setDefaultText = function() {
			self.textValue("Default Text");
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
		this.assert.equal($('#inputEditor1').igNumericEditor("value").toString(), val, message + " (inputEditor)");
		this.assert.equal($('#divEditor1').igNumericEditor("value").toString(), val, message + " (divEditor1)");
		this.assert.equal($('#spanEditor1').igNumericEditor("value").toString(), val, message + " (tdEditor1)");
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

QUnit.test("Initializing igNumericEditor", function (assert) {
	assert.expect(87);
	this.assert = assert;
	var done = assert.async(), self = this;

	$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", "igNumericEditor: { value: numberValue, width: '160px' }").appendTo(this.qunitFixture);
	$(this.divTag).attr("id", "divEditor1").attr("data-bind", "igNumericEditor: { value: numberValue, width: '160px' }").appendTo(this.qunitFixture);
	$(this.spanTag).attr("id", "spanEditor1").attr("data-bind", "igNumericEditor: { value: numberValue, width: '160px' }").appendTo(this.qunitFixture);
	$(this.inputTag).attr("id", "inputValue").attr("data-bind", "value: numberValue").appendTo(this.qunitFixture);
	$(this.divTag).attr("id", "divValue").attr("data-bind", "text: numberValue").appendTo(this.qunitFixture);
	$(this.spanTag).attr("id", "spanValue").attr("data-bind", "text: numberValue").appendTo(this.qunitFixture);
	$(this.inputTag).attr("id", "resetButton").attr("type", "button").attr("data-bind", "click: setDefaultNumber").appendTo(this.qunitFixture);
	this.applyBindings();

	// Initializing igNumericEditor
	assert.ok(typeof(ko.bindingHandlers.igNumericEditor) !== 'undefined', 'igNumericEditor knockoutJS extention script is not loaded');
	assert.ok(typeof(ko.bindingHandlers.igNumericEditor) === 'object', 'igNumericEditor knockoutJS extention is of a wrong type');
	assert.ok($('#inputEditor1').data("igNumericEditor") !== undefined, 'Creating igNumericEditor in an input');
	assert.ok($('#divEditor1').data("igNumericEditor") !== undefined, 'Creating igNumericEditor in a div');
	assert.ok($('#spanEditor1').data("igNumericEditor") !== undefined, 'Creating igNumericEditor in a td');
	assert.equal($('#inputEditor1').igNumericEditor("value").toString(), this.model.numberValue(), 'The initial value is as expexted');
	assert.equal($('#divEditor1').igNumericEditor("value").toString(), this.model.numberValue(), 'The initial value is as expexted');
	assert.equal($('#spanEditor1').igNumericEditor("value").toString(), this.model.numberValue(), 'The initial value is as expexted');

	// Update model -> editor (input)"
	$('#inputEditor1').igNumericEditor("setFocus");
	$('#inputEditor1').igNumericEditor("field").val(52).blur();
	this.checkAllValues(52, "Value are as expected");

	// Update model -> editor (div)
	$('#divEditor1').igNumericEditor("setFocus");
	$('#divEditor1').igNumericEditor("field").val(15.3).blur();
	this.checkAllValues(15.3, "Values are as expected");

	// Update model -> editor (td)
	$('#spanEditor1').igNumericEditor("field").val(369).blur();
	this.checkAllValues(369, "Values are as expected");

	// Update Model, check editors
	$("#resetButton").click();
	this.checkAllValues(27, "Values are as expected");

	$('#inputEditor1').remove();
	ko.cleanNode(this.qunitFixture[0]);
	$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", "igNumericEditor: { value: numberValue, width: '160px', updateMode: 'onchange' }").appendTo(this.qunitFixture);
	this.applyBindings();

	editorInput = $('#inputEditor1').igNumericEditor("field");
	$('#inputEditor1').igNumericEditor('setFocus');
	editorInput.val(485).blur();
	this.checkAllValues(485, "The value is updated on change");

	$("#inputValue").focus().val(236).change();
	this.checkAllValues(236, "Values are as expected");

	$("#inputValue").focus().val(23.6).change();
	this.checkAllValues(23.6, "Values are as expected");

	ko.cleanNode(this.qunitFixture[0]);
	editor = $(this.inputTag).attr("data-bind", "igNumericEditor: { value: numberValue, width: 160, updateMode:\"immediate\", listItems : [\"25\", \"15\", \"263\" ],buttonType: \"dropdown\"}").appendTo(this.qunitFixture);
	this.applyBindings();

	editor.igNumericEditor("dropDownButton").click();
	item1 = editor.data("igNumericEditor")._listItems()[2];
	this.util.mouseEvent(item1, "click");
	this.checkAllValues(263, "The value is updated on list selection changed");
	editor.igNumericEditor("dropDownButton").click();
	item1 = editor.data("igNumericEditor")._listItems()[0];
	this.util.mouseEvent(item1, "click");
	this.checkAllValues(25, "The value is updated on on list selection changed");
	$("#resetButton").click();
	//Check if this editor defaults the value
	assert.equal(editor.igNumericEditor("value"), 27, "The default text is correct");
	
	$('#inputEditor1').remove();
	ko.cleanNode(this.qunitFixture[0]);
	$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", "igNumericEditor: { value: numberValue, width: '160px', updateMode: 'immediate' }").appendTo(this.qunitFixture);
	this.applyBindings();

	$('#inputEditor1').igNumericEditor("setFocus");
	$('#inputEditor1').igNumericEditor("value", "");
	//$('#inputEditor1').data("igNumericEditor")._exitEditMode();
	editorInput = $('#inputEditor1').igNumericEditor("field");
	this.util.wait(100).then(function () {
		self.util.keyInteraction(54, editorInput);
		self.checkAllValues(6, "The value is updated on keyUp");
		self.util.keyInteraction(56, editorInput);
		self.checkAllValues(68, "The value is updated on keyUp");
		self.util.keyInteraction(52, editorInput);
		self.checkAllValues(684, "The value is updated on keyUp");
		editorInput.blur();
		self.checkAllValues(684, "The value is changed on blur");
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

	var editor = $(this.inputTag).attr("id", "edChangeEvt").attr("data-bind", "igNumericEditor: { updateMode: 'immediate', value: customerTax, tabIndex: 1, buttonType: 'clear', valueChanged: testFunction }").appendTo(this.qunitFixture);
	var editorOff = $(this.inputTag).attr("id", "edChangeEvtImmOff").attr("data-bind", "igNumericEditor: { value: customerTax, tabIndex: 1, buttonType: 'clear', valueChanged: testFunction }").appendTo(this.qunitFixture);
	this.applyBindings();

	editor.igNumericEditor("setFocus");
	this.util.type("120", editor.igNumericEditor("field"));
	editor.trigger("blur");
	this.util.wait(100).then(function () {
		assert.ok(self.model.eventTriggered, "valueChanged is thrown");
		self.model.eventTriggered = false;
		editorOff.igNumericEditor("setFocus");
		self.util.type("100", editorOff.igNumericEditor("field"));
		editorOff.trigger("blur");
		return self.util.wait(100);
	}).then(function () {
		assert.ok(self.model.eventTriggered, "valueChanged is thrown");
		self.model.eventTriggered = false;
		editorOff.igNumericEditor("setFocus");
		editorOff.igNumericEditor("clearButton").click();
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

	var editor = $(this.inputTag).attr("data-bind", "igNumericEditor: { value: numberValue, width: 160, regional:'de', minDecimals: 2 }").appendTo(this.qunitFixture);
	var input = $(this.inputTag).attr("data-bind", "value: numberValue").appendTo(this.qunitFixture);
	var reset = $(this.inputTag).attr("type", "button").attr("data-bind", "click: setDefaultNumber").appendTo(this.qunitFixture);
	this.applyBindings();
	
	input.val(0.123).change();
	assert.equal(editor.igNumericEditor("value"), 0.12, "Value is as expected");
	assert.equal(editor.igNumericEditor("displayValue"), "0,12", "displayValue is correct");
	reset.click();
	assert.equal(editor.igNumericEditor("value"), 27, "Value is as expected");
	assert.equal(editor.igNumericEditor("displayValue"), "27,00", "displayValue is correct");
	input.val("").change();
	assert.equal(editor.igNumericEditor("value"), "", "Value is as expected");
	assert.equal(editor.igNumericEditor("displayValue"), "", "displayValue is correct");
});

QUnit.test('Test disabled binding', function (assert) {
	assert.expect(12);

	editor = $(this.inputTag).attr("data-bind", "igNumericEditor: { width: '200' }, igEditorDisable: isDisabled").appendTo(this.qunitFixture);
	chk = $(this.inputTag).attr("type", "checkbox").attr("data-bind", "checked: isDisabled").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.notOk(editor.igNumericEditor("option", "disabled"), "Editor should be enabled");
	assert.notOk(editor.igNumericEditor("field").prop("disabled"), "Editor should be enabled");
	assert.equal(editor.igNumericEditor("field").attr("disabled"), undefined, "Editor should be enabled");
	assert.notOk(editor.igNumericEditor("editorContainer").hasClass($.ui.igNumericEditor.prototype.css.disabled), "Editor should be enabled");
	chk.click();
	assert.ok(editor.igNumericEditor("option", "disabled"), "Editor should be disabled");
	assert.ok(editor.igNumericEditor("field").prop("disabled"), "Editor should be disabled");
	assert.equal(editor.igNumericEditor("field").attr("disabled"), "disabled", "Editor should be disabled");
	assert.ok(editor.igNumericEditor("editorContainer").hasClass($.ui.igNumericEditor.prototype.css.disabled), "Editor should be disabled");
	chk.click();
	chk.click();
	chk.click();
	assert.notOk(editor.igNumericEditor("option", "disabled"), "Editor should be enabled");
	assert.notOk(editor.igNumericEditor("field").prop("disabled"), "Editor should be enabled");
	assert.equal(editor.igNumericEditor("field").attr("disabled"), undefined, "Editor should be enabled");
	assert.notOk(editor.igNumericEditor("editorContainer").hasClass($.ui.igNumericEditor.prototype.css.disabled), "Editor should be enabled");
});

QUnit.test('Test null binding', function (assert) {
	assert.expect(3);
	var editor =  $(this.inputTag).attr("data-bind", "igNumericEditor: { value: nullValue, allowNullValue: true }").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.equal(editor.igNumericEditor("value"), null, "Editor should have null as a value");
	this.model.nullValue(23);
	assert.equal(editor.igNumericEditor("value"), 23, "Editor should have 23 as a value");
	this.model.nullValue(null);
	assert.equal(editor.igNumericEditor("value"), null, "Editor should have null as a value");
});

QUnit.test("Value set when bound to a ViewModel's non-observable field", function (assert) {
	assert.expect(4);
	var done = assert.async(), self = this;

	var editor =  $(this.inputTag).attr("data-bind", "igNumericEditor: { value: nonObservable2, width: 160 }").appendTo(this.qunitFixture);
	this.applyBindings();
	this.model.nonObservable2 = 245;
	assert.equal(this.model.nonObservable2, 245); // check the inital value
	editor.focus(); // focus editor
	editor.val(255); // change the editor's value
	editor.blur(); // lose editor's focus to allow KO to update the binding
	assert.equal(this.model.nonObservable2, 255); // check for the new value
	editor.remove();
	ko.cleanNode(this.qunitFixture[0]);

	var editor =  $(this.inputTag).attr("data-bind", "igNumericEditor: { value: nonObservable2, width: 160, updateMode:\"immediate\" }").appendTo(this.qunitFixture);
	this.applyBindings();
	this.model.nonObservable2 = 245;
	assert.equal(this.model.nonObservable2, 245); // check the inital value
	editor.igNumericEditor("setFocus"); // focus editor
	this.util.wait(100).then(function () {
		self.util.type("256", editor.igNumericEditor("field"));
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
		$(self.inputTag).attr("data-bind", "igNumericEditor: { value: numberValue, width: \"160px\", updateMode: \"none\" }").appendTo(self.qunitFixture);
		self.applyBindings();
	}, function (err) { return err.message.indexOf($.ig.Editor.locale.updateModeUnsupportedValue) > -1; }, 'An error was correctly thrown when updateMode option is not correctly changed');
});