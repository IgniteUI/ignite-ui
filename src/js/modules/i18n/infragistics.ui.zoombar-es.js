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
		factory();
	}
}
(function () {
	$ = $ || {};
    $.ig = $.ig || {};
	$.ig.Zoombar = $.ig.Zoombar || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.es = $.ig.locale.es || {};

	$.ig.locale.es.Zoombar = {
			zoombarTargetNotSpecified: "igZoombar necesita un destino válido al que adjuntarse.",
			zoombarTypeNotSupported: "El tipo de widget al que la barra de zoom intenta adjuntarse no se admite.",
			zoombarProviderNotRecognized: "igZoombar no ha podido iniciar un proveedor para la clase especificada o el valor que se ha pasado no es una clase.",
			optionChangeNotSupported: "No se admite cambiar la opción siguiente después de que igZoombar se haya creado:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.es.Zoombar;
	return $.ig.locale.es.Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
