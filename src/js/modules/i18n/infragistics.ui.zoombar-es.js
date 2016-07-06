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
	        zoombarTargetNotSpecified: "igZoombar necesita un destino válido al que adjuntarse.",
	        zoombarTypeNotSupported: "El tipo de widget al que la barra de zoom intenta adjuntarse no se admite.",
			zoombarProviderNotRecognized: "igZoombar could not recognize the provider specified. If you are using a custom one, please ensure that you are passing the name of an existing Class in the $.ig namespace or an instance of one.",
	        optionChangeNotSupported: "No se admite cambiar la opción siguiente después de que igZoombar se haya creado:"
		}
	});

}
})(jQuery);