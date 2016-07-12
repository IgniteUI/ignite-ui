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
	        zoombarTargetNotSpecified: "igZoombar erfordert ein gültiges Ziel zum Anfügen.",
	        zoombarTypeNotSupported: "Der Widget-Typ, an den sich die Zoomleiste anzufügen versucht, wird nicht unterstützt.",
			zoombarProviderNotRecognized: "igZoombar could not recognize the provider specified. If you are using a custom one, please ensure that you are passing the name of an existing Class in the $.ig namespace or an instance of one.",
	        optionChangeNotSupported: "Die Änderung der folgenden Option nach der Erstellung der igZoombar wird nicht unterstützt:"
		}
	});

}
})(jQuery);