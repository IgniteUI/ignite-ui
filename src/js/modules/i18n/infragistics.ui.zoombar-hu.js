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
	$.ig.locale.hu = $.ig.locale.hu || {};

	$.ig.locale.hu.Zoombar = {
				zoombarTargetNotSpecified: "Az igZoombarhoz érvényes célpontot kell csatolni!",
				zoombarTypeNotSupported: "Az a típusú widget, amelyhez a Zoombar csatlakozni próbál, nem támogatott!",
				zoombarProviderNotRecognized: "Az igZoombar nem tudta inicializálni a szolgáltatót a megadott osztályból, vagy az átadott érték nem osztály.",
				optionChangeNotSupported: "A következő opció nem módosítható az igZoombar létrehozása után:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale.hu.Zoombar;
	return $.ig.locale.hu.Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
