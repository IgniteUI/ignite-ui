QUnit.module("igDataSource Hierarchical", {
		data1: {
			"Products": [
				{
					"ProductID": 1,
					"UnitsInStock": 762,
					"ProductDescription": "mvoaivcjcww",
					"UnitPrice": 292.20739439698281,
					"DateAdded": "1998-12-29T16:08:19.897",
					"Suppliers": [
						{ "SupplierID": 1, "ProductID": 1, "Capacity": 942 }
					]
				},
				{
					"ProductID": 2,
					"UnitsInStock": 844,
					"ProductDescription": "usbylhl",
					"UnitPrice": 65.586992104345455,
					"DateAdded": "2003-02-18T22:01:51.506",
					"Suppliers": [
						{ "SupplierID": 1, "ProductID": 2, "Capacity": 464 }
					]
				},
				{
					"ProductID": 3,
					"UnitsInStock": 950,
					"ProductDescription": "nrb ",
					"UnitPrice": 833.54804889929858,
					"DateAdded": "2009-10-28T07:24:56.14",
					"Suppliers": [
						{ "SupplierID": 1, "ProductID": 3, "Capacity": 464 }
					]
				}
			],
			"TotalRecordsCount": 3,
			"Metadata": {}
		},
	    data2:  {
			"Products": [
				{
					"ProductID": 1,
					"UnitsInStock": 762,
					"ProductDescription": "mvoaivcjcww",
					"UnitPrice": 292.20739439698281,
					"DateAdded": "1998-12-29T16:08:19.897",
					"Suppliers": {
						d: [{ "SupplierID": 1, "ProductID": 1, "Capacity": 942 }]
					}
				},
				{
					"ProductID": 2,
					"UnitsInStock": 844,
					"ProductDescription": "usbylhl",
					"UnitPrice": 65.586992104345455,
					"DateAdded": "2003-02-18T22:01:51.506",
					"Suppliers": {
						d: [{ "SupplierID": 1, "ProductID": 2, "Capacity": 464 }]
					}
				},
				{
					"ProductID": 3,
					"UnitsInStock": 950,
					"ProductDescription": "nrb ",
					"UnitPrice": 833.54804889929858,
					"DateAdded": "2009-10-28T07:24:56.14",
					"Suppliers": {
						d: [{ "SupplierID": 1, "ProductID": 3, "Capacity": 464 }]
					}
				}
			],
			"TotalRecordsCount": 3,
			"Metadata": {}
		},
		before: function(){
			var self = this;
			$.mockjaxSettings.logging = 0;  // only critical error messages
			$.mockjax({
				// jsonp
				url: "http://randomurl.com$callback=?",
				contentType: "text/json",
				responseTime: 0,
				responseText: {
					status: "success",
					data: self.data1
				}
			});
			$.mockjax({
				url: "http://services.odata.org/OData/OData.svc/Products?$format=json",
				contentType: "text/json",
				responseText: {
					status: "success",
					data: {
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
							}, {
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
							}, {
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
							}, {
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
							}, {
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
							}, {
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
							}, {
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
							}, {
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
							}, {
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
					}
				}
			});
			$.mockjax({
				url: "http://services.odata.org/OData/OData.svc/Products(0)/Category?$format=json",
				contentType: "text/json",
				responseText: {
					status: "success",
					data: {
						"d": [
							{
								"__metadata": {
									"uri": "http://services.odata.org/OData/OData.svc/Products(0)/Category",
									"type": "ODataDemo.Category"
								},
								"CategoryID": 0,
								"Name": "Categories"
							}
						]
					}
				}
			});
		}
		
	});

	// test init
	QUnit.test("HierarchicalDataSource 1.1: basic init", function (assert) {
		assert.expect(4);
		var view, res, ds = new $.ig.HierarchicalDataSource({
			dataSource: this.data1,
			primaryKey: "ProductID",
			responseDataKey: "Products",
			schema: {
				fields: [
					{ name: "ProductID", type: "number" },
					{ name: "UnitsInStock", type: "number" },
					{ name: "ProductDescription", type: "string" },
					{ name: "UnitPrice", type: "number" },
					{ name: "DateAdded", type: "date" },
					{ name: "Suppliers" }
				],
				layouts: [
					{
						childrenDataProperty: "Suppliers",
						foreignKey: "ProductID",
						primaryKey: "SupplierID",
						schema: {
							fields: [
								{ name: "ProductID", type: "number" },
								{ name: "SupplierID", type: "number" },
								{ name: "Capacity", type: "number" }
							]
						}
					}
				],
				searchField: "Products"
			}
		});
		ds.dataBind();
		// Hierarchical Grid doesn"t really have really specific markers that show that it was properly bound entirely because
		// it does it on demand - we need to test if there is a rootDS and if dataAt works
		res = ds.dataAt("ProductID:2", "Suppliers");
		assert.ok(ds.root() instanceof $.ig.DataSource, "Root DS was init correctly.");
		assert.equal(res[0].SupplierID, 1, "DataAt returned the correct rec");
		assert.equal(res[0].ProductID, 2, "DataAt returned the correct rec");
		assert.equal(res[0].Capacity, 464, "DataAt returned the correct rec");
	});

	QUnit.test("HierarchicalDataSource 1.2: basic init test when the dataSource prop is an instance of igDataSource", function (assert) {
		assert.expect(4);
		var view, res, ds = new $.ig.HierarchicalDataSource({
			dataSource: new $.ig.DataSource({
				dataSource: this.data1,
				responseDataKey: "Products",
				schema: {
					fields: [
						{ name: "ProductID", type: "number" },
						{ name: "UnitsInStock", type: "number" },
						{ name: "ProductDescription", type: "string" },
						{ name: "UnitPrice", type: "number" },
						{ name: "DateAdded", type: "date" },
						{ name: "Suppliers" }
					]
				}
			}),
			primaryKey: "ProductID",
			responseDataKey: "Products",
			schema: {
				fields: [
					{ name: "ProductID", type: "number" },
					{ name: "UnitsInStock", type: "number" },
					{ name: "ProductDescription", type: "string" },
					{ name: "UnitPrice", type: "number" },
					{ name: "DateAdded", type: "date" },
					{ name: "Suppliers" }
				],
				layouts: [
					{
						childrenDataProperty: "Suppliers",
						foreignKey: "ProductID",
						primaryKey: "SupplierID",
						schema: {
							fields: [
								{ name: "ProductID", type: "number" },
								{ name: "SupplierID", type: "number" },
								{ name: "Capacity", type: "number" }
							]
						}
					}
				],
				searchField: "Products"
			}
		});
		ds.dataBind();
		res = ds.dataAt("ProductID:2", "Suppliers");
		assert.ok(ds.root() instanceof $.ig.DataSource, "Root DS was init correctly.");
		assert.equal(res[0].SupplierID, 1, "DataAt returned the correct rec");
		assert.equal(res[0].ProductID, 2, "DataAt returned the correct rec");
		assert.equal(res[0].Capacity, 464, "DataAt returned the correct rec");
	});
	QUnit.test("HierarchicalDataSource 1.3: basic init test when the dataSource prop is an instance of igDataSource without schema", function (assert) {
		assert.expect(4);
		var view, res, ds = new $.ig.HierarchicalDataSource({
			dataSource: new $.ig.DataSource({
				dataSource: this.data1,
				responseDataKey: "Products"
			}),
			primaryKey: "ProductID",
			responseDataKey: "Products",
			schema: {
				fields: [
					{ name: "ProductID", type: "number" },
					{ name: "UnitsInStock", type: "number" },
					{ name: "ProductDescription", type: "string" },
					{ name: "UnitPrice", type: "number" },
					{ name: "DateAdded", type: "date" },
					{ name: "Suppliers" }
				],
				layouts: [
					{
						childrenDataProperty: "Suppliers",
						foreignKey: "ProductID",
						primaryKey: "SupplierID",
						schema: {
							fields: [
								{ name: "ProductID", type: "number" },
								{ name: "SupplierID", type: "number" },
								{ name: "Capacity", type: "number" }
							]
						}
					}
				],
				searchField: "Products"
			}
		});
		ds.dataBind();
		res = ds.dataAt("ProductID:2", "Suppliers");
		assert.ok(ds.root() instanceof $.ig.DataSource, "Root DS was init correctly.");
		assert.equal(res[0].SupplierID, 1, "DataAt returned the correct rec");
		assert.equal(res[0].ProductID, 2, "DataAt returned the correct rec");
		assert.equal(res[0].Capacity, 464, "DataAt returned the correct rec");
	});
	QUnit.test("HierarchicalDataSource 1.4: basic init test when rest settings are used", function (assert) {
		assert.expect(4);
		var view, res, ds = new $.ig.HierarchicalDataSource({
			dataSource: this.data1,
			primaryKey: "ProductID",
			responseDataKey: "Products",
			restSettings: {
				create: {
					url: "url"
				},
				update: {
					url: "url"
				},
				remove: {
					url: "url"
				}
			},
			schema: {
				fields: [
					{ name: "ProductID", type: "number" },
					{ name: "UnitsInStock", type: "number" },
					{ name: "ProductDescription", type: "string" },
					{ name: "UnitPrice", type: "number" },
					{ name: "DateAdded", type: "date" },
					{ name: "Suppliers" }
				],
				layouts: [
					{
						childrenDataProperty: "Suppliers",
						foreignKey: "ProductID",
						primaryKey: "SupplierID",
						schema: {
							fields: [
								{ name: "ProductID", type: "number" },
								{ name: "SupplierID", type: "number" },
								{ name: "Capacity", type: "number" }
							]
						}
					}
				],
				searchField: "Products"
			}
		});
		ds.dataBind();
		res = ds.dataAt("ProductID:2", "Suppliers");
		assert.ok(ds.root() instanceof $.ig.DataSource, "Root DS was init correctly.");
		assert.equal(res[0].SupplierID, 1, "DataAt returned the correct rec");
		assert.equal(res[0].ProductID, 2, "DataAt returned the correct rec");
		assert.equal(res[0].Capacity, 464, "DataAt returned the correct rec");
	});
	QUnit.test("HierarchicalDataSource 1.5: basic init test with url containing JSONP switch is used", function (assert) {
		assert.expect(4);
		var done = assert.async();
		var view, res, ds = new $.ig.HierarchicalDataSource({
			dataSource: "http://randomurl.com$callback=?",
			primaryKey: "ProductID",
			responseDataKey: "data.Products",
			responseDataKey: "records",
			 schema: {
			 	fields: [
			 		{ name: "ProductID", type: "number" },
			 		{ name: "UnitsInStock", type: "number" },
			 		{ name: "ProductDescription", type: "string" },
			 		{ name: "UnitPrice", type: "number" },
			 		{ name: "DateAdded", type: "date" },
			 		{ name: "Suppliers" }
			 	],
			 	layouts: [
			 		{
			 			childrenDataProperty: "Category",
			 			foreignKey: "ProductID",
			 			primaryKey: "ProductID",
			 			schema: {
			 				fields: [
			 					{ name: "ProductID", type: "number" },
			 					{ name: "SupplierID", type: "number" },
			 					{ name: "Capacity", type: "number" }
			 				]
			 			}
			 		}
			 	],
			 	searchField: "data.Products"
			 },
			callback: function () {
				res = ds.dataAt("ProductID:2", "Suppliers");
				assert.ok(ds.root() instanceof $.ig.DataSource, "Root DS was init correctly.");
				assert.equal(res[0].SupplierID, 1, "DataAt returned the correct rec");
				assert.equal(res[0].ProductID, 2, "DataAt returned the correct rec");
				assert.equal(res[0].Capacity, 464, "DataAt returned the correct rec");
				done();
			}
		});
		ds.dataBind();
	});

	QUnit.test("HierarchicalDataSource 1.6: dataAt test when using searchField in child's schema", function (assert) {
		assert.expect(4);
		var view, res, ds = new $.ig.HierarchicalDataSource({
			dataSource: this.data2,
			primaryKey: "ProductID",
			responseDataKey: "Products",
			schema: {
				fields: [
					{ name: "ProductID", type: "number" },
					{ name: "UnitsInStock", type: "number" },
					{ name: "ProductDescription", type: "string" },
					{ name: "UnitPrice", type: "number" },
					{ name: "DateAdded", type: "date" },
					{ name: "Suppliers" }
				],
				layouts: [
					{
						childrenDataProperty: "Suppliers",
						foreignKey: "ProductID",
						primaryKey: "SupplierID",
						schema: {
							fields: [
								{ name: "ProductID", type: "number" },
								{ name: "SupplierID", type: "number" },
								{ name: "Capacity", type: "number" }
							],
							searchField: "d"
						}
					}
				],
				searchField: "Products"
			}
		});
		ds.dataBind();
		// Hierarchical Grid doesn"t really have really specific markers that show that it was properly bound entirely because
		// it does it on demand - we need to test if there is a rootDS and if dataAt works
		res = ds.dataAt("ProductID:2", "Suppliers");
		assert.ok(ds.root() instanceof $.ig.DataSource, "Root DS was init correctly.");
		assert.equal(res.d[0].SupplierID, 1, "DataAt returned the correct rec");
		assert.equal(res.d[0].ProductID, 2, "DataAt returned the correct rec");
		assert.equal(res.d[0].Capacity, 464, "DataAt returned the correct rec");
	});
	QUnit.test("Test root API method", function(assert){
		assert.expect(1);
		var ds = new $.ig.HierarchicalDataSource({
			dataSource: this.data2,
			primaryKey: "ProductID",
			responseDataKey: "Products",
			schema: {
				fields: [
					{ name: "ProductID", type: "number" },
					{ name: "UnitsInStock", type: "number" },
					{ name: "ProductDescription", type: "string" },
					{ name: "UnitPrice", type: "number" },
					{ name: "DateAdded", type: "date" },
					{ name: "Suppliers" }
				],
				layouts: [
					{
						childrenDataProperty: "Suppliers",
						foreignKey: "ProductID",
						primaryKey: "SupplierID",
						schema: {
							fields: [
								{ name: "ProductID", type: "number" },
								{ name: "SupplierID", type: "number" },
								{ name: "Capacity", type: "number" }
							],
							searchField: "d"
						}
					}
				],
				searchField: "Products"
			}
		});
		this._rootds = null;
		var root = ds.root();
		assert.ok(root instanceof $.ig.DataSource, "The root data source should always be an instance of ig.DataSource.");
	});
	QUnit.test("HierarchicalDataSource 1.7: basic init test with odata", function (assert) {
		assert.expect(1);
		var done = assert.async();
		var view, res, ds = new $.ig.HierarchicalDataSource({
			responseDataType: "json",
			initialDataBindDepth: 1,
			dataSource: "http://services.odata.org/OData/OData.svc/Products?$format=json",
			primaryKey: "ID",
			odata: true,
			schema: {
				fields: [
					{ name: "Price" },
					{ name: "Name" },
					{ name: "ID" },
					{ name: "Category" }
				],
				layouts: [
					{
						childrenDataProperty: "Category",
						odata: true,
						dataSource: "/Category",
						schema: {
							fields: [
								{ name: "CategoryID" },
								{ name: "Name" }
							]
						}
					}
				],
				searchField: "data.d"
			},
			callback: function () {
				done();
				res = ds.dataAt("ID:2", "Category");
				assert.ok(ds.root() instanceof $.ig.DataSource, "Root DS was init correctly.");
			}
		});
		ds.dataBind();
	});