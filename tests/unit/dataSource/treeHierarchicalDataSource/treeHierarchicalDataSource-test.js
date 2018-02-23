
			QUnit.module("igDataSource TreeHierarchicalDataSource API methods", {
				dataBindingFired: false,
				dataBoundFired: false,
				ds1: null,
				ds2: null,
				dsHierarchicalWithInitialFlatDataView: null,
				dsPaging: null,
				dsRemoteFiltering: null,
				dsLocalFiltering: null,
				dsLocalSortingFilteringPaging: null,
				initialized: false,
				util: $.ig.TestUtil,
				flatDS:[
					{ "employeeID": 0, "PID": -1, "firstName": "Andrew", "lastName": "Fuller", "reportsTo": "-", "Date": new Date("01/01/2011") },
					{ "employeeID": 1, "PID": -1, "firstName": "Jonathan", "lastName": "Smith", "reportsTo": "-", "Date": new Date("01/02/2011") },
					{ "employeeID": 2, "PID": -1, "firstName": "Nancy", "lastName": "Davolio", "reportsTo": "-", "Date": new Date("01/03/2011") },
					{ "employeeID": 3, "PID": -1, "firstName": "Steven", "lastName": "Buchanan", "reportsTo": "-", "Date": new Date("01/04/2011") },
					// sub of ID 1
					{ "employeeID": 4, "PID": 0, "firstName": "Janet", "lastName": "Leverling", "reportsTo": "0", "Date": new Date("01/05/2011") },
					{ "employeeID": 5, "PID": 0, "firstName": "Laura", "lastName": "Callahan", "reportsTo": "0", "Date": new Date("01/06/2011") },
					{ "employeeID": 6, "PID": 0, "firstName": "Margaret", "lastName": "Peacock", "reportsTo": "0", "Date": new Date("01/07/2011") },
					{ "employeeID": 7, "PID": 0, "firstName": "Michael", "lastName": "Suyama", "reportsTo": "0", "Date": new Date("01/08/2011") },
					// sub of ID 4
					{ "employeeID": 8, "PID": 4, "firstName": "Anne", "lastName": "Dodsworth", "reportsTo": "4", "Date": new Date("01/09/2011") },
					{ "employeeID": 9, "PID": 4, "firstName": "Danielle", "lastName": "Davis", "reportsTo": "4", "Date": new Date("01/10/2011") },
					{ "employeeID": 10, "PID": 4, "firstName": "Robert", "lastName": "King", "reportsTo": "4", "Date": new Date("01/11/2011") },
					// sub of ID 2
					{ "employeeID": 11, "PID": 2, "firstName": "Peter", "lastName": "Lewis", "reportsTo": "2", "Date": new Date("01/12/2011") },
					{ "employeeID": 12, "PID": 2, "firstName": "Ryder", "lastName": "Zenaida", "reportsTo": "2", "Date": new Date("01/13/2011") },
					{ "employeeID": 13, "PID": 2, "firstName": "Wang", "lastName": "Mercedes", "reportsTo": "2", "Date": new Date("01/14/2011") },
					// sub of ID 3
					{ "employeeID": 14, "PID": 3, "firstName": "Theodore", "lastName": "Zia", "reportsTo": "3", "Date": new Date("01/15/2011") },
					{ "employeeID": 15, "PID": 3, "firstName": "Lacota", "lastName": "Mufutau", "reportsTo": "3", "Date": new Date("01/16/2011") },
					// sub of ID 16
					{ "employeeID": 16, "PID": 15, "firstName": "Jin", "lastName": "Elliott", "reportsTo": "16", "Date": new Date("01/17/2011") },
					{ "employeeID": 17, "PID": 15, "firstName": "Armand", "lastName": "Ross", "reportsTo": "16", "Date": new Date("01/18/2011") },
					{ "employeeID": 18, "PID": 15, "firstName": "Dane", "lastName": "Rodriquez", "reportsTo": "16", "Date": new Date("01/19/2011") },
					// sub of ID 19
					{ "employeeID": 19, "PID": 18, "firstName": "Declan", "lastName": "Lester", "reportsTo": "19", "Date": new Date("01/20/2011") },
					{ "employeeID": 20, "PID": 18, "firstName": "Bernard", "lastName": "Jarvis", "reportsTo": "19", "Date": new Date("01/21/2011") },
					// sub of ID 20
					{ "employeeID": 21, "PID": 20, "firstName": "Jeremy", "lastName": "Donaldson", "reportsTo": "20", "Date": new Date("01/22/2011") }
				],
				products: [
					{
						"ID": 0, "Name": "Food", "Price": "-", "Category": { "ID": 0, "Name": "Name", "isActive": false }, "Products": [
						{
							"ID": 15, "Name": "Sandwich", "Price": "-", "Products": [
								{ "ID": 16, "Name": "Club sandwich", "Price": "3.5" }
							]
						}
						]
					},
					{ "ID": 17, "Name": "Accessories", "Price": "-", "Category": { "ID": 1, "Name": "Name1", "isActive": false } },
					{
						"ID": 19, "Name": "Toys", "Price": "-", "Category": { "ID": 2, "Name": "Name2", "isActive": false }, "Products": [
						{ "ID": 20, "Name": "Action Figures", "Price": "3.5" }
						]
					}
				],
				loadTestbeds: function(){
					// define a treehierarchical data source control
					this.ds1 = new $.ig.TreeHierarchicalDataSource({
					dataSource: this.flatDS,
					primaryKey: "employeeID",
					treeDS: {
							key: "employeeID",
							foreignKey: "PID",
							primaryKey: "employeeID",
							initialExpandDepth: 3,
							foreignKeyRootValue: -1,
							childDataKey: "childData",
							propertyDataLevel: "dataLevel",
							propertyExpanded: "expanded"
						}
					});
					this.ds1.dataBind();
					this.ds2 = new $.ig.TreeHierarchicalDataSource({
						dataSource: this.products,
						primaryKey: "ID",
						treeDS: {
							primaryKey: "ID",
							key: "ID",
							childDataKey: "Products",
							initialExpandDepth: 3,
							propertyDataLevel: "dataLevel",
							propertyExpanded: "expanded"
						}
					});
					this.ds2.dataBind();
					this.dsHierarchicalWithInitialFlatDataView = new $.ig.TreeHierarchicalDataSource({
						dataSource: this.products,
						primaryKey: "ID",
						treeDS: {
							initialFlatDataView: true,
							primaryKey: "ID",
							key: "ID",
							childDataKey: "Products",
							initialExpandDepth: 3,
							propertyDataLevel: "dataLevel",
							propertyExpanded: "expanded"
						}
					});
					this.dsHierarchicalWithInitialFlatDataView.dataBind();
					this.dsPaging = new $.ig.TreeHierarchicalDataSource({
						dataSource: this.flatDS,
						primaryKey: "employeeID",
						schema: {
							fields: [
								{ name: "employeeID", type: "number" },
								{ name: "PID", type: "number" },
								{ name: "firstName", type: "string" },
								{ name: "lastName", type: "string" },
								{ name: "reportsTo", type: "string" }
							]
						},
						treeDS: {
							key: "employeeID",
							foreignKey: "PID",
							primaryKey: "employeeID",
							initialExpandDepth: 3,
							foreignKeyRootValue: -1,
							childDataKey: "childData",
							propertyDataLevel: "dataLevel",
							propertyExpanded: "expanded",
							paging: { mode: "allLevels" }
						},
						paging: {
							enabled: true,
							pageSize: 3,
							type: "local"
						}
	
					});
					this.dsPaging.dataBind();

					this.dsRemoteFiltering = new $.ig.TreeHierarchicalDataSource({
						dataSource: "myemployeeData",
						primaryKey: "employeeID",
						//type: "json",
						schema: {
							fields: [
								{ name: "employeeID", type: "number" },
								{ name: "PID", type: "number" },
								{ name: "firstName", type: "string" },
								{ name: "lastName", type: "string" },
								{ name: "reportsTo", type: "string" }
							],
							searchField: "data.results"
						},
						treeDS: {
							key: "employeeID",
							foreignKey: "PID",
							primaryKey: "employeeID",
							initialExpandDepth: 3,
							foreignKeyRootValue: -1,
							childDataKey: "childData",
							propertyDataLevel: "dataLevel",
							propertyExpanded: "expanded",
							filtering: { type: "remote", expressions: [{ fieldName: "firstName", expr: "Laura", cond: "equals" }] }
						},
						filtering: {
							type: "remote", expressions: [{ fieldName: "firstName", expr: "Laura", cond: "equals" }]
						}
					});

					this.dsLocalFiltering = new $.ig.TreeHierarchicalDataSource({
						dataSource: this.flatDS,
						primaryKey: "employeeID",
						//type: "json",
						schema: {
							fields: [
								{ name: "employeeID", type: "number" },
								{ name: "PID", type: "number" },
								{ name: "firstName", type: "string" },
								{ name: "lastName", type: "string" },
								{ name: "reportsTo", type: "string" }
							],
							searchField: "data.results"
						},
						treeDS: {
							key: "employeeID",
							foreignKey: "PID",
							primaryKey: "employeeID",
							initialExpandDepth: 3,
							foreignKeyRootValue: -1,
							childDataKey: "childData",
							propertyDataLevel: "dataLevel",
							propertyExpanded: "expanded",
							filtering: { type: "local" }
						},
						filtering: {
							type: "local"
						}
					});
					this.dsLocalFiltering.dataBind();					

					this.dsLocalSortingFilteringPaging = new $.ig.TreeHierarchicalDataSource({
						dataSource: this.flatDS,
						primaryKey: "employeeID",
						//type: "json",
						schema: {
							fields: [
								{ name: "employeeID", type: "number" },
								{ name: "PID", type: "number" },
								{ name: "firstName", type: "string" },
								{ name: "lastName", type: "string" },
								{ name: "reportsTo", type: "string" },
								{ name: "Date", type: "date" }
							],
							searchField: "data.results"
						},
						treeDS: {
							key: "employeeID",
							foreignKey: "PID",
							primaryKey: "employeeID",
							initialExpandDepth: 3,
							foreignKeyRootValue: -1,
							childDataKey: "childData",
							propertyDataLevel: "dataLevel",
							propertyExpanded: "expanded",
							sorting: { type: "local", fromLevel: 1, toLevel: 5 },
							filtering: { type: "local", fromLevel: 1, toLevel: 5 },
						},
						sorting: {
							type: "local"
						},
						filtering: { type: "local" },
						paging: { type: "local" }
					});
					this.dsLocalSortingFilteringPaging.dataBind();
				},
				before: function (assert) {
					var done = assert.async();
					//pause testing until tree is initialized
					if (!this.initialized) {
						this.loadTestbeds();
						this.util.wait(500).then(function () { done(); });
						this.initialized = true;
					}
				},
				after: function () {
				}
			});

			QUnit.test("Test getParentRowsForRow API method", function (assert) {
				assert.expect(13);
				var done = assert.async(),result = this.ds2.getParentRowsForRow({ "ID": 16, "Name": "Club sandwich", "Price": "3.5" }, this.products);

				this.ds1._dataBoundDepth = null;
				var result2 = this.ds1.getParentRowsForRow({ "employeeID": 21, "PID": 20, "firstName": "Jeremy", "lastName": "Donaldson", "reportsTo": "20" });

				var expectedResultIDs = [0, 15, 16];
				for (var i = 0; i < result.length; i++) {
					assert.equal(result[i].row.ID, expectedResultIDs[i], "getParentRowsForRow should return correct list");
				}

				var expectedResultIDs = [3, 15, 18, 20, 21];
				for (var i = 0; i < result2.length; i++) {
					assert.equal(result2[i].row.employeeID, expectedResultIDs[i], "getParentRowsForRow should return correct list");
				}

				var result3 = this.ds2.getParentRowsForRow(null, this.products);
				assert.equal(result3.length, 0, "If no row is passed and empty array should be returned.");

				var ds3 = new $.ig.TreeHierarchicalDataSource();

				var result5 = ds3.getParentRowsForRow({ "employeeID": 21, "PID": 20, "firstName": "Jeremy", "lastName": "Donaldson", "reportsTo": "20" });
				assert.equal(result5.length, 0, "If no row is passed and empty array should be returned.");


				var result6 = ds3.getParentRowsForRow([]);
				assert.equal(result6.length, 0, "If no row is passed and empty array should be returned.");

				$.mockjax({
					url: 'remoteDataTreeHierarachicalDs',
					responseText: {
						status: 'success',
						data: {
							results: [{ "employeeID": 4, "PID": 0, "firstName": "Janet", "lastName": "Leverling", "reportsTo": "0", "Date": new Date("01/05/2011") }]
						},
						Metadata: { "ancestors": [{ "employeeID": 0, "PID": -1, "firstName": "Andrew", "lastName": "Fuller", "reportsTo": "-", "Date": new Date("01/01/2011") }] }
					}
				});
				var dsRemote = new $.ig.TreeHierarchicalDataSource({
					dataSource: 'remoteDataTreeHierarachicalDs',
					primaryKey: "employeeID",
					schema: {
						fields: [{
							name: "employeeID"
						}, {
							name: "PID"
						}, {
							name: "firstName"
						}],
						searchField: "data.results"
					},
					treeDS: {
						key: "employeeID",
						foreignKey: "PID",
						primaryKey: "employeeID",
						initialExpandDepth: 3,
						foreignKeyRootValue: -1,
						childDataKey: "childData",
						propertyDataLevel: "dataLevel",
						propertyExpanded: "expanded"
					}
				});
				dsRemote.dataBind();

				this.util.wait(500).then(function () {
	
					var result4 = dsRemote.getParentRowsForRow({ "employeeID": 4, "PID": 0, "firstName": "Janet", "lastName": "Leverling", "reportsTo": "0", "Date": new Date("01/05/2011") });
					assert.equal(result4.length, 1, "Parent row should be retrived from the metadata.");
					assert.equal(result4[0].row.employeeID, 0, "Parent row should be retrived from the metadata.");
									done();
				});

			});
			QUnit.test("Test getDataBoundDepth API method", function (assert) {
				assert.expect(2);
				var result1 = this.ds1.getDataBoundDepth();
				var result2 = this.ds2.getDataBoundDepth();

				assert.equal(result1, 4, "DataBound depth should be 4. ");
				assert.equal(result2, 2, "DataBound depth should be 2. ");


			});
			QUnit.test("Test getFlatDataForRecord API method", function (assert) {
				assert.expect(4);
				//test with wrong param
				var result1 = this.ds1.getFlatDataForRecord(null);

				assert.equal(result1, undefined, "If null is passed no result should be returned.");
				//test with correct
				var result2 = this.ds2.getFlatDataForRecord(this.products[0]);

				assert.equal(result2.recordsCount, 2, "There should be two records in the flat view.");

				assert.equal(result2.flatData[0].ID, 15, "First record should have ID = 15");
				assert.equal(result2.flatData[1].ID, 16, "First record should have ID = 16");
			});
			QUnit.test("Test getFlatDataForRecord API method", function (assert) {
				assert.expect(7);
				this.ds2._flatData = null;
				var result = this.ds2.getFlatData();
				assert.equal(result.length, 6, "DataSource should contain 6 records when flattened.");
				var expectedRecIds = [0, 15, 16, 17, 19, 20];
				for (var i = 0; i < result.length; i++) {
					assert.equal(result[i].ID, expectedRecIds[i], "All data records should be inside the flattened data object.");
				}
			});
			QUnit.test("Test getFlatDataCount API method", function (assert) {
				assert.expect(1);
				assert.equal(this.ds2.getFlatDataCount(), 6, "DataSource should contain 6 records when flattened.");
			});

			QUnit.test("Test setExpandedStateByRowIndex API method", function (assert) {
				assert.expect(1);
				this.ds2.setExpandedStateByRowIndex(0, false);
				assert.ok(!this.ds2.getFlatData()[0].expanded, "First record should be collapsed.");
			});

			QUnit.test("Test setExpandedStateByPrimaryKey API method", function (assert) {
				assert.expect(2);
				assert.ok(this.ds2.findRecordByKey(19).expanded, "First record should be expanded initially.");
				this.ds2.setExpandedStateByPrimaryKey(19, false);
				assert.ok(!this.ds2.findRecordByKey(19).expanded, "First record should be collapsed.");
			});

			QUnit.test("Test getExpandStateById API method", function (assert) {
				assert.expect(1);
				assert.ok(!this.ds2.getExpandStateById(19), "getExpandStateById should return false since the record is collapsed.");
			});

			QUnit.test("Test toggleRow API method", function (assert) {
				assert.expect(2);
				assert.ok(this.ds1.findRecordByKey(0).expanded, "Initially first record should be expanded.");
				this.ds1.toggleRow(0);
				assert.ok(!this.ds1.getFlatData()[0].expanded, "After toggleRow is called the first record should be collapsed.");

			});

			QUnit.test("Test totalLocalRecordsCount API method", function (assert) {
				assert.expect(1);
				assert.equal(this.dsPaging.totalLocalRecordsCount(), 22, "Total record count should be 22");
			});
			QUnit.test("Test getPathBy API method", function (assert) {
				assert.expect(3);
				assert.equal(this.ds1.getPathBy(null), null, "If no valid is passed null should be returned.");

				assert.equal(this.ds1.getPathBy(21), "3/15/18/20/21", "The path to the passed PK should be returned.");
				assert.equal(this.ds1.getPathBy({ "employeeID": 21, "PID": 20, "firstName": "Jeremy", "lastName": "Donaldson", "reportsTo": "20" }), "3/15/18/20/21", "The path to the passed record should be returned.");
			});
			QUnit.test("Test removeRecordByKey API method", function (assert) {
				assert.expect(3);
				var rec, childRec, 
					flatDSCopy = $.extend(true, [], this.flatDS);

				this.ds1.removeRecordByKey(20, flatDSCopy);
				//Test Child data persists in the datasource after deleting the corresponding parent record in treegrid 
				assert.ok(flatDSCopy.length === 20 &&
					flatDSCopy[19].employeeID === 19, 
					"Test whether records are removed in flat data source");
				rec = this.ds1.findRecordByKey(20);
				childRec = this.ds1.findRecordByKey(21);
				assert.equal(rec, null, "Once the record is deleted it should not exist in the data source");
				assert.equal(childRec, null, "Its chilren records should also be removed.");
			});
			QUnit.test("Test deleteRow API method", function (assert) {
				assert.expect(2);
				this.ds2.deleteRow(15);

				var rec = this.ds2.findRecordByKey(15, true);
				var childRec = this.ds2.findRecordByKey(16, true);
				assert.equal(rec, null, "Once the record is deleted it should not exist in the data source");
				assert.equal(childRec, null, "Its chilren records should also be removed.");
			});
			QUnit.test("Test getChildrenByKey API method", function (assert) {
				assert.expect(5);
				var childRecs = this.ds1.getChildrenByKey(0);
				var expectedRecIds = [4, 5, 6, 7];
				for (var i = 0; i < childRecs.length; i++) {
					assert.equal(childRecs[i].employeeID, expectedRecIds[i], "getChildrenByKey should return the immediate children of the record.");
				}
				childRecs = this.ds1.getChildrenByKey(10000);
				assert.equal(childRecs, null, "If invalid key is passed null should be returned.");
			});
			QUnit.test("Test insertRow API method", function (assert) {
				assert.expect(3);
				//insert parent row
				this.ds1.insertRow(100, { "employeeID": 100, "PID": -1, "firstName": "Test", "lastName": "Test", "reportsTo": "-" }, 0, true);

				//insert child row
				this.ds1.insertRow(101, { "employeeID": 101, "PID": 100, "firstName": "Test", "lastName": "Test", "reportsTo": "-" }, 0, true, 100);

				//check if rows are properly inserted.

				assert.equal(this.ds1.dataView()[0].employeeID, 100, "Record with id 100 should be added at index 0 in the root level.");
				assert.equal(this.ds1.dataView()[0].childData.length, 1, "Record with id 100 should have a single child data record.");
				assert.equal(this.ds1.dataView()[0].childData[0].employeeID, 101, "Record with id 100 should have a single child data record with a id 101.");

			});
			QUnit.test("Test insertRow when rowInserted option is defined", function (assert) {
				var done = assert.async(),
					self = this;
				var rowInsertedFuncCalled = false;

				this.ds1.settings.callee = function () {
				};
				this.ds1.settings.rowInserted = function () {
					rowInsertedFuncCalled = true;
				};

				this.ds1.insertRow(1001, { "ID": 1001, "Name": "Bread", "Price": 2.5 }, 2, false, 0);
				this.util.wait(100).then(function () {
					assert.ok(rowInsertedFuncCalled, "rowInserted function should be called.");
					rowInsertedFuncCalled = false;
					self.ds1.settings.callee = null;
					self.ds1.insertRow(1001, { "ID": 1001, "Name": "Bread", "Price": 2.5 }, 2, false, 0);
					return self.util.wait(100);
				}).then(function () {
						done();
						assert.ok(rowInsertedFuncCalled, "rowInserted function should be called.")
					});
				
			});
			QUnit.test("Test getFilteringMatchRecordsCount API method", function (assert) {
				var done = assert.async(), self = this;
				assert.expect(1);
				var data = this.dsRemoteFiltering._filterDataRecursive(this.dsRemoteFiltering.dataView(), 0, [{ fieldName: "firstName", expr: "Laura", cond: "equals" }]);
				$.mockjax({
					url: 'myemployeeData',
					responseText: {
						status: 'success',
						data: {
							results: this.flatDS
						},
						Metadata: { "filtering.countRecords": 1 }
					}
				});

				this.dsRemoteFiltering.dataBind();
				this.util.wait(1200).then(function () {
					done();
					var res = self.dsRemoteFiltering.getFilteringMatchRecordsCount();
					assert.equal(res, 1, "There should be one record matching the filter condition.");
				});
			});
			QUnit.test("Test getFilteredRecordsCountFromDataView API method", function (assert) {
				assert.expect(1);

				this.dsLocalFiltering.filter([{ fieldName: "firstName", expr: "Laura", cond: "equals" }]);

				var res = this.dsLocalFiltering.getFilteredRecordsCountFromDataView();
				assert.equal(res, 1, "There should be one record matching the filter condition.");
			});

			QUnit.test("Test getFilteredRecordsCount API method", function (assert) {
				assert.expect(2);
				var res = this.dsLocalFiltering.getFilteredRecordsCount();
				assert.equal(res, 1, "There should be one record matching the filter condition.");

				this.dsLocalFiltering.clearLocalFilter();

				var res2 = this.dsLocalFiltering.getFilteredRecordsCount();
				assert.equal(res2, 0, "Function should return 0 if filtering is not applied.");
			});
			QUnit.test("Test clearLocalFilter API method", function (assert) {
				assert.expect(1);
				this.dsLocalFiltering.filter([{ fieldName: "firstName", expr: "Laura", cond: "equals" }]);
				this.dsLocalFiltering.clearLocalFilter();
				assert.equal(this.dsLocalFiltering.flatDataView().length, 22, "After filtering is cleared the data view should contain all records.");
			});
			QUnit.test("Test clearMatchFiltering API method", function (assert) {
				assert.expect(2);
				this.dsLocalFiltering.filter([{ fieldName: "firstName", expr: "Laura", cond: "equals" }]);
				assert.ok(this.dsLocalFiltering.flatDataView()[1].__matchFiltering, "After filtering the record matching the filter condition should have __matchFiltering field with value of true.");

				this.dsLocalFiltering.clearMatchFiltering();
				assert.ok(this.dsLocalFiltering.flatDataView()[1].__matchFiltering === undefined, "After clearMatchFiltering is called the record should not have a __matchFiltering field.");
			});
			QUnit.test("Test generateFlatDataView API method when initialFlatDataView option is true", function (assert) {
				assert.expect(1);
				this.dsHierarchicalWithInitialFlatDataView.generateFlatDataView();
				var res = this.dsHierarchicalWithInitialFlatDataView.flatDataView();
				assert.equal(res.length, 3, "Data should not be flattened if the initialFlatDataView option is explicitly set to true.");
			});
			QUnit.test("Test getVisibleFlatData API method", function (assert) {
				assert.expect(1);
				var res = this.dsPaging.getVisibleFlatData();
				assert.equal(res.length, 22, "All of the records are expanded so the getVisibleFlatData method should return all records.");
			});
			QUnit.test("Test local sorting, paging, filtering", function (assert) {
				assert.expect(6);
				assert.equal(this.dsLocalSortingFilteringPaging.dataView()[0].childData[0].Date.toDateString(), "Wed Jan 05 2011");

				this.dsLocalSortingFilteringPaging.sort([{ fieldName: "Date" }], "desc", false);
				assert.equal(this.dsLocalSortingFilteringPaging.dataView()[0].childData[0].Date.toDateString(), "Sat Jan 08 2011");
				assert.equal(this.dsLocalSortingFilteringPaging.flatDataView().length, 22, "FlatDataView should contain all records.");

				this.dsLocalSortingFilteringPaging.filter([{ fieldName: "Date", expr: new Date("01/21/2011"), cond: "after" }], "AND", true);
				assert.equal(this.dsLocalSortingFilteringPaging.flatDataView().length, 5, "FlatDataView should contain only the filtered records.");
				
				this.dsLocalSortingFilteringPaging.clearLocalFilter();
				this.dsLocalSortingFilteringPaging.filter([{ fieldName: "firstName", expr: "Janet", cond: "equals" }], "OR", true, "employeeID = 4");
				assert.ok(this.dsLocalSortingFilteringPaging.filteredData().length === 1 && this.dsLocalSortingFilteringPaging.filteredData()[0].__matchFiltering === undefined, "Parent level should contain 1 rec that does not match the filter condition.");
				assert.ok(this.dsLocalSortingFilteringPaging.filteredData()[0].childData.length === 1 && this.dsLocalSortingFilteringPaging.filteredData()[0].childData[0].__matchFiltering === true, "Child level should contain 1 rec that does matches the filter condition.");

			});
			QUnit.test("Test _findIndexInFlatDS API method", function (assert) {
				assert.expect(3);
				assert.equal(this.ds1._findIndexInFlatDS(this.flatDS, 4, 2), 11, "_findIndexInFlatDS() should return the index of the record by the FK value and the index under the FK.");
				assert.equal(this.ds1._findIndexInFlatDS(this.flatDS, 4, 100), 12, "If the index passed in _findIndexInFlatDS() is larger than the actual value, the actual value + 1 should be returned.");
				assert.equal(this.ds1._findIndexInFlatDS(this.flatDS, 100, 100), -1, "If the FK value does not exist -1 should be returned.");
			});
			QUnit.test("Test sortData API method", function (assert) {
				assert.expect(5);
				var data = this.dsLocalSortingFilteringPaging.sortData(this.flatDS, [{ fieldName: "employeeID" }], "desc");
				assert.equal(data[0].employeeID, 100, "Ensure data is sorted in descending order.");
				assert.equal(data[1].employeeID, 21, "Ensure data is sorted in descending order.");
				assert.equal(data[2].employeeID, 19, "Ensure data is sorted in descending order.");

			var multiSortData = this.dsLocalSortingFilteringPaging.sortData(this.flatDS, [{ fieldName: "firstName" }, { fieldName: "PID" }], "desc");

				assert.equal(multiSortData[0].employeeID, 13, "Check if data is properly sorted by both firstName and PID.");
				assert.equal(multiSortData[21].employeeID, 0, "Check if data is properly sorted by both firstName and PID.");
			});
			QUnit.test("Test sortData API method with custom convert function", function (assert) {
				assert.expect(4);
				this.dsLocalSortingFilteringPaging.settings.sorting.customConvertFunc = function (value, key) {
					var res = Math.round(value);
					return res;
				};

				var data = [
				{ "employeeID": 0, "NumValue": 1.1 },
				{ "employeeID": 1, "NumValue": 1.5 },
				{ "employeeID": 2, "NumValue": 1.7 },
				{ "employeeID": 3, "NumValue": 1.4 }
				];
				var expectedOrder = [1, 2, 0, 3];
				var sortedData = this.dsLocalSortingFilteringPaging.sortData(data, [{ fieldName: "NumValue" }], "desc");
				for (var i = 0; i < data.length; i++) {
					assert.equal(sortedData[i].employeeID, expectedOrder[i], "Verify order.");
				}
			});
			QUnit.test("Test sortData API method with null/undefined values", function (assert) {
				assert.expect(4);
				this.dsLocalSortingFilteringPaging.settings.sorting.customConvertFunc = null;
				var data = [
				{ "employeeID": 0, "NumValue": 1 },
				{ "employeeID": 1, "NumValue": undefined },
				{ "employeeID": 2, "NumValue": 2 },
				{ "employeeID": 3, "NumValue": null }
				];
				var expectedOrder = [1, 3, 0, 2];
				var sortedData = this.dsLocalSortingFilteringPaging.sortData(data, [{ fieldName: "NumValue" }], "asc");
				for (var i = 0; i < data.length; i++) {
					assert.equal(sortedData[i].employeeID, expectedOrder[i], "Verify order.");
				}
			});
			QUnit.test("Test flat data with initialFlatDataView set to true.", function (assert) {
				assert.expect(1);
				var done = assert.async(), dsFlat = new $.ig.TreeHierarchicalDataSource({
					dataSource: [{ "employeeID": 0, "PID": -1, "firstName": "Andrew", "lastName": "Fuller", "reportsTo": "-", "Date": new Date("01/01/2011") }],
					primaryKey: "employeeID",
					schema: {
						fields: [{
							name: "employeeID"
						}, {
							name: "PID"
						}, {
							name: "firstName"
						}]
					},
					treeDS: {
						key: "employeeID",
						initialFlatDataView: true,
						foreignKey: "PID",
						primaryKey: "employeeID",
						initialExpandDepth: 3,
						foreignKeyRootValue: -1,
						childDataKey: "childData",
						propertyDataLevel: "dataLevel",
						propertyExpanded: "expanded"
					}
				});

				dsFlat.dataBind();

				this.util.wait(200).then(function () {
					done();
					//check if schema is correct
					var data = dsFlat.data();
					assert.equal(JSON.stringify(data[0]), '{"employeeID":0,"PID":-1,"firstName":"Andrew","expanded":false,"dataLevel":null}', "Schema should be properly applied.");
				});
			});
			// When we're adding new child row and the data source is flat and there is already a single child row...
			QUnit.test("Test insertRow API method.", function (assert) {
				assert.expect(2);
				var done = assert.async(), ds = new $.ig.TreeHierarchicalDataSource({
					dataSource: [
						{ "employeeID": 0, "PID": -1, "firstName": "Andrew", "lastName": "Fuller", "reportsTo": "-", "Date": new Date("01/01/2011") },
						{ "employeeID": 1, "PID": 0, "firstName": "Andrew", "lastName": "Fuller", "reportsTo": "-", "Date": new Date("01/01/2011") }
					],
					primaryKey: "employeeID",
					foreignKey: "PID",
					localSchemaTransform: true,
					schema: {
						fields: [
							{ name: "employeeID", type: "number" },
							{ name: "PID", type: "number" },
							{ name: "firstName", type: "string" },
							{ name: "lastName", type: "string" },
							{ name: "reportsTo", type: "string" }
						]
					},
					treeDS: {
						key: "employeeID",
						foreignKey: "PID",
						primaryKey: "employeeID",
						initialExpandDepth: 3,
						foreignKeyRootValue: -1,
						childDataKey: "childData",
						propertyDataLevel: "dataLevel",
						propertyExpanded: "expanded"
					}
				});

				ds.dataBind();
				this.util.wait(200).then(function () {
					done();
					ds.insertRow(10000, { "employeeID": 10000, "PID": -1, "firstName": "Andrew", "lastName": "Fuller", "reportsTo": "-", "Date": new Date("01/01/2011") }, 0, true, 0);
					assert.equal(ds.data()[0].childData.length, 2, "Row should have 2 children.");
					assert.equal(ds.data()[0].childData[0].employeeID, 10000, "First child should be the newly added row.");
				});
			});
			QUnit.test("Test updating a record when filtering is applied.", function (assert) {
				assert.expect(1);
				this.dsLocalFiltering.clearLocalFilter();
				this.dsLocalFiltering.filter([{ fieldName: "employeeID", expr: 0, cond: "equals" }]);

				this.dsLocalFiltering.setCellValue(0, "firstName", "UpdatedValue", true);

				var dv = this.dsLocalFiltering.dataView();
				assert.equal(dv[0].firstName, "UpdatedValue", "DataView should be updated.");
			});
			// M.H. 12 Apr 2017 Fix for bug 229997: When paging is enabled after editing a value in TreeGrid the tooltip shows incorrect text 
			QUnit.test("Test updating a record when paging is applied.", function (assert) {
				assert.expect(1);
				this.dsPaging.pageIndex(1);
				this.dsPaging.setCellValue(9, "firstName", "UpdatedValue", true);

				var dv = this.dsPaging.flatDataView();
				assert.equal(dv[0].firstName, "UpdatedValue", "DataView should be updated.");
			});
			QUnit.test("Test applying filtering when paging is enabled", function (assert) {
				assert.expect(3);

				this.dsPaging.settings.filtering.type = "local";
				this.dsPaging.pageIndex(1);
				assert.equal(this.dsPaging.pageIndex(), 1, "Verify page index is properly set.");

				this.dsPaging.filter([{ fieldName: "employeeID", expr: 2, cond: "equals" }]);
				assert.equal(this.dsPaging.pageIndex(), 0, "Verify page index is reset.");
				assert.equal(this.dsPaging.flatDataView().length, 1, "There should be 1 record in the data view.");
			});
			QUnit.test("Test _hasRecordParent Api method", function (assert) {
				assert.expect(3);
				this.ds1.settings.treeDS.foreignKeyRootValue = false;
				var res = this.ds1._hasRecordParent({ "employeeID": 4, "PID": 0, "firstName": "Janet", "lastName": "Leverling", "reportsTo": "0", "Date": new Date("01/05/2011") }, this.flatDS);
				assert.ok(res, "Record should have parent.");
				res = this.ds1._hasRecordParent({ "employeeID": 4, "PID": null, "firstName": "Janet", "lastName": "Leverling", "reportsTo": "0", "Date": new Date("01/05/2011") }, this.flatDS);
				assert.ok(!res, "If record has no FK value the result should be false.");
				res = this.ds1._hasRecordParent({ "employeeID": 123, "PID": 123, "firstName": "Janet", "lastName": "Leverling", "reportsTo": "0", "Date": new Date("01/05/2011") }, this.flatDS);
				assert.ok(!res, "If record does not exist the in the data source the result should be false.");
			});
			QUnit.test("Test flatDataView when updating filtered data and paging is enabled with mode allLevels", function (assert) {
				assert.expect(1);
				this.dsLocalSortingFilteringPaging.settings.paging.enabled = true;
				this.dsLocalSortingFilteringPaging.settings.treeDS.paging.mode = "allLevels";
				this.dsLocalSortingFilteringPaging.dataBind();
				this.dsLocalSortingFilteringPaging.filter([{ fieldName: "firstName", expr: "Janet", cond: "equals" }], "OR", true, "employeeID = 4");
				this.dsLocalSortingFilteringPaging.insertRow(3001, { "ID": 1001, "Name": "Bread", "Price": 2.5 }, 2, true, 0);
				assert.ok(this.dsLocalSortingFilteringPaging.flatDataView().length === 3);
			});
			QUnit.test("Test insertRow for TreeHierarchical data source with hierarchical data", function (assert) {
				assert.expect(5);
				var dv, data, products;
				this.ds2.insertRow(10000, {"ID": 10000, "Name": "test", "Price": "-"}, -1, true, 0);
				dv = this.ds2.dataView();
				products = dv[0].Products; 
				data = this.ds2.data();
				assert.ok(dv.length === 3 &&
					products.length === 2 &&
					products[0].ID === 15 && 
				 	products[1].ID === 10000, "Add child for row with ID 0, test dataView()");
				products = data[0].Products;
				assert.ok(data.length === 3 &&
					products.length === 2 &&
					products[0].ID === 15 && 
				 	products[1].ID === 10000, "Add child for row with ID 0, test data()");
				// test inserting row as child for row ID 10000
				this.ds2.insertRow(10001, {"ID": 10001, "Name": "test2", "Price": "-"}, -1, true, 10000);
				products = dv[0].Products; 
				data = this.ds2.data();
				assert.ok(dv.length === 3 &&
					products.length === 2 &&
					products[1].ID === 10000 &&
					products[1].Products.length === 1 &&
					products[1].Products[0].ID === 10001, "Add child for row with ID 10000, test dataView()");
				products = data[0].Products;
				assert.ok(data.length === 3 &&
					products.length === 2 &&
					products[1].ID === 10000 &&
					products[1].Products.length === 1 &&
					products[1].Products[0].ID === 10001, "Add child for row with ID 10000, test data()");
				// call dataBind()
				this.ds2.dataBind();
				data = this.ds2.data();
				products = data[0].Products;
				assert.ok(data.length === 3 &&
					products.length === 2 &&
					products[0].ID === 15 &&
					products[1].ID === 10000 &&
					products[1].Products.length === 1 &&
					products[1].Products[0].ID === 10001,
					"Call dataBind and test whether rows with IDs 10000 and 10001 were properly added");
			});
			QUnit.test("Test expandedKey and dataLevelKey option settings.", function (assert) {
				assert.expect(9);
				var ds = new $.ig.TreeHierarchicalDataSource({
					dataSource: [
						{ "employeeID": 0, "PID": -1, "firstName": "Andrew", "lastName": "Fuller", "reportsTo": "-", "Date": new Date("01/01/2011") },
						{ "employeeID": 1, "PID": 0, "firstName": "Andrew", "lastName": "Fuller", "reportsTo": "-", "Date": new Date("01/01/2011") }
					],
					primaryKey: "employeeID",
					foreignKey: "PID",
					localSchemaTransform: true,
					schema: {
						fields: [
							{ name: "employeeID", type: "number" },
							{ name: "PID", type: "number" },
							{ name: "firstName", type: "string" },
							{ name: "lastName", type: "string" },
							{ name: "reportsTo", type: "string" }
						]
					},
					treeDS: {
						key: "employeeID",
						foreignKey: "PID",
						primaryKey: "employeeID",
						initialExpandDepth: 3,
						foreignKeyRootValue: -1,
						childDataKey: "childData",
						dataLevelKey: "dataLevel",
						expandedKey: "expanded"
					}
				});

				ds.dataBind();

				//verify schema is correctly applied
				assert.ok(ds.getFlatData()[0].expanded, "Expanded prop of record should be true.");
				assert.equal(ds.getFlatData()[0].dataLevel, 0, "Data level prop of record should be 0.");

				assert.ok(ds.getFlatData()[1].expanded, "Expanded prop of record should be true.");
				assert.equal(ds.getFlatData()[1].dataLevel, 1, "Data level prop of record should be 0.");

				//expand/collapse
				ds.toggleRow(0);

				assert.ok(!ds.getFlatData()[0].expanded, "Expanded prop of record should be false.");
				assert.equal(ds.getFlatData()[0].dataLevel, 0, "Data level prop of record should be 0.");

				assert.ok(ds.getFlatData()[1].expanded, "Expanded prop of record should be true.");
				assert.equal(ds.getFlatData()[1].dataLevel, 1, "Data level prop of record should be 0.");

				//check if url is correctly encoded
				var url = JSON.stringify(ds._encodeUrl())
				assert.equal(url, '{"pk":"employeeID","fk":"PID","fkRootValue":-1,"dataLevelKey":"dataLevel","expandedKey":"expanded","childDataKey":"childData","initialExpandDepth":3}', "Url shold contain the properties dataLevelKey and expandedKey.");
			});

		QUnit.module("igDataSource TreeHierarchicalDataSource Remote scenarios", {
			dsRemotePaging: null,
			dsRemoteSorting: null,
			dsRemoteFiltering: null,
			isInit: false,
			dsRemote: null,
			dsRemoteLoadOnDemand: null,
			dsRemotePaging: null,
			dsRemoteSorting: null,
			dsRemoteFiltering: null,
			util: $.ig.TestUtil,
			flatDS:[
					{ "employeeID": 0, "PID": -1, "firstName": "Andrew", "lastName": "Fuller", "reportsTo": "-", "Date": new Date("01/01/2011") },
					{ "employeeID": 1, "PID": -1, "firstName": "Jonathan", "lastName": "Smith", "reportsTo": "-", "Date": new Date("01/02/2011") },
					{ "employeeID": 2, "PID": -1, "firstName": "Nancy", "lastName": "Davolio", "reportsTo": "-", "Date": new Date("01/03/2011") },
					{ "employeeID": 3, "PID": -1, "firstName": "Steven", "lastName": "Buchanan", "reportsTo": "-", "Date": new Date("01/04/2011") },
					// sub of ID 1
					{ "employeeID": 4, "PID": 0, "firstName": "Janet", "lastName": "Leverling", "reportsTo": "0", "Date": new Date("01/05/2011") },
					{ "employeeID": 5, "PID": 0, "firstName": "Laura", "lastName": "Callahan", "reportsTo": "0", "Date": new Date("01/06/2011") },
					{ "employeeID": 6, "PID": 0, "firstName": "Margaret", "lastName": "Peacock", "reportsTo": "0", "Date": new Date("01/07/2011") },
					{ "employeeID": 7, "PID": 0, "firstName": "Michael", "lastName": "Suyama", "reportsTo": "0", "Date": new Date("01/08/2011") },
					// sub of ID 4
					{ "employeeID": 8, "PID": 4, "firstName": "Anne", "lastName": "Dodsworth", "reportsTo": "4", "Date": new Date("01/09/2011") },
					{ "employeeID": 9, "PID": 4, "firstName": "Danielle", "lastName": "Davis", "reportsTo": "4", "Date": new Date("01/10/2011") },
					{ "employeeID": 10, "PID": 4, "firstName": "Robert", "lastName": "King", "reportsTo": "4", "Date": new Date("01/11/2011") },
					// sub of ID 2
					{ "employeeID": 11, "PID": 2, "firstName": "Peter", "lastName": "Lewis", "reportsTo": "2", "Date": new Date("01/12/2011") },
					{ "employeeID": 12, "PID": 2, "firstName": "Ryder", "lastName": "Zenaida", "reportsTo": "2", "Date": new Date("01/13/2011") },
					{ "employeeID": 13, "PID": 2, "firstName": "Wang", "lastName": "Mercedes", "reportsTo": "2", "Date": new Date("01/14/2011") },
					// sub of ID 3
					{ "employeeID": 14, "PID": 3, "firstName": "Theodore", "lastName": "Zia", "reportsTo": "3", "Date": new Date("01/15/2011") },
					{ "employeeID": 15, "PID": 3, "firstName": "Lacota", "lastName": "Mufutau", "reportsTo": "3", "Date": new Date("01/16/2011") },
					// sub of ID 16
					{ "employeeID": 16, "PID": 15, "firstName": "Jin", "lastName": "Elliott", "reportsTo": "16", "Date": new Date("01/17/2011") },
					{ "employeeID": 17, "PID": 15, "firstName": "Armand", "lastName": "Ross", "reportsTo": "16", "Date": new Date("01/18/2011") },
					{ "employeeID": 18, "PID": 15, "firstName": "Dane", "lastName": "Rodriquez", "reportsTo": "16", "Date": new Date("01/19/2011") },
					// sub of ID 19
					{ "employeeID": 19, "PID": 18, "firstName": "Declan", "lastName": "Lester", "reportsTo": "19", "Date": new Date("01/20/2011") },
					{ "employeeID": 20, "PID": 18, "firstName": "Bernard", "lastName": "Jarvis", "reportsTo": "19", "Date": new Date("01/21/2011") },
					// sub of ID 20
					{ "employeeID": 21, "PID": 20, "firstName": "Jeremy", "lastName": "Donaldson", "reportsTo": "20", "Date": new Date("01/22/2011") }
				],
			loadRemoteTestbeds: function(){
				$.mockjax({
					url: 'employeeRemoteData',
					responseText: {
						status: 'success',
						data: {
							results: this.flatDS.slice(0, 3)
						},
						totalRecCount: 22
					}
				});
				$.mockjax({
					url: 'hierarchicalData',
					responseText: {
						status: 'success',
						data: {
							results: [{ "ID": 0, "Name": "Food", "Price": "-", "Category": { "ID": 0, "Name": "Name", "isActive": false }, "Products": [] }]
						},
						totalRecCount: 6
					}
				});
				this.dsRemote = new $.ig.TreeHierarchicalDataSource({
					dataSource: "employeeRemoteData",
					primaryKey: "employeeID",
					responseTotalRecCountKey: "totalRecCount",
					reponseDataKey: "data.results",
					schema: {
						fields: [
							{ name: "employeeID", type: "number" },
							{ name: "PID", type: "number" },
							{ name: "firstName", type: "string" },
							{ name: "lastName", type: "string" },
							{ name: "reportsTo", type: "string" }
						],
						searchField: "data.results"
					},
					treeDS: {
						key: "employeeID",
						persistExpansionStates: true,
						foreignKey: "PID",
						primaryKey: "employeeID",
						initialExpandDepth: 0,
						foreignKeyRootValue: -1,
						childDataKey: "childData",
						propertyDataLevel: "dataLevel",
						propertyExpanded: "expanded"
					}
				});
				this.dsRemote.dataBind();

				this.dsRemoteLoadOnDemand = new $.ig.TreeHierarchicalDataSource({
					dataSource: "hierarchicalData",
					dataSourceUrl: "hierarchicalData",
					primaryKey: "ID",
					responseTotalRecCountKey: "totalRecCount",
					reponseDataKey: "data.results",
					schema: {
						fields: [
							{ name: "ID", type: "number" },
							{ name: "Name", type: "string" }
						],
						searchField: "data.results"
					},
					treeDS: {
						dataSourceUrl: "hierarchicalData",
						key: "ID",
						primaryKey: "ID",
						initialExpandDepth: 0,
						foreignKeyRootValue: -1,
						childDataKey: "Products",
						propertyDataLevel: "dataLevel",
						propertyExpanded: "expanded",
						enableRemoteLoadOnDemand: true
					}
				});
				this.dsRemoteLoadOnDemand.dataBind();

								//remote paging
				this.dsRemotePaging = new $.ig.TreeHierarchicalDataSource({
					dataSource: "employeeRemoteData",
					primaryKey: "employeeID",
					responseTotalRecCountKey: "totalRecCount",
					reponseDataKey: "data.results",
					schema: {
						fields: [
							{ name: "employeeID", type: "number" },
							{ name: "PID", type: "number" },
							{ name: "firstName", type: "string" },
							{ name: "lastName", type: "string" },
							{ name: "reportsTo", type: "string" }
						],
						searchField: "data.results"
					},
					treeDS: {
						key: "employeeID",
						foreignKey: "PID",
						primaryKey: "employeeID",
						initialExpandDepth: 3,
						foreignKeyRootValue: -1,
						childDataKey: "childData",
						propertyDataLevel: "dataLevel",
						propertyExpanded: "expanded",
						paging: { mode: "allLevels" }
					},
					paging: {
						enabled: true,
						pageSize: 3,
						type: "remote"
					}

				});
				this.dsRemotePaging.dataBind();

								//remote sorting
				this.dsRemoteSorting = new $.ig.TreeHierarchicalDataSource({
					dataSource: "employeeRemoteData",
					primaryKey: "employeeID",
					responseTotalRecCountKey: "totalRecCount",
					reponseDataKey: "data.results",
					schema: {
						fields: [
							{ name: "employeeID", type: "number" },
							{ name: "PID", type: "number" },
							{ name: "firstName", type: "string" },
							{ name: "lastName", type: "string" },
							{ name: "reportsTo", type: "string" }
						],
						searchField: "data.results"
					},
					treeDS: {
						key: "employeeID",
						foreignKey: "PID",
						primaryKey: "employeeID",
						initialExpandDepth: 3,
						foreignKeyRootValue: -1,
						childDataKey: "childData",
						propertyDataLevel: "dataLevel",
						propertyExpanded: "expanded"
					},
					sorting: {
						enabled: true,
						type: "remote",
						defaultFields: [{ fieldName: "employeeID", dir: "asc" }]
					}

				});
				this.dsRemoteSorting.dataBind();

				this.dsRemoteFiltering = new $.ig.TreeHierarchicalDataSource({
					dataSource: "employeeRemoteData",
					primaryKey: "employeeID",
					responseTotalRecCountKey: "totalRecCount",
					reponseDataKey: "data.results",
					schema: {
						fields: [
							{ name: "employeeID", type: "number" },
							{ name: "PID", type: "number" },
							{ name: "firstName", type: "string" },
							{ name: "lastName", type: "string" },
							{ name: "reportsTo", type: "string" }
						],
						searchField: "data.results"
					},
					treeDS: {
						key: "employeeID",
						foreignKey: "PID",
						primaryKey: "employeeID",
						initialExpandDepth: 3,
						foreignKeyRootValue: -1,
						childDataKey: "childData",
						propertyDataLevel: "dataLevel",
						propertyExpanded: "expanded"
					},
					filtering: {
						enabled: true,
						type: "remote",
						defaultFields: [{ fieldName: "firstName", expr: "Laura", cond: "equals" }]
					}

				});
				this.dsRemoteFiltering.dataBind();
			},
			customEncoding: function(){
				return "customUrl";
			},
				before: function (assert) {
					var done = assert.async();
					//pause testing until tree is initialized
					if (!this.isInit) {
						this.loadRemoteTestbeds();
						this.util.wait(500).then(function () { done(); });
						this.isInit = true;
					}
				},
				after: function () {
				}
			});

			QUnit.test("Test Remote Paging params", function (assert) {
				assert.expect(1);
				var params = $.param(this.dsRemotePaging._encodeUrl());
				assert.equal(params, "%24skip=0&%24top=3&%24inlinecount=allpages&paging.mode=allLevels&paging.contextRowMode=none&pk=employeeID&fk=PID&fkRootValue=-1&propertyDataLevel=dataLevel&propertyExpanded=expanded&childDataKey=childData&initialExpandDepth=3",
					"Verify sent parameters are correct.");
			});

			QUnit.test("Test Remote Sorting params", function (assert) {
				assert.expect(1);
				var params = $.param(this.dsRemoteSorting._encodeUrl());
				assert.equal(params, "sorting.fromLevel=0&sorting.toLevel=-1&pk=employeeID&fk=PID&fkRootValue=-1&propertyDataLevel=dataLevel&propertyExpanded=expanded&childDataKey=childData&initialExpandDepth=3",
					"Verify sent parameters are correct.");
			});

			QUnit.test("Test Remote Filtering params", function (assert) {
				assert.expect(1);
				var params = $.param(this.dsRemoteFiltering._encodeUrl());
				assert.equal(params, "filtering.fromLevel=0&filtering.toLevel=-1&__matchFiltering=__matchFiltering&filtering.displayMode=showWithAncestors&pk=employeeID&fk=PID&fkRootValue=-1&propertyDataLevel=dataLevel&propertyExpanded=expanded&childDataKey=childData&initialExpandDepth=3",
					"Verify sent parameters are correct.");
			});
			QUnit.test("Test Remote Expand/Collapse params", function (assert) {
				assert.expect(1);
				this.dsRemote.toggleRow(0);
				var params = $.param(this.dsRemote._encodeUrl());
				assert.equal(params, "pk=employeeID&listExpansionStates%5B0%5D=true&fk=PID&fkRootValue=-1&propertyDataLevel=dataLevel&propertyExpanded=expanded&childDataKey=childData&initialExpandDepth=0",
					"Verify sent parameters are correct.");
			});

			QUnit.test("Test Load on demand - persistExpansionStates", function (assert) {
				assert.expect(1);
				this.dsRemoteLoadOnDemand.dataBind();
				this.dsRemoteLoadOnDemand.settings.treeDS.persistExpansionStates = true;

				this.dsRemoteLoadOnDemand.toggleRow(0);
				var params = this.dsRemoteLoadOnDemand._encodeUrl();
				assert.ok(params.listExpansionStates["0"], "Expansion state should be saved and its value should be true.");

			});
			QUnit.test("Test Load on demand", function (assert) {
				assert.expect(1);
				var done = assert.async();
				$.mockjax({
					url: "customLoadOnDemand?path=0&depth=0",
					responseText: {
						status: 'success',
						data: {
							results: [{ "ID": 0, "Name": "Food", "Price": "-", "Category": { "ID": 0, "Name": "Name", "isActive": false }, "Products": [] }]
						},
						totalRecCount: 6
					}, onAfterSuccess: function () {
						done();
						assert.ok(true, "Path and Depth are correct.");
					}
				});
				this.dsRemoteLoadOnDemand.settings.treeDS.dataSourceUrl = "customLoadOnDemand";
				this.dsRemoteLoadOnDemand.toggleRow(0);
			});
