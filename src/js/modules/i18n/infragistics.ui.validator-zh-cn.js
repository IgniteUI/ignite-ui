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
	$.ig.locale['zh-cn'] = $.ig.locale['zh-cn'] || {};

	$.ig.locale['zh-cn'].Validator = {
		        defaultMessage: '需要注意此字段',
		        selectMessage: '应选择一个值',
		        rangeSelectMessage: '至少应选择 {0} 但不超过 {1} 个项目',
		        minSelectMessage: '至少应选择 {0} 个项目',
		        maxSelectMessage: '选择的项不得超过 {0} 个',
		        rangeLengthMessage: '输入项的长度应在 {0} 和 {1} 个字符之间',
		        minLengthMessage: '输入项的字符长度至少应为 {0} 个字符',
		        maxLengthMessage: '输入项的字符不得超过 {0} 个字符',
		        requiredMessage: '此字段为必填项',
		        patternMessage: '输入项与要求的模式不匹配',
		        maskMessage: '应填写所有要求的位置',
		        dateFieldsMessage: '必须输入日期字段值',
		        invalidDayMessage: '应输入当月的有效日期',
		        dateMessage: '必须输入有效日期',
		        numberMessage: '必须输入有效的数字',
		        rangeValueMessage: '应输入 {0} 至 {1} 之间的值',
		        minValueMessage: '至少应输入 {0} 的值',
		        maxValueMessage: '必须输入不超过 {0} 的值',
		        emailMessage: '必须输入有效的电子邮件地址',
		        creditCardMessage: '必须输入有效的支付卡号',
		        equalToMessage: '两个值不匹配',
		        optionalString: '(可选)'
	}
		
	$.ig.Validator.locale = $.ig.Validator.locale || $.ig.locale['zh-cn'].Validator;
	return $.ig.locale['zh-cn'].Validator;
}));// REMOVE_FROM_COMBINED_FILES
