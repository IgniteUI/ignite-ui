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
	$.ig.locale.da = $.ig.locale.da || {};

	$.ig.locale.da.TileManager = {
			renderDataError: "Data blev ikke hentet eller parset.",
		    setOptionItemsLengthError: "Længden af elementkonfigurationerne svarer ikke til antallet af felter.",
			setOptionError: "Kørselsændringer er ikke tilladt for denne tilstand."
	}
	
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale.da.TileManager;
	return $.ig.locale.da.TileManager;
}));// REMOVE_FROM_COMBINED_FILES
