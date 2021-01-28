/*!@license
* Infragistics.Web.ClientUI Zoombar localization resources <build_number>
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
	$.ig.Zoombar = $.ig.Zoombar || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale['zh-tw'] = $.ig.locale['zh-tw'] || {};

	$.ig.locale['zh-tw'].Zoombar = {
				zoombarTargetNotSpecified: "igZoombar 需要附加有效目標！",
				zoombarTypeNotSupported: "不支援 Zoombar 嘗試附加的小工具類型！",
				zoombarProviderNotRecognized: "igZoombar 無法從指定的類別或傳遞的值不是類別，來初始化提供者。",
				optionChangeNotSupported: "不支援在創建 igZoombar 之後更改以下選項:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale['zh-tw'].Zoombar;
	return $.ig.locale['zh-tw'].Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
