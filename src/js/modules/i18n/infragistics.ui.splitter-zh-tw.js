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
	$.ig.locale['zh-tw'] = $.ig.locale['zh-tw'] || {};

	    $.ig.locale['zh-tw'].Splitter = {
		        errorPanels: '面板的數量不得超過兩個。',
		        errorSettingOption: '設定選項時出錯。'
		}
		
		$.ig.Splitter.locale = $.ig.Splitter.locale || $.ig.locale['zh-tw'].Splitter;
		return $.ig.locale['zh-tw'].Splitter;
}));// REMOVE_FROM_COMBINED_FILES
