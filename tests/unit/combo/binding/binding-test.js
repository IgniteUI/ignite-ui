QUnit.module("igCombo data binding unit tests", {
	divTag: '<div></div>',
	assert: null,
	testDataBinding: function ($combo, expDataView, expSchema) {
		var i, key,
			dataSource = $combo.igCombo('option', 'dataSource'),
			dataView = dataSource.dataView(),
			fields = dataSource.schema().schema.fields;

		// Data view
		this.assert.strictEqual(dataView.length, expDataView.length, 'Data view length is incorrect');
		for (i = 0; i < dataView.length; i++) {
			curDataViewItem = dataView[i];

			for (key in curDataViewItem) {
				if (curDataViewItem.hasOwnProperty(key)) {
					this.assert.strictEqual(curDataViewItem[key], expDataView[i][key], key + ' of data view item ' + i + ' did not match');
				}
			}
		}

		// Schema
		this.assert.strictEqual(fields.length, expSchema.length, 'Schema length is incorrect');
		for (i = 0; i < fields.length; i++) {
			curSchemaItem = fields[i];

			for (key in curSchemaItem) {
				if (curSchemaItem.hasOwnProperty(key)) {
					this.assert.strictEqual(curSchemaItem[key], expSchema[i][key], key + ' of schema item ' + i + ' did not match');
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

QUnit.test('[ID1] JSON data binding', function (assert) {
	assert.expect(21);

	this.assert = assert;

	$.ig.TestUtil.appendToFixture('<div class="cont"><div id=\'combo-json-ds\' name="combo-json"></div></div>');
	var $comboWrapper = $('#combo-json-ds'),
		i, ds,
		$hiddenInput,
		wrapper,
		dataSource = [{ ID: 1, Name: "John Smith", Age: 45 },
		{ ID: 2, Name: "Mary Johnson", Age: 32 },
		{ ID: 3, Name: "Bob Ferguson", Age: 27 }],
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
		dataSource: dataSource,
		textKey: 'Name',
		valueKey: 'ID'
	});

	wrapper = $comboWrapper.igCombo('comboWrapper');
	assert.equal(wrapper[0], $comboWrapper[0], 'comboWrapper does not return the expected wrap element');

	$hiddenInput = $('#combo-json-ds input.ui-igcombo-hidden-field');
	assert.equal($hiddenInput.attr("name"), "combo-json", "The name attribute was not transferred to the hidden input");

	this.testDataBinding($comboWrapper, dataSource, expSchema);

	$comboWrapper.igCombo("destroy");
	assert.notOk($comboWrapper.hasClass("igcombo-wrapper"), "The combo wrapper class was not removed.");
	assert.equal($comboWrapper.children().length, 0, "The combo wrapper was not emptied on destroy");
});

QUnit.test('[ID2] XML data binding', function (assert) {
	assert.expect(12);

	this.assert = assert;
	var $comboWrapper = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-xml-ds" }),
		i, ds,
		xmlDoc = '<People>' +
			'<Person ID="1" Name="Gustavo Achong" />' +
			'<Person ID="2" Name="Catherine Abel" />' +
			'<Person ID="3" Name="Kim Abercrombie" />' +
			'</People>',
		xmlSchema = new $.ig.DataSchema("xml",
			{
				searchField: "//Person",
				fields: [
					{ name: "ID", xpath: "./@ID" },
					{ name: "Name", xpath: "./@Name" }
				]
			}
		),
		dataSource = new $.ig.DataSource({
			type: "xml",
			dataSource: xmlDoc,
			schema: xmlSchema
		}),
		expDataView = [{
			ID: '1',
			Name: 'Gustavo Achong'
		}, {
			ID: '2',
			Name: 'Catherine Abel'
		}, {
			ID: '3',
			Name: 'Kim Abercrombie'
		}],
		expSchema = [{
			name: 'ID',
			xpath: './@ID'
		}, {
			name: 'Name',
			xpath: './@Name'
		}];

	$comboWrapper.igCombo({
		dataSource: dataSource,
		textKey: 'Name',
		valueKey: 'ID'
	});

	this.testDataBinding($comboWrapper, expDataView, expSchema);
});

QUnit.test('[ID3] Select data binding', function (assert) {
	assert.expect(12);

	this.assert = assert;
	$.ig.TestUtil.appendToFixture('<div class="cont bind_select"><select id="combo-select-ds"><option value="1">John Smith</option><option value="2">Mary Johnson</option><option value="3">Bob Ferguson</option></select></div>');

	var i, ds,
		$comboInitElement = $('#combo-select-ds'),
		expDataView = [{ value: "1", text: "John Smith" },
		{ value: "2", text: "Mary Johnson" },
		{ value: "3", text: "Bob Ferguson" }],
		expSchema = [{
			name: 'value',
			type: 'string'
		}, {
			name: 'text',
			type: 'string'
		}];

	$comboInitElement.igCombo();

	this.testDataBinding($comboInitElement, expDataView, expSchema);
});

QUnit.test('[ID4] Function data binding', function (assert) {
	assert.expect(12);

	this.assert = assert;

	var $comboWrapper = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-function-ds" }),
		i, ds,
		expDataView = [{ ID: 1, Name: "John Smith" },
		{ ID: 2, Name: "Mary Johnson" },
		{ ID: 3, Name: "Bob Ferguson" }],
		expSchema = [{
			name: 'ID',
			type: 'number'
		}, {
			name: 'Name',
			type: 'string'
		}];

	$comboWrapper.igCombo({
		dataSource: function () {
			return [{ ID: 1, Name: "John Smith" },
			{ ID: 2, Name: "Mary Johnson" },
			{ ID: 3, Name: "Bob Ferguson" }];
		},
		textKey: 'Name',
		valueKey: 'ID'
	});

	this.testDataBinding($comboWrapper, expDataView, expSchema);
});

QUnit.test('[ID5] Remote data binding', function (assert) {
	assert.expect(1);
	this.assert = assert;
	
	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo-remote-ds" }),
		done = assert.async(),
		dataSource, dataView, fields, expDataViewLen = 2155, self = this;

	$combo.igCombo({
		textKey: 'ProductName',
		responseDataKey: "d.results",
		dataSource: "http://localhost/api/invoices?callback=?",
		dataSourceType: "json"
	});

	$.ig.TestUtil.wait(500).then(function () {
		dataSource = $combo.igCombo('option', 'dataSource');
		dataView = dataSource.dataView();
		assert.strictEqual(dataView.length, expDataViewLen, 'Data view len is incorrect');
		done();
	}).catch(function (er) {
		assert.pushResult({ result: false, message: er.message });
		done();
		throw er;
	});
});

QUnit.test('[ID6] Data binding to number array', function (assert) {
	assert.expect(16);

	this.assert = assert;

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo_numberarray" }),
		dataSource = [1, 2, 3, 4, 5],
		expData = [{
			text: 1,
			value: 1
		}, {
			text: 2,
			value: 2
		}, {
			text: 3,
			value: 3
		}, {
			text: 4,
			value: 4
		}, {
			text: 5,
			value: 5
		}],
		expShema = [{
			name: 'text',
			type: 'number'
		}, {
			name: 'value',
			type: 'number'
		}];

	$combo.igCombo({
		dataSource: dataSource,
		animationShowDuration: 0,
		animationHideDuration: 0
	});

	this.testDataBinding($combo, expData, expShema);
});

QUnit.test('[ID7] Data binding to date array', function (assert) {
	assert.expect(11);

	this.assert = assert;

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "combo_numberarray" }),
		comboDataSource, dataView, fields, key, i,
		dataSource = [new Date(2015, 0, 1), new Date(2000, 0, 10), new Date(2008, 1, 6), new Date(2012, 7, 22), new Date(1962, 11, 31)],
		expSchema = [{
			name: 'text',
			type: 'date'
		}, {
			name: 'value',
			type: 'date'
		}],
		expItemsText = ['1/1/2015', '1/10/2000', '2/6/2008', '8/22/2012', '12/31/1962'];

	$combo.igCombo({
		dataSource: dataSource,
		animationShowDuration: 0,
		animationHideDuration: 0
	});

	comboDataSource = $combo.igCombo('option', 'dataSource');
	dataView = comboDataSource.dataView();
	fields = comboDataSource.schema().schema.fields;
	$items = $combo.igCombo('listItems');

	// Data view
	assert.strictEqual(dataView.length, 5, 'Data view length is incorrect');

	// Schema
	assert.strictEqual(fields.length, expSchema.length, 'Schema length is incorrect');
	for (i = 0; i < fields.length; i++) {
		curSchemaItem = fields[i];

		for (key in curSchemaItem) {
			if (curSchemaItem.hasOwnProperty(key)) {
				assert.strictEqual(curSchemaItem[key], expSchema[i][key], key + ' of schema item ' + i + ' did not match');
			}
		}
	}

	// Rendered items format
	for (i = 0; i < $items.length; i++) {
		assert.strictEqual($items.eq(i).text(), expItemsText[i], 'Text of list item ' + i + ' did not match');
	}
});

QUnit.test('[ID8] Html entity in dataSource', function (assert) {
	assert.expect(6);

	this.assert = assert;

	var $combo = $.ig.TestUtil.appendToFixture(this.divTag, { id: "htmlEntityDataSource" }),
		$input, $dropDownButton, listItems;

	$combo.igCombo({
		animationShowDuration: 0,
		animationHideDuration: 0,
		dataSource: [
			{ value: '&yen;' },
			{ value: '&pound;' },
			{ value: '&dollar;' },
			{ value: '&euro;' },
		],
	});

	$input = $combo.data().igCombo._options.$input;
	$dropDownButton = $combo.data().igCombo._options.$dropDownBtnCont;

	var items = $combo.igCombo('items');

	$dropDownButton.click();
	$.ig.TestUtil.click(items[0].element);
	assert.equal($combo.igCombo('activeIndex'), 0, 'Yen symbol entity is selected');
	assert.equal(items[0].element.data('value'), items[0].element.text(), "data-value matches with text representation");
	assert.equal(items[0].element.data('value'), $input.val(), 'data-value matches with input value');

	$dropDownButton.click();
	$.ig.TestUtil.click(items[1].element);
	assert.equal($combo.igCombo('activeIndex'), 1, 'Pound symbol entity is selected');
	assert.equal(items[1].element.data('value'), items[1].element.text(), "data-value matches with text representation");
	assert.equal(items[1].element.data('value'), $input.val(), 'data-value matches with input value');
});
