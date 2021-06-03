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
	$.ig.locale.hu = $.ig.locale.hu || {};
	$.ig.Combo = $.ig.Combo || {};
	
	$.ig.locale.hu.Combo = {
			noMatchFoundText: 'Nincs találat',
			dropDownButtonTitle: 'Legördülő lista megjelenítése',
			clearButtonTitle: 'Érték törlése',
			placeHolder: 'kiválasztás…',
			notSuported: 'A művelet nem támogatott.',
			errorNoSupportedTextsType: "Más szöveges szűrőt kell megadni. Olyan értéket adjon meg, amely vagy karakterlánc, vagy karakterlánc-tömb.",
			errorUnrecognizedHighlightMatchesMode: "Más kiemelési módot kell kiválasztani a találatok kiemelésére. Válasszon egyet a 'multi', 'contains', 'startsWith', 'full' és 'null' közül.",
			errorIncorrectGroupingKey: "A csoportosítási kulcs nem megfelelő."
	};

	$.ig.Combo.locale = $.ig.Combo.locale || $.ig.locale.hu.Combo;
	return $.ig.locale.hu.Combo;
}));// REMOVE_FROM_COMBINED_FILES
