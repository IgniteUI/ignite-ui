QUnit.module("Knockout unit tests for igComboEditor", {
	inputTag: '<input></input>',
	divTag: '<div></div>',
	selectTag: '<select></select>',
	model: null,
	viewModel: function () {
		this.isDisabled = ko.observable(false);
		this.isDisabledInvalid = true;
		this.isVisible = ko.observable(true);
		this.isVisibleInvalid = false;

		this.item = { name: "name5", value: 5 };

		this.data2 = ko.observableArray([
			{ name: "name1", value: "value1" },
			{ name: "name2", value: "value2" },
			{ name: "name3", value: "value3" }
		]);

		this.colorList = ko.observableArray([
			{ "Color": "Black" },
			{ "Color": "Blue" },
			{ "Color": "Red" }
		]);

		this.data3 = ko.observableArray([
			{ value: 1, text: "One description" },
			{ value: 2, text: "Two description" },
			{ value: 3, text: "Three description" },
			{ value: 4, text: "Four description" },
			{ value: 5, text: "Five description" },
			{ value: 6, text: "Six description" }
		]);

		this.data4 = ko.observableArray([
			ko.observable({ value: 1, text: "item1" }),
			ko.observable({ value: 2, text: "item2" }),
			ko.observable({ value: 3, text: "item3" })
		]);

		var modelBigData = [], text;
		for (index = 0; index < 5000; index++) {
			text = "vpt_" + index;
			modelBigData.push({ id: text, name: text });
		}

		this.bigData = ko.observable(modelBigData);

		var tmp = [];

		for (var j = 0; j < 75; j++) {
			tmp.push({ Name: j + 1 });
		}

		this.nameList = ko.observableArray(tmp);		
		this.selectedItemsValue = ko.observableArray(["value2"]);
		this.selectedItemsWhole = ko.observableArray([{ name: "name2", value: "value2" }]);
	},
	applyBindings: function () {
		ko.applyBindings(this.model, this.qunitFixture[0]);
	},
	before: function(){
		this.model = new this.viewModel();
	},
	beforeEach: function () {		
		this.model.data = ko.observableArray([
			{ value: 0, name: 'name0' },
			{ value: 1, name: 'name1' },
			{ value: 2, name: 'name2' },
			{ value: 3, name: 'name3' },
			{ value: 4, name: 'name4' }]);
		this.model.selectedItems = ko.observableArray();
		this.qunitFixture = $('#qunit-fixture');
		$.fx.off = true;
	},
	afterEach: function () {
		$.fx.off = false;
		ko.cleanNode(this.qunitFixture[0]);
	},
	emulateClick: function (element, ctrl, shift) {
		var mouseDown = jQuery.Event("mousedown"),
			mouseUp = jQuery.Event("mouseup");

		mouseDown.which = mouseUp.which = 1;

		mouseUp.ctrlKey = mouseDown.ctrlKey = ctrl === true;
		mouseUp.shiftKey = mouseDown.shiftKey = shift === true;

		element.trigger(mouseDown);
		element.trigger(mouseUp);
	},
	addItem: function (item) {
		this.model.data.push(item);
	},
	editItem: function () {
		var oldItem = this.model.data()[0];
		var newItem = { name: "name007", value: 777 };
		this.model.data.replace(oldItem, newItem)
	},
	editItemName: function () {
		var item = this.model.data()[1];
		item.name = "name007";
	},
	removeItem: function (item) {
		this.model.data.remove(item);
	},
	testComboSelection: function (combo1, combo2, textInput, select, newText, newValue, input) {
		this.assert.ok(combo1.igCombo('text') === newText, 'The igCombo text should be updated properly from the knockout extension');
		this.assert.ok(combo1.igCombo('valueInput').val() === newValue, 'The igCombo value should be updated properly from the knockout extension');

		this.assert.ok(combo2.igCombo('text') === newText, 'The igCombo text should be updated properly from the knockout extension');
		this.assert.ok(combo2.igCombo('valueInput').val() === newValue, 'The igCombo value should be updated properly from the knockout extension');

		if (input === undefined || input) {
			this.assert.ok(textInput.val() === newText, 'The exteranl INPUT should be updated properly from the knockout extension');
		}
		this.assert.ok(select.val() === newValue, 'The exteranl SELECT should be updated properly from the knockout extension');
	}
});

