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
		    renderDataError: "Die Daten wurden nicht erfolgreich abgerufen oder analysiert.",
		    setOptionItemsLengthError: "The length of the items configurations does not match the number of the tiles."
		}
	});
	
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.de = $.ig.locale.de || {};
	$.ig.locale.de.TileManager = $.extend({}, $.ig.TileManager.locale);
}));// REMOVE_FROM_COMBINED_FILES
