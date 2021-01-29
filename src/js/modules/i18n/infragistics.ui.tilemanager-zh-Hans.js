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
	$.ig.locale['zh-Hans'] = $.ig.locale['zh-Hans'] || {};

	$.ig.locale['zh-Hans'].TileManager = {
			renderDataError: "未成功检索或解析数据。",
		    setOptionItemsLengthError: "项目配置的长度与图块的数量不匹配。",
			setOptionError: "此选项不允许运行时更改。"
	}
	
	$.ig.TileManager.locale = $.ig.TileManager.locale || $.ig.locale['zh-Hans'].TileManager;
	return $.ig.locale['zh-Hans'].TileManager;
}));// REMOVE_FROM_COMBINED_FILES