QUnit.test("[ID1] Combo editor Initialization", function (assert) {
	assert.expect(3);

	var editor = $(this.inputTag).attr("type", "text").attr("data-bind", "igCombo: {dataSource: data, textKey: 'name', valueKey: 'value', selectedItems: selectedItems}").appendTo(this.qunitFixture);
	this.applyBindings();
	assert.ok(typeof (ko.bindingHandlers.igCombo) !== 'undefined', 'igCombo extension for KnockoutJS should be loaded.');
	assert.ok(typeof (ko.bindingHandlers.igCombo) === 'object', 'igCombo extension for KnockoutJS should be an object.');
	assert.ok(editor.data("igCombo"), 'igCombo should be loaded');
});

QUnit.test("[ID2] Changing combo editor UI affect ViewModel and vice versa", function (assert) {
	assert.expect(23);
	this.assert = assert;

	var textInput = $(this.inputTag).attr("type", "text").appendTo(this.qunitFixture);
	var textSelect = $(this.selectTag).attr("data-bind", "{options: data, optionsText: 'name', optionsValue: 'value', selectedOptions: selectedItems}").appendTo(this.qunitFixture);
	var editor = $(this.inputTag).attr("type", "text").attr("data-bind", "igCombo: {dataSource: data, textKey: 'name', valueKey: 'value', selectedItems: selectedItems}").appendTo(this.qunitFixture);
	var selectedItemsCombo = $(this.inputTag).attr("type", "text").attr("data-bind", "igCombo: {dataSource: data, textKey: 'name', valueKey: 'value', selectedItems: selectedItems, multiSelection: {enabled:true, addWithKeyModifier: true}}").appendTo(this.qunitFixture);
	this.applyBindings();

	var itemList = editor.data("igCombo")._options.$dropDownCont.find("li");
	editor.igCombo({
		selectionChanged: function (evt, ui) {
			textInput.val(ui.owner.text());
		}
	});

	this.emulateClick($(itemList[4]));
	this.testComboSelection(editor, selectedItemsCombo, textInput, textSelect, 'name4', '4');
	this.emulateClick($(itemList[3]));
	this.testComboSelection(editor, selectedItemsCombo, textInput, textSelect, 'name3', '3');
	this.emulateClick($(itemList[1]));
	this.testComboSelection(editor, selectedItemsCombo, textInput, textSelect, 'name1', '1');
	this.model.selectedItems([2]);
	this.testComboSelection(editor, selectedItemsCombo, textInput, textSelect, 'name2', '2', false);
});

