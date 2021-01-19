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
	$.ig.locale.it = $.ig.locale.it || {};

	$.ig.locale.it.TileManager = {
			renderDataError: "Data was not successfully retrieved or parsed.",
		    setOptionItemsLengthError: "The length of the items configurations does not match the number of the tiles.",
			setOptionError: "Runtime changes are not allowed for this option."
	}
	
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale.it.TileManager;
	return $.ig.locale.it.TileManager;
}));// REMOVE_FROM_COMBINED_FILES
