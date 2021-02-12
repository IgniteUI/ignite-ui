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
	$.ig.locale['zh-Hant'] = $.ig.locale['zh-Hant'] || {};

	$.ig.locale['zh-Hant'].TileManager = {
			renderDataError: "未成功擷取或解析資料。",
		    setOptionItemsLengthError: "項目設定的長度與磁貼數量不符。",
			setOptionError: "此選項不允許運行時變更。"
	}
	
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale['zh-Hant'].TileManager;
	return $.ig.locale['zh-Hant'].TileManager;
}));// REMOVE_FROM_COMBINED_FILES
