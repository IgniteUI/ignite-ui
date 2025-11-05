/*!@license
* Infragistics.Web.ClientUI templating localization resources <build_number>
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
	$.ig.locale['zh-Hant'] = $.ig.locale['zh-Hant'] || {};
	$.ig.Templating = $.ig.Templating || {};
	
	$.ig.locale['zh-Hant'].Templating = {
			undefinedArgument: '嘗試擷取資料來源屬性時出錯: ',
			noAdvancedTemplating: '未載入進階樣板引擎，無法處理 {{if}} 或 {{each}}。請包含模組 "infragistics.templating.advanced.js" 以使用進階樣板功能。'
	};

	$.ig.Templating.locale = $.ig.Templating.locale || $.ig.locale['zh-Hant'].Templating;
	return $.ig.locale['zh-Hant'].Templating;
}));// REMOVE_FROM_COMBINED_FILES