QUnit.test("[ID3] Combo editor adding and deleting items", function (assert) {
	assert.expect(24);
	this.assert = assert;

	var textInput = $(this.inputTag).attr("type", "text").appendTo(this.qunitFixture);
	var textSelect = $(this.selectTag).attr("data-bind", "{options: data, optionsText: 'name', optionsValue: 'value', selectedOptions: selectedItems}").appendTo(this.qunitFixture);
	var editor = $(this.inputTag).attr("type", "text").attr("data-bind", "igCombo: {dataSource: data, textKey: 'name', valueKey: 'value', selectedItems: selectedItems}").appendTo(this.qunitFixture);
	var selectedItemsCombo = $(this.inputTag).attr("type", "text").attr("data-bind", "igCombo: {dataSource: data, textKey: 'name', valueKey: 'value', selectedItems: selectedItems, multiSelection: {enabled:true, addWithKeyModifier: true}}").appendTo(this.qunitFixture);
	this.applyBindings();

	editor.igCombo({
		selectionChanged: function (evt, ui) {
			textInput.val(ui.owner.text());
		}
	});

	var newItem = { value: 5, name: 'name5' };
	this.addItem(newItem);
	checkComboItems(6, 5, 'name5', 5);

	var itemList = editor.data("igCombo")._options.$dropDownCont.find("li");
	this.emulateClick($(itemList[5]));
	this.testComboSelection(editor, selectedItemsCombo, textInput, textSelect, 'name5', '5');
	this.model.selectedItems([1]);
	this.testComboSelection(editor, selectedItemsCombo, textInput, textSelect, 'name1', '1', false);
	this.model.selectedItems([5]);
	this.testComboSelection(editor, selectedItemsCombo, textInput, textSelect, 'name5', '5', false);
	this.removeItem(newItem);
	checkComboItems(5, 0, 'name0', 0);

	function checkComboItems(itemLength, value, text, index) {
		var comboList = editor.data("igCombo")._options.$dropDownCont.find("li"),
			dataSource = editor.igCombo('option', 'dataSource').data(),
			newItem = editor.igCombo("itemsFromIndex", index);

		assert.ok(dataSource.length === itemLength, "Combo editor data source item count");
		assert.ok(comboList.length === itemLength, "Combo editor drop down item count");

		if (value !== undefined && text !== undefined) {
			assert.ok(newItem.data.value === value, "The data source value should be updated");
			assert.ok(newItem.data.name === text, "The data source text should be updated");
		}
	}
});

QUnit.test("[ID4] Combo editor editing dropdown item", function (assert) {
	assert.expect(2);

	var editor = $(this.inputTag).attr("type", "text").attr("data-bind", "igCombo: {dataSource: data, textKey: 'name', valueKey: 'value', selectedItems: selectedItems}").appendTo(this.qunitFixture);
	var selectedItemsCombo = $(this.inputTag).attr("type", "text").attr("data-bind", "igCombo: {dataSource: data, textKey: 'name', valueKey: 'value', selectedItems: selectedItems, multiSelection: {enabled:true, addWithKeyModifier: true}}").appendTo(this.qunitFixture);
	this.applyBindings();

	this.editItem();
	var item = editor.igCombo("itemsFromIndex", 0);
	var name = item.data.name;
	assert.ok(name === "name007", "Combo editor item should be updated properly");
	this.editItemName();
	name = (selectedItemsCombo.igCombo("itemsFromIndex", 1)).data.name;
	assert.ok(name === "name007", "Combo editor item property should be updated properly");
});

QUnit.test("[ID5] Combo editor test value as observable", function (assert) {
	assert.expect(4);

	var combo1 = $(this.inputTag).attr("data-bind", "igCombo: {dataSource: data2, textKey: 'name', valueKey: 'value', selectedItems: selectedItemsValue, multiSelection: {enabled: true,	addWithKeyModifier: true}}").appendTo(this.qunitFixture);
	var combo2 = $(this.divTag).attr("data-bind", "igCombo: {dataSource: data2, textKey: 'name', valueKey: 'value', selectedItems: selectedItemsWhole, multiSelection: {enabled: true,	addWithKeyModifier: true}, autoComplete: true}").appendTo(this.qunitFixture);
	this.applyBindings();

	var itemList1 = combo1.data("igCombo")._options.$dropDownCont.find("li");
	var itemList2 = combo2.data("igCombo")._options.$dropDownCont.find("li");

	this.emulateClick($(itemList1[2]), true);
	assert.ok(this.model.selectedItemsValue().length === 2, "Selected item in combo editor should be added to the observable array");
	this.emulateClick($(itemList2[0]), true);
	assert.ok(this.model.selectedItemsWhole().length === 2, "Selected item in combo editor should be added to the observable array");

	this.model.selectedItemsValue(['value1']);
	assert.ok(this.model.selectedItemsValue().length === 1, "Deleted item should be removed from the observable array");

	this.model.selectedItemsWhole.remove(this.model.data2()[1]);
	assert.ok(this.model.selectedItemsWhole().length === 1, "Deleted item should be removed from the observable array");
});

