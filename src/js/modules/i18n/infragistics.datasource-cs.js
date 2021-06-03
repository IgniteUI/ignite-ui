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
	$.ig.locale.cs = $.ig.locale.cs || {};
	$.ig.DataSourceLocale = $.ig.DataSourceLocale || {};
	
	$.ig.locale.cs.DataSourceLocale = {
			invalidDataSource: "Zadaný zdroj dat je neplatný. Stává se to skalární.",
			unknownDataSource: "Nelze určit typ zdroje dat. Uveďte, zda se jedná o data JSON nebo XML.",
			errorParsingArrays: "Při analýze dat pole a použití definovaného schématu dat došlo k chybě: ",
			errorParsingJson: "Při analýze dat JSON a použití definovaného schématu dat došlo k chybě: ",
			errorParsingXml: "Při analýze dat XML a použití definovaného schématu dat došlo k chybě: ",
			errorParsingHtmlTable: "Při extrakci dat z tabulky HTML a použití schématu došlo k chybě: ",
			errorExpectedTbodyParameter: "Jako parametr se očekávalo tbody nebo tabulka.",
			errorTableWithIdNotFound: "Tabulka HTML s následujícím ID nebyla nalezena: ",
			errorParsingHtmlTableNoSchema: "Při analýze DOM tabulky došlo k chybě: ",
			errorParsingJsonNoSchema: "Při analýze / vyhodnocení řetězce JSON došlo k chybě: ",
			errorParsingXmlNoSchema: "Při analýze řetězce XML došlo k chybě: ",
			errorXmlSourceWithoutSchema: "Zadaný zdroj dat je dokument XML, ale neexistuje žádné definované datové schéma ($.IgDataSchema) ",
			errorUnrecognizedFilterCondition: " Nebyla rozpoznána podmínka filtru: ",
			errorRemoteRequest: "Vzdálený požadavek na načtení dat selhal: ",
			errorSchemaMismatch: "Vstupní data neodpovídají schématu, následující pole nelze mapovat: ",
			errorSchemaFieldCountMismatch: "Vstupní data neodpovídají schématu z hlediska počtu polí. ",
			errorUnrecognizedResponseType: "Typ odpovědi nebyl buď správně nastaven, nebo nebylo možné jej detekovat automaticky. Nastavte prosím settings.responseDataType a / nebo settings.responseContentType.",
			hierarchicalTablesNotSupported: "Tabulky nejsou pro HierarchicalSchema podporovány",
			cannotBuildTemplate: "Šablonu jQuery nelze vytvořit. Ve zdroji dat nejsou žádné záznamy a nejsou definovány žádné sloupce.",
			unrecognizedCondition: "Nerozpoznaná podmínka filtrování v následujícím výrazu: ",
			fieldMismatch: "Následující výraz obsahuje neplatné pole nebo podmínku filtrování: ",
			noSortingFields: "Nejsou zadána žádná pole. Při volání sort() je třeba zadat alespoň jedno pole, podle kterého se má seřadit.",
			filteringNoSchema: "ANení zadáno žádné schéma / pole. byste mohli filtrovat zdroj dat, musíte určit schéma s definicemi a typy polí.",
			noSaveChanges: "Uložení změn nebylo úspěšné. Server nevrátil objekt úspěchu nebo vrátil úspěch: false.",
			errorUnexpectedCustomFilterFunction: "Pro vlastní funkci filtrování byla poskytnuta neočekávaná hodnota. Očekává se funkce nebo řetězec."
	};
	
	$.ig.DataSourceLocale.locale = $.ig.DataSourceLocale.locale || $.ig.locale.cs.DataSourceLocale;
	return $.ig.locale.cs.DataSourceLocale;
}));// REMOVE_FROM_COMBINED_FILES
