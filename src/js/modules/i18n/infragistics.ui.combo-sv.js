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
	$.ig.locale.sv = $.ig.locale.sv || {};
	$.ig.Combo = $.ig.Combo || {};
	
	$.ig.locale.sv.Combo = {
			noMatchFoundText: 'Inga träffar funna',
			dropDownButtonTitle: 'Visa rullgardinsmeny',
			clearButtonTitle: 'Rensa värde',
			placeHolder: 'välj...',
			notSuported: 'Funktionen stöds inte.',
			errorNoSupportedTextsType: "En annan filtreringstext krävs. Ange ett värde som antingen är en sträng eller en rad strängar.",
			errorUnrecognizedHighlightMatchesMode: "En annan lägesinställning för markeringen av matchningar krävs. Välj ett värde mellan 'multi', 'contains', 'startsWith', 'full' och 'null'.",
			errorIncorrectGroupingKey: "Grupperingsnyckeln är inte korrekt."
	};

	$.ig.Combo.locale = $.ig.Combo.locale || $.ig.locale.sv.Combo;
	return $.ig.locale.sv.Combo;
}));// REMOVE_FROM_COMBINED_FILES
