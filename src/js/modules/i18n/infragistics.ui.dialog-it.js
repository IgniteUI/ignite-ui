/*!@license
* Infragistics.Web.ClientUI Dialog localization resources <build_number>
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
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale.it.Dialog = {
			closeButtonTitle: "Chiudi",
			minimizeButtonTitle: "Riduci a icona",
			maximizeButtonTitle: "Ingrandisci",
			pinButtonTitle: "Aggiungi",
			unpinButtonTitle: "Deseleziona",
			restoreButtonTitle: "Ripristina",
			setOptionError: 'Le modifiche di runtime non sono consentite per la seguente opzione: '
	};

	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale.it.Dialog;
	return $.ig.locale.it.Dialog;
}));// REMOVE_FROM_COMBINED_FILES
