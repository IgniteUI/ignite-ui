QUnit.module("igDataSource Properties", {
			dataBindingFired: false,
			dataBoundFired: false,
			ds1: null,
			ds2: null,
			date: null,
			initialized: false,
			util: $.ig.TestUtil,
			filerFunc: function(val) { return val > 1 ? true : false; },
			filerFunc2: function(val){
				return val < 2 ? true : false;
			},
			loadTestbeds: function(){
				var self = this;
				// define a simple data source control
				this.ds1 = new $.ig.DataSource();

				this.ds1.settings.dataBinding = function () { self.dataBindingFired = true; };
				this.ds1.settings.dataBound = function () { self.dataBoundFired = true; };
				this.ds1.dataBind();

				this.date = new Date();
				var data = [
					{ ID: 1, "Date": this.date},
					{ ID: 2, "Date": new Date(this.date.getDate() + 1), isActive: true },
					{ ID: 3, "Date": new Date(this.date.getDate() + 2), isActive: false }
					]
				this.ds2 = new $.ig.DataSource({
					dataSource: data,
					enableUTCDates: true,
					localSchemaTransform: false,
					schema: {
						fields: [{
							name: "ID", type: "number"
						}, {
							name: "Date", type: "date"
						},
						{ name: "isActive", type: "boolean" }
						]
					},
				});
				this.ds2.dataBind();
			},
			beforeEach: function(assert) {
				$.mockjaxSettings.logging = 0;  // only critical error messages
				var done = assert.async();
				//pause testing until tree is initialized
				if (!this.initialized) {
					this.loadTestbeds();
					this.util.wait(500).then(function () { done(); });
					this.initialized = true;
				}
			},
			after: function() {
			}
		});
		QUnit.test("igDataSource events test: DataBinding", function(assert) {
			assert.expect(1);
			assert.equal(true, this.dataBindingFired, true);
		});
		QUnit.test("igDataSource events test: DataBound", function(assert) {
			assert.expect(1);
			assert.equal(true, this.dataBoundFired, true);
		});
		QUnit.test("igDataSource properties test: fields property", function (assert) {
			assert.expect(1);
			var fields = this.ds1.fields([{name: "test1"}, {name: "test2"}]).fields();
			assert.equal(2, fields.length, 2);
		});
		QUnit.test("igDataSource properties test: Schema property", function (assert) {
			assert.expect(1);
			var schema = this.ds1.schema({type:"unknown"}).schema();
			assert.equal("unknown", schema._type, "unknown");
		});
		
		QUnit.test("igDataSource properties test: paging settings property", function (assert) {
			assert.expect(1);
			var ps = this.ds1.pagingSettings({pageSize: 5}).pagingSettings();
			assert.equal(5, ps.pageSize, 5);
			
		});
		QUnit.test("igDataSource properties test: filtering settings property", function (assert) {
			assert.expect(1);
			var fs = this.ds1.filterSettings({filterExprUrlKey: "f"}).filterSettings();
			assert.equal("f", fs.filterExprUrlKey, "f");
		});
		
		QUnit.test("igDataSource properties test: sort settings property", function (assert) {
			assert.expect(1);
			var ss = this.ds1.sortSettings({exprString: "col1 ASC"}).sortSettings();
			assert.equal("col1 ASC", ss.exprString, "col1 ASC");
		});
		QUnit.test("igDataSource properties test: dataSource property test", function (assert) {
			assert.expect(1);
			var ds = this.ds1.dataSource("http://www.infragistics.com").dataSource();
			assert.equal("http://www.infragistics.com", ds, "http://www.infragistics.com");
		});
	
		QUnit.test("igDataSource properties test: type property test", function (assert) {
			assert.expect(2);
			//var t = this.ds1.type("unknown").type();
			this.ds1.type("unknown");
			var t = this.ds1.settings.type;
			if ((t === "unknown" || t === "empty") && t !== undefined && t != null) {
				assert.ok (true, "type is ok", true);
			} else {
				assert.ok(false, "type is not ok", false);
			}
			assert.equal("unknown", this.ds1.settings.type, "unknown");
		});	
		// page index
		QUnit.test("igDataSource properties test: page index property", function (assert) {
			assert.expect(1);
			var ps = this.ds1.pagingSettings({pageSize: 5}).pagingSettings();
			assert.equal(0, this.ds1.pageIndex(), 0);
			
		});
		
		// page count
		QUnit.test("igDataSource properties test: page count property", function (assert) {
			assert.expect(1);
			var ps = this.ds1.pagingSettings({pageSize: 5}).pagingSettings();
			assert.equal(1, this.ds1.pageCount(), 1);
		});	
		// test stringToJSONObject
		QUnit.test("Test stringToJSONObject", function (assert) {
			assert.expect(2);
			var obj = this.ds1.stringToJSONObject('{"p": 5}');
			assert.ok(obj.p === 5, "Test stringToJSONObject");
			assert.throws(
				function () {
					this.ds1.stringToJSONObject('{"p": 5');
				},
				function (err) {
					return err.message.indexOf($.ig.DataSourceLocale.locale.errorParsingJsonNoSchema) > -1;
				},
				$.ig.DataSourceLocale.locale.errorParsingJsonNoSchema + " should be thrown"
			);
		});
		
		QUnit.test("Test creating JSONDataSource", function (assert) {
			 var adventureWorks = {
                "Records": [{
                    "ProductID": 1,
                    "Name": "Adjustable Race",
                    "ProductNumber": "AR-5381"
                }, {
                    "ProductID": 2,
                    "Name": "Bearing Ball",
                    "ProductNumber": "BA-8327"
                }
            ]};
			 var jsonpDs = new $.ig.JSONDataSource({
                        dataSource: adventureWorks,
                        responseDataKey: "Records"
                    });
 
            jsonpDs.dataBind();
			assert.equal(jsonpDs.type(), "json", "Check if dataSource type is correct.");
			assert.equal(jsonpDs.dataView().length, 2, "DataView should contain 2 records.");
			
			jsonpDs = new $.ig.JSONDataSource();

			assert.equal(jsonpDs.type(), "json", "Check if dataSource type is correct.");
		});
		QUnit.test("Test creating HtmlTableDataSource ", function (assert) {
			assert.expect(1);
			var htmltableDs = new $.ig.HtmlTableDataSource ();
			assert.equal(htmltableDs.type(), "htmlTableDom", "Check if dataSource type is correct.");
		});
		
		QUnit.test("Test creating ArrayDataSource  ", function (assert) {
			assert.expect(1);
			var arrayDs = new $.ig.ArrayDataSource();
			assert.equal(arrayDs.type(), "array", "Check if dataSource type is correct.");
		});
		QUnit.test("Test creating RemoteDataSource   ", function (assert) {
			var arrayDs = new $.ig.RemoteDataSource();
			assert.equal(arrayDs.type(), "remoteUrl", "Check if dataSource type is correct.");
		});
		
		QUnit.test("Test creating JSONPDataSource", function (assert) {
			assert.expect(1);
			var JSONPDataSource = new $.ig.JSONPDataSource  ();
			assert.equal(JSONPDataSource.settings.responseDataType , "jsonp", "Check if responseDataType is correct.");
		});
		QUnit.test("Test creating XmlDataSource ", function (assert) {
			assert.expect(1);
			var xmlds  = new $.ig.XmlDataSource();
			assert.equal(xmlds.type(), "xml", "Check if dataSource type is correct.");
		});
		
		QUnit.test("Test creating FunctionDataSource", function (assert) {
			assert.expect(1);
			var funcDs  = new $.ig.FunctionDataSource ();
			assert.equal(funcDs.type(), "function", "Check if dataSource type is correct.");
		});
		QUnit.test("Test if date filtering is correct when enableUTCDates option is enabled", function (assert) {
			assert.expect(1);
			this.ds2.filter([{ fieldName: "Date", expr: this.date, cond: "on", preciseDateFormat: "dd/MM/yyyy hh:mm:ss:ff" }], "AND", true);
			assert.equal(this.ds2.dataView().length, 1, "DataView should contain a single record.");
			this.ds2.clearLocalFilter();
		});
		QUnit.test("Test if date filtering is correct for bool values", function (assert) {
			assert.expect(6);
			this.ds2.filter([{ fieldName: "isActive", cond: "null" }], "AND", true);
			assert.equal(this.ds2.dataView().length, 0, "DataView should contain a 0 records.");

			this.ds2.clearLocalFilter();

			this.ds2.filter([{ fieldName: "isActive", cond: "empty" }], "AND", true);
			assert.equal(this.ds2.dataView().length, 1, "DataView should contain 1 record.");

			this.ds2.filter([{ fieldName: "isActive", cond: "notEmpty" }], "AND", true);
			assert.equal(this.ds2.dataView().length, 2, "DataView should contain a 2 records.");

			this.ds2.filter([{ fieldName: "isActive", cond: "notNull" }], "AND", true);
			assert.equal(this.ds2.dataView().length, 3, "DataView should contain a 2 records.");

			var errorCont = 0;
			try {
				this.ds2.filter([{ fieldName: "isActive", cond: "nonExistentCondition" }], "AND", true);
			} catch (e) {
				errorCont++;
				assert.equal(e.message, " The filter condition that was passed was not recognized: nonExistentCondition", "If invalid condition is passed an error should be thrown with the correct error message.");
			}
			assert.equal(errorCont, 1, "If invalid condition is passed an error should be thrown.");
			this.ds2.clearLocalFilter();
		});
		QUnit.test("Test filtering for customConditions", function (assert) {
			assert.expect(4);
			this.ds2.clearLocalFilter();
		
			this.ds2.settings.filtering.customConditions = {
				"Over": {
					labelText: "Over 1",
					expressionText: "Over 1",
					requireExpr: false,
					filterFunc: this.filerFunc
				},
				"Under": {
					labelText: "Under 2",
					expressionText: "Under 2",
					requireExpr: false,
					filterFunc: this.filerFunc2
				},
				"Error": {
					labelText: "Error",
					expressionText: "Error",
					requireExpr: false,
					filterFunc: "filerFunc3"
				}
			};

			this.ds2.filter([{ fieldName: "ID", cond: "Over" }], "AND", true);
			assert.equal(this.ds2.dataView().length, 2, "There should be two items corresponding to the custom filtering condition");

			this.ds2.clearLocalFilter();
			this.ds2.filter([{ fieldName: "ID", cond: "Under" }], "AND", true);
			assert.equal(this.ds2.dataView().length, 1, "There should be 1 item corresponding to the custom filtering condition");

			this.ds2.clearLocalFilter();
			var errorCount = 0;
			try {
				this.ds2.filter([{ fieldName: "ID", cond: "Error" }], "AND", true);
			} catch (e) {
				errorCount++;
				assert.equal(e.message, "An unexpected value was provided for a custom filtering function. A function or string is expected.", "If filterFunc does not exist an error should be thrown and the error message should be correct.");
			}
			assert.equal(errorCount, 1, "If filterFunc does not exist an error should be thrown")
		});
	 	QUnit.test("Test filtering for customConditions with requireExpr: true:", function (assert) {
			 assert.expect(2);
			 this.ds2.clearLocalFilter();
			 this.ds2.settings.filtering.customConditions = {
	 			"ValueGreaterThan": {
	 				labelText: "ValueGreaterThan",
	 				expressionText: "ValueGreaterThan",
	 				requireExpr: true,
	 				filterFunc: function (val, expr) { 
						return val > expr ? true : false;
					}
	 			}
	 		};
	 		this.ds2.filter([{ fieldName: "ID", cond: "ValueGreaterThan", expr: 2 }], "AND", true);
	 		assert.equal(this.ds2.dataView().length, 1, "There should be 1 record matching the filter condition.");
	 		assert.equal(this.ds2.dataView()[0].ID, 3, "There record ID value should match the filter condition.");
		})
	
	

		
		QUnit.module("igDataSource API Methods", {
			dsSummaries: null,
			dsLocal: null,
			hierarchicalDS: null,
			isInitialized: false,
			util: $.ig.TestUtil,
			data: [
				{ "ID": 0, "Name": "Bread", "Price": 2.5 },
				{ "ID": 1, "Name": "Milk", "Price": 3.5 },
				{ "ID": 2, "Name": "Vint soda", "Price": 20.9 }
			],
			jsonData: [
				{
					"ID": 0,
					"Name": "Food",
					"Category": { "d": [{ "ID": 0, "Name": "Food", "Active": true, "Date": "\/Date(1059660800000)\/" }] },
					"Products": [
                	    { "ID": 0, "Name": "Bread", "Price": "2.5" }
					]
				},
				{
					"ID": 1,
					"Name": "Beverages",
					"Category": { "d": [{ "ID": 2, "Name": "Beverages", "Active": true, "Date": "\/Date(1159660800000)\/" }] },
					"Products": [
						{ "ID": 1, "Name": "Milk", "Price": "3.5" },
						{ "ID": 2, "Name": "Vint soda", "Price": "20.9" }
					]
				},
				{
					"ID": 2,
					"Name": "Electronics",
					"Category": { "d": [{ "ID": 5, "Name": "Electronics", "Active": false, "Date": "\/Date(1859660800000)\/" }] },
					"Products": [
						{ "ID": 7, "Name": "DVD Player", "Price": "35.88" },
						{ "ID": 8, "Name": "LCD HDTV", "Price": "1088.8" }
					]
				}
			],
			loadAPITestbeds: function (){
				this.dsSummaries = new $.ig.DataSource({
					dataSource: this.data,
					schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}]
					},
					summaries: {
						type: "local",
						columnSettings: [{
							columnKey: "Price",
							allowSummaries: true,
							summaryOperands: [{
								type: "count",
								active: true,
								order: 0
							}]
						}]
					}, 
					paging: {type: "local", pageSize:1}
				});
				this.dsSummaries.dataBind();

				this.dsLocal = new $.ig.DataSource({
					dataSource: this.data,
					primaryKey: "ID",
					schema: {
						fields: [
						{
							name: "ID"
						},
						{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}]
					},
					summaries: {
						type: "local"
					}, 
					paging: {type: "local", enabled:true},
					filtering: { type: "local", defaultFields: [], enabled: true },
					sorting: { type: "local", defaultFields: [], applyToAllData: true, enabled: true, expressions:[] }
				});
				this.dsLocal.dataBind();

				this.hierarchicalDS = new $.ig.DataSource({
					dataSource: this.jsonData,
					primaryKey: "ID",
					defaultChildrenDataProperty: "Products",
					schema: {
						fields: [
						{
							name: "ID"
						},
						{
							name: "Name"
						}
						],
						layouts: {
							"/Products": {
								key: "Products",
								fields: [
								{
									name: "ID"
								},
								{
									name: "Name"
								}
								]
							},
							"/Category": {
								responseDataKey: "d",
								key: "Category",
								fields: [
								{
									name: "ID"
								},
								{
									name: "Name"
								}
								]
							}
						}
					}
				});
				this.hierarchicalDS.dataBind();
			},
			before: function (assert) {
				var done = assert.async();
				//pause testing until data source is initialized
				if (!this.isInitialized) {
					this.loadAPITestbeds();
					this.util.wait(500).then(function () { done(); });
					this.isInitialized = true;
				}
			},
			after: function () {
			}
		});

		QUnit.test("Test clearLocalSorting/clearLocalFilter API methods", function (assert) {
			assert.expect(4);
			var done = assert.async(),
				dsLocalOperations = new $.ig.DataSource({
					dataSource: [
					{ "ID": 0, "Name": "Bread", "Price": 2.5 },
					{ "ID": 1, "Name": "Milk", "Price": 3.5 },
					{ "ID": 2, "Name": "Vint soda", "Price": 20.9 }
					],
					primaryKey: "ID",
					schema: {
						fields: [
						{
							name: "ID"
						},
						{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}]
					},
					summaries: {
						type: "local"
					},
					paging: { type: "local", enabled: true },
					filtering: { type: "local", defaultFields: [], enabled: true },
					sorting: { type: "local", defaultFields: [], applyToAllData: true, enabled: true, expressions: [] }
				});

			dsLocalOperations.dataBind();
			this.util.wait(500).then(function () {
				done();
				dsLocalOperations.sort([{ fieldName: "ID" }], "desc", false);
				dsLocalOperations.filter([{ fieldName: "ID", expr: 2, cond: "lessThan" }], "AND", true);

				dsLocalOperations.pageSize(1);
				dsLocalOperations.pageIndex(2);

				assert.equal(dsLocalOperations.dataView().length, 1, "There should be 1 record in the dataView.");
				assert.equal(dsLocalOperations.dataView()[0].ID, 1, "Data should be sorted in descending order - top record should be with ID:1");
				assert.equal(dsLocalOperations.filteredData().length, 2, "Filtered data should contain 2 records.");

				dsLocalOperations.clearLocalFilter();

				//assert.equal(dsLocalOperations.filteredData().length, 1, "Filtered data should contain 1 record.");
				
				dsLocalOperations.filter([{ fieldName: "ID", expr: 2, cond: "lessThan" }], "AND", true);

				dsLocalOperations.clearLocalSorting();

				assert.equal(dsLocalOperations.settings.sorting.expressions.length, 0, "There should be no expressions for sorting after clearLocalSorting is called.");
			});
		});
		QUnit.test("Test clearLocalFilter when sorting and paging are enabled", function (assert) {
			assert.expect(2);
			var dsLocalOperations = new $.ig.DataSource({
				dataSource: [
				{ "ID": 0, "Name": "Bread", "Price": 2.5 },
				{ "ID": 1, "Name": "Milk", "Price": 3.5 },
				{ "ID": 2, "Name": "Vint soda", "Price": 20.9 }
				],
				primaryKey: "ID",
				schema: {
					fields: [
					{
						name: "ID"
					},
					{
						name: "Name"
					}, {
						name: "Price"
					}, {
						name: "Rating"
					}]
				},
				summaries: {
					type: "local"
				},
				paging: { type: "local", enabled: true, pageSize:1, pageIndex:2 },
				filtering: { type: "local", defaultFields: [], enabled: true, applyToAllData:true},
				sorting: { type: "local", defaultFields: [], applyToAllData: true, enabled: true, expressions: [{ fieldName: "ID", dir: "desc" }] }
			});
			dsLocalOperations.dataBind();
			dsLocalOperations.clearLocalFilter();

			//check if paging is reset
			assert.equal(dsLocalOperations.pageIndex(),0, "paging is reset");
			//check if sorting is still applied
			assert.ok(dsLocalOperations.dataView()[0].ID === 2, "Sorting is applied.");
		});
		QUnit.test("Test dataSummaries API method", function (assert) {
			assert.expect(1);
			var summariesData = this.dsSummaries.dataSummaries();
			assert.equal(summariesData, this.dsSummaries.dataView(), "When local summaries are enabled the data.")
		});

		QUnit.test("Test summariesSettings API method", function (assert) {
			assert.expect(2);
			var summariesSettings = this.dsSummaries.summariesSettings();
			assert.equal(summariesSettings, this.dsSummaries.settings.summaries, "summariesSettings API method should return the current summary settings.");
			var newSettings = { type: "local" };
			this.dsSummaries.summariesSettings(newSettings);
			assert.equal(this.dsSummaries.settings.summaries, newSettings, "Verify that settings have been applied.");

		});
		QUnit.test("Test hasTotalRecordsCount API method", function (assert) { 
			assert.expect(1);
			var ds = new $.ig.DataSource();
			ds.hasTotalRecordsCount(true);
			assert.ok(ds.hasTotalRecordsCount(),"Verify value is applied correctly.");
		});

		QUnit.test("Test schema API method", function (assert) {
			assert.expect(1);
			var ds = new $.ig.DataSource();
			var schema = {
				fields: [{
					name: "ID", type: "number"
				}, {
					name: "Name", type: "string"
				}
				]
			};
			//set
			ds.schema(schema, "json");
			assert.equal(JSON.stringify(ds._schema.fields()), JSON.stringify(schema.fields), "Verify schema is applied correctly.");
		});

		QUnit.test("Test analyzeDataSource API method", function (assert) {
			assert.expect(2);
			var ds = new $.ig.DataSource();
			ds.settings.dataSource = function () { };
			assert.equal(ds.analyzeDataSource(), "function", "Verify analyzeDataSource returns correct results.");
			ds.settings.dataSource = "[invalid]";
			
			assert.equal(ds.analyzeDataSource(), "unknown", "Verify analyzeDataSource returns correct results.");
		});
		QUnit.test("Test addRow when rowAdded option is defined", function (assert) {
			assert.expect(2);
			var rowAddedFuncCalled = false,
				done = assert.async(),
				self = this;
			this.dsLocal.settings.callee = function () {
			};
			this.dsLocal.settings.rowAdded = function(){
				rowAddedFuncCalled= true;
			};
			this.dsLocal.addRow(100, { "ID": 100, "Name": "Bread", "Price": 2.5 }, true);
			this.util.wait(100).then(function(){
				//check when there is a callback func
				assert.ok(rowAddedFuncCalled, "The rowAdded function should be called.");

				self.dsLocal.settings.callee = null;
				rowAddedFuncCalled = false;
				self.dsLocal.addRow(101, { "ID": 100, "Name": "Bread", "Price": 2.5 }, true);
				return self.util.wait(100);
			}).then(function(){
				done();
					//check when there is no callback func
					assert.ok(rowAddedFuncCalled, "The rowAdded function should be called.");
					
				});
		});
		QUnit.test("Test deleteRow when rowDeleted option is defined", function (assert) {
			assert.expect(2);
			var done = assert.async(),
				self = this,
				rowDeletedFuncCalled = false;
			this.dsLocal.settings.aggregateTransactions = false;

			this.dsLocal.settings.callee = function () {
			};
			this.dsLocal.settings.rowDeleted = function () {
				rowDeletedFuncCalled = true;
			};

			this.dsLocal.deleteRow(101, true);
			this.util.wait(100).then(function () {
				assert.ok(rowDeletedFuncCalled, "rowDeleted function should be called.");
				rowDeletedFuncCalled = false;
				self.dsLocal.settings.callee = null;
				self.dsLocal.deleteRow(100, true);
				return self.util.wait(100);
			}).then(function () {
					done();
					assert.ok(rowDeletedFuncCalled, "rowDeleted function should be called.")
			});
		});
		QUnit.test("Test insertRow when rowInserted option is defined", function (assert) {
			assert.expect(2);
			var done = assert.async(),
				self = this,
				rowInsertedFuncCalled = false;
			this.dsLocal.settings.callee = function () {
			};
			this.dsLocal.settings.rowInserted = function () {
				rowInsertedFuncCalled = true;
			};

			this.dsLocal.insertRow(1001, { "ID": 1001, "Name": "Bread", "Price": 2.5 }, 2, false);
			this.util.wait(100).then(function () {
				assert.ok(rowInsertedFuncCalled, "rowInserted function should be called.");
				rowInsertedFuncCalled = false;
				self.dsLocal.settings.callee = null;
				self.dsLocal.insertRow(1001, { "ID": 1001, "Name": "Bread", "Price": 2.5 }, 2, false);
				return self.util.wait(100);
			}).then(function () {
					done();
					assert.ok(rowInsertedFuncCalled, "rowInserted function should be called.")
				});
			
		});
		QUnit.test("Test updateRow when rowUpdated option is defined", function (assert) {
			assert.expect(2);
			var done = assert.async(),
				self = this,
				rowUpdatedFuncCalled = false;
			
			this.dsLocal.settings.callee = function () {
			};
			this.dsLocal.settings.rowUpdated = function () {
				rowUpdatedFuncCalled = true;
			};

			this.dsLocal.updateRow(1001, { "ID": 1001, "Name": "Update", "Price": 2.5 }, false);
			this.util.wait(100).then(function () {
				assert.ok(rowUpdatedFuncCalled, "rowInserted function should be called.");
				rowUpdatedFuncCalled = false;
				self.dsLocal.settings.callee = null;
				self.dsLocal.updateRow(1001, { "ID": 1001, "Name": "Updated2", "Price": 2.5 }, false);
				return self.util.wait(100);
			}).then(function () {
					done();
					assert.ok(rowUpdatedFuncCalled, "rowInserted function should be called.")
				});
		});
		
		QUnit.test("Test commit API method - commit all", function (assert) {
			assert.expect(2);
			assert.equal(this.dsLocal.pendingTransactions().length, 2, "Pending transactions should be 2.");
			this.dsLocal.commit();
			assert.equal(this.dsLocal.pendingTransactions().length, 0, "Pending transactions should be empty.");

		});
		
		QUnit.test("Test adding a record and then updating it.", function (assert) {
			assert.expect(1);
			this.dsLocal.settings.aggregateTransactions = true;
			this.dsLocal.addRow(123, { "ID": 1001, "Name": "New", "Price": 2.5 }, false);

			this.dsLocal.updateRow(123, { "ID": 123, "Name": "New + Update", "Price": 2.5 }, false);

			this.dsLocal.setCellValue(123, "Name",  "New + Update 2", false);

			assert.equal(this.dsLocal.pendingTransactions()[0].row.Name, "New + Update 2",
				"Verify new row transaction was updated correctly.");

			this.dsLocal.pendingTransactions().clear();
		});
		
		QUnit.test("Test updating record in array data source", function (assert) { 
			assert.expect(1);
			var data = [
					[1, "Name1"],
					[2, "Name2"]
				],
				 ds = new $.ig.DataSource({
				localSchemaTransform: false,
				dataSource: data,
				schema: {
					fields: [{
						name: "ID", type: "number"
					}, {
						name: "Name", type: "string"
					}
					]
				},
			}),
			done = assert.async()
			self = this;

			ds.dataBind();
			this.util.wait(200).then(function () {
				done();
				ds.updateRow(1, [1, "Updated name"], false);
				ds.commit();
				assert.equal(ds.dataView()[1][1], "Updated name", "Verify value is properly updated.");
			});
		});
		QUnit.test("Test adding row for child layout - schema.layouts", function (assert) {
			assert.expect(1);
			var done = assert.async(),
				self = this;
			this.util.wait(100).then(function () {
				self.hierarchicalDS.addRow(200, { "ID": 200, "Name": "Food200" }, true);
				var newRec = self.hierarchicalDS.data()[self.hierarchicalDS.data().length - 1];
				assert.ok(newRec.ID === 200 &&  Array.isArray(newRec.Category.d) && Array.isArray(newRec.Products), "Verify that the child layout collections are created in the new record.");
				done();
			});
		});
		QUnit.test("Test sorting on child layout.", function (assert) {
			assert.expect(2);
			this.hierarchicalDS.settings.dataSource = "remoteUrl?layout=Products";
			this.hierarchicalDS.settings.sorting = {
				enabled: true,
				type: "remote",
				sortUrlAscValueKey: "asc",
				sortUrlDescValueKey: "desc",
				sortUrlKey: "sort",
				expressions : [
				{
					fieldName: "ID",
					dir: "desc",
					layout: "Products"
				}
				]
			};
			
			var params = $.param(this.hierarchicalDS._encodeUrl());
			assert.equal(params, "sort(ID)=desc&pk=ID", "Verify that sorting request for child layout is properly encoded.");

			this.hierarchicalDS.settings.dataSource = "remoteUrl";
			var params = $.param(this.hierarchicalDS._encodeUrl());
			assert.equal(params, "sort(ID)=desc&layout=Products&pk=ID", "Verify that sorting request for child layout is properly encoded.");
		});
		QUnit.test("Test rollback API method - rollback transaction by id", function (assert) {
			assert.expect(2);
			var transaction = this.dsLocal.addRow(999, { "ID": 999, "Name": "Bread", "Price": 2.5 }, false);

			assert.equal(this.dsLocal.pendingTransactions().length, 1, "There should be a single pending transaction.");

			this.dsLocal.rollback(transaction.rowId);

			assert.equal(this.dsLocal.pendingTransactions().length, 0, "There should be a no pending transaction after the transaction has been rolled back.");
		});
		QUnit.test("Test _removeTransactionsByRecordId API", function (assert) {
			assert.expect(3);
			this.dsLocal.addRow(998, { "ID": 998, "Name": "Bread", "Price": 2.5 }, false);
			this.dsLocal.addRow(999, { "ID": 999, "Name": "Bread", "Price": 2.5 }, false);
			
			this.dsLocal._removeTransactionsByRecordId(999);
			assert.equal(this.dsLocal.pendingTransactions().length, 1, "There should be 1 pending transaction after one transaction has been removed.");
			assert.equal(this.dsLocal.pendingTransactions()[0].row.ID, 998, "There should be 1 transaction remaining for row with ID 998.");
			
			this.dsLocal._removeTransactionsByRecordId(998);
			assert.equal(this.dsLocal.pendingTransactions().length, 0, "There should no pending transaction the transaction has been removed.");
		});

		QUnit.test("Test transactionsAsString API", function (assert) {
			assert.expect(1);
			this.dsLocal.allTransactions().clear();
			var t = this.dsLocal.addRow(999, { "ID": 999, "Name": "Bread", "Price": 2.5 }, false);
			var transactions = this.dsLocal.transactionsAsString();
			assert.equal(transactions, '[{"type":"newrow","tid":"' + t.tid + '","row":{"ID":999,"Name":"Bread","Price":2.5},"rowId":999}]', "transactionsAsString should return all transactions parsed to string.");

		});
		QUnit.test("Test removeRecordByIndex API method", function (assert) { 
			assert.expect(5);
			var data = [
				{ "ID": 0, "Name": "Bread", "Price": 2.5 },
				{ "ID": 1, "Name": "Milk", "Price": 3.5 },
				{ "ID": 2, "Name": "Vint soda", "Price": 20.9 }
			];
			this.dsLocal.removeRecordByIndex(1, data);
			assert.equal(data.length, 2, "One item should be removed from the data.");
			assert.equal(data[data.length - 1].ID, 2, "The last item should be with ID = 2.");
			
			//verify that collection does not change if invalid index is passed
			this.dsLocal.removeRecordByIndex(2, data);
			assert.equal(data.length, 2, "One item should be removed from the data.");
			assert.equal(data[data.length - 1].ID, 2, "The last item should be with ID = 2.");
			var errors = 0;
			try {
				//verify that if no data is passed no error is thrown
				this.dsLocal.removeRecordByIndex(2);
			} catch (e) {
				errors++;
			}
			assert.equal(errors, 0, "No errors should be thrown.");

		});
		QUnit.test("Test saveChanges API method - error", function (assert) {
			assert.expect(8);
			var callBackCalled = false,
				 customCallBackCalled = false,
				 self = this,
				 done = assert.async();
			this.dsLocal.allTransactions().clear();
			function errorCallbackFunc() {
				callBackCalled = true;
			}
			this.dsLocal._addChangesErrorHandler(errorCallbackFunc);

			$.mockjax({
				url: 'updateFail',
				responseText: {
					Success: false
				}
			});
			this.dsLocal.allTransactions().clear();
			this.dsLocal.settings.updateUrl = "updateFail";

			this.dsLocal.addRow(9999, { "ID": 9999, "Name": "Bread", "Price": 2.5 }, true);

			assert.equal(this.dsLocal.allTransactions().length, 1, "There should be a single unsaved transaction.");

			this.dsLocal.saveChanges(function () { }, function () { customCallBackCalled = true; });
			this.util.wait(500).then(function () {
				assert.equal(self.dsLocal.allTransactions().length, 1, "There should still be a single unsaved transactions.");
				assert.ok(callBackCalled, "Error callback should be called.");
				assert.ok(customCallBackCalled, "Custom Error callback should be called.");

				self.dsLocal.settings.updateUrl = "updateFail2";
				callBackCalled = false;
				customCallBackCalled = false;
				self.dsLocal.saveChanges(function () { }, function () { customCallBackCalled = true; });
				return self.util.wait(100);
				}).then(function () {
					assert.equal(self.dsLocal.allTransactions().length, 1, "There should still be a single unsaved transactions.");
					assert.ok(callBackCalled, "Error callback should be called.");
					assert.ok(customCallBackCalled, "Custom Error callback should be called.");
					callBackCalled = false;
					self.dsLocal._removeChangesErrorHandler(errorCallbackFunc);
					return self.util.wait(100);
				}).then(function () {
						assert.ok(!callBackCalled, "Error callback should note be called since handler was removed.");
						done();
					});
		});
		QUnit.test("Test saveChanges API method - success", function (assert) {
			assert.expect(5);
			this.dsLocal.allTransactions().clear();
			var callBackCalled = false,
				customCallBackCalled = false,
				done = assert.async(),
				self = this;
			$.mockjax({
				url: 'updateSuccess',
				responseText: {
					Success: true
				}
			});
			this.dsLocal.allTransactions().clear();
			this.dsLocal.settings.updateUrl = "updateSuccess";
			
			function successCallbackFunc() { 
				callBackCalled = true;
			}
			this.dsLocal._addChangesSuccessHandler(successCallbackFunc);

			this.dsLocal.addRow(999, { "ID": 999, "Name": "Bread", "Price": 2.5 }, true);

			assert.equal(this.dsLocal.allTransactions().length, 1, "There should be a single unsaved transaction.");

			this.dsLocal.saveChanges(function () { customCallBackCalled = true; });

			this.util.wait(500).then(function () {
				assert.equal(self.dsLocal.allTransactions().length, 0, "There should be no unsaved transactions after saveChanges is called and the request is successful.");
				assert.ok(callBackCalled, "Success callback should be called.");
				assert.ok(customCallBackCalled, "Custom Success callback should be called.");

				self.dsLocal._removeChangesSuccessHandler(successCallbackFunc);
				callBackCalled = false;
				self.dsLocal.saveChanges();
				return self.util.wait(100);
			}).then(function () {
					assert.ok(!callBackCalled, "Callback should not be called since handler was removed.");
					done();
				});
		});
		QUnit.test("Test getDetachedRecord API method", function (assert) {
			assert.expect(2);
			var arrayData = [
				[0, "Bread", 2.5],
				[1, "Milk", 3.5],
				[2, "Vint soda", 20.9]
			],
			done = assert.async(),
			self = this;
			this.dsLocal.settings.localSchemaTransform = false;
			this.dsLocal.settings.dataSource = arrayData;
			this.dsLocal.settings.primaryKey = null;

			this.dsLocal.dataBind();
			this.util.wait(200).then(function () {
				done();
				var t = self.dsLocal.setCellValue(0, "Name", "NewVal", true);
				var rec = self.dsLocal.getDetachedRecord(t);
				self.dsLocal.setCellValue(0, "Name", "NewVal123", true);
				
				assert.equal(rec.Name, "NewVal", "Detached value should be updated.");

				self.dsLocal.settings.primaryKey = "ID";

				var t2 = self.dsLocal.addRow(3, [3, "New Rec", 20.9], true);
				var rec2 = self.dsLocal.getDetachedRecord(t2);
				assert.equal(rec2[1], "New Rec", "Detached value should be updated.");
			});
		});
		QUnit.test("Test remote summaries - encoded summaries params", function (assert) {
			assert.expect(1);
			var done = assert.async(),
				self = this;
			this.dsSummaries.settings.dataSourceUrl = "getRemoteSummaries";
			this.dsSummaries.settings.summaries = {
				type: "remote",
				summaryExprUrlKey: "summaries",
				columnSettings: [{
					columnKey: "Price",
					allowSummaries: true,
					summaryOperands: [{
						type: "count",
						active: true,
						order: 0
					}]
				}]
			};
			this.util.wait(200).then(function () {
				done();
				var params = $.param(self.dsSummaries._encodeUrl());
				assert.equal(params, "summaries(Price)=count");
			});
		});
	 	QUnit.test("Test remote filtering - encoded filtering params", function (assert) {
			assert.expect(2);
		 var date = new Date(),
			 dsFilter = new $.ig.DataSource({
			 dataSource: "filteringUrl",
			 filtering: {
				type: "remote",
				filterExprUrlKey: "filterKey",
				expressions: [
				{ fieldName: "Date", expr: date, cond: "on" },
				{ fieldName: "Date2", cond: "lastMonth" },
				{ fieldName: "Date3", cond: "nextMonth" },
				{ fieldName: "Boolean", cond: "true" },
				{ fieldName: "Boolean2", cond: "false" },
				{ fieldName: "String", expr: "A", cond: "doesNotEqual" },
				{ fieldName: "Boolean3", expr: true, cond: "doesNotEqual" }
				],
				enabled: true }
			}),
			ticks = Date.UTC(
						   date.getFullYear(),
						   date.getMonth(),
						   date.getDate(),
						   date.getHours(),
						   date.getMinutes()
					   ),
	 		params = $.param(dsFilter._encodeUrl());
	 		assert.equal(params, "filterKey(Date)=on(" + ticks + ")&filterKey(Date2)=lastMonth()&filterKey(Date3)=nextMonth()&filterKey(Boolean)=true()&filterKey(Boolean2)=false()&filterKey(String)=doesNotEqual(A)&filterKey(Boolean3)=doesNotEqual(true)",
				"Verify that all parameters were properly encoded.");
	 		
	 		dsFilter.settings.filtering.filterExprUrlKey = null;
			var prevMonthDate = new Date(ticks);
			prevMonthDate.setDate(15); //prevent month change due to date limits
			prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
			var nextMonthDate = new Date(ticks);
			nextMonthDate.setDate(15); //prevent month change due to date limits
			nextMonthDate.setMonth(nextMonthDate.getMonth() + 1)

			var prevMonth = prevMonthDate.getMonth() + 1;
	 		var currMonth = date.getMonth() + 1;
			var nextMonth = nextMonthDate.getMonth() + 1;
			var nYear = nextMonthDate.getFullYear();
			var prevMonthYear = prevMonthDate.getFullYear();

			var params = unescape($.param(dsFilter._encodeUrl()));
			assert.equal(params,
				"$filter=day(Date) eq " + date.getDate().toString() + " and month(Date) eq " + currMonth.toString() + " and year(Date) eq " + date.getFullYear().toString() +
				" and month(Date2) eq " + prevMonth.toString() + " and year(Date2) eq " + prevMonthYear.toString() + " and month(Date3) eq " +
				nextMonth.toString() + " and year(Date3) eq " + nYear.toString() +
				" and Boolean eq true and Boolean2 eq false and tolower(String) ne 'a' and Boolean3 ne true");

		});
		QUnit.test("Test binding to remote xml data when no schema is defined.", function (assert) { 
			var xmlString = '<Response><Item><Name>Item1</Name></Item><Item><Name>Item2</Name></Item><Item><Name>Item3</Name></Item></Response>',
				done = assert.async(),
				self = this;

			$.mockjax({
				url: 'getXMLDataSummaries',
				responseText: xmlString
			});

			var dsSummariesRemote = new $.ig.DataSource({
				//responseDataKey: "data",
				dataSource: "getXMLDataSummaries",
				summaries: {
					type: "remote",
					columnSettings: [{
						columnKey: "song",
						allowSummaries: true,
						summaryOperands: [{
							type: "count",
							active: true,
							order: 0
						}]
					}]
				}, 
				paging: { type: "remote", enabled:true, appendPage:true}
			});

			dsSummariesRemote.dataBind();
			this.util.wait(500).then(function () {
				done();
				var currData = dsSummariesRemote.data();
				assert.equal(currData.length, 3, "Check if data length is correct. There should be 3 records.");
				assert.equal(currData[0].Name, "Item1", "Check if value is correctly parsed.");
			});
		});
		QUnit.test("Test _dataFilter method for xml data", function (assert) {
			assert.expect(1);
			var xmlres = '<Response><Session>542235629</Session><Tracks start="1" count="10" total="98" errorCount="0" defaultSort="popularity+" description="Top 100 Tracks" name="Top 100 Tracks"><Track id="59672468" rating="-1" title="I Kissed A Girl"> <Artist id="30326214" rating="-1">Katy Perry</Artist> </Track> </Tracks></Response>';
			
			var dsXML = new $.ig.DataSource({
				filtering: { type: "remote", expressions: [], defaultFields: [{ fieldName: "song", expr: "I Kissed A Girl", cond: "equals" }] },
				responseDataKey: "Response",				
				schema: { fields: [{ name: "artist", xpath: "Artist" }], searchField: "//Track" }
			});
			dsXML.context = dsXML;
			var xmlObject = dsXML.stringToXmlObject(xmlres),
				data = dsXML._dataFilter(xmlObject),
				done = assert.async(),
				self = this;
			this.util.wait(500).then(function(){
				done();
				assert.equal(data.length, 1, "Verify data is processed correctly.");
				//equal(data[0].artist, "Katy Perry", "Verify data is processed correctly.");
			});
		});
		QUnit.test("Test binding to remote - error", function (assert) {
			assert.expect(1);
			var errorMessage = "",
			    dsRemote = new $.ig.DataSource({
				dataSource: "invalidUrl",
				callback: function (success, error) {
					if (!success) { 
						errorMessage = error;
					}
				},
				schema: {
					fields: [{ name: "song", xpath: "@title" }, { name: "artist", xpath: "Artist" }]
				}
			}),
			done = assert.async();
			dsRemote.dataBind();
			this.util.wait(500).then(function () { 
				done();
				assert.equal(errorMessage, "The remote request to fetch data has failed:  ( 404 Not Found ) ", "An error message with the correct text should be returned.");
			});
		});