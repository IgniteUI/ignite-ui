/*!@license
* Infragistics.Web.ClientUI Notifier localization resources <build_number>
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
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.it.Notifier = {
		successMsg: "Operazione riuscita",
		errorMsg: "Errore",
		warningMsg: "Avviso",
		infoMsg: "Informazioni",
		notSupportedState: "Stato di notifica non supportato! Utilizzare uno degli stati supportati 'success', 'info', 'warning', 'error'",
		notSupportedMode: "Modalità di notifica non supportata! Utilizzare una delle modalità supportate 'auto', 'popover', 'inline'"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.it.Notifier;
return $.ig.locale.it.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
