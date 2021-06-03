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
	$.ig.locale.da = $.ig.locale.da || {};
	$.ig.Combo = $.ig.Combo || {};
	
	$.ig.locale.da.Combo = {
			noMatchFoundText: 'Ingen match fundet',
			dropDownButtonTitle: 'Vis rullemenu',
			clearButtonTitle: 'Ryd værdi',
			placeHolder: 'Vælg...',
			notSuported: 'Handlingen understøttes ikke',
			errorNoSupportedTextsType: "En anden filtreringstekst er påkrævet. Angiv en værdi, der enten er en streng eller en række strenge.",
			errorUnrecognizedHighlightMatchesMode: "Der kræves en anden tilstand for fremhævning af matches. Vælg en værdi mellem 'multi', 'contains', 'startsWith', 'full' og 'null'.",
			errorIncorrectGroupingKey: "Grupperingsnøglen er ikke korrekt."
	};

	$.ig.Combo.locale = $.ig.Combo.locale || $.ig.locale.da.Combo;
	return $.ig.locale.da.Combo;
}));// REMOVE_FROM_COMBINED_FILES
