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
	$.ig.locale.bg = $.ig.locale.bg || {};

	$.ig.locale.bg.TileManager = {
		    renderDataError: "Извличането или парсирането на данните е неуспешно.",
		    setOptionItemsLengthError: "Дължината на подадената items конфигурация не отговаря на броя на плочките."
	}
		
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale.bg.TileManager;
	return $.ig.locale.bg.TileManager;
}));// REMOVE_FROM_COMBINED_FILES
