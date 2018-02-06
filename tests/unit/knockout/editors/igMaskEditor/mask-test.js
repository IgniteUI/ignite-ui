QUnit.module("Knockout unit tests for igMaskEditor", {
	inputTag: '<input></input>',
	divTag: '<div></div>',
	spanTag: '<span></span>',
	util: $.ig.TestUtil,
	editor: null,
	model: null,
	input: function() {
		return this.editor.igMaskEditor("field");
	},
	container: function() {
		return this.editor.igMaskEditor("editorContainer");
	},
	viewModel: function() {
		var self = this;
		this.nonObservable = "8a6d";
		this.number = ko.observable(25);
		this.currencyNumber = ko.observable(32);
		this.maskValue = ko.observable("8a6d");
		this.textValue = ko.observable("Some Val");
		this.maskValue1 = ko.observable("9f2s");
		this.setDefaultNumber = function() {
			self.number(27);   
		};
		this.setDefaultText = function() {
			self.textValue("Default Text");
		}
		this.setDefaultMaskValue = function () {
			self.maskValue("9f2s");
		};
		this.isDisabled =  ko.observable(false);
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
		this.assert.equal($('#inputEditor1').igMaskEditor("value").toString(), val, message + " (inputEditor) date");
		this.assert.equal($('#divEditor1').igMaskEditor("value").toString(), val, message + " (divEditor1) date");
		this.assert.equal($('#spanEditor1').igMaskEditor("value").toString(), val, message + " (tdEditor1) date");
	},
	checkFieldsValues: function (val, message) {
		this.assert.equal($("#inputValue").val(), val, message + " (inputValue)");

		if (typeof(val) === 'string') {
			this.assert.equal($("#divValue").html().replace(/&nbsp;/g, " "), val, message + " (divValue)");
			this.assert.equal($("#spanValue").html().replace(/&nbsp;/g, " "), val, message + " (spanValue)");
		} else {
			this.assert.equal($("#divValue").html(), val, message + " (divValue)");
			this.assert.equal($("#spanValue").html(), val, message + " (spanValue)");
		}
	},
	checkAllValues: function (val, message) {
		this.checkEditorsValues(val, message);
		this.checkFieldsValues(val, message);
	}
});

QUnit.test("Initializing igMaskEditor", function (assert) {
	assert.expect(44); //Passing
	this.assert = assert;

	$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", "igMaskEditor: { value: maskValue, inputMask: '9&9&', width: '160px' }").appendTo(this.qunitFixture);
	$(this.divTag).attr("id", "divEditor1").attr("data-bind", "igMaskEditor: { value: maskValue, inputMask: '9&9&',width: '160px' }").appendTo(this.qunitFixture);
	$(this.spanTag).attr("id", "spanEditor1").attr("data-bind", "igMaskEditor: { value: maskValue, inputMask: '9&9&', width: '160px' }").appendTo(this.qunitFixture);
	$(this.inputTag).attr("id", "inputValue").attr("data-bind", "value: maskValue").appendTo(this.qunitFixture);
	$(this.divTag).attr("id", "divValue").attr("data-bind", "text: maskValue").appendTo(this.qunitFixture);
	$(this.spanTag).attr("id", "spanValue").attr("data-bind", "text: maskValue").appendTo(this.qunitFixture);
	$(this.inputTag).attr("id", "resetButton").attr("type", "button").attr("data-bind", "click: setDefaultMaskValue").appendTo(this.qunitFixture);
	this.applyBindings();

	// Initializing igMaskEditor
	assert.ok(typeof(ko.bindingHandlers.igMaskEditor) !== 'undefined', 'igMaskEditor knockoutJS extention script is not loaded');
	assert.ok(typeof(ko.bindingHandlers.igMaskEditor) === 'object', 'igMaskEditor knockoutJS extention is of a wrong type');
	assert.ok($('#inputEditor1').data("igMaskEditor") !== undefined, 'Creating igMaskEditor in an input');
	assert.ok($('#divEditor1').data("igMaskEditor") !== undefined, 'Creating igMaskEditor in a div');
	assert.ok($('#spanEditor1').data("igMaskEditor") !== undefined, 'Creating igMaskEditor in a td');
	assert.equal($('#inputEditor1').igMaskEditor("value").toString(), this.model.maskValue().toString(), 'The initial value is as expexted');
	assert.equal($('#divEditor1').igMaskEditor("value").toString(), this.model.maskValue().toString(), 'The initial value is as expexted');
	assert.equal($('#spanEditor1').igMaskEditor("value").toString(), this.model.maskValue().toString(), 'The initial value is as expexted');

	// Update model -> editor (input)"
	$('#inputEditor1').igMaskEditor("setFocus");
	$('#inputEditor1').igMaskEditor("field").val("5g7s").blur();
	this.checkAllValues("5g7s", "Value are as expected");

	// Update model -> editor (div)
	$('#divEditor1').igMaskEditor("setFocus");
	$('#divEditor1').igMaskEditor("field").val("5s6d").blur();
	this.checkAllValues("5s6d", "Values are as expected");

	// Update model -> editor (td)
	$('#spanEditor1').igMaskEditor("field").val("6a7b").blur();
	this.checkAllValues("6a7b", "Values are as expected");

	// Update Model, check editors
	$("#resetButton").click();
	this.checkAllValues("9f2s", "Values are as expected");

	$('#inputEditor1').remove();
	ko.cleanNode(this.qunitFixture[0]);
	$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", "igMaskEditor: { value: maskValue, width: '160px', updateMode: 'onchange' }").appendTo(this.qunitFixture);
	this.applyBindings();

	$('#inputEditor1').igMaskEditor('setFocus');
	editorInput = $("#inputEditor1").igMaskEditor("field").val("9f2s").blur();
	this.checkAllValues("9f2s", "The value is updated on change");

	$("#inputValue").focus().val("9f2s").change();
	this.checkAllValues("9f2s", "Values are as expected");
});

