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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
$.ig = $.ig || {};

if (!$.ig.HtmlEditor) {
	$.ig.HtmlEditor = {};

	$.extend($.ig.HtmlEditor, {

		locale: {
			boldButtonTitle: '太字',
			italicButtonTitle: 'イタリック',
			underlineButtonTitle: '下線',
			strikethroughButtonTitle: '取り消し線',
			increaseFontSizeButtonTitle: 'フォント サイズを大きくする',
			decreaseFontSizeButtonTitle: 'フォント サイズを小さくする',
			alignTextLeftButtonTitle: '文字列を左に揃える',
			alignTextRightButtonTitle: '文字列を右に揃える',
			alignTextCenterButtonTitle: '中央揃え',
			justifyButtonTitle: '両端揃え',
			bulletsButtonTitle: '箇条書き',
			numberingButtonTitle: '段落番号',
			decreaseIndentButtonTitle: 'インデントを減らす',
			increaseIndentButtonTitle: 'インデントを増やす',
			insertPictureButtonTitle: '画像を挿入する',
			fontColorButtonTitle: 'フォント色',
			textHighlightButtonTitle: '強調表示色',
			insertLinkButtonTitle: 'ハイパーリンクを挿入する',
			insertTableButtonTitle: '表',
			addRowButtonTitle: '行を追加する',
			removeRowButtonTitle: '行を削除する',
			addColumnButtonTitle: '列を追加する',
			removeColumnButtonTitle: '列を削除する',
			inserHRButtonTitle: '横罫線を挿入する',
			viewSourceButtonTitle: 'ソースを表示する',
			cutButtonTitle: '切り取り',
			copyButtonTitle: 'コピー',
			pasteButtonTitle: '貼り付け',
			undoButtonTitle: '元に戻す',
			redoButtonTitle: 'やり直し',
			imageUrlDialogText: '画像 URL:',
			imageAlternativeTextDialogText: '代替テキスト:',
			imageWidthDialogText: '画像の幅:',
			imageHeihgtDialogText: '画像の高さ:',
			linkNavigateToUrlDialogText: 'URL:',
			linkDisplayTextDialogText: '表示テキスト:',
			linkOpenInDialogText: 'ウィンドウ オプション:',
			linkTargetNewWindowDialogText: '新しいウィンドウで開く',
			linkTargetSameWindowDialogText: 'このウィンドウで開く',
			linkTargetParentWindowDialogText: '親ウィンドウで開く',
			linkTargetTopmostWindowDialogText: '最上位のウィンドウで開く',
			applyButtonTitle: '適用',
			cancelButtonTitle: 'キャンセル',
			defaultToolbars: {
			    textToolbar: "テキスト操作ツールバー",
			    formattingToolbar: "テキスト書式設定ツールバー",
			    insertObjectToolbar: "オブジェクト挿入ツールバー",
			    copyPasteToolbar: "コピー/貼り付けツールバー"
			},
			fontNames: {
				win: [
                    { text: "メイリオ", value: "Meiryo" },
                    { text: "MSゴシック", value: "MSゴシック" },
                    { text: "MS明朝", value: "MS明朝" },
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
				{ text: "1", value: "7.5 pt" },
				{ text: "2", value: "10 pt" },
				{ text: "3", value: "12 pt" },
				{ text: "4", value: "13.5 pt" },
				{ text: "5", value: "18 pt" },
				{ text: "6", value: "24 pt" },
				{ text: "7", value: "36 pt" }
			],
			formatsList: [
				{ text: "h1", value: "見出し 1" },
				{ text: "h2", value: "見出し 2" },
				{ text: "h3", value: "見出し 3" },
				{ text: "h4", value: "見出し 4" },
				{ text: "h5", value: "見出し 5" },
				{ text: "h6", value: "見出し 6" },
                { text: "p", value: "標準" }
			]
		}

	});
}
}));// REMOVE_FROM_COMBINED_FILES
