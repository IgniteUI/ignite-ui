/*!@license
* Infragistics.Web.ClientUI Tree localization resources <build_number>
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
	$.ig.Tree = $.ig.Tree || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.pl = $.ig.locale.pl || {};

	$.ig.locale.pl.Tree = {
			    invalidArgumentType: 'Podano nieprawidłowy typ argumentu.',
			    errorOnRequest: 'Wystąpił błąd podczas pobierania danych: ',
			    noDataSourceUrl: 'Kontrolka igTree wymaga podania adresu dataSourceUrl w celu zainicjowania żądania danych z tego adresu URL.',
			    incorrectPath: 'W podanej ścieżce nie znaleziono węzła: ',
			    incorrectNodeObject: 'Podany argument nie jest elementem węzła jQuery.',
			    setOptionError: 'Zmiany w trakcie wykonywania są niedozwolone w przypadku następującej opcji: ',
			    moveTo: '<strong>Przenieś do</strong> {0}',
			    moveBetween: '<strong>Przenieś między</strong> {0} a {1}',
			    moveAfter: '<strong>Przenieś za</strong> {0}',
			    moveBefore: '<strong>Przenieś przed</strong> {0}',
			    copyTo: '<strong>Kopiuj do</strong> {0}',
			    copyBetween: '<strong>Kopiuj między</strong> {0} a {1}',
			    copyAfter: '<strong>Kopiuj za</strong> {0}',
			    copyBefore: '<strong>Kopiuj przed</strong> {0}',
			    and: 'i'
	}
		
	$.ig.Tree.locale = $.ig.Tree.locale || $.ig.locale.pl.Tree;
	return $.ig.locale.pl.Tree;
}));// REMOVE_FROM_COMBINED_FILES
