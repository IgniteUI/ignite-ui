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
	$.ig.locale.pl = $.ig.locale.pl || {};
	$.ig.DataSourceLocale = $.ig.DataSourceLocale || {};
	
	$.ig.locale.pl.DataSourceLocale = {
			invalidDataSource: "Podane źródło danych jest nieprawidłowe. Jest to wartość skalarna.",
			unknownDataSource: "Nie można określić typu źródła danych. Określ, czy są to dane JSON czy XML.",
			errorParsingArrays: "Wystąpił błąd podczas analizowania danych tablicy i stosowania zdefiniowanego schematu danych: ",
			errorParsingJson: "Wystąpił błąd podczas analizowania danych JSON i stosowania zdefiniowanego schematu danych: ",
			errorParsingXml: "Wystąpił błąd podczas analizowania danych XML i stosowania zdefiniowanego schematu danych: ",
			errorParsingHtmlTable: "Wystąpił błąd podczas wyodrębniania danych z tabeli HTML i stosowania schematu: ",
			errorExpectedTbodyParameter: "Jako parametru oczekiwano tbody lub table.",
			errorTableWithIdNotFound: "Nie znaleziono tabeli HTML o następującym identyfikatorze: ",
			errorParsingHtmlTableNoSchema: "Wystąpił błąd podczas analizowania modelu DOM tabeli: ",
			errorParsingJsonNoSchema: "Wystąpił błąd podczas analizowania/obliczania ciągu JSON: ",
			errorParsingXmlNoSchema: "Wystąpił błąd podczas analizowania ciągu XML: ",
			errorXmlSourceWithoutSchema: "Dostarczone źródło danych to dokument XML, który nie ma zdefiniowanego schematu danych ($.IgDataSchema) ",
			errorUnrecognizedFilterCondition: " Przesłany warunek filtru nie został rozpoznany: ",
			errorRemoteRequest: "Zdalne żądanie pobrania danych nie powiodło się: ",
			errorSchemaMismatch: "Dane wejściowe nie pasują do schematu. Nie można zamapować następującego pola: ",
			errorSchemaFieldCountMismatch: "Dane wejściowe nie są zgodne ze schematem pod względem liczby pól. ",
			errorUnrecognizedResponseType: "Ustawiony typ odpowiedzi jest nieprawidłowy lub nie można go wykryć automatycznie. Ustaw elementy settings.responseDataType i/lub settings.responseContentType.",
			hierarchicalTablesNotSupported: "Tabele nie są obsługiwane w schemacie HierarchicalSchema",
			cannotBuildTemplate: "Nie można zbudować szablonu jQuery. W źródle danych nie ma żadnych rekordów i nie zdefiniowano żadnych kolumn.",
			unrecognizedCondition: "Nierozpoznany warunek filtrowania w następującym wyrażeniu: ",
			fieldMismatch: "Poniższe wyrażenie zawiera nieprawidłowe pole lub warunek filtrowania: ",
			noSortingFields: "Nie określono pól. Podczas wywoływania metody sort() należy określić co najmniej jedno pole do sortowania.",
			filteringNoSchema: "Nie określono schematu/pól. Aby filtrować źródło danych, musisz określić schemat z definicjami pól i typami.",
			noSaveChanges: "Zapisywanie zmian nie powiodło się. Serwer nie zwrócił obiektu Success lub zwrócił wynik Success:false.",
			errorUnexpectedCustomFilterFunction: "Podano nieoczekiwaną wartość dla niestandardowej funkcji filtrowania. Oczekiwano funkcji lub ciągu znaków."
	};
	
	$.ig.DataSourceLocale.locale = $.ig.DataSourceLocale.locale || $.ig.locale.pl.DataSourceLocale;
	return $.ig.locale.pl.DataSourceLocale;
}));// REMOVE_FROM_COMBINED_FILES
