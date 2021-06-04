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
	$.ig.locale.pl = $.ig.locale.pl || {};

	$.ig.locale.pl.Zoombar = {
				zoombarTargetNotSpecified: "Element igZoombar należy dołączyć do prawidłowego obiektu docelowego!",
				zoombarTypeNotSupported: "Typ widżetu, do którego ma zostać dołączony element Zoombar, nie jest obsługiwany!",
				zoombarProviderNotRecognized: "Element igZoombar nie mógł zainicjować dostawcy z podanej klasy lub przekazana wartość nie jest klasą.",
				optionChangeNotSupported: "Zmiana następującej opcji po utworzeniu elementu igZoombar nie jest obsługiwana:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.pl.Zoombar;
	return $.ig.locale.pl.Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
