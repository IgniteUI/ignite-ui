QUnit.module("igDataSource filtering", {
					tmplHtml: "<script id='template1' type='text/x-jquery-tmpl'>${firstName} <strong> ${lastName} </strong> <br/></script>",
					tableTemplateHtml: "<script id='tableTemplate' type='text/x-jquery-tmpl'><tr> <td> ${col1} </td> <td> ${col2} </td> <td> ${col3} </td>  <td> ${col4} </td> <td> ${col5} </td>  <td> ${col6} </td> </tr></script>",
                    tableDsSource: "<table id='t1' cellpadding=5 cellspacing=0><tbody><tr> <td>1</td> <td>100</td> <td>Laptop</td>  <td>$ 1000 </td>  <td> 7/23/2010 </td>  <td>0</td> </tr><tr> <td>2</td> <td>15</td> <td>Hamburger</td>  <td>$ 33 </td> <td> 10/29/2010 </td>  <td>0</td> </tr><tr> <td>1</td> <td>100</td> <td>Laptop</td>  <td>$ 1000 </td><td> 7/23/2010 </td> <td>1</td>  </tr><tr> <td>3</td> <td>2000</td> <td>mobile phone</td>  <td>$ 5454 </td> <td> 10/28/2010 </td> <td>1</td>  </tr><td>4</td> <td>45</td> <td>Beer</td>  <td>$ 2323232 </td> <td> 11/10/2010 </td> <td>1</td> </tr><td>5</td> <td>78</td> <td>trainers</td>  <td>$ 545454 </td> <td> 7/23/2009 </td> <td>0</td> </tr><tr> <td>6</td> <td>32</td> <td>coffee cup</td>  <td>$ 22 </td> <td> 9/20/2010 </td> <td>1</td> </tr><td>7</td> <td>987</td> <td>BMW 323 CI</td>  <td>$ 1000000 </td> <td> 7/23/2011 </td> <td>0</td> </tr><tr> <td>8</td> <td>434343</td> <td>mouse</td>  <td>$ 545454 </td> <td> 11/1/2010 </td> <td>0</td> </tr><tr> <td>9</td> <td>2356</td> <td>keyboard</td>  <td>$ 34 </td> <td> 5/20/2010 </td> <td>1</td> </tr><tr> <td>10</td> <td>33</td> <td>fish</td>  <td>$ 22 </td><td> 8/10/2010 </td>  <td>1</td> </tr></tbody></table>",					
                    tableDs : null,
                    jsonDs : null,
                    mapperDs : null,
                    treeDs: null,
                    cond: null,
                    date: null,
                    before1: null,
                    before2: null,
                    before3: null,
                    before4: null,
                    before5: null,
                    after1: null,
                    after2: null,
                    after3: null,
                    after4: null,
                    after5: null,
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
					northwindProductsJSON: [
                        { "ID": 0, "Name": "Bread", "Description": "Whole grain bread", "ReleaseDate": "1992-01-01T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 4, "Price": "2.5", "Category": { "ID": 0, "Name": "Food" } },
                        { "ID": 1, "Name": "Milk", "Description": "Low fat milk", "ReleaseDate": "1995-10-01T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "3.5", "Category": { "ID": 1, "Name": "Beverages" } },
                        { "ID": 2, "Name": "Vint Soda", "Description": null, "ReleaseDate": "2000-10-01T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "20.9", "Category": { "ID": 1, "Name": "Beverages" } },
                        { "ID": 3, "Name": "Havina Cola", "Description": "The Original Key Lime Cola", "ReleaseDate": "2005-10-01T00:00:00.000Z", "DiscontinuedDate": "2006-10-01T00:00:00.000Z", "Rating": 3, "Price": "19.9", "Category": { "ID": 1, "Name": "Beverages" } },
                        { "ID": 4, "Name": "Fruit Punch", "Description": "Mango flavor, 8.3 Ounce Cans (Pack of 24)", "ReleaseDate": "2003-01-05T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "22.99", "Category": { "ID": 1, "Name": "Beverages" } },
                        { "ID": 5, "Name": "Cranberry Juice", "Description": "16-Ounce Plastic Bottles (Pack of 12)", "ReleaseDate": "2006-08-04T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "22.8", "Category": { "ID": 1, "Name": "Beverages" }, },
                        { "ID": 6, "Name": "Pink Lemonade", "Description": "36 Ounce Cans (Pack of 3)", "ReleaseDate": "2006-11-05T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "18.8", "Category": { "ID": 1, "Name": "Beverages" }, },
                        { "ID": 7, "Name": "DVD Player", "Description": "1080P Upconversion DVD Player", "ReleaseDate": "2006-11-15T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "35.88", "Category": { "ID": 2, "Name": "Electronics" } },
                        { "ID": 8, "Name": "LCD HDTV", "Description": "42 inch 1080p LCD with Built-in Blu-ray Disc Player", "ReleaseDate": "2008-05-08T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "1088.8", "Category": { "ID": 2, "Name": "Electronics" } }
                 	],
                 treeFlatData: [
                    { "employeeId": 0, "supervisorId": -1, "firstName": "Andrew", "lastName": "Fuller", "Category": { "ID": 0, "Name": "Name" } },
                    { "employeeId": 1, "supervisorId": -1, "firstName": "Jonathan", "lastName": "Smith", "Category": { "ID": 1, "Name": "Name1" } },
                    { "employeeId": 2, "supervisorId": -1, "firstName": "Nancy", "lastName": "Davolio", "Category": { "ID": 2, "Name": "Name2" } },
                    { "employeeId": 3, "supervisorId": -1, "firstName": "Steven", "lastName": "Buchanan", "Category": { "ID": 0, "Name": "Name" } },
        
                    // Andrew Fuller's direct reports
                    { "employeeId": 4, "supervisorId": 0, "firstName": "Janet", "lastName": "Leverling", "Category": { "ID": 1, "Name": "Name1" } },
                    { "employeeId": 5, "supervisorId": 0, "firstName": "Laura", "lastName": "Callahan", "Category": { "ID": 1, "Name": "Name1" } },
                    { "employeeId": 6, "supervisorId": 0, "firstName": "Margaret", "lastName": "Peacock", "Category": { "ID": 0, "Name": "Name" } },
                    { "employeeId": 7, "supervisorId": 0, "firstName": "Michael", "lastName": "Suyama", "Category": { "ID": 2, "Name": "Name2" } },
        
                    // Janet Leverling's direct reports
                    { "employeeId": 8, "supervisorId": 4, "firstName": "Anne", "lastName": "Dodsworth", "Category": { "ID": 2, "Name": "Name2" } },
                    { "employeeId": 9, "supervisorId": 4, "firstName": "Danielle", "lastName": "Davis", "Category": { "ID": 2, "Name": "Name2" } },
                    { "employeeId": 10, "supervisorId": 4, "firstName": "Robert", "lastName": "King", "Category": { "ID": 1, "Name": "Name1" } },
        
                    // Nancy Davolio's direct reports
                    { "employeeId": 11, "supervisorId": 2, "firstName": "Peter", "lastName": "Lewis", "Category": { "ID": 1, "Name": "Name1" } },
                    { "employeeId": 12, "supervisorId": 2, "firstName": "Ryder", "lastName": "Zenaida", "Category": { "ID": 0, "Name": "Name" } },
                    { "employeeId": 13, "supervisorId": 2, "firstName": "Wang", "lastName": "Mercedes", "Category": { "ID": 1, "Name": "Name1" } },
        
                    // Steve Buchanan's direct reports
                    { "employeeId": 14, "supervisorId": 3, "firstName": "Theodore", "lastName": "Zia", "Category": { "ID": 2, "Name": "Name2" } },
                    { "employeeId": 15, "supervisorId": 3, "firstName": "Lacota", "lastName": "Mufutau", "Category": { "ID": 0, "Name": "Name" } },
        
                    // Lacota Mufutau's direct reports
                    { "employeeId": 16, "supervisorId": 15, "firstName": "Jin", "lastName": "Elliott", "Category": { "ID": 0, "Name": "Name" } },
                    { "employeeId": 17, "supervisorId": 15, "firstName": "Armand", "lastName": "Ross", "Category": { "ID": 0, "Name": "Name" } },
                    { "employeeId": 18, "supervisorId": 15, "firstName": "Dane", "lastName": "Rodriquez", "Category": { "ID": 1, "Name": "Name1" } },
        
                    // Dane Rodriquez's direct reports
                    { "employeeId": 19, "supervisorId": 18, "firstName": "Declan", "lastName": "Lester", "Category": { "ID": 1, "Name": "Name1" } },
                    { "employeeId": 20, "supervisorId": 18, "firstName": "Bernard", "lastName": "Jarvis", "Category": { "ID": 1, "Name": "Name1" } },
        
                    // Bernard Jarvis' direct report
                    { "employeeId": 21, "supervisorId": 20, "firstName": "Jeremy", "lastName": "Donaldson", "Category": { "ID": 2, "Name": "Name2" } }
                ],
                yearsCount: { 'lastYear': 0, 'thisYear': 0, 'nextYear': 0 },
                monthsCount: { 'lastMonth': 0, 'thisMonth': 0, 'nextMonth': 0 },
                initialized : false,
				util: $.ig.TestUtil,
				setTableTemplate: function(){
					$("#t1 tbody").empty();
					var tableTemplate = $(this.tableTemplateHtml).appendTo($('#qunit-fixture'));
					tableTemplate.tmpl(this.tableDs.dataView()).appendTo("#t1 tbody");
				},
                loadTestbeds: function(){
					var tableDataSourceElement =  $(this.tableDsSource).appendTo($('#qunit-fixture'));
                    // create the data sources
				   this.tableDs = new $.ig.DataSource({ schema: { fields: [{ name: "col1", type: "number" }, { name: "col2", type: "number" },
                    { name: "col3" }, { name: "col4" }, { name: "col5", type: "date" }, { name: "col6", type: "boolean"}]
                        },
                            filtering: { type: "local" }, dataSource: $("#t1")[0]
                        }).dataBind();
                    
                    this.jsonDs = new $.ig.DataSource({ filtering: { type: "local" }, dataSource:this.arrayOfDataObjects,
                         paging: { enabled: true, type: "local", pageSize: 3 }
                     }).dataBind();
                    
                        //data source with mapper
                    this.mapperDs = new $.ig.DataSource({
                         dataSource:this.northwindProductsJSON,
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
                            dataSource:this.treeFlatData,
                            treeDS: {
                                key: "employeeId",
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
                    
                    // use jQuery templating to render the processed/transformed data source
                    var jsonDataView =this.jsonDs.dataView();
                    //  $("body").append(this.tmplScript);
                    //$('#qunit-fixture').append(this.tmplScript);
                    var template =  $(this.tmplHtml).appendTo($('#qunit-fixture'));
                    template.tmpl(jsonDataView).appendTo($('#qunit-fixture'));
					
					// we need to make sure our data is fresh and we get matches for "Today", "Before", "After", "Yesterday", "thisMonth", "NextMonth", "ThisYear", "NextYear", "LastYear"
                    
                    this.date = new Date();
                    this.before1 = new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate() - 1, 0, 0, 0, 0);
                    this.before2 = new Date(this.date.getFullYear(),this.date.getMonth() - 1,this.date.getDate(), 0, 0, 0, 0);
                    this.before3 = new Date(this.date.getFullYear() - 1,this.date.getMonth(),this.date.getDate(), 0, 0, 0, 0);
                    this.after1 = new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate() + 1, 0, 0, 0, 0);
                    this.after2 = new Date(this.date.getFullYear(),this.date.getMonth() + 1,this.date.getDate(), 0, 0, 0, 0);
                    this.after3 = new Date(this.date.getFullYear(),this.date.getMonth(),this.date.getDate(),this.date.getHours() + 1, 1, 0, 0);
                    this.after4 = new Date(this.date.getFullYear() + 1,this.date.getMonth(),this.date.getDate(), 0, 0, 0, 0);
                    this.after5 = new Date(this.date.getFullYear() + 2,this.date.getMonth(),this.date.getDate(), 0, 0, 0, 0);
                    this.before4 = new Date(this.date.getFullYear() - 1,this.date.getMonth(),this.date.getDate(), 0, 0, 0, 0);
                    this.before5 = new Date(this.date.getFullYear() - 2,this.date.getMonth(),this.date.getDate(), 0, 0, 0, 0);
                    
                     //today
                    this.tableDs.dataView()[0].col5 =this.date;
                
                    //before
                    this.tableDs.dataView()[1].col5 =this.before1; // this month yesterday
                    this.tableDs.dataView()[2].col5 =this.before2; // last month (this year)
                    this.tableDs.dataView()[3].col5 =this.before3;  // last year
                
                    // after
                    this.tableDs.dataView()[4].col5 =this.after1; // this month tomorrow
                    this.tableDs.dataView()[5].col5 =this.after2; // this year (this month)
                    this.tableDs.dataView()[6].col5 =this.after3; // this year (next month)
                    this.tableDs.dataView()[7].col5 =this.after4; // next year
                
                    this.tableDs.dataView()[8].col5 =this.after5;
                    this.tableDs.dataView()[9].col5 =this.before4;
                    this.tableDs.dataView()[10].col5 =this.before5;
                    var self = this;
                    for (i = 0; i <this.tableDs.dataView().length; ++i) {
                            if (this.tableDs.dataView()[i].col5.getFullYear() == (this.date.getFullYear() - 1)) {
                               this.yearsCount['lastYear']++;
                            } else if (this.tableDs.dataView()[i].col5.getFullYear() == (this.date.getFullYear())) {
                               this.yearsCount['thisYear']++;
                            } else if (this.tableDs.dataView()[i].col5.getFullYear() == (this.date.getFullYear() + 1)) {
                               this.yearsCount['nextYear']++;
                            }
                        
                            var lastMonth =this.date.getMonth() === 0 ? 11 :this.date.getMonth() - 1;
                            var nextMonth =this.date.getMonth() === 11 ? 0 :this.date.getMonth() + 1;
                            var tDate = this.tableDs.dataView()[i].col5;
                            if ((tDate.getMonth() ===this.date.getMonth() - 1 && tDate.getFullYear() ===this.date.getFullYear())
                               || (tDate.getMonth() - 11 ===this.date.getMonth() && tDate.getFullYear() ===this.date.getFullYear() - 1)) {
                               this.monthsCount['lastMonth']++;
                            } else if (this.tableDs.dataView()[i].col5.getMonth() ===this.date.getMonth() && tDate.getFullYear() ===this.date.getFullYear()) {
                               this.monthsCount['thisMonth']++;
                            } else if ((tDate.getMonth() ===this.date.getMonth() + 1 && tDate.getFullYear() ===this.date.getFullYear())
                               || (tDate.getMonth() + 11 ===this.date.getMonth() && tDate.getFullYear() ===this.date.getFullYear() + 1)) {
                               this.monthsCount['nextMonth']++;
                            }
                        }
                },
				before: function(assert) {
					//pause testing until tree is initialized
					if (!this.initialized) {
						var done = assert.async();
                       this.loadTestbeds();
                       this.util.wait(500).then(function(){
                           this.initialized = true;
                            done();
                        });
						//setTimeout(function () { start(); }, 500);
						
					}
				},
				after: function() {
				}
				})
				
				// IgDataSource filtering test 1: Filtering with schema - StartsWith
				QUnit.test("IgDataSource filtering test 1: Filtering with schema - StartsWith", function (assert) {
                    assert.expect(4);
					this.tableDs.filter([{ fieldName: "col3", expr: "l", cond: "startsWith"}], true);

					// 1. check the number of records
					assert.equal(this.tableDs.dataView().length, 2, 2);
					// 2. check that they both start with "l"
					assert.equal("Laptop", this.tableDs.dataView()[0].col3, "Laptop");
					assert.equal("Laptop", this.tableDs.dataView()[1].col3, "Laptop");

					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col3", expr: "", cond: "startsWith"}], true);

					assert.equal(this.tableDs.dataView().length, 11, 11);

					//$("#t1 tbody").empty();
					//var tableTemplate = $(this.tableTemplateHtml).appendTo($('#qunit-fixture'));
					//tableTemplate.tmpl(this.tableDs.dataView()).appendTo("#t1 tbody");
					this.setTableTemplate();
				});

				// IgDataSource filtering test 2: Filtering with schema - EndsWith
				QUnit.test("IgDataSource filtering test 2: Filtering with schema - EndsWith", function (assert) {
                    assert.expect(4);
					this.tableDs.filter([{ fieldName: "col3", expr: "r", cond: "endsWith"}], true);

					// 1. check the number of records
					assert.equal(this.tableDs.dataView().length, 2, 2);
					// 2. check that they both start with "l"
					assert.equal("Hamburger", this.tableDs.dataView()[0].col3, "Hamburger");
					assert.equal("Beer", this.tableDs.dataView()[1].col3, "Beer");

					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col3", expr: "", cond: "endsWith"}], true);

					assert.equal(this.tableDs.dataView().length, 11, 11);
					this.setTableTemplate();
					//	this.setTableTemplate();$("#t1 tbody").empty();
					//$("#tableTemplate").tmpl(this.tableDs.dataView()).appendTo("#t1 tbody");
				});

				// IgDataSource filtering test 3: Filtering with schema - Contains
				QUnit.test("IgDataSource filtering test 3: Filtering with schema - Contains", function (assert) {
                    assert.expect(4);
					this.tableDs.filter([{ fieldName: "col3", expr: "m", cond: "contains"}], true);

					// 1. check the number of records
					assert.equal(this.tableDs.dataView().length, 4,4);
					assert.equal("Hamburger", this.tableDs.dataView()[0].col3, "Hamburger");
					assert.equal("mouse", this.tableDs.dataView()[3].col3, "mouse");

					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col3", expr: "", cond: "contains"}], true);

					assert.equal(this.tableDs.dataView().length, 11, 11);
					this.setTableTemplate();
					//	$("#t1 tbody").empty();
					//$("#tableTemplate").tmpl(this.tableDs.dataView()).appendTo("#t1 tbody");

				});

				// IgDataSource filtering test 4: Filtering with schema - DoesNotContain
				QUnit.test("IgDataSource filtering test 4: Filtering with schema - DoesNotContain", function (assert) {
                    assert.expect(4);
					this.tableDs.filter([{ fieldName: "col3", expr: "e", cond: "doesNotContain"}], true);

					// 1. check the number of records
					assert.equal(this.tableDs.dataView().length, 4, 4);

					assert.equal("Laptop", this.tableDs.dataView()[0].col3, "Laptop");
					assert.equal("fish", this.tableDs.dataView()[3].col3, "fish");

					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col3", expr: "", cond: "doesNotContain"}], true);

					assert.equal(this.tableDs.dataView().length, 11, 11);

					this.setTableTemplate();
					//$("#t1 tbody").empty();
					//$("#tableTemplate").tmpl(this.tableDs.dataView()).appendTo("#t1 tbody");

				});

				// IgDataSource filtering test 5: Filtering with schema - Equal
				QUnit.test("IgDataSource filtering test 5: Filtering with schema - Equals", function (assert) {

					this.tableDs.filter([{ fieldName: "col3", expr: "fish", cond: "equals"}], true);
                    assert.expect(9);
					// 1. check the number of records
					assert.equal(this.tableDs.dataView().length, 1, 1);
					assert.equal("fish", this.tableDs.dataView()[0].col3, "fish");

					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col3", expr: "", cond: "equals"}], true);

					assert.equal(this.tableDs.dataView().length, 11, 11);
					this.setTableTemplate();
					//$("#t1 tbody").empty();
					//$("#tableTemplate").tmpl(this.tableDs.dataView()).appendTo("#t1 tbody");

					// now test Equals for numeric and date columns

					this.tableDs.filter([{ fieldName: "col2", expr: 987, cond: "equals"}], true);
					assert.equal(this.tableDs.dataView().length, 1, 1);
					assert.equal(987, this.tableDs.dataView()[0].col2, 987);
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col2", expr: "", cond: "equals"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);

					//dates
					this.tableDs.filter([{ fieldName: "col5", expr: this.date.toString(), cond: "equals"}], true);
					assert.equal(this.tableDs.dataView().length, 1, 1);
					assert.deepEqual(this.date, this.tableDs.dataView()[0].col5, this.date);
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "equals"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				// IgDataSource filtering test 6: Filtering with schema - DoesNotEqual
				QUnit.test("IgDataSource filtering test 6: Filtering with schema - DoesNotEqual", function (assert) {
                    assert.expect(8);
					this.tableDs.filter([{ fieldName: "col3", expr: "Laptop", cond: "doesNotEqual"}], true);

					// 1. check the number of records
					assert.equal(this.tableDs.dataView().length, 9, 9);
					assert.equal("Hamburger", this.tableDs.dataView()[0].col3, "Hamburger");

					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col3", expr: "", cond: "doesNotEqual"}], true);

					assert.equal(this.tableDs.dataView().length, 11, 11);
					this.setTableTemplate();
					//	$("#t1 tbody").empty();
					//$("#tableTemplate").tmpl(this.tableDs.dataView()).appendTo("#t1 tbody");

					// now test Does Not Equal for numeric and date columns

					this.tableDs.filter([{ fieldName: "col2", expr: 987, cond: "doesNotEqual"}], true);
					assert.equal(this.tableDs.dataView().length, 10, 10);
					assert.equal(100, this.tableDs.dataView()[0].col2, 100);
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col2", expr: "", cond: "doesNotEqual"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);

					//dates
					this.tableDs.filter([{ fieldName: "col5", expr: this.date.toString(), cond: "doesNotEqual"}], true);
					assert.equal(this.tableDs.dataView().length, 10, 10);
					//same(date, this.tableDs.dataView()[0].col5, date);
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "doesNotEqual"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);

				});

				// IgDataSource filtering test 7: Filtering with schema - GreaterThan
				QUnit.test("IgDataSource filtering test 7: Filtering with schema - GreaterThan", function (assert) {
                    assert.expect(3);
					// now test GreaterThan for numeric and date columns

					this.tableDs.filter([{ fieldName: "col2", expr: 100, cond: "greaterThan"}], true);
					assert.equal(this.tableDs.dataView().length, 4, 4);
					assert.equal(2000, this.tableDs.dataView()[0].col2, 2000);
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col2", expr: "", cond: "greaterThan"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);

				});

				// IgDataSource filtering test 8: Filtering with schema - LessThan
				QUnit.test("IgDataSource filtering test 8: Filtering with schema - LessThan", function (assert) {
                    assert.expect(3);
					this.tableDs.filter([{ fieldName: "col2", expr: 100, cond: "lessThan"}], true);
					assert.equal(this.tableDs.dataView().length, 5, 5);
					assert.equal(15, this.tableDs.dataView()[0].col2, 15);
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col2", expr: "", cond: "lessThan"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);

				});

				// IgDataSource filtering test 9: Filtering with schema - GreaterThanOrEqualTo
				QUnit.test("IgDataSource filtering test 9: Filtering with schema - GreaterThanOrEqualTo", function (assert) {
                    assert.expect(3);
					this.tableDs.filter([{ fieldName: "col2", expr: 100, cond: "greaterThanOrEqualTo"}], true);
					assert.equal(this.tableDs.dataView().length, 6, 6);
					assert.equal(100, this.tableDs.dataView()[0].col2, 100);
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col2", expr: "", cond: "greaterThanOrEqualTo"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);

				});

				// IgDataSource filtering test 10: Filtering with schema - True
				QUnit.test("IgDataSource filtering test 10: Filtering with schema - True", function (assert) {
                    assert.expect(3);
					this.tableDs.filter([{ fieldName: "col6", cond: "true"}], true);
					assert.equal(this.tableDs.dataView().length, 6, 6);
					assert.equal(true, this.tableDs.dataView()[0].col6, true);
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col6", expr: "", cond: "equals"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				// IgDataSource filtering test 11: Filtering with schema - False
				QUnit.test("IgDataSource filtering test 11: Filtering with schema - False", function (assert) {
                    assert.expect(3);
					this.tableDs.filter([{ fieldName: "col6", cond: "false"}], true);
					assert.equal(this.tableDs.dataView().length, 5, 5);
					assert.equal(false, this.tableDs.dataView()[0].col6, false);
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col6", expr: "", cond: "equals"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				// IgDataSource filtering test 12: Filtering with schema - After
				QUnit.test("IgDataSource filtering test 12: Filtering with schema - After", function (assert) {
                    assert.expect(2);
					this.tableDs.filter([{ fieldName: "col5", expr: new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), this.date.getHours(), this.date.getMinutes() + 1, 0).toString(), cond: "after"}], true);
					assert.equal(this.tableDs.dataView().length, 5, 5);
					//assert.equal(new Date("Wed Nov 10 00:00:00 UTC+0200 2010"), this.tableDs.dataView()[0].col5, new Date("Wed Nov 10 00:00:00 UTC+0200 2010"));
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "equals"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);

				});

				// IgDataSource filtering test 13: Filtering with schema - Before
				QUnit.test("IgDataSource filtering test 13: Filtering with schema - Before", function (assert) {
                    assert.expect(2);
					//dates
					this.tableDs.filter([{ fieldName: "col5", expr: this.date.toString(), cond: "before"}], true);
					assert.equal(this.tableDs.dataView().length, 5, 5);
					//assert.equal(new Date("Wed Nov 10 00:00:00 UTC+0200 2010"), this.tableDs.dataView()[0].col5, new Date("Wed Nov 10 00:00:00 UTC+0200 2010"));
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "equals"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);

				});

				// IgDataSource filtering test 14: Filtering with schema - Today
				QUnit.test("IgDataSource filtering test 14: Filtering with schema - Today", function (assert) {
                    assert.expect(2);
					//dates
					var col5Date, countTodayRecords = 0, today = new Date(), y = today.getFullYear(), m = today.getMonth(), d = today.getDate();
					for (i = 0; i < this.tableDs.dataView().length; ++i) {
						col5Date = this.tableDs.dataView()[i].col5;
						if (col5Date.getFullYear() === y && col5Date.getMonth() === m && col5Date.getDate() === d) {
							countTodayRecords++;
						}
					}
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "today"}], true);
					assert.equal(this.tableDs.dataView().length, countTodayRecords, "Today count records should be " + countTodayRecords);
					//assert.equal(new Date("Wed Nov 10 00:00:00 UTC+0200 2010"), this.tableDs.dataView()[0].col5, new Date("Wed Nov 10 00:00:00 UTC+0200 2010"));
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "equals"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);

				});

				// IgDataSource filtering test 15: Filtering with schema - Yesterday
				QUnit.test("IgDataSource filtering test 15: Filtering with schema - Yesterday", function (assert) {
                    assert.expect(2);
					//dates
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "yesterday"}], true);
					assert.equal(this.tableDs.dataView().length, 1, 1);
					//assert.equal(new Date("Wed Nov 10 00:00:00 UTC+0200 2010"), this.tableDs.dataView()[0].col5, new Date("Wed Nov 10 00:00:00 UTC+0200 2010"));
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "equals"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				// IgDataSource filtering test 16: Filtering with schema - ThisMonth
				QUnit.test("IgDataSource filtering test 16: Filtering with schema - ThisMonth", function (assert) {
                    assert.expect(2);
					//dates
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "thisMonth"}], true);
					assert.equal(this.tableDs.dataView().length, this.monthsCount['thisMonth'], this.monthsCount['thisMonth']);
					//assert.equal(new Date("Wed Nov 10 00:00:00 UTC+0200 2010"), this.tableDs.dataView()[0].col5, new Date("Wed Nov 10 00:00:00 UTC+0200 2010"));
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "equals"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				// IgDataSource filtering test 17: Filtering with schema - LastMonth
				QUnit.test("IgDataSource filtering test 17: Filtering with schema - LastMonth", function (assert) {
                    assert.expect(2);
					//dates
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "lastMonth"}], true);
					assert.equal(this.tableDs.dataView().length, this.monthsCount['lastMonth'], this.monthsCount['lastMonth']);
					//assert.equal(new Date("Wed Nov 10 00:00:00 UTC+0200 2010"), this.tableDs.dataView()[0].col5, new Date("Wed Nov 10 00:00:00 UTC+0200 2010"));
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "equals"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				// IgDataSource filtering test 18: Filtering with schema - NextMonth
				QUnit.test("IgDataSource filtering test 18: Filtering with schema - NextMonth", function (assert) {
                    assert.expect(2);
					//dates
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "nextMonth"}], true);
					assert.equal(this.tableDs.dataView().length, this.monthsCount['nextMonth'], this.monthsCount['nextMonth']);
					//assert.equal(new Date("Wed Nov 10 00:00:00 UTC+0200 2010"), this.tableDs.dataView()[0].col5, new Date("Wed Nov 10 00:00:00 UTC+0200 2010"));
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "equals"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				// IgDataSource filtering test 19: Filtering with schema - ThisYear
				QUnit.test("IgDataSource filtering test 19: Filtering with schema - ThisYear", function (assert) {
                    assert.expect(2);
					//dates
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "thisYear"}], true);
					assert.equal(this.tableDs.dataView().length, this.yearsCount['thisYear'], this.yearsCount['thisYear']);
					//assert.equal(new Date("Wed Nov 10 00:00:00 UTC+0200 2010"), this.tableDs.dataView()[0].col5, new Date("Wed Nov 10 00:00:00 UTC+0200 2010"));
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "equals"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				// IgDataSource filtering test 20: Filtering with schema - LastYear
				QUnit.test("IgDataSource filtering test 20: Filtering with schema - LastYear", function (assert) {
                    assert.expect(2);
					//dates
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "lastYear"}], true);
					assert.equal(this.tableDs.dataView().length, this.yearsCount['lastYear'], this.yearsCount['lastYear']);
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "equals"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				// IgDataSource filtering test 21: Filtering with schema - NextYear
				QUnit.test("IgDataSource filtering test 20: Filtering with schema - NextYear", function (assert) {
                    assert.expect(2);
					//dates
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "nextYear"}], true);
					assert.equal(this.tableDs.dataView().length, this.yearsCount['nextYear'], this.yearsCount['nextYear']);
					//assert.equal(new Date("Wed Nov 10 00:00:00 UTC+0200 2010"), this.tableDs.dataView()[0].col5, new Date("Wed Nov 10 00:00:00 UTC+0200 2010"));
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col5", expr: "", cond: "equals"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				// IgDataSource filtering test 22: Filtering without schema by Index - Contains
				/*
				test(testId_22, function() {
				ok(true);
				});

				test(testId_23, function() {
				ok(true);
				});

				test(testId_24, function() {
				ok(true);
				});

				test(testId_25, function() {
				ok(true);
				});
				*/

				//IgDataSource filtering test 20: Filtering with expressions array - multiple 1 -  "AND logic"
				QUnit.test("IgDataSource filtering test 20: Filtering with expressions array - multiple 1", function (assert) {
                    assert.expect(3);
					this.tableDs.filter([{ fieldName: "col2", expr: 100, cond: "greaterThan", logic: "AND" }, { fieldName: "col3", expr: "m", cond: "startsWith", logic: "AND"}], true);
					assert.equal(this.tableDs.dataView().length, 2, 2);
					assert.equal(2000, this.tableDs.dataView()[0].col2, 2000);
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col2", expr: "", cond: "greaterThan", logic: "AND" }, { fieldName: "col3", expr: "", cond: "startsWith", logic: "AND"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				//IgDataSource filtering test 20: Filtering with expressions array - multiple 2 -  "OR logic"
				QUnit.test( "IgDataSource filtering test 20: Filtering with expressions array - multiple 2", function (assert) {
                    assert.expect(3);
					this.tableDs.filter([{ fieldName: "col2", expr: 100, cond: "greaterThan", logic: "OR" }, { fieldName: "col3", expr: "m", cond: "startsWith", logic: "OR"}], true);
					assert.equal(this.tableDs.dataView().length, 4, 4);
					assert.equal(2000, this.tableDs.dataView()[0].col2, 2000);
					// remove the filter and check if all records are back there
					this.tableDs.filter([{ fieldName: "col2", expr: "", cond: "greaterThan", logic: "OR" }, { fieldName: "col3", expr: "", cond: "startsWith", logic: "OR"}], true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				// IgDataSource filtering test 28: Filtering with expression string  1 -  "AND logic"
				QUnit.test("IgDataSource filtering test 20: Filtering with expression string  1", function (assert) {
                    assert.expect(3);
					this.tableDs.filter("col2 > 100 AND col3 LIKE m%", true);
					assert.equal(this.tableDs.dataView().length, 2, 2);
					assert.equal(2000, this.tableDs.dataView()[0].col2, 2000);
					// remove the filter and check if all records are back there
					this.tableDs.filter("", true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				// IgDataSource filtering test 29: Filtering with expression string  2 - "OR logic"
				QUnit.test("IgDataSource filtering test 20: Filtering with expression string 2", function (assert) {
                    assert.expect(3);
					this.tableDs.filter("col2 > 100 OR col3 LIKE m%", true);
					assert.equal(this.tableDs.dataView().length, 4, 4);
					assert.equal(2000, this.tableDs.dataView()[0].col2, 2000);
					// remove the filter and check if all records are back there
					this.tableDs.filter("", true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				// IgDataSource filtering test 30: Filtering with expression string 3 - not like SQL
				QUnit.test("IgDataSource filtering test 20: Filtering with expression string 3 - not like SQL", function (assert) {
                    assert.expect(2);
					this.tableDs.filter("col2 <> 100", true);
					assert.equal(this.tableDs.dataView().length, 9, 9);
					//assert.equal(2000, this.tableDs.dataView()[0].col2, 2000);
					// remove the filter and check if all records are back there
					this.tableDs.filter("", true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				// IgDataSource filtering test 31: Filtering with expression string 3 - greater than or equal
				QUnit.test("IgDataSource filtering test 20: Filtering with expression string 4 - greater than or equal SQL", function (assert) {
                    assert.expect(3);
					this.tableDs.filter("col2 >= 100", true);
					assert.equal(this.tableDs.dataView().length, 6, 6);
					assert.equal(100, this.tableDs.dataView()[0].col2, 100);
					// remove the filter and check if all records are back there
					this.tableDs.filter("", true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				// IgDataSource filtering test 32: Filtering with expression string 3 - less than or equal
				QUnit.test("IgDataSource filtering test 20: Filtering with expression string 5 - less than or equal SQL", function (assert) {
                    assert.expect(3);
					this.tableDs.filter("col2 <= 100", true);
					assert.equal(this.tableDs.dataView().length, 7, 7);
					assert.equal(100, this.tableDs.dataView()[0].col2, 100);
					// remove the filter and check if all records are back there
					this.tableDs.filter("", true);
					assert.equal(this.tableDs.dataView().length, 11, 11);
				});

				QUnit.test("IgDataSource filtering test 34: Filtering field with mapper function defined", function (assert) {
                    assert.expect(3);
					this.mapperDs.filter([{ fieldName: "Category", expr: "Electronics", cond: "contains" }], "AND", true);

					assert.equal(this.mapperDs.dataView().length, 2, "There should be 2 records that match the filtering condition.");
					assert.equal(this.mapperDs.dataView()[0].Category.Name, "Electronics", "DataView should be filtered correctly.");
					assert.equal(this.mapperDs.dataView()[1].Category.Name, "Electronics", "DataView should be filtered correctly.");
				});

				QUnit.test("IgTreeHierarchicalDataSource filtering test 35-  Filtering field with mapper function defined", function (assert) {
                    assert.expect(2);
					this.treeDs.filter([{ fieldName: "Category", expr: 1 , cond: "lessThan" }], "AND", true);

					$(this.treeDs.flatDataView()).each(function () {
						assert.equal(this.__matchFiltering === true, this.Category.ID === 0, "Check if filtering parameter __matchFiltering was appled based on the mapped value: Category.ID");
					});
				});

				QUnit.module("Test filtering", {
					ds: null,
					self: this,
					northwindProductsJSON: [
                        { "ID": 0, "Name": "Bread", "Description": "Whole grain bread", "ReleaseDate": "1992-01-01T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 4, "Price": "2.5", "Category": { "ID": 0, "Name": "Food" } },
                        { "ID": 1, "Name": "Milk", "Description": "Low fat milk", "ReleaseDate": "1995-10-01T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "3.5", "Category": { "ID": 1, "Name": "Beverages" } },
                        { "ID": 2, "Name": "Vint Soda", "Description": null, "ReleaseDate": "2000-10-01T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "20.9", "Category": { "ID": 1, "Name": "Beverages" } },
                        { "ID": 3, "Name": "Havina Cola", "Description": "The Original Key Lime Cola", "ReleaseDate": "2005-10-01T00:00:00.000Z", "DiscontinuedDate": "2006-10-01T00:00:00.000Z", "Rating": 3, "Price": "19.9", "Category": { "ID": 1, "Name": "Beverages" } },
                        { "ID": 4, "Name": "Fruit Punch", "Description": "Mango flavor, 8.3 Ounce Cans (Pack of 24)", "ReleaseDate": "2003-01-05T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "22.99", "Category": { "ID": 1, "Name": "Beverages" } },
                        { "ID": 5, "Name": "Cranberry Juice", "Description": "16-Ounce Plastic Bottles (Pack of 12)", "ReleaseDate": "2006-08-04T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "22.8", "Category": { "ID": 1, "Name": "Beverages" }, },
                        { "ID": 6, "Name": "Pink Lemonade", "Description": "36 Ounce Cans (Pack of 3)", "ReleaseDate": "2006-11-05T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "18.8", "Category": { "ID": 1, "Name": "Beverages" }, },
                        { "ID": 7, "Name": "DVD Player", "Description": "1080P Upconversion DVD Player", "ReleaseDate": "2006-11-15T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "35.88", "Category": { "ID": 2, "Name": "Electronics" } },
                        { "ID": 8, "Name": "LCD HDTV", "Description": "42 inch 1080p LCD with Built-in Blu-ray Disc Player", "ReleaseDate": "2008-05-08T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "1088.8", "Category": { "ID": 2, "Name": "Electronics" } }
                 	],
					beforeEach: function () {
						this.ds = new $.ig.DataSource({
							filtering: { type: "local", enabled: true },
							summaries: { type: "local" },
							dataSource: this.northwindProductsJSON,
							schema: { fields: [{
											name: "ID", type: "number"
										}, {
											name: "Name", type: "string"
										}, {
											name: "Description", type: "string"
										}, {
											name: "ReleaseDate", type: "date"
										}]
							}
						}).dataBind();
					}
				});


				 QUnit.test("Test fieldIndex in fieldExpression", function (assert) {
				 	assert.expect(2);
				 	var fd, s = this.ds.schema();
				 	this.ds._schema = null;
				 	assert.throws(
				 		function () {
				 			this.ds.filter([{ fieldName: "ID", expr: 100, cond: "greaterThan" }]);
				 		},
				 		function (err) {
				 			return err.message.indexOf($.ig.DataSourceLocale.locale.filteringNoSchema) > -1;
				 		},
				 		$.ig.DataSourceLocale.locale.filteringNoSchema + " should be thrown"
				 	);
				 	this.ds.schema(s);
				 	this.ds.filter([{ fieldIndex: 0, expr: 100, cond: "greaterThanOrEqualTo"}]);
				 	fd = this.ds.filteredData();
				 	assert.ok(fd.length === 0 && this.ds.dataView().length === 0,
				 		"Test count of filtered records");
				 });

				QUnit.test("Test conditions null, notNull, empty, notEmpty for string", function (assert) {
					assert.expect(4);
					var fd;
					// test conditions for string
					this.ds.filter([
									{ fieldIndex: 1, expr: "a", cond: "null", logic: "OR" }
								]);
					fd = this.ds.filteredData();
					assert.ok(fd.length === 0 && this.ds.dataView().length === 0,
						"Test condition null");
					this.ds.filter([
									{ fieldIndex: 1, expr: "a", cond: "notNull", logic: "OR" }
								]);
					fd = this.ds.filteredData();
					assert.ok(fd.length === 9 && this.ds.dataView().length === 9,
						"Test condition notNull");
					this.ds.filter([
								{ fieldIndex: 1, expr: "a", cond: "empty", logic: "OR" }
							]);
					fd = this.ds.filteredData();
					assert.ok(fd.length === 0 && this.ds.dataView().length === 0,
						"Test condition empty");

					this.ds.filter([
								{ fieldName: "Description", expr: "", cond: "notEmpty", logic: "OR" }
							]);
					fd = this.ds.filteredData();
					assert.ok(fd.length === 8 && this.ds.dataView().length === 8,
						"Test condition notEmpty");
				});
				QUnit.test("Test conditions on, notOn, null, notNull, empty, notEmpty", function (assert) {
					assert.expect(6);
					var fd;
					this.ds.filter([
						{ fieldName: "ReleaseDate", expr: new Date(694224000000), cond: "on", logic: "OR" }
					]);
					fd = this.ds.filteredData();
					assert.ok(fd.length === 1 && this.ds.dataView().length === 1,
						"Condition on");
					this.ds.filter([
						{ fieldName: "ReleaseDate", expr: new Date(694224000000), cond: "notOn", logic: "OR" }
					]);
					fd = this.ds.filteredData();
					assert.ok(fd.length === 8 &&
						this.ds.dataView().length === 8 &&
						this.ds.totalLocalRecordsCount() === 8 &&
						this.ds.pageCount() === 2,
						"Condition notOn");

					this.ds.filter([
						{ fieldName: "ReleaseDate", cond: "null" }
					]);
					fd = this.ds.filteredData();
					assert.ok(fd.length === 0 &&
						this.ds.dataView().length === 0,
						"Condition null");
					this.ds.filter([
						{ fieldName: "ReleaseDate", cond: "notNull" }
					]);
					fd = this.ds.filteredData();
					assert.ok(fd.length === 9 &&
						this.ds.dataView().length === 9,
						"Condition notNull");

					this.ds.filter([
						{ fieldName: "ReleaseDate", cond: "empty" }
					]);
					fd = this.ds.filteredData();
					assert.ok(fd.length === 0 &&
						this.ds.dataView().length === 0,
						"Condition empty");
					this.ds.filter([
						{ fieldName: "ReleaseDate", cond: "notEmpty" }
					]);
					fd = this.ds.filteredData();
					assert.ok(fd.length === 9 &&
						this.ds.dataView().length === 9,
						"Condition notEmpty");
				});

				QUnit.test("Test conditions null, notNull, empty, notEmpty for numeric", function (assert) {
					assert.expect(4);
					this.ds.filter([
						{ fieldName: "ID", expr: "", cond: "null", logic: "OR" }
					]);
					fd = this.ds.filteredData();
					assert.ok(fd.length === 0 && this.ds.dataView().length === 0,
						"Condition null");

					this.ds.filter([
						{ fieldName: "ID", expr: "", cond: "notNull", logic: "OR" }
					]);
					fd = this.ds.filteredData();
					assert.ok(fd.length === 9 && this.ds.dataView().length === 9,
						"Condition null");

					this.ds.filter([
						{ fieldName: "ID", expr: "", cond: "empty", logic: "OR" }
					]);
					fd = this.ds.filteredData();
					assert.ok(fd.length === 0 && this.ds.dataView().length === 0,
						"Condition null");

					this.ds.filter([
						{ fieldName: "ID", expr: "", cond: "notEmpty", logic: "OR" }
					]);
					fd = this.ds.filteredData();
					assert.ok(fd.length === 9 && this.ds.dataView().length === 9,
						"Condition null");
					this.ds.filter([
						{ fieldName: "ID", expr: "", cond: "notEmpty", logic: "OR" }
					]);
				});

				QUnit.test("Test transformedData with filtering + paging ", function (assert) {
					assert.expect(1);
					var p = this.ds.settings.paging;
					this.ds.settings.paging.enabled = true;
					this.ds.settings.paging.type = "local";
					this.ds.settings.paging.pageSize = 5;
					this.ds.filter([
						{ fieldName: "ID", expr: 0, cond: "greaterThan" }
					]);
					assert.ok(
						this.ds.transformedData("priortofilteringandpaging").length === 9 &&
						this.ds.transformedData("afterfilteringbeforepaging").length === 8 &&
						this.ds.transformedData("afterfilteringandpaging").length === 5 &&
						this.ds.transformedData("").length === 5,
						"Test transformedData"
					);
				});
				QUnit.test("Test function filter with argument fieldExpressionsOnStrings", function (assert) {
					assert.expect(1);
					var fd;
					this.ds.filter([], null, null, "ID LIKE %1% OR ID LIKE %3%");
					fd = this.ds.filteredData();
					assert.ok(fd.length === 2 &&
						fd[0].ID === 1 &&
						fd[1].ID === 3,
						"Test filter");
				});

				QUnit.module("Test filtering all fields", {
					ds: null,
					fd: null,
					dsWithFormatter: null,
					northwindProductsJSON: [
                        { "ID": 0, "Name": "Bread", "Description": "Whole grain bread", "ReleaseDate": "1992-01-01T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 4, "Price": "2.5", "Category": { "ID": 0, "Name": "Food" } },
                        { "ID": 1, "Name": "Milk", "Description": "Low fat milk", "ReleaseDate": "1995-10-01T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "3.5", "Category": { "ID": 1, "Name": "Beverages" } },
                        { "ID": 2, "Name": "Vint Soda", "Description": null, "ReleaseDate": "2000-10-01T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "20.9", "Category": { "ID": 1, "Name": "Beverages" } },
                        { "ID": 3, "Name": "Havina Cola", "Description": "The Original Key Lime Cola", "ReleaseDate": "2005-10-01T00:00:00.000Z", "DiscontinuedDate": "2006-10-01T00:00:00.000Z", "Rating": 3, "Price": "19.9", "Category": { "ID": 1, "Name": "Beverages" } },
                        { "ID": 4, "Name": "Fruit Punch", "Description": "Mango flavor, 8.3 Ounce Cans (Pack of 24)", "ReleaseDate": "2003-01-05T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "22.99", "Category": { "ID": 1, "Name": "Beverages" } },
                        { "ID": 5, "Name": "Cranberry Juice", "Description": "16-Ounce Plastic Bottles (Pack of 12)", "ReleaseDate": "2006-08-04T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "22.8", "Category": { "ID": 1, "Name": "Beverages" }, },
                        { "ID": 6, "Name": "Pink Lemonade", "Description": "36 Ounce Cans (Pack of 3)", "ReleaseDate": "2006-11-05T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "18.8", "Category": { "ID": 1, "Name": "Beverages" }, },
                        { "ID": 7, "Name": "DVD Player", "Description": "1080P Upconversion DVD Player", "ReleaseDate": "2006-11-15T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "35.88", "Category": { "ID": 2, "Name": "Electronics" } },
                        { "ID": 8, "Name": "LCD HDTV", "Description": "42 inch 1080p LCD with Built-in Blu-ray Disc Player", "ReleaseDate": "2008-05-08T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "1088.8", "Category": { "ID": 2, "Name": "Electronics" } }
                 	],
					before: function () {
						this.ds = new $.ig.DataSource({ 
							filtering: { type: "local", enabled: true }, 
							summaries: { type: "local" },
							dataSource: this.northwindProductsJSON,
							schema: { fields: [{
											name: "ID", type: "number"
										}, {
											name: "Name", type: "string"
										}, {
											name: "Description", type: "string"
										}, {
											name: "ReleaseDate", type: "date"
										}]
							}
						}).dataBind();
						this.dsWithFormatter = new $.ig.DataSource({ 
							filtering: { type: "local", enabled: true },
							summaries: { type: "local" },
							dataSource: this.northwindProductsJSON,
							schema: {	fields: [{
												name: "ID", type: "number"
										}, {
												name: "Name", type: "string", formatter: function (val, record) { return "Formatted " + val + "1"; }
										}, {
												name: "Description", type: "string"
										}, {
												name: "ReleaseDate", type: "date"
										}]
									}
							}).dataBind();
					}
					});
				
				QUnit.test("IgDataSource Test - filter all fields", function (assert) {
					assert.expect(1);
					this.ds.filterByText('cans');
					this.fd = this.ds.filteredData();
					assert.ok(this.fd.length === 2 &&
						this.fd[0].ID === 4 &&
						this.fd[1].ID === 6,
						"The filtered records are not the expected ones!");
				});
				QUnit.test("IgDataSource Test - filter all fields with two words", function (assert) {
					assert.expect(1);
					this.ds.filterByText('Plastic pack');
					this.fd = this.ds.filteredData();
					assert.ok(this.fd.length === 1 && this.fd[0].ID === 5,
						"The filtered records are not the expected ones!");
				});
				QUnit.test("IgDataSource Test - filter all fields with phrase", function (assert) {
					assert.expect(1);
					this.ds.filterByText('"Plastic Bottles"');
					this.fd = this.ds.filteredData();
					assert.ok(this.fd.length === 1 &&
						this.fd[0].ID === 5,
						"The filtered records are not the expected ones!");
				});
				QUnit.test("IgDataSource Test - filter all fields with word and formatter", function (assert) {
					assert.expect(1);
					this.dsWithFormatter.filterByText('milk1');
					this.fd = this.dsWithFormatter.filteredData();
					assert.ok(this.fd.length === 1 &&
						this.fd[0].ID === 1,
						"The filtered records are not the expected ones!");
				});
				QUnit.test("IgDataSource Test - filter all fields with two words and formatter", function (assert) {
					assert.expect(1);
					this.dsWithFormatter.filterByText('milk1 Formatted');
					this.fd = this.dsWithFormatter.filteredData();
					assert.ok(this.fd.length === 1 &&
						this.fd[0].ID === 1,
						"The filtered records are not the expected ones!");
				});
				QUnit.test("IgDataSource Test - filter all fields with phrase and formatter", function (assert) {
					assert.expect(1);
					this.dsWithFormatter.filterByText('"Formatted milk1"');
					this.fd = this.dsWithFormatter.filteredData();
					assert.ok(this.fd.length === 1 &&
						this.fd[0].ID === 1,
						"The filtered records are not the expected ones!");
				});

				QUnit.test("IgDataSource Test - filter all fields case insensitive", function (assert) {
					assert.expect(1);
					this.ds.filterByText('LCD HDTV');
					this.fd = this.ds.filteredData();
					assert.ok(this.fd.length === 1 && this.fd[0].ID === 8, "The filtered records are not the expected ones!");
				});
								
				QUnit.test("IgDataSource Test - filter subset of fields", function (assert) {
					assert.expect(1);
					this.dsWithFormatter.filterByText('Havina', [{
						name: "Description", type: "string"
					}]);
					this.fd = this.dsWithFormatter.filteredData();
					assert.ok(this.fd.length === 0, "The filtered records are not the expected ones!");
				});

				QUnit.test("IgDataSource Test - filter data source without schema", function (assert) {
					assert.expect(1);
					var dsNoSchema;
					dsNoSchema = new $.ig.DataSource({
						filtering: { type: "local", enabled: true, caseSensitive: true },
						summaries: { type: "local" },
						dataSource: this.northwindProductsJSON,
						schema: {
							//fields: []
						}
					}).dataBind();
					dsNoSchema.filterByText('LCD HDTV');
					this.fd = dsNoSchema.filteredData();
					assert.ok(this.fd.length === 0, "The filtered records are not the expected ones!");
				});

				QUnit.test("IgDataSource Test - filter all fields with overlapping expressions", function (assert) {
					assert.expect(1);
					this.dsWithFormatter.filterByText('Lemon Le Lemonade');
					this.fd = this.dsWithFormatter.filteredData();
					assert.ok(this.fd.length === 1 && this.fd[0].ID === 6, "The filtered records are not the expected ones!");
				});
				QUnit.test("IgDataSource Test - filter all fields with empty expression", function (assert) {
					assert.expect(1);
					this.dsWithFormatter.filterByText('');
					this.fd = this.dsWithFormatter.filteredData();
					assert.ok(this.fd.length === 9, "The filtered records are not the expected ones!");
				});
				QUnit.test("IgDataSource Test - filter all fields with empty expression", function (assert) {
					assert.expect(1);
					this.dsWithFormatter.filterByText('');
					this.fd = this.dsWithFormatter.filteredData();
					assert.ok(this.fd.length === 9, "The filtered records are not the expected ones!");
				});

				// Test bug 231214: When you update a formatted field it can't be found by the allFields search filtering.
				// Add tests when adding/removing/deleting record
				QUnit.test("IgDataSource Test - add/remove/delete record and test filterByText", function (assert) {
					assert.expect(3);
					//Create copy of the data so we don't alter it
					var dsBug231214, data = JSON.parse(JSON.stringify(this.northwindProductsJSON));
						dsBug231214 = new $.ig.DataSource({
							filtering: { type: "local", enabled: true },
							summaries: { type: "local" },
							dataSource: data,
							schema: {
								fields: [{
									name: "ID", type: "number"
								}, {
									name: "Name", type: "string", formatter: function (val, record) { return "Formatted " + val + "1"; }
								}, {
									name: "Description", type: "string"
								}, {
									name: "ReleaseDate", type: "date"
								}]
							}
						}).dataBind();
					// update value
					dsBug231214.setCellValue(1, "Name", "123", true);
					dsBug231214.filterByText("Formatted 123");
					this.fd = dsBug231214.filteredData();
					assert.ok(this.fd.length === 1 && this.fd[0].Name === "123", "Change cell in record with ID 1 and apply filtering (ONLY editted record should match filtering text)!");
					// remove record
					dsBug231214.deleteRow(8, true);
					dsBug231214.filterByText("LCD HDTV");
					assert.ok(dsBug231214.filteredData().length === 0, "Remove record with ID 8 and apply filtering(ONLY deleted record matches filtering text)!");
					// add new record
					dsBug231214.addRow(8,  { "ID": 9, "Name": "MyTest", "Description": "Description1", "ReleaseDate": "\/Date(1210204800000)\/"}, true);
					dsBug231214.filterByText("Formatted MyTest1");
					this.fd = dsBug231214.filteredData();
					assert.ok(this.fd.length === 1 && this.fd[0].ID === 9, "Add new record and search by text which could be found ONLY in the newly-added record!");
				});
				
				QUnit.test("Test _splitFilterExpression private method with mixed spaces and quotes", function (assert) {
					assert.expect(22);
					var splitExpr;					
					//Mixed single words with quoted phrases and one is at the end
					splitExpr = this.ds._splitFilterExpression('Cat "Dog food" Bird "Something else"');
					assert.equal(splitExpr[0], "Dog food", "The split expressions contians quoted phrases first");
					assert.equal(splitExpr[1], "Something else", "The split expressions contians quoted phrases first");
					assert.equal(splitExpr[2], "Cat", "The split expressions contian single words as well after quoted phrases");
					assert.equal(splitExpr[3], "Bird", "The split expressions contian single words as well after quoted phrases");
					assert.equal(splitExpr[4], "", "The split expressions contian a leftover empty string due to splitting");
					assert.equal(splitExpr.length, 5, "The split expressions contian single words as well after quoted phrases");
					
					//Only phrases with double quotes at both ends
					splitExpr = this.ds._splitFilterExpression('"Dog food" "Something else"');
					assert.equal(splitExpr[0], "Dog food", "The split expressions contians quoted phrase");
					assert.equal(splitExpr[1], "Something else", "The split expressions contians quoted phrase");
					assert.equal(splitExpr[2], "", "The split expressions contians two leftover empty strings due to splitting");
					assert.equal(splitExpr[3], "", "The split expressions contians two leftover empty strings due to splitting");
					assert.equal(splitExpr.length, 4, "The split expressions contian single words as well after quoted phrases");
					
					//Only phrases with double quotes at the the beginnig
					splitExpr = this.ds._splitFilterExpression('"Dog food" water');
					assert.equal(splitExpr[0], "Dog food", "The split expressions contians quoted phrase");
					assert.equal(splitExpr[1], "", "The split expressions contians a leftover empty string due to splitti");
					assert.equal(splitExpr[2], "water", "The split expressions contians word not in quotes");
					assert.equal(splitExpr.length, 3, "The split expressions contian single words as well after quoted phrases");
					
					//Only words with mistyped double quote
					splitExpr = this.ds._splitFilterExpression('Cat " dog');
					assert.equal(splitExpr[0], "Cat", "The split expressions contians word not in quotes");
					assert.equal(splitExpr[1], "\"", "The split expressions contians the mistyped double quote");
					assert.equal(splitExpr[2], "dog", "The split expressions contians word not in quotes");
					assert.equal(splitExpr.length, 3, "The split expressions contian single words as well after quoted phrases");

					//Only words with no double quotes
					splitExpr = this.ds._splitFilterExpression('Cat dog');
					assert.equal(splitExpr[0], "Cat", "The split expressions contians word not in quotes");
					assert.equal(splitExpr[1], "dog", "The split expressions contians word not in quotes");
					assert.equal(splitExpr.length, 2, "The split expressions contian single words as well after quoted phrases");
				});

				QUnit.test("Test _findMatchByFields private method", function (assert) {
					assert.expect(14);
					var dsFindMatchByFields, searchTokens, rec, formattedRecord,
						dFields = [{ name: "ID", type: "number" },
									{ name: "Name", type: "string" },
									{ name: "Description", type: "string" },
									{ name: "ReleaseDate", type: "date" },
									{ name: "Available", type: "bool"}];
									
						dsFindMatchByFields = new $.ig.DataSource({ 
						filtering: { type: "local", enabled: true }, 
						summaries: { type: "local" },
						dataSource: this.northwindProductsJSON,
						schema: { fields: dFields }
					}).dataBind();
					
					//Empty search token
					searchTokens = [""];
					rec = { ID: 2, Name: "John Tron", Description: "Some description ", ReleaseDate: new Date("Sun Oct 01 2000 03:00:00 GMT+0300 (FLE Daylight Time)"), Available: false };
					formattedRecord = null;
					assert.equal(dsFindMatchByFields._findMatchByFields(searchTokens, rec, dFields, formattedRecord), true, "");

					//Record with all fields null or empty strings
					searchTokens = ["dog"];
					rec = { ID: 2, Name: "", Description: "", ReleaseDate: null, Available: false };
					formattedRecord = null;
					assert.equal(dsFindMatchByFields._findMatchByFields(searchTokens, rec, dFields, formattedRecord), false, "");
					
					//No mathes with one word search token
					searchTokens = ["pork"];
					rec = { ID: 2, Name: "Inception", Description: "A mindblowing movie", ReleaseDate: new Date("Sun Oct 01 2000 03:00:00 GMT+0300 (FLE Daylight Time)"), Available: true };
					formattedRecord = null;
					assert.equal(dsFindMatchByFields._findMatchByFields(searchTokens, rec, dFields, formattedRecord), false, "");

					//No matches with multiple one word seach tokens
					searchTokens = ["fresh", "cat"];
					rec = { ID: 2, Name: "Cool breakfast", Description: "Contains milk and cornflakes", ReleaseDate: new Date("Sun Oct 01 2000 03:00:00 GMT+0300 (FLE Daylight Time)"), Available: true };
					formattedRecord = null;
					assert.equal(dsFindMatchByFields._findMatchByFields(searchTokens, rec, dFields, formattedRecord), false, "");
					
					//No matches with one word and multiple word seach tokens
					searchTokens = ["fresh milk", "cat"];
					rec = { ID: 2, Name: "Cool breakfast", Description: "Contains milk and cornflakes", ReleaseDate: new Date("Sun Oct 01 2000 03:00:00 GMT+0300 (FLE Daylight Time)"), Available: true };
					formattedRecord = null;
					assert.equal(dsFindMatchByFields._findMatchByFields(searchTokens, rec, dFields, formattedRecord), false, "");	

					//No matches multiple word token
					searchTokens = ["cool milk"];
					rec = { ID: 18, Name: "Cool breakfast", Description: "Contains milk and cool cornflakes", ReleaseDate: new Date("Sun Oct 08 2000 03:00:00 GMT+0300 (FLE Daylight Time)"), Available: true };
					formattedRecord = null;
					assert.equal(dsFindMatchByFields._findMatchByFields(searchTokens, rec, dFields, formattedRecord), false, "");					
					
					//Matches with boolean
					searchTokens = ["true"];
					rec = { ID: 2, Name: "Cool breakfast", Description: "Contains milk and cornflakes", ReleaseDate: new Date("Sun Oct 01 2000 03:00:00 GMT+0300 (FLE Daylight Time)"), Available: true };
					formattedRecord = null;
					assert.equal(dsFindMatchByFields._findMatchByFields(searchTokens, rec, dFields, formattedRecord), true, "");		
					
					//Matches with number
					searchTokens = ["18"];
					rec = { ID: 18, Name: "Cool breakfast", Description: "Contains milk and cornflakes", ReleaseDate: new Date("Sun Oct 01 2000 03:00:00 GMT+0300 (FLE Daylight Time)"), Available: true };
					formattedRecord = null;
					assert.equal(dsFindMatchByFields._findMatchByFields(searchTokens, rec, dFields, formattedRecord), true, "");					
					
					//Matches with date
					searchTokens = ["08 2000"];
					rec = { ID: 18, Name: "Cool breakfast", Description: "Contains milk and cornflakes", ReleaseDate: new Date("Sun Oct 08 2000 03:00:00 GMT+0300 (FLE Daylight Time)"), Available: true };
					formattedRecord = null;
					assert.equal(dsFindMatchByFields._findMatchByFields(searchTokens, rec, dFields, formattedRecord), true, "");		
					
					//Matches single word no case sensitive
					searchTokens = ["cool"];
					rec = { ID: 18, Name: "COOL breakfast", Description: "Contains cool milk and cornflakes", ReleaseDate: new Date("Sun Oct 08 2000 03:00:00 GMT+0300 (FLE Daylight Time)"), Available: true };
					formattedRecord = null;
					assert.equal(dsFindMatchByFields._findMatchByFields(searchTokens, rec, dFields, formattedRecord), true, "");				
					
					//Matches single word with multiple occuranses
					searchTokens = ["cool"];
					rec = { ID: 18, Name: "Cool breakfast", Description: "Contains cool milk and cool cornflakes", ReleaseDate: new Date("Sun Oct 08 2000 03:00:00 GMT+0300 (FLE Daylight Time)"), Available: true };
					formattedRecord = null;
					assert.equal(dsFindMatchByFields._findMatchByFields(searchTokens, rec, dFields, formattedRecord), true, "");	
					
					//Matches multiple word token
					searchTokens = ["cool milk"];
					rec = { ID: 18, Name: "Cool breakfast", Description: "Contains cool milk and cornflakes", ReleaseDate: new Date("Sun Oct 08 2000 03:00:00 GMT+0300 (FLE Daylight Time)"), Available: true };
					formattedRecord = null;
					assert.equal(dsFindMatchByFields._findMatchByFields(searchTokens, rec, dFields, formattedRecord), true, "");
					
					//Matches multiple word token with formatted record
					searchTokens = ["cool milk"];
					rec = { ID: 18, Name: "Cool breakfast", Description: "cornflakes", ReleaseDate: new Date("Sun Oct 08 2000 03:00:00 GMT+0300 (FLE Daylight Time)"), Available: true };
					formattedRecord = { Description: "Contains cool milk and cornflakes" };
					assert.equal(dsFindMatchByFields._findMatchByFields(searchTokens, rec, dFields, formattedRecord), true, "");

					//No match multiple word token with formatted record
					searchTokens = ["cool milk"];
					rec = { ID: 18, Name: "Cool breakfast", Description: "Contains cool milk and cornflakes", ReleaseDate: new Date("Sun Oct 08 2000 03:00:00 GMT+0300 (FLE Daylight Time)"), Available: true };
					formattedRecord = { Description: "cornflakes" };
					assert.equal(dsFindMatchByFields._findMatchByFields(searchTokens, rec, dFields, formattedRecord), false, "");
				});
				QUnit.test("Test _getFieldsWithFormatter private method with no schema set", function (assert) {
					assert.expect(2);
					var dsGetFieldsWithFormatter;					
					dsGetFieldsWithFormatter = new $.ig.DataSource({ 
						filtering: { type: "local", enabled: true }, 
						summaries: { type: "local" },
						dataSource: this.northwindProductsJSON
					}).dataBind();
					
					assert.equal(typeof dsGetFieldsWithFormatter._getFieldsWithFormatter(), "object", "");
					assert.equal(dsGetFieldsWithFormatter._getFieldsWithFormatter().length, 0, "");
				});
				QUnit.test("Test _getFieldsWithFormatter private method with no formatters set", function (assert) {
					assert.expect(2);
					var dsGetFieldsWithFormatter;					
					dsGetFieldsWithFormatter = new $.ig.DataSource({ 
						filtering: { type: "local", enabled: true }, 
						summaries: { type: "local" },
						dataSource: this.northwindProductsJSON,
						schema: { fields: [{ name: "ID", type: "number" },
									{ name: "Name", type: "string" },
									{ name: "Description", type: "string" },
									{ name: "ReleaseDate", type: "date" },
									{ name: "Available", type: "bool"}]
						}
					}).dataBind();
					
					assert.equal(typeof dsGetFieldsWithFormatter._getFieldsWithFormatter(), "object", "");
					assert.equal(dsGetFieldsWithFormatter._getFieldsWithFormatter().length, 0, "");
				});
				QUnit.test("Test _getFieldsWithFormatter private method with formatters set", function (assert) {
					assert.expect(2);
					var dsGetFieldsWithFormatter;					
					dsGetFieldsWithFormatter = new $.ig.DataSource({ 
						filtering: { type: "local", enabled: true }, 
						summaries: { type: "local" },
						dataSource: this.northwindProductsJSON,
						schema: { fields: [{ name: "ID", type: "number" },
									{ name: "Name", type: "string", formatter: function (val, record) { return "Formatted " + val + " :)"; } },
									{ name: "Description", type: "string", formatter: function (val, record) { return "Formatted " + val + " !"; } },
									{ name: "ReleaseDate", type: "date" },
									{ name: "Available", type: "bool"}]
						}
					}).dataBind();
					
					assert.equal(typeof dsGetFieldsWithFormatter._getFieldsWithFormatter(), "object", "");
					assert.equal(dsGetFieldsWithFormatter._getFieldsWithFormatter().length, 2, "");
				});
				QUnit.test("Test _generateFormattedRecords private method", function (assert) {
					assert.expect(13);
					var gdsGenerateFormattedRecords, formattedRecs;
					gdsGenerateFormattedRecords = new $.ig.DataSource({ 
						filtering: { type: "local", enabled: true }, 
						summaries: { type: "local" },
						dataSource: this.northwindProductsJSON,
						schema: { fields: [{ name: "ID", type: "number" },
									{ name: "Name", type: "string", formatter: function (val, record) { return "Funky " + val + " :)"; } },
									{ name: "Description", type: "string", formatter: function (val, record) { return "Formatted " + val + " !"; } },
									{ name: "ReleaseDate", type: "date" },
									{ name: "Available", type: "bool"}]
						}
					}).dataBind();
					
					gdsGenerateFormattedRecords._generateFormattedRecords();
					formattedRecs = gdsGenerateFormattedRecords.schema()._formattedRecords;
					assert.equal(formattedRecs[0]["ID"], undefined, "");
					assert.equal(formattedRecs[0]["Name"], "Funky Bread :)", "");
					assert.equal(formattedRecs[0]["Description"], "Formatted Whole grain bread !", "");
					assert.equal(formattedRecs[1]["Name"], "Funky Milk :)", "");
					assert.equal(formattedRecs[1]["Description"], "Formatted Low fat milk !", "");
					assert.equal(formattedRecs[5]["Name"], "Funky Cranberry Juice :)", "");
					assert.equal(formattedRecs[5]["Description"], "Formatted 16-Ounce Plastic Bottles (Pack of 12) !", "");
					assert.equal(formattedRecs[7]["ID"], undefined, "");
					assert.equal(formattedRecs[7]["Price"], undefined, "");
					assert.equal(formattedRecs[7]["Name"], "Funky DVD Player :)", "");
					assert.equal(formattedRecs[7]["Description"], "Formatted 1080P Upconversion DVD Player !", "");
					assert.equal(formattedRecs[8]["Name"], "Funky LCD HDTV :)", "");
					assert.equal(formattedRecs[8]["Description"], "Formatted 42 inch 1080p LCD with Built-in Blu-ray Disc Player !", "");
				});
