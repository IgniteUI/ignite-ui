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
	$.ig.locale['nb-NO'] = $.ig.locale['nb-NO'] || {};

	$.ig.locale['nb-NO'].Zoombar = {
				zoombarTargetNotSpecified: "igZoombar krever et gyldig mål for å knytte seg til!",
				zoombarTypeNotSupported: "Type widget Zoombar prøver å knytte til støttes ikke!",
				zoombarProviderNotRecognized: "igZoombar kunne ikke initialisere en leverandør fra den angitte klassen, eller verdien som ble overført er ikke en klasse.",
				optionChangeNotSupported: "Å endre følgende alternativ etter at igZoombar er opprettet, støttes ikke:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale['nb-NO'].Zoombar;
	return $.ig.locale['nb-NO'].Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
