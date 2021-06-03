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
	$.ig.locale.ro = $.ig.locale.ro || {};

	$.ig.locale.ro.Zoombar = {
				zoombarTargetNotSpecified: "igZoombar necesită o țintă validă la care să se atașeze!",
				zoombarTypeNotSupported: "Tipul de widget pe care Zoombar încearcă să îl atașeze nu este acceptat!",
				zoombarProviderNotRecognized: "igZoombar nu a putut inițializa un furnizor din clasa specificată sau valoarea trecută nu este o clasă.",
				optionChangeNotSupported: "Modificarea următoarei opțiuni după crearea igZoombar nu este acceptată:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.ro.Zoombar;
	return $.ig.locale.ro.Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
