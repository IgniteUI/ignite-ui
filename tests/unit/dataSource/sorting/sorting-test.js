var textSettings =  {
	tableDs: null,
	jsonDs: null,
	mapperDs: null,
	treeDs: null,
	direction: "asc",
	expr: "",
	dataObject: {
		firstName: "John",
		lastName: "Resig",
		url: "http://ejohn.org/",
		cities: [
			"Boston, MA",
			"San Francisco, CA"
		]
	},
	arrayOfDataObjects: [
		//$.extend(true, {}, this.dataObject),
		{
			firstName: "John",
			lastName: "Resig",
			url: "http://ejohn.org/",
			cities: [
				"Boston, MA",
				"San Francisco, CA"
			]
		},
	{
		firstName: "Dave",
		lastName: "Reed",
		url: "http://dave.org/",
		cities: [
			"Seattle, WA",
			"Los Angeles, CA",
			"New York, NY"
		]
	},
	{
		firstName: "Boris",
		lastName: "Moore",
		url: "http://boris.org/",
		cities: [
			"Redmond, WA",
			"Seattle, WA",
			"New York, NY"
		]
	},
	{
		firstName: "Angel",
		lastName: "Todorov",
		url: "http://www.infragistics.com",
		cities: [
			"Redmond, WA",
			"Seattle, WA",
			"New York, NY"
		]
	},
	{
		firstName: "Murtaza",
		lastName: "Abdeali",
		url: "http://www.infragistics.com",
		cities: [
			"Redmond, WA",
			"Seattle, WA",
			"New York, NY"
		]
	},
	{
		firstName: "Alex",
		lastName: "Kartavov",
		url: "http://www.infragistics.com",
		cities: [
			"Redmond, WA",
			"Seattle, WA",
			"New York, NY"
		]
	},
	{
		firstName: "Lubo",
		lastName: "Toshev",
		url: "http://www.infragistics.com",
		cities: [
			"Redmond, WA",
			"Seattle, WA",
			"New York, NY"
		]
	},
	{
		firstName: "Boris",
		lastName: "Moore",
		url: "http://boris.org/",
		cities: [
			"Redmond, WA",
			"Seattle, WA",
			"New York, NY"
		]
	}
	],
	northwindProductsJSON: [
    	{ "ID": 0, "Name": "Bread", "Description": "Whole grain bread", "ReleaseDate": "\/Date(694224000000)\/", "DiscontinuedDate": null, "Rating": 4, "Price": "2.5", "Category": { "ID": 0, "Name": "Food" } },
	   { "ID": 1, "Name": "Milk", "Description": "Low fat milk", "ReleaseDate": "\/Date(812505600000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "3.5", "Category": { "ID": 1, "Name": "Beverages" } },
	   { "ID": 2, "Name": "Vint Soda", "Description": "Americana Variety - Mix of 6 flavors", "ReleaseDate": "\/Date(970358400000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "20.9", "Category": { "ID": 1, "Name": "Beverages" } },
	   { "ID": 3, "Name": "Havina Cola", "Description": "The Original Key Lime Cola", "ReleaseDate": "\/Date(1128124800000)\/", "DiscontinuedDate": "\/Date(1159660800000)\/", "Rating": 3, "Price": "19.9", "Category": { "ID": 1, "Name": "Beverages" } },
	   { "ID": 4, "Name": "Fruit Punch", "Description": "Mango flavor, 8.3 Ounce Cans (Pack of 24)", "ReleaseDate": "\/Date(1041724800000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "22.99", "Category": { "ID": 1, "Name": "Beverages" } },
	   { "ID": 5, "Name": "Cranberry Juice", "Description": "16-Ounce Plastic Bottles (Pack of 12)", "ReleaseDate": "\/Date(1154649600000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "22.8", "Category": { "ID": 1, "Name": "Beverages" }, },
	   { "ID": 6, "Name": "Pink Lemonade", "Description": "36 Ounce Cans (Pack of 3)", "ReleaseDate": "\/Date(1162684800000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "18.8", "Category": { "ID": 1, "Name": "Beverages" }, },
	   { "ID": 7, "Name": "DVD Player", "Description": "1080P Upconversion DVD Player", "ReleaseDate": "\/Date(1163548800000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "35.88", "Category": { "ID": 2, "Name": "Electronics" } },
	   { "ID": 8, "Name": "LCD HDTV", "Description": "42 inch 1080p LCD with Built-in Blu-ray Disc Player", "ReleaseDate": "\/Date(1210204800000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "1088.8", "Category": { "ID": 2, "Name": "Electronics" } }
	],
	treeFlatData: [
		{ "employeeId": 0, "supervisorId": -1, "firstName": "Andrew", "lastName": "Fuller", "Category": { "ID": 0,  "Name": "Name"} },
		{ "employeeId": 1, "supervisorId": -1, "firstName": "Jonathan", "lastName": "Smith", "Category": { "ID": 1,  "Name": "Name1"}  },
		{ "employeeId": 2, "supervisorId": -1, "firstName": "Nancy", "lastName": "Davolio", "Category": { "ID": 2,  "Name": "Name2"}  },
		{ "employeeId": 3, "supervisorId": -1, "firstName": "Steven", "lastName": "Buchanan" , "Category": { "ID": 0,  "Name": "Name"} },
	
		// Andrew Fuller's direct reports
		{ "employeeId": 4, "supervisorId": 0, "firstName": "Janet", "lastName": "Leverling", "Category": { "ID": 1,  "Name": "Name1"}  },
		{ "employeeId": 5, "supervisorId": 0, "firstName": "Laura", "lastName": "Callahan", "Category": { "ID": 1,  "Name": "Name1"} },
		{ "employeeId": 6, "supervisorId": 0, "firstName": "Margaret", "lastName": "Peacock" , "Category": { "ID": 0,  "Name": "Name"}},
		{ "employeeId": 7, "supervisorId": 0, "firstName": "Michael", "lastName": "Suyama", "Category": { "ID": 2,  "Name": "Name2"} },
	
		// Janet Leverling's direct reports
		{ "employeeId": 8, "supervisorId": 4, "firstName": "Anne", "lastName": "Dodsworth", "Category": { "ID": 2,  "Name": "Name2"} },
		{ "employeeId": 9, "supervisorId": 4, "firstName": "Danielle", "lastName": "Davis", "Category": { "ID": 2,  "Name": "Name2"} },
		{ "employeeId": 10, "supervisorId": 4, "firstName": "Robert", "lastName": "King" , "Category": { "ID": 1,  "Name": "Name1"}},
	
		// Nancy Davolio's direct reports
		{ "employeeId": 11, "supervisorId": 2, "firstName": "Peter", "lastName": "Lewis", "Category": { "ID": 1,  "Name": "Name1"} },
		{ "employeeId": 12, "supervisorId": 2, "firstName": "Ryder", "lastName": "Zenaida", "Category": { "ID": 0,  "Name": "Name"} },
		{ "employeeId": 13, "supervisorId": 2, "firstName": "Wang", "lastName": "Mercedes", "Category": { "ID": 1,  "Name": "Name1"} },
	
		// Steve Buchanan's direct reports
		{ "employeeId": 14, "supervisorId": 3, "firstName": "Theodore", "lastName": "Zia", "Category": { "ID": 2,  "Name": "Name2"} },
		{ "employeeId": 15, "supervisorId": 3, "firstName": "Lacota", "lastName": "Mufutau", "Category": { "ID": 0,  "Name": "Name"} },
	
		// Lacota Mufutau's direct reports
		{ "employeeId": 16, "supervisorId": 15, "firstName": "Jin", "lastName": "Elliott", "Category": { "ID": 0,  "Name": "Name"} },
		{ "employeeId": 17, "supervisorId": 15, "firstName": "Armand", "lastName": "Ross", "Category": { "ID": 0,  "Name": "Name"} },
		{ "employeeId": 18, "supervisorId": 15, "firstName": "Dane", "lastName": "Rodriquez", "Category": { "ID": 1,  "Name": "Name1"} },
	
		// Dane Rodriquez's direct reports
		{ "employeeId": 19, "supervisorId": 18, "firstName": "Declan", "lastName": "Lester", "Category": { "ID": 1,  "Name": "Name1"}  },
		{ "employeeId": 20, "supervisorId": 18, "firstName": "Bernard", "lastName": "Jarvis" , "Category": { "ID": 1,  "Name": "Name1"} },
	
		// Bernard Jarvis' direct report
		{ "employeeId": 21, "supervisorId": 20, "firstName": "Jeremy", "lastName": "Donaldson", "Category": { "ID": 2,  "Name": "Name2"}  }
	],
	customCompare: function(va1, val2, rec) {
		rec.recordX.lastName > rec.recordY.lastName ? 1 : -1;
	},
	loadTestbeds: function(){
				// create the data sources
				this.tableDs = new $.ig.DataSource({ schema: { fields:[ {name : "col1"}, {name : "col2", type: "number"}, {name : "col3"}, {name : "col4"}, {name : "col5", type : "date"}, {name : "col6", type : "boolean"}  ]}, 
				sorting: { type: "local"}, dataSource: $("#t1")[0] 
			}).dataBind();
			
			// here we are specifying a default sort direction, which will be applied immediately after the source is bound 
			this.jsonDs = new $.ig.DataSource({ sorting: { type: "local", defaultDirection: "asc" }, dataSource: this.arrayOfDataObjects }).dataBind();
	
			//data source with mapper
			this.mapperDs = new $.ig.DataSource({
				sorting: { type: "local", defaultDirection: "asc" }, dataSource: this.northwindProductsJSON,
				schema: {
					fields: [{
						name: "ID", type: "number"
					}, {
						name: "Name", type: "string"
					}, {
						name: "Category", type: "object", mapper: function (record) {
							return record.Category.Name;
						}
					}]
				}
			}).dataBind();
	
			this.treeDs = new $.ig.TreeHierarchicalDataSource({
				dataSource: this.treeFlatData,
				primaryKey: "employeeId", 
				treeDS: {
					foreignKey: "supervisorId",
					foreignKeyRootValue: -1,
					initialExpandDepth: 2,
					childDataKey: "childData"
				},
				schema: {
					fields: [{
						name: "employeeId", type: "number"
					}, {
						name: "supervisorId", type: "number"
					}, {
						name: "firstName", type: "string"
					},
					{
					name: "lastName", type: "string"
					},
					{
						name: "Category", type: "object", mapper: function (record) {
							return record.Category.ID;
						}
					}]
				}
			});
			this.treeDs.dataBind();
	},
	initialized: false,
	tableDsSource: '<table id="t1" cellpadding=5 cellspacing=0><tbody><tr> <td>1</td> <td>100</td> <td>Laptop</td>  <td>$ 1000 </td>  <td> 7/23/2010 </td> <td>1</td></tr><tr> <td>2</td> <td>15</td> <td>Hamburger</td>  <td>$ 33 </td> <td> 10/29/2010 </td><td>0</td> </tr><tr> <td>3</td> <td>2000</td> <td>mobile phone</td>  <td>$ 5454 </td> <td> 10/28/2010 </td><td>0</td> </tr><tr> <td>4</td> <td>45</td> <td>Beer</td>  <td>$ 2323232 </td> <td> 11/10/2010 </td><td>0</td></tr><tr> <td>5</td> <td>78</td> <td>trainers</td>  <td>$ 545454 </td> <td> 7/23/2009 </td><td>0</td></tr><tr> <td>6</td> <td>32</td> <td>coffee cup</td>  <td>$ 22 </td> <td> 9/20/2010 </td><td>1</td> </tr><tr> <td>7</td> <td>987</td> <td>BMW 323 CI</td>  <td>$ 1000000 </td> <td> 7/23/2011 </td><td>1</td> </tr><tr> <td>8</td> <td>434343</td> <td>mouse</td>  <td>$ 545454 </td> <td> 11/1/2010 </td> <td>0</td></tr><tr> <td>9</td> <td>2356</td> <td>keyboard</td>  <td>$ 34 </td> <td> 5/20/2010 </td> <td>0</td></tr><tr> <td>10</td> <td>33</td> <td>fish</td>  <td>$ 22 </td><td> 8/10/2010 </td>  <td>0</td></tr><tr> <td>1</td> <td>100</td> <td>Laptop</td>  <td>$ 1000 </td><td> 7/23/2010 </td> <td>0</td> </tr></tbody></table>',
	template1Html:'<script id="template1" type="text/x-jquery-tmpl">${firstName} <strong> ${lastName} </strong> <br/></script>',
	tableTemplateHtml: '<script id="tableTemplate" type="text/x-jquery-tmpl"><tr> <td> ${col1} </td> <td> ${col2} </td> <td> ${col3} </td>  <td> ${col4} </td> <td> ${col5} </td>  <td> ${col6} </td></tr></script>',
	listHtml: '<ul id="list1"></ul>',
	util: $.ig.TestUtil,
	setTableTemplate: function(){
		$("#t1 tbody").empty();
		var tableTemplate = $(this.tableTemplateHtml).appendTo($('#qunit-fixture'));
		tableTemplate.tmpl(this.tableDs.dataView()).appendTo("#t1 tbody");
	},
	setListTemplate: function(){
		$("#list1").empty();
		var listTemplate = $(this.template1Html).appendTo($('#qunit-fixture'));
		listTemplate.tmpl(this.jsonDs.dataView()).appendTo("#list1");
	},
	beforeEach: function(assert) {
	 $(this.tableDsSource).appendTo($('#qunit-fixture'));
	 $(this.listHtml).appendTo($('#qunit-fixture'));
		$.mockjaxSettings.logging = 0;
		var done = assert.async();
		//pause testing until tree is initialized
		if (!this.initialized) {
			this.loadTestbeds();
			this.util.wait(500).then(function () { done(); });
			this.initialized = true;
		}
	},
	afterEach: function() {
		$("#t1").remove();
		$("#list1").remove();
	}
};
QUnit.module("igDataSource Sorting", textSettings);

// IgDataSource Sorting - sort with schema
QUnit.test("IgDataSource Sorting - sort with schema", function(assert) {
	assert.expect(2);
	this.tableDs.sort([{fieldName : "col3"}], "asc", true);
	 this.setTableTemplate();
	
	// check the first record in col 3
	assert.equal("Beer", this.tableDs.dataView()[0].col3 , "Beer" );
	
	this.tableDs.sort([{fieldName : "col3"}], "desc", true);
	// check the first record in col 3
	// BMW 323 CI
	this.setTableTemplate();
	assert.equal("trainers", this.tableDs.dataView()[0].col3 , "trainers" );

});

// IgDataSource Sorting - sort without schema
QUnit.test("IgDataSource Sorting - sort without schema", function(assert) {
	
	this.jsonDs.sort([{fieldName : "firstName"}], "asc", true);
	this.setListTemplate();
	
	// check the first record in col 3
	assert.equal("Alex", this.jsonDs.dataView()[0].firstName , "Alex" );
	
	this.jsonDs.sort([{fieldName : "firstName"}], "desc", true);
	this.setListTemplate();
	
	assert.equal("Murtaza", this.jsonDs.dataView()[0].firstName , "Murtaza" );
	
});

// IgDataSource Sorting - sort single numeric
QUnit.test("IgDataSource Sorting - sort single numeric", function(assert) {
	assert.expect(2);
	this.tableDs.sort([{fieldName : "col2"}], "asc", true);
	this.setTableTemplate();
	
	// check the first record in col 2
	assert.equal(15, this.tableDs.dataView()[0].col2 , 15);
	
	this.tableDs.sort([{fieldName : "col2"}], "desc", true);
	this.setTableTemplate();

	// check the first record in col 3
	// BMW 323 CI
	
	assert.equal(434343, this.tableDs.dataView()[0].col2 , 434343);
});

// IgDataSource Sorting - sort single string
QUnit.test("IgDataSource Sorting - sort single string", function(assert) {
	assert.expect(2);
	this.tableDs.sort([{fieldName : "col3"}], "asc", true);
	this.setTableTemplate();
	// check the first record in col 3
	assert.equal("Beer", this.tableDs.dataView()[0].col3 , "Beer" );
	
	this.tableDs.sort([{fieldName : "col3"}], "desc", true);
	this.setTableTemplate();

	// check the first record in col 3
	// BMW 323 CI
	
	assert.equal("trainers", this.tableDs.dataView()[0].col3 , "trainers" );
});

// IgDataSource Sorting - sort single string case sensitive
QUnit.test("IgDataSource Sorting - sort single string case sensitive", function(assert) {
	assert.expect(1);
	assert.ok(true);
});

// IgDataSource Sorting - sort single dates
QUnit.test("IgDataSource Sorting - sort single dates", function(assert) {
	assert.expect(2);
	this.tableDs.sort([{fieldName : "col5"}], "asc", true);
	this.setTableTemplate();
	
	// check the first record in col 5
	assert.equal(new Date("Thu Jul 23 00:00:00 2009").toString(), this.tableDs.dataView()[0].col5.toString(), new Date("Thu Jul 23 00:00:00 2009").toString());
	
	this.tableDs.sort([{fieldName : "col5"}], "desc", true);
	this.setTableTemplate();

	// check the first record in col 5
	// Thu Jul 23 00:00:00 UTC+0300 2009
	// Sat Jul 23 00:00:00 UTC+0300 2011
	assert.equal(new Date("Sat Jul 23 00:00:00 2011").toString(), this.tableDs.dataView()[0].col5.toString() , new Date("Sat Jul 23 00:00:00 2011").toString());
});

// IgDataSource Sorting - sort single boolean
QUnit.test("IgDataSource Sorting - sort single boolean", function(assert) {
	assert.expect(2);
	this.tableDs.sort([{fieldName : "col6"}], "asc", true);
	this.setTableTemplate();
	
	// check the first record in col 3
	assert.equal(false , this.tableDs.dataView()[0].col6 , false  );
	
	this.tableDs.sort([{fieldName : "col6"}], "desc", true);
	this.setTableTemplate();
	
	assert.equal(true, this.tableDs.dataView()[0].col6 , true );
});
// IgDataSource Sorting - sort multiple 1
QUnit.test("IgDataSource Sorting - sort multiple 1", function(assert) {
	assert.expect(4);
	this.tableDs.sort([{fieldName : "col2", dir: "asc"}, {fieldName : "col3", dir: "desc"}], false);
	this.setTableTemplate();
	// check 1
	assert.equal(15, this.tableDs.dataView()[0].col2 , 15 );
	assert.equal("Hamburger", this.tableDs.dataView()[0].col3 , "Hamburger");
	
	this.tableDs.sort([{fieldName : "col2", dir: "desc"}, {fieldName : "col3", dir: "asc"}], false);
	this.setTableTemplate();
	
	// check 2
	assert.equal(434343, this.tableDs.dataView()[0].col2 , 434343);
	assert.equal("mouse", this.tableDs.dataView()[0].col3 , "mouse");
});
// IgDataSource Sorting - sort multiple 2
/*
test(testId_9, function() {
	ok(true);
});
*/

// IgDataSource Sorting - sort multiple 3 (string expressions)
QUnit.test("IgDataSource Sorting - sort multiple 3 (string expressions)", function(assert) {
	assert.expect(4);
	this.tableDs.sort("col2 asc, col3 desc", false);
	this.setTableTemplate();
	
	// check 1
	assert.equal(15, this.tableDs.dataView()[0].col2 , 15 );
	assert.equal("Hamburger", this.tableDs.dataView()[0].col3 , "Hamburger");
	
	this.tableDs.sort("col2 desc, col3 asc", false);
	this.setTableTemplate();
	
	// check 2
	assert.equal(434343, this.tableDs.dataView()[0].col2 , 434343);
	assert.equal("mouse", this.tableDs.dataView()[0].col3 , "mouse");
});
// IgDataSource Sorting - sort - custom sorting comparer
QUnit.test("IgDataSource Sorting - sort - custom sorting comparer", function(assert) {
	assert.expect(2);
	this.jsonDs.clearLocalSorting();
	this.jsonDs.sort([{ fieldName: "firstName", compareFunc: this.customCompare }], "asc");
	var data = this.jsonDs.dataView();
	
	assert.equal(data[0].lastName, "Abdeali", "Verify order.");
	assert.equal(data[data.length - 1].lastName, "Kartavov", "Verify order.");

	this.jsonDs.clearLocalSorting();
});

// IgDataSource Sorting - sort - custom sorting conversion function
QUnit.test("IgDataSource Sorting - sort - custom sorting conversion function", function(assert) {
	assert.expect(2);
	this.jsonDs.settings.sorting.customConvertFunc = function (val) {
		//letters after the first letter will be disregaded for sorting
		return val.slice(0,1);
	};
	this.jsonDs.clearLocalSorting();
	this.jsonDs.sort([{ fieldName: "firstName" }], "asc");

	assert.equal(this.jsonDs.dataView()[0].firstName, "Angel", "Verify order.");
	assert.equal(this.jsonDs.dataView()[1].firstName, "Alex", "Verify order.");

	this.jsonDs.settings.sorting.customConvertFunc = null;
	this.jsonDs.clearLocalSorting();
});

// IgDataSource Sorting - sort - custom sorting function (ALL functionality)
QUnit.test("IgDataSource Sorting - sort - custom sorting function (ALL functionality)", function(assert) {
	assert.expect(1);
	var res = [{
		firstName: "Dave",
		lastName: "Reed",
		url: "http://dave.org/",
		cities: [
			"Seattle, WA",
			"Los Angeles, CA",
			"New York, NY"
		]
	}];
	this.jsonDs.settings.sorting.customFunc = function (data, fields, direction) {
		return res;
	};
	this.jsonDs.sort([{ fieldName: "firstName" }], "asc");
	assert.equal(res, this.jsonDs.dataView(), "DataView should contain the result from the customFunc sorting. ");

});

// IgDataSource Sorting - remote
	QUnit.test("IgDataSource Sorting - remote sorting", function(assert) {
		assert.expect(9);
		var ds = null,
			done = assert.async();
		var data = [
						{ ProductID: 'product-001' },
						{ ProductID: 'product-002' },
						{ ProductID: 'product-003' },
						{ ProductID: 'product-004' }
		];
		$.mockjax({
			url: 'productsSorting',
			responseText: {
				status: 'success',
				data: {
					results: data
				}
			}
		});

		ds = new $.ig.RemoteDataSource({
			callback: function (success, error) {
				done();
				assert.equal(ds.dataView().length, 4, "Response should contain 4 records");
				for (var i = 0; i < ds.dataView().length; i++) {
					assert.equal(ds.dataView()[i].ProductID, data[i].ProductID, "Data should be sorted.");
					var params = $.param(ds._encodeUrl());
					assert.equal(params, "%24orderby=ProductID%20asc", "Request should be properly encoded.");
				}
			},
			responseDataType: "json",
			sorting: {
				expressions: [{
					fieldName: "ProductID",
					dir: "asc"
				}]
			},
			dataSource: "productsSorting", schema: { searchField: "data.results", fields: [{ name: "ProductID" }] }
		}).dataBind();
	});
QUnit.test("IgDataSource Sorting - sort - mapper function", function (assert) {
	assert.expect(5);
	//this.mapperDs
	this.mapperDs.sort([{ fieldName: "Category" }], "desc");
	assert.equal(this.mapperDs.dataView()[0].Category.Name, "Food", "Records are sorted correctly by the mapped value");
	assert.equal(this.mapperDs.dataView()[1].Category.Name, "Electronics", "Records are sorted correctly by the mapped value");
	assert.equal(this.mapperDs.dataView()[2].Category.Name, "Electronics", "Records are sorted correctly by the mapped value");
	assert.equal(this.mapperDs.dataView()[3].Category.Name, "Beverages", "Records are sorted correctly by the mapped value");
	assert.equal(this.mapperDs.dataView()[4].Category.Name, "Beverages", "Records are sorted correctly by the mapped value");
});

QUnit.test("IgTreeHierarchicalDataSource Sorting - sort - mapper function", function (assert) {
	assert.expect(7);
	this.treeDs.sort([{ fieldName: "Category" }], "desc");
	
	//check if root records are sorted correctly
	assert.equal(this.treeDs.dataView()[0].Category.ID, 2, "Records are sorted correctly by the mapped value");
	assert.equal(this.treeDs.dataView()[1].Category.ID, 1, "Records are sorted correctly by the mapped value");
	assert.equal(this.treeDs.dataView()[2].Category.ID, 0, "Records are sorted correctly by the mapped value");
	assert.equal(this.treeDs.dataView()[3].Category.ID, 0, "Records are sorted correctly by the mapped value");

	//check if child records are sorted correctly

	assert.equal(this.treeDs.dataView()[0].childData[0].Category.ID, 1, "Records are sorted correctly by the mapped value");
	assert.equal(this.treeDs.dataView()[0].childData[1].Category.ID, 1, "Records are sorted correctly by the mapped value");
	assert.equal(this.treeDs.dataView()[0].childData[2].Category.ID, 0, "Records are sorted correctly by the mapped value");
});

QUnit.test("Test clearLocalSorting", function (assert) {
	assert.expect(2);
	var dv, ds;
	ds = new $.ig.DataSource({
		sorting: { type: "local", defaultDirection: "asc" }, 
		dataSource: this.northwindProductsJSON,
		schema: {
			fields: [{
				name: "ID", type: "number"
			}, {
				name: "Name", type: "string"
			}]
		}
	}).dataBind();
	ds.filter([
					{ fieldName: "ID", expr: "", cond: "notEmpty" }
				])
		.sort([{ fieldName: "Name" }], "desc");
	dv = ds.dataView();
	assert.ok(dv[0].Name === "Vint Soda" && dv[8].Name === "Bread")
	ds.clearLocalFilter();
	ds.clearLocalSorting();
	dv = ds.dataView();
	assert.ok(dv[0].ID === 0 && dv[8].ID === 8, "Test after applying clearLocalSorting");
});
// bug #242579
// IgDataSource Sorting - sort - custom sorting function (ALL functionality)
QUnit.test("IgDataSource Sorting - custom sort function and paging", function(assert) {
	assert.expect(1);
	var res = [{
		firstName: "Dave",
		lastName: "Reed",
		url: "http://dave.org/",
		cities: [
			"Seattle, WA",
			"Los Angeles, CA",
			"New York, NY"
		]
	}];
	this.jsonDs.settings.sorting.customFunc = function (data, fields, direction) {
		return res;
	};
	
	this.jsonDs.settings.paging = {enabled:true, type: "local", pageSize: 3};
	this.jsonDs.sort([{ fieldName: "firstName" }], "asc");
	assert.equal(JSON.stringify(res), JSON.stringify(this.jsonDs.dataView()), "DataView should have the same view as the returned function. ");
});
