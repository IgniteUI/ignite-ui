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
	$.ig.locale['zh-cn'] = $.ig.locale['zh-cn'] || {};

	$.ig.locale['zh-cn'].Tree = {
			    invalidArgumentType: '提供了无效的自变量类型。',
			    errorOnRequest: '检索数据时出现错误: ',
			    noDataSourceUrl: 'igTree 控件需要提供 dataSourceUrl 才能发起对该 URL 的数据请求。',
			    incorrectPath: '在提供的路径中未找到节点: ',
			    incorrectNodeObject: '提供的参数不是 jQuery 节点元素。',
			    setOptionError: '以下选项不允许运行时更改: ',
			    moveTo: '<strong>移至</strong> {0}',
			    moveBetween: '在 {0} 和 {1} <strong>之间移动</strong>',
			    moveAfter: '在 {0} <strong>之后移动</strong>',
			    moveBefore: '在 {0} <strong>之前移动</strong>',
			    copyTo: '<strong>复制到</strong> {0}',
			    copyBetween: '在 {0} 和 {1} <strong>之间复制</strong>',
			    copyAfter: '在 {0} <strong>之后复制</strong>',
			    copyBefore: '在 {0} <strong>之前复制</strong>',
			    and: '和'
	}
		
	$.ig.Tree.locale = $.ig.Tree.locale || $.ig.locale['zh-cn'].Tree;
	return $.ig.locale['zh-cn'].Tree;
}));// REMOVE_FROM_COMBINED_FILES
