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
	$.ig.locale.es = $.ig.locale.es || {};
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.es.Notifier = {
		successMsg: "Correcto",
		errorMsg: "Error",
		warningMsg: "Advertencia",
		infoMsg: "Información",
		notSupportedState: "¡Estado de notificación no admitido! Utilice uno de los estados admitidos 'success', 'info', 'warning', 'error'",
		notSupportedMode: "¡Modo de notificación no admitido! Utilice uno de los modos admitidos 'auto', 'popover', 'inline'"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.es.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
