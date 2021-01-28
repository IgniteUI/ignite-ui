/*!@license
* Infragistics.Web.ClientUI Popover localization resources <build_number>
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
	$.ig.locale = $.ig.locale || {};
	$.ig.locale['zh-tw'] = $.ig.locale['zh-tw'] || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale['zh-tw'].Popover = {
		popoverOptionChangeNotSupported: "不支援在 igPopover 初始化後更改以下選項:",
		popoverShowMethodWithoutTarget: "當使用選擇器選項時，show 函數的目標參數是強制性的"
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale['zh-tw'].Popover;
return $.ig.locale['zh-tw'].Popover;
}));// REMOVE_FROM_COMBINED_FILES
