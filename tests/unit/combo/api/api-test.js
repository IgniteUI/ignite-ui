QUnit.module("igCombo API unit tests", {
	divTag: '<div></div>',
	dataSource1: [
		{ ID: 1, Name: "John", IsFemale: false },
		{ ID: 2, Name: "Mary", IsFemale: true },
		{ ID: 3, Name: "Bob", IsFemale: false }],
	dataSource2: [
		{ ID: 1, Name: "John" },
		{ ID: 2, Name: "Mary" },
		{ ID: 3, Name: "Bob" },
		{ ID: 4, Name: "Tom" },
		{ ID: 5, Name: "Stewerd" },
		{ ID: 6, Name: "David" },
		{ ID: 7, Name: "Anna" },
		{ ID: 7, Name: "Hana" },
		{ ID: 8, Name: "Betty" },
		{ ID: 9, Name: "Scott" },
		{ ID: 10, Name: "Jason" }],
	dataSource3: [
		{ ID: 1, Name: "John" },
		{ ID: 2, Name: "Mary" },
		{ ID: 3, Name: "Bob" },
		{ ID: 4, Name: "Jack" },
		{ ID: 5, Name: "Dean" },
		{ ID: 6, Name: "RIchard" },
		{ ID: 7, Name: "Abraham" },
		{ ID: 8, Name: "Bobby" },
		{ ID: 9, Name: "Dick" },
		{ ID: 10, Name: "Debby" },
		{ ID: 11, Name: "Jacky" },
		{ ID: 12, Name: "Zuzi" }],
	dataSource4: [
		{ ID: 1, Name: "John Smith", Age: 45 },
		{ ID: 2, Name: "Mary Johnson", Age: 32 },
		{ ID: 3, Name: "Bob Ferguson", Age: 27 }],
	dataSource5: [
		{ ID: 0, Name: "John", Age: 45, ModifiedDate: "1/1/2000" },
		{ ID: 1, Name: "Chai", Age: 32, ModifiedDate: new Date(1309467600000) },
		{ ID: 2, Name: "Chang", Age: 32, ModifiedDate: "/Date(1078992096827)/" },
		{ ID: 5, Name: "3", Age: 32, ModifiedDate: "\/Date(1078992096827)\/" },
		{ ID: 4, Name: "test dsf", Age: 32, ModifiedDate: "\/Date(1078992096827)\/" },
		{ ID: 3, Name: "Bob ", Age: 27, ModifiedDate: "\/Date(1078992096827)\/" }],
	dataSource6: [
		{ "ID": 0, "Name": "", "Age": 0, "Country": "", "SEQ": 0 },
		{ "ID": 1, "Name": "John Doe", "Age": 23, "Country": "US", "SEQ": 1 },
		{ "ID": 2, "Name": "Jane Doe", "Age": 21, "Country": "US", "SEQ": 2 },
		{ "ID": 3, "Name": "Mark Plier", "Age": 31, "Country": "CA", "SEQ": 3 },
		{ "ID": 4, "Name": "Donny Hall", "Age": 33, "Country": "CA", "SEQ": 4 },
		{ "ID": 5, "Name": "Guido Van Rosum", "Age": 45, "Country": "NL", "SEQ": 5 },
		{ "ID": 6, "Name": "Sarah Sharp", "Age": 19, "Country": "UK", "SEQ": 6 }],
	programmingLanguagesDataSource: [
		{ 'ID': 1, 'Name': 'C#', 'Type': 'Compiled', 'Paradigm': 'Multi' },
		{ 'ID': 2, 'Name': 'C++', 'Type': 'Compiled', 'Paradigm': 'Multi' },
		{ 'ID': 3, 'Name': 'Javascript', 'Type': 'Scripting', 'Paradigm': 'Multi' },
		{ 'ID': 4, 'Name': 'Python', 'Type': 'Scripting', 'Paradigm': 'Multi' },
		{ 'ID': 5, 'Name': 'F#', 'Type': 'Compiled', 'Paradigm': 'Functional' },
		{ 'ID': 6, 'Name': 'Haskell', 'Type': 'Compiled', 'Paradigm': 'Functional' }],
	productDataSource: [
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

QUnit.test('[ID1] Default value of enable clear button', function (assert) {
	assert.expect(1);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-multiSelectionEnabled" }),
		enableClearButtonValue;

	$combo.igCombo({
		dataSource: this.dataSource1,
		textKey: 'Name',
		valueKey: 'ID',
		animationShowDuration: 0,
		animationHideDuration: 0,
		mode: 'dropdown',
		multiSelection: {
			enabled: true
		}
	});

	enableClearButtonValue = $combo.igCombo('option', 'enableClearButton');
	assert.ok(enableClearButtonValue, 'Enable clear button value is incorrect');
});

QUnit.test('[ID2] Different mode, LOD, textKey', function (assert) {
	assert.expect(3);

	var $firstCombo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-modeLOD" }),
		$secondCombo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-textKey" }),
		lod, comboMode, isValidMode, isValidPageSize, firstComboOptions, secondComboOptions, hasTextKey,
		defaultPageSize = 5;

	$firstCombo.igCombo({
		dataSource: this.dataSource1,
		textKey: 'Name',
		valueKey: 'ID',
		mode: 'test',
		loadOnDemandSettings: {
			enabled: true,
			pageSize: 4
		}
	});

	firstComboOptions = $firstCombo.igCombo('option');
	lod = firstComboOptions.loadOnDemandSettings;
	comboMode = firstComboOptions.mode;

	isValidMode = (comboMode !== 'editable' &&
		comboMode !== 'dropdown' &&
		comboMode !== 'readonly' &&
		comboMode !== 'readonlylist') ? false : true;

	isValidPageSize = (lod && lod.enabled && lod.pageSize &&
		firstComboOptions.loadOnDemandSettings.pageSize < 5) ? true : false;

	// Check combo mode and page size
	assert.ok(isValidMode, 'Combo mode doesn`t exist');
	assert.strictEqual(isValidPageSize, false, "Invalid pageSize");

	// Missing textKey
	$secondCombo.igCombo({
		dataSource: this.dataSource1,
		valueKey: 'ID'
	});

	secondComboOptions = $secondCombo.igCombo('option');
	hasTextKey = ((!secondComboOptions.textKey) && (secondComboOptions.valueKey)) ? true : false;

	assert.strictEqual(hasTextKey, false, 'Missing textKey');
});

QUnit.test('[ID3] Null pageSize', function (assert) {
	assert.expect(1);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-nullPageSize" }),
		lod, comboOptions, invalidPageSize,
		expVisibleItemCount = 10;

	$combo.igCombo({
		dataSource: this.dataSource2,
		textKey: 'Name',
		valueKey: 'ID',
		visibleItemsCount: expVisibleItemCount,
		loadOnDemandSettings: {
			enabled: true,
			pageSize: null
		}
	});

	lod = $combo.igCombo('option', 'loadOnDemandSettings');
	comboOptions = $combo.igCombo('option');
	invalidPageSize = (lod && lod.enabled &&
		(lod.pageSize === expVisibleItemCount + 1)) ? true : false;

	assert.ok(invalidPageSize, 'Invalid pageSize');
});

QUnit.test('[ID4] Combo disable option', function (assert) {
	assert.expect(9);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-disabledOption" });
	$combo.igCombo({
		dataSource: this.dataSource1,
		textKey: 'Name',
		valueKey: 'ID',
		disabled: true
	});

	var $input = $combo.igCombo("textInput");
	assert.ok($combo.hasClass("ui-state-disabled"), "Combo does not have ui-state-disabled class applied");
	assert.ok($combo.hasClass("ui-igCombo-disabled"), "Combo does not have ui-igCombo-disabled class applied");
	assert.strictEqual($input.attr("disabled"), "disabled", "Disabled attribute was not applied");

	// Enabling again the combo through the options
	$combo.igCombo("option", "disabled", false);
	assert.notOk($combo.hasClass("ui-state-disabled"), "Combo has ui-state-disabled class applied");
	assert.notOk($combo.hasClass("ui-igCombo-disabled"), "Combo has ui-igCombo-disabled class applied");
	assert.strictEqual($input.attr("readonly"), undefined, "Readonly attribute is applied");

	// Disabling the combo through the options
	$combo.igCombo("option", "disabled", true);
	assert.ok($combo.hasClass("ui-state-disabled"), "Combo does not have ui-state-disabled class applied");
	assert.ok($combo.hasClass("ui-igCombo-disabled"), "Combo does not have ui-igCombo-disabled class applied");
	assert.strictEqual($input.attr("disabled"), "disabled", "Disabled attribute was not applied");
});

QUnit.test('[ID5] Enable checkboxes', function (assert) {
	assert.expect(9);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-enableCheckboxes" });
	$combo.igCombo({
		dataSource: this.dataSource1,
		textKey: 'Name',
		valueKey: 'ID',
		dropDownAttachedToBody: false,
		multiSelection: {
			enabled: true,
			showCheckboxes: true
		}
	});

	var $listItems = $combo.igCombo("listItems");

	// Check if checkbox styles are applied to the elements li > span, li > span > span and li > div
	for (var i = 0; i < $listItems.length; i++) {
		var $item = $listItems.eq(i);

		//If .find() returns 1 classes are applied, otherwise they are not
		assert.strictEqual($item.find("span.ui-igcombo-checkbox.ui-state-default.ui-corner-all.ui-igcheckbox-small").length, 1, "Combo list item[" + i + "] first span does not have ui-igcombo-checkbox ui-state-default ui-corner-all ui-igcheckbox-small classes applied");
		assert.strictEqual($item.find("span.ui-icon.ui-igcombo-checkbox-off.ui-igcheckbox-small-off").length, 1, "Combo list item[" + i + "] second nested span does not have ui-icon ui-igcombo-checkbox-off ui-igcheckbox-small-off applied");
		assert.strictEqual($item.find("div.ui-igcombo-listitemtextwithcheckbox").length, 1, "Combo list item[" + i + "] div element does not have ui-igcombo-listitemtextwithcheckbox class applied");
	}
});

QUnit.test('[ID6] Header/footer templates', function (assert) {
	assert.expect(8);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-header-footer" }),
		$dropDown, $header, $footer, headerOffsetTop, footerOffsetTop, footerExpOffsetTop;

	$combo.igCombo({
		dataSource: localData,
		textKey: 'name',
		valueKey: 'id',
		headerTemplate: 'Header',
		footerTemplate: 'Footer',
		animationDuration: 0,
		closeDropDownOnBlur: false,
		dropDownOrientation: 'bottom'
	});

	$combo.igCombo('openDropDown');

	$dropDown = $combo.igCombo('dropDown');
	$list = $combo.igCombo('list');

	// Header
	$header = $dropDown.children('.ui-igcombo-header');
	headerOffsetTop = $header.igOffset().top - $dropDown.igOffset().top;

	// Adding tolerance for inconsistencies between the running engine and real browsers
	assert.ok($header.outerHeight() - 3 <= 21 && $header.outerHeight() + 3 >= 21, 21, 'Header height did not match')
	//strictEqual($header.outerHeight(), 21, 'Header height did not match');
	assert.strictEqual(headerOffsetTop, 0, 'Header top position did not match');

	// Footer
	$footer = $dropDown.children('.ui-igcombo-footer');
	footerOffsetTop = $footer.igOffset().top - $dropDown.igOffset().top;
	footerExpOffsetTop = $header.outerHeight() + $list.outerHeight();

	// Adding tolerance for inconsistencies between the running engine and real browsers
	assert.ok($footer.outerHeight() - 3 <= 21 && $footer.outerHeight() + 3 >= 21, 21, 'Footer height did not match')
	//strictEqual($footer.outerHeight(), 21, 'Footer height did not match');
	assert.strictEqual(footerOffsetTop, footerExpOffsetTop, 'Footer top position did not match');

	// Scroll the drop down
	$list.scrollTop(200);

	// Header after scrolling
	// Adding tolerance for inconsistencies between the running engine and real browsers
	assert.ok($header.outerHeight() - 3 <= 21 && $header.outerHeight() + 3 >= 21, 21, 'Header height did not match')
	//strictEqual($header.outerHeight(), 21, 'Header height did not match');
	assert.strictEqual(headerOffsetTop, 0, 'Header top position did not match');

	// Footer after scrolling
	// Adding tolerance for inconsistencies between the running engine and real browsers
	assert.ok($footer.outerHeight() - 3 <= 21 && $footer.outerHeight() + 3 >= 21, 21, 'Footer height did not match')
	//strictEqual($footer.outerHeight(), 21, 'Footer height did not match');
	assert.strictEqual(footerOffsetTop, footerExpOffsetTop, 'Footer top position did not match');
	$combo.igCombo('closeDropDown');
});

QUnit.test('[ID7] Specify inputName', function (assert) {
	assert.expect(1);

	var $comboWrapper = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-inputName" });
	$comboWrapper.igCombo({
		dataSource: this.dataSource1,
		textKey: 'Name',
		valueKey: 'ID',
		inputName: 'combo-hidden-name'
	});

	var $hiddenInput = $('#combo-inputName input.ui-igcombo-hidden-field');
	assert.equal($hiddenInput.attr("name"), "combo-hidden-name", "The inputName setting was not applied to the hidden input");
});

QUnit.test('[ID8] Specify inputName with element name set', function (assert) {
	assert.expect(1);

	var $comboWrapper = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-inputName-element-name" });
	$comboWrapper.igCombo({
		dataSource: this.dataSource1,
		textKey: 'Name',
		valueKey: 'ID',
		inputName: 'new-input-name'
	});

	var inputName = $comboWrapper.igCombo('option', 'inputName');
	assert.equal(inputName, "new-input-name", "The element name attribute overwrote the inputName option");
});

QUnit.test('[ID9] Set inputName to null', function (assert) {
	assert.expect(1);

	var $comboWrapper = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-null-inputName" });
	$comboWrapper.igCombo({
		dataSource: this.dataSource1,
		textKey: 'Name',
		valueKey: 'ID',
		inputName: null
	});

	var inputName = $comboWrapper.igCombo('option', 'inputName');
	assert.equal(inputName, null, "The inputName setting was not set to null");
});
/*
// Set noMatchFoundText
test(testId_10, function () {
	var $comboWrapper = $('#combo-noMatchFoundText'),
		dataSource = [{ ID: 1, Name: "John" },
			{ ID: 2, Name: "Mary" },
			{ ID: 3, Name: "Bob" }],
		noMatchFoundText;

	$comboWrapper.igCombo({
		dataSource: dataSource,
		textKey: 'Name',
		valueKey: 'ID',
		noMatchFoundText: 'No matches'
	});

	noMatchFoundText = $comboWrapper.igCombo('option', 'noMatchFoundText');
	equal(noMatchFoundText, 'No matches', 'The noMatchFoundText was not properly applied');
});

// Use default value of noMatchFoundText
test(testId_11, function () {
	var $comboWrapper = $('#combo-null-noMatchFoundText'),
		dataSource = [{ ID: 1, Name: "John" },
			{ ID: 2, Name: "Mary" },
			{ ID: 3, Name: "Bob" }],
		noMatchFoundText;

	$comboWrapper.igCombo({
		dataSource: dataSource,
		textKey: 'Name',
		valueKey: 'ID'
	});

	noMatchFoundText = $comboWrapper.igCombo('option', 'noMatchFoundText');
	equal(noMatchFoundText, 'No matches found', 'The noMatchFoundText default value was not properly applied');
});

// Use noMatchFoundText of locale settings
test(testId_12, function () {
	var $comboWrapper = $('#combo-locale-noMatchFoundText'),
		dataSource = [{ ID: 1, Name: "John" },
			{ ID: 2, Name: "Mary" },
			{ ID: 3, Name: "Bob" }],
		noMatchFoundText,
		locale = $.ig.Combo.locale;

	$.ig.Combo.locale = {
		noMatchFoundText: 'No Results locale test'
	};

	$comboWrapper.igCombo({
		dataSource: dataSource,
		textKey: 'Name',
		valueKey: 'ID'
	});

	noMatchFoundText = $comboWrapper.igCombo('option', 'noMatchFoundText');
	equal(noMatchFoundText, 'No Results locale test', 'The locale noMatchFoundText was not applied');

	$.ig.Combo.locale = locale;
});

// Override locale noMatchFoundText
test(testId_13, function () {
	var $comboWrapper = $('#combo-override-locale-noMatchFoundText'),
		dataSource = [{ ID: 1, Name: "John" },
			{ ID: 2, Name: "Mary" },
			{ ID: 3, Name: "Bob" }],
		noMatchFoundText,
		locale = $.ig.Combo.locale;

	$.ig.Combo.locale = {
		noMatchFoundText: 'No Results locale test'
	};

	$comboWrapper.igCombo({
		dataSource: dataSource,
		textKey: 'Name',
		valueKey: 'ID',
		noMatchFoundText: 'Matches not found'
	});

	noMatchFoundText = $comboWrapper.igCombo('option', 'noMatchFoundText');
	equal(noMatchFoundText, 'Matches not found', 'The locale noMatchFoundText was not overridden');

	$.ig.Combo.locale = locale;
});

// Set placeHolder
test(testId_14, function () {
	var $comboWrapper = $('#combo-placeHolder'),
		dataSource = [{ ID: 1, Name: "John" },
			{ ID: 2, Name: "Mary" },
			{ ID: 3, Name: "Bob" }],
		placeHolder;

	$comboWrapper.igCombo({
		dataSource: dataSource,
		textKey: 'Name',
		valueKey: 'ID',
		placeHolder: 'Select value'
	});

	placeHolder = $comboWrapper.igCombo('option', 'placeHolder');
	equal(placeHolder, 'Select value', 'The placeHolder was not properly applied');
});

// Use default value of placeHolder
test(testId_15, function () {
	var $comboWrapper = $('#combo-null-placeHolder'),
		dataSource = [{ ID: 1, Name: "John" },
			{ ID: 2, Name: "Mary" },
			{ ID: 3, Name: "Bob" }],
		placeHolder;

	$comboWrapper.igCombo({
		dataSource: dataSource,
		textKey: 'Name',
		valueKey: 'ID'
	});

	placeHolder = $comboWrapper.igCombo('option', 'placeHolder');
	equal(placeHolder, 'select...', 'The placeHolder default value was not properly applied');
});

// Use locale setting for placeHolder
test(testId_16, function () {
	var $comboWrapper = $('#combo-locale-placeHolder'),
		dataSource = [{ ID: 1, Name: "John" },
			{ ID: 2, Name: "Mary" },
			{ ID: 3, Name: "Bob" }],
		placeHolder,
		locale = $.ig.Combo.locale;

	$.ig.Combo.locale = {
		placeHolder: 'Please select...'
	};

	$comboWrapper.igCombo({
		dataSource: dataSource,
		textKey: 'Name',
		valueKey: 'ID'
	});

	placeHolder = $comboWrapper.igCombo('option', 'placeHolder');
	equal(placeHolder, 'Please select...', 'The locale placeHolder was not applied');

	$.ig.Combo.locale = locale;
});

// Override locale setting of placeHolder
test(testId_17, function () {
	var $comboWrapper = $('#combo-override-locale-placeHolder'),
		dataSource = [{ ID: 1, Name: "John" },
			{ ID: 2, Name: "Mary" },
			{ ID: 3, Name: "Bob" }],
		placeHolder,
		locale = $.ig.Combo.locale;

	$.ig.Combo.locale = {
		placeHolder: 'Please select...'
	};

	$comboWrapper.igCombo({
		dataSource: dataSource,
		textKey: 'Name',
		valueKey: 'ID',
		placeHolder: 'Select!'
	});

	placeHolder = $comboWrapper.igCombo('option', 'placeHolder');
	equal(placeHolder, 'Select!', 'The locale placeHolder was not overridden');

	$.ig.Combo.locale = locale;
});
*/

QUnit.test('[ID18] Use default value of textKey when data items do not have their own properties', function (assert) {
	assert.expect(1);

	var $comboWrapper = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-no-TextKey-prototype" }),
		list,
		textKey;

	function testObj() {
	}

	testObj.prototype.key = 5;

	list = [new testObj()];

	$comboWrapper.igCombo({
		dataSource: list
	});

	textKey = $comboWrapper.igCombo('option', 'textKey');
	assert.equal(textKey, 'text', 'Default value of textKey was not used');
});

QUnit.test('[ID19] DropDownOrientation auto', function (assert) {
	assert.expect(2);

	var $comboWrapper = $.ig.TestUtil.appendToFixture('<div class="cont"><div id="combo-dropdown-orientation-with-templates"></div></div>'),
		offset, dropDownExpPosTop = 184, dropDownExpPosBottom = 307, dropDownExpPosLeft = 250,
		cssClassOrientaitonBottom = "ui-igcombo-orientation-bottom",
		cssClassOrientaitonTop = "ui-igcombo-orientation-top",
		cssOptionsBottom = {
			position: "absolute",
			top: "200px",
			left: "250px"
		},
		cssOptionsTop = {
			position: "absolute",
			top: "500px",
			left: "250px"
		};

	$comboWrapper.igCombo({
		dataSource: this.dataSource3,
		textKey: "Name",
		valueKey: "ID",
		headerTemplate: "<div><b>Header template</b></div>",
		footerTemplate: "<div><b>Footer template</b></div>",
		animationShowDuration: 0,
		animationHideDuration: 0,
		closeDropDownOnBlur: false,
		dropDownAttachedToBody: false
	});

	// Apply style for 'bottom' drop down orientation
	$($comboWrapper.parent()[0]).css(cssOptionsBottom);
	$comboWrapper.igCombo("openDropDown");
	// The combo should open to the bottom
	assert.ok($comboWrapper.find(".ui-igcombo-dropdown").hasClass(cssClassOrientaitonBottom), 'Drop down opened to the bottom');

	// And should be at position:
	offset = $comboWrapper.find(".ui-igcombo-dropdown").igOffset();
	//ok((offset.top - 50 <= dropDownExpPosBottom && offset.top + 50 >= dropDownExpPosBottom) && (offset.left - 50 <= dropDownExpPosLeft && offset.left + 50 >= dropDownExpPosLeft), 'Drop down opened at the expected position');

	$comboWrapper.igCombo("closeDropDown");

	// Apply style for 'top' drop down orientation
	var container = $('.cont');
	container.css(cssOptionsTop);
	$comboWrapper.igCombo("openDropDown");

	// The combo should open to the bottom
	assert.ok($comboWrapper.find(".ui-igcombo-dropdown").hasClass(cssClassOrientaitonTop), 'Drop down opened to the top');

	// And should be at position:
	offset = $comboWrapper.find(".ui-igcombo-dropdown").igOffset();
	//ok((offset.top - 50 <= dropDownExpPosTop && offset.top + 50 >= dropDownExpPosTop) && (offset.left - 50 <= dropDownExpPosLeft && offset.left + 50 >= dropDownExpPosLeft), 'Drop down opened at the expected position');
});

QUnit.test('[ID20] DropDownOrientation bottom', function (assert) {
	assert.expect(1);

	var $comboWrapper = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-dropdown-orientation-with-templates-bottom" }),
		cssClassOrientaitonBottom = "ui-igcombo-orientation-bottom",
		cssOptions = {
			position: "absolute",
			top: "250px",
			left: "550px"
		};

	$comboWrapper.igCombo({
		dataSource: this.dataSource1,
		textKey: "Name",
		valueKey: "ID",
		headerTemplate: "<div><b>Header template</b></div>",
		footerTemplate: "<div><b>Footer template</b></div>",
		animationShowDuration: 0,
		animationHideDuration: 0,
		closeDropDownOnBlur: false,
		dropDownAttachedToBody: false
	});

	// Apply style for centered combo, this means that combo can be opened to both top and bottom directions.
	// Although it should open to the bottom.
	$($comboWrapper.parent()[0]).css(cssOptions);
	$comboWrapper.igCombo("openDropDown");

	// The combo should open to bottom
	assert.ok($comboWrapper.find(".ui-igcombo-dropdown").hasClass(cssClassOrientaitonBottom), 'Drop down opened to the bottom and not to the top');
});

QUnit.test('[ID21] DropDown orientation set from options', function (assert) {
	assert.expect(2);

	var $comboWrapper = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-dropdown-orientation" }),
		cssClassOrientaitonBottom = "ui-igcombo-orientation-bottom",
		cssClassOrientaitonTop = "ui-igcombo-orientation-top";

	$comboWrapper.igCombo({
		dataSource: this.dataSource1,
		textKey: "Name",
		valueKey: "ID",
		animationShowDuration: 0,
		animationHideDuration: 0,
		dropDownAttachedToBody: false,
		dropDownOrientation: "top"
	});

	$comboWrapper.igCombo("openDropDown");

	// Check 'top' drop down orientation
	assert.ok($comboWrapper.find(".ui-igcombo-dropdown").hasClass(cssClassOrientaitonTop), 'Drop down is correctly opened to the top');

	// Set 'bottom' drop down orientation
	$comboWrapper.igCombo("option", "dropDownOrientation", "bottom");

	// Recalculate the drop down orientation by close and open the drop down again
	$comboWrapper.igCombo("closeDropDown");
	$comboWrapper.igCombo("openDropDown");

	// Check 'bottom' drop down orientation
	assert.ok($comboWrapper.find(".ui-igcombo-dropdown").hasClass(cssClassOrientaitonBottom), 'Drop down is correctly opened to the bottom');
});

QUnit.test('[ID22] Allow custom values with default configuration', function (assert) {
	assert.expect(16);

	var $comboWrapper = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-json-ds" }),
		i, ds,
		$hiddenInput,
		$input,
		expSchema = [{
			name: 'ID',
			type: 'number'
		}, {
			name: 'Name',
			type: 'string'
		}, {
			name: 'Age',
			type: 'number'
		}];
	$comboWrapper.igCombo({
		dataSource: this.dataSource4,
		textKey: 'Name',
		valueKey: 'ID',
		animationShowDuration: 0,
		animationHideDuration: 0,
		allowCustomValue: true
	});
	$input = $comboWrapper.igCombo("textInput");
	$hiddenInput = $comboWrapper.igCombo("valueInput");
	$input.click();
	$.ig.TestUtil.type("a", $input); 
	$comboWrapper.igCombo("refreshValue");
	assert.equal($input.val(), "a", "The value of the input is not the input 'a'");
	assert.equal($hiddenInput.val(), "a", "The value of the hidden input is not the input 'a'");
	assert.equal($comboWrapper.igCombo("text"), "a", "The text API didn't return the correct value.");
	assert.equal($comboWrapper.igCombo("value"), "a", "The value API didn't return the correct value.");
	$comboWrapper.igCombo("value", "ab");
	assert.equal($input.val(), "ab", "The value of the input is not the input 'ab' after using the value setter");
	assert.equal($hiddenInput.val(), "ab", "The value of the hidden input is not the input 'ab' after using the value setter");
	assert.equal($comboWrapper.igCombo("text"), "ab", "The text API didn't return the correct value.");
	assert.equal($comboWrapper.igCombo("value"), "ab", "The value API didn't return the correct value.");
	$comboWrapper.igCombo("text", "abc");
	assert.equal($input.val(), "abc", "The value of the input is not the input 'ab' after using the text setter");
	assert.equal($hiddenInput.val(), "ab", "The value of the hidden input is not the input 'ab' after using the text setter");
	assert.equal($comboWrapper.igCombo("text"), "abc", "The text API didn't return the correct value.");
	assert.equal($comboWrapper.igCombo("value"), "ab", "The value API didn't return the correct value.");
	$comboWrapper.igCombo("clearInput");
	assert.equal($input.val(), "", "The value of the input is not the input 'ab' after using the text setter");
	assert.equal($hiddenInput.val(), "", "The value of the hidden input is not the input 'ab' after using the text setter");
	assert.equal($comboWrapper.igCombo("text"), "", "The text API didn't return the correct value.");
	assert.equal($comboWrapper.igCombo("value"), "", "The value API didn't return the correct value.");
	$comboWrapper.igCombo("destroy");
});

QUnit.test('[ID23] _setOption branching tests', function (assert) {
	assert.expect(18);

	var $comboWrapper = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-option-branch" });
	$comboWrapper.igCombo({
		dataSource: this.dataSource6,
		virtualization: false,
		filteringType: "local",
		placeHolder: '',
		valueKey: "ID",
		textKey: "Name",
		width: '370px',
		grouping: {
			key: 'Country',
			dir: 'asc'
		},
		multiSelection: {
			enabled: true,
		}
	});

	// igCombo options that throw errors during set
	assert.throws(
		function () { $comboWrapper.igCombo('option', 'virtualization', true); },
		$.ig.Combo.locale.notSupported,
		"Setting 'virtualization; on initialized combo throws error"
	);
	assert.throws(
		function () { $comboWrapper.igCombo('option', 'mode', 'readOnly'); },
		$.ig.Combo.locale.notSupported,
		"Setting 'mode' on initialized combo throws error"
	);
	assert.throws(
		function () { $comboWrapper.igCombo('option', 'dropDownAttachedToBody', false); },
		$.ig.Combo.locale.notSupported,
		"Setting 'dropDownAttachedToBody' on initialized combo throws error"
	);
	assert.throws(
		function () { $comboWrapper.igCombo('option', 'format', false); },
		$.ig.Combo.locale.notSupported,
		"Setting 'format' on initialized combo throws error"
	);

	// Testing set/get options

	$comboWrapper.igCombo('option', 'width', 400);
	$comboWrapper.igCombo('option', 'height', 35);

	assert.equal($comboWrapper.igCombo('option', 'width'), '400', 'width matching');
	assert.equal($comboWrapper.igCombo('option', 'height'), '35', 'height matching');

	$comboWrapper.igCombo('option', 'dropDownButtonTitle', 'Drop down button');
	assert.strictEqual($comboWrapper.igCombo('option', 'dropDownButtonTitle'), 'Drop down button', 'Drop down title matches');

	$comboWrapper.igCombo('option', 'inputName', 'newHiddenInputName');
	assert.strictEqual($comboWrapper.igCombo('option', 'inputName'), 'newHiddenInputName', 'New input name attribute matches');

	$comboWrapper.igCombo('option', 'multiSelection.enabled', false);
	assert.strictEqual($comboWrapper.igCombo('option', 'multiSelection.enabled'), false, 'multiSelection option disabled');

	$comboWrapper.igCombo("option", 'placeHolder', 'Testing placeHolder option');
	assert.strictEqual($comboWrapper.igCombo('option', 'placeHolder'), 'Testing placeHolder option', 'placeHolder option matches');

	$comboWrapper.igCombo("option", 'visibleItemsCount', 3);
	assert.strictEqual($comboWrapper.igCombo('option', 'visibleItemsCount'), 3, 'visibleItemsCount matches');

	$comboWrapper.igCombo('option', 'tabIndex', 1);
	assert.strictEqual($comboWrapper.igCombo('option', 'tabIndex'), 1, 'tabIndex matches');

	$comboWrapper.igCombo('option', 'clearButtonTitle', 'Clear button');
	assert.strictEqual($comboWrapper.igCombo('option', 'clearButtonTitle'), 'Clear button', 'clearButtonTitle matches');

	$comboWrapper.igCombo('option', 'textKey', 'Age');
	assert.strictEqual($comboWrapper.igCombo('option', 'textKey'), 'Age', 'Changing textKey matches');
	$comboWrapper.igCombo('option', 'textKey', 'Name');

	$comboWrapper.igCombo('option', 'valueKey', 'SEQ');
	assert.strictEqual($comboWrapper.igCombo('option', 'valueKey'), 'SEQ', 'Changing valueKey matches');

	$comboWrapper.igCombo('option', 'dropDownWidth', $comboWrapper.igCombo('option', 'width'));
	assert.strictEqual($comboWrapper.igCombo('option', 'dropDownWidth'), $comboWrapper.igCombo('option', 'width'), 'dropDownWidth matches');

	$comboWrapper.igCombo('value', 0);
	assert.equal($comboWrapper.igCombo('valueInput').attr('placeholder'), undefined, 'No placeholder when an empty input value is selected');
	$comboWrapper.igCombo('deselectAll');
	$comboWrapper.igCombo('clearInput');

	var newDataSource = [
		{ "ID": 0, "Name": "", "Age": 0, "SEQ": 0 },
		{ "ID": 1, "Name": "John Doe", "Age": 23, "SEQ": 1 },
	];
	// Invalid grouping key in dataSource
	assert.throws(
		function () { $comboWrapper.igCombo('option', 'dataSource', newDataSource); },
		new Error($.ig.Combo.locale.errorIncorrectGroupingKey),
		"Invalid dataSource with missing group key throws error"
	);
});

QUnit.test('[ID24] LTR testing', function (assert) {
	assert.expect(7);

	var $comboWrapper = $.ig.TestUtil.appendToFixture(this.divTag, { id: "ltr-testing" }),
		done = assert.async(),
		self = this,
		$input,
		$listItemsDiv, $items;
	$comboWrapper.igCombo({
		animationShowDuration: 0,
		animationHideDuration: 0,
		delayInputChangeProcessing: 0,
		dataSource: this.programmingLanguagesDataSource,
		footerTemplate: "<div class='dropDownFooterClass'><strong><em>Total: {0} out of {1}</em></strong></div>",
		headerTemplate: "<div class='dropDownHeaderClass'><em>Available languages</em></div>",
		itemTemplate: "<span class='language_class'>${Name} - ${Paradigm}</span>",
		grouping: {
			key: "Type",
			dir: "asc"
		},
		multiSelection: {
			enabled: true,
			itemSeparator: ';'
		},
		placeHolder: "Select language",
		filteringCondition: 'startsWith',
		filteringType: 'local',
		textKey: "Name",
		valueKey: "ID",
		visibleItemsCount: 10,
		width: "370px",
		height: "25px"
	});
	$input = $comboWrapper.find('.ui-igcombo-field');

	$.ig.TestUtil.type("py", $input);
	$.ig.TestUtil.wait(100).then(function () {
		$listItemsDiv = $comboWrapper.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden');
		assert.ok($listItemsDiv.height() > 0, 'List items list should be visible after typing in input');
		assert.ok($items.eq(0).hasClass('ui-igcombo-group-header'), 'Header template rendered');
		assert.ok($items.eq(1).hasClass('ui-igcombo-item-in-focus'), 'First mathing item should be focused');
		$.ig.TestUtil.keyInteraction(13, $input); // press enter key
		assert.ok($input.val() === 'Python', 'Select value matches');
		$.ig.TestUtil.keyInteraction(38, $input); // press up arrow
		$.ig.TestUtil.keyInteraction(13, $input); // press enter key
		$.ig.TestUtil.keyInteraction(27, $input); // press esc key
		$.ig.TestUtil.keyInteraction(40, $input); // press down arrow
		assert.ok($comboWrapper.igCombo('dropDown').height() > 0, 'Dropdown is left opened');
		$.ig.TestUtil.keyInteraction(38, $input, 'altKey'); // press shift + up arrow 
		return $.ig.TestUtil.wait(300);
	}).then(function () {
		assert.ok($comboWrapper.igCombo('dropDown').height() === 0, 'Dropdown is closed');
		self.programmingLanguagesDataSource = self.programmingLanguagesDataSource.concat([
			{ 'ID': 7, 'Name': 'Perl', 'Type': 'Scripting', "Paradigm": 'Multi' },
			{ 'ID': 8, 'Name': 'Java', 'Type': 'Compiled', 'Paradigm': 'Object-oriented' },
			{ 'ID': 9, 'Name': 'Lisp', 'Type': 'Compiled/Scripting', 'Paradigm': 'Functional' }
		]);
		$comboWrapper.igCombo('option', 'dataSource', self.programmingLanguagesDataSource);
		$listItemsDiv = $comboWrapper.igCombo('dropDown');
		$items = $listItemsDiv.find('li').not('.ui-helper-hidden').not('.ui-igcombo-group-header');
		assert.strictEqual($items.length, self.programmingLanguagesDataSource.length, 'Number of items matches');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID25] Header/Footer Getters/Setters', function (assert) {
	assert.expect(12);

	var $comboWrapper = $.ig.TestUtil.appendToFixture(this.divTag, { id: "header-footer-setters" }),
		$header, $footer;
		
	$comboWrapper.igCombo({
		dataSource: this.dataSource6,
		headerTemplate: 'Initial Header',
		footerTemplate: 'Initial Footer',
		valueKey: "ID",
		textKey: "Name"
	});

	// Initial header/footer exist and matches
	$header = $comboWrapper.igCombo('dropDown').find('.ui-igcombo-header');
	$footer = $comboWrapper.igCombo('dropDown').find('.ui-igcombo-footer');
	assert.equal($header.length, 1, 'Initial header exists');
	assert.equal($footer.length, 1, 'Initial footer exists');
	assert.equal($header.text(), 'Initial Header', 'Initial header matches');
	assert.equal($footer.text(), 'Initial Footer', 'Initial footer matches');

	$comboWrapper.igCombo('destroy');

	$comboWrapper.igCombo({
		dataSource: this.dataSource6,
		valueKey: "ID",
		textKey: "Name",
	});

	// No initial header/footer is rendered
	$header = $comboWrapper.igCombo('dropDown').find('.ui-igcombo-header');
	$footer = $comboWrapper.igCombo('dropDown').find('.ui-igcombo-footer');
	assert.equal($header.length, 0, 'No header exists');
	assert.equal($footer.length, 0, 'No footer exists');

	$comboWrapper.igCombo('option', 'headerTemplate', 'Test Header');
	$comboWrapper.igCombo('option', 'footerTemplate', 'Test Footer');

	// Setters are working when setting them with initial empty state
	$header = $comboWrapper.igCombo('dropDown').find('.ui-igcombo-header');
	$footer = $comboWrapper.igCombo('dropDown').find('.ui-igcombo-footer');
	assert.equal($header.text(), 'Test Header', 'Header exists and matches');
	assert.equal($footer.text(), 'Test Footer', 'Footer exists and matches');

	$comboWrapper.igCombo('option', 'headerTemplate', '<div>Changed Header</div>');
	$comboWrapper.igCombo('option', 'footerTemplate', '<div>Changed Footer</div>');

	$header = $comboWrapper.igCombo('dropDown').find('.ui-igcombo-header');
	$footer = $comboWrapper.igCombo('dropDown').find('.ui-igcombo-footer');
	assert.equal($header.text(), 'Changed Header', 'Header exists and matches');
	assert.equal($footer.text(), 'Changed Footer', 'Footer exists and matches');

	$comboWrapper.igCombo('option', 'footerTemplate', '<div>Total: {0} out of {1}</div>');
	$footer = $comboWrapper.igCombo('dropDown').find('.ui-igcombo-footer');
	assert.equal($footer.text(), 'Total: 7 out of 7', 'Footer records match');

	var newdata = [
		{ "ID": 0, "Name": "", "Age": 0, "Country": "", "SEQ": 0 },
		{ "ID": 1, "Name": "John Doe", "Age": 23, "Country": "US", "SEQ": 1 },
		{ "ID": 2, "Name": "Jane Doe", "Age": 21, "Country": "US", "SEQ": 2 },
		{ "ID": 3, "Name": "Mark Plier", "Age": 31, "Country": "CA", "SEQ": 3 },
		{ "ID": 4, "Name": "Donny Hall", "Age": 33, "Country": "CA", "SEQ": 4 },
		{ "ID": 5, "Name": "Guido Van Rosum", "Age": 45, "Country": "NL", "SEQ": 5 },
		{ "ID": 6, "Name": "Sarah Sharp", "Age": 19, "Country": "UK", "SEQ": 6 },
		{ "ID": 7, "Name": "Sarah Sharp1", "Age": 19, "Country": "UK", "SEQ": 7 },
		{ "ID": 8, "Name": "Sarah Sharp2", "Age": 19, "Country": "UK", "SEQ": 8 },
	];

	$comboWrapper.igCombo('option', 'dataSource', newdata);
	assert.equal($footer.text(), 'Total: 9 out of 9', 'Footer records match');
});

QUnit.test('[ID26] Change enableClearButton', function (assert) {
	assert.expect(5);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-focus-blur" }),
		$clearButton, data, selectedItems, allItems, filteredItems;
	$combo.igCombo({
		dataSource: this.productDataSource,
		valueKey: "ID",
		textKey: 'ProductName',
		enableClearButton: false,
		width: 200,
		height: 30,
		allowCustomValues: true,
		multiSelection: {
			enabled: true,
		},
		initialSelectedItems: [
			{ index: 0 },
			{ index: 1 },
			{ index: 2 }
		]
	});

	selectedItems = $combo.igCombo("selectedItems");
	assert.equal(selectedItems.length, 3, "initial selected items number is 3");

	$combo.igCombo("option", "enableClearButton", true);
	$clearButton = $combo.find(".ui-igcombo-clearicon");
	$clearButton.trigger("click");

	selectedItems = $combo.igCombo("selectedItems");
	assert.equal(selectedItems, null, "selectedItems should return null");

	$combo.igCombo("text", "Ch");
	filteredItems = $combo.igCombo("filteredItems");
	assert.equal(filteredItems.length, 4, "filtered items number should be 4");

	allItems = $combo.igCombo("items");
	assert.equal(allItems.length, this.productDataSource.length, "all items number should be 11");

	$combo.igCombo("text", "Ch");
	filteredItems = $combo.igCombo("filteredItems");
	assert.equal(filteredItems.length, 4, "filtered items number should be 4");
});

QUnit.test('[ID26] Open dropDown via API with bottom dropDownOrientation', function (assert) {
	assert.expect(2);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-open-bottom" }),
		data = [
			{ "ProductID": 318, "Name": "ML Crankarm" },
			{ "ProductID": 319, "Name": "HL Crankarm" },
			{ "ProductID": 320, "Name": "Chainring Bolts" },
			{ "ProductID": 321, "Name": "Chainring Nut" },
			{ "ProductID": 322, "Name": "Chainring" },
			{ "ProductID": 323, "Name": "Crown Race" },
			{ "ProductID": 324, "Name": "Chain Stays" },
			{ "ProductID": 325, "Name": "Decal 1" },
			{ "ProductID": 326, "Name": "Decal 2" },
			{ "ProductID": 327, "Name": "Down Tube" },
			{ "ProductID": 328, "Name": "Mountain End Caps" },
			{ "ProductID": 329, "Name": "Road End Caps" },
			{ "ProductID": 331, "Name": "Fork End" },
			{ "ProductID": 332, "Name": "Freewheel" },
			{ "ProductID": 341, "Name": "Flat Washer 1" },
			{ "ProductID": 342, "Name": "Flat Washer 6" },
			{ "ProductID": 343, "Name": "Flat Washer 2" },
			{ "ProductID": 344, "Name": "Flat Washer 9" },
			{ "ProductID": 345, "Name": "Flat Washer 4" },
			{ "ProductID": 346, "Name": "Flat Washer 3" },
			{ "ProductID": 347, "Name": "Flat Washer 8" },
			{ "ProductID": 348, "Name": "Flat Washer 5" },
			{ "ProductID": 349, "Name": "Flat Washer 7" },
			{ "ProductID": 350, "Name": "Fork Crown" },
			{ "ProductID": 351, "Name": "Front Derailleur Cage" },
			{ "ProductID": 352, "Name": "Front Derailleur Linkage" },
			{ "ProductID": 355, "Name": "Guide Pulley" },
			{ "ProductID": 357, "Name": "ML Grip Tape" },
			{ "ProductID": 358, "Name": "HL Grip Tape" },
			{ "ProductID": 359, "Name": "Thin-Jam Hex Nut 9" },
			{ "ProductID": 360, "Name": "Thin-Jam Hex Nut 10" },
			{ "ProductID": 361, "Name": "Thin-Jam Hex Nut 1" },
			{ "ProductID": 362, "Name": "Thin-Jam Hex Nut 2" },
			{ "ProductID": 363, "Name": "Thin-Jam Hex Nut 15" },
			{ "ProductID": 364, "Name": "Thin-Jam Hex Nut 16" },
			{ "ProductID": 365, "Name": "Thin-Jam Hex Nut 5" },
			{ "ProductID": 367, "Name": "Thin-Jam Hex Nut 3" },
			{ "ProductID": 369, "Name": "Thin-Jam Hex Nut 13" },
			{ "ProductID": 370, "Name": "Thin-Jam Hex Nut 14" },
			{ "ProductID": 371, "Name": "Thin-Jam Hex Nut 7" },
			{ "ProductID": 372, "Name": "Thin-Jam Hex Nut 8" },
			{ "ProductID": 373, "Name": "Thin-Jam Hex Nut 12" },
			{ "ProductID": 374, "Name": "Thin-Jam Hex Nut 11" },
			{ "ProductID": 376, "Name": "Hex Nut 6" },
			{ "ProductID": 377, "Name": "Hex Nut 16" },
			{ "ProductID": 378, "Name": "Hex Nut 17" },
			{ "ProductID": 379, "Name": "Hex Nut 7" },
			{ "ProductID": 380, "Name": "Hex Nut 8" },
			{ "ProductID": 381, "Name": "Hex Nut 9" },
			{ "ProductID": 382, "Name": "Hex Nut 22" },
			{ "ProductID": 383, "Name": "Hex Nut 23" },
			{ "ProductID": 384, "Name": "Hex Nut 12" },
			{ "ProductID": 385, "Name": "Hex Nut 13" },
			{ "ProductID": 386, "Name": "Hex Nut 1" },]

	$combo.igCombo({
		dataSource: data,
		virtualization: true,
		valueKey: "ProductID",
		textKey: 'Name',
		width: 200,
		height: 100,
		allowCustomValues: true,
		initialSelectedItems: [
			{ index: 0 },
			{ index: 1 },
			{ index: 2 }
		]
	});

	$combo.igCombo('openDropDown');
	assert.equal($combo.igCombo("dropDown").hasClass("ui-igcombo-orientation-bottom"), true, "DropDown div has class 'ui-igcombo-orientation-bottom'");
	assert.equal($combo.igCombo("dropDown").hasClass("ui-igcombo-orientation-top"), false, "DropDown div doesnt have class 'ui-igcombo-orientation-top'");
	$combo.igCombo('closeDropDown');
});

QUnit.test('[ID28] Mouse interacting', function (assert) {
	assert.expect(3);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "mouse-interactions" });
	$combo.igCombo({
		dataSource: this.productDataSource,
		valueKey: "ID",
		textKey: 'ProductName',
		mode: "editable",
		width: 200,
		height: 30,
		allowCustomValues: true,
		autoSelectFirstMatch: true,
		initialSelectedItems: [{ index: 1 }]
	});

	var $input = $combo.igCombo("textInput");
	assert.notEqual(document.activeElement, $input[0], "Input is not focused");
	$.ig.TestUtil.click($input);
	assert.equal(document.activeElement, $input[0], "Input is focused");
	$input.blur();
	$combo.igCombo("option", "disabled", true);
	$.ig.TestUtil.click($input);
	assert.notEqual(document.activeElement, $input[0], "Input is not focused");
});

QUnit.test('[ID29] Handled exceptions', function (assert) {
	assert.expect(1);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-exception" }),
		done = assert.async();
	$combo.igCombo({
		dataSource: "http://localhost/api/invoices?callback=?",
		valueKey: "CustomerID",
		textKey: "Salesperson",
		loadOnDemandSettings: { enabled: true, pageSize: 5 },
		visibleItemsCount: 4,
		responseDataKey: "d.results.Results",
		filteringType: "remote",
	});

	$.ig.TestUtil.wait(2000).then(function () {
		assert.throws(
			function () {
				$combo.igCombo("option", "grouping", { key: 'ProductNamee' });
			},
			new Error($.ig.Combo.locale.errorIncorrectGroupingKey),
			'Error("Grouping key is not correct.")'
		);
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID30] Key navigation item', function (assert) {
	assert.expect(3);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-keyNavItem" }),
		done = assert.async(),
		$listItems, $selectedItems, $dropDownButton;

	$combo.igCombo({
		dataSource: "http://localhost/api/invoices?callback=?",
		valueKey: "CustomerID",
		textKey: "Salesperson",
		responseDataKey: "d.results.Results",
		loadOnDemandSettings: { enabled: true, pageSize: 25 },
		filteringType: "remote",
		autoComplete: true,
	});

	$dropDownButton = $combo.data().igCombo._options.$dropDownBtnCont;
	$combo.igCombo("openDropDown");

	$.ig.TestUtil.wait(3000).then(function () {
		assert.equal($combo.igCombo("dropDownOpened"), true, "Combo drop down should be rendered");
		$listItems = $combo.igCombo("dropDown").find('.ui-igcombo-listitem');
		$combo.igCombo("select", $($listItems[0]));
		var dataItem = $combo.igCombo("dataForValue", 44);
		assert.equal(dataItem, null, "There is no item with value 44");
		$combo.igCombo("deselectAll");
		$selectedItems = $combo.igCombo('selectedItems');
		assert.strictEqual($selectedItems, null, 'Selected items is null');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID31] Combo remove separators', function (assert) {
	assert.expect(2);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-remove-separators" }),
		done = assert.async(),
		$input, $listItems;
	$combo.igCombo({
		dataSource: this.dataSource5,
		textKey: "Name",
		valueKey: "ID",
		filteringType: "remote",
		multiSelection: {
			enabled: true,
			itemSeparator: ', '
		}
	});

	$listItems = $combo.igCombo("items");
	$combo.igCombo("select", $combo.igCombo("items")[0].element);
	$input = $combo.igCombo("textInput");
	$combo.igCombo("openDropDown");

	$.ig.TestUtil.wait(3000).then(function () {
		assert.equal($combo.igCombo("text"), "John, ", "Text in input is correct");
		$input.blur();
		assert.equal($combo.igCombo("text"), "John", "Text in input is correct");
		$input.trigger("focus");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID32] Combo add separators', function (assert) {
	assert.expect(2);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-add-separators" }),
		done = assert.async(),
		$input, $listItems;
	$combo.igCombo({
		dataSource: this.dataSource5,
		textKey: "Name",
		valueKey: "ID",
		filteringType: "remote",
		multiSelection: {
			enabled: true,
			itemSeparator: ', '
		}
	});

	$listItems = $combo.igCombo("items");
	$combo.igCombo("select", $combo.igCombo("items")[0].element);
	$input = $combo.igCombo("textInput");
	assert.equal($combo.igCombo("text"), "John", "Text in input is correct");
	$input.trigger("focus");
	$input.click();

	$.ig.TestUtil.wait(3000).then(function () {
		assert.equal($combo.igCombo("text"), "John, ", "Text in input is correct");
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID33] Changing enableClearButton option at runtime does not work', function (assert) {
	assert.expect(5);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-enableClearButton" }),
		$listItems;
	$combo.igCombo({
		dataSource: this.dataSource5,
		textKey: "Name",
		valueKey: "ID",
		filteringType: "remote",
		closeDropDownOnBlur: false,
		enableClearButton: false
	});

	$listItems = $combo.igCombo("items");
	$combo.igCombo("select", $combo.igCombo("items")[0].element);
	$combo.igCombo("option", "enableClearButton", true);
	assert.equal($combo.igCombo("option", "enableClearButton"), true, "enableClearButton option is set to true");
	assert.equal($combo.find(".ui-igcombo-clearicon").length, 1, "enableClearButton button is rendered on the page");
	$combo.igCombo("option", "enableClearButton", false);
	assert.equal($combo.igCombo("option", "enableClearButton"), false, "enableClearButton option is set to true");
	assert.equal($combo.find(".ui-igcombo-clearicon").html(), "", "enableClearButton is not rendered on the page");

	$combo.igCombo("option", "loadOnDemandSettings", { enabled: true, pageSize: 3 });
	assert.equal($combo.igCombo("option", "loadOnDemandSettings").enabled, true, "loadOnDemand is enabled");
});

QUnit.test('[ID34] Combo input paste handling', function (assert) {
	assert.expect(4);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-paste" }),
		expectedText = "test val",
		$input,
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
		dataSource: data,
		textKey: 'cdName',
		valueKey: 'cd',
	});

	$input = $combo.igCombo("textInput");
	$.ig.TestUtil.paste($input[0], expectedText);
	assert.equal($combo.igCombo("text"), expectedText, "Text in input is correct");
	$combo.igCombo("option", "disabled", true);
	$.ig.TestUtil.paste($input[0], "");
	assert.equal($combo.igCombo("text"), expectedText, "Text in input is correct");
	$.ig.TestUtil.keyDownChar(86, $input);
	$.ig.TestUtil.keyUpChar(86, $input);
	assert.equal($combo.igCombo("text"), expectedText, "Text in input is correct");
	$.ig.TestUtil.click($input);
	$input.blur();
	assert.equal($combo.igCombo("text"), expectedText, "Text in input is correct");
});

QUnit.test('[ID35] Test areSetsEqual method', function (assert) {
	assert.expect(29);

	var x = [1, 2, 3], y = [3, 2, 1], someObject = null;
	assert.ok($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are equal");
	assert.ok(y[0] === 3, "Array order is not changed y: " + y);

	x = [1, 2, 3];
	y = [1, 2, 3];
	assert.ok($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are equal");

	x = [1, 2, 3];
	y = [1, 2, 3, 4];
	assert.notOk($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are not equal");

	x = [1, 2, 3];
	y = [1, 1, 1];
	assert.notOk($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are not equal");

	x = [1, 2, 3];
	y = [1, undefined, 1];
	assert.notOk($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are not equal");

	x = [1, 2, undefined];
	y = [2, undefined, 1];
	assert.ok($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are equal");

	x = [1, 3, undefined];
	y = [2, undefined, 1];
	assert.notOk($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are not equal");

	x = [1, undefined];
	y = [1, undefined];
	assert.ok($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are equal");

	x = [undefined];
	y = [undefined];
	assert.ok($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are equal");

	someObject = { firstName: 'name' };
	x = [1, 2, someObject];
	y = [1, someObject, 2];
	assert.ok($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are equal");

	x = [1, 2, { firstName: 'name' }];
	y = [1, { firstName: 'name' }, 2];
	assert.notOk($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are not equal");

	x = [1, 1, null];
	y = [1, null, 1];
	assert.ok($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are equal");

	x = [1, null, 1];
	y = [1, null, 1];
	assert.ok($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are equal");

	x = [1, null, 1];
	y = [1, null, 2];
	assert.notOk($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are not equal");

	x = [1, null];
	y = [1, null];
	assert.ok($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are equal");

	x = [null];
	y = [null];
	assert.ok($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are equal");

	x = [null];
	y = [undefined];
	assert.notOk($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are not equal");

	x = [];
	y = [];
	assert.ok($.ig.util.areSetsEqual(x, y), "x = []; and y=[]; are equal");
	assert.notOk($.ig.util.areSetsEqual(), "Not equal, when sets are missing");
	assert.notOk($.ig.util.areSetsEqual(x), "Arrays x:" + x + " and missing y are not equal");
	assert.notOk($.ig.util.areSetsEqual(undefined), "Arrays x:undefined and missing y are not equal");
	assert.notOk($.ig.util.areSetsEqual(undefined, y), "Arrays x:undefined and y are not equal");
	assert.notOk($.ig.util.areSetsEqual(undefined, null), "undefined and null are not equal");
	assert.notOk($.ig.util.areSetsEqual(null, undefined), "null and undefined are not equal");
	assert.notOk($.ig.util.areSetsEqual(null), "null and undefined are not equal");
	assert.notOk($.ig.util.areSetsEqual(null, null), "Null and Null are not equal");

	x = [1, 2, 3];
	y = x;

	assert.ok($.ig.util.areSetsEqual(x, y), "Arrays x:" + x + " and y:" + y + " are equal (same reference)");
	assert.ok($.ig.util.areSetsEqual(x, x), "Arrays x:" + x + " and x:" + x + " are equal");
});

QUnit.test('[ID36] Test setting validator options runtime', function (assert) {
	assert.expect(7);

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-validator" }),
		$listItems,
		dataSource = [
			{ ID: 1, Name: "John" },
			{ ID: 2, Name: "Mary" },
			{ ID: 3, Name: "Bob" }];

	$combo.igCombo({
		dataSource: dataSource,
		textKey: 'Name',
		valueKey: 'ID',
	});

	assert.equal($combo.igCombo("option", "validatorOptions"), null, "No validator options set");
	$combo.igCombo("option", "validatorOptions", { required: true, errorMessage: "You must populate this field !", successMessage: "Well done!" });
	assert.equal($combo.igCombo("option", "validatorOptions").required, true, "Required must be set to true");
	assert.equal($combo.igCombo("option", "validatorOptions").errorMessage, "You must populate this field !", "error message is correct");
	assert.equal($combo.igCombo("option", "validatorOptions").successMessage, "Well done!", "success message is correct");
	$combo.igCombo("option", "validatorOptions", { required: false, errorMessage: "Try again", successMessage: "Checked" });
	assert.equal($combo.igCombo("option", "validatorOptions").required, false, "Required must be set to false");
	assert.equal($combo.igCombo("option", "validatorOptions").errorMessage, "Try again", "error message is correct");
	assert.equal($combo.igCombo("option", "validatorOptions").successMessage, "Checked", "success message is correct");
});
