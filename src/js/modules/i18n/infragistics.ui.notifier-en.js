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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function($) {
$.ig = $.ig || {};

if (!$.ig.Notifier) {
	$.ig.Notifier = {};

	$.extend($.ig.Notifier, {
		locale: {
			successMsg: "Success",
			errorMsg: "Error",
			warningMsg: "Warning",
			notSupportedState: "Not supported notification state! Use one of the supported states 'success', 'info', 'warning', 'error'",
			notSupportedMode: "Not supported notification mode! Use one of the supported modes 'auto', 'popover', 'inline'"
		}
	});

}
}));// REMOVE_FROM_COMBINED_FILES
