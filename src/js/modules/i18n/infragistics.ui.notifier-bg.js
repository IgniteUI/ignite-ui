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
			successMsg: "Успех",
			errorMsg: "Грешка",
			warningMsg: "Внимание",
			notSupportedState: "Неподдържано състояние на нотификациите! Използвайте някое от поддържаните състояния 'success', 'info', 'warning', 'error’.",
			notSupportedMode: "Неподдържан режим на нотификациите. Използвайте някое от поддържаните състояния 'auto', 'popover', 'inline'."
		}
	});

}
}));// REMOVE_FROM_COMBINED_FILES
