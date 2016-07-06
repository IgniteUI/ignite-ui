/*!@license
* Infragistics.Web.ClientUI Zoombar localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

/*global jQuery */
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.Zoombar) {
	    $.ig.Zoombar = {};

	    $.extend($.ig.Zoombar, {

	        locale: {
	            zoombarTargetNotSpecified: "igZoombar изисква валидна цел, към която да се прикрепи!",
	            zoombarTypeNotSupported: "Видът на компонента, към който igZoombar се опитва да се прикрепи не се поддържа!",
				zoombarProviderNotRecognized: "igZoombar could not recognize the provider specified. If you are using a custom one, please ensure that you are passing the name of an existing Class in the $.ig namespace or an instance of one.",
	            optionChangeNotSupported: "Промяната на следната опция след инициализация на igZoombar не се поддържа:"
		    }
	    });

    }
})(jQuery);