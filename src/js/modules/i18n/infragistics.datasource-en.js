/*!@license
* Infragistics.Web.ClientUI data source localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {

    $.ig = $.ig || {};

    if (!$.ig.DataSourceLocale) {
	    $.ig.DataSourceLocale = {};

	    $.extend($.ig.DataSourceLocale, {

		    locale: {
			    invalidDataSource: "The supplied data source is invalid. It happens to be a scalar.",
			    unknownDataSource: "Cannot determine the data source type. Please specify if it is JSON or XML data.",
			    errorParsingArrays: "There was an error parsing the array data and applying the defined data schema: ",
			    errorParsingJson: "There was an error parsing the JSON data and applying the defined data schema: ",
			    errorParsingXml: "There was an error parsing the XML data and applying the defined data schema: ",
			    errorParsingHtmlTable: "There was an error extracting the data from the HTML Table and applying the schema : ",
			    errorExpectedTbodyParameter: "Expected a tbody or a table as a parameter.",
			    errorTableWithIdNotFound: "The HTML Table with the following ID was not found: ",
			    errorParsingHtmlTableNoSchema: "There was an error parsing the Table DOM: ",
			    errorParsingJsonNoSchema: "There was an error parsing/evaluating the JSON string: ",
			    errorParsingXmlNoSchema: "There was an error parsing the XML string: ",
			    errorXmlSourceWithoutSchema: "The supplied data source is an xml document, but there is no defined data schema ($.IgDataSchema) ",
			    errorUnrecognizedFilterCondition: " The filter condition that was passed was not recognized: ",
			    errorRemoteRequest: "The remote request to fetch data has failed: ",
			    errorSchemaMismatch: "The input data doesn't match the schema, the following field couldn't be mapped: ",
			    errorSchemaFieldCountMismatch: "The input data doesn't match the schema in terms of number of fields. ",
			    errorUnrecognizedResponseType: "The response type was either not set correctly, or it was not possible to detect it automatically. Please set settings.responseDataType and/or settings.responseContentType.",
			    hierarchicalTablesNotSupported: "Tables are not supported for HierarchicalSchema",
			    cannotBuildTemplate: "The jQuery template could not be built. There are no records present in the data source, and no columns defined.",
			    unrecognizedCondition: "Unrecognized filtering condition in the following expression: ",
			    fieldMismatch: "The following expression contains an invalid field or filtering condition: ",
			    noSortingFields: "There are no fields specified. You need to specify at least one field to sort by, when calling sort().",
			    filteringNoSchema: "There is no schema / fields specified. You need to specify a schema with field definitions and types to be able to filter the data source.",
			    noSaveChanges: "Saving changes was not successful. Server did not return Success object or returned Success:false.",
			    errorUnexpectedCustomFilterFunction: "An unexpected value was provided for a custom filtering function. A function or string is expected."
		    }
	    });

    }
}));// REMOVE_FROM_COMBINED_FILES
