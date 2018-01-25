QUnit.module("Knockout unit tests for igCurrencyEditor", {
	divTag: '<div></div>',
	spanTag: '<span></span>',
	inputTag: '<input></input>',
	util: $.ig.TestUtil,
	qunitFixture: null,
	editor: null,
	model: null,
	appendToFixture: function() {
		$('#qunit-fixture').parent().append("<div id='permanent-qunit-fixture'></div>");
		this.qunitFixture = qunitFixture = $('#permanent-qunit-fixture');

		$(this.inputTag).attr("id", "inputEditor1").attr("data-bind", "igCurrencyEditor: { value: currencyNumber, width: '160px' }").appendTo(qunitFixture);
		$(this.divTag).attr("id", "divEditor1").attr("data-bind", "igCurrencyEditor: { value: currencyNumber, width: '160px' }").appendTo(qunitFixture);
		$(this.spanTag).attr("id", "tdEditor1").attr("data-bind", "igCurrencyEditor: { value: currencyNumber, width: '160px' }").appendTo(qunitFixture);
		$(this.spanTag).attr("id", "spanValue").attr("data-bind", "text: currencyNumber").appendTo(qunitFixture);
		$(this.inputTag).attr("id", "inputValue").attr("data-bind", "value: currencyNumber").appendTo(qunitFixture);
		$(this.divTag).attr("id", "divValue").attr("data-bind", "text: currencyNumber").appendTo(qunitFixture);
		$(this.inputTag).attr("id", "outerInput").appendTo(qunitFixture).igCurrencyEditor();
		$(this.inputTag).attr("id", "resetButton").val("Reset Text Value").attr("data-bind", "click: setDefaultCurrencyNumber").appendTo(qunitFixture);
		$(this.inputTag).attr("id", "GoshoEditor1").attr("data-bind", "value: currencyNumber").appendTo(qunitFixture);
		$(this.inputTag).attr("id", "edChangeEvt").attr("data-bind", "igCurrencyEditor: { updateMode: 'immediate', value: customerTax, tabIndex: 1, buttonType: 'clear', valueChanged: testFunction }").appendTo(qunitFixture);
		$(this.inputTag).attr("id", "edChangeEvtImmOff").attr("data-bind", "igCurrencyEditor: { value: customerTax, tabIndex: 1, buttonType: 'clear', valueChanged: testFunction }").appendTo(qunitFixture);
		$(this.inputTag).attr("id", "inpChangeEvt").attr("type", "text").addClass("row-control").attr("data-bind", "value: customerTax").appendTo(qunitFixture);
		$(this.inputTag).attr("id", "Issue695_Editor").attr("data-bind", "igCurrencyEditor: { value: currencyNumber, width: 160, regional:'de' }").appendTo(qunitFixture);
		$(this.inputTag).attr("id", "Issue695_Input").addClass("row-control").attr("data-bind", "value: currencyNumber").appendTo(qunitFixture);
		$(this.inputTag).attr("id", "edDisabled").attr("data-bind", "igCurrencyEditor: { width: '200' }, igEditorDisable: isDisabled").appendTo(qunitFixture);
		$(this.inputTag).attr("id", "chkDisabled").attr("type", "checkbox").attr("data-bind", "checked: isDisabled").appendTo(qunitFixture);
		$(this.inputTag).attr("id", "nullBoundEditor").attr("data-bind", "igCurrencyEditor: { value: nullValue, allowNullValue: true }").appendTo(qunitFixture);
	},
	viewModel: function() {
		var self = this;
		this.nonObservable = 244;
		this.number = ko.observable(25);
		this.currencyNumber = ko.observable(32);
		this.textValue = ko.observable("Some Val");
		setDefaultNumber = function() {
			self.number(27);   
		};
		setDefaultText = function() {
			self.textValue("Default Text");
		};
		setDefaultCurrencyNumber = function () {
			self.currencyNumber(32);
		};
		this.customerTax = ko.observable(100);
		this.testFunction = function (evt, ui) {
			self.eventTriggered = true;
		};
		this.isDisabled =  ko.observable(false);
		this.nullValue = ko.observable(null);
		this.eventTriggered = false;
	},
	before: function () {
		QUnit.config.reorder = false;
		this.appendToFixture();
		this.model = new this.viewModel();
		ko.applyBindings(this.model);
	},
	after: function () {
		$('#permanent-qunit-fixture').remove();
		QUnit.config.reorder = true;
	},
	input: function() {
		return this.editor.igCurrencyEditor("field");
	},
	container: function() {
		return this.editor.igCurrencyEditor("editorContainer");
	},
	dropDownContainer: function() {
		return this.editor.igCurrencyEditor("dropDownContainer");
	},
	dropDownButton: function() {
		return this.editor.igCurrencyEditor("dropDownButton");
	},
	beforeEach: function () { $.fx.off = true; },
	afterEach: function () { $.fx.off = false; },
	checkAllValues: function (val, message) {
		this.assert.equal($('#inputEditor1').igCurrencyEditor("value"), val, message + " (inputEditor)");
		this.assert.equal($('#divEditor1').igCurrencyEditor("value"), val, message + " (divEditor1)");
		this.assert.equal($('#tdEditor1').igCurrencyEditor("value"), val, message + " (tdEditor1)");
		this.assert.equal($("#spanValue").html(), val, message + " (spanValue)");
		this.assert.equal($("#inputValue").val(), val, message + " (inputValue)");
		this.assert.equal($("#divValue").html(), val, message + " (divValue)");
	},
	testImmediate: function (editorInput) {
		this.util.keyInteraction(54, editorInput);
		this.checkAllValues(6, "The value is updated on keyUp");
		this.util.keyInteraction(56, editorInput);
		this.checkAllValues(68, "The value is updated on keyUp");
		this.util.keyInteraction(52, editorInput);
		this.checkAllValues(684, "The value is updated on keyUp");
		// blur out and make sure model value did not change:
		editorInput.blur();
		this.checkAllValues(684, "The value is changed on blur");
	}
});

