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

$.ig.locale = $.ig.locale || {};
$.ig.locale.en = $.ig.locale.en || {};
$.ig.locale.en.Notifier = $.extend({}, $.ig.Notifier.locale);
}));// REMOVE_FROM_COMBINED_FILES
