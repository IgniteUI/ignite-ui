/*!@license
* Infragistics.Web.ClientUI Dialog localization resources <build_number>
*
* Copyright (c) 2011-<year> Infragistics Inc.
*
* http://www.infragistics.com/
*
*/

(function (factory) {
	if (typeof define === "function" && define.amd) {
		define( [], factory );
	} else {
		factory();
	}
}
(function () {
	$ = $ || {};
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale.ja = $.ig.locale.ja || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale.ja.Dialog = {
			closeButtonTitle: "閉じる",
			minimizeButtonTitle: "最小化",
			maximizeButtonTitle: "最大化",
			pinButtonTitle: "ピン固定",
			unpinButtonTitle: "ピン固定の解除",
			restoreButtonTitle: "元に戻す",
			setOptionError: '次のオプションはランタイムで変更できません: '

	};

	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale.ja.Dialog;
	return $.ig.locale.ja.Dialog;
}));// REMOVE_FROM_COMBINED_FILES
