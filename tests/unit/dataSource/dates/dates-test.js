var i, date;
var eventResultsUTC = [
	//2016
	{ eventID: 1, eventName: "EU ST 2016", d1: "2016-03-26T03:00:00Z", d2: "2016-03-26T04:00:00Z",  d3: "2016-03-26T01:00:00Z",  d4: "2016-03-26T02:00:00Z", d5: "2016-03-26T24:00:00Z", d6: "2016-03-26T00:00:00Z" },
	{ eventID: 2, eventName: "EU start DST 2016", d1: "2016-03-27T03:00:00Z" },
	{ eventID: 3, eventName: "EU DST 2016", d1: "2016-04-27T03:00:00Z" },
	{ eventID: 4, eventName: "EU end DST 2016", d1: "2016-10-30T03:00:00Z" },
	{ eventID: 5, eventName: "EU ST 2016", d1: "2016-11-23T03:00:00Z" },

	{ eventID: 6, eventName: "US ST 2016", d1: "2016-03-12T03:00:00Z" },
	{ eventID: 7, eventName: "US start DST 2016", d1: "2016-03-13T03:00:00Z" },
	{ eventID: 8, eventName: "US DST 2016", d1: "2016-05-15T03:00:00Z" },
	{ eventID: 9, eventName: "US end DST 2016", d1: "2016-11-06T03:00:00Z" },
	{ eventID: 10, eventName: "US ST 2016", d1: "2016-12-06T03:00:00Z" },

	{ eventID: 11, eventName: "begining 2016", d1: "2016-01-01T03:00:00Z" },
	{ eventID: 12, eventName: "end 2016", d1: "2016-12-31T03:00:00Z" },

	//2015
	{ eventID: 13, eventName: "EU ST 2015", d1: "2015-03-25T03:00:00Z" },
	{ eventID: 14, eventName: "EU start DST 2015", d1: "2015-03-29T03:00:00Z" },
	{ eventID: 15, eventName: "EU DST 2015", d1: "2015-04-27T03:00:00Z" },
	{ eventID: 16, eventName: "EU end DST 2015", d1: "2015-10-25T03:00:00Z" },
	{ eventID: 17, eventName: "EU ST 2015", d1: "2015-11-23T03:00:00Z" },

	{ eventID: 18, eventName: "US ST 2015", d1: "2015-03-04T03:00:00Z" },
	{ eventID: 19, eventName: "US start DST 2015", d1: "2015-03-08T03:00:00Z" },
	{ eventID: 20, eventName: "US DST 2015", d1: "2015-05-15T03:00:00Z" },
	{ eventID: 21, eventName: "US end DST 2015", d1: "2015-11-01T03:00:00Z" },
	{ eventID: 22, eventName: "US ST 2015", d1: "2015-12-06T03:00:00Z" },

	{ eventID: 23, eventName: "begining 2015", d1: "2015-01-01T03:00:00Z" },
	{ eventID: 24, eventName: "end 2015", d1: "2015-12-31T03:00:00Z" },

	//2017
	{ eventID: 25, eventName: "EU ST 2017", d1: "2017-03-25T03:00:00Z" },
	{ eventID: 26, eventName: "EU start DST 2017", d1: "2017-03-26T03:00:00Z" },
	{ eventID: 27, eventName: "EU DST 2017", d1: "2017-04-27T03:00:00Z" },
	{ eventID: 28, eventName: "EU end DST 2017", d1: "2017-10-29T03:00:00Z" },
	{ eventID: 29, eventName: "EU ST 2017", d1: "2017-11-23T03:00:00Z" },

	{ eventID: 30, eventName: "US ST 2017", d1: "2017-03-12T03:00:00Z" },
	{ eventID: 31, eventName: "US start DST 2017", d1: "2017-03-12T03:00:00Z" },
	{ eventID: 32, eventName: "US DST 2017", d1: "2017-05-15T03:00:00Z" },
	{ eventID: 33, eventName: "US end DST 2017", d1: "2017-11-05T03:00:00Z" },
	{ eventID: 34, eventName: "US ST 2017", d1: "2017-12-06T03:00:00Z" },

	{ eventID: 35, eventName: "begining 2017", d1: "2017-01-01T03:00:00Z" },
	{ eventID: 36, eventName: "end 2017", d1: "2017-12-31T03:00:00Z" }
];

