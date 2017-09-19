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
		define( [
			"jquery"
		], factory );
	} else {
		factory(jQuery);
	}
}
(function ($) {
    $.ig = $.ig || {};

    if (!$.ig.Combo) {
	    $.ig.Combo = {
		    locale: {
		        noMatchFoundText: '検索結果はありません',
		        dropDownButtonTitle: 'ドロップダウンの表示',
		        clearButtonTitle: '値をクリア',
		        placeHolder: '項目を選択',
		        notSuported: 'この操作はサポートされません',
		        errorNoSupportedTextsType: "異なるフィルター テキストを使用してください。文字列または文字列の配列を使用してください。",
		        errorUnrecognizedHighlightMatchesMode: '他の強調表示一致モードを使用してください。"multi"、"contains"、"startsWith"、"full" または "null" のいずれかを選択してください。',
		        errorIncorrectGroupingKey: "グループ化キーは無効です。"
		    }
	    };
    }
}));// REMOVE_FROM_COMBINED_FILES
