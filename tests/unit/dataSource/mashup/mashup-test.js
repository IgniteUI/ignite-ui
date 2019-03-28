    QUnit.module("igDataSource Mashup", {
        util: $.ig.TestUtil,
        data1: [
            { ProductID: 0, OrderedBy: "Angel", NutritionRank: "1" },
            { ProductID: 1, OrderedBy: "John", NutritionRank: "10" },
            { ProductID: 2, OrderedBy: "Jason", NutritionRank: "5" }
        ],
        data2: [
            { ID: 0, Name: "Angel", Price: 1 },
            { ID: 1, Name: "John", Price: 10 },
            { ID: 2, Name: "Jason", Price: 5 },
            { ID: 3, Name: "Alex", Price: 6.5 },
            { ID: 4, Name: "Taz", Price: 10.123 }
        ],
        data4: [
            [ 0, "Angel", "1" ],
            [ 1, "John", "10" ],
            [ 2, "Jason", "5" ]
        ],
        data5: [
            [ 0, "Angel", 1 ],
            [ 1, "John", 10 ],
            [ 2, "Jason", 5 ],
            [ 3, "Alex", 6.5 ],
            [ 4, "Taz", 10.123 ]
        ],
        data3: {
            "d": [
                {
                    "__metadata": {
                        "uri": "http://services.odata.org/OData/OData.svc/Products(0)", "type": "ODataDemo.Product"
                    }, "ID": 0, "Name": "Bread", "Description": "Whole grain bread", "ReleaseDate": "\/Date(694224000000)\/", "DiscontinuedDate": null, "Rating": 4, "Price": "2.5", "Category": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(0)/Category"
                        }
                    }, "Supplier": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(0)/Supplier"
                        }
                    }
                },
                {
                    "__metadata": {
                        "uri": "http://services.odata.org/OData/OData.svc/Products(1)", "type": "ODataDemo.Product"
                    }, "ID": 1, "Name": "Milk", "Description": "Low fat milk", "ReleaseDate": "\/Date(812505600000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "3.5", "Category": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(1)/Category"
                        }
                    }, "Supplier": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(1)/Supplier"
                        }
                    }
                },
                {
                    "__metadata": {
                        "uri": "http://services.odata.org/OData/OData.svc/Products(2)", "type": "ODataDemo.Product"
                    }, "ID": 2, "Name": "Vint soda", "Description": "Americana Variety - Mix of 6 flavors", "ReleaseDate": "\/Date(970358400000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "20.9", "Category": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(2)/Category"
                        }
                    }, "Supplier": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(2)/Supplier"
                        }
                    }
                },
                {
                    "__metadata": {
                        "uri": "http://services.odata.org/OData/OData.svc/Products(3)", "type": "ODataDemo.Product"
                    }, "ID": 3, "Name": "Havina Cola", "Description": "The Original Key Lime Cola", "ReleaseDate": "\/Date(1128124800000)\/", "DiscontinuedDate": "\/Date(1159660800000)\/", "Rating": 3, "Price": "19.9", "Category": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(3)/Category"
                        }
                    }, "Supplier": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(3)/Supplier"
                        }
                    }
                },
                {
                    "__metadata": {
                        "uri": "http://services.odata.org/OData/OData.svc/Products(4)", "type": "ODataDemo.Product"
                    }, "ID": 4, "Name": "Fruit Punch", "Description": "Mango flavor, 8.3 Ounce Cans (Pack of 24)", "ReleaseDate": "\/Date(1041724800000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "22.99", "Category": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(4)/Category"
                        }
                    }, "Supplier": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(4)/Supplier"
                        }
                    }
                },
                {
                    "__metadata": {
                        "uri": "http://services.odata.org/OData/OData.svc/Products(5)", "type": "ODataDemo.Product"
                    }, "ID": 5, "Name": "Cranberry Juice", "Description": "16-Ounce Plastic Bottles (Pack of 12)", "ReleaseDate": "\/Date(1154649600000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "22.8", "Category": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(5)/Category"
                        }
                    }, "Supplier": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(5)/Supplier"
                        }
                    }
                },
                {
                    "__metadata": {
                        "uri": "http://services.odata.org/OData/OData.svc/Products(6)", "type": "ODataDemo.Product"
                    }, "ID": 6, "Name": "Pink Lemonade", "Description": "36 Ounce Cans (Pack of 3)", "ReleaseDate": "\/Date(1162684800000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "18.8", "Category": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(6)/Category"
                        }
                    }, "Supplier": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(6)/Supplier"
                        }
                    }
                },
                {
                    "__metadata": {
                        "uri": "http://services.odata.org/OData/OData.svc/Products(7)", "type": "ODataDemo.Product"
                    }, "ID": 7, "Name": "DVD Player", "Description": "1080P Upconversion DVD Player", "ReleaseDate": "\/Date(1163548800000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "35.88", "Category": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(7)/Category"
                        }
                    }, "Supplier": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(7)/Supplier"
                        }
                    }
                },
                {
                    "__metadata": {
                        "uri": "http://services.odata.org/OData/OData.svc/Products(8)", "type": "ODataDemo.Product"
                    }, "ID": 8, "Name": "LCD HDTV", "Description": "42 inch 1080p LCD with Built-in Blu-ray Disc Player", "ReleaseDate": "\/Date(1210204800000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "1088.8", "Category": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(8)/Category"
                        }
                    }, "Supplier": {
                        "__deferred": {
                            "uri": "http://services.odata.org/OData/OData.svc/Products(8)/Supplier"
                        }
                    }
                }
            ]
        },
        products: [
			{ "ID": 0, "Name": "Bread", "Description": "Whole grain bread", "ReleaseDate": "\/Date(694224000000)\/", "DiscontinuedDate": null, "Rating": 4, "Price": "2.5", "CategoryID": 0 },
			{ "ID": 1, "Name": "Milk", "Description": "Low fat milk", "ReleaseDate": "\/Date(812505600000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "3.5", "CategoryID": 1 },
			{ "ID": 2, "Name": "Vint Soda", "Description": "Americana Variety - Mix of 6 flavors", "ReleaseDate": "\/Date(970358400000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "20.9", "CategoryID": 1 },
			{ "ID": 3, "Name": "Havina Cola", "Description": "The Original Key Lime Cola", "ReleaseDate": "\/Date(1128124800000)\/", "DiscontinuedDate": "\/Date(1159660800000)\/", "Rating": 3, "Price": "19.9", "CategoryID": 1 },
			{ "ID": 4, "Name": "Fruit Punch", "Description": "Mango flavor, 8.3 Ounce Cans (Pack of 24)", "ReleaseDate": "\/Date(1041724800000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "22.99", "CategoryID": 1 },
			{ "ID": 5, "Name": "Cranberry Juice", "Description": "16-Ounce Plastic Bottles (Pack of 12)", "ReleaseDate": "\/Date(1154649600000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "22.8", "CategoryID": 1 },
			{ "ID": 6, "Name": "Pink Lemonade", "Description": "36 Ounce Cans (Pack of 3)", "ReleaseDate": "\/Date(1162684800000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "18.8", "CategoryID": 1 },
			{ "ID": 7, "Name": "DVD Player", "Description": "1080P Upconversion DVD Player", "ReleaseDate": "\/Date(1163548800000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "35.88", "CategoryID": 2 },
			{ "ID": 8, "Name": "LCD HDTV", "Description": "42 inch 1080p LCD with Built-in Blu-ray Disc Player", "ReleaseDate": "\/Date(1210204800000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "1088.8", "CategoryID": 2 }
		],
        productsMany:  [
            { "ID": 0, "Name": "Bread", "Description": "Whole grain bread", "ReleaseDate": "\/Date(694224000000)\/", "DiscontinuedDate": null, "Rating": 4, "Price": "2.5", "CategoryID": [0, 1] },
            { "ID": 1, "Name": "Milk", "Description": "Low fat milk", "ReleaseDate": "\/Date(812505600000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "3.5", "CategoryID": [2] },
            { "ID": 2, "Name": "Vint Soda", "Description": "Americana Variety - Mix of 6 flavors", "ReleaseDate": "\/Date(970358400000)\/", "DiscontinuedDate": null, "Rating": 3, "Price": "20.9", "CategoryID": [1, 2] }
        ],
        categories: [
            { "CatID": 0, "CategoryName": "Food" },
            { "CatID": 1, "CategoryName": "Beverages" },
            { "CatID": 2, "CategoryName": "Electronics" }
        ],
        ds1: null,
        ds2: null,
        ds3: null,
        before: function(){
            $.mockjaxSettings.logging = 0; 
            $.mockjax({
                url: 'http://services.odata.org/OData/OData.svc/Products?$format=json',
                contentType: 'text/json',
                responseText: {
                    status: 'success',
                    data: this.data3
                }
            });
        }
    });

    QUnit.test("Test Mashup scenario 1: combining local data sources with PKs", function (assert) {
        assert.expect(13);
        var view, ds = new $.ig.MashupDataSource({
            dataSource:  [
                {
                    dataSource: this.data1,
                    primaryKey: "ProductID"
                },
                {
                    dataSource: this.data2,
                    primaryKey: "ID",
                    schema: {
                        fields: [
                            { name: "Price" }, { name: "Name" }, { name: "ID" }
                        ]
                    }
                }
            ]
        });
        ds.dataBind();
        view = ds.dataView();
        assert.equal(view.length, 5, "Length should be 5.");
        // check first record that should be merged
        assert.equal(view[0]["ID"], 0, "PK ID: 0");
        assert.equal(view[0]["ProductID"], 0, "Merged PK ProductID: 0");
        assert.equal(view[0]["Price"], 1, "Merged Price 1");
        assert.equal(view[0]["Name"], "Angel", "Merged Name: Angel");
        assert.equal(view[0]["OrderedBy"], "Angel", "Merged OrderedBy: Angel");
        assert.equal(view[0]["NutritionRank"], "1", "Merged NutritionRank: '1'");
        // check last record that should contain only second data source props
        assert.equal(view[4]["ID"], 4, "PK ID: 4");
        assert.equal(view[4]["ProductID"], undefined, "Merged PK ProductID: undefined");
        assert.equal(view[4]["Price"], 10.123, "Merged Price 10.123");
        assert.equal(view[4]["Name"], "Taz", "Merged Name: Taz");
        assert.equal(view[4]["OrderedBy"], undefined, "Merged OrderedBy: undefined");
        assert.equal(view[4]["NutritionRank"], undefined, "Merged NutritionRank: undefined");
    });
    QUnit.test("Test Mashup scenario 2: combining local data sources without PKs", function (assert) {
        assert.expect(13);
        var view, ds = new $.ig.MashupDataSource({
            dataSource:  [
                {
                    dataSource: this.data1
                },
                {
                    dataSource: this.data2,
                    schema: {
                        fields: [
                            { name: "Price" }, { name: "Name" }, { name: "ID" }
                        ]
                    }
                }
            ]
        });
        ds.dataBind();
        view = ds.dataView();
        assert.equal(view.length, 5, "Length should be 5.");
        // check first record that should be merged
        assert.equal(view[0]["ID"], 0, "PK ID: 0");
        assert.equal(view[0]["ProductID"], 0, "Merged PK ProductID: 0");
        assert.equal(view[0]["Price"], 1, "Merged Price 1");
        assert.equal(view[0]["Name"], "Angel", "Merged Name: Angel");
        assert.equal(view[0]["OrderedBy"], "Angel", "Merged OrderedBy: Angel");
        assert.equal(view[0]["NutritionRank"], "1", "Merged NutritionRank: '1'");
        // check last record that should contain only second data source props
        assert.equal(view[4]["ID"], 4, "PK ID: 4");
        assert.equal(view[4]["ProductID"], undefined, "Merged PK ProductID: undefined");
        assert.equal(view[4]["Price"], 10.123, "Merged Price 10.123");
        assert.equal(view[4]["Name"], "Taz", "Merged Name: Taz");
        assert.equal(view[4]["OrderedBy"], undefined, "Merged OrderedBy: undefined");
        assert.equal(view[4]["NutritionRank"], undefined, "Merged NutritionRank: undefined");
    });
    QUnit.test("Test Mashup scenario 3: combining local array data sources", function (assert) {
        assert.expect(13);
        var view, ds = new $.ig.MashupDataSource({
            dataSource:  [
                {
                    dataSource: this.data4
                },
                {
                    dataSource: this.data5
                }
            ]
        });
        ds.dataBind();
        view = ds.dataView();
        assert.equal(view.length, 5, "Length should be 5.");
        // check first record that should be merged
        assert.equal(view[0][0], 0, "Merged 0: 0");
        assert.equal(view[0][1], "Angel", "Merged 1: Angel");
        assert.equal(view[0][2], "1", "Merged 2: '1'");
        assert.equal(view[0][3], 0, "Merged 3: 0");
        assert.equal(view[0][4], "Angel", "Merged 4: Angel");
        assert.equal(view[0][5], 1, "Merged 5: 1");
        // check last record that should contain only second data source props
        assert.equal(view[4][0], "", "Merged 0: empty string since no type is defined");
        assert.equal(view[4][1], "", "Merged 1: empty string since no type is defined");
        assert.equal(view[4][2], "", "Merged 2: empty string since no type is defined");
        assert.equal(view[4][3], 4, "Merged 3: 4");
        assert.equal(view[4][4], "Taz", "Merged 4: Taz");
        assert.equal(view[4][5], 10.123, "Merged 5: 10.123");
    });
    QUnit.test("Test Mashup scenario 4: combining local array data sources with schemas", function (assert) {
        assert.expect(7);
        var view, ds = new $.ig.MashupDataSource({
            // array data sources with schemas become object data sources
            dataSource:  [
                {
                    dataSource: this.data4,
                    schema: {
                        fields: [
                            { name: 0, type: "number" },
                            { name: 1, type: "string" }
                        ]
                    }
                },
                {
                    dataSource: this.data5,
                    schema: {
                        fields: [
                            { name: 2, type: "number" }
                        ]
                    }
                }
            ]
        });
        ds.dataBind();
        view = ds.dataView();
        assert.equal(view.length, 5, "Length should be 5.");
        // check first record that should be merged
        assert.equal(view[0][0], 0, "Merged 0: 0");
        assert.equal(view[0][1], "Angel", "Merged 1: Angel");
        assert.equal(view[0][2], 0, "Merged 2: 0");
        // check last record that should contain only second data source props
        assert.equal(view[4][0], undefined, "Merged 0: empty string since no type is defined");
        assert.equal(view[4][1], undefined, "Merged 1: empty string since no type is defined");
        assert.equal(view[4][2], 4, "Merged 2: 4");
    });
    QUnit.test("Test Mashup scenario 5: combining local data sources through PK - FK relationship", function (assert) {
        assert.expect(13);
        var view, ds = new $.ig.MashupDataSource({
            dataSource:  [
                {
                    dataSource: [
                        { ProductID: 3, OrderedBy: "Jason", NutritionRank: "1" },
                        { ProductID: 4, OrderedBy: "John", NutritionRank: "10" },
                        { ProductID: 5, OrderedBy: "Angel", NutritionRank: "5" }
                    ],
                    primaryKey: "OrderedBy"
                },
                {
                    dataSource: this.data2,
                    primaryKey: "Name",
                    foreignKey: "OrderedBy",
                    schema: {
                        fields: [
                            { name: "Price" }, { name: "Name" }, { name: "ID" }
                        ]
                    }
                },
                {
                    // adding the same datasource essentially doesn't change the result but
                    // adds an additional reference in the fkeyhash which increases the coverage
                    // and could prevent some regressions when we are merging more than 2 data sources
                    dataSource: this.data2,
                    primaryKey: "Name",
                    foreignKey: "OrderedBy",
                    schema: {
                        fields: [
                            { name: "Price" }, { name: "Name" }, { name: "ID" }
                        ]
                    }
                }
            ]
        });
        ds.dataBind();
        view = ds.dataView();
        assert.equal(view.length, 3, "Length should be 3.");
        // check first record that should be merged
        assert.equal(view[0]["ID"], 2, "PK ID: 2");
        assert.equal(view[0]["ProductID"], 3, "Merged PK ProductID: 3");
        assert.equal(view[0]["Price"], 5, "Merged Price 5");
        assert.equal(view[0]["Name"], "Jason", "Merged Name: Jason");
        assert.equal(view[0]["OrderedBy"], "Jason", "Merged OrderedBy: Jason");
        assert.equal(view[0]["NutritionRank"], "1", "Merged NutritionRank: '1'");
        assert.equal(view[2]["ID"], 0, "PK ID: 0");
        assert.equal(view[2]["ProductID"], 5, "Merged PK ProductID: 5");
        assert.equal(view[2]["Price"], 1, "Merged Price 1");
        assert.equal(view[2]["Name"], "Angel", "Merged Name: Angel");
        assert.equal(view[2]["OrderedBy"], "Angel", "Merged OrderedBy: Angel");
        assert.equal(view[2]["NutritionRank"], "5", "Merged NutritionRank: '5'");
    });
    QUnit.test("Test Mashup scenario 6: combining local & remote data sources", function (assert) {
        assert.expect(3);
        var done = assert.async(),
            view, ds = new $.ig.MashupDataSource({
            dataSource:  [
                {
                    dataSource: this.data1
                },
                {
                    dataSource: "http://services.odata.org/OData/OData.svc/Products?$format=json",
                    responseDataType: "json",
                    schema: {
                        fields: [
                            { name: "Price" }, { name: "Name" }, { name: "ID" }
                        ],
                        searchField: "data.d"
                    }
                }
            ],
            callback: function () {
                done();
                view = arguments[2].dataView();
                assert.equal(view.length, 9, 9);
                assert.equal(view[0]["OrderedBy"], "Angel", "Angel");
                assert.equal(view[0]["Name"], "Bread", "Bread");
            }
        });
        ds.dataBind();
    });
    QUnit.test("Test Mashup scenario 7: combining igDataSource instances", function (assert) {
        assert.expect(13);
        var view, ds1 = new $.ig.DataSource({
            dataSource: this.data1,
            primaryKey: "ProductID"
        }), dsm = new $.ig.MashupDataSource({
            dataSource:  [
                ds1,
                {
                    dataSource: new $.ig.DataSource({
                        dataSource: this.data2,
                        primaryKey: "ID",
                        schema: {
                            fields: [
                                { name: "Price" }, { name: "Name" }, { name: "ID" }
                            ]
                        }
                    })
                }
            ]
        });
        dsm.dataBind();
        view = dsm.dataView();
        assert.equal(view.length, 5, "Length should be 5.");
        // check first record that should be merged
        assert.equal(view[0]["ID"], 0, "PK ID: 0");
        assert.equal(view[0]["ProductID"], 0, "Merged PK ProductID: 0");
        assert.equal(view[0]["Price"], 1, "Merged Price 1");
        assert.equal(view[0]["Name"], "Angel", "Merged Name: Angel");
        assert.equal(view[0]["OrderedBy"], "Angel", "Merged OrderedBy: Angel");
        assert.equal(view[0]["NutritionRank"], "1", "Merged NutritionRank: '1'");
        // check last record that should contain only second data source props
        assert.equal(view[4]["ID"], 4, "PK ID: 4");
        assert.equal(view[4]["ProductID"], undefined, "Merged PK ProductID: undefined");
        assert.equal(view[4]["Price"], 10.123, "Merged Price 10.123");
        assert.equal(view[4]["Name"], "Taz", "Merged Name: Taz");
        assert.equal(view[4]["OrderedBy"], undefined, "Merged OrderedBy: undefined");
        assert.equal(view[4]["NutritionRank"], undefined, "Merged NutritionRank: undefined");
    });
    QUnit.test("Test Mashup scenario 7: ignorePartialRecords = true", function (assert) {
        assert.expect(3);
        var done = assert.async(),
            view, ds = new $.ig.MashupDataSource({
            dataSource: [
                {
                    dataSource: this.data1,
                    primaryKey: "ProductID"
                },
                {
                    dataSource: "http://services.odata.org/OData/OData.svc/Products?$format=json",
                    responseDataType: "json",
                    schema: {
                        fields: [
                            { name: "Price" }, { name: "Name" }, { name: "ID" }
                        ],
                        searchField: "data.d"
                    },
                    primaryKey: "ID"
                }
            ],
            ignorePartialRecords: true,
            callback: function () {
                done();
                view = arguments[2].dataView();
                assert.equal(view.length, 3, 3);
                assert.equal(view[0]["OrderedBy"], "Angel", "Angel");
                assert.equal(view[0]["Name"], "Bread", "Bread");
            }
        });
        ds.dataBind();
    });
    QUnit.test("Test Mashup scenario 8: combining json data sources based on primaryKey-foreignKey relation.", function (assert) {
        assert.expect(9);
        var ds = new $.ig.MashupDataSource({
            primaryKey: "ID",
            dataSource: [
                {
                    dataSource: this.products,
                    primaryKey: "ID"
                },
                {
                    dataSource: this.categories,
                    primaryKey: "CatID",
                    foreignKey: "CategoryID"
                }
            ]
        }),
        self = this;
        ds.dataBind();
        for (var i = 0; i < ds.dataView().length; i++) {
            var id = this.products[i].CategoryID;
            var expectedValue = $(this.categories).filter(function(index){
                return self.categories[index].CatID === id;
            }).first()[0].CategoryName;
            assert.equal(ds.dataView()[i].CategoryName, expectedValue, "Check if mashed dataSource contains the correct values from the second data source");
        }
    });
    QUnit.test("Test Mashup scenario 9: verify that after updating the foreignKey value the fields from the second datasource are properly updated and the transaction contains the combined values.", function (assert) {
        assert.expect(7);
        var ds = new $.ig.MashupDataSource({
            primaryKey: "ID",
            dataSource: [
                {
                    dataSource: this.products,
                    primaryKey: "ID"
                },
                {
                    dataSource: this.categories,
                    primaryKey: "CatID",
                    foreignKey: "CategoryID"
                }
            ]
        });
        ds.dataBind();
        //setCellValue
        ds.setCellValue(0, "CategoryID", 1, true);
        assert.equal(ds.data()[0].CategoryName, "Beverages", "CategoryName should be updated if the foreign key is updated.");
        
        //updateRow
        var t = ds.updateRow(1, {CategoryID: 2}, true);

        assert.equal(ds.data()[1].CategoryName, "Electronics", "CategoryName should be updated if the foreign key is updated.");
        assert.equal(t.row.CategoryName, "Electronics", "Transaction should contain the updated value of the record.");

        //insertRow
        t = ds.insertRow(100, { "ID": 100, "Name": "Corn", "Description": "", "ReleaseDate": "", "DiscontinuedDate": null, "Rating": 4, "Price": "2.5", "CategoryID": 0 }, 0, true);
        assert.equal(ds.data()[0].CategoryName, "Food", "CategoryName should be populated when a new record with the FK value is added.");
        assert.equal(t.row.CategoryName, "Food", "CategoryName should be populated in the transactions as well.");

        //addRow
        t = ds.addRow(1000, { "ID": 1000, "Name": "Corn", "Description": "", "ReleaseDate": "", "DiscontinuedDate": null, "Rating": 4, "Price": "2.5", "CategoryID": 2 }, true);
        var lastIndex = ds.data().length - 1;
        assert.equal(ds.data()[lastIndex].CategoryName, "Electronics", "CategoryName should be populated when a new record with the FK value is added.");
        assert.equal(t.row.CategoryName, "Electronics", "CategoryName should be populated in the transactions as well.");
    });
    QUnit.test("Test Mashup scenario 10: combining json data sources based on primaryKey-foreignKey relation when there is one-to-many relation.", function (assert) {
        assert.expect(5);
        var ds = new $.ig.MashupDataSource({
            primaryKey: "ID",
            dataSource: [
                {
                    dataSource: this.productsMany,
                    primaryKey: "ID"
                },
                {
                    dataSource: this.categories,
                    primaryKey: "CatID",
                    foreignKey: "CategoryID"
                }
            ]
        }),
        self = this;
        ds.dataBind();
        for (var i = 0; i < ds.data().length; i++) {

            var arrayIds = ds.data()[i].CategoryID;
            var arrayCatNames = ds.data()[i].CategoryName;
            for (var j = 0; j < arrayIds.length; j++) {
                var id = arrayIds[j];
                var catName = $(this.categories).filter(function (index) {
                    return self.categories[index].CatID === id;
                }).first()[0].CategoryName;
                assert.ok(arrayCatNames.contains(catName), "CategoryName should be an array and it should contain all CategoryName field values relatedt to the values in the CategoryID array.");
            }
        }
    });
    QUnit.test("Test Mashup scenario 11:  verify that after updating the foreignKey array the fields from the second datasource are properly updated and the transaction contains the combined values.", function (assert) {
        assert.expect(11);
        var ds = new $.ig.MashupDataSource({
            primaryKey: "ID",
            dataSource: [
                {
                    dataSource: this.productsMany,
                    primaryKey: "ID"
                },
                {
                    dataSource: this.categories,
                    primaryKey: "CatID",
                    foreignKey: "CategoryID"
                }
            ]
        });
        ds.dataBind();

        //setCellValue
        ds.setCellValue(0, "CategoryID", [1], true);
        assert.equal(ds.data()[0].CategoryName[0], "Beverages", "CategoryName should be updated if the foreign key is updated.");

        //updateRow
        var t = ds.updateRow(1, { CategoryID: [0, 1, 2] }, true);

        assert.equal(ds.data()[1].CategoryName.length, 3, "CategoryName should contain 3 items.");
        assert.equal(ds.data()[1].CategoryName[0], "Food", "CategoryName should be updated if the foreign key is updated.");
        assert.equal(ds.data()[1].CategoryName[1], "Beverages", "CategoryName should be updated if the foreign key is updated.");
        assert.equal(ds.data()[1].CategoryName[2], "Electronics", "CategoryName should be updated if the foreign key is updated.");
        assert.equal(t.row.CategoryName.length, 3, "Transaction should contain the updated CategoryName values of the record.");

        //insertRow
        t = ds.insertRow(100, { "ID": 100, "Name": "Corn", "Description": "", "ReleaseDate": "", "DiscontinuedDate": null, "Rating": 4, "Price": "2.5", "CategoryID": [1, 0] }, 0, true);
        assert.equal(ds.data()[0].CategoryName[0], "Beverages", "CategoryName should be populated when a new record with the FK value is added.");
        assert.equal(ds.data()[0].CategoryName[1], "Food", "CategoryName should be populated when a new record with the FK value is added.");

        assert.equal(t.row.CategoryName.length, 2, "CategoryName should be populated in the transactions and should be an array with all items related to the ones in CategoryID.");

        //addRow
        t = ds.addRow(1000, { "ID": 1000, "Name": "Corn", "Description": "", "ReleaseDate": "", "DiscontinuedDate": null, "Rating": 4, "Price": "2.5", "CategoryID": [2] }, true);
        var lastIndex = ds.data().length - 1;
        assert.equal(ds.data()[lastIndex].CategoryName[0], "Electronics", "CategoryName should be populated when a new record with the FK value is added.");
        assert.equal(t.row.CategoryName[0], "Electronics", "CategoryName should be populated in the transactions as well.");

    });
    QUnit.test("Test addRow when rowAdded option is defined", function (assert) {
        assert.expect(2);
        var ds = new $.ig.MashupDataSource({
            primaryKey: "ID",
            dataSource: [
                {
                    dataSource: this.productsMany,
                    primaryKey: "ID"
                },
                {
                    dataSource: this.categories,
                    primaryKey: "CatID",
                    foreignKey: "CategoryID"
                }
            ]
        }),
        self = this,
        done = assert.async();
        ds.dataBind();
        var rowAddedFuncCalled = false;
        ds.settings.callee = function () {
        };

        ds.settings.rowAdded = function () {
            rowAddedFuncCalled = true;
        };
        ds.addRow(100, { "ID": 100, "Name": "Bread", "Price": 2.5, CategoryID:1 }, true);
        this.util.wait(100).then(function(){
            assert.ok(rowAddedFuncCalled, "The rowAdded function should be called.");

            ds.settings.callee = null;
            rowAddedFuncCalled = false;
            ds.addRow(101, { "ID": 100, "Name": "Bread", "Price": 2.5, CategoryID: 1 }, true);
            return self.util.wait(100);
            }).then(function(){
                assert.ok(rowAddedFuncCalled, "The rowAdded function should be called.");
                done();
            });
         });
    QUnit.test("Test insertRow when rowInserted option is defined", function (assert) {
        assert.expect(2);
        var self = this;
        var ds = new $.ig.MashupDataSource({
            primaryKey: "ID",
            dataSource: [
                {
                    dataSource: this.productsMany,
                    primaryKey: "ID"
                },
                {
                    dataSource: this.categories,
                    primaryKey: "CatID",
                    foreignKey: "CategoryID"
                }
            ]
        });
        ds.dataBind();
        var rowInsertedFuncCalled = false;

        ds.settings.callee = function () {
        };
        ds.settings.rowInserted = function () {
            rowInsertedFuncCalled = true;
        };
         ds.insertRow(1001, { "ID": 1001, "Name": "Bread", "Price": 2.5, CategoryID: 1 }, 2, false);
        var done = assert.async();
        this.util.wait(100).then(function () {
            assert.ok(rowInsertedFuncCalled, "rowInserted function should be called.");
            rowInsertedFuncCalled = false;
            ds.settings.callee = null;
            ds.insertRow(1001, { "ID": 1001, "Name": "Bread", "Price": 2.5, CategoryID: 1 }, 2, false);
            return self.util.wait(100);
        }).then(function () {
            assert.ok(rowInsertedFuncCalled, "rowInserted function should be called.")
            done();
        });    
    });
    QUnit.test("Test updateRow when rowUpdated option is defined", function (assert) {
        assert.expect(2);
        var done = assert.async(),
            self = this,
            ds = new $.ig.MashupDataSource({
            primaryKey: "ID",
            dataSource: [
                {
                    dataSource: this.products,
                    primaryKey: "ID"
                },
                {
                    dataSource: this.categories,
                    primaryKey: "CatID",
                    foreignKey: "CategoryID"
                }
            ]
        });
        ds.dataBind();

        var rowUpdatedFuncCalled = false;

        ds.settings.callee = function () {
        };
        ds.settings.rowUpdated = function () {
            rowUpdatedFuncCalled = true;
        };

        ds.updateRow(0, { "ID": 0, "Name": "Update", "Price": 2.5, "CategoryID": 1 }, false);
        this.util.wait(100).then(function () {
            assert.ok(rowUpdatedFuncCalled, "rowInserted function should be called.");
            rowUpdatedFuncCalled = false;
            ds.settings.callee = null;
            ds.updateRow(0, { "ID": 0, "Name": "Updated2", "Price": 2.5, "CategoryID" : 1 }, false);
            return self.util.wait(100);
        }).then(function () {
                assert.ok(rowUpdatedFuncCalled, "rowInserted function should be called.")
                done();
            });

    });