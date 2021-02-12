/*!@license
* Infragistics.Web.ClientUI Editors localization resources <build_number>
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
	$.ig.Editor = $.ig.Editor || {};
	$.ig.locale = $.ig.locale || {};
	$.ig.locale['zh-Hans'] = $.ig.locale['zh-Hans'] || {};

	$.ig.locale['zh-Hans'].Editor = {
		spinUpperTitle: '增量',
		spinLowerTitle: '减量',
		buttonTitle: '显示列表',
		clearTitle: '清除值',
		ariaTextEditorFieldLabel: '文本编辑器',
		ariaNumericEditorFieldLabel: '数值编辑器',
		ariaCurrencyEditorFieldLabel: '货币编辑器',
		ariaPercentEditorFieldLabel: '百分比编辑器',
		ariaMaskEditorFieldLabel: '遮罩编辑器',
		ariaDateEditorFieldLabel: '日期编辑器',
		ariaDatePickerFieldLabel: '日期选择器',
		ariaTimePickerFieldLabel: "时间选择器",
		ariaSpinUpButton: '上旋',
		ariaSpinDownButton: '下旋',
		ariaDropDownButton: '下拉',
		ariaClearButton: '清除',
		ariaCalendarButton: '日历',
		datePickerButtonTitle: '显示日历',
		updateModeUnsupportedValue: 'updateMode 需要不同的配置。在 "onChange" 和 "immediate" 之间选择一个值。',
		updateModeNotSupported: 'updateMode 属性仅支持 igMaskEditor，igDateEditor 和 igDatePicker 扩展的 "onchange" 模式',
		renderErrMsg: "基本编辑器无法直接实例化。尝试使用文本，数字，日期或其他编辑器。",
		multilineErrMsg: 'textArea 需要不同的配置。textMode 应该设置为 "multiline"。',
		targetNotSupported: "不支持该目标元素。",
		placeHolderNotSupported: "您的浏览器不支持占位符属性。",
		allowedValuesMsg: "从下拉列表中选择一个值",
		maxLengthErrMsg: "输入项太长，已被修剪为 {0} 个符号",
		maxLengthWarningMsg: "该字段的输入项已达到最大长度 {0}",
		minLengthErrMsg: "至少应输入 {0} 个字符",
		maxValErrMsg: "该字段的输入项达到最大值 {0}",
		minValErrMsg: "该字段的输入项达到最小值 {0}",
		maxValExceedRevertErrMsg: "输入项已超过最大值 {0}，并已还原为之前的值",
		minValExceedRevertErrMsg: "输入项小于最小值 {0}，并且已还原为之前的值",
		maxValExceedSetErrMsg: "输入项超过最大值 {0}，并被设置为最大值",
		minValExceedSetErrMsg: "输入项小于最小值 {0}，且已设置为最小值",
		maxValExceededWrappedAroundErrMsg: "输入项超过最大值 {0}，并设置为允许的最小值",
		minValExceededWrappedAroundErrMsg: "输入项小于最小值 {0}，且已设置为允许的最大值",
		btnValueNotSupported: '需要不同的按钮值。在 "dropdown"，"clear" 和 "spin" 之间选择一个值。',
		scientificFormatErrMsg: '需要不同的科学格式。在 "E"，"e"，"E+" 和 "e+" 之间选择一个值。',
		spinDeltaIsOfTypeNumber: "需要不同类型的 spinDelta。应输入正数。",
		spinDeltaIsOfTypeNumberForPeriod: "{0} 需要不同类型的 spinDelta。应输入介于 {1} 和 {2} 之间的正数。",
		spinDeltaIsOfTypeNumberOrObject: "需要不同类型的 spinDelta。应输入定义不同时间段增量的正数或对象。",
		spinDeltaShouldBeInRange: "{0} 的 spinDelta 选项应介于 {1} 和 {2} 之间",
		spinDeltaCouldntBeNegative: "spinDelta 选项不得为负。应输入正数。",
		spinDeltaContainsExceedsMaxDecimals: "spinDelta 的最大允许分数设置为 {0}。更改 MaxDecimals 或尝试缩小您的值。",
		spinDeltaIncorrectFloatingPoint: '浮点 spinDelta 需要不同的配置。将编辑器的 dataMode 设置为 "double" 或 "float"，或将 spinDelta 设置为整数。',
		numericEditorNoSuchMethod: "数字编辑器不支持该方法。",
		numericEditorNoSuchOption: "数字编辑器不支持该选项。",
		displayFactorIsOfTypeNumber: "displayFactor 需要不同的值。其数值应设置为 1 或 100。",
		displayFactorAllowedValue: "displayFactor 需要不同的值。其数值应设置为 1 或 100。",
		instantiateCheckBoxErrMsg: "igCheckboxEditor 需要其他元素。使用 INPUT，SPAN 或 DIV 元素。",
		cannotParseNonBoolValue: "igCheckboxEditor 需要不同的值。应提供一个布尔值。",
		cannotSetNonBoolValue: "igCheckboxEditor 需要不同的值。应提供一个布尔值。",
		maskEditorNoSuchMethod: "遮罩编辑器不支持此方法。",
		datePickerEditorNoSuchMethod: "日期编辑器不支持该方法。",
		datePickerNoSuchMethodDropDownContainer: "日期编辑器不支持该方法。请改用 'getCalendar'。",
		buttonTypeIsDropDownOnly: "Datepicker 仅允许 buttonType 选项的下拉值和清除值。",
		dateEditorOffsetRange: "displayTimeOffset 选项的取值范围应在 - 720 到 840 之间，它根据 UTC 以分钟为单位，表示从最西端 (−12:00) 到最东端 (+14:00) 的所有时区的偏差。",
		setOptionError: '以下选项不允许运行时更改: ',
		invalidDate: "无效日期",
		maskMessage: '应填写所有要求的位置',
		maskRevertMessage: '应填写所有要求的位置，这就是为什么值被恢复为最后一个有效位置的原因。',
		dateMessage: '必须输入有效日期',
		centuryThresholdValidValues: "CenturyThreshold 属性的值应介于0到 99 之间。",
		noListItemsNoButton: "由于没有列表项，因此未显示旋转或下拉按钮。",
		decimalNumber: "当 dataMode 为 '{0}' 时，{1} 选项可以接受 0 到 {2} 之间的数值。",
		decimalSeparatorErrorMsg: "小数点分隔符选项需要不同的值。其值应为单个字符。",
		decimalSeparatorEqualsGroupSeparatorErrorMsg: "groupSeparator 和 decimalSeparator 选项的值不能相等。",
		timePickerNoSuchMethod: "时间选择器不支持此方法。"
	};

	$.ig.Editor.locale = $.ig.Editor.locale || $.ig.locale['zh-Hans'].Editor;
	return $.ig.locale['zh-Hans'].Editor;
}));// REMOVE_FROM_COMBINED_FILES
