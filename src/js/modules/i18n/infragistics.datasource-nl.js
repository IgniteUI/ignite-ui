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
	$.ig.locale.nl = $.ig.locale.nl || {};
	$.ig.DataSourceLocale = $.ig.DataSourceLocale || {};
	
	$.ig.locale.nl.DataSourceLocale = {
			invalidDataSource: "De opgegeven gegevensbron is ongeldig. Het is een scalair.",
			unknownDataSource: "Kan het type gegevensbron niet bepalen. Geef aan of het JSON- of XML-gegevens zijn.",
			errorParsingArrays: "Er is een fout opgetreden bij het parseren van de matrixgegevens en het toepassen van het gedefinieerde gegevensschema: ",
			errorParsingJson: "Er is een fout opgetreden bij het parseren van de JSON-gegevens en het toepassen van het gedefinieerde gegevensschema: ",
			errorParsingXml: "Er is een fout opgetreden bij het parseren van de XML-gegevens en het toepassen van het gedefinieerde gegevensschema: ",
			errorParsingHtmlTable: "Er is een fout opgetreden bij het uitpakken van de gegevens uit de HTML-tabel en het toepassen van het schema: ",
			errorExpectedTbodyParameter: "Er werd een tbody of een tabel verwacht als parameter.",
			errorTableWithIdNotFound: "De HTML-tabel met de volgende ID is niet gevonden: ",
			errorParsingHtmlTableNoSchema: "Er is een fout opgetreden bij het parseren van de tabel-DOM: ",
			errorParsingJsonNoSchema: "Er is een fout opgetreden bij het parseren / evalueren van de JSON-reeks: ",
			errorParsingXmlNoSchema: "Er is een fout opgetreden bij het parseren van de XML-reeks: ",
			errorXmlSourceWithoutSchema: "De geleverde gegevensbron is een XML-document, maar er is geen gedefinieerd gegevensschema ($ .IgDataSchema) ",
			errorUnrecognizedFilterCondition: " De filtervoorwaarde die werd doorgegeven, werd niet herkend: ",
			errorRemoteRequest: "Het externe verzoek om gegevens op te halen is mislukt: ",
			errorSchemaMismatch: "De invoergegevens komen niet overeen met het schema, het volgende veld kon niet worden toegewezen: ",
			errorSchemaFieldCountMismatch: "De invoergegevens komen qua aantal velden niet overeen met het schema. ",
			errorUnrecognizedResponseType: "Het antwoordtype was niet correct ingesteld of het was niet mogelijk om het automatisch te detecteren. Stel settings.responseDataType en / of settings.responseContentType in.",
			hierarchicalTablesNotSupported: "Tabellen worden niet ondersteund voor HierarchicalSchema",
			cannotBuildTemplate: "De jQuery-sjabloon kan niet worden gebouwd. Er zijn geen records aanwezig in de gegevensbron en er zijn geen kolommen gedefinieerd.",
			unrecognizedCondition: "Niet-herkende filtervoorwaarde in de volgende expressie: ",
			fieldMismatch: "De volgende expressie bevat een ongeldig veld of een filtervoorwaarde: ",
			noSortingFields: "Er zijn geen velden gespecificeerd. U moet ten minste één veld opgeven om op te sorteren wanneer u sort() aanroept.",
			filteringNoSchema: "Er zijn geen schema / velden gespecificeerd. U moet een schema met velddefinities en typen specificeren om de gegevensbron te kunnen filteren.",
			noSaveChanges: "Het opslaan van wijzigingen is mislukt. De server heeft het object Success niet of het resultaat Success: false geretourneerd.",
			errorUnexpectedCustomFilterFunction: "Er is een onverwachte waarde opgegeven voor een aangepaste filterfunctie. Er wordt een functie of tekenreeks verwacht."
	};
	
	$.ig.DataSourceLocale.locale = $.ig.DataSourceLocale.locale || $.ig.locale.nl.DataSourceLocale;
	return $.ig.locale.nl.DataSourceLocale;
}));// REMOVE_FROM_COMBINED_FILES
