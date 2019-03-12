	QUnit.module("igDataSource Remote", {
		ds: null,
		ds1: null,
		dsXMLBare: null,
		dsXMLWrapped: null,
		dsJSONBare: null,
		dsJSONWrapped: null,
		dsWrong: null,
		dsWithMapper: null,
		util: $.ig.TestUtil,
		render: function(success, error) {},
		render1: function(success, error) {},
		renderWrong: function (success, error) {},
		dsJSONBareRender: function (success, error) {},
		dsJSONWrappedRender:  function (success, error) {},
		dsXMLBareRender: function (success, error) {},
		dsXMLWrappedRender: function (success, error) {},	
		before: function(assert) {
			var done = assert.async();
			$.mockjaxSettings.logging = 0;  // only critical error messages
			$.mockjax({
				url: 'products123',
				responseText: {
					status: 'success',
					data: {
						paging: {
							current: 1,
							total: 5
						},
						results: [
							{ProductID:'product-001'},
							{ProductID:'product-002'},
							{ProductID:'product-003'},
							{ProductID:'product-004'}
						]
					}
				}
			});
			$.mockjax({
				url: 'categories',
				contentType: 'text/json',
				responseText: {
					status: 'success',
					data: {
						"d": [
								{
									"ID": 1,
									"CategoryName": "Beverages",
									"Description": "Soft drinks, coffees, teas, beers, and ales",
									"ImageUrl": "http://www.igniteui.com/images/samples/nw/categories/1.png",
									"Products": [
									  {
										  "ID": 1,
										  "ProductName": "Chai",
										  "SupplierID": 1,
										  "CategoryID": 1,
										  "QuantityPerUnit": "10 boxes x 20 bags",
										  "UnitPrice": 18.0000,
										  "UnitsInStock": 39,
										  "UnitsOnOrder": 0,
										  "ReorderLevel": 10,
										  "SupplierName": "Exotic Liquids",
										  "CategoryName": "Beverages",
										  "Rating": 1,
										  "Discontinued": false,
										  "CategoryImageUrl": "http://www.igniteui.com/images/samples/nw/categories/1.png"
									  }
									]
								},
								  {
									  "ID": 2,
									  "CategoryName": "Condiments",
									  "Description": "Sweet and savory sauces, relishes, spreads, and seasonings",
									  "ImageUrl": "http://www.igniteui.com/images/samples/nw/categories/2.png",
									  "Products": [
									  {
										  "ID": 3,
										  "ProductName": "Aniseed Syrup",
										  "SupplierID": 1,
										  "CategoryID": 2,
										  "QuantityPerUnit": "12 - 550 ml bottles",
										  "UnitPrice": 10.0000,
										  "UnitsInStock": 13,
										  "UnitsOnOrder": 70,
										  "ReorderLevel": 25,
										  "SupplierName": "Exotic Liquids",
										  "CategoryName": "Condiments",
										  "Rating": 1,
										  "Discontinued": false,
										  "CategoryImageUrl": "http://www.igniteui.com/images/samples/nw/categories/2.png"
									  }]
								  }
						]
					}
				}
			});
	
		$.mockjax({
			url: 'http://services.odata.org/OData/OData.svc/Products?$format=json',
			contentType: 'text/json',
			responseText: {
				status: 'success',
				data: {
						"d" : [
							{
							"__metadata": {
							"uri": "http://services.odata.org/OData/OData.svc/Products(0)", "type": "ODataDemo.Product"
							}, "ID": 0, "Name": "Bread", "Description": "Whole grain bread", "ReleaseDate": "1992-01-01T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 4, "Price": "2.5", "Category": {
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
							}, "ID": 1, "Name": "Milk", "Description": "Low fat milk", "ReleaseDate": "1995-10-01T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "3.5", "Category": {
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
							}, "ID": 2, "Name": "Vint soda", "Description": "Americana Variety - Mix of 6 flavors", "ReleaseDate": "2000-10-01T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "20.9", "Category": {
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
							}, "ID": 3, "Name": "Havina Cola", "Description": "The Original Key Lime Cola", "ReleaseDate": "2005-10-01T00:00:00.000Z", "DiscontinuedDate": "2006-10-01T00:00:00.000Z", "Rating": 3, "Price": "19.9", "Category": {
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
							}, "ID": 4, "Name": "Fruit Punch", "Description": "Mango flavor, 8.3 Ounce Cans (Pack of 24)", "ReleaseDate": "2003-01-05T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "22.99", "Category": {
	
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
							}, "ID": 5, "Name": "Cranberry Juice", "Description": "16-Ounce Plastic Bottles (Pack of 12)", "ReleaseDate": "2006-08-04T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "22.8", "Category": {
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
							}, "ID": 6, "Name": "Pink Lemonade", "Description": "36 Ounce Cans (Pack of 3)", "ReleaseDate": "2006-11-05T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "18.8", "Category": {
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
							}, "ID": 7, "Name": "DVD Player", "Description": "1080P Upconversion DVD Player", "ReleaseDate": "2006-11-15T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "35.88", "Category": {
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
							}, "ID": 8, "Name": "LCD HDTV", "Description": "42 inch 1080p LCD with Built-in Blu-ray Disc Player", "ReleaseDate": "2008-05-08T00:00:00.000Z", "DiscontinuedDate": null, "Rating": 3, "Price": "1088.8", "Category": {
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
			url: 'WCFJSONBare',
			contentType: 'text/json',
			responseText: {
				status: 'success',
				data:
					[{"CategoryID":1,"Discontinued":false,"ProductID":1,"ProductName":"Chai","QuantityPerUnit":"10 boxes x 20 bags","SupplierID":1,"UnitPrice":18.0000,"UnitsInOrder":0,"UnitsInStock":39},{"CategoryID":1,"Discontinued":false,"ProductID":2,"ProductName":"Chang","QuantityPerUnit":"24 - 12 oz bottles","SupplierID":1,"UnitPrice":19.0000,"UnitsInOrder":40,"UnitsInStock":17},{"CategoryID":2,"Discontinued":false,"ProductID":3,"ProductName":"Aniseed Syrup","QuantityPerUnit":"12 - 550 ml bottles","SupplierID":1,"UnitPrice":10.0000,"UnitsInOrder":70,"UnitsInStock":13},{"CategoryID":2,"Discontinued":false,"ProductID":4,"ProductName":"Chef Anton's Cajun Seasoning","QuantityPerUnit":"48 - 6 oz jars","SupplierID":2,"UnitPrice":22.0000,"UnitsInOrder":0,"UnitsInStock":53},{"CategoryID":2,"Discontinued":true,"ProductID":5,"ProductName":"Chef Anton's Gumbo Mix","QuantityPerUnit":"36 boxes","SupplierID":2,"UnitPrice":21.3500,"UnitsInOrder":0,"UnitsInStock":0},{"CategoryID":2,"Discontinued":false,"ProductID":6,"ProductName":"Grandma's Boysenberry Spread","QuantityPerUnit":"12 - 8 oz jars","SupplierID":3,"UnitPrice":25.0000,"UnitsInOrder":0,"UnitsInStock":120},{"CategoryID":7,"Discontinued":false,"ProductID":7,"ProductName":"Uncle Bob's Organic Dried Pears","QuantityPerUnit":"12 - 1 lb pkgs.","SupplierID":3,"UnitPrice":30.0000,"UnitsInOrder":0,"UnitsInStock":15},{"CategoryID":2,"Discontinued":false,"ProductID":8,"ProductName":"Northwoods Cranberry Sauce","QuantityPerUnit":"12 - 12 oz jars","SupplierID":3,"UnitPrice":40.0000,"UnitsInOrder":0,"UnitsInStock":6},{"CategoryID":6,"Discontinued":true,"ProductID":9,"ProductName":"Mishi Kobe Niku","QuantityPerUnit":"18 - 500 g pkgs.","SupplierID":4,"UnitPrice":97.0000,"UnitsInOrder":0,"UnitsInStock":29},{"CategoryID":8,"Discontinued":false,"ProductID":10,"ProductName":"Ikura","QuantityPerUnit":"12 - 200 ml jars","SupplierID":4,"UnitPrice":31.0000,"UnitsInOrder":0,"UnitsInStock":31},{"CategoryID":4,"Discontinued":false,"ProductID":11,"ProductName":"Queso Cabrales","QuantityPerUnit":"1 kg pkg.","SupplierID":5,"UnitPrice":21.0000,"UnitsInOrder":30,"UnitsInStock":22},{"CategoryID":4,"Discontinued":false,"ProductID":12,"ProductName":"Queso Manchego La Pastora","QuantityPerUnit":"10 - 500 g pkgs.","SupplierID":5,"UnitPrice":38.0000,"UnitsInOrder":0,"UnitsInStock":86},{"CategoryID":8,"Discontinued":false,"ProductID":13,"ProductName":"Konbu","QuantityPerUnit":"2 kg box","SupplierID":6,"UnitPrice":6.0000,"UnitsInOrder":0,"UnitsInStock":24},{"CategoryID":7,"Discontinued":false,"ProductID":14,"ProductName":"Tofu","QuantityPerUnit":"40 - 100 g pkgs.","SupplierID":6,"UnitPrice":23.2500,"UnitsInOrder":0,"UnitsInStock":35},{"CategoryID":2,"Discontinued":false,"ProductID":15,"ProductName":"Genen Shouyu","QuantityPerUnit":"24 - 250 ml bottles","SupplierID":6,"UnitPrice":15.5000,"UnitsInOrder":0,"UnitsInStock":39},{"CategoryID":3,"Discontinued":false,"ProductID":16,"ProductName":"Pavlova","QuantityPerUnit":"32 - 500 g boxes","SupplierID":7,"UnitPrice":17.4500,"UnitsInOrder":0,"UnitsInStock":29},{"CategoryID":6,"Discontinued":true,"ProductID":17,"ProductName":"Alice Mutton","QuantityPerUnit":"20 - 1 kg tins","SupplierID":7,"UnitPrice":39.0000,"UnitsInOrder":0,"UnitsInStock":0},{"CategoryID":8,"Discontinued":false,"ProductID":18,"ProductName":"Carnarvon Tigers","QuantityPerUnit":"16 kg pkg.","SupplierID":7,"UnitPrice":62.5000,"UnitsInOrder":0,"UnitsInStock":42},{"CategoryID":3,"Discontinued":false,"ProductID":19,"ProductName":"Teatime Chocolate Biscuits","QuantityPerUnit":"10 boxes x 12 pieces","SupplierID":8,"UnitPrice":9.2000,"UnitsInOrder":0,"UnitsInStock":25},{"CategoryID":3,"Discontinued":false,"ProductID":20,"ProductName":"Sir Rodney's Marmalade","QuantityPerUnit":"30 gift boxes","SupplierID":8,"UnitPrice":81.0000,"UnitsInOrder":0,"UnitsInStock":40},{"CategoryID":3,"Discontinued":false,"ProductID":21,"ProductName":"Sir Rodney's Scones","QuantityPerUnit":"24 pkgs. x 4 pieces","SupplierID":8,"UnitPrice":10.0000,"UnitsInOrder":40,"UnitsInStock":3},{"CategoryID":5,"Discontinued":false,"ProductID":22,"ProductName":"Gustaf's Kn�ckebr�d","QuantityPerUnit":"24 - 500 g pkgs.","SupplierID":9,"UnitPrice":21.0000,"UnitsInOrder":0,"UnitsInStock":104},{"CategoryID":5,"Discontinued":false,"ProductID":23,"ProductName":"Tunnbr�d","QuantityPerUnit":"12 - 250 g pkgs.","SupplierID":9,"UnitPrice":9.0000,"UnitsInOrder":0,"UnitsInStock":61},{"CategoryID":1,"Discontinued":true,"ProductID":24,"ProductName":"Guaran� Fant�stica","QuantityPerUnit":"12 - 355 ml cans","SupplierID":10,"UnitPrice":4.5000,"UnitsInOrder":0,"UnitsInStock":20},{"CategoryID":3,"Discontinued":false,"ProductID":25,"ProductName":"NuNuCa Nu�-Nougat-Creme","QuantityPerUnit":"20 - 450 g glasses","SupplierID":11,"UnitPrice":14.0000,"UnitsInOrder":0,"UnitsInStock":76},{"CategoryID":3,"Discontinued":false,"ProductID":26,"ProductName":"Gumb�r Gummib�rchen","QuantityPerUnit":"100 - 250 g bags","SupplierID":11,"UnitPrice":31.2300,"UnitsInOrder":0,"UnitsInStock":15},{"CategoryID":3,"Discontinued":false,"ProductID":27,"ProductName":"Schoggi Schokolade","QuantityPerUnit":"100 - 100 g pieces","SupplierID":11,"UnitPrice":43.9000,"UnitsInOrder":0,"UnitsInStock":49},{"CategoryID":7,"Discontinued":true,"ProductID":28,"ProductName":"R�ssle Sauerkraut","QuantityPerUnit":"25 - 825 g cans","SupplierID":12,"UnitPrice":45.6000,"UnitsInOrder":0,"UnitsInStock":26},{"CategoryID":6,"Discontinued":true,"ProductID":29,"ProductName":"Th�ringer Rostbratwurst","QuantityPerUnit":"50 bags x 30 sausgs.","SupplierID":12,"UnitPrice":123.7900,"UnitsInOrder":0,"UnitsInStock":0},{"CategoryID":8,"Discontinued":false,"ProductID":30,"ProductName":"Nord-Ost Matjeshering","QuantityPerUnit":"10 - 200 g glasses","SupplierID":13,"UnitPrice":25.8900,"UnitsInOrder":0,"UnitsInStock":10},{"CategoryID":4,"Discontinued":false,"ProductID":31,"ProductName":"Gorgonzola Telino","QuantityPerUnit":"12 - 100 g pkgs","SupplierID":14,"UnitPrice":12.5000,"UnitsInOrder":70,"UnitsInStock":0},{"CategoryID":4,"Discontinued":false,"ProductID":32,"ProductName":"Mascarpone Fabioli","QuantityPerUnit":"24 - 200 g pkgs.","SupplierID":14,"UnitPrice":32.0000,"UnitsInOrder":40,"UnitsInStock":9},{"CategoryID":4,"Discontinued":false,"ProductID":33,"ProductName":"Geitost","QuantityPerUnit":"500 g","SupplierID":15,"UnitPrice":2.5000,"UnitsInOrder":0,"UnitsInStock":112},{"CategoryID":1,"Discontinued":false,"ProductID":34,"ProductName":"Sasquatch Ale","QuantityPerUnit":"24 - 12 oz bottles","SupplierID":16,"UnitPrice":14.0000,"UnitsInOrder":0,"UnitsInStock":111},{"CategoryID":1,"Discontinued":false,"ProductID":35,"ProductName":"Steeleye Stout","QuantityPerUnit":"24 - 12 oz bottles","SupplierID":16,"UnitPrice":18.0000,"UnitsInOrder":0,"UnitsInStock":20},{"CategoryID":8,"Discontinued":false,"ProductID":36,"ProductName":"Inlagd Sill","QuantityPerUnit":"24 - 250 g  jars","SupplierID":17,"UnitPrice":19.0000,"UnitsInOrder":0,"UnitsInStock":112},{"CategoryID":8,"Discontinued":false,"ProductID":37,"ProductName":"Gravad lax","QuantityPerUnit":"12 - 500 g pkgs.","SupplierID":17,"UnitPrice":26.0000,"UnitsInOrder":50,"UnitsInStock":11},{"CategoryID":1,"Discontinued":false,"ProductID":38,"ProductName":"C�te de Blaye","QuantityPerUnit":"12 - 75 cl bottles","SupplierID":18,"UnitPrice":263.5000,"UnitsInOrder":0,"UnitsInStock":17},{"CategoryID":1,"Discontinued":false,"ProductID":39,"ProductName":"Chartreuse verte","QuantityPerUnit":"750 cc per bottle","SupplierID":18,"UnitPrice":18.0000,"UnitsInOrder":0,"UnitsInStock":69},{"CategoryID":8,"Discontinued":false,"ProductID":40,"ProductName":"Boston Crab Meat","QuantityPerUnit":"24 - 4 oz tins","SupplierID":19,"UnitPrice":18.4000,"UnitsInOrder":0,"UnitsInStock":123},{"CategoryID":8,"Discontinued":false,"ProductID":41,"ProductName":"Jack's New England Clam Chowder","QuantityPerUnit":"12 - 12 oz cans","SupplierID":19,"UnitPrice":9.6500,"UnitsInOrder":0,"UnitsInStock":85},{"CategoryID":5,"Discontinued":true,"ProductID":42,"ProductName":"Singaporean Hokkien Fried Mee","QuantityPerUnit":"32 - 1 kg pkgs.","SupplierID":20,"UnitPrice":14.0000,"UnitsInOrder":0,"UnitsInStock":26},{"CategoryID":1,"Discontinued":false,"ProductID":43,"ProductName":"Ipoh Coffee","QuantityPerUnit":"16 - 500 g tins","SupplierID":20,"UnitPrice":46.0000,"UnitsInOrder":10,"UnitsInStock":17},{"CategoryID":2,"Discontinued":false,"ProductID":44,"ProductName":"Gula Malacca","QuantityPerUnit":"20 - 2 kg bags","SupplierID":20,"UnitPrice":19.4500,"UnitsInOrder":0,"UnitsInStock":27},{"CategoryID":8,"Discontinued":false,"ProductID":45,"ProductName":"Rogede sild","QuantityPerUnit":"1k pkg.","SupplierID":21,"UnitPrice":9.5000,"UnitsInOrder":70,"UnitsInStock":5},{"CategoryID":8,"Discontinued":false,"ProductID":46,"ProductName":"Spegesild","QuantityPerUnit":"4 - 450 g glasses","SupplierID":21,"UnitPrice":12.0000,"UnitsInOrder":0,"UnitsInStock":95},{"CategoryID":3,"Discontinued":false,"ProductID":47,"ProductName":"Zaanse koeken","QuantityPerUnit":"10 - 4 oz boxes","SupplierID":22,"UnitPrice":9.5000,"UnitsInOrder":0,"UnitsInStock":36},{"CategoryID":3,"Discontinued":false,"ProductID":48,"ProductName":"Chocolade","QuantityPerUnit":"10 pkgs.","SupplierID":22,"UnitPrice":12.7500,"UnitsInOrder":70,"UnitsInStock":15},{"CategoryID":3,"Discontinued":false,"ProductID":49,"ProductName":"Maxilaku","QuantityPerUnit":"24 - 50 g pkgs.","SupplierID":23,"UnitPrice":20.0000,"UnitsInOrder":60,"UnitsInStock":10},{"CategoryID":3,"Discontinued":false,"ProductID":50,"ProductName":"Valkoinen suklaa","QuantityPerUnit":"12 - 100 g bars","SupplierID":23,"UnitPrice":16.2500,"UnitsInOrder":0,"UnitsInStock":65},{"CategoryID":7,"Discontinued":false,"ProductID":51,"ProductName":"Manjimup Dried Apples","QuantityPerUnit":"50 - 300 g pkgs.","SupplierID":24,"UnitPrice":53.0000,"UnitsInOrder":0,"UnitsInStock":20},{"CategoryID":5,"Discontinued":false,"ProductID":52,"ProductName":"Filo Mix","QuantityPerUnit":"16 - 2 kg boxes","SupplierID":24,"UnitPrice":7.0000,"UnitsInOrder":0,"UnitsInStock":38},{"CategoryID":6,"Discontinued":true,"ProductID":53,"ProductName":"Perth Pasties","QuantityPerUnit":"48 pieces","SupplierID":24,"UnitPrice":32.8000,"UnitsInOrder":0,"UnitsInStock":0},{"CategoryID":6,"Discontinued":false,"ProductID":54,"ProductName":"Tourti�re","QuantityPerUnit":"16 pies","SupplierID":25,"UnitPrice":7.4500,"UnitsInOrder":0,"UnitsInStock":21},{"CategoryID":6,"Discontinued":false,"ProductID":55,"ProductName":"P�t� chinois","QuantityPerUnit":"24 boxes x 2 pies","SupplierID":25,"UnitPrice":24.0000,"UnitsInOrder":0,"UnitsInStock":115},{"CategoryID":5,"Discontinued":false,"ProductID":56,"ProductName":"Gnocchi di nonna Alice","QuantityPerUnit":"24 - 250 g pkgs.","SupplierID":26,"UnitPrice":38.0000,"UnitsInOrder":10,"UnitsInStock":21},{"CategoryID":5,"Discontinued":false,"ProductID":57,"ProductName":"Ravioli Angelo","QuantityPerUnit":"24 - 250 g pkgs.","SupplierID":26,"UnitPrice":19.5000,"UnitsInOrder":0,"UnitsInStock":36},{"CategoryID":8,"Discontinued":false,"ProductID":58,"ProductName":"Escargots de Bourgogne","QuantityPerUnit":"24 pieces","SupplierID":27,"UnitPrice":13.2500,"UnitsInOrder":0,"UnitsInStock":62},{"CategoryID":4,"Discontinued":false,"ProductID":59,"ProductName":"Raclette Courdavault","QuantityPerUnit":"5 kg pkg.","SupplierID":28,"UnitPrice":55.0000,"UnitsInOrder":0,"UnitsInStock":79},{"CategoryID":4,"Discontinued":false,"ProductID":60,"ProductName":"Camembert Pierrot","QuantityPerUnit":"15 - 300 g rounds","SupplierID":28,"UnitPrice":34.0000,"UnitsInOrder":0,"UnitsInStock":19},{"CategoryID":2,"Discontinued":false,"ProductID":61,"ProductName":"Sirop d'�rable","QuantityPerUnit":"24 - 500 ml bottles","SupplierID":29,"UnitPrice":28.5000,"UnitsInOrder":0,"UnitsInStock":113},{"CategoryID":3,"Discontinued":false,"ProductID":62,"ProductName":"Tarte au sucre","QuantityPerUnit":"48 pies","SupplierID":29,"UnitPrice":49.3000,"UnitsInOrder":0,"UnitsInStock":17},{"CategoryID":2,"Discontinued":false,"ProductID":63,"ProductName":"Vegie-spread","QuantityPerUnit":"15 - 625 g jars","SupplierID":7,"UnitPrice":43.9000,"UnitsInOrder":0,"UnitsInStock":24},{"CategoryID":5,"Discontinued":false,"ProductID":64,"ProductName":"Wimmers gute Semmelkn�del","QuantityPerUnit":"20 bags x 4 pieces","SupplierID":12,"UnitPrice":33.2500,"UnitsInOrder":80,"UnitsInStock":22},{"CategoryID":2,"Discontinued":false,"ProductID":65,"ProductName":"Louisiana Fiery Hot Pepper Sauce","QuantityPerUnit":"32 - 8 oz bottles","SupplierID":2,"UnitPrice":21.0500,"UnitsInOrder":0,"UnitsInStock":76},{"CategoryID":2,"Discontinued":false,"ProductID":66,"ProductName":"Louisiana Hot Spiced Okra","QuantityPerUnit":"24 - 8 oz jars","SupplierID":2,"UnitPrice":17.0000,"UnitsInOrder":100,"UnitsInStock":4},{"CategoryID":1,"Discontinued":false,"ProductID":67,"ProductName":"Laughing Lumberjack Lager","QuantityPerUnit":"24 - 12 oz bottles","SupplierID":16,"UnitPrice":14.0000,"UnitsInOrder":0,"UnitsInStock":52},{"CategoryID":3,"Discontinued":false,"ProductID":68,"ProductName":"Scottish Longbreads","QuantityPerUnit":"10 boxes x 8 pieces","SupplierID":8,"UnitPrice":12.5000,"UnitsInOrder":10,"UnitsInStock":6},{"CategoryID":4,"Discontinued":false,"ProductID":69,"ProductName":"Gudbrandsdalsost","QuantityPerUnit":"10 kg pkg.","SupplierID":15,"UnitPrice":36.0000,"UnitsInOrder":0,"UnitsInStock":26},{"CategoryID":1,"Discontinued":false,"ProductID":70,"ProductName":"Outback Lager","QuantityPerUnit":"24 - 355 ml bottles","SupplierID":7,"UnitPrice":15.0000,"UnitsInOrder":10,"UnitsInStock":15},{"CategoryID":4,"Discontinued":false,"ProductID":71,"ProductName":"Flotemysost","QuantityPerUnit":"10 - 500 g pkgs.","SupplierID":15,"UnitPrice":21.5000,"UnitsInOrder":0,"UnitsInStock":26},{"CategoryID":4,"Discontinued":false,"ProductID":72,"ProductName":"Mozzarella di Giovanni","QuantityPerUnit":"24 - 200 g pkgs.","SupplierID":14,"UnitPrice":34.8000,"UnitsInOrder":0,"UnitsInStock":14},{"CategoryID":8,"Discontinued":false,"ProductID":73,"ProductName":"R�d Kaviar","QuantityPerUnit":"24 - 150 g jars","SupplierID":17,"UnitPrice":15.0000,"UnitsInOrder":0,"UnitsInStock":101},{"CategoryID":7,"Discontinued":false,"ProductID":74,"ProductName":"Longlife Tofu","QuantityPerUnit":"5 kg pkg.","SupplierID":4,"UnitPrice":10.0000,"UnitsInOrder":20,"UnitsInStock":4},{"CategoryID":1,"Discontinued":false,"ProductID":75,"ProductName":"Rh�nbr�u Klosterbier","QuantityPerUnit":"24 - 0.5 l bottles","SupplierID":12,"UnitPrice":7.7500,"UnitsInOrder":0,"UnitsInStock":125},{"CategoryID":1,"Discontinued":false,"ProductID":76,"ProductName":"Lakkalik��ri","QuantityPerUnit":"500 ml","SupplierID":23,"UnitPrice":18.0000,"UnitsInOrder":0,"UnitsInStock":57},{"CategoryID":2,"Discontinued":false,"ProductID":77,"ProductName":"Original Frankfurter gr�ne So�e","QuantityPerUnit":"12 boxes","SupplierID":12,"UnitPrice":13.0000,"UnitsInOrder":0,"UnitsInStock":32}]
			}
		});
	
		$.mockjax({
			url: 'WCFJSONWrapped',
			contentType: 'text/json',
			responseText: {
				status: 'success',
				data: {
					"GetProductsResult":[{"CategoryID":1,"Discontinued":false,"ProductID":1,"ProductName":"Chai","QuantityPerUnit":"10 boxes x 20 bags","SupplierID":1,"UnitPrice":18.0000,"UnitsInOrder":0,"UnitsInStock":39},{"CategoryID":1,"Discontinued":false,"ProductID":2,"ProductName":"Chang","QuantityPerUnit":"24 - 12 oz bottles","SupplierID":1,"UnitPrice":19.0000,"UnitsInOrder":40,"UnitsInStock":17},{"CategoryID":2,"Discontinued":false,"ProductID":3,"ProductName":"Aniseed Syrup","QuantityPerUnit":"12 - 550 ml bottles","SupplierID":1,"UnitPrice":10.0000,"UnitsInOrder":70,"UnitsInStock":13},{"CategoryID":2,"Discontinued":false,"ProductID":4,"ProductName":"Chef Anton's Cajun Seasoning","QuantityPerUnit":"48 - 6 oz jars","SupplierID":2,"UnitPrice":22.0000,"UnitsInOrder":0,"UnitsInStock":53},{"CategoryID":2,"Discontinued":true,"ProductID":5,"ProductName":"Chef Anton's Gumbo Mix","QuantityPerUnit":"36 boxes","SupplierID":2,"UnitPrice":21.3500,"UnitsInOrder":0,"UnitsInStock":0},{"CategoryID":2,"Discontinued":false,"ProductID":6,"ProductName":"Grandma's Boysenberry Spread","QuantityPerUnit":"12 - 8 oz jars","SupplierID":3,"UnitPrice":25.0000,"UnitsInOrder":0,"UnitsInStock":120},{"CategoryID":7,"Discontinued":false,"ProductID":7,"ProductName":"Uncle Bob's Organic Dried Pears","QuantityPerUnit":"12 - 1 lb pkgs.","SupplierID":3,"UnitPrice":30.0000,"UnitsInOrder":0,"UnitsInStock":15},{"CategoryID":2,"Discontinued":false,"ProductID":8,"ProductName":"Northwoods Cranberry Sauce","QuantityPerUnit":"12 - 12 oz jars","SupplierID":3,"UnitPrice":40.0000,"UnitsInOrder":0,"UnitsInStock":6},{"CategoryID":6,"Discontinued":true,"ProductID":9,"ProductName":"Mishi Kobe Niku","QuantityPerUnit":"18 - 500 g pkgs.","SupplierID":4,"UnitPrice":97.0000,"UnitsInOrder":0,"UnitsInStock":29},{"CategoryID":8,"Discontinued":false,"ProductID":10,"ProductName":"Ikura","QuantityPerUnit":"12 - 200 ml jars","SupplierID":4,"UnitPrice":31.0000,"UnitsInOrder":0,"UnitsInStock":31},{"CategoryID":4,"Discontinued":false,"ProductID":11,"ProductName":"Queso Cabrales","QuantityPerUnit":"1 kg pkg.","SupplierID":5,"UnitPrice":21.0000,"UnitsInOrder":30,"UnitsInStock":22},{"CategoryID":4,"Discontinued":false,"ProductID":12,"ProductName":"Queso Manchego La Pastora","QuantityPerUnit":"10 - 500 g pkgs.","SupplierID":5,"UnitPrice":38.0000,"UnitsInOrder":0,"UnitsInStock":86},{"CategoryID":8,"Discontinued":false,"ProductID":13,"ProductName":"Konbu","QuantityPerUnit":"2 kg box","SupplierID":6,"UnitPrice":6.0000,"UnitsInOrder":0,"UnitsInStock":24},{"CategoryID":7,"Discontinued":false,"ProductID":14,"ProductName":"Tofu","QuantityPerUnit":"40 - 100 g pkgs.","SupplierID":6,"UnitPrice":23.2500,"UnitsInOrder":0,"UnitsInStock":35},{"CategoryID":2,"Discontinued":false,"ProductID":15,"ProductName":"Genen Shouyu","QuantityPerUnit":"24 - 250 ml bottles","SupplierID":6,"UnitPrice":15.5000,"UnitsInOrder":0,"UnitsInStock":39},{"CategoryID":3,"Discontinued":false,"ProductID":16,"ProductName":"Pavlova","QuantityPerUnit":"32 - 500 g boxes","SupplierID":7,"UnitPrice":17.4500,"UnitsInOrder":0,"UnitsInStock":29},{"CategoryID":6,"Discontinued":true,"ProductID":17,"ProductName":"Alice Mutton","QuantityPerUnit":"20 - 1 kg tins","SupplierID":7,"UnitPrice":39.0000,"UnitsInOrder":0,"UnitsInStock":0},{"CategoryID":8,"Discontinued":false,"ProductID":18,"ProductName":"Carnarvon Tigers","QuantityPerUnit":"16 kg pkg.","SupplierID":7,"UnitPrice":62.5000,"UnitsInOrder":0,"UnitsInStock":42},{"CategoryID":3,"Discontinued":false,"ProductID":19,"ProductName":"Teatime Chocolate Biscuits","QuantityPerUnit":"10 boxes x 12 pieces","SupplierID":8,"UnitPrice":9.2000,"UnitsInOrder":0,"UnitsInStock":25},{"CategoryID":3,"Discontinued":false,"ProductID":20,"ProductName":"Sir Rodney's Marmalade","QuantityPerUnit":"30 gift boxes","SupplierID":8,"UnitPrice":81.0000,"UnitsInOrder":0,"UnitsInStock":40},{"CategoryID":3,"Discontinued":false,"ProductID":21,"ProductName":"Sir Rodney's Scones","QuantityPerUnit":"24 pkgs. x 4 pieces","SupplierID":8,"UnitPrice":10.0000,"UnitsInOrder":40,"UnitsInStock":3},{"CategoryID":5,"Discontinued":false,"ProductID":22,"ProductName":"Gustaf's Kn�ckebr�d","QuantityPerUnit":"24 - 500 g pkgs.","SupplierID":9,"UnitPrice":21.0000,"UnitsInOrder":0,"UnitsInStock":104},{"CategoryID":5,"Discontinued":false,"ProductID":23,"ProductName":"Tunnbr�d","QuantityPerUnit":"12 - 250 g pkgs.","SupplierID":9,"UnitPrice":9.0000,"UnitsInOrder":0,"UnitsInStock":61},{"CategoryID":1,"Discontinued":true,"ProductID":24,"ProductName":"Guaran� Fant�stica","QuantityPerUnit":"12 - 355 ml cans","SupplierID":10,"UnitPrice":4.5000,"UnitsInOrder":0,"UnitsInStock":20},{"CategoryID":3,"Discontinued":false,"ProductID":25,"ProductName":"NuNuCa Nu�-Nougat-Creme","QuantityPerUnit":"20 - 450 g glasses","SupplierID":11,"UnitPrice":14.0000,"UnitsInOrder":0,"UnitsInStock":76},{"CategoryID":3,"Discontinued":false,"ProductID":26,"ProductName":"Gumb�r Gummib�rchen","QuantityPerUnit":"100 - 250 g bags","SupplierID":11,"UnitPrice":31.2300,"UnitsInOrder":0,"UnitsInStock":15},{"CategoryID":3,"Discontinued":false,"ProductID":27,"ProductName":"Schoggi Schokolade","QuantityPerUnit":"100 - 100 g pieces","SupplierID":11,"UnitPrice":43.9000,"UnitsInOrder":0,"UnitsInStock":49},{"CategoryID":7,"Discontinued":true,"ProductID":28,"ProductName":"R�ssle Sauerkraut","QuantityPerUnit":"25 - 825 g cans","SupplierID":12,"UnitPrice":45.6000,"UnitsInOrder":0,"UnitsInStock":26},{"CategoryID":6,"Discontinued":true,"ProductID":29,"ProductName":"Th�ringer Rostbratwurst","QuantityPerUnit":"50 bags x 30 sausgs.","SupplierID":12,"UnitPrice":123.7900,"UnitsInOrder":0,"UnitsInStock":0},{"CategoryID":8,"Discontinued":false,"ProductID":30,"ProductName":"Nord-Ost Matjeshering","QuantityPerUnit":"10 - 200 g glasses","SupplierID":13,"UnitPrice":25.8900,"UnitsInOrder":0,"UnitsInStock":10},{"CategoryID":4,"Discontinued":false,"ProductID":31,"ProductName":"Gorgonzola Telino","QuantityPerUnit":"12 - 100 g pkgs","SupplierID":14,"UnitPrice":12.5000,"UnitsInOrder":70,"UnitsInStock":0},{"CategoryID":4,"Discontinued":false,"ProductID":32,"ProductName":"Mascarpone Fabioli","QuantityPerUnit":"24 - 200 g pkgs.","SupplierID":14,"UnitPrice":32.0000,"UnitsInOrder":40,"UnitsInStock":9},{"CategoryID":4,"Discontinued":false,"ProductID":33,"ProductName":"Geitost","QuantityPerUnit":"500 g","SupplierID":15,"UnitPrice":2.5000,"UnitsInOrder":0,"UnitsInStock":112},{"CategoryID":1,"Discontinued":false,"ProductID":34,"ProductName":"Sasquatch Ale","QuantityPerUnit":"24 - 12 oz bottles","SupplierID":16,"UnitPrice":14.0000,"UnitsInOrder":0,"UnitsInStock":111},{"CategoryID":1,"Discontinued":false,"ProductID":35,"ProductName":"Steeleye Stout","QuantityPerUnit":"24 - 12 oz bottles","SupplierID":16,"UnitPrice":18.0000,"UnitsInOrder":0,"UnitsInStock":20},{"CategoryID":8,"Discontinued":false,"ProductID":36,"ProductName":"Inlagd Sill","QuantityPerUnit":"24 - 250 g  jars","SupplierID":17,"UnitPrice":19.0000,"UnitsInOrder":0,"UnitsInStock":112},{"CategoryID":8,"Discontinued":false,"ProductID":37,"ProductName":"Gravad lax","QuantityPerUnit":"12 - 500 g pkgs.","SupplierID":17,"UnitPrice":26.0000,"UnitsInOrder":50,"UnitsInStock":11},{"CategoryID":1,"Discontinued":false,"ProductID":38,"ProductName":"C�te de Blaye","QuantityPerUnit":"12 - 75 cl bottles","SupplierID":18,"UnitPrice":263.5000,"UnitsInOrder":0,"UnitsInStock":17},{"CategoryID":1,"Discontinued":false,"ProductID":39,"ProductName":"Chartreuse verte","QuantityPerUnit":"750 cc per bottle","SupplierID":18,"UnitPrice":18.0000,"UnitsInOrder":0,"UnitsInStock":69},{"CategoryID":8,"Discontinued":false,"ProductID":40,"ProductName":"Boston Crab Meat","QuantityPerUnit":"24 - 4 oz tins","SupplierID":19,"UnitPrice":18.4000,"UnitsInOrder":0,"UnitsInStock":123},{"CategoryID":8,"Discontinued":false,"ProductID":41,"ProductName":"Jack's New England Clam Chowder","QuantityPerUnit":"12 - 12 oz cans","SupplierID":19,"UnitPrice":9.6500,"UnitsInOrder":0,"UnitsInStock":85},{"CategoryID":5,"Discontinued":true,"ProductID":42,"ProductName":"Singaporean Hokkien Fried Mee","QuantityPerUnit":"32 - 1 kg pkgs.","SupplierID":20,"UnitPrice":14.0000,"UnitsInOrder":0,"UnitsInStock":26},{"CategoryID":1,"Discontinued":false,"ProductID":43,"ProductName":"Ipoh Coffee","QuantityPerUnit":"16 - 500 g tins","SupplierID":20,"UnitPrice":46.0000,"UnitsInOrder":10,"UnitsInStock":17},{"CategoryID":2,"Discontinued":false,"ProductID":44,"ProductName":"Gula Malacca","QuantityPerUnit":"20 - 2 kg bags","SupplierID":20,"UnitPrice":19.4500,"UnitsInOrder":0,"UnitsInStock":27},{"CategoryID":8,"Discontinued":false,"ProductID":45,"ProductName":"Rogede sild","QuantityPerUnit":"1k pkg.","SupplierID":21,"UnitPrice":9.5000,"UnitsInOrder":70,"UnitsInStock":5},{"CategoryID":8,"Discontinued":false,"ProductID":46,"ProductName":"Spegesild","QuantityPerUnit":"4 - 450 g glasses","SupplierID":21,"UnitPrice":12.0000,"UnitsInOrder":0,"UnitsInStock":95},{"CategoryID":3,"Discontinued":false,"ProductID":47,"ProductName":"Zaanse koeken","QuantityPerUnit":"10 - 4 oz boxes","SupplierID":22,"UnitPrice":9.5000,"UnitsInOrder":0,"UnitsInStock":36},{"CategoryID":3,"Discontinued":false,"ProductID":48,"ProductName":"Chocolade","QuantityPerUnit":"10 pkgs.","SupplierID":22,"UnitPrice":12.7500,"UnitsInOrder":70,"UnitsInStock":15},{"CategoryID":3,"Discontinued":false,"ProductID":49,"ProductName":"Maxilaku","QuantityPerUnit":"24 - 50 g pkgs.","SupplierID":23,"UnitPrice":20.0000,"UnitsInOrder":60,"UnitsInStock":10},{"CategoryID":3,"Discontinued":false,"ProductID":50,"ProductName":"Valkoinen suklaa","QuantityPerUnit":"12 - 100 g bars","SupplierID":23,"UnitPrice":16.2500,"UnitsInOrder":0,"UnitsInStock":65},{"CategoryID":7,"Discontinued":false,"ProductID":51,"ProductName":"Manjimup Dried Apples","QuantityPerUnit":"50 - 300 g pkgs.","SupplierID":24,"UnitPrice":53.0000,"UnitsInOrder":0,"UnitsInStock":20},{"CategoryID":5,"Discontinued":false,"ProductID":52,"ProductName":"Filo Mix","QuantityPerUnit":"16 - 2 kg boxes","SupplierID":24,"UnitPrice":7.0000,"UnitsInOrder":0,"UnitsInStock":38},{"CategoryID":6,"Discontinued":true,"ProductID":53,"ProductName":"Perth Pasties","QuantityPerUnit":"48 pieces","SupplierID":24,"UnitPrice":32.8000,"UnitsInOrder":0,"UnitsInStock":0},{"CategoryID":6,"Discontinued":false,"ProductID":54,"ProductName":"Tourti�re","QuantityPerUnit":"16 pies","SupplierID":25,"UnitPrice":7.4500,"UnitsInOrder":0,"UnitsInStock":21},{"CategoryID":6,"Discontinued":false,"ProductID":55,"ProductName":"P�t� chinois","QuantityPerUnit":"24 boxes x 2 pies","SupplierID":25,"UnitPrice":24.0000,"UnitsInOrder":0,"UnitsInStock":115},{"CategoryID":5,"Discontinued":false,"ProductID":56,"ProductName":"Gnocchi di nonna Alice","QuantityPerUnit":"24 - 250 g pkgs.","SupplierID":26,"UnitPrice":38.0000,"UnitsInOrder":10,"UnitsInStock":21},{"CategoryID":5,"Discontinued":false,"ProductID":57,"ProductName":"Ravioli Angelo","QuantityPerUnit":"24 - 250 g pkgs.","SupplierID":26,"UnitPrice":19.5000,"UnitsInOrder":0,"UnitsInStock":36},{"CategoryID":8,"Discontinued":false,"ProductID":58,"ProductName":"Escargots de Bourgogne","QuantityPerUnit":"24 pieces","SupplierID":27,"UnitPrice":13.2500,"UnitsInOrder":0,"UnitsInStock":62},{"CategoryID":4,"Discontinued":false,"ProductID":59,"ProductName":"Raclette Courdavault","QuantityPerUnit":"5 kg pkg.","SupplierID":28,"UnitPrice":55.0000,"UnitsInOrder":0,"UnitsInStock":79},{"CategoryID":4,"Discontinued":false,"ProductID":60,"ProductName":"Camembert Pierrot","QuantityPerUnit":"15 - 300 g rounds","SupplierID":28,"UnitPrice":34.0000,"UnitsInOrder":0,"UnitsInStock":19},{"CategoryID":2,"Discontinued":false,"ProductID":61,"ProductName":"Sirop d'�rable","QuantityPerUnit":"24 - 500 ml bottles","SupplierID":29,"UnitPrice":28.5000,"UnitsInOrder":0,"UnitsInStock":113},{"CategoryID":3,"Discontinued":false,"ProductID":62,"ProductName":"Tarte au sucre","QuantityPerUnit":"48 pies","SupplierID":29,"UnitPrice":49.3000,"UnitsInOrder":0,"UnitsInStock":17},{"CategoryID":2,"Discontinued":false,"ProductID":63,"ProductName":"Vegie-spread","QuantityPerUnit":"15 - 625 g jars","SupplierID":7,"UnitPrice":43.9000,"UnitsInOrder":0,"UnitsInStock":24},{"CategoryID":5,"Discontinued":false,"ProductID":64,"ProductName":"Wimmers gute Semmelkn�del","QuantityPerUnit":"20 bags x 4 pieces","SupplierID":12,"UnitPrice":33.2500,"UnitsInOrder":80,"UnitsInStock":22},{"CategoryID":2,"Discontinued":false,"ProductID":65,"ProductName":"Louisiana Fiery Hot Pepper Sauce","QuantityPerUnit":"32 - 8 oz bottles","SupplierID":2,"UnitPrice":21.0500,"UnitsInOrder":0,"UnitsInStock":76},{"CategoryID":2,"Discontinued":false,"ProductID":66,"ProductName":"Louisiana Hot Spiced Okra","QuantityPerUnit":"24 - 8 oz jars","SupplierID":2,"UnitPrice":17.0000,"UnitsInOrder":100,"UnitsInStock":4},{"CategoryID":1,"Discontinued":false,"ProductID":67,"ProductName":"Laughing Lumberjack Lager","QuantityPerUnit":"24 - 12 oz bottles","SupplierID":16,"UnitPrice":14.0000,"UnitsInOrder":0,"UnitsInStock":52},{"CategoryID":3,"Discontinued":false,"ProductID":68,"ProductName":"Scottish Longbreads","QuantityPerUnit":"10 boxes x 8 pieces","SupplierID":8,"UnitPrice":12.5000,"UnitsInOrder":10,"UnitsInStock":6},{"CategoryID":4,"Discontinued":false,"ProductID":69,"ProductName":"Gudbrandsdalsost","QuantityPerUnit":"10 kg pkg.","SupplierID":15,"UnitPrice":36.0000,"UnitsInOrder":0,"UnitsInStock":26},{"CategoryID":1,"Discontinued":false,"ProductID":70,"ProductName":"Outback Lager","QuantityPerUnit":"24 - 355 ml bottles","SupplierID":7,"UnitPrice":15.0000,"UnitsInOrder":10,"UnitsInStock":15},{"CategoryID":4,"Discontinued":false,"ProductID":71,"ProductName":"Flotemysost","QuantityPerUnit":"10 - 500 g pkgs.","SupplierID":15,"UnitPrice":21.5000,"UnitsInOrder":0,"UnitsInStock":26},{"CategoryID":4,"Discontinued":false,"ProductID":72,"ProductName":"Mozzarella di Giovanni","QuantityPerUnit":"24 - 200 g pkgs.","SupplierID":14,"UnitPrice":34.8000,"UnitsInOrder":0,"UnitsInStock":14},{"CategoryID":8,"Discontinued":false,"ProductID":73,"ProductName":"R�d Kaviar","QuantityPerUnit":"24 - 150 g jars","SupplierID":17,"UnitPrice":15.0000,"UnitsInOrder":0,"UnitsInStock":101},{"CategoryID":7,"Discontinued":false,"ProductID":74,"ProductName":"Longlife Tofu","QuantityPerUnit":"5 kg pkg.","SupplierID":4,"UnitPrice":10.0000,"UnitsInOrder":20,"UnitsInStock":4},{"CategoryID":1,"Discontinued":false,"ProductID":75,"ProductName":"Rh�nbr�u Klosterbier","QuantityPerUnit":"24 - 0.5 l bottles","SupplierID":12,"UnitPrice":7.7500,"UnitsInOrder":0,"UnitsInStock":125},{"CategoryID":1,"Discontinued":false,"ProductID":76,"ProductName":"Lakkalik��ri","QuantityPerUnit":"500 ml","SupplierID":23,"UnitPrice":18.0000,"UnitsInOrder":0,"UnitsInStock":57},{"CategoryID":2,"Discontinued":false,"ProductID":77,"ProductName":"Original Frankfurter gr�ne So�e","QuantityPerUnit":"12 boxes","SupplierID":12,"UnitPrice":13.0000,"UnitsInOrder":0,"UnitsInStock":32}]
				}
			}
		});
	
		$.mockjax({
			url: 'WCFXMLBare',
			responseText: '<ArrayOfProduct xmlns="http://schemas.datacontract.org/2004/07/" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><Product><CategoryID>1</CategoryID><Discontinued>false</Discontinued><ProductID>1</ProductID><ProductName>Chai</ProductName><QuantityPerUnit>10 boxes x 20 bags</QuantityPerUnit><SupplierID>1</SupplierID><UnitPrice>18.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>39</UnitsInStock></Product><Product><CategoryID>1</CategoryID><Discontinued>false</Discontinued><ProductID>2</ProductID><ProductName>Chang</ProductName><QuantityPerUnit>24 - 12 oz bottles</QuantityPerUnit><SupplierID>1</SupplierID><UnitPrice>19.0000</UnitPrice><UnitsInOrder>40</UnitsInOrder><UnitsInStock>17</UnitsInStock></Product><Product><CategoryID>2</CategoryID><Discontinued>false</Discontinued><ProductID>3</ProductID><ProductName>Aniseed Syrup</ProductName><QuantityPerUnit>12 - 550 ml bottles</QuantityPerUnit><SupplierID>1</SupplierID><UnitPrice>10.0000</UnitPrice><UnitsInOrder>70</UnitsInOrder><UnitsInStock>13</UnitsInStock></Product><Product><CategoryID>2</CategoryID><Discontinued>false</Discontinued><ProductID>4</ProductID><ProductName>Chef Antons Cajun Seasoning</ProductName><QuantityPerUnit>48 - 6 oz jars</QuantityPerUnit><SupplierID>2</SupplierID><UnitPrice>22.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>53</UnitsInStock></Product><Product><CategoryID>2</CategoryID><Discontinued>true</Discontinued><ProductID>5</ProductID><ProductName>Chef Antons Gumbo Mix</ProductName><QuantityPerUnit>36 boxes</QuantityPerUnit><SupplierID>2</SupplierID><UnitPrice>21.3500</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>0</UnitsInStock></Product><Product><CategoryID>2</CategoryID><Discontinued>false</Discontinued><ProductID>6</ProductID><ProductName>Grandmas Boysenberry Spread</ProductName><QuantityPerUnit>12 - 8 oz jars</QuantityPerUnit><SupplierID>3</SupplierID><UnitPrice>25.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>120</UnitsInStock></Product><Product><CategoryID>7</CategoryID><Discontinued>false</Discontinued><ProductID>7</ProductID><ProductName>Uncle Bobs Organic Dried Pears</ProductName><QuantityPerUnit>12 - 1 lb pkgs.</QuantityPerUnit><SupplierID>3</SupplierID><UnitPrice>30.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>15</UnitsInStock></Product><Product><CategoryID>2</CategoryID><Discontinued>false</Discontinued><ProductID>8</ProductID><ProductName>Northwoods Cranberry Sauce</ProductName><QuantityPerUnit>12 - 12 oz jars</QuantityPerUnit><SupplierID>3</SupplierID><UnitPrice>40.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>6</UnitsInStock></Product><Product><CategoryID>6</CategoryID><Discontinued>true</Discontinued><ProductID>9</ProductID><ProductName>Mishi Kobe Niku</ProductName><QuantityPerUnit>18 - 500 g pkgs.</QuantityPerUnit><SupplierID>4</SupplierID><UnitPrice>97.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>29</UnitsInStock></Product><Product><CategoryID>8</CategoryID><Discontinued>false</Discontinued><ProductID>10</ProductID><ProductName>Ikura</ProductName><QuantityPerUnit>12 - 200 ml jars</QuantityPerUnit><SupplierID>4</SupplierID><UnitPrice>31.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>31</UnitsInStock></Product><Product><CategoryID>4</CategoryID><Discontinued>false</Discontinued><ProductID>11</ProductID><ProductName>Queso Cabrales</ProductName><QuantityPerUnit>1 kg pkg.</QuantityPerUnit><SupplierID>5</SupplierID><UnitPrice>21.0000</UnitPrice><UnitsInOrder>30</UnitsInOrder><UnitsInStock>22</UnitsInStock></Product><Product><CategoryID>4</CategoryID><Discontinued>false</Discontinued><ProductID>12</ProductID><ProductName>Queso Manchego La Pastora</ProductName><QuantityPerUnit>10 - 500 g pkgs.</QuantityPerUnit><SupplierID>5</SupplierID><UnitPrice>38.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>86</UnitsInStock></Product><Product><CategoryID>8</CategoryID><Discontinued>false</Discontinued><ProductID>13</ProductID><ProductName>Konbu</ProductName><QuantityPerUnit>2 kg box</QuantityPerUnit><SupplierID>6</SupplierID><UnitPrice>6.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>24</UnitsInStock></Product><Product><CategoryID>7</CategoryID><Discontinued>false</Discontinued><ProductID>14</ProductID><ProductName>Tofu</ProductName><QuantityPerUnit>40 - 100 g pkgs.</QuantityPerUnit><SupplierID>6</SupplierID><UnitPrice>23.2500</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>35</UnitsInStock></Product><Product><CategoryID>2</CategoryID><Discontinued>false</Discontinued><ProductID>15</ProductID><ProductName>Genen Shouyu</ProductName><QuantityPerUnit>24 - 250 ml bottles</QuantityPerUnit><SupplierID>6</SupplierID><UnitPrice>15.5000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>39</UnitsInStock></Product><Product><CategoryID>3</CategoryID><Discontinued>false</Discontinued><ProductID>16</ProductID><ProductName>Pavlova</ProductName><QuantityPerUnit>32 - 500 g boxes</QuantityPerUnit><SupplierID>7</SupplierID><UnitPrice>17.4500</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>29</UnitsInStock></Product><Product><CategoryID>6</CategoryID><Discontinued>true</Discontinued><ProductID>17</ProductID><ProductName>Alice Mutton</ProductName><QuantityPerUnit>20 - 1 kg tins</QuantityPerUnit><SupplierID>7</SupplierID><UnitPrice>39.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>0</UnitsInStock></Product><Product><CategoryID>8</CategoryID><Discontinued>false</Discontinued><ProductID>18</ProductID><ProductName>Carnarvon Tigers</ProductName><QuantityPerUnit>16 kg pkg.</QuantityPerUnit><SupplierID>7</SupplierID><UnitPrice>62.5000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>42</UnitsInStock></Product><Product><CategoryID>3</CategoryID><Discontinued>false</Discontinued><ProductID>19</ProductID><ProductName>Teatime Chocolate Biscuits</ProductName><QuantityPerUnit>10 boxes x 12 pieces</QuantityPerUnit><SupplierID>8</SupplierID><UnitPrice>9.2000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>25</UnitsInStock></Product><Product><CategoryID>3</CategoryID><Discontinued>false</Discontinued><ProductID>20</ProductID><ProductName>Sir Rodneys Marmalade</ProductName><QuantityPerUnit>30 gift boxes</QuantityPerUnit><SupplierID>8</SupplierID><UnitPrice>81.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>40</UnitsInStock></Product><Product><CategoryID>3</CategoryID><Discontinued>false</Discontinued><ProductID>21</ProductID><ProductName>Sir Rodneys Scones</ProductName><QuantityPerUnit>24 pkgs. x 4 pieces</QuantityPerUnit><SupplierID>8</SupplierID><UnitPrice>10.0000</UnitPrice><UnitsInOrder>40</UnitsInOrder><UnitsInStock>3</UnitsInStock></Product><Product><CategoryID>5</CategoryID><Discontinued>false</Discontinued><ProductID>22</ProductID><ProductName>Gustafs Kn�ckebr�d</ProductName><QuantityPerUnit>24 - 500 g pkgs.</QuantityPerUnit><SupplierID>9</SupplierID><UnitPrice>21.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>104</UnitsInStock></Product><Product><CategoryID>5</CategoryID><Discontinued>false</Discontinued><ProductID>23</ProductID><ProductName>Tunnbr�d</ProductName><QuantityPerUnit>12 - 250 g pkgs.</QuantityPerUnit><SupplierID>9</SupplierID><UnitPrice>9.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>61</UnitsInStock></Product><Product><CategoryID>1</CategoryID><Discontinued>true</Discontinued><ProductID>24</ProductID><ProductName>Guaran� Fant�stica</ProductName><QuantityPerUnit>12 - 355 ml cans</QuantityPerUnit><SupplierID>10</SupplierID><UnitPrice>4.5000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>20</UnitsInStock></Product><Product><CategoryID>3</CategoryID><Discontinued>false</Discontinued><ProductID>25</ProductID><ProductName>NuNuCa Nu�-Nougat-Creme</ProductName><QuantityPerUnit>20 - 450 g glasses</QuantityPerUnit><SupplierID>11</SupplierID><UnitPrice>14.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>76</UnitsInStock></Product><Product><CategoryID>3</CategoryID><Discontinued>false</Discontinued><ProductID>26</ProductID><ProductName>Gumb�r Gummib�rchen</ProductName><QuantityPerUnit>100 - 250 g bags</QuantityPerUnit><SupplierID>11</SupplierID><UnitPrice>31.2300</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>15</UnitsInStock></Product><Product><CategoryID>3</CategoryID><Discontinued>false</Discontinued><ProductID>27</ProductID><ProductName>Schoggi Schokolade</ProductName><QuantityPerUnit>100 - 100 g pieces</QuantityPerUnit><SupplierID>11</SupplierID><UnitPrice>43.9000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>49</UnitsInStock></Product><Product><CategoryID>7</CategoryID><Discontinued>true</Discontinued><ProductID>28</ProductID><ProductName>R�ssle Sauerkraut</ProductName><QuantityPerUnit>25 - 825 g cans</QuantityPerUnit><SupplierID>12</SupplierID><UnitPrice>45.6000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>26</UnitsInStock></Product><Product><CategoryID>6</CategoryID><Discontinued>true</Discontinued><ProductID>29</ProductID><ProductName>Th�ringer Rostbratwurst</ProductName><QuantityPerUnit>50 bags x 30 sausgs.</QuantityPerUnit><SupplierID>12</SupplierID><UnitPrice>123.7900</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>0</UnitsInStock></Product><Product><CategoryID>8</CategoryID><Discontinued>false</Discontinued><ProductID>30</ProductID><ProductName>Nord-Ost Matjeshering</ProductName><QuantityPerUnit>10 - 200 g glasses</QuantityPerUnit><SupplierID>13</SupplierID><UnitPrice>25.8900</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>10</UnitsInStock></Product><Product><CategoryID>4</CategoryID><Discontinued>false</Discontinued><ProductID>31</ProductID><ProductName>Gorgonzola Telino</ProductName><QuantityPerUnit>12 - 100 g pkgs</QuantityPerUnit><SupplierID>14</SupplierID><UnitPrice>12.5000</UnitPrice><UnitsInOrder>70</UnitsInOrder><UnitsInStock>0</UnitsInStock></Product><Product><CategoryID>4</CategoryID><Discontinued>false</Discontinued><ProductID>32</ProductID><ProductName>Mascarpone Fabioli</ProductName><QuantityPerUnit>24 - 200 g pkgs.</QuantityPerUnit><SupplierID>14</SupplierID><UnitPrice>32.0000</UnitPrice><UnitsInOrder>40</UnitsInOrder><UnitsInStock>9</UnitsInStock></Product><Product><CategoryID>4</CategoryID><Discontinued>false</Discontinued><ProductID>33</ProductID><ProductName>Geitost</ProductName><QuantityPerUnit>500 g</QuantityPerUnit><SupplierID>15</SupplierID><UnitPrice>2.5000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>112</UnitsInStock></Product><Product><CategoryID>1</CategoryID><Discontinued>false</Discontinued><ProductID>34</ProductID><ProductName>Sasquatch Ale</ProductName><QuantityPerUnit>24 - 12 oz bottles</QuantityPerUnit><SupplierID>16</SupplierID><UnitPrice>14.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>111</UnitsInStock></Product><Product><CategoryID>1</CategoryID><Discontinued>false</Discontinued><ProductID>35</ProductID><ProductName>Steeleye Stout</ProductName><QuantityPerUnit>24 - 12 oz bottles</QuantityPerUnit><SupplierID>16</SupplierID><UnitPrice>18.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>20</UnitsInStock></Product><Product><CategoryID>8</CategoryID><Discontinued>false</Discontinued><ProductID>36</ProductID><ProductName>Inlagd Sill</ProductName><QuantityPerUnit>24 - 250 g  jars</QuantityPerUnit><SupplierID>17</SupplierID><UnitPrice>19.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>112</UnitsInStock></Product><Product><CategoryID>8</CategoryID><Discontinued>false</Discontinued><ProductID>37</ProductID><ProductName>Gravad lax</ProductName><QuantityPerUnit>12 - 500 g pkgs.</QuantityPerUnit><SupplierID>17</SupplierID><UnitPrice>26.0000</UnitPrice><UnitsInOrder>50</UnitsInOrder><UnitsInStock>11</UnitsInStock></Product><Product><CategoryID>1</CategoryID><Discontinued>false</Discontinued><ProductID>38</ProductID><ProductName>C�te de Blaye</ProductName><QuantityPerUnit>12 - 75 cl bottles</QuantityPerUnit><SupplierID>18</SupplierID><UnitPrice>263.5000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>17</UnitsInStock></Product><Product><CategoryID>1</CategoryID><Discontinued>false</Discontinued><ProductID>39</ProductID><ProductName>Chartreuse verte</ProductName><QuantityPerUnit>750 cc per bottle</QuantityPerUnit><SupplierID>18</SupplierID><UnitPrice>18.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>69</UnitsInStock></Product><Product><CategoryID>8</CategoryID><Discontinued>false</Discontinued><ProductID>40</ProductID><ProductName>Boston Crab Meat</ProductName><QuantityPerUnit>24 - 4 oz tins</QuantityPerUnit><SupplierID>19</SupplierID><UnitPrice>18.4000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>123</UnitsInStock></Product><Product><CategoryID>8</CategoryID><Discontinued>false</Discontinued><ProductID>41</ProductID><ProductName>Jacks New England Clam Chowder</ProductName><QuantityPerUnit>12 - 12 oz cans</QuantityPerUnit><SupplierID>19</SupplierID><UnitPrice>9.6500</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>85</UnitsInStock></Product><Product><CategoryID>5</CategoryID><Discontinued>true</Discontinued><ProductID>42</ProductID><ProductName>Singaporean Hokkien Fried Mee</ProductName><QuantityPerUnit>32 - 1 kg pkgs.</QuantityPerUnit><SupplierID>20</SupplierID><UnitPrice>14.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>26</UnitsInStock></Product><Product><CategoryID>1</CategoryID><Discontinued>false</Discontinued><ProductID>43</ProductID><ProductName>Ipoh Coffee</ProductName><QuantityPerUnit>16 - 500 g tins</QuantityPerUnit><SupplierID>20</SupplierID><UnitPrice>46.0000</UnitPrice><UnitsInOrder>10</UnitsInOrder><UnitsInStock>17</UnitsInStock></Product><Product><CategoryID>2</CategoryID><Discontinued>false</Discontinued><ProductID>44</ProductID><ProductName>Gula Malacca</ProductName><QuantityPerUnit>20 - 2 kg bags</QuantityPerUnit><SupplierID>20</SupplierID><UnitPrice>19.4500</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>27</UnitsInStock></Product><Product><CategoryID>8</CategoryID><Discontinued>false</Discontinued><ProductID>45</ProductID><ProductName>Rogede sild</ProductName><QuantityPerUnit>1k pkg.</QuantityPerUnit><SupplierID>21</SupplierID><UnitPrice>9.5000</UnitPrice><UnitsInOrder>70</UnitsInOrder><UnitsInStock>5</UnitsInStock></Product><Product><CategoryID>8</CategoryID><Discontinued>false</Discontinued><ProductID>46</ProductID><ProductName>Spegesild</ProductName><QuantityPerUnit>4 - 450 g glasses</QuantityPerUnit><SupplierID>21</SupplierID><UnitPrice>12.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>95</UnitsInStock></Product><Product><CategoryID>3</CategoryID><Discontinued>false</Discontinued><ProductID>47</ProductID><ProductName>Zaanse koeken</ProductName><QuantityPerUnit>10 - 4 oz boxes</QuantityPerUnit><SupplierID>22</SupplierID><UnitPrice>9.5000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>36</UnitsInStock></Product><Product><CategoryID>3</CategoryID><Discontinued>false</Discontinued><ProductID>48</ProductID><ProductName>Chocolade</ProductName><QuantityPerUnit>10 pkgs.</QuantityPerUnit><SupplierID>22</SupplierID><UnitPrice>12.7500</UnitPrice><UnitsInOrder>70</UnitsInOrder><UnitsInStock>15</UnitsInStock></Product><Product><CategoryID>3</CategoryID><Discontinued>false</Discontinued><ProductID>49</ProductID><ProductName>Maxilaku</ProductName><QuantityPerUnit>24 - 50 g pkgs.</QuantityPerUnit><SupplierID>23</SupplierID><UnitPrice>20.0000</UnitPrice><UnitsInOrder>60</UnitsInOrder><UnitsInStock>10</UnitsInStock></Product><Product><CategoryID>3</CategoryID><Discontinued>false</Discontinued><ProductID>50</ProductID><ProductName>Valkoinen suklaa</ProductName><QuantityPerUnit>12 - 100 g bars</QuantityPerUnit><SupplierID>23</SupplierID><UnitPrice>16.2500</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>65</UnitsInStock></Product><Product><CategoryID>7</CategoryID><Discontinued>false</Discontinued><ProductID>51</ProductID><ProductName>Manjimup Dried Apples</ProductName><QuantityPerUnit>50 - 300 g pkgs.</QuantityPerUnit><SupplierID>24</SupplierID><UnitPrice>53.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>20</UnitsInStock></Product><Product><CategoryID>5</CategoryID><Discontinued>false</Discontinued><ProductID>52</ProductID><ProductName>Filo Mix</ProductName><QuantityPerUnit>16 - 2 kg boxes</QuantityPerUnit><SupplierID>24</SupplierID><UnitPrice>7.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>38</UnitsInStock></Product><Product><CategoryID>6</CategoryID><Discontinued>true</Discontinued><ProductID>53</ProductID><ProductName>Perth Pasties</ProductName><QuantityPerUnit>48 pieces</QuantityPerUnit><SupplierID>24</SupplierID><UnitPrice>32.8000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>0</UnitsInStock></Product><Product><CategoryID>6</CategoryID><Discontinued>false</Discontinued><ProductID>54</ProductID><ProductName>Tourti�re</ProductName><QuantityPerUnit>16 pies</QuantityPerUnit><SupplierID>25</SupplierID><UnitPrice>7.4500</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>21</UnitsInStock></Product><Product><CategoryID>6</CategoryID><Discontinued>false</Discontinued><ProductID>55</ProductID><ProductName>P�t� chinois</ProductName><QuantityPerUnit>24 boxes x 2 pies</QuantityPerUnit><SupplierID>25</SupplierID><UnitPrice>24.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>115</UnitsInStock></Product><Product><CategoryID>5</CategoryID><Discontinued>false</Discontinued><ProductID>56</ProductID><ProductName>Gnocchi di nonna Alice</ProductName><QuantityPerUnit>24 - 250 g pkgs.</QuantityPerUnit><SupplierID>26</SupplierID><UnitPrice>38.0000</UnitPrice><UnitsInOrder>10</UnitsInOrder><UnitsInStock>21</UnitsInStock></Product><Product><CategoryID>5</CategoryID><Discontinued>false</Discontinued><ProductID>57</ProductID><ProductName>Ravioli Angelo</ProductName><QuantityPerUnit>24 - 250 g pkgs.</QuantityPerUnit><SupplierID>26</SupplierID><UnitPrice>19.5000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>36</UnitsInStock></Product><Product><CategoryID>8</CategoryID><Discontinued>false</Discontinued><ProductID>58</ProductID><ProductName>Escargots de Bourgogne</ProductName><QuantityPerUnit>24 pieces</QuantityPerUnit><SupplierID>27</SupplierID><UnitPrice>13.2500</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>62</UnitsInStock></Product><Product><CategoryID>4</CategoryID><Discontinued>false</Discontinued><ProductID>59</ProductID><ProductName>Raclette Courdavault</ProductName><QuantityPerUnit>5 kg pkg.</QuantityPerUnit><SupplierID>28</SupplierID><UnitPrice>55.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>79</UnitsInStock></Product><Product><CategoryID>4</CategoryID><Discontinued>false</Discontinued><ProductID>60</ProductID><ProductName>Camembert Pierrot</ProductName><QuantityPerUnit>15 - 300 g rounds</QuantityPerUnit><SupplierID>28</SupplierID><UnitPrice>34.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>19</UnitsInStock></Product><Product><CategoryID>2</CategoryID><Discontinued>false</Discontinued><ProductID>61</ProductID><ProductName>Sirop d�rable</ProductName><QuantityPerUnit>24 - 500 ml bottles</QuantityPerUnit><SupplierID>29</SupplierID><UnitPrice>28.5000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>113</UnitsInStock></Product><Product><CategoryID>3</CategoryID><Discontinued>false</Discontinued><ProductID>62</ProductID><ProductName>Tarte au sucre</ProductName><QuantityPerUnit>48 pies</QuantityPerUnit><SupplierID>29</SupplierID><UnitPrice>49.3000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>17</UnitsInStock></Product><Product><CategoryID>2</CategoryID><Discontinued>false</Discontinued><ProductID>63</ProductID><ProductName>Vegie-spread</ProductName><QuantityPerUnit>15 - 625 g jars</QuantityPerUnit><SupplierID>7</SupplierID><UnitPrice>43.9000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>24</UnitsInStock></Product><Product><CategoryID>5</CategoryID><Discontinued>false</Discontinued><ProductID>64</ProductID><ProductName>Wimmers gute Semmelkn�del</ProductName><QuantityPerUnit>20 bags x 4 pieces</QuantityPerUnit><SupplierID>12</SupplierID><UnitPrice>33.2500</UnitPrice><UnitsInOrder>80</UnitsInOrder><UnitsInStock>22</UnitsInStock></Product><Product><CategoryID>2</CategoryID><Discontinued>false</Discontinued><ProductID>65</ProductID><ProductName>Louisiana Fiery Hot Pepper Sauce</ProductName><QuantityPerUnit>32 - 8 oz bottles</QuantityPerUnit><SupplierID>2</SupplierID><UnitPrice>21.0500</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>76</UnitsInStock></Product><Product><CategoryID>2</CategoryID><Discontinued>false</Discontinued><ProductID>66</ProductID><ProductName>Louisiana Hot Spiced Okra</ProductName><QuantityPerUnit>24 - 8 oz jars</QuantityPerUnit><SupplierID>2</SupplierID><UnitPrice>17.0000</UnitPrice><UnitsInOrder>100</UnitsInOrder><UnitsInStock>4</UnitsInStock></Product><Product><CategoryID>1</CategoryID><Discontinued>false</Discontinued><ProductID>67</ProductID><ProductName>Laughing Lumberjack Lager</ProductName><QuantityPerUnit>24 - 12 oz bottles</QuantityPerUnit><SupplierID>16</SupplierID><UnitPrice>14.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>52</UnitsInStock></Product><Product><CategoryID>3</CategoryID><Discontinued>false</Discontinued><ProductID>68</ProductID><ProductName>Scottish Longbreads</ProductName><QuantityPerUnit>10 boxes x 8 pieces</QuantityPerUnit><SupplierID>8</SupplierID><UnitPrice>12.5000</UnitPrice><UnitsInOrder>10</UnitsInOrder><UnitsInStock>6</UnitsInStock></Product><Product><CategoryID>4</CategoryID><Discontinued>false</Discontinued><ProductID>69</ProductID><ProductName>Gudbrandsdalsost</ProductName><QuantityPerUnit>10 kg pkg.</QuantityPerUnit><SupplierID>15</SupplierID><UnitPrice>36.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>26</UnitsInStock></Product><Product><CategoryID>1</CategoryID><Discontinued>false</Discontinued><ProductID>70</ProductID><ProductName>Outback Lager</ProductName><QuantityPerUnit>24 - 355 ml bottles</QuantityPerUnit><SupplierID>7</SupplierID><UnitPrice>15.0000</UnitPrice><UnitsInOrder>10</UnitsInOrder><UnitsInStock>15</UnitsInStock></Product><Product><CategoryID>4</CategoryID><Discontinued>false</Discontinued><ProductID>71</ProductID><ProductName>Flotemysost</ProductName><QuantityPerUnit>10 - 500 g pkgs.</QuantityPerUnit><SupplierID>15</SupplierID><UnitPrice>21.5000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>26</UnitsInStock></Product><Product><CategoryID>4</CategoryID><Discontinued>false</Discontinued><ProductID>72</ProductID><ProductName>Mozzarella di Giovanni</ProductName><QuantityPerUnit>24 - 200 g pkgs.</QuantityPerUnit><SupplierID>14</SupplierID><UnitPrice>34.8000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>14</UnitsInStock></Product><Product><CategoryID>8</CategoryID><Discontinued>false</Discontinued><ProductID>73</ProductID><ProductName>R�d Kaviar</ProductName><QuantityPerUnit>24 - 150 g jars</QuantityPerUnit><SupplierID>17</SupplierID><UnitPrice>15.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>101</UnitsInStock></Product><Product><CategoryID>7</CategoryID><Discontinued>false</Discontinued><ProductID>74</ProductID><ProductName>Longlife Tofu</ProductName><QuantityPerUnit>5 kg pkg.</QuantityPerUnit><SupplierID>4</SupplierID><UnitPrice>10.0000</UnitPrice><UnitsInOrder>20</UnitsInOrder><UnitsInStock>4</UnitsInStock></Product><Product><CategoryID>1</CategoryID><Discontinued>false</Discontinued><ProductID>75</ProductID><ProductName>Rh�nbr�u Klosterbier</ProductName><QuantityPerUnit>24 - 0.5 l bottles</QuantityPerUnit><SupplierID>12</SupplierID><UnitPrice>7.7500</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>125</UnitsInStock></Product><Product><CategoryID>1</CategoryID><Discontinued>false</Discontinued><ProductID>76</ProductID><ProductName>Lakkalik��ri</ProductName><QuantityPerUnit>500 ml</QuantityPerUnit><SupplierID>23</SupplierID><UnitPrice>18.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>57</UnitsInStock></Product><Product><CategoryID>2</CategoryID><Discontinued>false</Discontinued><ProductID>77</ProductID><ProductName>Original Frankfurter gr�ne So�e</ProductName><QuantityPerUnit>12 boxes</QuantityPerUnit><SupplierID>12</SupplierID><UnitPrice>13.0000</UnitPrice><UnitsInOrder>0</UnitsInOrder><UnitsInStock>32</UnitsInStock></Product></ArrayOfProduct>'
	
		});
	
		$.mockjax({
			url: 'WCFXMLWrapped',
			responseText: '<GetProductsXMLResponse xmlns="JsonStockService"><GetProductsXMLResult xmlns:a="http://schemas.datacontract.org/2004/07/" xmlns:i="http://www.w3.org/2001/XMLSchema-instance"><a:Product><a:CategoryID>1</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>1</a:ProductID><a:ProductName>Chai</a:ProductName><a:QuantityPerUnit>10 boxes x 20 bags</a:QuantityPerUnit><a:SupplierID>1</a:SupplierID><a:UnitPrice>18.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>39</a:UnitsInStock></a:Product><a:Product><a:CategoryID>1</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>2</a:ProductID><a:ProductName>Chang</a:ProductName><a:QuantityPerUnit>24 - 12 oz bottles</a:QuantityPerUnit><a:SupplierID>1</a:SupplierID><a:UnitPrice>19.0000</a:UnitPrice><a:UnitsInOrder>40</a:UnitsInOrder><a:UnitsInStock>17</a:UnitsInStock></a:Product><a:Product><a:CategoryID>2</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>3</a:ProductID><a:ProductName>Aniseed Syrup</a:ProductName><a:QuantityPerUnit>12 - 550 ml bottles</a:QuantityPerUnit><a:SupplierID>1</a:SupplierID><a:UnitPrice>10.0000</a:UnitPrice><a:UnitsInOrder>70</a:UnitsInOrder><a:UnitsInStock>13</a:UnitsInStock></a:Product><a:Product><a:CategoryID>2</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>4</a:ProductID><a:ProductName>Chef Antons Cajun Seasoning</a:ProductName><a:QuantityPerUnit>48 - 6 oz jars</a:QuantityPerUnit><a:SupplierID>2</a:SupplierID><a:UnitPrice>22.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>53</a:UnitsInStock></a:Product><a:Product><a:CategoryID>2</a:CategoryID><a:Discontinued>true</a:Discontinued><a:ProductID>5</a:ProductID><a:ProductName>Chef Antons Gumbo Mix</a:ProductName><a:QuantityPerUnit>36 boxes</a:QuantityPerUnit><a:SupplierID>2</a:SupplierID><a:UnitPrice>21.3500</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>0</a:UnitsInStock></a:Product><a:Product><a:CategoryID>2</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>6</a:ProductID><a:ProductName>Grandmas Boysenberry Spread</a:ProductName><a:QuantityPerUnit>12 - 8 oz jars</a:QuantityPerUnit><a:SupplierID>3</a:SupplierID><a:UnitPrice>25.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>120</a:UnitsInStock></a:Product><a:Product><a:CategoryID>7</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>7</a:ProductID><a:ProductName>Uncle Bobs Organic Dried Pears</a:ProductName><a:QuantityPerUnit>12 - 1 lb pkgs.</a:QuantityPerUnit><a:SupplierID>3</a:SupplierID><a:UnitPrice>30.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>15</a:UnitsInStock></a:Product><a:Product><a:CategoryID>2</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>8</a:ProductID><a:ProductName>Northwoods Cranberry Sauce</a:ProductName><a:QuantityPerUnit>12 - 12 oz jars</a:QuantityPerUnit><a:SupplierID>3</a:SupplierID><a:UnitPrice>40.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>6</a:UnitsInStock></a:Product><a:Product><a:CategoryID>6</a:CategoryID><a:Discontinued>true</a:Discontinued><a:ProductID>9</a:ProductID><a:ProductName>Mishi Kobe Niku</a:ProductName><a:QuantityPerUnit>18 - 500 g pkgs.</a:QuantityPerUnit><a:SupplierID>4</a:SupplierID><a:UnitPrice>97.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>29</a:UnitsInStock></a:Product><a:Product><a:CategoryID>8</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>10</a:ProductID><a:ProductName>Ikura</a:ProductName><a:QuantityPerUnit>12 - 200 ml jars</a:QuantityPerUnit><a:SupplierID>4</a:SupplierID><a:UnitPrice>31.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>31</a:UnitsInStock></a:Product><a:Product><a:CategoryID>4</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>11</a:ProductID><a:ProductName>Queso Cabrales</a:ProductName><a:QuantityPerUnit>1 kg pkg.</a:QuantityPerUnit><a:SupplierID>5</a:SupplierID><a:UnitPrice>21.0000</a:UnitPrice><a:UnitsInOrder>30</a:UnitsInOrder><a:UnitsInStock>22</a:UnitsInStock></a:Product><a:Product><a:CategoryID>4</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>12</a:ProductID><a:ProductName>Queso Manchego La Pastora</a:ProductName><a:QuantityPerUnit>10 - 500 g pkgs.</a:QuantityPerUnit><a:SupplierID>5</a:SupplierID><a:UnitPrice>38.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>86</a:UnitsInStock></a:Product><a:Product><a:CategoryID>8</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>13</a:ProductID><a:ProductName>Konbu</a:ProductName><a:QuantityPerUnit>2 kg box</a:QuantityPerUnit><a:SupplierID>6</a:SupplierID><a:UnitPrice>6.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>24</a:UnitsInStock></a:Product><a:Product><a:CategoryID>7</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>14</a:ProductID><a:ProductName>Tofu</a:ProductName><a:QuantityPerUnit>40 - 100 g pkgs.</a:QuantityPerUnit><a:SupplierID>6</a:SupplierID><a:UnitPrice>23.2500</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>35</a:UnitsInStock></a:Product><a:Product><a:CategoryID>2</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>15</a:ProductID><a:ProductName>Genen Shouyu</a:ProductName><a:QuantityPerUnit>24 - 250 ml bottles</a:QuantityPerUnit><a:SupplierID>6</a:SupplierID><a:UnitPrice>15.5000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>39</a:UnitsInStock></a:Product><a:Product><a:CategoryID>3</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>16</a:ProductID><a:ProductName>Pavlova</a:ProductName><a:QuantityPerUnit>32 - 500 g boxes</a:QuantityPerUnit><a:SupplierID>7</a:SupplierID><a:UnitPrice>17.4500</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>29</a:UnitsInStock></a:Product><a:Product><a:CategoryID>6</a:CategoryID><a:Discontinued>true</a:Discontinued><a:ProductID>17</a:ProductID><a:ProductName>Alice Mutton</a:ProductName><a:QuantityPerUnit>20 - 1 kg tins</a:QuantityPerUnit><a:SupplierID>7</a:SupplierID><a:UnitPrice>39.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>0</a:UnitsInStock></a:Product><a:Product><a:CategoryID>8</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>18</a:ProductID><a:ProductName>Carnarvon Tigers</a:ProductName><a:QuantityPerUnit>16 kg pkg.</a:QuantityPerUnit><a:SupplierID>7</a:SupplierID><a:UnitPrice>62.5000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>42</a:UnitsInStock></a:Product><a:Product><a:CategoryID>3</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>19</a:ProductID><a:ProductName>Teatime Chocolate Biscuits</a:ProductName><a:QuantityPerUnit>10 boxes x 12 pieces</a:QuantityPerUnit><a:SupplierID>8</a:SupplierID><a:UnitPrice>9.2000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>25</a:UnitsInStock></a:Product><a:Product><a:CategoryID>3</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>20</a:ProductID><a:ProductName>Sir Rodneys Marmalade</a:ProductName><a:QuantityPerUnit>30 gift boxes</a:QuantityPerUnit><a:SupplierID>8</a:SupplierID><a:UnitPrice>81.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>40</a:UnitsInStock></a:Product><a:Product><a:CategoryID>3</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>21</a:ProductID><a:ProductName>Sir Rodneys Scones</a:ProductName><a:QuantityPerUnit>24 pkgs. x 4 pieces</a:QuantityPerUnit><a:SupplierID>8</a:SupplierID><a:UnitPrice>10.0000</a:UnitPrice><a:UnitsInOrder>40</a:UnitsInOrder><a:UnitsInStock>3</a:UnitsInStock></a:Product><a:Product><a:CategoryID>5</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>22</a:ProductID><a:ProductName>Gustas Kn�ckebr�d</a:ProductName><a:QuantityPerUnit>24 - 500 g pkgs.</a:QuantityPerUnit><a:SupplierID>9</a:SupplierID><a:UnitPrice>21.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>104</a:UnitsInStock></a:Product><a:Product><a:CategoryID>5</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>23</a:ProductID><a:ProductName>Tunnbr�d</a:ProductName><a:QuantityPerUnit>12 - 250 g pkgs.</a:QuantityPerUnit><a:SupplierID>9</a:SupplierID><a:UnitPrice>9.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>61</a:UnitsInStock></a:Product><a:Product><a:CategoryID>1</a:CategoryID><a:Discontinued>true</a:Discontinued><a:ProductID>24</a:ProductID><a:ProductName>Guaran� Fant�stica</a:ProductName><a:QuantityPerUnit>12 - 355 ml cans</a:QuantityPerUnit><a:SupplierID>10</a:SupplierID><a:UnitPrice>4.5000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>20</a:UnitsInStock></a:Product><a:Product><a:CategoryID>3</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>25</a:ProductID><a:ProductName>NuNuCa Nu�-Nougat-Creme</a:ProductName><a:QuantityPerUnit>20 - 450 g glasses</a:QuantityPerUnit><a:SupplierID>11</a:SupplierID><a:UnitPrice>14.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>76</a:UnitsInStock></a:Product><a:Product><a:CategoryID>3</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>26</a:ProductID><a:ProductName>Gumb�r Gummib�rchen</a:ProductName><a:QuantityPerUnit>100 - 250 g bags</a:QuantityPerUnit><a:SupplierID>11</a:SupplierID><a:UnitPrice>31.2300</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>15</a:UnitsInStock></a:Product><a:Product><a:CategoryID>3</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>27</a:ProductID><a:ProductName>Schoggi Schokolade</a:ProductName><a:QuantityPerUnit>100 - 100 g pieces</a:QuantityPerUnit><a:SupplierID>11</a:SupplierID><a:UnitPrice>43.9000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>49</a:UnitsInStock></a:Product><a:Product><a:CategoryID>7</a:CategoryID><a:Discontinued>true</a:Discontinued><a:ProductID>28</a:ProductID><a:ProductName>R�ssle Sauerkraut</a:ProductName><a:QuantityPerUnit>25 - 825 g cans</a:QuantityPerUnit><a:SupplierID>12</a:SupplierID><a:UnitPrice>45.6000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>26</a:UnitsInStock></a:Product><a:Product><a:CategoryID>6</a:CategoryID><a:Discontinued>true</a:Discontinued><a:ProductID>29</a:ProductID><a:ProductName>Th�ringer Rostbratwurst</a:ProductName><a:QuantityPerUnit>50 bags x 30 sausgs.</a:QuantityPerUnit><a:SupplierID>12</a:SupplierID><a:UnitPrice>123.7900</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>0</a:UnitsInStock></a:Product><a:Product><a:CategoryID>8</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>30</a:ProductID><a:ProductName>Nord-Ost Matjeshering</a:ProductName><a:QuantityPerUnit>10 - 200 g glasses</a:QuantityPerUnit><a:SupplierID>13</a:SupplierID><a:UnitPrice>25.8900</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>10</a:UnitsInStock></a:Product><a:Product><a:CategoryID>4</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>31</a:ProductID><a:ProductName>Gorgonzola Telino</a:ProductName><a:QuantityPerUnit>12 - 100 g pkgs</a:QuantityPerUnit><a:SupplierID>14</a:SupplierID><a:UnitPrice>12.5000</a:UnitPrice><a:UnitsInOrder>70</a:UnitsInOrder><a:UnitsInStock>0</a:UnitsInStock></a:Product><a:Product><a:CategoryID>4</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>32</a:ProductID><a:ProductName>Mascarpone Fabioli</a:ProductName><a:QuantityPerUnit>24 - 200 g pkgs.</a:QuantityPerUnit><a:SupplierID>14</a:SupplierID><a:UnitPrice>32.0000</a:UnitPrice><a:UnitsInOrder>40</a:UnitsInOrder><a:UnitsInStock>9</a:UnitsInStock></a:Product><a:Product><a:CategoryID>4</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>33</a:ProductID><a:ProductName>Geitost</a:ProductName><a:QuantityPerUnit>500 g</a:QuantityPerUnit><a:SupplierID>15</a:SupplierID><a:UnitPrice>2.5000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>112</a:UnitsInStock></a:Product><a:Product><a:CategoryID>1</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>34</a:ProductID><a:ProductName>Sasquatch Ale</a:ProductName><a:QuantityPerUnit>24 - 12 oz bottles</a:QuantityPerUnit><a:SupplierID>16</a:SupplierID><a:UnitPrice>14.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>111</a:UnitsInStock></a:Product><a:Product><a:CategoryID>1</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>35</a:ProductID><a:ProductName>Steeleye Stout</a:ProductName><a:QuantityPerUnit>24 - 12 oz bottles</a:QuantityPerUnit><a:SupplierID>16</a:SupplierID><a:UnitPrice>18.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>20</a:UnitsInStock></a:Product><a:Product><a:CategoryID>8</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>36</a:ProductID><a:ProductName>Inlagd Sill</a:ProductName><a:QuantityPerUnit>24 - 250 g  jars</a:QuantityPerUnit><a:SupplierID>17</a:SupplierID><a:UnitPrice>19.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>112</a:UnitsInStock></a:Product><a:Product><a:CategoryID>8</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>37</a:ProductID><a:ProductName>Gravad lax</a:ProductName><a:QuantityPerUnit>12 - 500 g pkgs.</a:QuantityPerUnit><a:SupplierID>17</a:SupplierID><a:UnitPrice>26.0000</a:UnitPrice><a:UnitsInOrder>50</a:UnitsInOrder><a:UnitsInStock>11</a:UnitsInStock></a:Product><a:Product><a:CategoryID>1</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>38</a:ProductID><a:ProductName>C�te de Blaye</a:ProductName><a:QuantityPerUnit>12 - 75 cl bottles</a:QuantityPerUnit><a:SupplierID>18</a:SupplierID><a:UnitPrice>263.5000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>17</a:UnitsInStock></a:Product><a:Product><a:CategoryID>1</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>39</a:ProductID><a:ProductName>Chartreuse verte</a:ProductName><a:QuantityPerUnit>750 cc per bottle</a:QuantityPerUnit><a:SupplierID>18</a:SupplierID><a:UnitPrice>18.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>69</a:UnitsInStock></a:Product><a:Product><a:CategoryID>8</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>40</a:ProductID><a:ProductName>Boston Crab Meat</a:ProductName><a:QuantityPerUnit>24 - 4 oz tins</a:QuantityPerUnit><a:SupplierID>19</a:SupplierID><a:UnitPrice>18.4000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>123</a:UnitsInStock></a:Product><a:Product><a:CategoryID>8</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>41</a:ProductID><a:ProductName>Jacks New England Clam Chowder</a:ProductName><a:QuantityPerUnit>12 - 12 oz cans</a:QuantityPerUnit><a:SupplierID>19</a:SupplierID><a:UnitPrice>9.6500</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>85</a:UnitsInStock></a:Product><a:Product><a:CategoryID>5</a:CategoryID><a:Discontinued>true</a:Discontinued><a:ProductID>42</a:ProductID><a:ProductName>Singaporean Hokkien Fried Mee</a:ProductName><a:QuantityPerUnit>32 - 1 kg pkgs.</a:QuantityPerUnit><a:SupplierID>20</a:SupplierID><a:UnitPrice>14.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>26</a:UnitsInStock></a:Product><a:Product><a:CategoryID>1</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>43</a:ProductID><a:ProductName>Ipoh Coffee</a:ProductName><a:QuantityPerUnit>16 - 500 g tins</a:QuantityPerUnit><a:SupplierID>20</a:SupplierID><a:UnitPrice>46.0000</a:UnitPrice><a:UnitsInOrder>10</a:UnitsInOrder><a:UnitsInStock>17</a:UnitsInStock></a:Product><a:Product><a:CategoryID>2</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>44</a:ProductID><a:ProductName>Gula Malacca</a:ProductName><a:QuantityPerUnit>20 - 2 kg bags</a:QuantityPerUnit><a:SupplierID>20</a:SupplierID><a:UnitPrice>19.4500</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>27</a:UnitsInStock></a:Product><a:Product><a:CategoryID>8</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>45</a:ProductID><a:ProductName>Rogede sild</a:ProductName><a:QuantityPerUnit>1k pkg.</a:QuantityPerUnit><a:SupplierID>21</a:SupplierID><a:UnitPrice>9.5000</a:UnitPrice><a:UnitsInOrder>70</a:UnitsInOrder><a:UnitsInStock>5</a:UnitsInStock></a:Product><a:Product><a:CategoryID>8</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>46</a:ProductID><a:ProductName>Spegesild</a:ProductName><a:QuantityPerUnit>4 - 450 g glasses</a:QuantityPerUnit><a:SupplierID>21</a:SupplierID><a:UnitPrice>12.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>95</a:UnitsInStock></a:Product><a:Product><a:CategoryID>3</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>47</a:ProductID><a:ProductName>Zaanse koeken</a:ProductName><a:QuantityPerUnit>10 - 4 oz boxes</a:QuantityPerUnit><a:SupplierID>22</a:SupplierID><a:UnitPrice>9.5000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>36</a:UnitsInStock></a:Product><a:Product><a:CategoryID>3</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>48</a:ProductID><a:ProductName>Chocolade</a:ProductName><a:QuantityPerUnit>10 pkgs.</a:QuantityPerUnit><a:SupplierID>22</a:SupplierID><a:UnitPrice>12.7500</a:UnitPrice><a:UnitsInOrder>70</a:UnitsInOrder><a:UnitsInStock>15</a:UnitsInStock></a:Product><a:Product><a:CategoryID>3</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>49</a:ProductID><a:ProductName>Maxilaku</a:ProductName><a:QuantityPerUnit>24 - 50 g pkgs.</a:QuantityPerUnit><a:SupplierID>23</a:SupplierID><a:UnitPrice>20.0000</a:UnitPrice><a:UnitsInOrder>60</a:UnitsInOrder><a:UnitsInStock>10</a:UnitsInStock></a:Product><a:Product><a:CategoryID>3</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>50</a:ProductID><a:ProductName>Valkoinen suklaa</a:ProductName><a:QuantityPerUnit>12 - 100 g bars</a:QuantityPerUnit><a:SupplierID>23</a:SupplierID><a:UnitPrice>16.2500</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>65</a:UnitsInStock></a:Product><a:Product><a:CategoryID>7</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>51</a:ProductID><a:ProductName>Manjimup Dried Apples</a:ProductName><a:QuantityPerUnit>50 - 300 g pkgs.</a:QuantityPerUnit><a:SupplierID>24</a:SupplierID><a:UnitPrice>53.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>20</a:UnitsInStock></a:Product><a:Product><a:CategoryID>5</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>52</a:ProductID><a:ProductName>Filo Mix</a:ProductName><a:QuantityPerUnit>16 - 2 kg boxes</a:QuantityPerUnit><a:SupplierID>24</a:SupplierID><a:UnitPrice>7.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>38</a:UnitsInStock></a:Product><a:Product><a:CategoryID>6</a:CategoryID><a:Discontinued>true</a:Discontinued><a:ProductID>53</a:ProductID><a:ProductName>Perth Pasties</a:ProductName><a:QuantityPerUnit>48 pieces</a:QuantityPerUnit><a:SupplierID>24</a:SupplierID><a:UnitPrice>32.8000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>0</a:UnitsInStock></a:Product><a:Product><a:CategoryID>6</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>54</a:ProductID><a:ProductName>Tourti�re</a:ProductName><a:QuantityPerUnit>16 pies</a:QuantityPerUnit><a:SupplierID>25</a:SupplierID><a:UnitPrice>7.4500</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>21</a:UnitsInStock></a:Product><a:Product><a:CategoryID>6</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>55</a:ProductID><a:ProductName>P�t� chinois</a:ProductName><a:QuantityPerUnit>24 boxes x 2 pies</a:QuantityPerUnit><a:SupplierID>25</a:SupplierID><a:UnitPrice>24.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>115</a:UnitsInStock></a:Product><a:Product><a:CategoryID>5</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>56</a:ProductID><a:ProductName>Gnocchi di nonna Alice</a:ProductName><a:QuantityPerUnit>24 - 250 g pkgs.</a:QuantityPerUnit><a:SupplierID>26</a:SupplierID><a:UnitPrice>38.0000</a:UnitPrice><a:UnitsInOrder>10</a:UnitsInOrder><a:UnitsInStock>21</a:UnitsInStock></a:Product><a:Product><a:CategoryID>5</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>57</a:ProductID><a:ProductName>Ravioli Angelo</a:ProductName><a:QuantityPerUnit>24 - 250 g pkgs.</a:QuantityPerUnit><a:SupplierID>26</a:SupplierID><a:UnitPrice>19.5000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>36</a:UnitsInStock></a:Product><a:Product><a:CategoryID>8</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>58</a:ProductID><a:ProductName>Escargots de Bourgogne</a:ProductName><a:QuantityPerUnit>24 pieces</a:QuantityPerUnit><a:SupplierID>27</a:SupplierID><a:UnitPrice>13.2500</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>62</a:UnitsInStock></a:Product><a:Product><a:CategoryID>4</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>59</a:ProductID><a:ProductName>Raclette Courdavault</a:ProductName><a:QuantityPerUnit>5 kg pkg.</a:QuantityPerUnit><a:SupplierID>28</a:SupplierID><a:UnitPrice>55.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>79</a:UnitsInStock></a:Product><a:Product><a:CategoryID>4</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>60</a:ProductID><a:ProductName>Camembert Pierrot</a:ProductName><a:QuantityPerUnit>15 - 300 g rounds</a:QuantityPerUnit><a:SupplierID>28</a:SupplierID><a:UnitPrice>34.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>19</a:UnitsInStock></a:Product><a:Product><a:CategoryID>2</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>61</a:ProductID><a:ProductName>Sirop d�rable</a:ProductName><a:QuantityPerUnit>24 - 500 ml bottles</a:QuantityPerUnit><a:SupplierID>29</a:SupplierID><a:UnitPrice>28.5000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>113</a:UnitsInStock></a:Product><a:Product><a:CategoryID>3</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>62</a:ProductID><a:ProductName>Tarte au sucre</a:ProductName><a:QuantityPerUnit>48 pies</a:QuantityPerUnit><a:SupplierID>29</a:SupplierID><a:UnitPrice>49.3000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>17</a:UnitsInStock></a:Product><a:Product><a:CategoryID>2</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>63</a:ProductID><a:ProductName>Vegie-spread</a:ProductName><a:QuantityPerUnit>15 - 625 g jars</a:QuantityPerUnit><a:SupplierID>7</a:SupplierID><a:UnitPrice>43.9000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>24</a:UnitsInStock></a:Product><a:Product><a:CategoryID>5</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>64</a:ProductID><a:ProductName>Wimmers gute Semmelkn�del</a:ProductName><a:QuantityPerUnit>20 bags x 4 pieces</a:QuantityPerUnit><a:SupplierID>12</a:SupplierID><a:UnitPrice>33.2500</a:UnitPrice><a:UnitsInOrder>80</a:UnitsInOrder><a:UnitsInStock>22</a:UnitsInStock></a:Product><a:Product><a:CategoryID>2</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>65</a:ProductID><a:ProductName>Louisiana Fiery Hot Pepper Sauce</a:ProductName><a:QuantityPerUnit>32 - 8 oz bottles</a:QuantityPerUnit><a:SupplierID>2</a:SupplierID><a:UnitPrice>21.0500</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>76</a:UnitsInStock></a:Product><a:Product><a:CategoryID>2</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>66</a:ProductID><a:ProductName>Louisiana Hot Spiced Okra</a:ProductName><a:QuantityPerUnit>24 - 8 oz jars</a:QuantityPerUnit><a:SupplierID>2</a:SupplierID><a:UnitPrice>17.0000</a:UnitPrice><a:UnitsInOrder>100</a:UnitsInOrder><a:UnitsInStock>4</a:UnitsInStock></a:Product><a:Product><a:CategoryID>1</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>67</a:ProductID><a:ProductName>Laughing Lumberjack Lager</a:ProductName><a:QuantityPerUnit>24 - 12 oz bottles</a:QuantityPerUnit><a:SupplierID>16</a:SupplierID><a:UnitPrice>14.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>52</a:UnitsInStock></a:Product><a:Product><a:CategoryID>3</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>68</a:ProductID><a:ProductName>Scottish Longbreads</a:ProductName><a:QuantityPerUnit>10 boxes x 8 pieces</a:QuantityPerUnit><a:SupplierID>8</a:SupplierID><a:UnitPrice>12.5000</a:UnitPrice><a:UnitsInOrder>10</a:UnitsInOrder><a:UnitsInStock>6</a:UnitsInStock></a:Product><a:Product><a:CategoryID>4</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>69</a:ProductID><a:ProductName>Gudbrandsdalsost</a:ProductName><a:QuantityPerUnit>10 kg pkg.</a:QuantityPerUnit><a:SupplierID>15</a:SupplierID><a:UnitPrice>36.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>26</a:UnitsInStock></a:Product><a:Product><a:CategoryID>1</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>70</a:ProductID><a:ProductName>Outback Lager</a:ProductName><a:QuantityPerUnit>24 - 355 ml bottles</a:QuantityPerUnit><a:SupplierID>7</a:SupplierID><a:UnitPrice>15.0000</a:UnitPrice><a:UnitsInOrder>10</a:UnitsInOrder><a:UnitsInStock>15</a:UnitsInStock></a:Product><a:Product><a:CategoryID>4</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>71</a:ProductID><a:ProductName>Flotemysost</a:ProductName><a:QuantityPerUnit>10 - 500 g pkgs.</a:QuantityPerUnit><a:SupplierID>15</a:SupplierID><a:UnitPrice>21.5000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>26</a:UnitsInStock></a:Product><a:Product><a:CategoryID>4</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>72</a:ProductID><a:ProductName>Mozzarella di Giovanni</a:ProductName><a:QuantityPerUnit>24 - 200 g pkgs.</a:QuantityPerUnit><a:SupplierID>14</a:SupplierID><a:UnitPrice>34.8000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>14</a:UnitsInStock></a:Product><a:Product><a:CategoryID>8</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>73</a:ProductID><a:ProductName>R�d Kaviar</a:ProductName><a:QuantityPerUnit>24 - 150 g jars</a:QuantityPerUnit><a:SupplierID>17</a:SupplierID><a:UnitPrice>15.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>101</a:UnitsInStock></a:Product><a:Product><a:CategoryID>7</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>74</a:ProductID><a:ProductName>Longlife Tofu</a:ProductName><a:QuantityPerUnit>5 kg pkg.</a:QuantityPerUnit><a:SupplierID>4</a:SupplierID><a:UnitPrice>10.0000</a:UnitPrice><a:UnitsInOrder>20</a:UnitsInOrder><a:UnitsInStock>4</a:UnitsInStock></a:Product><a:Product><a:CategoryID>1</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>75</a:ProductID><a:ProductName>Rh�nbr�u Klosterbier</a:ProductName><a:QuantityPerUnit>24 - 0.5 l bottles</a:QuantityPerUnit><a:SupplierID>12</a:SupplierID><a:UnitPrice>7.7500</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>125</a:UnitsInStock></a:Product><a:Product><a:CategoryID>1</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>76</a:ProductID><a:ProductName>Lakkalik��ri</a:ProductName><a:QuantityPerUnit>500 ml</a:QuantityPerUnit><a:SupplierID>23</a:SupplierID><a:UnitPrice>18.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>57</a:UnitsInStock></a:Product><a:Product><a:CategoryID>2</a:CategoryID><a:Discontinued>false</a:Discontinued><a:ProductID>77</a:ProductID><a:ProductName>Original Frankfurter gr�ne So�e</a:ProductName><a:QuantityPerUnit>12 boxes</a:QuantityPerUnit><a:SupplierID>12</a:SupplierID><a:UnitPrice>13.0000</a:UnitPrice><a:UnitsInOrder>0</a:UnitsInOrder><a:UnitsInStock>32</a:UnitsInStock></a:Product></GetProductsXMLResult></GetProductsXMLResponse>'
		});
			$.mockjax({
				url: 'error',
				responseText: {
					status: 'error'
				}
			});
			// this.ds = new $.ig.RemoteDataSource({ responseDataType: "json",
			// 	responseTotalRecCountKey: "data.paging.total",
			// 	paging: {enabled: true, remote: true},
			// 	dataSource: "products123", schema: {searchField : "data.results", fields:[{name: "ProductID"}]}} ).dataBind();

			// this.ds1 = new $.ig.RemoteDataSource({callback:this.render1, responseDataType: "json", dataSource: "http://services.odata.org/OData/OData.svc/Products?$format=json", schema: {fields: [{name : "Price"}, {name : "Name"}, {name: "ID"}], searchField: "data.d"}}).dataBind();

			// this.dsWrong = new $.ig.RemoteDataSource({ callback: this.renderWrong, responseDataType: "json", dataSource: "error" }).dataBind();

			// this.dsJSONBare = new $.ig.RemoteDataSource( {callback:this.dsJSONBareRender, dataSource: "WCFJSONBare",
			// 	responseDataType: "json",
			// 	schema: {fields:[ {name : "ProductID"}, {name : "ProductName"} ], searchField: "data"}
			// 	}).dataBind();

			// this.dsJSONWrapped = new $.ig.RemoteDataSource( {callback:this.dsJSONWrappedRender, dataSource: "WCFJSONWrapped",
			// 	responseDataType: "json",
			// 	schema: {fields:[ {name : "ProductID"}, {name : "ProductName"} ], searchField : "data.GetProductsResult"}
			// 	}).dataBind();

			// this.dsXMLBare = new $.ig.RemoteDataSource( {callback:this.dsXMLBareRender, dataSource: "WCFXMLBare",
			// 	schema: {fields:[ {name : "ProductID", xpath: "ProductID"}, {name : "ProductName", xpath : "ProductName"} ], searchField:"Product"}
			// 	}).dataBind();

			// this.dsXMLWrapped = new $.ig.RemoteDataSource( {callback:this.dsXMLWrappedRender, dataSource: "WCFXMLWrapped",
			// 	schema: {fields:[ {name : "ProductID", xpath: "ProductID"}, {name : "ProductName", xpath : "ProductName"} ], searchField:"Product"}
			// 	}).dataBind();

			// this.dsWithMapper = new $.ig.RemoteDataSource({
			// 	responseDataType: "json",
			// 	dataSource: "categories",
			// 	schema: {
			// 		searchField: "data.d",
			// 		fields: [
			// 			{ name: "ID", type: "number" },
			// 			{ name: "CategoryName", type: "string" },
			// 			{ name: "Products", type: "object", mapper: function (rec) { return rec.Products[0].ProductName; } }
			// 		]
			// 	}
			// }).dataBind();
			this.util.wait(500).then(function () { done(); });
		},
		after: function() {
		}
	});
	QUnit.test("Remote data bind", function(assert) {
		var ds =new $.ig.RemoteDataSource({ responseDataType: "json",
		responseTotalRecCountKey: "data.paging.total",
		paging: {enabled: true, remote: true},
		dataSource: "products123", schema: {searchField : "data.results", fields:[{name: "ProductID"}]}} ).dataBind();

		assert.expect(1);
		var done = assert.async();
		this.util.wait(500).then(function () { done(); 	assert.equal(ds.dataView().length, 4, 4); });
	});
	// OData tests for select params, paging params, filtering params, sorting params
	QUnit.test("OData select parameters", function(assert) {
		var ds =new $.ig.RemoteDataSource({ responseDataType: "json",
		responseTotalRecCountKey: "data.paging.total",
		paging: {enabled: true, remote: true},
		dataSource: "products123", schema: {searchField : "data.results", fields:[{name: "ProductID"}]}} ).dataBind();
		// configure select params
		//ds.settings.schema = {fields: [{name : "Price"}, {name : "Name"}, {name: "ID"}]};
		ds.settings.localSchemaTransform = false;
		ds.settings.filtering.exprString = "";
		ds.settings.sorting.exprString = "";
		ds.settings.sorting.expressions = [];
		ds.settings.filtering.expressions = [];
		ds.settings.paging.enabled=false;
		// compare the "params" string with the expected one
		var params = $.param(ds._encodeUrl());

		assert.equal(params, "%24select=ProductID", "%24select=ProductID");
	});	

	QUnit.test("OData summaries and select parameters", function(assert) {
		assert.expect(1);
		var ds =new $.ig.RemoteDataSource({ responseDataType: "json",
		responseTotalRecCountKey: "data.paging.total",
		paging: {enabled: true, remote: true},
		dataSource: "products123", schema: {searchField : "data.results", fields:[{name: "ProductID"}]}} ).dataBind();
		
		ds.settings.localSchemaTransform = true;
		ds.settings.filtering.exprString = "";
		ds.settings.sorting.exprString = "";
		ds.settings.sorting.expressions = [];
		ds.settings.filtering.expressions = [];
		ds.settings.summaries.calculateAll = true;
		// compare the "params" string with the expected one
		 params = $.param(ds._encodeUrl());
		assert.equal(params, "%24skip=0&%24top=5&%24inlinecount=allpages&summaries(all)=*", "%24skip=0&%24top=5&%24inlinecount=allpages&summaries(all)=*");
	});
	
	QUnit.test("OData paging parameters", function(assert) {
		assert.expect(1);
		var ds =new $.ig.RemoteDataSource({ responseDataType: "json",
		responseTotalRecCountKey: "data.paging.total",
		paging: {enabled: true, remote: true},
		dataSource: "products123", schema: {searchField : "data.results", fields:[{name: "ProductID"}]}} ).dataBind();
		ds.settings.localSchemaTransform = true;
		ds.settings.filtering.exprString = "";
		ds.settings.sorting.exprString = "";
		ds.settings.sorting.expressions = [];
		ds.settings.filtering.expressions = [];
		ds.settings.paging.pageSize=15;
		ds.settings.paging.enabled = true;
		ds.settings.paging.pageIndex = 1;
		// compare the "params" string with the expected one
		var params = $.param(ds._encodeUrl());
		assert.equal(params, "%24skip=15&%24top=15&%24inlinecount=allpages", "%24skip=15&%24top=15&%24inlinecount=allpages");
	});

	QUnit.test("OData sorting parameters", function(assert) {
		assert.expect(1);
		var ds =new $.ig.RemoteDataSource({ responseDataType: "json",
		responseTotalRecCountKey: "data.paging.total",
		paging: {enabled: true, remote: true},
		dataSource: "products123", schema: {searchField : "data.results", fields:[{name: "ProductID"}]}} ).dataBind();

		ds.settings.localSchemaTransform = true;
		ds.settings.filtering.exprString = "";
		ds.settings.sorting.exprString = "ProductID asc, Name desc";
		//ds.settings.sorting.expressions = [];
		ds.settings.filtering.expressions = [];
		ds.settings.paging.enabled = false;
		// compare the "params" string with the expected one
		var params = $.param(ds._encodeUrl());
		assert.equal(params, "%24orderby=ProductID%20asc%2CName%20desc", "%24orderby=ProductID%20asc%2CName%20desc");
	});

	QUnit.test("OData filtering parameters", function(assert) {
		assert.expect(3);
		var str, currDate, year, month, params, lastMonth, nextMonth, day, date;
		var ds =new $.ig.RemoteDataSource({ responseDataType: "json",
		responseTotalRecCountKey: "data.paging.total",
		paging: {enabled: true, remote: true},
		dataSource: "products123", schema: {searchField : "data.results", fields:[{name: "ProductID"}]}} ).dataBind();

		ds.settings.localSchemaTransform = true;
		ds.settings.filtering.exprString = "";
		ds.settings.filtering.type = "remote";
		//ds.settings.filtering.filterExprUrlKey = "filter";

		ds.settings.sorting.exprString = "";
		ds.settings.sorting.expressions = [];
		ds.settings.filtering.expressions = [
			{fieldName: "ProductID", cond: "startsWith", expr: "a"},
			{fieldName: "Name", cond: "endsWith", expr: "b"},
			{fieldName: "Price", cond: "contains", expr: ""},
			{fieldName: "ProductID", cond: "doesNotContain", expr: "c"},
			{fieldName: "Name", cond: "equals", expr: "1"},
			{fieldName: "Name", cond: "equals", expr: 1},
			{fieldName: "Name", cond: "doesNotEqual", expr: "abc"},
			{fieldName: "Name", cond: "greaterThan", expr: "5"},
			{fieldName: "Name", cond: "lessThan", expr: "2"},
			{fieldName: "Name", cond: "greaterThanOrEqualTo", expr: "4"},
			{fieldName: "Name", cond: "lessThanOrEqualTo", expr: "7"}
		];
		//ds.settings.filtering.exprString = "";
		ds.settings.paging.enabled = false;
		// compare the "params" string with the expected one
		params = $.param(ds._encodeUrl());

		assert.equal(params, "%24filter=startswith(tolower(ProductID)%2C'a')%20eq%20true%20and%20endswith(tolower(Name)%2C'b')%20eq%20true%20and%20indexof(tolower(Price)%2C'')%20ge%200%20and%20indexof(tolower(ProductID)%2C'c')%20eq%20-1%20and%20tolower(Name)%20eq%20'1'%20and%20Name%20eq%201%20and%20tolower(Name)%20ne%20'abc'%20and%20Name%20gt%205%20and%20Name%20lt%202%20and%20Name%20ge%204%20and%20Name%20le%207", "%24filter=startswith(tolower(ProductID)%2C'a')%20eq%20true%20and%20endswith(tolower(Name)%2C'b')%20eq%20true%20and%20indexof(tolower(Price)%2C'')%20ge%200%20and%20indexof(tolower(ProductID)%2C'c')%20eq%20-1%20and%20tolower(Name)%20eq%20'1'%20and%20Name%20eq%201%20and%20tolower(Name)%20ne%20'abc'%20and%20Name%20gt%205%20and%20Name%20lt%202%20and%20Name%20ge%204%20and%20Name%20le%207");
		date = new Date(0);
		ds.settings.filtering.expressions = [
			{fieldName: "ProductID", cond: "null", logic: "or"},
			{fieldName: "Name", cond: "notNull", logic: "or"},
			{fieldName: "Price", cond: "empty", logic: "or"},
			{fieldName: "ProductID", cond: "notEmpty", logic: "or"},
			{ fieldName: "ReleaseDate", cond: "on", expr: date, logic: "or" },
			{ fieldName: "ReleaseDate", cond: "notOn", expr: date, logic: "or" },
			{ fieldName: "ReleaseDate", cond: "after", expr: date, logic: "or" },
			{ fieldName: "ReleaseDate", cond: "before", expr: date, logic: "or" },
			{ fieldName: "ReleaseDate", cond: "today", expr: date, logic: "or" },
			{ fieldName: "ReleaseDate", cond: "yesterday", expr: date }
		];

		day = date.getDate();
		month = date.getMonth() + 1;
		year =date.getFullYear()

		//ds.settings.filtering.exprString = "";
		ds.settings.paging.enabled = false;
		// compare the "params" string with the expected one
		params = $.param(ds._encodeUrl());
		result = "$filter=ProductID eq null or Name ne null or length(Price) eq 0 or length(ProductID) gt 0 or day(ReleaseDate) eq " + day + " and month(ReleaseDate) eq " + month + " and year(ReleaseDate) eq " + year +
			" or day(ReleaseDate) ne " + day + " or month(ReleaseDate) ne " + month + " or year(ReleaseDate) ne "+ year +
			" or ReleaseDate gt DateTime'" + $.ig.formatter(date, "date", "yyyy-MM-ddT23:59:59") + "' or ReleaseDate lt DateTime'" + $.ig.formatter(date, "date", "yyyy-MM-dd") +
			"' or day(ReleaseDate) eq " + day + " and month(ReleaseDate) eq " + month + " and year(ReleaseDate) eq " + year + " or day(ReleaseDate) eq "+ day +
			" and month(ReleaseDate) eq " + month + " and year(ReleaseDate) eq " + year + "&filterLogic=or";
		assert.equal(unescape(params), result);

		ds.settings.filtering.expressions = [
			{fieldName: "ThisMonth", cond: "thisMonth", logic: "or"},
			{fieldName: "LastMonth", cond: "lastMonth", logic: "or"},
			{fieldName: "NextMonth", cond: "nextMonth", logic: "or"},
			{fieldName: "ThisYear", cond: "thisYear", logic: "or"},
			{fieldName: "LastYear", cond: "lastYear", logic: "or"},
			{fieldName: "NextYear", cond: "nextYear", logic: "or"}
		];
		ds.settings.paging.enabled = false;
		params = $.param(ds._encodeUrl());
		currDate = new Date();
		month = currDate.getMonth() + 1;
		year = currDate.getFullYear();
		lastMonth = {
			month: month - 1 === 0 ? 12 : month - 1,
			year: month - 1 === 0 ? year - 1 : year
		};
		nextMonth = {
			month: month + 1 === 13 ? 1 : month + 1,
			year: month + 1 === 13 ? year + 1 : year
		};
		str = "%24filter=month(ThisMonth)%20eq%20" + month + "%20and%20year(ThisMonth)%20eq%20" + year +
			"%20or%20month(LastMonth)%20eq%20" + lastMonth.month +"%20and%20year(LastMonth)%20eq%20" + lastMonth.year +
			"%20or%20month(NextMonth)%20eq%20" + nextMonth.month + "%20and%20year(NextMonth)%20eq%20" + nextMonth.year +
			"%20or%20year(ThisYear)%20eq%20" + year +
			"%20or%20year(LastYear)%20eq%20" + (year - 1) +
			"%20or%20year(NextYear)%20eq%20" + (year + 1) +
			"&filterLogic=or";
		assert.equal(params, str);
	});
	QUnit.test("Custom sorting parameters", function(assert) {
		assert.expect(1);

		var ds =new $.ig.RemoteDataSource({ responseDataType: "json",
		responseTotalRecCountKey: "data.paging.total",
		paging: {enabled: true, remote: true},
		dataSource: "products123", schema: {searchField : "data.results", fields:[{name: "ProductID"}]}} ).dataBind();

		ds.settings.localSchemaTransform = true;
		ds.settings.filtering.exprString = "";
		ds.settings.sorting.exprString = "ProductID asc, Name desc";
		//ds.settings.sorting.expressions = [];
		ds.settings.filtering.expressions = [];
		ds.settings.paging.enabled = false;
		ds.settings.sorting.sortUrlKey = "sort";
		ds.settings.sorting.sortUrlAscValueKey = "asc";
		ds.settings.sorting.sortUrlDescValueKey = "desc";
		// compare the "params" string with the expected one
		var params = $.param(ds._encodeUrl());
		assert.equal(params, "sort(ProductID)=asc&sort(Name)=desc", "sort(ProductID)=asc&sort(Name)=desc");
	});
	QUnit.test("Custom filtering parameters", function(assert) {
		var ds =new $.ig.RemoteDataSource({ responseDataType: "json",
		responseTotalRecCountKey: "data.paging.total",
		paging: {enabled: true, remote: true},
		dataSource: "products123", schema: {searchField : "data.results", fields:[{name: "ProductID"}]}} ).dataBind();

		ds.settings.localSchemaTransform = true;
		ds.settings.filtering.exprString = "";
		ds.settings.sorting.exprString = null;
		ds.settings.sorting.expressions = [];
		ds.settings.filtering.expressions = [
			{fieldName: "ProductID", cond: "StartsWith", expr: "a"},
			{fieldName: "Name", cond: "EndsWith", expr: "b"},
			{fieldName: "Price", cond: "Contains", expr: ""},
			{fieldName: "ProductID2", cond: "DoesNotContain", expr: "c"},
			{fieldName: "Name2", cond: "Equals", expr: "1"},
			{fieldName: "Name3", cond: "Equals", expr: 1},
			{fieldName: "Name4", cond: "DoesNotEqual", expr: "abc"},
			{fieldName: "Name5", cond: "GreaterThan", expr: "5"},
			{fieldName: "Name6", cond: "LessThan", expr: "2"},
			{fieldName: "Name7", cond: "GreaterThanOrEqualTo", expr: "4"},
			{fieldName: "Name8", cond: "LessThanOrEqualTo", expr: "7"}
		];
		ds.settings.filtering.filterExprUrlKey = "filter";
		//ds.settings.filtering.exprString = "";
		ds.settings.paging.enabled = false;
		// compare the "params" string with the expected one
		var params = $.param(ds._encodeUrl());
		assert.equal(params, "filter(ProductID)=StartsWith(a)&filter(Name)=EndsWith(b)&filter(Price)=Contains()&filter(ProductID2)=DoesNotContain(c)&filter(Name2)=Equals(1)&filter(Name3)=Equals(1)&filter(Name4)=DoesNotEqual(abc)&filter(Name5)=GreaterThan(5)&filter(Name6)=LessThan(2)&filter(Name7)=GreaterThanOrEqualTo(4)&filter(Name8)=LessThanOrEqualTo(7)", "filter(ProductID)=StartsWith(a)&filter(Name)=EndsWith(b)&filter(Price)=Contains()&filter(ProductID2)=DoesNotContain(c)&filter(Name2)=equal(1)&filter(Name3)=equal(1)&filter(Name4)=DoesNotEqual(abc)&filter(Name5)=GreaterThan(5)&filter(Name6)=LessThan(2)&filter(Name7)=GreaterThanOrEqualTo(4)&filter(Name8)=LessThanOrEqualTo(7)");
	});

	QUnit.test("Custom paging parameters", function(assert) {
		assert.expect(1);

		var ds =new $.ig.RemoteDataSource({ responseDataType: "json",
		responseTotalRecCountKey: "data.paging.total",
		paging: {enabled: true, remote: true},
		dataSource: "products123", schema: {searchField : "data.results", fields:[{name: "ProductID"}]}} ).dataBind();

		ds.settings.localSchemaTransform = true;
		ds.settings.filtering.exprString = "";
		ds.settings.sorting.exprString = "";
		ds.settings.sorting.expressions = [];
		ds.settings.filtering.expressions = [];
		ds.settings.paging.pageSize=15;
		ds.settings.paging.enabled = true;
		ds.settings.paging.pageIndex = 1;
		ds.settings.paging.pageSizeUrlKey = "psize";
		ds.settings.paging.pageIndexUrlKey = "page";
		// compare the "params" string with the expected one
		var params = $.param(ds._encodeUrl());
		assert.equal(params, "page=1&psize=15", "page=1&psize=15");
	});
	
	QUnit.test("OData Service - $format=json response", function(assert) {
		assert.expect(2);
		var ds1 = new $.ig.RemoteDataSource({callback:this.render1, responseDataType: "json", dataSource: "http://services.odata.org/OData/OData.svc/Products?$format=json", schema: {fields: [{name : "Price"}, {name : "Name"}, {name: "ID"}], searchField: "data.d"}}).dataBind();
		var done = assert.async();
		this.util.wait(500).then(function () {
			done();
			// check number of records
			var count = ds1.dataView().length;
			assert.equal(count, 9, count);
			// check the cell values in the first row
			assert.equal("Bread", ds1.dataView()[0]['Name'], "Bread");
		});

	});
	QUnit.test("WCF REST Service - JSON response - bare", function(assert) {
		assert.expect(2);

		var dsJSONBare =  new $.ig.RemoteDataSource( {callback:this.dsJSONBareRender, dataSource: "WCFJSONBare",
		responseDataType: "json",
		schema: {fields:[ {name : "ProductID"}, {name : "ProductName"} ], searchField: "data"}
		}).dataBind();
		var done = assert.async();
		this.util.wait(500).then(function () {
			done();
			var view = dsJSONBare.dataView();
			assert.equal(view.length, 77, 77);
	
			assert.equal("Chai", dsJSONBare.dataView()[0]['ProductName'], "Chai");
		 });
	});
	QUnit.test("WCF REST Service - JSON response - wrapped", function(assert) {
		assert.expect(2);
		var done = assert.async();
		var dsJSONWrapped = new $.ig.RemoteDataSource( {callback:this.dsJSONWrappedRender, dataSource: "WCFJSONWrapped",
				responseDataType: "json",
				schema: {fields:[ {name : "ProductID"}, {name : "ProductName"} ], searchField : "data.GetProductsResult"}
				}).dataBind();
			this.util.wait(500).then(function () {
				done();
				var view = dsJSONWrapped.dataView();
				assert.equal(view.length, 77, 77);
				assert.equal("Chai", dsJSONWrapped.dataView()[0]['ProductName'], "Chai");				
			});

	});
	QUnit.test("WCF REST Service - XML response - bare", function(assert) {
		assert.expect(2);
		var done = assert.async();
		var dsXMLBare = new $.ig.RemoteDataSource( {callback:this.dsXMLBareRender, dataSource: "WCFXMLBare",
				schema: {fields:[ {name : "ProductID", xpath: "ProductID"}, {name : "ProductName", xpath : "ProductName"} ], searchField:"Product"}
				}).dataBind();
		this.util.wait(500).then(function () {
				done();
				var view = dsXMLBare.dataView();
				assert.equal(view.length, 77, 77);
				assert.equal("Chai", dsXMLBare.dataView()[0]['ProductName'], "Chai");
		});
	});
	QUnit.test("WCF REST Service - XML response - wrapped", function(assert) {
		assert.expect(2);
		var done = assert.async();
	
		var dsXMLWrapped = new $.ig.RemoteDataSource( {callback:this.dsXMLWrappedRender, dataSource: "WCFXMLWrapped",
				schema: {fields:[ {name : "ProductID", xpath: "ProductID"}, {name : "ProductName", xpath : "ProductName"} ], searchField:"Product"}
				}).dataBind();
		this.util.wait(500).then(function () {
			done();
			var view = dsXMLWrapped.dataView();
			assert.equal(view.length, 77, 77);
			assert.equal("Chai", dsXMLWrapped.dataView()[0]['ProductName'], "Chai");
		 });
	});
	QUnit.test("Testing wrong data type - so that the error handler is executed ", function(assert) {
		assert.expect(1);
		var dsWrong = new $.ig.RemoteDataSource({ callback: this.renderWrong, responseDataType: "json", dataSource: "error" }).dataBind();
		var done = assert.async();
		this.util.wait(500).then(function () {
			 done();
			 assert.equal(dsWrong.dataView().status, "error", dsWrong.dataView().length);
		});
	});
	QUnit.test("Testing if _getFieldTypeFromSchema returns correct dataType for mapped field for remote data source", function (assert) {
		assert.expect(1);
		var dsWithMapper = new $.ig.RemoteDataSource({
			responseDataType: "json",
			dataSource: "categories",
			schema: {
				searchField: "data.d",
				fields: [
					{ name: "ID", type: "number" },
					{ name: "CategoryName", type: "string" },
					{ name: "Products", type: "object", mapper: function (rec) { return rec.Products[0].ProductName; } }
				]
			}
		}).dataBind();
		var done = assert.async();
		this.util.wait(500).then(function () {
			 done();
			 assert.equal(dsWithMapper._getFieldTypeFromSchema("Products"), "string", "_getFieldTypeFromSchema should return the mapped value's dataType");
		});
	});
	QUnit.test("Test summariesResponse", function (assert) {
		assert.expect(2);
		var ds, sr,
			d = {
				"d" : [
						{
							"ID": 0,
							"Name": "Bread",
							"Description": "Whole grain bread",
							"ReleaseDate": "1992-01-01T00:00:00.000Z",
							"DiscontinuedDate": null, "Rating": 4, "Price": "2.5"
						}
				],
				Metadata: {
					Summaries: {
						ID: {
							count: 1,
							min: 0,
							max: 0
						},
						ReleaseDate: {
							count: 1,
							max: "1992-01-01T00:00:00.000Z",
							min: "1992-01-01T00:00:00.000Z"
						}
					},
					timezoneOffset: 0,
					timezoneOffsetsSummaries: {
						ReleaseDate: {
							max: 0,
							min: 0
						}
					}

				}
			},
			maxDate = new Date("1992-01-01T00:00:00.000Z");
		ds = new $.ig.RemoteDataSource({
			responseDataType: "json",
			responseTotalRecCountKey: "data.paging.total",
			paging: { enabled: true },
			dataSource: "products123", schema: { searchField: "data.results", fields: [{ name: "ProductID" }, { name: "ReleaseDate", type: "date"}] }
		}).dataBind();
		sr = ds.summariesResponse(),

		assert.equal(sr.length, 0, "Test summariesResponse with no arguments");
		sr = ds.summariesResponse("Metadata.Summaries", d);
		assert.ok(sr.ID.max === 0 &&
			sr.ID.count === 1 &&
			sr.ID.min === 0 &&
			sr.ReleaseDate.max.getTime() === maxDate.getTime(),
			"Test summaries response");
	});

	QUnit.test("OData filtering parameters with exprString", function (assert) {
		assert.expect(1);
		var str, currDate, year, month, params, lastMonth, nextMonth, day, date;
		var ds =new $.ig.RemoteDataSource({ responseDataType: "json",
		responseTotalRecCountKey: "data.paging.total",
		paging: {enabled: true, remote: true},
		dataSource: "products123", schema: {searchField : "data.results", fields:[{name: "ProductID"}]}} ).dataBind();

		ds.settings.localSchemaTransform = true;
		ds.settings.filtering.exprString = "ProductID LIKE Cr%";
		ds.settings.filtering.type = "remote";

		ds.settings.sorting.exprString = "";
		ds.settings.sorting.expressions = [];
		ds.settings.paging.enabled = false;
		ds.settings.filtering.expressions = [
			{ fieldName: "ProductID", expr: "b", cond: "StartsWith" }
		];
		// compare the "params" string with the expected one 
		params = $.param(ds._encodeUrl());

		assert.equal(params, "%24filter=startswith(tolower(ProductID)%2C'cr')%20eq%20true");
	});

	QUnit.test("Ensure special characters in filtering expression are escaped when encoded to url. ", function (assert) {
		assert.expect(1);
		var ds =new $.ig.RemoteDataSource({ responseDataType: "json",
		responseTotalRecCountKey: "data.paging.total",
		paging: {enabled: true, remote: true},
		dataSource: "products123", schema: {searchField : "data.results", fields:[{name: "ProductID"}]}} ).dataBind();

		ds.settings.filtering.expressions = [
			{ fieldName: "ProductID", expr: "()", cond: "Contains" }
		];
		ds.settings.paging = {};

		ds.settings.filtering.filterExprUrlKey = "filter";
		params = $.param(ds._encodeUrl());
		assert.equal(params, "filter(ProductID)=Contains(%2528%2529)", "Filtering Expression Value should be escaped.");
	});