QUnit.test("[ID6] Combo editor test empty data", function (assert) {
	assert.expect(4);

	var combo1 = $(this.inputTag).attr("type", "text").attr("data-bind", "igCombo: {dataSource: data, textKey: 'name', valueKey: 'value', selectedItems: selectedItems}").appendTo(this.qunitFixture);
	var combo2 = $(this.inputTag).attr("type", "text").attr("data-bind", "igCombo: {dataSource: data, textKey: 'name', valueKey: 'value', virtualization : true}").appendTo(this.qunitFixture);
	this.applyBindings();

	this.model.data.removeAll();
	var itemList1 = combo1.igCombo("listItems");
	var itemList2 = combo2.igCombo("listItems");

	assert.ok(itemList1.length === 0, "All combo editor items should be deleted when removed from the observable array");
	assert.ok(itemList2.length === 0, "All combo editor items should be deleted when removed from the observable array");
	this.model.data.push(this.model.item);

	itemList1 = combo1.igCombo("listItems");
	itemList2 = combo2.igCombo("listItems");
	assert.ok(itemList1.length === 1, "Adding item to the observable array should update the combo editor items");
	assert.ok(itemList2.length === 1, "Adding item to the observable array should update the combo editor items");
});

QUnit.test("[ID7] Combo editor custom values in combo input", function (assert) {
	assert.expect(2);

	var combo = $(this.inputTag).attr("data-bind", "igCombo: {dataSource: colorList, textKey: 'Color', valueKey: 'Color', allowCustomValue: true}").appendTo(this.qunitFixture);
	this.applyBindings();
	var comboInput = combo.data('igCombo')._options.$input;

	var keyDown = jQuery.Event("keydown"),
		keyUp = jQuery.Event("keyup");

	keyDown.keyCode = keyUp.keyCode = 'Block';

	comboInput.trigger(keyDown);
	comboInput.val('Block');
	comboInput.trigger(keyUp);
	comboInput.blur();
	assert.ok(comboInput.val() !== "", "Combo editor custom value should be removed from the input");
	assert.ok(combo.igCombo("text") === "Block", "Combo editor custom value should be persisted");
});


QUnit.test("[ID8] Combo editor test selected items list", function (assert) {
	assert.expect(4);

	var combo = $(this.inputTag).attr("data-bind", "igCombo: {dataSource: data, textKey: 'name', valueKey: 'value', selectedItems: selectedItems, multiSelection: {enabled: true}}").appendTo(this.qunitFixture);
	this.applyBindings();
	var comboInput = combo.data('igCombo')._options.$input;
	var itemList = combo.data("igCombo")._options.$dropDownCont.find("li");

	this.emulateClick($(itemList[3]));
	var comboSelectedItems = combo.igCombo("selectedItems");
	assert.ok(comboSelectedItems.length > 0, "Combo editor selected items list should not be empty");
	assert.ok(comboInput.val() !== "", "Combo editor input value should not be empty");

	this.model.data.removeAll();

	assert.ok(combo.igCombo("selectedItems") === null, "Combo editor selected items list should be empty");
	assert.ok(comboInput.val() === "", "There should not be any values that persist into the input");
});

