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
	$.ig.locale.nb = $.ig.locale.nb || {};
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.nb.Notifier = {
		successMsg: "Success",
		errorMsg: "Error",
		warningMsg: "Warning",
		infoMsg: "Information",
		notSupportedState: "Ikke støttet varslingstilstand! Bruk en av de støttede tilstandene 'success', 'info', 'warning', 'error'",
		notSupportedMode: "Ikke støttet varslingsmodus! Bruk en av de støttede modusene 'auto', 'popover', 'inline'"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.nb.Notifier;
return $.ig.locale.nb.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
