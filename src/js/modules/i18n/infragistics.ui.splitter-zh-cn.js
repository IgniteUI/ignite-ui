/*!@license
* Infragistics.Web.ClientUI Splitter localization resources <build_number>
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
	$.ig.Splitter = $.ig.Splitter || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale['zh-cn'] = $.ig.locale['zh-cn'] || {};

	    $.ig.locale['zh-cn'].Splitter = {
		        errorPanels: '面板的数量不得超过两个。',
		        errorSettingOption: '设置选项时出错。'
		}
		
		$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale['zh-cn'].Splitter;
		return $.ig.locale['zh-cn'].Splitter;
}));// REMOVE_FROM_COMBINED_FILES
