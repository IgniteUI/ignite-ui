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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.da = $.ig.locale.da || {};
	$.ig.DataSourceLocale = $.ig.DataSourceLocale || {};
	
	$.ig.locale.da.DataSourceLocale = {
			invalidDataSource: "Den angivne datakilde er ugyldig. Det viser sig at være en skalar.",
			unknownDataSource: "Kan ikke bestemme datakildetypen. Angiv venligst, om det er JSON- eller XML-data.",
			errorParsingArrays: "Der opstod en fejl under parsing af matrixdata og anvendelse af det definerede dataskema: ",
			errorParsingJson: "Der opstod en fejl under parsing af JSON-data og anvendelse af det definerede dataskema: ",
			errorParsingXml: "Der opstod en fejl ved parsing af XML-data og anvendelse af det definerede dataskema: ",
			errorParsingHtmlTable: "Der opstod en fejl ved udpakning af data fra HTML-tabellen og anvendelse af skemaet: ",
			errorExpectedTbodyParameter: "Forventet en tbody eller en tabel som parameter.",
			errorTableWithIdNotFound: "HTML-tabellen med følgende ID blev ikke fundet: ",
			errorParsingHtmlTableNoSchema: "Der opstod en fejl under parsering af tabel DOM: ",
			errorParsingJsonNoSchema: "Der opstod en fejl under parsing/evaluering af JSON-strengen: ",
			errorParsingXmlNoSchema: "Der opstod en fejl ved parsing af XML-strengen: ",
			errorXmlSourceWithoutSchema: "Den leverede datakilde er et xml-dokument, men der er ikke defineret dataskema ($.IgDataSchema) ",
			errorUnrecognizedFilterCondition: " Den overførte filtertilstand blev ikke genkendt: ",
			errorRemoteRequest: "Fjernanmodningen om at hente data mislykkedes: ",
			errorSchemaMismatch: "Indtastningsdataene stemmer ikke overens med skemaet, følgende felt kunne ikke kortlægges: ",
			errorSchemaFieldCountMismatch: "Indtastningsdataene stemmer ikke overens med skemaet med hensyn til antal felter. ",
			errorUnrecognizedResponseType: "Reaktionstypen blev enten ikke indstillet korrekt, eller det var ikke muligt at registrere den automatisk. Indstil settings.responseDataType og/eller settings.responseContentType.",
			hierarchicalTablesNotSupported: "Tabeller understøttes ikke for HierarchicalSchema",
			cannotBuildTemplate: "JQuery-skabelonen kunne ikke bygges. Der er ingen poster til stede i datakilden, og der er ikke angivet nogen kolonner.",
			unrecognizedCondition: "Ukendt filtreringsbetingelse i følgende udtryk: ",
			fieldMismatch: "Følgende udtryk indeholder et ugyldigt felt eller filtreringsbetingelse: ",
			noSortingFields: "Der er ikke angivet nogen felter. Du skal angive mindst et felt, der skal sorteres efter, når du vælger sort().",
			filteringNoSchema: "Der er ikke angivet skema/felter. Du skal angive et skema med feltdefinitioner og -typer for at kunne filtrere datakilden.",
			noSaveChanges: "Det lykkedes ikke at gemme ændringerne. Serveren returnerede ikke Success-objekt eller returnerede Success: false.",
			errorUnexpectedCustomFilterFunction: "En uventet værdi blev angivet til en brugerdefineret filtreringsfunktion. En funktion eller streng forventes."
	};
	
	$.ig.DataSourceLocale.locale = $.ig.DataSourceLocale.locale || $.ig.locale.da.DataSourceLocale;
	return $.ig.locale.da.DataSourceLocale;
}));// REMOVE_FROM_COMBINED_FILES
