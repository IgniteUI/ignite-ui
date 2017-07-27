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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.ja = $.ig.locale.ja || {};
	$.ig.Notifier = $.ig.Notifier || {};
	
	$.ig.locale.ja.Notifier = {
		successMsg: "成功",
		errorMsg: "エラー",
		warningMsg: "警告",
		infoMsg: "情報",
		notSupportedState: "サポートされていない通知状態です。success、info、warning、error のいずれかのサポートされる状態を使用してください。",
		notSupportedMode: "サポートされていない通知モードです。auto、popover、inline のいずれかのサポートされるモードを使用してください。"
};

$.ig.Notifier.locale = $.ig.Notifier.locale || $.ig.locale.ja.Notifier;
}));// REMOVE_FROM_COMBINED_FILES
