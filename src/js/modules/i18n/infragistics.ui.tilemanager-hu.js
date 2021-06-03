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
	$.ig.locale.hu = $.ig.locale.hu || {};

	$.ig.locale.hu.TileManager = {
			renderDataError: "Az adatokat nem sikerült lekérni vagy elemezni.",
		    setOptionItemsLengthError: "Az elemkonfigurációk hossza nem egyezik meg a lapok számával.",
			setOptionError: "A futásidejű változtatások nem engedélyezettek ennél az opciónál."
	}
	
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale.hu.TileManager;
	return $.ig.locale.hu.TileManager;
}));// REMOVE_FROM_COMBINED_FILES
