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
	$.ig.locale.sv = $.ig.locale.sv || {};

	$.ig.locale.sv.Zoombar = {
				zoombarTargetNotSpecified: "igZoombar kräver ett giltigt mål att fästa vid!",
				zoombarTypeNotSupported: "Den typ av widget som Zoombar försöker koppla till stöds inte!",
				zoombarProviderNotRecognized: "igZoombar kunde inte initiera en leverantör från den angivna klassen eller så är det skickade värdet är inte en klass.",
				optionChangeNotSupported: "Ändring av följande alternativ efter att igZoombar har skapats stöds inte:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.sv.Zoombar;
	return $.ig.locale.sv.Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
