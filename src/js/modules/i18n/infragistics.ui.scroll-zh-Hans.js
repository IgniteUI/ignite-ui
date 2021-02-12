/*!@license
* Infragistics.Web.ClientUI Scroll localization resources <build_number>
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
		$.ig.Scroll = $.ig.Scroll || {};
		$.ig.locale = $.ig.locale || {};
		$.ig.locale['zh-Hans'] = $.ig.locale['zh-Hans'] || {};

	    $.ig.locale['zh-Hans'].Scroll = {
		        errorNoElementLink: '被链接的元素不存在。',
		        errorNoScrollbarLink: '正在链接的滚动条元素不存在。'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale['zh-Hans'].Scroll;
		return $.ig.locale['zh-Hans'].Scroll;
}));// REMOVE_FROM_COMBINED_FILES
