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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
$.ig = $.ig || {};

	$.ig.Zoombar = {};

	$.extend($.ig.Zoombar, {

		locale: {
			zoombarTargetNotSpecified: "Виджету igZoombar необходим целевой объект для отображения!",
			zoombarTypeNotSupported: "Целевой виджет, к которому Zoombar пытается присоединиться, не поддерживается!",
			zoombarProviderNotRecognized: "igZoombar не удалось инициализировать поставщика из указанного класса — возможно, переданное значение не является классом.",
			optionChangeNotSupported: "Изменение этой опции после создания igZoombar не поддерживается:"
		}
	});

		$.ig.locale = $.ig.locale || {};
		$.ig.locale.ru = $.ig.locale.ru || {};
		$.ig.locale.ru.Zoombar = $.extend({}, $.ig.Zoombar.locale);
}));// REMOVE_FROM_COMBINED_FILES
