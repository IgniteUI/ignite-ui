QUnit.module("igCombo selection unit tests", {
	before: function () {
		$("html").css("font-size", "16px");
		$("html").css("line-height", "1.2");
	},
	after: function () {
		$("html").css("font-size", "");
		$("html").css("line-height", "");
	},
	divTag: '<div></div>',
	dataSource1: [
		{ ID: 1, Name: "John Smith" },
		{ ID: 2, Name: "Mary Johnson" },
		{ ID: 3, Name: "Bob Ferguson" }],
	dataSource2: [
		{ ID: 1, Name: "John Smith" },
		{ ID: 2, Name: "Mary Johnson" },
		{ ID: 3, Name: "Bob Ferguson" },
		{ ID: 4, Name: "Tom Tomov" },
		{ ID: 5, Name: "Stewerd Matewson" },
		{ ID: 6, Name: "David Bengalski" }],
	dataSource3: [
		{ ID: 1, Name: "John" },
		{ ID: 2, Name: "Mary" },
		{ ID: 3, Name: "Bob" },
		{ ID: 4, Name: "Tom" },
		{ ID: 5, Name: "Stewerd" },
		{ ID: 6, Name: "David" },
		{ ID: 7, Name: "Anna" },
		{ ID: 7, Name: "Hana" },
		{ ID: 8, Name: "Betty" }],
	dataSource4: [
		{ ID: 1, Name: "John" },
		{ ID: 2, Name: "Mary" },
		{ ID: 3, Name: "Bob" }
	],
	dataSource5: [
		{ "ID": 1, "ProductName": "Chai", "SupplierName": "Exotic Liquids" },
		{ "ID": 2, "ProductName": "Chang", "SupplierName": "Exotic Liquids" },
		{ "ID": 3, "ProductName": "Aniseed Syrup", "SupplierName": "Exotic Liquids" },
		{ "ID": 4, "ProductName": "Chef Anton's Cajun Seasoning", "SupplierName": "New Orleans Cajun Delights" },
		{ "ID": 5, "ProductName": "Chef Anton's Gumbo Mix", "SupplierName": "New Orleans Cajun Delights", },
		{ "ID": 6, "ProductName": "Grandma's Boysenberry Spread", "SupplierName": "Grandma Kelly Homestead", },
		{ "ID": 7, "ProductName": "Uncle Bob's Organic Dried Pears", "SupplierName": "Grandma Kelly Homestead", },
		{ "ID": 8, "ProductName": "Northwoods Cranberry Sauce", "SupplierName": "Grandma Kelly Homestead", },
		{ "ID": 9, "ProductName": "Mishi Kobe Niku", "SupplierName": "Tokyo Traders", },
		{ "ID": 10, "ProductName": "Ikura", "SupplierName": "Tokyo Traders", },
		{ "ID": 11, "ProductName": "Queso Cabrales", "SupplierName": "Cooperativa de Quesos Las Cabras", }],
	dataSource6: [
		{ "ID": 1, "Name": "Captain America", "Age": 45 },
		{ "ID": 2, "Name": "Hawkeye", "Age": 32 },
		{ "ID": 3, "Name": "Quicksilver", "Age": 27 },
	],
	dataSource7: [
		{ ID: 0, Name: "John", Age: 45, ModifiedDate: "1/1/2000" },
		{ ID: 1, Name: "Chai", Age: 32, ModifiedDate: new Date(1309467600000) },
		{ ID: 2, Name: "Chang", Age: 32, ModifiedDate: "/Date(1078992096827)/" },
		{ ID: 5, Name: "3", Age: 32, ModifiedDate: "\/Date(1078992096827)\/" },
		{ ID: 4, Name: "test dsf", Age: 32, ModifiedDate: "\/Date(1078992096827)\/" },
		{ ID: 3, Name: "Bob ", Age: 27, ModifiedDate: "\/Date(1078992096827)\/" }]
});

QUnit.test('[ID1] Item selection', function (assert) {
	assert.expect(35);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-selitem" }),
		$hiddenInput, $itemToSel, $input, $selectedItems, $items,
		selectionChangingFires = 0,
		selectionChangedFires = 0,
		expInputVal = 'John Smith',
		expHiddenInputVal = '1';

	$combo.igCombo({
		dataSource: this.dataSource1,
		textKey: 'Name',
		valueKey: 'ID',
		animationShowDuration: 0,
		animationHideDuration: 0,
		selectionChanging: function (event, args) { selectionChangingFires++; },
		selectionChanged: function (event, args) { selectionChangedFires++; },
		initialSelectedItems: [{ index: 1 }]
	});

	$input = $combo.find('.ui-igcombo-field');
	$hiddenInput = $combo.find('.ui-igcombo-hidden-field');
	$itemToSel = $combo.igCombo('dropDown').find('.ui-igcombo-listitem').first();
	$items = $combo.igCombo('dropDown').find('li');

	// Verify initialSelectedItems
	assert.strictEqual($input.val(), "Mary Johnson", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "2", 'Hidden input value is incorrect');

	// Select item
	$combo.igCombo('select', $itemToSel);
	assert.strictEqual($input.val(), expInputVal, 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), expHiddenInputVal, 'Hidden input value is incorrect');

	$selectedItems = $combo.igCombo('selectedItems');
	assert.strictEqual($selectedItems.length, 1, 'Selected items count is not correct');
	assert.strictEqual($selectedItems[0].data.ID, 1, 'Item data is not correct');
	assert.ok($combo.igCombo('isIndexSelected', 0), 'Item should be selected');
	assert.ok($combo.igCombo('isValueSelected', 1), 'Item should be selected');
	assert.strictEqual(selectionChangingFires, 0, 'selectionChanging event should not fire');
	assert.strictEqual(selectionChangedFires, 0, 'selectionChanged event should not fire');

	// deselect item
	$combo.igCombo('deselect');
	assert.strictEqual($input.val(), "", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');

	$selectedItems = $combo.igCombo('selectedItems');
	assert.strictEqual($selectedItems, null, 'Selected items count is not correct');
	assert.notOk($combo.igCombo('isIndexSelected', 0), 'Item should not be selected');
	assert.notOk($combo.igCombo('isValueSelected', 1), 'Item should not be selected');
	assert.strictEqual(selectionChangingFires, 0, 'selectionChanging event should not fire');
	assert.strictEqual(selectionChangedFires, 0, 'selectionChanged event should not fire');

	// Select item by index
	$combo.igCombo('index', 0);

	assert.strictEqual($input.val(), expInputVal, 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), expHiddenInputVal, 'Hidden input value is incorrect');
	assert.strictEqual(selectionChangingFires, 0, 'selectionChanging event should not fire');
	assert.strictEqual(selectionChangedFires, 0, 'selectionChanged event should not fire 1');

	// deselect item by index
	$combo.igCombo('deselectByIndex', 0);
	assert.strictEqual($input.val(), "", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');
	assert.strictEqual(selectionChangingFires, 0, 'selectionChanging event should not fire');
	assert.strictEqual(selectionChangedFires, 0, 'selectionChanged event should not fire');

	// Select items by value
	$combo.igCombo('value', 1);

	assert.strictEqual($input.val(), expInputVal, 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), expHiddenInputVal, 'Hidden input value is incorrect');
	assert.strictEqual(selectionChangingFires, 0, 'selectionChanging event should not fire');
	assert.strictEqual(selectionChangedFires, 0, 'selectionChanged event should not fire');

	// deselect item by value
	$combo.igCombo('deselectByValue', 3);
	assert.strictEqual($input.val(), expInputVal, 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), expHiddenInputVal, 'Hidden input value is incorrect');
	assert.strictEqual(selectionChangingFires, 0, 'selectionChanging event should not fire');
	assert.strictEqual(selectionChangedFires, 0, 'selectionChanged event should not fire');

	// Get first selected item by value
	assert.strictEqual($item = $combo.igCombo('value'), 1, 'Item value is not correct');

	// Get first selected item by index
	assert.strictEqual($item = $combo.igCombo('index'), 0, 'Item index is not correct');
});

