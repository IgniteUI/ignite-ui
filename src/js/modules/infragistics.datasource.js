/*!@license
 * Infragistics.Web.ClientUI Data Binding Plugin <build_number>
 *
 * Copyright (c) 2011-<year> Infragistics Inc.
 *
 * igDataSource provides the following functionality:
 * - read and parse local XML , JSON , and HTML data
 * - normalize / transform the above data according to a schema
 * - data type conversion (date, string, number, etc.)
 * - define relationships between two and more flat data sources - with primary/foreign keys, etc
 * - build URL params for requests that get remote data
 * - in case of scenarios such as paging, understand and prase the response - expect that it's in a predefined format that can be additionall configured by the developer
 * - get data from WCF services
 * - ability to combine local with remote functionality
 * - queueing AJAX requests
 *	paging,filtering (searching), and sorting functionality that are control-independent are also implemented here
 *	the idea of this code is to serve as a data-source abstraction layer (client-side data source control)
 *	that may well be used by all other client-side controls , such as dropdown, tree, menu, etc.
 *
 * http://www.infragistics.com/
 *
 * Depends on:
 *	jquery-1.9.1.js
 *	infragistics.util.js
 *
 */

/*global Class, ActiveXObject, DOMParser, XPathResult, XMLSerializer */
(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./infragistics.util"
		], factory );
	} else {

		// Browser globals
		factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};

	// M.P. 03 Apr 2015 - Bug 192160 - Script error(unable to get property 'UI' of undefined or null reference) is thrown if WebDataGrid coexists on the page.
	// The ASP.NET product already uses the namespace window.Infragistics so we have to make sure that we're not hijacking it
	if (!window.Infragistics) {
		// M.P. 05 Mar 2015 - Bug 186797 - Adding support for the TypeScript defintion where there is an Infragistics module declared
		window.Infragistics = $.ig;
	}

	/* A.T. 7 Feb 2011 - Usability review changes */
	/*
	$.ig.Constants = $.ig.Constants || {};

	$.ig.Constants.SortDirection = {
	None: 'none',
	Ascending: 'asc',
	Descending: 'desc'
	};

	$.ig.Constants.OpType = {
	Remote: 0,
	Local: 1
	};

	$.ig.Constants.SortMode = {
	Single: 0,
	Multi: 1
	};

	$.ig.Constants.FilterCondition = {
	StartsWith: "StartsWith",
	EndsWith: "EndsWith",
	Contains: "Contains",
	DoesNotContain: "DoesNotContain",
	Equals: "Equals",
	DoesNotEqual: "DoesNotEqual",
	GreaterThan: "GreaterThan",
	LessThan: "LessThan",
	GreaterThanOrEqualTo: "GreaterThanOrEqualTo",
	LessThanOrEqualTo: "LessThanOrEqualTo",
	True: "True",
	False: "False",
	After: "After",
	Before: "Before",
	Today: "Today",
	Yesterday: "Yesterday",
	ThisMonth: "ThisMonth",
	LastMonth: "LastMonth",
	NextMonth: "NextMonth",
	ThisYear: "ThisYear",
	LastYear: "LastYear",
	NextYear: "NextYear",
	On: "On",
	NotOn: "NotOn",
	Null: "Null",
	NotNull: "NotNull",
	Empty: "Empty",
	NotEmpty: "NotEmpty"
	//ThisQuarter: "ThisQuarter",
	//LastQuarter: "LastQuarter",
	//NextQuarter: "NextQuarter"
	};

	$.ig.Constants.DataSourceType = {
	Function : 0,
	Array : 1,
	HtmlTableString: 2, // the data source could be either the id of the element, a string starting with <table>, or a DOM object that is of nodeType== "TABLE"
	HtmlTableId: 3,
	HtmlTableDOM: 4,
	JSON : 5, // json data, could be string or object
	XML : 6, // xml data - could be string or object
	Invalid: 7, // when data source is se to a boolean, number or date
	Unknown: 8, // when data source is a string or object
	RemoteUrl: 9,
	Empty: 10
	};
	*/
	$.ig.DataSource = $.ig.DataSource || Class.extend({
		/* The Infragistics Data Source client-side component is implemented as a class, and has support for paging, sorting, and filtering
		it supports binding to various types of data sources including JSON, XML, HTML Table, WCF/REST services, JSONP, JSONP and OData combined, etc.
		```
			var render = function (success, error) {
				if (success) {
					var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
					resultHtml = $.ig.tmpl(template, ds.dataView());
					$("#table").html(resultHtml);
				} else {
					alert(error);
				}
			}

			var ds;

			$(window).load(function () {
			var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
			ds = new $.%%WidgetName%%({
			callback: render,
			dataSource: url,
			schema: {
				fields: [{
					name: "Name"
				}, {
					name: "Price"
				}, {
					name: "Rating"
				}],
					searchField: "d"
			},
			responseDataKey: "d",
			responseDataType: "jsonp",
			filtering: {
				type: "remote",
				filterExprUrlKey: "filter",
				expressions: [{
					fieldName: "Name",
					cond: "Contains",
					expr: "Cr"
				}]
			},
			paging: {
				enabled: true,
				pageSize: 3,
				type: "local"
			}
			});

			ds.dataBind();
			});
		```
		*/
		settings: {
			/* type="string" setting this is only necessary when the data source is set to a table in string format. we need to create an invisible dummy data container in the body and append the table data to it
			```
				var ds = $.ig.DataSource({
					id: "myId"
				});
			```
			*/
			id: "ds",
			/* type="string" this is the property in the dataView where actual resulting records will be put. (So the dataView will not be array but an object if this is defined), after the potential data source transformation
			```
				var render = function (success, error) {
					if (success) {
						var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
						resultHtml = $.ig.tmpl(template, ds.dataView());
						$("#table").html(resultHtml);
					} else {
						alert(error);
					}
				}
				var ds;
				$(window).load(function () {
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp",
						outputResultsName: "myOutputResultsName"
					});
					ds.dataBind();
				});
			```
			*/
			outputResultsName: null,
			/* type="function" callback function to call when data binding is complete
			```
				var render = function (success, error) {
					if (success) {
						alert("success");
					} else {
						alert(error);
					}
				}

				$(window).load(function () {
					var url = "http://odata.netflix.com/Catalog/Titles?$format=json&$callback=?";
					ds = new $.%%WidgetName%%({
						type: "remoteUrl",
						callback: render,
						dataSource: url,
						schema: oDataSchema,
						responseDataKey : "d.results",
						responseDataType: "jsonp",
					});
					ds.dataBind();
				});
			```
			*/
			callback: null,
			/* type="object" object on which to invoke the callback function
			```
				var Bob = {
					name: "Bob",
					greet: function () {
						alert("Hi, I'm " + this.name);
					}
				};

				var products = [];
				products[0] = {
					"ProductID": 1,
					"Name": "Adjustable Race",
					"ProductNumber": "AR-5381"
				};
				products[1] = {
					"ProductID": 2,
					"Name": "Bearing Ball",
					"ProductNumber": "BA-8327"
				};

				var ds;

				$(document).ready(function () {
					ds = new $.%%WidgetName%%({
						dataSource: products,
						callee: Bob,
						callback: Bob.greet
					});

					ds.dataBind();
				});
			```
			*/
			callee: null,
			/* type="array" this is the normalized (transformed) resulting data, after it's fetched from the data source
			```
				var ds = new $.%%WidgetName%%({
					data: normalizedArrayOfObjects
				});
			```
			*/
			data: [],
			/* type="object" this is the source of data - non normalized. Can be an array, can be reference to some JSON object, can be a DOM element for a HTML TABLE, or a function
			```
				var jsonSchema = new $.ig.DataSchema("json", {fields:[
					{name: "ProductID", type: "number"},
					{name: "Name", type: "string"},
					{name: "ProductNumber", type: "string"},
					{name: "Color", type: "string"},
					{name: "StandardCost", type: "string"}],
					searchField:"Records" });

				ds = new $.%%WidgetName%%({type: "json", dataSource: jsonData, schema: jsonSchema});
				ds.dataBind();
			```
			*/
			dataSource: null,
			/* type="object" client-side dataBinding event. Can be a string pointing to a function name, or an object pointing to a function
			```
				var myDataBinding = function () {
					alert("myDataBinding");
				}

				var products = [];
				products[0] = {
					"ProductID": 1,
					"Name": "Adjustable Race",
					"ProductNumber": "AR-5381"
				};
				products[1] = {
					"ProductID": 2,
					"Name": "Bearing Ball",
					"ProductNumber": "BA-8327"
				};

				var ds;

				$(window).ready(function () {
					ds = new $.%%WidgetName%%({
						dataBinding: myDataBinding,
						dataSource: products
					});
				});
			```
			*/
			dataBinding: null,
			/* type="object" client-side dataBound event. Can be a string pointing to a function name, or an object pointing to a function
			```
				var myDataBound = function () {
					alert("myDataBound");
				}

				var products = [];
				products[0] = {
					"ProductID": 1,
					"Name": "Adjustable Race",
					"ProductNumber": "AR-5381"
				};
				products[1] = {
					"ProductID": 2,
					"Name": "Bearing Ball",
					"ProductNumber": "BA-8327"
				};

				var ds;

				$(window).ready(function () {
					ds = new $.%%WidgetName%%({
						dataBound: myDataBound
					});

					ds.dataBind();

				});
			```
			*/
			dataBound: null,
			/* type="string" specifies the HTTP verb to be used to issue the request
			```
				$(window).load(function () {
					ds = new $.%%WidgetName%%({
						primaryKey: "CustomerID",
						requestType: "get",
						dataSource: "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?",
						responseDataKey: "Records",
					});

					ds.dataBind();
				});
			```
			*/
			requestType: "GET",
			/* type="json|xml|unknown|array|function|htmlTableString|htmlTableId|htmlTableDom|htmlListDom|htmlSelectDom|invalid|remoteUrl|empty" Type of the data source
			```
				$(window).load(function () {
					var url = "http://odata.netflix.com/Catalog/Titles?$format=json&$callback=?";
					ds = new $.%%WidgetName%%({
						type: "remoteUrl",
						callback: render,
						dataSource: url,
						schema: oDataSchema,
						responseDataKey : "d.results",
						responseDataType: "jsonp",
					});
					ds.dataBind();
				});
			```
			json type="string" Specifies that the data source is an already evaluated JSON (JavaScript object/array) or a string that can be evaluated to JSON
			xml type="string" Specifies that the data source is a XML Document object or a string that can be evaluated to XML
			unknown type="string" Specifies that the data source is of unknown type. In that case it will be analyzed and automatically detected if possible
			array type="string" Specifies that the data source is a simple array of objects.
			function type="string" Specifies that the data source points to a function. During data binding the function will be called and the result will be assumed to be an array of objects
			htmlTableString type="string" Specifies that the data source points to a string that represents a HTML table
			htmlTableId type="string" Specifies that the data source points to an ID of a HTML Table element that's loaded on the page
			htmlTableDom type="string" The data source points to a DOM object that is of TABLE type
			invalid type="string" Set whenever data source is analyzed (in case its type is unknown) and the type cannot be detected
			remoteUrl type="string" Specifies that the data source points to a remote URL, from which data will be retrieved using an AJAX call ($.ajax)
			htmlListDom type="string" The data source points to a DOM object that is of UL/OL type
			htmlSelectDom type="string" The data source points to a DOM object that is of SELECT type
			empty type="string"
			*/
			type: "unknown",
			/* type="object" a schema object that defines which fields from the data to bind to
			```
				var jsonSchema = new $.ig.DataSchema("json", {fields:[
					{name: "ProductID", type: "number"},
					{name: "Name", type: "string"},
					{name: "ProductNumber", type: "string"},
					{name: "Color", type: "string"},
					{name: "StandardCost", type: "string"}],
					searchField:"Records" });

				ds = new $.%%WidgetName%%({
					type: "json",
					dataSource: jsonData,
					schema: jsonSchema
				});
				ds.dataBind();
			```
			*/
			schema: null,
			/* type="string" the unique field identifier
			```
				$(window).load(function () {
					ds = new $.%%WidgetName%%({
						primaryKey: "CustomerID",
						type: "json",
						dataSource: adventureWorks,
						responseDataKey: "Records",
					});

					ds.dataBind();
				});
			```
			*/
			primaryKey: null,
			/* type="string" property in the response which specifies the total number of records in the backend (this is needed for paging)
			```
				var ds = new $.%%WidgetName%%({
					type: "json",
					dataSource: adventureWorks,
					responseDataKey: "Records",
					responseTotalRecCountKey: "1024"
				});
			```
			*/
			responseTotalRecCountKey: null,
			/* type="string" property in the response which specifies where the data records array will be held (if the response is wrapped)
			```
				var url = "http://odata.netflix.com/Catalog/Titles?$format=json&$callback=?";
				var jsonp = new $.%%WidgetName%%({
					type: "json",
					dataSource: url,
					responseDataKey: "d.results"
				});
			```
			*/
			responseDataKey: null,
			/*
			type="json|xml|html|script|jsonp|text" Response type when a URL is set as the data source. See http://api.jquery.com/jQuery.ajax/ => dataType
			```
				var render = function (success, error) {
					if (success) {
						alert("success");
					} else {
						alert(error);
					}
				}

				$(window).load(function () {
					var url = "http://odata.netflix.com/Catalog/Titles?$format=json&$callback=?";
					ds = new $.%%WidgetName%%({
						type: "remoteUrl",
						callback: render,
						dataSource: url,
						schema: oDataSchema,
						responseDataKey: "d.results",
						responseDataType: "jsonp",
					});
					ds.dataBind();
				});
			```
			json type="string"
			xml type="string"
			html type="string"
			script type="string"
			jsonp type="string"
			text type="string"
			*/
			responseDataType: null,
			/* type="string" content type of the response. See http://api.jquery.com/jQuery.ajax/ => contentType
			```
				var ds = new $.%%WidgetName%%({
					type: "json",
					dataSource: adventureWorks,
					responseDataKey: "Records",
					responseContentType: "application/x-www-form-urlencoded; charset=UTF8;"
				});
			```
			*/
			responseContentType: null,
			/* type="bool" if set to false will disable transformations on schema, even if it is defined locally in the javascript code
			```
				var url = "/demos/server/proxy.php?url=http://services.odata.org/OData/OData.svc/Products?$format=json";
				ds = new $.%%WidgetName%%({
					callback:render,
					dataSource: url,
					localSchemaTransform: false,
					responseDataKey: "d",
					schema: {fields: [
						{name : "Price"},
						{name : "Name"},
						{name: "Rating"}
					]}
				});

				ds.dataBind();
			```
			*/
			localSchemaTransform: true,
			/* type="object" event that is fired before URL parameters are encoded. Can point to a function name or the function object itself
			```
				var render = function (success, error) {
					if (success) {
						var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
						resultHtml = $.ig.tmpl(template, ds.dataView());
						$("#table").html(resultHtml);
					} else {
						alert(error);
					}
				}

				var myUrlParamsEncoding = function (item, params) {
					alert("myUrlParamsEncoding");
				}

				var ds;
				$(window).load(function () {
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp",
						urlParamsEncoding: myUrlParamsEncoding
					});
					ds.dataBind();
				});
			```
			*/
			urlParamsEncoding: null,
			/* type="object" event that is fired after URL parameters are encoded (When a remote request is done). Can point to a function name or the function object itself
			```
				var render = function (success, error) {
					if (success) {
						var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
						resultHtml = $.ig.tmpl(template, ds.dataView());
						$("#table").html(resultHtml);
					} else {
						alert(error);
					}
				}

				var myUrlParamsEncoded = function (item, params) {
					alert("myUrlParamsEncoded");
				}

				var ds;
				$(window).load(function () {
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp",
						urlParamsEncoded: myUrlParamsEncoded
					});
					ds.dataBind();
				});
			```
			*/
			urlParamsEncoded: null,
			/* Settings related to built-in paging functionality
			```
				$(window).load(function () {
					ds = new $.%%WidgetName%%({
						type: "json",
						dataSource: adventureWorks,
						responseDataKey: "Records",
						paging: {
							enabled : true,
							pageSize:10,
							type: "local"
						}
					});

					ds.dataBind();
				});
			```
			*/
			paging: {
				/* type="bool" Paging is not enabled by default
				```
					ds = new $.%%WidgetName%%({
						type: "json",
						dataSource: adventureWorks,
						responseDataKey: "Records",
						paging: {
							enabled : true,
							pageSize:10,
							type: "local"
						}
					});
				```
				*/
				enabled: false,
				/* type="remote|local" Type for the paging operation
				```
					jsonDs = new $.%%WidgetName%%( {
						filtering: {
							type: "local",
							caseSensitive: true,
							applyToAllData: true
						},
						dataSource: jsonData
					}).dataBind();
				```
				local type="string" Data is paged client-side.
				remote type="string" A remote request is done and URL params encoded
				*/
				type: "remote",
				/* type="number" number of records on each page
				```
					ds = new $.%%WidgetName%%({
						type: "json",
						dataSource: adventureWorks,
						responseDataKey: "Records",
						paging: {
							enabled : true,
							pageSize:10,
							type: "local"
						}
					});
				```
				*/
				pageSize: 5,
				/* type="string" denotes the name of the encoded URL parameter that will state what is the currently requested page size
				```
					var ds = new $.%%WidgetName%%({
						type: "json",
						dataSource: adventureWorks,
						responseDataKey: "Records",
						paging: {
							enabled: true,
							pageSize: 10,
							pageSizeUrlKey: "myPageSizeUrlKey",
							type: "local"
						}
					});
				```
				*/
				pageSizeUrlKey: null,
				/* type="string" denotes the name of the encoded URL parameter that will state what is the currently requested page index
				```
					var ds = new $.%%WidgetName%%({
						type: "json",
						dataSource: adventureWorks,
						responseDataKey: "Records",
						paging: {
							enabled: true,
							pageSize: 10,
							pageIndex: 2,
							pageIndexUrlKey: "myPageIndexUrlKey",
							type: "local"
						}
					});
				```
				*/
				pageIndexUrlKey: null,
				/* type="number" current page index
				```
					ds = new $.%%WidgetName%%({
						type: "json",
						dataSource: adventureWorks,
						responseDataKey: "Records",
						schema: jsonSchema,
						paging:
						{
							enabled : true,
							pageSize:10,
							type: "local",
							pageIndex: 2
						}
					});
					ds.dataBind();
				```
				*/
				pageIndex: 0,
				/* type="bool" Whether when a new page of data is requested we should append the new data to the existing data
				```
					var ds = new $.%%WidgetName%%({
						dataSource: products,
						paging: {
							enabled: true,
							appendPage : true
						}
					});
				```
				*/
				appendPage: false
			},
			/* Settings related to built-in filtering functionality
			```
				jsonDs = new $.%%WidgetName%%( {
					filtering: {
						type: "local",
						caseSensitive: true,
						applyToAllData: true
					},
					dataSource: jsonData
				}).dataBind();
			```
			*/
			filtering: {
				/* type="remote|local" Filtering type.
				remote type="string" Parameters will be encoded and it's up to the backend to interpred them from the response.
				local type="string" The data will be filtered automatically client-side
				*/
				type: "remote",
				/* type="bool" enables or disables case sensitive filtering on the data. Works only for local filtering
				```
					jsonDs = new $.%%WidgetName%%( {
						filtering: {
							type: "local",
							caseSensitive: true,
							applyToAllData: true
						},
						dataSource: jsonData
					}).dataBind();
				```
				*/
				caseSensitive: false,
				/* type="bool" if the type of paging/sorting/filtering is local and applyToAllData is true, filtering will be performed on the whole data source that's present locally, otherwise only on the current dataView. if type is remote, this setting doesn't have any effect.
				```
					jsonDs = new $.%%WidgetName%%( {
						filtering: {
							type: "local",
							caseSensitive: true,
							applyToAllData: true
						},
						dataSource: jsonData
					}).dataBind();
				```
				*/
				applyToAllData: true,
				/* type="object" Can point to either a string or a function object. The parameters that are passed are 1) the data array to be filtered, 2) the filtering expression definitions. Should return an array of the filtered data
				```
					var ds;

					var render = function (success, error) {
						if (success) {
							var expr = "Cr";
							cond = "startsWith";

							ds.filter([{
								fieldName: "Name",
								expr: expr,
								cond: cond
							}], true);

							var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
							resultHtml = $.ig.tmpl(template, ds.dataView());
							$("#table").html(resultHtml);
						} else {
							alert(error);
						}
					}


					var myCustomFunc = function (fieldExpression, data) {
						var result = [];
						result[0] = data[0];
						return result;
					}

					$(window).load(function () {
						var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
						ds = new $.%%WidgetName%%({
							callback: render,
							dataSource: url,
							schema: {
								fields: [{
									name: "Name"
								}, {
									name: "Price"
								}, {
									name: "Rating"
								}],
								searchField: "d"
							},
							responseDataKey: "d",
							responseDataType: "jsonp",
							filtering: {
								type: "remote",
								customFunc: myCustomFunc
							}
						});
						ds.dataBind();

					});
				```
				*/
				customFunc: null,
				/* type="string" url key that will be encoded in the request if remote filtering is performed. Default value of null implies OData-style URL encoding. Please see http://www.odata.org/developers/protocols/uri-conventions for details
				```
					var render = function (success, error) {
						if (success) {
							var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
							resultHtml = $.ig.tmpl(template, ds.dataView());
							$("#table").html(resultHtml);
						} else {
							alert(error);
						}
					}

					var ds;

					$(window).load(function () {
						var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
						ds = new $.%%WidgetName%%({
							callback: render,
							dataSource: url,
							schema: {
								fields: [{
									name: "Name"
								}, {
									name: "Price"
								}, {
									name: "Rating"
								}],
								searchField: "d"
							},
							responseDataKey: "d",
							responseDataType: "jsonp",
							filtering: {
								type: "remote",
								filterExprUrlKey: "filter",
								expressions: [{
									fieldName: "Name",
									cond: "Contains",
									expr: "Cr"
								}]
							}
						});
						ds.dataBind();
					});
				```
				*/
				filterExprUrlKey: null,
				/* type="string" url key that will be encoded in the request, specifying if the filtering logic will be AND or OR
				```
					var render = function (success, error) {
						if (success) {
							var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
							resultHtml = $.ig.tmpl(template, ds.dataView());
							$("#table").html(resultHtml);
						} else {
							alert(error);
						}
					}

					var ds;

					$(window).load(function () {
						var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
						ds = new $.%%WidgetName%%({
							callback: render,
							dataSource: url,
							schema: {
								fields: [{
									name: "Name"
								}, {
									name: "Price"
								}, {
									name: "Rating"
								}],
								searchField: "d"
							},
							responseDataKey: "d",
							responseDataType: "jsonp",
							filtering: {
								type: "remote",
								filterLogicUrlKey: "testFilterLogicUrlKey",
								expressions: [{
									fieldName: "Name",
									cond: "Contains",
									expr: "Cr",
									logic: "OR"
								}]
							}
						});
						ds.dataBind();
					});
				```
				*/
				filterLogicUrlKey: "filterLogic",
				/* type="array" data will be initially filtered accordingly, directly after dataBind()
				```
					$(window).load(function () {
						var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
						ds = new $.%%WidgetName%%({
							callback: render,
							dataSource: url,
							schema: {
								fields: [{
									name: "Name"
								}, {
									name: "Price"
								}, {
									name: "Rating"
								}],
								searchField: "d"
							},
							responseDataKey: "d",
							responseDataType: "jsonp",
							filtering: {
								type: "remote",
								defaultFields: [{
									fieldName: "Price",
									cond:"GreaterThan",
									expr: 20
								}]
							}
						});
						ds.dataBind();
					});
				```
				*/
				defaultFields: [],
				/* type="array" a list of expression objects, containing the following key-value pairs: fieldName, expression (search string), condition , and logic (AND/OR)
				```
					var url = "/demos/server/proxy.php?url=http://services.odata.org/OData/OData.svc/Products?$format=json";
					ds = new $.%%WidgetName%%({
						callback:render,
						dataSource: url,
						localSchemaTransform: false,
						responseDataKey: "d",
						filtering: {
							expressions:[
								{
									fieldName: "Price",
									cond:"GreaterThan",
									expr: 20
								}
							]
						},
						schema: {
							fields: [
								{name : "Price"},
								{name : "Name"},
								{name: "Rating"}
							],
							searchField: "d"
						}
					});

					ds.dataBind();
				```
				*/
				expressions: [],
				/* type="string" an "SQL-like' encoded expressions string. Takes precedence over "expressions". Example: col2 > 100; col2 LIKE %test%
				```
					var render = function (success, error) {
						if (success) {
							var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
							resultHtml = $.ig.tmpl(template, ds.dataView());
							$("#table").html(resultHtml);
						} else {
							alert(error);
						}
					}

					var ds;

					$(window).load(function () {
						var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
						ds = new $.%%WidgetName%%({
							callback: render,
							dataSource: url,
							schema: {
								fields: [{
									name: "Name"
								}, {
									name: "Price"
								}, {
									name: "Rating"
								}],
								searchField: "d"
							},
							responseDataKey: "d",
							responseDataType: "jsonp",
							filtering: {
								type: "remote",
								exprString: "Name LIKE Cr%"
							}
						});
						ds.dataBind();
					});
				```
				*/
				exprString: "",
				/* type="object" an object containing custom defined filtering conditions as objects.
				```
					jsonDs = new $.ig.DataSource( {
						filtering: {
							type: "local",
							caseSensitive: true,
							applyToAllData: true,
							customConditions: [
								BE: {
									labelText: "BE",
									expressionText: "BE-####",
									requireExpr: false,
									filterFunc: filterProductNumber
								},
								CA: {
									labelText: "CA",
									expressionText: "CA-####",
									requireExpr: false,
									filterFunc: filterProductNumber1
								}
							]
						},
						dataSource: jsonData
					}).dataBind()
					function filterProductNumber(value, expression, dataType, ignoreCase, preciseDateFormat) {
						return value.startsWith("BE");
					}
					function filterProductNumber1(value, expression, dataType, ignoreCase, preciseDateFormat) {
						return value.startsWith("CA");
					}
				```
				*/
				customConditions: null
			},
			/* Settings related to built-in sorting functionality
			```
				$(window).load(function () {
					ds = new $.%%WidgetName%%({
						type: "json",
						dataSource: adventureWorks,
						sorting: {
							type: "local",
							caseSensitive: true
						}
					});

					ds.dataBind();
				});
			```
			*/
			sorting: {
				/* type="none|asc|desc" Sorting direction
				```
					jsonDs = new $.%%WidgetName%%({
						sorting: {
							type: "local",
							defaultDirection: "asc"
						},
						dataSource: jsonData
					}).dataBind();
				```
				none type="string"
				asc type="string"
				desc type="string"
				*/
				defaultDirection: "none",
				/* type="array" when defaultDirection is different than "none", and defaultFields is specified, data will be initially sorted accordingly, directly after dataBind()
				```
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					var ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp",
						sorting: {
							type: "local",
							defaultFields: [{
							fieldName: "Price"
							}]
						}
					});
				```
				*/
				defaultFields: [],
				/* type="bool" If the sorting type is local and applyToAllData is true, sorting will be performed on the whole data source that's present locally, otherwise only on the current dataView. If sorting type is remote, this setting doesn't have any effect.
				```
					jsonDs = new $.%%WidgetName%%({
						sorting: {
							type: "local",
							applyToAllData: true
						},
						dataSource: jsonData
					}).dataBind();
				```
				*/
				applyToAllData: true,
				/* type="object"  Custom sorting function that can point to either a string or a function object. When the function is called, the following arguments are passed: data array, fields (array of field definitions) , direction ("asc" or "desc"). The function should return a sorted data array
				```
					var render = function (success, error) {
						if (success) {
							var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
							resultHtml = $.ig.tmpl(template, ds.dataView());
							$("#table").html(resultHtml);
						} else {
							alert(error);
						}
					}

					var myCustomFunc = function (data, fields, direction) {
						function myCompareFunc(obj1, obj2) {
							if (direction == "desc") {
								return obj2[fields[0].fieldName] - obj1[fields[0].fieldName];
							}

							return obj1[fields[0].fieldName] - obj2[fields[0].fieldName];
						}
						var result = data.sort(myCompareFunc);
						return result;
					}

					var ds;
					$(window).load(function () {
						var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
						ds = new $.%%WidgetName%%({
							callback: render,
							dataSource: url,
							schema: {
								fields: [{
									name: "Name"
								}, {
									name: "Price"
								}, {
									name: "Rating"
								}],
								searchField: "d"
							},
							responseDataKey: "d",
							responseDataType: "jsonp",
							sorting: {
								type: "local",
								customFunc: myCustomFunc,
								defaultFields: [{
									fieldName: "Price"
								}],
								defaultDirection: "desc"
							}
						});
						ds.dataBind();
					});
				```
				*/
				customFunc: null,
				/* type="object" Custom comparison sorting function. Accepts the following arguments: fields, schema, booleand value whether sorting is ascending , convert function(please check option for customConvertFunc) and returns a value 0 indicating that values are equal, 1 indicating that val1 > val2 and -1 indicating that val1 < val2
				```
					var render = function (success, error) {
						if (success) {
							var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
							resultHtml = $.ig.tmpl(template, ds.dataView());
							$("#table").html(resultHtml);
						} else {
							alert(error);
						}
					}

					var myCompareFunc = function (fields, schema, reverse, convertf) {
						return function (val1, val2) {
							if (val1.Price > val2.Price) {
								return 1;
							}

							if (val1.Price < val2.Price) {
								return -1;
							}

							return 0;
						}
					}

					var ds;
					$(window).load(function () {
						var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
						ds = new $.%%WidgetName%%({
							callback: render,
							dataSource: url,
							schema: {
								fields: [{
									name: "Name"
								}, {
									name: "Price"
								}, {
									name: "Rating"
								}],
								searchField: "d"
							},
							responseDataKey: "d",
							responseDataType: "jsonp",
							sorting: {
								type: "local",
								compareFunc: myCompareFunc,
								defaultFields: [{
									fieldName: "Price"
								}]
							}
						});
						ds.dataBind();
					});
				```
				*/
				compareFunc: null,
				/* type="object" Custom data value conversion function(called from sorting function). Accepts a value of the data cell and column key and should return the converted value
				```
					var render = function (success, error) {
						if (success) {
							var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
							resultHtml = $.ig.tmpl(template, ds.dataView());
							$("#table").html(resultHtml);
						} else {
							alert(error);
						}
					}

					var myCompareFunc = function (fields, schema, reverse, convertf) {
						return function (obj1, obj2) {
							a = convertf(obj1);
							b = convertf(obj2);

							if (a > b) {
								return 1;
							}

							if (a < b) {
								return -1;
							}

							return 0;
						}
					}

				var myCustomConvertFunc = function (obj) {
						return obj.Price;
					}

					var ds;
					$(window).load(function () {
						var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
						ds = new $.%%WidgetName%%({
							callback: render,
							dataSource: url,
							schema: {
								fields: [{
									name: "Name"
								}, {
									name: "Price"
								}, {
									name: "Rating"
								}],
								searchField: "d"
							},
							responseDataKey: "d",
							responseDataType: "jsonp",
							sorting: {
								type: "local",
								compareFunc: myCompareFunc,
								customConvertFunc: myCustomConvertFunc,
								defaultFields: [{
									fieldName: "Price"
								}]
							}
						});
						ds.dataBind();
					});
				```
				*/
				customConvertFunc: null,
				/* type="remote|local" Specifies whether sorting will be applied locally or remotely (via a remote request)
				```
					$(window).load(function () {
						ds = new $.%%WidgetName%%({
							type: "json",
							dataSource: adventureWorks,
							sorting: {
								type: "local",
								caseSensitive: true
							}
						});

						ds.dataBind();
					});
				```
				remote type="string"
				local type="string"
				*/
				type: "remote",
				/* type="bool" Specifies if sorting will be case sensitive or not. Works only for local sorting
				```
					$(window).load(function () {
						ds = new $.%%WidgetName%%({
							type: "json",
							dataSource: adventureWorks,
							sorting: {
								type: "local",
								caseSensitive: true
							}
						});

						ds.dataBind();
					});
				```
				*/
				caseSensitive: false,
				/* type="string" URL param name which specifies how sorting expressions will be encoded in the URL. Default is null and uses OData conventions
				```
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					var ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [
								{name: "Name"},
								{name: "Price"},
								{name: "Rating"}
							],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp",
						sorting: {
							type: "local",
							sortUrlKey: "mySortUrlKey"
						}
					});
				```
				*/
				sortUrlKey: null,
				/* type="string" URL param value for ascending type of sorting. Default is null and uses OData conventions
				```
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					var ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp",
						sorting: {
							type: "local",
							sortUrlAscValueKey: "mySortUrlAscValueKey"
						}
					});
				```
				*/
				sortUrlAscValueKey: null,
				/* type="string" URL param value for descending type of sorting. Default is null and uses OData conventions
				```
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					var ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [
								{name: "Name"},
								{name: "Price"},
								{name: "Rating"}
							],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp",
						sorting: {
							type: "local",
							sortUrlDescValueKey: "mySortUrlDescValueKey"
						}
					});
				```
				*/
				sortUrlDescValueKey: null,
				/* type="array" a list of sorting expressions , consisting of the following keys (and their respective values): fieldName, direction and compareFunc (optional)
				```
					ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						localSchemaTransform: false,
						responseDataKey: "d",
						sorting: {
							expressions:[
								{
									fieldName:"Rating",
									dir:"asc"
								},
								{
									fieldName:"Price", dir:"asc"
								}
							]
						}
					});
				```
				*/
				expressions: [],
				/* type="string" takes precedence over experssions, an "SQL-like" encoded expressions string  : see sort(). Example col2 > 100 ORDER BY asc
				```
					function sortRemote() {
						ds.settings.sorting.type = "remote";

						// remote sort
						ds.settings.sorting.exprString = "GNP " + dir;
						ds.dataBind();
					}
				```
				*/
				exprString: ""
			},
			/* Settings related to built-in group by functionality
			```
				ds = new $.%%WidgetName%%({
					dataSource: products,
					groupby: {
						defaultCollapseState: true
					}
				});

				ds.dataBind();
			```
			*/
			groupby: {
				/* type="bool" default collapse state
				```
					ds = new $.%%WidgetName%%({
						dataSource: products,
						groupby: {
							defaultCollapseState: true
						}
					});
				```
				*/
				defaultCollapseState: false,
				/* type="allRecords|dataRecordsOnly". Specifies how paging should be applied when there is at least one grouped column
				```
					ds = new $.%%WidgetName%%({
						dataSource: products,
						groupby: {
							pagingMode: "allRecords"
						}
					});
				```
				allRecords type="string" Paging is applied for all records - data and non-data records(like group-by records)
				dataRecordsOnly type="string" Paging is applied ONLY for data records. Non-data records are disregarded in paging calculations.
				*/
				pagingMode: "allRecords"
			},
			/* M.H. add summaries support */
			/* Settings related to built-in summaries functionality
			```
				var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
				var ds = new $.%%WidgetName%%({
					callback: render,
					dataSource: url,
					schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}],
						searchField: "d"
					},
					responseDataKey: "d",
					responseDataType: "jsonp",
					summaries: {
						type: "remote",
						columnSettings: [{
							columnKey: "Price",
							allowSummaries: false,
							summaryOperands: [{
								type: "count",
								active: true,
								order: 0
							}]
						}],
						summariesResponseKey: "d"
					}
				});
			```
			*/
			summaries: {
				/* type="remote|local" Specifies whether summaries will be applied locally or remotely (via a remote request)
				```
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					var ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp",
						summaries: {
							type: "remote"
						}
					});
				```
				remote type="string" A remote request is done and URL params encoded
				local type="string" Data is paged client-side.
				*/
				type: "remote",
				/* type="string" Url key for retrieving data from response - used only when summaries are remote
				```
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					var ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp",
						summaries: {
							summaryExprUrlKey: "mySummaries"
						}
					});
				```
				*/
				summaryExprUrlKey: "summaries",
				/* type="string" Key for retrieving data from the summaries response - used only when summaries are remote
				```
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					var ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp",
						summaries: {
							summariesResponseKey: "d"
						}
					});
				```
				*/
				summariesResponseKey: "summaries",
				/* type="priortofilteringandpaging|afterfilteringbeforepaging|afterfilteringandpaging" Determines when the summary values are calculated
				```
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					var ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp",
						summaries: {
							summaryExecution: "priortofilteringandpaging"
						}

					});
				```
				priortofilteringandpaging type="string"
				afterfilteringbeforepaging type="string"
				afterfilteringandpaging type="string"
				*/
				summaryExecution: "afterfilteringandpaging",
				/* type="array" a list of column settings that specifies custom summaries options per column basis
				```
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					var ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp",
						summaries: {
							columnSettings: [{
								columnKey: "Price",
								allowSummaries: false,
								summaryOperands: [{
									type: "count",
									active: true,
									order: 0
								}]
							}]
						}

					});
				```
				*/
				columnSettings: [
					/* {key: '', summaryOperands: []}*/
				]
			},
			/* type="array" *** IMPORTANT DEPRECATED ***
			A list of field definitions specifying the schema of the data source.
			Field objects description: {name, [type], [xpath]}
			```
				var products = [];
				products[0] = {
					"ProductID": 1,
					"Name": "Adjustable Race",
					"ProductNumber": "AR-5381"
				};
				products[1] = {
					"ProductID": 2,
					"Name": "Bearing Ball",
					"ProductNumber": "BA-8327"
				};

				var ds;
				$(window).ready(function () {

					ds = new $.%%WidgetName%%({
						dataSource: products,
						fields: [{
							name: "ProductID",
							type: "number"
						}, {
							name: "Name",
							type: "string"
						}, {
							name: "ProductNumber",
							type: "string"
						}]
					});

					ds.dataBind();
				});
			```
			*/
			fields: [],
			/* type="bool" if true, will serialize the transaction log of updated values - if any - whenever commit is performed via a remote request.
			```
				$.ig.DataSource({
					serializeTransactionLog: false
				});
			```
			*/
			serializeTransactionLog: true,
			/* type="bool" if set to true, the following behavior will take place:
			if a new row is added, and then deleted, there will be no transaction added to the log
			if an edit is made to a row or cell, then the value is brought back to its original value, the transaction should be removed
			Note: This option takes effect only when autoCommit is set to false.
			```
				var ds = new $.%%WidgetName%%({
					aggregateTransactions: true,
					dataSource: arrayOfObjects
				});
			```
			*/
			aggregateTransactions: false,
			/* type="bool" if auto commit is true, data will be automatically commited to the data source, once a value or a batch of values are updated via saveChanges()
			```
				var ds = new $.%%WidgetName%%({
					autoCommit: true
				});
			```
			*/
			autoCommit: false,
			/* type="string" specifies an update remote URL, to which an AJAX request will be made as soon as saveChages() is called.
			```
				var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
				var ds = new $.%%WidgetName%%({
					callback: render,
					dataSource: url,
					schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}],
						searchField: "d"
					},
					responseDataKey: "d",
					responseDataType: "jsonp",
					updateUrl: "http://example.com/myUpdateUrl/"

				});
			```
			*/
			updateUrl: null,
			/* type="function" A function to call when row is added.
			Function takes first argument item and second argument dataSource.
			Use item.row to obtain reference to the added row.
			Use item.rowId to get the row ID.
			Use dataSource to obtain reference to $.ig.DataSource.
			```
				$.ig.DataSource({
					rowAdded: function (item, dataSource) {…}
				});
			```
			*/
			rowAdded: null,
			/* type="function" A function to call when row is updated (edited).
			Function takes first argument item and second argument dataSource.
			Use item.rowIndex to get the row index.
			Use item.newRow to obtain reference to the updated row.
			Use item.oldRow to obtain reference to the row that was updated.
			Use dataSource to obtain reference to $.ig.DataSource.
			```
				$.ig.DataSource({
					rowUpdated: function (item, dataSource) {…}
				});
			```
			*/
			rowUpdated: null,
			/* type="function" a function to call when row is inserted.
			Function takes first argument item and second argument dataSource.
			Use item.row to obtain reference to the inserted row.
			Use item.rowId to get the row ID.
			Use item.rowIndex to get the row index.
			Use dataSource to obtain reference to $.ig.DataSource.
			```
				$.ig.DataSource({
					rowInserted: function (item, dataSource) {…}
				});
			```
			*/
			rowInserted: null,
			/* type="function" a function to call when row is deleted.
			Use item.row to obtain reference to the deleted row.
			Use item.rowId to get the row ID.
			Use item.rowIndex to get the row index.
			Use dataSource to obtain reference to $.ig.DataSource.
			```
				$.ig.DataSource({
					rowDeleted: function (item, dataSource) {…}
				});
			```
			*/
			rowDeleted: null
		},
		init: function (options) {
			var tempSource, tempCallee, arrayAlready = false, metadata;
			/* merge defaults with passed-in values */
			if (options) {
				tempSource = options.dataSource;
				if (tempSource && ($.type(tempSource) === "array" || $.type(tempSource) === "object")) {
					/* L.A. 28 August 2012 Fixing bug #119626 When the hierarchical grid is bound to remote data (without load on demand),
					expanding a root grid row causes an error and no child layouts are shown */
					if (($.type(tempSource) === "object") && options.responseDataKey && options.type !== "json") {
						/* M.H. 14 Sep 2012 Fix for bug #121209: we should preserve metadata */
						metadata = tempSource.Metadata;
						options.dataSource = $.ig.findPath(tempSource, options.responseDataKey);
						if (metadata && options.dataSource.Metadata === undefined) {
							options.dataSource.Metadata = metadata;
						}
						arrayAlready = true;
					} else {
						options.dataSource = null;
					}
				}
				/* M.H. 12 Nov 2012 Fix for bug #122201 */
				if (options.callee) {
					tempCallee = options.callee;
					options.callee = null;
				}
				this.settings = $.extend(true, {}, $.ig.DataSource.prototype.settings, options);
				/* M.H. 15 May 2013 Fix for bug 141609: Cell value is split into single character when a flat grid is shown after a hierarchical grid has been expanded */
				if (arrayAlready) {
					this.settings.type = "array";
				} else if (tempSource && ($.type(tempSource) === "array" || $.type(tempSource) === "object")) {
					options.dataSource = tempSource;
					this.settings.dataSource = tempSource;
				}
				/* M.H. 12 Nov 2012 Fix for bug #122201 */
				if (tempCallee) {
					this.settings.callee = tempCallee;
					tempCallee = null;
				}
			}
			/* initialize local vars */
			/* this._pageIndex = 0; */
			this.settings.paging.pageIndex = 0;
			this._isBound = false;
			this._url = null;
			this._dsCallback = null;
			this._data = []; // _data may be different than _dataView only when the whole data source is present locally, but we are performing sorting or filtering or paging on it,
			this._dataView = []; // therefore the dataView will contain only a subset of the *local* data.
			// Same applies when data is parsed from a table. With remote fetching, everything is in _data
			if (this.settings.type === "unknown") {
				this._runtimeType = this.analyzeDataSource();
			} else {
				this._runtimeType = this.settings.type;
			}

			this._parser = new $.ig.TypeParser();
			this._schema = null;
			/* used only when doing remote paging, sorting and filtering,
			to determine the request type in order to know whether to parse metadata fields
			such as total record count - from the response */
			this._isSortingReq = false;
			this._isFilteringReq = false;
			this._isPagingReq = false;
			this._isSummariesReq = false;
			this._dataSummaries = [];
			this._recCount = 0;
			this._hasCount = false;
			this._initSchema();
			this._transactionLog = []; // transactions support & batch updating
			this._accumulatedTransactionLog = []; // this is the transaction log that will be serialized and posted to the server, if the option "serializeTransactionLog" is true (MVC scenarios!)
			return this;
		},
		_initSchema: function () {
			var i;
			/* performance optimization
			if (this.settings.schema && this.settings.localSchemaTransform) { */
			if (this.settings.schema) {
				if (this.settings.schema instanceof $.ig.DataSchema) {
					this._schema = this.settings.schema;
				} else {
					// two cases: the developer has explicitly set a type, and 2) he didn't - which means we need to analyze the data source at runtime
					if (this.settings.type !== "unknown") {
						this._schema = new $.ig.DataSchema(this.settings.type, this.settings.schema);
					} else {
						this._schema = new $.ig.DataSchema(this._runtimeType, this.settings.schema);
					}
					this._schema._pk = this.settings.primaryKey;
				}

				this._fields = {};
				for (i = 0; i < this._schema.fields().length ; i++) {
					if (typeof this._schema.fields()[ i ].mapper === "string" &&
						typeof window[ this._schema.fields()[ i ].mapper ] === "function") {
						this._schema.fields()[ i ].mapper = window[ this._schema.fields()[ i ].mapper ];
					}
					if (typeof (this._schema.fields()[ i ].mapper) === "function") {
						this._hasMapper = true;
					}
					this._fields[ this._schema.fields()[ i ].name ] = this._schema.fields()[ i ];
				}
			}

		},
		fields: function (fields) {
			/* Sets a list of fields to the data source. If no parameter is specified, just returns the already existing list of fields
			```
				var ds;

				var render = function (success, error) {
					if (success) {
						var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
						resultHtml = $.ig.tmpl(template, ds.dataView());
						$("#table").html(resultHtml);
					} else {
						alert(error);
					}
				}

				$(window).load(function () {
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp",
						fields: [{
							key: "Name",
							dataType: "string"
						}, {
							key: "Price",
							dataType: "number"
						}, {
							key: "Rating",
							dataType: "number"
						}]
					});
					ds.dataBind();
					var fields = ds.fields();
				});
			```
			paramType="object" optional="true" a field has the following format: {key: 'fieldKey', dataType: 'string/number/date' }
			returnType="object" if no parameters are specified, returns the existing list of fields
			*/
			if (fields === undefined || fields === null) {
				return this.settings.fields;
			}
			this.settings.fields = fields;
			return this;
		},
		analyzeDataSource: function () {
			/* analyzes the dataSource setting to automatically determine the type of the data source. Returns the data source type. See settings.type
			```
				var ds;

				var render = function (success, error) {
					if (success) {
					console.log(ds.analyzeDataSource());
						var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
						resultHtml = $.ig.tmpl(template, ds.dataView());
						$("#table").html(resultHtml);
					} else {
						alert(error);
					}
				}

				$(window).load(function () {
				var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
				ds = new $.%%WidgetName%%({
					callback: render,
					dataSource: url,
					schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}],
						searchField: "d"
					},
					responseDataKey: "d",
					responseDataType: "jsonp"
					});
					ds.dataBind();
				});
			```
			returnType="string"
			*/
			var ds = this.dataSource(), dc, $dsObj;
			if (ds === undefined || ds === null) {
				return "empty";
			}
			if ($.type(ds) === "function") {
				// function
				return "function";
			}
			if ($.type(ds) === "array") {
				// string, assume JSON by default and eval it
				return "array";
			}
			if ($.type(ds) === "number" || $.type(ds) === "boolean" || $.type(ds) === "date") {
				// data source is either boolean, number date, etc.
				return "invalid";
			}
			if ($.type(ds) === "string") { //string or object
				ds = $.trim(ds);
				if (ds.startsWith("/")) {
					return "remoteUrl";
				}
				/* already passed through this code, we don't need to do the same thing again */
				if ($("#" + this.settings.id).length > 0 && ds.toLowerCase().startsWith("<table")) {
					return "htmlTableString";
				}
				/* was: $(ds.toLowerCase()) */

				if (ds.toLowerCase().startsWith("<table")) {
					/* store the contents in this._data:
					for that purpose we create a dummy div "data container", append it to the body, set display none and visibility hidden, and append our table there. */
					dc = "<div id='" + this.settings.id + "' style='display:none;visibility:hidden;'>" +
						ds +
						"</div>";
					/* this._data = $(dc).appendTo($("body")); */
					$(dc).appendTo($("body"));
					return "htmlTableString";
				}
				if (!ds.startsWith("[") && !ds.startsWith("{") && !ds.startsWith("<")) { // object, array or xml
					// try to see if it's not a table:
					// N.A. 02/10/2014 Bug #162293 Add support for https requests.
					if (!ds.startsWith("http://") && !ds.startsWith("https://")) {
						// M.H. 21 Apr 2015 Fix for bug 192966: When dataSourceType is URL and dataSource is string URL without containing http or https(and having symbols like / or or : ) a JS exception is thrown
						// when url is like this WebService.asmx/GetSecondLevel?path=SummaryID:020&layout=undefined the selector could not be parsed by jQuery and exception is thrown
						try {
							$dsObj = $("#" + ds);
							if ($dsObj.length > 0 && $dsObj[ 0 ].nodeName.toLowerCase() === "table") {
								return "htmlTableId";
							}
						} catch (e) {
							// probably it is URL not starting with http or https and JS error is thrown
						}
					}
					this._url = ds;
					return "remoteUrl";
				}
				return "unknown";
			}
			if (ds.nodeName && ds.nodeName.toLowerCase() === "table") {
				return "htmlTableDom";
			}
			if (ds.nodeName && (ds.nodeName.toLowerCase() === "ul" || ds.nodeName.toLowerCase() === "ol")) {
				return "htmlListDom";
			}
			if (ds.nodeName && ds.nodeName.toLowerCase() === "select") {
				return "htmlSelectDom";
			}
			return "unknown";
		},
		dataView: function () {
			/* returns the current normalized/transformed and paged/filtered/sorted data, i.e. the dataView
			```
				function numberOfRows () {
					return $("#grid1").data("igGrid").dataSource.dataView().length;
				}
			```
			returnType="array" array of data records
			*/
			return this._dataView;
		},
		data: function () {
			/* returns all of the bound data, without taking into account local paging, sorting, filtering, etc.
			```
				var ds;
				var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
				ds = new $.%%WidgetName%%({
					callback: render,
					dataSource: url,
					schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}],
						searchField: "d"
					},
					responseDataKey: "d",
					responseDataType: "jsonp"
				});

				var data = ds.data();
			```
			returnType="object"
			*/
			return this._data;
		},
		transformedData: function (transformedExecution) {
			/*	returns transformed data according to transformed execution:
			1. Before paging and filtering
			2. After filtering before paging
			3. After filtering and paging

			```
				var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
				var ds = new $.%%WidgetName%%({
					callback: render,
					dataSource: url,
					schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}],
						searchField: "d"
					},
					responseDataKey: "d",
					responseDataType: "jsonp"
				});

				ds.transformedData("priortofilteringandpaging");
			```

			returnType="object"
			*/
			/* M.H. 14 Apr 2015 Fix for bug 192590: The transformedData method returns inconsistent result after every call. */
			var data;
			switch (transformedExecution) {
				case "priortofilteringandpaging":
					data = this._data;
					break;
					/* this is populated in populateDataSummaries method */
				case "afterfilteringbeforepaging":
					if (this._transformedData !== undefined) {
						data = this._transformedData;
					} else {
						data = this._data;
					}
					break;
				case "afterfilteringandpaging":
					data = this.dataView();
					break;
				default:
					data = this._dataView;
					break;
			}
			return data;
		},
		dataSummaries: function () {
			/*	returns summaries data
			```
				var ds;
				var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
				ds = new $.%%WidgetName%%({
					callback: render,
					dataSource: url,
					schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}],
						searchField: "d"
					},
					responseDataKey: "d",
					responseDataType: "jsonp"
				});

				var dataSummaries = ds.dataSummaries();
			```
			 * returnType="object"
			*/
			var s = this.settings.summaries, type = s.type;
			if (type === "local") {
				this._dataSummaries = this.transformedData(s.summaryExecution);
			}
			return this._dataSummaries;
		},
		schema: function (s, t) {
			/* Gets/sets the schema definition.
			```
				var jsonSchema = new $.ig.DataSchema("json", {
					fields: [{
						name: "ProductID",
						type: "number"
					}, {
						name: "Name",
						type: "string"
					}, {
						name: "ProductNumber",
						type: "string"
					}, {
						name: "Color",
						type: "string"
					}, {
						name: "StandardCost",
						type: "string"
					}],
					searchField: "Records"
				});

				ds = new $.%%WidgetName%%();

				// Set
				ds.schema(jsonSchema);

				// Get
				var myJsonSchema = ds.schema();
			```
			paramType="object" optional="true" a schema object
			paramType="string" optional="true" type of the data source. See settings.type
			*/
			/* data source schema definition */
			if (s === undefined || s === null) {
				return this._schema;
			}
			if (s instanceof $.ig.DataSchema) {
				this._schema = s;
			} else {
				if (t === null || t === undefined) {
					this._schema = new $.ig.DataSchema(s.type, s);
				} else {
					this._schema = new $.ig.DataSchema(t, s);
				}
				this._schema._pk = this.settings.primaryKey;
			}
			return this;
		},
		pagingSettings: function (p) {
			/* gets/sets a list of paging settings
			```
				var ds = new $.%%WidgetName%%({
					type: "json",
					dataSource: adventureWorks,
					paging: {
						enabled: true,
						pageSize: 10,
						type: "local"
					}
				});

				var myPagingSettings = {
					enabled: true,
					pageSize: 10,
					pageIndex: 2,
					pageIndexUrlKey: "myPageIndexUrlKey",
					type: "local"
				};

				// Set
				ds.pagingSettings(myPagingSettings);

				// Get
				var pagingSettings = ds.pagingSettings();
			```
			paramType="object" optional="true" object holding all paging settings. See settings.paging
			returnType="object" Returns an object holding the current paging settings when you use the getter and the current instance of the [$.ig.DataSource](ig.datasource) when you use the setter
			*/
			if (p === undefined || p === null) {
				return this.settings.paging;
			}
			this.settings.paging = p;
			return this;
		},
		filterSettings: function (f) {
			/* gets/sets a list of filtering settings
			```
				var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
				var ds = new $.%%WidgetName%%({
					callback: render,
					dataSource: url,
					schema: {
						fields: [
							{name : "Name"},
							{name : "Price"},
							{name: "Rating"}
						],
						searchField: "d"
					},
					responseDataKey: "d",
					responseDataType: "jsonp"
				});

				var myFilterSettings = {
					type: "remote",
					expressions: [
					{
						fieldName: "Name",
						cond:"Contains",
						expr: "Cr",
						logic: "OR"
					}
				]
				};

				// Set
				ds.filterSettings(myFilterSettings);

				// Get
				var filterSettings= ds.filterSettings();
			```
			paramType="object" optional="true" object holding all filtering settings. See settings.filtering
			*/
			if (f === undefined || f === null) {
				return this.settings.filtering;
			}
			this.settings.filtering = f;
			return this;
		},
		sortSettings: function (s) {
			/* gets/sets a list of paging settings
			```
				var ds = new $.%%WidgetName%%({
					schema: {
						fields: [{
							name: "col1"
						}, {
							name: "col2",
							type: "number"
						}]
					}
				}).dataBind();

				var sortSettings = {
					type: "local",
					defaultFields: [{
						fieldName: "col2"
					}],
					defaultDirection: "desc"
				};

				// Set
				ds.sortSettings(sortSettings);

				// Get
				var mySortSettings = ds.sortSettings();
			```
			paramType="object" optional="true" object holding all sorting settings. See settings.sorting
			returnType="object" Returns an object holding the current sorting settings when getter is used and the current instance of the [$.ig.DataSource](ig.datasource) when setter is used
			*/
			if (s === undefined || s === null) {
				return this.settings.sorting;
			}
			this.settings.sorting = s;
			return this;
		},
		summariesSettings: function (s) {
			/* Gets/sets a list of summaries settings.
			paramType="object" optional="true" object holding all summaries settings. See settings.summaries
			*/
			if (s === undefined || s === null) {
				return this.settings.summaries;
			}
			this.settings.summaries = s;
			return this;
		},
		dataSource: function (ds) {
			/* gets/sets the dataSource setting. If no parameter is specified, returns settings.dataSource
			```
				var ds;
				var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
				ds = new $.%%WidgetName%%({
					callback: render,
					schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}],
						searchField: "d"
					},
					responseDataKey: "d",
					responseDataType: "jsonp"
				});

				// Set
				ds.dataSource(url);

				// Get
				var dataSource = ds.dataSource();
			```
			paramType="object" optional="true"
			returnType="object"
			*/
			if (ds === undefined || ds === null) {
				return this.settings.dataSource;
			}
			this.settings.dataSource = ds;
			this.analyzeDataSource();
			return this;
		},
		type: function (t) {
			/* gets/sets the type of the dataSource. If no parameter is specified, returns settings.type
			```
				ds = new $.%%WidgetName%%();

				// Set
				ds.type("json");

				// Get
				var myType = ds.type();
			```
			paramType="json|xml|unknown|array|function|htmlTableString|htmlTableId|htmlTableDom|invalid|remoteUrl|empty" optional="true"
			returnType="json|xml|unknown|array|function|htmlTableString|htmlTableId|htmlTableDom|invalid|remoteUrl|empty"
			*/
			if (t === undefined || t === null) {
				//return this.settings.dataSourceType;
				return this._runtimeType;
			}
			this.settings.type = t;
			return this;
		},
		/* M.P.: 183193 - The igniteui.d.ts file is not compiling */
		/* jshint unused:false */
		findRecordByKey: function (key, ds, objPath) {
			/* returns a record by a specified key (requires that primaryKey is set in the settings)
			```
				var ds;

				var render = function (success, error) {
					if (success) {
						var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
						resultHtml = $.ig.tmpl(template, ds.dataView());
						$("#table").html(resultHtml);
						var myObj = ds.findRecordByKey("Milk");
					} else {
						alert(error);
					}
				}

				$(window).load(function () {
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp",
						primaryKey: "Name"
					});
					ds.dataBind();
				});
			```
			paramType="string" Primary key of the record
			paramType="string" optional="true" the data source in which to search for the record. When not set it will use the current data source.
			paramType="string" optional="true" Not used in $.ig.DataSource
			returnType="object" a JavaScript object specifying the found record, or null if no record is found
			*/
			/* A.T 2 Feb 2011 for now i am going to traverse all records until the one specified by key is found.
			additional great optimization is to index all records so that they are in the form <key>: { <javascript object> } */
			/* S.S. March 27, 2014 - slight code optimization, adding search capabilities for two-dimentional arrays used as a data source */
			var i,
				data = ds || this._data,
				len = data ? data.length : 0,
				search = len > 0 && $.isArray(data[ 0 ]) ? this._lookupPkIndex() : this.settings.primaryKey;
			for (i = 0; i < len; i++) {
				if (data[ i ][ search ] === key) {
					return data[ i ];
				}
			}
			return null;
		},
		/* jshint unused:true */
		removeRecordByKey: function (key, origDs) {
			/* removes a specific record denoted by the primaryKey of the passed key parameter from the data source
			```
				var ds = new $.%%WidgetName%%({
					schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}],
						searchField: "d"
					},
					responseDataKey: "d",
					responseDataType: "jsonp",
					primaryKey: "Name"
				});
				ds.addRow(0, {
					Name: "CD Player",
					Price: "40",
					Rating: "4"
				}, true);
				ds.addRow(1, {
					Name: "CD Player1",
					Price: "40",
					Rating: "4"
				}, true);
				ds.addRow(2, {
					Name: "CD Player2",
					Price: "40",
					Rating: "4"
				}, true);

				ds.removeRecordByKey("CD Player2");
			```
			paramType="string|number" primary key of the record
			*/
			var i, len, data, count = 0,
				all = [ this._data ],
				prime = this.settings.primaryKey,
				primeIdx = this._lookupPkIndex(),
				search;
			this._addOnlyUniqueToCollection(all, this._dataView);
			this._addOnlyUniqueToCollection(all, this._filteredData);
			this._addOnlyUniqueToCollection(all, origDs);
			while (count < all.length) {
				data = all[ count++ ];
				len = data ? data.length : 0;
				search = len > 0 && $.isArray(data[ 0 ]) ? primeIdx : prime;
				for (i = 0; i < len; i++) {
					if (data[ i ] && data[ i ][ search ] === key) {
						//A.T. 8 March 2012 - Fix for bug #104244
						//data.remove(i);
						$.ig.removeFromArray(data, i);
						break;
					}
				}
			}
		},
		removeRecordByIndex: function (index, origDs) {
			/* Removes a record from the data source at specific index.
			```
				var ds = new $.%%WidgetName%%({
					schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}],
						searchField: "d"
					},
					responseDataKey: "d",
					responseDataType: "jsonp"
				});
				ds.addRow(0, {
					Name: "CD Player",
					Price: "40",
					Rating: "4"
				}, true);
				ds.addRow(1, {
					Name: "CD Player1",
					Price: "40",
					Rating: "4"
				}, true);
				ds.addRow(2, {
					Name: "CD Player2",
					Price: "40",
					Rating: "4"
				}, true);

				ds.removeRecordByIndex(0);
			```
			paramType="number" index of record
			*/
			var i, len, record, data = this._data, view = this._dataView, filter = this._filteredData;
			if (!data || isNaN(index) || index < 0 || index >= data.length) {
				return;
			}
			record = data[ index ];
			/* A.T. 8 March 2012 - Fix for bug #104244
			data.remove(index); */
			$.ig.removeFromArray(data, index);
			if (origDs) {
				$.ig.removeFromArray(origDs, index);
			}
			/* if _dataView equals to _data, then skip it */
			data = (data === view) ? filter : view;
			/* if record is null, then it is not possible to find it in dataView */
			while (record) {
				len = data ? data.length : 0;
				for (i = 0; i < len; i++) {
					if (data[ i ] === record) {
						/* A.T. 8 March 2012 - Fix for bug #104244
						data.remove(i); */
						$.ig.removeFromArray(data, i);
						break;
					}
				}
				if (data === filter) {
					return;
				}
				data = filter;
			}
		},
		setCellValue: function (rowId, colId, val, autoCommit) {
			/*  sets a cell value for the cell denoted by rowId and colId. Creates a transaction for the update operation and returns it
			```
				var ds = new $.%%WidgetName%%({
					schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}]
					},
					updateUrl: "http://example.com/myUpdateUrl/"
				});

				ds.addRow(0, {
					Name: "CD Player",
					Price: "40",
					Rating: "4"
				}, true);
				ds.addRow(1, {
					Name: "CD Player1",
					Price: "40",
					Rating: "4"
				}, true);
				ds.addRow(2, {
					Name: "CD Player2",
					Price: "40",
					Rating: "4"
				}, true);

				ds.setCellValue(1, "Name", "DVD Player", true);
			```
			paramType="object" the rowId - row key (string) or index (number)
			paramType="object" the column id - column key (string) or index (number)
			paramType="object" The new value
			paramType="bool" if autoCommit is true, it updates the datasource automatically and the transaction is still stored in the accumulated transaction log
			returnType="object". The transaction object that was created
			*/
			/* create transaction */
			var t = this._createCellTransaction(rowId, colId, val);
			this._addTransaction(t);
			/* commit */
			if (autoCommit === true) {
				this.commit(rowId);
			}
			return t;
		},
		updateRow: function (rowId, rowObject, autoCommit) {
			/* updates a record in the datasource. Creates a transaction that can be committed / rolled back
			```
				var ds = new $.%%WidgetName%%({
					schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}],
						searchField: "d"
					},
					responseDataKey: "d",
					responseDataType: "jsonp"
				});
				ds.addRow(0, {
					Name: "CD Player",
					Price: "40",
					Rating: "4"
				}, true);
				ds.addRow(1, {
					Name: "CD Player1",
					Price: "40",
					Rating: "4"
				}, true);
				ds.addRow(2, {
					Name: "CD Player2",
					Price: "40",
					Rating: "4"
				}, true);


				ds.updateRow(1, {
					Name: "DVD Player1",
					Price: "10",
					Rating: "5"
				}, true);
			```
			paramType="object" the record key - primaryKey (string) or index (number)
			paramType="object" the record object containing the key/value pairs we want to update. It doesn't have to include key/value pairs for all fields defined in the schema or in the data source (if no schema is defined)
			paramType="bool" if autoCommit is true, the datasource will be updated automatically and the transaction is still stored in the accumulated transaction log
			returnType="object". The transaction object that was created
			*/
			/* create transaction */
			var t = this._createRowTransaction(rowId, rowObject),
				oldRow = (this.settings.primaryKey === null) ?
				this._data[ parseInt(rowId, 10) ] : this.findRecordByKey(rowId),
				rowIndex = (this.settings.primaryKey === null) ?
				rowId : $.ig.indexInArray(this._data, oldRow);
			this._addTransaction(t);
			/* commit */
			if (autoCommit === true) {
				this.commit(rowId);
			}
			if ($.type(this.settings.rowUpdated) === "function") {
				if (this.settings.callee) {
					this.settings.rowUpdated.apply(this.settings.callee,
						[ { rowIndex: rowIndex, newRow: rowObject, oldRow: oldRow }, this ]);
				} else {
					this.settings.rowUpdated({ rowIndex: rowIndex, newRow: rowObject, oldRow: oldRow }, this);
				}
			}
			return t;
		},
		addRow: function (rowId, rowObject, autoCommit) {
			/* adds a new row to the data source. Creates a transaction that can be committed / rolled back
			```
				var ds;

				var render = function (success, error) {
					if (success) {
					ds.addRow(123, {Name : "CD Player", Price : "40", Rating : "4"}, true);
						var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
						resultHtml = $.ig.tmpl(template, ds.dataView());
						$("#table").html(resultHtml);
					} else {
						alert(error);
					}
				}

				$(window).load(function () {
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [
								{name: "Name"},
								{name: "Price"},
								{name: "Rating"}
							],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp"
					});
					ds.dataBind();

				});
			```
			paramType="object" the record key - primaryKey (string) or index (number)
			paramType="object" the new record data.
			paramType="bool" if autoCommit is true, the datasource will be updated automatically and the transaction is still stored in the accumulated transaction log
			returnType="object". The transaction object that was created
			*/
			var t = this._createNewRowTransaction(rowId, rowObject);
			this._addTransaction(t);
			/* commit */
			if (autoCommit === true) {
				this.commit(rowId);
			}
			if ($.type(this.settings.rowAdded) === "function") {
				if (this.settings.callee) {
					this.settings.rowAdded.apply(this.settings.callee, [ { rowId: rowId, row: rowObject }, this ]);
				} else {
					this.settings.rowAdded({ rowId: rowId, row: rowObject }, this);
				}
			}
			return t;
		},
		/* M.P.: 183193 - The igniteui.d.ts file is not compiling */
		/* jshint unused:false */
		insertRow: function (rowId, rowObject, rowIndex, autoCommit, parentRowId) {
			/* adds a new row to the data source. Creates a transaction that can be committed / rolled back
			```
				var ds;

				var render = function (success, error) {
					if (success) {
						ds.insertRow(123, {
							Name: "CD Player",
							Price: "40",
							Rating: "4"
						}, 1, true);
						var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
						resultHtml = $.ig.tmpl(template, ds.dataView());
						$("#table").html(resultHtml);

					} else {
						alert(error);
					}
				}

				$(window).load(function () {
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp"
					});
				ds.dataBind();

				});
			```
			paramType="object" the record key - primaryKey (string) or index (number)
			paramType="object" the new record data.
			paramType="number" row index at which to insert the new row
			paramType="bool" if autoCommit is true, the datasource will be updated automatically and the transaction is still stored in the accumulated transaction log
			paramType="object" Not used in $.ig.DataSource
			returnType="object". The transaction object that was created
			*/
			var t = this._createInsertRowTransaction(rowId, rowObject, rowIndex);
			this._addTransaction(t);
			/* commit */
			if (autoCommit === true) {
				this.commit(rowId);
			}
			if ($.type(this.settings.rowInserted) === "function") {
				if (this.settings.callee) {
					this.settings.rowInserted.apply(this.settings.callee,
						[ { rowId: rowId, row: rowObject, rowIndex: rowIndex }, this ]);
				} else {
					this.settings.rowInserted({ rowId: rowId, row: rowObject, rowIndex: rowIndex }, this);
				}
			}
			return t;
		},
		/* jshint unused:true */
		deleteRow: function (rowId, autoCommit) {
			/* deletes a row from the data source.
			```
				var ds;

				var render = function (success, error) {
					if (success) {

					ds.deleteRow(0, true);

						var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
						resultHtml = $.ig.tmpl(template, ds.dataView());
						$("#table").html(resultHtml);

					} else {
						alert(error);
					}
				}

				$(window).load(function () {
				var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
				ds = new $.%%WidgetName%%({
					callback: render,
					dataSource: url,
					schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}],
						searchField: "d"
					},
					responseDataKey: "d",
					responseDataType: "jsonp"
					});
					ds.dataBind();

				});
			```
			paramType="object" the record key - primaryKey (string) or index (number)
			paramType="bool" if autoCommit is true, the datasource will be updated automatically and the transaction is still stored in the accumulated transaction log
			returnType="object". The transaction object that was created
			*/
			var t = this._createDeleteRowTransaction(rowId),
				row = (this.settings.primaryKey === null) ?
				this._data[ parseInt(rowId, 10) ] : this.findRecordByKey(rowId),
				rowIndex = (this.settings.primaryKey === null) ?
				rowId : $.ig.indexInArray(this._data, row), isNewRow = false, i, j;
			for (i = 0; this.settings.aggregateTransactions && i < this._transactionLog.length; i++) {
				if (this._transactionLog[ i ].type === "newrow" && this._transactionLog[ i ].rowId === rowId) {
					isNewRow = true;
					/* delete the new row transaction */
					rowId = this._transactionLog[ i ].rowId;
					this._removeTransactionByTransactionId(this._transactionLog[ i ].tid);
					/* sync the global transaction log ! */
					/* A.T. 23 March fix for #105958 */
					for (j = 0; j < this._accumulatedTransactionLog.length; j++) {
						if (this._accumulatedTransactionLog[ j ].rowId === rowId) {
							$.ig.removeFromArray(this._accumulatedTransactionLog, j);
						}
					}
					break;
				}
			}
			/* A.T. 17 Jan 2012 check if we don't have an "add" transaction already */
			if (!(this.settings.aggregateTransactions && isNewRow)) {
				this._addTransaction(t);
				if (autoCommit === true) {
					this.commit(rowId);
				}
				if ($.type(this.settings.rowDeleted) === "function") {
					if (this.settings.callee) {
						this.settings.rowDeleted.apply(this.settings.callee,
							[ { rowId: rowId, row: row, rowIndex: rowIndex }, this ]);
					} else {
						this.settings.rowDeleted({ rowId: rowId, row: row, rowIndex: rowIndex }, this);
					}
				}
			}
			return t;
		},
		/* Transactions for igTree */
		addNode: function (data) {
			/* adds a new node to the tree data source. Creates a transaction that can be committed / rolled back
			paramType="object" the transaction data
			*/
			var t = this._createAddNodeTransaction(data);
			this._addTransaction(t);
		},
		removeNode: function (data) {
			/* removes a node from the tree data source. Creates a transaction that can be committed / rolled back
			paramType="object" the transaction data
			*/
			var t = this._createRemoveNodeTransaction(data);
			this._addTransaction(t);
		},
		/* END Transactions for igTree */
		getDetachedRecord: function (t) {
			/* returns a standalone object (copy) that represents the commited transactions, but detached from the data source
			```
				var ds;

				$(window).load(function () {
					ds = new $.%%WidgetName%%({
						schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}],
						}
					});

					var transactionObject = ds.addRow(123, {
						Name: "CD Player",
						Price: "40",
						Rating: "4"
					}, true);
					var detachedObject = ds.getDetachedRecord(transactionObject);
					});
			```
			paramType="object" a transaction object
			returnType="object" a copy of a record from the data source
			*/
			var o = $.type(this._data[ 0 ]) === "array" ? [] : {}, i, originalRec;

			if (this.settings.primaryKey === null) {
				originalRec = this._data[ parseInt(t.rowId, 10) ];
			} else {
				originalRec = this.findRecordByKey(t.rowId);
			}
			/* o = $.extend(true, {}, originalRec); */
			if ($.type(this._data[ 0 ]) !== "array") {
				for (i in originalRec) {
					if (originalRec.hasOwnProperty(i)) {
						o[ i ] = originalRec[ i ];
					}
				}
			} else {
				for (i = 0; i < originalRec.length; i++) {
					o[ i ] = originalRec[ i ];
				}
			}
			if (t.type === "cell") {
				o[ t.col ] = t.value;
				return o;
			}
			/* merge objects or arrays
			return $.extend(true, {}, o, t.row); */
			if ($.type(o) !== "array") {
				for (i in t.row) {
					if (t.row.hasOwnProperty(i)) {
						o[ i ] = t.row[ i ];
					}
				}
			} else {
				/* if it's array, t.row is expected to have the same number of cells (elements)
				as the original record. It cannot contain partial data only for the updated cells */
				for (i = 0; i < t.row.length; i++) {
					o[ i ] = t.row[ i ];
				}
			}
			return o;
		},
		commit: function (id) {
			/* update the data source with every transaction from the log
			paramType="number" optional="true" Id of the transaction to commit. If no id is specified, will commit all transactions to the data source.
			```
				var ds;

				var render = function (success, error) {
					if (success) {
						ds.addRow(123, {
							Name: "CD Player",
							Price: "40",
							Rating: "4"
						});
						ds.commit();

							var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
							resultHtml = $.ig.tmpl(template, ds.dataView());
							$("#table").html(resultHtml);

					} else {
						alert(error);
					}
				}

				$(window).load(function () {
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp"
					});

					ds.dataBind();
				});
			```
			*/
			/* if "id" is defined, commit only the transaction with the specified id */
			if (id !== null && id !== undefined) {
				this._commitTransactionsByRowId(id);
			} else {
				/* commit all
				always reverse if we call pop. That's because we may have a row editing first, then row deleting,
				if we call pop(), it will delete the row first, and then try to edit it, which is wrong.
				this is much easier and cleaner compared to implementing Queues */
				this._transactionLog.reverse();
				while (this._transactionLog.length > 0) {
					this._commitTransaction(this._transactionLog.pop());
				}
			}
		},
		rollback: function (id) {
			/* clears the transaction log without updating anything in the data source
			paramType="string|number" optional="true" Record Id to find transactions for. If no id is specified, will rollback all transactions to the data source.
			```
				var ds = new $.%%WidgetName%%({
					schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}],
						searchField: "d"
					},
					responseDataKey: "d",
					responseDataType: "jsonp",
					primaryKey: "Name"
				});

				ds.addRow(0, {
					Name: "CD Player",
					Price: "40",
					Rating: "4"
				});
				ds.addRow(1, {
					Name: "CD Player1",
					Price: "40",
					Rating: "4"
				});
				ds.addRow(2, {
					Name: "CD Player2",
					Price: "40",
					Rating: "4"
				});

				ds.rollback();
			```
			*/
			var i, trans;

			if (id !== null && id !== undefined) {
				trans = this._rollbackTransactionsByRowId(id);
			} else {
				/* exclude the current transaction log from the accumulated transaction log.
				rollback all */
				i = this._transactionLog.length;
				while (i-- > 0) {
					this._rollbackTransaction(this._transactionLog[ i ]);
				}
			}
			return trans;
		},
		pendingTransactions: function () {
			/* returns a list of all transaction objects that are pending to be committed or rolled back to the data source
			```
				var ds = new $.%%WidgetName%%({
					schema: {
					fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}],
						searchField: "d"
					},
					responseDataKey: "d",
					responseDataType: "jsonp"
					});

					ds.addRow(123, {
						Name: "CD Player",
						Price: "40",
						Rating: "4"
				});
				var pendingTransactions = ds.pendingTransactions());
			```
			returnType="array"
			*/
			return this._transactionLog;
		},
		allTransactions: function () {
			/* returns a list of all transaction objects that are either pending, or have been committed in the data source.
			```
				var ds;

				var render = function (success, error) {
					if (success) {
						ds.addRow(123, {
							Name: "CD Player",
							Price: "40",
							Rating: "4"
						}, true);
						var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
						resultHtml = $.ig.tmpl(template, ds.dataView());
						console.log(ds.allTransactions());
						$("#table").html(resultHtml);
					} else {
						alert(error);
					}
				}

				$(window).load(function () {
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp"
					});
					ds.dataBind();

				});
			```
			returnType="array"
			*/
			return this._accumulatedTransactionLog;
		},
		_createCellTransaction: function (rowId, colId, val) {
			return {
				type: "cell",
				rowId: rowId,
				tid: this._generateTransactionId(),
				col: colId,
				value: val
			};
		},
		_createRowTransaction: function (rowId, rowObject) {
			return {
				type: "row",
				tid: this._generateTransactionId(),
				row: rowObject,
				rowId: rowId
			};
		},
		_createNewRowTransaction: function (rowId, rowObject) {
			return {
				type: "newrow",
				tid: this._generateTransactionId(),
				row: rowObject,
				rowId: rowId
			};
		},
		_createInsertRowTransaction: function (rowId, rowObject, rowIndex) {
			return {
				type: "insertrow",
				tid: this._generateTransactionId(),
				row: rowObject,
				rowId: rowId,
				rowIndex: rowIndex
			};
		},
		_createDeleteRowTransaction: function (rowId) {
			return {
				type: "deleterow",
				tid: this._generateTransactionId(),
				rowId: rowId
			};
		},
		/* Transactions for igTree */
		_createAddNodeTransaction: function (data) {
			return {
				type: "addnode",
				tid: this._generateTransactionId(),
				tdata: data
			};
		},
		_createRemoveNodeTransaction: function (data) {
			return {
				type: "removenode",
				tid: this._generateTransactionId(),
				tdata: data
			};
		},
		/* END Transactions for igTree */
		_addTransaction: function (t) {
			var exists = false, i = 0, prop, globalt, j, dirty = true, k,
				shouldAggregateTransactions = this.settings.autoCommit === false &&
					this.settings.aggregateTransactions === true,
				isSameAsOrigValue = false,
				rec = shouldAggregateTransactions ? this.findRecordByKey(t.rowId) : null;
			if (t.type === "cell") {
				// check if we don't have an existing transaction and if we do, overwrite it
				for (i = 0; i < this._transactionLog.length; i++) {
					if (this._transactionLog[ i ].rowId === t.rowId && this._transactionLog[ i ].col === t.col) {
						exists = true;
						/* add extra check to see if the "new" value isn't the same as the
						original one, in that case remove the existing transaction */
						if (shouldAggregateTransactions) {
							/* we need to find the data source row corresponding to rowId */
							if (rec && rec[ t.col ] === t.value) {
								for (k = 0; k < this._accumulatedTransactionLog.length; k++) {
									if (this._accumulatedTransactionLog[ k ].rowId === this._transactionLog[ i ].rowId) {
										$.ig.removeFromArray(this._accumulatedTransactionLog, k);
									}
								}
								/* remove the transaction because the last entered value is the same as the first one */
								this._removeTransactionByTransactionId(this._transactionLog[ i ].tid);
								dirty = false;
							}
						}
						if (dirty) {
							this._transactionLog[ i ].value = t.value;
							this._syncGlobalTransaction(this._transactionLog[ i ]);
						}
					}
					if (shouldAggregateTransactions && rec && rec[ t.col ] === t.value) {
						isSameAsOrigValue = true;
					}
				}
				/* ensure we check the newly added rows as well */
				for (j = 0; j < this._transactionLog.length; j++) {
					if (this._transactionLog[ j ].type === "newrow" &&
						this._transactionLog[ j ].rowId === t.rowId) {
						/* copy the t.row into newrow's row */
						if (t.type === "row") {
							this._transactionLog[ j ].value = t.value;
						} else {
							this._transactionLog[ j ].row[ t.col ] = t.value;
						}
						this._syncGlobalTransaction(this._transactionLog[ j ]);
						/* don't add "t" */
						return;
					}
				}
			} else if (t.type === "row") {
				for (i = 0; i < this._transactionLog.length; i++) {
					if (this._transactionLog[ i ].rowId === t.rowId && this._transactionLog[ i ].type !== "cell") {
						exists = true;
						if (shouldAggregateTransactions) {
							dirty = false;
							/* now verify all values in the row correspond to the original ones */
							for (prop in t.row) {
								if (rec && t.row.hasOwnProperty(prop) && t.row[ prop ] !== rec[ prop ]) {
									dirty = true;
									break;
								}
							}
						/* ensure we check the newly added rows as well */
						for (j = 0, !dirty; j < this._transactionLog.length; j++) {
							if (this._transactionLog[ j ].type === "newrow" &&
								this._transactionLog[ j ].rowId === t.rowId) {
								/* copy the t.row into newrow's row */
								this._transactionLog[ j ].row = t.row;
								/* we need to find and sync the global transaction */
								this._syncGlobalTransaction(this._transactionLog[ j ]);
								/* don't add "t" */
								return;
							}
						}
					}
						if (dirty) {
							this._transactionLog[ i ].row = t.row;
							this._syncGlobalTransaction(this._transactionLog[ i ]);
						} else {
							/* remove the transaction because the last entered value is the same as the first one */
							for (k = 0; k < this._accumulatedTransactionLog.length; k++) {
								if (this._accumulatedTransactionLog[ k ].rowId === this._transactionLog[ i ].rowId) {
									$.ig.removeFromArray(this._accumulatedTransactionLog, k);
								}
							}
							this._removeTransactionByTransactionId(this._transactionLog[ i ].tid);
						}
					}
				}
				if (shouldAggregateTransactions) {
					for (prop in t.row) {
						isSameAsOrigValue = true;
						if (!(t.row.hasOwnProperty(prop) && rec && t.row[ prop ] === rec[ prop ])) {
							isSameAsOrigValue = false;
							break;
						}
					}
				}
			} else if (t.type === "addnode" || t.type === "removenode") {
				/* K.D. November 11th, 2013 Bug #155067 A deep copy of the object here throws
				call stack exceeded with recursive objects, so moving the transaction push here and exiting. */
				/* K.D. June 24th, 2014 Bug #174207 The accumulated transaction log also needs to be updated. */
				this._transactionLog.push(t);
				this._accumulatedTransactionLog.push(t);
				return;
			}
			if (!exists && !isSameAsOrigValue) {
				this._transactionLog.push(t);
				/* A.T. 27 Sept. we need this change only for the global transaction log,
				since it's the one that will go to the server for the local transaction log,
				we need to keep the Date "as is", because it won't get serialized/deserialized */
				globalt = $.extend(true, {}, t);
				/* Date fix. We need to encode it using \/Date(ticks)\/ */
				if (globalt.type === "cell" && $.type(globalt.value) === "date") {
					globalt.value = "\/Date(" + globalt.value.getTime() + ")\/";
				} else if (globalt.type === "row" ||
					globalt.type === "insertrow" ||
					globalt.type === "newrow" ||
					globalt.type === "insertnode") {
					for (prop in globalt.row) {
						if (globalt.row.hasOwnProperty(prop) && $.type(globalt.row[ prop ]) === "date") {
							globalt.row[ prop ] = "\/Date(" + globalt.row[ prop ].getTime() + ")\/";
						}
					}
				}
				this._accumulatedTransactionLog.push(globalt);
			}
		},
		_syncGlobalTransaction: function (t) {
			var i, prop;
			if (!t) {
				return;
			}
			if (t.type === "cell") {
				for (i = 0; i < this._accumulatedTransactionLog.length; i++) {
					if (this._accumulatedTransactionLog[ i ].rowId === t.rowId &&
						this._accumulatedTransactionLog[ i ].col === t.col) {
						if ($.type(t.value) === "date") {
							this._accumulatedTransactionLog[ i ].value = "\/Date(" + t.value.getTime() + ")\/";
						} else {
							this._accumulatedTransactionLog[ i ].value = t.value;
						}
						break;
					}
				}
			} else if (t.type === "row" || t.type === "insertrow" || t.type === "newrow") {
				for (i = 0; i < this._accumulatedTransactionLog.length; i++) {
					if (this._accumulatedTransactionLog[ i ].rowId === t.rowId &&
						this._accumulatedTransactionLog[ i ].type !== "cell") {
						for (prop in t.row) {
							if (t.row.hasOwnProperty(prop)) {
								if ($.type(t.row[ prop ]) === "date") {
									this._accumulatedTransactionLog[ i ].row[ prop ] =
										"\/Date(" + t.row[ prop ].getTime() + ")\/";
								} else {
									this._accumulatedTransactionLog[ i ].row[ prop ] = t.row[ prop ];
								}
							}
						}
					}
				}
			}
		},
		_removeTransactionByTransactionId: function (tid, removeFromAll) {
			// removes a transaction by a transaction ID
			var i;
			for (i = 0; i < this._transactionLog.length; i++) {
				if (this._transactionLog[ i ].tid === tid) {
					//A.T. 8 March 2012 - Fix for bug #104244
					//this._transactionLog.remove(i);
					$.ig.removeFromArray(this._transactionLog, i);
					break;
				}
			}
			if (removeFromAll === true) {
				for (i = 0; i < this._accumulatedTransactionLog.length; i++) {
					if (this._accumulatedTransactionLog[ i ].tid === tid) {
						//A.T. 8 March 2012 - Fix for bug #104244
						//this._accumulatedTransactionLog.remove(i);
						$.ig.removeFromArray(this._accumulatedTransactionLog, i);
						break;
					}
				}
			}
		},
		_removeTransactionsByRecordId: function (id) {
			// removes all transactions matching a specific row id (index or primary key)
			var i;
			for (i = 0; i < this._transactionLog.length; i++) {
				if (this._transactionLog[ i ].rowId === id) {
					//A.T. 8 March 2012 - Fix for bug #104244
					//this._transactionLog.remove(i);
					$.ig.removeFromArray(this._transactionLog, i);
					break;
				}
			}
		},
		_addRow: function (row, index, origDs) {
			var data, key, i, count = 0, schema = this.settings.schema,
				layouts = schema ? schema.layouts : null, lo, pdata,
				all = [ this._data ], newRow, collectionProcessedData = [];
			this._addOnlyUniqueToCollection(all, this._dataView);
			this._addOnlyUniqueToCollection(all, origDs);
			/* M.H. 15 Dec 2014 Fix for bug #186504: Added row is not displayed whether
			it's filtered in or out if paging is enabled. When we add row and there is
			applied filtering and enabled (local)paging then we should add the new row
			in filteredData so it could be shown in dataView because when pageIndex is
			called the dataView is populated from _filteredData not from _data in this case */
			if (this._filter && this._filteredData &&
				this.settings.paging.enabled && this.settings.paging.type === "local") {
				this._addOnlyUniqueToCollection(all, this._filteredData);
			}
			if (this._vgbData && this.isGroupByApplied(this.settings.sorting.expressions)) {
				this._addOnlyUniqueToCollection(all, this._vgbData);
			}
			if (layouts) {
				/* we'll try to include empty collections for the child layouts to keep the data source consistent */
				for (key in layouts) {
					if (layouts.hasOwnProperty(key)) {
						/* filter out layouts with depth relative to the current one > 1 */
						if ((key.match(/\//g) || []).length !== 1) {
							continue;
						}
						if (layouts[ key ].key && !row.hasOwnProperty(layouts[ key ].key)) {
							if (layouts[ key ].responseDataKey) {
								lo = {};
								lo[ layouts[ key ].responseDataKey ] = [];
							} else {
								lo = [];
							}
							row[ layouts[ key ].key ] = lo;
						}
					}
				}
			}
			while (count < all.length) {
				data = all[ count++ ];
				if (this._preprocessAddRow) {
					// function for pre processing addRow - used to return current data for which new row should be added
					// e.g. in TreeHierarchicalDataSource when argument at(of function _addRow) is set then function returns child data for record with key equals to 'at'
					pdata = this._preprocessAddRow.apply(this,
						Array.prototype.slice.call(arguments).concat([ data ]));
					data = (pdata || {}).layoutData;// if data should not be processed by the code return null/undefined for layoutData
					/* M.H. 15 Nov 2016 Fix for bug 228594: After updating a record in the igTreeGrid paging no longer works as expected. */
					/* duplicate record is added when child row is added*/
					if (data) {
						for (i = 0; i < collectionProcessedData.length; i++) {
							if (collectionProcessedData[ i ] === data) {
								data = null;//skip adding a record in data collection
								break;
							}
						}
						if (data) {
							collectionProcessedData.push(data);
						}
					}
				}
				if (data) {
					// M.H. 17 June 2014 Fix for bug #171306: The ig_pk property is missing from the added row object.
					newRow = row;
					if (data !== origDs && $.type(row) === "object") {
						newRow = $.extend(true, {}, row);
					}
					if (index >= 0 && index < data.length) {
						data.splice(index, 0, newRow);
					} else {
						data.push(newRow);
					}
					if (this._postprocessAddRow && pdata) {
						pdata.newData = data;
						/* in case of TreeHierarchicalDataSource -
						_postprocessAddRow is used to update parentRow child data */
						this._postprocessAddRow.apply(this, Array.prototype.slice.call(arguments).concat(pdata));
						data = pdata.cashedData;// get original layout data - used for check data === all[count]
					}
				}
			}
		},
		_updateRecOnCommit: function (t, records) {
			// update record or record cell on commit transaction(when _commitTransaction is called)
			// t - transaction
			// records - array of data records(dataRecord, original data record, etc.)
			var i, j, rec, prop;
			if (t.type === "cell") {
				for (j = 0; j < records.length; j++) {
					rec = records[ j ];
					if (rec) {
						rec[ t.col ] = t.value;
					}
				}
			} else if (t.type === "row") {
				if ($.type(t.row) === "array") {
					for (j = 0; j < records.length; j++) {
						rec = records[ j ];
						if (rec) {
							for (i = 0; i < t.row.length; i++) {
								rec[ i ] = t.row[ i ];
							}
						}
					}
				} else {
					for (j = 0; j < records.length; j++) {
						rec = records[ j ];
						if (rec) {
							for (prop in t.row) {
								if (t.row.hasOwnProperty(prop)) {
									rec[ prop ] = t.row[ prop ];
								}
							}
						}
					}
				}
			}
		},
		_commitTransaction: function (t) {
			// commit, then remove from the transaction log
			var rec, origRec, origDs = this.settings.localSchemaTransform ? this._origDs : null;
			if (origDs === this._data) {
				origDs = null;
			}
			if (this.settings.primaryKey === null) {
				rec = this._data[ parseInt(t.rowId, 10) ];
				if (origDs) {
					origRec = origDs[ parseInt(t.rowId, 10) ];
				}
			} else {
				rec = this.findRecordByKey(t.rowId);
				if (origDs) {
					origRec = this.findRecordByKey(t.rowId, origDs);
				}
			}

			if (t.type === "cell" || t.type === "row") {
				this._updateRecOnCommit(t, [ rec, origRec ]);
			} else if (t.type === "deleterow") {
				if (this.settings.primaryKey === null) {
					this.removeRecordByIndex(parseInt(t.rowId, 10), origDs);
				} else {
					this.removeRecordByKey(t.rowId, origDs);
				}
				if (this.isGroupByApplied(this.settings.sorting.expressions)) {
					this._generateGroupByData(this._filter ? this._filteredData :
																this._data,
											this.settings.sorting.expressions);
				}
			} else if (t.type === "newrow") {
				this._addRow(t.row, -1, origDs);
			} else if (t.type === "insertrow") {
				this._addRow(t.row, t.rowIndex, origDs);
			}
			/* finally remove from the log, since the transaction is already committed and shouldn't be pending */
			this._removeTransactionByTransactionId(t.tid);
		},
		_rollbackTransaction: function (t) {
			this._removeTransactionByTransactionId(t.tid, true);
		},
		_commitTransactionsByRowId: function (id) {
			var i;

			for (i = 0; i < this._transactionLog.length; i++) {
				if (this._transactionLog[ i ].rowId === id) {
					this._commitTransaction(this._transactionLog[ i ]);
				}
			}
		},
		_rollbackTransactionsByRowId: function (id) {
			var i, trans = [];

			i = this._transactionLog.length;
			while (i-- > 0) {
				if (this._transactionLog[ i ].rowId === id) {
					trans.push(this._transactionLog[ i ]);
					this._rollbackTransaction(this._transactionLog[ i ]);
				}
			}
			return trans;
		},
		_addOnlyUniqueToCollection: function (collection, item) {
			var i;
			for (i = 0; i < collection.length; i++) {
				if (collection[ i ] === item) {
					return;
				}
			}
			collection.push(item);
		},
		transactionsAsString: function () {
			/* returns the accumulated transaction log as a string. The purpose of this is to be passed to URLs or used conveniently
			```
			var ds = new $.%%WidgetName%%({
				schema: {
					fields: [{
						name: "Name"
					}, {
						name: "Price"
					}, {
						name: "Rating"
					}],
					searchField: "d"
				},
				responseDataKey: "d",
				responseDataType: "jsonp"
			});
			ds.addRow(123, {
			Name: "CD Player",
			Price: "40",
			Rating: "4"
			});
			var transactionsAsString = ds.transactionsAsString();
			```
			returnType="string"
			*/
			return JSON.stringify(this._accumulatedTransactionLog);
		},
		_generateTransactionId: function () {
			return ((1 + Math.random()) * parseInt("10000", 16)).toString(16).substring(1, 5);
		},
		_lookupPkIndex: function () {
			var i;
			if (this._pkIndex !== undefined) {
				return this._pkIndex;
			}
			if (typeof this.settings.primaryKey === "string") {
				if (this.schema() && this.schema().fields() && this.schema().fields().length > 0) {
					for (i = 0; i < this.schema().fields().length ; i++) {
						if (this.schema().fields()[ i ].name === this.settings.primaryKey) {
							this._pkIndex = i;
							return i;
						}
					}
				}
			}
			this._pkIndex = this.settings.primaryKey;
			return this.settings.primaryKey;
		},
		saveChanges: function (success, error) {
			/* posts to the settings.updateUrl using $.ajax, by serializing the changes as url params
			```
				var ds = new $.%%WidgetName%%({
					schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}]
					},
					updateUrl: "http://example.com/myUpdateUrl/"
				});

				ds.addRow(0, {
					Name: "CD Player",
					Price: "40",
					Rating: "4"
				}, true);
				ds.addRow(1, {
					Name: "CD Player1",
					Price: "40",
					Rating: "4"
				}, true);
				ds.addRow(2, {
					Name: "CD Player2",
					Price: "40",
					Rating: "4"
				}, true);

				// Option 1: Save changes without callbacks
				ds.saveChanges();

				// Option 2: Save changes with success and error callbacks
				ds.saveChanges(function (data) {
					$("#message").text("Changes were saved successfully").fadeIn(3000).fadeOut(5000);
				},
				function(jqXHR, textStatus, errorThrown) {
					$("#message").text("An error occurred while saving the changes. Error details: " + textStatus).fadeIn(3000).fadeOut(5000);
				});
			```
			paramType="function" Specifies a custom function to be called when AJAX request to the updateUrl option succeeds(optional)
			paramType="function" Specifies a custom function to be called when AJAX request to the updateUrl option fails(optional)
			*/
			if (this.settings.updateUrl !== null) {
				// post to the Url using $.ajax, by serializing the changes as url params
				var me = this, opts;

				opts = {
					type: "POST",
					url: this.settings.updateUrl,
					data: { "ig_transactions": JSON.stringify(this._accumulatedTransactionLog) },
					success: function (data, textStatus, jqXHR) {
						if (data.Success) {
							me._saveChangesSuccess(data, textStatus, jqXHR);
							if (success) {
								success(data, textStatus, jqXHR);
							}
						} else {
							me._saveChangesError(jqXHR, textStatus, $.ig.DataSourceLocale.locale.noSaveChanges);
							if (error) {
								error(jqXHR, textStatus, $.ig.DataSourceLocale.locale.noSaveChanges);
							}
						}
					},
					error: function (jqXHR, textStatus, errorThrown) {
						me._saveChangesError(jqXHR, textStatus, errorThrown);
						if (error) {
							error(jqXHR, textStatus, errorThrown);
						}
					}
				};
				this._ajaxRequest = $.ajax(opts);
				/*
				$.post(this.settings.updateUrl, { 'ig_transactions': JSON.stringify(this._accumulatedTransactionLog) },
					function (data, textStatus, jqXHR) {
						me._saveChangesSuccess(data, textStatus, jqXHR);
				});
				*/
			}
		},
		_saveChangesSuccess: function (data, textStatus, jqXHR) {
			var schs, sche, i;
			if (data.Success) {
				this.commit();
				this._transactionLog = [];
				this._accumulatedTransactionLog = [];
				schs = this._saveChangesHandlers;
				i = schs ? schs.length : 0;
				while (i-- > 0) {
					schs[ i ](data, textStatus, jqXHR);
				}
			} else {
				sche = this._saveChangesErrorHandlers;
				i = sche ? sche.length : 0;
				while (i-- > 0) {
					sche[ i ](jqXHR, textStatus, $.ig.DataSourceLocale.locale.noSaveChanges);
				}
			}
		},
		_saveChangesError: function (jqXHR, textStatus, errorThrown) {
			var sche = this._saveChangesErrorHandlers, i = sche ? sche.length : 0;
			while (i-- > 0) {
				sche[ i ](jqXHR, textStatus, errorThrown);
			}
		},
		_addChangesSuccessHandler: function (functionDelegate) {
			if (this._saveChangesHandlers === undefined) {
				this._saveChangesHandlers = [];
			}
			this._saveChangesHandlers[ this._saveChangesHandlers.length ] = functionDelegate;
		},
		_removeChangesSuccessHandler: function (functionDelegate) {
			if (this._saveChangesHandlers !== undefined) {
				var index = $.ig.indexInArray(this._saveChangesHandlers, functionDelegate);
				if (index > -1) {
					this._saveChangesHandlers = this._saveChangesHandlers.slice(0, index)
						.concat(this._saveChangesHandlers.slice(index + 1, this._saveChangesHandlers.length));
				}
			}
		},
		_addChangesErrorHandler: function (functionDelegate) {
			if (this._saveChangesErrorHandlers === undefined) {
				this._saveChangesErrorHandlers = [];
			}
			this._saveChangesErrorHandlers[ this._saveChangesErrorHandlers.length ] = functionDelegate;
		},
		_removeChangesErrorHandler: function (functionDelegate) {
			if (this._saveChangesErrorHandlers !== undefined) {
				var index = $.ig.indexInArray(this._saveChangesErrorHandlers, functionDelegate);
				if (index > -1) {
					this._saveChangesErrorHandlers = this._saveChangesErrorHandlers.slice(0, index)
						.concat(this._saveChangesErrorHandlers
						.slice(index + 1, this._saveChangesErrorHandlers.length));
				}
			}
		},
		/* callback is the function to call when databinding is async (remote)
		callee is the object on which to call the callback function */
		dataBind: function (callback, callee) {
			/* data binds to the current data source
			databinding works using the following workflow:
			1. fire the databinding event
			2. based on the data source type (see analyzeDataSource()), do the following:
			3. if type is HtmlTable, parse the table and set the data and dataView respectively.
			if the type is Function, call it, apply Paging/Filtering/Sorting, and set this._dataView . If the developer wants to do his own paging, filtering or sorting
			in that case, then he should handle the PageIndexChanging and/or DataFiltering, and/or ColumnSorting client-side events, and cancel them.
			if no paging/sorting/filtering are enabled, use just this._data to save space
			if the data source is of type RemoteUrl, use jQuery's $.ajax API to trigger a remote request to the service. Use the param() API to encode the URL
			if the data source is invalid, throw an exception
			if the analyzed runtime data source type , that is, the result of analyzeDataSource(), is Unknown, check if
			the value of settings.type is set to XML or JSON. If string, eval for JSON, and parse for the XML to build the object tree
			4. now normalize/transform the data, if a schema is supplied. This inplies any additional data type  conversion
			5. next, if OpType is Local, apply paging, sorting, and/or filtering to the data, and store the result in this._dataView
			6. fire the databound event

			```
				var jsonSchema = new $.ig.DataSchema("json", {fields:[
					{name: "ProductID", type: "number"},
					{name: "Name", type: "string"},
					{name: "ProductNumber", type: "string"},
					{name: "Color", type: "string"},
					{name: "StandardCost", type: "string"}],
					searchField:"Records" });

				ds = new $.%%WidgetName%%({type: "json", dataSource: jsonData, schema: jsonSchema});
				ds.dataBind();
			```

			paramType="string" optional="true" callback function
			paramType="object" optional="true" callee object on which the callback will be executed. If none is specified, will assume global execution context
			*/
			/* think about when would this._data be different than null at all? in which scenarios ? */
			var table, tableObj, dsObj, ds, s, p = this.settings, args,
				resKey, noCancel = true, callDataBound = true, f, fApplied;
			this._transactionLog = [];
			this._accumulatedTransactionLog = [];

			if (!callback) {
				callback = p.callback;
			}

			/* fire the data binding event */
			args = { cancel: false };

			if ($.isFunction(p.dataBinding)) {
				noCancel = p.dataBinding(this, args);
				if (noCancel === undefined) {
					noCancel = true;
				}
			}
			/* A.T. 18 Jan 2011 - Fix for bug #61623 - igDataSource dataBinding handler cannot cancel data binding */
			/* if (!args.cancel) { */
			if (noCancel) {
				if (this.settings.type === "unknown" &&
					(this._runtimeType === null || this._runtimeType === undefined)) {
					this._runtimeType = this.analyzeDataSource();
				} else if (this._runtimeType === "json") {// if datasource is indeed url
					// M.H. 9 Oct 2013 Fix for bug #139006: dataSourceType should be set explicitly when invoke dataBind with remote operations
					ds = this.dataSource();
					if ($.type(ds) === "string") { //string or object
						ds = $.trim(ds);
						/* N.A. 02/10/2014 Bug #162293 Add support for https requests. */
						if (ds.startsWith("/") || ds.startsWith("http://") || ds.startsWith("https://")) {
							this._runtimeType = "remoteUrl";
						}
					}
				} /*else if (this.type !== $.ig.Constants.DataSourceType.Unknown) {
					this._runtimeType = this.settings.type;
				} */
				switch (this._runtimeType) {
					case "function":
						/* determine context and pass parameters */
						this._data = p.dataSource(); // this.dataSource is a function
						if (this.schema() && this.settings.localSchemaTransform) {
							this._data = this.schema().transform(this._data); // Q: do we store the normalized data in this._data, or in this._dataView ?
						}
						break;
					case "array":
						if (this.schema() && this.settings.localSchemaTransform) {
							this._data = this.schema().transform(this.dataSource());
							if (this.dataSource().Metadata) {
								this._metadata = this.dataSource().Metadata;
								/* M.H. 18 Feb 2013 Fix for bug #133286: When the HGrid is bound to remote data,
								remote summaries are enabled and loadOnDemand is FALSE the summaries for child layouts are not rendered. */
								this.summariesResponse(this.settings.summaries.summariesResponseKey, this.dataSource());
							}
							this._origDs = this.dataSource();
						} else {
							this._data = this.dataSource(); // no schema
						}
						break;
					case "htmlTableDom":
					case "htmlTableId":
					case "htmlTableString":
						/* A.T. 10 April Fix for bug #108547 - we shouldn't
						re-analyze the HTML table and rebind more than once. */
						if (this._tableBound) {
							break;
						}
						/* A.T. 18 Jan 2011 - Fix for bug #62123 -
						igDataSource HTMLTableString binding problem */
						this._runtimeType = this.analyzeDataSource();
						if (this._runtimeType === "htmlTableId") {
							tableObj = $("#" + this.dataSource());
							table = this._validateTable(tableObj);
						} else if (this._runtimeType === "htmlTableString") {
							/* the analyzeDataSource() call has already done most of
							the work to parse the string and attach to the DOM for us */
							tableObj = $("#" + this.settings.id + " > table");
							table = this._validateTable(tableObj);
						} else {
							table = this.dataSource();
						}
						if (this.schema() && this.settings.localSchemaTransform) {
							this._data = this.schema().transform(table);
						} else {
							this._data = this.tableToObject(table); // no schema
						}
						this._tableBound = true;
						break;
					case "htmlListDom":
						this._data = this.schema().transform(this.dataSource());
						break;
					case "htmlSelectDom":
						this._data = this.schema().transform(this.dataSource());
						break;
					case "invalid":
						throw new Error($.ig.DataSourceLocale.locale.invalidDataSource);
					case "unknown":
					case "json":
					case "xml":
						if (this.settings.type !== "json" && p.type !== "xml") {
							/* throw new Error("Cannot determine the data source type. Please specify if it is JSON or XML data. "); */
							throw new Error($.ig.DataSourceLocale.locale.unknownDataSource);
						} else {
							resKey = this.settings.responseDataKey;
							/* there are two cases:
							1. string which is either JSON objects or XML string
							2. object - already parsed, or XML document element */
							if ($.type(this.dataSource()) === "string") {
								if (p.type === "json") {
									dsObj = this.stringToJSONObject(this.dataSource());
								} else {
									dsObj = this.stringToXmlObject(this.dataSource());
								}
							} else {
								dsObj = this.dataSource();
							}
							/* now check if there is schema defined */
							if (this.schema() && this.settings.localSchemaTransform === true) {
								this._data = this.schema().transform(dsObj);
								/* reference to the original data source */
								if (resKey !== null && resKey !== undefined) {
									this._origDs = $.ig.findPath(dsObj, resKey);
								} else {
									this._origDs = dsObj;
								}
							} else if ((!this.schema() || this.settings.localSchemaTransform === false) &&
								p.type === "json") {
								if (resKey !== null && resKey !== undefined) {
									this._data = this._origDs = $.ig.findPath(dsObj, resKey);
								} else {
									this._data = dsObj;
								}
								/* reference to the original data source */
								this._origDs = dsObj;
							} else if (!this.schema() && p.type === "xml") {
								/* XML: we have an XML document but have no schema associated to it
								for future: think about automating this a bit, i.e. even if there is no schema defined, assume a predefined structure and fallback to it
								when a control like the client grid is bound to the data source, the column definitions automatically translate to a data schema !
								in fact when the igGrid is bound to the igDataSource, and there is no explicit schema defined, we can assume a predefined schema, something like:
								<row> <cell></cell> ... </row> and so on. The initial schema comes from the column definitions, and 1) => if we cannot find the XPath, fallback
								to the default schema, or 2) => if no columns are defined, assume the default xml schema again. */
								throw new Error($.ig.DataSourceLocale.locale.errorXmlSourceWithoutSchema);
							}
							/* make sure to read the responseTotalRecCountKey no matter if localSchemaTransform = true or false */
							this.totalRecordsCount(null, this.settings.responseTotalRecCountKey, dsObj, this);
							/* N.A. 2/2/2015 Bug #187602 When there are cascading data sources
							and filtering in the combo, dsObj can be null when clearing parent value. */
							if (dsObj && dsObj.Metadata) {
								this._metadata = dsObj.Metadata;
							}

							this.summariesResponse(this.settings.summaries.summariesResponseKey, dsObj);
						}
						break;
					case "remoteUrl":
						/* M.H. 18 Aug 2014 Fix for bug #177147: The dataBound event is called before the JSON file is returned */
						callDataBound = false;
						/* when the response arrives, we still need to additionally analyze it and apply schema, if it is present
						Note that the schema may have already been applied directly on the server-side
						1. encode the parameters for sorting, paging and filtering */
						this._remoteData(callback, callee);
						break;
					case "empty":
						this._data = [];
						this._dataView = [];
						this._dataSummaries = [];
						break;
					default:
						break;
				}
				/* describe the algorithm when dataView should be the same as data and when not */
				this._dataView = this._data;
				this._filter = false;
				/* M.H. 19 Jul 2013 Fix for bug #147233: cannot set default filtering expressions in
								ig.DataSource (they aren't taken into account , similar to sorting default expressions)
								add defaultFields to filtering similar to sorting */
				f = p.filtering;
				s = p.sorting;
				fApplied = false;
				if (f.type === "local" && this._runtimeType !== "remoteUrl" && f.defaultFields.length > 0) {
					this.filter(f.defaultFields);
					fApplied = true;
				}
				/* apply initial sorting only if sorting is NOT applied by filtering*/
				/* A.T. fix for igGridSorting local sorting */
				if (s.type === "local" && this._runtimeType !== "remoteUrl" && s.defaultFields.length > 0 &&
					(!fApplied || s.defaultFields !== s.expressions) ) {
					this.sort(s.defaultFields, s.defaultDirection);
				}
				/* M.H. 26 Aug 2016 Fix for bug 224258: Remote groupBy does not work in HierarchicalGrid */
				if (!this._gbDataView && this.isGroupByApplied(this.settings.sorting.expressions)) {
					this._generateGroupByData(this._filter ? this._filteredData :
																this._data,
											this.settings.sorting.expressions);
				}
				/* Check if paging is configured, and if so,
				if OpType === $.ig.Constants.OpType.Local => apply local paging */
				if (p.paging.enabled && p.paging.type === "local" && this._runtimeType !== "remoteUrl") {
					this._page();
					/* this is necessary */
				}
				/* M.H. 13 Mar 2014 Fix for bug #166978: Summaries are calculated for the
				entire data source after persisting filtering with data bind */
				if (!this._filter || !this._transformedData) {
					this._populateTransformedData();
				}
				/* invoke the callback if present: */
				if (this._runtimeType !== "remoteUrl") {
					this._invokeCallback(callee, callback);
				}
				/* fire the data bound event
				M.H. 18 Aug 2014 Fix for bug #177147: The dataBound event is called before the JSON file is returned */
				this._internalDataBound(!args.cancel && callDataBound);
			}
			return this;
		},
		getCellValue: function (fieldName, record) {
			/* gets a cell value from the record by the specified fieldName. If there's a mapper defined for the field, the resolved by the mapper value will be returned.
			```
				ds = new $.%%WidgetName%%({
					dataSource: products,
					primaryKey: "ProductID"
				});

				ds.dataBind();
				//Get
				var value = ds.getCellValue("Name", {ProductID: 1, Name: "Adjustable Race", ProductNumber: "AR-5381"});
			```
			paramType="string" the fieldName - name of the field
			paramType="object" the record from which to get it
			returnType="object". The cell's value
			*/
			var field, result;
			if (!this._hasMapper ||
				!this._fields ||
				this._fields[ fieldName ] === undefined ||
				this._fields[ fieldName ].type !== "object" ||
				/* P.Zh. 26 Feb 2016 Fix for bug #214717: Error when adding child row
				and there is a mapper function in the columns definition */
				!record[ fieldName ]) {
				return record[ fieldName ];
			}
			field = this._fields[ fieldName ];
			if (field && typeof (field.mapper) === "function") {
				result = field.mapper(record);
			} else {
				result = record[ fieldName ];
			}
			return result;
		},
		_getFieldTypeFromSchema: function (fieldName) {
			var field = this._fields[ fieldName ], type, ds = this.dataSource();

			if (!field) {
				return undefined;
			}

			if (this.type() === "remoteUrl") {
				ds = this.data();
			} else if (this.type() === "json" && ds !== null &&
				ds !== undefined && this.settings.responseDataKey !== null) {
				ds = $.ig.findPath(ds, this.settings.responseDataKey);
			}
			if (typeof (field.mapper) === "function" &&
				$.type(ds) === "array" && ds.length > 0) {
				type = $.type(field.mapper(ds[ 0 ]));
			} else {
				type = field.type;
			}
			return type;
		},
		_internalDataBound: function (callDatabound) {
			// M.H. 18 Aug 2014 Fix for bug #177147: The dataBound event is called before the JSON file is returned
			if (callDatabound && $.isFunction(this.settings.dataBound)) {
				this.settings.dataBound(this);
			}
		},
		summariesResponse: function (key, dsObj) {
			/* Applicable only when the data source is bound to remote data.
			Gets or sets summaries data.
			If key or dsObj are not set then returns summaries data.
			Takes summary data from passed argument dsObj(using argument key)
			```
				var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
				var ds = new $.%%WidgetName%%({
					callback: render,
					dataSource: url,
					schema: {
						fields: [{
							name: "Name"
						}, {
							name: "Price"
						}, {
							name: "Rating"
						}],
						searchField: "d"
					},
					responseDataKey: "d",
					responseDataType: "jsonp"
				});

				var mySummariesSettings = {
					type: "remote",
					columnSettings: [{
						columnKey: "Price",
						allowSummaries: false,
						summaryOperands: [{
							type: "count",
							active: true,
							order: 0
						}]
					}],
					summariesResponseKey: "d"
				};

				// Set
				ds.summariesSettings(mySummariesSettings);

				// Get
				var summariesSettings = ds.summariesSettings();
			```
			paramType="string" optional="true" response key to take summary data(for example "Metadata.Summaries")
			paramType="object" optional="true" data source object - usually contains information about data records and metadata(holds info about summaries)
			returnType="object" object of data summaries - e.g.: if datasource has 2 columns - ID and Name then expected format for data summaries is {ID : {max: 1, min: 0, count: 2}, Name: {count: 1}}
			*/
			if (!dsObj || !key) {
				this._dataSummaries = this._dataSummaries || [];
				return this.dataSummaries();
			}
			var rec, resPath, i, schema, func, offsets, offset, obj;
			if (key.length > 0) {
				rec = dsObj;
				resPath = key.split(".");

				for (i = 0; i < resPath.length; i++) {
					/* M.H. 18 Feb 2013 Fix for bug #133286: When the HGrid is bound to remote data,
					remote summaries are enabled and loadOnDemand is FALSE the summaries for child layouts are not rendered. */
					if (rec === null || rec === undefined) {
						break;
					}
					rec = rec[ resPath[ i ] ];
				}
				this._dataSummaries = rec;
			} else {
				this._dataSummaries = dsObj;
			}
			this._dataSummaries = this._dataSummaries || [];
			/* M.H. 10 Jan 2014 Fix for bug #160204: Remote Summaries display
			dates which differ from the ones displayed in the grid */
			if (this.settings.localSchemaTransform === true && this.schema() &&
				dsObj && dsObj.Metadata && dsObj.Metadata.timezoneOffsetsSummaries) {
				offsets = dsObj.Metadata.timezoneOffsetsSummaries;
				this._dataSummaries._serverOffsetsSummaries = offsets;
				/* transform dates */
				schema = this.schema().schema;
				if (schema && schema.fields) {
					for (i = 0; i < schema.fields.length; i++) {
						/* transform date */
						if (schema.fields[ i ].type === "date" &&
							offsets[ schema.fields[ i ].name ] !== undefined) {
							key = schema.fields[ i ].name;
							for (func in offsets[ key ]) {
								if (offsets[ key ].hasOwnProperty(func)) {
									offset = offsets[ key ][ func ];
									obj = this._dataSummaries[ key ][ func ];
									if ($.type(obj) === "string" && obj.indexOf("/Date(") !== -1) {
										this._dataSummaries[ key ][ func ] = new Date(
											parseInt(obj.replace("/Date(", "").replace(")/", ""), 10) + offset);
									}
								}
							}
						}
					}
				}
			}
			return this._dataSummaries;
		},
		_populateTransformedData: function (data) {
			// M.H. populate summaries data
			// when datasource is local and we want to get summaries when summaryExecution is afterfilteringbeforepaging
			// we need to get filtered data BUT when all filter conditions are cleared then it is not called filter method(in datasource) from filter widget
			// but it is called dataBind and in this case we should not get this._filteredData but this._data
			if (data !== null && data !== undefined) {
				this._transformedData = data;
			} else {
				this._transformedData = this._data;
			}
		},
		_invokeCallback: function (callee, callback) {
			var cbResolved, calleeResolved;

			cbResolved = callback || this.settings.callback;
			calleeResolved = callee || this.settings.callee;

			if (cbResolved) {
				if (calleeResolved) {
					cbResolved.apply(calleeResolved, [ true, "", this ]);
				} else {
					cbResolved(true, "", this);
				}
			}
		},
		_remoteData: function (callback, callee) {
			var params, url = this.settings.dataSource, dataType = this.settings.responseDataType,
				contentType = this.settings.responseContentType, options, verb = this.settings.requestType;
			/* 1. encode URL params */
			params = this._encodeUrl();
			if (callback) {
				this._customCallback = callback;
			} else {
				this._customCallback = null;
			}
			this._callee = callee;
			/* finally invoke the call to $.ajax. This can be easily "overriden" in an extension of the $.ig.DataSource */
			options = {
				url: url,
				/* params: params, */
				data: verb === "GET" ? params : JSON.stringify(params),
				type: verb,
				dataType: dataType,
				async: true,
				context: this,
				contentType: contentType,
				cache: false,
				dataFilter: this._dataFilter,
				success: this._successCallback,
				complete: this._completeCallback,
				converters: {
					"text json": function (value) {
						return value;
					}
				},
				error: this._errorCallback
			};
			this._processRequest(options);
		},
		_dataFilter: function (data, type) {
			var ds, schema = this.context.schema(), rawData,
				t = this.context.settings.type, ver, returnString = false;
			/* fall back
			A.T. 21 Oct. Extra fix for 120718 */
			if (type === undefined || type === null) {
				if (typeof data === "object" && data && typeof data.charAt !== "function") {
					// L.A. Fixing bug #129413 - [igDataSource] Error is thrown when opening Stock Quotes sample
					if ($.isXMLDoc(data)) {
						type = "xml";
					} else {
						type = "json";
					}
				} else {
					type = "text";
				}
			}
			if (type === "xml") {
				schema._type = "xml";
				ds = this.context._processXmlResponse(data, true, this.context);
			} else if (type === "json") {
				if (schema) {
					schema._type = "json";
				}
				/* data may be already a parsed JSON object */
				if ($.type(data) === "string") {
					rawData = JSON.parse(data);
				} else {
					rawData = data;
				}
				returnString = true;
				ds = this.context._processJsonResponse(rawData, this.context);
				/* should we really bother about this for now ? HTML data coming from the server ?
				} else if (type === "html") { */
			} else { // "text"
				/*A.T. workaround for jQuery's 1.5 and above bug related to dataFilter and success callback.
				We need to explicitly set the dataType to "text" when manually parsing it */
				/* get jquery version */
				if ($.fn.jquery) {
					ver = $.fn.jquery.split(".");
				}
				if (ver && ver.length >= 2) {
					/* if jQuery is 1.5 and greater or if the first major version is greater than 1 (when jQuery 2 comes out)
					As of jQuery 1.5, using this dataFilter approach for manually controlling deserialization will no longer work
					if the request's dataType is set to "json" or even omitted. another way of fixing this is using converters
					http://api.jquery.com/extending-ajax/#Converters */
					if (parseInt(ver[ 1 ], 10) > 4 || parseInt(ver[ 0 ], 10) > 1) {
						this.dataTypes = [];
						this.dataTypes.push("text");
						returnString = true;
					}
				}
				/* try to analyze and detect automatically */
				data = $.type(data) === "string" ? $.trim(data) : data;
				if ((data && $.type(data) === "string" && (data.startsWith("<?xml") ||
					data.startsWith("<"))) || t === "xml") {
					/* assume XML */
					if (schema) {
						schema._type = "xml";
					}
					/* we must convert the string to a document first */
					ds = this.context._processXmlResponse(
						this.context.stringToXmlObject(data), false, this.context
					);
				} else if ((data && $.type(data) === "string" && data.startsWith("[")) ||
						(t === "json" || t === "array")) {
					if (schema) {
						schema._type = "json";
					}
					/* ds = this.context._processJsonResponse(eval(data), this.context); */
					/* A.T. 20 Jan 2011 - fix for bug #62124 - igDataSource JSON string binding error */
					ds = this.context._processJsonResponse(JSON.parse(data), this.context);
				} else if ((data && $.type(data) === "string" && data.startsWith("{")) ||
						t === "json") {
					if (schema) {
						schema._type = "json";
					}
					ds = this.context._processJsonResponse(JSON.parse(data), this.context);
				} else if ($.isXMLDoc(data)) {
					if (schema) {
						schema._type = "xml";
					}
					ds = this.context._processXmlResponse(data, true, this.context);
				} else if (data !== "" && data !== null) {
					throw new Error($.ig.DataSourceLocale.locale.errorUnrecognizedResponseType);
				}
			}
			/*
			resKey = this.context.settings.responseDataKey;
			if (resKey && resKey !== "") {
			ds = rawData[resKey];
			} else {
			ds = rawData;
			}

			if (this.context._isPagingReq || this.context._isFilteringReq) {
			key = this.context.settings.responseTotalRecCountKey;
			if (rawData && rawData[key]) {
			if ($.type(rawData[key]) === "number") {
			this.context.totalRecordsCount(rawData[key]);
			} else {
			// try parse
			this.context.totalRecordsCount(parseInt(rawData[key], 10));
			}
			}
			}
			*/
			/*if (returnString) {
				return JSON.stringify(ds);
			} */
			if (returnString) {
				if (!(this.context.settings.paging && this.context.settings.paging.enabled &&
					this.context.settings.paging.appendPage)) {
					this.context._data = ds;
				}
				this.context._alreadySet = true;
			}
			return ds;
		},
		_successCallback: function (data) {
			// set the data & dataView
			//if the response doesn't hold the list of records directly in the root of the response, should we
			// set the data to the list of records, or only the dataView?
			// meaning , should the "_data" contain the raw response , in this case, an object, if the resKey is set ?
			var x, len = data ? data.length : 0;
			if ((data === undefined || data === null) && !this._alreadySet) {
				this._data = [];
				this._dataView = [];
			} else {
				if (this._data.length >= 0 && this.settings.paging &&
					this.settings.paging.enabled && this.settings.paging.appendPage) {
					for (x = 0; x < len; ++x) {
						this._data[ this._data.length ] = data[ x ];
					}
				} else {
					if (this._alreadySet) {
						this._dataView = this._data;
					} else {
						this._data = data;
						this._dataView = data;
					}
				}
			}
			this._alreadySet = false;
			this._populateTransformedData();
			this._isPagingReq = false;
			this._isFilteringReq = false;
			this._isSortingReq = false;
			this._isSummariesReq = false;
		},
		_errorCallback: function (req, status, error) {
			// first parameter denotes whether the request has been successful or not, second param is the error msg
			var f = this._customCallback || this.settings.callback, errmsg, statusMsg;
			this._isPagingReq = false;
			this._isFilteringReq = false;
			this._isSortingReq = false;
			this._isSummariesReq = false;
			if (req && req.status && req.statusText) {
				statusMsg = " ( " + req.status + " " + req.statusText + " ) ";
				if (req.status === 200 && error !== undefined) {
					statusMsg = " ( " + (error.message || error) + " ) ";
				}
			} else if (status !== null) {
				statusMsg = " ( " + status + " ) ";
			} else if (error !== undefined) {
				statusMsg = " ( " + (error.message || error) + " ) ";
			}
			errmsg = $.ig.DataSourceLocale.locale.errorRemoteRequest + statusMsg;
			if (f && this._callee) {
				f.apply(this._callee, [ false, errmsg, req, this ]);
			} else if (f) {
				f(false, errmsg, req, this);
			}
		},
		_completeCallback: function () {
			var f, callee, s = this.settings.sorting,
				p = this.settings.paging,
				filtering = this.settings.filtering;
			/* M.H. 3 June 2014 Fix for bug #172970:
			Local filtering is not persisted when the dataSource is remote */
			if (filtering.type === "local" && filtering.defaultFields.length > 0) {
				this.filter(filtering.defaultFields);
			}
			if (s.type === "local" && s.defaultFields.length > 0) {
				this.sort(s.defaultFields, s.defaultDirection);
			} else if (this.isGroupByApplied(s.expressions)) {
				this._generateGroupByData(this._filter ? this._filteredData : this._data,
										s.expressions);
			}
			/* Check if paging is configured, and if so,
			if OpType === $.ig.Constants.OpType.Local => apply local paging */
			if (p.enabled && p.type === "local") {
				this._page();
			}
			this._internalDataBound(true);
			f = this._customCallback || this.settings.callback;
			callee = this._callee || this.settings.callee;
			if (f && callee) {
				f.apply(callee, [ true, "", this ]);
			} else if (f) {
				f(true, "", this);
			}
		},
		_processRequest: function (options) {
			var o, s;
			/* trigger the call */
			if (this.settings.responseDataType === "jsonp") {
				/* $.getJSON(options.url, options.data, $.proxy(this._jsonpFilter, this)); */
				/* M.H. 29 Aug 2013 Fix for bug #150723: When dataSource is remote and it is used JSONP
				then in Chrome and Firefox it is thrown exception and grid is not loaded */
				/* M.H. 19 Sep 2013 Fix for bug #151600: [Templating] Row Template with Images doesn't load */
				o = {
					dataType: "jsonp",
					type: "GET",
					url: options.url,
					data: options.data,
					success: $.proxy(this._jsonpFilter, this),
					error: $.proxy(this._errorCallback, this)
				};
				/* M.H. 19 Sep 2013 Fix for bug #151600: [Templating] Row Template with Images doesn't load */
				s = this.settings;
				if (s.jsonp !== undefined && s.jsonp !== null) {
					o.jsonp = this.settings.jsonp;
				}
				if (s.jsonpCallback !== undefined) {
					o.jsonpCallback = this.settings.jsonpCallback;
				}
				this._ajaxRequest = $.ajax(o);
			} else {
				this._ajaxRequest = $.ajax(options);
				/*
				$.ajax({
				url: url,
				// do not specify a dataType, let jQuery detect the response type, and filter the data later on.
				dataType: dataType,
				async: true,
				context: this,
				data: params,
				contentType: contentType,
				cache: false,
				dataFilter: dataFilterFunction,
				success: successCallback,
				complete: completeCallback,
				error: errorCallback
				});
				*/
			}
		},
		_jsonpFilter: function (data) {
			var resp, x;
			this.context = this;
			resp = this._dataFilter(data, "json");
			if (!resp.length && $.type(resp) === "object") {
				resp = [ resp ];
			}
			if (this._data.length >= 0 && this.settings.paging &&
				this.settings.paging.enabled && this.settings.paging.appendPage) {
				for (x = 0; x < resp.length; ++x) {
					this._data[ this._data.length ] = resp[ x ];
				}
			} else {
				this._data = resp;
				this._dataView = resp;
			}
			this._populateTransformedData();
			this._completeCallback();
		},
		_processJsonResponse: function (data, context) {
			var ds, schema = context.schema(), resKey, resPath, i;
			/* support for remote custom loadOnDemand */
			if (this._responseData) {
				this._responseData(data);
			}
			if (data.Metadata) {
				this._metadata = data.Metadata;
			}

			if (schema && schema.fields && schema.fields().length > 0 &&
				this.settings.localSchemaTransform) {
				ds = schema.transform(data);
			} else {
				resKey = context.settings.responseDataKey;
				if (resKey !== null && resKey !== undefined) {
					/* we are not using eval() here, merge implementations with the schema code
					consider arrays here as well */
					resPath = resKey.split(".");

					/* if (resKey && resKey !== "") { */
					if (resPath.length > 0) {
						/* ds = data[resKey]; */
						ds = data;
						for (i = 0; i < resPath.length; i++) {
							ds = ds[ resPath[ i ] ];
						}
						if (typeof ds === "string") {
							ds = JSON.parse(ds);
						}
					} else {
						ds = data;
					}
				} else {
					ds = data;
				}
			}

			if (context._isPagingReq || context._isFilteringReq) {
				this.totalRecordsCount(
					null,
					this.settings.responseTotalRecCountKey,
					data,
					context
				);
			}

			this.summariesResponse(this.settings.summaries.summariesResponseKey, data);
			return ds;
		},
		/* think about how to combine both searchField in the schema and
		responseDataKey, if defined in the root settings of the data source */
		_processXmlResponse: function (data, isParsed, context) {

			var ds, schema = context.schema(), tmpSchema, resKey;

			/* make sure it's also possible to just define a searchfield without
			schema. currently the search field is in the schema? */
			if (schema && schema.fields && schema.fields().length > 0) {
				ds = this.settings.localSchemaTransform ? schema.transform(data) : data;
			} else {
				// convert the XML document to an array of JSON objects
				resKey = context.settings.responseDataKey;
				if (resKey && resKey !== "") {
					tmpSchema = new $.ig.DataSchema();
					ds = context._xmlToArray(tmpSchema._findXmlRecordsRoot(data, resKey));
				} else {
					ds = context._xmlToArray(data);
				}
			}
			return ds;
		},
		_xmlToArray: function (data) {
			// the assumptions here are several:
			// - the data that comes as a parameter is a XML document
			// - we are only going to traverse the children of the first root element - this is the default response type
			// for WCF services declared with BodyStyle = WebMessageBodyStyle.Wrapped attribute
			// we will also check of the root contains more than 1 node, and then assume the response is of type WebMessageBodyStyle.Bare
			// all other cases need to be handled by the developer - either specify schema or make sure the response has the format
			//  <root>
			//		< child> </child>
			//		....
			//  </root>
			var ds = [], root = data, i, r, j, name, val, o;
			o = window.ActiveXObject;
			if (data && data.childNodes && data.childNodes.length === 1) {
				// parse children of first root
				root = data.childNodes[ 0 ];
			}
			for (i = 0; i < root.childNodes.length; i++) {
				r = root.childNodes[ i ];
				ds[ i ] = [];
				for (j = 0; j < r.childNodes.length; j++) {
					name = o === undefined ? r.childNodes[ j ].localName : r.childNodes[ j ].baseName;
					val = o === undefined ? r.childNodes[ j ].textContent : r.childNodes[ j ].text;
					ds[ i ][ name ] = val;
				}
			}
			return ds;
		},
		_encodeUrl: function () {
			var props = this.settings, sParams = {}, fParams = {}, pParams = {},
				params, selParams = {}, sumParams = {}, extraParams = {}, pkParams = {}, noCancel = true;
			/* if the schema is defined on the client, but we have RemoteUrl data source type,
			in the oData protocol it's possible to list fields that will be included in the response
			so let's read that from the schema and encode it in the URL, in case the server-side
			supports it. Example: http://www.odata.org/developers/protocols/uri-conventions#SelectSystemQueryOption */
			params = {
				"sortingParams": sParams,
				"filteringParams": fParams,
				"pagingParams": pParams,
				"selectParams": selParams,
				"summariesParams": sumParams,
				"extraParams": extraParams,
				"pkParams": pkParams
			};
			if ($.isFunction(props.urlParamsEncoding)) {
				//args = props.urlParamsEncoding(this, params);
				noCancel = props.urlParamsEncoding(this, params);
			}
			/* A.T. 18 Jan. 2011 - fix for bug #62309 - igDataSource unclear cancelability of urlParamsEncoding
			if (!args.cancel) { */
			if (noCancel) {
				this._encodeSelectParams(params);
				this._encodeSortingParams(params);
				this._encodeFilteringParams(params);
				this._encodePagingParams(params);
				this._encodeSummariesParams(params);
				/* L.A. 10 August 2012 Fixing bugs #118643, #117764 */
				this._encodePkParams(params);
				/* this should be implemented by any external features that are not
				direclly mapped as data source features such as group by summaries */
				if ($.isFunction(this.settings.encodeExtraParams)) {
					this.settings.encodeExtraParams(this, params);
				}

				if ($.isFunction(props.urlParamsEncoded)) {
					props.urlParamsEncoded(this, params);
				}
			}
			return $.extend(
				true,
				{},
				params.sortingParams,
				params.filteringParams,
				params.pagingParams,
				params.selectParams,
				params.summariesParams,
				params.extraParams,
				params.pkParams
			);
		},
		/* L.A. 10 August 2012 Fixing bugs #118643, #117764 */
		_encodePkParams: function (params) {
			var p = this.settings.paging, s = this.settings.sorting, f = this.settings.filtering,
				sm = this.settings.summaries, pk = this._schema ? this._schema._pk : null;
			/* S.S. December 19, 2012 Bug #129394 this._metadata is always undefined on the first call because the dataSource
			uses the first ajax response to set it. Therefore we shouldn't check for metadata availability */
			if (pk && ((p.enabled && p.type === "remote") ||
				(s.type === "remote" || f.type === "remote" || sm.type === "remote"))) {
				params.pkParams.pk = pk;
			}
		},
		_encodeSelectParams: function (params) {
			var selParams = params.selectParams, i;

			if (!this.settings.localSchemaTransform && this.schema() && this.schema().fields().length > 0) {
				// encode fields using oData $select
				// http://www.odata.org/developers/protocols/uri-conventions#SelectSystemQueryOption
				// example: http://services.odata.org/OData/OData.svc/Products?$select=Price,Name
				selParams.$select = "";
				for (i = 0; i < this.schema().fields().length; i++) {
					if (i !== 0) {
						selParams.$select += ",";
					}
					selParams.$select += this.schema().fields()[ i ].name;
				}
			} else if (!this.settings.localSchemaTransform &&
				this.schema() && this.schema().fields().length === 0) {
				/* include all fields
				http://services.odata.org/OData/OData.svc/Products?$select=* */
				selParams.$select = "*";
			}
		},
		_encodePagingParams: function (params) {
			var p = this.settings.paging;
			if (p.enabled && p.type === "remote") {
				//if (p.enabled) {
				// handle paging URL params
				// is also paging request
				this._isPagingReq = true;
				if (p.pageIndexUrlKey !== null && p.pageSizeUrlKey !== null) {
					params.pagingParams[ p.pageIndexUrlKey ] = this.pageIndex();
					params.pagingParams[ p.pageSizeUrlKey ] = this.pageSize();
				} else {
					/* OData $skip is the start index and $top is the end index */
					params.pagingParams.$skip = this.pageIndex() * this.pageSize();
					/* params.pagingParams.$top = params.pagingParams.$skip + this.pageSize(); */
					params.pagingParams.$top = this.pageSize();

					/* encode $inlinecount */
					params.pagingParams.$inlinecount = "allpages";
					/* set response key for total number of pages */
					if (this.settings.responseTotalRecCountKey === null) {
						// http://www.odata.org/developers/protocols/uri-conventions#InlinecountSystemQueryOption
						this.settings.responseTotalRecCountKey = "d.__count"; // this is the default OData conventions
					}
				}
			}
		},
		_encodeSortingParams: function (params) {
			var s = this.settings.sorting, tmpdir, i, sfields, url, urlQS, hlayout = null;
			if (s.type === "remote") {
				/* handle sorting params */
				if (s.exprString) {
					sfields = this._parseSortExpressions(s.exprString);
				} else {
					/* handle expressions array */
					sfields = s.expressions;
				}
				this._isSortingReq = true;
				/* now encode */
				for (i = 0; i < sfields.length; i++) {
					if (sfields[ i ].layout) {
						hlayout = sfields[ i ].layout;
					}
					/* it's a sorting request */
					if (s.sortUrlAscValueKey !== null && s.sortUrlDescValueKey !== null && s.sortUrlKey !== null) {
						tmpdir = (sfields[ i ].dir && sfields[ i ].dir.toLowerCase().startsWith("asc")) ?
							s.sortUrlAscValueKey : s.sortUrlDescValueKey;
						params.sortingParams[ s.sortUrlKey + "(" + sfields[ i ].fieldName + ")" ] = tmpdir;
					} else {
						// OData style encoding (the default)
						if (params.sortingParams.$orderby === undefined) {
							params.sortingParams.$orderby = "";
						}
						params.sortingParams.$orderby = params.sortingParams.$orderby +
							sfields[ i ].fieldName + " " + sfields[ i ].dir.toLowerCase();
						if (i < sfields.length - 1) {
							params.sortingParams.$orderby += ",";
						}
						/* params.sortingParams.$orderby = encodeURIComponent(params.sortingParams.$orderby); */
					}
				}
				if (hlayout) {
					// we do not want to encode one and the same keyvalue pair twice
					// M.H. 9 Jan 2014 Fix for bug #158808: When using LoadOnDemand with remote GroupBy for the second child layout, the grouped rows are not properly sorted.
					url = this.settings.dataSource;
					if (url && $.type(url) === "string" && url.indexOf("layout=" + hlayout) >= 0) {
						url = url.substr(url.indexOf("?") + 1);
						urlQS = url.split("&");
						for (i = 0; i < urlQS.length; i++) {
							if (urlQS[ i ].indexOf("layout=") >= 0) {
								if (urlQS[ i ].replace("layout=", "") === hlayout) {
									hlayout = null;
								}
								break;
							}
						}
					}
					if (hlayout) {
						params.sortingParams.layout = hlayout;
					}
				}
			}
		},
		_encodeFilteringParams: function (params) {
			var f = this.settings.filtering, ffields, i, key, exprNotReq, cond,
				d, day, month, year, curDate, expr, fieldName, logic = "and";
			if (f.type === "remote") {
				// handle filtering params
				if (f.exprString) {
					ffields = this._parseFilterExprString(f.exprString);
				} else {
					ffields = f.expressions;
				}
				for (i = 0; i < ffields.length; i++) {
					// is a filtering request
					this._isFilteringReq = true;
					cond = ffields[ i ].cond;

					exprNotReq = this._isFilteringExprNotReq(cond);
					/* if the filtering url key is explicitly defined, use this encoding:
					example something.php?filter(Name)=Contains(NY)
					otherwise we use OData as the default */
					if (f.filterExprUrlKey !== null) {
						// check if a filtering condition for the column already exists
						key = f.filterExprUrlKey + "(" + ffields[ i ].fieldName + ")";
						if ($.type(ffields[ i ].expr) === "date") {
							d = Date.UTC(
								ffields[ i ].expr.getFullYear(),
								ffields[ i ].expr.getMonth(),
								ffields[ i ].expr.getDate(),
								ffields[ i ].expr.getHours(),
								ffields[ i ].expr.getMinutes()
							);
							/* d = ffields[i].expr.getTime(); */
						} else {
							d = ffields[ i ].expr;
						}
						if (params.filteringParams[ key ] === undefined) {
							params.filteringParams[ key ] = ffields[ i ].cond +
								"(" + (exprNotReq ? "" : d) + ")";
						} else {
							params.filteringParams[ key ] = params.filteringParams[ key ] + "," +
								ffields[ i ].cond + "(" + (exprNotReq ? "" : d) + ")";
						}
					} else {
						/* OData:
						http://www.odata.org/developers/protocols/uri-conventions#FilterSystemQueryOption
						we support the following out of the box:
						Eq, Ne, Gt, Ge, Lt, Le, And, Or, Not
						as well as the following functions:
						endswith, startswith, indexof */
						if (params.filteringParams.$filter === undefined) {
							params.filteringParams.$filter = "";
						}
						/* M.H. 5 Sep 2013 Fix for bug #150774: OData Request ignores Case Sensitivity */
						fieldName = ffields[ i ].fieldName;
						expr = ffields[ i ].expr;
						if ($.type(expr) === "string") {
							if (!f.caseSensitive) {
								fieldName = "tolower(" + fieldName + ")";
								expr = expr.toLowerCase();
							}
							/* M.H. 3 Apr 2014 Fix for bug #168922: When using remote
							filtering, single quote characters are not escaped properly. */
							expr = expr.replace(/\'/g, "''");
						}
						if (ffields[ i ].cond === "startsWith") {

							params.filteringParams.$filter +=
								"startswith(" + fieldName + "," + "'" + expr + "') eq true";

						} else if (ffields[ i ].cond === "endsWith") {

							params.filteringParams.$filter +=
								"endswith(" + fieldName + "," + "'" + expr + "') eq true";

						} else if (ffields[ i ].cond === "contains") {

							params.filteringParams.$filter +=
								"indexof(" + fieldName + "," + "'" + expr + "') ge 0";

						} else if (ffields[ i ].cond === "doesNotContain") {

							params.filteringParams.$filter +=
								"indexof(" + fieldName + "," + "'" + expr + "') eq -1";

						} else if (ffields[ i ].cond === "equals") {

							if ($.type(ffields[ i ].expr) === "string") {
								params.filteringParams.$filter +=
									fieldName + " eq " + "'" + expr + "'";
							} else {
								params.filteringParams.$filter +=
									ffields[ i ].fieldName + " eq " + ffields[ i ].expr;
							}
						} else if (ffields[ i ].cond === "true") {
							params.filteringParams.$filter +=
								ffields[ i ].fieldName + " eq true";
						} else if (ffields[ i ].cond === "false") {
							params.filteringParams.$filter +=
								ffields[ i ].fieldName + " eq false";
						} else if (ffields[ i ].cond === "doesNotEqual") {

							if ($.type(ffields[ i ].expr) === "string") {
								params.filteringParams.$filter +=
									fieldName + " ne " + "'" + expr + "'";
							} else {
								params.filteringParams.$filter +=
									ffields[ i ].fieldName + " ne " + ffields[ i ].expr;
							}

						} else if (ffields[ i ].cond === "greaterThan") {

							params.filteringParams.$filter +=
								ffields[ i ].fieldName + " gt " + ffields[ i ].expr;

						} else if (ffields[ i ].cond === "lessThan") {

							params.filteringParams.$filter +=
								ffields[ i ].fieldName + " lt " + ffields[ i ].expr;

						} else if (ffields[ i ].cond === "greaterThanOrEqualTo") {

							params.filteringParams.$filter +=
								ffields[ i ].fieldName + " ge " + ffields[ i ].expr;

						} else if (ffields[ i ].cond === "lessThanOrEqualTo") {

							params.filteringParams.$filter +=
								ffields[ i ].fieldName + " le " + ffields[ i ].expr;
						} else if (ffields[ i ].cond === "null") {
							params.filteringParams.$filter +=
								ffields[ i ].fieldName + " eq null";
						} else if (ffields[ i ].cond === "notNull") {
							params.filteringParams.$filter +=
								ffields[ i ].fieldName + " ne null";
						} else if (ffields[ i ].cond === "empty") {
							params.filteringParams.$filter +=
								"length(" + ffields[ i ].fieldName + ") eq 0";
						} else if (ffields[ i ].cond === "notEmpty") {
							params.filteringParams.$filter +=
								"length(" + ffields[ i ].fieldName + ") gt 0";
						} else if (ffields[ i ].cond === "on") {
							expr = this._parser.toDate(ffields[ i ].expr);
							year = expr.getFullYear();
							month = expr.getMonth() + 1;
							day = expr.getDate();
							params.filteringParams.$filter +=
								"day(" + ffields[ i ].fieldName + ") eq " + day + " and ";
							params.filteringParams.$filter +=
								"month(" + ffields[ i ].fieldName + ") eq " + month + " and ";
							params.filteringParams.$filter +=
								"year(" + ffields[ i ].fieldName + ") eq " + year;
						} else if (ffields[ i ].cond === "notOn") {
							expr = this._parser.toDate(ffields[ i ].expr);
							/* params.filteringParams.$filter += ffields[i].fieldName + " ne DateTime'" + $.ig.formatter(expr, "date", "yyyy-MM-dd") + "'"; */
							/* M.H. 15 May 2014 Fix for bug #171705: With odata filtering a
							date column by 'Not On' doesn't filter the selected date. */
							year = expr.getFullYear();
							month = expr.getMonth() + 1;
							day = expr.getDate();
							params.filteringParams.$filter +=
								"day(" + ffields[ i ].fieldName + ") ne " + day + " or ";
							params.filteringParams.$filter +=
								"month(" + ffields[ i ].fieldName + ") ne " + month + " or ";
							params.filteringParams.$filter +=
								"year(" + ffields[ i ].fieldName + ") ne " + year;
						} else if (ffields[ i ].cond === "after") {
							expr = this._parser.toDate(ffields[ i ].expr);
							params.filteringParams.$filter +=
								ffields[ i ].fieldName + " gt DateTime'" +
								$.ig.formatter(expr, "date", "yyyy-MM-ddT23:59:59") + "'";
						} else if (ffields[ i ].cond === "before") {
							expr = this._parser.toDate(ffields[ i ].expr);
							params.filteringParams.$filter +=
								ffields[ i ].fieldName + " lt DateTime'" +
								$.ig.formatter(expr, "date", "yyyy-MM-dd") + "'";
						} else if (ffields[ i ].cond === "today") {
							expr = this._parser.toDate(ffields[ i ].expr);
							year = expr.getFullYear();
							month = expr.getMonth() + 1;
							day = expr.getDate();
							params.filteringParams.$filter +=
								"day(" + ffields[ i ].fieldName + ") eq " + day + " and ";
							params.filteringParams.$filter +=
								"month(" + ffields[ i ].fieldName + ") eq " + month + " and ";
							params.filteringParams.$filter +=
								"year(" + ffields[ i ].fieldName + ") eq " + year;
						} else if (ffields[ i ].cond === "yesterday") {
							expr = this._parser.toDate(ffields[ i ].expr);
							year = expr.getFullYear();
							month = expr.getMonth() + 1;
							day = expr.getDate();
							params.filteringParams.$filter +=
								"day(" + ffields[ i ].fieldName + ") eq " + day + " and ";
							params.filteringParams.$filter +=
								"month(" + ffields[ i ].fieldName + ") eq " + month + " and ";
							params.filteringParams.$filter +=
								"year(" + ffields[ i ].fieldName + ") eq " + year;
						} else if (ffields[ i ].cond === "thisMonth") {
							curDate = new Date();
							month = curDate.getMonth() + 1;
							year = curDate.getFullYear();
							params.filteringParams.$filter +=
								"month(" + ffields[ i ].fieldName + ") eq " + month + " and ";
							params.filteringParams.$filter +=
								"year(" + ffields[ i ].fieldName + ") eq " + year;
						} else if (ffields[ i ].cond === "lastMonth") {
							curDate = new Date();
							month = curDate.getMonth() + 1;
							year = curDate.getFullYear();
							if (month === 1) {
								month = 12;
								year--;
							} else {
								month--;
							}
							params.filteringParams.$filter +=
								"month(" + ffields[ i ].fieldName + ") eq " + month + " and ";
							params.filteringParams.$filter +=
								"year(" + ffields[ i ].fieldName + ") eq " + year;
						} else if (ffields[ i ].cond === "nextMonth") {
							curDate = new Date();
							month = curDate.getMonth() + 1;
							year = curDate.getFullYear();
							if (month === 12) {
								month = 1;
								year++;
							} else {
								month++;
							}
							params.filteringParams.$filter +=
								"month(" + ffields[ i ].fieldName + ") eq " + month + " and ";
							params.filteringParams.$filter +=
								"year(" + ffields[ i ].fieldName + ") eq " + year;
						} else if (ffields[ i ].cond === "thisYear") {
							curDate = new Date();
							year = curDate.getFullYear();
							params.filteringParams.$filter +=
								"year(" + ffields[ i ].fieldName + ") eq " + year;
						} else if (ffields[ i ].cond === "lastYear") {
							curDate = new Date();
							year = curDate.getFullYear() - 1;
							params.filteringParams.$filter +=
								"year(" + ffields[ i ].fieldName + ") eq " + year;
						} else if (ffields[ i ].cond === "nextYear") {
							curDate = new Date();
							year = curDate.getFullYear() + 1;
							params.filteringParams.$filter +=
								"year(" + ffields[ i ].fieldName + ") eq " + year;
						}
						/* M.H. 28 May 2014 Fix for bug #172592: Cannot filter with ANY condition in
						the advanced filter dialog when the grid is bound to an oData data source */
						logic = "and";
						if (ffields[ i ].logic && ffields[ i ].logic.toLowerCase() === "or") {
							logic = "or";
						}
						if (i < ffields.length - 1) {
							/* M.H. 28 May 2014 Fix for bug #172592: Cannot filter with ANY condition in
							the advanced filter dialog when the grid is bound to an oData data source */
							params.filteringParams.$filter += " " + logic + " ";
						}
						/* params.filteringParams.$filter = encodeURIComponent(params.filteringParams.$filter);
						Before, After, Today, Yesterday, and so on - are not supported by OData, only by our custom filtering */
					}
				}
				/* now encode the filtering logic, if defined */
				if (f.filterLogicUrlKey !== null && ffields.length > 0) {
					/* takes the first field's logic prop */
					params.filteringParams[ f.filterLogicUrlKey ] = ffields[ 0 ].logic;
				}
			}
		},
		_encodeSummariesParams: function (params) {
			var i, j, s = this.settings.summaries, cs = s.columnSettings,
				methodsStr,
				csLength = cs.length;

			if (s.type === "remote") {
				/* M.H. 1 Nov 2016 Fix for bug 227681: When autoGenerateColumns is true and summaries are remote initially the summaries are not populated. */
				if (!csLength && s.calculateAll) {
					params.summariesParams[ s.summaryExprUrlKey + "(all)" ] = "*";
				}
				for (i = 0; i < csLength; i++) {
					methodsStr = "";
					/* check if methods are defined */
					if (cs[ i ].summaryOperands === undefined || cs[ i ].summaryOperands === null) {
						continue;
					}
					for (j = 0; j < cs[ i ].summaryOperands.length; j++) {
						if (cs[ i ].summaryOperands[ j ].active === true ||
							cs[ i ].summaryOperands[ j ].active === 1) {
							methodsStr += cs[ i ].summaryOperands[ j ].type + ",";
						}
					}
					if (methodsStr !== "") {
						params.summariesParams[ s.summaryExprUrlKey + "(" + cs[ i ].columnKey + ")" ] =
							methodsStr.slice(0, -1);
					}
				}
			}
		},
		filteredData: function () {
			/*returns filtered data if local filtering is applied. If filtering is not applied OR type of filtering is remote returns undefined.
			```
				ds = new $.%%WidgetName%%({
					dataSource: products,
					primaryKey: "ProductID",
					filtering: {
						type: "local",
						caseSensitive: true,
						applyToAllData: true
					}
				});

				ds.dataBind();
				//Get
				var filteredData = ds.filteredData();
			```
			returnType="array" array of (filtered)data records
			*/
			return this._filteredData;
		},
		_page: function (keepRecords) {
			var count = 0, data;
			if (keepRecords === undefined) {
				keepRecords = false;
			}
			/* reset the dataView: */
			if (keepRecords) {
				count = this._dataView.length;
			} else {
				this._dataView = [];
			}
			data = this._filter ? this._filteredData : this._data;
			this._generatePageData(data, count);
		},
		_getPageStartEndIndex: function (data) {
			/* when changing logic with filtering and paging check bug 186504 - because
			the new rows are added in _filteredData as well when there is applied filtering and local paging */
			/* this._dataView should contain only the number of records specified by pageSize.
			load the data for the current page only , in the DataView */
			var startIndex = this.pageIndex() * this.pageSize(), endIndex;
			if (startIndex >= data.length) {
				this.settings.paging.pageIndex = 0;
				startIndex = this.pageIndex() * this.pageSize();
			}
			endIndex = startIndex + this.pageSize() >= data.length ?
				data.length : startIndex + this.pageSize();
			return {
				startIndex: startIndex,
				endIndex: endIndex
			};
		},
		_generateGroupByPageDataForAllRecords: function () {
			var i, data = this.visibleGroupByData(),
				metadata = this._getPageStartEndIndex(data),
				startIndex = metadata.startIndex, endIndex = metadata.endIndex;
			for (i = startIndex; i < endIndex; i++) {
				this._gbDataView.push(data[ i ]);
				if (!data[ i ].__gbRecord) {
					this._dataView.push(data[ i ]);
				}
			}
		},
		_generateGroupByPageDataForDataRecordsOnly: function (data) {
			/* Populates _gbDataView and _dataView collections. This function should be called only when - group by and paging are applied and this.settings.groupby.pagingMode is set to "dataRecordsOnly"
			First record(s) is/are group-by record(s) in visible group-by data view collection.
			*/
			var i, rec, startIndex = 0, parents = [],
				visible = true, level = 100, levelCollapsed,
				gbData = this.groupByData(), len = gbData.length,
				metadata = this._getPageStartEndIndex(data),
				startDataRec = data[ metadata.startIndex ],
				endDataRec = data[ metadata.endIndex - 1 ];
			/*find start index(first data record in page)*/
			for (i = 0; i < len; i++) {
				if (gbData[ i ] === startDataRec ) {
					startIndex = i;
					break;
				}
			}
			/* find groupby parent records for the first(in the page) data record*/
			for (i = startIndex - 1; i >= 0; i--) {
				rec = gbData[ i ];
				if (rec.__gbRecord) {
					if (level > rec.level) {
						level = rec.level;
						parents.unshift(rec);
						/* detect whether data records are visible(according to collapse state of parent group-by record(s))
						insert in _gbDataView visible parent group-by records
						*/
						this._gbDataView.unshift(rec);
						if (rec.collapsed) {
							this._gbDataView = [ rec ];
							visible = false;
							levelCollapsed = level;
						}
						if (!level) {
							break;
						}
					}
				}
			}
			/* populate _gbDataView(visible group-by data view collection) and _dataView, collapsed records are not added in _gbDataView */
			for (i = startIndex; i < len; i++) {
				rec = gbData[ i ];
				if (rec.__gbRecord) {
					if (rec.level <= levelCollapsed || visible) {
						levelCollapsed = rec.level;
						visible = !(rec.collapsed);
						this._gbDataView.push(rec);
					}
				} else {
					this._dataView.push(rec);
					if (visible) {
						this._gbDataView.push(rec);
					}
					if (rec === endDataRec) {
						break;
					}
				}
			}
		},
		_generateGroupByPageData: function (data) {
			this._dataView = [];
			this._gbDataView = [];
			return (this.settings.groupby.pagingMode === "allRecords") ?
					this._generateGroupByPageDataForAllRecords(data) :
					this._generateGroupByPageDataForDataRecordsOnly(data);
		},
		_generatePageData: function (data, count) {
			if (this.isGroupByApplied()) {
				return this._generateGroupByPageData(data, count);
			}
			var i, metadata = this._getPageStartEndIndex(data),
				startIndex = metadata.startIndex, endIndex = metadata.endIndex;
			for (i = startIndex; i < endIndex; i++) {
				this._dataView[ count++ ] = data[ i ];
			}
		},
		_compareValues: function (x, y) {
			/* Comparer function that accepts field data and two values to compare. Returns 0 - if the values are equal, 1 - if x > y and -1 - if y > x
				paramType="object" First Value that will be compared
				paramType="object" Second Value that will be compared
			*/
			if ((x === null || x === undefined) && (y === null || y === undefined)) {
				return 0;
			}
			if ((x === null || x === undefined) && y !== null && y !== undefined) {
				return -1;
			}
			if (x !== null && x !== undefined && (y === null || y === undefined)) {
				return 1;
			}
			return x > y ? 1 : x < y ? -1 : 0;
		},
		_sortByFieldExpression: function (data, f, direction, convertf) {
			var arr = [], i, dataLen = data.length, reverse, sortF,
				caseSensitive =  this.settings.sorting.caseSensitive,
				compareValFunc = f.compareFunc, rec, val, formatter = f.formatter,
				self = this, mapper = this._hasMapper;
			if (f.dir !== undefined && f.dir !== null) {
				reverse = f.dir.toLowerCase().startsWith("desc");
				reverse = reverse ? -1 : 1;
			} else if (direction !== undefined && direction !== null && direction !== "") {
				reverse = direction.toLowerCase().startsWith("desc");
				reverse = reverse ? -1 : 1;
			}
			for (i = 0; i < dataLen; i++) {
				rec = data[ i ];
				val = mapper ? self.getCellValue(f.fieldName, rec) : rec[ f.fieldName ];
				if (formatter) {
					val = formatter(val, f.fieldName);
				}
				if (convertf) {
					/* this is assumed to be a custom-defined function, that will
					override the default data source type conversion logic */
					val = convertf(val, f.fieldName);
				}
				/* A.T. 19 Jan 2011 - Fix for bug #62963 - igDataSource - case sensitivity is not applied to sorting */
				if (caseSensitive === false &&
						val !== undefined &&
						val !== null && val.toLowerCase) {
					val = val.toLowerCase();
				} else if (val && val.getTime) {
					val = val.getTime();
				}
				arr.push({
					val: val,
					rec: rec
				});
			}
			sortF = function () {
				return function (obj1, obj2) {
					var arr1, arr2,
						a = obj1.val, b = obj2.val,
						recordsData, recordsDataReverse;
					recordsData = { fieldName: f.fieldName, recordX: obj1.rec, recordY: obj2.rec };
					recordsDataReverse = { fieldName: f.fieldName, recordX: obj2.rec, recordY: obj1.rec };
					arr1 = reverse * compareValFunc(a, b, recordsData);
					arr2 = reverse * compareValFunc(b, a, recordsDataReverse);
					if (arr1 < arr2) {
						return -1;
					}
					if (arr1 > arr2) {
						return 1;
					}
					return 0;
				};
			};
			arr = arr.sort(sortF());
			for (i = 0; i < dataLen; i++) {
				data[ i ] = arr[ i ].rec;
			}
			return data;
		},
		_sortDataRecursive: function (data, fields, fieldIndex, defSortDir, convertFunc) {
			var i, j, len = data.length, expr, gbExpr, gbData, gbDataLen,
				fieldsLen = fields.length;
			fieldIndex = fieldIndex || 0;
			if (fieldIndex > fieldsLen - 1 || len <= 1) {
				return data;
			}
			expr = fields[ fieldIndex ];
			data = this._sortByFieldExpression(data, expr, defSortDir, convertFunc);
			if (fieldIndex >= fieldsLen - 1) {
				return data;
			}
			for (i = 0; i < len; i++) {
				gbExpr = fields[ fieldIndex ];
				gbData = this._groupedRecordsByExpr(data, i, expr);
				gbDataLen = gbData.length;
				if (gbDataLen > 1 && fieldIndex + 1 < fieldsLen) {
					gbData = this._sortDataRecursive(gbData, fields, fieldIndex + 1, defSortDir, convertFunc);
				}
				for (j = 0; j < gbDataLen; j++) {
					data[ i + j ] = gbData[ j ];
				}
				i += gbDataLen - 1;
			}
			return data;
		},
		/* multi-column sorting  (third column - whether sorting should be preserved or cleared )
		field can be a schema field, or an index of the column
		fields => an array of fields object definitions:
		example: [{fieldName : "firstName"}, {fieldName : "lastName"}]
		example 2: [{fieldIndex : 1} , {fieldIndex : 2}] */
		sort: function (fields, direction) {
			/* Sorts the data source locally. The result (filtered data) can be obtained by calling dataView().
			Remote filtering can be performed by just calling dataBind() and setting the settings.filtering.expressions
			multi-column sorting can be enabled by setting keepSortState to true.
			fields => an array of fields object definitions:
			example: [{fieldName : "firstName"}, {fieldName : "lastName"}]
			example 2: [{fieldIndex : 1} , {fieldIndex : 2}]

			```
				var ds = new $.%%WidgetName%%({
					schema: {
						fields:[
							{ name : "col1" },
							{
								name : "col2",
								type: "number"
							}
						]
					},
					sorting: { type: "local"},
					dataSource: $("#t1")[0]
				}).dataBind();

				ds.sort([{fieldName : "col2"}], "desc", false);
			```

			paramType="object" an array of fields object definitions
			paramType="string" asc / desc direction
			*/
			/* check if there is a custom function defined */
			var i, s = this.settings.sorting, convertFunc, isGb,
				p = this.settings.paging, data, resetPaging = false;
			/* we allow the developer to provide a single string of sort expressions, in the following format:
			"col1 asc, col2 desc, col3 asc" ...  */
			if ($.type(fields) === "string") {
				fields = this._parseSortExpressions(fields);
			}
			if (fields === undefined || fields === null) {
				throw new Error($.ig.DataSourceLocale.locale.noSortingFields);
			}
			fields = this._findSortingExpressionsForLayout(fields, this.settings.key);
			isGb = this.isGroupByApplied(fields);
			if (s.applyToAllData && s.type === "local") {
				/* M.H. 11 Mar 2013 Fix for bug #135542: When filtering is applied and then sort
				any column and there is remote paging, all of the records for the current page
				are sorted and rendered, no matter the applied filter */
				if (this._filter && ((p.type === "local" && p.enabled === true) || p.enabled === false ||
						(p.type === "remote" && p.enabled === true && this.settings.filtering.type === "local"))) {
					data = this._filteredData;
				} else {
					data = this.data();
				}
				resetPaging = true;
			} else {
				data = this.dataView();
			}
			if ($.type(s.customFunc) === "function") {
				// call the function, passing the data to be sorted, the fields, and the direction
				data = s.customFunc(data, fields, direction);
			} else {
				if (!direction) {
					direction = "";
				}
				/* check if a custom conversion function is set */
				if ($.isFunction(s.customConvertFunc)) {
					convertFunc = s.customConvertFunc;
				}
				/*else {
				we do not want to reset the default data source type conversion logic
				convertFunc returns a function
				convertFunc = this._convertf;
				} */

				/* we allow the developer to provide a single string of sort expressions, in the following format:
				"col1 asc, col2 desc, col3 asc" ...  */
				if ($.type(fields) === "string") {
					fields = this._parseSortExpressions(fields);
				}
				/* A.T. 21 Jan Fix for bug #63146 - reversing of sorting should be the other
				way around if "direction" is specified as parameter in sort() */
				/* M.H. 16 March 2012 Fix for bug #105043 - when fields.length is 0 then
				sortF returns 0. But in Chrome when there are empty values the issues is represented */
				if (fields.length > 0) {
					//check comparer function type if any is set
					for (i = 0; i < fields.length; i++) {
						if (fields[ i ].compareFunc) {
							if (typeof fields[ i ].compareFunc === "string" &&
								typeof window[ fields[ i ].compareFunc ] === "function") {
								fields[ i ].compareFunc = window[ fields[ i ].compareFunc ];
							}
						}
						if (typeof fields[ i ].compareFunc !== "function") {
							fields[ i ].compareFunc = this._compareValues;
						}
					}
					/* M.H. 14 Oct 2013 Fix for bug #154649: Rows are grouped incorrectly when applying and removing a filter if a filter is applied by default through code
					when ds is local and if the whole dataSource is not sorted but only dataView then on filtering data when groupby is applied grouping wouldn't be correct.
					GroupBy takes the data(not sorted) from dataSource which is not sorted and apply filtering...*/
					this._allDataSorted = (data === this.data());
					if (data.length > 1) {
						/* check if a custom compare function is set */
						if ($.type(s.compareFunc) === "function") {
							data.sort(s.compareFunc(fields,
									this.settings.schema,
									direction.toLowerCase().startsWith("asc") ? false : true,
									convertFunc));
						} else {
							data = this._sortDataRecursive(data, fields, 0, direction, convertFunc);
						}
					}
				}
			}
			if (isGb) {
				this._generateGroupByData(data, fields);
			}
			/* now if paging is enabled, and "applyToAllData" is true, we need to re-initialize the dataView */
			if (resetPaging && p.type === "local") {
				/* DAY 2/15/12 101818- when filtering, need to set the filtered data, not _data */
				this._page();
			} else {
				/* A.T. 14 Feb 2011 - fix for bug #66214 */
				this._dataView = data;
			}
			/* M.H. 17 April 2012 Fix for bug #109475 */
			this._populateTransformedData(data);
			return this; // preserve chaining
		},
		clearLocalSorting: function () {
			/* This clears local sorting applied to the data view by resetting it to the original data and applying any paging
			```
				ds.clearLocalSorting();
			```
			*/
			var s = this.settings.sorting, p = this.settings.paging, data, resetPaging = false;

			if (s.applyToAllData && s.type === "local") {
				if (this._filter && ((p.type === "local" && p.enabled === true) || p.enabled === false)) {
					data = this._filteredData;
				} else {
					data = this.data();
				}
				resetPaging = true;
			} else {
				data = this.dataView();
			}
			/* now if paging is enabled, and "applyToAllData" is true, we need to re-initialize the dataView */
			if (resetPaging && p.type === "local") {
				/* DAY 2/15/12 101818- when filtering, need to set the filtered data, not _data */
				if (!this._filter) {
					this._data = data;
				} else {
					this._filteredData = data;
				}
				this._page();
			} else {
				this._dataView = data;
			}
			this._populateTransformedData();
			return this; // preserve chaining
		},
		/* expected format is "col1 ASC, col2 DESC, col3 ASC" ... and so on */
		_parseSortExpressions: function (s) {
			var fields = [], tmp, tmp2, i;
			tmp = s.split(",");

			for (i = 0; i < tmp.length; i++) {
				fields[ i ] = {};
				tmp2 = $.trim(tmp[ i ]).split(" ");
				fields[ i ].fieldName = tmp2[ 0 ];
				fields[ i ].dir = tmp2[ 1 ];
			}

			return fields;
		},
		/* this is used when sorting data
		type can be "string", "number", "boolean", "date".
		Other values are ignored and default conversion is used
		_convertf: function (val, type) {
		not necessary for now. default type conversion happens in the data source directly
		},*/
		/* same regarding multi-col. filtering: rowFilter (ref: DataTable).
		example: [{fieldName : "firstName", expr: "abc", cond: "StartsWith"}, {fieldName : "lastName"}]
		example 2: [{fieldIndex : 1} , {fieldIndex : 2, expr: "a", cond : "Contains"}]
		expr is the filter expression text , such as "abc", or a regular expression such as *test*
		cond is the filtering condition such as StartsWith, EndsWith, Contains, Equals, DoesNotEqual, DoesNotContain
		if expr is detected to be a regular expression, the "cond" part is skipped */
		filter: function (fieldExpressions, boolLogic, keepFilterState, fieldExpressionsOnStrings) {
			/* filters the data source locally. Remote filtering can be performed by just calling dataBind() and
			setting the settings.filtering.expressions. The result (filtered data) can be obtained by calling dataView()
			example: [{fieldName : "firstName", expr: "abc", cond: "StartsWith"}, {fieldName : "lastName"}]
			example 2: [{fieldIndex : 1} , {fieldIndex : 2, expr: "a", cond : "contains"}]
			expr is the filter expression text , such as "abc", or a regular expression such as *test*
			cond is the filtering condition such as startsWith, endsWith, contains, equals, doesNotEqual, doesNotContain
			if expr is detected to be a regular expression, the "cond" part is skipped

			```
				ds = new $.%%WidgetName%%({
					type: "json",
					dataSource: adventureWorks,
					schema: jsonSchema
				});
				ds.dataBind();

				ds.filter([{fieldName : "Color", expr: "Red", cond: "Equals"}], "AND", true);
			```

			paramType="object" a list of field expression definitions
			paramType="AND|OR" boolean logic. Accepted values are AND and OR.
			paramType="bool" if keepFilterState is set to true, it will not discard previous filtering expressions
			paramType="object" a list of field expression definitions (or a string with the conditions separated by AND/OR operator, example: "ID = 1 OR ID = 2"), which when applied will threat the related field as if it's string and can only apply conditions valid for string types.
			*/
			var i, j, expr = null, count = 0, skipRec = false, data, t, k, schema,
				fields, field, tmpbool, resetPaging, allFieldsExpr,
				f = this.settings.filtering, p = this.settings.paging, s = this.settings.sorting;
			this._clearGroupByData();
			schema = this.schema();
			if (schema === null || schema === undefined) {
				throw new Error($.ig.DataSourceLocale.locale.filteringNoSchema);
			}
			if ($.type(fieldExpressions) === "string") {
				expr = fieldExpressions;
			}
			if ($.type(fieldExpressionsOnStrings) === "string") {
				allFieldsExpr = fieldExpressionsOnStrings;
			} else if ($.type(fieldExpressionsOnStrings) === "undefined") {
				fieldExpressionsOnStrings = [];
			}
			if ($.type(fieldExpressions) === "array" &&
				fieldExpressions.length === 0 &&
				$.type(fieldExpressionsOnStrings) === "array" &&
				fieldExpressionsOnStrings.length === 0) {
				return;
			}
			if (f.applyToAllData && f.type === "local") {
				data = this.data();
				resetPaging = true;
			} else {
				/* cache the original dataView */
				if (this._cachedDataView && this._cachedDataView.length > 0) {
					//data = this.dataView();
					data = this._cachedDataView;
				} else {
					// COPY the this.dataView() in this._cachedDataView; this is necessary because we want to restore it later on
					//this._cachedDataView = $.extend(true, {}, this.dataView());
					this._cachedDataView = $.merge([], this.dataView());
					data = this._cachedDataView;
				}
			}
			if ($.type(f.customFunc) === "function") {
				/* call the function, passing the filterExpression object which contains field names/indices,
				the current expression for the field, as well as condition for the field */
				data = f.customFunc(fieldExpressions, data);
				/* A.T. fix for bug #77646 */
				this._filteredData = data;
				/* A.T. 20 Dec. 2011 Fix for bug #96819 - igDataSource filtering feature
				with own defined custom function does not filtering data */
				this._dataView = [];
			} else {
				// re-initialize the dataView. We can do that safely, since data will either be cached, or will be stored in this.data(), meaning that will be the whole ds
				this._dataView = [];
				this._filteredData = [];
				/* filter "data"
				we will store all results in tmpData, and then assign it to the dataView. please ensure that */
				for (i = 0; i < data.length; i++) {
					skipRec = false;
					if (expr) {
						fieldExpressions = this._parseFilterExprString(expr);
					}
					if (allFieldsExpr) {
						fieldExpressionsOnStrings = this._parseFilterExprString(allFieldsExpr);
					}
					for (j = 0; j < fieldExpressions.length; j++) {
						/* if there is no match, break, we aren't going to add the record to the resulting data view.
						the default boolean logic is to "AND" the fields */
						fields = schema.fields();
						if (fieldExpressions[ j ].fieldIndex !== undefined  &&
							fieldExpressions[ j ].fieldIndex < fields.length) {
							field = fields[ fieldExpressions[ j ].fieldIndex ];
							t = field.type;
							skipRec = !this._findMatch(data[ i ][ field.name ],
														fieldExpressions[ j ].expr,
														t, !f.caseSensitive, fieldExpressions[ j ].cond,
														fieldExpressions[ j ].preciseDateFormat,
														field.name, data[ i ]);
						} else {
							/* M.H. 10 Sep 2012 Fix for bug #120759 */
							if (fieldExpressions[ j ].dataType !== undefined &&
								fieldExpressions[ j ].dataType !== null) {
								t = fieldExpressions[ j ].dataType;
							} else {
								t = this._getFieldTypeFromSchema(fieldExpressions[ j ].fieldName);
							}
							skipRec = !this._findMatch(data[ i ][ fieldExpressions[ j ].fieldName ],
														fieldExpressions[ j ].expr, t, !f.caseSensitive,
														fieldExpressions[ j ].cond,
														fieldExpressions[ j ].preciseDateFormat,
														fieldExpressions[ j ].fieldName, data[ i ]);
						}
						tmpbool = (fieldExpressions[ j ].logic !== null &&
							fieldExpressions[ j ].logic !== undefined &&
							(fieldExpressions[ j ].logic.toLowerCase() === "or" ||
							fieldExpressions[ j ].logic.toLowerCase() === "and")) ?
							fieldExpressions[ j ].logic : boolLogic;
						/* A.T. 18 Jan. 2011 fix for bug 62126 -
						igDataSource local filtering expressions: the OR operator does not work */
						if (tmpbool === undefined || tmpbool === null || $.type(tmpbool) !== "string") {
							tmpbool = "and";
						}
						if (skipRec && tmpbool.toLowerCase() === "and") {
							break;
						} else if (!skipRec && tmpbool.toLowerCase() === "or") {
							break;
						}
					}
					if (!skipRec) {
						for (j = 0; j < fieldExpressionsOnStrings.length; j++) {
							// if there is no match, break, we aren't going to add the record to the resulting data view.
							// the default boolean logic is to "AND" the fields
							fields = schema.fields();
							t = undefined;
							if (fieldExpressionsOnStrings[ j ].fieldIndex) {
								if (fieldExpressionsOnStrings[ j ].fieldIndex < fields.length) {
									t = fields[ fieldExpressionsOnStrings[ j ].fieldIndex ].type;
								}
								skipRec = !this._findMatch(data[ i ][ fieldExpressionsOnStrings[ j ].fieldIndex ],
															fieldExpressionsOnStrings[ j ].expr,
															"string",
															!f.caseSensitive,
															fieldExpressionsOnStrings[ j ].cond,
															fieldExpressionsOnStrings[ j ].preciseDateFormat,
															fieldExpressionsOnStrings[ j ].fieldName, data[ i ]);
							} else {
								for (k = 0; k < fields.length; k++) {
									if (fields[ k ].name === fieldExpressionsOnStrings[ j ].fieldName) {
										t = fields[ k ].type;
										break;
									}
								}
								skipRec = !this._findMatch(data[ i ][ fieldExpressionsOnStrings[ j ].fieldName ],
														fieldExpressionsOnStrings[ j ].expr,
														"string",
														!f.caseSensitive,
														fieldExpressionsOnStrings[ j ].cond,
														fieldExpressionsOnStrings[ j ].preciseDateFormat,
														fieldExpressionsOnStrings[ j ].fieldName, data[ i ]);
							}
							tmpbool = (fieldExpressionsOnStrings[ j ].logic !== null &&
								fieldExpressionsOnStrings[ j ].logic !== undefined &&
								(fieldExpressionsOnStrings[ j ].logic.toLowerCase() === "or" ||
								fieldExpressionsOnStrings[ j ].logic.toLowerCase() === "and")) ?
								fieldExpressionsOnStrings[ j ].logic : boolLogic;
							/* A.T. 18 Jan. 2011 fix for bug 62126 -
							igDataSource local filtering expressions: the OR operator does not work */
							if (tmpbool === undefined || tmpbool === null || $.type(tmpbool) !== "string") {
								tmpbool = "and";
							}
							if (skipRec && tmpbool.toLowerCase() === "and") {
								break;
							} else if (!skipRec && tmpbool.toLowerCase() === "or") {
								break;
							}
						}
					}
					if (!skipRec) {
						this._filteredData[ count++ ] = data[ i ];
					}
				}
			}
			this._filter = true;
			if (f.type === "local" && s.type === "local" &&
				s.enabled && s.expressions.length > 0) {
				this.sort(s.expressions);
			}
			if (resetPaging && p.type === "local" && p.enabled === true) {
				// reset paging
				// M.H. 21 Oct 2014 Fix for bug #181395: When filtering is applied selected page is not persisted.
				// Do not reset paging if persistedPageIndex is set and is greater than 0.
				if (this.persistedPageIndex() > 0) {
					this.settings.paging.pageIndex = this.persistedPageIndex();
				} else {
					this.settings.paging.pageIndex = 0;
				}
				this.pageSizeDirty(true);
				this._page();
				/* M.H. 21 Oct 2014 Fix for bug #181395: When filtering is applied selected page is not persisted. */
				this.persistedPageIndex(null);
			} else if (!this._vgbData || !this._vgbData.length) {
				if (this.isGroupByApplied()) {
					this._generateGroupByData(this._filteredData, s.expressions);
				}
				for (i = 0; i < this._filteredData.length; i++) {
					this._dataView[ i ] = this._filteredData[ i ];
				}
			}
			this._populateTransformedData(this._filteredData);
			return this; // preserve chaining
		},
		clearLocalFilter: function () {
			/* This clears local filtering applied to the data view by resetting it to the original data and applying any paging
			```
				ds.clearLocalFilter();
			```
			*/
			var i, data, resetPaging, sa = false,
				f = this.settings.filtering, p = this.settings.paging, s = this.settings.sorting;
			this._clearGroupByData();
			if (f.applyToAllData && f.type === "local") {
				data = this.data();
				resetPaging = true;
			} else {
				// cache the original dataView
				if (this._cachedDataView && this._cachedDataView.length > 0) {
					//data = this.dataView();
					data = this._cachedDataView;
				} else {
					// COPY the this.dataView() in this._cachedDataView; this is necessary because we want to restore it later on
					//this._cachedDataView = $.extend(true, {}, this.dataView());
					this._cachedDataView = $.merge([], this.dataView());
					data = this._cachedDataView;
				}
			}
			this._dataView = [];
			this._filteredData = data;
			/* M.H. 11 Nov 2014 Fix for bug #178032: When filter field, then apply
			sorting and change filtering condition filtered data is not sorted */
			if (s.type === "local" && s.enabled && s.expressions.length > 0) {
				this.sort(s.expressions);
				sa = true;
			}
			if (resetPaging && p.type === "local" && p.enabled === true) {
				this._filter = true;
				/* reset paging */
				this.settings.paging.pageIndex = 0;
				this.pageSizeDirty(true);
				this._page();
			} else {
				if (p.enabled === false) {
					this._filter = true;
				}
				if (!sa) {
					if (this.isGroupByApplied()) {
						this._generateGroupByData(this._filteredData, s.expressions);
					}
					for (i = 0; i < this._filteredData.length; i++) {
						this._dataView[ i ] = this._filteredData[ i ];
					}
				}
			}
			this._populateTransformedData(this._filteredData);
			return this; // preserve chaining
		},
		_parseFilterExprString: function (expr) {
			//A.T. 18 Jan 2011 - fix for bug #62418
			var exprs = $.trim(expr).split(/(?=AND+)|(?=OR+)/i), i, j, fields = [], tmp, tmp2, isInvalid = true;
			for (i = 0; i < exprs.length; i++) {
				fields[ i ] = {};
				/* A.T. 18 Jan 2011 -  Fix for bug #62415 - equality sign (=) is not parsed when in a filtering expression string */
				/* A.T. 19 Jan 2011 - removing (IN) operator. (bug #62365) */
				tmp = $.trim(exprs[ i ]).split(/(?= \=+)|(?=<>+)|(?=>+)|(?=<+)|(?=LIKE+)|(?=NOT\WLIKE)+|(?=>\=+)|(?=<\=+)/);
				if ($.trim(exprs[ i ]).toLowerCase().startsWith("and")) {
					fields[ i ].logic = "AND";
					/* strip AND
					tmp[0] = tmp[0].substring(tmp.indexOf(3)); */
				} else if ($.trim(exprs[ i ]).toLowerCase().startsWith("or")) {
					fields[ i ].logic = "OR";
					/* strip OR
					tmp[0] = tmp[0].substring(tmp.indexOf(2)); */
				}
				/* the current logic field is always for the previous term */
				if (i > 0 && (fields[ i ].logic === "AND" || fields[ i ].logic === "OR")) {
					fields[ i - 1 ].logic = fields[ i ].logic;
				}
				if (tmp[ 0 ].toLowerCase().startsWith("and") || tmp[ 0 ].toLowerCase().startsWith("or")) {
					fields[ i ].fieldName = $.trim(tmp[ 0 ].split(" ")[ 1 ]);
				} else {
					fields[ i ].fieldName = $.trim(tmp[ 0 ]);
				}
				tmp2 = $.trim(tmp[ 1 ]).split(" ");
				/* fix ambiguous matching between <, >, and <> */
				if (exprs[ i ].indexOf("<>") !== -1) {
					tmp2[ 0 ] = "<>";
					tmp2[ 1 ] = tmp[ 2 ].replace(">", "");
				}
				/* A.T. 19 Jan 2011 - Fix for bug #62368 - igDataSource -
				Space character handling in filtering string expressions */
				if (tmp2.length > 2) {
					// merge all entries from index one to the end into a single string
					for (j = 2; j < tmp2.length; j++) {
						tmp2[ 1 ] = tmp2[ 1 ] + " " + tmp2[ j ];
					}
					tmp2 = [ tmp2[ 0 ], tmp2[ 1 ] ];
				}
				if (tmp[ 1 ].startsWith("NOT")) {
					fields[ i ].expr = $.trim(tmp[ 2 ].replace("LIKE", ""));
				} else {
					fields[ i ].expr = tmp2[ 1 ];
				}
				/* validate field */
				for (j = 0; j < this.schema().schema.fields.length; j++) {
					if (this.schema().schema.fields[ j ].name === fields[ i ].fieldName) {
						isInvalid = false;
						break;
					}
				}
				if (isInvalid) {
					/* A.T. 18 Jan 2011 - fix for bug 62406 - filtering
					expression string fallback scenario should return an error */
					throw new Error($.ig.DataSourceLocale.locale.fieldMismatch + fields[ i ].fieldName);
				}
				isInvalid = true;
				if (tmp2[ 0 ] === ">") {
					fields[ i ].cond = "greaterThan";
				} else if (tmp2[ 0 ] === "LIKE") {
					if (fields[ i ].expr.startsWith("%") && fields[ i ].expr.endsWith("%")) {
						fields[ i ].cond = "contains";
					} else if (fields[ i ].expr.endsWith("%")) {
						fields[ i ].cond = "startsWith";
					} else if (fields[ i ].expr.startsWith("%")) {
						fields[ i ].cond = "endsWith";
					} else {
						fields[ i ].cond = "equals";
					}
					/* A.T. 18 Jan 2011 - Fix for bug #62355 the LIKE operator does not
					work as substitute for the Contains local filtering condition */
					fields[ i ].expr = fields[ i ].expr.replace(/%/g, "");
				} else if (tmp2[ 0 ] === "NOT LIKE" || tmp2[ 0 ] === "NOT") {

					if (fields[ i ].expr.startsWith("%") && fields[ i ].expr.endsWith("%")) {
						fields[ i ].cond = "doesNotContain";
						/*} else if (fields[i].expr.endsWith("%")) {
							fields[i].cond = "startsWith";
						} else if (fields[i].expr.startsWith("%")) {
							fields[i].cond = "endsWith"; */
					} else {
						fields[ i ].cond = "doesNotEqual";
					}
					fields[ i ].expr = fields[ i ].expr.replace(/%/g, "");
				} else if (tmp2[ 0 ] === "=") {
					fields[ i ].cond = "equals";
				} else if (tmp2[ 0 ] === "<>") {
					fields[ i ].cond = "doesNotEqual";
				} else if (tmp2[ 0 ] === "<") {
					fields[ i ].cond = "lessThan";
				} else if (tmp2[ 0 ] === "<=") {
					fields[ i ].cond = "lessThanOrEqualTo";
				} else if (tmp2[ 0 ] === ">=") {
					fields[ i ].cond = "greaterThanOrEqualTo";
				} else {
					/* A.T. 18 Jan 2011 - fix for bug 62406 - filtering expression
					string fallback scenario should return an error */
					throw new Error($.ig.DataSourceLocale.locale.unrecognizedCondition + expr);
					/* fallback
					fields[i].cond = "Contains"; */
				}
			}
			return fields;
		},
		_isFilteringExprNotReq: function (cond) {
			/* returns whether filtering expression is NOT required
			paramType="string" filtering condition
			returnType="bool"
			*/
			return cond === "false" || cond === "true" ||
				cond === "today" ||
				cond === "yesterday" || cond === "thisMonth" ||
				cond === "lastMonth" || cond === "nextMonth" ||
				cond === "thisYear" || cond === "lastYear" ||
				cond === "nextYear" || cond === "null" ||
				cond === "notNull" || cond === "empty" ||
				cond === "notEmpty";
		},
		/* think about passing the type directly as parameter, to avoid performance parsing overhead */
		_findMatch: function (val, expr, t, ignoreCase, cond, preciseDateFormat, colKey, rec) {
			// if the filter condition is one of the below ones, we do not require a filter expression to be set
			var tmpExpr, custConds = this.settings.filtering.customConditions, f, func,
				exprNotReq = this._isFilteringExprNotReq(cond);

			val = this.getCellValue(colKey, rec);
			/* N.A. 2/27/2015 Task #188905: If val is observable, unwrap it. */
			if ($.type(val) === "function") {
				val = val();
			}
			if (custConds &&
					(f = (custConds[ cond ] || custConds[ colKey + "_" + cond ]))) {
				func = f.filterFunc;
				if ($.type(func) === "function") {
					f = func;
				} else if (window[ func ] && typeof window[ func ] === "function") {
					f = window[ func ];
				} else {
					throw new Error($.ig.DataSourceLocale.locale.errorUnexpectedCustomFilterFunction);
				}
				return f(val, expr, t, ignoreCase, preciseDateFormat, colKey);
			}
			/* no filter, therefore everything matches OK */
			if (expr === "" && !exprNotReq) {
				return true;
			}

			tmpExpr = $.trim(expr);
			/*if (t === null || t === undefined) {
				t = $.type(expr);
			} */
			if (t === "regexp" || (t === "string" && tmpExpr.startsWith("/") && tmpExpr.endsWith("/"))) {
				if (t === "regexp") {
					return this._findRegExpMatch(val, expr, false);
				}
				return this._findRegExpMatch(val, tmpExpr.substring(1, tmpExpr.length - 1), true);
			}
			if (($.type(val) === "date" && (t === undefined || t === null)) || t === "date") {
				// parse expr
				try {
					expr = this._parser.toDate(expr);
				} catch (ignore) {
					/* log error that expr could not be converted */
				}
				return this._findDateMatch(val, expr, cond, preciseDateFormat);
			}
			if (($.type(val) === "boolean" && (t === undefined || t === null)) ||
				(t === "boolean" || t === "bool")) {
				return this._findBoolMatch(val, cond);
			}
			if (($.type(val) === "number" && (t === undefined || t === null)) || t === "number") {
				return this._findNumericMatch(val, expr, cond);
			}
			return this._findStringMatch(val, expr, ignoreCase, cond);
		},
		_findStringMatch: function (val, expr, ignoreCase, cond) {
			var localVal;
			if (val !== null && val !== undefined) {
				// M.H. 16 Jan 2014 Fix for bug #161880: When localSchemaTransform is false and column data Type is not set filtering throws error when used data record value different from string
				localVal = ignoreCase ? val.toString().toLowerCase() : val || "";
			} else {
				localVal = val;
			}
			if (expr !== null && expr !== undefined) {
				/* VS 09/15/2012 Bug 120973 val can be null and type-detection in _findMatch fails */
				expr = ignoreCase ? expr.toString().toLowerCase() : expr.toString();
			}
			/* check if expr is a regular expression */
			if (cond === "startsWith") {
				return localVal !== null && localVal !== undefined && localVal.startsWith(expr);
			}
			if (cond === "endsWith") {
				return localVal !== null && localVal !== undefined && localVal.endsWith(expr);
			}
			if (cond === "contains") {
				return localVal !== null && localVal !== undefined && localVal.indexOf(expr) !== -1;
			}
			if (cond === "doesNotContain") {
				return localVal !== null && localVal !== undefined && localVal.indexOf(expr) === -1;
			}
			if (cond === "equals") {
				return localVal !== null && localVal !== undefined && localVal === expr;
			}
			if (cond === "doesNotEqual") {
				return localVal !== null && localVal !== undefined && localVal !== expr;
			}
			if (cond === "null") {
				return localVal === null;
			}
			if (cond === "notNull") {
				return localVal !== null;
			}
			if (cond === "empty") {
				return localVal === null || localVal === undefined || localVal.length === 0;
			}
			if (cond === "notEmpty") {
				return localVal === null || localVal === undefined || localVal.length !== 0;
			}
			throw new Error($.ig.DataSourceLocale.locale.errorUnrecognizedFilterCondition + cond);
			/* return false; */
		},
		_findRegExpMatch: function (val, expr, str) {
			if (str) {
				return (new RegExp(expr)).test(val);
			}
			return val.match(expr);
		},
		/* Equals, DoesNotEqual, GreaterThan, LessThan, GreaterThanOrEqualTo, LEssThanOrEqualTo */
		_findNumericMatch: function (val, expr, cond) {
			// if expr is not numeric, convert it
			if ($.type(expr) !== "number") {
				expr = this._parser.toNumber(expr);
			}
			if (cond === "equals") {
				return val === expr;
			}
			if (cond === "doesNotEqual") {
				return val !== expr;
			}
			if (cond === "greaterThan") {
				return val > expr;
			}
			if (cond === "lessThan") {
				return val < expr;
			}
			if (cond === "greaterThanOrEqualTo") {
				return val >= expr;
			}
			if (cond === "lessThanOrEqualTo") {
				return val <= expr;
			}
			if (cond === "null") {
				return val === null;
			}
			if (cond === "notNull") {
				return val !== null;
				/* A.T. 14 Feb 2011 - Fix for bug #64156 */
			}
			if (cond === "empty") {
				return (val === null || val === undefined || isNaN(val));
			}
			if (cond === "notEmpty") {
				return (val !== null && val !== undefined && !isNaN(val));
			}
			throw new Error($.ig.DataSourceLocale.locale.errorUnrecognizedFilterCondition + cond);
		},
		/* True or False */
		_findBoolMatch: function (val, cond) {
			if (cond === "true") {
				return val;
			}
			if (cond === "false") {
				return !val;
			}
			if (cond === "null") {
				return val === null;
			}
			if (cond === "notNull") {
				return val !== null;
			}
			if (cond === "empty") {
				return (val === null || val === undefined);
			}
			if (cond === "notEmpty") {
				return (val !== null && val !== undefined);
			}
			throw new Error($.ig.DataSourceLocale.locale.errorUnrecognizedFilterCondition + cond);
		},
		_getDateParts: function (date) {
			// returns object containing parts of the data like year, month, day, hours, etc.
			// if enableUTCDates is true then returns UTC representation of the date object
			if (!date || $.type(date) !== "date") {
				return null;
			}
			var yrs, day, mdate, mins, hrs, month;
			if (this.settings.enableUTCDates) {
				yrs = date.getUTCFullYear();
				month = date.getUTCMonth();
				day = date.getUTCDay();
				mdate = date.getUTCDate();
				hrs = date.getUTCHours();
				mins = date.getUTCMinutes();
			} else {
				yrs = date.getFullYear();
				month = date.getMonth();
				day = date.getDay();
				mdate = date.getDate();
				hrs = date.getHours();
				mins = date.getMinutes();
			}
			/* return object with properties date parts - year, month, day, etc. */
			return {
				year: yrs,
				month: month,
				day: day,
				mdate: mdate,
				hours: hrs,
				mins: mins
			};
		},
		/* Equals, DoesNotEqual, Before, After, Today, Yesterday, ThisMonth, LastMonth, NextMonth, ThisYear, LastYear, NextYear, ThisQuarter, LastQuarter, NextQuarter
		the expected types are both Date for both val and expr. */
		_findDateMatch: function (val, expr, cond, preciseDateFormat) {
			var day1, mins1, hs1, yrs1, day2, mins2, hs2, yrs2, month1, month2, eq, cur,
				yrs3, month3, mday1, mday2, mday3, yesterday, onEq, valDateParts, exprDateParts;
			/* 1. get the "expr" date and divide it into year, month, quarter, day, week, etc. */
			if (val !== null && val !== undefined) {
				/* M.H. 18 August 2015 Fix for bug 204834: Filter by condition:
				"Today" is not working properly when "enableUTCDates" is set to true */
				valDateParts = this._getDateParts(val);
				day1 = valDateParts.day;
				mday1 = valDateParts.mdate;
				mins1 = valDateParts.mins;
				hs1 = valDateParts.hours;
				yrs1 = valDateParts.year;
				month1 = valDateParts.month;
			}
			if ($.type(expr) === "date") {
				exprDateParts = this._getDateParts(expr);
				day2 = exprDateParts.day;
				mday2 = exprDateParts.mdate;
				mins2 = exprDateParts.mins;
				hs2 = exprDateParts.hours;
				yrs2 = exprDateParts.year;
				month2 = exprDateParts.month;
			} else {
				expr = new Date(expr);
			}
			/* current time */
			cur = new Date();
			yesterday = new Date(cur.getTime());
			yesterday.setDate(yesterday.getDate() - 1);
			mday3 = cur.getDate();
			yrs3 = cur.getFullYear();
			month3 = cur.getMonth();
			eq = day1 === day2 && mins1 === mins2 && hs1 === hs2 && yrs1 === yrs2 && month1 === month2;
			/* now compare */
			if (cond === "equals") {
				return eq;
			}
			if (cond === "doesNotEqual") {
				return !eq;
			}
			if (cond === "before") {
				return val < expr;
			}
			if (cond === "after") {
				return val > expr;
			}
			if (cond === "today") {
				return mday1 === mday3 && month1 === month3 && yrs1 === yrs3;
			}
			if (cond === "yesterday") {
				/*L.A. 29 January 2013 - Fixing bug #131649
				Filtering condition yesterday is not working correctly
				handle month and year boundaries */
				/* M.K. 4/2/2015 Fix for bug 192157: Uncaught TypeError is thrown on "Yesterday" condition is selected. */
				/* M.H. 18 August 2015 Fix for bug 204814: "Yesterday" and "Today" filters are not working for local data source
				it should be taken getDate() NOT getDay() */
				return yesterday.getDate() === mday1 &&
					yesterday.getMonth() === month1 &&
					yesterday.getFullYear() === yrs1;
			}
			if (cond === "thisMonth") {
				return month1 === month3 && yrs1 === yrs3;
			}
			if (cond === "lastMonth") {
				//A.T. 18 Jan 2011 - Fix for bug #62354 - igDataSource LastMonth and NextMonth local filtering doesn't work properly
				// first month of the year special case
				if (month3 === 0) {
					return month1 === 11 && yrs1 === yrs3 - 1;
				}
				return month1 === month3 - 1 && yrs1 === yrs3;
			}
			if (cond === "nextMonth") {
				//A.T. 18 Jan 2011 - Fix for bug #62354 - igDataSource LastMonth and NextMonth local filtering doesn't work properly
				// last month of the year special case
				if (month3 === 11) {
					return month1 === 0 && yrs1 === yrs3 + 1;
				}
				return month1 === month3 + 1 && yrs1 === yrs3;
			}
			if (cond === "thisYear") {
				return yrs1 === yrs3;
			}
			if (cond === "lastYear") {
				return yrs1 === yrs3 - 1;
			}
			if (cond === "nextYear") {
				return yrs1 === yrs3 + 1;
			}
			if (cond === "on" || cond === "notOn") {
				onEq = (yrs1 === yrs2 && month1 === month2 && mday1 === mday2);
				if (preciseDateFormat) {
					// test minutes
					if (preciseDateFormat.indexOf("m") >= 0) {
						onEq = onEq && (mins1 === mins2);
					}
					if (preciseDateFormat.indexOf("h") >= 0 || preciseDateFormat.indexOf("H") >= 0) {
						onEq = onEq && (hs1 === hs2);
					}
					if (preciseDateFormat.indexOf("s") >= 0) {
						onEq = onEq && (val.getSeconds() === expr.getSeconds());
					}
					if (preciseDateFormat.indexOf("f") >= 0) {
						onEq = onEq && (val.getMilliseconds() === expr.getMilliseconds());
					}
				}
				if (cond === "on") {
					return onEq;
				}
				return !onEq;
			}
			if (cond === "null") {
				return val === null;
			}
			if (cond === "notNull") {
				return val !== null;
				/* A.T. 14 Feb 2011 - fix for bug #64465 */
			}
			if (cond === "empty") {
				return (val === null || val === undefined);
			}
			if (cond === "notEmpty") {
				return (val !== null && val !== undefined);
			}
			throw new Error($.ig.DataSourceLocale.locale.errorUnrecognizedFilterCondition + cond);
		},
		/*
		clearFilter: function (fields) {
		// clears the filters, and rebinds the data so that there is no filtering applied on the dataView instance
		return this; // preserve chaining
		},
		clearFilters: function () {
		// clears all filters
		},
		*/
		/* return 1 even if records count is 0. */
		totalRecordsCount: function (count, key, dsObj, context) {
			/* Applicable only when the data source is bound to remote data.
			Gets / sets the total number of records in the data source.
			If data binding is remote, and there's paging or filtering enabled,
			the actual total number of records may not
			match the number of records that exists on the client
			```
				ds = new $.%%WidgetName%%({
					callback:render,
					dataSource: "/demos/server/server.php",
					responseDataKey: "records",
				}).dataBind();

				//Get
				var count = ds.totalRecordsCount();

				//Set
				ds.totalRecordsCount(42);
			```
			paramType="number" optional="true" the total number of records
			returnType="number" Returns total records count of the current dasource instance
			*/
			var rec, totalRecPath, i;
			if (context !== undefined && context !== null) {
				if (key) {
					rec = dsObj;
					if (rec.hasOwnProperty(key)) {
						rec = rec[ key ];
					} else {
						totalRecPath = key.split(".");
						for (i = 0; i < totalRecPath.length; i++) {
							rec = rec[ totalRecPath[ i ] ];
						}
					}
					if (dsObj && rec !== undefined && rec !== null) {
						if ($.type(rec) === "number") {
							this._recCount = rec;
						} else {
							// try parse
							this._recCount = parseInt(rec, 10);
						}
						this.hasTotalRecordsCount(true);
					} else {
						this.hasTotalRecordsCount(false);
					}
				} else {
					this.hasTotalRecordsCount(false);
				}
			} else if (count !== undefined && count !== null) {
				this._recCount = count;
			}
			return this._recCount;
		},
		hasTotalRecordsCount: function (hasCount) {
			/* gets / sets if the response from the server contains a property which specifies the total number of records in the server-side backend
			```
				var ds;
				$(window).load(function () {
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp",
						primaryKey: "Name"
					});
					ds.dataBind();
					// Get
					var hasTotalRecords = ds.hasTotalRecordsCount();

					// Set
					ds.hasTotalRecordsCount(true);
				});
			```
			paramType="bool" specifies if the data source contains a property that denotes the total number of records in the server-side backend
			*/
			if (hasCount === undefined || hasCount === null) {
				return this._hasCount;
			}
			this._hasCount = hasCount;
		},
		metadata: function (key) {
			/* returns metadata object for the specified key
			```
				var ds;

				var render = function (success, error) {
					if (success) {
						var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
						resultHtml = $.ig.tmpl(template, ds.dataView());
						$("#table").html(resultHtml);
					} else {
						alert(error);
					}
				}

				$(window).load(function () {
					var url = "http://services.odata.org/OData/OData.svc/Products?$format=json&$callback=?";
					ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: url,
						schema: {
							fields: [{
								name: "Name"
							}, {
								name: "Price"
							}, {
								name: "Rating"
							}],
							searchField: "d"
						},
						responseDataKey: "d",
						responseDataType: "jsonp",
						primaryKey: "Name"
					});
					ds.dataBind();

					var metadata = ds.metadata();

				});
			```
			paramType="string" Primary key of the record
			returnType="object" metadata object
			*/

			// M.H. 24 Nov. 2011 Fix for bug 96603 - when metadata is undefined or null it should be returned otherwise it will be returned js error
			if (key === null || key === undefined || key === "" ||
					this._metadata === null || this._metadata === undefined) {
				return this._metadata;
			}

			return this._metadata[ key ];
		},
		totalLocalRecordsCount: function () {
			/* returns the total number of records in the local data source
			```
				ds = new $.%%WidgetName%%({
					callback:render,
					dataSource: "/demos/server/server.php",
					responseDataKey: "records",
				}).dataBind();

				var count = ds.totalLocalRecordsCount();
			```
			returnType="number" the number of records that are bound / exist locally
			*/
			if (this.isGroupByApplied() && this._vgbData &&
				this.settings.groupby.pagingMode === "allRecords") {
				return this._vgbData.length;
			}
			if (!this._filter) {
				return this._data.length;
			}
			return this._dataView.length;
		},
		pageCount: function () {
			/* returns the total number of pages
			```
				ds = new $.%%WidgetName%%({
					type: "json",
					dataSource: adventureWorks,
					paging: {
						enabled : true,
						pageSize:10,
						type: "local"
					}
				});

				var count = ds.pageCount();
			```
			returnType="number" total number of pages
			*/
			var c, realCount;
			if (this.isGroupByApplied() && this._vgbData &&
				this.settings.groupby.pagingMode === "allRecords") {
				realCount = this._vgbData.length;
			} else if (!this._filter) {
				realCount = this.totalRecordsCount() > 0 ? this.totalRecordsCount() : this._data.length;
			} else {
				realCount = this.totalRecordsCount() > 0 ? this.totalRecordsCount() : this._filteredData.length;
			}
			c = Math.ceil(realCount / this.settings.paging.pageSize);
			return c === 0 ? 1 : c;
		},
		pageIndex: function (index) {
			/* gets /sets the current page index. If an index is passed as a parameter, the data source is re-bound.
			```
				ds = new $.%%WidgetName%%({
					type: "json",
					dataSource: adventureWorks,
					paging: {
						enabled : true,
						pageSize:10,
						type: "local"
					}
				});

				//Get
				var currentIndex = ds.pageIndex();

				//Set
				ds.pageIndex(5);
			```
			paramType="number" optional="true" the page index. If none is specified, returns the current page index.
			returnType="number" the current page index
			*/
			if (index === undefined || index === null) {
				//return this._pageIndex;
				return this.settings.paging.pageIndex === undefined ? 0 : this.settings.paging.pageIndex;
			}
			/* this._pageIndex = index; */
			/* A.T. 18 Jan 2011 - Fix for bug #63149 - igDataSource - page content is erratic after changing page size */
			this.settings.paging.pageIndex = parseInt(index, 10);
			this._cachedDataView = null;
			if (this.settings.paging.type === "local") {
				this._page(this.settings.paging.appendPage);
				this._invokeCallback();
			} else {
				this.dataBind();
			}
			return this;
		},
		persistedPageIndex: function (value) {
			/* gets /sets the page index that should be persisted. For now ONLY when filtering is applied and call explicitly DataBind.
			paramType="number" optional="true" the page index that should be persisted. If none is specified, returns the current page index that should be persisted.
			returnType="number" the current page index(that should be persisted)
			*/
			if (value === undefined) {
				return this.settings.paging._persistedPageIndex;
			} else {
				this.settings.paging._persistedPageIndex = value;
			}
		},
		/* utility paging functions */
		prevPage: function () {
			/* sets the page index to be equal to the previous page index and rebinds the data source
			```
				ds = new $.%%WidgetName%%({
					type: "json",
					dataSource: adventureWorks,
					paging: {
						enabled : true,
						pageSize:10,
						type: "local"
					}
				});

				ds.prevPage();
			```
			*/
			this.pageIndex(this.pageIndex() === 0 ? 0 : this.pageIndex() - 1);
			return this;
		},
		nextPage: function () {
			/* sets the page index to be equal to the next page index and rebinds the data source
			```
				ds = new $.%%WidgetName%%({
					type: "json",
					dataSource: adventureWorks,
					paging: {
						enabled : true,
						pageSize:10,
						type: "local"
					}
				});

				ds.nextPage();
			```
			*/
			if (this.pageIndex() >= this.pageCount() - 1) {
				return this;
			}
			this.pageIndex(this.pageIndex() + 1);
			return this;
		},
		pageSize: function (s) {
			/* gets /sets the page size and rebinds the data source if a parameter is specified. If no parameter is passed, returns the current page size
			```
				ds = new $.%%WidgetName%%({
					type: "json",
					dataSource: adventureWorks,
					paging: {
						enabled : true,
						pageSize:10,
						type: "local"
					}
				});

				//Get
				var size = ds.pageSize();

				//Set
				ds.pageSize(25);
			```
			paramType="number" optional="true" the page size.
			returnType="number" Returns the current page size if getter is used and the current instance of the [$.ig.DataSource](ig.datasource) when setter is used
			*/
			if (s === undefined || s === null) {
				return this.settings.paging.pageSize;
			}
			/* A.T. 18 Jan 2011 - Fix for bug #63149 - igDataSource - page content is erratic after changing page size */
			this.settings.paging.pageSize = parseInt(s, 10);
			if (this.settings.paging.appendPage) {
				this.settings.paging.pageIndex = 0;
				this._cachedDataView = null;
			}
			if (this.settings.paging.type === "local") {
				this._page();
				this._invokeCallback();
			} else {
				this.dataBind();
			}
			return this;
		},
		pageSizeDirty: function (dirty) {
			/* for internal use
			```
				var ds = new $.%%WidgetName%%({
					type: "json",
					dataSource: adventureWorks,
					paging: {
						enabled: true,
						pageSize: 10,
						type: "local"
					}
				});

				ds.pageSizeDirty();
			```
			paramType="object" excluded="true"
			*/
			if (dirty === undefined || dirty === null) {
				return this._dirty;
			}
			this._dirty = dirty;
		},
		recordsForPage: function (p) {
			/* returns a list of records for the specified page. Implies that paging is enabled.
			```
				var ds = new $.%%WidgetName%%({
					type: "json",
					dataSource: adventureWorks,
					paging: {
						enabled: true,
						pageSize: 10,
						type: "local"
					}
				});

				var recordsForPage = ds.recordsForPage(2);
			```
			paramType="number" optional="false" the page index for which records will be returned
			*/
			var d = [], si, ps, ei, i, c = 0;
			ps = this.pageSize();
			si = p * ps;
			ei = si + ps >= this._data.length ? this._data.length : si + ps;
			for (i = si; i < ei; i++) {
				d[ c++ ] = this._data[ i ];
			}
			return d;
		},
		tableToObject: function (tableDOM) {
			/* converts a HTML TABLE dom element to a JavaScript array of objects that contain the records data
			```
				ds = new $.%%WidgetName%%();
				var tableObj = ds.tableToObject("<table><tr><td>CD Player</td><td>10.90</td><td>3</td></tr><tr><td>CD Player 1</td><td>10.90</td><td>3</td></tr><tr><td>CD Player 2</td><td>10.90</td><td>3</td></tr></table>");
			```
			paramType="dom" TABLE dom element to transform
			returnType="object"
			*/
			try {
				// no schema, just parse the table and store t in arrays
				var rows = $(tableDOM).children("tbody").children(), len, data, i, j;
				len = rows.length > 0 ? rows[ 0 ].cells.length : 0;
				data = [];
				for (i = 0; i < rows.length; i++) {
					data[ i ] = [];
					for (j = 0; j < len; j++) {
						data[ i ][ j ] = rows[ i ].cells[ j ].innerHTML;
					}
				}
				return data;
			} catch (e) {
				throw new Error($.ig.DataSourceLocale.locale.errorParsingHtmlTableNoSchema + e.message);
			}
		},
		_validateTable: function (obj) {
			if (obj.length === 0) {
				throw new Error($.ig.DataSourceLocale.locale.errorTableWithIdNotFound + this.dataSource());
			} else {
				return obj[ 0 ];
			}
		},
		stringToJSONObject: function (s) {
			/* parses the string and returns an evaluated JSON object
			```
				ds = new $.%%WidgetName%%();
				var jsonObj = ds.stringToJSONObject('[{"Name":"CD Player","Price":10.90,"Rating":3}]');
			```
			paramType="string" the JSON as string.
			*/
			var data = {};
			try {
				//data = eval(s);
				//A.T. 20 Jan 2011 Fix for bug #62124 - igDataSource JSON string binding error
				data = JSON.parse(s);
			} catch (e) {
				throw new Error($.ig.DataSourceLocale.locale.errorParsingJsonNoSchema + e.message);
			}
			return data;
		},
		stringToXmlObject: function (s) {
			/* parses a string and returns a XML Document
			```
				ds = new $.%%WidgetName%%();
				var xmlObj = ds.stringToXmlObject("<Element><Name>CD Player</Name><Price>10.90</Price><Rating>3</Rating></Element>");
			```
			paramType="string" the XML represented as a string
			*/
			var doc, parser;
			try {
				if (window.ActiveXObject) {
					doc = new ActiveXObject("Microsoft.XMLDOM");
					doc.async = "false";
					doc.loadXML(s);
				} else {
					parser = new DOMParser();
					doc = parser.parseFromString(s, "text/xml");
				}
			} catch (e) {
				throw new Error($.ig.DataSourceLocale.locale.errorParsingXmlNoSchema + e.message);
			}
			return doc;
		},
		/* this function is not currently used */
		/*
		_filterData: function (data) {
		if (this.settings.pageSize > 0)
		{
		var filteredData = [], count = 0, i = 0;
		for (i = this._pageIndex * this.settings.pageSize; i < this._pageIndex * this.settings.pageSize + this.settings.pageSize; i++) {
		filteredData[count++] = data[i];
		}
		return filteredData;
		}
		return data;
		}
		*/

		/* GroupBy functionallity*/
		groupByData: function () {
			/* returns collection of data and non-data(grouped) records. Flat representation of hierarchical data
			```
				ds = new $.%%WidgetName%%({
					dataSource: products,
					primaryKey: "ProductID",
					groupby: {
						defaultCollapseState: true
					}
				});

				ds.dataBind();

				var groupedData = ds.groupByData();
			```
			returnType="array" array of records
			*/
			return this._gbData;
		},
		visibleGroupByData: function () {
			/* returns collection of data and non-data(grouped) records. Returns only visible records(children of collapsed grouped records are not included in the collection)
			```
				ds = new $.%%WidgetName%%({
					dataSource: products,
					callback: render,
					groupby: {
						defaultCollapseState: true
					}
				});

				ds.dataBind();
				//Get
				var visibleGroupByData = ds.visibleGroupByData();
			```
			returnType="array" array of records
			*/
			return this._vgbData;
		},
		groupByDataView: function () {
			/* returns the current normalized/transformed and paged/filtered/sorted group-by data
			```
				ds = new $.%%WidgetName%%({
					dataSource: products,
					primaryKey: "ProductID",
					groupby: {
						defaultCollapseState: true
					}
				});

				ds.dataBind();

				var groupByDataView = ds.groupByDataView();
			```
			returnType="array" array of data and non-data(grouped) records
			*/
			return this._gbDataView;
		},
		_groupedRecordsByExpr: function (data, startInd, gbExpr, gbRes) {
			var i, res = [], cmpRes, groupval, currval,
				mapper = this._hasMapper,
				cmpFunc = gbExpr.compareFunc,
				key = gbExpr.fieldName,
				len = data.length;
			gbRes = gbRes || {};
			if (!cmpFunc) {
				cmpFunc = function (val1, val2) {
					return val1 === val2;
				};
			}
			startInd = startInd || 0;
			res.push(data[ startInd ]);
			groupval = mapper ?
							this.getCellValue(key, data [ startInd ]) :
							data[ startInd ][ key ];
			gbRes.val = groupval;
			startInd++;
			for (i = startInd; i < len; i++) {
				currval = mapper ? this.getCellValue(key, data [ i ]) : data[ i ][ key ];
				cmpRes = cmpFunc(currval, groupval,
									{
										fieldName: key,
										recordX: data[ startInd ],
										recordY: data[ i ]
									});
				if (cmpRes === 0 || cmpRes === true) {
					res.push(data[ i ]);
				} else {
					break;
				}
			}
			return res;
		},
		toggleGroupByRecord: function (id, collapsed) {
			/* Toggle grouped record with the specified id and updates collections visible groupby data and data view
			```
				ds = new $.%%WidgetName%%({
					dataSource: products,
					primaryKey: "ProductID",
					groupby: {
						defaultCollapseState: true
					}
				});

				ds.dataBind();
				//Set
				ds.toggleGroupByRecord("ProductID:49", true);
			```
			paramType="string" data-id attribute of the respective group row in the DOM
			paramType="bool" if true the record should be collapsed, otherwise expanded
			*/
			var ds = this._gbData, i, len = ds.length, res = [], lvl,
				row, hidden, gbrow, p = this.settings.paging;
			this._gbCollapsed = this._gbCollapsed || {};
			this._gbCollapsed[ id ] = !!collapsed;
			for (i = 0; i < len; i++) {
				row = ds[ i ];
				gbrow = row.__gbRecord;
				if (row.id === id) {
					row.collapsed = !!collapsed;
				}
				if (hidden) {
					if (gbrow && row.level <= lvl) {
						hidden = false;
					} else {
						continue;
					}
				}
				if (gbrow && row.collapsed) {
					hidden = true;
					lvl = row.level;
				} else {
					lvl = null;
				}
				res.push(row);
			}
			/* visible groupby data and the data view should be populated */
			this._vgbData = res;
			this._gbDataView = this._vgbData;
			if (p.enabled && p.type === "local") {
				this._page();
			}
		},
		isGroupByRecordCollapsed: function (gbRec) {
			/* Check whether the specified gorupby record is collapsed
			paramType="string|object" id of the grouped record OR grouped record
			```
				ds = new $.%%WidgetName%%({
					dataSource: products,
					primaryKey: "ProductID",
					groupby: {
						defaultCollapseState: true
					}
				});

				ds.dataBind();

				var isCollapsed = ds.isGroupByRecordCollapsed({id:"ProductID:49"});
			```
			returnType="bool" if true the grouped record is collapsed
			 */
			var id = typeof gbRec === "string" || !gbRec ? gbRec : gbRec.id,
				state;
			this._gbCollapsed = this._gbCollapsed || {};
			state = this._gbCollapsed[ id ];
			return (state === undefined) ?
						this.settings.groupby.defaultCollapseState :
						state;
		},
		_resetGroupByCollapseStates: function () {
			/* reset collection that holds information aboult collapsed state. NOTE: visibleGroupByData and dataView are not updated. */
			this._gbCollapsed = {};
		},
		_processGroupsRecursive: function (data, gbExprs, gbInd, parentCollapsed, parentId) {
			var i, j, hc, len = data.length, resLen, gbExpr, res, gbRec, dt;
			gbInd = gbInd || 0;
			parentId = parentId || "";
			if (!gbInd || !this._gbData) {
				this._gbData = [];
				this._vgbData = [];
			}
			for (i = 0; i < len; i++) {
				gbExpr = gbExprs[ gbInd ];
				gbRec = {
					__gbRecord: true,
					gbExpr: gbExpr,
					level: gbInd,
					len: 1,
					recs: [],
					val: undefined
				};
				this._gbData.push(gbRec);
				if (!parentCollapsed) {
					this._vgbData.push(gbRec);
				}
				res = this._groupedRecordsByExpr(data, i, gbExpr, gbRec);
				gbRec.fieldName = gbExpr.fieldName;
				resLen = res.length;
				if (dt === undefined) {
					dt = !!(gbRec.val && gbRec.val.getTime);
				}
				gbRec.val = dt ? gbRec.val.getTime() : gbRec.val;
				hc = gbRec.val ? String(gbRec.val).getHashCode() : "";
				gbRec.id = parentId + gbExpr.fieldName + ":" + hc;
				gbRec.collapsed = this.isGroupByRecordCollapsed(gbRec);
				if (gbInd + 1 < gbExprs.length) {
					this._processGroupsRecursive(res, gbExprs, gbInd + 1,
												gbRec.collapsed || parentCollapsed, gbRec.id + ":");
				} else {
					for (j = 0; j < resLen; j++) {
						this._gbData.push(res[ j ]);
						if (!gbRec.collapsed && !parentCollapsed) {
							this._vgbData.push(res[ j ]);
						}
					}
				}
				gbRec.recs = res;
				gbRec.len = resLen;
				i += resLen - 1;
			}
		},
		_generateGroupByData: function (data,
									gbExprs,
									collapsedRows) {
			// data should be sorted(by gbExprs) when this functions is called - otherwise grouping will not be correct
			var i, newgb = [];
			data = data || this._data;
			gbExprs = this._findSortingExpressionsForLayout(gbExprs || [], this.settings.key);
			this._gbData = [];
			this._vgbData = [];
			this._gbDataView = [];
			this._gbCollapsed = collapsedRows || this._gbCollapsed;
			if ($.type(gbExprs) !== "array" || !gbExprs.length) {
				return data;
			}
			for (i = 0; i < gbExprs.length; i++) {
				if (gbExprs[ i ].isGroupBy) {
					newgb.push(gbExprs[ i ]);
				}
			}
			gbExprs = newgb;
			if (!gbExprs.length) {
				return data;
			}
			this._processGroupsRecursive(data, gbExprs, 0, false, "");
			this._gbDataView = this._vgbData;
			return this.groupByData();
		},
		_clearGroupByData: function () {
			this._gbData = [];
			this._vgbData = [];
			this._gbDataView = [];
		},
		isGroupByApplied: function (exprs) {
			/* check whether grouping is applied for the specified sorting expressions.
			```
				ds = new $.%%WidgetName%%({
					dataSource: products,
					primaryKey: "ProductID",
					groupby: {
						defaultCollapseState: true
					},
					sorting: {
						expressions:[
							{
								fieldName: "Name",
								dir: "desc"
							}
					]}
				});

				ds.dataBind();

				var sortingExprArray = ds.settings.sorting.expressions;
				var isApplied = ds.isGroupByApplied(sortingExprArray);
			```
			paramType="array" optional="true" array of sorting expressions. If not set check expressions defined in sorting settings
			returnType="bool" Returns true if grouping is applied */
			exprs = this._findSortingExpressionsForLayout(exprs || this.settings.sorting.expressions,
															this.settings.key);
			return !!(exprs && exprs.length && exprs[ 0 ].isGroupBy);
		},
		/* M.H. 23 Mar 2017 Fix for bug 232173: In remote GroupBy scenario the child layouts cannot be grouped */
		_findSortingExpressionsForLayout: function (expressions, layout) {
			return (expressions || []).filter(function (expr) {
				return (!expr.layout && !layout) || expr.layout === layout;
			});
		}
		/* //GroupBy functionallity*/
	});
	$.ig.TypeParser = $.ig.TypeParser || Class.extend({
		toStr: function (obj) {
			return this.isNullOrUndefined(obj) ? "" : obj + this.empty();
		},
		toDate: function (obj, pk, key) {
			/* L.A. 18 June 2012 Fixing bug #113265 Column 'date' shows empty values as 'NaN' */
			if (this.isNullOrUndefined(obj) || obj === "" || $.type(obj) === "function") {
				return null;
			}
			if ($.type(obj) === "date") {
				return obj;
			}
			var d;
			/* OData & MS */
			if (obj.length && obj.indexOf("/Date(") !== -1) {
				/*
				// account for timezone offset
				if (this._tzo === undefined) {
					this._tzo = new Date().getTimezoneOffset() * 60000;
				}
				if (this._dst === undefined) {
					this._dst = new Date().dst();
					if (this._dst) {
						this._tzo = new Date().stdTimezoneOffset() * 60000;
					}
				}
				*/
				/* we need to get the local daylight offset on the client */
				if (this._serverOffsets === undefined || this._serverOffsets[ pk ] === undefined) {
					return new Date(parseInt(obj.replace("/Date(", "")
						.replace(")/", ""), 10) + this._serverOffset);
				}
				if (this._serverOffsets[ pk ][ key ] !== undefined &&
					this._serverOffsets[ pk ][ key ] !== null) {
					return new Date(parseInt(obj.replace("/Date(", "")
						.replace(")/", ""), 10) + this._serverOffsets[ pk ][ key ]);
				}
				return new Date(parseInt(obj.replace("/Date(", "").replace(")/", ""), 10));
			}
			d = new Date(obj);
			/* M.H. 14 Apr 2014 Fix for bug #169770: Column dataType "date" format appear as NaN-NaN-NaN in IE8 */
			if (isNaN(d)) {
				d = $.ig.util.dateFromISO(obj);
			}
			return d;
		},
		toNumber: function (obj) {
			return (this.isNullOrUndefined(obj) || $.type(obj) === "function") ? null : obj * this.num();
		},
		toBool: function (obj) {
			// M.H. 25 Jul 2013 Fix for bug #144944: Error gets thrown during data transformation of the values for an unbound column
			var typeObj = $.type(obj);
			if (typeObj === "boolean") {
				return obj;
			}
			if (this.isNullOrUndefined(obj) || typeObj === "function") {
				return false;
			}
			/* M.H. 25 Jul 2013 Fix for bug #144944: Error gets thrown
			during data transformation of the values for an unbound column */
			if (obj === "1" || obj === 1 || (typeObj === "string" && obj.toLowerCase() === "true")) {
				return true;
			}
			return false;
		},
		isNullOrUndefined: function (obj) {
			return obj === null || obj === undefined;
		},
		empty: function () {
			return "";
		},
		num: function () {
			return 1;
		}
	});
	/* the $.ig.DataSchema handles transformations for Array, JSON and Xml data objects.
	if your data is in any other format and/or needs to be additionally worked on, please pass it through $.ig.DataSource first
	Eg: when you need to fetch the data remotely, or when it is stored in a string and needs to be evaluated first
	*/
	$.ig.DataSchema = $.ig.DataSchema || Class.extend({
		/* The $.ig.DataSchema handles transformations for Array, JSON and Xml data objects.
		If your data is in any other format and/or needs to be additionally worked on, please pass it through $.ig.DataSource first.
		Eg: When you need to fetch the data remotely, or when it is stored in a string and needs to be evaluated first
		*/
		schema: {
			/* A list of field definitions specifying the schema of the data source. Field objects description: {name, [type], [xpath]}
			returnType="array" */
			fields: [
				{
					/* type="string" Name of the field*/
					name: undefined,
					/* type="string|number|bool|date|object" data type of the field
						string
						number
						bool
						date
						object
					*/
					type: undefined,
					/* type="string" The XPath expression to map the node to the field */
					xpath: undefined,
					/* type="string|function" This option is applicable only for fields with fieldDataType="object". Reference to a function (string or function) that can be used for complex data extraction from the data records, whose return value will be used for all data operations associated with this field. */
					mapper: undefined
				}
			],
			/* type="string" this is the property (path) in the data source where the records are located. */
			searchField: null,
			/* type="string" this is the property in the resulting object where actual resulting records will be put. (So the result will not be array but an object if this is defined), after the potential data source transformation */
			outputResultsName: null
		},
		init: function (type, options) {
			$.ig.DataSchema.prototype.schema.fields = [];
			if (options) {
				this.schema = $.extend(true, {}, $.ig.DataSchema.prototype.schema, options);
			}
			this._type = type;
			this._parser = new $.ig.TypeParser();
			this._parser._serverOffset = 0;
		},
		transform: function (data) {
			/* performs a transformation on the schema so that the resulting data matches the schema
			paramType="object" the data to transform
			returnType="object" the transformed data
			*/
			var ndata = []; // the resulting normalized data
			/* transform data according to the fields */
			switch (this._type) {
				case "array":
					ndata = this._arrays(data);
					break;
				case "json":
					ndata = this._json(data);
					break;
				case "xml":
					ndata = this._xml(data);
					break;
				case "htmlTableDom":
					ndata = this._table(data);
					break;
				case "htmlListDom":
					ndata = this._list(data);
					break;
				case "htmlSelectDom":
					ndata = this._select(data);
					break;
				case "singleRow":
					ndata = this._row(data);
					break;
				default:
					throw new Error("unknown data source type: " + this._type);
			}
			return ndata;
		},
		_setResKey: function (resKey, out) {
			if (!this.isEmpty(resKey)) {
				out[ resKey ] = []; // was {}
				return out[ resKey ];
			}
			return out;
		},
		_convertType: function (t, obj, pk, key) {
			if (t === "string") {
				return this._parser.toStr(obj);
			}
			if (t === "date") {
				return this._parser.toDate(obj, pk, key);
			}
			if (t === "number") {
				return this._parser.toNumber(obj);
			}
			if (t === "boolean" || t === "bool") {
				return this._parser.toBool(obj);
			}
			/* no type conversion / unknown type */
			return obj;
		},
		/* _val: function (field, val, results, i, j, rec) { */
		_val: function (field, val, results, i, rec) {
			// return this to the state before 28 Nov
			var t = field.type, j = null;
			if (!this.isEmpty(t)) {
				if (this.isEmpty(field.name)) {
					results[ i ][ j ] =
						this._convertType(t, val, this._pk ? results[ i ][ this._pk ] : i, field.name);
				} else {
					results[ i ][ field.name ] =
						this._convertType(t, val, this._pk ? results[ i ][ this._pk ] : i, field.name);
				}
			} else {
				if (this.isEmpty(field.name)) {
					//results[i][j] = val;
					if (rec) {
						results[ i ][ j ] = rec[ i ][ j ];
					} else {
						results[ i ][ j ] = val;
					}
				} else {
					//results[i][field.name] = val;
					if (rec) {
						// we must copy the whole object refrence, in order to get "by reference" types.
						results[ i ][ field.name ] = rec[ i ][ field.name ];
					} else {
						results[ i ][ field.name ] = val;
					}
				}
			}
		},
		isEmpty: function (o) {
			/* specifies if the object is null, undefined, or an empty string
			paramType="object" the object to check for being empty
			returnType="boolean"
			*/
			return o === undefined || o === null || o === "";
		},
		_row: function (dataRow, index) {
			var t, j, f, tmp, schema = this.schema, fields = schema.fields, fLen = fields.length, fName,
				nDataRow = {};
			/* try { */
			for (j = 0; j < fLen; j++) {
				f = fields[ j ];
				fName = f.name;
				tmp = dataRow[ fName ];
				t = f.type;

				if (!this.isEmpty(t)) {
					if (this.isEmpty(fName)) {
						nDataRow[ j ] = this._convertType(t, tmp, this._pk ? dataRow[ this._pk ] : index, fName);
					} else {
						nDataRow[ fName ] = this._convertType(t, tmp, this._pk ? dataRow[ this._pk ] : index, fName);
					}
				} else {
					if (this.isEmpty(fName)) {
						nDataRow[ j ] = tmp;
					} else {
						nDataRow[ fName ] = tmp;
					}
				}
			}
			/* } catch (e) {
				throw new Error($.ig.DataSourceLocale.locale.errorParsingArrays + e.message);
			} */
			return nDataRow;
		},
		_arrays: function (data) {
			var i, j, tmp, hasArrays, resKey = this.schema.outputResultsName, out = {}, results;
			/* optionally, a developer may decide to set all contents directly in the output object */
			results = this._setResKey(resKey, out);
			/* object is empty and is not an array */
			if (this.isObjEmpty(results) && $.type(results) !== "array") {
				results = [];
				out = results;
			}
			try {
				//A.T. 12 July 2011
				/*
				if (!this.isEmpty(this.schema.searchField)) {
				//data = eval("data." + this.schema.searchField);
				path = this.schema.searchField.split(".");
				if (path.length > 0) {
				for (i = 0; i < path.length; i++) {
				data = data[path[i]];
				}
				}
				}
				*/

				if (data.length > 0) {
					hasArrays = $.type(data[ 0 ]) === "array";
				}
				for (i = 0; i < data.length; i++) {
					/* L.A. 23 May 2012 - Fixed bug #112518 The grid cannot bind to an
					associative JavaScript array (which has one or more undefined items) */
					if (data[ i ] === undefined) {
						continue;
					}
					results.push({});
					for (j = 0; j < this.schema.fields.length; j++) {
						if (hasArrays) {
							tmp = data[ i ][ j ];
						} else {
							tmp = data[ i ][ this.schema.fields[ j ].name ];
						}
						/* L.A. 23 May 2012 - Fixed bug #112518 The grid cannot bind to an
						associative JavaScript array (which has one or more undefined items) */
						this._val(this.schema.fields[ j ], tmp, results, results.length - 1);
					}
				}
			} catch (e) {
				throw new Error($.ig.DataSourceLocale.locale.errorParsingArrays + e.message);
			}
			return out;
		},
		/* get data from the object(by evaluating it using searchField option) */
		_getDataBySearchField: function (data) {
			var searchPath, i, token, root;
			/* find the object holding the data */
			if (!this.isEmpty(this.schema.searchField)) {
				/* we are splitting the string path by '[' , ']' and '.' which should give us the path parameters */
				searchPath = this.schema.searchField.split(/[\[.\]]/);
				for (i = 0; i < searchPath.length; i++) {
					token = searchPath[ i ];
					if (token.length === 0) {
						continue;
					}
					/* integer properties should be handled as indexes in an array
					otherwise we have to trim the string from ' and " chars */
					token = /^(0|[1-9]\d*)$/.test(token) ? parseInt(token, 10) : token.replace(/^('|")|('|")$/g, "");
					root = root ? root[ token ] : data[ token ];
					if (root === undefined || root === null) {
						break;
					}
				}
				/* L.A. 14 January 2013 - Fixing bug #130634 -
				JS errors when having a second child layout and using knockout. */
				if (!root && $.type(data) === "array") {
					root = data;
				}
			}
			return root;
		},
		/* the data should be evaluated */
		_processMetadata: function (data) {
			if (data.Metadata &&
				data.Metadata.timezoneOffset !== undefined &&
				!isNaN(data.Metadata.timezoneOffset)) {
				this._serverOffset = data.Metadata.timezoneOffset;
				this._parser._serverOffset = this._serverOffset;
				/* we need the offsets for every particular date */
				if (data.Metadata.timezoneOffsets) {
					this._serverOffsets = data.Metadata.timezoneOffsets;
					this._parser._serverOffsets = data.Metadata.timezoneOffsets;
				}
			} else {
				this._parser._serverOffset = 0;
			}
		},
		/* the data that comes is expected to be already evaluated */
		_json: function (data) {
			var i, j, root, resKey = this.schema.outputResultsName, out = {}, results;
			/* optionally, a developer may decide to set all contents directly in the output object */
			results = this._setResKey(resKey, out);
			if (this.isObjEmpty(results)) {
				results = [];
				out = results;
			}
			try {
				this._processMetadata(data);
				/* find the object holding the data */
				root = this._getDataBySearchField(data);
				/* L.A. 02 October 2012 - Fixing bug #123398
				[Hierarchical Grid Knockoutjs Integration] Expanding a row in the hierarchical grid causes a JS error */
				if (root === undefined || this.isEmpty(this.schema.searchField)) {
					root = data;
				}
				if (!root.length && $.type(root) === "object") {
					root = [ root ];
				}
				/* traverse root */
				if (root && root.length && root.length > 0) {
					for (i = 0; i < root.length; i++) {
						results[ i ] = {};
						/* always process pk first */
						if (this._pk && this._pk !== "ig_pk") {
							for (j = 0; j < this.schema.fields.length; j++) {
								if (this.schema.fields[ j ].name === this._pk) {
									break;
								}
							}
							if (j < this.schema.fields.length) { // if defined in the schema
								if (root[ i ][ this._pk ] === undefined) {
									// the input data doesn't match the schema
									throw new Error($.ig.DataSourceLocale.locale.errorSchemaMismatch + this._pk);
								}
								this._val(
									this.schema.fields[ j ], root[ i ][ this.schema.fields[ j ].name ], results, i, root
								);
							}
						}
						for (j = 0; j < this.schema.fields.length; j++) {
							if (this.schema.fields[ j ].name !== "ig_pk" && this.schema.fields[ j ].name !== this._pk) {
								/* S.S. September 24, 2014 - Bug #178135 - Removing the necessity to match the schema in this scenario
								This makes remote work as local in this regard. Missing fields will be treated as null for transformation
								purposes. Uncomment and re-enable for local too to reach parity if it's needed in the future.
								if (root[i][this.schema.fields[j].name] === undefined) {
								the input data doesn't match the schema
									throw new Error($.ig.DataSourceLocale.locale.errorSchemaMismatch + this.schema.fields[j].name);
								} */
								this._val(
									this.schema.fields[ j ], root[ i ][ this.schema.fields[ j ].name ], results, i, root
								);
							}
						}
					}
				}
			} catch (e) {
				throw new Error($.ig.DataSourceLocale.locale.errorParsingJson + e.message);
			}
			return out;
		},
		/* the data that comes is already expected to be a parsed XML document object */
		_xml: function (data, recursiveSF) {
			var i, j, root, resNode, item, resKey = this.schema.outputResultsName,
				out = {}, results, namespaced, sf, k, r, rc,
				len1, len2, o, carrysf, ireal = 0, s;
			o = window.ActiveXObject;
			/* optionally, a developer may decide to set all contents directly in the output object */
			results = this._setResKey(resKey, out);
			if (this.isObjEmpty(results)) {
				results = [];
				out = results;
			}
			try {
				// find the searchField, if set
				// data is assumed to be a XML document
				if (!this.isEmpty(this.schema.searchField)) {

					// it makes a big difference if the XML has namespace declarations (xmlns) or not
					// in the first case, we cannot use XPath expressions reliably directly, because
					// they won't return any matches. Therefore if the XML is namespaced, we are going to
					// manually traverse it and find matches by parsing the xpath expression (search field)
					// which will also sacrifice performance a bit
					namespaced = this._xmlHasNamespaces(data);
					if (!namespaced) {
						if (window.ActiveXObject === undefined) {
							if (!recursiveSF || recursiveSF.length <= 0) {
								root = data.evaluate(this.schema.searchField, data, null, XPathResult.ANY_TYPE, null);
							} else {
								root = data.evaluate(recursiveSF, data, null, XPathResult.ANY_TYPE, null);
							}
						} else {
							// M.H. 12 Mar 2013 Fix for bug #135224: [igDataSource] Exception is thrown  when opening Stock Quotes sample in IE10
							if (!(data instanceof ActiveXObject)) {
								s = new XMLSerializer().serializeToString(data);
								data = new window.ActiveXObject("Microsoft.XMLDOM");
								data.async = false;
								data.loadXML(s);
							}
							root = data.selectNodes(this.schema.searchField);
						}
					} else {
						// find the elements list manually
						if (this.schema.searchField.startsWith("//")) {
							sf = this.schema.searchField.substring(2, this.schema.searchField.length);
						} else {
							sf = this.schema.searchField;
						}
						/* find *the first* instance, and assume it's parent will hold them all ! */
						root = this._findXmlRecordsRoot(data, sf);
					}
				} else {
					root = data;
				}
				/* IEs */
				if (!namespaced) {
					if (root && window.ActiveXObject !== undefined) {
						for (i = 0; i < root.length; i++) {
							item = root.item(i);
							results[ i ] = {};
							for (j = 0; j < this.schema.fields.length; j++) {
								// evaluate the xpath for the field, for the current item, if it is present
								resNode = item.selectSingleNode(this.schema.fields[ j ].xpath);
								if (resNode) {
									// If the node is an element then recursively go through the elements
									if (resNode.nodeType === 1 &&
										this.schema.childDataProperty &&
										resNode.nodeName === this.schema.childDataProperty) {
										this.schema.searchField = this.schema.childDataProperty;
										results[ i ][ resNode.nodeName ] = this._xml(item);
									} else {
										this._val(this.schema.fields[ j ], resNode.text, results, i);
									}
								} else {
									results[ i ][ this.schema.fields[ j ].name ] = "";
								}
							}
						}
					} else if (root) { // FF, Opera, Safari, Chrome etc.
						i = 0;
						item = root.iterateNext();
						while (item) {
							results[ i ] = {};
							for (j = 0; j < this.schema.fields.length; j++) {
								// evaluate the xpath for the field, for the current item, if it is present
								resNode = data.evaluate(this.schema.fields[ j ].xpath,
									item, null, XPathResult.ANY_TYPE, null).iterateNext();
								if (resNode) {
									// If the node is an element then recursively go through the elements
									if (resNode.nodeType === 1 &&
										this.schema.childDataProperty &&
										(resNode.nodeName === this.schema.childDataProperty ||
										resNode.nodeName === this.schema.seachField)) {
										if (!recursiveSF || recursiveSF.length <= 0) {
											carrysf = this.schema.searchField + "[" + (i + 1) + "]/" + this.schema.childDataProperty;
										} else {
											carrysf = recursiveSF + "[" + (i + 1) + "]/" + this.schema.childDataProperty;
										}
										results[ i ][ this.schema.childDataProperty ] = this._xml(data, carrysf);
									} else {
										this._val(this.schema.fields[ j ], resNode.textContent, results, i);
									}
								} else {
									results[ i ][ this.schema.fields[ j ].name ] = "";
								}
							}
							i++;
							item = root.iterateNext();
						}
					}
				} else {
					// list a list of records accessible by the childNodes prop
					len1 = root.childNodes.length;
					ireal = 0;
					for (i = 0; i < len1; i++) {
						r = root.childNodes[ i ];
						results.push({});
						for (j = 0; j < this.schema.fields.length; j++) {
							// think about how to optimize this, like that it could be awfully slow for bigger data sets ...
							len2 = r.childNodes.length;
							for (k = 0; k < len2; k++) {
								rc = r.childNodes[ k ];
								if (this.schema.fields[ j ].name === (o === undefined ?
									rc.localName : rc.baseName)) {
									this._val(this.schema.fields[ j ], o === undefined ?
										rc.textContent : rc.text, results, ireal);
									break;
								}
							}
						}
						/* check for empty object */
						if ($.isEmptyObject(results[ ireal ])) {
							results.pop();
						} else {
							ireal++;
						}
					}
				}
			} catch (e) {
				throw new Error($.ig.DataSourceLocale.locale.errorParsingXml + e.message);
			}
			return out;
		},
		/* recursively find the parent root record holding the children */
		_findXmlRecordsRoot: function (data, field) {
			var i, len, r, o, ret;
			o = window.ActiveXObject;
			if ((o === undefined ? data.localName : data.baseName) === field) {
				ret = data.parentNode;
			} else if (data && data.childNodes && data.childNodes.length > 0) {
				len = data.childNodes.length;
				for (i = 0; i < len; i++) {
					r = data.childNodes[ i ];
					/* if ((o === undefined ? r.localName : r.baseName) === field) {
						ret = data;
					} */
					if (r.childNodes && r.childNodes.length > 0) {
						ret = this._findXmlRecordsRoot(r, field);
					}
				}
			}
			return ret;
		},
		_xmlHasNamespaces: function (data) {
			// in order not to introduce big performance hits, we are going to only to check the root elements, and the first child of the root, for
			// "xmlns" attributes
			var i, ns, r, len, fc;
			if (data.childNodes && data.childNodes.length && data.childNodes.length > 0) {
				len = data.childNodes.length;
				for (i = 0; i < len; i++) {
					r = data.childNodes[ i ];
					if (!r) {
						return false;
					}
					ns = r.namespaceURI;
					if (ns !== "" && ns !== undefined && ns !== null) {
						return true;
					}
				}
				/* if we still haven't found a namespace, try the first child element */
				if (r && r.childNodes && r.childNodes.length > 0) {
					fc = r.childNodes[ 0 ];
					if (!fc) {
						return false;
					}
					ns = fc.namespaceURI;
					return (ns !== "" && ns !== undefined && ns !== null);
				}
			}
			return false;
		},
		_table: function (data) {
			// the assumption is that "data" contains the table DOM element.
			var i, j, r, tbody, rows, resKey = this.schema.outputResultsName, out = {}, results;
			tbody = $(data).find("tbody")[ 0 ];

			// if there are headers, remove them. the grid will create its own.
			// L.A. 15 August 2012 Fixing bugs #118934, #74552
			//$(data).find('thead').remove();

			// optionally, a developer may decide to set all contents directly in the output object
			results = this._setResKey(resKey, out);
			if (this.isObjEmpty(results)) {
				results = [];
				out = results;
			}
			try {
				if (tbody && tbody.nodeName && tbody.nodeName === "TBODY") {
					rows = tbody.rows;
					for (i = 0; i < rows.length; i++) {
						r = rows[ i ];
						results[ i ] = {};
						/* iterate through the fields */
						for (j = 0; j < this.schema.fields.length; j++) {
							this._val(this.schema.fields[ j ], r.cells[ j ].innerHTML, results, i);
						}
					}
				} else {
					throw new Error($.ig.DataSourceLocale.locale.errorExpectedTbodyParameter);
				}
			} catch (e) {
				throw new Error($.ig.DataSourceLocale.locale.errorParsingHtmlTable + e.message);
			}
			return out;
		},
		_list: function (data) {
			var parsedData, img, anchor, id, li, ul, self = this, d = $(data),
				text, i, header, descriptions, counts, jqmNS = "data-";
			if ($.mobile && $.mobile.ns) {
				jqmNS += $.mobile.ns;
			}

			parsedData = [];

			// Text: text
			// Value: value
			// ImageUrl: imageUrl
			// NavigateUrl: navigateUrl
			// ChildDataProperty: childData
			// Anchor Target: target
			// H1, H2, H3, H4, H5, H6: header (taken out of text)
			// p, dd: description (taken out of text)
			// Span with ui-li-count class: count
			// li has jqm data role of list divider sets isDivider
			// Index of li will become a primary key
			// Include any additional identifiers here and before extracting them, make a check for hasOwnProperty
			if (d && (d.is("ul") || d.is("ol")) && d.children().length > 0) {
				d.children("li:not([" + jqmNS + "role=\"itemTemplate\"], [" +
					jqmNS + "role=\"detailsTemplate\"], [" +
					jqmNS + "role=\"dividerTemplate\"])")
					.each(function (index) {
					li = $(this);
					img = li.children("img");
					/* Init the parsed data parts */
					parsedData[ index ] = {};
					/* Parse logic */
					if (self.schema.hasOwnProperty("primaryKey")) {
						self._val(self.schema.primaryKey, li.index(), parsedData, index);
					}
					if (self.schema.hasOwnProperty("isDivider")) {
						self._val(self.schema.isDivider,
							li.attr(jqmNS + "role") === "list-divider", parsedData, index);
					}
					if (img.length > 0 && img.attr("src")) {
						if (self.schema.hasOwnProperty("imageUrl")) {
							self._val(self.schema.imageUrl, img.attr("src"), parsedData, index);
						}
					}
					anchor = li.children("a");
					if (anchor.length > 0) {
						// K.D. February 20th, 2012 Bug #101873 Switching from extracting text only to extracting
						// all of the contents of the anchor. This feature was requested by PG.
						text = anchor.html();
						if (anchor.attr("href")) {
							if (self.schema.hasOwnProperty("navigateUrl")) {
								self._val(self.schema.navigateUrl, anchor.attr("href"), parsedData, index);
							}
						}
						if (anchor.attr("target")) {
							if (self.schema.hasOwnProperty("target")) {
								self._val(self.schema.target, anchor.attr("target"), parsedData, index);
							}
						}
						if (img.length === 0) {
							img = anchor.children("img");
							if (img.length > 0) {
								img.each(function () {
									if (this.outerHTML) {
										text = text.replace(this.outerHTML, "");
									} else {
										text = text.replace($("<div>").append(this).html(), "");
									}
								});
								/* text = text.replace($("<div>").append(img[0]).html(), ""); // remove just first image from the text */
							}
							if (img.length > 0 && img.attr("src")) {
								if (self.schema.hasOwnProperty("imageUrl")) {
									self._val(self.schema.imageUrl, img.attr("src"), parsedData, index);
								}
							}
						}
					} else {
						text = "";
						for (i = 0; i < li[ 0 ].childNodes.length; i++) {
							if (li[ 0 ].childNodes[ i ].nodeType === 3 && li[ 0 ].childNodes[ i ].data) {
								text += $.trim(li[ 0 ].childNodes[ i ].data);
							}
						}

					}
					if (self.schema.hasOwnProperty("header")) {
						header = li.children("h1, h2, h3, h4, h5, h6");
						if (header.length === 0 && anchor.length > 0) {
							header = anchor.children("h1, h2, h3, h4, h5, h6");
						}
						if (header.length > 0) {
							self._val(self.schema.header, header.text(), parsedData, index);
							header.each(function () {
								if (this.outerHTML) {
									text = text.replace(this.outerHTML, "");
								} else {
									text = text.replace($("<div>").append(this).html(), "");
								}
							});
						}
					}
					if (self.schema.hasOwnProperty("description")) {
						descriptions = li.children("p, dd");
						if (descriptions.length === 0 && anchor.length > 0) {
							descriptions = anchor.children("p, dd");
						}
						if (descriptions.length > 0) {
							self._val(self.schema.description, descriptions.text(), parsedData, index);
							descriptions.each(function () {
								if (this.outerHTML) {
									text = text.replace(this.outerHTML, "");
								} else {
									text = text.replace($("<div>").append(this).html(), "");
								}
							});
						}
					}
					if (self.schema.hasOwnProperty("count")) {
						counts = li.children("span.ui-li-count");
						if (counts.length === 0 && anchor.length > 0) {
							counts = anchor.children("span.ui-li-count");
						}
						if (counts.length > 0) {
							self._val(self.schema.count, parseInt(counts.text(), 10), parsedData, index);
							counts.each(function () {
								if (this.outerHTML) {
									text = text.replace(this.outerHTML, "");
								} else {
									text = text.replace($("<div>").append(this).html(), "");
								}
							});
						}
					}
					if (self.schema.hasOwnProperty("text")) {
						self._val(self.schema.text, text, parsedData, index);
					}
					id = li.attr("id");
					if (id) {
						if (self.schema.hasOwnProperty("value")) {
							self._val(self.schema.value, id, parsedData, index);
						}
					}
					ul = li.children("ul, ol");
					if (ul.length > 0) {
						if (self.schema.hasOwnProperty("childData") && self.schema.childData.hasOwnProperty("name")) {
							parsedData[ index ][ self.schema.childData.name ] = self._list(ul);
						}
					}
				});
			}
			return parsedData;
		},
		/* Analyzes a select element
		Only two fields schema is legal for select data source
		First field is bound to the value of the option
		Second field is bound to the text of the option
		For each optgroup, "Group" object with groupName and groupItems is created */
		_select: function (data) {
			var parsedData = [], self = this;

			$(data).children().each(function (i) {
				var $curOption = $(this);
				parsedData[ i ] = {};

				if ($curOption.is("optgroup")) {
					parsedData[ i ].Group = {
						groupName: this.label,
						groupItems: self._select(this)
					};
				} else {
					self._val(self.schema.fields[ 0 ], $curOption.val(), parsedData, i);
					self._val(self.schema.fields[ 1 ], $curOption.text(), parsedData, i);
				}
			});

			return parsedData;
		},
		isObjEmpty: function (obj) {
			/* specifies if the object has custom properties or not
			paramType="object" the object to check for presence or lack of custom properties
			returnType="boolean"
			*/
			var prop;
			for (prop in obj) {
				if (obj.hasOwnProperty(prop)) {
					return false;
				}
			}
			return true;
		},
		fields: function () {
			/* A list of field definitions specifying the schema of the data source.
			Field objects description: {fieldName, [fieldDataType], [fieldXPath]}
			returnType="array"*/
			return this.schema.fields;
		}
	});
	/* Helper/wrapper classes for $.ig.DataSource */
	$.ig.RemoteDataSource = $.ig.RemoteDataSource || $.ig.DataSource.extend({
		init: function (options) {
			if (!options) {
				options = {};
			}
			options.type = "remoteUrl";
			this._super(options);
			return this;
		}
	});
	$.ig.JSONDataSource = $.ig.JSONDataSource || $.ig.DataSource.extend({
		init: function (options) {
			if (!options) {
				options = {};
			}
			options.type = "json";
			this._super(options);
			return this;
		}
	});
	$.ig.RESTDataSource = $.ig.RESTDataSource || $.ig.DataSource.extend({
		settings: {
			/* Settings related to REST compliant update routine */
			restSettings: {
				/* Settings for create requests */
				create: {
					/* type="string" specifies a remote URL to which create requests will be sent. This will be used for both batch and non-batch, however if template is also set, this URL will only be used for batch requests. */
					url: null,
					/* type="string" specifies a remote URL template. Use ${id} in place of the resource id. */
					template: null,
					/* type="bool" specifies whether create requests will be sent in batches */
					batch: false
				},
				/* Settings for update requests */
				update: {
					/* type="string" specifies a remote URL to which update requests will be sent. This will be used for both batch and non-batch, however if template is also set, this URL will only be used for batch requests. */
					url: null,
					/* type="string" specifies a remote URL template. Use ${id} in place of the resource id. */
					template: null,
					/* type="bool" specifies whether update requests will be sent in batches */
					batch: false
				},
				/* Settings for remove requests */
				remove: {
					/* type="string" specifies a remote URL to which remove requests will be sent. This will be used for both batch and non-batch, however if template is also set, this URL will only be used for batch requests. */
					url: null,
					/* type="string" specifies a remote URL template. Use ${id} in place of the resource id. */
					template: null,
					/* type="bool" specifies whether update requests will be sent in batches */
					batch: false
				},
				/* type="bool" specifies whether the ids of the removed resources are send through the request URI */
				encodeRemoveInRequestUri: true,
				/* type="function" specifies a custom function to serialize content sent to the server. It should accept a single object or an array of objects and return a string. If not specified, JSON.stringify() will be used. */
				contentSerializer: null,
				/* type="string" specifies the content type of the request */
				contentType: "application/json; charset=utf-8"
			}
		},
		init: function (options) {
			if (!options) {
				options = {};
			} else {
				this._defaultTypeOverridden = options.restSettings && options.restSettings.contentType &&
					options.restSettings.contentType !== this.settings.restSettings.contentType;
			}
			options.restSettings = $.extend(true, this.settings.restSettings, options.restSettings);
			this._createHttpHandlers();
			this._createLogVerbMapping();
			this._setLazyUrls();
			this._super(options);
			return this;
		},
		saveChanges: function (success, error) {
			/* Posts to the restSettings urls using $.ajax, by serializing the changes as url params.
				```
					var ds = new $.ig.RESTDataSource({
					dataSource: products,
					primaryKey: "ProductID",
						restSettings: {
							create: {
								url: "/api/customers/",
								batch: true
							},
							update: {
								url: "/api/customers/",
								batch: true
							},
							remove: {
								url: "/api/customers/",
								batch: true
							}
						}
					});

					ds.dataBind();
					// POST
					ds.addRow(3, {"ProductID": 3, "Name": "BB Ball Bearing", "ProductNumber": "BE-2349"}, true);
					// DELETE
					ds.deleteRow(1, true);
					// PUT
					ds.updateRow(2, {"Name": "Ball Bearing", "ProductNumber": "BE-8329"}, true);
					ds.saveChanges();
				```
			*/

			// use $.ajax with the HTTP verb for every type of CRUD operation on the specified URL
			// for each entry in the transaction log create a new request
			// if batching is enabled create seperate arrays and send together
			var log, verb, batchOps = { "POST": [], "PUT": [], "DELETE": [], "CELL": [] }, i;
			/* set new callback count */
			this._asyncCallbackCount = 0;
			this._isc = success && typeof success === "function" ? success : null;
			this._iec = error && typeof error === "function" ? error : null;
			for (i = 0; i < this._accumulatedTransactionLog.length; i++) {
				log = this._accumulatedTransactionLog[ i ];
				verb = this._logVerbMap[ log.type ];
				if (log.type === "cell") {
					batchOps.CELL.push(log);
				} else if (this._isBatch(verb) === true) {
					batchOps[ verb ].push(log);
				} else {
					this._asyncCallbackCount++;
					this._saveSingleChange(verb, log);
				}
			}
			if (batchOps.CELL.length > 0) {
				this._saveAllCellChanges(batchOps.CELL);
			}
			if (batchOps.POST.length > 0) {
				this._asyncCallbackCount++;
				this._saveAllCreateChanges(batchOps.POST);
			}
			if (batchOps.PUT.length > 0) {
				this._asyncCallbackCount++;
				this._saveAllUpdateChanges(batchOps.PUT);
			}
			if (batchOps.DELETE.length > 0) {
				this._asyncCallbackCount++;
				this._saveAllDeleteChanges(batchOps.DELETE);
			}
		},
		_saveSingleChange: function (verb, change) {
			/* saves a single (nonbatch) transaction */
			var data, url;
			data = (verb === "POST" || verb === "PUT") ? change.row : null;
			url = this._getProperUrl(verb, false,
				(verb === "DELETE" || verb === "PUT") ? change.rowId : undefined);
			this._call(verb, url, data);
		},
		_saveAllCellChanges: function (cellLogs) {
			var i, combined = {}, rowLogs = [], cl;
			for (i = 0; i < cellLogs.length; i++) {
				cl = cellLogs[ i ];
				if (combined[ cl.rowId ] === undefined) {
					combined[ cl.rowId ] = {};
					combined[ cl.rowId ].row = this.findRecordByKey(cl.rowId);
				}
				combined[ cl.rowId ].row[ cl.col ] = cl.value;
			}
			/* normalize */
			$.each(combined, function (key, value) {
				value.rowId = key;
				rowLogs.push(value);
			});
			if (this._isBatch("PUT") === true) {
				this._asyncCallbackCount++;
				this._saveAllUpdateChanges(rowLogs);
			} else {
				for (i = 0; i < rowLogs.length; i++) {
					this._asyncCallbackCount++;
					this._saveSingleChange("PUT", rowLogs[ i ]);
				}
			}
		},
		_saveAllCreateChanges: function (createLogs) {
			var data = [], i;
			for (i = 0; i < createLogs.length; i++) {
				data.push(createLogs[ i ].row);
			}
			this._call("POST", this._getProperUrl("POST", true), data);
		},
		_saveAllUpdateChanges: function (updateLogs) {
			var data = [], urlParams = "?", i;
			for (i = 0; i < updateLogs.length; i++) {
				data.push(updateLogs[ i ].row);
				urlParams += "index=" + updateLogs[ i ].rowId + (i !== updateLogs.length - 1 ? "&" : "");
			}
			this._call("PUT", this._getProperUrl("PUT", true) + urlParams, data);
		},
		_saveAllDeleteChanges: function (deleteLogs) {
			var urlParams = "", i, data = null;
			if (this.settings.restSettings.encodeRemoveInRequestUri === true) {
				urlParams = "?";
				for (i = 0; i < deleteLogs.length; i++) {
					urlParams += "index=" + deleteLogs[ i ].rowId + (i !== deleteLogs.length - 1 ? "&" : "");
				}
			} else {
				data = [];
				for (i = 0; i < deleteLogs.length; i++) {
					data.push(deleteLogs[ i ].rowId);
				}
			}
			this._call("DELETE", this._getProperUrl("DELETE", true) + urlParams, data);
		},
		_createHttpHandlers: function () {
			// Adding only success related handlers
			//  handle errors accurately
			this._okHandler = $.proxy(this._responseOk, this);
			this._createdHandler = $.proxy(this._responseCreated, this);
			this._noContentHandler = $.proxy(this._responseNoContent, this);
			this._httpHandlers = {
				"POST": {
					"201": this._createdHandler
				},
				"PUT": {
					"200": this._okHandler,
					"201": this._createdHandler,
					"204": this._noContentHandler
				},
				"DELETE": {
					"200": this._okHandler,
					"204": this._noContentHandler
				}
			};
		},
		_createLogVerbMapping: function () {
			this._logVerbMap = {
				"newrow": "POST",
				"row": "PUT",
				"deleterow": "DELETE",
				"cell": "PUT"
			};
		},
		_setLazyUrls: function () {
			var rs = this.settings.restSettings, tempUrl = null, tempTmpl = null;
			/* get a single set value */
			$.each(rs, function (key, value) {
				if (value) {
					if (value.url) {
						tempUrl = value.url;
					}
					if (value.template) {
						tempTmpl = value.template;
					}
				}
			});
			/* use temp value on null options */
			$.each(rs, function (key, value) {
				if (value) {
					if (value.url !== undefined && value.url === null) {
						value.url = tempUrl;
					}
					if (value.template !== undefined && value.template === null) {
						value.template = tempTmpl;
					}
				}
			});
			/* set private urls */
			this._putUrl = rs.update.url;
			this._putTmpl = rs.update.template;
			this._postUrl = rs.create.url;
			this._postTmpl = rs.create.template;
			this._deleteUrl = rs.remove.url;
			this._deleteTmpl = rs.remove.template;
		},
		_getProperUrl: function (verb, batch, id) {
			var vL = verb.toLowerCase(), url = this[ "_" + vL + "Url" ];
			if (url && url.length > 0 && url.substr(url.length - 1) !== "/") {
				url += "/";
			}
			if (!batch || batch === false) {
				if (this[ "_" + vL + "Tmpl" ] !== null) {
					url = this[ "_" + vL + "Tmpl" ];
					if (id) {
						url = url.replace("${id}", id);
					}
				} else {
					if (id) {
						url += id;
					}
				}
			}
			return url;
		},
		/* All success codes are currently doing the same thing - decreasing the async callback count and checking if
		all async operations completed. If a more sophisticated status handling is required in the future these can be
		changed accordingly. */
		_responseOk: function (data, textStatus, jqXHR) {
			this._asyncCallbackCount--;
			if (this._asyncCallbackCount === 0) {
				this._saveChangesSuccess({ Success: textStatus === "success" }, textStatus, jqXHR);
			}
		},
		_responseCreated: function (data, textStatus, jqXHR) {
			this._asyncCallbackCount--;
			if (this._asyncCallbackCount === 0) {
				this._saveChangesSuccess({ Success: textStatus === "success" }, textStatus, jqXHR);
			}
		},
		_responseNoContent: function (data, textStatus, jqXHR) {
			this._asyncCallbackCount--;
			if (this._asyncCallbackCount === 0) {
				// with jquery 1.9+ 204 No Content with empty body would return textStatus = "nocontent"
				this._saveChangesSuccess({
					Success: textStatus === "success" || textStatus === "nocontent"
				}, textStatus, jqXHR);
			}
		},
		_isBatch: function (verb) {
			switch (verb) {
				case "POST":
					return this.settings.restSettings.create.batch;
				case "PUT":
					return this.settings.restSettings.update.batch;
				case "DELETE":
					return this.settings.restSettings.remove.batch;
				default:
					return false;
			}
		},
		_call: function (verb, url, data) {
			var dataString, ct = this.settings.restSettings.contentType,
				serializer = this.settings.restSettings.contentSerializer, self = this;
			if (serializer !== null) {
				// we can set the serializer as a string when initializing
				// the widget from an MVC wrapper
				if (typeof serializer === "string") {
					serializer = window[ serializer ];
				}
			}
			if (data !== null) {
				dataString = serializer !== null ? serializer(data) : JSON.stringify(data);
			} else {
				if (!this._defaultTypeOverridden) {
					// if body is empty we should be using plain text as content type since
					// an empty string is not a valid json string
					ct = "text/plain";
				}
				dataString = "";
			}
			this._ajaxRequest = $.ajax({
				type: verb,
				url: url,
				data: dataString,
				statusCode: this._httpHandlers[ verb ],
				contentType: ct,
				cache: false,
				success: function (data, textStatus, jqXHR) {
					if (self._isc) {
						self._isc(data, textStatus, jqXHR);
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					self._saveChangesError(jqXHR, textStatus, errorThrown);
					if (self._iec) {
						self._iec(jqXHR, textStatus, errorThrown);
					}
				},
				processData: true
			});
		}
	});
	$.ig.JSONPDataSource = $.ig.JSONPDataSource || $.ig.DataSource.extend({
		settings: {
			/* type="string|bool" Override the callback function name in a jsonp request. Sets option jsonp in $.ajax function
			string Override the callback function name in a jsonp request
			bool Setting the jsonp option to false prevents jQuery from adding the "?callback" string to the URL or attempting to use "=?" for transformation
			*/
			jsonp: null,
			/* type="string|function" Specify the callback function name for a JSONP request. Sets option jsonpCallback in $.ajax function
			string Setting the name of the callback function for a JSONP request
			function As of jQuery 1.5, you can also use a function, in which case the value of jsonpCallback is set to the return value of that function
			*/
			jsonpCallback: null
		},
		init: function (options) {
			if (!options) {
				options = {};
			}
			options.responseDataType = "jsonp";
			this._super(options);
			return this;
		}
	});
	$.ig.XmlDataSource = $.ig.XmlDataSource || $.ig.DataSource.extend({
		init: function (options) {
			if (!options) {
				options = {};
			}
			options.type = "xml";
			this._super(options);
			return this;
		}
	});
	$.ig.FunctionDataSource = $.ig.FunctionDataSource || $.ig.DataSource.extend({
		init: function (options) {
			if (!options) {
				options = {};
			}
			options.type = "function";
			this._super(options);
			return this;
		}
	});
	/* the dataSource should be a reference to a DOM element */
	$.ig.HtmlTableDataSource = $.ig.HtmlTableDataSource || $.ig.DataSource.extend({
		init: function (options) {

			if (!options) {
				options = {};
			}
			options.type = "htmlTableDom";
			this._super(options);
			return this;
		}
	});
	$.ig.ArrayDataSource = $.ig.ArrayDataSource || $.ig.DataSource.extend({
		init: function (options) {
			if (!options) {
				options = {};
			}
			options.type = "array";
			this._super(options);
			return this;
		}
	});
	/* the idea of the mashup data source is to combine several flat data sources from different locations into a single one
	primary key matching is performed if keys are defined in the respective flat DataSource instances
	after the mashup is processed, a combined data view and data instances are created and paging / sorting / filtering can work *locally* on the mashup
	when some of the mashup sources is remote, callbacks are executed in order, and the final data binding part to combine the mashup
	is called only when all of the individual data sources are data bound */
	$.ig.MashupDataSource = $.ig.MashupDataSource || $.ig.DataSource.extend({
		// the mashup data source is an array of flat data sources, which could be anything: local / remote / XML / JSON, etc.
		// if an element in the dataSource array is not of type $.ig.DataSource, then it is assumed to be in the following format:
		// {options }
		// where options will be used to create an $.ig.DataSource instance , example:
		//	var sources = [
		//		{dataSource: namedData, primaryKey: "ProductID"},
		//		{dataSource: "/demos/server/proxy.php?url=http://services.odata.org/OData/OData.svc/Products?$format=json", primaryKey: "ID"}
		//	];
		//
		//	var ds = new $.ig.MashupDataSource({callback:render, dataSource: sources});
		//	ds.dataBind();
		//
		/* type="object" Defines the configuration setting for the mashup data source. */
		mashupSettings: {
			/* type="bool" Indicates whether to ignore records that have no corresponding data in all of the provided data sources. */
			ignorePartialRecords: false,
			/* type="array" An array of $.ig.DataSource instances holding the disperse data. */
			dataSource: []
		},
		init: function (options) {
			// initialize $.ig.DataSource
			this._super(options);
			if (options) {
				this.settings =
					$.extend(true, {}, $.ig.DataSource.prototype.settings, options);
				this.settings =
					$.extend(true, {}, $.ig.MashupDataSource.prototype.mashupSettings, this.settings);
			}
			/* a list of flat data sources from which the mashup will be created */
			this._sources = [];
			this._dataBindingComplete = false;
			this._sourcesStatus = [];
			this._hashedDataViews = [];

			return this;
		},
		_checkDataBindingComplete: function (status, msg, ownerDs) {
			/* once this is done, set it as dataSource of the actual mashup data source, and call super's dataBind() */
			var i, j, k, hasPrimaryKeys = true, hasForeignKeys = false, totalLength = 0, data = [],
				merged = [], d, rindex = 0, keyVal, prop, keyIndexHash, fkeyIndexHash, mergedData;

			this._dataBindingComplete = true;

			for (i = 0; i < this._sources.length; i++) {
				if (this._sources[ i ] === ownerDs) {
					this._sourcesStatus[ i ] = 1;
				}

				if (this._sourcesStatus[ i ] === 0) {
					this._dataBindingComplete = false; // still expecting some data source
				}
			}
			/* now that we have all separate data sources bound individually, and their dataViews filled with data
			we start assembling the mashup data source, by doing indexing on the primary keys (if defined) */
			if (this._dataBindingComplete) {
				/* check if there are primary keys defined for every individual data source */
				for (i = 0; i < this._sources.length; i++) {
					if (this._sources[ i ].settings.primaryKey === "" ||
						this._sources[ i ].settings.primaryKey === null ||
						this._sources[ i ].settings.primaryKey === undefined) {
						hasPrimaryKeys = false;
						break;
					}
				}

				for (i = 0; i < this._sources.length; i++) {
					if (this._sources[ i ].settings.foreignKey !== "" &&
						this._sources[ i ].settings.foreignKey !== null &&
						this._sources[ i ].settings.foreignKey !== undefined) {
						hasForeignKeys = true;
						break;
					}
				}

				/* 1. determine the number of rows = max ( data source length) , also depending on the value of ignorePartialRecords
				the data source with the largest number of records defines the mashup data source length */
				totalLength = this._sources[ 0 ].dataView().length;
				for (i = 0; i < this._sources.length; i++) {
					totalLength = this.settings.ignorePartialRecords ?
						(this._sources[ i ].dataView().length < totalLength ?
						this._sources[ i ].dataView().length : totalLength) :
						(this._sources[ i ].dataView().length > totalLength ?
						this._sources[ i ].dataView().length : totalLength);
				}
				/* this also implies that there is schema present */
				if (hasPrimaryKeys && !hasForeignKeys) {
					// perform indexing based on the primary keys
					// for each data source, create hashes
					for (i = 0; i < this._sources.length; i++) {
						this._hashedDataViews[ i ] = {};
						/* consider the scenario where "primaryKey" is set to more than one field
						now iterate the records of the respective data source */
						for (j = 0; j < this._sources[ i ].dataView().length; j++) {
							this._hashedDataViews[ i ][ this._sources[ i ].dataView()[ j ]
								[ this._sources[ i ].settings.primaryKey ] ] = this._sources[ i ].dataView()[ j ];
						}
					}
					/* now fill-in the "data": */
					keyIndexHash = {};
					j = 0;
					for (i = 0; i < this._hashedDataViews.length; i++) {
						for (keyVal in this._hashedDataViews[ i ]) {
							if (this._hashedDataViews[ i ].hasOwnProperty(keyVal)) {
								if (keyIndexHash.hasOwnProperty(keyVal)) {
									data[ keyIndexHash[ keyVal ] ] =
										$.extend(true, {}, data[ keyIndexHash[ keyVal ] ], this._hashedDataViews[ i ][ keyVal ]);
									merged[ keyIndexHash[ keyVal ] ]++;
								} else {
									data.push({});
									merged.push(1);
									data[ j ] = $.extend(true, {}, data[ j ], this._hashedDataViews[ i ][ keyVal ]);
									keyIndexHash[ keyVal ] = j;
									j++;
								}
							}
						}
					}
					if (this.settings.ignorePartialRecords) {
						for (i = merged.length - 1; i >= 0; i--) {
							if (merged[ i ] < this._sources.length) {
								data.splice(i, 1);
							}
						}
					}
				} else if (hasForeignKeys && hasPrimaryKeys) {

					for (i = 0; i < this._sources.length; i++) {
						this._hashedDataViews[ i ] = {};
						for (j = 0; j < this._sources[ i ].dataView().length; j++) {
							this._hashedDataViews[ i ][ this._sources[ i ]
								.dataView()[ j ][ this._sources[ i ].settings.primaryKey ] ] =
								this._sources[ i ].dataView()[ j ];
						}
					}

					keyIndexHash = [ {} ];
					fkeyIndexHash = [ {} ];

					for (i = 0; i < this._hashedDataViews.length; i++) {
						j = 0;
						for (keyVal in this._hashedDataViews[ 0 ]) {
							if (this._hashedDataViews[ 0 ].hasOwnProperty(keyVal)) {
								if (!keyIndexHash[ i ]) {
									keyIndexHash.push({});
								}
								if (!keyIndexHash[ i ].hasOwnProperty(keyVal)) {
									keyIndexHash[ i ][ keyVal ] = j;
									j++;
									if (this._sources[ i + 1 ] && this._sources[ i + 1 ].settings.foreignKey) {
										if (!fkeyIndexHash[ i ]) {
											fkeyIndexHash.push({});
										}
										fkeyIndexHash[ i ][ keyVal ] =
											this._hashedDataViews[ 0 ][ keyVal ][ this._sources[ i + 1 ].settings.foreignKey ];
									}
								}
							}
						}
					}

					mergedData = $.extend(true, {}, data, this._hashedDataViews[ 0 ]);
					for (i = 0; i < this._hashedDataViews.length; i++) {
						if (this._sources[ i ].settings.foreignKey === null ||
						this._sources[ i ].settings.foreignKey === undefined) {
							//nothing to merge by
							continue;
						}
						mergedData = this._mergeSources(
							this._hashedDataViews[ i ],
							this._sources[ i ].settings.foreignKey,
							fkeyIndexHash[ i - 1 ], mergedData
						);
					}
					j = 0;
					for (var mergedRecKey in mergedData) {
						data[ j ] = mergedData[ mergedRecKey ];
						j++;
					}
				} else {
					// the easiest - no primary keys, process sequentially record by record
					for (i = 0; i < totalLength; i++) {
						data[ i ] = {};
						rindex = 0;
						for (j = 0; j < this._sources.length; j++) {
							d = this._sources[ j ];
							if (d.dataView()[ 0 ].length) {
								for (k = 0; k < d.dataView()[ 0 ].length; k++) {
									data[ i ][ rindex++ ] = i >= d.dataView().length ? "" : d.dataView()[ i ][ k ];
								}
							} else {
								for (prop in d.dataView()[ i ]) {
									if (d.dataView()[ i ].hasOwnProperty(prop)) {
										//if (d.schema() && d.schema().fields().length > 0) {
										//	data[i][d.schema().fields().prop] = i >= d.dataView().length ? '' : d.dataView()[i][d.schema().fields().prop];
										//} else {
										data[ i ][ prop ] = i >= d.dataView().length ? "" : d.dataView()[ i ][ prop ];
									}
								}
							}
						}
					}
				}
				this.settings.dataSource = data;
				this.settings.type = "array";
				this._runtimeType = this.analyzeDataSource();
				/* finally call the data binding of the mashup */
				this.dataBind();
			}
		},
		_mergeSources: function (dataView, fKey, fkeyIndex, data) {
			var newObject = {}, fkValueCollection;
			for (var recID in data) {
				if (Array.isArray(data[ recID ][ fKey ])) {
					newObject = {};
					fkValueCollection = data[ recID ][ fKey ];
					for (var fk in fkValueCollection) {
						var currValue = dataView[ fkValueCollection[ fk ] ];
						for (var variable in currValue) {
							if (variable !== fKey) {
								if (newObject.hasOwnProperty(variable)) {
									newObject[ variable ].push(currValue[ variable ]);
								} else {
									newObject[ variable ] = [ currValue[ variable ] ];
								}
							}
						}
					}
					data[ recID ] = $.extend(true, {}, data[ recID ], newObject);
				} else {
					data[ recID ] = $.extend(true, {}, data[ recID ], dataView[ fkeyIndex [ recID ] ]);
				}
			}
			return data;
		},
		setCellValue: function (rowId, colId, val, autoCommit) {
			/*  sets a cell value for the cell denoted by rowId and colId. Creates a transaction for the update operation and returns it
			```
				dsMashup.setCellValue(1, "Name", "CD Player", true);
			```
			paramType="object" the rowId - row key (string) or index (number)
			paramType="object" the column id - column key (string) or index (number)
			paramType="object" The new value
			paramType="bool" if autoCommit is true, it updates the datasource automatically and the transaction is still stored in the accumulated transaction log
			returnType="object". The transaction object that was created
			*/
			var rowObject = this.findRecordByKey(rowId, this._data),
				t, rec, self = this, newObject, lookupRecord;
			/* process transactions */
			$(this._sources).each(function () {
				if (this.settings.foreignKey && this.settings.foreignKey === colId) {
					if (Array.isArray(val)) {
						newObject = {};
						for (var value in val) {
							lookupRecord = this.dataSource()[ val[ value ] ];
							for (var variable in lookupRecord) {
								if (variable !== this.settings.foreignKey) {
									if (newObject.hasOwnProperty(variable)) {
										newObject[ variable ].push(lookupRecord[ variable ]);
									} else {
										newObject[ variable ] = [ lookupRecord[ variable ] ];
									}
								} else {
									newObject[ variable ] = val;
								}
							}
						}
						rowObject = $.extend(true, {}, rowObject, newObject);
					} else if (this.settings.foreignKey === colId) {
						rowObject = $.extend(true, {}, rowObject, this.dataSource()[ val ]);
					}
					/* update internal record */
					if (this.settings.primaryKey === null) {
						rec = self._data[ parseInt(rowId, 10) ];
					} else {
						rec = self.findRecordByKey(rowId, self._data);
					}
					for (var prop in rec) {
						rec[ prop ] = rowObject[ prop ];
					}
				}
			});

			t = this._createCellTransaction(rowId, colId, val);
			this._addTransaction(t);
			/* commit */
			if (autoCommit === true) {
				this.commit(rowId);
			}
			return t;
		},
		updateRow: function (rowId, rowObject, autoCommit) {
			/* updates a record in the datasource. Creates a transaction that can be committed / rolled back
			```
			dsMashup.updateRow(1, {
					Name: "DVD Player1",
					Price: "10",
					Rating: "5"
				}, true);
			```
			paramType="object" the record key - primaryKey (string) or index (number)
			paramType="object" the record object containing the key/value pairs we want to update. It doesn't have to include key/value pairs for all fields defined in the schema or in the data source (if no schema is defined)
			paramType="bool" if autoCommit is true, the datasource will be updated automatically and the transaction is still stored in the accumulated transaction log
			returnType="object". The transaction object that was created
			*/
			var t, newObject, lookupRecord,
				oldRow = (this.settings.primaryKey === null) ?
				this._data[ parseInt(rowId, 10) ] : this.findRecordByKey(rowId),
				rowIndex = (this.settings.primaryKey === null) ?
				rowId : $.ig.indexInArray(this._data, oldRow);
			/* process transaction */
			$(this._sources).each(function () {
				if (this.settings.foreignKey) {
					if (Array.isArray(rowObject[ this.settings.foreignKey ])) {
						newObject = {};
						for (var value in rowObject[ this.settings.foreignKey ]) {
							lookupRecord = this.dataSource()[ rowObject[ this.settings.foreignKey ][ value ] ];
							for (var variable in lookupRecord) {
								if (variable !== this.settings.foreignKey) {
									if (newObject.hasOwnProperty(variable)) {
										newObject[ variable ].push(lookupRecord[ variable ]);
									} else {
										newObject[ variable ] = [ lookupRecord[ variable ] ];
									}
								}
							}
						}
						rowObject = $.extend(true, {}, rowObject, newObject);
					} else if (rowObject[ this.settings.foreignKey ] !== oldRow[ this.settings.foreignKey ]) {
						rowObject = $.extend(true, {}, rowObject,
							this.dataSource()[ rowObject[ this.settings.foreignKey ] ]);
					}
				}
			});
			/* create transaction */
			t = this._createRowTransaction(rowId, rowObject);
			this._addTransaction(t);
			/* commit */
			if (autoCommit === true) {
				this.commit(rowId);
			}
			if ($.type(this.settings.rowUpdated) === "function") {
				if (this.settings.callee) {
					this.settings.rowUpdated.apply(this.settings.callee, [ {
						rowIndex: rowIndex, newRow: rowObject, oldRow: oldRow
					}, this ]);
				} else {
					this.settings.rowUpdated({ rowIndex: rowIndex, newRow: rowObject, oldRow: oldRow }, this);
				}
			}
			return t;
		},
		addRow: function (rowId, rowObject, autoCommit) {
			/* adds a new row to the data source. Creates a transaction that can be committed / rolled back
			```
				var dsMashup;

				var render = function (success, error) {
					if (success) {
					dsMashup.addRow(123, {Name : "CD Player", Description: "", Rating : 4, Price : 40}, true);
						var template = "<tr><td>${ID}</td><td>${Name}</td><td>${Description}</td><td>${Rating}</td><td>${Price}</td></tr>",
					    resultHtml = $.ig.tmpl(template, dsMashup.dataView());
						$("#mashupDataSource").html(resultHtml);
					} else {
						alert(error);
					}
				}

				$(window).load(function () {
					dsMashup = new $.%%WidgetName%%({
						callback: render,
						dataSource: mashupSources
					});
					dsMashup.dataBind();
				});
			```
			paramType="object" the record key - primaryKey (string) or index (number)
			paramType="object" the new record data.
			paramType="bool" if autoCommit is true, the datasource will be updated automatically and the transaction is still stored in the accumulated transaction log
			returnType="object". The transaction object that was created
			*/
			var t, newObject, lookupRecord;
			/* process transactions */
			$(this._sources).each(function () {
				if (this.settings.foreignKey) {
					if (Array.isArray(rowObject[ this.settings.foreignKey ])) {
						newObject = {};
						for (var value in rowObject[ this.settings.foreignKey ]) {
							lookupRecord = this.dataSource()[ rowObject[ this.settings.foreignKey ][ value ] ];
							for (var variable in lookupRecord) {
								if (variable !== this.settings.foreignKey) {
									if (newObject.hasOwnProperty(variable)) {
										newObject[ variable ].push(lookupRecord[ variable ]);
									} else {
										newObject[ variable ] = [ lookupRecord[ variable ] ];
									}
								}
							}
						}
						rowObject = $.extend(true, {}, rowObject, newObject);
					} else {
						rowObject = $.extend(true, {}, rowObject,
							this.dataSource()[ rowObject[ this.settings.foreignKey ] ]);
					}
				}
			});

			t = this._createNewRowTransaction(rowId, rowObject);
			this._addTransaction(t);
			/* commit */
			if (autoCommit === true) {
				this.commit(rowId);
			}
			if ($.type(this.settings.rowAdded) === "function") {
				if (this.settings.callee) {
					this.settings.rowAdded.apply(this.settings.callee, [ {
						rowId: rowId, row: rowObject
					}, this ]);
				} else {
					this.settings.rowAdded({ rowId: rowId, row: rowObject }, this);
				}
			}
			return t;
		},
		/* M.P.: 183193 - The igniteui.d.ts file is not compiling */
		/* jshint unused:false */
		insertRow: function (rowId, rowObject, rowIndex, autoCommit, parentRowId) {
			/* adds a new row to the data source. Creates a transaction that can be committed / rolled back
			```
				var dsMashup;

				var render = function (success, error) {
					if (success) {
						dsMashup.insertRow(123, {
							Name: "CD Player",
							Price: "40",
							Rating: "4"
						}, 1, true);
						var template = "<tr><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
						resultHtml = $.ig.tmpl(template, dsMashup.dataView());
						$("#table").html(resultHtml);
					} else {
						alert(error);
					}
				}

				$(window).load(function () {
					dsMashup = new $.%%WidgetName%%({
						callback: render,
						dataSource: mashupSources
					});
				dsMashup.dataBind();

				});
			```
			paramType="object" the record key - primaryKey (string) or index (number)
			paramType="object" the new record data.
			paramType="number" row index at which to insert the new row
			paramType="bool" if autoCommit is true, the datasource will be updated automatically and the transaction is still stored in the accumulated transaction log
			paramType="object" Not used in $.ig.DataSource
			returnType="object". The transaction object that was created
			*/
			var t, newObject, lookupRecord, oldRow;
			/* process transactions */
			$(this._sources).each(function () {
				if (this.settings.foreignKey) {
					if (Array.isArray(rowObject[ this.settings.foreignKey ])) {
						newObject = {};
						for (var value in rowObject[ this.settings.foreignKey ]) {
							lookupRecord = this.dataSource()[ rowObject[ this.settings.foreignKey ][ value ] ];
							for (var variable in lookupRecord) {
								if (variable !== this.settings.foreignKey) {
									if (newObject.hasOwnProperty(variable)) {
										newObject[ variable ].push(lookupRecord[ variable ]);
									} else {
										newObject[ variable ] = [ lookupRecord[ variable ] ];
									}
								}
							}
						}
						rowObject = $.extend(true, {}, rowObject, newObject);
					} else {
						rowObject = $.extend(true, {}, rowObject,
							this.dataSource()[ rowObject[ this.settings.foreignKey ] ]);
					}
				}
			});
			t = this._createInsertRowTransaction(rowId, rowObject, rowIndex);
			this._addTransaction(t);
			/* commit */
			if (autoCommit === true) {
				this.commit(rowId);
			}
			if ($.type(this.settings.rowInserted) === "function") {
				if (this.settings.callee) {
					this.settings.rowInserted.apply(this.settings.callee, [ {
						rowId: rowId, row: rowObject, rowIndex: rowIndex
					}, this ]);
				} else {
					this.settings.rowInserted({ rowId: rowId, row: rowObject, rowIndex: rowIndex }, this);
				}
			}
			return t;
		},
		dataBind: function () {
		/* Data binds to the current data source.
			```
				var mashupSources = [
					{ dataSource: jsArray, primaryKey: "ID" },
					{ dataSource: xmlDoc, type: "xml", primaryKey: "ID" ,schema: xmlSchema }
				];
				var dsMashup = new $.ig.MashupDataSource({ dataSource: mashupSources });
				dsMashup.dataBind();
			```
		*/

			var i, ds = this.settings.dataSource;
			if (this._dataBindingComplete || this._sources.length > 0) {
				// we can proceed to data binding the mashup
				this._dataBindingComplete = false; // reset
				this._super();
			} else {
				/* setup the mashup for binding its individual data sources */
				this._dataBindingComplete = false;
				/* traverse the sources and instantiate a data source object, if not already passed as parameter */
				for (i = 0; i < ds.length; i++) {
					if (ds[ i ] instanceof $.ig.DataSource) {
						this._sources[ i ] = ds[ i ];
					} else if (ds[ i ].hasOwnProperty("dataSource") &&
						ds[ i ].dataSource instanceof $.ig.DataSource) {
						// K.D. November 17th, 2011 Bug #83399 There are cases where the dataSource property of the
						// individual member is set to an $.ig.DataSource
						this._sources[ i ] = ds[ i ].dataSource;
					} else {
						this._sources[ i ] = new $.ig.DataSource(ds[ i ]);
					}
					/* now data bind
					attach a callback that will keep track of the data binding progress of all individual data sources */
					this._sources[ i ].settings.callee = this;
					this._sources[ i ].settings.callback = this._checkDataBindingComplete;
					this._sourcesStatus[ i ] = 0; // mark the data source as not bound yet
				}
				for (i = 0; i < ds.length; i++) {
					this._sources[ i ].dataBind();
				}
			}
			return this;
		}
	});
	/* $.ig.HierarchicalDataSource = $.ig.HierarchicalDataSource || $.ig.DataSource.extend({
	the hierarchical data source won't extend the flat one
	as long as there is no paging or sorting or filtering, we don't need to create objects for flat ds'es */
	$.ig.HierarchicalDataSource = $.ig.HierarchicalDataSource || Class.extend({
		settings: {
			// autogenerate will have limited support, since we cannot automatically infer which are the primary keys, therefore scenarios such as cascade delete or
			// hierarchies when multiple flat sources are combined will not work correctly.
			autogenerate: false, // if this property is true, the contents of "childbands" is ignored.
			// load on demand support: always load only the top level
			// think about how to 'tell' the server that we do not want children to be loaded
			initialDataBindDepth: 0,
			maxDataBindDepth: -1, // bind all levels by default
			defaultChildrenDataProperty: "children", // identifies the default property name in the data source where child nodes will be stored relative to their parent node/record
			//childbands: null, // a list of schemas and options, one for every level that we want to bind. Note that schemas here is different than relations.
			// two defined schemas may have more than one relation defined.
			//these two properties define if we want to do lazy loading based on virtualization, too.
			// if virtualization is enabled, we may want to cache/load the data views for those records
			//startRecord: -1,
			//endRecord: -1
			callback: null,
			callee: null,
			data: [],
			dataSource: null,
			dataBinding: null,
			dataBound: null,
			/* other options */
			type: "unknown", // delegates to the flat data sources
			responseDataType: null,
			responseContentType: null,
			localSchemaTransform: true,
			urlParamsEncoding: null,
			urlParamsEncoded: null,
			requestType: "GET",
			odata: false,
			paging: {

			},
			sorting: {

			},
			filtering: {

			},
			/* all of the rest - paging, sorting, filtering, can be defined in the layouts definition, which will "override" the parent defs
			IMPORTANT:  if there is no paging, sorting or filtering, an instance of $.ig.DataSource won't be created for child row islands */
			schema: [
			/* defined like this:
			{name: "someKey", type: "string", layouts: [
			{
			paging: { },
			sorting: { },
			filtering: { },
			childrenDataProperty: "children",
			foreignKey: "fk",
			// other flat grid specific props
			schema: [ ]
			}
			]},
			{name: "anotherKey", type: "string"}
			*/
			]
		},
		init: function (options) {
			// merge defaults with passed-in values
			if (options) {
				this.__ds = options.dataSource;
				options.dataSource = null;
				this.settings = $.extend(true, {}, $.ig.HierarchicalDataSource.prototype.settings, options);
				this.settings.dataSource = this.__ds;
			}
			this._rootopts = this.settings;
			/* necessary to push all of the layout children props
			this._rootopts.schema.fields.push({name: this.settings.defaultChildrenDataProperty});
			depending on the value of initialDataBindDepth, we need to encode the URL so that load on demand works */
			this._rootopts.urlParamsEncoded = $.proxy(this._encodeHierarchicalUrlParams, this);
			/* K.D. April 22nd, 2014 Bug #169669 instanceof does not work in an iframe. */
			if (this._rootopts.dataSource && typeof this._rootopts.dataSource._xmlToArray === "function" &&
					typeof this._rootopts.dataSource._encodePkParams === "function") {
				this._rootds = this._rootopts.dataSource;
				this._rootds.settings.urlParamsEncoded = this.settings.urlParamsEncoded;
				this._rootds.settings.odata = this.settings.odata;
				if (!this._rootds.settings.schema) {
					this._rootds.settings.schema = {};
				}
				this._rootds.settings.schema.layouts = this.settings.schema.layouts;
			} else {
				if ($.type(this._rootopts.dataSource) === "string" &&
					this._rootopts.dataSource.indexOf("$callback=?") !== -1) {
					this._rootds = new $.ig.JSONPDataSource(this._rootopts);
				} else if (this._rootopts.restSettings &&
					(this._rootopts.restSettings.update.url !== null ||
					this._rootopts.restSettings.update.template !== null ||
					this._rootopts.restSettings.create.url !== null ||
					this._rootopts.restSettings.create.template !== null ||
					this._rootopts.restSettings.remove.url !== null ||
					this._rootopts.restSettings.remove.template !== null)) {
					this._rootds = new $.ig.RESTDataSource(this._rootopts);
				} else {
					this._rootds = new $.ig.DataSource(this._rootopts);
				}
			}
		},
		dataBind: function (callback, callee) {
			// scenario -> paging on the top level, and then paging on a child level with different page size
			// if it is local, there shouldn't be any problem
			// if it is remote, we need to additionally "craft" the URL of the root data source
			// additionally, when there is remote sorting, paging, or filtering on a child level, we must always pass the
			// path in the child flat source

			//1. create a flat data source by creating its options first

			//2. check if the request is remote or local, if remote, "inject" the necessary additional URL parts (paging/sorting/filtering) so that the
			// correct data gets pulled out
			// make sure the property marked with defaultChildrenDataProperty is part of he schema
			// also add all custom children data properties defined in custom layouts
			this._rootds.dataBind(callback, callee);
		},
		root: function () {
			if (!this._rootds) {
				this._rootds = new $.ig.DataSource(this._rootopts);
			}
			return this._rootds;
		},
		dataAt: function (path, keyspath) {
			// search the data. the data source must be indexed to speed up this access.
			var data = this.root().data(), paths = path.split("/"),
				kp = keyspath.split("/"), k, i, searchField = "Records",
				j, cd = null, ckey = this.settings.primaryKey, ckeyval = "",
				ckeys = [], ckeyvals = [], match = false;
			for (i = 0; i < paths.length; i++) {
				ckey = paths[ i ].split(":")[ 0 ];
				ckeyval = paths[ i ].split(":")[ 1 ];
				/* NOTE: composite keys are keys whose values are separated by a comma. if ckey or ckeyval contain commas,
				then the key is assumed to be composite and will be split based on "," */
				if (paths[ i ] !== "") {
					for (j = 0; data && j < data.length; j++) {
						if (data[ j ][ ckey ] !== undefined && !data[ j ][ ckey ].charAt && ckeyval.charAt) {
							ckeyval = parseInt(ckeyval, 10);
						}
						match = (data[ j ][ ckey ] === ckeyval);
						/* special case when we have responseDataKey / search
						fields defined for every children data instance */
						if (match) {
							// get the children
							cd = data[ j ][ kp[ i ] ];
							/* L.A. 14 January 2013 - Fixing bug #130634 -
							JS errors when having a second child layout and using knockout. */
							searchField = this.root().schema &&
								this.root().schema() &&
								this.root().schema().schema ?
									this.root().schema().schema.searchField : searchField;
							if (cd && paths.length > 1 && i < paths.length - 1 &&
								$.type(cd) !== "array" && cd[ searchField ]) {
								cd = cd[ searchField ];
							}
							break;
						}
					}
					data = cd;
				}
			}
			return cd;
		},
		/*
		populate: function (path, callback, params) {
		// after data is populated, call "callback" with "args" as arguments
		var url, o;
		// 1. get the url of the root ds (this._rootopts.dataSource)
		url = this._rootopts.dataSource;
		// construct params based on opts
		o = {
		url: url,
		dataType: this._rootopts.responseDataType,
		async: true,
		context: this,
		cache: false,
		data: params,
		success: this._hierarchicalProcessResponse
		};
		$.ajax(o);
		},
		_hierarchicalProcessResponse: function (data) {
		// data must be an object that contains data sources for each respective layout, as well as a "path"
		// property which specifies the location if the parent row

		//1. get the path from the response and locate the additional data from the queue
		// XML?
		},
		*/
		_encodeUrlPath: function (rowid, name) {
			// we need to encode the current parent record path, when child records have their data sources set
			return "path=" + rowid + "&layout=" + name;
		},
		_encodeHierarchicalUrlParams: function (owner, args) {
			var expand = "", layouts = this.settings.schema.layouts, i, j, tmp, name, lc = 0;
			if (this.settings.odata && this.settings.initialDataBindDepth !== 0) {
				// use the OData $expand API
				// http://www.odata.org/developers/protocols/uri-conventions#ExpandSystemQueryOption
				// parse the root layouts in order to construct the expand statement
				i = j = 0;
				for (name in layouts) {
					if (layouts.hasOwnProperty(name)) {
						lc++;
					}
				}
				lc++;
				/*
				for (name in layouts) {
				if (layouts.hasOwnProperty(name) && $.type(layouts[name]) !== "function") {
				tmp = layouts[name].key;
				currentLayout = layouts[name];
				while (currentLayout.columnLayouts) {
				for (child in currentLayout.columnLayouts) {
				if (currentLayout.columnLayouts.hasOwnProperty(child)) {
				currentLayout = currentLayout.columnLayouts[child];
				break;
				}
				// OData supports only one band (one relationship)
				}
				tmp += "/" + currentLayout.key;
				}
				if (i !== 0 && i !== lc - 1) {
				expand += ",";
				}
				expand += tmp;
				i++;
				}
				}
				*/
				for (name in layouts) {
					if (layouts.hasOwnProperty(name)) {
						if ($.type(layouts[ name ]) !== "function") {
							if (name.startsWith("/")) {
								name = name.substring(1, name.length - 1);
							}
							tmp = name.split("/");
							for (i = 0; i < tmp.length; i++) {
								tmp[ i ] = tmp[ i ].substring(0, tmp[ i ].indexOf(":"));
							}
							tmp = tmp.join("/");
							if (j !== 0 && j !== lc - 1) {
								expand += ",";
							}
							expand += tmp;
							j++;
						}
					}
				}
				args.selectParams.$expand = expand;
			} else {
				/* encode the initialDataBindDepth in the args
				use args.selectParams to encode the initialDataBindDepth */
				args.selectParams.dbdepth = this.settings.initialDataBindDepth;
				/* we need to encode initial URL params in case paging / sorting / filtering are enabled on child layouts
				and their type is set to remote ! */
			}
		}
	});
	$.ig.TreeHierarchicalDataSource = $.ig.TreeHierarchicalDataSource || $.ig.DataSource.extend({
		/* Configure datasource settings */
		settings: {
			/* Configure tree datasource specific settings */
			treeDS: {
				/* type="string" Property name of the array of child data in a hierarchical data source.*/
				childDataKey: null,
				/* type="string" Unique identifier used in a self-referencing flat data source. Used with primaryKey to create a relationship among flat data sources. */
				foreignKey: null,
				/* type="number" Specifies the depth down to which the tree grid would be expanded upon initial render. To expand all rows set value to -1. Default is -1. */
				initialExpandDepth: -1,
				/* type="bool" Specifies if data is loaded on demand from a remote server. Default is false. */
				enableRemoteLoadOnDemand: false,
				/* type="string" specifies a remote URL as a data source, from which data will be retrieved using an AJAX call ($.ajax)*/
				dataSourceUrl: null,
				/*type="function" Specifies a custom function to be called when the remote request for data has finished. */
				requestDataCallback: null,
				/*type="function" Specifies a custom function to be called when the remote request for data has finished successfully. */
				requestDataSuccessCallback: null,
				/*type="function" Specifies a custom function to be called when the remote request for data has finished with an error. */
				requestDataErrorCallback: null,
				/* type="string" The name of the property that keeps track of the expansion state of a data item. Defaults to __ig_options.expanded.*/
				propertyExpanded: "__ig_options.expanded",
				/* type="string" The name of the property that keeps track of the level in the hierarchy.Defaults to __ig_options.dataLevel.*/
				propertyDataLevel: "__ig_options.dataLevel",
				/* type="bool" if set to TRUE it is expected that the source of data is normalized and transformed(has set dataLevel and expansion state). The source of data is used as flatDataView. Usually used when the paging is remote and paging mode is allLevels, or features are remote(and the processing of the returned result should be made on the server)
				```
				var ds = new $.%%WidgetName%%({
								dataSource: products,
								treeDS: {
									initialFlatDataView: true
								}
							});
				```
				*/
				initialFlatDataView: false,
				/*type="function" Specifies a custom function to be called when requesting data to the server - usually when expanding/collapsing record. If set the function should return the encoded URL. It takes as parameters: data record(type: object), expand - (type: bool).
				```
 				var ds = new $.%%WidgetName%%({
 								dataSource: products,
 								treeDS: {
 									customEncodeUrlFunc: function(record, expand){
 										var dsUrl = ds.settings.treeDS.dataSourceUrl;
 										var path = ds.getPathBy(record);
 										return dsUrl + "?" + "path=" + path + "&depth= " + record[ds.settings.treeDS.propertyDataLevel];
 									}
 								}
 							});
 				```
				*/
				customEncodeUrlFunc: null,
				/*type="bool" If true save expansion states in internal list and send it to the server. Applying to one of the main constraint of the REST architecture  Stateless Interactions - client specific data(like expansion states) should NOT be stored on the server
				```
				var ds = new $.%%WidgetName%%({
								dataSource: products,
								treeDS: {
									persistExpansionStates: true
								}
							});
				```
				*/
				persistExpansionStates: false,
				/* Configure datasource filtering settings. */
				filtering: {
					/* type="number" specifies from which data bound level to be applied filtering - 0 is the first level */
					fromLevel: 0,
					/* type="number" specifies to which data bound level to be applied filtering - if -1 filtering should be applied to the last data bound level*/
					toLevel: -1,
					/* type="showWithAncestors|showWithAncestorsAndDescendants" If displayMode is showWithAncestorsAndDescendants, show all records that match filtering conditions and their child records, even if child records don't match filtering conditions. If displayMode is showWithAncestors show only those records that match filtering conditions and do not show child records(if any) that don't match filtering conditions */
					displayMode: "showWithAncestors",
					/* type="string" Filtering data source specific property - name of property in dataRecord object - indicates whether dataRow matches filtering conditions. It is used ONLY when filtering is applied. */
					matchFiltering: "__matchFiltering"
				},
				/* Configure datasource sorting settings. */
				sorting: {
					/* type="number" specifies from which data bound level to be applied sorting - 0 is the first level */
					fromLevel: 0,
					/* type="number" specifies to which data bound level to be applied sorting - if -1 sorting should be applied to the last data bound level */
					toLevel: -1
				},
				/* Configure datasource paging settings. */
				paging: {
					/* type="rootLevelOnly |allLevels" Sets gets paging mode.
					rootLevelOnly type="string" Only pages records at the root of the tree grid are displayed.
					allLevels type="string" includes all visible records in paging.*/
					mode: "rootLevelOnly",
					/* type="none|parent|breadcrumb" When data flows to the next page there are a couple of different modes that can help communicate the context of a leaf level row. When mode option is 'rootLevelOnly' then the context row always shows the value of the contextRowRootText option.
					none type="string" Does not render the contextual row
					parent type="string" Renders a read-only representation of the immediate parent row
					breadcrumb type="string" Renders a read-only breadcrumb trail representing the full path through all ancestors
					```
					var ds = new $.%%WidgetName%%({
								dataSource: products,
								paging: {
									enabled : true,
									pageSize:10,
									type: "local",
									contextRowMode: "breadcrumb"
								},
								treeDS: {
									paging: {
									  mode: "allLevels"
									}
								}
							});
					```
					*/
					contextRowMode: "none"
				}
			}
		},
		_isHierarchicalDataSource: true,
		init: function (options) {
			if (!options) {
				options = {};
			}
			/* M.H. 13 Nov 2014 Fix for bug #185114: The generation of the primary
			key value when adding new row is not correct for the treegrid */
			this._totalRecordsCount = 0;
			options.treeDS = $.extend(true, {}, this.settings.treeDS, options.treeDS);
			this._flatVisibleData = [];
			this._super(options);
			this._isHierarchicalDataSource = options.treeDS.foreignKey === null ? true : false;
			return this;
		},
		_checkGeneratedSchema: function () {
			var s = this.settings.treeDS,
				fs = this.settings.filtering,
				propertyExp = s.propertyExpanded,
				propertyMatchFiltering = s.filtering.matchFiltering;
			this._checkGeneratedSchemaByKey(s.childDataKey);
			if (!this._isHierarchicalDataSource) {
				this._checkGeneratedSchemaByKey(s.foreignKey);
			}
			if (propertyExp !== null && propertyExp !== undefined) {
				this._addSchemaField(propertyExp, "boolean");
			}
			if (fs && fs.enabled && fs.type === "remote" && propertyMatchFiltering) {
				this._addSchemaField(propertyMatchFiltering, "boolean");
			}
			if (s.initialFlatDataView && s.propertyDataLevel) {
				this._addSchemaField(s.propertyDataLevel, "number");
			}
		},
		_addSchemaField: function (propName, propType) {
			if (!this.schema() || !this.schema().schema) {
				return;
			}
			var i, schema = this.schema().schema,
				fields = schema.fields;
			if ($.type(fields) !== "array") {
				return;
			}
			for (i = 0; i < fields.length; i++) {
				// transform date
				if (fields[ i ].name === propName) {
					return;
				}
			}
			schema.fields.push({ name: propName, type: propType });
		},
		_checkGeneratedSchemaByKey: function (key) {
			if (key === null || key === undefined) {
				return;
			}
			var schema = this.schema(), i, fields = schema.fields(), fL = fields.length;
			for (i = 0; i < fL; i++) {
				if (fields[ i ].name === key) {
					// M.H. 27 Oct 2014 Fix for bug #183852: When there are autoGeneratedColumns treegrid does not bind to records after the first level
					if (fields[ i ].name === this.settings.treeDS.childDataKey && fields[ i ].type) {
						delete fields[ i ].type;
					}
					break;
				}
			}
			if (i === fL) {
				fields.push({ name: key });
			}
		},
		dataBind: function (callback, callee) {
			/* data binds to the current data source
			databinding works using the following workflow:
			1. fire the databinding event
			2. based on the data source type (see analyzeDataSource()), do the following:
			3. if type is HtmlTable, parse the table and set the data and dataView respectively.
			if the type is Function, call it, apply Paging/Filtering/Sorting, and set this._dataView . If the developer wants to do his own paging, filtering or sorting
			in that case, then he should handle the PageIndexChanging and/or DataFiltering, and/or ColumnSorting client-side events, and cancel them.
			if no paging/sorting/filtering are enabled, use just this._data to save space
			if the data source is of type RemoteUrl, use jQuery's $.ajax API to trigger a remote request to the service. Use the param() API to encode the URL
			if the data source is invalid, throw an exception
			if the analyzed runtime data source type , that is, the result of analyzeDataSource(), is Unknown, check if
			the value of settings.type is set to XML or JSON. If string, eval for JSON, and parse for the XML to build the object ree
			4. now normalize/transform the data, if a schema is supplied. This inplies any additional data type  conversion
			5. next, if OpType is Local, apply paging, sorting, and/or filtering to the data, and store the result in this._dataView
			6. fire the databound event

			paramType="string" optional="true" callback function
			paramType="object" optional="true" callee object on which the callback will be executed. If none is specified, will assume global execution context
			*/

			// M.H. 13 Nov 2014 Fix for bug #185114: The generation of the primary key value when adding new row is not correct for the treegrid
			this._totalRecordsCount = 0;
			this._dataBinding = true;
			this._isHierarchicalDataSource = this.settings.treeDS.foreignKey === null ? true : false;
			var s = this.schema();
			this.isTransformedToHierarchicalData(false);
			if (s) {
				if (this.schema().schema.fields.length !== 0 ||
					this.settings.treeDS.enableRemoteLoadOnDemand) {
					this._checkGeneratedSchema();
				}
				/* overwrite default schema transform function - for now there is no igTreeHierarchicalSchema */
				if (!this._transformCallback) {
					this._transformCallback = $.proxy(s.transform, s);
					s.transform = $.proxy(this._transformSchema, this);
				}
			}
			this._flatDataView = [];
			this._generatedFlatData = false;
			this._dataBoundDepth = null;
			this._super(callback, callee);
		},
		getParentRowsForRow: function (dataRow, ds) {
			/*Gets the passed record's parent records
			paramType="object" optional="false" the child record.
			paramType="object" optional="true" the data source in which to search for the related parent records.
			returnType="object" the array of parent records of the specified child record.
			*/
			var key, data = ds || this._data, search, propL, i, res,
				objPath = {}, rec, prows;
			if (dataRow === undefined || dataRow === null) {
				return [];
			}
			if ($.type(dataRow) === "object") {
				search = data && $.isArray(data[ 0 ]) ? this._lookupPkIndex() : this.settings.primaryKey;
				key = dataRow[ search ];
				if (key === undefined || key === null) {
					return [];
				}
			} else {
				key = dataRow;
			}
			if (this._metadata &&
				$.type(this._metadata.ancestors) === "array") {
				prows = this._metadata.ancestors;
				propL = this.settings.treeDS.propertyDataLevel;
				res = [];
				for (i = 0; i < prows.length; i++) {
					res.push({
						// M.H. 24 July 2015 Fix for bug 203125: The dates in Paging Context Row are not correct.
						row: this.schema()._row(prows[ i ]),
						level: prows[ i ][ propL ]
					});
				}
				return res;
			}

			rec = this.findRecordByKey(key, data, objPath);
			if (!rec) {
				return [];
			}
			return objPath.parentRows;
			/*var i, d, layouts = [], res = [], path, l,
				data = ds || this._data,
				len = data ? data.length : 0,
				dsLayoutKey = this.settings.treeDS.childDataKey,
				rowLevel = dataRow[this.settings.treeDS.propertyDataLevel];
			currLevel = currLevel || 0;
			for (i = 0; i < len; i++) {
				d = data[i];
				if (d === dataRow) {
					return [{row: dataRow, level: rowLevel}];
				}
				if (d[dsLayoutKey]) {
					layouts.push({ row: d, layout: d[dsLayoutKey] });
				}
			}
			if (rowLevel < currLevel + 1) {
				return false;
			}
			len = layouts.length;
			for (i = 0; i < len; i++) {
				l = layouts[i];
				res = this.getParentRowsForRow(dataRow, l.layout, currLevel + 1);
				if (res) {
					res.unshift({ row: l.row, level: currLevel });
					return res;
				}
			}
			return false;*/
		},
		_internalDataBound: function (callDatabound) {
			this._dataBinding = false;
			this._super(callDatabound);
		},
		_completeCallback: function () {
			this.generateFlatDataView();
			this._super();
		},
		getDataBoundDepth: function () {
			/*Gets the current data bound depth of the tree grid hierarchy.*/
			if (this._dataBoundDepth === null || this._dataBoundDepth === undefined) {
				this._dataBoundDepth = 0;
				this._getDataBoundDepthRecursive();
			}
			return this._dataBoundDepth;
		},
		_getDataBoundDepthRecursive: function (data, level) {
			var i, layoutKey = this.settings.treeDS.childDataKey, dataLen, dataRow;
			if (!this._dataBoundDepth) {
				this._dataBoundDepth = 0;
			}
			if (!level) {
				level = 0;
			}
			if (data === undefined) {
				data = this.data();
			}
			if (level > this._dataBoundDepth) {
				this._dataBoundDepth = level;
			}
			if ($.type(data) === "array") {
				dataLen = data.length;

				//data = this._transformCallback(data);
				for (i = 0; i < dataLen; i++) {
					dataRow = data[ i ];
					if (!dataRow) {
						continue;
					}
					if (dataRow && $.type(dataRow[ layoutKey ]) === "array" &&
									dataRow[ layoutKey ].length) {
						this._getDataBoundDepthRecursive(dataRow[ layoutKey ], level + 1);
					}
				}
			}
		},
		/* override _processJsonResponse */
		_processJsonResponse: function (data, context) {
			// if metadata has initialFlatDataView set to TRUE then it is supposed that the response data is flat data view(processed for the needs of TreeHierarchicalDataSource - like it has expansion, dataLevel set)
			this.schema()._processMetadata(data);
			if (data && data.Metadata && data.Metadata.initialFlatDataView !== undefined) {
				this.settings.treeDS.initialFlatDataView = data.Metadata.initialFlatDataView;
				/* check if the schema has dataLevel property */
				this._checkGeneratedSchema();
			}
			return this._super(data, context);
		},
		/* functions for transforming flat DS to hierarchical DS */
		isTransformedToHierarchicalData: function (isTransformed) {
			/*Gets/Sets whether the data source has been transformed from flat to hierarchical
			paramType="bool" optional="true" Determines if the data source is marked as transformed or not.
			*/
			if (isTransformed === undefined || isTransformed === null) {
				return this._transformedHierarchicaData;
			}
			this._transformedHierarchicaData = isTransformed;
		},
		transformToHierarchicalData: function (data) {
			/* Transforms flat data to hierararchical data and returns the result
			paramType="object" optional="false" The flat data that will be transformed to hierarchical
			returnType="object" the transformed data source.
			*/
			if ($.type(data) !== "array") {
				return data;
			}
			var i, rowData, nData,
				parents = [], children = [],
				dataLen = data.length;

			for (i = 0; i < dataLen; i++) {
				rowData = $.extend(true, {}, data[ i ]);
				if (this._hasRecordParent(rowData, data)) {
					children.push(rowData);
				} else {
					parents.push(rowData);
				}
			}
			nData = this._getDataLayouts(parents, children);
			/* transform DS */
			this.isTransformedToHierarchicalData(true);
			return nData;
		},
		_getDataLayouts: function (parents, children) {
			var i, pLen = parents.length, key = this.settings.primaryKey,
				layoutKey = this.settings.treeDS.childDataKey, res = [], parent, cp;
			for (i = 0; i < pLen; i++) {
				parent = parents[ i ];
				cp = this._getChildrenByKeyInFlatDS(parents[ i ][ key ], children);
				children = cp.others;
				if (cp.children.length > 0) {
					// we should generate columnLayout
					parent[ layoutKey ] = this._getDataLayouts(cp.children, children);
				}
				res.push(parent);
			}
			return res;
		},
		_getChildrenByKeyInFlatDS: function (foreignKey, data) {
			var i, dr, len = data.length, fKey = this.settings.treeDS.foreignKey,
				others = [], children = [];
			for (i = 0; i < len; i++) {
				dr = data[ i ];
				if (dr[ fKey ] === foreignKey) {
					children.push(dr);
				} else {
					others.push(dr);
				}
			}
			return { children: children, others: others };
		},
		_hasRecordParent: function (dataRecord, ds) {
			var i, dataRecordKey, dataRecordPKey, dsRowKey, dsLen,
				s = this.settings.treeDS,
				rlv = s.foreignKeyRootValue,
				foreignKey = s.foreignKey,
				key = this.settings.primaryKey;
			/* if option foreignKeyRootValue is false then we should go through the whole DS and
			check whether the record has parent key equal to key - if there isn't this means the value hasn't parent */
			dataRecordPKey = dataRecord[ foreignKey ];
			/* M.H. 24 Jan 2015 Fix for bug #187586: When the data source is flat treegrid does not create hierarchy */
			if (dataRecordPKey === null || dataRecordPKey === undefined) {
				return false;
			}
			if (rlv === false) {
				dataRecordKey = dataRecord[ key ];
				if (dataRecordKey === null || dataRecordKey === undefined) {
					return false;
				}
				dsLen = ds.length;
				for (i = 0; i < dsLen; i++) {
					dsRowKey = ds[ i ][ key ];
					if (dsRowKey !== dataRecordKey && dsRowKey === dataRecordPKey) {
						return true;
					}
				}
				return false;
			}
			return dataRecordPKey !== rlv;
		},
		_transformSchema: function (data) {
			// if initialFlatDataView is TRUE the source of data is processed(has dataLevel and expansion properties set) so it should be applied ONLY schema transformation
			if (this.settings.treeDS.initialFlatDataView) {
				return this._transformCallback(data);
			}
			return this.processDataPerLevel(data, 0);
		},
		/* //functions for transforming flat DS to hierarchical DS */
		processDataPerLevel: function (data, level, suppressTransformation) {
			/* This processes the passed data for the specified level and applies the schema transformation to it.
			```
					var ds = new $.%%WidgetName%%({
						dataSource: products,
						primaryKey: "ID",
						treeDS: {
							childDataKey: "Products"
						}
					});
					ds.dataBind();
					ds.processDataPerLevel(ds.getFlatData()[1], 1, false);
			```
			paramType="object" optional="false" The data to be processed and transformed
			paramType="number" optional="true" The level to which the data belongs to. If this is not set it defaults to 0.
			paramType="bool" optional="true" Determines whether the data should go through schema transformation. If true schema transofrmatin will not be applied.
			returnType="object" the processed data source.
			*/
			var i, layoutKey = this.settings.treeDS.childDataKey, dataLen, dataRow, isRootLevel = false,
				expDepth = this.settings.treeDS.initialExpandDepth, exp, nData = [],
				s = this.schema(), layout, hasChildren, lLen,
				propertyExp = this.settings.treeDS.propertyExpanded,
				propertyDataLevel = this.settings.treeDS.propertyDataLevel,
				applyPropertyDataLevel = (propertyDataLevel !== null && propertyDataLevel !== undefined),
				applyPropertyExp = (propertyExp !== null && propertyExp !== undefined);
			if (!data) {
				data = this.data();
			}
			if ($.type(data) === "object") {
				data = s._getDataBySearchField(data);
			}
			if (!level) {
				if (!this._isHierarchicalDataSource &&
						!this.isTransformedToHierarchicalData()) {
					// if flat to hierarchical data is done on the server-side
					if (this.metadata("flatToHierarchicalDataTransformed")) {
						this.isTransformedToHierarchicalData(true);
					} else {
						data = this.transformToHierarchicalData(data);
					}
				}
				this._totalRecordsCount = 0;
				this._flatData = [];
				isRootLevel = true;
				level = 0;
			}
			if (!data || !this.settings.localSchemaTransform) {
				return data;
			}
			if ($.type(data) === "array") {
				if (!this._dataBoundDepth) {
					this._dataBoundDepth = 0;
				}
				if (level > this._dataBoundDepth) {
					this._dataBoundDepth = level;
				}
				dataLen = data.length;
				try {
					//data = this._transformCallback(data);
					for (i = 0; i < dataLen; i++) {
						dataRow = data[ i ];
						if (!dataRow) {
							continue;
						}
						this._totalRecordsCount++;
						layout = dataRow[ layoutKey ];
						exp = dataRow[ propertyExp ];
						/* M.H. 13 Nov 2014 Fix for bug #185114: The generation of the primary
						key value when adding new row is not correct for the treegrid */
						if (!suppressTransformation) {
							dataRow = s._row(dataRow, i);
						}
						this._flatData.push(dataRow);
						nData.push(dataRow);
						hasChildren = $.type(layout) === "array";
						lLen = -1;
						if (hasChildren) {
							lLen = layout.length;
						}
						if (applyPropertyExp) {
							if (exp === undefined || exp === null) {
								exp = true;
								if (hasChildren && lLen === 0) {
									exp = false;
								}
								if (expDepth !== -1 && expDepth <= level) {
									exp = false;
								}
							}
							if (exp === 0) {
								exp = false;
							}
							dataRow[ propertyExp ] = exp;
						}
						if (applyPropertyDataLevel) {
							dataRow[ propertyDataLevel ] = level;
						}
						if (hasChildren && lLen > 0) {
							dataRow[ layoutKey ] = this.processDataPerLevel(layout, level + 1, suppressTransformation);
						}
					}
				} catch (e) {
					throw new Error($.ig.DataSourceLocale.locale.errorParsingArrays + e.message);
				}
			} else {
				nData = this._transformCallback(data);
			}
			if (isRootLevel) {
				//this.generateFlatDataView();
				this._generatedFlatData = true;
			}
			return nData;
		},
		getFlatDataForRecord: function (record, level) {
			/*Returnschild data transformed to flat data
			paramType="object" optional="false" The data record whose data is transformed and returned as flat
			paramType="number" optional="true" The level. If not set defaults to 0.
			returnType="object" the transformed data.
			*/
			if (!record) {
				return;
			}
			var layoutKey = this.settings.treeDS.childDataKey,
				propertyDataLevel = this.settings.treeDS.propertyDataLevel,
				data = record[ layoutKey ];
			if (data) {
				if (level === undefined || level === null) {
					level = 0;
					if (propertyDataLevel !== null &&
						propertyDataLevel !== undefined &&
						record[ propertyDataLevel ]) {
						level = record[ propertyDataLevel ];
					}
				}
				return this.generateFlatData(data, level);
			}
		},
		generateFlatData: function (data, level) {
			/* Generates flat data.
			Returns an object that contains the generated flat data, the flat visible data, records count and visible records count.
			paramType="object" optional="false" The data record whose data is transformed.
			paramType="number" optional="true" The level from which to start recursively generating the flat data. If not set defaults to 0.
			returnType="object" the generated flat data.
			*/
			var obj, flatData = [], flatVisibleData = [];
			if (!level) {
				level = 0;
			}
			obj = {
				flatData: flatData,
				flatVisibleData: flatVisibleData,
				recordsCount: 0,
				visibleRecordsCount: 0
			};
			this._generateFlatDataRecursive(data, level, obj, false);
			return obj;
		},
		_generateFlatDataRecursive: function (data, level, obj, parentCollapsed) {
			var i, dataRow, dataLen, exp,
				expDepth = this.settings.treeDS.initialExpandDepth,
				propertyExp = this.settings.treeDS.propertyExpanded,
				propertyDataLevel = this.settings.treeDS.propertyDataLevel,
				layoutKey = this.settings.treeDS.childDataKey,
				applyPropertyDataLevel = (propertyDataLevel !== null && propertyDataLevel !== undefined),
				applyPropertyExp = (propertyExp !== null && propertyExp !== undefined);
			if (!data) {
				data = this.data();
			}
			if (!level) {
				level = 0;
			}
			if ($.type(data) === "array") {
				dataLen = data.length;
				for (i = 0; i < dataLen; i++) {
					dataRow = data[ i ];
					if (!dataRow) {
						continue;
					}
					obj.recordsCount++;
					/* M.H. 13 Nov 2014 Fix for bug #185114: The generation of the primary
					key value when adding new row is not correct for the treegrid */
					obj.flatData.push(data[ i ]);
					if (applyPropertyExp) {
						exp = dataRow[ propertyExp ];
						if (exp === undefined || exp === null) {
							exp = true;
							if (expDepth !== -1 && expDepth <= level) {
								exp = false;
							}
						}
						if (exp === 0) {
							exp = false;
						}
						dataRow[ propertyExp ] = exp;
					}
					if (applyPropertyDataLevel) {
						dataRow[ propertyDataLevel ] = level;
					}
					if (!parentCollapsed) {
						obj.flatVisibleData.push(dataRow);
						obj.visibleRecordsCount++;
					}
					if (dataRow &&
						$.type(dataRow[ layoutKey ]) === "array" &&
						dataRow[ layoutKey ].length) {
						this._generateFlatDataRecursive(
							dataRow[ layoutKey ], level + 1, obj, !exp || parentCollapsed
						);
					}
				}
			}
		},
		generateFlatDataView: function () {
			/*Generates a flat data view from the current (hierarchical)data
			*/
			var data, resObj;
			if (this.settings.treeDS.initialFlatDataView) {
				this._flatDataView = this._data;
				return;
			}
			data = this.dataView();
			if (!this.shouldCallGenerateFlatDataView() && !data.length) {
				data = !this._filter ? this.data() : this._filteredData;
			}
			resObj = this.generateFlatData(data);
			this._flatDataView = resObj.flatVisibleData;
		},
		flatDataView: function () {
			/*Returns the current flat data view
			returnType="object" the current flat data view.
			*/
			if (this.settings.treeDS.initialFlatDataView) {
				return this._data;
			}
			return this._flatDataView;
		},
		_generateFlatDataAndCountProperties: function () {
			var data = !this._filter ? this.data() : this._filteredData,
				resObj = this.generateFlatData(data);
			this._flatData = resObj.flatData;
			this._totalRecordsCount = resObj.recordsCount;
			/*this._recCount = resObj.visibleRecordsCount;*/
			this._flatVisibleData = resObj.flatVisibleData;
		},
		getVisibleFlatData: function () {
			/* Returns flat visible data.
			```
					var ds = new $.%%WidgetName%%({
						dataSource: products,
						primaryKey: "ID",
						treeDS: {
							childDataKey: "Products"
						}
					});

					ds.dataBind();
					var visibleFlatData = ds.getVisibleFlatData();
			```
			returnType="object" the current visible flat data.
			*/
			if (!this._flatVisibleData) {
				this._generateFlatDataAndCountProperties();
			}
			return this._flatVisibleData;
		},
		getFlatData: function () {
			/* Returns flat data(without taking into account visible/expansion state).
			```
					var ds = new $.%%WidgetName%%({
						dataSource: products,
						primaryKey: "ID",
						treeDS: {
							childDataKey: "Products"
						}
						});

					ds.dataBind();
					var flatData = ds.getFlatData();
			```
			returnType="object" the current flat data.
			*/
			/* in case of flatData is not generated OR remote load on demand and data is changed */
			if (!this._flatData || this._flatData.length !== this._totalRecordsCount) {
				this._generateFlatDataAndCountProperties();
			}
			return this._flatData;
		},
		getFlatDataCount: function () {
			/*Returns total records count(without taking into account visible/expansion state).
			```
					var ds = new $.%%WidgetName%%({
						dataSource: products,
						primaryKey: "ID",
						treeDS: {
							childDataKey: "Products"
						}
					});
					ds.dataBind();
					var flatDataCount = ds.getFlatDataCount();
			```
			returnType="number" count of all data records(in flat representation)
			*/
			return this._totalRecordsCount;
		},
		_page: function (keepRecords) {
			if (this.settings.treeDS.paging.mode === "rootLevelOnly") {
				return this._super(keepRecords);
			}
			var count = 0, startIndex, endIndex, i = 0;
			if (keepRecords === undefined) {
				keepRecords = false;
			}
			/* reset the dataView: */
			if (keepRecords) {
				count = this._flatVisibleData.length;
			} else {
				this._flatDataView = [];
			}
			this._generateFlatDataAndCountProperties();
			/* this._dataView should contain only the number of records specified by pageSize.
			load the data for the current page only , in the DataView */
			startIndex = this.pageIndex() * this.pageSize();
			endIndex = startIndex + this.pageSize() >= this._flatVisibleData.length ?
				this._flatVisibleData.length : startIndex + this.pageSize();
			for (i = startIndex; i < endIndex; i++) {
				this._flatDataView[ count++ ] = this._flatVisibleData[ i ];
			}
		},
		setExpandedStateByRowIndex: function (index, expanded, callbackArgs) {
			/*Sets the expanded/collapsed state of a row by its index
			paramType="number" optional="false" The index of the row.
			paramType="bool" optional="false" If true then the row will be expanded. Otherwise it will be collapsed.
			paramType="function" Specifies a custom function to be called when the state of the row is changed.
			*/
			var rec = this.flatDataView()[ index ];
			return this._expandCollapseRecord(rec, expanded, callbackArgs);
		},
		setExpandedStateByPrimaryKey: function (rowId, expanded, callbackArgs) {
			/*Sets the expanded state of a row by its primary key
			paramType="string" optional="false" The id of the row.
			paramType="bool" optional="false" If true the row will be expanded. Otherwise it will be collapsed.
			paramType="function" Specifies a custom function to be called when the state of the row is changed.
			*/
			var rec = this.findRecordByKey(rowId, null);
			return this._expandCollapseRecord(rec, expanded, callbackArgs);
		},
		getExpandStateById: function (rowId) {
			/*Gets whether the row with the specified id is expanded.Returns true if the row is expanded or false if it's not.
			//paramType="string" optional="false" The id of the row.
			//returnType="bool" Returns true if expanded and false if not.*/
			var rec = this.findRecordByKey(rowId),
				propertyExp = this.settings.treeDS.propertyExpanded,
				applyPropertyExp = (propertyExp !== null && propertyExp !== undefined);
			if (!rec || !applyPropertyExp) {
				return;
			}
			return rec[ propertyExp ];
		},
		toggleRow: function (rowId, callbackArgs) {
			/*Toggles the row's state by the row's id.
			paramType="string" optional="false" The id of the row.
			paramType="function" Specifies a custom function to be called when the state of the row is changed.*/
			var rec = this.findRecordByKey(rowId), expanded,
				propertyExp = this.settings.treeDS.propertyExpanded,
				applyPropertyExp = (propertyExp !== null && propertyExp !== undefined);
			if (!rec || !applyPropertyExp) {
				return;
			}
			expanded = !rec[ propertyExp ];
			return this._expandCollapseRecord(rec, expanded, callbackArgs);
		},
		_encodeUrlPath: function (path, depth) {
			// we need to encode the current parent record path, when child records have their data sources set
			var p = "path=" + path;
			if (depth !== undefined) {
				p += "&depth=" + depth;
			}
			return p;
		},
		/* load on demand - add to _data returned records */
		_requestDataSuccess: function (requestArgs, data) {
			var layoutKey = this.settings.treeDS.childDataKey, layoutData,
				level, record, callbackArgs, expand;
			if ($.type(data) === "object") {
				record = requestArgs.record;
				callbackArgs = requestArgs.callbackArgs;
				expand = requestArgs.expand;
				level = record[ this.settings.treeDS.propertyDataLevel ];
				/* get layout data */
				layoutData = this.processDataPerLevel(data, level + 1);
				record[ layoutKey ] = layoutData;
				this._onRecordToggled(record, expand, callbackArgs);
			}
		},
		/* override _encodeUrl - in case of persistExpansionStates set to TRUE - add collection of expansion states to the params(which should be sent to the server)
		NOTE when requestType is GET it could have some limitations with the size of the list.
		Some servers and browsers(like IE) have limitations for the size of GET request - usually up to 2048 characters
		Because of the one of the main constraint of the REST architecture - Stateless Interactions - client specific data should NOT be stored on the server(like expansion states) */
		_encodeUrl: function () {
			var params = this._super(),
				s = this.settings.treeDS;
			if (s.persistExpansionStates) {
				params = this._encodeExpansionStates(params);
			}
			/* encode foreign key - when flat data should be transformed to hierarchical on the server-side.
			Send foreign-key so TreeGridDataSourceActionAttribute to work properly out-of-the-box(detects that the data is flat) */
			if (s.foreignKey) {
				params.fk = s.foreignKey;
				if (s.foreignKeyRootValue !== undefined) {
					params.fkRootValue = s.foreignKeyRootValue;
				}
			}
			params.propertyDataLevel = s.propertyDataLevel;
			params.propertyExpanded = s.propertyExpanded;
			params.childDataKey = s.childDataKey;
			params.initialExpandDepth = s.initialExpandDepth;
			if (s.enableRemoteLoadOnDemand) {
				params.loadOnDemand = true;
			}
			return params;
		},
		_encodePagingParams: function (params) {
			var p = this.settings.paging;
			this._super(params);
			if (p.enabled && p.type === "remote") {
				params.pagingParams[ "paging.mode" ] = this.settings.treeDS.paging.mode;
				params.pagingParams[ "paging.contextRowMode" ] = this.settings.treeDS.paging.contextRowMode;
			}
		},
		_encodeSortingParams: function (params) {
			var s = this.settings.sorting;
			this._super(params);
			if (s.enabled && s.type === "remote") {
				params.sortingParams[ "sorting.fromLevel" ] = this.settings.treeDS.sorting.fromLevel;
				params.sortingParams[ "sorting.toLevel" ] = this.settings.treeDS.sorting.toLevel;
			}
		},
		_encodeFilteringParams: function (params) {
			var f = this.settings.filtering;
			this._super(params);
			if (f.enabled && f.type === "remote") {
				params.filteringParams[ "filtering.fromLevel" ] = this.settings.treeDS.filtering.fromLevel;
				params.filteringParams[ "filtering.toLevel" ] = this.settings.treeDS.filtering.toLevel;
				params.filteringParams.__matchFiltering = this.settings.treeDS.filtering.matchFiltering;
				params.filteringParams[ "filtering.displayMode" ] = this.settings.treeDS.filtering.displayMode;
			}
		},
		/* _listExpansionStates is hash containing for key - primaryKeyValue and value - object with properties: state and initialState
		_listExpansionStates saves information for those records that have expansion state DIFFRENT from initial expansions.
		E.g. initially all records are expanded but if the customer toggles some of them - _listExpansionStates will contain only collapsed records */
		_encodeExpansionStates: function (params) {
			var key, listHasValues = false,
				list = this._listExpansionStates, newList;
			if (list) {
				newList = {};
				for (key in list) {
					if (list.hasOwnProperty(key)) {
						listHasValues = true;
						newList[ key ] = list[ key ].state;
					}
				}
				if (listHasValues) {
					params.listExpansionStates = newList;
				}
			}
			/* when sent to the server and requestType is GET then URL encoding will
			be like listExpansionStates[1]=false&listExpansionStates[3]=false */
			return params;
		},
		_requestData: function (record, expand, callbackArgs) {
			if (!record) {
				return;
			}
			var opts, me = this, url, path, params, func, s = this.settings.treeDS,
				args = {
					record: record,
					callbackArgs: callbackArgs,
					expand: expand
				};
			path = this.getPathBy(record);
			params = this._encodeUrl();
			params.expand = expand;
			url = s.dataSourceUrl + "?" + this._encodeUrlPath(path, record[ s.propertyDataLevel ]);
			func = s.customEncodeUrlFunc;
			if (func) {
				if ($.type(func) !== "function") {
					if (window[ func ] && typeof window[ func ] === "function") {
						func = window[ func ];
					} else {
						func = null;
					}
				}
				if (func) {
					url = func(record, expand);
				}
			}
			opts = {
				type: "GET",
				url: url,
				data: params,
				success: function (data, textStatus, jqXHR) {
					var func = s.requestDataErrorCallback,
						noCancel = true;
					if ($.type(func) === "function") {
						noCancel = func(args, data, textStatus, jqXHR);
					}
					if (noCancel) {
						me._requestDataSuccess(args, data, textStatus, jqXHR);
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					var func = s.requestDataErrorCallback;
					if ($.type(func) === "function") {
						func(args, jqXHR, textStatus, errorThrown);
					}
				}
			};
			$.ajax(opts);
		},
		_applyToggleCallback: function (resObj, callbackArgs) {
			if (!callbackArgs) {
				return;
			}
			var rec = resObj.record,
				res = resObj.result,
				expand = resObj.expand,
				callback = callbackArgs.callback,
				args = callbackArgs.args;
			if (!callback || $.type(callback) !== "function") {
				return;
			}
			callback(rec, expand, res, args);
		},
		_saveExpansionStateByPKVal: function (pkVal, expand) {
			// save expansion states(only for records that have expansion states different from initial expansion states)
			if (this.settings.treeDS.persistExpansionStates) {
				// _listExpansionStates is hash containing for key - primaryKeyValue and value - object with properties: state and initialState
				if (!this._listExpansionStates) {
					this._listExpansionStates = {};
				}
				if (pkVal !== null && pkVal !== undefined) {
					// remove from the hash info for the record if its initial expansion state is equal to the (current) expand(state)
					if (this._listExpansionStates[ pkVal ] &&
						this._listExpansionStates[ pkVal ].initState === expand) {
						delete this._listExpansionStates[ pkVal ];
					} else {
						this._listExpansionStates[ pkVal ] = { state: expand, initState: !expand };
					}
				}
			}
		},
		_onRecordToggled: function (record, expand, callbackArgs) {
			var propertyExp = this.settings.treeDS.propertyExpanded,
				filteredRecord = null, res = record, resObj,
				paging = this.settings.paging, pkVal,
				applyPropertyExp = (propertyExp !== null && propertyExp !== undefined);
			resObj = { result: false, record: res, expand: expand };
			if (!record) {
				this._applyToggleCallback(resObj, callbackArgs);
				return;
			}
			pkVal = record[ this.settings.primaryKey ];
			if (this._filter) {
				if (pkVal !== null && pkVal !== undefined) {
					filteredRecord = this.findRecordByKey(pkVal, this._filteredData);
					if (filteredRecord) {
						res = filteredRecord;
					}
				}
			}
			if (applyPropertyExp) {
				record[ propertyExp ] = expand;
				if (filteredRecord) {
					filteredRecord[ propertyExp ] = expand;
				}
				if (this.settings.treeDS.persistExpansionStates &&
					!this.settings.treeDS.enableRemoteLoadOnDemand) {
					this.dataBind();
				} else {
					if (paging && paging.enabled && this.settings.treeDS.paging.mode !== "rootLevelOnly") {
						if (paging.type === "local") {
							this._page();
							this._invokeCallback();
						}
					} else {
						if (this.shouldCallGenerateFlatDataView()) {
							this.generateFlatDataView();
						}
					}
				}
			}
			resObj.result = true;
			resObj.record = res;
			this._applyToggleCallback(resObj, callbackArgs);
		},
		_expandCollapseRecord: function (record, expand, callbackArgs) {
			if (!record) {
				return;
			}
			var s = this.settings, treeSettings = s.treeDS, func, layout,
				layoutKey = treeSettings.childDataKey;
			/* M.H. 22 June 2015 Fix for bug 201493: Loading indicator hides before the treegrid
			has completed expanding/collapsing rows when Paging i sremote and mode is AllLevels */
			this._saveExpansionStateByPKVal(record[ this.settings.primaryKey ], expand);
			/* when paging is remote and try to get paging for allLevels -
			it should be re-rendered the whole data(according to visible records) - rebind datasource */
			if (s.paging.enabled && s.paging.type === "remote" &&
					treeSettings.paging.mode === "allLevels") {
				this.dataBind();
				return;
			}
			/* expand for the first time record when there is load
			on demand(and child layout data is not loaded) */
			if (expand && treeSettings.enableRemoteLoadOnDemand) {
				layout = record[ layoutKey ];
				if (layout === true ||
					($.type(layout) === "array" && !layout.length)) {
					// async call
					func = treeSettings.requestDataCallback;
					if ($.type(func) === "string") {
						func = window[ func ];
					}
					if ($.type(func) !== "function") {
						func = $.proxy(this._requestData, this);
					}
					func(record, expand, callbackArgs);
					return;
				}
			}
			this._onRecordToggled(record, expand, callbackArgs);
		},
		sort: function (fields, direction) {
			/* Sorts the data source locally. The result (sorted data) can be obtained by calling dataView().
			Remote filtering can be performed by just calling dataBind() and setting the settings.sorting.expressions
			multi-column sorting can be enabled by setting keepSortState to true.
			fields => an array of fields object definitions:
			example: [{fieldName : "firstName"}, {fieldName : "lastName"}]
			example 2: [{fieldIndex : 1} , {fieldIndex : 2}]

			paramType="object" an array of fields object definitions
			paramType="string" asc / desc direction
			*/
			var s = this.settings.sorting, p = this.settings.paging, data, resetPaging = false;
			if (fields === undefined || fields === null) {
				throw new Error($.ig.DataSourceLocale.locale.noSortingFields);
			}
			this._generatedFlatData = false;
			if (s.applyToAllData && s.type === "local") {
				/* M.H. 11 Mar 2013 Fix for bug #135542: When filtering is applied and
				then sort any column and there is remote paging, all of the records for
				the current page are sorted and rendered, no matter the applied filter */
				if (this._filter && ((p.type === "local" && p.enabled === true) || p.enabled === false ||
						(p.type === "remote" && p.enabled === true && this.settings.filtering.type === "local"))) {
					data = this._filteredData;
				} else {
					data = this.data();
				}
				resetPaging = true;
			} else {
				data = this.dataView();
			}
			data = this.sortDataRecursive(data, 0, fields, direction);
			/* now if paging is enabled, and "applyToAllData" is true, we need to re-initialize the dataView */
			if (resetPaging && p.type === "local") {
				/* DAY 2/15/12 101818- when filtering, need to set the filtered data, not _data */
				if (!this._filter) {
					this._data = data;
				} else {
					this._filteredData = data;
				}
				this._page();
			} else {
				/* A.T. 14 Feb 2011 - fix for bug #66214 */
				this._dataView = data;
			}
			if (this.shouldCallGenerateFlatDataView()) {
				this.generateFlatDataView();
			}
			/* M.H. 17 April 2012 Fix for bug #109475 */
			this._populateTransformedData(data);
			return this; // preserve chaining
		},
		sortDataRecursive: function (data, level, fields, direction) {
			/* Sorts the given data recursively
			fields => an array of fields object definitions:
			example: [{fieldName : "firstName"}, {fieldName : "lastName"}]
			example 2: [{fieldIndex : 1} , {fieldIndex : 2}]

			paramType="object" the data array that will be sorted.
			paramType="number" the level to which the data belongs to
			paramType="object" an array of fields object definitions
			paramType="string" asc / desc direction
			*/
			var layoutKey = this.settings.treeDS.childDataKey, i, childDS, dataLen = data.length,
				s = this.settings.treeDS.sorting;
			if (s.toLevel === -1 || s.toLevel >= level) {
				for (i = 0; i < dataLen; i++) {
					childDS = data[ i ][ layoutKey ];
					if (childDS && childDS.length > 0) {
						childDS = this.sortDataRecursive(childDS, level + 1, fields, direction);
					}
				}
			}
			if ((s.fromLevel <= level || s.fromLevel === -1) && (s.toLevel >= level || s.toLevel === -1)) {
				data = this.sortData(data, fields, direction);
			}
			return data;
		},
		sortData: function (data, fields, direction) {
			/* Sorts the passed data and returns the sorted result.

			paramType="object" the data to be sorted

			fields => an array of fields object definitions:
			example: [{fieldName : "firstName"}, {fieldName : "lastName"}]
			example 2: [{fieldIndex : 1} , {fieldIndex : 2}]

			paramType="object" an array of fields object definitions
			paramType="string" asc / desc direction
			*/
			var s = this.settings.sorting, schema, sortF, convertFunc, settings = this.settings, self = this;

			/* check if there is a custom function defined */
			if ($.type(s.customFunc) === "function") {
				// call the function, passing the data to be sorted, the fields, and the direction
				data = s.customFunc(data, fields, direction);
			} else {
				schema = this.settings.schema;
				/*
				for (i = 0; i < schema.fields.length; i++) {
				if (schema.fields[i].name === fields[0].fieldName) {
				type = schema.fields[i].type;
				}
				}
				*/
				if (!direction) {
					direction = "";
				}
				/* check if a custom compare function is set */
				if ($.type(s.compareFunc) === "function") {
					sortF = s.compareFunc;
				} else {
					sortF = function (grid, fields, schema, reverse, convertf, caseSensitive) {
						reverse = reverse ? -1 : 1;
						function compareVals(format, enableUTCDates, rowTemplate, x, y) {
							if (format) {
								// L.A. 11 January 2013 - Fixing bug #130576
								// L.A. 09 August 2012 - Fixing bug #118640 When the grid is bound to UTC dates
								// (remote or local data), grouping a time-formatted date column produces incorrect groups
								if ($.type(x) === "date" && $.type(y) === "date") {
									if (format === "time" || format === "timeLong" || format === "h:mm:ss tt") {
										// Create date objects with fake year
										// M.H. 23 Oct 2013 Fix for bug #155639: Unable to sort date column when format is "h:mm:ss tt"
										x = new Date("January 01, 2000 " +
											$.ig.formatter(x, "date", format, rowTemplate, enableUTCDates));
										y = new Date("January 01, 2000 " +
											$.ig.formatter(y, "date", format, rowTemplate, enableUTCDates));
									}
								}
							}
							if ((x === null || x === undefined) && (y === null || y === undefined)) {
								return 0;
							}
							if ((x === null || x === undefined) && y !== null && y !== undefined) {
								return -1;
							}
							if (x !== null && x !== undefined && (y === null || y === undefined)) {
								return 1;
							}
							return x > y ? 1 : x < y ? -1 : 0;
						}
						return function (obj1, obj2) {
							var i, f, arr1 = [], arr2 = [], a, b, key, col, format, o, enableUTCDates,
								rowTemplate;
							if (grid) {
								o = grid.options;
								enableUTCDates = o.enableUTCDates;
								rowTemplate = (!o.rowTemplate || o.rowTemplate.length <= 0);
							}
							for (i = 0; i < fields.length; i++) {
								key = fields[ i ].fieldName;
								if (grid && grid.columnByKey) {
									col = grid.columnByKey(key);
									if (col !== undefined && col !== null) {
										format = col.format;
									}
								}
								if (fields[ i ].layout &&
									((settings.key && settings.key !== fields[ i ].layout) ||
									!settings.key)) {
									continue;
								}
								f = fields[ i ];
								if (f.fieldIndex >= 0) {
									f.fieldName = f.fieldIndex;
								}
								a = self.getCellValue(f.fieldName, obj1);
								b = self.getCellValue(f.fieldName, obj2);
								if (convertf !== undefined) {

									// this is assumed to be a custom-defined function, that will override the default data source type conversion logic
									a = convertf(a, f.fieldName);
									b = convertf(b, f.fieldName);
								}
								/* A.T. 19 Jan 2011 - Fix for bug #62963 - igDataSource - case sensitivity is not applied to sorting */
								if (caseSensitive === false) {
									if (a !== undefined && a !== null && a.toLowerCase) {
										a = a.toLowerCase();
									}
									if (b !== undefined && b !== null && b.toLowerCase) {
										b = b.toLowerCase();
									}
								}
								/* support a different direction for every separate column */
								if (f.dir !== undefined && f.dir !== null) {
									reverse = f.dir.toLowerCase().startsWith("desc");
									reverse = reverse ? -1 : 1;
								} else if (direction !== undefined && direction !== null && direction !== "") {
									reverse = direction.toLowerCase().startsWith("desc");
									reverse = reverse ? -1 : 1;
								}
								/* differentiate between single and multi-col sorting (for performance reasons) */
								if (fields.length === 1) {
									arr1 = reverse * compareVals(format, enableUTCDates, rowTemplate, a, b);
									arr2 = reverse * compareVals(format, enableUTCDates, rowTemplate, b, a);
								} else {
									if (reverse === -1) {
										arr1.push(-compareVals(format, enableUTCDates, rowTemplate, a, b));
										arr2.push(-compareVals(format, enableUTCDates, rowTemplate, b, a));
									} else {
										arr1.push(compareVals(format, enableUTCDates, rowTemplate, a, b));
										arr2.push(compareVals(format, enableUTCDates, rowTemplate, b, a));
									}
								}
							}
							if (arr1 < arr2) {
								return -1;
							}
							if (arr1 > arr2) {
								return 1;
							}
							return 0;
						};
					};
				}
				/* check if a custom conversion function is set */
				if ($.isFunction(s.customConvertFunc)) {
					convertFunc = s.customConvertFunc;
				}
				/* else {
				we do not want to reset the default data source type conversion logic
				convertFunc returns a function
				convertFunc = this._convertf;
				} */

				// we allow the developer to provide a single string of sort expressions, in the following format:
				// "col1 asc, col2 desc, col3 asc" ...
				if ($.type(fields) === "string") {
					fields = this._parseSortExpressions(fields);
				}
				/* A.T. 21 Jan Fix for bug #63146 - reversing of sorting should be the
				other way around if "direction" is specified as parameter in sort() */
				/* M.H. 16 March 2012 Fix for bug #105043 - when fields.length is 0 then
				sortF returns 0. But in Chrome when there are empty values the issues is represented */
				if (fields.length > 0) {
					data = data.sort(
						sortF(
							this.settings.callee,
							fields,
							schema,
							direction.toLowerCase().startsWith("asc") ?
							false : true, convertFunc, s.caseSensitive
						)
					);
					/* M.H. 14 Oct 2013 Fix for bug #154649: Rows are grouped incorrectly when applying and
					removing a filter if a filter is applied by default through code when ds is local and if
					the whole dataSource is not sorted but only dataView then on filtering data when groupby
					is applied grouping wouldn"t be correct.GroupBy takes the data(not sorted) from dataSource
					which is not sorted and apply filtering... */
					this._allDataSorted = (data === this.data());
				}
			}
			return data;
		},
		totalLocalRecordsCount: function () {
			/* returns the total number of records in the local data source
			returnType="number" the number of records that are bound / exist locally
			*/
			var fdv = this._flatVisibleData;
			if (fdv &&
				this.settings.paging.type !== "remote" &&
				this.settings.treeDS.paging.mode !== "rootLevelOnly") {
				return fdv.length;
			}
			return this._super();
		},
		/*override pageCount */
		pageCount: function () {
			/* returns the total number of pages
			```
				ds = new $.%%WidgetName%%({
					type: "json",
					dataSource: adventureWorks,
					paging: {
						enabled : true,
						pageSize:10,
						type: "local"
					}
				});

				var count = ds.pageCount();
			```
			returnType="number" total number of pages
			*/
			var p = this.settings.paging;
			if (p.enabled && p.type === "local" &&
				this.settings.treeDS.paging.mode === "allLevels") {
				return Math.ceil(this.totalLocalRecordsCount() / p.pageSize) || 1;
			}
			return this._super.apply(this, arguments);
		},
		/* M.H. 19 June 2015 Fix for bug 201486: When remote filtering with
		DisplayMode=ShowWithAncestorsAndDescendants is used the matching
		records label shows incorrect results */
		getFilteringMatchRecordsCount: function () {
			/* returns the total number of match filtering records in the data source.
			When the dataSource is remote and filtering is applied then it is taken value
			of property "filtering.countRecords" in metatadata - if set. If it is not set returns totalRecordsCount
			```
					var ds = new $.%%WidgetName%%({
						dataSource: products,
						primaryKey: "ID",
						treeDS: {
							childDataKey: "Products"
						}
					});
					ds.dataBind();
					ds.filter([{fieldName : "Name", expr: "M", cond: "startsWith"}], "AND", true);
					var matchRecordsCount = ds.getFilteringMatchRecordsCount();
			```
			returnType="number" the number of match filtering records(if filtering is not applied returns totalRecordsCount)
			*/
			var count = this.metadata("filtering.countRecords");
			if (count !== undefined && count !== null) {
				return count;
			}
			return this.totalRecordsCount();
		},
		filter: function (fieldExpressions, boolLogic, keepFilterState, fieldExpressionsOnStrings) {
			/* filters the data source locally. Remote filtering can be performed by just calling dataBind() and setting the settings.filtering.expressions. The result (filtered data) can be obtained by calling dataView()
			example: [{fieldName : "firstName", expr: "abc", cond: "StartsWith"}, {fieldName : "lastName"}]
			example 2: [{fieldIndex : 1} , {fieldIndex : 2, expr: "a", cond : "contains"}]
			expr is the filter expression text , such as "abc", or a regular expression such as *test*
			cond is the filtering condition such as startsWith, endsWith, contains, equals, doesNotEqual, doesNotContain
			if expr is detected to be a regular expression, the "cond" part is skipped

			paramType="object" a list of field expression definitions
			paramType="AND|OR" boolean logic. Accepted values are AND and OR.
			paramType="bool" if keepFilterState is set to true, it will not discard previous filtering expressions
			*/
			var i, f = this.settings.filtering, p = this.settings.paging, data, resetPaging;
			if (f.applyToAllData && f.type === "local") {
				data = this.data();
				resetPaging = true;
			} else {
				// cache the original dataView
				if (this._cachedDataView && this._cachedDataView.length > 0) {
					//data = this.dataView();
					data = this._cachedDataView;
				} else {
					// COPY the this.dataView() in this._cachedDataView; this is necessary because we want to restore it later on
					//this._cachedDataView = $.extend(true, {}, this.dataView());
					this._cachedDataView = $.merge([], this.dataView());
					data = this._cachedDataView;
				}
			}
			this._filteredRecordsCount = 0;
			this._generatedFlatData = false;
			this._filteredData = this._filterDataRecursive(
				data, 0, fieldExpressions, boolLogic, keepFilterState, fieldExpressionsOnStrings
			);
			this._dataView = [];

			this._filter = true;
			if (resetPaging && p.type === "local" && p.enabled === true) {
				// reset paging
				this.settings.paging.pageIndex = 0;
				this.pageSizeDirty(true);
				this._page();
			} else {
				for (i = 0; i < this._filteredData.length; i++) {
					this._dataView[ i ] = this._filteredData[ i ];
				}
			}
			if (this.shouldCallGenerateFlatDataView()) {
				this.generateFlatDataView();
			}
			this._populateTransformedData(this._filteredData);
			return this; // preserve chaining
		},
		_filterDataRecursive: function (data, level, fieldExpressions, boolLogic,
			keepFilterState, fieldExpressionsOnStrings) {
			var i, j, expr = null, count = 0, skipRec = false, f = this.settings.filtering,
				foundChildDS, subDS, t, k, schema, fields, tmpbool, allFieldsExpr, stringVal,
				fExprLen, fExprStrLen, propertyExp = this.settings.treeDS.propertyExpanded,
				filteredData = [], childDS, layoutKey = this.settings.treeDS.childDataKey,
				fts = this.settings.treeDS.filtering,
				matchFiltering = fts.matchFiltering;
			schema = this.schema();
			if (schema === null || schema === undefined) {
				throw new Error($.ig.DataSourceLocale.locale.filteringNoSchema);
			}
			if ($.type(fieldExpressions) === "string") {
				expr = fieldExpressions;
			}
			if ($.type(fieldExpressionsOnStrings) === "string") {
				allFieldsExpr = fieldExpressionsOnStrings;
			} else if ($.type(fieldExpressionsOnStrings) === "undefined") {
				fieldExpressionsOnStrings = [];
			}
			if ($.type(fieldExpressions) === "array" &&
				fieldExpressions.length === 0 &&
				$.type(fieldExpressionsOnStrings) === "array" &&
				fieldExpressionsOnStrings.length === 0) {
				return;
			}
			if ($.type(f.customFunc) === "function") {
				/* call the function, passing the filterExpression object which contains field names/indices,
				the current expression for the field, as well as condition for the field */
				filteredData = f.customFunc(fieldExpressions, data);
			} else {
				if (expr) {
					fieldExpressions = this._parseFilterExprString(expr);
				}
				if (allFieldsExpr) {
					fieldExpressionsOnStrings = this._parseFilterExprString(allFieldsExpr);
				}
				fExprLen = fieldExpressions.length;
				fExprStrLen = fieldExpressionsOnStrings.length;
				/* filter "data"
				we will store all results in tmpData, and then assign it to the dataView. please ensure that */
				for (i = 0; i < data.length; i++) {
					if (matchFiltering) {
						delete data[ i ][ matchFiltering ];
					}
					if (!((fts.fromLevel <= level || fts.fromLevel === -1) &&
						(fts.toLevel >= level || fts.toLevel === -1))) {
						childDS = data[ i ][ layoutKey ];
						if (childDS && childDS.length) {
							childDS = this._filterDataRecursive(childDS, level + 1,
								fieldExpressions, boolLogic, keepFilterState, fieldExpressionsOnStrings);
							if (childDS && childDS.length > 0) {
								filteredData[ count++ ] = $.extend(true, {}, data[ i ]);
								filteredData[ count - 1 ][ layoutKey ] = childDS;
							}
						}
						continue;
					}
					skipRec = false;
					for (j = 0; j < fExprLen; j++) {
						// if there is no match, break, we aren't going to add the record to the resulting data view.
						// the default boolean logic is to "AND" the fields
						fields = schema.fields();
						if (fieldExpressions[ j ].fieldIndex !== undefined) {
							if (fieldExpressions[ j ].fieldIndex < fields.length) {
								t = this._getFieldTypeFromSchema(fields[ fieldExpressions[ j ].fieldIndex ].name);
							}
							skipRec = !this._findMatch(
								data[ i ][ fieldExpressions[ j ].fieldIndex ],
								fieldExpressions[ j ].expr,
								t,
								!f.caseSensitive,
								fieldExpressions[ j ].cond,
								fieldExpressions[ j ].preciseDateFormat
							);
						} else {
							// M.H. 10 Sep 2012 Fix for bug #120759
							if (fieldExpressions[ j ].dataType !== undefined &&
								fieldExpressions[ j ].dataType !== null) {
								t = fieldExpressions[ j ].dataType;
							} else {
								for (k = 0; k < fields.length; k++) {
									if (fields[ k ].name === fieldExpressions[ j ].fieldName) {
										t = this._getFieldTypeFromSchema(fields[ k ].name);
										break;
									}
								}
							}
							skipRec = !this._findMatch(data[ i ][ fieldExpressions[ j ].fieldName ],
								fieldExpressions[ j ].expr, t, !f.caseSensitive, fieldExpressions[ j ].cond,
								fieldExpressions[ j ].preciseDateFormat, fieldExpressions[ j ].fieldName, data[ i ]);
						}
						tmpbool = (fieldExpressions[ j ].logic !== null &&
							fieldExpressions[ j ].logic !== undefined &&
							(fieldExpressions[ j ].logic.toLowerCase() === "or" ||
							fieldExpressions[ j ].logic.toLowerCase() === "and")) ?
							fieldExpressions[ j ].logic : boolLogic;
						/* A.T. 18 Jan. 2011 fix for bug 62126 - igDataSource
						local filtering expressions: the OR operator does not work */
						if (tmpbool === undefined || tmpbool === null || $.type(tmpbool) !== "string") {
							tmpbool = "and";
						}
						if (skipRec && tmpbool.toLowerCase() === "and") {
							break;
						}
						if (!skipRec && tmpbool.toLowerCase() === "or") {
							break;
						}
					}
					if (!skipRec && fExprStrLen) {
						for (j = 0; j < fExprStrLen; j++) {
							// if there is no match, break, we aren't going to add the record to the resulting data view.
							// the default boolean logic is to "AND" the fields
							fields = schema.fields();
							if (fieldExpressionsOnStrings[ j ].fieldIndex) {
								if (fieldExpressionsOnStrings[ j ].fieldIndex < fields.length) {
									t = this._getFieldTypeFromSchema(fields[ fieldExpressionsOnStrings[ j ].fieldIndex ].name);
								}
								stringVal = data[ i ][ fieldExpressionsOnStrings[ j ].fieldIndex ] ?
									data[ i ][ fieldExpressionsOnStrings[ j ].fieldIndex ].toString() : "";
								skipRec = !this._findMatch(stringVal, fieldExpressionsOnStrings[ j ].expr,
									"string", !f.caseSensitive, fieldExpressionsOnStrings[ j ].cond,
									fieldExpressionsOnStrings[ j ].preciseDateFormat,
									fieldExpressionsOnStrings[ j ].fieldName,
									data[ i ]);
							} else {
								for (k = 0; k < fields.length; k++) {
									if (fields[ k ].name === fieldExpressionsOnStrings[ j ].fieldName) {
										t = this._getFieldTypeFromSchema(fields[ k ].name);
										break;
									}
								}
								stringVal = data[ i ][ fieldExpressionsOnStrings[ j ].fieldName ] !== null &&
									data[ i ][ fieldExpressionsOnStrings[ j ].fieldName ] !== undefined ?
									data[ i ][ fieldExpressionsOnStrings[ j ].fieldName ].toString() : "";
								skipRec = !this._findMatch(stringVal, fieldExpressionsOnStrings[ j ].expr,
									"string", !f.caseSensitive, fieldExpressionsOnStrings[ j ].cond,
									fieldExpressionsOnStrings[ j ].preciseDateFormat,
									fieldExpressionsOnStrings[ j ].fieldName,
									data[ i ]);
							}
							tmpbool = (fieldExpressionsOnStrings[ j ].logic !== null &&
								fieldExpressionsOnStrings[ j ].logic !== undefined &&
								(fieldExpressionsOnStrings[ j ].logic.toLowerCase() === "or" ||
								fieldExpressionsOnStrings[ j ].logic.toLowerCase() === "and")) ?
								fieldExpressionsOnStrings[ j ].logic : boolLogic;
							/* A.T. 18 Jan. 2011 fix for bug 62126 - igDataSource
							local filtering expressions: the OR operator does not work */
							if (tmpbool === undefined || tmpbool === null || $.type(tmpbool) !== "string") {
								tmpbool = "and";
							}
							if (skipRec && tmpbool.toLowerCase() === "and") {
								break;
							}
							if (!skipRec && tmpbool.toLowerCase() === "or") {
								break;
							}
						}
					}
					foundChildDS = false;
					childDS = data[ i ][ layoutKey ];
					subDS = null;
					if (childDS && childDS.length) {
						childDS = this._filterDataRecursive(childDS, level + 1, fieldExpressions,
							boolLogic, keepFilterState, fieldExpressionsOnStrings);
						if (childDS && childDS.length > 0) {
							subDS = data[ i ][ layoutKey ];
							data[ i ][ layoutKey ] = null;
							filteredData[ count++ ] = $.extend(true, {}, data[ i ]);
							data[ i ][ layoutKey ] = subDS;
							filteredData[ count - 1 ][ layoutKey ] = childDS;
							foundChildDS = true;
							/* we should expand if the record has children that match filtering
							condition(even if the record does not match filtering conditions) */
							if (propertyExp) {
								filteredData[ count - 1 ][ propertyExp ] = true;
							}
							if (!skipRec && matchFiltering) {
								filteredData[ count - 1 ][ matchFiltering ] = true;
								this._filteredRecordsCount++;
							}
						}
					}
					if (!skipRec && !foundChildDS) {
						if (fts.displayMode === "showWithAncestors" && childDS) {
							subDS = data[ i ][ layoutKey ];
							data[ i ][ layoutKey ] = null;
							filteredData[ count ] = $.extend(true, {}, data[ i ]);
							data[ i ][ layoutKey ] = subDS;
							filteredData[ count ][ layoutKey ] = null;
							count++;
						} else {
							if (childDS) {
								subDS = data[ i ][ layoutKey ];
								data[ i ][ layoutKey ] = null;
							}
							filteredData[ count ] = $.extend(true, {}, data[ i ]);
							if (subDS) {
								filteredData[ count ][ layoutKey ] = subDS;
								data[ i ][ layoutKey ] = subDS;
							}
							count++;
						}
						this._filteredRecordsCount++;
						if (matchFiltering) {
							filteredData[ count - 1 ][ matchFiltering ] = true;
						}
						/* we should collapse record if it has children that does not match filtering conditions */
						if (childDS && propertyExp) {
							filteredData[ count - 1 ][ propertyExp ] = false;
						}
					}
				}
			}
			return filteredData;
		},
		getFilteredRecordsCountFromDataView: function () {
			/*Gets the count of the filtered records in the dataView
			```
					var ds = new $.%%WidgetName%%({
						dataSource: products,
						primaryKey: "ID",
						treeDS: {
							childDataKey: "Products"
						}
					});
					ds.dataBind();
					ds.filter([{fieldName : "Name", expr: "M", cond: "startsWith"}], "AND", true);
					var filteredRecordsCount = ds.getFilteredRecordsCountFromDataView();
			```
			returnType="number" count of filtered records in the dataview
			*/
			var fdv = this.flatDataView(), i, count = 0,
				propMatchFiltering = this.settings.treeDS.filtering.matchFiltering;
			if (this._filter) {
				for (i = 0; i < fdv.length; i++) {
					if (fdv[ i ][ propMatchFiltering ]) {
						count++;
					}
				}
			}
			return count;
		},
		getFilteredRecordsCount: function () {
			/*Gets the count of the filtered records
			returnType="number" count of filtered records
			*/
			if (this._filter) {
				return this._filteredRecordsCount;
			}
			return 0;
		},
		clearLocalFilter: function () {
			/* This clears local filtering applied to the data view by resetting it to the original data and applying any paging.*/
			this.clearMatchFiltering();
			this._super();
			this._filter = false;
			if (this.shouldCallGenerateFlatDataView()) {
				this.generateFlatDataView();
			}
		},
		shouldCallGenerateFlatDataView: function () {
			/*Gets whether the flat data view should be generated by calling the generateFlatDataView method.
			```
					var ds = new $.%%WidgetName%%({
						dataSource: products,
						primaryKey: "ID",
						treeDS: {
							childDataKey: "Products"
						}
					});
					ds.dataBind();
					if (ds.shouldCallGenerateFlatDataView()) {
						ds.generateFlatDataView();
					}
			```
			*/
			var s = this.settings, paging = s.paging;
			return !paging || !paging.enabled ||
						paging.type !== "local" ||
						this.settings.treeDS.paging.mode === "rootLevelOnly";
		},
		clearMatchFiltering: function (data) {
			/*Clears __matchFiltering property from the data record objects in the filtered data source. The __matchFiltering property determines whether a record matches the specified filtering condition.
			paramType="object" optional="true" the array of data objects to be cleared. If not set the current filtered data array is used.
			*/
			var i, fts = this.settings.treeDS.filtering, dataLen, layout,
				matchFiltering = fts.matchFiltering, layoutKey = this.settings.treeDS.childDataKey;
			if (!matchFiltering) {
				return;
			}
			if (!data) {
				data = this._filteredData;
				/* M.H. 4 June 2015 Fix for bug 200726: JavaScript error is thrown when a filter is cleared. */
				if (!data) {
					return;
				}
			}
			dataLen = data.length;
			for (i = 0; i < dataLen; i++) {
				delete data[ i ][ matchFiltering ];
				layout = data[ i ][ layoutKey ];
				if (layout) {
					this.clearMatchFiltering(layout);
				}
			}
		},
		getPathBy: function (record) {
			/*Gets the path of a record by the record or the record's key
			paramType="object|string|number" optional="false" the record or the record's key as string or number
			*/
			if (record === null || record === undefined) {
				return null;
			}
			var data = this._data, resRecord, search, key, objPath = { path: "" },
				path, len = data ? data.length : 0;
			search = len > 0 && $.isArray(data[ 0 ]) ? this._lookupPkIndex() : this.settings.primaryKey;
			if ($.type(record) !== "object") {
				key = record;
			} else {
				key = record[ search ];
			}
			resRecord = this.findRecordByKey(key, null, objPath);
			if (!resRecord) {
				return null;
			}
			path = objPath.path;
			if (path !== "") {
				path += "/";
			}
			return path + key;
		},
		_findIndexInFlatDS: function (ds, foreignKeyValue, targetInd) {
			/* returns row data index in flat data source(specified by parameter ds) which is a child of the row(specified by foreignKeyValue) and is at index specified by targetInd.
			If rows with foreignKeyValue are found but targetInd is >=count of the child rows returns the index of the last found child row + 1.
			*/
			var i, dr, fKey = this.settings.treeDS.foreignKey,
				len = ds.length, lastInd, layoutInd = 0, foundLayout = false;
			for (i = 0; i < len; i++) {
				dr = ds[ i ];
				if (dr[ fKey ] === foreignKeyValue) {
					foundLayout = true;
					lastInd = i;
					if (targetInd === layoutInd) {
						return i;
					}
					layoutInd++;
				}
			}
			if (foundLayout) {
				return ++lastInd;
			}
			return -1;
		},
		/* override */
		findRecordByKey: function (key, ds, objPath) {
			/* returns a record by a specified key (requires that primaryKey is set in the settings)
			paramType="string|number" Primary key of the record
			paramType="string" optional="true" the data source in which to search for the record. When not set it will use the current data source.
			paramType="object" optional="true" path to the object. Example: {path: '5/1'}
			returnType="object" a JavaScript object specifying the found record, or null if no record is found
			*/
			var i, d, layouts = [], res, path,
				data = ds || this._data,
				len = data ? data.length : 0,
				dsLayoutKey = this.settings.treeDS.childDataKey,
				search = len > 0 && $.isArray(data[ 0 ]) ? this._lookupPkIndex() : this.settings.primaryKey;
			objPath = objPath || { path: "", parentRows: [] };
			objPath.parentRows = objPath.parentRows || [];
			objPath.path = objPath.path || "";
			for (i = 0; i < len; i++) {
				d = data[ i ];
				if (d[ search ] === key) {
					objPath.parentRows.push({ row: d, level: d[ this.settings.treeDS.propertyDataLevel ] });
					return data[ i ];
				}
				if (d[ dsLayoutKey ]) {
					path = objPath.path;
					if (path !== "") {
						path += "/";
					}
					layouts.push({
						layout: d[ dsLayoutKey ],
						objPath: {
							path: path + d[ search ],
							parentRows: objPath.parentRows.concat({
								row: d,
								level: d[ this.settings.treeDS.propertyDataLevel ]
							})
						}
					});
				}
			}
			len = layouts.length;
			for (i = 0; i < len; i++) {
				res = this.findRecordByKey(key, layouts[ i ].layout, layouts[ i ].objPath);
				objPath.path = layouts[ i ].objPath.path;
				objPath.parentRows = layouts[ i ].objPath.parentRows;
				if (res) {
					return res;
				}
			}
			return null;
		},
		_invokeCallback: function (callee, callback) {
			if (!this.schema() && this._dataBinding) {
				this._data = this.processDataPerLevel(this._data, 0, true);
			}
			if (this.shouldCallGenerateFlatDataView()) {
				this.generateFlatDataView();
			}
			this._super(callee, callback);
		},
		/* override */
		removeRecordByKey: function (key, origDs) {
			/* removes a specific record denoted by the primaryKey of the passed key parameter from the data source
			paramType="string|number" primary key of the record
			*/
			var data, count = 0,
				all = [ this._data ];
			this._addOnlyUniqueToCollection(all, this._dataView);
			this._addOnlyUniqueToCollection(all, this._filteredData);
			/* M.H. 5 Aug 2016 Fix for bug 220126: Child data persists in the datasource after deleting the corresponding parent record in treegrid */
			if (!this._isHierarchicalDataSource) {
				this._removeRecordInFlatDs(origDs, key);
			} else {
				this._addOnlyUniqueToCollection(all, origDs);
			}
			while (count < all.length) {
				data = all[ count++ ];
				this._removeRecordByKeyForData(key, data);
			}
		},
		_removeRecordInFlatDs: function (data, key, fk) {
			if (!data || !$.isArray(data) || !data.length ||
				(key === undefined && fk === undefined)) {
				return;
			}
			var i, prime = this.settings.primaryKey, tmp,
				pkSearch = $.isArray(data[ 0 ]) ? this._lookupPkIndex() : prime,
				fkSearch = this.settings.treeDS.foreignKey;
			for (i = 0; i < data.length; i++) {
				if (data[ i ]) {
					if (key !== undefined && data[ i ][ pkSearch ] === key) {
						$.ig.removeFromArray(data, i);
						this._removeRecordInFlatDs(data, undefined, key);
						break;
					} else if (fk !== undefined && data[ i ][ fkSearch ] === fk) {
						tmp = data[ i ][ pkSearch ];
						$.ig.removeFromArray(data, i);
						this._removeRecordInFlatDs(data, undefined, tmp);
						i = 0;
					}
				}
			}
		},
		_removeRecordByKeyForData: function (key, data) {
			if (!data) {
				return false;
			}
			var i, prime = this.settings.primaryKey,
				len = data ? data.length : 0,
				search = len > 0 && $.isArray(data[ 0 ]) ? this._lookupPkIndex() : prime,
				layoutKey = this.settings.treeDS.childDataKey,
				layoutData = [],
				found = false;

			for (i = 0; i < len; i++) {
				if (data[ i ]) {
					if (data[ i ][ search ] === key) {
						$.ig.removeFromArray(data, i);
						found = true;
						break;
					}
					if (data[ i ][ layoutKey ]) {
						layoutData.push(data[ i ][ layoutKey ]);
					}
				}
			}
			if (!found) {
				len = layoutData.length;
				for (i = 0; i < len; i++) {
					found = this._removeRecordByKeyForData(key, layoutData[ i ]);
					if (found) {
						return true;
					}
				}
			} else {
				return true;
			}
			return false;
		},
		deleteRow: function (rowId, autoCommit) {
			/* deletes a row from the data source.
			paramType="object" the record key - primaryKey (string) or index (number)
			paramType="bool" if autoCommit is true, the datasource will be updated automatically and the transaction is still stored in the accumulated transaction log
			returnType="object". The transaction object that was created
			*/
			var ret = this._super.call(this, rowId, autoCommit);
			this._dataBoundDepth = null;
			this.getDataBoundDepth();
			return ret;
		},
		getChildrenByKey: function (key, ds) {
			/*Gets the chilren records by the parent record's key in the passed data source
				paramType="string|number" optional="false" primary key of the record
				paramType="object" optional="false" the data source
				returnType="object" array of child records
			*/
			var childKey = this.settings.treeDS.childDataKey,
				rec = this.findRecordByKey(key, ds);
			if (rec && rec[ childKey ]) {
				return rec[ childKey ];
			}
			return null;
		},
		insertRow: function (rowId, rowObject, rowIndex, autoCommit, parentRowId) {
			/* adds a new row to the data source. Creates a transaction that can be committed / rolled back
			```
				var ds;

				var render = function (success, error) {
					if (success) {
						ds.insertRow(123, {
							Name: "CD Player",
							Price: "40",
							Rating: "4"
						}, 1, true);
						var template = "<tr><td><span data-level='${dataLevel}'>${ID}</span></td><td>${Name}</td><td>${Price}</td><td>${Rating}</td></tr>",
						resultHtml = $.ig.tmpl(template, ds.flatDataView());
						$("#table").html(resultHtml);

					} else {
						alert(error);
					}
				}

				$(window).load(function () {
					ds = new $.%%WidgetName%%({
						callback: render,
						dataSource: products,
						treeDS: {
							childDataKey: "Products",
							initialExpandDepth: 10,
							propertyDataLevel: "dataLevel"
						}
					});
					ds.dataBind();

				});
			```
			paramType="object" the record key - primaryKey (string) or index (number)
			paramType="object" the new record data.
			paramType="number" row index at which to be insert the new row
			paramType="bool" if autoCommit is true, the datasource will be updated automatically and the transaction is still stored in the accumulated transaction log
			paramType="object" the value of the primary key of the parent row(if any)
			returnType="object". The transaction object that was created
			*/
			if (parentRowId === null || parentRowId === undefined) {
				return this._super(rowId, rowObject, rowIndex, autoCommit);
			}
			var t = this._createInsertNodeTransaction(rowId, rowObject, rowIndex, parentRowId);
			this._addTransaction(t);
			/* commit */
			if (autoCommit === true) {
				this.commit(rowId);
			}
			if ($.type(this.settings.rowInserted) === "function") {
				if (this.settings.callee) {
					this.settings.rowInserted.apply(this.settings.callee,
						[ { rowId: rowId, row: rowObject, parentRowId: parentRowId, rowIndex: rowIndex }, this ]);
				} else {
					this.settings.rowInserted({
						rowId: rowId,
						row: rowObject,
						parentRowId: parentRowId,
						rowIndex: rowIndex
					}, this);
				}
			}
			return t;
		},
		_createInsertNodeTransaction: function (rowId, rowObject, rowIndex, parentRowId) {
			return {
				type: "insertnode",
				tid: this._generateTransactionId(),
				row: rowObject,
				rowId: rowId,
				rowIndex: rowIndex,
				parentRowId: parentRowId
			};
		},
		_commitTransaction: function (t) {
			var origDs, dv, rec;
			if (t.type === "insertnode") {
				origDs = this.settings.localSchemaTransform ? this._origDs : null;
				if (origDs === this._data) {
					origDs = null;
				}
				this._addRow(t.row, t.rowIndex, origDs, t.parentRowId);
				/* finally remove from the log, since the transaction is already committed and shouldn't be pending */
				this._removeTransactionByTransactionId(t.tid);
			} else {
				this._super(t);
				/* M.H. 17 July 2015 Fix for bug 202987: When there is virtualization and a filtering
				is applied the updated value is not rendered correctly in the treegrid records from
				_dataView are not pointing to records from _data - that"s why records from dataView
				should be updated as well */
				if (this._filter &&
						(t.type === "cell" || t.type === "row")) {
					dv = this.dataView();
					rec = this.findRecordByKey(t.rowId, dv);
					if (rec) {
						this._updateRecOnCommit(t, [ rec ]);
					}
				}
			}
			/* M.H. 19 August 2015 Fix for bug 204302: Paging is lost when dataSource.updateRow is called */
			if (this.settings.paging.enabled && this.settings.paging.type !== "remote") {
				this._generateFlatDataAndCountProperties();
			}
			this.generateFlatDataView();
		},
		_preprocessAddRow: function (row, index, origDs, at, data) {
			/* This function is called from _addRow - before adding row in data.
			It returns obect with properties
					parentRec - if at is specified - returns record with key equals to argument "at"
					cashedData - cashedData is set to argument data
					layoutData - child layout data for record with key "at"
			IF layoutData is NULL then it is canceled next processing of data in _addRow - used when original data source is FLAT and adds child record
			*/
			var newRow, recAt,
				res = {
					parentRec: null,
					cashedData: data,
					layoutData: null
				},
				childKey = this.settings.treeDS.childDataKey;
			if (at === undefined || at === null || !data) {
				res.layoutData = data;
				return res;
			}
			if (!this._isHierarchicalDataSource &&
				data === origDs) {
				if ($.type(row) === "object") {
					newRow = $.extend(true, {}, row);
				}
				if (this.settings.treeDS.foreignKey !== null) {
					newRow[ this.settings.treeDS.foreignKey ] = at;
				}
				data.push(newRow);
				return res;// res.layoutData is null so when called in addRow - new row will not be added
			}
			recAt = this.findRecordByKey(at, data);
			if (!recAt) {
				return res;
			}
			recAt[ childKey ] = recAt[ childKey ] || [];
			res.parentRec = recAt;
			res.layoutData = recAt[ childKey ];
			return res;
		},
		_postprocessAddRow: function (row, index, origDs, at, pdata) {
			// update parentRow child data
			// parentRow is taken from argument pdata
			var parentRec = pdata ? pdata.parentRec : null,
				childKey = this.settings.treeDS.childDataKey;
			if (parentRec && pdata.newData && childKey !== null) {
				parentRec[ childKey ] = pdata.newData;
				if (parentRec[ this.settings.treeDS.propertyDataLevel ] === this.getDataBoundDepth()) {
					this._dataBoundDepth++;
				}
			}
		},
		_addRow: function (row, index, origDs, at) {
			/*
			insert row at specific index at layout defined by argument at(in this case at is value of the parent primary key)
			if at is not defined insert at root level
			*/
			var ret = this._super.call(this, row, index, origDs, at);
			if (at !== undefined && at !== null && !this.settings.treeDS.propertyDataLevel) {
				this._dataBoundDepth = null;
				this.getDataBoundDepth();
			}
			return ret;
		}
	});
}));// REMOVE_FROM_COMBINED_FILES
