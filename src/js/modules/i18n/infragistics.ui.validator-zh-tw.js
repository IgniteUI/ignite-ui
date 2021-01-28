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
		define( ["jquery"], factory );
	} else {
		return factory(jQuery);
	}
}
(function ($) {
	$.ig = $.ig || {};
	$.ig.Validator = $.ig.Validator || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale['zh-tw'] = $.ig.locale['zh-tw'] || {};

	$.ig.locale['zh-tw'].Validator = {
		        defaultMessage: '此欄位需要注意',
		        selectMessage: '應選擇一個值',
		        rangeSelectMessage: '至少應選擇 {0} 但不超過 {1} 個項目',
		        minSelectMessage: '至少應選擇 {0} 個項目',
		        maxSelectMessage: '選擇的項目數不應超過{0}個',
		        rangeLengthMessage: '輸入項的長度應在 {0} 和 {1} 個字元之間',
		        minLengthMessage: '輸入內容必須至少 {0} 個字元',
		        maxLengthMessage: '輸入內容不得超過 {0} 個字元',
		        requiredMessage: '此欄位為必填項',
		        patternMessage: '輸入的內容不符合要求的格式',
		        maskMessage: '所有必填位置均應填寫',
		        dateFieldsMessage: '應輸入日期欄位值',
		        invalidDayMessage: '應輸入當月的有效日期',
		        dateMessage: '必須輸入有效日期',
		        numberMessage: '必須輸入有效數字',
		        rangeValueMessage: '應輸入介於 {0} 和 {1} 之間的數值',
		        minValueMessage: '必須輸入至少 {0} 的值',
		        maxValueMessage: '必須輸入不超過 {0} 的值',
		        emailMessage: '必須輸入有效的電子郵件地址',
		        creditCardMessage: '必須輸入有效的付款卡號',
		        equalToMessage: '兩個值不匹配',
		        optionalString: '(可選)'
	}
		
	$.ig.Validator.locale = $.ig.Validator.locale || $.ig.locale['zh-tw'].Validator;
	return $.ig.locale['zh-tw'].Validator;
}));// REMOVE_FROM_COMBINED_FILES
