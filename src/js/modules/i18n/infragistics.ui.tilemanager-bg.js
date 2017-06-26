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
		    renderDataError: "Извличането или парсирането на данните е неуспешно.",
		    setOptionItemsLengthError: "Дължината на подадената items конфигурация не отговаря на броя на плочките."
		}
	});
	
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.bg = $.ig.locale.bg || {};
	$.ig.locale.bg.TileManager = $.extend({}, $.ig.TileManager.locale);
}));// REMOVE_FROM_COMBINED_FILES
