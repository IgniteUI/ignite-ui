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
	$.ig.locale.hu = $.ig.locale.hu || {};
	$.ig.DataSourceLocale = $.ig.DataSourceLocale || {};
	
	$.ig.locale.hu.DataSourceLocale = {
			invalidDataSource: "A megadott adatforrás érvénytelen. Az adatforrás skaláris mennyiség.",
			unknownDataSource: "Az adatforrás típusa nem határozható meg. Kérjük, adja meg, hogy az adatok JSON vagy XML adatok-e.",
			errorParsingArrays: "Hiba történt a tömbadatok elemzése és a megadott adatséma alkalmazása során: ",
			errorParsingJson: "Hiba történt a JSON-adatok elemzése és a megadott adat-séma alkalmazása során: ",
			errorParsingXml: "Hiba történt az XML-adatok elemzése és a megadott adatséma alkalmazása során: ",
			errorParsingHtmlTable: "Hiba történt az adatok HTML-táblázatból történő kinyerése és a séma alkalmazása során: ",
			errorExpectedTbodyParameter: "Paraméterként tbody-t vagy táblázatot várt.",
			errorTableWithIdNotFound: "A következő azonosítóval rendelkező HTML táblázat nem található: ",
			errorParsingHtmlTableNoSchema: "Hiba történt a táblázathoz tartozó DOM elemzése során: ",
			errorParsingJsonNoSchema: "Hiba történt a JSON karakterlánc elemzése/kiértékelése során: ",
			errorParsingXmlNoSchema: "Hiba történt az XML karakterlánc elemzése során: ",
			errorXmlSourceWithoutSchema: "A megadott adatforrás egy xml dokumentum, de nincs meghatározva adatséma ($.IgDataSchema) ",
			errorUnrecognizedFilterCondition: " A megadott szűrőfeltétel nem ismerhető fel: ",
			errorRemoteRequest: "Az adatok lekérésére irányuló távoli kérelem sikertelen volt: ",
			errorSchemaMismatch: "A bemeneti adatok nem illeszkednek a sémához. A következő mezőt nem sikerült leképezni: ",
			errorSchemaFieldCountMismatch: "A bemeneti adatok a mezők számát tekintve nem illeszkednek a sémához. ",
			errorUnrecognizedResponseType: "A válasz típusa vagy helytelenül lett megadva, vagy nem sikerült automatikusan felismerni. Kérjük, állítsa be a settings.responseDataType és/vagy a settings.responseContentType értékét.",
			hierarchicalTablesNotSupported: "A HierarchicalSchema nem támogatja a táblázatok használatát",
			cannotBuildTemplate: "A jQuery sablon nem építhető fel. Nincsenek rekordok az adatforrásban, és nincsenek definiálva oszlopok.",
			unrecognizedCondition: "Ismeretlen szűrési feltétel a következő kifejezésben: ",
			fieldMismatch: "A következő kifejezés érvénytelen mezőt vagy szűrési feltételt tartalmaz: ",
			noSortingFields: "Nincsenek megadva mezők. A sort() metódus meghívásakor legalább egy mezőt meg kell adnia, amely alapján a rendezés végrehajtható.",
			filteringNoSchema: "Nincs megadva séma/mezők. Az adatforrás szűréséhez meg kell adnia egy sémát meződefiníciókkal és típusokkal.",
			noSaveChanges: "A változtatások mentése sikertelen volt. A szerver nem adott vissza Success objektumot, vagy a Success visszaadott értéke hamis volt.",
			errorUnexpectedCustomFilterFunction: "Az egyéni szűréshez váratlan érték lett megadva. Függvényt vagy karakterláncot kell megadni."
	};
	
	$.ig.DataSourceLocale.locale = $.ig.DataSourceLocale.locale || $.ig.locale.hu.DataSourceLocale;
	return $.ig.locale.hu.DataSourceLocale;
}));// REMOVE_FROM_COMBINED_FILES
