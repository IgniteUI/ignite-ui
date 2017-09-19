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
		    successMsg: "Correcto",
		    errorMsg: "Error",
		    warningMsg: "Advertencia",
		    notSupportedState: "¡Estado de notificación no admitido! Utilice uno de los estados admitidos 'success', 'info', 'warning', 'error'",
		    notSupportedMode: "¡Modo de notificación no admitido! Utilice uno de los modos admitidos 'auto', 'popover', 'inline'"
		}
	});

}
}));// REMOVE_FROM_COMBINED_FILES
