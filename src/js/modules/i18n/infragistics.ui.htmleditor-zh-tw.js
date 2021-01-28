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
	$.ig.locale['zh-tw'] = $.ig.locale['zh-tw'] || {};
	$.ig.HtmlEditor = $.ig.HtmlEditor || {};
	
	$.ig.locale['zh-tw'].HtmlEditor = {
		boldButtonTitle: '粗體',
		italicButtonTitle: '斜體',
		underlineButtonTitle: '底線',
		strikethroughButtonTitle: '刪除線',
		increaseFontSizeButtonTitle: '增加字體大小',
		decreaseFontSizeButtonTitle: '減小字體大小',
		alignTextLeftButtonTitle: '左對齊文字',
		alignTextRightButtonTitle: '右對齊文字',
		alignTextCenterButtonTitle: '中心',
		justifyButtonTitle: '調整',
		bulletsButtonTitle: '項目符號',
		numberingButtonTitle: '編號',
		decreaseIndentButtonTitle: '減少縮進',
		increaseIndentButtonTitle: '增加縮進',
		insertPictureButtonTitle: '插入圖片',
		fontColorButtonTitle: '字體顏色',
		textHighlightButtonTitle: '文字高亮顏色',
		insertLinkButtonTitle: '插入超連結',
		insertTableButtonTitle: '表',
		addRowButtonTitle: '新增行',
		removeRowButtonTitle: '移除行',
		addColumnButtonTitle: '新增列',
		removeColumnButtonTitle: '移除列',
		inserHRButtonTitle: '插入水平線',
		viewSourceButtonTitle: '檢視來源',
		cutButtonTitle: '剪切',
		copyButtonTitle: '複製',
		pasteButtonTitle: '貼上',
		undoButtonTitle: '撤銷',
		redoButtonTitle: '重做',
		imageUrlDialogText: '影像網址:',
		imageAlternativeTextDialogText: '替代文字:',
		imageWidthDialogText: '影像寬度:',
		imageHeihgtDialogText: '影像高度:',
		linkNavigateToUrlDialogText: '導航至網址:',
		linkDisplayTextDialogText: '顯示文字:',
		linkOpenInDialogText: '打開方式:',
		linkTargetNewWindowDialogText: '新視窗',
		linkTargetSameWindowDialogText: '相同視窗',
		linkTargetParentWindowDialogText: '父視窗',
		linkTargetTopmostWindowDialogText: '最上方的視窗',
		applyButtonTitle: '套用',
		cancelButtonTitle: '取消',
		textToolbar: "文字操作工具欄",
		formattingToolbar: "文字格式化工具欄",
		insertObjectToolbar: "物件插入工具欄",
		copyPasteToolbar: "複製/黏貼工具欄",
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
				{ text: "h1", value: "標題 1" },
				{ text: "h2", value: "標題 2" },
				{ text: "h3", value: "標題 3" },
				{ text: "h4", value: "標題 4" },
				{ text: "h5", value: "標題 5" },
				{ text: "h6", value: "標題 6" },
				{ text: "p", value: "Normal" }
			]
};

$.ig.HtmlEditor.locale = $.ig.HtmlEditor.locale || $.ig.locale['zh-tw'].HtmlEditor;
return $.ig.locale['zh-tw'].HtmlEditor;
}));// REMOVE_FROM_COMBINED_FILES
