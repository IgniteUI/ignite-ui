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
	$.ig.locale.pt = $.ig.locale.pt || {};
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.pt.Notifier = {
		successMsg: "Sucesso",
		errorMsg: "Erro",
		warningMsg: "Aviso",
		infoMsg: "Informação",
		notSupportedState: "Estado de notificação não suportado! Utilize um dos estados suportados: 'success', 'info', 'warning', 'error'.",
		notSupportedMode: "Modo de notificação não suportado! Utilize um dos modos suportados: 'auto', 'popover', 'inline'"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.pt.Notifier;
return $.ig.locale.pt.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
