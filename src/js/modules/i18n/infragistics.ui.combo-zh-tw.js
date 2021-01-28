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
	$.ig.locale['zh-tw'] = $.ig.locale['zh-tw'] || {};
	$.ig.Combo = $.ig.Combo || {};
	
	$.ig.locale['zh-tw'].Combo = {
			noMatchFoundText: '未找到匹配項',
			dropDownButtonTitle: '顯示下拉式選單',
			clearButtonTitle: '清除值',
			placeHolder: '選擇...',
			notSuported: '不支援該操作。',
			errorNoSupportedTextsType: "需要不同的過濾文字。提供的值可以是字串或字串陣列。",
			errorUnrecognizedHighlightMatchesMode: "需要使用不同的突顯匹配模式。在 'multi'，'contains'，'startsWith'，'full' 和 'null' 之間選擇一個值。",
			errorIncorrectGroupingKey: "分組密鑰不正確。"
	};

	$.ig.Combo.locale = $.ig.Combo.locale || $.ig.locale['zh-tw'].Combo;
	return $.ig.locale['zh-tw'].Combo;
}));// REMOVE_FROM_COMBINED_FILES
