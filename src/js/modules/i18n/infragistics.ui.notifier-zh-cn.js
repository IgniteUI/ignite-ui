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
	$.ig.locale['zh-cn'] = $.ig.locale['zh-cn'] || {};
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale['zh-cn'].Notifier = {
		successMsg: "成功",
		errorMsg: "错误",
		warningMsg: "警告",
		infoMsg: "信息",
		notSupportedState: "不支持的通知状态！使用支持的 'success'，'info'，'warning'，'error' 状态之一",
		notSupportedMode: "不支持的通知模式！使用支持的 'auto'，'popover'，'inline' 模式之一"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale['zh-cn'].Notifier;
return $.ig.locale['zh-cn'].Notifier;
}));// REMOVE_FROM_COMBINED_FILES
