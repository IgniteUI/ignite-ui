QUnit.module("igDataSouce Select databinding", {
	selHtml: '<select id="sel"><option value="1">John Smith</option><option value="2">Mary Johnson</option><option value="3">Bob Ferguson</option></select>',
	selOptGroupHtml: '<select id="sel_optgrp"><optgroup label="German cars"><option value="mercedes">Mercedes</option><option value="audi">Audi</option></optgroup><optgroup label="Swedish cars"><option value="volvo">Volvo</option><option value="saab">Saab</option></optgroup></select>',
	beforeEach: function () {
		$(this.selHtml).appendTo($('#qunit-fixture'));
		$(this.selOptGroupHtml).appendTo($('#qunit-fixture'));
	},
	afterEach: function () {
		$("#sel").remove();
		$("#sel_optgrp").remove();
	}
	});

QUnit.test('Select data binding', function (assert) {
	assert.expect(8);
var i, data,
	$select = $('#sel'),
	schema = {
		fields: [{
			name: 'value',
			type: 'string'
		}, {
			name: 'text',
			type: 'string'
		}]
	},
	dataSource = new $.ig.DataSource({
		dataSource: $select[0],
		schema: schema
	}),
	expData = [{
		text: 'John Smith',
		value: '1'
	}, {
		text: 'Mary Johnson',
		value: '2'
	}, {
		text: 'Bob Ferguson',
		value: '3'
	}];

dataSource.dataBind();
data = dataSource._data;

assert.strictEqual(data.length, expData.length, 'Length of data does not match');
assert.strictEqual(dataSource.type(), 'htmlSelectDom', 'Data type is incorrect');

// Check parsing
for (i = 0; i < data.length; i++) {
	assert.strictEqual(data[i].text, expData[i].text, 'Text field of item ' + i + ' does not match.');
	assert.strictEqual(data[i].value, expData[i].value, 'Value field of item ' + i + ' does not match.');
}
});
QUnit.test('Select data binding with opt group', function (assert) {
	assert.expect(14);
var i, j, data, curGroup, curExpGroup,
	$select = $('#sel_optgrp'),
	schema = {
		fields: [{
			name: 'value',
			type: 'string'
		}, {
			name: 'text',
			type: 'string'
		}]
	},
	dataSource = new $.ig.DataSource({
		dataSource: $select[0],
		schema: schema
	}),
	expData = [{
		Group: {
			groupItems: [{
				text: 'Mercedes',
				value: 'mercedes'
			}, {
				text: 'Audi',
				value: 'audi'
			}],
			groupName: 'German cars'
		}
	}, {
		Group: {
			groupItems: [{
				text: 'Volvo',
				value: 'volvo'
			}, {
				text: 'Saab',
				value: 'saab'
			}],
			groupName: 'Swedish cars'
		}
	}];

dataSource.dataBind();
data = dataSource._data;

assert.strictEqual(data.length, expData.length, 'Length of data does not match');
assert.strictEqual(dataSource.type(), 'htmlSelectDom', 'Data type is incorrect');

// Check parsing
for (i = 0; i < data.length; i++) {
	curGroup = data[i].Group;
	curExpGroup = expData[i].Group;

	assert.strictEqual(curGroup.groupName, curExpGroup.groupName, 'Group name of group ' + i + ' does not match.');
	assert.strictEqual(curGroup.groupItems.length, curExpGroup.groupItems.length, 'Group items length of group ' + i + ' does not match.');

	for (j = 0; j < curGroup.groupItems.length; j++) {
		assert.strictEqual(curGroup.groupItems[j].text, curExpGroup.groupItems[j].text, 'Text of group item ' + j + ' in group ' + i + ' does not match.');
		assert.strictEqual(curGroup.groupItems[j].value, curExpGroup.groupItems[j].value, 'Value of group item ' + j + ' in group ' + i + ' does not match.');
	}
}
});