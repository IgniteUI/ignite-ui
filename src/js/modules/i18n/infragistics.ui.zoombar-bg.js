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
		define( [], factory );
	} else {
		return factory();
	}
}
(function ($) {
	$ = $ || {};
    $.ig = $.ig || {};
	$.ig.Zoombar = $.ig.Zoombar || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.bg = $.ig.locale.bg || {};

	$.ig.locale.bg.Zoombar = {
				zoombarTargetNotSpecified: "igZoombar изисква валидна цел, към която да се прикрепи!",
				zoombarTypeNotSupported: "Видът на компонента, към който igZoombar се опитва да се прикрепи не се поддържа!",
				zoombarProviderNotRecognized: "igZoombar не може да инициализира провайдър от посочения клас или зададената стойност не е клас.",
				optionChangeNotSupported: "Промяната на следната опция след инициализация на igZoombar не се поддържа:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.bg.Zoombar;
	return $.ig.locale.bg.Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
