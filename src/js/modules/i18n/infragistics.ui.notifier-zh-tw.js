/*!@license
* Infragistics.Web.ClientUI Notifier localization resources <build_number>
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
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale['zh-tw'].Notifier = {
		successMsg: "成功",
		errorMsg: "錯誤",
		warningMsg: "警告",
		infoMsg: "資訊",
		notSupportedState: "不支援的通知狀態！使用受支援 'success'，'info'，'warning'，'error' 的狀態之一",
		notSupportedMode: "不支援的通知模式！使用支援 'auto'，'popover'，'inline' 的模式之一"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale['zh-tw'].Notifier;
return $.ig.locale['zh-tw'].Notifier;
}));// REMOVE_FROM_COMBINED_FILES
