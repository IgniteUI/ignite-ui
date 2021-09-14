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
	$.ig.locale['nb-NO'] = $.ig.locale['nb-NO'] || {};
	$.ig.DataSourceLocale = $.ig.DataSourceLocale || {};
	
	$.ig.locale['nb-NO'].DataSourceLocale = {
			invalidDataSource: "Den oppgitte datakilden er ugyldig. Det er tilfeldigvis en skalar.",
			unknownDataSource: "Kan ikke fastslå datakildetypen. Oppgi om det er JSON- eller XML-data.",
			errorParsingArrays: "Det oppstod en feil under analyse av matrisedata og bruk av det definerte dataskjemaet: ",
			errorParsingJson: "Det oppstod en feil under analyse av JSON-dataene og bruk av det definerte dataskjemaet: ",
			errorParsingXml: "Det oppstod en feil under analyse av XML-dataene og bruk av det definerte dataskjemaet: ",
			errorParsingHtmlTable: "Det oppstod en feil ved å trekke ut dataene fra HTML-tabellen og bruke skjemaet: ",
			errorExpectedTbodyParameter: "Forventet en tbody eller en tabell som en parameter.",
			errorTableWithIdNotFound: "HTML-tabellen med følgende ID ble ikke funnet: ",
			errorParsingHtmlTableNoSchema: "Det oppstod en feil under analyse av tabellen DOM: ",
			errorParsingJsonNoSchema: "Det oppstod en feil under analyse/evaluering av JSON-strengen: ",
			errorParsingXmlNoSchema: "Det oppstod en feil under analyse av XML-strengen: ",
			errorXmlSourceWithoutSchema: "Den medfølgende datakilden er et xml-dokument, men det er ikke noe definert dataskjema ($.IgDataSchema) ",
			errorUnrecognizedFilterCondition: " Filtertilstanden som ble bestått ble ikke gjenkjent: ",
			errorRemoteRequest: "Den eksterne forespørselen om å hente data mislyktes: ",
			errorSchemaMismatch: "Inndataene stemmer ikke overens med skjemaet. Følgende felt kunne ikke kartlegges: ",
			errorSchemaFieldCountMismatch: "Inndataene stemmer ikke overens med skjemaet når det gjelder antall felt. ",
			errorUnrecognizedResponseType: "Svarstypen var enten ikke riktig angitt, eller det var ikke mulig å oppdage den automatisk. Angi settings.responseDataType og/eller settings.responseContentType.",
			hierarchicalTablesNotSupported: "Tabeller støttes ikke for HierarchicalSchema",
			cannotBuildTemplate: "JQuery-malen kunne ikke bygges. Det er ingen poster i datakilden, og ingen kolonner er definert.",
			unrecognizedCondition: "Ukjent filtreringstilstand i følgende uttrykk: ",
			fieldMismatch: "Følgende uttrykk inneholder et ugyldig felt eller en filtreringsbetingelse: ",
			noSortingFields: "Det er ingen felt angitt. Du må angi minst ett felt å sortere etter, når du kaller sort().",
			filteringNoSchema: "Det er ikke angitt noen skjema / felt. Du må spesifisere et skjema med feltdefinisjoner og typer for å kunne filtrere datakilden.",
			noSaveChanges: "Lagring av endringer var ikke vellykket. Serveren returnerte ikke suksessobjekt eller returnerte suksess: usant.",
			errorUnexpectedCustomFilterFunction: "Det ble gitt en uventet verdi for en tilpasset filtreringsfunksjon. En funksjon eller streng forventes."
	};
	
	$.ig.DataSourceLocale.locale = $.ig.DataSourceLocale.locale || $.ig.locale['nb-NO'].DataSourceLocale;
	return $.ig.locale['nb-NO'].DataSourceLocale;
}));// REMOVE_FROM_COMBINED_FILES
