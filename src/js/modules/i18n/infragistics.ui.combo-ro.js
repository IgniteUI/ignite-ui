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
	$.ig.locale.ro = $.ig.locale.ro || {};
	$.ig.Combo = $.ig.Combo || {};
	
	$.ig.locale.ro.Combo = {
			noMatchFoundText: 'Nu s-a găsit nici o potrivire',
			dropDownButtonTitle: 'Afișați meniul derulant',
			clearButtonTitle: 'Ștergeți valoarea',
			placeHolder: 'Selectați...',
			notSuported: 'Operația nu este acceptată.',
			errorNoSupportedTextsType: "Este necesar un text de filtrare diferit. Furnizați o valoare care este fie un șir, fie o matrice de șiruri.",
			errorUnrecognizedHighlightMatchesMode: "Este necesar un mod diferit de potrivire a evidențierii. Alegeți o valoare între 'multi', 'contains', 'startsWith', 'full' și 'null'.",
			errorIncorrectGroupingKey: "Cheia de grupare nu este corectă."
	};

	$.ig.Combo.locale = $.ig.Combo.locale || $.ig.locale.ro.Combo;
	return $.ig.locale.ro.Combo;
}));// REMOVE_FROM_COMBINED_FILES
