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
	$.ig.locale.sv = $.ig.locale.sv || {};
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.sv.Notifier = {
		successMsg: "Framgång",
		errorMsg: "Fel",
		warningMsg: "Varning",
		infoMsg: "Information",
		notSupportedState: "Meddelandestatus stöds inte! Använd ett av de tillstånd som stöds, 'success', 'info', 'warning', 'error'",
		notSupportedMode: "Meddelandeläget stöds inte! Använd ett av de lägen som stöds 'auto', 'popover', 'inline'"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.sv.Notifier;
return $.ig.locale.sv.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
