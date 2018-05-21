QUnit.module("igCombo filtering unit tests", {
	divTag: '<div></div>',
	beforeEach: function () {
		this.mockHandler = $.mockjax({
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
	},
	afterEach: function () {
		$.mockjax.clear(this.mockHandler);
	}
});

QUnit.test('[ID1] Generate expressions from texts for filtering', function (assert) {
	assert.expect(5);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-div" }),
		resultText, resultTexts;

	$combo.igCombo({
		animationShowDuration: 0,
		valueKey: 'id',
		textKey: 'name',
		dataSource: [{
			id: '1',
			name: 'Tom'
		}, {
			id: '2',
			name: 'Jerry'
		}]
	});
	var combo = $('#combo-div').data().igCombo,

		// text
		inputText = "Bob",
		expectedTextResult = [{
			cond: "contains",
			expr: "Bob",
			fieldName: "name"
		}],

		// texts
		inputTexts = ["Bob", "Mary"],
		expectedTextsResult = [{
			cond: "contains",
			expr: "Bob",
			fieldName: "name",
			logic: "OR"
		}, {
			cond: "contains",
			expr: "Mary",
			fieldName: "name",
			logic: "OR"
		}],

		// not supported types
		inputNotSupportedTexts = [{}, null, undefined];

	resultText = combo._generateExpressions(inputText);
	assert.deepEqual(resultText, expectedTextResult, "The expression from the text is not generated correct.");

	resultTexts = combo._generateExpressions(inputTexts);
	assert.deepEqual(resultTexts, expectedTextsResult, "The expressions from the texts are not generated correct.");

	for (var i = 0; i < inputNotSupportedTexts.length; i++) {
		assert.throws(
			function () {
				combo._generateExpressions(inputNotSupportedTexts[i]);
			},
			/*
			function(err) {
			  return err.toString() === "some error description";
			},
			*/
			"Combo should raise error on not supported text"
		);
	};
});

QUnit.test('[ID2] Filtering by texts', function (assert) {
	assert.expect(7);

	var $comboElem = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-filtering" }),
		itemsCount = 40,
		done = assert.async(),

		// text
		filteringText = "magna",
		expectedFilteringTextResult = 2,

		// texts
		filteringTexts = ["duis", "dolor"],
		expectedFilteringTextsResult = 3,
		$listItems, combo;

	$comboElem.igCombo({
		width: 200,
		height: 30,
		valueKey: 'id',
		textKey: 'name',
		dataSource: localData,
		dataSourceType: "json",
		filteringType: "local",
		dropDownAttachedToBody: false
	});

	combo = $comboElem.data().igCombo;

	combo.options.filteringType = "local";

	// local filtering tests
	assert.equal(combo.options.filteringType, "local", "The filtering should be local.");

	combo.filter(filteringText);

	$listItems = $comboElem.find('.ui-igcombo-list .ui-igcombo-listitemholder').children().not('.ui-helper-hidden');

	assert.equal($listItems.length, expectedFilteringTextResult, "The items are not filtered when text is passed.");

	combo.clearFiltering();

	$listItems = $comboElem.find('.ui-igcombo-list .ui-igcombo-listitemholder').children();

	assert.equal($listItems.length, itemsCount, "Clear filtering is not working.");

	combo.filter(filteringTexts);

	$listItems = $comboElem.find('.ui-igcombo-list .ui-igcombo-listitemholder').children().not('.ui-helper-hidden');

	assert.equal($listItems.length, expectedFilteringTextsResult, "The items are not filtered when texts are passed.");

	combo.clearFiltering();

	combo.options.filteringType = "none";

	combo.filter(filteringText);

	$listItems = $comboElem.find('.ui-igcombo-list .ui-igcombo-listitemholder')
		.children();

	assert.equal($listItems.length, itemsCount, "The items should not be filtered when filteringType is null.");

	// remote filtering tests
	combo.options.filteringType = "remote";
	combo.options.responseDataKey = "d.results";
	combo.options.dataSource = "http://localhost/api/invoices?callback=?";
	combo.options.dataSourceType = "json";
	combo.options.textKey = "ProductName";
	combo._initDataSource();

	assert.equal(combo.options.filteringType, "remote", "The filtering should be remote.");

	combo.filter("pavlova", {});
	$.ig.TestUtil.wait(500).then(function () {
		$listItems = $comboElem.find('.ui-igcombo-list .ui-igcombo-listitemholder').children();
		assert.equal($listItems.length, 43, "The items should not be filtered when filteringType is null.");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID3] Default filtering value', function (assert) {
	assert.expect(1);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag),
		filteringType,
		dataSource = [{ ID: 1, Name: "John" },
		{ ID: 2, Name: "Mary" },
		{ ID: 3, Name: "Bob" }];

	$combo.igCombo({
		dataSource: dataSource,
		textKey: 'Name',
		valueKey: 'ID',
		filteringType: 'nonExistentType'
	});

	filteringType = $combo.igCombo('option', 'filteringType');

	assert.strictEqual(filteringType, "none", "The filtering type did not match");
});

QUnit.test('[ID4] Load on demand with local filtering type', function (assert) {
	assert.expect(2);

	var $listItems, combo, jsonSchema, dataSource
	$comboElem = $.ig.TestUtil.appendToFixture(this.divTag),
		dataSourceUrl = "http://localhost/api/invoices?callback=?";

	jsonSchema = new $.ig.DataSchema("json", {
		fields: [{ name: "ProductName", type: "string" }]
	});

	dataSource = new $.ig.DataSource({ type: "json", dataSource: dataSourceUrl, schema: jsonSchema }).dataBind();

	$comboElem.igCombo({
		width: 200,
		height: 30,
		textKey: 'ProductName',
		responseDataKey: "d.results.Results",
		responseTotalRecCountKey: "d.results.Count",
		dataSource: dataSource.data(),
		dataSourceType: "json",
		dataSourceUrl: dataSourceUrl,
		animationShowDuration: 0,
		animationHideDuration: 0,
		dropDownAttachedToBody: false,
		loadOnDemandSettings: {
			enabled: true
		},
		filteringType: "local",
		filtered: function (evt, ui) {
			$listItems = $comboElem.find('.ui-igcombo-list .ui-igcombo-listitemholder').children().not('.ui-helper-hidden');

			assert.equal($listItems.length, 1, "1 item should be filtered when load on demand is enabled and filteringType is local.");

			$dropDownCont = $comboElem.find('.ui-igcombo-list');

			assert.equal($dropDownCont.prop('scrollHeight'), $dropDownCont.height(), "All items should be visible.");
		}
	});

	combo = $comboElem.data().igCombo;
	combo.filter("chai", {});
});

QUnit.test('[ID5] Load on demand with remote filtering type', function (assert) {
	assert.expect(2);
	
	var $comboElem = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-lod-remote" }),
		done = assert.async(),
		$listItems, combo,
		itemsRenderedFiredCount = 0,
		pageSize = 16,
		itemsRenderedFiredCountForNextChunk = [2, 3],
		itemsRenderedFiredCountForAssert = 4;

	$comboElem.igCombo({
		width: 200,
		height: 30,
		textKey: 'ProductName',
		responseDataKey: "d.results.Results",
		responseTotalRecCountKey: "d.results.Count",
		dataSource: "http://localhost/api/invoices?callback=?",
		animationShowDuration: 0,
		animationHideDuration: 0,
		dropDownAttachedToBody: false,
		loadOnDemandSettings: {
			enabled: true
		},
		filteringType: "remote",
		filtered: function (evt, ui) {
			$listItems = $comboElem.find('.ui-igcombo-list .ui-igcombo-listitemholder').children().not('.ui-helper-hidden');
			assert.equal($listItems.length, pageSize, "16 items should be filtered when load on demand is enabled and filteringType is remote.");
		},
		itemsRendered: function (evt, ui) {
			$listItems = $comboElem.find('.ui-igcombo-list .ui-igcombo-listitemholder').children().not('.ui-helper-hidden');
			itemsRenderedFiredCount++;
			if ($.inArray(itemsRenderedFiredCount, itemsRenderedFiredCountForNextChunk) != -1) {
				ui.owner._nextChunk();
			}

			if (itemsRenderedFiredCount == itemsRenderedFiredCountForAssert) {
				$listItems = $comboElem.find('.ui-igcombo-list .ui-igcombo-listitemholder').children().not('.ui-helper-hidden');
				assert.equal($listItems.length, 43, "43 items should be filtered when load on demand is enabled and filteringType is remote.");
			}
		}
	});

	combo = $comboElem.data().igCombo;
	combo.filter("pavlova", {});
	$.ig.TestUtil.wait(1600).then(function () {
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID6] Local filtering with virtualization', function (assert) {
	assert.expect(2);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "local-filtering-virt" }),
		done = assert.async(),
		filteredItems, allItems;

	$combo.igCombo({
		dataSource: "http://localhost/api/invoices?callback=?",
		textKey: "ProductName",
		valueKey: "ProductID",
		responseDataKey: "d.results",
		allowCustomValues: true,
		filteringType: "local",
		virtualization: true
	});

	$.ig.TestUtil.wait(500).then(function () {
		$combo.igCombo("filter", "Sauerkraut");
		filteredItems = $combo.igCombo("filteredItems");
		assert.equal(filteredItems.length, 33, "Filtered items are 33");
		allItems = $combo.igCombo("items");
		assert.equal(allItems.length, 2155, "Items are 2155");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID7] Only lowercase items returned by igCombo filtering when filtering by turkish symbol ı', function (assert) {
	assert.expect(1);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "turkish-case-insensitive" }),
		done = assert.async(),
		key = "ı",
		$input, $listItemsDiv, $items,
		data = [
			{ Id: 1, Description: "Test" },
			{ Id: 11, Description: "ADAPAZARI" },
			{ Id: 22, Description: "Adapazarı" }
		];

	$combo.igCombo({
		animationShowDuration: 0,
		animationHideDuration: 0,
		width: '270px',
		valueKey: 'Id',
		caseSensitive: false,
		textKey: 'Description',
		dataSource: data
	});

	$input = $combo.find('.ui-igcombo-field');
	$.ig.TestUtil.keyDownChar(key, $input);
	$input.val(key);
	$.ig.TestUtil.keyUpChar(key, $input);

	$.ig.TestUtil.wait(300).then(function () {
		$listItemsDiv = $combo.igCombo("dropDown");
		$items = $listItemsDiv.find("li").not(".ui-helper-hidden");
		assert.equal($items.length, 2, "Should return 2 matches");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

// Bug #200569
QUnit.test('[ID8] When fitering is remote and multiSelection is enabled input value is not cleared after clicking outside the combo', function (assert) {
	assert.expect(2);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-bug-200569" }),
		done = assert.async(),
		data, $input, $listItems, $dropDownButton;

	$combo.igCombo({
		dataSource: "http://localhost/api/invoices?callback=?",
		responseDataKey: "d.results",
		textKey: "Salesperson",
		height: "600px",
		dropDownOrientation: "auto",
		filteringType: "remote",
		noMatchFoundText: "not found",
		multiSelection: { enabled: true }
	});

	$combo.data().igCombo._options.$dropDownListCont.outerHeight(1000);
	$input = $combo.igCombo("textInput");
	$input.focus();
	$.ig.TestUtil.type("v,", $input);
	$dropDownButton = $combo.data().igCombo._options.$dropDownBtnCont;

	$.ig.TestUtil.wait(500).then(function () {
		$dropDownButton.click();
		return $.ig.TestUtil.wait(200);
	}).then(function () {
		assert.equal($combo.igCombo("dropDownOpened"), false, "Combo drop down should be closed");
		assert.equal($combo.igCombo("text"), "", "Text in input is empty string");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID9] In LoadOnDemand and virtualization when filtering is local, data is not filtered', function (assert) {
	assert.expect(5);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-189514" }),
		done = assert.async(),
		items;

	$combo.igCombo({
		dataSourceUrl: "http://localhost/api/invoices?callback=?",
		responseDataKey: "d.results",
		textKey: "ProductName",
		valueKey: "OrderID",
		noMatchFoundText: "no data",
		virtualization: true,
	});

	assert.equal($combo.igCombo("option", "dataSourceUrl"), "http://localhost/api/invoices?callback=?", "DataSource is set the dataSourceUrl");
	assert.notEqual($combo.igCombo("option", "dataSource"), null, "DataSource is set the dataSourceUrl");
	assert.equal($combo.igCombo("option", "validatorOptions"), null, "validatorOptions is not set");
	//set validator options
	$combo.igCombo("option", "validatorOptions", {
		required: true
	});
	assert.equal($combo.igCombo("option", "validatorOptions").required, true, "validatorOptions is not set");

	// Set itemTemplate options
	$combo.igCombo("option", "itemTemplate", "<span>Item text is ${ProductName}</span>");
	$combo.igCombo("openDropDown");

	$.ig.TestUtil.wait(500).then(function () {
		$items = $combo.igCombo("items");
		assert.equal($items[0].element[0].innerHTML, "<span>Item text is Queso Cabrales</span>", "ItemTemplate is set and rendered");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID10] Filtering event arguments', function (assert) {
	assert.expect(3);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "filteringExpressions" }),
		timesCalled = 0,
		data = [
			{ "ID": 1, "Name": "John Smith", "Age": 45 },
			{ "ID": 2, "Name": "Mary Johnson", "Age": 32 },
			{ "ID": 3, "Name": "Bob Ferguson", "Age": 27 }
		];

	$combo.igCombo({
		dataSource: data,
		animationShowDuration: 0,
		animationHideDuration: 0,
		valueKey: "ID",
		textKey: "Name",
		filteringType: "local",
		filtering: function (ev, ui) {
			timesCalled++;
			if (timesCalled == 1) {
				assert.equal(ui.expression[0].expr, 'mary', "Expression matches");
			} else {
				assert.equal(ui.expression[0].expr, 'sue', 'Expression matches');
			}
		}
	});

	$combo.igCombo('filter', 'mary', true);
	$combo.igCombo('filter', 'sue', true);
	assert.equal(timesCalled, 2, 'Handler called 2 times');
});

QUnit.test('[ID11] While remotely filtering combo is loading and blurred it should clear the input and close dropdown', function (assert) {
	assert.expect(2);

	var $comboWrapper = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-remote-filtering-blur" }),
		done = assert.async(), $input,
		currentMockjaxSettingsReposnseTime = $.mockjaxSettings.responseTime,
		requiredMockjaxSettingsReposnseTime = 1000;

	$.mockjaxSettings.responseTime = requiredMockjaxSettingsReposnseTime;

	$comboWrapper.igCombo({
		dataSource: "http://localhost/api/invoices?callback=?",
		dataSourceType: "json",
		textKey: "ProductName",
		valueKey: "ProductID",
		responseDataKey: "d.results",
		filteringType: "remote",
		autocomplete: true
	});

	$input = $comboWrapper.igCombo("textInput");
	$.ig.TestUtil.type("qwerty", $input);

	// We are going to blur in the middle of the loading
	var blurAfter = Math.floor($.mockjaxSettings.responseTime / 2);

	$.ig.TestUtil.wait(blurAfter).then(function () {
		$comboWrapper.igCombo({
			// Filtered event is used because after the dropdown is closed while loading clear filtering is called
			filtered: function (evt, ui) {

				assert.strictEqual(ui.owner.dropDownOpened(), false, "Dropdown should be closed when load on demand is enabled and blur while loading.");
				assert.strictEqual($input.val(), "", "Dropdown input should be empty when load on demand is enabled and blur while loading.");				
				$.mockjaxSettings.responseTime = currentMockjaxSettingsReposnseTime;
			}
		});
		$input.blur();
		return $.ig.TestUtil.wait(1000);
	}).then(function () {
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID12] Pass custom filtering expression objects', function (assert) {
	assert.expect(6);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-filtering-by-expressions" }),
		expectedResult = [],
		filteredItems = [];
		$combo.igCombo({
			valueKey: 'id',
			textKey: 'name',
			dataSource: [
				{"id": 1, "name": "Chai" }, { "id": 2, "name": "Chang" }, { "id": 3, "name": "Aniseed Syrup"}, { "id": 4, "name": "Chef Cajun Seasoning" },
				{ "id": 5, "name": "Chef Gumbo Mix" }, { "id": 6, "name": "Grandma Boysenberry Spread" }, { "id": 7, "name": "Uncle Bob Organic Dried Pears" }
			]
		}),
		combo = $combo.igCombo(),
		firstCondition = "startsWith",
		secondCondition = "endsWith",
		firstExpression = "c",
		secondExpression = "i",
		firstFilterLogic = "and",
		secondFilterLogic = "or";

	expectedResult.push("Chai");
	combo.igCombo("filterByExpressions", [{cond: firstCondition, expr: firstExpression, logic: firstFilterLogic},
		{cond: secondCondition, expr: secondExpression, logic: secondFilterLogic}]);

	filteredItems = combo.igCombo("filteredItems");

	assert.strictEqual(filteredItems.length, expectedResult.length, "The number of filtered items is not correct!")

	filteredItems.forEach(function(element) {
		assert.equal(expectedResult.contains(element.data.name), true, "There is an incorrect filtered item!");
	});

	expectedResult = [];

	// Change some filter settings
	firstExpression = "chef";
	secondCondition = "contains";
	secondExpression = "spread";
	firstFilterLogic = "or"; 

	combo.igCombo("filterByExpressions", [{cond: firstCondition, expr: firstExpression, logic: firstFilterLogic},
		{cond: secondCondition, expr: secondExpression, logic: secondFilterLogic}]);

	// Get filtered items
	filteredItems = combo.igCombo("filteredItems");

	expectedResult.push("Chef Cajun Seasoning", "Chef Gumbo Mix", "Grandma Boysenberry Spread");

	assert.strictEqual(filteredItems.length, expectedResult.length, "The number of filtered items is not correct!");

	filteredItems.forEach(function(element) {
		assert.equal(expectedResult.contains(element.data.name), true, "There is an incorrect filtered item!");
	})
});
