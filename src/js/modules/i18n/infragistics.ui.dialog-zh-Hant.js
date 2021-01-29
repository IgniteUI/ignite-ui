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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale['zh-Hant'] = $.ig.locale['zh-Hant'] || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale['zh-Hant'].Dialog = {
			closeButtonTitle: "關閉",
			minimizeButtonTitle: "最小化",
			maximizeButtonTitle: "最大化",
			pinButtonTitle: "釘選",
			unpinButtonTitle: "取消釘選",
			restoreButtonTitle: "恢復",
			setOptionError: '以下選項不允許執行階段變更: '
	};

	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale['zh-Hant'].Dialog;
	return $.ig.locale['zh-Hant'].Dialog;
}));// REMOVE_FROM_COMBINED_FILES
