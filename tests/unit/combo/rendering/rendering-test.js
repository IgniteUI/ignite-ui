QUnit.module("igCombo rendering unit tests", {
	divTag: '<div></div>',
	inputTag: '<input></input>',
	assert: null,
	before: function () {
		$("html").css("font-size", "16px");
		$("html").css("line-height", "1.2");
	},
	getClassesCount: function ($elem) {
		var classAttr = $elem.attr('class');

		return classAttr ? (classAttr.split(' ')).length : 0;
	},
	testElementRendering: function ($elem, elName, elType, width, height, top, left, childrenLen, classes, attributes, tolerance) {
		var curClass, i,
			clasesLen = classes ? classes.length : 0,
			attrLen = attributes ? attributes.length : 0,
			elOffset = $elem.offset();

		this.assert.strictEqual($elem.length, 1, elName + ' was not rendered');
		this.assert.ok($elem.is(elType), elName + ' should be div element');

		// Adding tolerance for inconsistencies between the running engine and real browsers
		if (tolerance && tolerance.width && tolerance.height) {
			this.assert.ok(width - tolerance.width <= $elem.outerWidth() && width + tolerance.width >= $elem.outerWidth(),
				`${elName} width is not correct: ${$elem.outerWidth()}, exp: ${width}`);
			this.assert.ok(height - tolerance.height <= $elem.outerHeight() && height + tolerance.height >= $elem.outerHeight(),
				`${elName} height is not correct: ${$elem.outerHeight()}, exp: ${height}`);
		} else {
			this.assert.strictEqual($elem.outerWidth(), width, elName + ' width is not correct');
			this.assert.strictEqual($elem.outerHeight(), height, elName + ' height is not correct');
		}

		this.assert.strictEqual(this.getClassesCount($elem), clasesLen, elName + ' has incorrect classes count');

		for (i = 0; i < clasesLen; i++) {
			curClass = classes[i];
			this.assert.ok($elem.hasClass(curClass), 'Class ' + curClass + ' was not applied to ' + elName);
		}

		for (i = 0; i < attrLen; i++) {
			curAttr = attributes[i];
			this.assert.strictEqual($elem.attr(curAttr.key), curAttr.value, 'The value of ' + curAttr.key + ' attribute should be ' + curAttr.value);
		}

		if (top !== null) {
			this.assert.strictEqual(elOffset.top, top, elName + ' top position was incorrect');
		}

		if (left !== null) {
			this.assert.strictEqual(elOffset.left, left, elName + ' left position was incorrect');
		}

		this.assert.strictEqual($elem.children().length, childrenLen, elName + ' has incorrect number of child elements');
	},
	testComboRendering: function ($comboWrapper, width, height, itemsCount, comboExpElem, itemsText) {
		var $parent = $comboWrapper.parent(),
			$combo = $comboWrapper.children('.ui-igcombo'),
			$txtBoxChildren = $combo.children(),
			$ddBtn = $txtBoxChildren.filter('.ui-igcombo-button'),
			$ddIcon = $ddBtn.children('.ui-igcombo-buttonicon'),
			$clearBtn = $txtBoxChildren.filter('.ui-igcombo-clear'),
			$clearIcon = $clearBtn.children('.ui-igcombo-clearicon'),
			$textFieldCont = $txtBoxChildren.filter('.ui-igcombo-fieldholder'),
			$textFieldInput = $textFieldCont.children('.ui-igcombo-field'),
			$hiddenInput = $txtBoxChildren.filter('input'),
			$dropDown = $comboWrapper.children('.ui-igcombo-dropdown'),
			$dropDownListCont = $dropDown.children('.ui-igcombo-list'),
			$dropDownList = $dropDownListCont.children('.ui-igcombo-listitemholder'),
			$listItems = $dropDownList.children(),
			border = 1,
			comboWrapperExpWidth = comboExpWidth = width,
			comboWrapperExpHeight = comboExpHeight = height,
			comboWrapperExpPosTop = comboExpPosTop = $parent.offset().top,
			comboWrapperExpPosLeft = comboExpPosLeft = $parent.offset().left,
			comboOffset = $comboWrapper.offset(),
			ddIconExpWidth = 16,
			ddIconExpHeight = 16,
			ddBtnPadding = 5,
			ddBtnExpWidth = ddIconExpWidth + border + 2 * ddBtnPadding,
			ddBtnExpHeight = comboExpHeight - 2 * border,
			ddBtnExpPosTop = comboWrapperExpPosTop + border,
			ddBtnExpPosLeft = comboExpWidth + comboOffset.left - border - ddBtnExpWidth,
			ddIconExpPosTop = (ddBtnExpHeight - ddIconExpHeight) / 2 + $ddBtn.offset().top,
			ddIconExpPosLeft = ddBtnExpPosLeft + border + ddBtnPadding,
			clearIconExpWidth = 16,
			clearIconExpHeight = 16,
			clearBtnExpWidth = clearIconExpWidth,
			clearBtnExpHeight = comboExpHeight - 2 * border,
			clearBtnExpPosTop = comboWrapperExpPosTop + border,
			clearBtnExpPosLeft = ddBtnExpPosLeft - clearBtnExpWidth,
			clearIconExpPosTop = (clearBtnExpHeight - clearIconExpHeight) / 2 + $clearBtn.offset().top,
			clearIconExpPosLeft = clearBtnExpPosLeft,
			textFieldContExpWidth = comboExpWidth - 2 * border - ddBtnExpWidth,
			textFieldContExpHeight = comboExpHeight - 2 * border,
			textFieldContExpPosTop = comboWrapperExpPosTop + border,
			textFieldContExpPosLeft = comboWrapperExpPosLeft + border,
			textFieldInputExpWidth = textFieldContExpWidth,
			textFieldInputExpHeight = textFieldContExpHeight,
			textFieldInputExpPosTop = textFieldContExpPosTop,
			textFieldInputExpPosLeft = textFieldContExpPosLeft,
			listItemExpHeight = 29,
			dropDownExpWidth = comboExpWidth,
			dropDownExpHeight = itemsCount * listItemExpHeight + border,
			dropDownExpPosTop = comboOffset.top + comboExpHeight,
			dropDownExpPosLeft = comboOffset.left,
			dropDownListContExpWidth = dropDownExpWidth - 2 * border,
			dropDownListContExpHeight = dropDownExpHeight - border,
			dropDownListContExpPosTop = dropDownExpPosTop,
			dropDownListContExpPosLeft = dropDownExpPosLeft + border,
			dropDownListExpWidth = dropDownListContExpWidth,
			dropDownListExpHeight = dropDownListContExpHeight,
			dropDownListExpPosTop = dropDownListContExpPosTop,
			dropDownListExpPosLeft = dropDownListContExpPosLeft,
			listItemExpWidth = dropDownListContExpWidth,
			listItemExpPosTop = dropDownListContExpPosTop,
			listItemExpPosLeft = dropDownListContExpPosLeft,
			i, $curItem;

		// Combo wrapper
		this.testElementRendering($comboWrapper, 'combo wrapper', comboExpElem, comboWrapperExpWidth, comboWrapperExpHeight,
			comboWrapperExpPosTop, comboWrapperExpPosLeft, 2, ['ui-igcombo-wrapper']);

		// Combo
		this.testElementRendering($combo, 'combo', 'div', comboExpWidth, comboExpHeight, comboExpPosTop,
			comboExpPosLeft, 4, ['ui-igcombo', 'ui-widget', 'ui-state-default', 'ui-corner-all', 'ui-state-active', 'ui-unselectable']);

		// Drop down button
		this.testElementRendering($ddBtn, 'drop down button', 'div', ddBtnExpWidth, ddBtnExpHeight, ddBtnExpPosTop, ddBtnExpPosLeft, 1,
			['ui-igcombo-button', 'ui-state-default', 'ui-unselectable', 'ui-igcombo-button-ltr', 'ui-corner-right']);

		// Drop down icon
		this.testElementRendering($ddIcon, 'drop down icon', 'div', ddIconExpWidth, ddIconExpHeight,
			ddIconExpPosTop, ddIconExpPosLeft, 0, ['ui-igcombo-buttonicon', 'ui-icon-triangle-1-s', 'ui-icon']);

		// Text field
		this.testElementRendering($textFieldCont, 'text field container', 'div', textFieldContExpWidth, textFieldContExpHeight,
			textFieldContExpPosTop, textFieldContExpPosLeft, 1, ['ui-igcombo-fieldholder', 'ui-igcombo-fieldholder-ltr', 'ui-corner-left']);

		// Text field input
		this.testElementRendering($textFieldInput, 'text field input', 'input', textFieldInputExpWidth, textFieldInputExpHeight,
			textFieldInputExpPosTop, textFieldInputExpPosLeft, 0, ['ui-igcombo-field', 'ui-corner-all']);

		// Hidden input
		this.testElementRendering($hiddenInput, 'hidden field', 'input', 0, 0, null, null, 0, ['ui-igcombo-hidden-field'], [{ key: 'type', value: 'hidden' }]);

		// Drop down
		// Adding tolerance for inconsistencies between the running engine and real browsers
		this.testElementRendering($dropDown, 'drop down', 'div', dropDownExpWidth, dropDownExpHeight, dropDownExpPosTop,
			dropDownExpPosLeft, 1, ['ui-igcombo-dropdown', 'ui-widget-content', 'ui-widget', 'ui-corner-all', 'ui-igcombo-orientation-bottom'], null, { width: border * 2, height: 8 });

		// Drop down list cont
		// Adding tolerance for inconsistencies between the running engine and real browsers
		this.testElementRendering($dropDownListCont, 'drop down list container', 'div', dropDownListContExpWidth, dropDownListContExpHeight, dropDownListContExpPosTop,
			dropDownListContExpPosLeft, 1, ['ui-igcombo-list'], null, { width: border * 2, height: 8 });

		// Drop down <ul> list
		// Removing this test because of differences between real browser vs the test engine
		//testElementRendering($dropDownList, 'drop down list', 'ul', dropDownListExpWidth, dropDownListExpHeight, dropDownListExpPosTop, dropDownListExpPosLeft, itemsCount, ['ui-igcombo-listitemholder']);
		this.assert.ok($dropDownList.hasClass('ui-igcombo-listitemholder'), 'Class ui-igcombo-listitemholder was not applied to ul');

		// List items
		for (i = 0; i < $listItems.length; i++) {
			$curItem = $listItems.eq(i);
			// Removing this test because of differences between real browser vs the test engine
			//testElementRendering($curItem, 'list item ' + i, 'li', listItemExpWidth, listItemExpHeight, listItemExpPosTop + i * listItemExpHeight, listItemExpPosLeft, 0, ['ui-igcombo-listitem', 'ui-state-default', 'ui-unselectable']);

			this.assert.ok($curItem.hasClass('ui-igcombo-listitem'), 'Class ui-igcombo-listitem was not applied to list item ' + i);
			this.assert.ok($curItem.hasClass('ui-state-default'), 'Class ui-state-default was not applied to list item ' + i);
			this.assert.ok($curItem.hasClass('ui-unselectable'), 'Class ui-unselectable was not applied to list item ' + i);
			this.assert.strictEqual($curItem.text(), itemsText[i], 'Text value of item ' + i + 'did not match');
		}
	}
});


