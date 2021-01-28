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
	$.ig.locale.it = $.ig.locale.it || {};
	$.ig.Combo = $.ig.Combo || {};
	
	$.ig.locale.it.Combo = {
			noMatchFoundText: 'Nessuna corrispondenza trovata',
			dropDownButtonTitle: 'Mostra menu a discesa',
			clearButtonTitle: 'Cancella valore',
			placeHolder: 'seleziona...',
			notSuported: 'Operazione non supportata.',
			errorNoSupportedTextsType: "È richiesto un testo di filtro diverso. Fornire un valore che è una stringa o un array di stringhe.",
			errorUnrecognizedHighlightMatchesMode: "È necessaria una diversa modalità di evidenziazione. Scegliere un valore tra 'multi', 'contains', 'startsWith', 'full' e 'null'.",
			errorIncorrectGroupingKey: "La chiave di raggruppamento non è corretta."
	};

	$.ig.Combo.locale = $.ig.Combo.locale || $.ig.locale.it.Combo;
	return $.ig.locale.it.Combo;
}));// REMOVE_FROM_COMBINED_FILES