for (i = 0; i < eventResultsUTC.length; i++) {
	date = eventResultsUTC[i]["d1"].replace(/T\d\d:\d\d:\d\dZ/, "");
	eventResultsUTC[i]["d2"] = date + "T04:00:00Z";
	eventResultsUTC[i]["d3"] = date + "T01:00:00Z";
	eventResultsUTC[i]["d4"] = date + "T02:00:00Z";
	eventResultsUTC[i]["d5"] = date + "T24:00:00Z";
	eventResultsUTC[i]["d6"] = date + "T00:00:00Z";
}

var eventResultsOffsets = [
	{ eventID: 1, eventName: "EU ST 2016", d1: "2016-03-26T03:00:00Z" }
];

$.mockjaxSettings.logging = 0;

$.mockjax({
	url: 'products',
	responseText: {
		status: 'success',
		d: {
			results: eventResultsUTC
		}
	}
});

$.mockjax({
	url: 'saveChangesUrl',
	response: function(settings) {
		//return the data coming from saveChanges API
		this.responseText =  {Success: true, requestData: settings.data};
	}
});

$.mockjax({
	url: 'productsOffsets',
	responseText: {
		status: 'success',
		d: {
			results: eventResultsOffsets
		}
	}
});


QUnit.module("igDataSource dates", {
	beforeEach: function () {

	},
	afterEach: function () {

	},
	verifyDate: function(expectedDate, utcString, assert){
		assert.ok($.type(expectedDate) === "date" &&
		expectedDate.getTime() === new Date(utcString).getTime(),
		"The type of the date is valid and the date is correct");
	},
	verifySerializedDate: function(expectedString, date, assert, isUTC){
		var regex = /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(\+|\-)(\d\d):(\d\d)/,
		regexUCT = /(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(\.\d+)?Z/,
		matches;
	if (!isUTC) {
		assert.ok(expectedString.match(regex), "The string representation of the date is valid");
		matches = expectedString.match(regex);
		assert.strictEqual(parseInt(matches[1], 10), date.getFullYear(), "Year portion of the dates match.");
		assert.strictEqual(parseInt(matches[2], 10), date.getMonth() + 1, "Month portion of the dates match.");
		assert.strictEqual(parseInt(matches[3], 10), date.getDate(), "Day portion of the dates match.");
		assert.strictEqual(parseInt(matches[4], 10), date.getHours(), "Hours portion of the dates match.");
		assert.strictEqual(parseInt(matches[5], 10), date.getMinutes(), "Minutes portion of the dates match.");
		assert.strictEqual(parseInt(matches[6], 10), date.getSeconds(), "Seconds portion of the dates match.");
		assert.strictEqual(
			parseInt(matches[8], 10) * 60 + parseInt(matches[9], 10),
			matches[7] === "+" ? -date.getTimezoneOffset() : date.getTimezoneOffset(),
			"Offset portion of the dates match."
		);
	} else {
		assert.ok(expectedString.match(regexUCT), "The string representation of the date is valid");
		matches = expectedString.match(regexUCT);
		assert.strictEqual(parseInt(matches[1], 10), date.getUTCFullYear(), "Year portion of the dates match.");
		assert.strictEqual(parseInt(matches[2], 10), date.getUTCMonth() + 1, "Month portion of the dates match.");
		assert.strictEqual(parseInt(matches[3], 10), date.getUTCDate(), "Day portion of the dates match.");
		assert.strictEqual(parseInt(matches[4], 10), date.getUTCHours(), "Hours portion of the dates match.");
		assert.strictEqual(parseInt(matches[5], 10), date.getUTCMinutes(), "Minutes portion of the dates match.");
		assert.strictEqual(parseInt(matches[6], 10), date.getUTCSeconds(), "Seconds portion of the dates match.");
		assert.strictEqual(
			!matches[7] || parseInt(matches[7].replace(".", ""), 10),
			date.getUTCMilliseconds(),
			"Milliseconds portion of the dates match."
		);
	}
	}
});

QUnit.test("Initialize data source with a string date in ISO UTC format", function (assert) {
	assert.expect(4);
	var i, data,
		schema = {
			fields: [{
				name: 'MyDateField',
				type: 'date'
			}]
		},
		dataSource = new $.ig.DataSource({
			dataSource: [{"MyDateField": "2010-03-27T08:10:10.000Z"}],
			schema: schema
		}),
		expData = [{
			MyDateField: new Date("2010-03-27T08:10:10.000Z")
		}];

	dataSource.dataBind();
	data = dataSource._data;

	assert.strictEqual(data.length, expData.length, 'Length of data does not match');
	assert.strictEqual(dataSource.type(), 'array', 'Data type is incorrect');

	// Check parsing
	for (i = 0; i < data.length; i++) {
			assert.strictEqual(data[i].text, expData[i].text, 'Text field of item ' + i + ' does not match.');
			assert.strictEqual(data[i].value, expData[i].value, 'Value field of item ' + i + ' does not match.');
	}
});

QUnit.test("Initialize data source with a string date in combined ISO format", function (assert) {
	assert.expect(4);
	var i, data,
		schema = {
			fields: [{
				name: 'MyDateField',
				type: 'date'
			}]
		},
		dataSource = new $.ig.DataSource({
			dataSource: [{"MyDateField": "2010-03-27T08:10:10.000+02:00"}],
			schema: schema
		}),
		expData = [{
			MyDateField: new Date("2010-03-27T08:10:10.000+02:00")
		}];

	dataSource.dataBind();
	data = dataSource._data;

	assert.strictEqual(data.length, expData.length, 'Length of data does not match');
	assert.strictEqual(dataSource.type(), 'array', 'Data type is incorrect');

	// Check parsing
	for (i = 0; i < data.length; i++) {
		assert.strictEqual(data[i].text, expData[i].text, 'Text field of item ' + i + ' does not match.');
		assert.strictEqual(data[i].value, expData[i].value, 'Value field of item ' + i + ' does not match.');
	}
});

QUnit.test("Initialize data source with a string date without offset", function (assert) {
	assert.expect(4);
	var i, data,
		schema = {
			fields: [{
				name: 'MyDateField',
				type: 'date'
			}]
		},
		dataSource = new $.ig.DataSource({
			dataSource: [{"MyDateField": "2010-03-27T08:10:10.000"}],
			schema: schema
		}),
		expData = [{
			MyDateField: new Date("2010-03-27T08:10:10.000")
		}];

	dataSource.dataBind();
	data = dataSource._data;

	assert.strictEqual(data.length, expData.length, 'Length of data does not match');
	assert.strictEqual(dataSource.type(), 'array', 'Data type is incorrect');

	// Check parsing
	for (i = 0; i < data.length; i++) {
		assert.strictEqual(data[i].text, expData[i].text, 'Text field of item ' + i + ' does not match.');
		assert.strictEqual(data[i].value, expData[i].value, 'Value field of item ' + i + ' does not match.');
	}
});

QUnit.test("RemoteUrl data source is applying properly its dates", function (assert) {
	assert.expect(433);
	var done = assert.async(),
		dataSource = new $.ig.DataSource({
		dataSource: "products",
		schema: {
			searchField: "d.results",
			fields: [
				{ name: "eventID", type: "number" },
				{ name: "eventName", type: "string" },
				{ name: "d1", type: "date" },
				{ name: "d2", type: "date" },
				{ name: "d3", type: "date" },
				{ name: "d4", type: "date" },
				{ name: "d5", type: "date" },
				{ name: "d6", type: "date" }
			]
		},
		responseDataKey: "d.results",
		primaryKey: "eventID"
	}),
	self = this;
	
	dataSource.dataBind(function() {
		var dv = dataSource.dataView(), d = dataSource.data(), i;
		for (i = 0; i < dv.length; i++) {
			self.verifyDate(dv[i].d1, eventResultsUTC[i].d1, assert);
			self.verifyDate(dv[i].d2, eventResultsUTC[i].d2, assert);
			self.verifyDate(dv[i].d3, eventResultsUTC[i].d3, assert);
			self.verifyDate(dv[i].d4, eventResultsUTC[i].d4, assert);
			self.verifyDate(dv[i].d5, eventResultsUTC[i].d5, assert);
			self.verifyDate(dv[i].d6, eventResultsUTC[i].d6, assert);
			self.verifyDate(d[i].d1, eventResultsUTC[i].d1, assert);
			self.verifyDate(d[i].d2, eventResultsUTC[i].d2, assert);
			self.verifyDate(d[i].d3, eventResultsUTC[i].d3, assert);
			self.verifyDate(d[i].d4, eventResultsUTC[i].d4, assert);
			self.verifyDate(d[i].d5, eventResultsUTC[i].d5, assert);
			self.verifyDate(d[i].d6, eventResultsUTC[i].d6, assert);
		}

		//test findRecordByKey is returning record with date object fields
		var rec = dataSource.findRecordByKey(1);
		self.verifyDate(rec.d1, eventResultsUTC[0].d1,assert);
		done();
	});

});

QUnit.test("RemoteUrl data source test dates into the transactions", function (assert) {
	assert.expect(78);
	var dataSource = new $.ig.DataSource({
		dataSource: "products",
		schema: {
			searchField: "d.results",
			fields: [
				{ name: "eventID", type: "number" },
				{ name: "eventName", type: "string" },
				{ name: "d1", type: "date" },
				{ name: "d2", type: "date" },
				{ name: "d3", type: "date" },
				{ name: "d4", type: "date" },
				{ name: "d5", type: "date" },
				{ name: "d6", type: "date" }
			]
		},
		responseDataKey: "d.results",
		primaryKey: "eventID",
		updateUrl: "saveChangesUrl"
	}),
	done = assert.async(),
	self = this;
	dataSource.dataBind(function() {
		var now = new Date(), dv;
		var newRow = { eventID: 36, eventName: "added date", d1: new Date("2016-03-26T03:00:00Z"), d2: new Date("2016-03-27T04:00:00Z"),  d3: new Date("2016-05-27T04:00:00Z"),  d4: new Date("2016-10-26T02:00:00Z"), d5: new Date("2016-10-30T24:00:00Z"), d6: new Date("2016-12-26T00:00:00Z") };
		dataSource.updateRow(1, { "d1": now });
		dataSource.addRow(36, newRow);
		dataSource.setCellValue(2, "d1", now);
		self.verifyDate(dataSource.allTransactions()[0].row.d1, now, assert);
		self.verifyDate(dataSource.pendingTransactions()[0].row.d1, now, assert);

		self.verifyDate(dataSource.allTransactions()[1].row.d1, newRow.d1, assert);
		self.verifyDate(dataSource.pendingTransactions()[1].row.d1, newRow.d1, assert);

		self.verifyDate(dataSource.allTransactions()[2].value, now, assert);
		self.verifyDate(dataSource.pendingTransactions()[2].value, now, assert);
		dataSource.saveChanges(function(data) {
			var t = JSON.parse(data.requestData["ig_transactions"]);
			self.verifySerializedDate(t[0].row.d1, now, assert);

			self.verifySerializedDate(t[1].row.d1, newRow.d1, assert);
			self.verifySerializedDate(t[1].row.d2, newRow.d2, assert);
			self.verifySerializedDate(t[1].row.d3, newRow.d3, assert);
			self.verifySerializedDate(t[1].row.d4, newRow.d4, assert);
			self.verifySerializedDate(t[1].row.d5, newRow.d5, assert);
			self.verifySerializedDate(t[1].row.d6, newRow.d6, assert);

			self.verifySerializedDate(t[2].value, now, assert);
			dv = dataSource.dataView();
			assert.equal(dv[0].d1.getTime(), now.getTime(),
				"The date it updated correctly");

			self.verifyDate(dv[36].d1, newRow.d1, assert);
			self.verifyDate(dv[36].d2, newRow.d2, assert);
			self.verifyDate(dv[36].d3, newRow.d3, assert);
			self.verifyDate(dv[36].d4, newRow.d4, assert);
			self.verifyDate(dv[36].d5, newRow.d5, assert);
			self.verifyDate(dv[36].d6, newRow.d6, assert);

			assert.equal(dv[1].d1.getTime(), now.getTime(),
				"The date it updated correctly");
			done();
		});
	})
});

QUnit.test("RemoteUrl data source test dates into the transactions enableUTCDates: true", function (assert) {
	assert.expect(78);
	var dataSource = new $.ig.DataSource({
		dataSource: "products",
		schema: {
			searchField: "d.results",
			fields: [
				{ name: "eventID", type: "number" },
				{ name: "eventName", type: "string" },
				{ name: "d1", type: "date" },
				{ name: "d2", type: "date" },
				{ name: "d3", type: "date" },
				{ name: "d4", type: "date" },
				{ name: "d5", type: "date" },
				{ name: "d6", type: "date" }
			]
		},
		responseDataKey: "d.results",
		primaryKey: "eventID",
		updateUrl: "saveChangesUrl",
		enableUTCDates: true
	}),
	done = assert.async(),
	self = this;
	dataSource.dataBind(function() {
		var now = new Date(), dv;
		var newRow = { eventID: 36, eventName: "added date", d1: new Date("2016-03-26T03:00:00Z"), d2: new Date("2016-03-27T04:00:00Z"),  d3: new Date("2016-05-27T04:00:00Z"),  d4: new Date("2016-10-26T02:00:00Z"), d5: new Date("2016-10-30T24:00:00Z"), d6: new Date("2016-12-26T00:00:00Z") };
		dataSource.updateRow(1, { "d1": now });
		dataSource.addRow(36, newRow);
		dataSource.setCellValue(2, "d1", now);
		self.verifyDate(dataSource.allTransactions()[0].row.d1, now, assert);
		self.verifyDate(dataSource.pendingTransactions()[0].row.d1, now, assert);

		self.verifyDate(dataSource.allTransactions()[1].row.d1, newRow.d1, assert);
		self.verifyDate(dataSource.pendingTransactions()[1].row.d1, newRow.d1, assert);

		self.verifyDate(dataSource.allTransactions()[2].value, now, assert);
		self.verifyDate(dataSource.pendingTransactions()[2].value, now, assert);
		dataSource.saveChanges(function(data) {
			var t = JSON.parse(data.requestData["ig_transactions"]);
			self.verifySerializedDate(t[0].row.d1, now, assert, true);

			self.verifySerializedDate(t[1].row.d1, newRow.d1, assert, true);
			self.verifySerializedDate(t[1].row.d2, newRow.d2, assert, true);
			self.verifySerializedDate(t[1].row.d3, newRow.d3, assert, true);
			self.verifySerializedDate(t[1].row.d4, newRow.d4, assert, true);
			self.verifySerializedDate(t[1].row.d5, newRow.d5, assert, true);
			self.verifySerializedDate(t[1].row.d6, newRow.d6, assert, true);

			self.verifySerializedDate(t[2].value, now, assert, true);
			dv = dataSource.dataView();
			assert.equal(dv[0].d1.getTime(), now.getTime(),
				"The date it updated correctly");

			self.verifyDate(dv[36].d1, newRow.d1, assert);
			self.verifyDate(dv[36].d2, newRow.d2, assert);
			self.verifyDate(dv[36].d3, newRow.d3, assert);
			self.verifyDate(dv[36].d4, newRow.d4, assert);
			self.verifyDate(dv[36].d5, newRow.d5, assert);
			self.verifyDate(dv[36].d6, newRow.d6, assert);

			assert.equal(dv[1].d1.getTime(), now.getTime(),
				"The date it updated correctly");
			done();
		});
	});
});

QUnit.test("RemoteUrl data source test dates when there are server offsets", function(assert) {
	assert.expect(1);
	var dataSource = new $.ig.DataSource({
		dataSource: "productsOffsets",
		schema: {
			searchField: "d.results",
			fields: [
				{ name: "eventID", type: "number" },
				{ name: "eventName", type: "string" },
				{ name: "d1", type: "date" }
			]
		},
		responseDataKey: "d.results",
		primaryKey: "eventID"
	}),
	self = this,
	done = assert.async();
	dataSource.dataBind(function() {
		//verify the data view does not consider the serverOffset
		var dv = dataSource.dataView();
		self.verifyDate(dv[0].d1, eventResultsOffsets[0].d1, assert);
		done();
	});
});