QUnit.test('[ID1] igCombo existence', function (assert) {
	assert.expect(1);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-div" }),
		combo = $('#combo-div').igCombo;

	assert.ok($.type(combo) === 'function', 'igCombo is not defined.');
});

QUnit.test('[ID2] igCombo div rendering', function (assert) {
	assert.expect(107);

	var $comboWrapper = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-div" }),
		width = 200,
		height = 30,
		itemsCount = 2,
		comboElem = 'div',
		itemsText = ['Tom', 'Jerry'];

	$comboWrapper
		.igCombo({
			width: width,
			height: height,
			animationShowDuration: 0,
			dropDownAttachedToBody: false,
			valueKey: 'id',
			textKey: 'name',
			dropDownOrientation: 'bottom',
			dataSource: [{
				id: '1',
				name: 'Tom'
			}, {
				id: '2',
				name: 'Jerry'
			}]
		})
		.igCombo('openDropDown');

	this.assert = assert;
	this.testComboRendering($comboWrapper, width, height, itemsCount, comboElem, itemsText);
});

QUnit.test('[ID3] igCombo span rendering', function (assert) {
	assert.expect(111);

	$.ig.TestUtil.appendToFixture('<div class="cont"><span id=\'combo-span\'></span></div>');
	var $comboWrapper = $('#combo-span'),
		width = 166,
		height = 32,
		itemsCount = 3,
		comboElem = 'span',
		itemsText = ['Tom', 'Jerry', 'Spiky'];

	$comboWrapper
		.igCombo({
			width: width,
			height: height,
			valueKey: 'id',
			textKey: 'name',
			animationShowDuration: 0,
			dropDownAttachedToBody: false,
			dropDownOrientation: 'bottom',
			dataSource: [{
				id: '1',
				name: 'Tom'
			}, {
				id: '2',
				name: 'Jerry'
			}, {
				id: '3',
				name: 'Spiky'
			}]
		})
		.igCombo('openDropDown');

	this.assert = assert;
	this.testComboRendering($comboWrapper, width, height, itemsCount, comboElem, itemsText);
});

