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
	$.ig.locale.da = $.ig.locale.da || {};

	$.ig.locale.da.Zoombar = {
				zoombarTargetNotSpecified: "igZoombar kræver et gyldigt mål at vedhæfte til!",
				zoombarTypeNotSupported: "Den type widget, Zoombar forsøger at vedhæfte til, understøttes ikke!",
				zoombarProviderNotRecognized: "igZoombar kunne ikke initialisere en udbyder fra den angivne klasse, eller den videregivne værdi er ikke en klasse.",
				optionChangeNotSupported: "Ændring af følgende indstilling, efter at igZoombar er oprettet, understøttes ikke:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.da.Zoombar;
	return $.ig.locale.da.Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
