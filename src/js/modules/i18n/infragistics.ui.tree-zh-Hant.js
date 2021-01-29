/*!@license
* Infragistics.Web.ClientUI Tree localization resources <build_number>
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
	$.ig.Tree = $.ig.Tree || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale['zh-Hant'] = $.ig.locale['zh-Hant'] || {};

	$.ig.locale['zh-Hant'].Tree = {
			    invalidArgumentType: '提供了無效的引數類型。',
			    errorOnRequest: '擷取資料時出錯: ',
			    noDataSourceUrl: 'igTree 控件需要提供 dataSourceUrl，以便向該 URL 發起資料請求。',
			    incorrectPath: '在提供的路徑中未找到節點: ',
			    incorrectNodeObject: '提供的引數不是 jQuery 節點元素。',
			    setOptionError: '以下選項不允許執行階段變更: ',
			    moveTo: '<strong>移至</strong> {0}',
			    moveBetween: '在 {0} 和 {1} <strong>之間移動</strong>',
			    moveAfter: '在 {0} <strong>之後移動</strong>',
			    moveBefore: '在 {0} <strong>之前移動</strong>',
			    copyTo: '<strong>複製到</strong> {0}',
			    copyBetween: '在 {0} 和 {1} <strong>之間複製</strong>',
			    copyAfter: '在 {0} <strong>之後復制</strong>',
			    copyBefore: '在 {0} <strong>之前複製</strong>',
			    and: '和'
	}
		
	$.ig.Tree.locale = $.ig.Tree.locale || $.ig.locale['zh-Hant'].Tree;
	return $.ig.locale['zh-Hant'].Tree;
}));// REMOVE_FROM_COMBINED_FILES
