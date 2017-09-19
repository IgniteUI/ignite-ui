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

	if (!$.ig.Zoombar) {
		$.ig.Zoombar = {};

		$.extend($.ig.Zoombar, {

			locale: {
				zoombarTargetNotSpecified: "igZoombar изисква валидна цел, към която да се прикрепи!",
				zoombarTypeNotSupported: "Видът на компонента, към който igZoombar се опитва да се прикрепи не се поддържа!",
				zoombarProviderNotRecognized: "igZoombar не може да инициализира провайдър от посочения клас или зададената стойност не е клас.",
				optionChangeNotSupported: "Промяната на следната опция след инициализация на igZoombar не се поддържа:"
			}
		});

	}
}));// REMOVE_FROM_COMBINED_FILES
