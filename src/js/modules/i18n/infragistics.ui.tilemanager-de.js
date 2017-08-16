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
		define( [], factory );
	} else {
		return factory();
	}
}
(function () {
	$ = $ || {};
    $.ig = $.ig || {};
	$.ig.TileManager = $.ig.TileManager || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.de = $.ig.locale.de || {};

	$.ig.locale.de.TileManager = {
		    renderDataError: "Die Daten wurden nicht erfolgreich abgerufen oder analysiert.",
		    setOptionItemsLengthError: "The length of the items configurations does not match the number of the tiles."
	}
	
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale.de.TileManager;
	return $.ig.locale.de.TileManager;
}));// REMOVE_FROM_COMBINED_FILES
