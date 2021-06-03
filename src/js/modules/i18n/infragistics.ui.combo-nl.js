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
	$.ig.locale.nl = $.ig.locale.nl || {};
	$.ig.Combo = $.ig.Combo || {};
	
	$.ig.locale.nl.Combo = {
			noMatchFoundText: 'Geen overeenkomsten gevonden',
			dropDownButtonTitle: 'Vervolgkeuzelijst weergeven',
			clearButtonTitle: 'Waarde wissen',
			placeHolder: 'selecteren ...',
			notSuported: 'Bewerking wordt niet ondersteund.',
			errorNoSupportedTextsType: "Een andere filtertekst is vereist. Geef een waarde op die ofwel een tekenreeks of een matrix tekenreeksen is.",
			errorUnrecognizedHighlightMatchesMode: "Een andere modus voor het aanduiden van matches is vereist. Kies een waarde tussen 'multi', 'contains', 'startsWith', 'full' en 'null'.",
			errorIncorrectGroupingKey: "Groeperingssleutel is niet correct."
	};

	$.ig.Combo.locale = $.ig.Combo.locale || $.ig.locale.nl.Combo;
	return $.ig.locale.nl.Combo;
}));// REMOVE_FROM_COMBINED_FILES
