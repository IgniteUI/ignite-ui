QUnit.module("Knockout unit tests for igCheckboxEditor", {
	inputTag: '<input></input>',
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
		this.isDisabled =  ko.observable(false);
		this.isChecked = ko.observable(false);
		this.isCheckedNonObservable = false;
		this.isCheckedWithValue = ko.observable(false);
		this.isCheckedNonObservableWithValue = false;
	},
	applyBindings: function() {
		ko.applyBindings(this.model, this.qunitFixture[0]);
	},
	before: function () {
		this.qunitFixture = $('#qunit-fixture');
		this.model = new this.viewModel();
	},
	beforeEach: function () { $.fx.off = true; this.qunitFixture = $('#qunit-fixture'); },
	afterEach: function () { $.fx.off = false; ko.cleanNode(this.qunitFixture[0]); }
});

QUnit.test("Test disabled binding", function (assert) {
	assert.expect(9);

	var editor, chk;
	this.editor = editor = $(this.inputTag).attr("data-bind", "igCheckboxEditor: { checked: false }, igEditorDisable: isDisabled").appendTo(this.qunitFixture);
	chk = $(this.inputTag).attr("type", "checkbox").attr("data-bind", "checked: isDisabled").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.notOk(editor.igCheckboxEditor("option", "disabled"), "Editor should be enabled");
	assert.notOk(this.input().prop("disabled"), "Editor should be enabled");
	assert.notOk(this.container().hasClass($.ui.igCheckboxEditor.prototype.css.disabled), "Editor should be enabled");
	chk.click();
	assert.ok(editor.igCheckboxEditor("option", "disabled"), "Editor should be disabled");
	assert.ok(this.input().prop("disabled"), "Editor should be disabled");
	assert.ok(this.container().hasClass($.ui.igCheckboxEditor.prototype.css.disabled), "Editor should be disabled");
	chk.click();
	chk.click();
	chk.click();
	assert.notOk(editor.igCheckboxEditor("option", "disabled"), "Editor should be enabled");
	assert.notOk(this.input().prop("disabled"), "Editor should be enabled");
	assert.notOk(this.container().hasClass($.ui.igCheckboxEditor.prototype.css.disabled), "Editor should be enabled");
});

QUnit.test('Test isChecked binding observable', function (assert) {
	assert.expect(4);

	var editor = $(this.inputTag).attr("id", "edCheckedObservable").attr("data-bind", "igCheckboxEditor: { checked: isChecked }").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.notOk(this.model.isChecked(), "The view model observable and the igCheckEditor isCheked property should be synced.");
	editor.click();
	assert.ok(this.model.isChecked(), "The view model observable and the igCheckEditor isCheked property should be synced.");
	editor.click();
	assert.notOk(this.model.isChecked(), "The view model observable and the igCheckEditor isCheked property should be synced.");
	this.model.isChecked(true);
	assert.ok(editor.igCheckboxEditor("option", "checked"), "The view model observable and the igCheckEditor isCheked property should be synced.");
});

QUnit.test('Test isChecked binding non-observable', function (assert) {
	assert.expect(3);

	var editor = $(this.inputTag).attr("data-bind", "igCheckboxEditor: { checked: isCheckedNonObservable }").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.notOk(this.model.isCheckedNonObservable, "The view model observable and the igCheckEditor isCheckedNonObservable property should be synced.");
	editor.click();
	assert.ok(this.model.isCheckedNonObservable, "The view model observable and the igCheckEditor isCheckedNonObservable property should be synced.");
	editor.click();
	assert.notOk(this.model.isCheckedNonObservable, "The view model observable and the igCheckEditor isCheckedNonObservable property should be synced.");
});

QUnit.test('Test isChecked binding observable with value', function (assert) {
	assert.expect(4);

	var editor = $(this.inputTag).attr("data-bind", "igCheckboxEditor: { checked: isCheckedWithValue, value: 'Test' }").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.notOk(this.model.isCheckedWithValue(), "The view model observable and the igCheckEditor isCheckedWithValue property should be synced.");
	editor.click();
	assert.ok(this.model.isCheckedWithValue(), "The view model observable and the igCheckEditor isCheckedWithValue property should be synced.");
	editor.click();
	assert.notOk(this.model.isCheckedWithValue(), "The view model observable and the igCheckEditor isCheckedWithValue property should be synced.");
	this.model.isCheckedWithValue(true);
	assert.ok(editor.igCheckboxEditor("option", "checked"), "The view model observable and the igCheckEditor isCheckedWithValue property should be synced.");
});


QUnit.test('Test isChecked binding non-observable with value', function (assert) {
	assert.expect(3);

	var editor = $(this.inputTag).attr("data-bind", "igCheckboxEditor: { checked: isCheckedNonObservableWithValue, value: 'Test' }").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.notOk(this.model.isCheckedNonObservableWithValue, "The view model observable and the igCheckEditor isCheckedNonObservableWithValue property should be synced.");
	editor.click();
	assert.ok(this.model.isCheckedNonObservableWithValue, "The view model observable and the igCheckEditor isCheckedNonObservableWithValue property should be synced.");
	editor.click();
	assert.notOk(this.model.isCheckedNonObservableWithValue, "The view model observable and the igCheckEditor isCheckedNonObservableWithValue property should be synced.");
	editor.remove();
});

QUnit.test('Test updateMode not allowed value', function (assert) {
	assert.expect(1);
	var self = this;

	assert.throws(function () {
		$(self.inputTag).attr("data-bind", "igCheckboxEditor: { checked: isCheckedWithValue, updateMode: 'None' }").appendTo(self.qunitFixture);
		self.applyBindings();
	}, function (err) {
		return err.message.indexOf($.ig.Editor.locale.updateModeUnsupportedValue) > -1;
	}, 'An error was correctly thrown when updateMode option is not correctly changed');
});

