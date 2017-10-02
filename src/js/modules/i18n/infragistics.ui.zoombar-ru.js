/*!@license
* Infragistics.Web.ClientUI Zoombar localization resources <build_number>
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
	$.ig.Zoombar = $.ig.Zoombar || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.ru = $.ig.locale.ru || {};

	$.ig.locale.ru.Zoombar = {
			zoombarTargetNotSpecified: "Виджету igZoombar необходим целевой объект для отображения!",
			zoombarTypeNotSupported: "Целевой виджет, к которому Zoombar пытается присоединиться, не поддерживается!",
			zoombarProviderNotRecognized: "igZoombar не удалось инициализировать поставщика из указанного класса — возможно, переданное значение не является классом.",
			optionChangeNotSupported: "Изменение этой опции после создания igZoombar не поддерживается:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.ru.Zoombar;
	return $.ig.locale.ru.Zoombar;;
}));// REMOVE_FROM_COMBINED_FILES