QUnit.test('Test disabled binding', function (assert) {
	assert.expect(12);

	editor = $(this.inputTag).attr("data-bind", "igMaskEditor: { width: '200' }, igEditorDisable: isDisabled").appendTo(this.qunitFixture);
	chk = $(this.inputTag).attr("type", "checkbox").attr("data-bind", "checked: isDisabled").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.notOk(editor.igMaskEditor("option", "disabled"), "Editor should be enabled");
	assert.notOk(editor.igMaskEditor("field").prop("disabled"), "Editor should be enabled");
	assert.equal(editor.igMaskEditor("field").attr("disabled"), undefined, "Editor should be enabled");
	assert.notOk(editor.igMaskEditor("editorContainer").hasClass($.ui.igMaskEditor.prototype.css.disabled), "Editor should be enabled");
	chk.click();
	assert.ok(editor.igMaskEditor("option", "disabled"), "Editor should be disabled");
	assert.ok(editor.igMaskEditor("field").prop("disabled"), "Editor should be disabled");
	assert.equal(editor.igMaskEditor("field").attr("disabled"), "disabled", "Editor should be disabled");
	assert.ok(editor.igMaskEditor("editorContainer").hasClass($.ui.igMaskEditor.prototype.css.disabled), "Editor should be disabled");
	chk.click();
	chk.click();
	chk.click();
	assert.notOk(editor.igMaskEditor("option", "disabled"), "Editor should be enabled");
	assert.notOk(editor.igMaskEditor("field").prop("disabled"), "Editor should be enabled");
	assert.equal(editor.igMaskEditor("field").attr("disabled"), undefined, "Editor should be enabled");
	assert.notOk(editor.igMaskEditor("editorContainer").hasClass($.ui.igMaskEditor.prototype.css.disabled), "Editor should be enabled");
});

QUnit.test("Value set to nonObservable value", function (assert) {
	assert.expect(4);
	var self = this;

	editor = $(this.inputTag).attr("data-bind", "igMaskEditor: { value: nonObservable, width: 160 }").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.equal(editor.igMaskEditor("value"), this.model.nonObservable, "NonObservable value is assigned correctly");

	editor.igMaskEditor("select");
	this.util.keyInteraction(49, editor);
	editor.trigger("blur");
	assert.equal(editor.igMaskEditor("value"), this.model.nonObservable, "The value should be updated");
	this.model.nonObservable = 42;
	// The value of the checkbox editor shouldn't be updated
	assert.notEqual(editor.igMaskEditor("value"), this.model.nonObservable, "The value should not be updated");
	
	ko.cleanNode(this.qunitFixture[0]);
	assert.throws(function () {
		$(self.inputTag).attr("data-bind", "igMaskEditor: { value: nonObservable, width: 160, updateMode:\"immediate\" }").appendTo(self.qunitFixture);
		self.applyBindings();
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.updateModeNotSupported) > -1;
	}, 'An error was correctly thrown when updateMode option is not correctly changed');
});

QUnit.test("updateMode set to not allowed value", function (assert) {
	assert.expect(1);
	var self = this;

	$(this.inputTag).attr("data-bind", "igMaskEditor: { value: maskValue, width: \"160px\", updateMode: \"none\" }").appendTo(this.qunitFixture);
	assert.throws(
		function () { self.applyBindings(); }, 
		function (err) { return err.message.indexOf($.ig.Editor.locale.updateModeUnsupportedValue) > -1; },
		'An error was correctly thrown when updateMode option is not correctly changed');
});
