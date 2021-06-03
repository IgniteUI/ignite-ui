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
	$.ig.locale.ro = $.ig.locale.ro || {};
	$.ig.DataSourceLocale = $.ig.DataSourceLocale || {};
	
	$.ig.locale.ro.DataSourceLocale = {
			invalidDataSource: "Sursa de date furnizată nu este validă. Se întâmplă să fie un scalar.",
			unknownDataSource: "Nu se poate determina tipul sursei de date. Vă rugăm să specificați dacă este vorba de date JSON sau XML.",
			errorParsingArrays: "A apărut o eroare la analizarea datelor matricei și la aplicarea schemei de date definite: ",
			errorParsingJson: "A apărut o eroare la analizarea datelor JSON și la aplicarea schemei de date definite: ",
			errorParsingXml: "A apărut o eroare la analizarea datelor XML și la aplicarea schemei de date definite: ",
			errorParsingHtmlTable: "A apărut o eroare la extragerea datelor din tabelul HTML și la aplicarea schemei: ",
			errorExpectedTbodyParameter: "Se aștepta un tbody sau un tabel ca parametru.",
			errorTableWithIdNotFound: "Tabelul HTML cu următorul ID nu a fost găsit: ",
			errorParsingHtmlTableNoSchema: "A apărut o eroare la analizarea tabelului DOM: ",
			errorParsingJsonNoSchema: "A apărut o eroare la analizarea / evaluarea șirului JSON: ",
			errorParsingXmlNoSchema: "A apărut o eroare la analizarea șirului XML: ",
			errorXmlSourceWithoutSchema: "Sursa de date furnizată este un document XML, dar nu există o schemă de date definită ($ .IgDataSchema) ",
			errorUnrecognizedFilterCondition: " Condiția de filtrare transmisă nu a fost recunoscută: ",
			errorRemoteRequest: "Solicitarea de la distanță pentru preluarea datelor a eșuat: ",
			errorSchemaMismatch: "Datele de intrare nu se potrivesc schemei, următorul câmp nu a putut fi mapat: ",
			errorSchemaFieldCountMismatch: "Datele de intrare nu corespund schemei în ceea ce privește numărul de câmpuri. ",
			errorUnrecognizedResponseType: "Tipul de răspuns fie nu a fost setat corect, fie nu a fost posibil să-l detecteze automat. Vă rugăm să setați settings.responseDataType și / sau settings.responseContentType.",
			hierarchicalTablesNotSupported: "Tabelele nu sunt acceptate pentru HierarchicalSchema",
			cannotBuildTemplate: "Șablonul jQuery nu a putut fi construit. Nu există înregistrări prezente în sursa de date și nu există coloane definite.",
			unrecognizedCondition: "Condiție de filtrare nerecunoscută în următoarea expresie: ",
			fieldMismatch: "Următoarea expresie conține un câmp nevalid sau o condiție de filtrare: ",
			noSortingFields: "Nu sunt specificate câmpuri. Trebuie să specificați cel puțin un câmp pentru care să sortați, atunci când apelați sort().",
			filteringNoSchema: "Nu există nici o schemă / câmpuri specificate. Trebuie să specificați o schemă cu definiții de câmp și tipuri pentru a putea filtra sursa de date.",
			noSaveChanges: "Salvarea modificărilor nu a avut succes. Serverul nu a returnat obiectul de Success sau a returnat Success:false.",
			errorUnexpectedCustomFilterFunction: "O valoare neașteptată a fost furnizată pentru o funcție de filtrare personalizată. Se așteaptă o funcție sau un șir."
	};
	
	$.ig.DataSourceLocale.locale = $.ig.DataSourceLocale.locale || $.ig.locale.ro.DataSourceLocale;
	return $.ig.locale.ro.DataSourceLocale;
}));// REMOVE_FROM_COMBINED_FILES
