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
	$.ig.locale.ro = $.ig.locale.ro || {};
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.ro.Notifier = {
		successMsg: "Succes",
		errorMsg: "Eroare",
		warningMsg: "Avertizare",
		infoMsg: "Informație",
		notSupportedState: "Stare de notificare neacceptată! Utilizați una dintre stările acceptate 'success', 'info', 'warning', 'error'.",
		notSupportedMode: "Mod de notificare neacceptat! Utilizați unul dintre modurile acceptate "auto", "popover", "inline"."
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.ro.Notifier;
return $.ig.locale.ro.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
