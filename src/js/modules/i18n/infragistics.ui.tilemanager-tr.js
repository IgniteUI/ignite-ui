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
	$.ig.locale.tr = $.ig.locale.tr || {};

	$.ig.locale.tr.TileManager = {
			renderDataError: "Veriler başarıyla alınmadı veya ayrıştırılmadı.",
		    setOptionItemsLengthError: "Öğe yapılandırmalarının uzunluğu, kutucuk sayısıyla eşleşmiyor.",
			setOptionError: "Bu seçenek için çalışma zamanı değişikliklerine izin verilmez."
	}
	
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale.tr.TileManager;
	return $.ig.locale.tr.TileManager;
}));// REMOVE_FROM_COMBINED_FILES
