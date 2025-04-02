QUnit.module("igCombo virtualization unit tests", {
	divTag: '<div></div>',
	start: 0,
	end: 0,
	carType1: "German car",
	carType2: "Russian car",
	carType3: "Swedish car",
	car1: "Saab",
	car2: "Volvo",
	car3: "Mercedes",
	car4: "Moscvitch",
	car5: "Audi",
	car6: "Lada",
	car7: "VW",
	car8: "Kamaz",
	car9: "Porsche",
	car10: "Zil",
	carsDataSource: [
		{ ID: '1', Name: "Saab", Type: "Swedish car" },
		{ ID: '2', Name: "Volvo", Type: "Swedish car" },
		{ ID: '3', Name: "Mercedes", Type: "German car" },
		{ ID: '4', Name: "Moscvitch", Type: "Russian car" },
		{ ID: '5', Name: "Audi", Type: "German car" },
		{ ID: '6', Name: "Lada", Type: "Russian car" },
		{ ID: '7', Name: "VW", Type: "German car" },
		{ ID: '8', Name: "Kamaz", Type: "Russian car" },
		{ ID: '9', Name: "Porsche", Type: "German car" },
		{ ID: '10', Name: "Zil", Type: "Russian car" }
	],
	dataSource1: [
		{ ID: 1, Name: "John" },
		{ ID: 2, Name: "Mary" },
		{ ID: 3, Name: "Bob" },
		{ ID: 4, Name: "Tom" },
		{ ID: 5, Name: "Mike" },
		{ ID: 6, Name: "Michael" },
		{ ID: 7, Name: "Michele" }],
	dataSource2: [
		{ ID: 1, Name: "John" },
		{ ID: 2, Name: "Mary" },
		{ ID: 3, Name: "Bob" },
		{ ID: 4, Name: "Tom" },
		{ ID: 5, Name: "Stewerd" },
		{ ID: 6, Name: "David" },
		{ ID: 7, Name: "Anna" },
		{ ID: 7, Name: "Hana" },
		{ ID: 8, Name: "Betty" }],
	getInputSelection: function ($elem) {
		var normalizedValue, range, textInputRange, len, endRange, elem = $elem[0];

		if (typeof elem.selectionStart == "number" && typeof elem.selectionEnd == "number") {
			this.start = elem.selectionStart;
			this.end = elem.selectionEnd;
		} else if (document.selection && document.selection.type != 'Control') {
			range = document.selection.createRange();

			if (range && range.parentElement() == $elem) {
				len = $elem.value.length;
				normalizedValue = $elem.value.replace(/\r\n/g, "\n");

				// Create a working TextRange that lives only in the input
				textInputRange = $elem.createTextRange();
				textInputRange.moveToBookmark(range.getBookmark());

				// Check if the start and end of the selection are at the very end
				// of the input, since moveStart/moveEnd doesn't return what we want
				// in those cases
				endRange = $elem.createTextRange();
				endRange.collapse(false);

				if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
					this.start = this.end = len;
				} else {
					this.start = -textInputRange.moveStart("character", -len);
					this.start += normalizedValue.slice(0, this.start).split("\n").length - 1;

					if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
						this.end = len;
					} else {
						this.end = -textInputRange.moveEnd("character", -len);
						this.end += normalizedValue.slice(0, this.end).split("\n").length - 1;
					}
				}
			}
		}
	},
	before: function () {
		$.mockjax({
			url: "http://localhost/api/invoices*",
			dataType: 'json',
			contentType: "application/json",
			responseTime: 500,
			response: function (settings) {
				var responseText = remoteData;
				if (settings.data.$filter && settings.data.$filter === "indexof(tolower(ProductName),'pavlova') ge 0") {
					responseText = $.map(responseText, function (val, i) {
						if (val.ProductName.toLowerCase().indexOf('pavlova') !== -1) {
							return val;
						}
					});
				}

				if (settings.data.$inlinecount && settings.data.$inlinecount === "allpages") {
					responseText = {
						"Results": responseText.slice(settings.data.$skip, settings.data.$skip + settings.data.$top),
						"Count": remoteData.length
					}
				}

				this.responseText = {
					"d": {
						"results": responseText
					}
				}
			}
		});
	}
});

