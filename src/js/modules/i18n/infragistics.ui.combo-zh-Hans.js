/*!@license
* Infragistics.Web.ClientUI Combo localization resources <build_number>
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
	$.ig.locale['zh-Hans'] = $.ig.locale['zh-Hans'] || {};
	$.ig.Combo = $.ig.Combo || {};
	
	$.ig.locale['zh-Hans'].Combo = {
			noMatchFoundText: '未找到匹配项',
			dropDownButtonTitle: '显示下拉菜单',
			clearButtonTitle: '清除值',
			placeHolder: '选择...',
			notSuported: '不支持该操作。',
			errorNoSupportedTextsType: "需要不同的筛选文本。提供的值可以是字符串，也可以是字符串数组。",
			errorUnrecognizedHighlightMatchesMode: "需要使用不同的突出显示匹配模式。在 'multi'，'contains'，'startsWith'，'full' 和 'null' 之间选择一个值。",
			errorIncorrectGroupingKey: "分组密钥不正确。"
	};

	$.ig.Combo.locale = $.ig.Combo.locale || $.ig.locale['zh-Hans'].Combo;
	return $.ig.locale['zh-Hans'].Combo;
}));// REMOVE_FROM_COMBINED_FILES
