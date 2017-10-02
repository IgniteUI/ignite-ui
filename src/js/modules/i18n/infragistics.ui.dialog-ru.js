/*!@license
* Infragistics.Web.ClientUI Dialog localization resources <build_number>
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
	$.ig.locale.ru = $.ig.locale.ru || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale.ru.Dialog = {
			closeButtonTitle: "закрыть",
			minimizeButtonTitle: "минимизировать",
			maximizeButtonTitle: "максимизировать",
			pinButtonTitle: "прикрепить",
			unpinButtonTitle: "открепить",
			restoreButtonTitle: "восстановить",
			setOptionError: 'Этот параметр не может быть задан во время выполнения программы'
	};

	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale.ru.Dialog;
	return $.ig.locale.ru.Dialog;
}));// REMOVE_FROM_COMBINED_FILES