QUnit.test('[ID2] Drop down mode', function (assert) {
	assert.expect(6);

	var $input, $item,
		$combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-ddmode" }),
		itemHeight = 29,
		border = 1,
		dropDownExpHeight = 3 * itemHeight + border,
		listItemExpWidth = 198,
		listItemExpHeight = itemHeight,
		listItemExpPosLeft = $combo.offset().left + 1,
		listItemExpPosTop = $combo.offset().top + 30;

	$combo.igCombo({
		width: 200,
		height: 30,
		dataSource: this.dataSource1,
		mode: 'dropdown',
		animationShowDuration: 0,
		animationHideDuration: 0,
		dropDownAttachedToBody: false
	});

	$input = $combo.find('.ui-igcombo-field');
	$dropDown = $combo.find('.ui-igcombo-dropdown');
	$item = $combo.find('li').eq(0);

	assert.strictEqual($input.attr('readonly'), 'readonly', 'Readonly attribute was not applied');
	assert.strictEqual($input.hasClass('ui-unselectable'), true, 'Unselectable class was not applied');

	$.ig.TestUtil.click($input);
	// Adding tolerance for inconsistencies between the running engine and real browsers
	assert.ok(dropDownExpHeight - 6 <= $dropDown.outerHeight() && dropDownExpHeight + 6 >= $dropDown.outerHeight(), dropDownExpHeight,
		`Drop down height is incorrect: ${$dropDown.outerHeight()}, exp: ${dropDownExpHeight}`);
	//strictEqual($dropDown.outerHeight(), dropDownExpHeight, 'Drop down height is incorrect');

	$.ig.TestUtil.mouseEvent($item, "mouseover"); // Hover item
	assert.ok($item.hasClass('ui-state-hover'), 'Class ui-state-hover was not applied to list item 0');

	$.ig.TestUtil.mouseEvent($item, "mouseout");
	assert.notOk($item.hasClass('ui-state-hover'), 'Class ui-state-hover was not applied to list item 0');

	$.ig.TestUtil.mouseEvent($input, "click"); // click on input
	$dropDown = $combo.find('.ui-igcombo-dropdown');
	assert.strictEqual($dropDown.outerHeight(), 0, 'Drop down height is incorrect');
});

QUnit.test('[ID3] Readonly mode', function (assert) {
	assert.expect(6);

	var $input, $dropDown, $hiddenInput,
		$combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-romode" });

	$combo.igCombo({
		dataSource: this.dataSource1,
		mode: 'readonly',
		animationShowDuration: 0,
		animationHideDuration: 0
	});

	$input = $combo.find('.ui-igcombo-field');
	$hiddenInput = $combo.find('.ui-igcombo-hidden-field');
	$button = $combo.find('.ui-igcombo-button');

	assert.strictEqual($input.attr('readonly'), 'readonly', 'Readonly attribute was not applied');
	assert.strictEqual($input.hasClass('ui-unselectable'), true, 'Unselectable class was not applied');

	assert.strictEqual($input.val(), "1", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "1", 'Hidden input value is incorrect');

	$.ig.TestUtil.click($input);  // click on input
	$dropDown = $combo.igCombo('dropDown');
	assert.strictEqual($dropDown.outerHeight(), 0, 'Drop down should not be opened');

	$.ig.TestUtil.click($button);  // click on expand button
	$dropDown = $combo.igCombo('dropDown');
	assert.strictEqual($dropDown.outerHeight(), 0, 'Drop down should not be opened');
});

QUnit.test('[ID4] Readonlylist mode', function (assert) {
	assert.expect(12);

	var $input, $item, $item1, $hiddenInput, $dropDown,
		$combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-rolmode" }),
		listItemExpWidth = 198,
		listItemExpHeight = 29,
		listItemExpPosLeft = $combo.offset().left + 1,
		listItemExpPosTop = $combo.offset().top + 30,
		dropDownExpHeight = 3 * listItemExpHeight + 1;

	$combo.igCombo({
		width: 200,
		height: 30,
		dataSource: this.dataSource1,
		dropDownOrientation: "bottom",
		mode: 'readonlylist',
		animationShowDuration: 0,
		animationHideDuration: 0,
		dropDownAttachedToBody: false
	});

	$input = $combo.find('.ui-igcombo-field');
	$dropDown = $combo.find('.ui-igcombo-dropdown');
	$hiddenInput = $combo.find('.ui-igcombo-hidden-field');
	$item = $combo.find('li').eq(0);
	$item1 = $combo.find('li').eq(1);

	assert.strictEqual($input.attr('readonly'), 'readonly', 'Readonly attribute was not applied');
	assert.strictEqual($input.hasClass('ui-unselectable'), true, 'Unselectable class was not applied');

	$.ig.TestUtil.click($input);
	// Adding tolerance for inconsistencies between the running engine and real browsers
	assert.ok(dropDownExpHeight - 6 <= $dropDown.outerHeight() && dropDownExpHeight + 6 >= $dropDown.outerHeight(), dropDownExpHeight,
		`Drop down height is incorrect: ${$dropDown.outerHeight()}, exp: ${dropDownExpHeight}`);
	//strictEqual($dropDown.outerHeight(), dropDownExpHeight, 'Drop down height is incorrect');

	// Verify first item is selected
	assert.ok($item.hasClass('ui-state-active'), 'Item should be selected');
	assert.strictEqual($input.val(), "1", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "1", 'Hidden input value is incorrect');

	$.ig.TestUtil.click($item1);

	assert.ok($item.hasClass('ui-state-active'), 'Item should be selected');
	assert.notOk($item1.hasClass('ui-state-active'), 'Item should not be selected');
	assert.strictEqual($input.val(), "1", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "1", 'Hidden input value is incorrect');

	$.ig.TestUtil.mouseEvent($item, "mouseover");
	assert.notOk($item1.hasClass('ui-state-hover'), 'Class ui-state-hover was applied to list item 1');

	$.ig.TestUtil.mouseEvent($item, "mouseout");
	assert.notOk($item1.hasClass('ui-state-hover'), 'Class ui-state-hover was applied to list item 1');
});

