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
	$.ig.locale.cs = $.ig.locale.cs || {};
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.cs.Notifier = {
		successMsg: "Úspěch",
		errorMsg: "Chyba",
		warningMsg: "Varování",
		infoMsg: "Informace",
		notSupportedState: "Nepodporovaný stav oznámení! Použijte jeden z podporovaných stavů 'success', 'info', 'warning', 'error'.",
		notSupportedMode: "Nepodporovaný režim oznámení! Použijte jeden z podporovaných režimů 'auto', 'popover', 'inline'."
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.cs.Notifier;
return $.ig.locale.cs.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
