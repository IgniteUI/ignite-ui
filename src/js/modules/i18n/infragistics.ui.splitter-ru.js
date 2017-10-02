/*!@license
* Infragistics.Web.ClientUI Splitter localization resources <build_number>
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
	$.ig.Splitter = $.ig.Splitter || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.ru = $.ig.locale.ru || {};

	     $.ig.locale.ru.Splitter = {
		        errorPanels: 'Количество панелей не может быть больше двух.',
		        errorSettingOption: 'Ошибочное значение опции.'
		}

		$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale.ru.Splitter;
		return $.ig.locale.ru.Splitter;
}));// REMOVE_FROM_COMBINED_FILES
