/*!@license
* Infragistics.Web.ClientUI Validator localization resources <build_number>
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

    if (!$.ig.Validator) {
	    $.ig.Validator = {
		    locale: {
		        defaultMessage: "このフィールドは無効です",
		        selectMessage: "値を選択してください",
		        rangeSelectMessage: "{0} 以上で {1} 以下の項目を選択してください。",
		        minSelectMessage: "{0} 項目以上を選択してください",
		        maxSelectMessage: "{0} 項目以下を選択してください",
		        rangeLengthMessage: "入力の長さは {0} ～ {1} の間の文字数である必要があります",
		        minLengthMessage: "入力の長さは少なくとも {0} 文字である必要があります",
		        maxLengthMessage: "入力の長さは {0} 文字以下である必要があります",
			    requiredMessage: "このフィールドは必須フィールドです。",
			    patternMessage: '入力が所定のパターンに一致しません',
			    maskMessage: "すべての必須な文字を入力してください",
			    dateFieldsMessage: "日付のフィールド値を入力してください",
			    invalidDayMessage: "月の有効な日を入力してください",
			    dateMessage: "有効な日付を入力してください",
			    numberMessage: "有効な数値を入力してください",
			    rangeValueMessage: "{0} ~ {1} の値を入力してください",
			    minValueMessage: "{0} 以上の値を入力してください",
			    maxValueMessage: "{0} 以下の値を入力してください",
			    emailMessage: '有効なメール アドレスを入力してください',
				creditCardMessage: '有効なクレジット カード番号を入力してください。',
			    equalToMessage: '2 つの値は一致しません',
			    optionalString: '(オプション)'
		    }
	    };
    }
}));// REMOVE_FROM_COMBINED_FILES
