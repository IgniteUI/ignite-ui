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
	$.ig.locale.nl = $.ig.locale.nl || {};
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.nl.Notifier = {
		successMsg: "Gelukt",
		errorMsg: "Fout",
		warningMsg: "Waarschuwing",
		infoMsg: "Informatie",
		notSupportedState: "Niet ondersteunde meldingsstatus! Gebruik een van de ondersteunde staten 'success', 'info', 'warning', 'error'",
		notSupportedMode: "Niet ondersteunde meldingsmodus! Gebruik een van de ondersteunde modi 'auto', 'popover', 'inline'"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.nl.Notifier;
return $.ig.locale.nl.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
