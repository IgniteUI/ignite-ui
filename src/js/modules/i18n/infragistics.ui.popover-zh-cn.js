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
	$.ig.locale['zh-cn'] = $.ig.locale['zh-cn'] || {};
	$.ig.Popover = $.ig.Popover || {};
	
	$.ig.locale['zh-cn'].Popover = {
		popoverOptionChangeNotSupported: "不支持在初始化 igPopover 之后更改以下选项:",
		popoverShowMethodWithoutTarget: "当使用选择器选项时，show 函数的目标参数是强制性的"
	};

$.ig.Popover.locale = $.ig.Popover.locale || $.ig.locale['zh-cn'].Popover;
return $.ig.locale['zh-cn'].Popover;
}));// REMOVE_FROM_COMBINED_FILES
