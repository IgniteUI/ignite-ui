/*!@license
* Infragistics.Web.ClientUI Combo localization resources <build_number>
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
	$.ig.Combo = $.ig.Combo || {};
	
	$.ig.locale.pl.Combo = {
			noMatchFoundText: 'Nie znaleziono dopasowań',
			dropDownButtonTitle: 'Pokaż rozwijane',
			clearButtonTitle: 'Wyczyść wartość',
			placeHolder: 'wybierz...',
			notSuported: 'Operacja nie jest obsługiwana.',
			errorNoSupportedTextsType: "Wymagany jest inny tekst filtrowania. Podaj wartość, która jest ciągiem lub tablicą ciągów.",
			errorUnrecognizedHighlightMatchesMode: "Wymagany jest inny tryb podświetlenia dopasowań. Wybierz wartość spośród 'multi', 'contains', 'startsWith', 'full' i "null".",
			errorIncorrectGroupingKey: "Klucz grupowania jest nieprawidłowy."
	};

	$.ig.Combo.locale = $.ig.Combo.locale || $.ig.locale.pl.Combo;
	return $.ig.locale.pl.Combo;
}));// REMOVE_FROM_COMBINED_FILES