QUnit.test('[ID4] igCombo input rendering', function (assert) {
	assert.expect(119);

	$.ig.TestUtil.appendToFixture('<div class="cont render_input"><input id=\'combo-input\' name="input-combo" /></div>');
	var $comboElement = $('#combo-input'),
		$hiddenInput,
		width = 333,
		height = 40,
		itemsCount = 4,
		comboElem = 'div',
		itemsText = ['Tom', 'Jerry', 'Spiky', 'Bendji'];

	$comboElement
		.igCombo({
			width: width,
			height: height,
			valueKey: 'id',
			textKey: 'name',
			animationShowDuration: 0,
			dropDownAttachedToBody: false,
			dropDownOrientation: 'bottom',
			dataSource: [{
				id: '1',
				name: 'Tom'
			}, {
				id: '2',
				name: 'Jerry'
			}, {
				id: '3',
				name: 'Spiky'
			}, {
				id: '4',
				name: 'Bendji'
			}]
		})
		.igCombo('openDropDown');

	$comboWrapper = $('.render_input').find('.ui-igcombo-wrapper');
	$hiddenInput = $(".render_input input.ui-igcombo-hidden-field");
	this.assert = assert;

	assert.equal($hiddenInput.attr("name"), "input-combo", "The name attribute was not transferred to the hidden input");
	this.testComboRendering($comboWrapper, width, height, itemsCount, comboElem, itemsText);

	$comboElement.igCombo("destroy");
	assert.equal($comboElement.closest(".igcombo-wrapper").length, 0, "The combo wrapper was not removed.");
	assert.equal($comboElement.attr("name"), "input-combo", "The input name was not moved back to the input element after destroy.");
	assert.equal($._data($comboElement[0], "events"), undefined, "The input events were not removed after destroy.");
});

