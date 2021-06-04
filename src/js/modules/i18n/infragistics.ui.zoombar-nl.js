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
	$.ig.locale.nl = $.ig.locale.nl || {};

	$.ig.locale.nl.Zoombar = {
				zoombarTargetNotSpecified: "igZoombar vereist een geldig doel om aan te koppelen!",
				zoombarTypeNotSupported: "Het type widget waaraan de zoombalk probeert te koppelen, wordt niet ondersteund!",
				zoombarProviderNotRecognized: "igZoombar kon een provider niet initialiseren vanuit de opgegeven klasse of de doorgegeven waarde is geen klasse.",
				optionChangeNotSupported: "Het wijzigen van de volgende optie nadat de igZoombar is gemaakt, wordt niet ondersteund:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.nl.Zoombar;
	return $.ig.locale.nl.Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