QUnit.test("[ID9] Combo editor selecting an item in a virtualized combo should preserve position in dropdown list", function (assert) {
	assert.expect(2);

	var combo = $(this.inputTag).attr("data-bind", "igCombo: {animationShowDuration: 0,animationHideDuration: 0,selectedItems: selectedItems,dataSource: nameList,textKey: 'Name',valueKey: 'Name', multiSelection: {enabled: true, showCheckboxes: true},virtualization: true}").appendTo(this.qunitFixture);
	this.applyBindings();

	var listCont = combo.data("igCombo")._options.$dropDownListCont;
	var keyDown = jQuery.Event("keydown"),
		keyUp = jQuery.Event("keyup");

	combo.igCombo("openDropDown");

	for (var i = 0; i < 75; i++) {
		keyDown.keyCode = keyUp.keyCode = $.ui.keyCode.DOWN;
		combo.trigger(keyDown);
		combo.trigger(keyUp);
	}

	var listItems = combo.igCombo("listItems");
	var done = assert.async();
	var self = this;
	var lastItem;

	$.ig.TestUtil.wait(100).then(function () {
		assert.equal(listItems.last().text(), "75", "Combo editor last list item value should be 75");
		self.emulateClick(listItems.last());
		lastItem = listItems.last();
		return $.ig.TestUtil.wait(200);
	}).then(function () {
		listItems = combo.igCombo("listItems");
		assert.equal(listItems.last().text(), lastItem.text(), "Combo editor last list item should be selected");
		combo.igCombo("closeDropDown");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});


QUnit.test("[ID10] Combo editor test igComboDisable binding", function (assert) {
	assert.expect(16);

	var combo1 = $(this.inputTag).attr("data-bind", "igCombo: {dataSource: data2, width: '200'}, igComboDisable: isDisabled").appendTo(this.qunitFixture);
	var combo2 = $(this.inputTag).attr("data-bind", "igCombo: {dataSource: data2, width: '200'}, igComboDisable: isDisabledInvalid").appendTo(this.qunitFixture);
	var chk = $(this.inputTag).attr("type", "checkbox").attr("data-bind", "checked: isDisabled").appendTo(this.qunitFixture);
	this.applyBindings();

	assert.notOk(combo1.igCombo("option", "disabled"), "Combo editor disabled option should be equal to false");
	assert.notOk(combo1.igCombo("valueInput").prop("disabled"), "Combo editor value input disabled property should be equal to false");
	assert.equal(combo1.igCombo("valueInput").attr("disabled"), undefined, "Combo editor value input disabled attribute should be undefined");
	assert.notOk(combo1.igCombo("comboWrapper").hasClass($.ui.igCombo.prototype.css.disabled), "Combo editor comboWrapper should not have disabled class");
	chk.click();
	assert.ok(combo1.igCombo("option", "disabled"), "Combo editor disabled option should be equal to true");
	assert.ok(combo1.igCombo("valueInput").prop("disabled"), "Combo editor value input disabled property should be equal to true");
	assert.equal(combo1.igCombo("valueInput").attr("disabled"), "disabled", "Combo editor value input disabled attribute should be equal to disabled");
	assert.ok(combo1.igCombo("comboWrapper").hasClass($.ui.igCombo.prototype.css.disabled), "Combo editor comboWrapper should have disabled class");
	chk.click();
	chk.click();
	chk.click();
	assert.notOk(combo1.igCombo("option", "disabled"), "Combo editor disabled option should be equal to false");
	assert.notOk(combo1.igCombo("valueInput").prop("disabled"), "Combo editor value input disabled property should be equal to false");
	assert.equal(combo1.igCombo("valueInput").attr("disabled"), undefined, "Combo editor value input disabled attribute should be undefined");
	assert.notOk(combo1.igCombo("comboWrapper").hasClass($.ui.igCombo.prototype.css.disabled), "Combo editor comboWrapper should not have disabled class");

	assert.notOk(combo2.igCombo("option", "disabled"), "Invalid combo editor disabled option should be equal to false");
	assert.notOk(combo2.igCombo("valueInput").prop("disabled"), "Invalid combo editor value input disabled property should be equal to false");
	assert.equal(combo2.igCombo("valueInput").attr("disabled"), undefined, "Invalid combo editor value input disabled attribute should be undefined");
	assert.notOk(combo2.igCombo("comboWrapper").hasClass($.ui.igCombo.prototype.css.disabled), "Invalid combo editor comboWrapper should not have disabled class");
});

QUnit.test("[ID11] Combo editor test igComboVisible binding", function (assert) {
	assert.expect(7);

	var comboInput = $(this.inputTag).attr("data-bind", "igCombo: {dataSource: data3, width: '150'}, igComboVisible: isVisible").appendTo(this.qunitFixture);
	var comboSpan = $(this.divTag).attr("data-bind", "igCombo: {dataSource: data3, width: '150'}, igComboVisible: isVisible").appendTo(this.qunitFixture);
	var comboDiv = $(this.divTag).attr("data-bind", "igCombo: {dataSource: data3, width: '150'}, igComboVisible: isVisible").appendTo(this.qunitFixture);
	var comboInvalidVis = $(this.divTag).attr("data-bind", "igCombo: {dataSource: data3, width: '150'}, igComboVisible: isVisibleInvalid").appendTo(this.qunitFixture);
	var checkbox = $(this.inputTag).attr("type", "checkbox").attr("data-bind", "checked: isVisible").appendTo(this.qunitFixture);
	this.applyBindings();

	// Input placeholder
	assert.equal(comboInput.igCombo("comboWrapper").css("display"), "inline-block", "Editor in input should be visible");
	// Div placeholder
	assert.equal(comboDiv.igCombo("comboWrapper").css("display"), "inline-block", "Editor in div should be visible");
	// Span placeholder
	assert.equal(comboSpan.igCombo("comboWrapper").css("display"), "inline-block", "Editor in span should be visible");

	checkbox.click();
	assert.equal(comboDiv.igCombo("comboWrapper").css("display"), "none", "Editor in div should not be invisible");
	assert.equal(comboInput.igCombo("comboWrapper").css("display"), "none", "Editor in input should not be invisible");
	assert.equal(comboSpan.igCombo("comboWrapper").css("display"), "none", "Editor in span should not be invisible");

	checkbox.click();
	assert.equal(comboInvalidVis.igCombo("comboWrapper").css("display"), "inline-block", "Editor should be visible when a non-observable invalid value is set to igComboVisible.");
});

QUnit.test("[ID12] Combo editor binding", function (assert) {
	assert.expect(7);

	var combo = $(this.inputTag).attr("data-bind", "igCombo: {dataSource: data4, width: '150', valueKey: 'value', textKey: 'text'}").appendTo(this.qunitFixture);
	this.applyBindings();
	var index = 1,
		baseText = "item2",
		baseValue = 2,
		updatedText = "item99",
		updatedValue = 99;

	combo.igCombo("openDropDown");
	var itemList = combo.data("igCombo")._options.$dropDownCont.find("li");
	var itemListLenght = itemList.length;
	assert.equal(itemList[index].textContent, baseText, "Item in item list should be correct on drop down");

	this.emulateClick($(itemList[index]));
	assert.ok(combo.igCombo('text') === baseText, 'Editor combo text should be equal to the selected item text');
	assert.ok(combo.igCombo('valueInput').val() == baseValue, 'Editor combo input value should be equal to the selected item value');

	var newItem = { value: updatedValue, text: updatedText };
	this.model.data4()[1](newItem);

	combo.igCombo("openDropDown");
	var updatedItemList = combo.data("igCombo")._options.$dropDownCont.find("li");

	assert.ok(updatedItemList.length === itemListLenght, "Combo editor list items number should be equal to the initial list items number");
	assert.equal(updatedItemList[index].textContent, updatedText, "Combo editor items list should be updated with the editted item");

	this.emulateClick($(itemList[index]));
	assert.ok(combo.igCombo('text') === updatedText, 'Combo editor text should be updated');
	assert.ok(combo.igCombo('valueInput').val() == updatedValue, 'Combo editor input value should be updated');
});

QUnit.test("[ID13] Combo editor test big data", function (assert) {
	assert.expect(1);

	var comboCont = $(this.divTag).appendTo(this.qunitFixture);
	comboCont.append($("<span id='comboBigData'></span>").attr("data-bind", "igCombo: { dataSource: bigData, textKey: 'name', valueKey: 'id', width: '200', mode: 'dropdown', enableClearButton: false }"));
	var start = (new Date()).getTime();
	ko.applyBindings(this.model, comboCont[0]);
	var end = (new Date()).getTime();
	assert.ok(end - start < 5000, "Binding big data should take less than 5 seconds");
});