//			QUnit.test("Test if params are properly encoded when customEncodeUrlFunc is defined.", function (assert) {
//				assert.expect(8);
//				var successTimesCalled = 0, self = this, done = assert.async();
//				$.mockjax({
//					url: 'hierarchicalData2',
//					responseText: {
//						status: 'success',
//						data: {
//							results: [{ "ID": 0, "Name": "Food", "Price": "-", "Category": { "ID": 0, "Name": "Name", "isActive": false }, "Products": [] }, { "ID": 1, "Name": "Food", "Price": "-", "Category": { "ID": 0, "Name": "Name", "isActive": false }, "Products": [] }]
//						},
//						totalRecCount: 6
//					}
//				});
//				var dsRemoteLoadOnDemand1 = new $.ig.TreeHierarchicalDataSource({
//					dataSource: "hierarchicalData2",
//					dataSourceUrl: "hierarchicalData2",
//					primaryKey: "ID",
//					responseTotalRecCountKey: "totalRecCount",
//					reponseDataKey: "data.results",
//					schema: {
//						fields: [
//							{ name: "ID", type: "number" },
//							{ name: "Name", type: "string" }
//						],
//						searchField: "data.results"
//					},
//					treeDS: {
//						dataSourceUrl: "hierarchicalData",
//						key: "ID",
//						primaryKey: "ID",
//						initialExpandDepth: 0,
//						foreignKeyRootValue: -1,
//						childDataKey: "Products",
//						propertyDataLevel: "dataLevel",
//						propertyExpanded: "expanded",
//						enableRemoteLoadOnDemand: true
//					}
//				});
//
//				dsRemoteLoadOnDemand1.settings.treeDS.customEncodeUrlFunc = function (rec, expand) {
//					return "customUrl";
//				};
//
//
//				dsRemoteLoadOnDemand1.dataBind();
//				this.util.wait(500).then(function () {
//					$.mockjax({
//						url: "customUrl",
//						responseText: {
//							status: 'success',
//							data: {
//								results: [{ "ID": 0, "Name": "Food", "Price": "-", "Category": { "ID": 0, "Name": "Name", "isActive": false }, "Products": [] }]
//							},
//							totalRecCount: 6
//						},
//						onAfterSuccess: function () {
//							successTimesCalled++;
//							assert.ok(true, "customEncodeUrlFunc has successfully taken affect.");
//						}
//					});
//					dsRemoteLoadOnDemand1.toggleRow(0);
//
//					dsRemoteLoadOnDemand1.settings.treeDS.customEncodeUrlFunc = this.customEncoding;
//
//					dsRemoteLoadOnDemand1.toggleRow(1);
//					self.util.wait(800);
//						}).then(function () {
//					
//						assert.equal(successTimesCalled, 2, "Success should be called 2 times for the custom url specified.");
//							done();
//					});
//			
//			});

			QUnit.test("Test changing schema and applying the new schema to the data source.", function (assert) {
				assert.expect(3);
				var done = assert.async();
				$.mockjax({
						url: "treeDSUrl",
						responseText: {
							status: 'success',
							data: {
								results: [{ "ID": 0, "Name": "Food", "Price": "100", "Category": [{ "ID": 0, "Name": "Name", "Price": "101"}], "Products": [] }]
							},
							totalRecCount: 2
						}
				});
				var ds =  new $.ig.TreeHierarchicalDataSource({
					dataSource: "treeDSUrl",
					dataSourceUrl: "treeDSUrl",
					primaryKey: "ID",
					localSchemaTransform: false,
					responseTotalRecCountKey: "totalRecCount",
					reponseDataKey: "data.results",
					schema: {
						searchField: "data.results",
						fields: [
							{ name: "ID", type: "number" },
							{ name: "Name", type: "string" }
						]
					},
					treeDS: {
						dataSourceUrl: "treeDSUrl",
						key: "ID",
						primaryKey: "ID",
						initialExpandDepth: 0,
						childDataKey: "Category",
						propertyDataLevel: "dataLevel",
						propertyExpanded: "expanded"
					}
				});
				ds.dataBind(function () {
					done();
					ds.settings.schema = new $.ig.DataSchema("json", {
						searchField: "data.results",
						fields: [
							{ name: "ID", type: "number" },
							{ name: "Name", type: "string" },
							{ name: "Price", type: "number" },
						]
					});
				ds._initSchema();
				ds._applySchema(true);

				data = ds.data();
				assert.equal( data[0].expanded, false, "Expanded property should be properly set.");
				assert.equal( data[0].dataLevel, 0, "DataLevel property should be properly set.");
				assert.equal($.type(data[0].Price), "number", "Value of field in the data source should be transformend to the correct data type.");
			});
		});