QUnit.test('[ID5] igCombo select rendering', function (assert) {
	assert.expect(114);

	this.assert = assert;

	$.ig.TestUtil.appendToFixture('<div class="cont render_select"><select id="combo-select" name="select-combo"><option value="1">John Smith</option><option value="2">Mary Johnson</option><option value="3">Bob Ferguson</option></select></div>');
	var $comboInitElem = $('#combo-select'),
		done = assert.async(),
		self = this,
		$comboWrapper,
		$hiddenInput,
		width = 200, // default
		height = 32, // default
		itemsCount = 3,
		comboElem = 'div',
		itemsText = ['John Smith', 'Mary Johnson', 'Bob Ferguson'];

	$comboInitElem
		.igCombo({
			animationShowDuration: 0,
			dropDownAttachedToBody: false,
			dropDownOrientation: 'bottom'
		})
		.igCombo('openDropDown');

	$.ig.TestUtil.wait(50).then(function () {
		$comboInitElem.igCombo('deselect');
		$comboWrapper = $('.render_select div.ui-igcombo-wrapper');
		$hiddenInput = $('.render_select input.ui-igcombo-hidden-field');
		self.testComboRendering($comboWrapper, width, height, itemsCount, comboElem, itemsText);
		assert.equal($hiddenInput.attr("name"), "select-combo", "The name attribute was not transferred to the input element");
		$comboInitElem.igCombo("destroy");
		assert.equal($comboInitElem.closest(".igcombo-wrapper").length, 0, "The combo wrapper was not removed.");
		assert.equal($comboInitElem.attr("name"), "select-combo", "The input name was not moved back to the select element after destroy.");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID6] igCombo highlight tests', function (assert) {
	assert.expect(15);

	var $comboElem = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-highlight" }),
		combo, $listItems, $highlightedItems,
		inputText = "john",
		inputTextWithRegex = "jo.*",
		inputEmptyText = "",
		inputTexts = ["bob", "mat", "", "ma.*"];

	$highlightedItems = function () {
		return $comboElem.igCombo('listItems').find('.ui-igcombo-highlight');
	};

	$comboElem.igCombo({
		width: 200,
		height: 30,
		textKey: 'Name',
		dataSource: [{ ID: 1, Name: "John Smith" },
		{ ID: 2, Name: "Mary Johnson" },
		{ ID: 3, Name: "Bob Ferguson" },
		{ ID: 4, Name: "Tom Tomov" },
		{ ID: 5, Name: "Stewerd Matewson" },
		{ ID: 6, Name: "David Bengalski" }],
		dropDownAttachedToBody: false
	});

	combo = $comboElem.data().igCombo;

	combo._highlight(inputText);
	assert.equal($highlightedItems().length, 2, "Correct number items should be highlighted.");

	combo._unhighlight();
	assert.equal($highlightedItems().length, 0, "None of the items should be highlighted.");

	combo._highlight(inputTextWithRegex);
	assert.equal($highlightedItems().length, 0, "None of the items should be highlighted when regex text is passed");

	combo._highlight(inputEmptyText);
	assert.equal($highlightedItems().length, 0, 'None of the should be highlighted when empty text is passed.');

	combo._highlight(inputTexts);
	assert.equal($highlightedItems().length, 2, "Correct number items should be highlighted.");

	// Highlight matches 'null'
	combo._unhighlight();
	combo.options.highlightMatchesMode = null;

	combo._highlight(inputText);
	assert.equal($highlightedItems().length, 0, 'None of items the should be highlighted when highlightMatchesMode is null.');

	// Highlight matches 'startsWith'
	combo._unhighlight();
	combo.options.highlightMatchesMode = 'startsWith';

	combo._highlight(inputText);
	assert.equal($highlightedItems().length, 1, "Correct number items should be highlighted.");

	combo._unhighlight();
	assert.equal($highlightedItems().length, 0, "None of the items should be highlighted.");

	// Highlight matches 'full'
	combo.options.highlightMatchesMode = 'full';
	inputText = "Tom Tomov";

	combo._highlight(inputText);
	assert.equal($highlightedItems().length, 1, "Correct number items should be highlighted.");

	combo._unhighlight();
	assert.equal($highlightedItems().length, 0, "None of the items should be highlighted.");

	inputTexts = ["Tom Tomov", "David Bengalski"];

	combo._highlight(inputTexts);
	assert.equal($highlightedItems().length, 2, "Correct number items should be highlighted.");

	combo._unhighlight();
	assert.equal($highlightedItems().length, 0, "None of the items should be highlighted.");

	// Highligh matches 'contains'
	combo.options.highlightMatchesMode = 'contains';
	//inputText = "jo";

	combo._highlight(inputText);
	assert.equal($highlightedItems().length, 1, "Correct number items should be highlighted.");

	combo._unhighlight();
	assert.equal($highlightedItems().length, 0, "None of the items should be highlighted.");

	combo._highlight(inputTexts);
	assert.equal($highlightedItems().length, 2, "Correct number items should be highlighted.");
});

QUnit.test('[ID7] igCombo scrolling tests', function (assert) {
	assert.expect(11);

	var combo, $dropDownCont, scrollResult, dropDownContHeight,
		$comboElem = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-scroll" });

	$comboElem.igCombo({
		textKey: 'name',
		dataSource: localData,
		dropDownAttachedToBody: false
	});

	combo = $comboElem.data().igCombo;

	combo.closeDropDown();
	scrollResult = combo.listScrollTop();
	$dropDownCont = $comboElem.find('.ui-igcombo-list');

	assert.notEqual($dropDownCont.css('height'), 0, "The height should be 0.");
	assert.equal(scrollResult, 0, "When value is undefined, then scroll top is returned.");

	combo.closeDropDown();
	scrollResult = combo.listScrollTop(100);

	assert.notEqual($dropDownCont.css('height'), 0, "The height should be 0.");
	assert.equal(scrollResult.widgetName, "igCombo", "Returns reference to igCombo.");
	assert.equal(combo.listScrollTop(), 100, "When value is undefined, then scroll top is returned.");
	assert.equal($dropDownCont.prop('scrollTop'), 100, "Drop down container should be equal to set top scroll.");

	combo.listScrollTop(200);

	assert.equal(combo.listScrollTop(), 200, "When value is undefined, then scroll top is returned.");
	assert.equal($dropDownCont.prop('scrollTop'), 200, "Drop down container should be equal to set top scroll.");

	scrollHeight = $dropDownCont.prop('scrollHeight') - $dropDownCont.innerHeight();

	// set invalid scroll height
	combo.listScrollTop(scrollHeight + 200);

	assert.equal(combo.listScrollTop(), scrollHeight, "When value is invalid, then scroll is max scroll height of the list items.");
	assert.equal($dropDownCont.prop("scrollTop"), scrollHeight, "Drop down container should be equal to max top scroll.");

	combo.listScrollTop(-200);
	assert.equal(combo.listScrollTop(), 0, "When negative value is put, then top scroll is 0.");
});

QUnit.test('[ID8] igCombo virtualization tests', function (assert) {
	assert.expect(43);

	var combo, $list, $dropDownCont, $scrollCont, $scroll,
		done = assert.async(),
		scrollIncrement = 0,
		itemsIncrement = 0,
		itemHeight = 29,
		itemsCount = 40,
		scrollHeight = itemsCount * itemHeight,
		$comboElem = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-virtualization" });

	$comboElem.igCombo({
		virtualization: true,
		textKey: 'name',
		dataSource: localData,
		animationShowDuration: 0,
		animationHideDuration: 0,
		dropDownAttachedToBody: false
	});

	combo = $comboElem.data().igCombo;
	combo.openDropDown();

	$dropDownCont = $comboElem.find('.ui-igcombo-list');
	$scrollCont = $dropDownCont.children('div');

	$list = $comboElem.find('.ui-igcombo-list .ui-igcombo-listitemholder');

	assert.ok($scrollCont.is('div'), "The scroll container should be div.");
	assert.ok($scrollCont.hasClass('ui-igcombo-scrollholder'), "The scroll container should has ui-igcombo-scrollholder class.");
	assert.ok($scrollCont.hasClass('ui-unselectable'), "The scroll container should not be selectable.");
	assert.equal($scrollCont.css("overflow-y"), "scroll", "The scroll container should has vertical scroll.");
	assert.equal($scrollCont.css("overflow-x"), "hidden", "The scroll container should not has horizontal scroll.");
	assert.equal($scrollCont.css("right"), "0px", "The scroll container should be positioned on the right.");
	assert.equal($dropDownCont.css("overflow"), "hidden", "The list container should be with hidden scrolls.");

	$scroll = $scrollCont.children();

	assert.ok($scroll.is('div'), "The scroll should be div.");
	assert.ok($scroll.hasClass('ui-igcombo-scroll'), "The scroll should has ui-igcombo-scroll class.");
	assert.ok($scroll.hasClass('ui-unselectable'), "The scroll should not be selectable.");

	// Adding tolerance for inconsistencies between the running engine and real browsers
	assert.ok(scrollHeight - 80 <= $scroll.height() && scrollHeight + 80 >= $scroll.height(), `Scroll has wrong height: ${$scroll.height()}, exp: ${scrollHeight}`);
	// equal($scroll.height(), scrollHeight, "Scroll has wrong height.");

	$listItems = $comboElem.find('.ui-igcombo-list .ui-igcombo-listitemholder')
		.children();

	assert.equal($listItems.length, 15, "15 items should be rendered.");

	$listItems.each(function (i) {
		assert.ok($(this).text() === localData[i + itemsIncrement].name, "The item value " + $(this).text() + " should be equal to data source value: " + localData[i].name);
	});

	combo.listScrollTop(860);

	$.ig.TestUtil.wait(10).then(function () {
		//Make assertion
		assert.equal($listItems.length, 15, "15 items should be rendered.");

		$listItems = $comboElem.find('.ui-igcombo-list .ui-igcombo-listitemholder').children();
		$listItems.each(function (i) {
			assert.ok($(this).text() === localData[i + 25].name, "The item value " + $(this).text() + " should be equal to data source value: " + localData[i].name);
		});
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID9] igCombo drop down opening', function (assert) {
	assert.expect(3);

	var $dropDown,
		$combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-ddopen" }),
		done = assert.async(),
		dataSource = [{ ID: 1, Name: "John Smith" },
		{ ID: 2, Name: "Mary Johnson" },
		{ ID: 3, Name: "Bob Ferguson" }],
		itemHeight = 29,
		border = 1,
		dropDownExpHeight = 3 * itemHeight + border,
		isDropDownOpen;

	$combo.igCombo({
		dataSource: dataSource,
		textKey: 'Name',
		valueKey: 'ID',
		animationShowDuration: 0,
		animationHideDuration: 0
	});

	$dropDown = $combo.igCombo('dropDown');

	// Open drop down
	$combo.igCombo('openDropDown');

	$.ig.TestUtil.wait(50).then(function () {
		isDropDownOpen = $combo.igCombo('dropDownOpened');

		assert.ok(isDropDownOpen, 'dropDownOpened is incorrect');

		// Adding tolerance for inconsistencies between the running engine and real browsers
		assert.ok(dropDownExpHeight - 6 <= $dropDown.outerHeight() && dropDownExpHeight + 6 >= $dropDown.outerHeight(), dropDownExpHeight,
			`Drop down height is incorrect: ${$dropDown.outerHeight()}, exp: ${dropDownExpHeight}`);

		// Open drop down again
		$combo.igCombo('openDropDown');

		// Adding tolerance for inconsistencies between the running engine and real browsers
		assert.ok(dropDownExpHeight - 6 <= $dropDown.outerHeight() && dropDownExpHeight + 6 >= $dropDown.outerHeight(), dropDownExpHeight,
			`Drop down height is incorrect: ${$dropDown.outerHeight()}, exp: ${dropDownExpHeight}`);
		//strictEqual($dropDown.outerHeight(), dropDownExpHeight, 'Drop down height is incorrect');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID10] igCombo drop down closing', function (assert) {
	assert.expect(1);

	var $dropDown,
		done = assert.async(),
		$combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-ddclose" }),
		dataSource = [{ ID: 1, Name: "John Smith" },
		{ ID: 2, Name: "Mary Johnson" },
		{ ID: 3, Name: "Bob Ferguson" }];

	$combo.igCombo({
		dataSource: dataSource,
		textKey: 'Name',
		valueKey: 'ID',
		animationShowDuration: 0,
		animationHideDuration: 0
	});

	$dropDown = $combo.igCombo('dropDown');

	// Open drop down. Drop down is initially closed
	$combo.igCombo('openDropDown');

	// Close drop down
	$combo.igCombo('closeDropDown');

	$.ig.TestUtil.wait(10).then(function () {
		assert.strictEqual($dropDown.outerHeight(), 0, 'Drop down height is incorrect');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID11] igCombo disabled rendering', function (assert) {
	assert.expect(4);

	var $comboElement = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-disabled" }),
		$input,
		itemsText = ['Tom', 'Jerry', 'Spiky', 'Bendji'];

	$comboElement
		.igCombo({
			valueKey: 'id',
			textKey: 'name',
			disabled: true,
			dataSource: [{
				id: '1',
				name: 'Tom'
			}, {
				id: '2',
				name: 'Jerry'
			}, {
				id: '3',
				name: 'Spiky'
			}, {
				id: '4',
				name: 'Bendji'
			}]
		})

	$comboWrapper = $('.ui-igcombo-wrapper');
	$input = $comboElement.igCombo('textInput');

	assert.equal($comboWrapper.hasClass("ui-igCombo-disabled ui-state-disabled"), true, "The combo wrapper element does not have the disabled css classes applied.");
	assert.equal($input.attr("disabled"), "disabled", "The disabled attribute is not applied to the input.");

	$comboElement.igCombo("option", "disabled", false);

	assert.equal($comboWrapper.hasClass("ui-igCombo-disabled ui-state-disabled"), false, "The combo wrapper element has the disabled css classes applied.");
	assert.equal($input.attr("disabled"), undefined, "The disabled attribute is applied to the input.");
});
