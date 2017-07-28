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
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.bg = $.ig.locale.bg || {};
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.bg.Notifier = {
		successMsg: "Успех",
		errorMsg: "Грешка",
		warningMsg: "Внимание",
		infoMsg: "Информация",
		notSupportedState: "Неподдържано състояние на нотификациите! Използвайте някое от поддържаните състояния 'success', 'info', 'warning', 'error’.",
		notSupportedMode: "Неподдържан режим на нотификациите. Използвайте някой от поддържаните режими 'auto', 'popover', 'inline'."
	};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.bg.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
