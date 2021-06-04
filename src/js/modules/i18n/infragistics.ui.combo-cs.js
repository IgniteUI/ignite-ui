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
	$.ig.locale.cs = $.ig.locale.cs || {};
	$.ig.Combo = $.ig.Combo || {};
	
	$.ig.locale.cs.Combo = {
			noMatchFoundText: 'Nebyly nalezeny žádné shody',
			dropDownButtonTitle: 'Zobrazit rozevírací nabídku',
			clearButtonTitle: 'Vymazat hodnotu',
			placeHolder: 'vybrat...',
			notSuported: 'Provoz není podporován.',
			errorNoSupportedTextsType: "Je vyžadován jiný text pro filtrování. Zadejte hodnotu, která je buď řetězcem, nebo polem řetězců.",
			errorUnrecognizedHighlightMatchesMode: "Je vyžadován jiný režim shod zvýraznění. Vyberte hodnotu mezi 'multi', 'contains', 'startsWith', 'full' a 'null'.",
			errorIncorrectGroupingKey: "Seskupovací klíč není správný."
	};

	$.ig.Combo.locale = $.ig.Combo.locale || $.ig.locale.cs.Combo;
	return $.ig.locale.cs.Combo;
}));// REMOVE_FROM_COMBINED_FILES
