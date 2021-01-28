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
		$.ig.locale['zh-tw'] = $.ig.locale['zh-tw'] || {};

	    $.ig.locale['zh-tw'].Scroll = {
		        errorNoElementLink: '所連結的元素不存在。',
		        errorNoScrollbarLink: '所連結的捲動條元素不存在。'
		}

		$.ig.Scroll.locale = $.ig.Scroll.locale || $.ig.locale['zh-tw'].Scroll;
		return $.ig.locale['zh-tw'].Scroll;
}));// REMOVE_FROM_COMBINED_FILES
