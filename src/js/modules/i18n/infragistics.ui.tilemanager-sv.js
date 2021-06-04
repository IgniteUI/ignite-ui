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
	$.ig.locale.sv = $.ig.locale.sv || {};

	$.ig.locale.sv.TileManager = {
			renderDataError: "Data hämtades inte eller analyserades inte.",
		    setOptionItemsLengthError: "Objektkonfigurationernas längd matchar inte antalet brickor.",
			setOptionError: "Runtime-ändringar är inte tillåtna för det här alternativet."
	}
	
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale.sv.TileManager;
	return $.ig.locale.sv.TileManager;
}));// REMOVE_FROM_COMBINED_FILES
