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
	$.ig.locale.cs = $.ig.locale.cs || {};

	$.ig.locale.cs.Zoombar = {
				zoombarTargetNotSpecified: "igZoombar vyžaduje k připojení platný cíl!",
				zoombarTypeNotSupported: "Typ widgetu, ke kterému se Zoombar pokouší připojit, není podporován!",
				zoombarProviderNotRecognized: "igZoombar nemohl inicializovat poskytovatele ze zadané třídy nebo předaná hodnota není třídou.",
				optionChangeNotSupported: "Změna následující možnosti po vytvoření igZoombar není podporována:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.cs.Zoombar;
	return $.ig.locale.cs.Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
