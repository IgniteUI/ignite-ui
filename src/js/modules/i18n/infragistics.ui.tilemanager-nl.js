/*!@license
* Infragistics.Web.ClientUI Tile Manager localization resources <build_number>
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
	$.ig.TileManager = $.ig.TileManager || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.nl = $.ig.locale.nl || {};

	$.ig.locale.nl.TileManager = {
			renderDataError: "Gegevens zijn niet opgehaald of geparseerd.",
		    setOptionItemsLengthError: "De lengte van de itemconfiguraties komt niet overeen met het aantal tegels.",
			setOptionError: "Runtime-wijzigingen zijn niet toegestaan voor deze optie."
	}
	
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale.nl.TileManager;
	return $.ig.locale.nl.TileManager;
}));// REMOVE_FROM_COMBINED_FILES
