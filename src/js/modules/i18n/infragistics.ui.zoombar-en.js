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
	$.ig.locale.en = $.ig.locale.en || {};

	$.ig.locale.en.Zoombar = {
				zoombarTargetNotSpecified: "igZoombar requires a valid target to attach to!",
				zoombarTypeNotSupported: "The type of widget the Zoombar is trying to attach to is not supported!",
				zoombarProviderNotRecognized: "igZoombar could not initialize a provider from the class specified or the value passed is not a class.",
				optionChangeNotSupported: "Changing the following option after the igZoombar has been created is not supported:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.en.Zoombar;
	return $.ig.locale.en.Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
