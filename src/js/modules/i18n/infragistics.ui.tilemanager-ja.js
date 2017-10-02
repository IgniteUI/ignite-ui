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
	$.ig.locale.ja = $.ig.locale.ja || {};

	$.ig.locale.ja.TileManager = {
		    renderDataError: "データが正しく取得されないか、解析されませんでした。",
		    setOptionItemsLengthError: "The length of the items configurations does not match the number of the tiles."
	}
	
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale.ja.TileManager;
	return $.ig.locale.ja.TileManager;
}));// REMOVE_FROM_COMBINED_FILES
