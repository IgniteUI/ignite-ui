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
	$.ig.locale['zh-cn'] = $.ig.locale['zh-cn'] || {};

	$.ig.locale['zh-cn'].Zoombar = {
				zoombarTargetNotSpecified: "igZoombar 需要附加有效目标！",
				zoombarTypeNotSupported: "不支持 Zoombar 尝试附加的小程序类型！",
				zoombarProviderNotRecognized: "igZoombar 无法从指定的类中初始化提供者，或者所传递的值不是类。",
				optionChangeNotSupported: "不支持在创建 igZoombar 之后更改以下选项:"
	}

	$.ig.Zoombar.locale = $.ig.Zoombar.locale || $.ig.locale['zh-cn'].Zoombar;
	return $.ig.locale['zh-cn'].Zoombar;
}));// REMOVE_FROM_COMBINED_FILES