QUnit.test('[ID1] Load on demand last item and scroll visibility', function (assert) {
	assert.expect(2);

	var $comboElem = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-lod" }),
		done = assert.async(),
		$dropDownCont, dropDownContHeight, actualHeight, expectedHeight, pageSize = 16;

	$comboElem.igCombo({
		width: 200,
		height: 30,
		textKey: 'ProductName',
		responseDataKey: "d.results.Results",
		responseTotalRecCountKey: "d.results.Count",
		dataSource: "http://localhost/api/invoices?callback=?",
		dataSourceType: "json",
		animationShowDuration: 0,
		animationHideDuration: 0,
		dropDownAttachedToBody: false,
		loadOnDemandSettings: {
			enabled: true
		},
		itemsRendered: function (evt, ui) {
			ui.owner.openDropDown(function () {
				$dropDownCont = $comboElem.find('.ui-igcombo-list');
				lastItemHeight = $dropDownCont.find("li:last-child").outerHeight();
				dropDownContHeight = $dropDownCont.height();
				actualHeight = dropDownContHeight + lastItemHeight;
				expectedHeight = pageSize * lastItemHeight;

				assert.equal(actualHeight, expectedHeight, "Last item should be hidden when virtualization is enabled.");

				assert.notEqual($dropDownCont.prop('scrollHeight'), $dropDownCont.height(), "Scroll should be visible.");

				ui.owner.closeDropDown();
			});
		}
	});

	$.ig.TestUtil.wait(500).then(function () {
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID2] Test autocomplete functionality', function (assert) {
	assert.expect(8);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-autoComplete" }),
		done = assert.async(),
		self = this,
		$input, selectedText, selectPositions;

	$combo.igCombo({
		dataSource: this.dataSource1,
		textKey: 'Name',
		animationShowDuration: 0,
		animationHideDuration: 0,
		delayInputChangeProcessing: 0,
		autoComplete: true
	});

	$input = $combo.igCombo('textInput');
	$.ig.TestUtil.type("t", $input);
	$.ig.TestUtil.wait(100).then(function () {
		assert.strictEqual($input.val(), 'tom', 'Input value is incorrect');

		// test highlighting
		selectedText = "";
		if (window.getSelection) {
			selectedText = window.getSelection().toString();
		}
		else if (document.selection && document.selection.type != 'Control') {
			selectedText = document.selection.createRange().text;
		}
		assert.strictEqual(selectedText, 'om', 'Selected text is incorrect');

		// Invalid value
		$input.trigger("focus").trigger("select");
		$.ig.TestUtil.type("Tx", $input, 'shiftKey');
		assert.strictEqual($input.val(), 'Tx', 'Input value is incorrect');

		// Multiple entries with same starting letter(s)
		$input.trigger("focus").trigger("select");
		$.ig.TestUtil.type("M", $input, 'shiftKey');
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		assert.strictEqual($input.val(), 'Mary', 'Input value is incorrect');

		$input.trigger("focus").trigger("select");
		$.ig.TestUtil.type("Mi", $input, 'shiftKey');
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		assert.strictEqual($input.val(), 'Mike', 'Input value is incorrect');

		// Test right arrow
		$.ig.TestUtil.keyInteraction(39, $input); // right arrow
		assert.strictEqual($input.val(), 'Mike', 'Input value is incorrect');
		$input.trigger("focus").trigger("select");
		$.ig.TestUtil.type('M', $input);

		return $.ig.TestUtil.wait(100);
	}).then(function () {
		// Test left arrow
		$.ig.TestUtil.keyInteraction(37, $input); // left arrow
		assert.strictEqual($input.val(), 'Mary', 'Input value is incorrect');
		self.getInputSelection($input);
		assert.strictEqual(self.start, 1, 'Caret is not at the correct position');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID3] Autocomplete with multiple selection', function (assert) {
	assert.expect(5);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-autoComplete-multi" }),
		done = assert.async(),
		$input;

	$combo.igCombo({
		dataSource: this.dataSource2,
		textKey: 'Name',
		animationShowDuration: 0,
		animationHideDuration: 0,
		delayInputChangeProcessing: 0,
		autoComplete: true,
		multiSelection: {
			enabled: true
		}
	});

	$input = $combo.igCombo('textInput');
	$.ig.TestUtil.type('a', $input);

	$.ig.TestUtil.wait(100).then(function () {
		assert.strictEqual($input.val(), 'anna', 'Input value is incorrect');

		$input.trigger("focus").trigger("select");
		$.ig.TestUtil.type('a,', $input);
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		assert.strictEqual($input.val(), 'a,', 'Input value is incorrect');

		$input.trigger("focus").trigger("select");
		$.ig.TestUtil.type('a, ', $input);
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		isValueCorrect = $input.val() === 'Anna, ' || $input.val() === 'Anna';
		assert.ok(isValueCorrect, 'Input value is incorrect');

		$input.trigger("focus").trigger("select");
		$.ig.TestUtil.type('Anna,', $input);
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		assert.strictEqual($input.val(), 'Anna,', 'Input value is incorrect');

		$input.trigger("focus").trigger("select");
		$.ig.TestUtil.type('Anna, B', $input);
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		assert.strictEqual($input.val(), 'Anna, Bob', 'Input value is incorrect');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID4] Autocomplete with case sensitivity', function (assert) {
	assert.expect(3);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-autoComplete-case-sensitive" }),
		done = assert.async(),
		$input;

	$combo.igCombo({
		dataSource: this.dataSource2,
		textKey: 'Name',
		animationShowDuration: 0,
		animationHideDuration: 0,
		delayInputChangeProcessing: 0,
		autoComplete: true,
		caseSensitive: true
	});

	$input = $combo.igCombo('textInput');
	$.ig.TestUtil.type('b', $input);
	$.ig.TestUtil.wait(100).then(function () {
		assert.strictEqual($input.val(), 'b', 'Input value is incorrect');

		$input.trigger("focus").trigger("select");
		$.ig.TestUtil.type('B', $input);
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		assert.strictEqual($input.val(), 'Bob', 'Input value is incorrect');

		$input.trigger("focus").trigger("select");
		$.ig.TestUtil.type('BO', $input, "shiftKey");
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		assert.strictEqual($input.val(), 'BO', 'Input value is incorrect');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID5] Grouping base functionality', function (assert) {
	assert.expect(6);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-grouping-base" }),
		$liItem, $headers, headersState, allItemsState, dataAttrState,
		self = this,
		typesCount = 3;

	$combo.igCombo({
		dataSource: this.carsDataSource,
		textKey: "Name",
		valueKey: "ID",
		grouping: {
			key: 'Type',
			dir: 'asc'
		}
	});

	$liItems = $combo.igCombo('dropDown').find('li');
	$headers = $liItems.filter(".ui-igcombo-group-header");

	headersState = function () {
		return $headers.eq(0).text() === self.carType1 &&
			$headers.eq(1).text() === self.carType2 &&
			$headers.eq(2).text() === self.carType3;
	}

	allItemsState = function () {
		return $liItems.eq(0).text() === self.carType1 &&
			$liItems.eq(1).text() === self.car3 &&
			$liItems.eq(2).text() === self.car5 &&
			$liItems.eq(3).text() === self.car7 &&
			$liItems.eq(4).text() === self.car9 &&

			$liItems.eq(5).text() === self.carType2 &&
			$liItems.eq(6).text() === self.car4 &&
			$liItems.eq(7).text() === self.car6 &&
			$liItems.eq(8).text() === self.car8 &&
			$liItems.eq(9).text() === self.car10 &&

			$liItems.eq(10).text() === self.carType3 &&
			$liItems.eq(11).text() === self.car1 &&
			$liItems.eq(12).text() === self.car2;
	}

	dataAttrState = function () {
		var result = true;

		for (var i = 0; i < typesCount + self.carsDataSource.length; i++) {
			if (i === 0 || i === 5 || i === 10) {
				result = result && !$liItems.eq(i).attr("data-value");
			} else {
				result = result && $liItems.eq(i).attr("data-value");
			}
		}

		return !!result;
	}

	assert.ok(allItemsState(), 'Drop down correctly group its items');
	assert.ok(headersState(), 'Drop down correctly heads its groups');
	assert.ok(dataAttrState(), 'Drop down correctly set data-value attribute');

	$combo.igCombo("openDropDown");

	assert.ok(allItemsState(), 'Drop down correctly group its items');
	assert.ok(headersState(), 'Drop down correctly heads its groups');
	assert.ok(dataAttrState(), 'Drop down correctly set data-value attribute');
});

QUnit.test('[ID6] Grouping sort functionality', function (assert) {
	assert.expect(4);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-grouping-sort" }),
		$headers, ascState, descState;

	$combo.igCombo({
		dataSource: this.carsDataSource,
		textKey: "Name",
		valueKey: "ID",
		grouping: {
			key: 'Type',
			dir: 'asc'
		}
	});

	$headers = $combo.igCombo('dropDown').find('li').filter(".ui-igcombo-group-header");

	ascState =
		$headers.eq(0).text() === this.carType1 &&
		$headers.eq(1).text() === this.carType2 &&
		$headers.eq(2).text() === this.carType3;

	assert.ok(ascState, 'Drop down correctly sort headers in ASC order');

	$combo.igCombo("openDropDown");

	assert.ok(ascState, 'Drop down correctly sort headers in ASC order');

	$combo.igCombo("option", "grouping", {
		key: 'Type',
		dir: 'desc'
	});

	$headers = $combo.igCombo('dropDown').find('li').filter(".ui-igcombo-group-header");

	descState =
		$headers.eq(0).text() === this.carType3 &&
		$headers.eq(1).text() === this.carType2 &&
		$headers.eq(2).text() === this.carType1;

	assert.ok(descState, 'Drop down correctly sort headers in DESC order');

	$combo.igCombo("closeDropDown");

	assert.ok(descState, 'Drop down correctly sort headers in DESC order');
});

QUnit.test('[ID7] Grouping select item/header', function (assert) {
	assert.expect(7);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-grouping-select" }),
		done = assert.async(),
		self = this,
		$liItems, state, selectedItem;

	$combo.igCombo({
		dataSource: this.carsDataSource,
		textKey: "Name",
		valueKey: "ID",
		closeDropDownOnBlur: false,
		initialSelectedItems: [{ index: 0 }],
		grouping: {
			key: 'Type',
			dir: 'asc'
		}
	});

	// code selection
	assert.equal($combo.igCombo("text"), this.car3, 'Drop down selected item by index');

	$combo.igCombo('index', 1);
	assert.equal($combo.igCombo("text"), this.car5, 'Drop down select item by index');

	$combo.igCombo('index', 10);
	assert.notOk($combo.igCombo("text"), 'Drop down does not select item correctly');

	$combo.igCombo('value', 1);
	assert.equal($combo.igCombo("text"), this.car1, 'Drop down select item by value');

	$combo.igCombo('value', 11);
	assert.notOk($combo.igCombo("text"), 'Drop down does not select item correctly');

	// mouse selection
	$combo.igCombo("openDropDown");

	$.ig.TestUtil.wait(200).then(function () {
		$liItems = $combo.igCombo('dropDown').find('li');

		// click on header
		$.ig.TestUtil.click($liItems.eq(0));
		return $.ig.TestUtil.wait(100);
	}).then(function () {
		assert.notOk($combo.igCombo("selectedItems"), "Combo does not select group header.");

		// click on item
		$.ig.TestUtil.click($liItems.eq(4));

		return $.ig.TestUtil.wait(100);
	}).then(function () {
		selectedItem = $combo.igCombo("selectedItems");
		state = selectedItem.length === 1 && selectedItem[0] && selectedItem[0].data && selectedItem[0].data === self.carsDataSource.find(item => item.ID === '9');

		assert.ok(state, "Combo selects item.");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID8] Load on demand items count when loading new items', function (assert) {
	assert.expect(5);

	var $comboElem = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-lod-items-count" }),
		done = assert.async(),
		$listItems,
		itemsRenderedFiredCount = 0,
		pageSize = 16,
		itemsRenderedFiredCountForNextChunk = [1, 2, 3, 4],
		itemsRenderedFiredCountForFinishingTest = 5;

	$comboElem.igCombo({
		width: 200,
		height: 30,
		textKey: 'ProductName',
		responseDataKey: "d.results.Results",
		responseTotalRecCountKey: "d.results.Count",
		dataSource: "http://localhost/api/invoices?callback=?",
		dataSourceType: "json",
		animationShowDuration: 0,
		animationHideDuration: 0,
		dropDownAttachedToBody: false,
		loadOnDemandSettings: {
			enabled: true
		},
		itemsRendered: function (evt, ui) {
			itemsRenderedFiredCount++;
			$listItems = $comboElem.find('.ui-igcombo-list .ui-igcombo-listitemholder').children();
			assert.equal($listItems.length, pageSize * itemsRenderedFiredCount, pageSize * itemsRenderedFiredCount + " items should be loaded when load on demand is enabled.");

			if ($.inArray(itemsRenderedFiredCount, itemsRenderedFiredCountForNextChunk) != -1) {
				ui.owner._nextChunk();
			}
		}
	});

	$.ig.TestUtil.wait(3000).then(function () {
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID9] Virtualization with grouping and LOD tests', function (assert) {
	assert.expect(8);

	var $comboElem = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-virtualization-grouping" }),
		$dropDown, $listItems, data, headersState, selectedItem,
		data = [
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
			{ "ID": 11, "ProductName": "Queso Cabrales", "SupplierName": "Cooperativa de Quesos Las Cabras", }]

	$comboElem.igCombo({
		virtualization: true,
		dataSource: data,
		valueKey: "ID",
		textKey: 'ProductName',
		width: 200,
		height: 30,
		loadOnDemandSettings: { enabled: true, pageSize: 2 },
		visibleItemsCount: 4,
		grouping: { key: 'SupplierName' },
		multiSelection: {
			enabled: true,
		}
	});

	combo = $comboElem.data().igCombo;
	$comboElem.igCombo('openDropDown');
	$dropDown = $comboElem.igCombo("dropDown");
	$listItems = $dropDown.find('.ui-igcombo-listitem');

	// items list does not contain the group header
	assert.equal($listItems.length, 2, "2 items should be rendered.");

	$headers = $dropDown.find('li').filter(".ui-igcombo-group-header");

	headersState = function () {
		return $headers.eq(0).text() === 'Cooperativa de Quesos Las Cabras' &&
			$headers.eq(1).text() === 'Exotic Liquids'
	}
	assert.ok(headersState(), 'Drop down correctly heads its groups');
	$comboElem.igCombo('openDropDown');
	combo.listScrollTop(200);
	$listItems = $dropDown.find('.ui-igcombo-listitem');
	assert.equal($listItems.length, 2, "2 items should be rendered.");
	$comboElem.igCombo('closeDropDown');

	$comboElem.igCombo("select", $($listItems[0]));
	selectedItem = $comboElem.igCombo("itemsFromIndex", [0]);
	assert.equal($listItems[0], selectedItem[0].element[0], "itemsFromIndex returns the selected item li element");
	selectedItem = $comboElem.igCombo("itemsFromIndex", [1]);
	assert.equal($listItems[1], selectedItem[0].element[0], "itemsFromIndex returns the selected item li element");

	$comboElem.igCombo("select", $($listItems[1]));
	selectedItem = $comboElem.igCombo("itemsFromValue", [11]);
	assert.equal($listItems[0], selectedItem[0].element[0], "itemsFromIndex returns the selected item li element");

	selectedItem = $comboElem.igCombo("itemsFromElement", $($listItems));
	var selectedItems = $comboElem.igCombo("selectedItems");
	assert.equal($listItems[0], selectedItem[0].element[0], "itemsFromIndex returns the selected item li element");
	assert.equal($listItems[1], selectedItem[1].element[0], "itemsFromIndex returns the selected item li element");
});

QUnit.test('[ID10] The last item is not displayed in the dropdown list if virtualization is enabled', function (assert) {
	assert.expect(1);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-lastItem" }),
		$listItems,
		data = [
			{ "cd": "001", "cdName": "0000001" },
			{ "cd": "002", "cdName": "0000002" },
			{ "cd": "003", "cdName": "0000003" },
			{ "cd": "004", "cdName": "0000004" },
			{ "cd": "005", "cdName": "0000005" },
			{ "cd": "006", "cdName": "0000006" },
			{ "cd": "007", "cdName": "0000007" },
			{ "cd": "008", "cdName": "0000008" },
			{ "cd": "009", "cdName": "0000009" },
			{ "cd": "010", "cdName": "00000010" },
			{ "cd": "011", "cdName": "00000011" }
		];

	$combo.igCombo({
		mode: 'editable',
		width: '80px',
		dropDownWidth: '280px',
		itemTemplate: '<div style="display: block;" title="${cdName}"><span style="width: 80px; display: inline-block;">${cd}</span><span style="width: 200px; display: inline-block;">${cdName}</span></div>',
		dataSource: data,
		enableClearButton: false,
		virtualization: true,
		delayFilteringOnKeyUp: 0,
		placeHolder: " ",
		textKey: 'cd',
		valueKey: 'cd',
		filteringType: "none",
		highlightMatchesMode: "startsWith",
		visibleItemsCount: 5,
	});

	$listItems = $combo.igCombo("items");
	$combo.igCombo("option", "loadOnDemandSettings", { enabled: true, pageSize: 3 });
	assert.equal(data.length, $listItems.length, "All items are visible");
});

QUnit.test('[ID11] When virtualization is true and scroll with mouse wheel the page is scrolled', function (assert) {
	assert.expect(12);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-mouse-events" }),
		$dropDownButton, $clearCont,
		data = [
			{ ID: 0, Name: "John", Age: 45, ModifiedDate: "1/1/2000" },
			{ ID: 1, Name: "Chai", Age: 32, ModifiedDate: new Date(1309467600000) },
			{ ID: 2, Name: "Chang", Age: 32, ModifiedDate: "/Date(1078992096827)/" },
			{ ID: 5, Name: "3", Age: 32, ModifiedDate: "\/Date(1078992096827)\/" },
			{ ID: 4, Name: "test dsf", Age: 32, ModifiedDate: "\/Date(1078992096827)\/" },
			{ ID: 3, Name: "Bob ", Age: 27, ModifiedDate: "\/Date(1078992096827)\/" }];

	$combo.igCombo({
		dataSource: data,
		textKey: "Name",
		valueKey: "ID",
	});

	$dropDownButton = $combo.data().igCombo._options.$dropDownBtnCont;
	$clearCont = $combo.data().igCombo._options.$clearCont;

	// verify combo element mouse events
	$.ig.TestUtil.mouseEvent($combo, "mouseover");
	$.ig.TestUtil.mouseEvent($combo, "mouseout");
	assert.equal($combo.children().attr("class").contains("ui-state-hover"), false, "ui-state-hover class is not applied");
	$.ig.TestUtil.mouseEvent($combo, "mousedown");
	$.ig.TestUtil.mouseEvent($combo, "mouseup");
	assert.equal($combo.children().attr("class").contains("ui-state-active"), false, "ui-state-active class is not applied");

	// verify dropDownButton element mouse events
	$.ig.TestUtil.mouseEvent($dropDownButton, "mousedown");
	$.ig.TestUtil.mouseEvent($dropDownButton, "mouseup");
	$.ig.TestUtil.mouseEvent($dropDownButton, "mouseover");
	assert.equal($dropDownButton.attr("class").contains("ui-state-hover"), true, "ui-state-hover class is applied");
	assert.equal($combo.children().attr("class").contains("ui-state-hover"), true, "ui-state-hover class is applied");
	$.ig.TestUtil.mouseEvent($dropDownButton, "mouseout");
	assert.equal($dropDownButton.attr("class").contains("ui-state-hover"), false, "ui-state-hover class is not applied");
	assert.equal($combo.children().attr("class").contains("ui-state-hover"), false, "ui-state-hover class is not applied");

	// verify clear button element mouse events
	$.ig.TestUtil.mouseEvent($clearCont, "mousedown");
	$.ig.TestUtil.mouseEvent($clearCont, "mouseup");
	$.ig.TestUtil.mouseEvent($clearCont, "mouseover");
	assert.equal($clearCont.attr("class").contains("ui-igcombo-clear-hover ui-state-hover"), true, "ui-igcombo-clear-hover ui-state-hover class is applied");
	assert.equal($combo.children().attr("class").contains("ui-state-hover"), true, "ui-state-hover class is applied");
	$.ig.TestUtil.mouseEvent($clearCont, "mouseout");
	assert.equal($clearCont.attr("class").contains("ui-igcombo-clear-hover ui-state-hover"), false, "ui-igcombo-clear-hover ui-state-hover class is not applied");
	assert.equal($combo.children().attr("class").contains("ui-state-hover"), false, "ui-state-hover class is not applied");
	assert.equal($combo.igCombo("text"), "", "Text in input is correct");

	$combo.igCombo("option", "disabled", true);
	$.ig.TestUtil.mouseEvent($combo, "mouseover");
	$.ig.TestUtil.mouseEvent($combo, "mouseout");
	$.ig.TestUtil.mouseEvent($combo, "mousedown");
	$.ig.TestUtil.mouseEvent($combo, "mouseup");
	$.ig.TestUtil.mouseEvent($dropDownButton, "mouseover");
	$.ig.TestUtil.mouseEvent($dropDownButton, "mouseout");
	$.ig.TestUtil.mouseEvent($dropDownButton, "mousedown");
	$.ig.TestUtil.mouseEvent($dropDownButton, "mouseup");
	$.ig.TestUtil.mouseEvent($clearCont, "mouseover");
	$.ig.TestUtil.mouseEvent($clearCont, "mouseout");
	$.ig.TestUtil.mouseEvent($clearCont, "mousedown");
	$.ig.TestUtil.mouseEvent($clearCont, "mouseup");

	assert.equal($combo.igCombo("text"), "", "Text in input is correct");
});

QUnit.test('[ID12] Small pageSize does not trigger load on demand (scroll)', function (assert) {
	assert.expect(5);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "lodpagesize-scroll" }),
		done = assert.async(),
		$dropDown,
		$listCont,
		$scrollCont,
		options,
		lod;

	options = {
		animationShowDuration: 0,
		animationHideDuration: 0,
		loadOnDemandSettings: {
			enabled: true,
			pageSize: 3
		},
		dataSource: "http://localhost/api/invoices?callback=?",
		valueKey: "UnitPrice",
		textKey: "Salesperson",
		responseDataKey: "d.results.Results",
		responseTotalRecCountKey: "d.results.Count",
		width: "400px",
		virtualization: true,
		autoComplete: true,
		headerTemplate: "<div class='dropDownHeaderFooter'>Available Products</div>",
		footerTemplate: "<div class='dropDownHeaderFooter'>Product Count: {0} / {3}</div>",
		itemTemplate: "<div>${ProductName} (${QuantityPerUnit})</div>",
		placeHolder: "Please, select a product",
		filterExprUrlKey: 'startsWith',
		highlightMatchesMode: "startsWith",
		filteringCondition: "startsWith",
	};

	$combo.igCombo(options);
	lod = $combo.igCombo("option", "loadOnDemandSettings");

	$combo.igCombo("openDropDown");
	$listCont = $combo.data().igCombo._options.$dropDownListCont;
	$scrollCont = $combo.data().igCombo._options.$dropDownScrollCont;

	$.ig.TestUtil.wait(500).then(function () {
		assert.equal($combo.igCombo("dropDownOpened"), true, "Combo drop down should be rendered");
		assert.equal($scrollCont.is(":visible"), true, "Scrollbar is shown");
		$listItems = $combo.igCombo("listItems");
		assert.equal(lod.pageSize, 5, "Page size minimum should be 5");
		assert.equal($listItems.length, lod.pageSize, "Visible rendered items match 'pageSize'");
		$listCont.scrollTop(1000);
		$listCont.trigger("scroll");
		return $.ig.TestUtil.wait(550);
	}).then(function () {
		$listItems = $combo.igCombo("listItems");
		assert.equal($listItems.length, lod.pageSize * 2, "Load on demand succeeded");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID13] Small pageSize does not trigger load on demand (keyboard)', function (assert) {
	assert.expect(5);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "lodpagesize-keyboard" }),
		done = assert.async(),
		$dropDown,
		$listCont,
		$scrollCont,
		options,
		lod;

	options = {
		animationShowDuration: 0,
		animationHideDuration: 0,
		loadOnDemandSettings: {
			enabled: true,
			pageSize: 3
		},
		dataSource: "http://localhost/api/invoices?callback=?",
		valueKey: "UnitPrice",
		textKey: "Salesperson",
		responseDataKey: "d.results.Results",
		responseTotalRecCountKey: "d.results.Count",
		width: "400px",
		virtualization: true,
		autoComplete: true,
		headerTemplate: "<div class='dropDownHeaderFooter'>Available Products</div>",
		footerTemplate: "<div class='dropDownHeaderFooter'>Product Count: {0} / {3}</div>",
		itemTemplate: "<div>${ProductName} (${QuantityPerUnit})</div>",
		placeHolder: "Please, select a product",
		filterExprUrlKey: 'startsWith',
		highlightMatchesMode: "startsWith",
		filteringCondition: "startsWith",
	};

	$combo.igCombo(options);
	lod = $combo.igCombo("option", "loadOnDemandSettings");

	$combo.igCombo("openDropDown");
	$listCont = $combo.data().igCombo._options.$dropDownListCont;
	$scrollCont = $combo.data().igCombo._options.$dropDownScrollCont;

	$.ig.TestUtil.wait(500).then(function () {
		assert.equal($combo.igCombo("dropDownOpened"), true, "Combo drop down should be rendered");
		assert.equal($scrollCont.is(":visible"), true, "Scrollbar is shown");
		$listItems = $combo.igCombo("listItems");
		assert.equal(lod.pageSize, 5, "Page size minimum should be 5");
		assert.equal($listItems.length, lod.pageSize, "Visible rendered items match 'pageSize'");

		var $input = $combo.igCombo("textInput");
		for (var index = 0; index < 5; index++) {
			$.ig.TestUtil.keyInteraction(40, $input);
		}
		return $.ig.TestUtil.wait(550);
	}).then(function () {
		$listItems = $combo.igCombo("listItems");
		assert.equal($listItems.length, lod.pageSize * 2, "Load on demand succeeded");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID14] Virtualization with grouping and data source with less items than visibleItemsCount', function (assert) {
	assert.expect(4);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-247163" }),
		done = assert.async(),
		data = [
			{
				"country": "FRANCE",
				"city": "Paris",
				"latitude": 0,
				"description": "Paris, FRANCE",
				"id": 100000003,
				"state": "",
				"longitude": 0
			},
			{
				"country": "FRANCE",
				"city": "Leone",
				"latitude": 0,
				"description": "Leone, FRANCE",
				"id": 100000002,
				"state": "",
				"longitude": 0
			},
			{
				"country": "INDIA",
				"city": "PUNE",
				"latitude": 0,
				"description": "Pune, INDIA",
				"id": 100000005,
				"state": "",
				"longitude": 0
			},
			{
				"country": "RUSSIA",
				"city": "Moscow",
				"latitude": 0,
				"description": "Moscow, RUSSIA",
				"id": 100000004,
				"state": "",
				"longitude": 0
			},
			{
				"country": "RUSSIA",
				"city": "Vladivostok",
				"latitude": 0,
				"description": "Vladivostok, RUSSIA",
				"id": 100000001,
				"state": "",
				"longitude": 0
			}
		],
		$dropDown,
		$headers,
		$input,
		$listItems;

		$combo.igCombo({
			dataSource: data,
			animationShowDuration: 0,
			animationHideDuration: 0,
			width: "300px",
			textKey: "description",
			valueKey: "id",
			filteringType: "local",
			filteringCondition: "contains",
			highlightMatchesMode: "contains",
			selectItemBySpaceKey: false,
			grouping: {
				key: "country"
			},
			autoComplete: true,
			visibleItemsCount: 10,
			virtualization: true
		});		

	$combo.igCombo("openDropDown");

	$dropDown = $combo.igCombo("dropDown");
	$input = $combo.igCombo("textInput");
	$listItems = $dropDown.find('.ui-igcombo-listitem');
	$headers = $dropDown.find('li').filter(".ui-igcombo-group-header");

	assert.equal($listItems.length, data.length, "Correct number of list items");
	assert.equal($headers.length, 3, "Corrent number of group headers");

	$combo.igCombo("closeDropDown");
	
	$.ig.TestUtil.type('par', $input);
	$.ig.TestUtil.wait(250).then(function () {
		$.ig.TestUtil.keyInteraction(13, $input); // press enter
		return $.ig.TestUtil.wait(250);
	}).then(function () {
		$combo.igCombo("deselectAll");
		$combo.igCombo("openDropDown");

		$listItems = $dropDown.find('.ui-igcombo-listitem');
		$headers = $dropDown.find('li').filter(".ui-igcombo-group-header");

		assert.equal($listItems.length, data.length, "Correct number of list items after filter");
		assert.equal($headers.length, 3, "Corrent number of group headers after filter");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});