QUnit.test("Initializing igCurrencyEditor", function (assert) {
	assert.expect(8);

	assert.ok(typeof(ko.bindingHandlers.igCurrencyEditor) !== 'undefined', 'igCurrencyEditor knockoutJS extention script is not loaded');
	assert.ok(typeof(ko.bindingHandlers.igCurrencyEditor) === 'object', 'igCurrencyEditor knockoutJS extention is of a wrong type');
	assert.ok($('#inputEditor1').data("igCurrencyEditor") !== undefined, 'Creating igCurrencyEditor in an input');
	assert.ok($('#divEditor1').data("igCurrencyEditor") !== undefined, 'Creating igCurrencyEditor in a div');
	assert.ok($('#tdEditor1').data("igCurrencyEditor") !== undefined, 'Creating igCurrencyEditor in a td');
	//Check Initial expected value
	assert.equal($('#inputEditor1').igCurrencyEditor("value"), 32, 'The initial value is as expexted');
	assert.equal($('#divEditor1').igCurrencyEditor("value"), 32, 'The initial value is as expexted');
	assert.equal($('#tdEditor1').igCurrencyEditor("value"), 32, 'The initial value is as expexted');
});

QUnit.test("Update model -> editor (input)", function (assert) {
	assert.expect(6);
	this.assert = assert;
	var done = assert.async(), self = this;

	$('#inputEditor1').igCurrencyEditor("setFocus");
	$('#inputEditor1').focus().val(52);
	$("#outerInput").focus();

	this.util.wait(200).then(function () {
		self.checkAllValues(52, "Values are as expected");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("Update model -> editor (div)", function (assert) {
	assert.expect(6);
	this.assert = assert;
	var done = assert.async(), self = this;
	
	$('#divEditor1').igCurrencyEditor("setFocus");	
	$('#divEditor1').find('input').val(15.3).change();
	$('#outerInput').focus();
	this.util.wait(200).then(function () {
		self.checkAllValues(15.3, "Values are as expected");
		$("#outerInput").igCurrencyEditor("setFocus");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("Update model -> editor (td)", function (assert) {
	assert.expect(6);
	this.assert = assert;
	var done = assert.async(), self = this;

	$('#tdEditor1').igCurrencyEditor("setFocus");
	$('#tdEditor1').find('input').val(369).change();
	$('#outerInput').focus();
	this.util.wait(200).then(function () {
		self.checkAllValues(369, "Values are as expected");
		$("#outerInput").igCurrencyEditor("setFocus");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("Update Model, check editors", function (assert) {
	assert.expect(6);
	this.assert = assert;

	$("#resetButton").click();
	this.checkAllValues(32, "Values are as expected");
});

QUnit.test("updateMode set to not allowed value", function (assert) {
	assert.expect(1);
	var self = this;

	assert.throws(function () {
		$("<div id='tempContainer'></div>").append("<input id=\"errorEditor\" data-bind='igCurrencyEditor: { value: currencyNumber, width: 160, updateMode:\"none\" }'></input>").appendTo(this.qunitFixture);
		ko.applyBindings(self.model, document.getElementById("tempContainer"));
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.updateModeUnsupportedValue) > - 1;
	}, 'An error was correctly thrown when updateMode option is not correctly changed');
	$("#tempContainer").remove();
});

QUnit.test("Value set to nonObservable value", function (assert) {
	assert.expect(6);

	// Default Update Mode
	$("<div id='tempContainer'></div>").append("<input id=\"tempEditor\" data-bind='igCurrencyEditor: { value: nonObservable, width: 160 }'></input>").appendTo(this.qunitFixture);
	ko.applyBindings(this.model, document.getElementById("tempEditor"));
	assert.equal($("#tempEditor").igCurrencyEditor("value"), this.model.nonObservable, "NonObservable value is assigned correctly");

	$("#tempEditor").igCurrencyEditor("select");
	this.util.keyInteraction(49, $("#tempEditor"));
	$("#tempEditor").trigger("blur");
	assert.equal($("#tempEditor").igCurrencyEditor("value"), this.model.nonObservable, "The value should be updated");
	this.model.nonObservable = 42;
	// The value of the checkbox editor shouldn't be updated
	assert.notEqual($("#tempEditor").igCurrencyEditor("value"), this.model.nonObservable, "The value should not be updated");
	$("#tempContainer").remove();
	
	// Immediate update mode
	$("<div id='tempContainer'></div>").append("<input id=\"tempEditor\" data-bind='igCurrencyEditor: { value: nonObservable, width: 160, updateMode:\"immediate\" }'></input>").appendTo(this.qunitFixture);
	ko.applyBindings(this.model, document.getElementById("tempEditor"));
	assert.equal($("#tempEditor").igCurrencyEditor("value"), this.model.nonObservable, "NonObservable value is assigned correctly");
	$("#tempEditor").igCurrencyEditor("select");
	this.util.keyInteraction(49, $("#tempEditor"));
	assert.equal($("#tempEditor").igCurrencyEditor("value"), this.model.nonObservable, "The value should be updated");
	
	this.model.nonObservable = 42;
	assert.notEqual($("#tempEditor").igCurrencyEditor("value"), this.model.nonObservable, "The value should not be updated");
	$("#tempContainer").remove();
});

QUnit.test("ListItem change -> immediate", function (assert) {
	assert.expect(13);
	this.assert = assert;

	//immediate Update Mode
	$("<div id='tempContainer'></div>").append("<input id=\"tempEditor\" data-bind='igCurrencyEditor: { value: currencyNumber, width: 160, updateMode:\"immediate\" , listItems : [\"25\", \"15\", \"263\" ],button: \"dropdown\"}'></input>").appendTo(this.qunitFixture);
	ko.applyBindings(this.model, document.getElementById("tempEditor"));

	$("#tempEditor").igCurrencyEditor("dropDownButton").click();
	item1 = $("#tempEditor").data("igCurrencyEditor")._listItems()[2];
	this.util.mouseEvent(item1, "click");
	this.checkAllValues(263, "The value is updated on list selection changed");
	//$("#tempEditor").data("igCurrencyEditor")._listSelect(0,1);
	$("#tempEditor").igCurrencyEditor("dropDownButton").click();
	item1 = $("#tempEditor").data("igCurrencyEditor")._listItems()[0];
	this.util.mouseEvent(item1, "click");

	this.checkAllValues(25, "The value is updated on on list selection changed");
	$("#resetButton").click();
	//Check if this editor defaults the value
	assert.equal($("#tempEditor").igCurrencyEditor("value"), 32, "The default text is correct");
	ko.cleanNode(document.getElementById("tempEditor"));
	$("#tempContainer").remove();
});

QUnit.test("updateMode -> immediate", function (assert) {
	assert.expect(24);
	this.assert = assert;

	ko.cleanNode(document.getElementById("inputEditor1"));
	$("#inputEditor1").remove();
	this.qunitFixture.append("<input id=\"inputEditor1\" data-bind='igCurrencyEditor: { value: currencyNumber, displayFactor: 1,width: 160, dataMode: \"double\", updateMode:\"immediate\" }'></input>");
	ko.applyBindings(this.model, document.getElementById("inputEditor1"));
	$('#inputEditor1').igCurrencyEditor('value', "");
	$('#inputEditor1').igCurrencyEditor('setFocus');
	this.testImmediate($("#inputEditor1").igCurrencyEditor("field"));
});

QUnit.test("updateMode -> onChange", function (assert) {
	assert.expect(6);
	this.assert = assert;

	ko.cleanNode(document.getElementById("inputEditor1"));
	$("#inputEditor1").remove();
	this.qunitFixture.append("<input id=\"inputEditor1\" data-bind='igCurrencyEditor: { value: currencyNumber, displayFactor: 1,width: 160, dataMode: \"double\", updateMode:\"immediate\" }'></input>");
	ko.applyBindings(this.model, document.getElementById("inputEditor1"));

	$('#inputEditor1').igCurrencyEditor('setFocus');
	$("#inputEditor1").igCurrencyEditor("field").focus().val(485);
	$('#outerInput').focus();
	this.checkAllValues(485, "The value is updated on keyUp");
});
		
QUnit.test("update from outside input", function (assert) {
	assert.expect(6);
	this.assert = assert;
	$('#inputValue').val(236).change();
	this.checkAllValues(236, "Values are as expected");
});

QUnit.test("update from outside s input", function (assert) {
	assert.expect(6);
	this.assert = assert;
	$('#inputValue').val(23.6).change();
	this.checkAllValues(23.6, "Values are as expected");
});

QUnit.test("update from outside input negative", function (assert) {
	assert.expect(6);
	this.assert = assert;
	$('#inputValue').val(-26).change();
	this.checkAllValues(-26, "Values are as expected");
});

QUnit.test('Test valueChanged event', function (assert) {
	assert.expect(3);
	this.assert = assert;
	var done = assert.async(), self = this;
	
	var $editor = $("#edChangeEvt"), $input = $("#inpChangeEvt");
	
	$editor.igCurrencyEditor("setFocus");
	this.util.type("120", $editor.igCurrencyEditor("field"));
	$editor.trigger("blur");
	this.util.wait(100).then(function () {
		assert.ok(self.model.eventTriggered, "valueChanged is thrown");
		self.model.eventTriggered = false;
		$editor.remove();
		$editor = $("#edChangeEvtImmOff");
		$editor.igCurrencyEditor("setFocus");
		self.util.type("100", $editor.igCurrencyEditor("field"));
		$editor.trigger("blur");
		return self.util.wait(100);
	}).then(function () {
		assert.ok(self.model.eventTriggered, "valueChanged is thrown");
		self.model.eventTriggered = false;
		$editor.igCurrencyEditor("setFocus");
		$editor.igCurrencyEditor("clearButton").click();
		$editor.trigger("blur");
		assert.ok(self.model.eventTriggered, "valueChanged is thrown");
		self.model.eventTriggered = false;
		$editor.remove();
		$input.remove();
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test("Test regional with reversed decimal(,) and group(.) separators like 'de' .Update from outside input.", function (assert) {
	assert.expect(6);

	var $editor = $("#Issue695_Editor"), $input = $("#Issue695_Input");
	$('#Issue695_Input').val(0.123).change();
	assert.equal($editor.igCurrencyEditor("value"), 0.12, "Value is as expected");
	assert.equal($editor.igCurrencyEditor("displayValue"), "0,12 €", "displayValue is correct");
	$("#resetButton").click();
	assert.equal($editor.igCurrencyEditor("value"), 32.00, "Value is as expected");
	assert.equal($editor.igCurrencyEditor("displayValue"), "32,00 €", "displayValue is correct");
	$('#Issue695_Input').val("").change();
	assert.equal($editor.igCurrencyEditor("value"), "", "Value is as expected");
	assert.equal($editor.igCurrencyEditor("displayValue"), "", "displayValue is correct");
	$editor.remove();
	$input.remove();
});

QUnit.test('Test disabled binding', function (assert) {
	assert.expect(12);
	var $editor = $("#edDisabled"), $chk = $("#chkDisabled");

	assert.notOk($editor.igCurrencyEditor("option", "disabled"), "Editor should be enabled");
	assert.notOk($editor.igCurrencyEditor("field").prop("disabled"), "Editor should be enabled");
	assert.equal($editor.igCurrencyEditor("field").attr("disabled"), undefined, "Editor should be enabled");
	assert.notOk($editor.igCurrencyEditor("editorContainer").hasClass($.ui.igCurrencyEditor.prototype.css.disabled), "Editor should be enabled");
	$chk.click();
	assert.ok($editor.igCurrencyEditor("option", "disabled"), "Editor should be disabled");
	assert.ok($editor.igCurrencyEditor("field").prop("disabled"), "Editor should be disabled");
	assert.equal($editor.igCurrencyEditor("field").attr("disabled"), "disabled", "Editor should be disabled");
	assert.ok($editor.igCurrencyEditor("editorContainer").hasClass($.ui.igCurrencyEditor.prototype.css.disabled), "Editor should be disabled");
	$chk.click();
	$chk.click();
	$chk.click();
	assert.notOk($editor.igCurrencyEditor("option", "disabled"), "Editor should be enabled");
	assert.notOk($editor.igCurrencyEditor("field").prop("disabled"), "Editor should be enabled");
	assert.equal($editor.igCurrencyEditor("field").attr("disabled"), undefined, "Editor should be enabled");
	assert.notOk($editor.igCurrencyEditor("editorContainer").hasClass($.ui.igCurrencyEditor.prototype.css.disabled), "Editor should be enabled");
	$editor.remove();
	$chk.remove();
});

QUnit.test('Test null binding', function (assert) {
	assert.expect(3);
	var $editor = $("#nullBoundEditor");

	assert.equal($editor.igCurrencyEditor("value"), null, "Editor should have null as a value");
	this.model.nullValue(23);
	assert.equal($editor.igCurrencyEditor("value"), 23, "Editor should have 23 as a value");
	this.model.nullValue(null);
	assert.equal($editor.igCurrencyEditor("value"), null, "Editor should have null as a value");
	$editor.remove();
});