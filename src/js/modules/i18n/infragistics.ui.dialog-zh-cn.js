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
	$.ig.locale['zh-cn'] = $.ig.locale['zh-cn'] || {};
	$.ig.Dialog = $.ig.Dialog || {};
	
	$.ig.locale['zh-cn'].Dialog = {
			closeButtonTitle: "收盘",
			minimizeButtonTitle: "最小化",
			maximizeButtonTitle: "最大化",
			pinButtonTitle: "固定",
			unpinButtonTitle: "取消固定",
			restoreButtonTitle: "恢复",
			setOptionError: '以下选项不允许运行时更改: '
	};

	$.ig.Dialog.locale = $.ig.Dialog.locale || $.ig.locale['zh-cn'].Dialog;
	return $.ig.locale['zh-cn'].Dialog;
}));// REMOVE_FROM_COMBINED_FILES
