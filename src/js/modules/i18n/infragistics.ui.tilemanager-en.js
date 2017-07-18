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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.TileManager = {};

	$.extend($.ig.TileManager, {
		locale: {
			renderDataError: "Data was not successfully retrieved or parsed.",
		    setOptionItemsLengthError: "The length of the items configurations does not match the number of the tiles.",
			setOptionError: "Runtime changes are not allowed for this option."
		}
	});
	
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.en = $.ig.locale.en || {};
	$.ig.locale.en.TileManager = $.extend({}, $.ig.TileManager.locale);
}));// REMOVE_FROM_COMBINED_FILES
