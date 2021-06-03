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
	$.ig.locale.cs = $.ig.locale.cs || {};

	$.ig.locale.cs.TileManager = {
			renderDataError: "Data nebyla úspěšně načtena nebo analyzována.",
		    setOptionItemsLengthError: "Délka konfigurací položek neodpovídá počtu dlaždic.",
			setOptionError: "Změny za běhu nejsou pro tuto možnost povoleny."
	}
	
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale.cs.TileManager;
	return $.ig.locale.cs.TileManager;
}));// REMOVE_FROM_COMBINED_FILES
