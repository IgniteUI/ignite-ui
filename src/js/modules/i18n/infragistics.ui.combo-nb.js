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
	$.ig.locale.nb = $.ig.locale.nb || {};
	$.ig.Combo = $.ig.Combo || {};
	
	$.ig.locale.nb.Combo = {
			noMatchFoundText: 'Ingen treff funnet',
			dropDownButtonTitle: 'Vis rullegardinmeny',
			clearButtonTitle: 'Fjern verdi',
			placeHolder: 'plukke ut...',
			notSuported: 'Drift støttes ikke.',
			errorNoSupportedTextsType: "En annen filtreringstekst er nødvendig. Angi en verdi som enten er en streng eller en rekke strenger.",
			errorUnrecognizedHighlightMatchesMode: "En annen høydepunktsmatch-modus er nødvendig. Velg en verdi mellom 'multi', 'contains', 'startsWith', 'full' og 'null'.",
			errorIncorrectGroupingKey: "Grupperingsnøkkelen er ikke korrekt."
	};

	$.ig.Combo.locale = $.ig.Combo.locale || $.ig.locale.nb.Combo;
	return $.ig.locale.nb.Combo;
}));// REMOVE_FROM_COMBINED_FILES
