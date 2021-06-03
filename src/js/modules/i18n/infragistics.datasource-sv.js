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
	$.ig.locale.sv = $.ig.locale.sv || {};
	$.ig.DataSourceLocale = $.ig.DataSourceLocale || {};
	
	$.ig.locale.sv.DataSourceLocale = {
			invalidDataSource: "Den medföljande datakällan är ogiltig. Den råkar vara en skalär.",
			unknownDataSource: "Det går inte att avgöra typ av datakälla. Ange om det är JSON- eller XML-data.",
			errorParsingArrays: "Det uppstod ett fel vid analys av arraydata och tillämpning av det definierade dataskemat: ",
			errorParsingJson: "Det uppstod ett fel vid analys av JSON-data och tillämpning av det definierade dataschemat: ",
			errorParsingXml: "Det uppstod ett fel vid analys av XML-data och tillämpning av det definierade dataschemat: ",
			errorParsingHtmlTable: "Det uppstod ett fel när data extraherades från HTML-tabellen och vid tillämpningen av schemat: ",
			errorExpectedTbodyParameter: "En tbody eller en tabell förväntades som en parameter.",
			errorTableWithIdNotFound: "HTML-tabellen med följande ID hittades inte: ",
			errorParsingHtmlTableNoSchema: "Det uppstod ett fel vid analys av tabellen DOM: ",
			errorParsingJsonNoSchema: "Det uppstod ett fel vid parsning/utvärdering av JSON-strängen: ",
			errorParsingXmlNoSchema: "Det uppstod ett fel vid analys av XML-strängen: ",
			errorXmlSourceWithoutSchema: "Den medföljande datakällan är ett xml-dokument, men det finns inget definierat dataskema ($ .IgDataSchema) ",
			errorUnrecognizedFilterCondition: " Filtervillkoret som godkändes erkändes inte: ",
			errorRemoteRequest: "Fjärrbegäran att hämta data misslyckades: ",
			errorSchemaMismatch: "Ingångsdata matchar inte schemat, följande fält kunde inte mappas: ",
			errorSchemaFieldCountMismatch: "Ingångsdata matchar inte schemat vad gäller antal fält. ",
			errorUnrecognizedResponseType: "Svarstypen var antingen inte korrekt inställd, eller så kunde den inte upptäckas automatiskt. Ange settings.responseDataType och/eller settings.responseContentType.",
			hierarchicalTablesNotSupported: "Tabeller stöds inte för HierarchicalSchema",
			cannotBuildTemplate: "JQuery-mallen kunde inte byggas. Det finns inga poster i datakällan och inga kolumner definierade.",
			unrecognizedCondition: "Okänt filtreringsvillkor i följande uttryck: ",
			fieldMismatch: "Följande uttryck innehåller ett ogiltigt fält eller filtreringsvillkor: ",
			noSortingFields: "Det finns inga angivna fält. Du måste ange minst ett fält att sortera efter när du anropar sort().",
			filteringNoSchema: "Det finns inget schema/fält specificerat. Du måste ange ett schema med fältdefinitioner och typer för att kunna filtrera datakällan.",
			noSaveChanges: "Spara ändringar lyckades inte. Servern returnerade inte Success-objektet eller returnerade Success:false.",
			errorUnexpectedCustomFilterFunction: "Ett oväntat värde gavs för en anpassad filtreringsfunktion. En funktion eller sträng förväntas."
	};
	
	$.ig.DataSourceLocale.locale = $.ig.DataSourceLocale.locale || $.ig.locale.sv.DataSourceLocale;
	return $.ig.locale.sv.DataSourceLocale;
}));// REMOVE_FROM_COMBINED_FILES