QUnit.test('[ID5] Validation', function (assert) {
	assert.expect(6);

	var validator, validateResult,
		done = assert.async(),
		destroy = true,
		$valCombo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-validation" });
		
	$valCombo.igCombo({
		dataSource: this.dataSource1,
		textKey: 'Name',
		animationShowDuration: 0,
		animationHideDuration: 0,
		validatorOptions: {
			required: true
		}
	});

	// Validator
	validator = $valCombo.igCombo('validator');
	assert.ok($.type(validator) === "object", "Validator should be object.");
	assert.ok(validator.widgetName === "igValidator", "The type of Validator should be igValidator.");
	assert.strictEqual($valCombo.igCombo('validate'), false, 'Validation error message should be previewed');

	// Bug #209248 : Error when using igCombo with validatorOptions using closeDropDown()
	$valCombo.igCombo('openDropDown');
	$.ig.TestUtil.keyInteraction(40, $valCombo.igCombo("textInput"));
	$valCombo.igCombo('closeDropDown'); //causes validation
	assert.strictEqual(validator.isValid(), true, 'Validation should pass when closeDropDown() is called');

	validator = $valCombo.igCombo('validator', true);
	$.ig.TestUtil.wait(300).then(function () {
	assert.ok(validator === null, "Validator should be null.");
	assert.strictEqual($valCombo.igCombo('validate'), null, 'Validate should return null when validator is destroyed');
	$valCombo.igCombo('destroy');
	done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID6] Key navigation single selection', function (assert) {
	assert.expect(72);

	var $input, $items, $hiddenInput, $listItemsDiv,
		$combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-keynav" }),
		selectionChangingFires = 0, selectionChangedFires = 0,
		dropDownOpenedFires = 0, dropDownOpeningFires = 0,
		dropDownClosedFires = 0, dropDownClosingFires = 0;

	$combo.igCombo({
		dataSource: this.dataSource2,
		textKey: 'Name',
		animationShowDuration: 0,
		animationHideDuration: 0,
		selectionChanging: function (event, args) { selectionChangingFires++; },
		selectionChanged: function (event, args) { selectionChangedFires++; },
		dropDownOpening: function (event, args) { dropDownOpeningFires++; },
		dropDownOpened: function (event, args) { dropDownOpenedFires++; },
		dropDownClosing: function (event, args) { dropDownClosingFires++; },
		dropDownClosed: function (event, args) { dropDownClosedFires++; }
	});

	$hiddenInput = $combo.find('.ui-igcombo-hidden-field');
	$input = $combo.find('.ui-igcombo-field');
	$listItemsDiv = $combo.igCombo('dropDown');
	$items = $listItemsDiv.find('li');

	$.ig.TestUtil.keyInteraction(40, $input); // key down

	assert.ok($listItemsDiv.height() > 0, 'List items list should  be visible');
	assert.strictEqual(1, dropDownOpeningFires, 'dropDownOpening event should fire');
	assert.strictEqual(1, dropDownOpenedFires, 'dropDownOpened event should fire');

	$.ig.TestUtil.keyInteraction(40, $input); // key down
	assert.strictEqual($input.val(), "John Smith", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "John Smith", 'Hidden input value is incorrect');
	assert.ok($items.eq(0).hasClass('ui-state-active'), 'Item should be selected by key down');
	assert.strictEqual(1, selectionChangingFires, 'selectionChanging event should fire');
	assert.strictEqual(1, selectionChangedFires, 'selectionChanged event should fire');

	$.ig.TestUtil.keyInteraction(38, $input); // key up
	assert.ok($items.eq(0).hasClass('ui-state-active'), 'Item should be selected by key up');
	assert.strictEqual($input.val(), "John Smith", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "John Smith", 'Hidden input value is incorrect');
	assert.strictEqual(1, selectionChangingFires, 'selectionChanging event should fire');
	assert.strictEqual(1, selectionChangedFires, 'selectionChanged event should fire');
	assert.strictEqual(0, $listItemsDiv.height(), 'List items list should not be visible');
	assert.strictEqual(1, dropDownClosingFires, 'dropDownClosing event should fire');
	assert.strictEqual(1, dropDownClosedFires, 'dropDownClosed event should fire');

	$.ig.TestUtil.keyInteraction(40, $input, "altKey"); // alt + key down
	assert.ok($listItemsDiv.height() > 0, 'List items list should  be visible');
	assert.ok($items.eq(0).hasClass('ui-state-active'), 'Item should be selected');
	assert.strictEqual($input.val(), "John Smith", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "John Smith", 'Hidden input value is incorrect');
	assert.strictEqual(2, dropDownOpeningFires, 'dropDownOpening event should fire');
	assert.strictEqual(2, dropDownOpenedFires, 'dropDownOpened event should fire');

	$.ig.TestUtil.keyInteraction(40, $input); // key down
	$.ig.TestUtil.keyInteraction(40, $input); // key down
	assert.strictEqual($input.val(), "Bob Ferguson", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "Bob Ferguson", 'Hidden input value is incorrect');
	assert.strictEqual(2, $combo.igCombo('activeIndex'), 'activ index is not correct');
	assert.ok($items.eq(2).hasClass('ui-state-active'), 'Item should be selected');
	assert.strictEqual(3, selectionChangingFires, 'selectionChanging event should fire');
	assert.strictEqual(3, selectionChangedFires, 'selectionChanged event should fire');
	assert.ok($listItemsDiv.height() > 0, 'List items list should  be visible');

	$.ig.TestUtil.keyInteraction(38, $input); // key up
	assert.strictEqual($input.val(), "Mary Johnson", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "Mary Johnson", 'Hidden input value is incorrect');
	assert.strictEqual(1, $combo.igCombo('activeIndex'), 'activ index is not correct');
	assert.ok($items.eq(1).hasClass('ui-state-active'), 'Item was not selected by key down');
	assert.strictEqual(4, selectionChangingFires, 'selectionChanging event should fire');
	assert.strictEqual(4, selectionChangedFires, 'selectionChanged event should fire');
	assert.ok($listItemsDiv.height() > 0, 'List items list should be visible');

	$.ig.TestUtil.keyDownChar(36, $input, "ctrlKey"); // ctrl + home key
	$.ig.TestUtil.keyUpChar(36, $input, "ctrlKey"); // ctrl + home key
	assert.ok($items.eq(0).hasClass('ui-state-active'), 'Item was not selected by home key');
	assert.strictEqual($input.val(), "John Smith", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "John Smith", 'Hidden input value is incorrect');
	assert.strictEqual(5, selectionChangingFires, 'selectionChanging event should fire');
	assert.strictEqual(5, selectionChangedFires, 'selectionChanged event should fire');

	$.ig.TestUtil.keyDownChar(35, $input, "ctrlKey"); // ctrl + end key
	$.ig.TestUtil.keyUpChar(35, $input, "ctrlKey"); // ctrl + end key		
	assert.ok($items.eq(5).hasClass('ui-state-active'), 'Item was not selected by end key');
	assert.strictEqual($input.val(), "David Bengalski", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "David Bengalski", 'Hidden input value is incorrect');
	assert.strictEqual(6, selectionChangingFires, 'selectionChanging event should fire');
	assert.strictEqual(6, selectionChangedFires, 'selectionChanged event should fire');

	var currentScrollPosition = $(window).scrollTop();
	$.ig.TestUtil.keyInteraction(33, $input); // page up key
	assert.ok($items.eq(0).hasClass('ui-state-active'), 'Item should be selected');
	assert.notOk($items.eq(5).hasClass('ui-state-active'), 'Item was not selected');
	assert.strictEqual($input.val(), "John Smith", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "John Smith", 'Hidden input value is incorrect');
	assert.strictEqual(7, selectionChangingFires, 'selectionChanging event should fire');
	assert.strictEqual(7, selectionChangedFires, 'selectionChanged event should fire');
	assert.ok(currentScrollPosition === $(window).scrollTop(), 'Page should not be scrolled up');

	$.ig.TestUtil.keyInteraction(34, $input); // page down key
	assert.ok($items.eq(5).hasClass('ui-state-active'), 'Item should be selected');
	assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item was not selected');
	assert.strictEqual($input.val(), "David Bengalski", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "David Bengalski", 'Hidden input value is incorrect');
	assert.strictEqual(8, selectionChangingFires, 'selectionChanging event should fire');
	assert.strictEqual(8, selectionChangedFires, 'selectionChanged event should fire');

	$.ig.TestUtil.keyInteraction(27, $input); // escape key
	assert.ok($items.eq(5).hasClass('ui-state-active'), 'Item should be selected');
	assert.strictEqual($input.val(), "David Bengalski", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "David Bengalski", 'Hidden input value is incorrect');

	$combo.igCombo('deselect', $items.eq(5)) // deselect item
	assert.notOk($items.eq(5).hasClass('ui-state-active'), 'Item should not be selected');
	assert.strictEqual($input.val(), "", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');

	$combo.igCombo('activeIndex', 1) // Set active index to be first item
	assert.strictEqual(1, $combo.igCombo('activeIndex'), 'active index is not correct');
	assert.ok($items.eq(1).hasClass('ui-igcombo-item-in-focus'), 'Item should be active');

	$.ig.TestUtil.keyInteraction(38, $input, "altKey"); // alt + arrow up
	assert.strictEqual($input.val(), "", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');
	assert.strictEqual(0, $listItemsDiv.height(), 'List items list should not be visible');
	assert.strictEqual(2, dropDownClosingFires, 'dropDownClosing event should fire');
	assert.strictEqual(2, dropDownClosedFires, 'dropDownClosed event should fire');
});

QUnit.test('[ID7] Key navigation multi selection', function (assert) {
	assert.expect(78);

	var $input, $items, $hiddenInput, $listItemsDiv, isValueCorrect,
		$combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-keynavmult" }),
		selectionChangingFires = 0, selectionChangedFires = 0,
		dropDownOpenedFires = 0, dropDownOpeningFires = 0,
		dropDownClosedFires = 0, dropDownClosingFires = 0;

	$combo.igCombo({
		dataSource: this.dataSource2,
		textKey: 'Name',
		animationShowDuration: 0,
		animationHideDuration: 0,
		multiSelection: { enabled: true },
		selectionChanging: function (event, args) { selectionChangingFires++; },
		selectionChanged: function (event, args) { selectionChangedFires++; },
		dropDownOpening: function (event, args) { dropDownOpeningFires++; },
		dropDownOpened: function (event, args) { dropDownOpenedFires++; },
		dropDownClosing: function (event, args) { dropDownClosingFires++; },
		dropDownClosed: function (event, args) { dropDownClosedFires++; }
	});

	$hiddenInput = $combo.find('.ui-igcombo-hidden-field');
	$input = $combo.find('.ui-igcombo-field');
	$listItemsDiv = $combo.igCombo('dropDown');
	$items = $listItemsDiv.find('li');

	$.ig.TestUtil.keyInteraction(40, $input); // key down
	assert.ok($listItemsDiv.height() > 0, 'List items list should  be visible');
	assert.strictEqual(1, dropDownOpeningFires, 'dropDownOpening event should fire');
	assert.strictEqual(1, dropDownOpenedFires, 'dropDownOpened event should fire');

	$.ig.TestUtil.keyInteraction(40, $input); // key down
	assert.strictEqual($input.val(), "", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');
	assert.ok($items.eq(0).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused by key down');
	assert.strictEqual(0, selectionChangingFires, 'selectionChanging event should not fire');
	assert.strictEqual(0, selectionChangedFires, 'selectionChanged event should not fire');

	$.ig.TestUtil.keyInteraction(38, $input); // key up
	assert.notOk($items.eq(0).hasClass('ui-igcombo-item-in-focus'), 'Item should be unfocused by key up');
	assert.strictEqual($input.val(), "", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');
	assert.strictEqual(0, selectionChangingFires, 'selectionChanging event should not fire');
	assert.strictEqual(0, selectionChangedFires, 'selectionChanged event should not fire');
	assert.strictEqual(0, $listItemsDiv.height(), 'List items list should not be visible');

	$.ig.TestUtil.keyInteraction(40, $input, "altKey"); // alt + key down
	assert.ok($listItemsDiv.height() > 0, 'List items list should  be visible after pressing Alt+key down');
	assert.notOk($items.eq(0).hasClass('ui-igcombo-item-in-focus'), 'Item should not be focused');

	$.ig.TestUtil.keyInteraction(40, $input); // key down
	assert.ok($items.eq(0).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused');
	assert.strictEqual($input.val(), "", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');
	assert.strictEqual(2, dropDownOpeningFires, 'dropDownOpening event should fire');
	assert.strictEqual(2, dropDownOpenedFires, 'dropDownOpened event should fire');

	$.ig.TestUtil.keyInteraction(40, $input); // key down
	$.ig.TestUtil.keyInteraction(40, $input); // key down
	assert.strictEqual($input.val(), "", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');
	assert.strictEqual(2, $combo.igCombo('activeIndex'), 'activ index is not correct');
	assert.ok($items.eq(2).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused by key down');
	assert.ok(!$items.eq(2).hasClass('ui-state-active'), 'Item should not be selected');
	assert.strictEqual(0, selectionChangingFires, 'selectionChanging event should not fire');
	assert.strictEqual(0, selectionChangedFires, 'selectionChanged event should not fire');
	assert.ok($listItemsDiv.height() > 0, 'List items list should  be visible');

	$.ig.TestUtil.keyInteraction(38, $input); // key up
	assert.strictEqual($input.val(), "", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');
	assert.strictEqual(1, $combo.igCombo('activeIndex'), 'activ index is not correct');
	assert.ok($items.eq(1).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused by key up');
	assert.ok(!$items.eq(1).hasClass('ui-state-active'), 'Item should not be selected by key up');
	assert.strictEqual(0, selectionChangingFires, 'selectionChanging event should not fire');
	assert.strictEqual(0, selectionChangedFires, 'selectionChanged event should not fire');

	$.ig.TestUtil.keyInteraction(13, $input); // enter key
	// Workaround for issue where the input is not focused when running tests headless, thus 'Mary Jonhson' is without item separator
	isValueCorrect = $input.val() === 'Mary Johnson, ' || $input.val() === 'Mary Johnson';
	assert.ok(isValueCorrect, 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "Mary Johnson", 'Hidden input value is incorrect');
	assert.ok($items.eq(1).hasClass('ui-state-active'), 'Item should be selected by press Enter');
	assert.strictEqual(1, selectionChangingFires, 'selectionChanging event should fire');

	$.ig.TestUtil.keyInteraction(40, $input); // key down
	$.ig.TestUtil.keyInteraction(40, $input); // key down
	// Workaround for issue where the input is not focused when running tests headless, thus 'Mary Jonhson' is without item separator
	isValueCorrect = $input.val() === 'Mary Johnson, ' || $input.val() === 'Mary Johnson';
	assert.ok(isValueCorrect, 'Input value is incorrect 2');
	assert.strictEqual($hiddenInput.val(), "Mary Johnson", 'Hidden input value is incorrect');
	assert.strictEqual(3, $combo.igCombo('activeIndex'), 'active index is not correct');
	assert.ok($items.eq(3).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused by key down');
	assert.notOk($items.eq(3).hasClass('ui-state-active'), 'Item should not be selected by key down');
	assert.strictEqual(1, selectionChangingFires, 'selectionChanging event should not fire');
	assert.strictEqual(1, selectionChangedFires, 'selectionChanged event should not fire');

	$.ig.TestUtil.keyInteraction(13, $input, "ctrlKey"); // ctrl + enter key
	// Workaround for issue where the input is not focused when running tests headless and item separator is not added
	isValueCorrect = $input.val() === 'Mary Johnson, Tom Tomov, ' || $input.val() === 'Mary Johnson, Tom Tomov';
	assert.ok(isValueCorrect, 'Input value is incorrect');
	assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after pressing Ctrl+enter');
	assert.strictEqual($hiddenInput.val(), "Mary Johnson, Tom Tomov", 'Hidden input value is incorrect');
	assert.ok($items.eq(1).hasClass('ui-state-active'), 'Item should be selected');
	assert.ok($items.eq(3).hasClass('ui-state-active'), 'Item should be selected');
	assert.strictEqual(2, selectionChangingFires, 'selectionChanging event should fire');
	assert.strictEqual(2, selectionChangedFires, 'selectionChanged event should fire');

	$.ig.TestUtil.keyInteraction(38, $input); // key up
	$.ig.TestUtil.keyInteraction(38, $input); // key up
	// Workaround for issue where the input is not focused when running tests headless and item separator is not added
	isValueCorrect = $input.val() === 'Mary Johnson, Tom Tomov, ' || $input.val() === 'Mary Johnson, Tom Tomov';
	assert.ok(isValueCorrect, 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "Mary Johnson, Tom Tomov", 'Hidden input value is incorrect');
	assert.strictEqual(1, $combo.igCombo('activeIndex'), 'activ index is not correct');
	assert.ok($items.eq(1).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused by key up');
	assert.ok($items.eq(1).hasClass('ui-state-active'), 'Item should be selected');

	$.ig.TestUtil.keyInteraction(13, $input, "ctrlKey"); // ctrl + enter key
	// Workaround for issue where the input is not focused when running tests headless and item separator is not added
	isValueCorrect = $input.val() === 'Tom Tomov, ' || $input.val() === 'Tom Tomov';
	assert.ok(isValueCorrect, 'Input value is incorrect');
	assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after pressing Ctrl+enter');
	assert.strictEqual($hiddenInput.val(), "Tom Tomov", 'Hidden input value is incorrect');
	assert.notOk($items.eq(1).hasClass('ui-state-active'), 'Item should not be selected');
	assert.ok($items.eq(3).hasClass('ui-state-active'), 'Item should be selected');
	assert.strictEqual(3, selectionChangingFires, 'selectionChanging event should fire');
	assert.strictEqual(3, selectionChangedFires, 'selectionChanged event should fire');

	$combo.igCombo('activeIndex', 0) // Set active index to be first item
	assert.strictEqual(0, $combo.igCombo('activeIndex'), 'activ index is not correct');
	assert.ok($items.eq(0).hasClass('ui-igcombo-item-in-focus'), 'Item should be active');

	$.ig.TestUtil.keyInteraction(13, $input, "ctrlKey"); // ctrl + enter key
	// Workaround for issue where the input is not focused when running tests headless and item separator is not added
	isValueCorrect = $input.val() === 'Tom Tomov, John Smith, ' || $input.val() === 'Tom Tomov, John Smith';
	assert.ok(isValueCorrect, 'Input value is incorrect');
	assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after pressing Ctrl+enter');
	assert.strictEqual($hiddenInput.val(), "Tom Tomov, John Smith", 'Hidden input value is incorrect');
	assert.ok($items.eq(0).hasClass('ui-state-active'), 'Item should be selected');
	assert.ok($items.eq(3).hasClass('ui-state-active'), 'Item should be selected');
	assert.strictEqual(4, selectionChangingFires, 'selectionChanging event should fire');
	assert.strictEqual(4, selectionChangedFires, 'selectionChanged event should fire');

	$.ig.TestUtil.keyInteraction(38, $input, "altKey"); // ctrl + enter key
	// Workaround for issue where the input is not focused when running tests headless and item separator is not added
	isValueCorrect = $input.val() === 'Tom Tomov, John Smith, ' || $input.val() === 'Tom Tomov, John Smith';
	assert.ok(isValueCorrect, 'Input value is incorrect');
	assert.strictEqual(0, $listItemsDiv.height(), 'List items list should not be visible after pressing alt+ key up');
	assert.strictEqual($hiddenInput.val(), "Tom Tomov, John Smith", 'Hidden input value is incorrect');
});

QUnit.test('[ID8] Keyboard navigation multi selection shift key', function (assert) {
	assert.expect(70);

	var $input, $items, $hiddenInput, $listItemsDiv, isValueCorrect,
		$combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-keynavmultishift" });

	$combo.igCombo({
		dataSource: this.dataSource2,
		textKey: 'Name',
		animationShowDuration: 0,
		animationHideDuration: 0,
		multiSelection: { enabled: true }
	});

	$hiddenInput = $combo.find('.ui-igcombo-hidden-field');
	$input = $combo.find('.ui-igcombo-field');

	$.ig.TestUtil.keyInteraction(40, $input, "altKey"); // alt + key down

	$listItemsDiv = $combo.igCombo('dropDown');
	$items = $listItemsDiv.find('li');
	assert.ok($listItemsDiv.height() > 0, 'List items list should  be visible after pressing Alt+key down');

	$.ig.TestUtil.keyDownChar(16, $input); // Press and hold shift key
	$.ig.TestUtil.keyInteraction(40, $input, "shiftKey"); // shift + key down
	$.ig.TestUtil.keyInteraction(40, $input, "shiftKey"); // shift + key down
	$.ig.TestUtil.keyInteraction(40, $input, "shiftKey"); // shift + key down

	assert.ok($items.eq(0).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused by key down');
	assert.ok($items.eq(1).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused by key down');
	assert.ok($items.eq(2).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused by key down');
	assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item should not be selected');
	assert.notOk($items.eq(1).hasClass('ui-state-active'), 'Item should not be selected');
	assert.notOk($items.eq(2).hasClass('ui-state-active'), 'Item should not be selected');
	assert.ok($items.eq(0).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused');
	assert.ok($items.eq(1).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused');
	assert.ok($items.eq(2).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused');
	assert.strictEqual($input.val(), "", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');

	$.ig.TestUtil.keyUpChar(16, $input);
	// Workaround for issue where the input is not focused when running tests headless and item separator is not added
	isValueCorrect = $input.val() === 'John Smith, Mary Johnson, Bob Ferguson, ' || $input.val() === 'John Smith, Mary Johnson, Bob Ferguson';

	assert.ok($items.eq(0).hasClass('ui-state-active'), 'Item should be selected');
	assert.ok($items.eq(1).hasClass('ui-state-active'), 'Item should be selected');
	assert.ok($items.eq(2).hasClass('ui-state-active'), 'Item should be selected');
	assert.ok(isValueCorrect, 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "John Smith, Mary Johnson, Bob Ferguson", 'Hidden input value is incorrect');

	$combo.igCombo('deselectAll') // Deselect all
	assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item should not be selected');
	assert.notOk($items.eq(1).hasClass('ui-state-active'), 'Item should not be selected');
	assert.notOk($items.eq(2).hasClass('ui-state-active'), 'Item should not be selected');
	assert.strictEqual($input.val(), "", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect 1');

	// Go to last position, because deselect all cleared the navigation item
	$.ig.TestUtil.keyInteraction(40, $input); // key down
	$.ig.TestUtil.keyInteraction(40, $input); // key down
	$.ig.TestUtil.keyInteraction(40, $input); // key down

	$.ig.TestUtil.keyDownChar(16, $input); // Press and hold shift key	
	$.ig.TestUtil.keyInteraction(38, $input, "shiftKey"); // shift + key up

	assert.notOk($items.eq(0).hasClass('ui-igcombo-item-in-focus'), 'Item should not be in focused');
	assert.ok($items.eq(1).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused');
	assert.ok($items.eq(2).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused');

	$.ig.TestUtil.keyUpChar(16, $input); // release shift key
	// Workaround for issue where the input is not focused when running tests headless and item separator is not added
	isValueCorrect = $input.val() === 'Mary Johnson, Bob Ferguson, ' || $input.val() === 'Mary Johnson, Bob Ferguson';

	assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item should be selected');
	assert.ok($items.eq(1).hasClass('ui-state-active'), 'Item should be selected');
	assert.ok($items.eq(2).hasClass('ui-state-active'), 'Item should be selected');
	assert.ok(isValueCorrect, 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "Mary Johnson, Bob Ferguson", 'Hidden input value is incorrect');

	$.ig.TestUtil.keyDownChar(16, $input); // Press and hold shift key
	$.ig.TestUtil.keyInteraction(40, $input, "shiftKey"); // shift + key down
	$.ig.TestUtil.keyInteraction(40, $input, "shiftKey"); // shift + key down
	$.ig.TestUtil.keyInteraction(40, $input, "shiftKey"); // shift + key down

	assert.ok($items.eq(1).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused');
	assert.ok($items.eq(2).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused');
	assert.ok($items.eq(3).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused');
	assert.ok($items.eq(4).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused ');

	$.ig.TestUtil.keyInteraction(38, $input, "shiftKey"); // shift + key up
	assert.ok($items.eq(1).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused ');
	assert.ok($items.eq(2).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused');
	assert.ok($items.eq(3).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused ');
	assert.notOk($items.eq(4).hasClass('ui-igcombo-item-in-focus'), 'Item should not be in focused by key up');

	$.ig.TestUtil.keyUpChar(16, $input); // release shift key
	// Workaround for issue where the input is not focused when running tests headless and item separator is not added
	isValueCorrect = $input.val() === 'Mary Johnson, Bob Ferguson, Tom Tomov, ' || $input.val() === 'Mary Johnson, Bob Ferguson, Tom Tomov';

	assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item should not be selected');
	assert.ok($items.eq(1).hasClass('ui-state-active'), 'Item should be selected');
	assert.ok($items.eq(2).hasClass('ui-state-active'), 'Item should be selected');
	assert.ok($items.eq(3).hasClass('ui-state-active'), 'Item should be selected');
	assert.notOk($items.eq(4).hasClass('ui-state-active'), 'Item should not be selected');
	assert.ok(isValueCorrect, 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "Mary Johnson, Bob Ferguson, Tom Tomov", 'Hidden input value is incorrect');

	$item = $items.eq(5);
	$.ig.TestUtil.click($item, { "shiftKey": true }); // Click item holding shift key

	// Workaround for issue where the input is not focused when running tests headless and item separator is not added
	isValueCorrect = $input.val() === 'Mary Johnson, Bob Ferguson, Tom Tomov, Stewerd Matewson, David Bengalski, ' ||
		$input.val() === 'Mary Johnson, Bob Ferguson, Tom Tomov, Stewerd Matewson, David Bengalski';

	assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item should not be selected');
	assert.ok($items.eq(1).hasClass('ui-state-active'), 'Item should not be selected');
	assert.ok($items.eq(2).hasClass('ui-state-active'), 'Item should not be selected');
	assert.ok($items.eq(3).hasClass('ui-state-active'), 'Item should be selected');
	assert.ok($items.eq(4).hasClass('ui-state-active'), 'Item should be selected');
	assert.ok($items.eq(5).hasClass('ui-state-active'), 'Item should be selected');
	assert.ok(isValueCorrect, 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "Mary Johnson, Bob Ferguson, Tom Tomov, Stewerd Matewson, David Bengalski", 'Hidden input value is incorrect');

	$item = $items.eq(4);
	$.ig.TestUtil.click($item, { "ctrlKey": true }); // Click item holding control key
	// Workaround for issue where the input is not focused when running tests headless and item separator is not added and item separator is not added
	isValueCorrect = $input.val() === 'Mary Johnson, Bob Ferguson, Tom Tomov, David Bengalski, ' || $input.val() === 'Mary Johnson, Bob Ferguson, Tom Tomov, David Bengalski';

	assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item should not be selected');
	assert.ok($items.eq(1).hasClass('ui-state-active'), 'Item should not be selected');
	assert.ok($items.eq(2).hasClass('ui-state-active'), 'Item should not be selected');
	assert.ok($items.eq(3).hasClass('ui-state-active'), 'Item should be selected');
	assert.notOk($items.eq(4).hasClass('ui-state-active'), 'Item should be selected');
	assert.ok($items.eq(5).hasClass('ui-state-active'), 'Item should be selected');
	assert.ok(isValueCorrect, 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "Mary Johnson, Bob Ferguson, Tom Tomov, David Bengalski", 'Hidden input value is incorrect');

	$combo.igCombo('clearInput') // Clear input
	assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item should not be selected');
	assert.notOk($items.eq(1).hasClass('ui-state-active'), 'Item should not be selected');
	assert.notOk($items.eq(2).hasClass('ui-state-active'), 'Item should not be selected');
	assert.notOk($items.eq(4).hasClass('ui-state-active'), 'Item should not be selected');
	assert.notOk($items.eq(5).hasClass('ui-state-active'), 'Item should not be selected');
	assert.notOk($items.eq(6).hasClass('ui-state-active'), 'Item should not be selected');
	assert.strictEqual($input.val(), "", 'Input value is incorrect');
	assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect 1');

	$.ig.TestUtil.keyInteraction(38, $input, "altKey"); // alt + key up
	assert.strictEqual(0, $listItemsDiv.height(), 'List items list should not be visible after pressing alt+ key up');
});

QUnit.test('[ID9] Single selection typing in input', function (assert) {
	assert.expect(29);

	var $input, $items, $hiddenInput, $listItemsDiv, $button,
		done = assert.async(),
		$combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-singleseltype" }),
		selectionChangingFires = 0, selectionChangedFires = 0,
		click = $.Event('click');

	$combo.igCombo({
		dataSource: this.dataSource3,
		textKey: 'Name',
		animationShowDuration: 0,
		animationHideDuration: 0,
		delayInputChangeProcessing: 0,
		selectionChanging: function (event, args) { selectionChangingFires++; },
		selectionChanged: function (event, args) { selectionChangedFires++; }
	});

	$hiddenInput = $combo.find('.ui-igcombo-hidden-field');
	$input = $combo.find('.ui-igcombo-field');
	$button = $combo.find('.ui-igcombo-button');

	// 1. Type 'h'
	$.ig.TestUtil.type("h", $input);
	$.ig.TestUtil.wait(100).then(function () {
		// Test 'h'
		$listItemsDiv = $combo.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');
		assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after typing in input');
		assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item should not be selected');
		assert.ok($items.eq(1).hasClass('ui-state-active'), 'Item should be selected');
		assert.strictEqual($input.val(), "h", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "Hana", 'Hidden input value is incorrect');

		$.ig.TestUtil.keyInteraction(38, $input, "altKey"); // alt + key up
		return $.ig.TestUtil.wait(20);
	}).then(function () {
		$listItemsDiv = $combo.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');
		assert.strictEqual(0, $listItemsDiv.height(), 'List items list should not be visible after pressing alt+ key up');
		assert.notOk($items.eq(1).hasClass('ui-state-active'), 'Item should not be selected');
		assert.ok($items.eq(7).hasClass('ui-state-active'), 'Item should be selected');
		assert.strictEqual($input.val(), "Hana", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "Hana", 'Hidden input value is incorrect');

		// 2. Type 'hn'
		$input.focus().select();
		$.ig.TestUtil.type("hn", $input);
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		// Test 'hn'
		$listItemsDiv = $combo.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');
		assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after typing in input');
		assert.strictEqual($input.val(), "hn", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');
		assert.notOk($items.eq(1).hasClass('ui-state-active'), 'Item should not be selected');

		$button.trigger(click); // Close drop down

		$listItemsDiv = $combo.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');
		assert.strictEqual(0, $listItemsDiv.height(), 'List items list should not be visible after pressing alt+ key up');
		assert.notOk($items.eq(1).hasClass('ui-state-active'), 'Item should not be selected');
		assert.notOk($items.eq(7).hasClass('ui-state-active'), 'Item should not be selected');
		assert.strictEqual($input.val(), "", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');

		// 3. Type 'm'
		$input.focus().select();
		$.ig.TestUtil.type("m", $input);
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		// Test 'm'
		$listItemsDiv = $combo.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');
		assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after typing in input');
		assert.notOk($items.eq(1).hasClass('ui-state-active'), 'Item should not be selected');
		assert.ok($items.eq(0).hasClass('ui-state-active'), 'Item should be selected');
		assert.strictEqual($input.val(), "m", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "Mary", 'Hidden input value is incorrect');

		$item = $items.eq(0);
		$.ig.TestUtil.click($item); // Click on selected item
		$listItemsDiv = $combo.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');
		assert.strictEqual(0, $listItemsDiv.height(), 'List items list should not be visible after selecting item');
		assert.ok($items.eq(1).hasClass('ui-state-active'), 'Item should be selected');
		assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item should not be selected');
		assert.strictEqual($input.val(), "Mary", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "Mary", 'Hidden input value is incorrect');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID10] Multi selection typing in input', function (assert) {
	assert.expect(28);

	var $input, $items, $hiddenInput, $listItemsDiv, isValueCorrect,
		done = assert.async(),
		$combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-multiseltype" }),
		selectionChangingFires = 0, selectionChangedFires = 0;

	$combo.igCombo({
		dataSource: this.dataSource3,
		textKey: 'Name',
		animationShowDuration: 0,
		animationHideDuration: 0,
		delayInputChangeProcessing: 0,
		selectionChanging: function (event, args) { selectionChangingFires++; },
		selectionChanged: function (event, args) { selectionChangedFires++; },
		multiSelection: { enabled: true }
	});

	$hiddenInput = $combo.find('.ui-igcombo-hidden-field');
	$input = $combo.find('.ui-igcombo-field');

	// 1. Type 'a'
	$.ig.TestUtil.type("a", $input);
	$.ig.TestUtil.wait(100).then(function () {
		// Test 'a'
		$listItemsDiv = $combo.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');
		assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after typing in input');
		assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item should not be selected');
		assert.notOk($items.eq(1).hasClass('ui-state-active'), 'Item should not be selected');
		assert.notOk($items.eq(2).hasClass('ui-state-active'), 'Item should not be selected');
		assert.notOk($items.eq(0).hasClass('ui-igcombo-item-in-focus'), 'Item should not be focused');
		assert.notOk($items.eq(1).hasClass('ui-igcombo-item-in-focus'), 'Item should not be focused');
		assert.ok($items.eq(2).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused');
		assert.strictEqual($input.val(), "a", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');

		// 2. Type 'a, '
		$input.focus().select();
		$.ig.TestUtil.type("a, ", $input);
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		// Test 'a, '
		$listItemsDiv = $combo.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');

		assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after typing in input');
		// Workaround for issue where the input is not focused when running tests headless and item separator is not added
		isValueCorrect = $input.val() === 'Anna, ' || $input.val() === 'Anna';
		assert.ok(isValueCorrect, 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "Anna", 'Hidden input value is incorrect');
		assert.notOk($items.eq(2).hasClass('ui-state-active'), 'Item should not be selected');
		assert.ok($items.eq(6).hasClass('ui-state-active'), 'Item should be selected');

		// 3. Type 'Anna, h'
		$input.focus().select();
		$.ig.TestUtil.type("Anna, h", $input);
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		// Test 'Anna, h'
		$listItemsDiv = $combo.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');
		assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after typing in input');
		assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item should not be selected');
		assert.notOk($items.eq(1).hasClass('ui-state-active'), 'Item should not be selected');
		assert.notOk($items.eq(0).hasClass('ui-igcombo-item-in-focus'), 'Item should not be focused');
		assert.ok($items.eq(1).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused');
		assert.strictEqual($input.val(), "Anna, h", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "Anna", 'Hidden input value is incorrect');
		
		$.ig.TestUtil.keyInteraction(13, $input); // press enter key
		$listItemsDiv = $combo.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');

		// Workaround for issue where the input is not focused when running tests headless and item separator is not added
		isValueCorrect = $input.val() === 'Anna, Hana, ' || $input.val() === 'Anna, Hana';
		assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after press enter key');
		assert.ok($items.eq(6).hasClass('ui-state-active'), 'Item should be selected');
		assert.ok($items.eq(7).hasClass('ui-state-active'), 'Item should be selected');
		assert.ok(isValueCorrect, 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "Anna, Hana", 'Hidden input value is incorrect');

		//emulateKeyBoard("up", false, false, true, $input); // alt + key up
		$.ig.TestUtil.keyInteraction(38, $input, "altKey"); // alt + key up
		// Workaround for issue where the input is not focused when running tests headless and item separator is not added
		isValueCorrect = $input.val() === 'Anna, Hana, ' || $input.val() === 'Anna, Hana';
		assert.ok(isValueCorrect, 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "Anna, Hana", 'Hidden input value is incorrect');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID11] Single selection typing in input autoSelectFirstMatch false', function (assert) {
	assert.expect(28);

	var $input, $items, $hiddenInput, $listItemsDiv,
		done = assert.async(),
		$combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-singleseltypeasfmfalse" }),
		selectionChangingFires = 0, selectionChangedFires = 0,
		click = $.Event('click');

	$combo.igCombo({
		dataSource: this.dataSource3,
		textKey: 'Name',
		animationShowDuration: 0,
		animationHideDuration: 0,
		delayInputChangeProcessing: 0,
		autoSelectFirstMatch: false,
		selectionChanging: function (event, args) { selectionChangingFires++; },
		selectionChanged: function (event, args) { selectionChangedFires++; }
	});

	$hiddenInput = $combo.find('.ui-igcombo-hidden-field');
	$input = $combo.find('.ui-igcombo-field');
	$listItemsDiv = $combo.igCombo('dropDown');
	$button = $combo.find('.ui-igcombo-button');

	// 1. Type 'h'
	$.ig.TestUtil.type("h", $input);

	$.ig.TestUtil.wait(100).then(function () {
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');
		assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after typing in input');
		assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item should not be selected');
		assert.notOk($items.eq(1).hasClass('ui-state-active'), 'Item should be selected');
		assert.strictEqual($input.val(), "h", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');

		$.ig.TestUtil.keyInteraction(38, $input, "altKey"); // alt + key up
		$listItemsDiv = $combo.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');
		assert.strictEqual(0, $listItemsDiv.height(), 'List items list should not be visible after pressing alt+ key up');
		assert.notOk($items.eq(1).hasClass('ui-state-active'), 'Item should not be selected');
		assert.notOk($items.eq(7).hasClass('ui-state-active'), 'Item should not be selected');
		assert.strictEqual($input.val(), "", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');

		// 2. Type 'hana'
		$input.focus().select();
		$.ig.TestUtil.type("hana", $input);
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		$listItemsDiv = $combo.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');

		assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after typing in input');
		assert.strictEqual($input.val(), "hana", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "Hana", 'Hidden input value is incorrect');
		assert.ok($items.eq(0).hasClass('ui-state-active'), 'Item should be selected');

		$button.trigger(click); // Close drop down

		$listItemsDiv = $combo.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');
		assert.strictEqual(0, $listItemsDiv.height(), 'List items list should not be visible');
		assert.notOk($items.eq(1).hasClass('ui-state-active'), 'Item should not be selected');
		assert.ok($items.eq(7).hasClass('ui-state-active'), 'Item should be selected');
		assert.strictEqual($input.val(), "Hana", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "Hana", 'Hidden input value is incorrect');

		// 3. Type 'm'
		$input.focus().select();
		$.ig.TestUtil.type("m", $input);
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		$listItemsDiv = $combo.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');
		assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after typing in input');
		assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item should be selected');
		assert.strictEqual($input.val(), "m", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');

		$item = $items.eq(0);
		$.ig.TestUtil.click($item); // Click on selected item

		$listItemsDiv = $combo.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');
		assert.strictEqual(0, $listItemsDiv.height(), 'List items list should not be visible after selecting item');
		assert.ok($items.eq(1).hasClass('ui-state-active'), 'Item should be selected');
		assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item should not be selected');
		assert.strictEqual($input.val(), "Mary", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "Mary", 'Hidden input value is incorrect');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID12] Multi selection typing in input autoSelectFirstMatch false', function (assert) {
	assert.expect(24);

	var $input, $items, $hiddenInput, $listItemsDiv, isValueCorrect,
		done = assert.async(),
		$combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-multiseltypeasfmfalse" }),
		selectionChangingFires = 0, selectionChangedFires = 0;

	$combo.igCombo({
		dataSource: this.dataSource3,
		textKey: 'Name',
		animationShowDuration: 0,
		animationHideDuration: 0,
		delayInputChangeProcessing: 0,
		selectionChanging: function (event, args) { selectionChangingFires++; },
		selectionChanged: function (event, args) { selectionChangedFires++; },
		multiSelection: { enabled: true },
		autoSelectFirstMatch: false
	});

	$hiddenInput = $combo.find('.ui-igcombo-hidden-field');
	$input = $combo.find('.ui-igcombo-field');
	$listItemsDiv = $combo.igCombo('dropDown');

	$.ig.TestUtil.type("a", $input);
	$.ig.TestUtil.wait(100).then(function () {
		$items = $combo.igCombo('dropDown').find('li').not('.ui-helper-hidden');
		assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after typing in input');
		assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item should not be selected');
		assert.notOk($items.eq(1).hasClass('ui-state-active'), 'Item should not be selected');
		assert.notOk($items.eq(2).hasClass('ui-state-active'), 'Item should be selected');
		assert.strictEqual($input.val(), "a", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');
		
		$input.focus().select();
		$.ig.TestUtil.type("anna", $input);
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		$items = $combo.igCombo('dropDown').find('li').not('.ui-helper-hidden');
		assert.ok($items.eq(0).hasClass('ui-igcombo-item-in-focus'), 'Item should be focused');
		assert.strictEqual($input.val(), "anna", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "", 'Hidden input value is incorrect');

		$input.focus().select();
		$.ig.TestUtil.type("anna, ", $input);
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		$items = $combo.igCombo('dropDown').find('li').not('.ui-helper-hidden');
		// Workaround for issue where the input is not focused when running tests headless and item separator is not added
		isValueCorrect = $input.val() === 'Anna, ' || $input.val() === 'Anna';
		assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after typing in input');
		assert.ok(isValueCorrect, 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "Anna", 'Hidden input value is incorrect');
		assert.notOk($items.eq(2).hasClass('ui-state-active'), 'Item should not be selected');
		assert.ok($items.eq(6).hasClass('ui-state-active'), 'Item should be selected');
		
		$input.focus().select();
		$.ig.TestUtil.type("Anna, h", $input);
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		$items = $combo.igCombo('dropDown').find('li').not('.ui-helper-hidden');
		assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after typing in input');
		assert.notOk($items.eq(0).hasClass('ui-state-active'), 'Item should not be selected');
		assert.notOk($items.eq(1).hasClass('ui-state-active'), 'Item should be selected');
		assert.strictEqual($input.val(), "Anna, h", 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "Anna", 'Hidden input value is incorrect');

		$.ig.TestUtil.keyInteraction(38, $input, "altKey"); // alt + key up
		assert.strictEqual(0, $listItemsDiv.height(), 'List items list should not be visible after pressing alt+ key up');
		$items = $combo.igCombo('dropDown').find('li').not('.ui-helper-hidden');

		// Workaround for issue where the input is not focused when running tests headless and item separator is not added
		isValueCorrect = $input.val() === 'Anna, ' || $input.val() === 'Anna';
		assert.ok($items.eq(6).hasClass('ui-state-active'), 'Item should be selected');
		assert.notOk($items.eq(7).hasClass('ui-state-active'), 'Item should be selected');
		assert.ok(isValueCorrect, 'Input value is incorrect');
		assert.strictEqual($hiddenInput.val(), "Anna", 'Hidden input value is incorrect');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID13] Multiple selection on <select multiple> element', function (assert) {
	assert.expect(1);

	var multiSelection, multiSelectionEnabledValue = false,
		$comboWrapper = $.ig.TestUtil.appendToFixture('<select id="combo-multiple-attribute" multiple></select>');

	$comboWrapper.igCombo({
		dataSource: this.dataSource4,
		textKey: 'Name',
		valueKey: 'ID'
	});

	multiSelection = $comboWrapper.igCombo('option', 'multiSelection');
	multiSelectionEnabledValue = multiSelection.enabled;
	assert.ok(multiSelectionEnabledValue, 'Multiple selection was not enabled.');
});

QUnit.test('[ID14] Disable multiple selection from option on <select multiple> element', function (assert) {
	assert.expect(1);

	var multiSelection, multiSelectionEnabledValue = false,
		$comboWrapper = $.ig.TestUtil.appendToFixture('<select id="combo-multiple-single-selection" multiple></select>');

	$comboWrapper.igCombo({
		dataSource: this.dataSource4,
		textKey: 'Name',
		valueKey: 'ID',
		multiSelection: {
			enabled: false
		}
	});

	multiSelection = $comboWrapper.igCombo('option', 'multiSelection');
	multiSelectionEnabledValue = multiSelection.enabled;
	assert.notOk(multiSelectionEnabledValue, 'Multiple selection was not disabled.');
});

QUnit.test('[ID15] Enable multiple selection from option on <select multiple> element', function (assert) {
	assert.expect(1);

	var multiSelection, multiSelectionEnabledValue = false,
		$comboWrapper = $.ig.TestUtil.appendToFixture('<select id="combo-multiple-multi-selection" multiple></select>');
	$comboWrapper.igCombo({
		dataSource: this.dataSource4,
		textKey: 'Name',
		valueKey: 'ID',
		multiSelection: {
			enabled: true
		}
	});

	multiSelection = $comboWrapper.igCombo('option', 'multiSelection');
	multiSelectionEnabledValue = multiSelection.enabled;
	assert.ok(multiSelectionEnabledValue, 'Multiple selection was not enabled.');
});

QUnit.test('[ID16] Keyboard interacting', function (assert) {
	assert.expect(2);

	var data, selectedItem, $input,
		done = assert.async(),
		$combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "keyboard-interactions" });

	$combo.igCombo({
		dataSource: this.dataSource5,
		valueKey: "ID",
		textKey: 'ProductName',
		mode: "dropdown",
		width: 200,
		height: 30,
		allowCustomValues: true,
		autoSelectFirstMatch: true,
		multiSelection: {
			enabled: false,
		},
		initialSelectedItems: []
	});

	$input = $combo.igCombo("textInput");
	$.ig.TestUtil.keyInteraction(77, $input);
	selectedItem = $combo.igCombo("selectedItems")[0];
	assert.equal(selectedItem.data[$combo.igCombo("option", "textKey")], "Mishi Kobe Niku", "Correct item is selected");
	$combo.igCombo("option", "multiSelection", { enabled: true });

	$.ig.TestUtil.wait(1100).then(function () {
		$.ig.TestUtil.keyInteraction(67, $input);
		assert.ok($($combo.igCombo('dropDown').find("li")[0]).hasClass("ui-igcombo-item-in-focus"), "The auto completed item is highlighted with css class 'ui-igcombo-item-in-focus'");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID17] SuppressKeyboard interaction', function (assert) {
	assert.expect(9);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "suppressKeyboard" }),
		$input, $dropDownButton;

	// Emulate touch environment
	var _oldIsTouch = $.ig.util.isTouchDevice;
	$.ig.util.isTouchDevice = function () { return true; };

	$combo.igCombo({
		animationShowDuration: 0,
		animationHideDuration: 0,
		width: "270px",
		dataSource: [
			{ 'ID': 1 },
			{ 'ID': 2 },
			{ 'ID': 3 }
		],
		suppressKeyboard: true,
		virtualization: true
	});

	$input = $combo.data().igCombo._options.$input;
	$dropDownButton = $combo.data().igCombo._options.$dropDownBtnCont;

	$dropDownButton.click();
	assert.equal($combo.igCombo("dropDownOpened"), true, "Combo drop down should be rendered");
	assert.notEqual(document.activeElement, $input[0], "Combo input should not be focused [suppressKeyboard = false]");

	$dropDownButton.click();
	assert.equal($combo.igCombo("dropDownOpened"), false, "Combo drop down should be hidden");
	assert.notEqual(document.activeElement, $input[0], "Combo input still should not be focused [suppressKeyboard = false]");

	$combo.igCombo("option", "suppressKeyboard", false);
	assert.equal($combo.igCombo("option", "suppressKeyboard"), false, "suppressKeyboard successfully changed");

	$dropDownButton.click();
	assert.equal($combo.igCombo("dropDownOpened"), true, "Combo drop down should be rendered");
	assert.equal(document.activeElement, $input[0], "Combo input should be focused [suppressKeyboard = true]");

	$dropDownButton.click();
	assert.equal($combo.igCombo("dropDownOpened"), false, "Combo drop down should be hidden");
	assert.equal(document.activeElement, $input[0], "Combo input still should be focused [suppressKeyboard = true]");

	$.ig.util.isTouchDevice = _oldIsTouch;
});

QUnit.test('[ID18] SuppressKeyboard multiselect', function (assert) {
	assert.expect(12);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "suppressKeyboardMultiSelect" }),
		$input, $dropDownButton, listItems;

	// Emulate touch environment
	var _oldIsTouch = $.ig.util.isTouchDevice;
	$.ig.util.isTouchDevice = function () { return true; };

	$combo.igCombo({
		animationShowDuration: 0,
		animationHideDuration: 0,
		width: "270px",
		dataSource: this.dataSource6,
		valueKey: "ID",
		textKey: "Name",
		multiSelection: {
			enabled: true
		},
		suppressKeyboard: true,
		virtualization: true
	});

	$input = $combo.data().igCombo._options.$input;
	$dropDownButton = $combo.data().igCombo._options.$dropDownBtnCont;

	var items = $combo.igCombo('items');

	$dropDownButton.click();
	assert.equal($combo.igCombo("dropDownOpened"), true, "Combo drop down should be rendered");
	assert.notEqual(document.activeElement, $input[0], "Combo input should not be focused [suppressKeyboard = true]");
	$.ig.TestUtil.click(items[0].element);

	assert.equal($combo.igCombo('activeIndex'), 0, 'Selected item matches');
	assert.notEqual(document.activeElement, $input[0], 'Combo input is not focused');

	$.ig.TestUtil.click(items[1].element);

	assert.equal($combo.igCombo('activeIndex'), 1, 'Selected item matches');
	assert.notEqual(document.activeElement, $input[0], 'Combo input is still not focused');

	$.ig.TestUtil.click(items[0].element);
	$.ig.TestUtil.click(items[1].element);
	assert.equal($combo.igCombo('activeIndex'), -1);
	assert.notEqual(document.activeElement, $input[0], 'Combo input is still not focused');

	$.ig.TestUtil.click($input);
	assert.equal(document.activeElement, $input[0], 'Combo input is focused');

	$dropDownButton.click();

	$combo.igCombo('option', 'suppressKeyboard', false);
	$combo.igCombo('clearInput');

	$dropDownButton.click();
	assert.equal(document.activeElement, $input[0], "Combo input should be focused [suppressKeyboard = false]");

	$.ig.TestUtil.click(items[0].element);

	assert.equal($combo.igCombo('activeIndex'), 0, 'Selected item matches');
	assert.equal(document.activeElement, $input[0], 'Combo input is focused');

	$.ig.util.isTouchDevice = _oldIsTouch;
});

QUnit.test('[ID19] Keypress empty selection dropdown combo', function (assert) {
	assert.expect(4);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "dropdowninputpress" }),
		$input;

	$combo.igCombo({
		animationShowDuration: 0,
		animationHideDuration: 0,
		delayInputChangeProcessing: 0,
		dataSource: [
			{ "ID": 1, "Name": "John Smith", "Age": 45 },
			{ "ID": 6, "Name": "John Ricks", "Age": 45 },
			{ "ID": 2, "Name": "Mary Johnson", "Age": 32 },
			{ "ID": 3, "Name": "Bob Ferguson", "Age": 27 },
			{ "ID": 4, "Name": "Jane Smith", "Age": 22 },
			{ "ID": 5, "Name": "Johnatan Doe", "Age": 45 },
		],
		valueKey: "ID",
		textKey: "Name",
		mode: "dropdown",
		itemsRendered: function (evt, ui) {
			ui.owner.deselectByIndex(0);
		}
	});

	$input = $combo.data().igCombo._options.$input;

	$input.focus();
	$.ig.TestUtil.keyInteraction(106, $input);
	assert.equal($combo.igCombo('selectedItems')[0].data.Name, 'John Smith', 'Selected item matches');
	$.ig.TestUtil.keyInteraction(106, $input);
	assert.equal($combo.igCombo('selectedItems')[0].data.Name, 'John Ricks', 'Selected item matches');
	$.ig.TestUtil.keyInteraction(106, $input);
	assert.equal($combo.igCombo('selectedItems')[0].data.Name, 'Jane Smith', 'Selected item matches');
	$.ig.TestUtil.keyInteraction(106, $input);
	assert.equal($combo.igCombo('selectedItems')[0].data.Name, 'Johnatan Doe', 'Selected item matches');
});

// Bug #190262
QUnit.test('[ID20] When selection is single and press enter the list should be closed', function (assert) {
	assert.expect(1);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-bug-190262" }),
		done = assert.async(),
		data, $input, $listItems;
	$combo.igCombo({
		dataSource: this.dataSource7,
		textKey: 'Name',
		valueKey: 'ID',
	});

	$listItems = $combo.igCombo("dropDown").find('.ui-igcombo-listitem');
	$input = $combo.igCombo("textInput");
	$input.focus();
	$.ig.TestUtil.keyInteraction(40, $input);
	$.ig.TestUtil.keyInteraction(40, $input);
	$.ig.TestUtil.keyInteraction(13, $input);
	$.ig.TestUtil.wait(200).then(function () {
		assert.notOk($combo.igCombo("dropDownOpened"), "Combo drop down should be closed");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

// Bug #236423
QUnit.test('[ID21] The editor text changes even if selectionChanging event is canceled when allowCustomValue is set to true', function (assert) {
	assert.expect(7);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-bug-236423" }),
		data, $input, $listItems,
		evtCanceled = false, evtDone = false;

	data = ["test", "test1", "test2"];

	$combo.igCombo({
		animationShowDuration: 0,
		animationHideDuration: 0,
		dataSource: data,
		itemTemplate: '<span>${value}</span>',
		autoSelectFirstMatch: false,
		allowCustomValue: true,
		filteringType: "none",
		selectionChanging: function (evt, ui) {
			if (ui.items.length <= 0 || ui.items[0].data.text == "test") {
				evtDone = true;
				return true;
			}
			evtCanceled = true;
			return false;
		},
	});

	$input = $combo.igCombo("textInput");
	$listItems = $combo.igCombo("dropDown").find(".ui-igcombo-listitem");

	$input.focus();
	$.ig.TestUtil.type('w', $input); // 'w' key

	$combo.igCombo("refreshValue");
	assert.equal($combo.igCombo("valueInput").val(), "w", "Custom Value is set");

	$combo.igCombo("openDropDown");
	$.ig.TestUtil.click($($listItems[1]));

	assert.ok(evtCanceled, "Selection event was canceled");
	assert.equal($input.val(), "w", "Input text not changed");
	assert.equal($combo.igCombo("value"), "w", "Value was not changed");

	$.ig.TestUtil.click($($listItems[0]));

	assert.ok(evtDone, "Selection event was handled");
	assert.equal($input.val(), "test", "Input text changed to reflect selection");
	assert.equal($combo.igCombo("value"), "test", "Value was changed to reflect selection");
});

