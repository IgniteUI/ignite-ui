QUnit.module("Knockout unit tests for igTextEditor", {
	inputTag: '<input></input>',
	divTag: '<div></div>',
	spanTag: '<span></span>',
	util: $.ig.TestUtil,
	editor: null,
	model: null,
	input: function() {
		return this.editor.igTextEditor("field");
	},
	container: function() {
		return this.editor.igTextEditor("editorContainer");
	},
	dropDownButton: function() {
		return this.editor.igTextEditor("dropDownButton");
	},
	viewModel: function() {
		var self = this;
		this.nonObservable = "NonObservable";
		this.number = ko.observable(25);
		this.text = "Just text";
		this.textValue = ko.observable("Some Val");
		this.items =  ["item 1", "item 2", "item 3"];
		setDefaultNumber = function() {
			self.number(27);   
		};
		setDefaultText = function() {
			self.textValue("Default Text");
		};

		this.customerName = ko.observable("Peter Sanders");
		this.testFunction = function (evt, ui) {
			self.eventTriggered = true;
		};
		this.isDisabled =  ko.observable(false);
		this.isDisabledNotObsFalse = false;
		this.isDisabledNotObsTrue = true;
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
	},
	afterEach: function () {
		$.fx.off = false;
		ko.cleanNode(this.qunitFixture[0]);
	},
	checkAllTextValues: function (val, message) { //used in editMode
		this.assert.equal($('#inputEditor1').igTextEditor("field").val(), val, message + " (inputEditor)");
		this.assert.equal($('#divEditor1').igTextEditor("field").val(), val, message + " (divEditor1)");
		this.assert.equal($('#spanEditor1').igTextEditor("field").val(), val, message + " (tdEditor1)");
		this.assert.equal($("#inputValue").val(), val, message + " (inputValue)");
		this.assert.equal($("#divValue").html(), val, message + " (divValue)");
		this.assert.equal($("#spanValue").html(), val, message + " (spanValue)");
	},
	checkAllValues: function (val, message) {
		this.assert.equal($('#inputEditor1').igTextEditor("value"), val, message + " (inputEditor)");
		this.assert.equal($('#divEditor1').igTextEditor("value"), val, message + " (divEditor1)");
		this.assert.equal($('#spanEditor1').igTextEditor("value"), val, message + " (tdEditor1)");
		this.assert.equal($("#inputValue").val(), val, message + " (inputValue)");
		this.assert.equal($("#divValue").html(), val, message + " (divValue)");
		this.assert.equal($("#spanValue").html(), val, message + " (spanValue)");
	}
});
QUnit.test("Initializing igTextEditor", function (assert) {
	assert.expect(57);
	this.assert = assert;
	//var done = assert.async(), self = this;

	$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", "igTextEditor: { value: textValue, width: '160px' }").appendTo(this.qunitFixture);
	$(this.divTag).attr("id", "divEditor1").attr("data-bind", "igTextEditor: { value: textValue,width: '160px' }").appendTo(this.qunitFixture);
	$(this.spanTag).attr("id", "spanEditor1").attr("data-bind", "igTextEditor: { value: textValue, width: '160px' }").appendTo(this.qunitFixture);
	$(this.inputTag).attr("id", "inputValue").attr("data-bind", "value: textValue").appendTo(this.qunitFixture);
	$(this.divTag).attr("id", "divValue").attr("data-bind", "text: textValue").appendTo(this.qunitFixture);
	$(this.spanTag).attr("id", "spanValue").attr("data-bind", "text: textValue").appendTo(this.qunitFixture);
	$(this.inputTag).attr("id", "resetButton").attr("type", "button").attr("data-bind", "click: setDefaultText").appendTo(this.qunitFixture);
	this.applyBindings();

	// Initializing igTextEditor
	assert.ok(typeof(ko.bindingHandlers.igTextEditor) !== 'undefined', 'igTextEditor knockoutJS extention script is not loaded');
	assert.ok(typeof(ko.bindingHandlers.igTextEditor) === 'object', 'igTextEditor knockoutJS extention is of a wrong type');
	assert.ok($('#inputEditor1').data("igTextEditor") !== undefined, 'Creating igTextEditor in an input');
	assert.ok($('#divEditor1').data("igTextEditor") !== undefined, 'Creating igTextEditor in a div');
	assert.ok($('#spanEditor1').data("igTextEditor") !== undefined, 'Creating igTextEditor in a td');
	assert.equal($('#inputEditor1').igTextEditor("value").toString(), this.model.textValue(), 'The initial value is as expexted');
	assert.equal($('#divEditor1').igTextEditor("value").toString(), this.model.textValue(), 'The initial value is as expexted');
	assert.equal($('#spanEditor1').igTextEditor("value").toString(), this.model.textValue(), 'The initial value is as expexted');

	// Update model -> editor (input)"
	$('#inputEditor1').igTextEditor("setFocus");
	$('#inputEditor1').igTextEditor("field").val("New IV").blur();
	this.checkAllValues("New IV", "Value are as expected");

	// Update model -> editor (div)
	$('#divEditor1').igTextEditor("setFocus");
	$('#divEditor1').igTextEditor("field").val("New Div Value").blur();
	this.checkAllValues("New Div Value", "Values are as expected");

	// Update model -> editor (td)
	$('#spanEditor1').igTextEditor("field").val("New span Value").blur();
	this.checkAllValues("New span Value", "Values are as expected");

	// Update Model, check editors
	$("#resetButton").click();
	this.checkAllValues("Default Text", "Values are as expected");

	$('#inputEditor1').remove();
	ko.cleanNode(this.qunitFixture[0]);
	$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", "igTextEditor: { value: textValue, width: '160px', updateMode: 'onchange' }").appendTo(this.qunitFixture);
	this.applyBindings();

	editorInput = $('#inputEditor1').igTextEditor("field");
	$('#inputEditor1').igTextEditor('setFocus');
	editorInput.val("E6X").blur();
	this.checkAllValues("E6X", "The value is updated on change");

	$("#inputValue").focus().val("New Pesho").change();
	this.checkAllValues("New Pesho", "Values are as expected");

	
	ko.cleanNode(this.qunitFixture[0]);
	editor = $(this.inputTag).attr("data-bind", "igTextEditor: { value: textValue, width: 160, updateMode:\"immediate\" , listItems : [\"red\", \"blue\", \"yellow\" ],button: \"dropdown\"}").appendTo(this.qunitFixture);
	this.applyBindings();

	editor.igTextEditor("dropDownButton").click();
	item3 = editor.data("igTextEditor")._listItems()[2];
	this.util.mouseEvent(item3, "click");
	this.checkAllValues("yellow", "The value is updated on list selection changed");
	editor.igTextEditor("dropDownButton").click();
	item1 = editor.data("igTextEditor")._listItems()[0];
	this.util.mouseEvent(item1, "click");
	this.checkAllValues("red", "The value is updated on on list selection changed");
	$("#resetButton").click();
	//Check if this editor defaults the value
	assert.equal(editor.igTextEditor("value"), "Default Text", "The default text is correct");
	
	$('#inputEditor1').remove();
	ko.cleanNode(this.qunitFixture[0]);
	$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", "igTextEditor: { value: textValue, width: '160px', updateMode: 'immediate' }").appendTo(this.qunitFixture);
	this.applyBindings();

	$('#inputEditor1').igTextEditor("setFocus");
	$('#inputEditor1').igTextEditor("value", "");
	//$('#inputEditor1').data("igTextEditor")._exitEditMode();
	editorInput = $('#inputEditor1').igTextEditor("field");
	this.util.wait(100).then(function () {
		self.util.keyInteraction(69, editorInput);
		self.checkAllValues("E", "The value is updated on keyUp");
		self.util.keyInteraction(54, editorInput);
		self.checkAllValues("E6", "The value is updated on keyUp");
		self.util.keyInteraction(88, editorInput);
		self.checkAllValues("E6X", "The value is updated on keyUp");
		editorInput.blur();
		self.checkAllValues("E6X", "The value is changed on blur");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("Value set to nonObservable value", function (assert) {
	assert.expect(5);

	var editor = $(this.inputTag).attr("data-bind", "igTextEditor: { value: nonObservable, width: 160 }").appendTo(this.qunitFixture);
	var editorImm = $(this.inputTag).attr("data-bind", "igTextEditor: { value: nonObservable, width: 160, updateMode:\"immediate\" }").appendTo(this.qunitFixture);
	var reset = $(this.inputTag).attr("type", "button").attr("data-bind", "click: setDefaultText").appendTo(this.qunitFixture);
	var input = $(this.inputTag).attr("data-bind", "igTextEditor: { value: textValue, width: '160px' }").appendTo(this.qunitFixture);
	var outerInput = $(this.inputTag).appendTo(this.qunitFixture);
	this.applyBindings();

	assert.equal(editor.igTextEditor("value"), this.model.nonObservable, "NonObservable value is assigned correctly");
	editor.igTextEditor("value", "New non Observable");
	evt = $.Event("keypress");
	evt.keyCode = 88;
	outerInput.trigger(evt);
	assert.notEqual(editor.igTextEditor("value"), input.igTextEditor("value"), "The value should not be updated");
	reset.click();
	//The value of the nonObservable should not be updated
	assert.notEqual(editor.igTextEditor("value"), input.igTextEditor("value"), "The value should not be updated");

	assert.equal(editorImm.igTextEditor("value"), this.model.nonObservable, "NonObservable value is assigned correctly");
	evt = $.Event("keydown");
	evt.keyCode = 65;
	editorImm.trigger(evt);
	evt = $.Event("keypress");
	evt.keyCode = 65;
	editorImm.trigger(evt);
	evt = $.Event("keyup");
	evt.keyCode = 65;
	editorImm.trigger(evt);
	
	evt = $.Event("keydown");
	evt.keyCode = 56;
	editorImm.trigger(evt);
	evt = $.Event("keypress");
	evt.keyCode = 56;
	editorImm.trigger(evt);
	evt = $.Event("keyup");
	evt.keyCode = 56;
	editorImm.trigger(evt);
	assert.notEqual(editorImm.igTextEditor("value"), $('#inputEditor1').igTextEditor("value"), "The value should not be updated");
});

QUnit.test('Test valueChanged event', function (assert) {
	assert.expect(3);
	this.assert = assert;
	var done = assert.async(), self = this;

	var editor = $(this.inputTag).attr("id", "edChangeEvt").attr("data-bind", "igTextEditor: { updateMode: 'immediate', value: customerName, tabIndex: 1, buttonType: 'clear', valueChanged: testFunction }").appendTo(this.qunitFixture);
	var editorOff = $(this.inputTag).attr("id", "edChangeEvtImmOff").attr("data-bind", "igTextEditor: { value: customerName, tabIndex: 1, buttonType: 'clear', valueChanged: testFunction }").appendTo(this.qunitFixture);
	this.applyBindings();

	editor.igTextEditor("setFocus");
	this.util.type("120", editor.igTextEditor("field"));
	editor.trigger("blur");
	this.util.wait(100).then(function () {
		assert.ok(self.model.eventTriggered, "valueChanged is thrown");
		self.model.eventTriggered = false;
		editorOff.igTextEditor("setFocus");
		self.util.type("100", editorOff.igTextEditor("field"));
		editorOff.trigger("blur");
		return self.util.wait(100);
	}).then(function () {
		assert.ok(self.model.eventTriggered, "valueChanged is thrown");
		self.model.eventTriggered = false;
		editorOff.igTextEditor("setFocus");
		editorOff.igTextEditor("clearButton").click();
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

QUnit.test('Test valueChanged event with non-observable value', function (assert) {
	assert.expect(3);
	var done = assert.async(), self = this;
	var editor = this.editor = $(this.inputTag).attr("data-bind", "igTextEditor: { value: text, valueChanged: testFunction }").appendTo(this.qunitFixture);
	this.applyBindings();
	
	this.model.eventTriggered = false;
	editor.igTextEditor("setFocus");
	this.util.type("Peter", this.input());
	assert.notEqual(this.model.text, this.input().val(), "Unexpected underlying property value!");
	this.input().blur();
	assert.equal(this.model.text, editor.igTextEditor("value"), "Unexpected underlying property value!");
	this.util.wait(300).then(function () {
		assert.ok(self.model.eventTriggered, "valueChanged is thrown");
		self.model.eventTriggered = false;
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});	
});

QUnit.test('Test disabled binding', function (assert) {
	assert.expect(28);

	editor = $(this.inputTag).attr("data-bind", "igTextEditor: { width: '200' }, igEditorDisable: isDisabled").appendTo(this.qunitFixture);
	chk = $(this.inputTag).attr("type", "checkbox").attr("data-bind", "checked: isDisabled").appendTo(this.qunitFixture);
	editorNotObs = $(this.inputTag).attr("data-bind", "igTextEditor: { width: '200' }, igEditorDisable: isDisabledNotObsFalse").appendTo(this.qunitFixture);
	chkNotObs = $(this.inputTag).attr("type", "checkbox").attr("data-bind", "checked: isDisabledNotObsFalse").appendTo(this.qunitFixture);
	editorNotObs1 = $(this.inputTag).attr("data-bind", "igTextEditor: { width: '200' }, igEditorDisable: isDisabledNotObsTrue").appendTo(this.qunitFixture);
	chkNotObs1 = $(this.inputTag).attr("type", "checkbox").attr("data-bind", "checked: isDisabledNotObsTrue").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.notOk(editor.igTextEditor("option", "disabled"), "Editor should be enabled");
	assert.notOk(editor.igTextEditor("field").prop("disabled"), "Editor should be enabled");
	assert.equal(editor.igTextEditor("field").attr("disabled"), undefined, "Editor should be enabled");
	assert.notOk(editor.igTextEditor("editorContainer").hasClass($.ui.igTextEditor.prototype.css.disabled), "Editor should be enabled");
	chk.click();
	assert.ok(editor.igTextEditor("option", "disabled"), "Editor should be disabled");
	assert.ok(editor.igTextEditor("field").prop("disabled"), "Editor should be disabled");
	assert.equal(editor.igTextEditor("field").attr("disabled"), "disabled", "Editor should be disabled");
	assert.ok(editor.igTextEditor("editorContainer").hasClass($.ui.igTextEditor.prototype.css.disabled), "Editor should be disabled");
	chk.click();
	chk.click();
	chk.click();
	assert.notOk(editor.igTextEditor("option", "disabled"), "Editor should be enabled");
	assert.notOk(editor.igTextEditor("field").prop("disabled"), "Editor should be enabled");
	assert.equal(editor.igTextEditor("field").attr("disabled"), undefined, "Editor should be enabled");
	assert.notOk(editor.igTextEditor("editorContainer").hasClass($.ui.igTextEditor.prototype.css.disabled), "Editor should be enabled");

	editor = editorNotObs; chk = chkNotObs;
	assert.notOk(editor.igTextEditor("option", "disabled"), "Editor should be enabled");
	assert.notOk(editor.igTextEditor("field").prop("disabled"), "Editor should be enabled");
	assert.equal(editor.igTextEditor("field").attr("disabled"), undefined, "Editor should be enabled");
	assert.notOk(editor.igTextEditor("editorContainer").hasClass($.ui.igTextEditor.prototype.css.disabled), "Editor should be enabled");
	chk.click();
	assert.notOk(editor.igTextEditor("option", "disabled"), "Editor should be enabled");
	assert.notOk(editor.igTextEditor("field").prop("disabled"), "Editor should be enabled");
	assert.equal(editor.igTextEditor("field").attr("disabled"), undefined, "Editor should be enabled");
	assert.notOk(editor.igTextEditor("editorContainer").hasClass($.ui.igTextEditor.prototype.css.disabled), "Editor should be enabled");

	editor = editorNotObs1; chk = chkNotObs1;
	assert.ok(editor.igTextEditor("option", "disabled"), "Editor should be disabled");
	assert.ok(editor.igTextEditor("field").prop("disabled"), "Editor should be disabled");
	assert.equal(editor.igTextEditor("field").attr("disabled"), "disabled", "Editor should be disabled");
	assert.ok(editor.igTextEditor("editorContainer").hasClass($.ui.igTextEditor.prototype.css.disabled), "Editor should be disabled");
	chk.click();
	assert.ok(editor.igTextEditor("option", "disabled"), "Editor should be disabled");
	assert.ok(editor.igTextEditor("field").prop("disabled"), "Editor should be disabled");
	assert.equal(editor.igTextEditor("field").attr("disabled"), "disabled", "Editor should be disabled");
	assert.ok(editor.igTextEditor("editorContainer").hasClass($.ui.igTextEditor.prototype.css.disabled), "Editor should be disabled");
});

QUnit.test('Verify non-observable value change is not reflected in the UI', function (assert) {
	assert.expect(2);

	this.editor = $(this.inputTag).attr("data-bind", "igTextEditor: { value: text, valueChanged: testFunction }").appendTo(this.qunitFixture);
	this.applyBindings();
	assert.equal(this.editor.igTextEditor("value"), this.model.text, "Unexpected editor value!");
	this.model.text = "new";
	assert.notEqual(this.editor.igTextEditor("value"), this.model.text, "Editor's value updated unexpectedly!");
});

QUnit.test('Verify non-observable value changed via typing does not update the UI (updateMode: immediate)', function (assert) {
	assert.expect(3);	
	this.editor = $(this.inputTag).attr("data-bind", "igTextEditor: { value: text, width: 160, updateMode:\"immediate\" }").appendTo(this.qunitFixture);
	editorSimple = $(this.inputTag).attr("data-bind", "igTextEditor: { value: text }").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.equal(this.editor.igTextEditor("value"), this.model.text, "Unexpected editor value initially!");
	
	this.editor.igTextEditor("setFocus");
	this.util.keyInteraction(83, this.input());

	assert.equal(this.input().val(), this.model.text, "Underlying property value not changed!");
	assert.notEqual(editorSimple.igTextEditor("value"), this.model.text, "Non-observable value's change reflected in the UI!");		
});

QUnit.test('Verify non-observable value changed via selection does not update the UI (updateMode: immediate)', function (assert) {
	assert.expect(3);
	var done = assert.async(), self = this;

	this.editor = $(this.inputTag).attr("data-bind", "igTextEditor: { value: text, updateMode: 'immediate', tabIndex: 1, listItems: ['item 1', 'item 2', 'item 3'], dropdownitemselecting: testFunction }").appendTo(this.qunitFixture);
	editorSimple = $(this.inputTag).attr("data-bind", "igTextEditor: { value: text }").appendTo(this.qunitFixture);
	this.applyBindings();

	this.dropDownButton().click();
	this.util.wait(100).then(function () {
		self.util.mouseEvent(self.editor.data("igTextEditor")._listItems()[0], "click");
		return self.util.wait(100);
	}).then(function () {
		assert.equal(self.editor.igTextEditor("value"), "item 1", "Editor's value was not updated!");
		assert.equal(self.model.text, self.editor.igTextEditor("value"), "Underlying value was not updated!");
		assert.notEqual(editorSimple.igTextEditor("value"), "item 1", "Non-observable value's change reflected in the UI!");
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

	$(this.inputTag).attr("data-bind", "igTextEditor: { value: textValue, width: \"160px\", updateMode: \"none\" }").appendTo(this.qunitFixture);
	assert.throws(function () { self.applyBindings(); },
		function (err) { return err.message.indexOf($.ig.Editor.locale.updateModeUnsupportedValue) > -1; },
		'An error was correctly thrown when updateMode option is not correctly changed');
});