$.mockjaxSettings.logging = 0;  
			function generateData(count, key, dir){
				var i, count = count || 4, data = [];
				for (i = 0; i < count; i++) {
					data.push({
						Id: i,
						ProductName: "product name " + i,
						ProductDescription: "description " + (i % 2),
						Price: 1,
						Promotion: !!(i % 2),
						Date: new Date(i),
						Category: {
							Id: i % 3,
							Name: "Category " + (i % 3)
						}
					});
				}
				// sort data if argument "key" is set
				if (key) {
					sortF = function (key, dir) {
						return function (obj1, obj2) {
							var v1 = obj1[key],
								v2 = obj2[key],
								rev = dir === "asc" ? 1 : -1;
							if (v1 < v2) {
								return -1 * rev;
							}
							if (v1 > v2) {
								return 1 * rev;
							}
							return 0;
						};
					};
					data = data.sort(sortF(key, dir));
				}
				return data;	
			}
			// configure mockjax for tests of remote groupby 
			$.mockjax({
				url: 'http://randomgroupbyurl.com$callback=?',
				contentType: "application/json",
				isTimeout: false,
				//dataType: 'json',
				response: function (settings) {
					var ob = settings.data.$orderby, args,
						key, dir, se;
					// process url params
					ob = settings.data.$orderby;
					if (ob) {
						args = ob.split(",")[0];
						if (args) {
							se = args.split(" ");
							if (se && se.length > 1) {
								key = se[0];
								dir = se[1];
							}
						}
					}
					this.responseText = {
						records: generateData(10, key, dir)
					};
				}
			});

			/* Test GroupBy with type: "local"*/
			QUnit.module("igDataSource groupby with type: local", {
				remoteDs: null, 
				__init : false,
				ds: null,
				renderData: function(data){
					var $tbody = $("#t1>tbody"), i, j, html = '', r;
					$tbody.empty();
					for (i = 0; i < data.length; i++) {
						r = data[i];
						if (r.__gbRecord) {
							html += "<tr><td colspan='6'>GroupBy record with val: " + r.val + "</td></tr>"
						} else if (r.__gbSummaryRecord) {
							var summaries = r.summaries;
							html += "<tr>" +
								"<td>" + (summaries["Id"] || "" )+ "</td>" +
								"<td>" + (summaries["ProductName"] || "") + "</td>" +
								"<td>" + (summaries["ProductDescription"] || "") + "</td>" +
								"<td>" + (summaries["Price"] || "") + "</td>" +
								"<td>" + (summaries["Promotion"] || "") + "</td>" +
								"<td>" + (summaries["Date"] || "") + "</td>" +
							"</tr>";
						} else {
							html += "<tr>" +
								"<td>" + r.Id + "</td>" +
								"<td>" + r.ProductName + "</td>" +
								"<td>" + r.ProductDescription + "</td>" +
								"<td>" + r.Price + "</td>" +
								"<td>" + r.Promotion + "</td>" +
								"<td>" + (r.Date || "") + "</td>" +
							"</tr>";
						}
					}
					$tbody.html(html)
				},
				testGroupByData: function(actualData, expectedData, keyToTest){
					var se=[],i, len = actualData.length, aRec, eRec;
					if (len !== expectedData.length) {
						return false;
					}
					for (i = 0; i < len; i++) {
						aRec = actualData[i];
						eRec = expectedData[i];
						if (aRec.__gbRecord !== eRec.__gbRecord) {
							return false;
						}
						if (!aRec.__gbRecord) {
							if (keyToTest !== undefined &&
								aRec[keyToTest] !== eRec[keyToTest]) {
								return false;
							}
						} else if (eRec.val !== undefined && aRec.val !== eRec.val) {
							return false;
						}
					}
					return true;
				},
				generateData: function(count, key, dir){
					var i, count = count || 4, data = [];
					for (i = 0; i < count; i++) {
						data.push({
							Id: i,
							ProductName: "product name " + i,
							ProductDescription: "description " + (i % 2),
							Price: 1,
							Promotion: !!(i % 2),
							Date: new Date(i),
							Category: {
								Id: i % 3,
								Name: "Category " + (i % 3)
							}
						});
					}
					// sort data if argument "key" is set
					if (key) {
						sortF = function (key, dir) {
							return function (obj1, obj2) {
								var v1 = obj1[key],
									v2 = obj2[key],
									rev = dir === "asc" ? 1 : -1;
								if (v1 < v2) {
									return -1 * rev;
								}
								if (v1 > v2) {
									return 1 * rev;
								}
								return 0;
							};
						};
						data = data.sort(sortF(key, dir));
					}
					return data;	
				},
				createDataSource: function(dsOpts){
					dsOpts = dsOpts || { 
						schema: { 
							fields: [
								{ name: "Id", type: "number" }, 
								{ name: "ProductName", type: "string" },
								{ name: "ProductDescription" },
								{ name: "Price" }, 
								{ name: "Promotion", type: "bool" },
								{ name: "Date", type: "datetime" }]
						},
						filtering: { type: "local" }, 
						sorting: { type: "local" }, 
						dataSource: this.generateData(4)
					};
					return new $.ig.DataSource(dsOpts);
				},
				getRecsInViewByType: function(gbDataView){
					var gbRecs = [], gbSumRecs = [], recs = [];
					for (var i = 0; i < gbDataView.length; i++) {
						if (gbDataView[i].__gbRecord) {
							gbRecs.push(gbDataView[i]);
						} else if(gbDataView[i].__gbSummaryRecord){
							gbSumRecs.push(gbDataView[i]);
						} else {
							recs.push(gbDataView[i]);
						}
					}
					return {gbRecs: gbRecs, gbSumRecs: gbSumRecs, dataRecs: recs };
				},
				beforeEach: function () {
					this.ds = this.createDataSource();
				},
				afterEach: function(){
				}
			});
			QUnit.test("Test sorting dataSource for grouped columns with specific layout", function (assert) {
				assert.expect(5);
				var se= [], i, data, 
					dataView, gbDataView;
				// this sorting expression should be ignored
				se.push({
					fieldName: "OtherID",
					isGroupBy: true,
					dir: "desc",
					layout: "SomeLayout"
				});
				se.push({
					fieldName: "Id",
					isGroupBy: true,
					dir: "desc"
				});
				this.ds.settings.sorting.expressions = se;
				this.ds.settings.sorting.defaultFields = se;
				this.ds.dataBind();
				data = this.ds.data();
				dataView = this.ds.dataView();
				gbDataView = this.ds.groupByDataView();
				assert.ok(gbDataView[0].__gbRecord && gbDataView[0].id === "Id:51" && gbDataView[0].len === 1 &&
					gbDataView[1].Id === 3 &&
					gbDataView[7].Id === 0,
					"Test content of data view");
				assert.equal(data.length, 4, "Group by Id desc(initial sorting) - Test count of data records");
				assert.equal(gbDataView.length, data.length * 2, "Group by Id desc(initial sorting) - Test count of dataView records");
				assert.ok(data[0].Id === 3 && data[3].Id === 0, "Group by Id desc(initial sorting) - Test whether properly is sorted data");
				assert.ok(this.ds.isGroupByApplied(), "Test 'isGroupByApplied'");
				this.renderData(data);
			});
			QUnit.test("Test sorting dataSource for grouped columns", function (assert) {
			 	assert.expect(13);
			 	var se = [], i, data, 
			 		dataView, gbDataView;
			 	// group by column Id - using defaultFields of sorting
			 	se.push({
			 		fieldName: "Id",
			 		isGroupBy: true,
			 		dir: "desc"
			 	});
			 	this.ds.settings.sorting.expressions = se;
			 	this.ds.settings.sorting.defaultFields = se;
			 	this.ds.dataBind();
			 	data = this.ds.data();
			 	dataView = this.ds.dataView();
			 	gbDataView = this.ds.groupByDataView();
			 	assert.ok(gbDataView[0].__gbRecord && gbDataView[0].id === "Id:51" && gbDataView[0].len === 1 &&
			 		gbDataView[1].Id === 3 &&
			 		gbDataView[7].Id === 0,
			 		"Test content of data view");
			 	assert.equal(data.length, 4, "Group by Id desc(initial sorting) - Test count of data records");
			 	assert.equal(gbDataView.length, data.length * 2, "Group by Id desc(initial sorting) - Test count of dataView records");
			 	assert.ok(data[0].Id === 3 && data[3].Id === 0, "Group by Id desc(initial sorting) - Test whether properly is sorted data");
			 	assert.ok(this.ds.isGroupByApplied(), "Test 'isGroupByApplied'");
			 	this.renderData(data);
			 	// group by for columns Id, ProductName - using sort function
			 	se.push({
			 		fieldName: "ProductName",
			 		isGroupBy: true,
			 		dir: "desc"
			 	});
			 	this.ds.sort(se);
			 	data = this.ds.data();
			 	dataView = this.ds.dataView();
			 	gbDataView = this.ds.groupByDataView();
			 	assert.equal(data.length, 4, "Group by Id desc, ProductName desc - Test count of data records");
			 	assert.equal(gbDataView.length, data.length * 3, "Group by Id desc, ProductName desc - test count of dataView records");
			 	assert.ok(gbDataView[gbDataView.length - 1].Id === 0 && gbDataView[0].__gbRecord,
			 				"Group by Id desc, ProductName desc - test last and first records of dataView");
			 	assert.ok(data[0].Id === 3 && data[3].Id === 0, "Group by Id desc, ProductName desc - test whether properly is sorted data")
			 	this.renderData(data);
			 	// group by only for column Price
			 	se = [{
			 		fieldName: "Price",
			 		isGroupBy: true,
			 		dir: "asc"
			 	},
			 	{
			 		fieldName: "Id",
			 		dir: "asc"
			 	}];
			 	this.ds.sort(se);
			 	data = this.ds.data();
			 	dataView = this.ds.dataView();
			 	gbDataView = this.ds.groupByDataView();
			 	assert.equal(data.length, 4, "Group by column Price and sort by column Id - Test count of data records");
			 	assert.equal(gbDataView.length, 5, "Group by column Price and sort by column Id - test count of dataView records");
			 	assert.ok(data[0].Id === 0 && data[3].Id === 3, 
			 		"Group by column Price and sort by column Id - test sorting of data records");
			 	assert.ok(gbDataView[1].Id === 0 && gbDataView[0].__gbRecord,
			 		"Group by Price - test dataView records");
			 	this.renderData(data);
			 });
			QUnit.test("Test public functions: 'visibleGroupByData', 'groupByData', 'toggleGroupByRecord'", function (assert) {
				assert.expect(10);
				var se = [], i, data,
				 	dataView, gbData, gbDataView;
				se = [{
					fieldName: "Price",
					isGroupBy: true,
					dir: "asc"
				}];
				this.ds.dataBind();
				this.ds.sort(se);
				data = this.ds.data();
				dataView = this.ds.dataView();
				gbDataView = this.ds.groupByDataView();
				assert.ok(
					gbDataView.length === 5 && 
					dataView.length === 4, 
					"Group by Price - test count of dataView records");
				// collapse first row
				this.ds.toggleGroupByRecord(gbDataView[0].id, true);
				dataView = this.ds.dataView();
				gbDataView = this.ds.groupByDataView();
				assert.ok(this.ds.isGroupByRecordCollapsed(gbDataView[0].id) === true &&
					dataView[3].Id === 3 &&
					dataView.length === 4, 
					"Test whether first group by record is collapsed");
				assert.equal(gbDataView.length, 1, "Group by Price - test count of dataView records when first group by record is collapsed");
				assert.ok(gbDataView[0].__gbRecord && gbDataView[0].collapsed, "First record in data view should be non-data, group-by record, and propery collapsed should be true");
				assert.ok(this.ds.visibleGroupByData().length, 1, "Test visibleGroupByData");
				gbData = this.ds.groupByData();
				assert.equal(gbData.length, 5, "Test groupByData length");
				assert.ok(gbData[0].__gbRecord && gbData[4].Id === 3, 
					"Test groupBy data");
				// expand first row
				this.ds.toggleGroupByRecord(gbDataView[0].id, false);
				dataView = this.ds.dataView();
				gbDataView = this.ds.groupByDataView();
				assert.equal(gbDataView.length, 5, "Group by Price - test count of dataView records when first group by record is collapsed");
				assert.ok(gbDataView[0].__gbRecord && !gbDataView[0].collapsed, "First record in data view should be non-data, group-by record, and propery collapsed should be true");
				assert.ok(this.ds.isGroupByRecordCollapsed(gbDataView[0].id) === false, "Test whether first group by record is expanded");
			});
			QUnit.test("Test groupby of column with type object('mapper' is set)", function (assert) {
				assert.expect(2);
				var se = [], gbData, data,
					dsMapper = this.createDataSource({
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName", type: "string" },
							{ name: "Category", type: "object", 
								mapper: function (obj) {
									return obj.Category.Name;
								} },
							{ name: "Price" }, 
							{ name: "Promotion", type: "bool" },
							{ name: "Date", type: "datetime" }]
					},
					sorting: { type: "local" }, 
					dataSource: this.generateData(4)
				});
				// group by column Category desc
				se.push({
					fieldName: "Category",
					isGroupBy: true,
					dir: "desc"
				});
				dsMapper.settings.sorting.expressions = se;
				dsMapper.settings.sorting.defaultFields = se;
				dsMapper.dataBind();
				gbData = dsMapper.groupByData();
				assert.ok(gbData.length === 7 &&
					gbData[0].__gbRecord === true && 
					gbData[0].val === "Category 2" &&
					gbData[5].Category.Name === "Category 0" &&
					gbData[6].Category.Name === "Category 0",
					"Test groupByData() after groupping by column Category");
				data = dsMapper.data();
				// test whether data is properly sorted
				assert.ok(data.length === 4 &&
					data[0].Category.Name === "Category 2" &&
					data[3].Category.Name === "Category 0",
					"Test data() after grouping by column Category");
			});
			QUnit.test("Test groupby + filtering", function (assert) {
				assert.expect(1);
				var se = [], i, 
					data, dataView, gbData, gbDataView;
				se = [{
					fieldName: "Price",
					isGroupBy: true,
					dir: "asc"
				}];
				this.ds.settings.sorting.defaultFields = se;
				this.ds.settings.sorting.expressions = se;
				this.ds.settings.sorting.enabled = true;
				this.ds.settings.filtering.defaultFields = [{
					fieldName: "Id",
					cond: "greaterThan",
					expr: 0
				}];
				this.ds.dataBind();
				dataView = this.ds.dataView();
				gbDataView = this.ds.groupByDataView();
				assert.ok(dataView.length === 3 &&
					gbDataView[0].__gbRecord &&
					gbDataView[3].Id === 3 &&
					gbDataView.length === 4,
					"Test groupByDataView records");
				this.renderData(gbDataView);
			});
			QUnit.test("Test groupby + paging with pagingMode: dataRecordsOnly", function (assert) {
				assert.expect(4);
				var se = [], i, gbDataView;
				se = [{
					fieldName: "Id",
					isGroupBy: true,
					dir: "asc"
				}];
				// enable paging
				this.ds.settings.paging.enabled = true;
				this.ds.settings.paging.pageSize = 5;
				this.ds.settings.paging.type = "local";
				// set sorting expressions
				this.ds.settings.sorting.defaultFields = se;
				this.ds.settings.sorting.expressions = se;
				this.ds.settings.sorting.enabled = true;
				// set paginMode to "dataRecordsOnly"
				this.ds.settings.groupby.pagingMode = "dataRecordsOnly";
				this.ds.dataBind();
				gbDataView = this.ds.groupByDataView();
				this.renderData(gbDataView);
				assert.ok(gbDataView.length === 8 &&
					gbDataView[0].__gbRecord === true &&
					gbDataView[1].Id === 0 &&
					gbDataView[7].Id === 3, "Test gbDataView");
				// set page size to 3
				this.ds.settings.paging.pageSize = 3;
				this.ds.dataBind();
				gbDataView = this.ds.groupByDataView();
				assert.ok(gbDataView.length === 6 &&
					gbDataView[0].__gbRecord === true &&
					gbDataView[1].Id === 0 &&
					gbDataView[5].Id === 2,
					"Test gbDataView after changing pageSize to 3");
				// collapse first record
				this.ds.toggleGroupByRecord(gbDataView[0].id, true);
				gbDataView = this.ds.groupByDataView();
				assert.ok(gbDataView.length === 5 &&
					gbDataView[0].__gbRecord === true &&
					gbDataView[1].__gbRecord === true &&
					gbDataView[4].Id === 2, 
					"Test gbDataView with pageSize: 3 and collapse first group-by record");
				// go to 2nd page
				this.ds.pageIndex(1);
				gbDataView = this.ds.groupByDataView();
				this.renderData(gbDataView)
				assert.ok(this.testGroupByData(gbDataView, [{__gbRecord: true}, {Id: 3}], "Id"), 
					"Test gbDataView length with pageSize: 3 and collapse first group-by record and pageIndex = 1");
			});
			QUnit.test("Test groupby + paging with pagingMode: dataRecordsOnly and group 3 columns", function (assert) {
				assert.expect();
				var se = [], i, gbDataView;
				se = [{
					fieldName: "Promotion",
					isGroupBy: true,
					dir: "asc"
				}, {
					fieldName: "Id",
					isGroupBy: true,
					dir: "asc"
				}, {
					fieldName: "Price",
					isGroupBy: true,
					dir: "asc"
				}];
				// enable paging
				this.ds.settings.paging.enabled = true;
				this.ds.settings.paging.pageSize = 3;
				this.ds.settings.paging.type = "local";
				// set sorting expressions
				this.ds.settings.sorting.defaultFields = se;
				this.ds.settings.sorting.expressions = se;
				this.ds.settings.sorting.enabled = true;
				// set paginMode to "dataRecordsOnly"
				this.ds.settings.groupby.pagingMode = "dataRecordsOnly";
				this.ds.dataBind();
				gbDataView = this.ds.groupByDataView();
				this.renderData(gbDataView);
				assert.ok(gbDataView.length === 11 &&  
					gbDataView[0].__gbRecord && gbDataView[1].__gbRecord && gbDataView[2].__gbRecord &&
					gbDataView[10].Id === 1,
					"Test 1st page");
				// collapse group-by record with val:true
				this.ds.toggleGroupByRecord(gbDataView[7].id, true);
				gbDataView = this.ds.groupByDataView();
				this.renderData(gbDataView);
				assert.ok(gbDataView.length === 8 &&  
					gbDataView[0].__gbRecord && gbDataView[1].__gbRecord && gbDataView[2].__gbRecord &&
					gbDataView[7].__gbRecord && gbDataView[7].val === true,
					"Test 1st page after collapsing record");
				// go to 2nd page
				this.ds.pageIndex(1);
				gbDataView = this.ds.groupByDataView();
				this.renderData(gbDataView);
				assert.ok(gbDataView.length === 1 &&  
					gbDataView[0].__gbRecord && gbDataView[0].val === true,
					"Test 2nd page");
				// expand group-by record
				this.ds.toggleGroupByRecord(gbDataView[0].id, false);
				gbDataView = this.ds.groupByDataView();
				this.renderData(gbDataView);
				assert.ok(this.testGroupByData(gbDataView, 
							[{__gbRecord: true}, {__gbRecord: true}, {__gbRecord: true}, {Id: 3}],
							"Id"),
					"Test 2nd page, after expanding group-by record");
			});
			QUnit.test("Test groupby + paging + filtering", function (assert) {
				assert.expect(7);
				var se = [], i, data, gbDataView, dataView, gbData,
					dataGenerated, argsRecordsToggled;
				se = [{
					fieldName: "Id",
					isGroupBy: true,
					dir: "asc"
				}];
				// enable paging
				this.ds.settings.paging.enabled = true;
				this.ds.settings.paging.pageSize = 5;
				this.ds.settings.paging.type = "local";
				// set sorting expressions
				this.ds.settings.sorting.defaultFields = se;
				this.ds.settings.sorting.expressions = se;
				this.ds.settings.sorting.enabled = true;
				this.ds.settings.filtering.defaultFields = [{
					fieldName: "Id",
					cond: "greaterThan",
					expr: 0
				}];
				///setup callback for dataGenerated and groupByRecordToggled
				this.ds.settings.groupby.dataGeneratedCallback = function () {
					dataGenerated = true;
				};
				this.ds.settings.groupby.recordToggledCallback = function () {
					argsRecordsToggled = arguments;
				};
				dataGenerated = false;
				this.ds.dataBind();
				assert.equal(dataGenerated, true, "Callback function dataGenerated should be called");
				dataView = this.ds.dataView();
				gbDataView = this.ds.groupByDataView();
				assert.ok(dataView.length === 2 &&
					gbDataView.length === 5 &&
					gbDataView[0].__gbRecord && 
					gbDataView[1].Id === 1, "Test dataView records");
				assert.equal(this.ds.groupByData().length, 6, "Test count of records in groupByData");
				assert.equal(this.ds.pageCount(), 2, "Test pageCount");
				this.ds.pageIndex(1);
				dataView = this.ds.dataView();
				assert.ok(dataView.length === 1 && dataView[0].Id === 3, "Test dataView after changing pageIndex to 1");
				// toggle first record
				this.ds.toggleGroupByRecord(dataView[0].Id, false);
				assert.ok(argsRecordsToggled[0] === dataView[0].Id && argsRecordsToggled[1] === false, 
					"Test recordToggledCallback whether it is called and whether its arguments are properly set");
				dataGenerated = false;
				// call filter to detect whether data generated callback is called again
				this.ds.filter([{
					fieldName: "Id",
					cond: "lessThan",
					expr: 5
				}]);
				assert.equal(dataGenerated, true, "Callback function dataGenerated should be called when function filter is applied and there is grouped column(s)");
			});
			QUnit.test("Test groupby date column", function (assert) {
				assert.expect(2);
				var se = [], i, data, dataView, gbDataView, gbData;
				se = [{
					fieldName: "Date",
					isGroupBy: true,
					dir: "asc"
				}];
				// set sorting expressions
				this.ds.settings.sorting.defaultFields = se;
				this.ds.settings.sorting.expressions = se;
				this.ds.settings.sorting.enabled = true;
				this.ds.dataBind();
				dataView = this.ds.dataView();
				gbDataView = this.ds.groupByDataView();
				this.renderData(gbDataView);
				assert.ok(gbDataView[0].__gbRecord &&
					gbDataView[1].Id === 0 &&
					gbDataView[7].Id === 3,
					"Test dataView records");
				assert.equal(this.ds.groupByData().length, 8, "Test count of records in groupByData");
			});
			// test updating + groupby
			QUnit.test("Test updating when there is 1 grouped column", function (assert) {
				assert.expect();
				var se = [], i, data, dataView, gbDataView, gbData, 
				se = [{
					fieldName: "Date",
					isGroupBy: true,
					dir: "asc"
				}];
				// set sorting expressions
				this.ds.settings.sorting.defaultFields = se;
				this.ds.settings.sorting.expressions = se;
				this.ds.settings.sorting.enabled = true;
				this.ds.settings.primaryKey = "Id";
				this.ds.dataBind();
				gbDataView = this.ds.groupByDataView();
				this.renderData(gbDataView);
				// test add row
				i = 100;
				this.ds.addRow(i, {
						Id: i,
						ProductName: "product name " + i,
						ProductDescription: "description " + (i % 2),
						Price: 1,
						Promotion: !!(i % 2),
						Date: new Date(i),
						Category: {
							Id: i % 3,
							Name: "Category " + (i % 3)
						}
					});
				this.ds.commit();
				gbDataView = this.ds.groupByDataView();
				dataView = this.ds.dataView();
				this.renderData(gbDataView);
				assert.ok(gbDataView.length === 9 &&
					gbDataView[8].__gbRecord === undefined &&
					gbDataView[8].Id === i &&
					dataView.length === 5,
				 	"Test groupByDataView and dataView after new row is added");
				// test delete row
				this.ds.deleteRow(0);
				this.ds.commit();
				gbDataView = this.ds.groupByDataView();
				dataView = this.ds.dataView();
				this.renderData(gbDataView);
				assert.ok(gbDataView.length === 8 &&
					gbDataView[6].__gbRecord === true &&
					gbDataView[7].Id === i &&
					dataView.length === 4,
				 	"Test groupByDataView and dataView after row with id 0 is deleted");
				// test update row
				this.ds.updateRow(i, {
						Id: i,
						ProductName: "product name 1"
				});
				this.ds.commit();
				gbDataView = this.ds.groupByDataView();
				dataView = this.ds.dataView();
				this.renderData(gbDataView);
				assert.ok(gbDataView.length === 8 &&
					gbDataView[6].__gbRecord === true &&
					gbDataView[7].Id === i &&
					gbDataView[7].ProductName === "product name 1" &&
					dataView.length === 4,
				 	"Test groupByDataView and dataView after row with id 100 is updated");
			});
			//Basic Group Summary tests
			QUnit.test("Test basic summary group row with defaultCollapseState:false.", function (assert) {
				assert.expect();
				var expr = [
					{
						fieldName : "Promotion", dir:"asc", isGroupBy:true
					}
				], gbDataView, recsByType,
				dsDefColapseState = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName", type: "string" },
							{ name: "ProductDescription", type: "string" },
							{ name: "Price", type: "number" }, 
							{ name: "Promotion", type: "bool" },
							{ name: "Date", type: "date" }]
					},
					sorting:{
						type: "local",
						expressions: expr,
						defaultFields: expr
					},
					groupby: {
						defaultCollapseState: false,
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["avg","sum"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				dsDefColapseState.dataBind();

				gbDataView = dsDefColapseState.groupByDataView();
				this.renderData(gbDataView);
				assert.equal(gbDataView.length, 9, "There should be 9 records in the groupBy data view.");

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.gbRecs.length, 2, "There should be 2 groupby records in the data view.");
				assert.equal(recsByType.gbRecs[0].val, false, "First group value should be: false.");
				assert.equal(recsByType.gbRecs[1].val, true, "Second group value should be: true.");

				assert.equal(recsByType.dataRecs.length, 5, "Data records should be 5.");

				assert.equal(recsByType.gbSumRecs.length, 2, "There should be 2 groupby summary records in the data view.");
				assert.equal(recsByType.gbSumRecs[0].groupValue, false, "First group value should be: false.");
				assert.equal(recsByType.gbSumRecs[1].groupValue, true, "Second group value should be: true.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Price"]),"[1,3]", "There should be two summaries for Price with values for avg:1, sum:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Promotion"]), "[3]", "There should be one summary for Promotion with values for count:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Price"]), "[1,2]", "There should be two summaries for Price with values for avg:1, sum:2.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Promotion"]), "[2]", "There should be one summary for Promotion with values for count:2.");
				
				//change grouped cols
				dsDefColapseState.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}, {fieldName : "ProductName", isGroupBy:true}], "desc", false);
				gbDataView = dsDefColapseState.groupByDataView();
				this.renderData(gbDataView);

				assert.equal(gbDataView.length, 19, "There should be 15 records in the groupBy data view.");

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 5, "Data records should be 5.");
				assert.equal(recsByType.gbRecs.length, 7, "There should be 5 group recs.");
				assert.equal(recsByType.gbSumRecs.length, 7, "There should be 5 summary recs.");

				//collapse first group
				dsDefColapseState.toggleGroupByRecord(gbDataView[0].id, true);
				gbDataView = dsDefColapseState.groupByDataView();
				this.renderData(gbDataView);
				assert.equal(gbDataView.length, 9, "Toggling the first group should remove its children and summary from the view.");

				dsDefColapseState.toggleGroupByRecord(gbDataView[1].id, true);
				gbDataView = dsDefColapseState.groupByDataView();
				this.renderData(gbDataView);
				assert.equal(gbDataView.length, 2, "Toggling the second group should remove its children and summary from the view.");
			});
			QUnit.test("Test basic summary group row with defaultCollapseState:true.", function (assert) {
				assert.expect(24);
				var expr = [
					{
						fieldName : "Promotion", dir:"asc", isGroupBy:true
					}
				], gbDataView, recsByType,
				dsDefCollapseStateTrue = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName", type: "string" },
							{ name: "ProductDescription", type: "string" },
							{ name: "Price", type: "number" }, 
							{ name: "Promotion", type: "bool" },
							{ name: "Date", type: "date" }]
					},
					sorting:{
						type: "local",
						expressions: expr,
						defaultFields: expr
					},
					groupby: {
						defaultCollapseState: true,
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["avg","sum"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				dsDefCollapseStateTrue.dataBind();

				gbDataView = dsDefCollapseStateTrue.groupByDataView();
				this.renderData(gbDataView);
				assert.equal(gbDataView.length, 2, "There should be 2 records in the groupBy data view.");

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 0, "There should be no data records in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 0, "There should be no summary records in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 2, "There should be 2 group records in the group by data view.");

				//expand first group row
				dsDefCollapseStateTrue.toggleGroupByRecord(gbDataView[0].id, false);
				gbDataView = dsDefCollapseStateTrue.groupByDataView();
				this.renderData(gbDataView);
				assert.equal(gbDataView.length, 6, "There should be 6 records in the groupBy data view.");

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 3, "There should be 3 data records in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 1, "There should be 1 summary record in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 2, "There should be 2 group records in the group by data view.");

				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Price"]),"[1,3]", "There should be two summaries for Price with values for avg:1, sum:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Promotion"]), "[3]", "There should be one summary for Promotion with values for count:3.");

				//change grouped cols
				dsDefCollapseStateTrue.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}, {fieldName : "ProductName", isGroupBy:true}], "desc", false);
				gbDataView = dsDefCollapseStateTrue.groupByDataView();
				this.renderData(gbDataView);
				assert.equal(gbDataView.length, 6, "There should be 6 records in the groupBy data view.");

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 0, "There should be no data records in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 1, "There should be 1 summary record in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 5, "There should be 5 group records in the group by data view.");

				assert.equal(recsByType.gbRecs[0].id, recsByType.gbSumRecs[0].id, "Visible summary rec should belong to the expanded group row.");

				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Price"]),"[1,3]", "There should be two summaries for Price with values for avg:1, sum:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Promotion"]), "[3]", "There should be one summary for Promotion with values for count:3.");

				//expand last child group row in first group
				dsDefCollapseStateTrue.toggleGroupByRecord(gbDataView[3].id, false);
				gbDataView = dsDefCollapseStateTrue.groupByDataView();
				this.renderData(gbDataView);

				assert.equal(gbDataView.length, 8, "There should be 8 records in the groupBy data view.");

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 1, "There should be 1 data record in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 2, "There should be 2 summary record in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 5, "There should be 5 group records in the group by data view.");

				assert.equal(recsByType.gbRecs[3].id, recsByType.gbSumRecs[0].id, "Visible summary rec should belong to the expanded group row.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Price"]),"[1,1]", "There should be two summaries for Price with values for avg:1, sum:1.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Promotion"]), "[1]", "There should be one summary for Promotion with values for count:1.");

			});
			QUnit.test("Test summary group row is properly shown/hidden on toggle.", function (assert) {
				assert.expect(25);
				var gbDataView, recsByType,
				dsSummaryGroupRow = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName", type: "string" },
							{ name: "ProductDescription", type: "string" },
							{ name: "Price", type: "number" }, 
							{ name: "Promotion", type: "bool" },
							{ name: "Date", type: "date" }]
					},
					sorting:{
						type: "local"
					},
					groupby: {
						defaultCollapseState: false,
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["avg","sum"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				dsSummaryGroupRow.dataBind();

				//apply sort expr
				dsSummaryGroupRow.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}], "asc", false);

				gbDataView = dsSummaryGroupRow.groupByDataView();
				this.renderData(gbDataView);

				recsByType = this.getRecsInViewByType(gbDataView);

				for (var i = 0; i < recsByType.gbSumRecs.length; i++) {
					assert.equal(recsByType.gbRecs[i].id, recsByType.gbSumRecs[i].id, "Visible summary rec should belong to the expanded group row.");
					assert.equal(recsByType.gbRecs[i].val, recsByType.gbSumRecs[i].groupValue, "Visible summary rec should belong to the expanded group row.");
					assert.equal(recsByType.gbRecs[i].level, recsByType.gbSumRecs[i].level - 1, "Summary level should be correct.");
				}

				//apply sort expr
				dsSummaryGroupRow.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}, {fieldName : "ProductName", isGroupBy:true}], "desc", false);

				gbDataView = dsSummaryGroupRow.groupByDataView();
				this.renderData(gbDataView);

				recsByType = this.getRecsInViewByType(gbDataView);

				for (var i = 0; i < recsByType.gbRecs.length; i++) {
					var id = recsByType.gbRecs[i].id;
					for (var j = 0; j < recsByType.gbSumRecs.length; j++) {
						if (recsByType.gbSumRecs[j].id === id)
						{
							assert.equal(recsByType.gbRecs[i].level, recsByType.gbSumRecs[j].level - 1, "Group level should be correct.");
							assert.equal(recsByType.gbRecs[i].val, recsByType.gbSumRecs[j].groupValue, "Group value should be correct.");
							break;
						}
					}
				}

				assert.equal(gbDataView.length, 19, "There should be 19 recs in the group by data view.");
				//collapse
				dsSummaryGroupRow.toggleGroupByRecord(gbDataView[7].id, true);
				gbDataView = dsSummaryGroupRow.groupByDataView();
				this.renderData(gbDataView);

				assert.equal(gbDataView.length, 17, "There should be 17 recs in the group by data view.");

				assert.ok(gbDataView[8].id === gbDataView[0].id && gbDataView[8].val === gbDataView[0].groupValue, "Rec after the expanded one should be the summary for its parent group.");

				//expand
				dsSummaryGroupRow.toggleGroupByRecord(gbDataView[7].id, false);
				gbDataView = dsSummaryGroupRow.groupByDataView();
				this.renderData(gbDataView);

				assert.equal(gbDataView.length, 19, "There should be 19 recs in the group by data view.");

				assert.ok(gbDataView[7].id === gbDataView[9].id && gbDataView[7].val === gbDataView[9].groupValue, "Rec after the expanded one should be its summary.");

			});
			QUnit.test("Test summary group row with all default summaries per column type.", function (assert) {
				assert.expect(8);
				var gbDataView, recsByType,
				dsSummariesPerColumn = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName", type: "string" },
							{ name: "ProductDescription", type: "string" },
							{ name: "Price", type: "number" }, 
							{ name: "Promotion", type: "bool" },
							{ name: "Date", type: "date" }]
					},
					sorting:{
						type: "local"
					},
					groupby: {
						defaultCollapseState: false,
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["count","min", "max", "sum", "avg"]
							},
							{
								field:"ProductName", 
								summaryFunctions: ["count"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							},
							{
								field:"Date", 
								summaryFunctions: ["count", "min", "max"]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				dsSummariesPerColumn.dataBind();

				//apply sort expr
				dsSummariesPerColumn.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}], "asc", false);

				gbDataView = dsSummariesPerColumn.groupByDataView();
				this.renderData(gbDataView);

				recsByType = this.getRecsInViewByType(gbDataView);

				var summaries = recsByType.gbSumRecs[0].summaries;
				assert.equal(JSON.stringify(summaries["Date"]), "[3,0,4]", "Date summarries for Date field should be correct.");
				assert.equal(JSON.stringify(summaries["Price"]), "[3,1,1,3,1]", "Date summarries for Price field should be correct.");
				assert.equal(JSON.stringify(summaries["ProductName"]), "[3]", "Date summarries for ProductName field should be correct.");
				assert.equal(JSON.stringify(summaries["Promotion"]), "[3]", "Date summarries for Promotion field should be correct.");
				
				summaries = recsByType.gbSumRecs[1].summaries;
				assert.equal(JSON.stringify(summaries["Date"]), "[2,1,3]", "Date summarries for Date field should be correct.");
				assert.equal(JSON.stringify(summaries["Price"]), "[2,1,1,2,1]", "Date summarries for Price field should be correct.");
				assert.equal(JSON.stringify(summaries["ProductName"]), "[2]", "Date summarries for ProductName should be correct.");
				assert.equal(JSON.stringify(summaries["Promotion"]), "[2]", "Date summarries for Promotion should be correct.");
			});
			QUnit.test("Test summary group row when fields are not defined in the schema.", function (assert) {
				assert.expect(8);
				var gbDataView, recsByType,
				dsNoDefinedFieldsInSchema = this.createDataSource({
					sorting:{
						type: "local"
					},
					groupby: {
						defaultCollapseState: false,
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["count","min", "max", "sum", "avg"]
							},
							{
								field:"ProductName", 
								summaryFunctions: ["count"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							},
							{
								field:"Date", 
								summaryFunctions: ["count", "min", "max"]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				dsNoDefinedFieldsInSchema.dataBind();

				//apply sort expr
				dsNoDefinedFieldsInSchema.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}], "asc", false);
				gbDataView = dsNoDefinedFieldsInSchema.groupByDataView();
				this.renderData(gbDataView);
				
				recsByType = this.getRecsInViewByType(gbDataView);

				var summaries = recsByType.gbSumRecs[0].summaries;
				assert.equal(JSON.stringify(summaries["Date"]), "[3,0,4]", "Date summarries for Date field should be correct.");
				assert.equal(JSON.stringify(summaries["Price"]), "[3,1,1,3,1]", "Date summarries for Price field should be correct.");
				assert.equal(JSON.stringify(summaries["ProductName"]), "[3]", "Date summarries for ProductName field should be correct.");
				assert.equal(JSON.stringify(summaries["Promotion"]), "[3]", "Date summarries for Promotion field should be correct.");
				
				summaries = recsByType.gbSumRecs[1].summaries;
				assert.equal(JSON.stringify(summaries["Date"]), "[2,1,3]", "Date summarries for Date field should be correct.");
				assert.equal(JSON.stringify(summaries["Price"]), "[2,1,1,2,1]", "Date summarries for Price field should be correct.");
				assert.equal(JSON.stringify(summaries["ProductName"]), "[2]", "Date summarries for ProductName should be correct.");
				assert.equal(JSON.stringify(summaries["Promotion"]), "[2]", "Date summarries for Promotion should be correct.");
			});
			
			QUnit.test("Test summary group row when fields don't have a type defined.", function (assert) {
				assert.expect(8);
				var gbDataView, recsByType,
				dsFieldsNoTypeDefined = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName" },
							{ name: "ProductDescription" },
							{ name: "Price" }, 
							{ name: "Promotion" },
							{ name: "Date" }]
					},
					sorting:{
						type: "local"
					},
					groupby: {
						defaultCollapseState: false,
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["count","min", "max", "sum", "avg"]
							},
							{
								field:"ProductName", 
								summaryFunctions: ["count"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							},
							{
								field:"Date", 
								summaryFunctions: ["count", "min", "max"]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				dsFieldsNoTypeDefined.dataBind();

				//apply sort expr
				dsFieldsNoTypeDefined.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}], "asc", false);

				gbDataView = dsFieldsNoTypeDefined.groupByDataView();
				this.renderData(gbDataView);

				recsByType = this.getRecsInViewByType(gbDataView);

				var summaries = recsByType.gbSumRecs[0].summaries;
				assert.equal(JSON.stringify(summaries["Date"]), "[3,0,4]", "Date summarries for Date field should be correct.");
				assert.equal(JSON.stringify(summaries["Price"]), "[3,1,1,3,1]", "Date summarries for Price field should be correct.");
				assert.equal(JSON.stringify(summaries["ProductName"]), "[3]", "Date summarries for ProductName field should be correct.");
				assert.equal(JSON.stringify(summaries["Promotion"]), "[3]", "Date summarries for Promotion field should be correct.");
				
				summaries = recsByType.gbSumRecs[1].summaries;
				assert.equal(JSON.stringify(summaries["Date"]), "[2,1,3]", "Date summarries for Date field should be correct.");
				assert.equal(JSON.stringify(summaries["Price"]), "[2,1,1,2,1]", "Date summarries for Price field should be correct.");
				assert.equal(JSON.stringify(summaries["ProductName"]), "[2]", "Date summarries for ProductName should be correct.");
				assert.equal(JSON.stringify(summaries["Promotion"]), "[2]", "Date summarries for Promotion should be correct.");
			})

			QUnit.test("Test basic summary group row - custom summary functions.", function (assert) {
				assert.expect(1);
				var gbDataView, recsByType, trueCount = function (data) {
					var count = 0; 
					for (var i = 0; i < data.length; i++) {
						if (data[i]) { 
							count++;
						}
					}
					return count;
				},
				falseCount = function (data) {
					var count = 0; 
					for (var i = 0; i < data.length; i++) {
						if (!data[i]) { 
							count++;
						}
					}
					return count;
				},
				dsCustSummaryFunct = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName" },
							{ name: "ProductDescription" },
							{ name: "Price" }, 
							{ name: "Promotion" },
							{ name: "Date" }]
					},
					sorting:{
						type: "local"
					},
					groupby: {
						defaultCollapseState: false,
						summaries: [
							{
								field:"Promotion", 
								summaryFunctions: ["count",  trueCount, falseCount]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				dsCustSummaryFunct.dataBind();

				//apply sort expr
				dsCustSummaryFunct.sort([{fieldName : "Price", dir:"asc", isGroupBy:true}], "asc", false);

				gbDataView = dsCustSummaryFunct.groupByDataView();
				this.renderData(gbDataView);

				recsByType = this.getRecsInViewByType(gbDataView);
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Promotion"]),"[5,2,3]", "Th custom summaries should be correctly calculated.");
			});
			QUnit.test("Test basic summary group row - test setting custom options for groupRecordKey and groupSummaryRecordKey.", function (assert) {
				assert.expect(7);
				var gbDataView, recsByType,
					dsCustOpts = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id" }, 
							{ name: "ProductName" },
							{ name: "ProductDescription" },
							{ name: "Price" }, 
							{ name: "Promotion" },
							{ name: "Date" }]
					},
					sorting:{
						type: "local"
					},
					groupby: {
						defaultCollapseState: false,
						groupRecordKey: "__grRecordProperty",
						groupSummaryRecordKey: "__grRecordSummariesProperty",
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["count","min", "max", "sum", "avg"]
							},
							{
								field:"ProductName", 
								summaryFunctions: ["count"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							},
							{
								field:"Date", 
								summaryFunctions: ["count", "min", "max"]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				dsCustOpts.dataBind();

				//apply sort expr
				dsCustOpts.sort([{fieldName : "ProductName", dir:"asc", isGroupBy:true}], "asc", false);

				gbDataView = dsCustOpts.groupByDataView();

				var gbRecs = [], gbSumRecs = [], recs = [];
				for (var i = 0; i < gbDataView.length; i++) {
					if (gbDataView[i].__grRecordProperty) {
						gbRecs.push(gbDataView[i]);
					} else if(gbDataView[i].__grRecordSummariesProperty){
						gbSumRecs.push(gbDataView[i]);
					} else {
						recs.push(gbDataView[i]);
					}
				}
				assert.equal(recs.length, 5, "There should be 5 data records in the group by data view.");
				assert.equal(gbSumRecs.length, 5, "There should be 1 summary record in the group by data view.");
				assert.equal(gbRecs.length, 5, "There should be 5 group records in the group by data view.");

				//toggle first rec
				dsCustOpts.toggleGroupByRecord(gbDataView[0].id, true);
				gbDataView = dsCustOpts.groupByDataView();
				assert.equal(gbDataView.length, 13, "There should be 13 recs in the group by data view.");
				gbRecs = [], gbSumRecs = [], recs = [];
				for (var i = 0; i < gbDataView.length; i++) {
					if (gbDataView[i].__grRecordProperty) {
						gbRecs.push(gbDataView[i]);
					} else if(gbDataView[i].__grRecordSummariesProperty){
						gbSumRecs.push(gbDataView[i]);
					} else {
						recs.push(gbDataView[i]);
					}
				}
				assert.equal(recs.length, 4, "There should be 4 data records in the group by data view.");
				assert.equal(gbSumRecs.length, 4, "There should be 1 summary record in the group by data view.");
				assert.equal(gbRecs.length, 5, "There should be 5 group records in the group by data view.");

			});
			QUnit.test("Test basic summary group row with defaultCollapseState:false with top position.", function (assert) {
				assert.expect(18);
				var expr = [
					{
						fieldName : "Promotion", dir:"asc", isGroupBy:true
					}
				], gbDataView, recsByType,
				dsDefCollapseStateFalse = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName", type: "string" },
							{ name: "ProductDescription", type: "string" },
							{ name: "Price", type: "number" }, 
							{ name: "Promotion", type: "bool" },
							{ name: "Date", type: "date" }]
					},
					sorting:{
						type: "local",
						expressions: expr,
						defaultFields: expr
					},
					groupby: {
						defaultCollapseState: false,
						summariesPosition: "top",
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["avg","sum"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				dsDefCollapseStateFalse.dataBind();

				gbDataView = dsDefCollapseStateFalse.groupByDataView();
				this.renderData(gbDataView);
				assert.equal(gbDataView.length, 9, "There should be 9 records in the groupBy data view.");

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.gbRecs.length, 2, "There should be 2 groupby records in the data view.");
				assert.equal(recsByType.gbRecs[0].val, false, "First group value should be: false.");
				assert.equal(recsByType.gbRecs[1].val, true, "Second group value should be: true.");

				assert.equal(recsByType.dataRecs.length, 5, "Data records should be 5.");

				assert.equal(recsByType.gbSumRecs.length, 2, "There should be 2 groupby summary records in the data view.");
				assert.equal(recsByType.gbSumRecs[0].groupValue, false, "First group value should be: false.");
				assert.equal(recsByType.gbSumRecs[1].groupValue, true, "Second group value should be: true.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Price"]),"[1,3]", "There should be two summaries for Price with values for avg:1, sum:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Promotion"]), "[3]", "There should be one summary for Promotion with values for count:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Price"]), "[1,2]", "There should be two summaries for Price with values for avg:1, sum:2.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Promotion"]), "[2]", "There should be one summary for Promotion with values for count:2.");
				
				//change grouped cols
				dsDefCollapseStateFalse.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}, {fieldName : "ProductName", isGroupBy:true}], "desc", false);
				gbDataView = dsDefCollapseStateFalse.groupByDataView();
				this.renderData(gbDataView);

				assert.equal(gbDataView.length, 19, "There should be 15 records in the groupBy data view.");

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 5, "Data records should be 5.");
				assert.equal(recsByType.gbRecs.length, 7, "There should be 5 group recs.");
				assert.equal(recsByType.gbSumRecs.length, 7, "There should be 5 summary recs.");

				//collapse first group
				dsDefCollapseStateFalse.toggleGroupByRecord(gbDataView[0].id, true);
				gbDataView = dsDefCollapseStateFalse.groupByDataView();
				this.renderData(gbDataView);
				assert.equal(gbDataView.length, 9, "Toggling the first group should remove its children and summary from the view.");

				dsDefCollapseStateFalse.toggleGroupByRecord(gbDataView[1].id, true);
				gbDataView = dsDefCollapseStateFalse.groupByDataView();
				this.renderData(gbDataView);
				assert.equal(gbDataView.length, 2, "Toggling the second group should remove its children and summary from the view.");
			});
			QUnit.test("Test basic summary group row with defaultCollapseState:true with top position.", function (assert) {
				assert.expect(24);
				var expr = [
					{
						fieldName : "Promotion", dir:"asc", isGroupBy:true
					}
				], gbDataView, recsByType,
				dsDefaultCollapseState = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName", type: "string" },
							{ name: "ProductDescription", type: "string" },
							{ name: "Price", type: "number" }, 
							{ name: "Promotion", type: "bool" },
							{ name: "Date", type: "date" }]
					},
					sorting:{
						type: "local",
						expressions: expr,
						defaultFields: expr
					},
					groupby: {
						defaultCollapseState: true,
						summariesPosition: "top",
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["avg","sum"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				dsDefaultCollapseState.dataBind();

				gbDataView = dsDefaultCollapseState.groupByDataView();
				this.renderData(gbDataView);
				assert.equal(gbDataView.length, 2, "There should be 2 records in the groupBy data view.");

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 0, "There should be no data records in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 0, "There should be no summary records in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 2, "There should be 2 group records in the group by data view.");

				//expand first group row
				dsDefaultCollapseState.toggleGroupByRecord(gbDataView[0].id, false);
				gbDataView = dsDefaultCollapseState.groupByDataView();
				this.renderData(gbDataView);
				assert.equal(gbDataView.length, 6, "There should be 6 records in the groupBy data view.");

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 3, "There should be 3 data records in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 1, "There should be 1 summary record in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 2, "There should be 2 group records in the group by data view.");

				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Price"]),"[1,3]", "There should be two summaries for Price with values for avg:1, sum:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Promotion"]), "[3]", "There should be one summary for Promotion with values for count:3.");

				//change grouped cols
				dsDefaultCollapseState.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}, {fieldName : "ProductName", isGroupBy:true}], "desc", false);
				gbDataView = dsDefaultCollapseState.groupByDataView();
				this.renderData(gbDataView);
				assert.equal(gbDataView.length, 6, "There should be 6 records in the groupBy data view.");

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 0, "There should be no data records in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 1, "There should be 1 summary record in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 5, "There should be 5 group records in the group by data view.");

				assert.equal(recsByType.gbRecs[0].id, recsByType.gbSumRecs[0].id, "Visible summary rec should belong to the expanded group row.");

				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Price"]),"[1,3]", "There should be two summaries for Price with values for avg:1, sum:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Promotion"]), "[3]", "There should be one summary for Promotion with values for count:3.");

				//expand last child group row in first group
				dsDefaultCollapseState.toggleGroupByRecord(gbDataView[4].id, false);
				gbDataView = dsDefaultCollapseState.groupByDataView();
				this.renderData(gbDataView);

				assert.equal(gbDataView.length, 8, "There should be 8 records in the groupBy data view.");

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 1, "There should be 1 data record in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 2, "There should be 2 summary record in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 5, "There should be 5 group records in the group by data view.");

				assert.equal(recsByType.gbRecs[3].id, recsByType.gbSumRecs[1].id, "Visible summary rec should belong to the expanded group row.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Price"]),"[1,1]", "There should be two summaries for Price with values for avg:1, sum:1.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Promotion"]), "[1]", "There should be one summary for Promotion with values for count:1.");

			});
			QUnit.test("Test summary group row is properly shown/hidden on toggle with top position.", function (assert) {
				assert.expect(25);
				var gbDataView, recsByType,
				dsSummaryGroupRow = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName", type: "string" },
							{ name: "ProductDescription", type: "string" },
							{ name: "Price", type: "number" }, 
							{ name: "Promotion", type: "bool" },
							{ name: "Date", type: "date" }]
					},
					sorting:{
						type: "local"
					},
					groupby: {
						defaultCollapseState: false,
						summariesPosition: "top",
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["avg","sum"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				dsSummaryGroupRow.dataBind();

				//apply sort expr
				dsSummaryGroupRow.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}], "asc", false);

				gbDataView = dsSummaryGroupRow.groupByDataView();
				this.renderData(gbDataView);

				recsByType = this.getRecsInViewByType(gbDataView);

				for (var i = 0; i < recsByType.gbSumRecs.length; i++) {
					assert.equal(recsByType.gbRecs[i].id, recsByType.gbSumRecs[i].id, "Visible summary rec should belong to the expanded group row.");
					assert.equal(recsByType.gbRecs[i].val, recsByType.gbSumRecs[i].groupValue, "Visible summary rec should belong to the expanded group row.");
					assert.equal(recsByType.gbRecs[i].level, recsByType.gbSumRecs[i].level - 1, "Summary level should be correct.");
				}

				//apply sort expr
				dsSummaryGroupRow.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}, {fieldName : "ProductName", isGroupBy:true}], "desc", false);

				gbDataView = dsSummaryGroupRow.groupByDataView();
				this.renderData(gbDataView);

				recsByType = this.getRecsInViewByType(gbDataView);

				for (var i = 0; i < recsByType.gbRecs.length; i++) {
					var id = recsByType.gbRecs[i].id;
					for (var j = 0; j < recsByType.gbSumRecs.length; j++) {
						if (recsByType.gbSumRecs[j].id === id)
						{
							assert.equal(recsByType.gbRecs[i].level, recsByType.gbSumRecs[j].level - 1, "Group level should be correct.");
							assert.equal(recsByType.gbRecs[i].val, recsByType.gbSumRecs[j].groupValue, "Group value should be correct.");
							break;
						}
					}
				}

				assert.equal(gbDataView.length, 19, "There should be 19 recs in the group by data view.");
				//collapse
				dsSummaryGroupRow.toggleGroupByRecord(gbDataView[8].id, true);
				gbDataView = dsSummaryGroupRow.groupByDataView();
				this.renderData(gbDataView);

				assert.equal(gbDataView.length, 17, "There should be 17 recs in the group by data view.");

				//since we have set position top, it is right after the group row
				assert.ok(gbDataView[1].id === gbDataView[0].id && gbDataView[1].val === gbDataView[0].groupValue, "Rec after the parent group should be the summary for that parent group.");

				//expand
				dsSummaryGroupRow.toggleGroupByRecord(gbDataView[8].id, false);
				gbDataView = dsSummaryGroupRow.groupByDataView();
				this.renderData(gbDataView);

				assert.equal(gbDataView.length, 19, "There should be 19 recs in the group by data view.");

				assert.ok(gbDataView[8].id === gbDataView[9].id && gbDataView[8].val === gbDataView[9].groupValue, "Rec after the expanded one should be its summary.");

			});
			QUnit.test("Test summary group row with all default summaries per column type with top position.", function (assert) {
				assert.expect(8);
				var gbDataView, recsByType,
				dsAllDefSummaries = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName", type: "string" },
							{ name: "ProductDescription", type: "string" },
							{ name: "Price", type: "number" }, 
							{ name: "Promotion", type: "bool" },
							{ name: "Date", type: "date" }]
					},
					sorting:{
						type: "local"
					},
					groupby: {
						defaultCollapseState: false,
						summariesPosition: "top",
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["count","min", "max", "sum", "avg"]
							},
							{
								field:"ProductName", 
								summaryFunctions: ["count"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							},
							{
								field:"Date", 
								summaryFunctions: ["count", "min", "max"]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				dsAllDefSummaries.dataBind();

				//apply sort expr
				dsAllDefSummaries.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}], "asc", false);

				gbDataView = dsAllDefSummaries.groupByDataView();
				this.renderData(gbDataView);

				recsByType = this.getRecsInViewByType(gbDataView);

				var summaries = recsByType.gbSumRecs[0].summaries;
				assert.equal(JSON.stringify(summaries["Date"]), "[3,0,4]", "Date summarries for Date field should be correct.");
				assert.equal(JSON.stringify(summaries["Price"]), "[3,1,1,3,1]", "Date summarries for Price field should be correct.");
				assert.equal(JSON.stringify(summaries["ProductName"]), "[3]", "Date summarries for ProductName field should be correct.");
				assert.equal(JSON.stringify(summaries["Promotion"]), "[3]", "Date summarries for Promotion field should be correct.");
				
				summaries = recsByType.gbSumRecs[1].summaries;
				assert.equal(JSON.stringify(summaries["Date"]), "[2,1,3]", "Date summarries for Date field should be correct.");
				assert.equal(JSON.stringify(summaries["Price"]), "[2,1,1,2,1]", "Date summarries for Price field should be correct.");
				assert.equal(JSON.stringify(summaries["ProductName"]), "[2]", "Date summarries for ProductName should be correct.");
				assert.equal(JSON.stringify(summaries["Promotion"]), "[2]", "Date summarries for Promotion should be correct.");
			});
			QUnit.test("Test summary group row when fields are not defined in the schema with top position.", function (assert) {
				assert.expect(8);
				var gbDataView, recsByType,
				ds = this.createDataSource({
					sorting:{
						type: "local"
					},
					groupby: {
						defaultCollapseState: false,
						summariesPosition: "top",
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["count","min", "max", "sum", "avg"]
							},
							{
								field:"ProductName", 
								summaryFunctions: ["count"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							},
							{
								field:"Date", 
								summaryFunctions: ["count", "min", "max"]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				ds.dataBind();

				//apply sort expr
				ds.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}], "asc", false);
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);
				
				recsByType = this.getRecsInViewByType(gbDataView);

				var summaries = recsByType.gbSumRecs[0].summaries;
				assert.equal(JSON.stringify(summaries["Date"]), "[3,0,4]", "Date summarries for Date field should be correct.");
				assert.equal(JSON.stringify(summaries["Price"]), "[3,1,1,3,1]", "Date summarries for Price field should be correct.");
				assert.equal(JSON.stringify(summaries["ProductName"]), "[3]", "Date summarries for ProductName field should be correct.");
				assert.equal(JSON.stringify(summaries["Promotion"]), "[3]", "Date summarries for Promotion field should be correct.");
				
				summaries = recsByType.gbSumRecs[1].summaries;
				assert.equal(JSON.stringify(summaries["Date"]), "[2,1,3]", "Date summarries for Date field should be correct.");
				assert.equal(JSON.stringify(summaries["Price"]), "[2,1,1,2,1]", "Date summarries for Price field should be correct.");
				assert.equal(JSON.stringify(summaries["ProductName"]), "[2]", "Date summarries for ProductName should be correct.");
				assert.equal(JSON.stringify(summaries["Promotion"]), "[2]", "Date summarries for Promotion should be correct.");
			});
			QUnit.test("Test summary group row when fields don't have a type defined with top position.", function (assert) {
				assert.expect(8);
				var gbDataView, recsByType,
				ds = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName" },
							{ name: "ProductDescription" },
							{ name: "Price" }, 
							{ name: "Promotion" },
							{ name: "Date" }]
					},
					sorting:{
						type: "local"
					},
					groupby: {
						defaultCollapseState: false,
						summariesPosition: "top",
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["count","min", "max", "sum", "avg"]
							},
							{
								field:"ProductName", 
								summaryFunctions: ["count"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							},
							{
								field:"Date", 
								summaryFunctions: ["count", "min", "max"]
							}
						]						
					},
					dataSource: this.generateData(5)
				});

				ds.dataBind();

				//apply sort expr
				ds.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}], "asc", false);

				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);

				recsByType = this.getRecsInViewByType(gbDataView);

				var summaries = recsByType.gbSumRecs[0].summaries;
				assert.equal(JSON.stringify(summaries["Date"]), "[3,0,4]", "Date summarries for Date field should be correct.");
				assert.equal(JSON.stringify(summaries["Price"]), "[3,1,1,3,1]", "Date summarries for Price field should be correct.");
				assert.equal(JSON.stringify(summaries["ProductName"]), "[3]", "Date summarries for ProductName field should be correct.");
				assert.equal(JSON.stringify(summaries["Promotion"]), "[3]", "Date summarries for Promotion field should be correct.");
				
				summaries = recsByType.gbSumRecs[1].summaries;
				assert.equal(JSON.stringify(summaries["Date"]), "[2,1,3]", "Date summarries for Date field should be correct.");
				assert.equal(JSON.stringify(summaries["Price"]), "[2,1,1,2,1]", "Date summarries for Price field should be correct.");
				assert.equal(JSON.stringify(summaries["ProductName"]), "[2]", "Date summarries for ProductName should be correct.");
				assert.equal(JSON.stringify(summaries["Promotion"]), "[2]", "Date summarries for Promotion should be correct.");
			})
			QUnit.test("Test basic summary group row - custom summary functions with top position.", function (assert) {
				assert.expect(1);
				var gbDataView, recsByType, trueCount = function (data) {
					var count = 0; 
					for (var i = 0; i < data.length; i++) {
						if (data[i]) { 
							count++;
						}
					}
					return count;
				},
				falseCount = function (data) {
					var count = 0; 
					for (var i = 0; i < data.length; i++) {
						if (!data[i]) { 
							count++;
						}
					}
					return count;
				},
				ds = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName" },
							{ name: "ProductDescription" },
							{ name: "Price" }, 
							{ name: "Promotion" },
							{ name: "Date" }]
					},
					sorting:{
						type: "local"
					},
					groupby: {
						defaultCollapseState: false,
						summariesPosition: "top",
						summaries: [
							{
								field:"Promotion", 
								summaryFunctions: ["count",  trueCount, falseCount]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				ds.dataBind();

				//apply sort expr
				ds.sort([{fieldName : "Price", dir:"asc", isGroupBy:true}], "asc", false);

				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);

				recsByType = this.getRecsInViewByType(gbDataView);
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Promotion"]),"[5,2,3]", "Th custom summaries should be correctly calculated.");
			});
			QUnit.test("Test basic summary group row - test setting custom options for groupRecordKey and groupSummaryRecordKey with position 'top'.", function (assert) {
				assert.expect(7);
				var gbDataView, recsByType,
					ds = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id" }, 
							{ name: "ProductName" },
							{ name: "ProductDescription" },
							{ name: "Price" }, 
							{ name: "Promotion" },
							{ name: "Date" }]
					},
					sorting:{
						type: "local"
					},
					groupby: {
						defaultCollapseState: false,
						groupRecordKey: "__grRecordProperty",
						groupSummaryRecordKey: "__grRecordSummariesProperty",
						summariesPosition: "top",
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["count","min", "max", "sum", "avg"]
							},
							{
								field:"ProductName", 
								summaryFunctions: ["count"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							},
							{
								field:"Date", 
								summaryFunctions: ["count", "min", "max"]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				ds.dataBind();

				//apply sort expr
				ds.sort([{fieldName : "ProductName", dir:"asc", isGroupBy:true}], "asc", false);

				gbDataView = ds.groupByDataView();

				var gbRecs = [], gbSumRecs = [], recs = [];
				for (var i = 0; i < gbDataView.length; i++) {
					if (gbDataView[i].__grRecordProperty) {
						gbRecs.push(gbDataView[i]);
					} else if(gbDataView[i].__grRecordSummariesProperty){
						gbSumRecs.push(gbDataView[i]);
					} else {
						recs.push(gbDataView[i]);
					}
				}
				assert.equal(recs.length, 5, "There should be 5 data records in the group by data view.");
				assert.equal(gbSumRecs.length, 5, "There should be 1 summary record in the group by data view.");
				assert.equal(gbRecs.length, 5, "There should be 5 group records in the group by data view.");

				//toggle first rec
				ds.toggleGroupByRecord(gbDataView[0].id, true);
				gbDataView = ds.groupByDataView();
				assert.equal(gbDataView.length, 13, "There should be 13 recs in the group by data view.");
				gbRecs = [], gbSumRecs = [], recs = [];
				for (var i = 0; i < gbDataView.length; i++) {
					if (gbDataView[i].__grRecordProperty) {
						gbRecs.push(gbDataView[i]);
					} else if(gbDataView[i].__grRecordSummariesProperty){
						gbSumRecs.push(gbDataView[i]);
					} else {
						recs.push(gbDataView[i]);
					}
				}
				assert.equal(recs.length, 4, "There should be 4 data records in the group by data view.");
				assert.equal(gbSumRecs.length, 4, "There should be 1 summary record in the group by data view.");
				assert.equal(gbRecs.length, 5, "There should be 5 group records in the group by data view.");

			});
			QUnit.test("Test basic summary group row with defaultCollapseState:true wiht both top and bottom position.", function (assert) {
				assert.expect(37);
				var expr = [
					{
						fieldName : "Promotion", dir:"asc", isGroupBy:true
					}
				], gbDataView, recsByType,
				ds = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName", type: "string" },
							{ name: "ProductDescription", type: "string" },
							{ name: "Price", type: "number" }, 
							{ name: "Promotion", type: "bool" },
							{ name: "Date", type: "date" }]
					},
					sorting:{
						type: "local",
						expressions: expr,
						defaultFields: expr
					},
					groupby: {
						defaultCollapseState: true,
						summariesPosition: "both",
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["avg","sum"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				ds.dataBind();

				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);
				assert.equal(gbDataView.length, 2, "There should be 2 records in the groupBy data view.");

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 0, "There should be no data records in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 0, "There should be no summary records in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 2, "There should be 2 group records in the group by data view.");

				//expand first group row
				ds.toggleGroupByRecord(gbDataView[0].id, false);
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);
				assert.equal(gbDataView.length, 7, "There should be 7 records in the groupBy data view."); //2 group recors + 2 summaries + 3 data recs

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 3, "There should be 3 data records in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 2, "There should be 2 summary record in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 2, "There should be 2 group records in the group by data view.");

				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Price"]),"[1,3]", "There should be two summaries for Price with values for avg:1, sum:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Price"]),"[1,3]", "There should be two summaries for Price with values for avg:1, sum:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Promotion"]), "[3]", "There should be one summary for Promotion with values for count:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Promotion"]), "[3]", "There should be one summary for Promotion with values for count:3.");

				//change grouped cols
				ds.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}, {fieldName : "ProductName", isGroupBy:true}], "desc", false);
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);
				assert.equal(gbDataView.length, 7, "There should be 7 records in the groupBy data view.");

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 0, "There should be no data records in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 2, "There should be 2 summary record in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 5, "There should be 5 group records in the group by data view.");

				assert.equal(recsByType.gbRecs[0].id, recsByType.gbSumRecs[0].id, "Visible summary rec should belong to the expanded group row.");

				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Price"]),"[1,3]", "There should be two summaries for Price with values for avg:1, sum:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Price"]),"[1,3]", "There should be two summaries for Price with values for avg:1, sum:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Promotion"]), "[3]", "There should be one summary for Promotion with values for count:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Promotion"]), "[3]", "There should be one summary for Promotion with values for count:3.");

				//expand last child group row in first group
				ds.toggleGroupByRecord(gbDataView[4].id, false);
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);

				assert.equal(gbDataView.length, 10, "There should be 10 records in the groupBy data view.");

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 1, "There should be 1 data record in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 4, "There should be 2 summary record in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 5, "There should be 5 group records in the group by data view.");

				assert.equal(recsByType.gbRecs[0].id, recsByType.gbSumRecs[0].id, "Visible summary rec should belong to the expanded group row.");
				assert.equal(recsByType.gbRecs[3].id, recsByType.gbSumRecs[1].id, "Visible summary rec should belong to the expanded group row.");
				assert.equal(recsByType.gbRecs[3].id, recsByType.gbSumRecs[2].id, "Visible summary rec should belong to the expanded group row.");
				assert.equal(recsByType.gbRecs[0].id, recsByType.gbSumRecs[3].id, "Visible summary rec should belong to the expanded group row.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Price"]),"[1,3]", "There should be two summaries for Price with values for avg:1, sum:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Price"]),"[1,1]", "There should be two summaries for Price with values for avg:1, sum:1.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[2].summaries["Price"]),"[1,1]", "There should be two summaries for Price with values for avg:1, sum:1.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[3].summaries["Price"]),"[1,3]", "There should be two summaries for Price with values for avg:1, sum:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Promotion"]), "[3]", "There should be one summary for Promotion with values for count:3.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Promotion"]), "[1]", "There should be one summary for Promotion with values for count:1.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[2].summaries["Promotion"]), "[1]", "There should be one summary for Promotion with values for count:1.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[3].summaries["Promotion"]), "[3]", "There should be one summary for Promotion with values for count:3.");

			});
			QUnit.test("Test summary group row is properly shown/hidden on toggle with both top and bottom position.", function (assert) {
				assert.expect(19);
				var gbDataView, recsByType,
				ds = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName", type: "string" },
							{ name: "ProductDescription", type: "string" },
							{ name: "Price", type: "number" }, 
							{ name: "Promotion", type: "bool" },
							{ name: "Date", type: "date" }]
					},
					sorting:{
						type: "local"
					},
					groupby: {
						defaultCollapseState: false,
						summariesPosition: "both",
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["avg","sum"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							}
						]
					},
					dataSource: this.generateData(5)
				});

				ds.dataBind();

				//apply sort expr
				ds.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}], "asc", false);

				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);
				recsByType = this.getRecsInViewByType(gbDataView);

				// <!-- equal(recsByType.gbRecs[0].id, recsByType.gbSumRecs[0].id, "Visible summary rec should belong to the expanded group row."); -->
				// <!-- equal(recsByType.gbRecs[0].val, recsByType.gbSumRecs[0].groupValue, "Visible summary rec should belong to the expanded group row."); -->
				// <!-- equal(recsByType.gbRecs[0].level, recsByType.gbSumRecs[0].level - 1, "Summary level should be correct."); -->
				// <!-- equal(recsByType.gbRecs[0].id, recsByType.gbSumRecs[1].id, "Visible summary rec should belong to the expanded group row."); -->
				// <!-- equal(recsByType.gbRecs[0].val, recsByType.gbSumRecs[1].groupValue, "Visible summary rec should belong to the expanded group row."); -->
				// <!-- equal(recsByType.gbRecs[0].level, recsByType.gbSumRecs[1].level - 1, "Summary level should be correct."); -->
				// <!-- equal(recsByType.gbRecs[1].id, recsByType.gbSumRecs[2].id, "Visible summary rec should belong to the expanded group row."); -->
				// <!-- equal(recsByType.gbRecs[1].val, recsByType.gbSumRecs[2].groupValue, "Visible summary rec should belong to the expanded group row."); -->
				// <!-- equal(recsByType.gbRecs[1].level, recsByType.gbSumRecs[2].level - 1, "Summary level should be correct."); -->
				// <!-- equal(recsByType.gbRecs[1].id, recsByType.gbSumRecs[3].id, "Visible summary rec should belong to the expanded group row."); -->
				// <!-- equal(recsByType.gbRecs[1].val, recsByType.gbSumRecs[3].groupValue, "Visible summary rec should belong to the expanded group row."); -->
				// <!-- equal(recsByType.gbRecs[1].level, recsByType.gbSumRecs[3].level - 1, "Summary level should be correct."); -->

				//apply sort expr
				ds.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}, {fieldName : "ProductName", isGroupBy:true}], "desc", false);

				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);

				recsByType = this.getRecsInViewByType(gbDataView);

				for (var i = 0; i < recsByType.gbRecs.length; i++) {
					var id = recsByType.gbRecs[i].id;
					for (var j = 0; j < recsByType.gbSumRecs.length; j++) {
						if (recsByType.gbSumRecs[j].id === id)
						{
							assert.equal(recsByType.gbRecs[i].level, recsByType.gbSumRecs[j].level - 1, "Group level should be correct.");
							assert.equal(recsByType.gbRecs[i].val, recsByType.gbSumRecs[j].groupValue, "Group value should be correct.");
							break;
						}
					}
				}

				assert.equal(gbDataView.length, 26, "There should be 26 recs in the group by data view.");
				//collapse
				ds.toggleGroupByRecord(gbDataView[10].id, true);
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);

				assert.equal(gbDataView.length, 23, "There should be 23 recs in the group by data view.");

				//since we have set position top, it is right after the group row
				assert.ok(gbDataView[1].id === gbDataView[0].id && gbDataView[1].val === gbDataView[0].groupValue, "Rec after the parent group should be the summary for that parent group.");

				//expand
				ds.toggleGroupByRecord(gbDataView[10].id, false);
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);

				assert.equal(gbDataView.length, 26, "There should be 26 recs in the group by data view.");
                assert.ok(gbDataView[10].id === gbDataView[11].id && gbDataView[10].val === gbDataView[11].groupValue, "Rec after the expanded one should be its summary.");

			});
			////Integration Group Summary tests

			QUnit.test("Test group summary rows + Paging", function (assert) {
				assert.expect(23);
				var gbDataView, recsByType, expr = [{fieldName : "Promotion", dir:"asc", isGroupBy:true},{fieldName : "ProductName", dir:"asc", isGroupBy:true}],
					ds = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName", type: "string" },
							{ name: "ProductDescription", type: "string" },
							{ name: "Price", type: "number" }, 
							{ name: "Promotion", type: "bool" },
							{ name: "Date", type: "date" }]
					},
					sorting:{
						type: "local",
						expressions: expr,
						defaultFields: expr
					},
					paging: {
						enabled: true,
						type: "local",
						pageSize: 5
					},
					groupby: {
						defaultCollapseState: false,
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["count","min", "max", "sum", "avg"]
							},
							{
								field:"ProductName", 
								summaryFunctions: ["count"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							},
							{
								field:"Date", 
								summaryFunctions: ["count", "min", "max"]
							}
						]
					},
					dataSource: this.generateData(20)
				});

				ds.dataBind();

				gbDataView = ds.groupByDataView();

				this.renderData(gbDataView);

				assert.equal(gbDataView.length, 5, "There should be 5 records in the groupBy data view (equal to the current page size)");
				assert.equal(ds.dataView().length, 1, "There should be 1 records in the data view (equal to the number of actual data records on the page.)");
				
				
				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 1, "There should be 1 data record in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 3, "There should be 3 group record in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 1, "There should be 1 summary record in the group by data view.");

				//test if collapsing rows updates the views correctly
				ds.toggleGroupByRecord(gbDataView[0].id, true);
				gbDataView = ds.groupByDataView();
				ds.toggleGroupByRecord(gbDataView[2].id, true);
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);

				assert.equal(gbDataView.length, 5, "There should be 5 records in the groupBy data view (equal to the current page size)");
				assert.equal(ds.dataView().length, 1, "There should be 1 records in the data view (equal to the number of actual data records on the page.)");

				recsByType = this.getRecsInViewByType(gbDataView);
				
				assert.equal(recsByType.dataRecs.length, 1, "There should be 1 data record in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 4, "There should be 3 group record in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 0, "There should be 1 summary record in the group by data view.");

				var groupID = recsByType.gbRecs[3].id;
				//test if changing the page index updates the views correctly
				ds.pageIndex(1);
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);

				assert.equal(ds.dataView().length, 1, "There should be 1 records in the data view (equal to the number of actual data records on the page.)");

				recsByType = this.getRecsInViewByType(gbDataView);
				assert.equal(recsByType.dataRecs.length, 1, "There should be 1 data record in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 2, "There should be 2 group record in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 2, "There should be 2 summary record in the group by data view.");

				assert.equal(recsByType.gbSumRecs[0].id, groupID, "Summary row from current page should belong to group row from previous page.");

				//verify that when pageSize is changed the view is updated correctly
				ds.pageSize(10);
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 4, "There should be 4 data record in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 3, "There should be 3 group record in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 3, "There should be 3 summary record in the group by data view.");

				assert.equal(ds.dataView().length, recsByType.dataRecs.length, "There should be dataview should have count equal to the number of actual data records on the page.)");

				//change grouped cols
				ds.sort([{fieldName : "Promotion", dir:"asc", isGroupBy:true}], "asc", false);
				ds.pageIndex(0);
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);
				recsByType = this.getRecsInViewByType(gbDataView);
				assert.equal(recsByType.dataRecs.length, 8, "There should be 8 data record in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 2, "There should be 2 group record in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 0, "There should be 0 summary records in the group by data view.");

				assert.equal(ds.dataView().length, recsByType.dataRecs.length, "There should be dataview should have count equal to the number of actual data records on the page.)");
			});
			QUnit.test("Test group summary rows + Sorting", function (assert) {
				assert.expect(14);
				var gbDataView, recsByType, expr = [{fieldName : "Promotion", dir:"asc", isGroupBy:true}],
					ds = this.createDataSource({ 
					schema: { 
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName", type: "string" },
							{ name: "ProductDescription", type: "string" },
							{ name: "Price", type: "number" }, 
							{ name: "Promotion", type: "bool" },
							{ name: "Date", type: "date" }]
					},
					sorting:{
						type: "local",
						expressions: expr,
						defaultFields: expr
					},
					groupby: {
						defaultCollapseState: false,
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["count","min", "max", "sum", "avg"]
							},
							{
								field:"ProductName", 
								summaryFunctions: ["count"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							},
							{
								field:"Date", 
								summaryFunctions: ["count", "min", "max"]
							}
						]
					},
					dataSource: this.generateData(5)
				});
				ds.dataBind();

				expr.push({fieldName : "Id", dir:"desc"});
				ds.sort(expr);
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);

				recsByType = this.getRecsInViewByType(gbDataView);
				//verify data in data-islands are sorted in descending order on Id field
				for (var i = 0; i < recsByType.gbRecs.length; i++) {
					var gbRec = recsByType.gbRecs[i];
					var prevVal = null;
					for (var j = 0; j < gbRec.recs.length; j++) {
						if (prevVal === null) {
							prevVal = gbRec.recs[j].Id;
						}
						assert.ok(gbRec.recs[j].Id <= prevVal, "Values should be sorted in descending order.");
					}
				}
				//verify summary rows don't change positions
				assert.ok(gbDataView[4].__gbSummaryRecord, "4th record should remain a summary rec.");
				assert.ok(gbDataView[8].__gbSummaryRecord, "8th record should remain a summary rec.");

				expr[1] = {fieldName : "Id", dir:"asc"};
				ds.sort(expr);
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);

				recsByType = this.getRecsInViewByType(gbDataView);
				//verify data in data-islands are sorted in descending order on Id field
				for (var i = 0; i < recsByType.gbRecs.length; i++) {
					var gbRec = recsByType.gbRecs[i];
					var prevVal = null;
					for (var j = 0; j < gbRec.recs.length; j++) {
						if (prevVal === null) {
							prevVal = gbRec.recs[j].Id;
						}
						assert.ok(gbRec.recs[j].Id >= prevVal, "Values should be sorted in ascending order.");
					}
				}
				//verify summary rows don't change positions
				assert.ok(gbDataView[4].__gbSummaryRecord, "4th record should remain a summary rec.");
				assert.ok(gbDataView[8].__gbSummaryRecord, "8th record should remain a summary rec.");
			});
			QUnit.test("Test group summary rows + Updating", function (assert) {
				assert.expect(7);
				var gbDataView, recsByType, expr = [{fieldName : "Promotion", dir:"asc", isGroupBy:true}],
					ds = this.createDataSource({
					schema: {
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName", type: "string" },
							{ name: "ProductDescription", type: "string" },
							{ name: "Price", type: "number" }, 
							{ name: "Promotion", type: "bool" },
							{ name: "Date", type: "date" }]
					},
					autoCommit: true,
					sorting:{
						type: "local",
						expressions: expr,
						defaultFields: expr
					},
					groupby: {
						defaultCollapseState: false,
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["count","min", "max", "sum", "avg"]
							},
							{
								field:"ProductName", 
								summaryFunctions: ["count"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							},
							{
								field:"Date", 
								summaryFunctions: ["count", "min", "max"]
							}
						]
					},
					dataSource: this.generateData(5)
				});
				ds.dataBind();
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);
				//setCellValue, updateRow
				ds.setCellValue(0, "Price", 100, true);
				ds.updateRow(1, {
					Price: 200,
					Date: new Date(200)
				}, true);

				ds.dataBind();
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);

				//verify summaries are updated
				recsByType = this.getRecsInViewByType(gbDataView);
				assert.equal(JSON.stringify(recsByType.gbSumRecs[0].summaries["Price"]), "[3,1,100,102,34]", "Summaries should be properly updated.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Price"]), "[2,1,200,201,100.5]", "Summaries should be properly updated.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Date"]), "[2,3,200]", "Summaries should be properly updated.");

				//addRow
				 ds.addRow(100, {
						Id: 100,
						ProductName: "product name 100",
						ProductDescription: "description 1",
						Price: 102,
						Promotion: true,
						Date: new Date(100)
					}, true);

				ds.dataBind();
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);

				recsByType = this.getRecsInViewByType(gbDataView);
				//verify summaries are updated
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Price"]), "[3,1,200,303,101]", "Summaries should be properly updated.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Date"]), "[3,3,200]", "Summaries should be properly updated.");

				//deleteRow
				ds.deleteRow(1, true);

				ds.dataBind();
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);

				recsByType = this.getRecsInViewByType(gbDataView);
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Price"]), "[2,1,102,103,51.5]", "Summaries should be properly updated.");
				assert.equal(JSON.stringify(recsByType.gbSumRecs[1].summaries["Date"]), "[2,3,100]", "Summaries should be properly updated.");
			});
			QUnit.test("Test group summary rows + Filtering", function (assert) {
				assert.expect(5);
				var gbDataView, recsByType, expr = [{fieldName : "Promotion", dir:"asc", isGroupBy:true}],
					ds = this.createDataSource({
					schema: {
						fields: [
							{ name: "Id", type: "number" }, 
							{ name: "ProductName", type: "string" },
							{ name: "ProductDescription", type: "string" },
							{ name: "Price", type: "number" }, 
							{ name: "Promotion", type: "bool" },
							{ name: "Date", type: "date" }]
					},
					autoCommit: true,
					sorting:{
						type: "local",
						expressions: expr,
						defaultFields: expr
					},
					groupby: {
						defaultCollapseState: false,
						summaries: [
							{
								field:"Price", 
								summaryFunctions: ["count","min", "max", "sum", "avg"]
							},
							{
								field:"ProductName", 
								summaryFunctions: ["count"]
							},
							{
								field:"Promotion", 
								summaryFunctions: ["count"]
							},
							{
								field:"Date", 
								summaryFunctions: ["count", "min", "max"]
							}
						]
					},
					dataSource: this.generateData(5)
				});
				ds.dataBind();
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);

				assert.equal(gbDataView.length, 9, "There should be 9 recs in the group by data view.");
				
				ds.filter([{fieldName : "Id", expr: 2, cond: "greaterThan"}], "AND", true);
				gbDataView = ds.groupByDataView();
				this.renderData(gbDataView);

				assert.equal(gbDataView.length, 6, "There should be 6 recs in the group by data view.");

				recsByType = this.getRecsInViewByType(gbDataView);

				assert.equal(recsByType.dataRecs.length, 2, "There should be 2 data records in the group by data view.");
				assert.equal(recsByType.gbRecs.length, 2, "There should be 2 group record in the group by data view.");
				assert.equal(recsByType.gbSumRecs.length, 2, "There should be 2 summary record in the group by data view.");
			});

			/* Test GroupBy with type: "local"*/

			/* Test GroupBy with type: "remote"*/

			QUnit.module("igDataSource Remote GroupBy", {
				util: $.ig.TestUtil,
				generateData: function(count, key, dir){
					var i, count = count || 4, data = [];
					for (i = 0; i < count; i++) {
						data.push({
							Id: i,
							ProductName: "product name " + i,
							ProductDescription: "description " + (i % 2),
							Price: 1,
							Promotion: !!(i % 2),
							Date: new Date(i),
							Category: {
								Id: i % 3,
								Name: "Category " + (i % 3)
							}
						});
					}
					// sort data if argument "key" is set
					if (key) {
						sortF = function (key, dir) {
							return function (obj1, obj2) {
								var v1 = obj1[key],
									v2 = obj2[key],
									rev = dir === "asc" ? 1 : -1;
								if (v1 < v2) {
									return -1 * rev;
								}
								if (v1 > v2) {
									return 1 * rev;
								}
								return 0;
							};
						};
						data = data.sort(sortF(key, dir));
					}
					return data;	
				},
				createDataSource: function(dsOpts){
					dsOpts = dsOpts || { 
						schema: { 
							fields: [
								{ name: "Id", type: "number" }, 
								{ name: "ProductName", type: "string" },
								{ name: "ProductDescription" },
								{ name: "Price" }, 
								{ name: "Promotion", type: "bool" },
								{ name: "Date", type: "datetime" }]
						},
						filtering: { type: "local" }, 
						sorting: { type: "local" }, 
						dataSource: this.generateData(4)
					};
					return new $.ig.DataSource(dsOpts);
				},
				renderData: function(data){
					var $tbody = $("#t1>tbody"), i, j, html = '', r;
					$tbody.empty();
					for (i = 0; i < data.length; i++) {
						r = data[i];
						if (r.__gbRecord) {
							html += "<tr><td colspan='6'>GroupBy record with val: " + r.val + "</td></tr>"
						} else if (r.__gbSummaryRecord) {
							var summaries = r.summaries;
							html += "<tr>" +
								"<td>" + (summaries["Id"] || "" )+ "</td>" +
								"<td>" + (summaries["ProductName"] || "") + "</td>" +
								"<td>" + (summaries["ProductDescription"] || "") + "</td>" +
								"<td>" + (summaries["Price"] || "") + "</td>" +
								"<td>" + (summaries["Promotion"] || "") + "</td>" +
								"<td>" + (summaries["Date"] || "") + "</td>" +
							"</tr>";
						} else {
							html += "<tr>" +
								"<td>" + r.Id + "</td>" +
								"<td>" + r.ProductName + "</td>" +
								"<td>" + r.ProductDescription + "</td>" +
								"<td>" + r.Price + "</td>" +
								"<td>" + r.Promotion + "</td>" +
								"<td>" + (r.Date || "") + "</td>" +
							"</tr>";
						}
					}
					$tbody.html(html)
				},
				beforeEach: function (assert) {
					var done = assert.async();
					__init = false;
					var exprs = [
						{
							fieldName: "Id",
							isGroupBy: true,
							dir: "desc"
						}
					],
					dsOpts = {
						schema: {
							fields: [
								{ name: "Id", type: "number" },
								{ name: "ProductName", type: "string" },
								{ name: "ProductDescription" },
								{ name: "Price" },
								{ name: "Promotion", type: "bool" }],
							searchField: "records"
						},
						filtering: {
							enabled: true,
							type: "local"
						},
						paging: {
							enabled: true,
							type: "local",
							pageSize: 5
						},
						sorting: {
							enabled: true,
							type: "remote",
							expressions: exprs,
							defaultFields: exprs
						},
						dataSource: "http://randomgroupbyurl.com$callback=?",
						responseDataKey: "records",
						callback: function () {
							if (!__init) {
								done();
								__init = true;
							}
						}
					};
					remoteDs = this.createDataSource(dsOpts);
					remoteDs.dataBind();
					
				},
				afterEach: function () {
					remoteDs = null;
				}
			});
			QUnit.test("Basic tests", function (assert) {
				assert.expect(6);
				var se, dv = remoteDs.dataView(),
					gdv = remoteDs.groupByDataView(),
					data = remoteDs.data(),
					self = this;
				assert.ok(gdv.length === 5 && data.length === 10, "Test count of records of dataview and data");
				assert.ok(gdv[0].__gbRecord === true && gdv[0].len === 1 &&
					gdv[1].Id === 9 && gdv[4].__gbRecord === true,
					"Test dataview records");
				assert.ok(data[0].Id === 9 && data[9].Id === 0,
					"Test data records");
				this.renderData(dv);

				// change sorting direction
				se = [{
					fieldName: "Id",
					isGroupBy: true,
					dir: "asc"
				}];
				// set sorting expressions
				remoteDs.settings.sorting.defaultFields = se;
				remoteDs.settings.sorting.expressions = se;
				remoteDs.dataBind();
				var done = assert.async();
				this.util.wait(1000).then(function(){
					dv = remoteDs.dataView();
					gdv = remoteDs.groupByDataView();
					data = remoteDs.data();
					assert.ok(gdv.length === 5 && data.length === 10, "Test count of records of dataview and data");
					assert.ok(gdv[0].__gbRecord === true && gdv[0].len === 1 &&
						gdv[1].Id === 0 && gdv[4].__gbRecord === true,
						"Test dataview records");
					assert.ok(data[0].Id === 0 && data[9].Id === 9,
						"Test data records");
					self.renderData(dv);
					done();

				});
			});
				QUnit.test("GroupBy + Local Filtering + Paging", function (assert) {
				assert.expect(6);
				var gdv, dv, data,
					fe = [{
					  fieldName: "Id",
					  cond: "greaterThan",
					  expr: 0
					}],
					self = this;
				remoteDs.settings.filtering.defaultFields = [{
					fieldName: "Id",
					cond: "greaterThan",
					expr: 0
				}];
				remoteDs.dataBind();
				var done = assert.async();
				this.util.wait(1000).then(function () {
					dv = remoteDs.dataView();
					gdv = remoteDs.groupByDataView();
					data = remoteDs.data();
					assert.ok(gdv.length === 5 && data.length === 10, "Test count of records of dataview and data");
					assert.ok(gdv[0].__gbRecord === true && gdv[0].len === 1 &&
						gdv[1].Id === 9 && gdv[4].__gbRecord === true,
						"Test dataview records");
					assert.ok(data[0].Id === 9 && data[9].Id === 0,
						"Test data records");
					self.renderData(gdv);
					assert.equal(remoteDs.pageCount(), 4, "Test page count");
					remoteDs.pageIndex(3);
					gdv = remoteDs.groupByDataView();
					data = remoteDs.data();
					assert.equal(gdv.length, 3, "Test count of records of dataview and data");
					assert.ok(gdv[0].Id === 2 &&
						gdv[1].__gbRecord === true && gdv[1].val === 1 &&
						gdv[2].Id === 1,
						"Test dataview records");
					self.renderData(dv);
					done();
				});
			});
		   //Test GroupBy with type: "remote"
		   
			//test for bug 224258
			QUnit.test("Test if groupBy DataView is populated after remote request", function (assert) {
				assert.expect(2);
				var done = assert.async(),
				    callBackCalled = false,
					groupByData = null,
					exprs = [
						{
							fieldName: "Id",
							isGroupBy: true,
							dir: "desc"
						}
				    ];
				var ds = new $.ig.DataSource({
					schema: {
						fields: [
							{ name: "Id", type: "number" },
							{ name: "ProductName", type: "string" },
							{ name: "ProductDescription" },
							{ name: "Price" },
							{ name: "Promotion", type: "bool" }],
						searchField: "records"
					},
					filtering: {
						enabled: true,
						type: "local"
					},
					paging: {
						enabled: true,
						type: "local",
						pageSize: 5
					},
					sorting: {
						enabled: true,
						type: "remote",
						expressions: exprs,
						defaultFields: exprs
					},
					dataSource:  this.generateData(10),
					dataSourceUrl: "http://randomgroupbyurl.com$callback=?",
					responseDataKey: "records",
					callback: function () {
						callBackCalled = true;
						groupByData = remoteDs.groupByDataView();
					}
				});

				ds.dataBind();

				this.util.wait(500).then(function(){
					done();
					assert.ok(callBackCalled, "Callback should be called.");
					assert.ok(groupByData.length > 0, "Verify that groupby data is populated.");
				});
			});

			//test for bug 248224
			QUnit.test("Test grouping by dates and sorting when some of the dates are null.", function(assert) {
				assert.expect(1);
				var fields = [
					{
						name : "Column1"
					},
					{
						name : "Column2"
					},
					{
						name : "Column3",
						type: "date"
					}
				];
				var recs = [
					{
					Column1  : "Test Data 1",
					Column2 : "Hidden 1",
					Column3 : "12/27/2017"		
					},
					{
					Column1  : "Test Data 2",
					Column2 : "Hidden 2",
					Column3 : "12/28/2017"		
					},
					{
					Column1  : "Test Data 2",
					Column2 : "Hidden 12",
					Column3 : "1/27/2017"
					},
					{
					Column1  : "Test Data 3",
					Column2 : "Hidden 21",
					Column3 : "12/27/2018"
					},
					{
					Column1  : "Test Data 3",
					Column2 : "Hidden 21"
					}
				];

				var ds = new $.ig.DataSource({
					schema: {
						fields: fields
					},
					sorting: {
						expressions:[]
					},
					dataSource: recs
				});
				ds.dataBind();
				var errorCount = 0;
				try {
					ds.settings.sorting.expressions.push({"fieldName": "Column3", "dir": "desc", "isGroupBy": true});
					ds.dataBind();
				} catch(e) {
					errorCount++;
					assert.ok(false, "Error was thrown. Message: " + e.message);
				}
				assert.equal(errorCount, 0, "No errors should be thrown.");
			});