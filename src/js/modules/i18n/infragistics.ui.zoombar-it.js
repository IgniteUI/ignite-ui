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
	$.ig.locale.it = $.ig.locale.it || {};

	$.ig.locale.it.Zoombar = {
				zoombarTargetNotSpecified: "igZoombar richiede un bersaglio valido a cui attaccarsi!",
				zoombarTypeNotSupported: "Il tipo di widget a cui Zoombar sta tentando di collegarsi non è supportato!",
				zoombarProviderNotRecognized: "igZoombar non è riuscito a inizializzare un provider dalla classe specificata o il valore passato non è una classe.",
				optionChangeNotSupported: "La modifica dell'opzione seguente dopo la creazione di igZoombar non è supportata: "
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.it.Zoombar;
	return $.ig.locale.it.Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
