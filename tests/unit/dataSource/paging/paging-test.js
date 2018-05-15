QUnit.module("igDataSource Paging", {
				tableDs: null,
				jsonDs: null,
				treeDs: null,
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
					this.dataObject,
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
				util: $.ig.TestUtil,
				tmplHtml: '<script id="template1" type="text/x-jquery-tmpl">${firstName} <strong> ${lastName} </strong> <br/></script>',
				tableTemplate: '<script id="tableTemplate" type="text/x-jquery-tmpl"><tr> <td> ${col1} </td> <td> ${col2} </td> <td> ${col3} </td>  <td> ${col4} </td> </tr></script>',
				tableDsSource:'<table id="t1"><tbody><tr> <td>1</td> <td>100</td> <td>Laptop</td>  <td>$ 1000 </td> </tr><tr> <td>2</td> <td>15</td> <td>Hamburger</td>  <td>$ 33 </td> </tr><tr> <td>3</td> <td>2000</td> <td>mobile phone</td>  <td>$ 5454 </td> </tr><tr> <td>4</td> <td>45</td> <td>Beer</td>  <td>$ 2323232 </td> </tr><tr> <td>5</td> <td>78</td> <td>trainers</td>  <td>$ 545454 </td> </tr><tr> <td>6</td> <td>32</td> <td>coffee cup</td>  <td>$ 22 </td> </tr><tr> <td>7</td> <td>987</td> <td>BMW 323 CI</td>  <td>$ 1000000 </td> </tr><tr> <td>8</td> <td>434343</td> <td>mouse</td>  <td>$ 545454 </td> </tr><tr> <td>9</td> <td>2356</td> <td>keyboard</td>  <td>$ 34 </td> </tr><tr> <td>10</td> <td>33</td> <td>fish</td>  <td>$ 22 </td> </tr><tr> <td>1</td> <td>100</td> <td>Laptop</td>  <td>$ 1000 </td> </tr></tbody></table>',
				loadTestbeds: function(){
					var tableDataSourceElement = $(this.tableDsSource).appendTo($('#qunit-fixture'));
					// create the data sources
					this.tableDs = new $.ig.HtmlTableDataSource({ schema: { fields:[ {name : "col1"}, {name : "col2", type: "number"}, {name : "col3"}, {name : "col4"} ]}, 
						paging: {enabled:true, type: "local", pageSize: 3}, dataSource: $("#t1")[0] 
					}).dataBind();

					// here we are specifying a default sort direction, which will be applied immediately after the source is bound 
					this.jsonDs = new $.ig.ArrayDataSource( {sorting: { type: "local", defaultDirection: "asc" }, dataSource: this.arrayOfDataObjects }).dataBind();

					// use jQuery templating to render the processed/transformed data source 
					var template =  $(this.tmplHtml).appendTo($('#qunit-fixture'));
					template.tmpl(this.jsonDs.dataView()).appendTo($('#qunit-fixture'));;

					this.treeDs = new $.ig.TreeHierarchicalDataSource({
						dataSource: this.treeFlatData,
						primaryKey: "employeeId",
						paging: {enabled:true, type: "local", pageSize: 3},
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
				before: function(assert) {
					this.loadTestbeds();
				},
				after: function() {
				}
			});
			QUnit.test("Paging test 1 - apply page size and check number of records for dataView and total data records", function(assert) {
				assert.expect(4);
				
				assert.equal(3, this.tableDs.dataView().length, 3);
				assert.equal(11, this.tableDs.data().length, 11);
				// number of pages
				assert.equal(4, this.tableDs.pageCount(), 4);
				assert.equal(0, this.tableDs.pageIndex(), 0);
				
			});
			QUnit.test("Paging test 2 - change page size and rebind", function(assert) {
				assert.expect(6);
				this.tableDs.pageSize(4);
				assert.equal(4, this.tableDs.dataView().length, 4);
				assert.equal(11, this.tableDs.data().length, 11);
				assert.equal(3, this.tableDs.pageCount(), 3);
				assert.equal(0, this.tableDs.pageIndex(), 0);
				
				// get the last paga data (page idex is zero based) 
				var lastPageData = this.tableDs.recordsForPage(2);
				assert.equal(3, lastPageData.length, 3);
				assert.equal("keyboard", lastPageData[0].col3, "keyboard");
			});
			QUnit.test("Paging test 3 - go to previous page programatically", function(assert) {
				assert.expect(4);
				this.tableDs.pageSize(4);
				this.tableDs.prevPage();
				assert.equal(0, this.tableDs.pageIndex(), 0);
				this.tableDs.pageIndex(1);
				assert.equal(1, this.tableDs.pageIndex(), 1);
				this.tableDs.prevPage();
				assert.equal(0, this.tableDs.pageIndex(), 0);
				assert.equal(4, this.tableDs.dataView().length, 4);
				
			});
			QUnit.test("Paging test 4 - go to the next page programatically", function(assert) {
				assert.expect(3);
				this.tableDs.pageSize(4);
				this.tableDs.nextPage();
				assert.equal(1, this.tableDs.pageIndex(), 1);
				assert.equal(4, this.tableDs.dataView().length, 4);
				
				// check the first rec
				assert.equal("trainers", this.tableDs.dataView()[0].col3, "trainers");
			});
			// Test bug 228594: After updating a record in the igTreeGrid paging no longer works as expected.
			QUnit.test("Test totalRecordsCount in tree hierarchical data source ", function (assert) {
				assert.expect(1);
				assert.ok(this.treeDs.pageCount() === 2 && this.treeDs.totalLocalRecordsCount() === 4, "Test totalRecordsCount");
			});