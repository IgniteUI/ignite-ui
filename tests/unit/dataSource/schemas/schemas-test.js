
	QUnit.module("igDataSource Schemas", {
		result1: null,
		result2: null,
		result3: null,
		result4: null,
		result5: null,
		arrayOfObjects: [
			{ make: "Chevrolet", model: "Bel Air", year: 1957 },
			{ make: "Dodge", model: "Dart", year: 1964 },
			{ make: "Ford", model: "Mustang", year: 1968 }
		],
		arrayOfArrays: [
			["Chevrolet", "Bel Air", 1957],
			["Dodge", "Dart", 1964],
			["Ford", "Mustang", 1968]
		],
		// colon missed deliberately
		corruptArrays:[
			["Chevrolet", "Bel Air", 1957],
			["Dodge", "Dart", 1964]
			["Ford", "Mustang", 1968]
		],
		json: {
			"profile": {
				"current": 160,
				"target": 150
			},
			"program": [
				{
					"category": "exercise",
					"weekly schedule": [
						{ "day": "sunday", "activity": "swimming" },
						{ "day": "monday", "activity": "running" },
						{ "day": "tuesday", "activity": "biking" },
						{ "day": "wednesday", "activity": "running" },
						{ "day": "thursday", "activity": "swimming" },
						{ "day": "friday", "activity": "running" },
						{ "day": "saturday", "activity": "golf" }
					]
				}
			]
		},
		xml: '<Response><Session>542235629</Session><Tracks  start="1" count="10" total="98" errorCount="0"  defaultSort="popularity+"  description="Top 100 Tracks"  name="Top 100 Tracks"  ><Track id="59672468" rating="-1" title="I Kissed A Girl"><Artist id="30326214" rating="-1">Katy Perry</Artist><ItemInfo><ChartPosition last="26" this="1"/></ItemInfo></Track><Track id="47973564" rating="-1" title="Shake It"><Artist id="45575683" rating="-1">Metro Station</Artist><ItemInfo><ChartPosition last="27" this="2"/></ItemInfo></Track><Track id="52207363" rating="-1" title="Bleeding Love"><Artist id="37956508" rating="-1">Leona Lewis</Artist><ItemInfo><ChartPosition last="28" this="3"/></ItemInfo></Track></Tracks></Response>',
		corruptXml:'<Response><Session>542235629</Session><Tracks  start="1" count="10" total="98" errorCount="0"  defaultSort="popularity+"  description="Top 100 Tracks"  name="Top 100 Tracks"  ><Track id="59672468" rating="-1" title="I Kissed A Girl"><Artist id="30326214" rating="-1">Katy Perry</Artist><ItemInfo><ChartPosition last="26" this="1"/></ItemInfo></Track><Track id="47973564" rating="-1" title="Shake It"><Artist id="45575683" rating="-1">Metro Station</Artist><ItemInfo><ChartPosition last="27" this="2"/></ItemInfo></Track><Track id="52207363" rating="-1" title="Bleeding Love"><Artist id="37956508" rating="-1">Leona Lewis</Artist><ItemInfo><ChartPosition last="28" this="3"/></ItemInfo>/Track></Tracks></Response>',
		table_string: "<table id='table1'> <tbody><tr> <td>1</td> <td>100</td> <td>Laptop</td>  <td>$ 1000 </td> </tr><tr> <td>2</td> <td>15</td> <td>Hamburger</td>  <td>$ 33 </td> </tr><tr> <td>3</td> <td>2000</td> <td>mobile phone</td>  <td>$ 5454 </td> </tr><tr> <td>4</td> <td>45</td> <td>Beer</td>  <td>$ 2323232 </td> </tr><tr> <td>5</td> <td>78</td> <td>trainers</td>  <td>$ 545454 </td> </tr><tr> <td>6</td> <td>32</td> <td>coffee cup</td>  <td>$ 22 </td> </tr><tr> <td>7</td> <td>987</td> <td>BMW 323 CI</td>  <td>$ 1000000 </td> </tr><tr> <td>8</td> <td>434343</td> <td>mouse</td>  <td>$ 545454 </td> </tr><tr> <td>9</td> <td>2356</td> <td>keyboard</td>  <td>$ 34 </td> </tr><tr> <td>10</td> <td>33</td> <td>fish</td>  <td>$ 22 </td> </tr><tr> <td>1</td> <td>100</td> <td>Laptop</td>  <td>$ 1000 </td> </tr></tbody></table>",
		tableHtml: '<table id="t1"><tbody><tr> <td>1</td> <td>100</td> <td>Laptop</td>  <td>$ 1000 </td> </tr><tr> <td>2</td> <td>15</td> <td>Hamburger</td>  <td>$ 33 </td> </tr><tr> <td>3</td> <td>2000</td> <td>mobile phone</td>  <td>$ 5454 </td> </tr><tr> <td>4</td> <td>45</td> <td>Beer</td>  <td>$ 2323232 </td> </tr><tr> <td>5</td> <td>78</td> <td>trainers</td>  <td>$ 545454 </td> </tr><tr> <td>6</td> <td>32</td> <td>coffee cup</td>  <td>$ 22 </td> </tr><tr> <td>7</td> <td>987</td> <td>BMW 323 CI</td>  <td>$ 1000000 </td> </tr><tr> <td>8</td> <td>434343</td> <td>mouse</td>  <td>$ 545454 </td> </tr><tr> <td>9</td> <td>2356</td> <td>keyboard</td>  <td>$ 34 </td> </tr><tr> <td>10</td> <td>33</td> <td>fish</td>  <td>$ 22 </td> </tr><tr> <td>1</td> <td>100</td> <td>Laptop</td>  <td>$ 1000 </td> </tr></tbody></table>',
		initialized: false,
		StringtoXML: function(text){
			if (window.ActiveXObject) {
				var doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async = 'false';
				doc.loadXML(text);
			} else {
				var parser = new DOMParser();
				var doc = parser.parseFromString(text, 'text/xml');
			}
			return doc;
		},
		arrayOfObjectsSchema: null,
		arrayOfArraysSchema: null,
		jsonSchema: null,
		xmlSchema: null,
		tableSchema: null,
		unknownSchema: null,
		ds1: null,
		ds2: null,
		ds3: null,
		ds4: null,
		ds5:null,
		util: $.ig.TestUtil,
		loadTestbeds: function(){
			$(this.tableHtml).appendTo($('#qunit-fixture'));
			// outputResultsName is optional, by default it is "results"
		// type is optional
		this.arrayOfObjectsSchema = new $.ig.DataSchema("array", { outputResultsName: "res_data", fields: [{ name: "make", type: "string" }, { name: "model", type: "string" }, { name: "year", type: "number" }] });

		// since here we do not have name-value pairs, they will be annotated in the resulting object automatically
		this.arrayOfArraysSchema = new $.ig.DataSchema("array", { fields: [{ name: "make" }, { name: "model" }, { name: "year" }] });
		// search field denotes the location of the data
		this.jsonSchema = new $.ig.DataSchema("json", { fields: [{ name: "day" }, { name: "activity" }], searchField: "program[0]['weekly schedule']" });

		// searchField here is the Xpath for the location of the input data
		this.xmlSchema = new $.ig.DataSchema("xml", { fields: [{ name: "song", xpath: "@title" }, { name: "artist", xpath: "Artist" }], searchField: "//Track" });

		// set explicit string type, in order to cover this part of the conversion functionality
		this.tableSchema = new $.ig.DataSchema("htmlTableDom", { fields: [{ name: "make", type: "string" }, { name: "model" }, { name: "year" }] });

		// define an invalid schema that we will test later
		this.unknownSchema = new $.ig.DataSchema(-1, { fields: [] });

		// doesn't need to be wrapped in an IgSchema object
		this.ds1 = new $.ig.DataSource({ dataSource: this.arrayOfObjects, schema: this.arrayOfObjectsSchema }).dataBind();
		this.ds2 = new $.ig.DataSource({ dataSource: this.arrayOfArrays, schema: this.arrayOfArraysSchema }).dataBind();
		this.ds3 = new $.ig.DataSource({ type: "json", dataSource: this.json, schema: this.jsonSchema }).dataBind();
		this.ds4 = new $.ig.DataSource({ type: "xml", dataSource: this.xml, schema: this.xmlSchema }).dataBind();
		this.ds5 = new $.ig.DataSource({ paging: { enabled: true }, dataSource: $("#t1")[0], schema: this.tableSchema }).dataBind();

		// we can just get the normalized data by using IgDataSchema only
		this.result1 = this.arrayOfObjectsSchema.transform(this.arrayOfObjects);
		this.result2 = this.arrayOfArraysSchema.transform(this.arrayOfArrays);
		this.result3 = this.jsonSchema.transform(this.json);
		this.result4 = this.xmlSchema.transform(this.StringtoXML(this.xml));
		this.result5 = this.tableSchema.transform($("#t1")[0]);
		},
		beforeEach: function (assert) {
			this.loadTestbeds();
		},
		afterEach: function () {
			$("#t1").remove();
		}
	});

	//var testId_10 = "DataSchema test 10: Loading HTML without schema";

	//var testId_6 = "DataSchema test 6: Loading JSON with output results name defined";
	//var testId_7 = "DataSchema test 7: Loading JSON with searchField defined";

	//var testId_13 = "DataSource with Schema test 13: Loading JSON with searchField defined";
	//var testId_14 = "DataSource with Schema test 14: Loading JSON with searchField defined";
	//var testId_15 = "DataSource with Schema test 15: Loading JSON with searchField defined";
	//var testId_16 = "DataSource with Schema test 16: Loading JSON with searchField defined";

	//DataSchema test 1: Loading Array of objects with schema / data types
	QUnit.test("DataSchema test 1: Loading Array of objects with schema / data types", function (assert) {
		assert.expect(4);
		// test number of records as well
		assert.equal(3, this.result1[this.arrayOfObjectsSchema.schema.outputResultsName].length, "there should be 3 records");
		assert.equal("Chevrolet", this.result1[this.arrayOfObjectsSchema.schema.outputResultsName][0].make, "We expect value to be Chevrolet");
		assert.equal("Bel Air", this.result1[this.arrayOfObjectsSchema.schema.outputResultsName][0].model, "We expect the model to be Bel Air");
		assert.equal(1957, this.result1[this.arrayOfObjectsSchema.schema.outputResultsName][0].year, "We expect the year to be 1957 and to be of numeric type");

	});
	//DataSchema test 2: Loading array of arrays
	QUnit.test("DataSchema test 2: Loading array of arrays with schema / data types", function (assert) {
		assert.expect(4);
		// test number of records as well
		assert.equal(3, this.result2.length, "there should be 3 records");
		assert.equal("Chevrolet", this.result2[0].make, "We expect value to be Chevrolet");
		assert.equal("Bel Air", this.result2[0].model, "We expect the model to be Bel Air");
		assert.equal(1957, this.result2[0].year, "We expect the year to be 1957 and to be of numeric type");

	});
	//DataSchema test 3: Loading JSON with schema / data types
	QUnit.test("DataSchema test 3: Loading JSON with schema / data types", function (assert) {
		assert.expect(3);
		assert.equal(7, this.result3.length, "there should be 7 records");
		assert.equal("sunday", this.result3[0].day, "sunday");
		assert.equal("swimming", this.result3[0].activity, "swimming");
	});
	//DataSchema test 4: Loading XML with schema and data types
	QUnit.test("DataSchema test 4: Loading XML with schema / data types", function (assert) {
		assert.expect(3);
		assert.equal(3, this.result4.length, "there should be 3 records");
		assert.equal("I Kissed A Girl", this.result4[0].song, "I Kissed A Girl");
		assert.equal("Katy Perry", this.result4[0].artist, "Katy Perry");
	});
	//DataSchema test 5: Loading HTML TABLE with schema / data types
	QUnit.test("DataSchema test 5: Loading HTML TABLE with schema / data types", function (assert) {
		assert.expect(4);
		assert.equal(11, this.result5.length, "there should be 11 records");
		assert.equal("1", this.result5[0].make, "1");
		assert.equal("100", this.result5[0].model, "100");
		assert.equal("Laptop", this.result5[0].year, "Laptop");
	});
	QUnit.test("DataSchema test 6: unknown schema", function (assert) {
		assert.expect(1);
		try {

			var res = this.unknownSchema.transform(this.json);
			asser.ok(false, "This test was supposed to catch an error thrown by the data schema, because the schema type that was passed is invalid!");

		} catch (e) {
			assert.ok(true, "The schema has thrown an error, as expected: " + e.message);
		}
	});

	//This test is now obsolete, because the datasource was changed to handle undefined values and not throw exceptions
	// See bug #112518
	//		test(testId_7, function () {
	//
	//			try {
	//
	//				var res = arrayOfArraysSchema.transform(corruptArrays);
	//				ok(false, "This test was supposed to catch an error thrown by the data schema, because the data that was passed is invalid!");
	//
	//			} catch (e) {
	//
	//				ok(true, "The schema transformation has thrown an error, as expected: " + e.message);
	//			}
	//		});

	// The test is obsolete, remote/json data transformation handles undefined as well now - bug #178135
	//test(testId_8, function () {

	//	try {

	//		var res = jsonSchema.transform(corruptJson);
	//		ok(false, "This test was supposed to catch an error thrown by the data schema, because the data that was passed is invalid!");

	//	} catch (e) {

	//		ok(true, "The schema transformation has thrown an error, as expected: " + e.message);
	//	}
	//});

	QUnit.test("DataSchema test 9: corrupt XML transformation : test error handling with XML that has syntax errors or doesn't match schema", function (assert) {
		assert.expect(1);
		try {
				var res = this.xmlSchema.transform(this.corruptXml);
				assert.ok(false, "This test was supposed to catch an error thrown by the data schema, because the data that was passed is invalid!");

		} catch (e) {

			assert.ok(true, "The schema transformation has thrown an error, as expected: " + e.message);
		}
	});
	QUnit.test("DataSchema test 11: TABLE from string", function (assert) {
		assert.expect(2);
		var res = this.tableSchema.transform(this.table_string);
		assert.equal(11, res.length, 11);
		assert.equal(1, res[0]["make"], 1);

	});
	QUnit.test("IgDataSource test 12: TABLE from string => IgDataSource", function (assert) {
		assert.expect(1);
		assert.equal(11, this.ds5.dataView().length, 11);
	});
	QUnit.test("IgDataSource test 13: XML from string => IgDataSource", function (assert) {
		assert.expect(1);
		var ds = new $.ig.DataSource({ type: "xml", dataSource: this.xml, schema: this.xmlSchema }).dataBind();
		assert.equal(3, ds.dataView().length, 3);
	});
	//IgDataSource test 14: data from a function
	QUnit.test("IgDataSource test 14: data from a function", function (assert) {
		assert.expect(1);
		var self = this;
		var data = function () {
			return self.json;
		};

		var ds = new $.ig.FunctionDataSource({ dataSource: data, schema: this.jsonSchema }).dataBind();
		assert.equal(7, ds.dataView().length, 7);
	});
	//IgDataSource test 15: invalid data source
	QUnit.test("IgDataSource test 15: invalid data source", function (assert) {
		assert.expect(1);
		var x = new Date();
		try {
			var ds = new $.ig.DataSource({ dataSource: x }).dataBind();
			assert.ok(false, "This test was supposed to throw an exception that the data source is invalid");

		} catch (e) {
			assert.ok(true, "Correctly threw exception");
		}

	});
	// IgDataSource test 16: string TABLE passed directly to the data source (no schema)
	QUnit.test("IgDataSource test 16: string TABLE passed directly to the data source (no schema)", function (assert) {
		assert.expect(1);
		var ds = new $.ig.DataSource({ dataSource: this.table_string }).dataBind();
		assert.equal(11, ds.dataView().length, 11);
	});
	// IgDataSource test 17: TABLE ID passed directly to Data source (no schema)
	QUnit.test("IgDataSource test 17: TABLE ID passed directly to Data source (no schema)", function (assert) {
		assert.expect(1);
		var ds = new $.ig.DataSource({ dataSource: "t1" }).dataBind();
		assert.equal(11, ds.dataView().length, 11);
	});
	// IgDataSource test 18: XML passed directly to ds (no schema)
	QUnit.test("IgDataSource test 18: XML passed directly to ds (no schema)", function (assert) {
		assert.expect(1);
		var ds = new $.ig.DataSource({ type: "xml", dataSource: this.xml, schema: this.xmlSchema }).dataBind();
		assert.equal(3, ds.dataView().length, 3);
	});
	// IgDataSource test 19: TABLE DOM reference passed directly to DS (no schema)
	QUnit.test("IgDataSource test 19: TABLE DOM reference passed directly to DS (no schema)", function (assert) {
		//assert.expect(1);
		var ds = new $.ig.DataSource({ dataSource: $("#t1")[0] }).dataBind();
		assert.equal(11, ds.dataView().length, 11);
	});
	QUnit.test("Test isObjEmpty API method", function (assert) {
		assert.expect(2);
		assert.ok(!this.arrayOfObjectsSchema.isObjEmpty({ CustomProp: "Test" }), "If object has custom prop should return false.");
		assert.ok(this.arrayOfObjectsSchema.isObjEmpty({}), "If object has no custom prop should return true.");
	});
	QUnit.test("Test transformning data with a htmlListDom schema", function (assert) {
		assert.expect(2);
		var htmlListDomSchema = new $.ig.DataSchema("htmlListDom",
			{
				primaryKey: { name: "pk" },
				imageUrl: { name: "imgUrl" },
				target: { name: "target" },
				navigateUrl: { name: "navigateUrl" },
				header: { name: "HeaderText" },
				text: { name: "CustomText" },
				count: { name: "countKey" },
				value: { name: "value" },
				description: { name: "customDescription" },
				isDivider: { name: "Devider" },
				outputResultsName: "res_data",
				fields: [{ name: "model", type: "string" }]
			});

		var res = htmlListDomSchema.transform("<ul><li id='item1'><img src='/myImgUrl'></img><img src='/myImgUrl2'></img><a href='myUrl' target='myTarget'>Model1</a><h1>Heading1</h1><p>Description1</p> <span class='ui-li-count'>100</span></li><li><a href='#'>Model2<span class='ui-li-count'>1</span><img src='imgUrl2'></img><h2>Heading2</h2><p>Description2</p></a> </li><ul>");

		assert.equal(JSON.stringify(res[0]), '{"pk":0,"Devider":false,"imgUrl":"/myImgUrl","navigateUrl":"myUrl","target":"myTarget","HeaderText":"Heading1","customDescription":"Description1","countKey":100,"CustomText":"Model1","value":"item1"}', "Check if transformed data for the first record is correct.");
		assert.equal(JSON.stringify(res[1]), '{"pk":1,"Devider":false,"navigateUrl":"#","imgUrl":"imgUrl2","HeaderText":"Heading2","customDescription":"Description2","countKey":1,"CustomText":"Model2"}', "Check if transformed data for the second record is correct.");

	});
	QUnit.test("Test transformning data with date fields with a json schema", function (assert) {
		assert.expect(1);
		var jsonData = {
			Records: [{
				"ProductID": 1,
				"Name": "Adjustable Race",
				"ProductNumber": "AR-5381",
				"Date": new Date("01/01/2011")
			}],
			TotalRecordsCount: 0,
			Metadata: {
				"timezoneOffset": -14400000,
				"timezoneOffsets": {
					"1": {
						"Date": -14400000
					},
					"2": {
						"Date": -14400000
					}
				}
			}
		};
		var jsonSchema = new $.ig.DataSchema("json", { fields: [{ name: "ProductID", type: "number" }, { name: "Name", type: "string" }, { name: "ProductNumber", type: "string" }, { name: "Date", type: "date" }], searchField: "Records" });
		jsonSchema._pk = "ProductID";
		var result = jsonSchema.transform(jsonData);
		assert.equal(result[0].Date.toDateString(), new Date("01/01/2011").toDateString(), "Verify date field data is properly transformed");
	});
	QUnit.test("Test transformning data with a singleRow schema", function (assert) {
		assert.expect(4);
		var data = {
			"ID": 1,
			"Name": "Adjustable Race",
			"2": "",
			"EmptyValue": ""
		};

		var singleRowSchema = new $.ig.DataSchema("singleRow", { fields: [{ name: "ID", type: "number" }, { name: "Name" }, { type: "string" }, {}] });
		singleRowSchema._pk = "ID";
		var result = singleRowSchema.transform(data);
		assert.equal(result.ID, 1, "Ensure that the data is properly transformed event in cases when the schema information is not complte.");
		assert.equal(result.Name, "Adjustable Race", "Ensure that the data is properly transformed event in cases when the schema information is not complte.");
		assert.equal(result["2"], "", "Ensure that the data is properly transformed event in cases when the schema information is not complte.");
		assert.equal(result["3"], undefined, "Ensure that the data is properly transformed event in cases when the schema information is not complte.");
	});
	QUnit.test("Test transforming incorrect data with htmlTableDom schema", function (assert) {
		assert.expect(3);
		var invalidData1 = "<div><div>";
		var errorCount = 0;
		var htmlTableDomSchema = new $.ig.DataSchema("htmlTableDom", { fields: [{ name: "ProductID", type: "number" }, { name: "Name", type: "string" }, { name: "ProductNumber", type: "number" }, { name: "Date", type: "date" }], searchField: "Records" });
		try {
			htmlTableDomSchema.transform(invalidData1);
		} catch (e) {
			errorCount++;
			assert.equal(e.message, "There was an error extracting the data from the HTML Table and applying the schema : Expected a tbody or a table as a parameter.",
				"If invalid table element is passed an error should be thrown and the error message should be correct.");
		}

		var invalidData2 = "<div><table><tbody><tr><td></td></tr></tbody></table><div>";
		try {
			htmlTableDomSchema.transform(invalidData2);
		} catch (e) {
			errorCount++;
			assert.ok(e.message.startsWith("There was an error extracting the data from the HTML Table and applying the schema"),
				"If invalid row elements are passed and error should be thrown and the error message should be correct.")
		}
		assert.equal(errorCount, 2, "Two errors should have been thrown.");
	});
	QUnit.test("Test transforming invalid json with jsonSchema", function (assert) {
		assert.expect(3);
		var errorCount = 0;

		//PK value is undefined
		var jsonData = {
			Records: [{
				"ProductID": undefined,
				"Name": "Adjustable Race",
				"ProductNumber": "AR-5381"
			}]
		};

		try {
			var jsonSchema = new $.ig.DataSchema("json", { fields: [{ name: "ProductID", type: "number" }, { name: "Name", type: "string" }, { name: "ProductNumber", type: "number" }], searchField: "Records" });
			jsonSchema._pk = "ProductID";
			var result = jsonSchema.transform(jsonData);
		} catch (e) {
			errorCount++;
			assert.equal(e.message, "There was an error parsing the JSON data and applying the defined data schema: The input data doesn't match the schema, the following field couldn't be mapped: ProductID",
				"Verrify that if the pk value is undefined an error is thrown with the correct error message.");
		}

		try {
			var jsonSchema2 = new $.ig.DataSchema("json", { fields: null, searchField: "Records" });
			var result = jsonSchema2.transform(jsonData);
		} catch (e) {
			errorCount++;
			assert.ok(e.message.startsWith("There was an error parsing the JSON data and applying the defined data schema"), "If no fields are define an error should be thrown.");
		}
		assert.equal(errorCount, 2, "Two errors should have been thrown.");
	});
	QUnit.test("Test changing schema and applying the new schema to the data source.", function (assert) {
		assert.expect(82);
		var data = [];
		for (var i = 0; i < 10; i++) {
			data.push({ NumericCol1: i, DateCol1: new Date(), BoolCol1: i % 2 === 0, StringCol1: "String", NumericCol2: i.toString(), DateCol2: new Date().toDateString(), BoolCol2: i % 2, StringCol2: "String 2" });
		}
		var schema = new $.ig.DataSchema("json", {
			fields: [{
				name: "NumericCol1",
				type: "number"
			}, {
				name: "DateCol1",
				type: "date"
			}, {
				name: "BoolCol1",
				type: "boolean"
			}, {
				name: "StringCol1",
				type: "string"
			}]
		});
		var ds = new $.ig.DataSource({
			type: "json",
			localSchemaTransform: false,
			dataSource: data,
			schema: schema
		});
		ds.dataBind();

		var fields = schema.fields();
		fields = fields.concat([{
			name: "NumericCol2",
			type: "number"
		}, {
			name: "DateCol2",
			type: "date"
		}, {
			name: "BoolCol2",
			type: "boolean"
		}, {
			name: "StringCol2",
			type: "string"
		}]);
		ds.settings.schema = new $.ig.DataSchema("json", { fields: fields });

		//verify data operations are applied correctly- paging, sorting, filtering
		ds.settings.paging = {
			enabled: true,
			pageSize: 1,
			type: "local"
		};
		ds.settings.sorting = {
			type: "local",
			defaultFields: [
				 {
					 fieldName: "NumericCol2",
					 dir: "desc"
				 }
			]
		};

		ds.settings.filtering = {
			type: "local",
			 defaultFields: [{
				fieldName: "NumericCol2",
				cond:"lessThan",
				expr: 5
			}]
		};

		ds._initSchema();
		ds._applySchema(true);

		//verify schema is applied and all fields are transformed.

		var data = ds.data();

		for (var i = 0; i < data.length; i++) {
			var dataObj = data[i];
			for (var j = 0; j < fields.length; j++) {
				assert.equal($.type(dataObj[fields[j].name]), fields[j].type, "Value of field in the data source should be transformend to the correct data type.");
			}
		}

		//verify data view
		assert.equal(ds.dataView().length, 1, "DataView should respect paging settings.");
		assert.equal(ds.dataView()[0].NumericCol2, 4, "DataView should respect sorting settings.");
	});