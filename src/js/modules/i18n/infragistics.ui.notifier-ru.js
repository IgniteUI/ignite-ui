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
		    successMsg: "Успешно",
		    errorMsg: "Ошибка",
		    warningMsg: "Предупреждение",
		    notSupportedState: "Состояние уведомления не поддерживается! Используйте одно из поддерживаемых состояний: 'success', 'info', 'warning', 'error'",
		    notSupportedMode: "Режим уведомлений не поддерживается! Используйте один из поддерживаемых режимов: 'auto', 'popover', 'inline'"
		}
	});

}
}));// REMOVE_FROM_COMBINED_FILES
