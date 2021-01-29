/*!@license
* Infragistics.Web.ClientUI HTML Editor localization resources <build_number>
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
	$.ig.HtmlEditor = $.ig.HtmlEditor || {};
	
	$.ig.locale['zh-Hans'].HtmlEditor = {
		boldButtonTitle: '粗体',
		italicButtonTitle: '斜体',
		underlineButtonTitle: '下划线',
		strikethroughButtonTitle: '删除线',
		increaseFontSizeButtonTitle: '增加字体大小',
		decreaseFontSizeButtonTitle: '减小字体大小',
		alignTextLeftButtonTitle: '左对齐文本',
		alignTextRightButtonTitle: '右对齐文本',
		alignTextCenterButtonTitle: '中心',
		justifyButtonTitle: '对齐',
		bulletsButtonTitle: '项目符号',
		numberingButtonTitle: '编号',
		decreaseIndentButtonTitle: '减少缩进',
		increaseIndentButtonTitle: '增加缩进',
		insertPictureButtonTitle: '插入图片',
		fontColorButtonTitle: '字体颜色',
		textHighlightButtonTitle: '文本突出显示颜色',
		insertLinkButtonTitle: '插入超链接',
		insertTableButtonTitle: '表',
		addRowButtonTitle: '添加行',
		removeRowButtonTitle: '移除行',
		addColumnButtonTitle: '添加列',
		removeColumnButtonTitle: '移除列',
		inserHRButtonTitle: '插入水平线',
		viewSourceButtonTitle: '查看源',
		cutButtonTitle: '剪切',
		copyButtonTitle: '复制',
		pasteButtonTitle: '粘贴',
		undoButtonTitle: '撤消',
		redoButtonTitle: '重做',
		imageUrlDialogText: '图像网址:',
		imageAlternativeTextDialogText: '备用文本:',
		imageWidthDialogText: '图像宽度:',
		imageHeihgtDialogText: '图像高度:',
		linkNavigateToUrlDialogText: '导航至 URL:',
		linkDisplayTextDialogText: '显示文本:',
		linkOpenInDialogText: '打开方式:',
		linkTargetNewWindowDialogText: '新窗口',
		linkTargetSameWindowDialogText: '相同窗口',
		linkTargetParentWindowDialogText: '父窗口',
		linkTargetTopmostWindowDialogText: '最上面的窗口',
		applyButtonTitle: '应用',
		cancelButtonTitle: '取消',
		textToolbar: "文本操作工具栏",
		formattingToolbar: "文本格式化工具栏",
		insertObjectToolbar: "对象插入工具栏",
		copyPasteToolbar: "复制/粘贴工具栏",
		fontNames: {
			win: [
					{ text: "Times New Roman", value: "Times New Roman" },
					{ text: "Arial", value: "Arial" },
					{ text: "Arial Black", value: "Arial Black" },
					{ text: "Helvetica", value: "Helvetica" },
					{ text: "Comic Sans MS", value: "Comic Sans MS" },
					{ text: "Courier New", value: "Courier New" },
					{ text: "Georgia", value: "Georgia" },
					{ text: "Impact", value: "Impact" },
					{ text: "Lucida Console", value: "Lucida Console" },
					{ text: "Lucida Sans Unicode", value: "Lucida Sans Unicode" },
					{ text: "Palatino Linotype", value: "Palatino Linotype" },
					{ text: "Tahoma", value: "Tahoma" },
					{ text: "Trebuchet MS", value: "Trebuchet MS" },
					{ text: "Verdana", value: "Verdana" },
					{ text: "Symbol", value: "Symbol" },
					{ text: "Webdings", value: "Webdings" },
					{ text: "Wingdings", value: "Wingdings" },
					{ text: "MS Sans Serif", value: "MS Sans Serif" },
					{ text: "MS Serif", value: "MS Serif" }
				],
			mac: [
					{ text: "Times New Roman", value: "Times New Roman" },
					{ text: "Arial", value: "Arial" },
					{ text: "Arial Black", value: "Arial Black" },
					{ text: "Helvetica", value: "Helvetica" },
					{ text: "Comic Sans MS", value: "Comic Sans MS" },
					{ text: "Courier New", value: "Courier New" },
					{ text: "Georgia", value: "Georgia" },
					{ text: "Impact", value: "Impact" },
					{ text: "Monaco", value: "Monaco" },
					{ text: "Lucida Grande", value: "Lucida Grande" },
					{ text: "Book Antiqua", value: "Book Antiqua" },
					{ text: "Geneva", value: "Geneva" },
					{ text: "Trebuchet MS", value: "Trebuchet" },
					{ text: "Verdana", value: "Verdana" },
					{ text: "Symbol", value: "Symbol" },
					{ text: "Webdings", value: "Webdings" },
					{ text: "Zapf Dingbats", value: "Zapf Dingbats" },
					{ text: "New York", value: "New York" }
				]
		},
		fontSizes: [
			{ text: "1", value: "7.5 pt"},
			{ text: "2", value: "10 pt"},
			{ text: "3", value: "12 pt"},
			{ text: "4", value: "13.5 pt"},
			{ text: "5", value: "18 pt"},
			{ text: "6", value: "24 pt"},
			{ text: "7", value: "36 pt"}
		],
		formatsList: [
				{ text: "h1", value: "Heading 1" },
				{ text: "h2", value: "Heading 2" },
				{ text: "h3", value: "Heading 3" },
				{ text: "h4", value: "Heading 4" },
				{ text: "h5", value: "Heading 5" },
				{ text: "h6", value: "Heading 6" },
				{ text: "p", value: "Normal" }
			]
};

$.ig.HtmlEditor.locale = $.ig.HtmlEditor.locale || $.ig.locale['zh-Hans'].HtmlEditor;
return $.ig.locale['zh-Hans'].HtmlEditor;
}));// REMOVE_FROM_COMBINED_FILES
