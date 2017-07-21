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
(function () {
	$ = $ || {};
    $.ig = $.ig || {};
	$.ig.Zoombar = $.ig.Zoombar || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.de = $.ig.locale.de || {};

	$.ig.locale.de.Zoombar = {
			zoombarTargetNotSpecified: "igZoombar erfordert ein gültiges Ziel zum Anfügen.",
			zoombarTypeNotSupported: "Der Widget-Typ, an den sich die Zoomleiste anzufügen versucht, wird nicht unterstützt.",
			zoombarProviderNotRecognized: "igZoombar konnte einen Anbieter der angegebenen Klasse nicht initialisieren oder der angegebene Wert ist keine Klasse.",
			optionChangeNotSupported: "Die Änderung der folgenden Option nach der Erstellung der igZoombar wird nicht unterstützt:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.de.Zoombar;
	return $.ig.locale.de.Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
