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
ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.ru = $.ig.locale.ru || {};
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.ru.Notifier = {
		successMsg: "Успешно",
		errorMsg: "Ошибка",
		warningMsg: "Предупреждение",
		infoMsg: "Информация",
		notSupportedState: "Состояние уведомления не поддерживается! Используйте одно из поддерживаемых состояний: 'success', 'info', 'warning', 'error'",
		notSupportedMode: "Режим уведомлений не поддерживается! Используйте один из поддерживаемых режимов: 'auto', 'popover', 'inline'"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.ru.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
