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
	$.ig.locale['nb-NO'] = $.ig.locale['nb-NO'] || {};

	$.ig.locale['nb-NO'].TileManager = {
			renderDataError: "Dataene ble ikke hentet eller analysert.",
		    setOptionItemsLengthError: "Lengden på elementkonfigurasjonene stemmer ikke overens med antall fliser.",
			setOptionError: "Kjøretidsendringer er ikke tillatt for dette alternativet."
	}
	
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale['nb-NO'].TileManager;
	return $.ig.locale['nb-NO'].TileManager;
}));// REMOVE_FROM_COMBINED_FILES
