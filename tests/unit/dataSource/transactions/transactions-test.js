			QUnit.module("igDataSource transactions (autoCommit - ", {
				ds1: null,
				ds2: null,
				initialized: false,
				util: $.ig.TestUtil,
				adventureWorks: [
								{"ProductID":1,"Name":"Adjustable Race","ProductNumber":"AR-5381","MakeFlag":false,"FinishedGoodsFlag":false,"Color":null,"SafetyStockLevel":1000,"ReorderPoint":750,"StandardCost":0.0000,"ListPrice":0.0000,"Size":null,"SizeUnitMeasureCode":null,"WeightUnitMeasureCode":null,"Weight":null,"DaysToManufacture":0,"ProductLine":null,"Class":null,"Style":null,"ProductSubcategoryID":null,"ProductModelID":null,"SellStartDate":"\/Date(896648400000)\/","SellEndDate":null,"DiscontinuedDate":null,"rowguid":"694215b7-08f7-4c0d-acb1-d734ba44c0c8","ModifiedDate":"\/Date(1078992096827)\/"},
								{"ProductID":2,"Name":"Bearing Ball","ProductNumber":"BA-8327","MakeFlag":false,"FinishedGoodsFlag":false,"Color":null,"SafetyStockLevel":1000,"ReorderPoint":750,"StandardCost":0.0000,"ListPrice":0.0000,"Size":null,"SizeUnitMeasureCode":null,"WeightUnitMeasureCode":null,"Weight":null,"DaysToManufacture":0,"ProductLine":null,"Class":null,"Style":null,"ProductSubcategoryID":null,"ProductModelID":null,"SellStartDate":"\/Date(896648400000)\/","SellEndDate":null,"DiscontinuedDate":null,"rowguid":"58ae3c20-4f3a-4749-a7d4-d568806cc537","ModifiedDate":"\/Date(1078992096827)\/"}
				],
				loadTestbeds: function(){
					this.ds1 = new $.ig.DataSource({dataSource: this.adventureWorks, aggregateTransactions: false, primaryKey: "ProductID"});
					this.ds1.dataBind();

					this.ds2 = new $.ig.DataSource({dataSource: this.adventureWorks, aggregateTransactions: true, primaryKey: "ProductID"});
					this.ds2.dataBind();
				},
				beforeEach: function(assert) {
					var done = assert.async();
					//pause testing until tree is initialized
					if (!this.initialized) {
						this.loadTestbeds();
						this.util.wait(500.).then(function () { done(); });
						this.initialized = true;
					}
				},
				afterEach: function() {
				}
			});

		QUnit.test("check addRow => deleteRow (same row) generates two transactions when aggregateTransactions is false", function(assert) {
			assert.expect(1);
				this.ds1.addRow(11101, {ProductID: 11101, Name: "Raz dva tri", MakeFlag: true}, false);
				// delete the row
				this.ds1.deleteRow(11101);
				assert.equal(this.ds1.pendingTransactions().length > 0, true);
				this.ds1.rollback();
			});
		QUnit.test("check that addRow => deleteRow (same row) generates no transactions when aggregateTransactions is true", function(assert) {
				assert.expect(1);
				this.ds2.addRow(11101, {ProductID: 11101, Name: "Raz dva tri", MakeFlag: true}, false);
				// delete the row
				this.ds2.deleteRow(11101);
				assert.equal(this.ds2.pendingTransactions().length, 0);
		});

		QUnit.test("check when a cell is edited, then edited again to its original value, there are two transactions when aggregateTransactions is false", function(assert) {
				assert.expect(1);
				this.ds1.setCellValue(1, "Name", "new value");
				this.ds1.setCellValue(1, "Name", "Adjustable Race");
	//				Datasource.js: An optimization was made to lower down the transaction log count, so the case is to have only 1 transaction
	//				_addTransaction: function (t) {
	//							var exists = false, i = 0, prop, globalt, j, dirty = true, k;
	//							if (t.type === "cell") {
	//								// check if we don't have an existing transaction and if we do, overwrite it
	//								for (i = 0; i < this._transactionLog.length; i++) {
				assert.equal(this.ds1.pendingTransactions().length, 1);
				this.ds1.rollback();
			});
			QUnit.test("check when a cell is edited, then edited again to its original value, there are no transactions when aggregateTransactions is true", function(assert) {
				assert.expect(1);
				this.ds2.setCellValue(1, "Name", "new value");
				this.ds2.setCellValue(1, "Name", "Adjustable Race");
				assert.equal(this.ds2.pendingTransactions().length, 0);
				this.ds2.rollback();
			});
			QUnit.test("check when cells in a row is edited, then edited again to its original value, there are two transactions when aggregateTransactions is false", function(assert) {
				assert.expect(1);
				this.ds1.updateRow(1, {Name: "new value", ProductNumber : "AR-111111"});
				this.ds1.updateRow(1, {Name: "Adjustable Race", ProductNumber : "AR-5381"});
				assert.equal(this.ds1.pendingTransactions().length, 1);
				this.ds1.rollback();
			});
			QUnit.test("check when cells in a row is edited, then edited again to its original value, there are no transactions when aggregateTransactions is true", function(assert) {
				assert.expect(1);
				this.ds2.updateRow(1, {Name: "new value", ProductNumber : "AR-111111"});
				this.ds2.updateRow(1, {Name: "Adjustable Race", ProductNumber : "AR-5381"});
				assert.equal(this.ds2.pendingTransactions().length, 0);
				this.ds2.rollback();
			});
			QUnit.test("test for bug #223515 check if rows are not added more than once if there is _filterData",function (assert) {
				assert.expect(3);
				var ds = new $.ig.DataSource({
					dataSource: [
						{ "ProductID": 1, "Name": "Adjustable Race", "ProductNumber": "AR-5381" },
						{ "ProductID": 2, "Name": "Bearing Ball", "ProductNumber": "BA-8327" },
						{ "ProductID": 3, "Name": "BB Ball Bearing", "ProductNumber": "BE-2349" }
					],
					schema: {
						fields: [
							{ fieldName: "ProductId", fieldDataType: "number" },
							{ fieldName: "Name", fieldDataType: "string" },
							{ fieldName: "ProductNumber", fieldDataType: "string" }
						]
					},
					primaryKey: "ProductID",
					paging: {
						enabled: true,
						type: "local"
					},
					filtering: {
						type: "local"
					}
				}).dataBind();
				ds.filter([{ fieldName: "Name", expr: "ZZ", cond: "contains" }], "and");
				// ensure the filter is applied
				assert.equal(ds.dataView().length, 0, "The data view is of 0 length.");
				ds.clearLocalFilter();
				assert.equal(ds.dataView().length, 3, "The data view is of length equal to before it was filtered.");
				ds.addRow(4, { ProductID: 4, Name: "NEW NAME", ProductNumber: "NEW NUMBER" }, true);
				assert.equal(ds.data().length, 4, "The row is added only once.");
			});
			QUnit.test("Test if transactions are correct when setting them to original value.", function (assert) {
				assert.expect(7);
				var ds = new $.ig.DataSource({
					autoCommit: false,
					aggregateTransactions: true,
					dataSource: [
						{ "ProductID": 1, "Name": "Test", "ProductNumber": "AR-5381" },
						{ "ProductID": 2, "Name": "Test1", "ProductNumber": "BA-8327" },
						{ "ProductID": 3, "Name": "Test1", "ProductNumber": "BE-2349" }
					],
					primaryKey: "ProductID"
				}).dataBind();

				ds.setCellValue(1, "Name", "Test1", false);
				ds.setCellValue(2, "Name", "Test1", false);
				ds.setCellValue(3, "Name", "Test1", false);

				//verify transactions
				var pending= ds.pendingTransactions();
				var all = ds.allTransactions();

				assert.ok(pending.length === 1 && all.length === 1, "There should be only 1 transaction.");

				ds.setCellValue(1, "Name", "Test", false);

				pending= ds.pendingTransactions();
				all = ds.allTransactions();

				assert.ok(pending.length === 0 && all.length === 0, "There should be no transaction.");

				ds.updateRow(2, { "ProductID": 2, "Name": "Test", "ProductNumber": "New" }, false);
				pending= ds.pendingTransactions();
				all = ds.allTransactions();

				assert.ok(pending.length === 1 && all.length === 1, "There should be only 1 transaction.");
				assert.ok(pending[0].row.Name === "Test" && pending[0].row.ProductNumber === "New", "The transaction should contain the updated data.");

				ds.updateRow(2, { "ProductID": 2, "Name": "Test", "ProductNumber": "BA-8327" }, false);

				pending= ds.pendingTransactions();
				all = ds.allTransactions();

				assert.ok(pending.length === 1 && all.length === 1, "There should be only 1 transaction.");
				assert.ok(pending[0].row.Name === "Test" && pending[0].row.ProductNumber === "BA-8327", "The transaction should contain the updated data.");

				pending= ds.pendingTransactions();
				all = ds.allTransactions();
				ds.updateRow(2, { "ProductID": 2, "Name": "Test1", "ProductNumber": "BA-8327" }, false);
				assert.ok(pending.length === 0 && all.length === 0, "There should be no transaction.");
			});
			QUnit.test("Test for issue #853 - check if non-transformed data updates push the same objects passed.", function (assert) {
				assert.expect(2);
				var data = [], obj1 = { a: 1, b: 2 }, obj2 = { a: 2, b: 3 };
				data.push(obj1);
				ds = new $.ig.DataSource({
					type: "json",
					dataSource: data
				});
				ds.dataBind();
				assert.strictEqual(ds.data()[0], obj1, "No schema is passed therefore objects should not be cloned");
				ds.addRow(1, obj2, true);
				assert.strictEqual(ds.data()[1], obj2, "No schema is passed therefore the original object passed to add row should be used.");
			});

			QUnit.module("igDataSource transactions (autoCommit - ", {
				ds3: null,
				adventureWorks: [
					{ "ProductID":1,"Name":"Adjustable Race","ProductNumber":"AR-5381","MakeFlag":false,"FinishedGoodsFlag":false,"Color":null,"SafetyStockLevel":1000,"ReorderPoint":750,"StandardCost":0.0000,"ListPrice":0.0000,"Size":null,"SizeUnitMeasureCode":null,"WeightUnitMeasureCode":null,"Weight":null,"DaysToManufacture":0,"ProductLine":null,"Class":null,"Style":null,"ProductSubcategoryID":null,"ProductModelID":null,"SellStartDate":"\/Date(896648400000)\/","SellEndDate":null,"DiscontinuedDate":null,"rowguid":"694215b7-08f7-4c0d-acb1-d734ba44c0c8","ModifiedDate":"\/Date(1078992096827)\/"},
					{ "ProductID":2,"Name":"Bearing Ball","ProductNumber":"BA-8327","MakeFlag":false,"FinishedGoodsFlag":false,"Color":null,"SafetyStockLevel":1000,"ReorderPoint":750,"StandardCost":0.0000,"ListPrice":0.0000,"Size":null,"SizeUnitMeasureCode":null,"WeightUnitMeasureCode":null,"Weight":null,"DaysToManufacture":0,"ProductLine":null,"Class":null,"Style":null,"ProductSubcategoryID":null,"ProductModelID":null,"SellStartDate":"\/Date(896648400000)\/","SellEndDate":null,"DiscontinuedDate":null,"rowguid":"58ae3c20-4f3a-4749-a7d4-d568806cc537","ModifiedDate":"\/Date(1078992096827)\/"},
					{ "ProductID":3,"Name":"BB Ball Bearing","ProductNumber":"BE-2349","MakeFlag":true,"FinishedGoodsFlag":false,"Color":null,"SafetyStockLevel":800,"ReorderPoint":600,"StandardCost":0.0000,"ListPrice":0.0000,"Size":null,"SizeUnitMeasureCode":null,"WeightUnitMeasureCode":null,"Weight":null,"DaysToManufacture":1,"ProductLine":null,"Class":null,"Style":null,"ProductSubcategoryID":null,"ProductModelID":null,"SellStartDate":"\/Date(896648400000)\/","SellEndDate":null,"DiscontinuedDate":null,"rowguid":"9c21aed2-5bfa-4f18-bcb8-f11638dc2e4e","ModifiedDate":"\/Date(1078992096827)\/"},
					{ "ProductID":4,"Name":"Headset Ball Bearings","ProductNumber":"BE-2908","MakeFlag":false,"FinishedGoodsFlag":false,"Color":null,"SafetyStockLevel":800,"ReorderPoint":600,"StandardCost":0.0000,"ListPrice":0.0000,"Size":null,"SizeUnitMeasureCode":null,"WeightUnitMeasureCode":null,"Weight":null,"DaysToManufacture":0,"ProductLine":null,"Class":null,"Style":null,"ProductSubcategoryID":null,"ProductModelID":null,"SellStartDate":"\/Date(896648400000)\/","SellEndDate":null,"DiscontinuedDate":null,"rowguid":"ecfed6cb-51ff-49b5-b06c-7d8ac834db8b","ModifiedDate":"\/Date(1078992096827)\/"}

				],
				before: function() {
					this.ds3 = new $.ig.DataSource({
						dataSource: this.adventureWorks,
						primaryKey: "ProductID",
						schema: {
							fields: [
								{ name: "ProductID", type: "number" },
								{ name: "Name", type: "string" },
								{ name: "ModifiedDate", type: "date" },
								{ name: "MakeFlag", type: "bool" },

							]
						}
					});
					this.ds3.dataBind();
				},
				after: function() {
				}
			});
			// test removeRecordByKey
			QUnit.test("Test removeRecordByKey, removeRecordByIndex, updateRow, addRow, insertRow", function (assert) {
				assert.expect(6);
				var l = this.ds3.data().length, d, row, t, res;
				this.ds3.filter([
					{ fieldName: "ProductID", expr: 1, cond: "greaterThan" }
				]);
				//removeRecordByKey
				this.ds3.removeRecordByKey(4);
				d = this.ds3.data();
				assert.ok(l === 4 &&
					this.ds3.filteredData().length === 2 &&
					d.length === 3 &&
					d[2].ProductID === 3,
					"Test removeRecordByKey - remove row with ProductID 4");
				// removeRecordByIndex
				this.ds3.removeRecordByIndex(0);
				d = this.ds3.data();
				assert.ok(this.ds3.filteredData().length === 2 &&
					d.length === 2 &&
					d[0].ProductID === 2,
					"Test removeRecordByIndex - remove row with index 0");
				// updateRow
				row = d[0];
				row.Name = "Test";
				this.ds3.updateRow(row.ProductID, row, true);
				d = this.ds3.data();
				assert.ok(d[0].Name === "Test" &&
					d.length === 2, "Test updateRow");
				// addRow
				row = {
						ProductID: 5,
						Name: "Test2",
						ModifiedDate: new Date(),
						MakeFlag: true
				};
				this.ds3.addRow(row.ProductID, row, true);
				d = this.ds3.data();
				assert.ok(d.length === 3 &&
					d[2].Name === "Test2", "Test addRow");
				// insertRow
				row = {
						ProductID: 6,
						Name: "Test3",
						ModifiedDate: new Date(),
						MakeFlag: true
				};
				t = this.ds3.insertRow(row.ProductID, row, d.length - 1, true);
				res = this.ds3.getDetachedRecord(t);
				assert.equal(res.ProductID, t.row.ProductID, "Test getDetachedRecord");
				d = this.ds3.data();
				assert.ok(d.length === 4 &&
					d[2].Name === "Test3" &&
					d[3].Name === "Test2", "Test insertRow");
			});