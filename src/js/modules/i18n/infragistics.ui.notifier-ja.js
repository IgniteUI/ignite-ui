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

if (!$.ig.Notifier) {
	$.ig.Notifier = {};

	$.extend($.ig.Notifier, {
		locale: {
		    successMsg: "成功",
		    errorMsg: "エラー",
		    warningMsg: "警告",
			notSupportedState: "サポートされていない通知状態です。success、info、warning、error のいずれかのサポートされる状態を使用してください。",
			notSupportedMode: "サポートされていない通知モードです。auto、popover、inline のいずれかのサポートされるモードを使用してください。"
		}
	});

}
}));// REMOVE_FROM_COMBINED_FILES
