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
		successMsg: "Success",
		errorMsg: "Error",
		warningMsg: "Warning",
		infoMsg: "Information",
		notSupportedState: "Not supported notification state! Use one of the supported states 'success', 'info', 'warning', 'error'",
		notSupportedMode: "Not supported notification mode! Use one of the supported modes 'auto', 'popover', 'inline'"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.it.Notifier;
return $.ig.locale.it.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
