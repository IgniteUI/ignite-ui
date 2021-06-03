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
	$.ig.locale.ro = $.ig.locale.ro || {};

	$.ig.locale.ro.TileManager = {
			renderDataError: "Datele nu au fost recuperate sau analizate cu succes.",
		    setOptionItemsLengthError: "Lungimea configurațiilor articolelor nu se potrivește cu numărul de dale.",
			setOptionError: "Modificările în timpul rulării nu sunt permise pentru această opțiune."
	}
	
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale.ro.TileManager;
	return $.ig.locale.ro.TileManager;
}));// REMOVE_FROM_COMBINED_FILES
